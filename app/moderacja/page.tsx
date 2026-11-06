"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n/provider";
import type { ReportStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function ModerationPage() {
  const { view, resolveReport } = useStore();
  const { t, time, labels } = useI18n();
  const [filter, setFilter] = useState<"wszystkie" | ReportStatus>("wszystkie");

  const reports = view.reports
    .filter((r) => filter === "wszystkie" || r.status === filter)
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

  const pending = view.reports.filter((r) => r.status === "oczekuje").length;

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-ink">{t("moderation.title")}</h1>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-soft">
          {t("moderation.intro")}
        </p>
      </header>

      <div
        role="group"
        aria-label={t("moderation.filterLabel")}
        className="flex flex-wrap gap-1.5"
      >
        {(
          [
            {
              id: "wszystkie" as const,
              label: t("moderation.filterAll", { count: view.reports.length }),
            },
            {
              id: "oczekuje" as const,
              label: t("moderation.filterPending", { count: pending }),
            },
            { id: "przyjeta" as const, label: t("moderation.filterAccepted") },
            { id: "odrzucona" as const, label: t("moderation.filterRejected") },
          ]
        ).map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              "rounded-full border px-3 py-1 text-[12px] font-semibold transition-colors",
              filter === f.id
                ? "border-ink bg-ink text-paper"
                : "border-line bg-surface text-ink-soft hover:border-ink-muted hover:text-ink",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {reports.length === 0 ? (
        <p className="rounded-lg border border-dashed border-line bg-surface px-4 py-10 text-center text-sm text-ink-muted">
          {t("moderation.empty")}
        </p>
      ) : (
        <ul className="space-y-3">
          {reports.map((report) => {
            const post = view.posts.find((p) => p.id === report.postId);
            const reporter = view.users.find((u) => u.id === report.reporterId);
            return (
              <li
                key={report.id}
                className="rounded-lg border border-line bg-surface p-4 shadow-card"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className={cn(
                          "tag border",
                          report.status === "oczekuje"
                            ? "border-warn/40 bg-warn-soft text-warn"
                            : report.status === "przyjeta"
                              ? "border-ok/40 bg-ok-soft text-ok"
                              : "border-line bg-paper text-ink-muted",
                        )}
                      >
                        {labels.reportStatus(report.status)}
                      </span>
                      <span className="tag border border-line bg-paper text-ink-soft">
                        {labels.reportReason(report.reason)}
                      </span>
                    </div>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
                      {report.details ?? t("moderation.noDetails")}
                    </p>
                    <p className="mt-1 text-[11.5px] text-ink-muted">
                      {t("moderation.reportedBy", { name: reporter?.name ?? t("post.unknownAuthor") })}{" "}
                      <time dateTime={report.createdAt}>{time(report.createdAt)}</time>
                    </p>
                    {post ? (
                      <blockquote className="mt-2 border-l-[3px] border-line bg-paper px-3 py-2 text-[12.5px] leading-relaxed text-ink-soft">
                        {post.mysl}
                      </blockquote>
                    ) : null}
                    {report.resolutionNote ? (
                      <p className="mt-2 rounded-md border border-line bg-paper px-3 py-2 text-[12px] text-ink-soft">
                        <span className="font-semibold text-ink">{t("moderation.decisionNote")}</span>{" "}
                        {report.resolutionNote}
                      </p>
                    ) : null}
                  </div>

                  {report.status === "oczekuje" ? (
                    <div className="flex shrink-0 flex-col gap-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          resolveReport(report.id, "przyjeta", t("moderation.acceptNote"))
                        }
                        className="rounded-md bg-ink px-3 py-1.5 text-[12px] font-semibold text-paper hover:bg-ink-soft"
                      >
                        {t("moderation.accept")}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          resolveReport(report.id, "odrzucona", t("moderation.rejectNote"))
                        }
                        className="rounded-md border border-line bg-surface px-3 py-1.5 text-[12px] font-semibold text-ink-soft hover:border-ink-muted hover:text-ink"
                      >
                        {t("moderation.reject")}
                      </button>
                    </div>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <section className="rounded-lg border border-line bg-surface p-4">
        <h2 className="text-sm font-bold text-ink">{t("moderation.rulesTitle")}</h2>
        <ul className="mt-2 space-y-1.5 text-[12.5px] leading-relaxed text-ink-soft">
          <li>{t("moderation.rule1")}</li>
          <li>{t("moderation.rule2")}</li>
          <li>{t("moderation.rule3")}</li>
        </ul>
      </section>
    </div>
  );
}
