import Link from "next/link";

import type { University } from "@/lib/data";
import { moshi, moshiPath } from "@/lib/moshi/config";
import { shortName } from "@/lib/seo";
import { getKansei } from "@/lib/series";
import { sectionStyle } from "@/lib/sections";
import { solutionsFor } from "@/lib/solutions";

/**
 * 分析を読み終えた人に、次の1つを選ばせる。
 *
 * この先にあるものは性質が違う（自分で解く／採点してもらう／分野を固める）のに、
 * どれも「教材」としてまとめて置いていたので、選べないまま帰っていた。
 * **やりたいこと**を見出しにして、その大学で実際に用意できるものだけを出す。
 *
 * 無いものは出さない。模試を開かない大学に模試の札を出したり、
 * 完成演習が無い大学にその札を出したりしない。
 */
export function NextChoice({ u }: { u: University }) {
  const short = shortName(u);
  const kansei = getKansei(u.slug);
  const mo = moshi.universities.find((x) => x.slug === u.slug);
  const sets = solutionsFor(u.slug);

  const items = [
    ...(u.books.length
      ? [
          {
            want: "自分で本番の形式で演習したい",
            to: "合格答案をつくる",
            body: `${short}の形式に合わせた予想問題を、採点基準つきで。全${u.books.length}巻。`,
            href: "#books",
            section: "books" as const,
          },
        ]
      : []),
    ...(mo
      ? [
          {
            want: "書いた答案を採点してほしい",
            to: mo.exam,
            body: "記述答案を人の手で採点し、講評と今後の学習の助言までお返しします。",
            href: moshiPath(mo),
            section: "moshi" as const,
          },
        ]
      : []),
    ...(kansei?.published
      ? [
          {
            want: "頻出分野を先に固めたい",
            to: "分野別完成演習",
            body: `${short}の頻出${kansei.total.fields}分野・全${kansei.total.problems}題を、標準から本番の水準まで。`,
            href: `/kansei/${kansei.slug}`,
            section: "kansei" as const,
          },
        ]
      : []),
    ...(sets.length
      ? [
          {
            want: "まず解き方を見たい",
            to: "過去問の解答・解説",
            body: `${sets.map((s) => `${s.year}年度`).join("・")}を、当サイトが独自に解いた解答・詳解つきで。無料です。`,
            href: `/kaisetsu/${u.slug}`,
            section: "kaisetsu" as const,
          },
        ]
      : []),
  ];

  if (items.length < 2) return null;

  return (
    <section aria-labelledby="next-choice" className="mt-14">
      <h2 id="next-choice" className="rule-mark serif text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
        この分析のあと、何をするか
      </h2>
      <p className="prose-ja mt-3 max-w-[38rem] text-[0.9rem] leading-[1.95] text-ink-2">
        やりたいことを選ぶと、{short}数学で用意しているものに移ります。
      </p>
      <ul className="mt-5 grid gap-px border border-rule bg-rule sm:grid-cols-2">
        {items.map((x, i) => (
          <li key={x.href} style={sectionStyle(x.section)} className="bg-white">
            <Link href={x.href} className="group flex h-full flex-col px-5 py-5">
              <span className="text-[0.68rem] font-bold tabular-nums tracking-[0.1em] text-[var(--sec)]">
                0{i + 1}
              </span>
              <span className="serif mt-1.5 text-[1.02rem] leading-snug text-ink">{x.want}</span>
              <span className="prose-ja mt-2 text-[0.84rem] leading-[1.9] text-ink-2">{x.body}</span>
              <span className="mt-3 flex items-center gap-1.5 pt-1 text-[0.82rem] font-semibold text-[var(--sec)]">
                {x.to}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className="size-3 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                >
                  <path d="m7 4 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
