"use client";

import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";

/** 検索に必要な最小限だけを受け取る（分析本文はクライアントに送らない）。 */
export type FinderItem = {
  slug: string;
  name: string;
  short: string;
  /** 「〜の傾向と対策」の前に置く主題（「東大理系数学」など） */
  subject: string;
  university: string;
  course: string;
  group: string;
  /** かな・別名を含む検索用の文字列 */
  keywords: string;
  /** 一覧に出すサムネイル（予想問題集の表紙）*/
  asin: string;
  examTime: number | null;
  questions: number | null;
  /** 志望学部ごとに解く問題を選ぶ方式か（大問数を1つに決められない） */
  selective: boolean;
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

export function UniversityFinder({
  items,
  groups,
  headingLevel: H = "h3",
  size = "md",
  limit,
  moreHref,
  compact = false,
}: {
  items: FinderItem[];
  groups: string[];
  /** 群の見出しの段。見出しの段が飛ばないよう、置く場所に合わせて渡す */
  headingLevel?: "h2" | "h3";
  /** 検索欄の大きさ。トップでは探すことが主役なので大きくする */
  size?: "md" | "lg";
  /**
   * 何も絞り込んでいないときに出す件数の上限。
   * トップで64区分をいきなり全部並べると「多すぎて選べない」が先に来るので、
   * 入口では少しだけ見せ、続きは一覧ページへ送る。
   * 検索語や区分を選んだ時点で上限は外れ、該当するものは全部出す。
   */
  limit?: number;
  /** 上限で隠れたぶんを見にいく先 */
  moreHref?: string;
  /** トップの入口は、大学名・区分を中心に小さく一覧する。 */
  compact?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<string>(ALL);
  const deferred = useDeferredValue(query);
  const idle = deferred.trim() === "" && group === ALL;
  const big = size === "lg";

  const filtered = useMemo(() => {
    const q = normalize(deferred);
    return items.filter((it) => {
      if (group !== ALL && it.group !== group) return false;
      if (!q) return true;
      return normalize(it.keywords).includes(q);
    });
  }, [items, deferred, group]);

  // 絞り込んでいないときだけ、入口として先頭を少しだけ見せる
  const shown = useMemo(
    () => (idle && limit ? filtered.slice(0, limit) : filtered),
    [filtered, idle, limit],
  );
  const hidden = filtered.length - shown.length;

  const grouped = useMemo(() => {
    const map = new Map<string, FinderItem[]>();
    for (const it of shown) {
      if (!map.has(it.group)) map.set(it.group, []);
      map.get(it.group)!.push(it);
    }
    return [...map.entries()].sort((a, b) => groups.indexOf(a[0]) - groups.indexOf(b[0]));
  }, [shown, groups]);

  const groupButtons = [ALL, ...groups].map((g) => {
    const active = group === g;
    const count = g === ALL ? items.length : items.filter((i) => i.group === g).length;
    return (
      <button
        key={g}
        type="button"
        onClick={() => setGroup(g)}
        aria-pressed={active}
        className={`min-h-11 shrink-0 border px-3 text-[0.86rem] font-medium transition-colors ${active ? "border-navy bg-navy text-white" : "border-rule bg-white text-ink-2 hover:border-navy hover:text-navy"}`}
      >
        {g}
        <span className={`ml-1.5 text-[0.75rem] tabular-nums ${active ? "text-white/70" : "text-ink-3"}`}>{count}</span>
      </button>
    );
  });

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
            className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-ink-3 ${
              big ? "left-4 size-5" : "left-3 size-4"
            }`}
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
            className={`w-full border bg-white pr-10 text-ink outline-none placeholder:text-ink-3 focus:border-navy ${
              big
                ? "border-rule-2 py-4 pl-12 text-[1.05rem] shadow-[0_1px_2px_rgba(21,24,28,0.05)]"
                : "border-rule py-3 pl-10 text-base"
            }`}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="検索を消す"
              className="absolute right-0.5 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center text-ink-3 hover:text-ink"
            >
              <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        {/* トップでは任意の絞り込みだけを折りたたみ、大学への入口を先に見せる。 */}
        {compact ? (
          <details className="mt-2 border-y border-rule">
            <summary className="min-h-11 cursor-pointer py-3 text-[0.8rem] text-ink-2">
              大学の区分で絞る{group !== ALL && <span className="ml-2 font-semibold text-navy">{group}</span>}
            </summary>
            <div className="flex flex-wrap gap-1.5 pb-3">{groupButtons}</div>
          </details>
        ) : <div className="mt-2 flex flex-wrap gap-1.5">{groupButtons}</div>}
      </div>

      <p aria-live="polite" className={`${compact ? "pt-2" : "pt-4"} text-[0.75rem] text-ink-3`}>
        {hidden > 0 ? `${filtered.length}件のうち${shown.length}件を表示` : `${filtered.length}件`}
        {query && <span className="ml-1.5">「{query}」の検索結果</span>}
      </p>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-[0.86rem] text-ink-3">
          該当する大学がありません。別の言い方でお試しください。
        </p>
      ) : (
        grouped.map(([g, list]) => (
          <section key={g} className={compact ? "mt-3" : "mt-7"}>
            <H className="serif border-b border-rule pb-1.5 text-[0.93rem] text-ink">{g}</H>
            {/*
              主役は大学名と受験区分。試験時間・大問数はその大学を選ぶときの
              判断材料なので、本文に混ぜず札にして位置をそろえる。
              札の高さをそろえると、一覧として上下に比べられる。
            */}
            <ul className={`mt-1 grid gap-2 sm:grid-cols-2 xl:grid-cols-3 ${compact ? "grid-cols-2" : ""}`}>
              {list.map((it) => (
                <li key={it.slug}>
                  <Link
                    href={`/univ/${it.slug}`}
                    className="card card-link group flex h-full items-center gap-3 p-3"
                  >
                    <Image
                      src={`/covers/thumb/${it.asin}.webp`}
                      alt=""
                      width={160}
                      height={226}
                      loading="lazy"
                      sizes="44px"
                      className={`h-[62px] w-11 shrink-0 border border-rule object-cover ${compact ? "hidden sm:block" : ""}`}
                    />
                    <span className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className={`flex min-w-0 gap-1.5 ${compact ? "flex-col sm:flex-row sm:items-baseline" : "items-baseline"}`}>
                        <span className="text-[0.97rem] font-semibold leading-snug text-ink transition-colors group-hover:text-navy">
                          {it.university}
                        </span>
                        {it.course && (
                          <span className="shrink-0 text-[0.8rem] text-ink-2">{it.course}</span>
                        )}
                      </span>
                      <span className={`${compact ? "hidden sm:flex" : "flex"} flex-wrap items-center gap-1`}>
                        {it.examTime && <span className="badge tabular-nums">{it.examTime}分</span>}
                        {it.questions && <span className="badge tabular-nums">大問{it.questions}題</span>}
                        {it.selective && <span className="badge">学部別に選択</span>}
                        {it.books > 1 && <span className="badge tabular-nums">全{it.books}巻</span>}
                      </span>
                    </span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      className="size-3.5 shrink-0 text-ink-3"
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

      {hidden > 0 && moreHref && (
        <p className="mt-7 border-t border-rule pt-5">
          <Link href={moreHref} className="btn">
            すべての大学を見る（{filtered.length}区分）
          </Link>
        </p>
      )}
    </div>
  );
}
