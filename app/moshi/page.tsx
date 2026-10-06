import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { MoshiForm } from "@/components/moshi-form";
import { getUniversity, siteTotals, universityCount } from "@/lib/data";
import { analysisHref, moshi, priceLabel, roundLabel } from "@/lib/moshi/config";
import { kanseiPublished } from "@/lib/series";
import { site } from "@/lib/site";

/**
 * 大学別オンライン数学模試の案内と参加申込。
 *
 * いまの段階で用意するのは「告知」と「参加申込」まで。
 * 受験画面・答案提出・採点・結果はまだ作らないので、ここでも約束しない。
 *
 * 作っている人の素性は、確かめられる事実だけで示す。
 * 刊行冊数も分析年数もサイトの実データから出していて、手で書いた数字はない。
 */

const totals = siteTotals();

const title = `${moshi.title}｜${moshi.season}`;
const description =
  `${moshi.season}の${moshi.title}です。${moshi.universities.length}大学について、` +
  `各大学の入試形式を踏まえたオリジナル問題をオンラインで実施します。` +
  `期間内の好きな日時に受験でき、記述答案はすべて人力で採点します。${roundLabel}。参加申込を受け付けています。`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "大学別 数学 模試",
    "オンライン 数学模試",
    "記述 模試 採点",
    "2027年度 入試 模試",
    ...moshi.universities.map((u) => `${u.university} 数学 模試`),
  ],
  alternates: { canonical: "/moshi" },
  openGraph: {
    title,
    description,
    url: "/moshi",
    type: "website",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og/home.jpg"] },
};

/** 模試の特徴。まだ作っていないものを約束しない範囲で書く。 */
const points: { h: string; body: string }[] = [
  {
    h: "本番を意識したオリジナル問題",
    body: "各大学の試験時間・大問構成・解答形式・頻出分野を踏まえて書き下ろします。過去問そのものは出題しません。",
  },
  {
    h: "期間内の好きな日時に受験できます",
    body: "受験期間のうち、都合のよい日時に取り組めます。本番と同じ試験時間を目安として画面に表示する予定です。",
  },
  {
    h: "記述答案はすべて人力で採点します",
    body: "答案は画像またはPDFで提出していただきます。途中式や記述内容まで確認したうえで、合計点と大問別の得点を出します。",
  },
  {
    h: "詳細な解答解説をお渡しします",
    body: "答えだけでなく、どの方針をなぜ選ぶのか、答案で省略しない方がよい説明は何かまで書いたものをお渡しします。",
  },
];

export default function MoshiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${site.url}/moshi`,
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
    inLanguage: "ja",
  };

  // 作っている人を示すための表紙。分析ページのある大学だけを使う
  const covers = moshi.universities
    .map((m) => (m.slug ? getUniversity(m.slug) : undefined))
    .filter((u): u is NonNullable<typeof u> => Boolean(u))
    .slice(0, 6);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="page">
        <nav aria-label="パンくず" className="pt-5 text-[0.72rem] text-ink-3">
          <Link href="/" className="hover:text-navy">
            トップ
          </Link>
          <span className="mx-1.5 text-rule">／</span>
          <span className="text-ink-2">{moshi.title}</span>
        </nav>

        <header className="border-b border-rule pb-8 pt-6">
          <p className="eyebrow">{moshi.season}</p>
          <h1 className="serif h-page mt-1.5 text-ink">{moshi.title}</h1>
          <p className="prose-ja mt-4 max-w-[38rem] text-[0.97rem] leading-[1.95] text-ink-2">
            大学ごとの入試形式を意識したオリジナル数学模試を、オンラインで実施します。
            期間内の好きな日時に受験でき、記述答案はすべて人力で採点します。
          </p>

          <dl className="mt-6 flex flex-wrap gap-x-9 gap-y-4">
            {[
              { k: "対象", v: String(moshi.universities.length), u: "大学" },
              { k: "開催", v: `第${moshi.round}回`, u: moshi.period },
              { k: "受験料（予定）", v: moshi.price.toLocaleString(), u: "円（税込）" },
            ].map((s) => (
              <div key={s.k}>
                <dt className="text-[0.68rem] text-ink-3">{s.k}</dt>
                <dd className="serif mt-1 leading-none text-ink">
                  <span className="text-[1.5rem] tabular-nums">{s.v}</span>
                  <span className="ml-1 font-sans text-[0.7rem] font-normal text-ink-3">{s.u}</span>
                </dd>
              </div>
            ))}
          </dl>

          <p className="prose-ja mt-5 max-w-[38rem] border-l-[3px] border-rule-2 bg-paper-2 px-4 py-3 text-[0.84rem] leading-[1.9] text-ink-2">
            参加申込の時点では料金は発生しません。正式な受験日程が確定したあとに、お支払い方法をメールでご案内します。
          </p>
        </header>

        <section aria-labelledby="points" className="mt-12">
          <h2 id="points" className="rule-mark serif h-sect text-ink">
            この模試について
          </h2>
          <dl className="mt-6 space-y-6">
            {points.map((p) => (
              <div key={p.h}>
                <dt className="text-[0.95rem] font-semibold leading-snug text-ink">{p.h}</dt>
                <dd className="prose-ja mt-1.5 text-[0.9rem] leading-[1.95] text-ink-2">{p.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="unis" className="mt-14">
          <h2 id="unis" className="rule-mark serif h-sect text-ink">
            開催予定の{moshi.universities.length}大学
          </h2>
          <p className="prose-ja mt-2.5 text-[0.88rem] text-ink-2">
            {roundLabel}。受験料はいずれも{priceLabel}の予定です。
          </p>

          {/*
            同じ条件をカードごとに繰り返すと画面が埋まるので、
            期間・料金・採点は上の1行にまとめ、札には大学名と模試名だけを置く。
          */}
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {moshi.universities.map((u) => {
              const href = analysisHref(u);
              return (
                <li key={u.id} className="card flex items-center justify-between gap-3 px-4 py-3.5">
                  <span className="min-w-0">
                    <span className="block text-[1rem] font-semibold leading-snug text-ink">{u.university}</span>
                    <span className="mt-0.5 block text-[0.8rem] text-ink-2">{u.exam}</span>
                  </span>
                  {href && (
                    <Link
                      href={href}
                      className="shrink-0 whitespace-nowrap text-[0.76rem] text-navy underline underline-offset-4"
                    >
                      出題分析
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-[0.78rem] text-ink-3">
            いずれも開催予定です。各大学の出題分析は、当サイトの分析ページでご覧いただけます。
          </p>
        </section>

        <section aria-labelledby="apply-heading" className="mt-14 scroll-mt-20" id="apply">
          <h2 id="apply-heading" className="rule-mark rule-mark-accent serif h-sect text-ink">
            参加申込
          </h2>
          <p className="prose-ja mt-2.5 max-w-[38rem] text-[0.9rem] leading-[1.95] text-ink-2">
            受験を希望する大学を選び、お名前・メールアドレス・学年をご記入ください。
            参加申込後、正式な受験日程とお支払い方法をご案内します。
            お支払いの期限までに受験料のお支払いが確認できない場合、お申し込みは自動的に取り消しとなります。
          </p>
          <MoshiForm />
        </section>

        {/* 作っている人。確かめられる事実だけを置く */}
        <section aria-labelledby="who" className="mt-16 border-t border-rule pt-9">
          <h2 id="who" className="serif h-sect text-ink">
            つくっているのは
          </h2>
          <p className="prose-ja mt-3 max-w-[38rem] text-[0.92rem] leading-[1.95] text-ink-2">
            このサイトでは、{universityCount()}大学・{totals.sections}区分の数学入試を{totals.span}にわたって分析し、
            その形式に合わせて書き下ろした予想問題集「{site.seriesName}」{totals.books}冊と、
            分野別の演習書{kanseiPublished.length}冊を刊行しています。模試の作問と採点も同じ人間が行います。
          </p>

          <ul className="scroll-hint -mx-5 mt-5 flex gap-3 overflow-x-auto px-5 pb-2 sm:-mx-6 sm:px-6">
            {covers.map((u) => (
              <li key={u.slug} className="w-[76px] shrink-0">
                <Link href={`/univ/${u.slug}`} className="block">
                  <Image
                    src={`/covers/thumb/${u.books[0].asin}.webp`}
                    alt={`${u.books[0].title}の表紙`}
                    width={160}
                    height={226}
                    loading="lazy"
                    sizes="76px"
                    className="w-full border border-rule"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-[0.85rem]">
            <Link href="/books" className="text-navy underline underline-offset-4">
              刊行している教材を見る
            </Link>
            <span className="mx-2 text-rule">／</span>
            <Link href="/kaisetsu" className="text-navy underline underline-offset-4">
              過去問の解答・解説を見る
            </Link>
          </p>
        </section>

        <p className="prose-ja mt-14 border-t border-rule pt-6 text-[0.78rem] leading-[1.9] text-ink-3">
          本模試は各大学とは関係のない、当サイトが独自に制作するものです。問題文の転載は行いません。
          受験日程・受験料・実施方法は予定であり、確定しだいお申し込みいただいた方にメールでご案内します。
          <Link href="/moshi/privacy" className="ml-1 underline underline-offset-4 hover:text-navy">
            個人情報の取り扱い
          </Link>
        </p>
      </div>
    </>
  );
}
