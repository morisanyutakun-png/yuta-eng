import Link from "next/link";

import { AnswerSheet } from "@/components/moshi-visual";
import { getUniversity } from "@/lib/data";
import { moshi, moshiPath, priceLabel, roundLabel } from "@/lib/moshi/config";
import { sectionStyle } from "@/lib/sections";
import { shortName } from "@/lib/seo";

/**
 * 大学の分析ページから、その大学の模試へつなぐ。
 *
 * 分析を読み終えた人がいちばん知りたいのは「その形式で解く機会はあるか」。
 * 模試を開く予定のない大学では何も出さない（押せない案内を置かない）。
 */
export function MoshiLink({ slug }: { slug: string }) {
  const m = moshi.universities.find((x) => x.slug === slug);
  const u = getUniversity(slug);
  if (!m || !u) return null;
  const bare = shortName(u).replace(/大学$/, "大");

  return (
    <section
      aria-labelledby="moshi-link"
      className="mt-14 border border-rule"
      style={sectionStyle("moshi")}
    >
      <div className="sec-rule" />
      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:gap-7">
        <AnswerSheet className="w-[150px] shrink-0 self-center sm:w-[165px]" />
        <div className="min-w-0">
          <p className="eyebrow">{moshi.season}</p>
          <h2 id="moshi-link" className="serif mt-1.5 text-[1.15rem] leading-snug text-ink">
            {m.university} {m.exam}
          </h2>
          <p className="prose-ja mt-2 text-[0.93rem] leading-[1.9] text-ink-2">
            このページの分析をもとに、{m.university}の形式で作る大学別の数学模試を開きます。
            記述答案は人の手で採点し、講評と今後の学習の助言までお返しします。
            {roundLabel}。受験料は{priceLabel}です。
          </p>
          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link href={moshiPath(m)} className="btn btn-primary">
              {bare}の模試を見る
            </Link>
            <span className="text-[0.8rem] text-ink-3">見本問題と採点表を公開中</span>
          </p>
        </div>
      </div>
    </section>
  );
}
