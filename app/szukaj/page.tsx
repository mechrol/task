"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n/provider";
import { PostCard } from "@/components/PostCard";

type SearchScope = "wszystko" | "komunikaty" | "osoby" | "grupy";

export default function SearchPage() {
  const { view } = useStore();
  const { t, time } = useI18n();
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState<SearchScope>("wszystko");

  const q = query.trim().toLowerCase();

  const matchedPosts = useMemo(() => {
    if (!q) return [];
    return view.posts.filter((p) => {
      const haystack = `${p.mysl} ${p.czyn ?? ""} ${p.topic ?? ""}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [q, view.posts]);

  const matchedUsers = useMemo(() => {
    if (!q) return [];
    return view.users.filter((u) =>
      `${u.name} ${u.handle} ${u.bio}`.toLowerCase().includes(q),
    );
  }, [q, view.users]);

  const matchedGroups = useMemo(() => {
    if (!q) return [];
    return view.groups.filter((g) =>
      `${g.name} ${g.description} ${g.topic}`.toLowerCase().includes(q),
    );
  }, [q, view.groups]);

  const showPosts = scope === "wszystko" || scope === "komunikaty";
  const showUsers = scope === "wszystko" || scope === "osoby";
  const showGroups = scope === "wszystko" || scope === "grupy";

  const total = matchedPosts.length + matchedUsers.length + matchedGroups.length;

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-ink">{t("search.title")}</h1>
        <p className="mt-1 text-sm text-ink-soft">{t("search.intro")}</p>
      </header>

      <div className="rounded-lg border border-line bg-surface p-4 shadow-card">
        <label htmlFor="pole-szukaj" className="sr-only">
          {t("search.label")}
        </label>
        <div className="flex gap-2">
          <input
            id="pole-szukaj"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search.placeholder")}
            className="flex-1 rounded-md border border-line bg-paper px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted/70"
          />
        </div>
        <div role="group" aria-label={t("search.scopeLabel")} className="mt-3 flex flex-wrap gap-1.5">
          {(
            [
              { id: "wszystko" as const, label: t("search.scopeAll") },
              { id: "komunikaty" as const, label: t("search.scopePosts") },
              { id: "osoby" as const, label: t("search.scopePeople") },
              { id: "grupy" as const, label: t("search.scopeGroups") },
            ]
          ).map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={scope === s.id}
              onClick={() => setScope(s.id)}
              className={
                scope === s.id
                  ? "rounded-full border border-ink bg-ink px-3 py-1 text-[12px] font-semibold text-paper"
                  : "rounded-full border border-line bg-paper px-3 py-1 text-[12px] font-semibold text-ink-soft hover:border-ink-muted hover:text-ink"
              }
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {!q ? (
        <p className="rounded-lg border border-dashed border-line bg-surface px-4 py-10 text-center text-sm text-ink-muted">
          {t("search.emptyHint")}
        </p>
      ) : total === 0 ? (
        <p className="rounded-lg border border-dashed border-line bg-surface px-4 py-10 text-center text-sm text-ink-muted">
          {t("search.noResults", { query })}
        </p>
      ) : (
        <div className="space-y-5">
          {showUsers && matchedUsers.length > 0 ? (
            <section aria-labelledby="szukaj-osoby">
              <h2 id="szukaj-osoby" className="text-sm font-bold text-ink">
                {t("search.people", { count: matchedUsers.length })}
              </h2>
              <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                {matchedUsers.map((u) => (
                  <li
                    key={u.id}
                    className="flex items-center gap-3 rounded-lg border border-line bg-surface p-3"
                  >
                    <span
                      aria-hidden
                      className="grid h-9 w-9 place-items-center rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: u.hue }}
                    >
                      {u.initials}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13px] font-semibold text-ink">{u.name}</span>
                      <span className="block text-[11.5px] text-ink-muted">@{u.handle}</span>
                      <span className="mt-0.5 block truncate text-[11.5px] text-ink-soft">{u.bio}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {showGroups && matchedGroups.length > 0 ? (
            <section aria-labelledby="szukaj-grupy">
              <h2 id="szukaj-grupy" className="text-sm font-bold text-ink">
                {t("search.groups", { count: matchedGroups.length })}
              </h2>
              <ul className="mt-2 space-y-2">
                {matchedGroups.map((g) => (
                  <li
                    key={g.id}
                    className="rounded-lg border border-line bg-surface p-3"
                  >
                    <Link
                      href={`/grupy/${g.slug}`}
                      className="text-[13px] font-semibold text-ink hover:underline"
                    >
                      {g.name}
                    </Link>
                    <p className="mt-0.5 text-[12px] text-ink-soft">{g.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {showPosts && matchedPosts.length > 0 ? (
            <section aria-labelledby="szukaj-komunikaty" className="space-y-3">
              <h2 id="szukaj-komunikaty" className="text-sm font-bold text-ink">
                {t("search.posts", { count: matchedPosts.length })}
              </h2>
              {matchedPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  reasons={[
                    {
                      label: t("rank.searchResult"),
                      detail: t("search.rankDetail", { query: query.trim() }),
                      source: "neutral",
                    },
                  ]}
                />
              ))}
            </section>
          ) : null}
        </div>
      )}

      <p className="text-[11px] text-ink-muted">
        {t("search.lastUpdate", { time: time(new Date().toISOString()) })}
      </p>
    </div>
  );
}
