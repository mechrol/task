"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n/provider";
import type { ReactionKind } from "@/lib/types";
import { cn } from "@/lib/utils";

const KINDS: Array<{ kind: ReactionKind; tone: string }> = [
  { kind: "zgoda", tone: "border-ok/40 bg-ok-soft text-ok" },
  { kind: "watpliwosc", tone: "border-warn/40 bg-warn-soft text-warn" },
  { kind: "dowod", tone: "border-mysl/40 bg-mysl-soft text-mysl-deep" },
];

export function ReactionBar({ postId }: { postId: string }) {
  const { view, react, currentUser } = useStore();
  const { t, labels } = useI18n();
  const [pendingKind, setPendingKind] = useState<ReactionKind | null>(null);
  const [evidence, setEvidence] = useState("");

  const reactions = view.reactions.filter((r) => r.postId === postId);
  const mine = reactions.find((r) => r.userId === currentUser.id);

  const counts = KINDS.map((k) => ({
    ...k,
    count: reactions.filter((r) => r.kind === k.kind).length,
    mine: mine?.kind === k.kind,
  }));

  function choose(kind: ReactionKind) {
    if (kind === "dowod" && mine?.kind !== "dowod") {
      setPendingKind("dowod");
      setEvidence("");
      return;
    }
    setPendingKind(null);
    react(postId, kind, kind === "dowod" ? mine?.evidence : undefined);
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {counts.map((k) => {
        const active = k.mine;
        return (
          <button
            key={k.kind}
            type="button"
            onClick={() => choose(k.kind)}
            aria-pressed={active}
            title={t(
              k.kind === "zgoda"
                ? "reaction.agreeHint"
                : k.kind === "watpliwosc"
                  ? "reaction.doubtHint"
                  : "reaction.evidenceHint",
            )}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] font-semibold transition-colors",
              active
                ? k.tone
                : "border-line bg-surface text-ink-muted hover:border-ink-muted hover:text-ink",
            )}
          >
            {labels.reaction(k.kind)}
            <span className="tabular-nums">{k.count}</span>
          </button>
        );
      })}

      {pendingKind === "dowod" ? (
        <div className="mt-2 w-full rounded-md border border-mysl-line bg-mysl-soft/60 p-3">
          <label
            htmlFor={`dowod-${postId}`}
            className="block text-xs font-semibold text-mysl-deep"
          >
            {t("reaction.evidenceLabel")}
          </label>
          <textarea
            id={`dowod-${postId}`}
            value={evidence}
            onChange={(e) => setEvidence(e.target.value)}
            rows={2}
            placeholder={t("reaction.evidencePlaceholder")}
            className="mt-1.5 w-full resize-y rounded-md border border-mysl-line bg-surface px-2.5 py-2 text-sm text-ink placeholder:text-ink-muted/70"
          />
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => {
                if (evidence.trim().length < 8) return;
                react(postId, "dowod", evidence.trim());
                setPendingKind(null);
                setEvidence("");
              }}
              disabled={evidence.trim().length < 8}
              className="rounded-md bg-mysl px-3 py-1.5 text-[13px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t("reaction.submit")}
            </button>
            <button
              type="button"
              onClick={() => {
                setPendingKind(null);
                setEvidence("");
              }}
              className="rounded-md px-2.5 py-1.5 text-[13px] font-medium text-ink-muted hover:text-ink"
            >
              {t("reaction.cancel")}
            </button>
          </div>
          {evidence.trim().length < 8 ? (
            <p className="mt-1.5 text-[11px] text-ink-muted">{t("reaction.hint")}</p>
          ) : null}
        </div>
      ) : null}

      {mine?.evidence ? (
        <p className="w-full text-[11px] text-ink-muted">
          <span className="font-semibold text-ink-soft">{t("reaction.yourEvidence")}</span>{" "}
          {mine.evidence}
        </p>
      ) : null}
    </div>
  );
}
