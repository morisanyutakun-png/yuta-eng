import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { FaqSection } from "@/components/faq";
import { KanseiCards } from "@/components/kansei-cards";
import { LearningPath } from "@/components/learning-path";
import { sectionStyle } from "@/lib/sections";
import type { Faq } from "@/lib/seo";
import {
  daysAt,
  kanseiAll,
  kanseiPublished,
  kanseiUpcoming,
  seriesName,
  seriesTagline,
  shindan,
} from "@/lib/series";
import { site } from "@/lib/site";

const pubNames = kanseiPublished.map((k) => k.uni);
const upNames = kanseiUpcoming.map((k) => k.uni);
const counts = kanseiPublished.map((k) => k.total.problems);
const range = (xs: number[]) => (Math.min(...xs) === Math.max(...xs) ? `${xs[0]}` : `${Math.min(...xs)}〜${Math.max(...xs)}`);

const title = `大学別 数学問題集「分野別完成演習」2027｜${pubNames.join("・")}`;
const description =
  `${pubNames.join("・")}の数学を、大学ごとの頻出分野から段階的に演習する問題集シリーズ。` +
  `過去の出題を分析して分野を選び、各巻${range(counts)}題を標準→やや難→本番接続の順に収録。` +
  `標準問題集を終えて過去問に入る前の「間」を埋めます。${upNames.length ? `${upNames.join("・")}も近日追加予定。` : ""}`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "大学別 数学 問題集",
    "難関大 数学 問題集",
    "旧帝大 数学 問題集",
    "過去問の前に 数学",
    "数学 分野別 問題集",
    ...kanseiPublished.map((k) => `${k.university} 数学 問題集`),
  ],
  alternates: { canonical: "/kansei" },
  openGraph: {
    title,
    description,
    url: "/kansei",
    images: [{ url: "/og/kansei.jpg", width: 1200, height: 630, alt: "分野別完成演習" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og/kansei.jpg"] },
};

function faq(): Faq[] {
  const list: Faq[] = [
    {
      q: "どの大学の分野別完成演習がありますか？",
      a: `現在は${kanseiPublished.map((k) => k.name).join("・")}の${kanseiPublished.length}冊です。${
        kanseiUpcoming.length ? `${kanseiUpcoming.map((k) => k.name).join("・")}も近日追加予定です。` : ""
      }`,
    },
    {
      q: "どの段階で使う問題集ですか？",
      a: "教科書傍用問題集や標準的な網羅系問題集を一通り終え、志望校の過去問に入る前に使います。時間を計って解く本ではなく、手が止まったところで考えるための本です。各章の「本番接続」の問題が自力で完答できるようになったら、過去問演習に進んでかまいません。",
    },
    {
      q: "数学IIIを学習中でも使えますか？",
      a: `使えます。数学IIIを使わずに解ける章は巻ごとに違い、${kanseiPublished
        .map((k) => `${k.name}は${k.beforeIII.label}（${k.beforeIII.problems}題）`)
        .join("、")}です。`,
    },
    {
      q: "「合格答案をつくる」とは何が違いますか？",
      a: "分野別完成演習は、分野ごとに標準から本番水準まで段階的に上げていく問題集です。『合格答案をつくる』はその次に置く、本番と同じ形式の予想問題集で、加点・減点つきの採点表で自分の答案を照合できます。両者は題材が重複しないように作られており、完成演習の各問には『合格答案をつくる』のどの問題へ進むかが書かれています。",
    },
    {
      q: "過去問がそのまま載っていますか？",
      a: "収録問題はすべて書き下ろしです。過去問は出題傾向の分析にのみ用い、問題文の転載や改題はしていません。",
    },
  ];
  return list;
}

export default function KanseiSeriesPage() {
  const faqs = faq();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: "大学別 分野別完成演習 数学 2027",
        numberOfItems: kanseiPublished.length,
        itemListElement: kanseiPublished.map((k, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${site.url}/kansei/${k.slug}`,
          name: `${k.name} 分野別完成演習`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "トップ", item: site.url },
          { "@type": "ListItem", position: 2, name: "分野別完成演習", item: `${site.url}/kansei` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div
        className="mx-auto max-w-[46rem] px-5 sm:px-6 lg:max-w-[74rem] lg:px-8"
        style={sectionStyle("kansei")}
      >
        <nav aria-label="パンくず" className="breadcrumb pt-3 text-[0.75rem] text-ink-3">
          <Link href="/" className="hover:text-navy">
            トップ
          </Link>
          <span className="mx-1.5 text-rule">／</span>
          <span className="text-ink-2">分野別完成演習</span>
        </nav>

        <div className="sec-rule mt-3" />

        <header className="pb-6 pt-4">
          <p className="text-[0.75rem] font-semibold tracking-wide text-navy">{seriesName}・2027年度対策</p>
          <h1 className="serif mt-2 text-[1.75rem] leading-[1.35] text-ink sm:text-[2.2rem]">
            大学別 数学
            <br className="sm:hidden" />
            分野別完成演習
          </h1>
          <p className="mt-2 text-[0.86rem] font-semibold text-ink-2">{seriesTagline}——その間を埋める。</p>
          <p className="prose-ja mt-4 max-w-[36rem] text-[0.97rem] text-ink-2">
            志望校の過去問を分析して頻出分野を選び、分野ごとに標準から本番水準まで段階的に並べた数学の問題集です。
            {pubNames.join("・")}の{kanseiPublished.length}冊を刊行しています。
          </p>

          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-y border-rule py-4">
            {[
              { k: "刊行", v: String(kanseiPublished.length), u: `冊${kanseiUpcoming.length ? `（近日 ${kanseiUpcoming.length}冊）` : ""}` },
              { k: "1冊の収録", v: range(counts), u: "題" },
              { k: "頻出分野", v: range(kanseiPublished.map((k) => k.total.fields)), u: "分野" },
            ].map((r) => (
              <div key={r.k}>
                <dt className="text-[0.75rem] text-ink-3">{r.k}</dt>
                <dd className="serif mt-1 leading-none text-ink">
                  <span className="text-[1.7rem] tabular-nums">{r.v}</span>
                  <span className="ml-0.5 font-sans text-[0.75rem] font-normal text-ink-3">{r.u}</span>
                </dd>
              </div>
            ))}
          </dl>
        </header>

        <section aria-labelledby="list-heading">
          <h2 id="list-heading" className="rule-mark serif text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
            大学を選ぶ
          </h2>
          <div className="mt-5">
            <KanseiCards />
          </div>
        </section>

        <LearningPath current="kansei" className="mt-14" heading="分野別完成演習は、学習のどの段階で使うか" />

        <section className="mt-14" aria-labelledby="place-heading">
          <h2 id="place-heading" className="rule-mark serif text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
            過去問の前に置く問題集
          </h2>
          <div className="prose-ja mt-4 space-y-4 text-[0.97rem] text-ink-2">
            <p>
              難関大の過去問を初めて開くと、「解法は分かるのに、どこから手をつければよいか分からない」「答案が最後まで書けない」と手が止まりがちです。
              それは能力の問題ではなく、誘導の少ない問題や1小問の重い問題を、自分で分解して解いた経験がないというだけのことです。
            </p>
            <p>
              分野別完成演習は、その経験を積むための問題集です。<strong className="font-semibold text-ink">時間を計って解く本ではありません。</strong>
              手が止まったところで考え、各章の「本番接続」まで自力で完答できるようになったら過去問演習に進みます。
              本番形式の訓練は、そのあと過去問と『合格答案をつくる』で行います。
            </p>
          </div>
          <ol className="mt-5 grid gap-px border border-rule bg-rule text-[0.86rem]">
            {[
              ["基礎・標準問題集", "教科書傍用・網羅系"],
              ["分野別完成演習", "分野別に、標準から本番水準まで段階的に"],
              ["過去問演習・本番形式の演習", "『合格答案をつくる』ほか"],
            ].map(([a, b], i) => (
              <li key={a} className={`flex items-baseline gap-3 px-4 py-3 ${i === 1 ? "bg-white" : "bg-paper"}`}>
                <span className="serif w-5 shrink-0 tabular-nums text-ink-3">{i + 1}</span>
                <span className={i === 1 ? "font-semibold text-navy" : "font-semibold text-ink"}>{a}</span>
                <span className="text-[0.8rem] text-ink-3">{b}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14" aria-labelledby="make-heading">
          <h2 id="make-heading" className="rule-mark serif text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
            各巻に共通する作り
          </h2>
          <dl className="mt-4 divide-y divide-rule border-y border-rule">
            {[
              ["分野は過去問の分析から選ぶ", "大学ごとに過去の出題を分析し、重要度の高い分野を章にしています。巻によって分野の数も並びも違います。"],
              ["標準 → やや難 → 本番接続", "各章の問題は3段階の順に並びます。「本番接続」はその大学の実際の大問に近づけた問題です。"],
              ["章扉で出題傾向をつかむ", "章扉に、その分野でその大学が何を要求するかと、その章で使う定理・公式や定石をまとめています。"],
              ["ヒント・着眼・定石", "手が止まったら問題の下のヒント、次に解答冒頭の着眼を読み、解いたあとは定石で使った手を整理します。"],
              ["目標時間と次の一冊への接続", "1題ごとに目標時間を付け、各問にはその次に進む『合格答案をつくる』のどの問題へつながるかを示しています。"],
              ["数学III の前でも前半は解ける", "章は数学I・A から数学III へ進む順に並び、前半の章は数学III を学ぶ前でも取り組めます。"],
              ["過去問演習への移行プラン", "付録に、本書を終えたあと過去問演習へ移る順序をまとめています。"],
            ].map(([k, v]) => (
              <div key={k} className="grid gap-1 py-3 sm:grid-cols-[13rem_1fr] sm:gap-4">
                <dt className="text-[0.93rem] font-semibold text-ink">{k}</dt>
                <dd className="prose-ja text-[0.86rem] text-ink-2">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-14" aria-labelledby="compare-heading">
          <h2 id="compare-heading" className="rule-mark serif text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
            {kanseiAll.length}冊の構成を比べる
          </h2>
          <div className="scroll-hint -mx-5 mt-4 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[40rem] border-collapse text-left text-[0.8rem] leading-relaxed">
              <thead>
                <tr className="border-y border-rule bg-paper-2/60 text-[0.75rem] text-ink-2">
                  <th scope="col" className="px-3 py-2 font-bold">書名</th>
                  <th scope="col" className="px-2 py-2 font-bold">分析した年度</th>
                  <th scope="col" className="px-2 py-2 text-right font-bold">分野</th>
                  <th scope="col" className="px-2 py-2 text-right font-bold">題数</th>
                  <th scope="col" className="px-2 py-2 text-right font-bold">小問</th>
                  <th scope="col" className="px-2 py-2 text-right font-bold">目標時間</th>
                  <th scope="col" className="px-2 py-2 font-bold">数学III 前に解ける章</th>
                </tr>
              </thead>
              <tbody>
                {kanseiAll.map((k) => (
                  <tr key={k.slug} className="border-b border-rule/70">
                    <th scope="row" className="whitespace-nowrap px-3 py-2.5 text-left align-top font-semibold text-ink">
                      {k.published ? (
                        <Link href={`/kansei/${k.slug}`} className="underline decoration-rule underline-offset-4 hover:text-navy">
                          {k.name}
                        </Link>
                      ) : (
                        <>
                          {k.name}
                          <span className="ml-1.5 text-[0.75rem] font-bold text-accent">近日</span>
                        </>
                      )}
                    </th>
                    {k.published ? (
                      <>
                        <td className="whitespace-nowrap px-2 py-2.5 align-top tabular-nums">{k.years.join("〜")}</td>
                        <td className="px-2 py-2.5 text-right align-top tabular-nums">{k.total.fields}</td>
                        <td className="px-2 py-2.5 text-right align-top tabular-nums">{k.total.problems}</td>
                        <td className="px-2 py-2.5 text-right align-top tabular-nums">{k.total.subquestions ?? "—"}</td>
                        <td className="whitespace-nowrap px-2 py-2.5 text-right align-top tabular-nums">{k.total.minutes}分</td>
                        <td className="whitespace-nowrap px-2 py-2.5 align-top tabular-nums text-ink-2">
                          {k.beforeIII.label}（{k.beforeIII.problems}題）
                        </td>
                      </>
                    ) : (
                      <td colSpan={6} className="px-2 py-2.5 align-top text-ink-3">
                        近日追加予定です。
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="prose-ja mt-3 text-[0.86rem] text-ink-3">
            目標時間の合計は、1日90分ならおよそ
            {range(kanseiPublished.map((k) => daysAt(k.total.minutes)))}日でひととおり終わる分量です。
          </p>
        </section>

        <section aria-labelledby="shindan-heading" className="mt-14 border-y border-navy/20 bg-paper-2/70 px-4 py-5 sm:px-6">
          <div className="flex gap-4">
            <Link href="/shindan" className="w-[76px] shrink-0">
              <Image
                src={`/covers/kansei/thumb/shindan.webp`}
                alt="志望校診断模試の表紙"
                width={160}
                height={226}
                sizes="76px"
                className="w-full rounded-[2px] border border-rule shadow-[0_1px_2px_rgba(21,24,28,0.07)]"
              />
            </Link>
            <div className="min-w-0">
              <p className="text-[0.75rem] font-bold tracking-wide text-accent">まだ志望校が決まっていないなら</p>
              <h2 id="shindan-heading" className="serif mt-1 text-[1.05rem] leading-snug text-ink">
                先に志望校診断模試で、{shindan.universities.length}大学との相性を確かめる
              </h2>
              <p className="prose-ja mt-1.5 text-[0.86rem] text-ink-2">
                {shindan.rounds}回の模試で「得点の形」を分析し、{shindan.universities.map((u) => u.name).join("・")}
                との相性を判定します。第1志望候補が決まったら、その大学の完成演習へ。
              </p>
              <Link href="/shindan" className="mt-2 inline-block text-[0.86rem] font-semibold text-navy underline underline-offset-4">
                志望校診断模試を見る
              </Link>
            </div>
          </div>
        </section>

        <FaqSection items={faqs} name="分野別完成演習" />
      </div>
    </>
  );
}
