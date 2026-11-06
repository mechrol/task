"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n/provider";
import { criticalFactors } from "@/lib/engine";
import { isMissingEvidence } from "@/lib/i18n";
import type { Factor, FactorCard, Outcome } from "@/lib/types";
import { cn } from "@/lib/utils";

const OUTCOMES: Outcome[] = ["potwierdzone", "czesciowo", "obalone"];
const CATEGORIES: Factor["category"][] = [
  "zasoby",
  "ryzyka",
  "zaleznosci",
  "zalozenia",
  "odbiorcy",
  "czas",
];

function WeightDots({ value, label }: { value: number; label: string }) {
  const { t } = useI18n();
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={t("factor.scale", { label, value })}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          aria-hidden
          className={cn(
            "h-1.5 w-3 rounded-[2px]",
            n <= value ? "bg-mysl" : "bg-line",
          )}
        />
      ))}
      <span className="ml-1 font-mono text-[10px] text-ink-muted">{value}/5</span>
    </span>
  );
}

function FactorRow({
  card,
  factor,
  critical,
  editable,
}: {
  card: FactorCard;
  factor: Factor;
  critical: boolean;
  editable: boolean;
}) {
  const { updateFactor, removeFactor } = useStore();
  const { t, labels } = useI18n();
  const [expanded, setExpanded] = useState(false);

  return (
    <li
      className={cn(
        "rounded-md border bg-surface px-3 py-2.5",
        critical ? "border-alert/35 bg-alert-soft/40" : "border-line",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="tag border border-line bg-paper text-ink-soft">
              {labels.category(factor.category)}
            </span>
            {factor.source === "silnik" ? (
              <span className="tag border border-mysl-line bg-mysl-soft text-mysl-deep">
                {t("factor.engineProposal")}
              </span>
            ) : null}
            {critical ? (
              <span className="tag border border-alert/40 bg-alert-soft text-alert">
                {t("factor.critical")}
              </span>
            ) : null}
          </div>
          <p className="mt-1.5 text-[13px] font-medium leading-snug text-ink">
            {factor.description}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <span className="inline-flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-ink-muted">
                {t("factor.weight")}
              </span>
              <WeightDots value={factor.weight} label={t("factor.weight")} />
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-ink-muted">
                {t("factor.confidence")}
              </span>
              <WeightDots value={factor.confidence} label={t("factor.confidence")} />
            </span>
          </div>
          <p className="mt-1.5 text-[11px] leading-snug text-ink-muted">
            <span className="font-semibold text-ink-soft">{t("factor.evidenceLabel")}:</span>{" "}
            {factor.evidence?.trim() || t("factor.noEvidence")}
          </p>
        </div>

        {editable ? (
          <div className="flex shrink-0 gap-1">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="rounded-md border border-line px-2 py-1 text-[11px] font-semibold text-ink-soft hover:border-ink-muted hover:text-ink"
            >
              {expanded ? t("factor.close") : t("factor.edit")}
            </button>
          </div>
        ) : null}
      </div>

      {expanded && editable ? (
        <div className="mt-3 space-y-2.5 border-t border-line-soft pt-3">
          <div>
            <label htmlFor={`opis-${factor.id}`} className="mb-1 block text-[11px] font-medium text-ink-soft">
              {t("factor.descriptionLabel")}
            </label>
            <input
              id={`opis-${factor.id}`}
              defaultValue={factor.description}
              onBlur={(e) => {
                if (e.target.value.trim() && e.target.value !== factor.description) {
                  updateFactor(card.id, factor.id, { description: e.target.value.trim() });
                }
              }}
              className="w-full rounded-md border border-line bg-paper px-2.5 py-1.5 text-[13px] text-ink"
            />
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2">
            <div>
              <label htmlFor={`waga-${factor.id}`} className="mb-1 block text-[11px] font-medium text-ink-soft">
                {t("factor.weightRange")}
              </label>
              <input
                id={`waga-${factor.id}`}
                type="range"
                min={1}
                max={5}
                step={1}
                value={factor.weight}
                onChange={(e) =>
                  updateFactor(card.id, factor.id, { weight: Number(e.target.value) })
                }
                className="w-full accent-[var(--color-mysl)]"
              />
            </div>
            <div>
              <label
                htmlFor={`pewnosc-${factor.id}`}
                className="mb-1 block text-[11px] font-medium text-ink-soft"
              >
                {t("factor.confidenceRange")}
              </label>
              <input
                id={`pewnosc-${factor.id}`}
                type="range"
                min={1}
                max={5}
                step={1}
                value={factor.confidence}
                onChange={(e) =>
                  updateFactor(card.id, factor.id, { confidence: Number(e.target.value) })
                }
                className="w-full accent-[var(--color-mysl)]"
              />
            </div>
          </div>
          <div>
            <label htmlFor={`dowod-${factor.id}`} className="mb-1 block text-[11px] font-medium text-ink-soft">
              {t("factor.evidenceInputLabel")}
            </label>
            <input
              id={`dowod-${factor.id}`}
              defaultValue={factor.evidence ?? ""}
              placeholder={t("factor.evidencePlaceholder")}
              onBlur={(e) => updateFactor(card.id, factor.id, { evidence: e.target.value.trim() })}
              className="w-full rounded-md border border-line bg-paper px-2.5 py-1.5 text-[13px] text-ink placeholder:text-ink-muted/70"
            />
          </div>
          <button
            type="button"
            onClick={() => removeFactor(card.id, factor.id)}
            className="rounded-md border border-alert/40 px-2.5 py-1 text-[11px] font-semibold text-alert hover:bg-alert-soft"
          >
            {t("factor.remove")}
          </button>
        </div>
      ) : null}
    </li>
  );
}

function VariantList({ card }: { card: FactorCard }) {
  const { voteVariant, currentUser } = useStore();
  const { t, labels } = useI18n();

  if (card.variants.length === 0) return null;

  const maxVotes = Math.max(...card.variants.map((v) => v.votes.length), 1);

  return (
    <div className="mt-4">
      <h4 className="text-xs font-bold uppercase tracking-[0.08em] text-ink-soft">
        {t("factor.variantsTitle", { count: card.variants.length })}
      </h4>
      <ul className="mt-2 space-y-2">
        {card.variants.map((v) => {
          const voted = v.votes.includes(currentUser.id);
          const linked = card.factors.filter((f) => v.factorIds.includes(f.id));
          return (
            <li key={v.id} className="rounded-md border border-line bg-paper px-3 py-2.5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-ink">{v.title}</p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">{v.description}</p>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-muted">
                    <span className="font-semibold text-ink-soft">{t("factor.justificationLabel")}</span>{" "}
                    {v.justification}
                  </p>
                  {linked.length > 0 ? (
                    <p className="mt-1.5 text-[10.5px] leading-snug text-ink-muted">
                      {t("factor.basedOn", {
                        list: linked.map((f) => labels.category(f.category)).join(", "),
                      })}
                    </p>
                  ) : null}
                </div>
                <div className="shrink-0 text-right">
                  <button
                    type="button"
                    onClick={() => voteVariant(card.id, v.id)}
                    aria-pressed={voted}
                    className={cn(
                      "rounded-md border px-2.5 py-1.5 text-[12px] font-bold tabular-nums transition-colors",
                      voted
                        ? "border-mysl bg-mysl text-white"
                        : "border-line bg-surface text-ink-soft hover:border-ink-muted hover:text-ink",
                    )}
                  >
                    {v.votes.length}
                    <span className="sr-only">
                      {t("factor.votesSr", { title: v.title })}
                    </span>
                  </button>
                  <div
                    aria-hidden
                    className="mt-1.5 h-1 w-14 overflow-hidden rounded-full bg-line"
                  >
                    <div
                      className="h-full rounded-full bg-mysl"
                      style={{ width: `${(v.votes.length / maxVotes) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-1.5 text-[11px] text-ink-muted">{t("factor.voteNote")}</p>
    </div>
  );
}

function OutcomePanel({ card }: { card: FactorCard }) {
  const { closeOutcome } = useStore();
  const { t, labels } = useI18n();
  const [note, setNote] = useState(card.outcomeNote ?? "");
  const [factorId, setFactorId] = useState(card.outcomeFactorId ?? "");
  const [outcome, setOutcome] = useState<Outcome | undefined>(card.outcome);

  return (
    <div className="mt-4 rounded-md border border-ok/35 bg-ok-soft/50 p-3">
      <h4 className="text-xs font-bold uppercase tracking-[0.08em] text-ok">
        {t("factor.outcomeTitle")}
      </h4>
      {card.outcome ? (
        <div className="mt-2">
          <p className="text-[13px] font-semibold text-ink">
            {t("factor.outcomeValue", { value: labels.outcome(card.outcome) })}
          </p>
          {card.outcomeFactorId ? (
            <p className="mt-1 text-[12px] text-ink-soft">
              {t("factor.decidingFactor")}{" "}
              <span className="font-medium text-ink">
                {card.factors.find((f) => f.id === card.outcomeFactorId)?.description ?? "—"}
              </span>
            </p>
          ) : null}
          {card.outcomeNote ? (
            <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">{card.outcomeNote}</p>
          ) : null}
          <p className="mt-1.5 text-[11px] text-ink-muted">{t("factor.learningNote")}</p>
          <button
            type="button"
            onClick={() => closeOutcome(card.id, card.outcome!, card.outcomeFactorId, card.outcomeNote)}
            className="mt-2 rounded-md border border-line bg-surface px-2.5 py-1 text-[11px] font-semibold text-ink-soft hover:border-ink-muted hover:text-ink"
          >
            {t("factor.undoClose")}
          </button>
        </div>
      ) : (
        <div className="mt-2 space-y-2.5">
          <fieldset>
            <legend className="mb-1.5 text-[11px] font-medium text-ink-soft">
              {t("factor.outcomeStatusLegend")}
            </legend>
            <div className="flex flex-wrap gap-1.5">
              {OUTCOMES.map((o) => (
                <label
                  key={o}
                  className={cn(
                    "cursor-pointer rounded-full border px-2.5 py-1 text-[12px] font-semibold transition-colors",
                    outcome === o
                      ? "border-ok bg-ok text-white"
                      : "border-line bg-surface text-ink-soft hover:border-ink-muted",
                  )}
                >
                  <input
                    type="radio"
                    name={`wynik-${card.id}`}
                    value={o}
                    checked={outcome === o}
                    onChange={() => setOutcome(o)}
                    className="sr-only"
                  />
                  {labels.outcome(o)}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label
              htmlFor={`czynnik-wynik-${card.id}`}
              className="mb-1 block text-[11px] font-medium text-ink-soft"
            >
              {t("factor.whichFactor")}
            </label>
            <select
              id={`czynnik-wynik-${card.id}`}
              value={factorId}
              onChange={(e) => setFactorId(e.target.value)}
              className="w-full rounded-md border border-line bg-surface px-2.5 py-2 text-[13px] text-ink"
            >
              <option value="">{t("factor.dontKnow")}</option>
              {card.factors.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.description.slice(0, 70)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor={`notatka-${card.id}`}
              className="mb-1 block text-[11px] font-medium text-ink-soft"
            >
              {t("factor.whatHappened")}
            </label>
            <textarea
              id={`notatka-${card.id}`}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder={t("factor.whatHappenedPlaceholder")}
              className="w-full resize-y rounded-md border border-line bg-surface px-2.5 py-2 text-[13px] text-ink placeholder:text-ink-muted/70"
            />
          </div>

          <button
            type="button"
            disabled={!outcome}
            onClick={() => closeOutcome(card.id, outcome!, factorId || undefined, note.trim() || undefined)}
            className="rounded-md bg-ok px-3 py-1.5 text-[13px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t("factor.closeWithOutcome")}
          </button>
        </div>
      )}
    </div>
  );
}

export function FactorCardView({ card }: { card: FactorCard }) {
  const { view, addFactor } = useStore();
  const { t, labels } = useI18n();
  const [showAdd, setShowAdd] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Factor["category"]>("zasoby");

  const isAuthor = view.currentUserId === card.postId;
  const post = view.posts.find((p) => p.id === card.postId);
  const canEdit = post ? view.currentUserId === post.authorId : isAuthor;
  const critical = criticalFactors(card.factors);
  const withEvidence = card.factors.filter((f) => f.evidence && !isMissingEvidence(f.evidence));

  function addManualFactor() {
    if (!description.trim()) return;
    addFactor(card.id, {
      category,
      description: description.trim(),
      weight: 3,
      confidence: 2,
    });
    setDescription("");
    setShowAdd(false);
  }

  return (
    <section
      aria-label={t("factor.cardLabel")}
      className="mt-3 overflow-hidden rounded-lg border border-mysl-line bg-mysl-soft/30"
    >
      <header className="flex flex-wrap items-center gap-2 border-b border-mysl-line/70 bg-mysl-soft/60 px-3 py-2">
        <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-mysl-deep">
          {t("factor.cardTitle", { mode: card.mode })}
        </h3>
        <span className="tag border border-mysl-line bg-surface text-mysl-deep">
          {card.mode === "A" ? t("factor.modeA") : t("factor.modeB")}
        </span>
        <span className="ml-auto text-[11px] font-medium text-ink-muted">
          {t("factor.counts", { count: card.factors.length, withEvidence: withEvidence.length })}
        </span>
      </header>

      <div className="px-3 py-3">
        {card.synthesis ? (
          <p className="rounded-md border border-mysl-line/60 bg-surface px-3 py-2 text-[13px] leading-relaxed text-ink-soft">
            <span className="font-semibold text-mysl-deep">{t("factor.synthesisLabel")}</span>{" "}
            {card.synthesis}
          </p>
        ) : null}

        {critical.length > 0 ? (
          <p className="mt-2.5 rounded-md border border-alert/30 bg-alert-soft/70 px-3 py-2 text-[12.5px] leading-relaxed text-ink-soft">
            <span className="font-semibold text-alert">{t("factor.criticalLabel")}</span>{" "}
            {critical.map((f) => f.description).join("; ")}. {t("factor.criticalTail")}
          </p>
        ) : null}

        <ul className="mt-3 space-y-2">
          {card.factors.map((f) => (
            <FactorRow
              key={f.id}
              card={card}
              factor={f}
              critical={critical.some((c) => c.id === f.id)}
              editable={canEdit}
            />
          ))}
        </ul>

        {canEdit ? (
          <div className="mt-2.5">
            {showAdd ? (
              <div className="rounded-md border border-line bg-surface p-3">
                <label
                  htmlFor={`nowy-czynnik-${card.id}`}
                  className="mb-1 block text-[11px] font-medium text-ink-soft"
                >
                  {t("factor.newFactor")}
                </label>
                <input
                  id={`nowy-czynnik-${card.id}`}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t("factor.newFactorPlaceholder")}
                  className="w-full rounded-md border border-line bg-paper px-2.5 py-2 text-[13px] text-ink placeholder:text-ink-muted/70"
                />
                <div className="mt-2">
                  <label
                    htmlFor={`kategoria-${card.id}`}
                    className="mb-1 block text-[11px] font-medium text-ink-soft"
                  >
                    {t("factor.categoryLabel")}
                  </label>
                  <select
                    id={`kategoria-${card.id}`}
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Factor["category"])}
                    className="w-full rounded-md border border-line bg-paper px-2.5 py-2 text-[13px] text-ink"
                  >
                    {CATEGORIES.map((key) => (
                      <option key={key} value={key}>
                        {labels.category(key)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-2.5 flex gap-2">
                  <button
                    type="button"
                    onClick={addManualFactor}
                    disabled={!description.trim()}
                    className="rounded-md bg-mysl px-3 py-1.5 text-[13px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {t("factor.add")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAdd(false)}
                    className="rounded-md px-2.5 py-1.5 text-[13px] font-medium text-ink-muted hover:text-ink"
                  >
                    {t("composer.cancel")}
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowAdd(true)}
                className="rounded-md border border-dashed border-mysl-line px-3 py-1.5 text-[12px] font-semibold text-mysl-deep hover:bg-mysl-soft"
              >
                {t("factor.addManual")}
              </button>
            )}
          </div>
        ) : null}

        <VariantList card={card} />

        {canEdit ? <OutcomePanel card={card} /> : null}

        <p className="mt-3 border-t border-mysl-line/60 pt-2 text-[10.5px] leading-snug text-ink-muted">
          {t("factor.engineFooter")}
        </p>
      </div>
    </section>
  );
}
