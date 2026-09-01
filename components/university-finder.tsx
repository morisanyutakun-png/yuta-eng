"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";

/** 検索に必要な最小限だけを受け取る（分析本文はクライアントに送らない）。 */
export type FinderItem = {
  slug: string;
  name: string;
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
      {/* 検索。画面に貼りついたまま絞り込める */}
      <div className="sticky top-0 z-20 -mx-4 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
        <label htmlFor="univ-search" className="sr-only">
          大学名で絞り込む
        </label>
        <div className="relative">
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
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
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-base outline-none placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="検索を消す"
              className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
            >
              <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        {/* 区分の絞り込み。横スクロールで親指が届く位置に置く */}
        <div className="scroll-hint -mx-4 mt-2.5 flex gap-2 overflow-x-auto px-4 pb-0.5">
          {[ALL, ...groups].map((g) => {
            const active = group === g;
            const count = g === ALL ? items.length : items.filter((i) => i.group === g).length;
            return (
              <button
                key={g}
                type="button"
                onClick={() => setGroup(g)}
                aria-pressed={active}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "border-sky-700 bg-sky-700 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                }`}
              >
                {g}
                <span className={`ml-1.5 text-xs ${active ? "text-white/70" : "text-slate-400"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 結果 */}
      <p aria-live="polite" className="pt-4 text-xs text-slate-500 dark:text-slate-400">
        {filtered.length}件
        {query && <span className="ml-1">「{query}」の検索結果</span>}
      </p>

      {filtered.length === 0 ? (
        <p className="py-10 text-center text-sm text-slate-500 dark:text-slate-400">
          該当する大学がありません。別の言い方でお試しください。
        </p>
      ) : (
        grouped.map(([g, list]) => (
          <section key={g} className="mt-6">
            <h3 className="text-xs font-bold tracking-wide text-slate-500 dark:text-slate-400">{g}</h3>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {list.map((it) => (
                <li key={it.slug}>
                  <Link
                    href={`/univ/${it.slug}`}
                    className="flex min-h-14 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-colors hover:border-sky-400 hover:bg-sky-50/60 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-700 dark:hover:bg-sky-950/40"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-[0.95rem] font-semibold text-slate-900 dark:text-slate-100">
                        {it.name}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-slate-500 dark:text-slate-400">
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
                      className="size-4 shrink-0 text-slate-300 dark:text-slate-600"
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
