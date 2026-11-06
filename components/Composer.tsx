"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n/provider";
import type { ActionStatus, CardMode, Visibility } from "@/lib/types";
import { cn } from "@/lib/utils";

const MYSL_LIMIT = 600;
const CZYN_LIMIT = 180;

const STATUSES: ActionStatus[] = ["planuje", "robię", "zrobiłem", "przerwałem"];
const VISIBILITIES: Visibility[] = ["public", "circle", "private"];
const TOPICS = ["Miasto", "Energia", "Edukacja", "Produkt", "Zdrowie", "Technologia"];

export function Composer() {
  const { view, createPost, currentUser } = useStore();
  const { t, labels } = useI18n();
  const [open, setOpen] = useState(false);
  const [mysl, setMysl] = useState("");
  const [czyn, setCzyn] = useState("");
  const [status, setStatus] = useState<ActionStatus | undefined>("robię");
  const [visibility, setVisibility] = useState<Visibility>("public");
  const [groupId, setGroupId] = useState<string | undefined>(undefined);
  const [topic, setTopic] = useState<string | undefined>(undefined);
  const [withCard, setWithCard] = useState(false);
  const [cardMode, setCardMode] = useState<CardMode>("A");
  const [message, setMessage] = useState("");

  const myslLeft = MYSL_LIMIT - mysl.length;
  const czynLeft = CZYN_LIMIT - czyn.length;
  const myGroups = view.groups.filter((g) => view.memberships[g.id]);

  function reset() {
    setMysl("");
    setCzyn("");
    setStatus("robię");
    setVisibility("public");
    setGroupId(undefined);
    setTopic(undefined);
    setWithCard(false);
    setCardMode("A");
    setMessage("");
  }

  function submit() {
    if (!mysl.trim()) {
      setMessage(t("composer.errorRequired"));
      return;
    }
    createPost({
      mysl: mysl.trim(),
      czyn: czyn.trim() || undefined,
      status,
      visibility,
      groupId,
      topic,
      withCard,
      cardMode,
    });
    reset();
    setOpen(false);
  }

  if (!open) {
    return (
      <section
        aria-labelledby="naglowek-tworzenia"
        className="rounded-lg border border-line bg-surface p-4 shadow-card"
      >
        <h2 id="naglowek-tworzenia" className="sr-only">
          {t("composer.heading")}
        </h2>
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: currentUser.hue }}
          >
            {currentUser.initials}
          </span>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex-1 rounded-md border border-line bg-paper px-4 py-2.5 text-left text-sm text-ink-muted transition-colors hover:border-ink-muted hover:bg-paper-deep"
          >
            {t("composer.prompt")}
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-line-soft pt-3 text-[11px] font-medium uppercase tracking-[0.06em] text-ink-muted">
          <span>{t("composer.limitThought", { limit: MYSL_LIMIT })}</span>
          <span>{t("composer.limitAction", { limit: CZYN_LIMIT })}</span>
          <span>{t("composer.cardOptional")}</span>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="naglowek-tworzenia"
      className="rounded-lg border border-mysl-line bg-surface shadow-raised"
    >
      <h2 id="naglowek-tworzenia" className="sr-only">
        {t("composer.heading")}
      </h2>

      <div className="flex items-center gap-3 border-b border-line-soft px-4 py-3">
        <span
          aria-hidden
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: currentUser.hue }}
        >
          {currentUser.initials}
        </span>
        <p className="text-sm font-semibold text-ink">
          @{currentUser.handle}
          <span className="ml-2 font-normal text-ink-muted">
            {labels.visibility(visibility).toLowerCase()}
          </span>
        </p>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            reset();
          }}
          className="ml-auto rounded-md px-2 py-1 text-sm text-ink-muted hover:bg-paper-deep hover:text-ink"
        >
          {t("composer.cancel")}
        </button>
      </div>

      <div className="space-y-4 px-4 py-4">
        <div>
          <div className="mb-1.5 flex items-baseline justify-between gap-2">
            <label htmlFor="pole-mysl" className="text-xs font-bold uppercase tracking-[0.08em] text-mysl">
              {t("composer.thoughtLabel")}
            </label>
            <span
              className={cn(
                "font-mono text-[11px] tabular-nums",
                myslLeft < 0 ? "font-bold text-alert" : "text-ink-muted",
              )}
            >
              {mysl.length}/{MYSL_LIMIT}
            </span>
          </div>
          <textarea
            id="pole-mysl"
            value={mysl}
            onChange={(e) => setMysl(e.target.value.slice(0, MYSL_LIMIT))}
            rows={4}
            placeholder={t("composer.thoughtPlaceholder")}
            aria-describedby="opis-mysl"
            className="w-full resize-y rounded-md border border-line bg-paper px-3 py-2.5 font-serif text-[15px] leading-relaxed text-ink placeholder:text-ink-muted/70 focus:border-mysl"
          />
          <p id="opis-mysl" className="mt-1 text-[11px] text-ink-muted">
            {t("composer.thoughtHint", { limit: MYSL_LIMIT })}
          </p>
        </div>

        <div>
          <div className="mb-1.5 flex items-baseline justify-between gap-2">
            <label htmlFor="pole-czyn" className="text-xs font-bold uppercase tracking-[0.08em] text-czyn">
              {t("composer.actionLabel")}
            </label>
            <span
              className={cn(
                "font-mono text-[11px] tabular-nums",
                czynLeft < 0 ? "font-bold text-alert" : "text-ink-muted",
              )}
            >
              {czyn.length}/{CZYN_LIMIT}
            </span>
          </div>
          <textarea
            id="pole-czyn"
            value={czyn}
            onChange={(e) => setCzyn(e.target.value.slice(0, CZYN_LIMIT))}
            rows={2}
            placeholder={t("composer.actionPlaceholder")}
            aria-describedby="opis-czyn"
            className="w-full resize-y rounded-md border border-line bg-paper px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted/70 focus:border-czyn"
          />
          <p id="opis-czyn" className="mt-1 text-[11px] text-ink-muted">
            {t("composer.actionHint", { limit: CZYN_LIMIT })}
          </p>
        </div>

        <fieldset className="rounded-md border border-line-soft bg-paper p-3">
          <legend className="px-1 text-[11px] font-bold uppercase tracking-[0.08em] text-ink-soft">
            {t("composer.contextLegend")}
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="pole-status" className="mb-1 block text-xs font-medium text-ink-soft">
                {t("composer.statusLabel")}
              </label>
              <select
                id="pole-status"
                value={status ?? ""}
                onChange={(e) =>
                  setStatus(e.target.value === "" ? undefined : (e.target.value as ActionStatus))
                }
                className="w-full rounded-md border border-line bg-surface px-2.5 py-2 text-sm text-ink"
              >
                <option value="">{t("composer.statusNone")}</option>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {labels.status(s)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pole-widocznosc" className="mb-1 block text-xs font-medium text-ink-soft">
                {t("composer.visibilityLabel")}
              </label>
              <select
                id="pole-widocznosc"
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as Visibility)}
                className="w-full rounded-md border border-line bg-surface px-2.5 py-2 text-sm text-ink"
              >
                {VISIBILITIES.map((v) => (
                  <option key={v} value={v}>
                    {labels.visibility(v)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pole-grupa" className="mb-1 block text-xs font-medium text-ink-soft">
                {t("composer.groupLabel")}
              </label>
              <select
                id="pole-grupa"
                value={groupId ?? ""}
                onChange={(e) => setGroupId(e.target.value || undefined)}
                className="w-full rounded-md border border-line bg-surface px-2.5 py-2 text-sm text-ink"
              >
                <option value="">{t("composer.groupNone")}</option>
                {myGroups.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pole-temat" className="mb-1 block text-xs font-medium text-ink-soft">
                {t("composer.topicLabel")}
              </label>
              <select
                id="pole-temat"
                value={topic ?? ""}
                onChange={(e) => setTopic(e.target.value || undefined)}
                className="w-full rounded-md border border-line bg-surface px-2.5 py-2 text-sm text-ink"
              >
                <option value="">{t("composer.topicNone")}</option>
                {TOPICS.map((topic) => (
                  <option key={topic} value={topic}>
                    {labels.topic(topic)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset className="rounded-md border border-line-soft bg-paper p-3">
          <legend className="px-1 text-[11px] font-bold uppercase tracking-[0.08em] text-ink-soft">
            {t("composer.cardLegend")}
          </legend>
          <label className="flex items-start gap-2.5 text-sm text-ink">
            <input
              type="checkbox"
              checked={withCard}
              onChange={(e) => setWithCard(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[var(--color-mysl)]"
            />
            <span>
              {t("composer.cardCheckbox")}
              <span className="mt-0.5 block text-[11px] text-ink-muted">
                {t("composer.cardHint")}
              </span>
            </span>
          </label>
          {withCard ? (
            <div
              className="mt-3 grid gap-2 sm:grid-cols-2"
              role="radiogroup"
              aria-label={t("composer.modeGroupLabel")}
            >
              {(
                [
                  {
                    mode: "A" as CardMode,
                    title: t("composer.modeATitle"),
                    desc: t("composer.modeADesc"),
                  },
                  {
                    mode: "B" as CardMode,
                    title: t("composer.modeBTitle"),
                    desc: t("composer.modeBDesc"),
                  },
                ]
              ).map((opt) => (
                <button
                  key={opt.mode}
                  type="button"
                  role="radio"
                  aria-checked={cardMode === opt.mode}
                  onClick={() => setCardMode(opt.mode)}
                  className={cn(
                    "rounded-md border px-3 py-2.5 text-left transition-colors",
                    cardMode === opt.mode
                      ? "border-mysl bg-mysl-soft"
                      : "border-line bg-surface hover:border-ink-muted",
                  )}
                >
                  <span className="block text-[13px] font-semibold text-ink">{opt.title}</span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-ink-muted">
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>
          ) : null}
        </fieldset>

        {message ? (
          <p role="alert" className="rounded-md bg-alert-soft px-3 py-2 text-sm text-alert">
            {message}
          </p>
        ) : null}

        <div className="flex items-center justify-between gap-3 border-t border-line-soft pt-3">
          <p className="text-[11px] text-ink-muted">{t("composer.publishNote")}</p>
          <button
            type="button"
            onClick={submit}
            className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-ink-soft"
          >
            {t("composer.publish")}
          </button>
        </div>
      </div>
    </section>
  );
}
