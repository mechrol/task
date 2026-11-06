"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n/provider";
import { LanguageToggle } from "@/components/LanguageToggle";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", labelKey: "nav.feed", icon: "feed" },
  { href: "/grupy", labelKey: "nav.groups", icon: "grupy" },
  { href: "/szukaj", labelKey: "nav.search", icon: "szukaj" },
  { href: "/powiadomienia", labelKey: "nav.notifications", icon: "powiadomienia" },
  { href: "/moderacja", labelKey: "nav.moderation", icon: "moderacja" },
] as const;

function NavIcon({ name }: { name: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "feed":
      return (
        <svg {...common}>
          <path d="M4 6h16M4 12h10M4 18h13" />
        </svg>
      );
    case "grupy":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
          <path d="M16 6.5a2.5 2.5 0 0 1 0 5M17.5 14.5A4 4 0 0 1 20.5 18" />
        </svg>
      );
    case "szukaj":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4.5 4.5" />
        </svg>
      );
    case "powiadomienia":
      return (
        <svg {...common}>
          <path d="M6 9a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 13 6 9Z" />
          <path d="M10 18a2 2 0 0 0 4 0" />
        </svg>
      );
    case "moderacja":
      return (
        <svg {...common}>
          <path d="M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z" />
          <path d="m9.5 12 1.8 1.8 3.4-3.6" />
        </svg>
      );
    default:
      return null;
  }
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { view, currentUser } = useStore();
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const unread = view.notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-dvh">
      <a
        href="#tresc-glowna"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-paper"
      >
        {t("shell.skipToContent")}
      </a>
      <header className="sticky top-0 z-30 border-b border-line bg-paper/92 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-md px-1 py-1"
            aria-label={t("shell.homeLabel")}
          >
            <span
              aria-hidden
              className="grid h-8 w-8 place-items-center rounded-md bg-ink text-sm font-bold text-paper"
            >
              T
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[15px] font-bold tracking-tight text-ink">TASK</span>
              <span className="hidden text-[10px] font-medium uppercase tracking-[0.14em] text-ink-muted sm:block">
                {t("shell.tagline")}
              </span>
            </span>
          </Link>

          <nav aria-label={t("shell.navLabel")} className="ml-2 hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => {
                const active =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors",
                        active
                          ? "bg-ink text-paper"
                          : "text-ink-soft hover:bg-paper-deep hover:text-ink",
                      )}
                    >
                      <NavIcon name={item.icon} />
                      {t(item.labelKey)}
                      {item.href === "/powiadomienia" && unread > 0 ? (
                        <span className="ml-0.5 rounded-full bg-czyn px-1.5 py-px text-[10px] font-bold text-white">
                          {unread}
                          <span className="sr-only">{t("shell.unreadNotifications")}</span>
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <LanguageToggle />
            <Link
              href="/profil"
              className="hidden items-center gap-2 rounded-md px-2 py-1.5 text-sm text-ink-soft hover:bg-paper-deep sm:flex"
            >
              <span
                aria-hidden
                className="grid h-7 w-7 place-items-center rounded-full text-[11px] font-bold text-white"
                style={{ backgroundColor: currentUser.hue }}
              >
                {currentUser.initials}
              </span>
              <span className="font-medium">@{currentUser.handle}</span>
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="nawigacja-mobilna"
              className="rounded-md border border-line px-2.5 py-1.5 text-[13px] font-medium text-ink-soft md:hidden"
            >
              {t("shell.menu")}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav
            id="nawigacja-mobilna"
            aria-label={t("shell.mobileNavLabel")}
            className="border-t border-line bg-surface px-4 py-2 md:hidden"
          >
            <ul className="flex flex-col">
              {NAV.map((item) => {
                const active =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-2.5 rounded-md px-2 py-2.5 text-sm font-medium",
                        active ? "bg-paper-deep text-ink" : "text-ink-soft",
                      )}
                    >
                      <NavIcon name={item.icon} />
                      {t(item.labelKey)}
                      {item.href === "/powiadomienia" && unread > 0 ? (
                        <span className="ml-auto rounded-full bg-czyn px-1.5 py-px text-[10px] font-bold text-white">
                          {unread}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}
      </header>

      <main id="tresc-glowna" className="mx-auto w-full max-w-6xl px-4 py-6">
        {children}
      </main>

      <footer className="mt-10 border-t border-line bg-paper-deep/40">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs leading-relaxed text-ink-muted">
          <p className="font-medium text-ink-soft">{t("shell.footerTitle")}</p>
          <p className="mt-1 max-w-2xl">{t("shell.footerText")}</p>
        </div>
      </footer>
    </div>
  );
}
