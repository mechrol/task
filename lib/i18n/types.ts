import type { Locale } from "../types";

export type { Locale };

export const LOCALES: readonly Locale[] = ["pl", "en"];

/** Klucz localStorage z wybranym jezykiem interfejsu. */
export const LOCALE_STORAGE_KEY = "task-mvp-locale-v1";

export const LOCALE_LABELS: Record<Locale, string> = {
  pl: "Polski",
  en: "English",
};

export function isLocale(value: unknown): value is Locale {
  return value === "pl" || value === "en";
}
