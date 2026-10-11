import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CoverFan } from "@/components/cover-fan";
import { FactStrip } from "@/components/fact-strip";
import { MoshiForm } from "@/components/moshi-form";
import { MoshiDeliverables } from "@/components/moshi-deliverables";
import { MoshiSample } from "@/components/moshi-sample";
import { MobileActions } from "@/components/mobile-actions";
import { MoshiReportCover } from "@/components/moshi-report-cover";
import { PageJumps } from "@/components/page-jumps";
import { Flow } from "@/components/moshi-visual";
import { factsLine, fieldChartCaption, getUniversity, yearRange, yearsLabel } from "@/lib/data";
import {
  deliverableLine,
  moshi,
  moshiById,
  moshiPath,
  paymentShortLine,
  priceLabel,
  roundLabel,
} from "@/lib/moshi/config";
import { sections, sectionStyle } from "@/lib/sections";
import { shortName } from "@/lib/seo";
import { getKansei } from "@/lib/series";
import { published } from "@/lib/solutions";
import { site } from "@/lib/site";

/**
 * 大学別の模試の案内。
 *
 * 1枚にまとめていた案内を、大学ごとに分けたページ。理由は2つある。
 *
 * 1. 探している人の言葉に合わせる。「三重大 数学 模試」で探している人に、
 *    10大学を並べた1枚を見せても、自分の大学の話がどこにあるか分からない。
 * 2. 中身が大学ごとに違う。試験時間・大問数・解答形式・頻出分野は
 *    **当サイトの分析データから出している**ので、同じ文章の使い回しにならない。
 *
 * 書いてよいのは、分析で確かめた事実と、この模試でこちらが決めたことだけ。
 * 大学が公表していない配点・採点基準・難易度を、大学のものとして出さない。
 */

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return moshi.universities.map((u) => ({ id: u.id }));
}

export const dynamicParams = false;

/** 「三重大 数学 模試」のように探す人の言葉を、事実の範囲でひととおり並べる */
function keywordsFor(id: string): string[] {
  const m = moshiById(id);
  if (!m) return [];
  const u = m.slug ? getUniversity(m.slug) : undefined;
  const short = u ? shortName(u) : m.university;
  const bare = m.university.replace(/大学$/, "大");
  return [
    `${m.university} 数学 模試`,
    `${bare} 数学 模試`,
    `${m.university} 模試`,
    `${short} 模試`,
    `${m.university} 冠模試`,
    `${m.university} 記述模試 数学`,
    `${m.university} 数学 対策`,
    "大学別 数学 模試",
    "オンライン 数学模試 記述",
  ];
}

/**
 * よくある質問。
 *
 * 探す人が打ち込む言葉のまま問いを立てる（「三重大の数学の模試はある？」）。
 * 答えはこのページに書いてある事実と、模試でこちらが決めたことだけで作る。
 * 大学が公表していないことを、大学のものとして書かない。
 */
function faqFor(m: NonNullable<ReturnType<typeof moshiById>>) {
  const u = m.slug ? getUniversity(m.slug) : undefined;
  const bare = m.university.replace(/大学$/, "大");
  const items: { q: string; a: string }[] = [];

  items.push({
    q: `${bare}の数学の模試はありますか？`,
    a:
      `当サイトが${m.university}の数学の形式に合わせて作る「${m.exam}」を、${moshi.season}に実施します。` +
      `オンラインで受験でき、記述答案は人の手で採点します。講評と今後の学習の助言までお返しします。`,
  });

  items.push({
    q: `${bare}の冠模試とは何が違いますか？`,
    a:
      `冠模試は志望校1校の入試形式に合わせて作る模試のことで、本模試もその形式です。` +
      `当サイトのものは会場に集まらず、受験期間のうち都合のよい日時にオンラインで受けられます。` +
      `本模試は${m.university}とは関係のない、当サイトが独自に制作・実施するものです。`,
  });

  if (u && (u.facts.examTime || u.facts.questions)) {
    const parts = [
      u.facts.examTime ? `試験時間は${u.facts.examTime}分` : null,
      u.facts.questions ? `大問は${u.facts.questions}題` : null,
      u.facts.style ? `解答形式は${u.facts.style}` : null,
    ].filter(Boolean);
    items.push({
      q: `${bare}の数学はどんな試験ですか？`,
      a: `当サイトが${yearsLabel(u) ?? "過去"}の過去問を分析した範囲では、${parts.join("、")}です。本模試もこの形式に合わせて作問します。`,
    });
  }

  if (u?.fieldChart?.items.length) {
    const top = u.fieldChart.items.slice(0, 3);
    items.push({
      q: `${bare}の数学で狙われやすい分野はどこですか？`,
      a:
        `${yearsLabel(u) ?? "分析対象期間"}の出題を分野別に数えると、` +
        `${top.map((t) => `${t.label}（${t.count}題）`).join("、")}が多く出ています。` +
        `本模試の作問でもこの偏りを踏まえます。`,
    });
  }

  items.push({
    q: "どんな問題が出るのか、申し込む前に確かめられますか？",
    a:
      "大学を特定しない共通見本として、このページに問題を1題載せています。解答例と採点表（どこに点が付き、どこで引かれるか）まで公開しています。" +
      "見本は既刊「合格答案をつくる」シリーズの予想問題を作り替えたもので、大学の過去問そのものではありません。",
  });

  items.push({
    q: "過去問がそのまま出題されますか？",
    a:
      "出題しません。出題形式・大問構成・頻出分野の分析にもとづいて、すべて書き下ろします。" +
      "問題文の転載も行いません。",
  });

  items.push({
    q: "受験料はいくらですか。申込の時点でかかりますか？",
    a:
      `受験料は${priceLabel}。参加申込の時点では料金は発生しません。` +
      `正式な受験日程とお支払い方法は、確定しだいメールでご案内します。`,
  });

  return items;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const m = moshiById(id);
  if (!m) return {};
  const u = m.slug ? getUniversity(m.slug) : undefined;
  const bare = m.university.replace(/大学$/, "大");

  // 「三重大 数学 模試」を先頭に置く。サイト名を足すと検索結果で切れるので、
  // このページだけはテンプレートを使わず題名を決める。
  const title = `${bare} 数学 模試｜${m.university} ${m.exam}`;
  const description =
    `${m.university}の数学に合わせて作る大学別の数学模試です。` +
    (u ? `${factsLine(u)}という出題形式を踏まえ、` : "") +
    `オンラインで実施し、記述答案はすべて人力で採点します。${roundLabel}。受験料は${priceLabel}。`;

  return {
    title: { absolute: `${title}（${moshi.season}）` },
    description,
    keywords: keywordsFor(id),
    alternates: { canonical: moshiPath(m) },
    openGraph: {
      title,
      description,
      url: moshiPath(m),
      type: "website",
      images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og/home.jpg"] },
  };
}

export default async function MoshiUniversityPage({ params }: Props) {
  const { id } = await params;
  const m = moshiById(id);
  if (!m) notFound();

  const u = m.slug ? getUniversity(m.slug) : undefined;
  const bare = m.university.replace(/大学$/, "大");
  const others = moshi.universities.filter((x) => x.id !== m.id);

  // この大学について、サイトの中で続けて読めるもの
  const kansei = m.slug ? getKansei(m.slug) : undefined;
  const sets = m.slug ? published.filter((s) => s.slug === m.slug) : [];
  const covers = u ? u.books.slice(0, 3).map((b) => `/covers/thumb/${b.asin}.webp`) : [];

  // 分析から出した頻出分野。上位だけを出す
  const top = u?.fieldChart?.items.slice(0, 5) ?? [];

  const faq = faqFor(m);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: `${bare} 数学 模試`,
        description: `${m.university}の数学に合わせて作る大学別の数学模試の案内です。`,
        url: `${site.url}${moshiPath(m)}`,
        isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
        inLanguage: "ja",
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "トップ", item: site.url },
          { "@type": "ListItem", position: 2, name: sections.moshi.eyebrow, item: `${site.url}/moshi` },
          { "@type": "ListItem", position: 3, name: `${m.university} ${m.exam}`, item: `${site.url}${moshiPath(m)}` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="page page-wide mobile-compact" style={sectionStyle("moshi")}>
        <MobileActions primary={{href: "#apply", label: "参加申込"}} secondary={{href: "#sample", label: "見本を見る"}} />
        <nav aria-label="パンくず" className="breadcrumb pt-3 text-[0.75rem] text-ink-3">
          <Link href="/" className="hover:text-navy">
            トップ
          </Link>
          <span className="mx-1.5 text-rule">／</span>
          <Link href="/moshi" className="hover:text-navy">
            {sections.moshi.eyebrow}
          </Link>
          <span className="mx-1.5 text-rule">／</span>
          <span className="text-ink-2">{m.university}</span>
        </nav>

        <div className="sec-rule mt-3" />

        <FactStrip
          items={[
            { icon: "grid", label: `${bare}の形式` },
            { icon: "pen", label: "記述式・人力採点" },
            { icon: "clock", label: "期間内に受験" },
          ]}
        />

        <header className="border-b border-rule pb-9 pt-7">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-x-12">
            <div className="min-w-0">
              <p className="eyebrow">
                {moshi.season}・{moshi.title}
              </p>
              <h1 className="serif h-page mt-2 text-ink">
                {m.university}
                <br className="sm:hidden" />
                <span className="sm:ml-3">{m.exam}</span>
              </h1>
              <p className="prose-ja mt-4 max-w-[38rem] text-[0.97rem] leading-[1.95] text-ink-2">
                {m.university}の数学の形式に合わせて作る
                <strong className="font-semibold text-ink">大学別の数学模試</strong>
                （冠模試の形式）です。記述答案は人の手で採点し、講評と今後の学習の助言までお返しします。
              </p>

              <p className="mt-6 flex flex-wrap gap-3">
                <Link href="#apply" className="btn btn-primary">
                  {bare}の模試に申し込む
                </Link>
                <Link href="#sample" className="btn">
                  見本問題を見る
                </Link>
              </p>
              <p className="mt-2.5 text-[0.8rem] text-ink-3">参加申込の時点では料金は発生しません。</p>
            </div>

            <MoshiReportCover className="mt-9 hidden w-full max-w-[22rem] sm:block lg:mt-0" />
          </div>
        </header>
        <PageJumps items={[
          { href: "#youkou-u", label: "日程・受験料" },
          { href: "#sample", label: "問題・返却見本" },
          { href: "#faq-heading", label: "よくある質問" },
          { href: "#apply", label: "参加申込" },
        ]} />

        {/* この大学の出題形式。数字はすべて当サイトの分析データから出す */}
        {u && (
          <section aria-labelledby="form" className="mt-12">
            <h2 id="form" className="rule-mark serif h-sect text-ink">
              {bare}の数学は、こういう試験です
            </h2>
            <p className="prose-ja mt-2.5 max-w-[40rem] text-[0.93rem] leading-[1.9] text-ink-2">
              当サイトが{yearsLabel(u) ?? "過去"}の過去問を分析した結果です。本模試は、この形式に合わせて作問します。
            </p>

            <dl className="mt-5 grid grid-cols-2 gap-px border border-rule bg-rule lg:grid-cols-4">
              {[
                { k: "試験時間", v: u.facts.examTime ? `${u.facts.examTime}分` : "—", n: u.facts.examTimeNote },
                {
                  k: "大問数",
                  v: u.facts.questions ? `${u.facts.questions}題` : u.facts.selective ? "選択制" : "—",
                  n: u.facts.selective ? "志望学部や選択により解く問題が決まります" : undefined,
                },
                { k: "解答形式", v: u.facts.style ?? "—" },
                {
                  k: "分析した年度",
                  v: yearRange(u) ?? yearsLabel(u) ?? "—",
                  n: yearRange(u) && u.yearCount ? `${u.yearCount}年分` : undefined,
                },
              ].map((x) => (
                <div key={x.k} className="bg-white px-4 py-4">
                  <dt className="text-[0.75rem] text-ink-3">{x.k}</dt>
                  <dd className="serif mt-1 text-[1.15rem] leading-snug text-ink">{x.v}</dd>
                  {x.n && <dd className="mt-1 text-[0.75rem] leading-relaxed text-ink-3">{x.n}</dd>}
                </div>
              ))}
            </dl>

            {u.goal && (
              <p className="prose-ja mt-4 border-l-2 border-navy/40 bg-paper-2/60 px-4 py-3 text-[0.86rem] leading-[1.9] text-ink-2">
                {u.goal}
              </p>
            )}

            {top.length > 0 && u.fieldChart && (
              <div className="mt-7">
                <h3 className="text-[0.97rem] font-semibold text-ink">よく出ている分野</h3>
                <p className="mt-1.5 text-[0.8rem] leading-relaxed text-ink-3">
                  {fieldChartCaption(u.fieldChart, u.yearCount)}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {top.map((f) => (
                    <li key={f.label} className="badge badge-navy">
                      {f.label}
                      <span className="ml-1 tabular-nums font-normal">{f.count}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[0.86rem]">
                  <Link href={`/univ/${u.slug}`} className="text-navy underline underline-offset-4">
                    {bare}数学の出題分析をくわしく読む
                  </Link>
                </p>
              </div>
            )}
          </section>
        )}

        <section aria-labelledby="back" className="mt-14">
          <h2 id="back" className="rule-mark serif h-sect text-ink">
            受験後にお返しするもの
          </h2>
          <p className="prose-ja mt-2.5 max-w-[40rem] text-[0.93rem] leading-[1.9] text-ink-2">
            答案は人の手で最後まで読みます。{bare}の出題傾向と照らして、
            どの分野をどの順で詰めるかまで書いてお返しします。
          </p>
          <MoshiDeliverables />
        </section>

        {/* 見本。申し込む前に中身を確かめられるようにする */}
        <section aria-labelledby="sample-heading" className="mt-14 scroll-mt-20" id="sample">
          <h2 id="sample-heading" className="rule-mark serif h-sect text-ink">
            問題・返却の見本
          </h2>
          <p className="prose-ja mt-2.5 max-w-[40rem] text-[0.93rem] leading-[1.9] text-ink-2">
            返却PDFと、問題・解答・採点基準を公開しています。
          </p>
          <MoshiSample />
        </section>

        <section aria-labelledby="youkou-u" className="mt-14">
          <h2 id="youkou-u" className="rule-mark serif h-sect scroll-mt-20 text-ink">
            実施要項
          </h2>
          <dl className="mt-5 divide-y divide-rule border border-rule">
            {[
              ["対象", `${m.university}の数学を受験する方（${m.exam}）`],
              ["実施時期", `${roundLabel}。正式な日程は確定しだいご案内します`],
              ["受験方法", "オンライン・期間内の好きな日時"],
              ["受験料", `${priceLabel}。参加申込の時点では料金は発生しません`],
              ["お支払い", paymentShortLine],
              ["採点と返却", `記述答案を人力で採点し、${deliverableLine}をまとめてお返しします`],
            ].map(([k, v]) => (
              <div key={k} className="grid gap-x-5 px-4 py-3.5 sm:grid-cols-[7rem_1fr]">
                <dt className="text-[0.8rem] leading-relaxed text-ink-3">{k}</dt>
                <dd className="prose-ja mt-1 text-[0.93rem] leading-[1.9] text-ink-2 sm:mt-0">{v}</dd>
              </div>
            ))}
          </dl>
          <Flow />
        </section>

        <section aria-labelledby="apply-heading" className="mt-14 scroll-mt-20" id="apply">
          <h2 id="apply-heading" className="rule-mark rule-mark-accent serif h-sect text-ink">
            {bare}の模試に申し込む
          </h2>
          <p className="prose-ja mt-2.5 max-w-[38rem] text-[0.93rem] leading-[1.95] text-ink-2">
            {m.university}にはあらかじめ印を付けてあります。ほかの大学も受けたい場合は、続けてお選びください。
            正式な受験日程をメールでご案内します。参加申込の時点では料金は発生しません。
          </p>
          <MoshiForm preselect={[m.id]} />
        </section>

        {/* この大学について、続けて読めるもの */}
        {u && (
          <section aria-labelledby="more" className="mt-16 border-t border-rule pt-9">
            <h2 id="more" className="serif h-sect text-ink">
              {bare}の数学を、ほかにも
            </h2>
            <div className="mt-5 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-x-10">
              <ul className="divide-y divide-rule border-y border-rule">
                {[
                  { href: `/univ/${u.slug}`, h: `${bare}数学の出題分析`, body: `${yearsLabel(u) ?? "過去"}の出題を、年度別・分野別の表にまとめています。` },
                  ...(sets.length
                    ? [
                        {
                          href: `/kaisetsu/${u.slug}`,
                          h: `${bare}数学の過去問の解答・解説`,
                          body: `${sets.map((s) => `${s.year}年度`).join("・")}を、当サイトが独自に解いた解答・詳解つきで掲載しています。`,
                        },
                      ]
                    : []),
                  ...(kansei
                    ? [
                        {
                          href: `/kansei/${kansei.slug}`,
                          h: `${bare}数学 分野別完成演習`,
                          body: "頻出分野を、標準から本番の水準まで段階的に上げる演習書です。",
                        },
                      ]
                    : []),
                  ...(u.books.length
                    ? [
                        {
                          href: `/univ/${u.slug}#books`,
                          h: `${bare}数学の予想問題集（合格答案をつくる）`,
                          body: `本番と同じ試験時間・大問構成で書き下ろした予想問題集を全${u.books.length}巻刊行しています。`,
                        },
                      ]
                    : []),
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="group flex items-center justify-between gap-5 py-4">
                      <span className="min-w-0">
                        <span className="block text-[0.93rem] font-semibold text-ink transition-colors group-hover:text-navy">
                          {l.h}
                        </span>
                        <span className="mt-1 block text-[0.86rem] leading-relaxed text-ink-3">{l.body}</span>
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
                ))}
              </ul>

              {covers.length > 0 && (
                <CoverFan covers={covers} className="mt-6 hidden shrink-0 lg:mt-0 lg:flex" />
              )}
            </div>
          </section>
        )}

        <section aria-labelledby="faq-heading" className="mt-14">
          <h2 id="faq-heading" className="rule-mark serif h-sect scroll-mt-20 text-ink">
            {bare}の数学の模試について、よくある質問
          </h2>
          <div className="mt-5 divide-y divide-rule border-y border-rule">
            {faq.map((f) => (
              <details key={f.q}>
                <summary className="min-h-11 cursor-pointer py-3 text-[0.86rem] font-semibold leading-relaxed text-ink">{f.q}</summary>
                <p className="prose-ja pb-4 text-[0.93rem] text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ほかの大学の模試。探している大学が違った人をそのまま帰らせない */}
        <section aria-labelledby="others" className="mt-14">
          <h2 id="others" className="serif h-sect text-ink">
            ほかの大学の模試
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.id}>
                <Link href={moshiPath(o)} className="badge transition-colors hover:border-navy/40 hover:text-navy">
                  {o.university}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.86rem]">
            <Link href="/moshi" className="text-navy underline underline-offset-4">
              {sections.moshi.eyebrow}の案内をまとめて見る
            </Link>
          </p>
        </section>

        <p className="prose-ja mt-14 border-t border-rule pt-6 text-[0.8rem] leading-[1.9] text-ink-3">
          本模試は{m.university}とは関係のない、当サイトが独自に制作・実施するものです。
          大学の過去問そのものは出題しません。出題形式の分析は当サイトが過去問にあたって行ったもので、
          配点・採点基準は本模試のものです。大学が公表しているものではありません。
        </p>
      </div>
    </>
  );
}
