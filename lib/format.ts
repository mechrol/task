import type { Locale } from "./types";

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const PLURAL: Array<[number, string, string]> = [
  [1, "minuta", "minut"],
  [2, "minuty", "minut"],
  [4, "minuty", "minut"],
  [5, "minut", "minut"],
];

function plural(minutes: number, one: string, few: string, many: string): string {
  if (minutes === 1) return one;
  const lastTwo = minutes % 100;
  const last = minutes % 10;
  if (last >= 2 && last <= 4 && !(lastTwo >= 12 && lastTwo <= 14)) return few;
  return many;
}

export function relativeTime(
  iso: string,
  now: number = Date.now(),
  locale: Locale = "pl",
): string {
  const diff = Math.max(0, now - new Date(iso).getTime());
  const minutes = Math.floor(diff / MINUTE);
  if (minutes < 1) return locale === "en" ? "just now" : "przed chwilą";
  if (minutes < 60) {
    const [one, few, many] = pick(minutes);
    const unit = locale === "en" ? "minutes" : plural(minutes, one, few, many);
    if (locale === "en") {
      return minutes === 1 ? "1 minute ago" : `${minutes} ${unit} ago`;
    }
    return `${minutes} ${unit} temu`;
  }
  const hours = Math.floor(diff / HOUR);
  if (hours < 24) {
    if (locale === "en") {
      const unit = hours === 1 ? "hour" : "hours";
      return `${hours} ${unit} ago`;
    }
    const h = hours === 1 ? "godzina" : hours < 5 ? "godziny" : "godzin";
    return `${hours} ${h} temu`;
  }
  const days = Math.floor(diff / DAY);
  if (days === 1) return locale === "en" ? "yesterday" : "wczoraj";
  if (days < 7) {
    if (locale === "en") {
      const unit = days === 1 ? "day" : "days";
      return `${days} ${unit} ago`;
    }
    const d = days === 1 ? "dzień" : days < 5 ? "dni" : "dni";
    return `${days} ${d} temu`;
  }
  return new Date(iso).toLocaleDateString(locale === "en" ? "en-GB" : "pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function pick(minutes: number): [string, string, string] {
  const entry = PLURAL.find(([limit]) => minutes <= limit);
  if (entry) return [entry[1], entry[2], entry[2]];
  return ["minuta", "minuty", "minut"];
}

export function formatDate(iso: string, locale: Locale = "pl"): string {
  return new Date(iso).toLocaleDateString(locale === "en" ? "en-GB" : "pl-PL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatTime(iso: string, locale: Locale = "pl"): string {
  return new Date(iso).toLocaleTimeString(locale === "en" ? "en-GB" : "pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function pluralPl(count: number, one: string, few: string, many: string): string {
  if (count === 1) return one;
  const lastTwo = count % 100;
  const last = count % 10;
  if (last >= 2 && last <= 4 && !(lastTwo >= 12 && lastTwo <= 14)) return few;
  return many;
}
