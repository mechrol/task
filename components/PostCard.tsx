"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n/provider";
import type { Post, RankReason, ReportReason } from "@/lib/types";
import { cn } from "@/lib/utils";
import { FactorCardView } from "./FactorCard";
import { ReactionBar } from "./ReactionBar";
import { ReplyThread } from "./ReplyThread";

const REPORT_REASONS: ReportReason[] = [
  "prawo",
  "zasady-grupy",
  "spam",
  "przemoc",
  "inne",
];

function WhyThisPost({ reasons }: { reasons: RankReason[] }) {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();
  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md border border-line px-2 py-1 text-[11px] font-semibold text-ink-muted hover:border-ink-muted hover:text-ink"
      >
        {t("post.why.title")}
      </button>
    );
  }
  return (
    <div className="w-full rounded-md border border-line bg-paper p-3">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-soft">
          {t("post.why.title")}
        </h4>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-md px-1.5 py-0.5 text-[11px] font-medium text-ink-muted hover:text-ink"
        >
          {t("post.why.close")}
        </button>
      </div>
      <ul className="mt-2 space-y-1.5">
        {reasons.map((r, i) => (
          <li key={i} className="flex gap-2">
            <span
              aria-hidden
              className={cn(
                "mt-1 h-2 w-2 shrink-0 rounded-full",
                r.source === "wola" ? "bg-czyn" : r.source === "mysl" ? "bg-mysl" : "bg-ink-muted",
              )}
            />
            <span>
              <span className="text-[12.5px] font-semibold text-ink">{r.label}</span>
              <span className="block text-[11.5px] leading-snug text-ink-muted">{r.detail}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[10.5px] text-ink-muted">{t("post.why.legend")}</p>
    </div>
  );
}

function ReportDialog({ postId, onClose }: { postId: string; onClose: () => void }) {
  const { reportPost } = useStore();
  const { t, labels } = useI18n();
  const [reason, setReason] = useState<ReportReason>("zasady-grupy");
  const [details, setDetails] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="w-full rounded-md border border-ok/35 bg-ok-soft px-3 py-2.5">
        <p className="text-[12.5px] font-medium text-ok">{t("report.sent")}</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-1.5 rounded-md border border-line bg-surface px-2.5 py-1 text-[11px] font-semibold text-ink-soft"
        >
          {t("post.why.close")}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full rounded-md border border-alert/35 bg-alert-soft/60 p-3">
      <h4 className="text-[11px] font-bold uppercase tracking-[0.08em] text-alert">
        {t("report.title")}
      </h4>
      <fieldset className="mt-2">
        <legend className="sr-only">{t("report.reasonLegend")}</legend>
        <div className="flex flex-wrap gap-1.5">
          {REPORT_REASONS.map((r) => (
            <label
              key={r}
              className={cn(
                "cursor-pointer rounded-full border px-2.5 py-1 text-[12px] font-semibold",
                reason === r
                  ? "border-alert bg-alert text-white"
                  : "border-line bg-surface text-ink-soft hover:border-ink-muted",
              )}
            >
              <input
                type="radio"
                name={`powod-${postId}`}
                value={r}
                checked={reason === r}
                onChange={() => setReason(r)}
                className="sr-only"
              />
              {labels.reportReason(r)}
            </label>
          ))}
        </div>
      </fieldset>
      <label htmlFor={`opis-zgloszenia-${postId}`} className="sr-only">
        {t("report.detailsLabel")}
      </label>
      <textarea
        id={`opis-zgloszenia-${postId}`}
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        rows={2}
        placeholder={t("report.detailsPlaceholder")}
        className="mt-2 w-full resize-y rounded-md border border-line bg-surface px-2.5 py-2 text-[13px] text-ink placeholder:text-ink-muted/70"
      />
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={() => {
            reportPost(postId, reason, details.trim() || undefined);
            setSent(true);
          }}
          className="rounded-md bg-alert px-3 py-1.5 text-[13px] font-semibold text-white"
        >
          {t("report.send")}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md px-2.5 py-1.5 text-[13px] font-medium text-ink-muted hover:text-ink"
        >
          {t("report.cancel")}
        </button>
      </div>
    </div>
  );
}

export function PostCard({
  post,
  reasons,
}: {
  post: Post;
  reasons: RankReason[];
}) {
  const { view, currentUser } = useStore();
  const { t, tp, labels, time } = useI18n();
  const [reporting, setReporting] = useState(false);

  const author = view.users.find((u) => u.id === post.authorId);
  const group = view.groups.find((g) => g.id === post.groupId);
  const card = view.cards.find((c) => c.id === post.factorCardId);
  const replyCount = view.replies.filter((r) => r.postId === post.id).length;
  const reactionCount = view.reactions.filter((r) => r.postId === post.id).length;
  const mine = view.reactions.find(
    (r) => r.postId === post.id && r.userId === currentUser.id,
  );
  const outcome = card?.outcome;

  return (
    <article className="overflow-hidden rounded-lg border border-line bg-surface shadow-card transition-shadow hover:shadow-raised">
      <header className="flex items-start gap-3 px-4 pt-3.5">
        <span
          aria-hidden
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: author?.hue ?? "#666" }}
        >
          {author?.initials ?? "?"}
        </span>
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-x-1.5 text-[13px]">
            <span className="font-semibold text-ink">{author?.name ?? t("post.unknownAuthor")}</span>
            {author?.verified ? (
              <span
                title={t("post.verified.title")}
                className="grid h-3.5 w-3.5 place-items-center rounded-full bg-mysl text-[8px] font-bold text-white"
              >
                ✓
                <span className="sr-only">{t("post.verified.sr")}</span>
              </span>
            ) : null}
            <span className="text-ink-muted">@{author?.handle ?? "nieznany"}</span>
          </p>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-ink-muted">
            <time dateTime={post.createdAt} suppressHydrationWarning>
              {time(post.createdAt)}
            </time>
            {group ? (
              <>
                <span aria-hidden>·</span>
                <Link
                  href={`/grupy/${group.slug}`}
                  className="font-medium text-mysl hover:underline"
                >
                  {group.name}
                </Link>
              </>
            ) : null}
            {post.topic ? (
              <>
                <span aria-hidden>·</span>
                <span className="font-medium">{post.topic}</span>
              </>
            ) : null}
            <span aria-hidden>·</span>
            <span>{labels.visibility(post.visibility)}</span>
          </p>
        </div>
        {post.status ? (
          <span
            className={cn(
              "tag shrink-0 border",
              post.status === "zrobiłem"
                ? "border-ok/40 bg-ok-soft text-ok"
                : post.status === "przerwałem"
                  ? "border-alert/40 bg-alert-soft text-alert"
                  : "border-czyn-line bg-czyn-soft text-czyn-deep",
            )}
          >
            {labels.status(post.status)}
          </span>
        ) : null}
      </header>

      <div className="px-4 pb-3 pt-3">
        {/* Warstwa myśli */}
        <div className="layer-mysl">{post.mysl}</div>

        {/* Warstwa czynu */}
        {post.czyn ? (
          <div className="mt-2.5 flex gap-2.5 rounded-md border-l-[3px] border-czyn bg-czyn-soft/55 py-2 pl-3 pr-2.5">
            <span className="mt-0.5 shrink-0 text-[10px] font-bold uppercase tracking-[0.1em] text-czyn-deep">
              {t("post.actionLabel")}
            </span>
            <p className="layer-czyn">{post.czyn}</p>
          </div>
        ) : null}

        {outcome ? (
          <p className="mt-2.5 inline-flex items-center gap-1.5 rounded-md border border-ok/35 bg-ok-soft px-2.5 py-1 text-[12px] font-semibold text-ok">
            {t("post.outcomePrefix", { value: labels.outcome(outcome) })}
          </p>
        ) : null}
      </div>

      {card ? <FactorCardView card={card} /> : null}

      <div className="mt-3 border-t border-line-soft px-4 py-3">
        <ReactionBar postId={post.id} />
        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-ink-muted">
            {tp("post.reactions", reactionCount)} · {tp("post.replies", replyCount)}
            {mine ? t("post.mineReaction") : ""}
          </span>
          <div className="ml-auto flex flex-wrap items-center gap-1.5">
            <WhyThisPost reasons={reasons} />
            <button
              type="button"
              onClick={() => setReporting((v) => !v)}
              aria-expanded={reporting}
              className="rounded-md border border-line px-2 py-1 text-[11px] font-semibold text-ink-muted hover:border-ink-muted hover:text-ink"
            >
              {t("post.report")}
            </button>
          </div>
        </div>
        {reporting ? (
          <div className="mt-2">
            <ReportDialog postId={post.id} onClose={() => setReporting(false)} />
          </div>
        ) : null}
      </div>

      <div className="px-4 pb-4">
        <ReplyThread postId={post.id} factors={card?.factors ?? []} />
      </div>
    </article>
  );
}
