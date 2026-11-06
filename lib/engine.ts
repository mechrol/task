import type {
  Factor,
  FactorCard,
  FactorCategory,
  SynthesisVariant,
} from "./types";
import { uid } from "./utils";
import { categoryDescription, categoryEvidenceHint, getDictionary, isMissingEvidence, translate } from "./i18n";
import type { Locale } from "./types";

/**
 * Silnik Czynnikow - wersja lokalna (bez backendu).
 *
 * Zasada PRD 7: zanim uzytkownik zadziala metoda prob i bledow, aplikacja
 * prowadzi go przez rozlozenie problemu na czynniki i ich ponowne zlozenie.
 *
 * Ten modul realizuje to regulowo na podstawie leksykonu slow kluczowych.
 * Kazda propozycja jest jawnie oznaczona jako wygenerowana (PRD 11:
 * "przejrzystosc AI") i moze zostac odrzucona lub edytowana przez autora.
 *
 * Teksty generowane przez silnik sa lokalizowane - `locale` decyduje o
 * jezyku opisow czynnikow, podpowiedzi i wariantow. Domyslnie polski, zeby
 * dotychczasowe wywolania pozostaly zgodne.
 */

interface LexiconEntry {
  category: FactorCategory;
  patterns: RegExp[];
  weight: number;
  confidence: number;
}

const LEXICON: LexiconEntry[] = [
  {
    category: "zasoby",
    patterns: [
      /\b(budżet|budzet|koszt|złotych|zł)\b/i,
      /\b(zasoby|budżetowanie|finansowanie|dotacj|dotacji)\b/i,
      /\b(personel|ludzie|ekipa|zespoł|zespol)\b/i,
      /\b(budget|cost|funding|resources|staff|headcount)\b/i,
    ],
    weight: 4,
    confidence: 3,
  },
  {
    category: "ryzyka",
    patterns: [
      /\b(ryzyk|ryzyko|grozi|groźb|zagrożen)\b/i,
      /\b(nie uda|nie wiem czy|obawiam się|strach)\b/i,
      /\b(opóźn|opóźni|spóźni)\b/i,
      /\b(risk|risks|threat|delay|delayed|fear|uncertain)\b/i,
    ],
    weight: 4,
    confidence: 3,
  },
  {
    category: "zaleznosci",
    patterns: [
      /\b(zarząd|zarzadu|urząd|urzędu|rząd|gmina|gminy)\b/i,
      /\b(kuratorium|organ|wydział|department)\b/i,
      /\b(partner|partnerzy|dostawca|API|integracj)\b/i,
      /\b(pozwolenie|zgodę|zgoda na|wymag)\b/i,
      /\b(board|authority|municipality|supplier|partner|permit|approval)\b/i,
    ],
    weight: 5,
    confidence: 2,
  },
  {
    category: "zalozenia",
    patterns: [
      /\b(jeśli|jeżeli|zakładam|zakłada|hipotez|o ile)\b/i,
      /\b(powinno|oczekuję|zakładam że)\b/i,
      /\b(proc\.|procent)\b/i,
      /\b(assume|assuming|hypothesis|expect|percent)\b/i,
    ],
    weight: 4,
    confidence: 2,
  },
  {
    category: "odbiorcy",
    patterns: [
      /\b(mieszkańc|mieszkanc|obywatel|klient|użytkownik|uzytkownik|nauczyciel)\b/i,
      /\b(głosowani|głosowan|zgłosz|ankiet|petycj|wniosk)\b/i,
      /\d+\s+(osób|osoby|uczestnik|mieszkańc)/i,
      /\b(resident|resident|citizen|customer|user|teacher|participant)\b/i,
      /\b(vote|votes|voting|survey|petition)\b/i,
      /\d+\s+(people|users|participants|residents)/i,
    ],
    weight: 4,
    confidence: 3,
  },
  {
    category: "czas",
    patterns: [
      /\b(termin|deadline|do końca|do końca miesiąca|do końca roku)\b/i,
      /\b(miesiąc|tydzień|tygodn|dni|godzin)\b/i,
      /\b(startuje|starta|rozpocz|premiera)\b/i,
      /\b(deadline|week|weeks|month|months|day|days|hour|hours)\b/i,
      /\b(starts|launch|release)\b/i,
    ],
    weight: 3,
    confidence: 4,
  },
];

export interface EngineInput {
  mysl: string;
  czyn?: string;
  topic?: string;
}

export interface EngineResult {
  synthesis: string;
  factors: Factor[];
  gaps: string[];
  contradictions: string[];
}

function countMatches(text: string, patterns: RegExp[]): number {
  return patterns.reduce(
    (acc, p) => acc + (text.match(new RegExp(p.source, "gi"))?.length ?? 0),
    0,
  );
}

function firstSentence(text: string): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  const match = cleaned.match(/^(.+?[.!?])(\s|$)/);
  return (match ? match[1] : cleaned).trim();
}

/** Tryb A: analiza przez syntezę - od całości do części. */
export function analyzeModeA(
  input: EngineInput,
  now: number = Date.now(),
  locale: Locale = "pl",
): EngineResult {
  const text = `${input.mysl} ${input.czyn ?? ""}`;
  const factors: Factor[] = [];
  const gaps: string[] = [];

  for (const entry of LEXICON) {
    const hits = countMatches(text, entry.patterns);
    if (hits === 0) continue;

    const description = categoryDescription(locale, entry.category);
    const evidenceHint = categoryEvidenceHint(locale, entry.category);

    const weight = Math.min(5, entry.weight + (hits > 1 ? 1 : 0));
    const confidence = Math.min(5, entry.confidence + (hits > 2 ? 1 : 0));
    factors.push({
      id: uid("f"),
      category: entry.category,
      description,
      weight,
      confidence,
      evidence: undefined,
      source: "silnik",
      createdAt: new Date(now).toISOString(),
    });
    if (!evidenceHint) continue;
    gaps.push(`${description}: ${evidenceHint}`);
  }

  if (factors.length < 3) {
    const fallbacks: FactorCategory[] = ["zasoby", "ryzyka", "odbiorcy"];
    for (const category of fallbacks) {
      if (factors.length >= 3) break;
      if (factors.some((f) => f.category === category)) continue;
      const entry = LEXICON.find((l) => l.category === category);
      if (!entry) continue;
      const description = categoryDescription(locale, category);
      const evidenceHint =
        categoryEvidenceHint(locale, category) ||
        translate(locale, "engine.gapFallback");
      factors.push({
        id: uid("f"),
        category,
        description,
        weight: 3,
        confidence: 2,
        source: "silnik",
        createdAt: new Date(now).toISOString(),
      });
      gaps.push(`${description}: ${evidenceHint}`);
    }
  }

  const synthesis = translate(locale, "engine.analysisResult", {
    text: firstSentence(input.mysl),
  });

  return {
    synthesis,
    factors: factors.sort((a, b) => b.weight - a.weight),
    gaps,
    contradictions: detectContradictions(factors, locale),
  };
}

/** Tryb B: synteza przez analizę - od części do całości. */
export function analyzeModeB(
  input: EngineInput,
  now: number = Date.now(),
  locale: Locale = "pl",
): EngineResult {
  const base = analyzeModeA(input, now, locale);
  const synthesis = translate(locale, "engine.synthesisResult", {
    count: base.factors.length,
    text: firstSentence(input.mysl),
  });
  return {
    synthesis,
    factors: base.factors,
    gaps: base.gaps,
    contradictions: base.contradictions,
  };
}

/** Wykrywa pary czynnikow o przeciwnych sygnalach (wysoka waga vs niska pewnosc). */
export function detectContradictions(
  factors: Factor[],
  locale: Locale = "pl",
): string[] {
  const out: string[] = [];
  const critical = factors.filter((f) => f.weight >= 4 && f.confidence <= 2);
  const strong = factors.filter((f) => f.weight >= 4 && f.confidence >= 4);
  for (const c of critical) {
    const match = strong.find((s) => s.category !== c.category);
    if (!match) continue;
    out.push(
      translate(locale, "engine.contradiction", {
        first: label(c.category, locale),
        weight: c.weight,
        confidence: c.confidence,
        second: label(match.category, locale),
        secondConfidence: match.confidence,
      }),
    );
  }
  if (out.length === 0 && critical.length > 0) {
    out.push(
      translate(locale, "engine.contradictionSingle", {
        category: label(critical[0].category, locale),
        weight: critical[0].weight,
        confidence: critical[0].confidence,
      }),
    );
  }
  return out;
}

function label(category: FactorCategory, locale: Locale = "pl"): string {
  const dict = getDictionary(locale);
  return (
    dict[`label.category.${category}` as keyof typeof dict] as string | undefined
  ) ?? category;
}

/** Czynniki krytyczne: wysoka waga, niska pewnosc. */
export function criticalFactors(factors: Factor[]): Factor[] {
  return factors
    .filter((f) => f.weight >= 4 && f.confidence <= 2)
    .sort((a, b) => b.weight - a.weight || a.confidence - b.confidence);
}

/** Propozycje wariantow syntezy (2-3) na podstawie czynnikow. */
export function proposeVariants(
  factors: Factor[],
  input: EngineInput,
  locale: Locale = "pl",
): SynthesisVariant[] {
  const critical = criticalFactors(factors);
  const evidenced = factors.filter((f) => f.evidence && !isMissingEvidence(f.evidence));
  const top = [...factors].sort((a, b) => b.weight - a.weight);

  const variants: SynthesisVariant[] = [];

  if (critical.length > 0) {
    const c = critical[0];
    variants.push({
      id: uid("v"),
      title: translate(locale, "engine.variantFirst", {
        category: label(c.category, locale).toLowerCase(),
      }),
      description: translate(locale, "engine.variantFirstDesc", {
        description: c.description,
        confidence: c.confidence,
        weight: c.weight,
      }),
      justification: translate(locale, "engine.variantFirstJust", {
        confidence: c.confidence,
      }),
      factorIds: critical.map((f) => f.id),
      votes: [],
    });
  }

  const strongest = top.filter((f) => !critical.some((c) => c.id === f.id));
  if (strongest.length > 0) {
    const names = strongest.slice(0, 3).map((f) => label(f.category, locale));
    variants.push({
      id: uid("v"),
      title: translate(locale, "engine.variantStrong"),
      description: translate(locale, "engine.variantStrongDesc", {
        names: names.join(", "),
      }),
      justification: evidenced.length
        ? translate(locale, "engine.variantStrongJustEvidence", {
            count: evidenced.length,
          })
        : translate(locale, "engine.variantStrongJustNone"),
      factorIds: strongest.slice(0, 3).map((f) => f.id),
      votes: [],
    });
  }

  variants.push({
    id: uid("v"),
    title: translate(locale, "engine.variantCheap"),
    description: translate(locale, "engine.variantCheapDesc", {
      text: firstSentence(input.czyn ?? input.mysl),
    }),
    justification: translate(locale, "engine.variantCheapJust"),
    factorIds: top.slice(0, 2).map((f) => f.id),
    votes: [],
  });

  return variants.slice(0, 3);
}

/** Tworzy karte czynnikow dla nowego komunikatu. */
export function createCard(
  postId: string,
  mode: "A" | "B",
  input: EngineInput,
  now: number = Date.now(),
  locale: Locale = "pl",
): FactorCard {
  const result =
    mode === "A" ? analyzeModeA(input, now, locale) : analyzeModeB(input, now, locale);
  return {
    id: uid("c"),
    postId,
    mode,
    synthesis: result.synthesis,
    factors: result.factors,
    variants: mode === "B" ? proposeVariants(result.factors, input, locale) : [],
    createdAt: new Date(now).toISOString(),
  };
}
