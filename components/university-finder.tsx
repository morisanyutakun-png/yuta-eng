"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";

/** 検索に必要な最小限だけを受け取る（分析本文はクライアントに送らない）。 */
export type FinderItem = {
  slug: string;
  name: string;
  short: string;
  university: string;
  course: string;
  group: string;
  /** かな・別名を含む検索用の文字列 */
  keywords: string;
  examTime: number | null;
  questions: number | null;
  books: number;
};

const ALL = "すべて";

function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/[ぁ-ん]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0x60)) // かな→カナ
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
    .replace(/\s+/g, "");
}

export function UniversityFinder({ items, groups }: { items: FinderItem[]; groups: string[] }) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<string>(ALL);
  const deferred = useDeferredValue(query);

  const filtered = useMemo(() => {
    const q = normalize(deferred);
    return items.filter((it) => {
      if (group !== ALL && it.group !== group) return false;
      if (!q) return true;
      return normalize(it.keywords).includes(q);
    });
  }, [items, deferred, group]);

  const grouped = useMemo(() => {
    const map = new Map<string, FinderItem[]>();
    for (const it of filtered) {
      if (!map.has(it.group)) map.set(it.group, []);
      map.get(it.group)!.push(it);
    }
    return [...map.entries()].sort((a, b) => groups.indexOf(a[0]) - groups.indexOf(b[0]));
  }, [filtered, groups]);

  return (
    <div>
      {/* 絞り込み。スクロールしても画面上部に残す */}
      <div className="sticky top-0 z-20 -mx-5 border-b border-rule bg-paper/95 px-5 pb-2.5 pt-3 backdrop-blur sm:-mx-6 sm:px-6">
        <label htmlFor="univ-search" className="sr-only">
          大学名で絞り込む
        </label>
        <div className="relative">
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="9" cy="9" r="6" />
            <path d="m14 14 4 4" strokeLinecap="round" />
          </svg>
          <input
            id="univ-search"
            type="search"
            inputMode="search"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="大学名・かなで探す"
            className="w-full border border-rule bg-white py-3 pl-10 pr-10 text-base text-ink outline-none placeholder:text-ink-3 focus:border-navy"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="検索を消す"
              className="absolute right-1.5 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center text-ink-3 hover:text-ink"
            >
              <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        <div className="scroll-hint -mx-5 mt-2 flex gap-1.5 overflow-x-auto px-5 sm:-mx-6 sm:px-6">
          {[ALL, ...groups].map((g) => {
            const active = group === g;
            const count = g === ALL ? items.length : items.filter((i) => i.group === g).length;
            return (
              <button
                key={g}
                type="button"
                onClick={() => setGroup(g)}
                aria-pressed={active}
                className={`min-h-9 shrink-0 border px-3 text-[0.82rem] transition-colors ${
                  active
                    ? "border-navy bg-navy text-white"
                    : "border-rule bg-white text-ink-2 hover:border-ink-3"
                }`}
              >
                {g}
                <span className={`ml-1.5 text-[0.7rem] tabular-nums ${active ? "text-white/70" : "text-ink-3"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p aria-live="polite" className="pt-4 text-[0.72rem] text-ink-3">
        {filtered.length}件{query && <span className="ml-1">「{query}」の検索結果</span>}
      </p>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-[0.85rem] text-ink-3">
          該当する大学がありません。別の言い方でお試しください。
        </p>
      ) : (
        grouped.map(([g, list]) => (
          <section key={g} className="mt-7">
            <h3 className="serif border-b border-rule pb-1.5 text-[0.92rem] text-ink">{g}</h3>
            <ul className="divide-y divide-rule">
              {list.map((it) => (
                <li key={it.slug}>
                  <Link
                    href={`/univ/${it.slug}`}
                    className="group flex min-h-[3.4rem] items-center justify-between gap-3 py-3"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-[0.95rem] font-medium text-ink transition-colors group-hover:text-navy">
                        {it.short}数学
                      </span>
                      <span className="mt-0.5 block truncate text-[0.72rem] tabular-nums text-ink-3">
                        {[
                          it.examTime ? `${it.examTime}分` : null,
                          it.questions ? `大問${it.questions}題` : null,
                          it.books > 1 ? `全${it.books}巻` : null,
                        ]
                          .filter(Boolean)
                          .join("・") || it.university}
                      </span>
                    </span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      className="size-3.5 shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m7 4 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
