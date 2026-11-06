import { describe, expect, it } from "vitest";
import { analyzeModeA, analyzeModeB, criticalFactors, proposeVariants } from "./engine";
import { computeBalance, gini } from "./balance";
import { rankFeed, visiblePosts } from "./rank";
import { seedState } from "./data";
import { relativeTime } from "./format";
import { clamp } from "./utils";

const NOW = Date.parse("2026-06-01T12:00:00.000Z");

describe("Silnik Czynnikow", () => {
  it("tryb A zwraca co najmniej 3 czynniki z wage i pewnoscia", () => {
    const result = analyzeModeA(
      {
        mysl: "Remont ulicy Brzozowej ruszy w marcu, a mieszkańcy zapłacą za opóźnienie własnymi godzinami.",
        czyn: "Proszę zarząd o klauzulę w umowie.",
      },
      NOW,
    );
    expect(result.factors.length).toBeGreaterThanOrEqual(3);
    for (const factor of result.factors) {
      expect(factor.weight).toBeGreaterThanOrEqual(1);
      expect(factor.weight).toBeLessThanOrEqual(5);
      expect(factor.confidence).toBeGreaterThanOrEqual(1);
      expect(factor.confidence).toBeLessThanOrEqual(5);
      expect(factor.source).toBe("silnik");
    }
  });

  it("tryb B grupuje czynniki i wskazuje luki", () => {
    const result = analyzeModeB(
      {
        mysl: "Program szkoleniowy kosztuje 480 tysięcy, ale 30 procent uczestników nie kończy kursu.",
        czyn: "Zamawiam analizę odchodów.",
      },
      NOW,
    );
    expect(result.factors.length).toBeGreaterThanOrEqual(3);
    expect(result.gaps.length).toBeGreaterThan(0);
  });

  it("czynniki krytyczne to wysoka waga przy niskiej pewnosci", () => {
    const result = analyzeModeA(
      { mysl: "Budżet jest duży, ale cena energii zmienia się co kwartał." },
      NOW,
    );
    for (const c of criticalFactors(result.factors)) {
      expect(c.weight).toBeGreaterThanOrEqual(4);
      expect(c.confidence).toBeLessThanOrEqual(2);
    }
  });

  it("proponuje 2-3 warianty z uzasadnieniem powiazanym z czynnikami", () => {
    const result = analyzeModeB(
      { mysl: "Uważam, że warto zmienić system, bo koszt jest za wysoki dla mieszkańców." },
      NOW,
    );
    const variants = proposeVariants(result.factors, {
      mysl: "Uważam, że warto zmienić system, bo koszt jest za wysoki dla mieszkańców.",
    });
    expect(variants.length).toBeGreaterThanOrEqual(2);
    expect(variants.length).toBeLessThanOrEqual(3);
    for (const v of variants) {
      expect(v.justification.length).toBeGreaterThan(10);
      expect(v.factorIds.length).toBeGreaterThan(0);
    }
  });
});

describe("Wskaznik Rownowagi", () => {
  it("gini jest zerowy dla idealnie rownych rozkladow", () => {
    expect(gini([1, 1, 1, 1])).toBeCloseTo(0, 5);
  });

  it("gini jest wyzszy dla nierownego rozkladu", () => {
    expect(gini([1, 1, 1, 10])).toBeGreaterThan(gini([1, 1, 1, 2]));
  });

  it("zwraca obie skale w zakresie 0-100", () => {
    const balance = computeBalance(seedState.posts, seedState.reactions, seedState.replies);
    expect(balance.wola).toBeGreaterThanOrEqual(0);
    expect(balance.wola).toBeLessThanOrEqual(100);
    expect(balance.mysl).toBeGreaterThanOrEqual(0);
    expect(balance.mysl).toBeLessThanOrEqual(100);
    expect(balance.suggestion.length).toBeGreaterThan(0);
  });

  it("pusty zbior daje neutralne 50/50", () => {
    const balance = computeBalance([], [], []);
    expect(balance.wola).toBe(50);
    expect(balance.mysl).toBe(50);
  });
});

describe("Ranking feedu", () => {
  it("tryb chronologiczny sortuje od najnowszego", () => {
    const state = { ...seedState, feedMode: "chronologiczny" as const };
    const ranked = rankFeed(state);
    const times = ranked.map((r) => +new Date(r.post.createdAt));
    for (let i = 1; i < times.length; i += 1) {
      expect(times[i - 1]).toBeGreaterThanOrEqual(times[i]);
    }
  });

  it("kazdy komunikat ma co najmniej jeden powod rankingu", () => {
    for (const mode of ["chronologiczny", "tematyczny", "rownowaga"] as const) {
      const ranked = rankFeed({ ...seedState, feedMode: mode });
      for (const r of ranked) {
        expect(r.reasons.length).toBeGreaterThan(0);
      }
    }
  });

  it("suwak zmienia kolejnosc feedu rownowagi", () => {
    const wolaHeavy = rankFeed({ ...seedState, feedMode: "rownowaga", balance: 90 });
    const myslHeavy = rankFeed({ ...seedState, feedMode: "rownowaga", balance: 10 });
    expect(wolaHeavy.map((r) => r.post.id)).not.toEqual(myslHeavy.map((r) => r.post.id));
  });

  it("komunikaty prywatne sa widoczne tylko dla autora", () => {
    const privatePost = {
      ...seedState.posts[0],
      id: "p_test_private",
      authorId: "u_robert",
      visibility: "private" as const,
    };
    const state = { ...seedState, posts: [...seedState.posts, privatePost] };
    const visible = visiblePosts(state).map((p) => p.id);
    expect(visible).not.toContain("p_test_private");
  });
});

describe("Formatowanie i narzedzia", () => {
  it("czas wzgledny jest po polsku", () => {
    expect(relativeTime(new Date(NOW - 5 * 60_000).toISOString(), NOW)).toBe("5 minut temu");
    expect(relativeTime(new Date(NOW - 60 * 60_000).toISOString(), NOW)).toBe("1 godzina temu");
    expect(relativeTime(new Date(NOW - 26 * 60 * 60_000).toISOString(), NOW)).toBe("wczoraj");
  });

  it("clamp ogranicza wartosci", () => {
    expect(clamp(150, 0, 100)).toBe(100);
    expect(clamp(-5, 0, 100)).toBe(0);
    expect(clamp(50, 0, 100)).toBe(50);
  });
});
