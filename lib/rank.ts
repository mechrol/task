import type { Post, RankReason, StoreState } from "./types";
import { isMissingEvidence, translate } from "./i18n";
import type { Locale } from "./types";

export interface RankedPost {
  post: Post;
  reasons: RankReason[];
  qualityScore: number;
  wolaScore: number;
  myslScore: number;
}

/**
 * Ranking feedu (PRD 8.4).
 *
 * - chronologiczny: sama data
 * - tematyczny: grupowanie wg tematu, w ramach tematu wg jakości argumentacji
 * - rownowaga: mieszanka komunikatow z kregu (wola) i wysokiej jakosci
 *   argumentacji z innych kregow (mysl), proporcja sterowana suwakiem
 */
export function rankFeed(state: StoreState, locale: Locale = "pl"): RankedPost[] {
  const visible = visiblePosts(state);
  switch (state.feedMode) {
    case "chronologiczny":
      return visible
        .map((post) => ({ post, reasons: chronoReasons(post, state, locale), qualityScore: quality(state, post), wolaScore: wola(state, post), myslScore: mysl(state, post) }))
        .sort((a, b) => +new Date(b.post.createdAt) - +new Date(a.post.createdAt));
    case "tematyczny":
      return visible
        .map((post) => ({ post, reasons: topicReasons(post, state, locale), qualityScore: quality(state, post), wolaScore: wola(state, post), myslScore: mysl(state, post) }))
        .sort((a, b) => {
          const topicA = a.post.topic ?? "Inne";
          const topicB = b.post.topic ?? "Inne";
          if (topicA !== topicB) return topicA.localeCompare(topicB, locale === "en" ? "en" : "pl");
          return b.qualityScore - a.qualityScore || +new Date(b.post.createdAt) - +new Date(a.post.createdAt);
        });
    case "rownowaga":
    default:
      return rankBalanced(state, visible, locale);
  }
}

/** Komunikaty widoczne dla biezacego uzytkownika (PRD 8.1: widocznosc nalezna do autora). */
export function visiblePosts(state: StoreState): Post[] {
  const me = state.users.find((u) => u.id === state.currentUserId);
  if (!me) return state.posts;
  return state.posts.filter((p) => {
    if (p.visibility === "public") return true;
    if (p.visibility === "private") return p.authorId === me.id;
    return p.authorId === me.id || me.circle.includes(p.authorId) || me.following.includes(p.authorId);
  });
}

function quality(state: StoreState, post: Post): number {
  const card = state.cards.find((c) => c.postId === post.id);
  const factors = card?.factors.length ?? 0;
  const withEvidence = card?.factors.filter((f) => f.evidence && !isMissingEvidence(f.evidence)).length ?? 0;
  const evidenceReactions = state.reactions.filter((r) => r.postId === post.id && r.kind === "dowod").length;
  const replies = state.replies.filter((r) => r.postId === post.id).length;
  const doubt = state.reactions.filter((r) => r.postId === post.id && r.kind === "watpliwosc").length;
  return factors * 2 + withEvidence * 3 + evidenceReactions * 4 + replies * 1.5 + doubt;
}

function wola(state: StoreState, post: Post): number {
  const me = state.users.find((u) => u.id === state.currentUserId);
  if (!me) return 0;
  let score = 0;
  if (me.circle.includes(post.authorId)) score += 60;
  else if (me.following.includes(post.authorId)) score += 35;
  if (post.visibility === "circle") score += 20;
  if (post.groupId && state.memberships[post.groupId]) score += 15;
  return score;
}

function mysl(state: StoreState, post: Post): number {
  const card = state.cards.find((c) => c.postId === post.id);
  const factors = card?.factors.length ?? 0;
  const withEvidence = card?.factors.filter((f) => f.evidence && !isMissingEvidence(f.evidence)).length ?? 0;
  const evidenceReactions = state.reactions.filter((r) => r.postId === post.id && r.kind === "dowod").length;
  const variants = card?.variants.length ?? 0;
  return factors * 8 + withEvidence * 12 + evidenceReactions * 10 + variants * 6;
}

function rankBalanced(state: StoreState, visible: Post[], locale: Locale = "pl"): RankedPost[] {
  const balance = state.balance; // 0 = 100% mysl, 100 = 100% wola
  const wolaShare = balance / 100;

  const scored = visible.map((post) => ({
    post,
    wolaScore: wola(state, post),
    myslScore: mysl(state, post),
    qualityScore: quality(state, post),
    reasons: [] as RankReason[],
  }));

  // Kandidaci: silne w obu wymiarach (z mojego kregu + z argumentacja)
  const candidates = scored.filter((s) => s.wolaScore + s.myslScore > 0);

  const ranked: RankedPost[] = [];
  const used = new Set<string>();

  const wolaPool = candidates
    .filter((s) => s.wolaScore >= 35)
    .sort((a, b) => b.wolaScore - a.wolaScore);
  const myslPool = candidates
    .filter((s) => s.myslScore >= 15)
    .sort((a, b) => b.myslScore - a.myslScore);

  let wolaIndex = 0;
  let myslIndex = 0;

  const wolaTarget = Math.round(candidates.length * wolaShare);

  while (ranked.length < candidates.length) {
    const wantWola =
      ranked.length === 0
        ? wolaShare >= 0.5
        : ranked.filter((r) => r.reasons.some((x) => x.source === "wola")).length < wolaTarget;
    const pool = wantWola ? wolaPool : myslPool;
    let index = wantWola ? wolaIndex : myslIndex;
    let picked: (typeof candidates)[number] | undefined;
    while (index < pool.length && used.has(pool[index].post.id)) index += 1;
    if (index < pool.length) {
      picked = pool[index];
      used.add(picked.post.id);
      if (wantWola) wolaIndex = index + 1;
      else myslIndex = index + 1;
    } else {
      const fallback = candidates.find((s) => !used.has(s.post.id));
      if (!fallback) break;
      picked = fallback;
      used.add(fallback.post.id);
    }
    ranked.push({
      post: picked.post,
      reasons: balanceReasons(picked.post, state, wantWola, locale),
      qualityScore: picked.qualityScore,
      wolaScore: picked.wolaScore,
      myslScore: picked.myslScore,
    });
  }

  // Reszta (niskie wskazniki) na koncu, chronologicznie
  const rest = scored
    .filter((s) => !used.has(s.post.id))
    .sort((a, b) => +new Date(b.post.createdAt) - +new Date(a.post.createdAt))
    .map((s) => ({
      post: s.post,
      reasons: [
        {
          label: translate(locale, "rank.lowReach"),
          detail: translate(locale, "rank.lowReachDetail"),
          source: "neutral" as const,
        },
      ],
      qualityScore: s.qualityScore,
      wolaScore: s.wolaScore,
      myslScore: s.myslScore,
    }));

  return [...ranked, ...rest];
}

function chronoReasons(post: Post, state: StoreState, locale: Locale = "pl"): RankReason[] {
  const reasons: RankReason[] = [
    {
      label: translate(locale, "rank.chrono"),
      detail: translate(locale, "rank.chronoDetail"),
      source: "wola",
    },
  ];
  const group = state.groups.find((g) => g.id === post.groupId);
  if (group) {
    reasons.push({
      label: translate(locale, "rank.group", { name: group.name }),
      detail: translate(locale, "rank.groupDetail"),
      source: "mysl",
    });
  }
  return reasons;
}

function topicReasons(post: Post, state: StoreState, locale: Locale = "pl"): RankReason[] {
  const reasons: RankReason[] = [
    {
      label: translate(locale, "rank.topic", { topic: post.topic ?? translate(locale, "label.noTopic") }),
      detail: translate(locale, "rank.topicDetail"),
      source: "mysl",
    },
  ];
  const card = state.cards.find((c) => c.postId === post.id);
  if (card) {
    reasons.push({
      label: translate(locale, "rank.card", { count: card.factors.length }),
      detail: translate(locale, "rank.cardDetail"),
      source: "mysl",
    });
  }
  return reasons;
}

function balanceReasons(
  post: Post,
  state: StoreState,
  fromWola: boolean,
  locale: Locale = "pl",
): RankReason[] {
  const reasons: RankReason[] = [];
  const me = state.users.find((u) => u.id === state.currentUserId);

  if (fromWola && me?.circle.includes(post.authorId)) {
    reasons.push({
      label: translate(locale, "rank.circle"),
      detail: translate(locale, "rank.circleDetail"),
      source: "wola",
    });
  } else if (fromWola) {
    reasons.push({
      label: translate(locale, "rank.following"),
      detail: translate(locale, "rank.followingDetail"),
      source: "wola",
    });
  }

  const card = state.cards.find((c) => c.postId === post.id);
  if (card) {
    const withEvidence = card.factors.filter((f) => f.evidence && !isMissingEvidence(f.evidence)).length;
    reasons.push({
      label: translate(locale, "rank.evidenceArgs", { count: withEvidence }),
      detail:
        withEvidence > 0
          ? translate(locale, "rank.evidenceArgsDetail")
          : translate(locale, "rank.evidenceArgsEmpty"),
      source: "mysl",
    });
  }

  const evidenceReactions = state.reactions.filter((r) => r.postId === post.id && r.kind === "dowod").length;
  if (evidenceReactions > 0) {
    reasons.push({
      label: translate(locale, "rank.evidenceReactions", { count: evidenceReactions }),
      detail: translate(locale, "rank.evidenceReactionsDetail"),
      source: "mysl",
    });
  }

  const replies = state.replies.filter((r) => r.postId === post.id).length;
  if (replies > 0) {
    reasons.push({
      label: translate(locale, "rank.repliesCount", { count: replies }),
      detail: translate(locale, "rank.repliesDetail"),
      source: "mysl",
    });
  }

  if (reasons.length === 0) {
    reasons.push({
      label: translate(locale, "rank.equalReach"),
      detail: translate(locale, "rank.equalReachDetail"),
      source: "neutral",
    });
  }

  return reasons;
}
