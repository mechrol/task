"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n/provider";
import type { Factor } from "@/lib/types";

export function ReplyThread({
  postId,
  factors,
}: {
  postId: string;
  factors: Factor[];
}) {
  const { view, reply } = useStore();
  const { t, time } = useI18n();
  const [body, setBody] = useState("");
  const [factorId, setFactorId] = useState<string>("");
  const [open, setOpen] = useState(false);

  const replies = view.replies
    .filter((r) => r.postId === postId)
    .sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));

  function submit() {
    if (!body.trim()) return;
    reply(postId, body.trim(), factorId || undefined);
    setBody("");
    setFactorId("");
    setOpen(false);
  }

  return (
    <div className="border-t border-line-soft pt-3">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-xs font-bold uppercase tracking-[0.08em] text-ink-soft">
          {t("reply.title", { count: replies.length })}
        </h4>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="rounded-md border border-line px-2.5 py-1 text-[12px] font-semibold text-ink-soft hover:border-ink-muted hover:text-ink"
        >
          {open ? t("reply.cancel") : t("reply.open")}
        </button>
      </div>

      {open ? (
        <div className="mt-3 rounded-md border border-line bg-paper p-3">
          <label htmlFor={`odpowiedz-${postId}`} className="sr-only">
            {t("reply.label")}
          </label>
          <textarea
            id={`odpowiedz-${postId}`}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            placeholder={t("reply.placeholder")}
            className="w-full resize-y rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-muted/70"
          />
          {factors.length > 0 ? (
            <div className="mt-2">
              <label
                htmlFor={`czynnik-${postId}`}
                className="mb-1 block text-[11px] font-medium text-ink-soft"
              >
                {t("reply.isFactor")}
              </label>
              <select
                id={`czynnik-${postId}`}
                value={factorId}
                onChange={(e) => setFactorId(e.target.value)}
                className="w-full rounded-md border border-line bg-surface px-2.5 py-2 text-sm text-ink"
              >
                <option value="">{t("reply.notFactor")}</option>
                {factors.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.description.slice(0, 70)}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
          <div className="mt-2.5 flex justify-end">
            <button
              type="button"
              onClick={submit}
              disabled={!body.trim()}
              className="rounded-md bg-ink px-3.5 py-1.5 text-[13px] font-semibold text-paper disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t("reply.submit")}
            </button>
          </div>
        </div>
      ) : null}

      {replies.length > 0 ? (
        <ul className="mt-3 space-y-2.5">
          {replies.map((r) => {
            const author = view.users.find((u) => u.id === r.authorId);
            const linked = factors.find((f) => f.id === r.factorId);
            return (
              <li key={r.id} className="flex gap-2.5">
                <span
                  aria-hidden
                  className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-[10px] font-bold text-white"
                  style={{ backgroundColor: author?.hue ?? "#666" }}
                >
                  {author?.initials ?? "?"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] leading-snug text-ink">
                    <span className="font-semibold">{author?.name ?? t("post.unknownAuthor")}</span>{" "}
                    <span className="text-[11px] text-ink-muted">
                      <time dateTime={r.createdAt} suppressHydrationWarning>
                        {time(r.createdAt)}
                      </time>
                    </span>
                  </p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-ink-soft">{r.body}</p>
                  {linked ? (
                    <p className="mt-1 inline-flex items-center gap-1 rounded border border-mysl-line bg-mysl-soft px-1.5 py-0.5 text-[10px] font-semibold text-mysl-deep">
                      {t("reply.factorBadge", { text: linked.description.slice(0, 52) })}
                    </p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mt-2 text-[12px] text-ink-muted">{t("reply.empty")}</p>
      )}
    </div>
  );
}
