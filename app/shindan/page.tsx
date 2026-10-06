import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AmazonButton } from "@/components/amazon-button";
import { ArticleLayout } from "@/components/article-layout";
import { AsideBook } from "@/components/aside-book";
import { FaqSection } from "@/components/faq";
import { KanseiCards } from "@/components/kansei-cards";
import { LearningPath } from "@/components/learning-path";
import { LookInsideSection } from "@/components/look-inside-section";
import { spanText } from "@/lib/data";
import { Spans } from "@/lib/render";
import type { Faq } from "@/lib/seo";
import { bookMetaLine, yen } from "@/lib/books";
import { kanseiAll, seriesName, seriesTagline, shindan as s } from "@/lib/series";
import { site } from "@/lib/site";

const universityNames = s.universities.map((u) => u.name);
const title = `旧帝大・難関国公立 数学 志望校診断模試 2027｜${s.universities.length}大学との相性を判定`;
const description =
  `${seriesTagline}どの大学の過去問に進むべきか決めるための、理系数学の志望校診断模試。` +
  `1回${s.minutes}分・大問${s.questions}題・${s.points}点の模試${s.rounds}回で「得点の形」を分析し、` +
  `${universityNames.join("・")}の${s.universities.length}大学との相性を判定します。`;

export const metadata: Metadata = {
  title: { absolute: `${title}｜${site.name}` },
  description,
  keywords: [
    "志望校 診断",
    "志望校診断 数学",
    "難関国公立 数学",
    "旧帝大 数学 模試",
    "数学 模試",
    "数学 模試 問題集",
    "志望校 決め方 数学",
    "理系数学 志望校",
  ],
  alternates: { canonical: "/shindan" },
  openGraph: {
    title,
    description,
    url: "/shindan",
    type: "article",
    images: [{ url: "/og/shindan.jpg", width: 1200, height: 630, alt: "志望校診断模試" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og/shindan.jpg"] },
};

/** 模試の大学名（「東京大」）→ 完成演習・大学別分析。 */
const kanseiOf = (name: string) => kanseiAll.find((k) => k.university.startsWith(name));

function faq(): Faq[] {
  const list: Faq[] = [
    {
      q: "数学の志望校はどうやって決めればよいですか？",
      a: `本書は、自分の得意・不得意がその大学の数学の出題傾向と噛み合うかを判定します。総合得点の高さではなく、分野と能力ごとに相対的にどこで点を取れているか（得点の形）を見るので、全体の点が同じ2人でも向いている大学は別々に出ます。わかるのは出題傾向との相性で、合否・学部の中身・立地・他教科や共通テストとの兼ね合いはわかりません。志望校を決める材料の一つとして使ってください。`,
    },
    {
      q: "模試は何回分で、1回の形式はどうなっていますか？",
      a: `${s.rounds}回分です。1回${s.minutes}分・大問${s.questions}題・${s.points}点で、収録問題は全${s.problems}題です。各回を解いて採点したあと、見開き2ページの診断で暫定判定を出し、回を重ねて第${s.rounds}回の判定を最終判定にします。`,
    },
    {
      q: "どの大学との相性がわかりますか？",
      a: `${universityNames.join("・")}の${s.universities.length}大学です。それぞれに「相性が高い」「標準」「要対策」の3段階で判定がつきます。`,
    },
    {
      q: "「要対策」と出た大学は受けないほうがよいのですか？",
      a: spanText(s.judgements.find((j) => j.label.startsWith("要"))?.desc ?? []),
    },
  ];
  if (s.easier) {
    list.push({
      q: "問題の難しさは本番と同じですか？",
      a: `各大学の本番より少し易しく作ってあります。難問を並べるとどの観点も低い点になって全員が同じ形に見え、相性が測れないためです。手がついて部分点が入ってはじめて得点の形が出ます。`,
    });
  }
  list.push({
    q: "過去問がそのまま載っていますか？",
    a: `収録した${s.problems}題はすべて本書のための書き下ろしです。${s.universities.length}大学の過去問は分析にのみ用い、問題文の転載も数値だけを替えた改題もしていません。`,
  });
  return list;
}

export default function ShindanPage() {
  const faqs = faq();
  const c = s.catalog;
  const meta = bookMetaLine(c);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Book",
        "@id": s.amazonUrl,
        name: c.title,
        url: s.amazonUrl,
        inLanguage: "ja",
        bookFormat: "https://schema.org/Paperback",
        author: { "@type": "Person", name: site.author },
        numberOfPages: c.pages,
        isbn: c.isbn13,
        datePublished: c.released,
        image: `${site.url}${s.cover}`,
        description,
        isPartOf: { "@type": "BookSeries", name: seriesName },
        about: s.universities.map((u) => ({ "@type": "CollegeOrUniversity", name: kanseiOf(u.name)?.university ?? u.name })),
        ...(c.price
          ? {
              offers: {
                "@type": "Offer",
                price: c.price,
                priceCurrency: "JPY",
                url: s.amazonUrl,
                seller: { "@type": "Organization", name: "Amazon.co.jp" },
              },
            }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "トップ", item: site.url },
          { "@type": "ListItem", position: 2, name: "志望校診断模試", item: `${site.url}/shindan` },
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
        breadcrumb={[{ href: "/", label: "トップ" }, { label: "志望校診断模試" }]}
        aside={
          <AsideBook
            eyebrow="過去問の前にシリーズ"
            title="旧帝大・難関国公立大理系数学 志望校診断模試"
            cover={s.cover}
            href={s.amazonUrl}
            book={c}
            note={`模試${s.rounds}回（全${s.problems}題）で、${s.universities.length}大学との相性を判定。`}
          />
        }
      >
        <header className="pb-2 pt-4">
          <p className="text-[0.72rem] font-semibold tracking-wide text-navy">{seriesName}・2027年度対策</p>
          <div className="mt-2.5 grid grid-cols-[1fr_auto] gap-x-4">
            <div className="min-w-0">
              <h1 className="serif text-[1.55rem] leading-[1.4] text-ink sm:text-[2rem]">
                旧帝大・難関国公立大
                <br />
                理系数学 志望校診断模試
              </h1>
              <p className="mt-2.5 text-[0.8rem] font-semibold text-ink-2">{seriesTagline}</p>
            </div>
            <a
              href={s.amazonUrl}
              rel="noopener nofollow sponsored"
              target="_blank"
              aria-label="志望校診断模試をAmazonで見る"
              className="col-start-2 row-start-1 w-[96px] shrink-0 sm:row-span-2 sm:w-[128px]"
            >
              <Image
                src={s.cover}
                alt="旧帝大・難関国公立大理系数学 志望校診断模試の表紙"
                width={310}
                height={438}
                priority
                sizes="(max-width: 640px) 96px, 128px"
                className="w-full rounded-[2px] border border-rule shadow-[0_1px_3px_rgba(21,24,28,0.09)]"
              />
            </a>
            <p className="prose-ja col-span-2 mt-5 text-[0.95rem] text-ink-2 sm:col-span-1">
              では、どの大学の過去問に進むべきか。{s.rounds}回の模試で自分の「得点の形」を取り出し、
              {s.universities.length}大学の数学の出題傾向とどれだけ噛み合うかを判定する、志望校を決めるための模試です。
            </p>
          </div>

          <dl className="mt-6 grid grid-cols-4 gap-x-2 border-y border-rule py-4">
            {[
              { k: "模試", v: String(s.rounds), u: "回分" },
              { k: "1回", v: String(s.minutes), u: "分" },
              { k: "大問", v: String(s.questions), u: `題・${s.points}点` },
              { k: "判定する大学", v: String(s.universities.length), u: "大学" },
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
            <AmazonButton href={s.amazonUrl} label="Amazonで見る" size="lg" />
            <p className="text-[0.74rem] tabular-nums text-ink-3">
              {[yen(c.price), meta].filter(Boolean).join("・")}
            </p>
          </div>
        </header>

        <LearningPath current="shindan" className="mt-10" heading="この模試は、学習のどの段階で使うか" />

        <section className="mt-12">
          <h2 className="rule-mark serif text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
            測るのは「学力の高さ」ではなく「得点の形」
          </h2>
          <div className="prose-ja mt-4 space-y-4 text-[0.95rem] text-ink-2">
            <p>
              全体で6割取った人が2人いても、片方は確率と整数で稼ぎ、もう片方は図形と記述で稼いでいるかもしれません。
              この模試が見るのは<strong className="font-semibold text-ink">その形のほう</strong>です。
              だから全体の点が同じ2人でも、向いている大学は別々に出ます。
            </p>
            <p>
              比べる基準は、平均的な受験生ではなく<strong className="font-semibold text-ink">自分自身の全体の点</strong>です。
              学力の高い人も低い人も、残るのは得意・不得意の形だけになります。学力の高さは、これとは別に「いまの水準」として出します。
            </p>
            {s.easier && (
              <p>
                収録した{s.problems}題は、各大学の本番より少し易しく作ってあります。
                難問を並べるとどの観点も低い点になって全員が同じ形に見え、相性が測れないためです。
              </p>
            )}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="univ-heading">
          <h2 id="univ-heading" className="rule-mark serif text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
            判定する{s.universities.length}大学と、数学の出題の違い
          </h2>
          <p className="prose-ja mt-3 text-[0.9rem] text-ink-2">
            同じ「記述式」でも、中身はかなり違います。形式を並べると次のとおりです（2019〜2026年度）。
            大学名から、それぞれの出題分析と分野別完成演習に進めます。
          </p>
          <p className="mt-4 flex items-center gap-1 text-[0.68rem] text-ink-3 sm:hidden">
            <svg aria-hidden="true" viewBox="0 0 20 20" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 10h14M13 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            横にスクロールできます
          </p>
          <div className="scroll-hint -mx-5 mt-1.5 overflow-x-auto px-5 sm:mx-0 sm:mt-4 sm:px-0">
            <table className="w-full min-w-[34rem] border-collapse text-left text-[0.78rem] leading-relaxed">
              <thead>
                <tr className="border-y border-rule bg-paper-2/60 text-[0.7rem] text-ink-2">
                  <th scope="col" className="px-3 py-2 font-bold">大学</th>
                  <th scope="col" className="px-2 py-2 text-right font-bold">時間</th>
                  <th scope="col" className="px-2 py-2 text-right font-bold">大問</th>
                  <th scope="col" className="px-2 py-2 text-right font-bold">1題あたり</th>
                  <th scope="col" className="px-2 py-2 font-bold">公式集</th>
                  <th scope="col" className="px-3 py-2 font-bold">ひとことで言うと</th>
                </tr>
              </thead>
              <tbody>
                {s.universities.map((u) => {
                  const k = kanseiOf(u.name);
                  return (
                    <tr key={u.name} className="border-b border-rule/70">
                      <th scope="row" className="whitespace-nowrap px-3 py-2.5 text-left align-top font-semibold text-ink">
                        {k ? (
                          <Link href={`/univ/${k.slug}`} className="underline decoration-rule underline-offset-4 hover:text-navy">
                            {u.name}
                          </Link>
                        ) : (
                          u.name
                        )}
                      </th>
                      <td className="whitespace-nowrap px-2 py-2.5 text-right align-top tabular-nums">{u.minutes}分</td>
                      <td className="px-2 py-2.5 text-right align-top tabular-nums">{u.questions}</td>
                      <td className="whitespace-nowrap px-2 py-2.5 text-right align-top tabular-nums">{u.perQuestion}分</td>
                      <td className="px-2 py-2.5 align-top">{u.formula ? "あり" : "なし"}</td>
                      <td className="px-3 py-2.5 align-top text-ink-2">
                        <Spans spans={u.summary} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {(s.differences.same || s.differences.differ?.length) && (
            <div className="mt-6 space-y-4">
              {s.differences.same && (
                <div>
                  <h3 className="text-[0.9rem] font-semibold text-ink">差がつかない分野</h3>
                  <p className="prose-ja mt-1 text-[0.88rem] text-ink-2">
                    <Spans spans={s.differences.same} />
                  </p>
                </div>
              )}
              {s.differences.differ && s.differences.differ.length > 0 && (
                <div>
                  <h3 className="text-[0.9rem] font-semibold text-ink">差がつくのは「確率」「整数」「時間の使い方」</h3>
                  <ul className="prose-ja mt-1 list-disc space-y-1 pl-5 text-[0.88rem] text-ink-2 marker:text-ink-3">
                    {s.differences.differ.map((d, i) => (
                      <li key={i}>
                        <Spans spans={d} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>

        <section className="mt-12" aria-labelledby="tag-heading">
          <h2 id="tag-heading" className="rule-mark serif text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
            9つの観点で得点を切り分ける
          </h2>
          <p className="prose-ja mt-3 text-[0.9rem] text-ink-2">
            各小問に「分野」と「能力」の観点が1つずつ付いています。同じ{s.points}点を2通りに切り分けるので、どちらの合計も
            {s.points}点になります。
          </p>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            {(
              [
                ["分野", s.tags.field],
                ["能力", s.tags.ability],
              ] as const
            ).map(([label, tags]) => (
              <div key={label}>
                <h3 className="border-b border-rule pb-1.5 text-[0.88rem] font-semibold text-ink">
                  {label}（{tags.length}つ）
                </h3>
                <dl className="divide-y divide-rule/70">
                  {tags.map((t) => (
                    <div key={t.name} className="py-2.5">
                      <dt className="flex items-baseline justify-between gap-3">
                        <span className="text-[0.88rem] font-semibold text-ink">{t.name}</span>
                        <span className="serif text-[0.95rem] tabular-nums text-navy">
                          {t.points}
                          <span className="ml-0.5 font-sans text-[0.66rem] font-normal text-ink-3">点</span>
                        </span>
                      </dt>
                      <dd className="prose-ja mt-0.5 text-[0.8rem] text-ink-2">
                        <Spans spans={t.desc} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <p className="prose-ja mt-4 text-[0.85rem] text-ink-2">
            計算力と処理速度は別物として数えます。計算力は1本の長い計算を完走する深さ（九州大・東京科学大が求める）、
            処理速度は方針の違う問題を次々に切り替える幅（東北大・北海道大が求める）です。これを分けないと、九州大と東北大が区別できません。
          </p>
        </section>

        <section className="mt-12" aria-labelledby="judge-heading">
          <h2 id="judge-heading" className="rule-mark serif text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
            判定は3段階。回を重ねて確かにする
          </h2>
          <dl className="mt-4 divide-y divide-rule border-y border-rule">
            {s.judgements.map((j) => (
              <div key={j.label} className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
                <dt className="text-[0.9rem] font-semibold text-ink">{j.label}</dt>
                <dd className="prose-ja text-[0.86rem] text-ink-2">
                  <Spans spans={j.desc} />
                </dd>
              </div>
            ))}
          </dl>
          <p className="prose-ja mt-4 text-[0.9rem] text-ink-2">
            第1回から暫定判定が出て、第{s.rounds}回の判定がそのまま最終判定になります。
            模試の点は同じ実力でも日によって上下するので、小問が増えるほど当たり外れが打ち消し合い、判定のぶれは小さくなります。
          </p>
          {s.noise.length === s.rounds && (
            <div className="scroll-hint -mx-5 mt-4 overflow-x-auto px-5 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[28rem] border-collapse text-[0.78rem]">
                <thead>
                  <tr className="border-y border-rule bg-paper-2/60 text-[0.7rem] text-ink-2">
                    <th scope="col" className="px-3 py-2 text-left font-bold" />
                    {s.noise.map((_, i) => (
                      <th key={i} scope="col" className="px-2 py-2 text-right font-bold">
                        第{i + 1}回
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-rule/70">
                    <th scope="row" className="px-3 py-2.5 text-left font-semibold text-ink">
                      たまたま動く幅の目安
                    </th>
                    {s.noise.map((n, i) => (
                      <td key={i} className="px-2 py-2.5 text-right tabular-nums text-ink-2">
                        {n}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          <p className="mt-2 text-[0.72rem] leading-relaxed text-ink-3">
            数値は本書の配点と難易度から見積もった目安で、実際に受けた人のデータではありません。第1回だけで志望校を決めず、同じ判定が続くかで確かめてください。
          </p>
        </section>

        {(s.scope.knows || s.scope.unknown) && (
          <section className="mt-12" aria-labelledby="scope-heading">
            <h2 id="scope-heading" className="rule-mark serif text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
              この模試でわかること・わからないこと
            </h2>
            <dl className="mt-4 divide-y divide-rule border-y border-rule">
              {s.scope.knows && (
                <div className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <dt className="text-[0.9rem] font-semibold text-ink">わかる</dt>
                  <dd className="prose-ja text-[0.88rem] text-ink-2">
                    <Spans spans={s.scope.knows} />
                  </dd>
                </div>
              )}
              {s.scope.unknown && (
                <div className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <dt className="text-[0.9rem] font-semibold text-ink">わからない</dt>
                  <dd className="prose-ja text-[0.88rem] text-ink-2">
                    <Spans spans={s.scope.unknown} />
                  </dd>
                </div>
              )}
            </dl>
          </section>
        )}

        <section className="mt-12" aria-labelledby="next-heading">
          <h2 id="next-heading" className="rule-mark serif text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
            判定のあとは、その大学の分野別完成演習へ
          </h2>
          <p className="prose-ja mt-3 text-[0.9rem] text-ink-2">
            第1志望候補が決まったら、その大学の分野別完成演習に進み、ずれがマイナスに出た観点から埋めていきます。
            過去問はそのあとで十分です。順番を逆にすると、過去問が「解けなかった問題の山」になって終わってしまいます。
          </p>
          <div className="mt-6">
            <KanseiCards />
          </div>
          <p className="mt-5 text-[0.85rem]">
            <Link href="/kansei" className="text-navy underline underline-offset-4">
              分野別完成演習のシリーズ全体を見る
            </Link>
          </p>
        </section>

        <LookInsideSection
          book={{
            asin: c.asin,
            title: "旧帝大・難関国公立大理系数学 志望校診断模試",
            price: c.price,
            pages: c.pages,
            released: c.released,
          }}
        />

        <FaqSection items={faqs} name="志望校診断模試" />

        <section aria-labelledby="buy-heading" className="mt-14 border border-navy/25 bg-white p-5 sm:p-7">
          <p className="text-[0.68rem] font-bold tracking-wide text-accent">{seriesName}</p>
          <h2 id="buy-heading" className="serif mt-1.5 text-[1.2rem] leading-snug text-ink sm:text-[1.35rem]">
            旧帝大・難関国公立大理系数学 志望校診断模試 2027年度対策
          </h2>
          <div className="mt-5 flex gap-4">
            <div className="w-[86px] shrink-0 sm:w-[104px]">
              <Image
                src={s.cover}
                alt="志望校診断模試の表紙"
                width={310}
                height={438}
                sizes="104px"
                className="w-full rounded-[3px] border border-rule shadow-[0_1px_2px_rgba(21,24,28,0.07)]"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <p className="prose-ja text-[0.85rem] text-ink-2">
                模試{s.rounds}回（全{s.problems}題）・毎回の診断ページ・最終判定。問題はすべて書き下ろしです。
              </p>
              <p className="mt-1 text-[0.74rem] tabular-nums text-ink-3">{[yen(c.price), meta].filter(Boolean).join("・")}</p>
              <AmazonButton href={s.amazonUrl} className="mt-auto" />
            </div>
          </div>
          <p className="mt-5 border-t border-rule pt-3 text-[0.7rem] leading-relaxed text-ink-3">
            非公式の独自教材です。各大学とは関係ありません。価格・在庫は Amazon の表示が優先されます。
          </p>
        </section>
      </ArticleLayout>
    </>
  );
}
