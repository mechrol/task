"use client";

import { useState } from "react";
import { balanceForFeed } from "@/lib/balance";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const { state, view, currentUser, reset } = useStore();
  const { t, locale, labels } = useI18n();
  const [confirmReset, setConfirmReset] = useState(false);

  const balance = balanceForFeed(view, locale);
  const myPosts = view.posts.filter((p) => p.authorId === currentUser.id);
  const myCards = view.cards.filter((c) => myPosts.some((p) => p.id === c.postId));
  const closedCards = myCards.filter((c) => c.outcome);

  // Wiedza o czynnikach: średnia waga i pewność po zamkniętych wątkach
  const learned = closedCards
    .filter((c) => c.outcomeFactorId)
    .map((c) => c.factors.find((f) => f.id === c.outcomeFactorId))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));

  const byCategory = learned.reduce<Record<string, number>>((acc, f) => {
    acc[f.category] = (acc[f.category] ?? 0) + 1;
    return acc;
  }, {});

  const exportData = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "task-mvp-dane.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      <header className="rounded-lg border border-line bg-surface p-5 shadow-card">
        <div className="flex flex-wrap items-start gap-4">
          <span
            aria-hidden
            className="grid h-16 w-16 shrink-0 place-items-center rounded-full text-xl font-bold text-white"
            style={{ backgroundColor: currentUser.hue }}
          >
            {currentUser.initials}
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold tracking-tight text-ink">{currentUser.name}</h1>
            <p className="text-[13px] text-ink-muted">@{currentUser.handle}</p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">{currentUser.bio}</p>
            <p className="mt-2 text-[11.5px] text-ink-muted">
              {t("profile.stats", {
                posts: myPosts.length,
                cards: myCards.length,
                closed: closedCards.length,
                following: currentUser.following.length,
                circle: currentUser.circle.length,
              })}
            </p>
          </div>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-lg border border-line bg-surface p-4 shadow-card">
          <h2 className="text-sm font-bold text-ink">{t("profile.knowledgeTitle")}</h2>
          <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">
            {t("profile.knowledgeIntro")}
          </p>
          {learned.length === 0 ? (
            <p className="mt-3 text-[12.5px] text-ink-muted">{t("profile.knowledgeEmpty")}</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {Object.entries(byCategory)
                .sort((a, b) => b[1] - a[1])
                .map(([category, count]) => (
                  <li key={category} className="flex items-center gap-3">
                    <span className="w-24 shrink-0 text-[12px] font-medium text-ink-soft">
                      {labels.category(category)}
                    </span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-line">
                      <span
                        className="block h-full rounded-full bg-mysl"
                        style={{ width: `${(count / learned.length) * 100}%` }}
                      />
                    </span>
                    <span className="w-6 shrink-0 text-right font-mono text-[12px] tabular-nums text-ink-soft">
                      {count}
                    </span>
                  </li>
                ))}
            </ul>
          )}
        </section>

        <section className="rounded-lg border border-line bg-surface p-4 shadow-card">
          <h2 className="text-sm font-bold text-ink">{t("profile.settingsTitle")}</h2>
          <dl className="mt-2 space-y-2 text-[12.5px]">
            <div className="flex items-baseline justify-between gap-3 border-b border-line-soft pb-2">
              <dt className="text-ink-soft">{t("profile.feedMode")}</dt>
              <dd className="font-semibold text-ink">
                {t(
                  view.feedMode === "rownowaga"
                    ? "controls.mode.balance"
                    : view.feedMode === "tematyczny"
                      ? "controls.mode.topical"
                      : "controls.mode.chronological",
                )}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-3 border-b border-line-soft pb-2">
              <dt className="text-ink-soft">{t("profile.slider")}</dt>
              <dd className="font-mono font-semibold tabular-nums text-ink">
                {view.balance}% / {100 - view.balance}%
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-3 border-b border-line-soft pb-2">
              <dt className="text-ink-soft">{t("profile.balance")}</dt>
              <dd className="font-mono font-semibold tabular-nums text-ink">
                W {balance.wola} · M {balance.mysl}
              </dd>
            </div>
          </dl>

          <div className="mt-4 flex flex-wrap gap-2 border-t border-line-soft pt-3">
            <button
              type="button"
              onClick={exportData}
              className="rounded-md border border-line bg-paper px-3 py-1.5 text-[12.5px] font-semibold text-ink-soft hover:border-ink-muted hover:text-ink"
            >
              {t("profile.export")}
            </button>
            {confirmReset ? (
              <span className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setConfirmReset(false);
                  }}
                  className="rounded-md bg-alert px-3 py-1.5 text-[12.5px] font-semibold text-white"
                >
                  {t("profile.resetYes")}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="rounded-md px-2.5 py-1.5 text-[12.5px] font-medium text-ink-muted hover:text-ink"
                >
                  {t("profile.cancel")}
                </button>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="rounded-md border border-alert/40 px-3 py-1.5 text-[12.5px] font-semibold text-alert hover:bg-alert-soft"
              >
                {t("profile.reset")}
              </button>
            )}
          </div>
        </section>
      </div>

      {myCards.length > 0 ? (
        <section className="rounded-lg border border-line bg-surface p-4 shadow-card">
          <h2 className="text-sm font-bold text-ink">{t("profile.cardsTitle")}</h2>
          <ul className="mt-2 space-y-2">
            {myCards.map((card) => {
              const post = view.posts.find((p) => p.id === card.postId);
              return (
                <li
                  key={card.id}
                  className={cn(
                    "rounded-md border px-3 py-2.5",
                    card.outcome ? "border-ok/35 bg-ok-soft/40" : "border-line bg-paper",
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[12.5px] font-semibold text-ink">
                      {t("profile.cardMeta", { mode: card.mode, count: card.factors.length })}
                      {card.variants.length > 0
                        ? t("profile.cardMetaVariants", { count: card.variants.length })
                        : ""}
                    </span>
                    {card.outcome ? (
                      <span className="tag border border-ok/40 bg-ok-soft text-ok">
                        {labels.outcome(card.outcome)}
                      </span>
                    ) : (
                      <span className="tag border border-warn/40 bg-warn-soft text-warn">
                        {t("profile.open")}
                      </span>
                    )}
                  </div>
                  {post ? (
                    <p className="mt-1 line-clamp-2 text-[12.5px] leading-snug text-ink-soft">
                      {post.mysl}
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
