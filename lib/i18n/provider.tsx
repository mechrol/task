"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { formatDate, formatTime, relativeTime } from "../format";
import {
  categoryLabel,
  moderationLevelLabel,
  outcomeLabel,
  reactionLabel,
  reportReasonLabel,
  reportStatusLabel,
  roleLabel,
  statusLabel,
  topicLabel,
  translate,
  translatePlural,
  visibilityLabel,
} from "./index";
import { LOCALE_STORAGE_KEY, type Locale } from "./types";
import { isLocale, type PluralKey, type TranslationKey } from "./index";

const LOCALE_KEY = LOCALE_STORAGE_KEY;
const localeListeners = new Set<() => void>();

function subscribeToLocale(onChange: () => void): () => void {
  localeListeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    localeListeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getLocaleSnapshot(): Locale {
  return readStoredLocale() ?? "pl";
}

function publishLocale(locale: Locale): void {
  try {
    window.localStorage.setItem(LOCALE_KEY, locale);
  } catch {
    /* brak miejsca - ustawienie zostaje na wartosci domyslnej */
  }
  for (const listener of localeListeners) listener();
}

export interface I18nLabels {
  category: (value: string) => string;
  status: (value: string) => string;
  visibility: (value: string) => string;
  outcome: (value: string) => string;
  reaction: (value: string) => string;
  reportReason: (value: string) => string;
  reportStatus: (value: string) => string;
  moderation: (value: string) => string;
  role: (value: string) => string;
  topic: (value: string) => string;
}

export interface I18nApi {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
  tp: (base: PluralKey, count: number, vars?: Record<string, string | number>) => string;
  labels: I18nLabels;
  /** Czas wzgledny w biezacym jezyku. */
  time: (iso: string) => string;
  date: (iso: string) => string;
  timeOfDay: (iso: string) => string;
  /** true po nawodnieniu - do bezpiecznego odczytu localStorage. */
  ready: boolean;
}

const LocaleContext = createContext<I18nApi | null>(null);

const subscribeToNothing = () => () => {};

/**
 * Znacznik "po nawodnieniu" - lokalizacja jest wczytywana z localStorage
 * dopiero w przegladarce, wiec pierwszy render (i render serwerowy) zawsze
 * uzywa polskiego. Dzieki temu nie ma rozjezdania hydracji.
 */
function useIsHydrated(): boolean {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
}

function readStoredLocale(): Locale | null {
  try {
    const raw = window.localStorage.getItem(LOCALE_KEY);
    return isLocale(raw) ? raw : null;
  } catch {
    return null;
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribeToLocale, getLocaleSnapshot, (): Locale => "pl");
  const ready = useIsHydrated();

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(LOCALE_KEY, locale);
    } catch {
      /* brak miejsca - ustawienie zostaje tylko w pamieci sesji */
    }
    document.documentElement.lang = locale;
  }, [locale, ready]);

  const setLocale = useCallback((next: Locale) => {
    publishLocale(next);
  }, []);

  const toggleLocale = useCallback(() => {
    publishLocale(locale === "pl" ? "en" : "pl");
  }, [locale]);

  const api = useMemo<I18nApi>(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      t: (key, vars) => translate(locale, key, vars),
      tp: (base, count, vars) => translatePlural(locale, base, count, vars),
      labels: {
        category: (value) => categoryLabel(locale, value),
        status: (value) => statusLabel(locale, value),
        visibility: (value) => visibilityLabel(locale, value),
        outcome: (value) => outcomeLabel(locale, value),
        reaction: (value) => reactionLabel(locale, value),
        reportReason: (value) => reportReasonLabel(locale, value),
        reportStatus: (value) => reportStatusLabel(locale, value),
        moderation: (value) => moderationLevelLabel(locale, value),
        role: (value) => roleLabel(locale, value),
        topic: (value) => topicLabel(locale, value),
      },
      time: (iso) => relativeTime(iso, Date.now(), locale),
      date: (iso) => formatDate(iso, locale),
      timeOfDay: (iso) => formatTime(iso, locale),
      ready,
    }),
    [locale, setLocale, toggleLocale, ready],
  );

  return <LocaleContext.Provider value={api}>{children}</LocaleContext.Provider>;
}

export function useI18n(): I18nApi {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useI18n musi byc uzyty wewnatrz LocaleProvider");
  return ctx;
}
