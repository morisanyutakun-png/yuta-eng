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
      <p className="prose-ja mt-3 text-[0.9rem] leading-[1.95] text-ink-2">
        {subject(u)}の過去問について、当サイトが独自に解いた解答・計算過程・詳解・別解を公開しています（全{total}問）。
        大学の公式解答ではありません。問題文は載せず、{u.university}公式の問題公開ページへリンクしています。
      </p>
      <ul className="mt-3.5 divide-y divide-rule border-y border-rule">
        {sets.map((s) => (
          <li key={s.year}>
            <Link href={setPath(s)} className="group flex min-h-[3.2rem] items-center justify-between gap-4 py-3">
              <span className="min-w-0">
                <span className="block text-[0.94rem] font-semibold text-ink transition-colors group-hover:text-navy">
                  {s.year}年度 {s.subject}（{s.division}・{s.schedule}）
                </span>
                <span className="mt-0.5 block truncate text-[0.73rem] text-ink-3">
                  {s.questions.map((q) => `第${q.no}問 ${q.field}`).join("／")}
                </span>
              </span>
              <span className="shrink-0 text-[0.7rem] tabular-nums text-ink-3">全{s.questions.length}問</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
