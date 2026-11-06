"use client";

import { useStore } from "@/lib/store";
import { balanceForFeed } from "@/lib/balance";
import { useI18n } from "@/lib/i18n/provider";
import type { TranslationKey } from "@/lib/i18n";
import type { FeedMode } from "@/lib/types";
import { cn } from "@/lib/utils";

const MODES: Array<{ value: FeedMode; labelKey: TranslationKey; hintKey: TranslationKey }> = [
  {
    value: "chronologiczny",
    labelKey: "controls.mode.chronological",
    hintKey: "controls.mode.chronologicalHint",
  },
  {
    value: "tematyczny",
    labelKey: "controls.mode.topical",
    hintKey: "controls.mode.topicalHint",
  },
  {
    value: "rownowaga",
    labelKey: "controls.mode.balance",
    hintKey: "controls.mode.balanceHint",
  },
];

export function FeedControls() {
  const { view, setFeedMode, setBalance } = useStore();
  const { t, locale } = useI18n();
  const balance = balanceForFeed(view, locale);
  const isBalanced = view.feedMode === "rownowaga";
  const wolaPercent = Math.round(view.balance);
  const myslPercent = 100 - wolaPercent;

  return (
    <section
      aria-labelledby="naglowek-ustawienia-feedu"
      className="rounded-lg border border-line bg-surface p-4 shadow-card"
    >
      <h2 id="naglowek-ustawienia-feedu" className="text-sm font-bold text-ink">
        {t("controls.title")}
      </h2>
      <p className="mt-0.5 text-[12px] text-ink-muted">{t("controls.intro")}</p>

      <div
        role="radiogroup"
        aria-label={t("controls.modeLabel")}
        className="mt-3 grid gap-2 sm:grid-cols-3"
      >
        {MODES.map((mode) => {
          const active = view.feedMode === mode.value;
          return (
            <button
              key={mode.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setFeedMode(mode.value)}
              className={cn(
                "rounded-md border px-3 py-2.5 text-left transition-colors",
                active
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-paper text-ink-soft hover:border-ink-muted",
              )}
            >
              <span className="block text-[13px] font-semibold">{t(mode.labelKey)}</span>
              <span
                className={cn(
                  "mt-0.5 block text-[11px] leading-snug",
                  active ? "text-paper/70" : "text-ink-muted",
                )}
              >
                {t(mode.hintKey)}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-md border border-line bg-paper p-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <label htmlFor="suwak-rownowagi" className="text-xs font-bold uppercase tracking-[0.08em] text-ink-soft">
            {t("controls.sliderLabel")}
          </label>
          <p className="text-[11px] font-medium tabular-nums text-ink-muted">
            {t("controls.percent", { wola: wolaPercent, mysl: myslPercent })}
          </p>
        </div>

        <input
          id="suwak-rownowagi"
          type="range"
          min={0}
          max={100}
          step={5}
          value={view.balance}
          onChange={(e) => setBalance(Number(e.target.value))}
          aria-valuetext={t("controls.sliderValueText", { wola: wolaPercent, mysl: myslPercent })}
          aria-describedby="opis-suwaka"
          className="mt-2.5 w-full accent-[var(--color-mysl)]"
        />
        <div className="mt-1 flex items-center justify-between text-[11px] font-semibold">
          <span className="text-czyn-deep">{t("controls.moreWill")}</span>
          <span className="text-mysl-deep">{t("controls.moreThought")}</span>
        </div>
        <p id="opis-suwaka" className="mt-1.5 text-[11.5px] leading-snug text-ink-muted">
          {t("controls.sliderDesc")}
        </p>
        {!isBalanced ? (
          <p className="mt-1.5 text-[11.5px] font-medium text-warn">
            {t("controls.sliderInactive")} {` `}
            <button
              type="button"
              onClick={() => setFeedMode("rownowaga")}
              className="underline underline-offset-2 hover:text-ink"
            >
              {t("controls.sliderEnable")}
            </button>
          </p>
        ) : null}
      </div>

      <div className="mt-3 rounded-md border border-line bg-paper p-3">
        <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-ink-soft">
          {t("controls.balanceIndex")}
        </h3>
        <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-[12px] font-semibold text-czyn-deep">{t("controls.will")}</span>
              <span className="font-mono text-[12px] tabular-nums text-ink-soft">{balance.wola}</span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-line">
              <div className="h-full rounded-full bg-czyn" style={{ width: `${balance.wola}%` }} />
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-[12px] font-semibold text-mysl-deep">{t("controls.thought")}</span>
              <span className="font-mono text-[12px] tabular-nums text-ink-soft">{balance.mysl}</span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-line">
              <div className="h-full rounded-full bg-mysl" style={{ width: `${balance.mysl}%` }} />
            </div>
          </div>
        </div>
        <p className="mt-2 text-[12px] leading-snug text-ink-soft">{balance.suggestion}</p>
        <p className="mt-1 text-[11px] text-ink-muted">
          {t("controls.balanceStats", {
            gini: balance.gini,
            participants: balance.participants,
            evidence: Math.round(balance.evidenceShare * 100),
          })}
        </p>
      </div>
    </section>
  );
}
