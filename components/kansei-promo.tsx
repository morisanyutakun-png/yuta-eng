import Image from "next/image";
import Link from "next/link";

import { AmazonButton } from "@/components/amazon-button";
import { kanseiFacts } from "@/components/kansei-cards";
import { LearningPath } from "@/components/learning-path";
import { kanseiFor, seriesTagline, shindan } from "@/lib/series";

/**
 * 大学別分析ページに置く「過去問の前に」への導線。
 * 分野別完成演習がある8大学（診断模試の対象と同じ）でだけ出す。
 * それ以外の大学に出すと、旧帝大・難関国公立の理系向け教材を無関係な受験生に見せることになる。
 */
export function KanseiPromo({ slug }: { slug: string }) {
  const k = kanseiFor(slug);
  if (!k) return null;

  return (
    <section aria-labelledby="kansei-promo-heading" className="mt-14">
      <h2 id="kansei-promo-heading" className="rule-mark serif text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
        {k.uni}の過去問に入る前に
      </h2>
      <p className="prose-ja mt-3 text-[0.9rem] text-ink-2">
        {seriesTagline}
        {k.published
          ? `その間を埋めるのが、${k.uni}の頻出分野を標準から本番水準まで段階的に演習する分野別完成演習です。`
          : `${k.name}の分野別完成演習は近日追加予定です。`}
      </p>

      {k.published && k.amazonUrl && (
        <div className="mt-5 flex gap-4 border-y border-navy/20 bg-paper-2/70 px-4 py-5">
          <Link href={`/kansei/${k.slug}`} className="w-[76px] shrink-0">
            <Image
              src={`/covers/kansei/thumb/${k.slug}.webp`}
              alt={`${k.name} 分野別完成演習の表紙`}
              width={160}
              height={226}
              sizes="76px"
              className="w-full rounded-[2px] border border-rule shadow-[0_1px_3px_rgba(26,29,33,0.14)]"
            />
          </Link>
          <div className="min-w-0">
            <p className="text-[0.68rem] font-bold tracking-wide text-accent">過去問の前にシリーズ</p>
            <p className="serif mt-1 text-[1.02rem] leading-snug text-ink">
              <Link href={`/kansei/${k.slug}`} className="hover:text-navy">
                {k.name} 分野別完成演習
              </Link>
            </p>
            <p className="mt-1 text-[0.76rem] tabular-nums text-ink-3">
              {kanseiFacts(k)}・目標時間 計{k.total.minutes}分
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <AmazonButton href={k.amazonUrl} className="!min-h-10 !text-[0.85rem]" />
              <Link href={`/kansei/${k.slug}`} className="text-[0.82rem] font-semibold text-navy underline underline-offset-4">
                収録分野と出題傾向を見る
              </Link>
            </div>
          </div>
        </div>
      )}

      <p className="prose-ja mt-4 text-[0.85rem] text-ink-2">
        {k.uni}に決めきれていない場合は、
        <Link href="/shindan" className="font-semibold text-navy underline underline-offset-4">
          志望校診断模試
        </Link>
        で{shindan.universities.map((u) => u.name).join("・")}との相性を先に確かめられます。
      </p>

      <LearningPath compact slug={k.slug} kanseiPublished={k.published} className="mt-6" heading={`${k.uni}数学の学習の段階`} />
    </section>
  );
}
