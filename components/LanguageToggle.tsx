"use client";

import { useI18n } from "@/lib/i18n/provider";
import { LOCALE_LABELS, type Locale } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

/**
 * Przelacznik jezyka interfejsu.
 *
 * Dwie opcje z `aria-pressed` - dziala klawiatura, jest czytelny dla
 * czytnikow ekranu i mieci sie w mobilnej belce.
 */
export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();
  const options: Locale[] = ["pl", "en"];

  return (
    <div
      role="group"
      aria-label={t("language.switch")}
      className={cn(
        "inline-flex items-center rounded-md border border-line bg-surface p-0.5",
        className,
      )}
    >
      {options.map((option) => {
        const active = locale === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => setLocale(option)}
            aria-pressed={active}
            title={LOCALE_LABELS[option]}
            className={cn(
              "rounded-[4px] px-2 py-1 text-[11px] font-bold uppercase tracking-[0.06em] transition-colors",
              active
                ? "bg-ink text-paper"
                : "text-ink-muted hover:bg-paper-deep hover:text-ink",
            )}
          >
            {option}
            <span className="sr-only"> - {LOCALE_LABELS[option]}</span>
          </button>
        );
      })}
    </div>
  );
}
