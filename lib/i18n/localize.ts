import {
  seedCards,
  seedGroups,
  seedNotifications,
  seedPosts,
  seedReactions,
  seedReplies,
  seedReports,
  seedUsers,
} from "../data";
import type {
  AppNotification,
  FactorCard,
  Group,
  Post,
  Reaction,
  Reply,
  Report,
  StoreState,
  User,
} from "../types";
import { categoryDescription, topicLabel } from "./index";
import { EN_SEED } from "./content.en";
import type { Locale } from "./types";

/**
 * Buduje widok danych dla biezacego jezyka.
 *
 * Kanonem pozostaje polski seed w `lib/data.ts` (i zapisany stan w
 * localStorage). Widok podmienia tresc wylacznie tam, gdzie uzytkownik nie
 * wprowadzil wlasnych zmian - dzieki temu przełącznik jezyka nie niszczy
 * danych, a powrot do polskiego odtwarza oryginalny seed.
 */
export function localizeState(state: StoreState, locale: Locale): StoreState {
  if (locale === "pl") return state;

  const seedUserById = new Map(seedUsers.map((u) => [u.id, u]));
  const seedGroupById = new Map(seedGroups.map((g) => [g.id, g]));
  const seedPostById = new Map(seedPosts.map((p) => [p.id, p]));
  const seedCardById = new Map(seedCards.map((c) => [c.id, c]));
  const seedReactionById = new Map(seedReactions.map((r) => [r.id, r]));
  const seedReplyById = new Map(seedReplies.map((r) => [r.id, r]));
  const seedNotificationById = new Map(seedNotifications.map((n) => [n.id, n]));
  const seedReportById = new Map(seedReports.map((r) => [r.id, r]));

  const same = (a: string | undefined, b: string | undefined) => a === b;

  const users: User[] = state.users.map((user) => {
    const seed = seedUserById.get(user.id);
    const tr = EN_SEED.users[user.id];
    if (!seed || !tr) return user;
    const bio = tr.bio && same(user.bio, seed.bio) ? tr.bio : user.bio;
    return bio === user.bio ? user : { ...user, bio };
  });

  const groups: Group[] = state.groups.map((group) => {
    const seed = seedGroupById.get(group.id);
    const tr = EN_SEED.groups[group.id];
    if (!seed || !tr) return group;
    const name = tr.name && same(group.name, seed.name) ? tr.name : group.name;
    const description =
      tr.description && same(group.description, seed.description)
        ? tr.description
        : group.description;
    const rules =
      tr.rules && same(group.rules.join("|"), seed.rules.join("|"))
        ? tr.rules
        : group.rules;
    const topic = topicLabel(locale, group.topic);
    if (
      name === group.name &&
      description === group.description &&
      rules === group.rules &&
      topic === group.topic
    ) {
      return group;
    }
    return { ...group, name, description, rules, topic };
  });

  const posts: Post[] = state.posts.map((post) => {
    const seed = seedPostById.get(post.id);
    const tr = EN_SEED.posts[post.id];
    const mysl = tr?.mysl && seed && same(post.mysl, seed.mysl) ? tr.mysl : post.mysl;
    const czyn =
      tr?.czyn && seed && same(post.czyn, seed.czyn) ? tr.czyn : post.czyn;
    const topic = post.topic ? topicLabel(locale, post.topic) : post.topic;
    if (mysl === post.mysl && czyn === post.czyn && topic === post.topic) {
      return post;
    }
    return { ...post, mysl, czyn, topic };
  });

  const cards: FactorCard[] = state.cards.map((card) => {
    const seed = seedCardById.get(card.id);
    const tr = EN_SEED.cards[card.id];
    if (!seed || !tr) return localizeEngineCard(card, locale);

    const synthesis =
      tr.synthesis && same(card.synthesis, seed.synthesis) ? tr.synthesis : card.synthesis;
    const outcomeNote =
      tr.outcomeNote && same(card.outcomeNote, seed.outcomeNote)
        ? tr.outcomeNote
        : card.outcomeNote;

    const factors = card.factors.map((factor) => {
      const seedFactor = seed.factors.find((f) => f.id === factor.id);
      const factorTr = tr.factors?.[factor.id];
      if (!seedFactor || !factorTr) return factor;
      const description =
        factorTr.description && same(factor.description, seedFactor.description)
          ? factorTr.description
          : factor.description;
      const evidence =
        factorTr.evidence && same(factor.evidence, seedFactor.evidence)
          ? factorTr.evidence
          : factor.evidence;
      if (description === factor.description && evidence === factor.evidence) {
        return factor;
      }
      return { ...factor, description, evidence };
    });

    const variants = card.variants.map((variant) => {
      const seedVariant = seed.variants.find((v) => v.id === variant.id);
      const variantTr = tr.variants?.[variant.id];
      if (!seedVariant || !variantTr) return variant;
      const title =
        variantTr.title && same(variant.title, seedVariant.title)
          ? variantTr.title
          : variant.title;
      const description =
        variantTr.description && same(variant.description, seedVariant.description)
          ? variantTr.description
          : variant.description;
      const justification =
        variantTr.justification && same(variant.justification, seedVariant.justification)
          ? variantTr.justification
          : variant.justification;
      if (
        title === variant.title &&
        description === variant.description &&
        justification === variant.justification
      ) {
        return variant;
      }
      return { ...variant, title, description, justification };
    });

    if (
      synthesis === card.synthesis &&
      outcomeNote === card.outcomeNote &&
      factors.every((f, i) => f === card.factors[i]) &&
      variants.every((v, i) => v === card.variants[i])
    ) {
      return card;
    }
    return { ...card, synthesis, outcomeNote, factors, variants };
  });

  const reactions: Reaction[] = state.reactions.map((reaction) => {
    const seed = seedReactionById.get(reaction.id);
    const tr = EN_SEED.reactions[reaction.id];
    if (!seed || !tr) return reaction;
    const evidence =
      tr.evidence && same(reaction.evidence, seed.evidence)
        ? tr.evidence
        : reaction.evidence;
    return evidence === reaction.evidence ? reaction : { ...reaction, evidence };
  });

  const replies: Reply[] = state.replies.map((reply) => {
    const seed = seedReplyById.get(reply.id);
    const tr = EN_SEED.replies[reply.id];
    if (!seed || !tr) return reply;
    const body = tr.body && same(reply.body, seed.body) ? tr.body : reply.body;
    return body === reply.body ? reply : { ...reply, body };
  });

  const notifications: AppNotification[] = state.notifications.map((notification) => {
    const seed = seedNotificationById.get(notification.id);
    const tr = EN_SEED.notifications[notification.id];
    if (!seed || !tr) return notification;
    const text =
      tr.text && same(notification.text, seed.text) ? tr.text : notification.text;
    return text === notification.text ? notification : { ...notification, text };
  });

  const reports: Report[] = state.reports.map((report) => {
    const seed = seedReportById.get(report.id);
    const tr = EN_SEED.reports[report.id];
    if (!seed || !tr) return report;
    const details =
      tr.details && same(report.details, seed.details) ? tr.details : report.details;
    const resolutionNote =
      tr.resolutionNote && same(report.resolutionNote, seed.resolutionNote)
        ? tr.resolutionNote
        : report.resolutionNote;
    if (details === report.details && resolutionNote === report.resolutionNote) {
      return report;
    }
    return { ...report, details, resolutionNote };
  });

  return {
    ...state,
    users,
    groups,
    posts,
    cards,
    reactions,
    replies,
    notifications,
    reports,
  };
}

/**
 * Karty utworzone przez silnik (nowe posty) nie sa w seedzie, wiec tlumaczymy
 * tylko ich opisy czynnikow - one pochodza ze slownika kategorii. Opis
 * wariantow zostaje taki, jaki wygenerowano w chwili utworzenia karty.
 */
function localizeEngineCard(card: FactorCard, locale: Locale): FactorCard {
  const factors = card.factors.map((factor) => {
    const canonical = categoryDescription("pl", factor.category);
    if (factor.description !== canonical) return factor;
    return { ...factor, description: categoryDescription(locale, factor.category) };
  });
  if (factors.every((f, i) => f === card.factors[i])) return card;
  return { ...card, factors };
}
