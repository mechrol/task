import { en } from "./en";
import { pl, type Dictionary, type TranslationKey } from "./pl";
import { isLocale, LOCALE_LABELS, type Locale } from "./types";

export type { Locale, TranslationKey, Dictionary };
export { isLocale, LOCALE_LABELS };

export const dictionaries: Record<Locale, Dictionary> = { pl, en };

export type TranslateVars = Record<string, string | number>;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? pl;
}

/** Podstawienie placeholderow `{nazwa}`. */
export function translate(
  locale: Locale,
  key: TranslationKey,
  vars?: TranslateVars,
): string {
  const dict = getDictionary(locale);
  let out = dict[key];
  if (out === undefined) return key;
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      out = out.split(`{${name}}`).join(String(value));
    }
  }
  return out;
}

/** Forma gramatyczna liczebnika (PL: one/few/many, EN: one/many). */
export function pluralForm(locale: Locale, count: number): "one" | "few" | "many" {
  if (locale === "en") return count === 1 ? "one" : "many";
  const lastTwo = count % 100;
  const last = count % 10;
  if (count === 1) return "one";
  if (last >= 2 && last <= 4 && !(lastTwo >= 12 && lastTwo <= 14)) return "few";
  return "many";
}

/** Klucze slownikow z wyborem formy liczebnika. */
export type PluralKey = "feed.count" | "post.reactions" | "post.replies";

export function translatePlural(
  locale: Locale,
  base: PluralKey,
  count: number,
  vars?: TranslateVars,
): string {
  const key = `${base}.${pluralForm(locale, count)}` as TranslationKey;
  return translate(locale, key, { count, ...vars });
}

/* --------------------------------------------------------------------------
 * Etykiety danych z encji (kategorie, statusy, ...). Kazda etykieta ma klucz
 * w slowniku, wiec tlumaczenie jest zawsze spojne z reszta interfejsu.
 * ----------------------------------------------------------------------- */

type LabelKind =
  | "category"
  | "status"
  | "visibility"
  | "outcome"
  | "reaction"
  | "reportReason"
  | "reportStatus"
  | "moderation"
  | "role"
  | "topic";

function label(
  locale: Locale,
  kind: LabelKind,
  value: string,
  fallback: string,
): string {
  const key = `label.${kind}.${value}` as TranslationKey;
  const dict = getDictionary(locale);
  return dict[key] ?? fallback;
}

export function categoryLabel(locale: Locale, value: string): string {
  return label(locale, "category", value, value);
}

export function statusLabel(locale: Locale, value: string): string {
  return label(locale, "status", value, value);
}

export function visibilityLabel(locale: Locale, value: string): string {
  return label(locale, "visibility", value, value);
}

export function outcomeLabel(locale: Locale, value: string): string {
  return label(locale, "outcome", value, value);
}

export function reactionLabel(locale: Locale, value: string): string {
  return label(locale, "reaction", value, value);
}

export function reportReasonLabel(locale: Locale, value: string): string {
  return label(locale, "reportReason", value, value);
}

export function reportStatusLabel(locale: Locale, value: string): string {
  return label(locale, "reportStatus", value, value);
}

export function moderationLevelLabel(locale: Locale, value: string): string {
  return label(locale, "moderation", value, value);
}

export function roleLabel(locale: Locale, value: string): string {
  return label(locale, "role", value, value);
}

export function topicLabel(locale: Locale, value: string): string {
  return label(locale, "topic", value, value);
}

/** Opis kategorii czynnika generowany przez silnik. */
export function categoryDescription(locale: Locale, category: string): string {
  const key = `engine.factorDesc.${category}` as TranslationKey;
  return getDictionary(locale)[key] ?? category;
}

/** Podpowiedz o dowodzie generowana przez silnik. */
export function categoryEvidenceHint(locale: Locale, category: string): string {
  const key = `engine.evidenceHint.${category}` as TranslationKey;
  return getDictionary(locale)[key] ?? "";
}

/**
 * Dowód "brak - ..." jest znacznikiem technicznym (nie kazaniem), wiec musi
 * byc rozpoznawany w obu jezykach.
 */
export function isMissingEvidence(evidence?: string): boolean {
  if (!evidence) return true;
  const trimmed = evidence.trim().toLowerCase();
  if (trimmed.length === 0) return true;
  return trimmed.startsWith("brak") || trimmed.startsWith("none");
}
