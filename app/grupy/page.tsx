"use client";

import Link from "next/link";
import { balanceForGroup } from "@/lib/balance";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

export default function GroupsPage() {
  const { view, toggleMembership } = useStore();
  const { t, locale, labels } = useI18n();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-ink">{t("groups.title")}</h1>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-soft">
          {t("groups.intro")}
        </p>
      </header>

      <ul className="grid gap-4 md:grid-cols-2">
        {view.groups.map((group) => {
          const balance = balanceForGroup(view, group.id, locale);
          const joined = view.memberships[group.id];
          const posts = view.posts.filter((p) => p.groupId === group.id).length;
          const founder = view.users.find((u) => u.role === "zalozyciel");

          return (
            <li
              key={group.id}
              className="flex flex-col rounded-lg border border-line bg-surface p-4 shadow-card"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link
                    href={`/grupy/${group.slug}`}
                    className="text-base font-bold text-ink hover:underline"
                  >
                    {group.name}
                  </Link>
                  <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.08em] text-ink-muted">
                    {group.topic} · {t("groups.moderation", { level: labels.moderation(group.moderationLevel) })}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleMembership(group.id)}
                  aria-pressed={joined}
                  className={cn(
                    "shrink-0 rounded-md border px-3 py-1.5 text-[12px] font-semibold transition-colors",
                    joined
                      ? "border-ink bg-ink text-paper"
                      : "border-line bg-paper text-ink-soft hover:border-ink-muted hover:text-ink",
                  )}
                >
                  {joined ? t("groups.member") : t("groups.join")}
                </button>
              </div>

              <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{group.description}</p>

              <dl className="mt-3 grid grid-cols-3 gap-2 border-t border-line-soft pt-3 text-center">
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.06em] text-ink-muted">
                    {t("groups.will")}
                  </dt>
                  <dd className="font-mono text-sm font-bold text-czyn-deep">{balance.wola}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.06em] text-ink-muted">
                    {t("groups.thought")}
                  </dt>
                  <dd className="font-mono text-sm font-bold text-mysl-deep">{balance.mysl}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.06em] text-ink-muted">
                    {t("groups.posts")}
                  </dt>
                  <dd className="font-mono text-sm font-bold text-ink-soft">{posts}</dd>
                </div>
              </dl>

              <div className="mt-3">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-soft">
                  {t("groups.rules")}
                </h3>
                <ul className="mt-1.5 space-y-1">
                  {group.rules.map((rule, i) => (
                    <li key={i} className="flex gap-1.5 text-[12px] leading-snug text-ink-soft">
                      <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-muted" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-3 border-t border-line-soft pt-2 text-[11px] text-ink-muted">
                {t("groups.meta", {
                  count: group.memberIds.length,
                  founder: founder?.name ?? t("label.role.zalozyciel"),
                })}{" "}
                · {balance.suggestion}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
