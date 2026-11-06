import { describe, expect, it } from "vitest";
import { en } from "./en";
import { pl } from "./pl";
import { dictionaries, isMissingEvidence, pluralForm, translate, translatePlural } from "./index";
import { localizeState } from "./localize";
import { seedState } from "../data";

describe("Slowniki jezykow", () => {
  it("oba jezyki maja identyczny zestaw kluczy", () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(pl).sort());
  });

  it("zaden klucz nie jest pusty", () => {
    for (const [locale, dict] of Object.entries(dictionaries)) {
      for (const [key, value] of Object.entries(dict)) {
        expect(value.length, `${locale}.${key}`).toBeGreaterThan(0);
      }
    }
  });

  it("tlumaczenie podstawia placeholdery", () => {
    expect(translate("pl", "profile.stats", { posts: 3 })).toContain("3");
    expect(translate("en", "profile.stats", { posts: 3 })).toContain("3");
  });

  it("brakujacy klucz zwraca sam klucz zamiast byc pusty", () => {
    expect(translate("pl", "nie.ma.takiego.klucza" as never)).toBe(
      "nie.ma.takiego.klucza",
    );
  });

  it("formy liczebnika sa poprawne dla obu jezykow", () => {
    expect(pluralForm("pl", 1)).toBe("one");
    expect(pluralForm("pl", 3)).toBe("few");
    expect(pluralForm("pl", 5)).toBe("many");
    expect(pluralForm("en", 1)).toBe("one");
    expect(pluralForm("en", 3)).toBe("many");
  });

  it("liczby z wartoscia zmieniaja tekst", () => {
    expect(translatePlural("pl", "post.reactions", 1)).toContain("1 reakcja");
    expect(translatePlural("pl", "post.reactions", 5)).toContain("5 reakcji");
    expect(translatePlural("en", "post.reactions", 1)).toContain("1 reaction");
    expect(translatePlural("en", "post.reactions", 5)).toContain("5 reactions");
  });

  it("brak dowodu jest rozpoznawany w obu jezykach", () => {
    expect(isMissingEvidence("Brak - podaj budzet")).toBe(true);
    expect(isMissingEvidence("None - give a budget")).toBe(true);
    expect(isMissingEvidence("Umowa z ul. Dabowa")).toBe(false);
    expect(isMissingEvidence(undefined)).toBe(true);
  });
});

describe("Lokalizacja tresci przykladowej", () => {
  it("polski to ten sam stan co seed", () => {
    expect(localizeState(seedState, "pl")).toBe(seedState);
  });

  it("angielski tlumaczy posty, grupy i odpowiedzi", () => {
    const view = localizeState(seedState, "en");
    const post = view.posts.find((p) => p.id === "p_remont_ulicy");
    expect(post?.mysl).toContain("Brzozowa Street");
    expect(post?.mysl).not.toBe(seedState.posts.find((p) => p.id === "p_remont_ulicy")?.mysl);

    const group = view.groups.find((g) => g.id === "g_energia");
    expect(group?.name).toBe("Energy Independence");

    const reply = view.replies.find((r) => r.id === "rp_1");
    expect(reply?.body).toContain("38 signatures");
  });

  it("tlumaczy karty czynnikow wraz z wariantami", () => {
    const view = localizeState(seedState, "en");
    const card = view.cards.find((c) => c.id === "c_kursy");
    expect(card?.synthesis).toContain("support ends before the exam");
    const variant = card?.variants.find((v) => v.id === "v_ko_1");
    expect(variant?.title).toBe("Support until the end, exam after the course");
  });

  it("tlumaczy powiadomienia i zgloszenia", () => {
    const view = localizeState(seedState, "en");
    expect(view.notifications[0].text).toContain("Tomasz Berg");
    expect(view.reports[0].details).toContain("Factor Card");
  });

  it("nie narusza wlasnych zmian uzytkownika", () => {
    const edited = {
      ...seedState,
      posts: seedState.posts.map((p) =>
        p.id === "p_remont_ulicy" ? { ...p, mysl: "Moja wersja tekstu." } : p,
      ),
    };
    const view = localizeState(edited, "en");
    expect(view.posts.find((p) => p.id === "p_remont_ulicy")?.mysl).toBe(
      "Moja wersja tekstu.",
    );
  });
});
