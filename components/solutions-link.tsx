import Link from "next/link";

import { getUniversity } from "@/lib/data";
import { subject } from "@/lib/seo";
import { setPath, solutionsFor } from "@/lib/solutions";

/**
 * 大学の分析ページから、その大学の過去問解説へつなぐ。
 *
 * 解説を1つも出していない大学では何も出さない（空の枠や押せないリンクを置かない）。
 */
export function SolutionsLink({ slug }: { slug: string }) {
  const sets = solutionsFor(slug);
  const u = getUniversity(slug);
  if (!sets.length || !u) return null;
  const total = sets.reduce((n, s) => n + s.questions.length, 0);

  return (
    <section aria-labelledby="solutions" className="mt-14 scroll-mt-20">
      <h2 id="solutions" className="rule-mark serif text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
        過去問の解答・解説
      </h2>
      <p className="prose-ja mt-3 text-[0.93rem] leading-[1.95] text-ink-2">
        {subject(u)}の過去問について、当サイトが独自に解いた解答・計算過程・詳解・別解を公開しています（全{total}問）。
        大学の公式解答ではありません。問題文は載せず、{u.university}公式の問題公開ページへリンクしています。
      </p>
      <ul className="mt-3.5 divide-y divide-rule border-y border-rule">
        {sets.map((s) => (
          <li key={s.year}>
            <Link href={setPath(s)} className="group flex min-h-[3.2rem] items-center justify-between gap-4 py-3">
              <span className="min-w-0">
                <span className="block text-[0.97rem] font-semibold text-ink transition-colors group-hover:text-navy">
                  {s.year}年度 {s.subject}（{s.division}・{s.schedule}）
                </span>
                <span className="mt-0.5 block truncate text-[0.75rem] text-ink-3">
                  {s.questions.map((q) => `第${q.no}問 ${q.field}`).join("／")}
                </span>
              </span>
              <span className="shrink-0 text-[0.75rem] tabular-nums text-ink-3">全{s.questions.length}問</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * 分析ページの最初の画面に置く、解答解説への案内。
 *
 * 解説はページの下のほうにあるので、分析だけ読んで帰る人が多い。
 * 「この大学の過去問の解答もある」ことは、読み始める前に分かっているべき。
 */
export function SolutionsCallout({ slug }: { slug: string }) {
  const sets = solutionsFor(slug);
  if (!sets.length) return null;
  const total = sets.reduce((n, s) => n + s.questions.length, 0);
  const years = sets.map((s) => s.year).sort((a, b) => b - a);

  return (
    <Link
      href={`/kaisetsu/${slug}`}
      className="card card-link group mt-6 flex items-center gap-3.5 px-4 py-3.5"
    >
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-[0.93rem] font-semibold text-ink transition-colors group-hover:text-navy">
          この大学の過去問の解答・解説を読む
        </span>
        <span className="mt-1 flex flex-wrap items-center gap-1">
          {years.map((y) => (
            <span key={y} className="badge">
              {y}年度
            </span>
          ))}
          <span className="badge badge-accent">全{total}問</span>
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
  );
}
