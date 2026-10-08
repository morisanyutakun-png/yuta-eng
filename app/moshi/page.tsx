import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { FactStrip } from "@/components/fact-strip";
import { MoshiForm } from "@/components/moshi-form";
import { MoshiDeliverables } from "@/components/moshi-deliverables";
import { MoshiSample } from "@/components/moshi-sample";
import { AnswerSheet, Flow, MarkIcon, PerUnivIcon, PeriodIcon } from "@/components/moshi-visual";
import { getUniversity, siteTotals, universityCount } from "@/lib/data";
import {
  analysisHref,
  cancelLine,
  deliverableLine,
  moshi,
  moshiPath,
  paymentLine,
  priceLabel,
  roundLabel,
} from "@/lib/moshi/config";
import { sectionStyle } from "@/lib/sections";
import { kanseiPublished } from "@/lib/series";
import { site } from "@/lib/site";

/**
 * 入試プレビューの案内と参加申込。
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
  `${moshi.title}は志望校の入試形式に合わせて作る大学別の数学模試です。旧帝大から地方国公立大まで` +
  `${moshi.universities.length}大学。オンラインで受験でき、記述答案はすべて人力で採点します。` +
  `見本問題と採点表を公開中。${roundLabel}。参加申込受付中。`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    moshi.title,
    "大学別 数学 模試",
    "冠模試 数学",
    "地方国公立 模試",
    "国公立 二次 数学 模試",
    "オンライン 数学模試",
    "記述 模試 採点",
    "2027年度 入試 模試",
    // 「三重大学 数学 模試」でも「三重大 数学 模試」でも辿り着けるようにする
    ...moshi.universities.flatMap((u) => [
      `${u.university} 数学 模試`,
      `${u.university.replace(/大学$/, "大")} 数学 模試`,
    ]),
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

        <FactStrip
          items={[
            { icon: "pen", label: "記述式・人力採点" },
            { icon: "clock", label: "期間内に受験" },
            { icon: "grid", label: `${moshi.universities.length}大学` },
          ]}
        />

        <header className="border-b border-rule pb-8 pt-6">
          <div className="grid items-center gap-7 lg:grid-cols-[1fr_26rem] lg:gap-12">
            <div className="min-w-0">
              <p className="eyebrow">{moshi.season}</p>
              <h1 className="serif h-page mt-1.5 text-ink">{moshi.title}</h1>
              <p className="prose-ja mt-4 text-[1rem] leading-[1.95] text-ink-2 sm:text-[1.05rem]">
                志望校1校の入試形式に合わせて作るオンライン数学模試です。記述答案はすべて人の手で採点し、
                採点済み答案と、成績表・答案講評・今後の学習の助言をPDFでお返しします。
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

        {/*
          対象の大学を最初に出す。自分の大学があるかどうかが分からないと、
          その下を読む理由がない。札はそのまま大学別のページへの入口にする。
        */}
        <section aria-labelledby="unis-top" className="mt-9">
          <h2 id="unis-top" className="text-[0.95rem] font-semibold text-ink">
            開催する{moshi.universities.length}大学
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {moshi.universities.map((u) => (
              <li key={u.id}>
                <Link
                  href={moshiPath(u)}
                  className="inline-flex min-h-9 items-center border border-rule bg-white px-3 text-[0.86rem] text-ink transition-colors hover:border-[var(--sec)] hover:text-[var(--sec)]"
                >
                  {u.university}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-2.5 text-[0.78rem] text-ink-3">
            大学名を選ぶと、その大学の出題形式・頻出分野と、全大学共通の見本をご覧いただけます。
          </p>
        </section>

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
                { k: "受験料", v: priceLabel, note: "参加申込の時点では料金は発生しません" },
                { k: "採点と返却", v: "全答案を人力で採点", note: `${deliverableLine}をまとめてお返しします` },
                {
                  k: "お支払い",
                  v: "クレジットカード",
                  note: "学校・塾でまとめてお申し込みの場合は、請求書・銀行振込の後払いも承ります",
                },
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

        {/* この模試の中身。点数だけ返す模試との違いが出る場所なので、要項の次に置く */}
        <section aria-labelledby="back" className="mt-14">
          <h2 id="back" className="rule-mark serif h-sect text-ink">
            受験後にお返しするもの
          </h2>
          <p className="prose-ja mt-2.5 max-w-[40rem] text-[0.9rem] leading-[1.95] text-ink-2">
            答案は人の手で最後まで読みます。合計点と大問別の得点に加えて、
            答案の書き方への講評、分野ごとの得意・不得意、そこから見た今後の学習の助言までをまとめてお返しします。
          </p>
          <MoshiDeliverables />
        </section>

        <section aria-labelledby="flow" className="mt-14">
          <h2 id="flow" className="rule-mark serif h-sect text-ink">
            受験までの流れ
          </h2>
          <Flow />
        </section>

        {/*
          「冠模試」「大学別模試」で探している人に、何を指す言葉かを先に示す。
          言葉の説明であって、他社の模試の有無について断定はしない。
        */}
        <section aria-labelledby="about-kanmoshi" className="mt-14">
          <h2 id="about-kanmoshi" className="rule-mark serif h-sect text-ink">
            大学別模試（冠模試）とは
          </h2>
          <div className="prose-ja mt-3 max-w-[40rem] space-y-3 text-[0.9rem] leading-[1.95] text-ink-2">
            <p>
              志望校1校の入試形式に合わせて作る模試を、大学別模試（冠模試）と呼びます。
              全国共通の模試が「全体の中での位置」を測るのに対し、大学別模試は
              <strong className="font-semibold text-ink">その大学の試験時間・大問構成・解答形式・頻出分野</strong>
              のまま解いて、本番と同じ条件で答案を書く練習をするためのものです。
            </p>
            <p>
              本模試は{moshi.universities.length}大学で実施します。旧帝大から、三重大学・岡山大学・千葉大学といった
              地方国公立大学まで、いずれも当サイトが{totals.span}の過去問を分析したうえで作問します。
              答案はすべて人の手で読み、点数だけでなく、答案の書き方への講評と今後の学習の助言までお返しします。
            </p>
          </div>
        </section>

        <section aria-labelledby="unis" className="mt-14">
          <h2 id="unis" className="rule-mark serif h-sect text-ink">
            開催予定の{moshi.universities.length}大学
          </h2>
          <p className="prose-ja mt-2.5 text-[0.88rem] text-ink-2">
            {roundLabel}。受験料はいずれも{priceLabel}です。
          </p>

          {/*
            同じ条件をカードごとに繰り返すと画面が埋まるので、
            期間・料金・採点は上の1行にまとめ、札には大学名と模試名だけを置く。
          */}
          {/*
            札そのものを、その大学の案内ページへの入口にする。
            「三重大の模試」を探して来た人が、10大学の中から自分の大学を
            見つけ直さずに済むようにするため。
          */}
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {moshi.universities.map((u) => {
              const analysis = analysisHref(u);
              return (
                <li key={u.id}>
                  <Link href={moshiPath(u)} className="card card-link group flex h-full items-center gap-3 px-4 py-3.5">
                    <span className="min-w-0 flex-1">
                      <span className="block text-[1rem] font-semibold leading-snug text-ink transition-colors group-hover:text-navy">
                        {u.university}
                      </span>
                      <span className="mt-0.5 block text-[0.8rem] text-ink-2">{u.exam}</span>
                      {analysis && (
                        <span className="mt-1.5 block text-[0.72rem] text-ink-3">
                          出題形式・頻出分野・共通見本
                        </span>
                      )}
                    </span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      className="size-3.5 shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m7 4 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-[0.78rem] text-ink-3">
            いずれも開催予定です。大学名を選ぶと、その大学の出題形式と、全大学共通の見本をご覧いただけます。
          </p>
        </section>

        {/*
          数学の総合評価と、統計的な合格確率・他教科を含む判定を区別する。
          統計の掲載条件も、申し込む前に確認できるようにする。
        */}
        <section aria-labelledby="not-provided" className="mt-14">
          <h2 id="not-provided" className="rule-mark serif h-sect text-ink">
            判定・偏差値について
          </h2>
          <div className="mt-4 border border-rule">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 border-b border-rule bg-paper-2 px-5 py-3.5">
              {moshi.notProvided.map((x) => (
                <li key={x} className="flex items-center gap-1.5 text-[0.9rem] font-semibold text-ink">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    className="size-4 shrink-0 text-ink-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <circle cx="10" cy="10" r="7.5" />
                    <path d="M5.5 5.5l9 9" strokeLinecap="round" />
                  </svg>
                  {x}
                </li>
              ))}
            </ul>
            <div className="prose-ja space-y-3 px-5 py-4 text-[0.88rem] leading-[1.95] text-ink-2">
              <p>
                {moshi.judgementNote}
              </p>
              <p>
                <strong className="font-semibold text-ink">平均点・偏差値・順位分布</strong>は、
                その大学の受験者が{moshi.statsMin}名以上になった回から、成績表に載せます。
                {moshi.statsNote.replace(/^受験者が.*?では、/, "それまでは出しません。")}
              </p>
              <p>
                受験者数にかかわらず、数学の合格参考判定・学習到達度とともに、
                <strong className="font-semibold text-ink">答案のどこで何点落としたか</strong>、
                <strong className="font-semibold text-ink">次に何を直すか</strong>をお返しします。
                全体の中での位置を知りたい場合は、全国規模の模試とあわせてお使いください。
              </p>
            </div>
          </div>
        </section>

        {/* 申し込む前に中身を確かめられるようにする。文章で説明するより早い */}
        <section aria-labelledby="sample-heading" className="mt-14 scroll-mt-20" id="sample">
          <h2 id="sample-heading" className="rule-mark serif h-sect text-ink">
            出る問題と、返ってくるもの
          </h2>
          <p className="prose-ja mt-2.5 max-w-[40rem] text-[0.88rem] leading-[1.9] text-ink-2">
            出る問題と、受験後に返ってくるものを、どちらも現物で公開しています。
            カラーの返却レポートと、問題・解答・採点基準の見本をご覧いただけます。
          </p>
          <MoshiSample />
        </section>

        <section aria-labelledby="apply-heading" className="mt-14 scroll-mt-20" id="apply">
          <h2 id="apply-heading" className="rule-mark rule-mark-accent serif h-sect text-ink">
            参加申込
          </h2>
          <p className="prose-ja mt-2.5 max-w-[38rem] text-[0.9rem] leading-[1.95] text-ink-2">
            受験を希望する大学を選び、お名前・メールアドレス・学年をご記入ください。
            参加申込後、正式な受験日程をメールでご案内します。{paymentLine}
            {cancelLine}
          </p>
          <MoshiForm />
        </section>

        {/*
          決済の仕組みは作っていない。人数が少ないうちは、一人ずつやりとりするほうが早い。
          だから「聞ける先がある」ことを、申込のすぐ下に出しておく。
        */}
        {site.contact && (
          <section aria-labelledby="ask-moshi" className="mt-10 border border-rule bg-paper-2 px-5 py-5 sm:px-6">
            <h2 id="ask-moshi" className="text-[0.95rem] font-semibold text-ink">
              お支払いや受験の仕方について、ご不明な点は
            </h2>
            <p className="prose-ja mt-2 max-w-[40rem] text-[0.86rem] leading-[1.9] text-ink-2">
              個人のお支払いはクレジットカードによるオンライン決済です。学校・塾でまとめてお申し込みの場合は、
              請求書・銀行振込の後払いも承ります。受験の進め方など、気になることはお申し込みの前でも後でもお尋ねください。
            </p>
            <p className="mt-3 break-all font-mono text-[0.95rem]">
              <a href={`mailto:${site.contact}`} className="text-navy underline underline-offset-4">
                {site.contact}
              </a>
            </p>
          </section>
        )}

        {/* 学校・塾でまとめて受けさせたい先生向け。個人の申込とは別の入口を置く */}
        <section
          aria-labelledby="for-teachers"
          className="mt-14 border border-rule"
          style={sectionStyle("educators")}
        >
          <div className="sec-rule" />
          <div className="flex flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div className="min-w-0">
              <p className="eyebrow">学校・塾・予備校の先生へ</p>
              <h2 id="for-teachers" className="serif mt-1.5 text-[1.15rem] leading-snug text-ink">
                クラス単位でのお申し込みもご相談ください
              </h2>
              <p className="prose-ja mt-2 max-w-[38rem] text-[0.86rem] leading-[1.9] text-ink-2">
                講座や学年のまとまりで受験させたい場合のご相談を承っています。
                採点は人の手で行うため、人数と時期によってはお受けできないことがあります。
                おおよその人数と希望時期をお知らせください。
              </p>
            </div>
            <Link href="/educators#moshi" className="btn shrink-0">
              先生方へのご案内
            </Link>
          </div>
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
