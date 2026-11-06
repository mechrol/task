import type { Post, Reaction, Reply, StoreState } from "./types";
import { translate } from "./i18n";
import type { Locale } from "./types";

export interface BalanceIndex {
  wola: number;
  mysl: number;
  deviation: number;
  suggestion: string;
  gini: number;
  participants: number;
  evidenceShare: number;
}

/** Wspolczynnik Giniego dla rozkladu zasiegu (0 = idealnie rowny). */
export function gini(values: number[]): number {
  const sorted = [...values].filter((v) => v >= 0).sort((a, b) => a - b);
  const n = sorted.length;
  if (n === 0) return 0;
  const total = sorted.reduce((a, b) => a + b, 0);
  if (total === 0) return 0;
  let cumulative = 0;
  for (let i = 0; i < n; i += 1) cumulative += (i + 1) * sorted[i];
  return (2 * cumulative) / (n * total) - (n + 1) / n;
}

function reachByAuthor(posts: Post[], reactions: Reaction[], replies: Reply[]): number[] {
  const map = new Map<string, number>();
  for (const post of posts) {
    const own = reactions.filter((r) => r.postId === post.id).length;
    const answer = replies.filter((r) => r.postId === post.id).length;
    map.set(post.authorId, (map.get(post.authorId) ?? 0) + 1 + own * 0.5 + answer * 0.75);
  }
  return [...map.values()];
}

/**
 * Wskaznik Rownowagi (PRD 8.3) dla zbioru komunikatow.
 *
 * W (Wola): roznorodnosc zrodel, swoboda ustawien, niski udzial usunietych.
 * M (Mysl): rownomiernosc zasiegu (Gini), udzial roznych uczestnikow
 *            w dyskusji, udzial argumentow z dowodem.
 */
export function computeBalance(
  posts: Post[],
  reactions: Reaction[],
  replies: Reply[],
  locale: Locale = "pl",
): BalanceIndex {
  if (posts.length === 0) {
    return {
      wola: 50,
      mysl: 50,
      deviation: 0,
      suggestion: translate(locale, "balance.suggestion.empty"),
      gini: 0,
      participants: 0,
      evidenceShare: 0,
    };
  }

  const authors = new Set(posts.map((p) => p.authorId));
  const diversity = authors.size / posts.length;

  const visibilityFreedom =
    posts.reduce((acc, p) => {
      if (p.visibility === "public") return acc + 1;
      if (p.visibility === "circle") return acc + 0.6;
      return acc + 0.3;
    }, 0) / posts.length;

  const removedShare = 0; // brak usuwania tresci w demo
  const wola = Math.round(
    Math.min(100, Math.max(0, (diversity * 55 + visibilityFreedom * 45) * (1 - removedShare))),
  );

  const reach = reachByAuthor(posts, reactions, replies);
  const g = gini(reach);
  const evenness = 1 - g;

  const participants = new Set([
    ...posts.map((p) => p.authorId),
    ...replies.map((r) => r.authorId),
    ...reactions.map((r) => r.userId),
  ]).size;
  const participation = Math.min(1, participants / Math.max(4, posts.length * 2));

  const evidenceShare = reactions.length
    ? reactions.filter((r) => r.kind === "dowod").length / reactions.length
    : 0;

  const mysl = Math.round(
    Math.min(100, Math.max(0, evenness * 45 + participation * 30 + evidenceShare * 25)),
  );

  const deviation = wola - mysl;
  let suggestion: string;
  if (deviation > 15) {
    suggestion = translate(locale, "balance.suggestion.dominant");
  } else if (deviation < -15) {
    suggestion = translate(locale, "balance.suggestion.restrictive");
  } else {
    suggestion = translate(locale, "balance.suggestion.balanced");
  }

  return {
    wola,
    mysl,
    deviation,
    suggestion,
    gini: Number(g.toFixed(3)),
    participants,
    evidenceShare: Number(evidenceShare.toFixed(2)),
  };
}

export function balanceForGroup(
  state: StoreState,
  groupId: string,
  locale: Locale = "pl",
): BalanceIndex {
  const posts = state.posts.filter((p) => p.groupId === groupId);
  const postIds = new Set(posts.map((p) => p.id));
  return computeBalance(
    posts,
    state.reactions.filter((r) => postIds.has(r.postId)),
    state.replies.filter((r) => postIds.has(r.postId)),
    locale,
  );
}

export function balanceForThread(
  state: StoreState,
  postId: string,
  locale: Locale = "pl",
): BalanceIndex {
  const posts = state.posts.filter((p) => p.id === postId);
  return computeBalance(
    posts,
    state.reactions.filter((r) => r.postId === postId),
    state.replies.filter((r) => r.postId === postId),
    locale,
  );
}

export function balanceForFeed(state: StoreState, locale: Locale = "pl"): BalanceIndex {
  return computeBalance(state.posts, state.reactions, state.replies, locale);
}
