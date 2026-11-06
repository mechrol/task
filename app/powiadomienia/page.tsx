"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n/provider";
import type { NotificationKind } from "@/lib/types";
import { cn } from "@/lib/utils";

const KIND_TONE: Record<NotificationKind, string> = {
  reakcja: "border-mysl-line bg-mysl-soft text-mysl-deep",
  odpowiedz: "border-czyn-line bg-czyn-soft text-czyn-deep",
  grupa: "border-ok/30 bg-ok-soft text-ok",
  wynik: "border-ok/30 bg-ok-soft text-ok",
  zgłoszenie: "border-alert/30 bg-alert-soft text-alert",
};

export default function NotificationsPage() {
  const { view, markNotificationsRead, markNotificationRead } = useStore();
  const { t, time } = useI18n();
  const unread = view.notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">{t("notifications.title")}</h1>
          <p className="mt-1 text-sm text-ink-soft">{t("notifications.intro")}</p>
        </div>
        {unread > 0 ? (
          <button
            type="button"
            onClick={markNotificationsRead}
            className="rounded-md border border-line bg-surface px-3 py-1.5 text-[13px] font-semibold text-ink-soft hover:border-ink-muted hover:text-ink"
          >
            {t("notifications.markAll", { count: unread })}
          </button>
        ) : null}
      </header>

      {view.notifications.length === 0 ? (
        <p className="rounded-lg border border-dashed border-line bg-surface px-4 py-10 text-center text-sm text-ink-muted">
          {t("notifications.empty")}
        </p>
      ) : (
        <ul className="space-y-2">
          {view.notifications.map((n) => {
            const actor = view.users.find((u) => u.id === n.actorId);
            const post = view.posts.find((p) => p.id === n.postId);
            return (
              <li
                key={n.id}
                className={cn(
                  "rounded-lg border bg-surface p-3.5 transition-colors",
                  n.read ? "border-line" : "border-mysl-line bg-mysl-soft/25",
                )}
              >
                <div className="flex items-start gap-3">
                  <span className={cn("tag shrink-0 border", KIND_TONE[n.kind])}>
                    {t(({ reakcja: "notification.reaction", odpowiedz: "notification.reply", grupa: "notification.group", wynik: "notification.outcome", zgłoszenie: "notification.report" } as const)[n.kind])}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13.5px] leading-snug text-ink">{n.text}</p>
                    <p className="mt-1 flex flex-wrap items-center gap-x-2 text-[11.5px] text-ink-muted">
                      <time dateTime={n.createdAt}>{time(n.createdAt)}</time>
                      {actor ? (
                        <>
                          <span aria-hidden>·</span>
                          <span>@{actor.handle}</span>
                        </>
                      ) : null}
                      {post ? (
                        <>
                          <span aria-hidden>·</span>
                          <Link href="/" className="font-medium text-mysl hover:underline">
                            {t("notifications.goToThread")}
                          </Link>
                        </>
                      ) : null}
                    </p>
                  </div>
                  {!n.read ? (
                    <button
                      type="button"
                      onClick={() => markNotificationRead(n.id)}
                      className="shrink-0 rounded-md border border-line px-2 py-1 text-[11px] font-semibold text-ink-muted hover:border-ink-muted hover:text-ink"
                    >
                      {t("notifications.markRead")}
                    </button>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
