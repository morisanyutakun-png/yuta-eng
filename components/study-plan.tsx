import Image from "next/image";
import Link from "next/link";

import { AmazonButton } from "@/components/amazon-button";
import type { University } from "@/lib/data";
import { yearLabel } from "@/lib/data";
import { shortName } from "@/lib/seo";
import { kanseiFor, shindan } from "@/lib/series";

/**
 * 「◯◯大学 数学の対策の進め方」。
 *
 * 検索で来た人がいちばん知りたいのは「で、何をすればいいのか」なので、
 * このページの分析（試験時間・頻出分野・目標点）から順番を組み立てて示す。
 * 書いている数字はすべて分析データそのままで、勉強法を創作しない。
 */
export function StudyPlan({ u }: { u: University }) {
  const short = shortName(u);
  const kansei = kanseiFor(u.slug);
  const { examTime, questions, style, selective } = u.facts;
  const per = examTime && questions ? Math.round(examTime / questions) : null;
  const top = u.fieldChart?.items.slice(0, 3).map((i) => i.label.replace(/（.*?）/g, "")) ?? [];
  const years = yearLabel(u);

  const steps: { no: string; title: string; body: React.ReactNode }[] = [];

  steps.push({
    no: "1",
    title: `${short}数学の出題形式と頻出分野をつかむ`,
    body: (
      <>
        {examTime && (
          <>
            {short}の数学は{examTime}分
            {questions ? `で大問${questions}題` : ""}
            {selective ? "（解く大問は指定・選択で決まる）" : ""}
            {style ? `、${style}` : ""}です。
            {per ? `単純に割ると1題あたり約${per}分で、見直しの時間を引くと実際にはもっと短くなります。` : ""}
          </>
        )}
        {top.length > 0 && (
          <>
            {years ? `${years}の` : ""}出題を分野別に数えると{top.join("・")}が多く、ここが得点源にも失点源にもなります。
          </>
        )}
        {!examTime && top.length === 0 && <>このページの年度別・分野別の表で、出題の偏りをつかむところから始めます。</>}
      </>
    ),
  });

  if (kansei?.published) {
    steps.push({
      no: "2",
      title: `頻出分野を、標準から本番水準まで段階的に演習する`,
      body: (
        <>
          標準問題集は終えたが過去問はまだ早い、という段階を埋めるのが
          <Link href={`/kansei/${kansei.slug}`} className="font-semibold text-navy underline underline-offset-4">
            {kansei.name} 分野別完成演習
          </Link>
          です。{kansei.years.length === 2 ? `${kansei.years[0]}〜${kansei.years[1]}年度の` : ""}出題から選んだ
          {kansei.total.fields}分野・全{kansei.total.problems}題を、標準→やや難→本番接続の順に解きます。
        </>
      ),
    });
  } else {
    steps.push({
      no: "2",
      title: "年度別の出題一覧で、過去問を解く順番を決める",
      body: (
        <>
          このページの年度別の表を見て、{top.length ? `${top[0]}のように毎年出ている分野から` : "出題の多い分野から"}
          過去問に当たると、手をつけた順に積み上がります。
        </>
      ),
    });
  }

  steps.push({
    no: "3",
    title: "本番と同じ形式で、答案を仕上げる",
    body: (
      <>
        最後は本番の形式で通して解き、答案として書ききる練習をします。
        <Link href="#books" className="font-semibold text-navy underline underline-offset-4">
          合格答案をつくる {short}数学
        </Link>
        は、この分析をもとに書き下ろした予想問題{u.books[0].rounds ? `${u.books[0].rounds}回分` : ""}
        に、どこで何点入るかを示した採点基準を付けたものです
        {u.books.length > 1 ? `（全${u.books.length}巻）` : ""}。
      </>
    ),
  });

  return (
    <section className="mt-14" aria-labelledby="plan-heading">
      <h2 id="plan-heading" className="rule-mark serif text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
        {short}数学の対策の進め方
      </h2>
      <p className="prose-ja mt-3 text-[0.93rem] text-ink-2">
        {short}の数学は、出題の形が年度をまたいでよく似ています。だから
        <strong className="font-semibold text-ink">形式と頻出分野を先に押さえてから演習する</strong>
        ほうが、いきなり過去問に入るより速く仕上がります。
      </p>

      <ol className="mt-5 space-y-4">
        {steps.map((s) => (
          <li key={s.no} className="flex gap-3.5 border-t border-rule pt-4 first:border-0 first:pt-0">
            <span
              aria-hidden="true"
              className="serif flex size-7 shrink-0 items-center justify-center border border-navy/30 text-[0.86rem] tabular-nums text-navy"
            >
              {s.no}
            </span>
            <div className="min-w-0">
              <h3 className="text-[0.97rem] font-semibold leading-snug text-ink">{s.title}</h3>
              <p className="prose-ja mt-1.5 text-[0.93rem] text-ink-2">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      {kansei?.published && kansei.amazonUrl && (
        <div className="mt-6 flex gap-4 border-y border-navy/20 bg-paper-2/70 px-4 py-5">
          <Link href={`/kansei/${kansei.slug}`} className="w-[76px] shrink-0">
            <Image
              src={kansei.cover}
              alt={`${kansei.name} 分野別完成演習の表紙`}
              width={310}
              height={438}
              sizes="76px"
              className="w-full rounded-[2px] border border-rule shadow-[0_1px_2px_rgba(21,24,28,0.07)]"
            />
          </Link>
          <div className="min-w-0">
            <p className="text-[0.75rem] font-bold tracking-wide text-accent">過去問の前にシリーズ</p>
            <p className="serif mt-1 text-[1.02rem] leading-snug text-ink">
              <Link href={`/kansei/${kansei.slug}`} className="hover:text-navy">
                {kansei.name} 分野別完成演習
              </Link>
            </p>
            <p className="mt-1 text-[0.8rem] tabular-nums text-ink-3">
              {kansei.total.fields}分野・{kansei.total.problems}題
              {kansei.total.subquestions ? `・${kansei.total.subquestions}小問` : ""}・目標時間 計{kansei.total.minutes}分
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <AmazonButton href={kansei.amazonUrl} className="!min-h-10 !text-[0.86rem]" />
              <Link
                href={`/kansei/${kansei.slug}`}
                className="text-[0.86rem] font-semibold text-navy underline underline-offset-4"
              >
                収録分野と出題傾向を見る
              </Link>
            </div>
          </div>
        </div>
      )}

      {kansei && (
        <p className="prose-ja mt-4 text-[0.86rem] text-ink-2">
          {short}に決めきれていない場合は、
          <Link href="/shindan" className="font-semibold text-navy underline underline-offset-4">
            志望校診断模試
          </Link>
          で{shindan.universities.map((x) => x.name).join("・")}との相性を先に確かめられます。
        </p>
      )}
    </section>
  );
}
