"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { balanceForGroup } from "@/lib/balance";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";
import { PostCard } from "@/components/PostCard";

type GroupTab = "watek" | "reguly" | "wskaźnik";

export default function GroupDetailPage() {
  const params = useParams<{ slug: string }>();
  const { view, toggleMembership } = useStore();
  const { t, time, locale, labels } = useI18n();
  const [tab, setTab] = useState<GroupTab>("watek");

  const group = view.groups.find((g) => g.slug === params.slug);

  if (!group) {
    return (
      <div className="rounded-lg border border-dashed border-line bg-surface px-4 py-10 text-center">
        <h1 className="text-lg font-bold text-ink">{t("group.notFound")}</h1>
        <p className="mt-1 text-sm text-ink-muted">
          {t("group.notFoundText", { slug: params.slug })}
        </p>
        <Link
          href="/grupy"
          className="mt-3 inline-block rounded-md bg-ink px-3.5 py-2 text-sm font-semibold text-paper"
        >
          {t("group.back")}
        </Link>
      </div>
    );
  }

  const balance = balanceForGroup(view, group.id, locale);
  const joined = view.memberships[group.id];
  const posts = view.posts.filter((p) => p.groupId === group.id);
  const founder = view.users.find((u) => u.role === "zalozyciel");

  return (
    <div className="space-y-5">
      <nav aria-label={t("group.breadcrumb")} className="text-[12px] text-ink-muted">
        <Link href="/grupy" className="hover:underline">
          {t("nav.groups")}
        </Link>
        <span aria-hidden> / </span>
        <span className="text-ink-soft">{group.name}</span>
      </nav>

      <header className="rounded-lg border border-line bg-surface p-5 shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink">{group.name}</h1>
            <p className="mt-1 text-[12px] font-medium uppercase tracking-[0.08em] text-ink-muted">
              {t("group.meta", {
                topic: group.topic,
                level: labels.moderation(group.moderationLevel),
                count: group.memberIds.length,
              })}
            </p>
          </div>
          <button
            type="button"
            onClick={() => toggleMembership(group.id)}
            aria-pressed={joined}
            className={cn(
              "rounded-md border px-3.5 py-2 text-[13px] font-semibold transition-colors",
              joined
                ? "border-ink bg-ink text-paper"
                : "border-line bg-paper text-ink-soft hover:border-ink-muted hover:text-ink",
            )}
          >
            {joined ? t("groups.leave") : t("groups.joinGroup")}
          </button>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-soft">{group.description}</p>
      </header>

      <div role="tablist" aria-label={t("group.tabsLabel")} className="flex gap-1.5">
        {(
          [
            { id: "watek" as const, label: t("group.tabThread") },
            { id: "reguly" as const, label: t("group.tabRules") },
            { id: "wskaźnik" as const, label: t("group.tabIndex") },
          ]
        ).map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            onClick={() => setTab(item.id)}
            className={cn(
              "rounded-md px-3 py-1.5 text-[13px] font-semibold transition-colors",
              tab === item.id
                ? "bg-ink text-paper"
                : "bg-surface text-ink-soft hover:bg-paper-deep hover:text-ink",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === "watek" ? (
        <div className="space-y-3">
          {posts.length === 0 ? (
            <p className="rounded-lg border border-dashed border-line bg-surface px-4 py-8 text-center text-sm text-ink-muted">
              {t("group.empty")}
            </p>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                reasons={[
                  {
                    label: t("rank.group", { name: group.name }),
                    detail: t("rank.groupPublished"),
                    source: "mysl",
                  },
                ]}
              />
            ))
          )}
        </div>
      ) : null}

      {tab === "reguly" ? (
        <section className="rounded-lg border border-line bg-surface p-5 shadow-card">
          <h2 className="text-base font-bold text-ink">{t("group.tabRules")}</h2>
          <p className="mt-1 text-[13px] text-ink-muted">{t("group.rulesIntro")}</p>
          <ol className="mt-3 space-y-2">
            {group.rules.map((rule, i) => (
              <li
                key={i}
                className="flex gap-2.5 rounded-md border border-line bg-paper px-3 py-2.5 text-[13px] leading-relaxed text-ink-soft"
              >
                <span className="font-mono text-[12px] font-bold text-ink-muted">{i + 1}.</span>
                {rule}
              </li>
            ))}
          </ol>
          <div className="mt-4 border-t border-line-soft pt-3">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-soft">
              {t("group.history")}
            </h3>
            <ul className="mt-1.5 space-y-1 text-[12px] text-ink-muted">
              <li>
                {t("group.historyFounded", {
                  time: time(group.createdAt),
                  name: founder?.name ?? labels.role("zalozyciel"),
                })}
              </li>
              <li>
                {t("group.historyRules", {
                  time: time(group.createdAt),
                  level: labels.moderation(group.moderationLevel),
                })}
              </li>
            </ul>
          </div>
        </section>
      ) : null}

      {tab === "wskaźnik" ? (
        <section className="rounded-lg border border-line bg-surface p-5 shadow-card">
          <h2 className="text-base font-bold text-ink">{t("group.indexTitle")}</h2>
          <p className="mt-1 text-[13px] text-ink-muted">{t("group.indexIntro")}</p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-md border border-czyn-line bg-czyn-soft/50 p-4">
              <div className="flex items-baseline justify-between">
                <h3 className="text-sm font-bold text-czyn-deep">{t("controls.will")}</h3>
                <span className="font-mono text-2xl font-bold text-czyn-deep">{balance.wola}</span>
              </div>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
                {t("group.willDesc")}
              </p>
            </div>
            <div className="rounded-md border border-mysl-line bg-mysl-soft/50 p-4">
              <div className="flex items-baseline justify-between">
                <h3 className="text-sm font-bold text-mysl-deep">{t("controls.thought")}</h3>
                <span className="font-mono text-2xl font-bold text-mysl-deep">{balance.mysl}</span>
              </div>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
                {t("group.thoughtDesc")}
              </p>
            </div>
          </div>

          <p className="mt-4 rounded-md border border-line bg-paper px-3 py-2.5 text-[13px] leading-relaxed text-ink-soft">
            <span className="font-semibold text-ink">{t("group.suggestion")}</span>{" "}
            {balance.suggestion}
          </p>

          <dl className="mt-4 grid gap-3 border-t border-line-soft pt-4 sm:grid-cols-3">
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.06em] text-ink-muted">
                {t("group.giniLabel")}
              </dt>
              <dd className="mt-0.5 font-mono text-lg font-bold text-ink">{balance.gini}</dd>
              <dd className="text-[11.5px] text-ink-muted">{t("group.giniHint")}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.06em] text-ink-muted">
                {t("group.participantsLabel")}
              </dt>
              <dd className="mt-0.5 font-mono text-lg font-bold text-ink">{balance.participants}</dd>
              <dd className="text-[11.5px] text-ink-muted">{t("group.participantsHint")}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.06em] text-ink-muted">
                {t("group.evidenceLabel")}
              </dt>
              <dd className="mt-0.5 font-mono text-lg font-bold text-ink">
                {Math.round(balance.evidenceShare * 100)}%
              </dd>
              <dd className="text-[11.5px] text-ink-muted">{t("group.evidenceHint")}</dd>
            </div>
          </dl>
        </section>
      ) : null}
    </div>
  );
}
