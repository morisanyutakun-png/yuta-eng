import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AmazonButton } from "@/components/amazon-button";
import { ArticleLayout } from "@/components/article-layout";
import { AsideBook } from "@/components/aside-book";
import { FaqSection } from "@/components/faq";
import { KanseiCards } from "@/components/kansei-cards";
import { LearningPath } from "@/components/learning-path";
import { LookInsideSection } from "@/components/look-inside-section";
import { bookMetaLine, yen } from "@/lib/books";
import { factsLine, getUniversity } from "@/lib/data";
import { Blocks, Spans } from "@/lib/render";
import type { Faq } from "@/lib/seo";
import {
  daysAt,
  getKansei,
  kanseiPublished,
  seriesName,
  seriesTagline,
  shindan,
  type Kansei,
} from "@/lib/series";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

// 販売中の巻だけページを作る（data/books.json に載ったら自動で増える）。
export function generateStaticParams() {
  return kanseiPublished.map((k) => ({ slug: k.slug }));
}

export const dynamicParams = false;

const yearsOf = (k: Kansei) => (k.years.length === 2 ? `${k.years[0]}〜${k.years[1]}年度` : "過去");
const fieldsOf = (k: Kansei) => k.chapters.map((c) => c.field);

function titleOf(k: Kansei) {
  return `${k.university} 数学 問題集｜${k.name} 分野別完成演習 2027`;
}

function descriptionOf(k: Kansei) {
  const label = k.name.includes("理系") ? `${k.university}（理系）` : k.university;
  // 分野名そのものに「・」を含む（「微分法・積分法」）ので、分野の区切りは「、」にする
  return (
    `${label}の数学対策問題集。${yearsOf(k)}の出題を分析して選んだ頻出${k.total.fields}分野から、` +
    `全${k.total.problems}題${k.total.subquestions ? `・${k.total.subquestions}小問` : ""}を標準→やや難→本番接続の順に収録。` +
    `収録分野は${fieldsOf(k).join("、")}。`
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const k = getKansei(slug);
  if (!k) return {};
  const title = titleOf(k);
  const description = descriptionOf(k);
  const names = [k.university, k.uni, k.alias].filter(Boolean) as string[];
  return {
    title,
    description,
    keywords: [
      ...names.flatMap((n) => [`${n} 数学`, `${n} 数学 問題集`, `${n} 数学 対策`]),
      `${k.university} 頻出分野`,
      `${k.uni} 数学 頻出分野`,
      `${k.name} 問題集`,
      `${k.name} 対策`,
    ],
    alternates: { canonical: `/kansei/${k.slug}` },
    openGraph: {
      title,
      description,
      url: `/kansei/${k.slug}`,
      type: "article",
      images: [{ url: `/og/kansei-${k.slug}.jpg`, width: 1200, height: 630, alt: `${k.name} 分野別完成演習` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [`/og/kansei-${k.slug}.jpg`] },
  };
}

function buildFaq(k: Kansei): Faq[] {
  const list: Faq[] = [
    {
      q: `${k.uni}の数学で頻出の分野は何ですか？`,
      a: `本書が${yearsOf(k)}の出題を分析して選んだ${k.total.fields}分野は、${fieldsOf(k).join("、")}です。各分野で${k.uni}が何を要求するかは、このページの「分野ごとの出題傾向」で章ごとにまとめています。`,
    },
    {
      q: `${k.name}の問題集は何題で、どれくらいで終わりますか？`,
      a: `全${k.total.problems}題${k.total.subquestions ? `（小問は計${k.total.subquestions}問）` : ""}で、目標時間の合計は${k.total.minutes}分です。1日90分ならおよそ${daysAt(k.total.minutes)}日でひととおり終わる分量です。`,
    },
  ];
  if (k.beforeIII.label) {
    list.push({
      q: "数学IIIを学習中でも使えますか？",
      a: `${k.beforeIII.label}の${k.beforeIII.problems}題は、数学IIIを使わずに解けるように作られています。数学IIIの学習中はこの範囲から取り組めます。`,
    });
  }
  list.push(
    {
      q: `いつ${k.uni}の過去問に進めばよいですか？`,
      a: `各章の「本番接続」の問題が自力で完答できるようになったら、過去問演習に進んでかまいません。過去問演習へ移る順序は本書の付録にまとめています。本番形式の訓練は、そのあと過去問と『合格答案をつくる』で行います。`,
    },
    {
      q: "過去問がそのまま載っていますか？",
      a: `収録問題はすべて本書のための書き下ろしです。${k.university}の過去問は出題傾向の分析にのみ用い、問題文の転載や改題はしていません。`,
    },
  );
  return list;
}

const levelStyle: Record<string, string> = {
  標準: "border-rule text-ink-2",
  やや難: "border-navy/40 text-navy",
  本番接続: "border-accent/60 bg-accent/5 text-accent",
};

export default async function KanseiPage({ params }: Props) {
  const { slug } = await params;
  const k = getKansei(slug);
  if (!k) notFound();

  const analysis = getUniversity(k.slug);
  const faqs = buildFaq(k);
  // getKansei は販売中の巻しか返さないので、商品情報も URL も必ずある
  const c = k.catalog!;
  const url = k.amazonUrl!;
  const meta = bookMetaLine(c);
  const others = kanseiPublished.filter((x) => x.slug !== k.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Book",
        "@id": url,
        name: c.title ?? `${k.name} 分野別完成演習`,
        url,
        inLanguage: "ja",
        bookFormat: "https://schema.org/Paperback",
        author: { "@type": "Person", name: site.author },
        numberOfPages: c.pages,
        isbn: c.isbn13,
        datePublished: c.released,
        image: `${site.url}${k.cover}`,
        description: descriptionOf(k),
        about: [
          { "@type": "CollegeOrUniversity", name: k.university },
          ...fieldsOf(k).map((f) => ({ "@type": "Thing", name: f })),
        ],
        isPartOf: { "@type": "BookSeries", name: seriesName },
        ...(c.price
          ? {
              offers: {
                "@type": "Offer",
                price: c.price,
                priceCurrency: "JPY",
                url,
                seller: { "@type": "Organization", name: "Amazon.co.jp" },
              },
            }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "トップ", item: site.url },
          { "@type": "ListItem", position: 2, name: "分野別完成演習", item: `${site.url}/kansei` },
          { "@type": "ListItem", position: 3, name: k.name, item: `${site.url}/kansei/${k.slug}` },
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

      <ArticleLayout
        breadcrumb={[
          { href: "/", label: "トップ" },
          { href: "/kansei", label: "分野別完成演習" },
          { label: k.name },
        ]}
        aside={
          <>
            <AsideBook
              eyebrow="過去問の前にシリーズ"
              title={`${k.name} 分野別完成演習`}
              cover={k.cover}
              href={url}
              book={c}
              note={`頻出${k.total.fields}分野・全${k.total.problems}題。目標時間 計${k.total.minutes}分。`}
            />
            {analysis && (
              <AsideBook
                eyebrow="過去問演習の段階で"
                title={analysis.books[0].title}
                cover={`/covers/${analysis.books[0].asin}.webp`}
                href={analysis.books[0].amazonUrl}
                book={analysis.books[0]}
                note={`本番と同じ形式の予想問題${analysis.books[0].rounds ? `${analysis.books[0].rounds}回分` : ""}。`}
                detail={{ href: `/univ/${analysis.slug}`, label: `${k.uni}数学の傾向と対策を見る` }}
              />
            )}
          </>
        }
      >
        <header className="pb-2 pt-4">
          <p className="text-[0.72rem] font-semibold tracking-wide text-navy">
            {k.university}
            {k.alias ? `（${k.alias}）` : ""}・2027年度対策
          </p>
          <div className="mt-2.5 grid grid-cols-[1fr_auto] gap-x-4">
            <div className="min-w-0">
              <h1 className="serif text-[1.7rem] leading-[1.35] text-ink sm:text-[2.15rem]">
                {k.name}
                <br />
                <span className="text-[0.72em]">分野別完成演習</span>
              </h1>
              <p className="mt-2.5 text-[0.8rem] font-semibold text-ink-2">{seriesTagline}</p>
            </div>
            <a
              href={url}
              rel="noopener nofollow sponsored"
              target="_blank"
              aria-label={`${k.name} 分野別完成演習をAmazonで見る`}
              className="col-start-2 row-start-1 w-[96px] shrink-0 sm:row-span-2 sm:w-[128px]"
            >
              <Image
                src={k.cover}
                alt={`${k.name} 分野別完成演習の表紙`}
                width={310}
                height={438}
                priority
                sizes="(max-width: 640px) 96px, 128px"
                className="w-full rounded-[2px] border border-rule shadow-[0_1px_3px_rgba(21,24,28,0.09)]"
              />
            </a>
            {k.opener && (
              <p className="prose-ja col-span-2 mt-5 text-[0.93rem] text-ink-2 sm:col-span-1">{k.opener}</p>
            )}
          </div>

          <dl className="mt-6 grid grid-cols-4 gap-x-2 border-y border-rule py-4">
            {[
              { k: "頻出分野", v: String(k.total.fields), u: "分野" },
              { k: "収録", v: String(k.total.problems), u: "題" },
              { k: "小問", v: k.total.subquestions ? String(k.total.subquestions) : "—", u: k.total.subquestions ? "問" : "" },
              { k: "目標時間の合計", v: String(k.total.minutes), u: "分" },
            ].map((r) => (
              <div key={r.k}>
                <dt className="text-[0.63rem] leading-tight text-ink-3">{r.k}</dt>
                <dd className="serif mt-1 leading-none text-ink">
                  <span className="text-[1.45rem] tabular-nums">{r.v}</span>
                  <span className="ml-0.5 font-sans text-[0.66rem] font-normal text-ink-3">{r.u}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            <AmazonButton href={url} size="lg" />
            <p className="text-[0.74rem] tabular-nums text-ink-3">{[yen(c.price), meta].filter(Boolean).join("・")}</p>
          </div>
        </header>

        <LearningPath current="kansei" slug={k.slug} kanseiPublished className="mt-10" heading="この問題集は、学習のどの段階で使うか" />

        <section className="mt-12" aria-labelledby="fields-heading">
          <h2 id="fields-heading" className="rule-mark serif text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
            {k.uni}数学の頻出{k.total.fields}分野と、本書の章立て
          </h2>
          <p className="prose-ja mt-3 text-[0.9rem] text-ink-2">
            {yearsOf(k)}の{k.university}の出題を分析して、次の{k.total.fields}分野を選んでいます。
            章は数学I・A から数学III へ進む順に並び、{k.beforeIII.label ? `${k.beforeIII.label}は数学III を学ぶ前でも解けます。` : ""}
          </p>
          {/* スマホ幅に収めるため、範囲は分野名の下に置き、レベル内訳は略記（標・や・本）にする */}
          <table className="mt-4 w-full border-collapse text-left text-[0.8rem] leading-relaxed">
            <thead>
              <tr className="border-y border-rule bg-paper-2/60 text-[0.66rem] text-ink-2">
                <th scope="col" className="w-7 px-1.5 py-2 text-right font-bold">章</th>
                <th scope="col" className="px-2 py-2 font-bold">分野・範囲</th>
                <th scope="col" className="px-1.5 py-2 text-right font-bold">題</th>
                <th scope="col" className="px-1.5 py-2 font-bold">
                  <abbr title="標準・やや難・本番接続" className="no-underline">標・や・本</abbr>
                </th>
                <th scope="col" className="px-1.5 py-2 text-right font-bold">目標</th>
              </tr>
            </thead>
            <tbody>
              {k.chapters.map((ch) => (
                <tr key={ch.no} className="border-b border-rule/70">
                  <td className="px-1.5 py-2.5 text-right align-top tabular-nums text-ink-3">{ch.no}</td>
                  <th scope="row" className="px-2 py-2.5 text-left align-top font-normal">
                    <a href={`#ch${ch.no}`} className="font-semibold text-ink underline decoration-rule underline-offset-4 hover:text-navy">
                      {ch.field}
                    </a>
                    <span className="block text-[0.7rem] text-ink-3">{ch.range}</span>
                  </th>
                  <td className="px-1.5 py-2.5 text-right align-top tabular-nums">{ch.problems}</td>
                  <td className="whitespace-nowrap px-1.5 py-2.5 align-top tabular-nums text-ink-2">
                    {ch.standard}・{ch.hard}・{ch.honban}
                  </td>
                  <td className="whitespace-nowrap px-1.5 py-2.5 text-right align-top tabular-nums">{ch.minutes}分</td>
                </tr>
              ))}
              <tr className="border-b border-rule bg-paper-2/40 font-semibold">
                <td />
                <th scope="row" className="px-2 py-2.5 text-left text-ink">計</th>
                <td className="px-1.5 py-2.5 text-right tabular-nums">{k.total.problems}</td>
                <td className="whitespace-nowrap px-1.5 py-2.5 tabular-nums">
                  {k.total.standard}・{k.total.hard}・{k.total.honban}
                </td>
                <td className="whitespace-nowrap px-1.5 py-2.5 text-right tabular-nums">{k.total.minutes}分</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-1.5 text-[0.7rem] text-ink-3">「標・や・本」は標準・やや難・本番接続の題数。</p>
          <p className="prose-ja mt-3 text-[0.8rem] text-ink-3">
            目標時間の合計{k.total.minutes}分は、1日90分ならおよそ{daysAt(k.total.minutes)}日でひととおり終わる分量です。
            時間を計って解く本ではないので、目標時間を超えてもかまいません。
          </p>
        </section>

        {analysis && (
          <aside className="mt-8 border-l-2 border-navy/40 bg-paper-2/60 px-4 py-3">
            <p className="text-[0.82rem] text-ink-2">
              {k.university}の数学の形式（{factsLine(analysis) || "試験の形式"}）や年度別の出題は、
              <Link href={`/univ/${analysis.slug}`} className="font-semibold text-navy underline underline-offset-4">
                {k.uni}数学の傾向と対策
              </Link>
              で詳しく分析しています。
            </p>
          </aside>
        )}

        <section className="mt-12" aria-labelledby="trend-heading">
          <h2 id="trend-heading" className="rule-mark serif text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
            分野ごとの出題傾向と収録問題
          </h2>
          <p className="prose-ja mt-3 text-[0.9rem] text-ink-2">
            各章の扉に置いた「その分野で{k.uni}が何を要求するか」と、収録した問題の題材・レベル・目標時間です（問題文は載せていません）。
          </p>

          {k.chapters.map((ch) => (
            <section key={ch.no} id={`ch${ch.no}`} className="mt-9 scroll-mt-20" aria-labelledby={`ch${ch.no}-h`}>
              <p className="text-[0.7rem] font-semibold tabular-nums text-ink-3">
                第{ch.no}章・{ch.range}
              </p>
              <h3 id={`ch${ch.no}-h`} className="serif mt-0.5 text-[1.12rem] leading-snug text-ink">
                {ch.field}
              </h3>
              {ch.lead && <p className="mt-1 text-[0.85rem] font-semibold text-navy">{ch.lead}</p>}
              {ch.strategy.length > 0 && (
                <div className="prose-ja mt-3 space-y-3 text-[0.9rem] text-ink-2">
                  <Blocks blocks={ch.strategy} />
                </div>
              )}
              <ul className="mt-4 divide-y divide-rule/70 border-y border-rule">
                {ch.list.map((p) => (
                  <li key={p.id} className="flex items-baseline gap-2.5 py-2">
                    <span className="w-8 shrink-0 text-[0.72rem] tabular-nums text-ink-3">{p.id}</span>
                    <span
                      className={`shrink-0 border px-1.5 py-px text-[0.62rem] font-bold leading-normal ${levelStyle[p.level] ?? "border-rule text-ink-2"}`}
                    >
                      {p.level}
                    </span>
                    <span className="min-w-0 flex-1 text-[0.85rem] leading-snug text-ink">
                      <Spans spans={p.title} />
                    </span>
                    <span className="shrink-0 text-[0.72rem] tabular-nums text-ink-3">{p.minutes}分</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </section>

        <LookInsideSection book={{ asin: c.asin, title: `${k.name} 分野別完成演習`, price: c.price, pages: c.pages, released: c.released }} />

        <section className="mt-12" aria-labelledby="make-heading">
          <h2 id="make-heading" className="rule-mark serif text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
            本書の使い方
          </h2>
          <dl className="mt-4 divide-y divide-rule border-y border-rule">
            <div className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
              <dt className="text-[0.88rem] font-semibold text-ink">3段階で上げる</dt>
              <dd className="prose-ja text-[0.86rem] text-ink-2">
                標準{k.total.standard}題・やや難{k.total.hard}題・本番接続{k.total.honban}題。「本番接続」は{k.uni}の実際の大問に近づけた問題で、ここまで解ければ過去問演習に入ってかまいません。
              </dd>
            </div>
            <div className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
              <dt className="text-[0.88rem] font-semibold text-ink">手が止まったら</dt>
              <dd className="prose-ja text-[0.86rem] text-ink-2">
                問題の下のヒント、解答冒頭の着眼の順に読んで問題に戻ります。解いたあとは、定石でその問題で使った手を整理します。
              </dd>
            </div>
            {k.honban && (
              <div className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
                <dt className="text-[0.88rem] font-semibold text-ink">本番ならこう出る</dt>
                <dd className="prose-ja text-[0.86rem] text-ink-2">
                  解答の末尾に、その問題から誘導を外して{k.uni}の本番の形に近づけた問題を載せています。
                </dd>
              </div>
            )}
            {k.beforeIII.label && (
              <div className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
                <dt className="text-[0.88rem] font-semibold text-ink">数学III の前から</dt>
                <dd className="prose-ja text-[0.86rem] text-ink-2">
                  {k.beforeIII.label}（{k.beforeIII.problems}題）は数学III を使わずに解けます。
                </dd>
              </div>
            )}
            {k.appendices.length > 0 && (
              <div className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
                <dt className="text-[0.88rem] font-semibold text-ink">付録</dt>
                <dd className="text-[0.86rem] text-ink-2">
                  <ul className="space-y-0.5">
                    {k.appendices.map((a) => (
                      <li key={a.label}>
                        {a.label}　{a.title}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>
        </section>

        {analysis && analysis.books.length > 0 && (
          <section className="mt-12" aria-labelledby="after-heading">
            <h2 id="after-heading" className="rule-mark serif text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
              本書を終えたら：本番形式の予想問題集へ
            </h2>
            <p className="prose-ja mt-3 text-[0.9rem] text-ink-2">
              次に置くのは、同じ著者による本番と同じ形式の予想問題集「合格答案をつくる」シリーズです。
              加点・減点つきの採点表で、自分の答案のどこが減点されるかを照合できます。本書の問題とは題材が重複しないように作られています。
            </p>
            <ul className="mt-4 space-y-3">
              {analysis.books.map((b) => (
                <li key={b.asin} className="flex items-center gap-3 border-t border-rule pt-3 first:border-0 first:pt-0">
                  <Image
                    src={`/covers/thumb/${b.asin}.webp`}
                    alt={`${b.title}の表紙`}
                    width={160}
                    height={226}
                    sizes="48px"
                    className="w-12 shrink-0 rounded-[2px] border border-rule"
                  />
                  <span className="min-w-0 flex-1 text-[0.85rem] leading-snug text-ink">{b.title}</span>
                  <AmazonButton href={b.amazonUrl} label="Amazon" className="shrink-0 !min-h-9 !px-3 !text-[0.78rem]" />
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.85rem]">
              <Link href={`/univ/${analysis.slug}#books`} className="text-navy underline underline-offset-4">
                {k.uni}数学の傾向と対策と、予想問題集の詳細を見る
              </Link>
            </p>
          </section>
        )}

        <aside className="mt-12 border-y border-navy/20 bg-paper-2/70 px-4 py-5">
          <p className="text-[0.68rem] font-bold tracking-wide text-accent">志望校をまだ決めきれていないなら</p>
          <p className="serif mt-1 text-[1.02rem] leading-snug text-ink">
            志望校診断模試で、{shindan.universities.length}大学との相性を先に確かめる
          </p>
          <p className="prose-ja mt-1.5 text-[0.82rem] text-ink-2">
            {shindan.rounds}回の模試で「得点の形」を分析し、{shindan.universities.map((u) => u.name).join("・")}との相性を判定します。
          </p>
          <Link href="/shindan" className="mt-2 inline-block text-[0.85rem] font-semibold text-navy underline underline-offset-4">
            志望校診断模試を見る
          </Link>
        </aside>

        <FaqSection items={faqs} name={`${k.name} 分野別完成演習`} />

        <section aria-labelledby="buy-heading" className="mt-14 border border-navy/25 bg-white p-5 sm:p-7">
          <p className="text-[0.68rem] font-bold tracking-wide text-accent">{seriesName}</p>
          <h2 id="buy-heading" className="serif mt-1.5 text-[1.2rem] leading-snug text-ink sm:text-[1.35rem]">
            {k.name} 分野別完成演習 2027年度対策
          </h2>
          <div className="mt-5 flex gap-4">
            <div className="w-[86px] shrink-0 sm:w-[104px]">
              <Image
                src={k.cover}
                alt={`${k.name} 分野別完成演習の表紙`}
                width={310}
                height={438}
                sizes="104px"
                className="w-full rounded-[3px] border border-rule shadow-[0_1px_2px_rgba(21,24,28,0.07)]"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <p className="prose-ja text-[0.85rem] text-ink-2">
                {k.total.fields}分野・全{k.total.problems}題
                {k.total.subquestions ? `（${k.total.subquestions}小問）` : ""}。問題はすべて書き下ろしです。
              </p>
              <p className="mt-1 text-[0.74rem] tabular-nums text-ink-3">{[yen(c.price), meta].filter(Boolean).join("・")}</p>
              <AmazonButton href={url} className="mt-auto" />
            </div>
          </div>
          <p className="mt-5 border-t border-rule pt-3 text-[0.7rem] leading-relaxed text-ink-3">
            非公式の独自教材です。{k.university}とは関係ありません。価格・在庫は Amazon の表示が優先されます。
          </p>
        </section>

        {others.length > 0 && (
          <section className="mt-14 border-t border-rule pt-7" aria-labelledby="others-heading">
            <h2 id="others-heading" className="serif text-[1.05rem] text-ink">
              ほかの大学の分野別完成演習
            </h2>
            <div className="mt-4">
              <KanseiCards />
            </div>
          </section>
        )}
      </ArticleLayout>
    </>
  );
}
