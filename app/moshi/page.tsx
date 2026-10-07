import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { MoshiForm } from "@/components/moshi-form";
import { AnswerSheet, Flow, MarkIcon, PerUnivIcon, PeriodIcon } from "@/components/moshi-visual";
import { getUniversity, siteTotals, universityCount } from "@/lib/data";
import { analysisHref, moshi, priceLabel, roundLabel } from "@/lib/moshi/config";
import { sectionStyle } from "@/lib/sections";
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

/**
 * 特長。まだ作っていないものを約束しない範囲で書く。
 * それぞれに小さな図を添える。見出しだけが続くより、何の話か早く分かる。
 */
const points = [
  {
    icon: MarkIcon,
    h: "記述答案はすべて人力で採点",
    body: "答案は画像またはPDFで提出していただきます。途中式や記述内容まで確認したうえで、合計点と大問別の得点を出します。",
  },
  {
    icon: PerUnivIcon,
    h: "大学ごとの形式で書き下ろし",
    body: "試験時間・大問構成・解答形式・頻出分野を踏まえて作問します。過去問そのものは出題しません。",
  },
  {
    icon: PeriodIcon,
    h: "期間内の好きな日時に受験",
    body: "受験期間のうち、都合のよい日時に取り組めます。本番と同じ試験時間を目安として画面に表示する予定です。",
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

      <div className="page page-wide" style={sectionStyle("moshi")}>
        <nav aria-label="パンくず" className="pt-5 text-[0.72rem] text-ink-3">
          <Link href="/" className="hover:text-navy">
            トップ
          </Link>
          <span className="mx-1.5 text-rule">／</span>
          <span className="text-ink-2">{moshi.title}</span>
        </nav>

        <div className="sec-rule mt-3" />

        <header className="border-b border-rule pb-8 pt-6">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_26rem] lg:gap-12">
            <div className="min-w-0">
              <p className="eyebrow">{moshi.season}</p>
              <h1 className="serif h-page mt-1.5 text-ink">{moshi.title}</h1>
              <p className="prose-ja mt-4 text-[1rem] leading-[1.95] text-ink-2 sm:text-[1.05rem]">
                大学ごとの入試形式を意識したオリジナル数学模試を、オンラインで実施します。
                期間内の好きな日時に受験でき、記述答案はすべて人力で採点します。
                答案は途中式まで読み、大問ごとに得点を出してお返しします。
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#apply" className="btn btn-primary">
                  参加申込に進む
                </a>
                <a href="#unis" className="btn">
                  開催大学を見る
                </a>
              </div>
              <p className="mt-3 text-[0.78rem] text-ink-3">
                参加申込の時点では料金は発生しません。
              </p>
            </div>

            {/* 文章より先に、この模試で何が起きるかを図で見せる */}
            <figure className="justify-self-center lg:justify-self-end">
              <AnswerSheet className="w-[26rem] max-w-full" />
              <figcaption className="mt-2 text-center text-[0.76rem] text-ink-3">
                記述答案を人が読み、大問ごとに得点を出します
              </figcaption>
            </figure>
          </div>
        </header>

        {/* 特長。図を添えて横に並べる */}
        <section aria-labelledby="points" className="mt-14">
          <h2 id="points" className="rule-mark serif h-sect text-ink">
            この模試について
          </h2>
          <ul className="mt-6 grid gap-px overflow-hidden border border-rule bg-rule lg:grid-cols-3">
            {points.map((p) => (
              <li key={p.h} className="bg-white p-5 lg:p-6">
                <p.icon className="h-12 w-auto" />
                <h3 className="mt-3 text-[0.98rem] font-semibold leading-snug text-ink">{p.h}</h3>
                <p className="prose-ja mt-2 text-[0.87rem] leading-[1.9] text-ink-2">{p.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="youkou" className="mt-14">
          <h2 id="youkou" className="rule-mark serif h-sect text-ink">
            実施要項
          </h2>
          {/*
            予備校の模試案内が使っている「実施要項」の形にそろえる。
            数字を散らして並べるより、項目名と内容を対で積むほうが、
            受けるかどうかを決めるのに必要なことが一度に読める。
            料金についての断りも、浮いた帯にせず要項の中に収める。
          */}
          <div className="mt-6 border border-rule">
            <dl className="grid lg:grid-cols-2 lg:gap-x-px lg:bg-rule">
              {[
                { k: "対象大学", v: `${moshi.universities.length}大学`, note: "下の一覧からお選びいただけます" },
                { k: "実施時期", v: roundLabel.replace(/^第/, "第"), note: "正式な日程は確定しだいご案内します" },
                { k: "受験方法", v: "オンライン・期間内の好きな日時", note: "本番と同じ試験時間を目安として表示する予定です" },
                { k: "受験料", v: `${priceLabel}（予定）`, note: "参加申込の時点では料金は発生しません" },
                { k: "採点", v: "全答案を人力で採点", note: "途中式や記述内容まで確認して得点を出します" },
                { k: "申込", v: "受付中", note: "お支払い方法は正式な日程とあわせてご案内します" },
              ].map((r) => (
                <div
                  key={r.k}
                  className="grid grid-cols-[5.5rem_1fr] gap-x-4 border-b border-rule bg-white px-4 py-3.5 last:border-b-0 sm:grid-cols-[7rem_1fr] sm:px-5 lg:border-b lg:[&:nth-last-child(-n+2)]:border-b-0"
                >
                  <dt className="text-[0.8rem] leading-relaxed text-ink-3">{r.k}</dt>
                  <dd className="min-w-0">
                    <span className="block text-[0.93rem] font-semibold leading-snug text-ink">{r.v}</span>
                    <span className="mt-0.5 block text-[0.78rem] leading-relaxed text-ink-3">{r.note}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

        </section>

        <section aria-labelledby="flow" className="mt-14">
          <h2 id="flow" className="rule-mark serif h-sect text-ink">
            受験までの流れ
          </h2>
          <Flow />
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
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
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
