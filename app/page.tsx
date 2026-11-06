"use client";

import { useMemo } from "react";
import { Composer } from "@/components/Composer";
import { FeedControls } from "@/components/FeedControls";
import { PostCard } from "@/components/PostCard";
import { rankFeed } from "@/lib/rank";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n/provider";

export default function FeedPage() {
  const { view } = useStore();
  const { t, tp, locale, labels } = useI18n();
  const ranked = useMemo(() => rankFeed(view, locale), [view, locale]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0 space-y-4">
        <Composer />
        <FeedControls />

        <section aria-labelledby="naglowek-feed" className="space-y-3">
          <div className="flex items-baseline justify-between gap-3">
            <h2 id="naglowek-feed" className="text-sm font-bold text-ink">
              {t("feed.heading")}
            </h2>
            <p className="text-[12px] text-ink-muted">
              {tp("feed.count", ranked.length)}
            </p>
          </div>

          {ranked.length === 0 ? (
            <p className="rounded-lg border border-dashed border-line bg-surface px-4 py-8 text-center text-sm text-ink-muted">
              {t("feed.empty")}
            </p>
          ) : (
            ranked.map(({ post, reasons }) => (
              <PostCard key={post.id} post={post} reasons={reasons} />
            ))
          )}
        </section>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
        <section className="rounded-lg border border-line bg-surface p-4 shadow-card">
          <h2 className="text-sm font-bold text-ink">{t("feed.how.title")}</h2>
          <ol className="mt-2 space-y-2.5 text-[12.5px] leading-relaxed text-ink-soft">
            <li>
              <span className="font-semibold text-ink">Myśl.</span> {t("feed.how.thought")}
            </li>
            <li>
              <span className="font-semibold text-ink">Czyn.</span> {t("feed.how.action")}
            </li>
            <li>
              <span className="font-semibold text-ink">Karta Czynników.</span>{" "}
              {t("feed.how.card")}
            </li>
            <li>
              <span className="font-semibold text-ink">Wynik.</span> {t("feed.how.outcome")}
            </li>
          </ol>
        </section>

        <section className="rounded-lg border border-line bg-surface p-4 shadow-card">
          <h2 className="text-sm font-bold text-ink">{t("feed.reactions.title")}</h2>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
            {t("feed.reactions.intro")}
          </p>
          <ul className="mt-2 space-y-1.5 text-[12.5px] text-ink-soft">
            <li>
              <span className="font-semibold text-ok">{labels.reaction("zgoda")}</span> -{" "}
              {t("feed.reactions.agree")}
            </li>
            <li>
              <span className="font-semibold text-warn">{labels.reaction("watpliwosc")}</span> -{" "}
              {t("feed.reactions.doubt")}
            </li>
            <li>
              <span className="font-semibold text-mysl-deep">{labels.reaction("dowod")}</span> -{" "}
              {t("feed.reactions.evidence")}
            </li>
          </ul>
        </section>

        <section className="rounded-lg border border-line bg-surface p-4 shadow-card">
          <h2 className="text-sm font-bold text-ink">{t("feed.groups.title")}</h2>
          <ul className="mt-2 space-y-2">
            {view.groups.map((g) => {
              const joined = view.memberships[g.id];
              return (
                <li key={g.id} className="flex items-start gap-2">
                  <span
                    aria-hidden
                    className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-mysl-soft text-[10px] font-bold text-mysl-deep"
                  >
                    {g.name.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12.5px] font-semibold text-ink">{g.name}</span>
                    <span className="block text-[11px] text-ink-muted">
                      {g.topic} · {joined ? t("feed.groups.member") : t("feed.groups.join")}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      </aside>
    </div>
  );
}
