import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { factsLine, getUniversity, yearsLabel } from "@/lib/data";
import { moshi, moshiPath } from "@/lib/moshi/config";
import { sectionStyle } from "@/lib/sections";
import { shortName, subject } from "@/lib/seo";
import { getKansei } from "@/lib/series";
import { NOT_OFFICIAL, published, questionPath, setPath, solutionsFor } from "@/lib/solutions";
import { site } from "@/lib/site";
import { CoverFan } from "@/components/cover-fan";
import { FactStrip } from "@/components/fact-strip";
import { SolutionFooter } from "@/components/solution-footer";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [...new Set(published.map((s) => s.slug))].map((slug) => ({ slug }));
}

export const dynamicParams = false;

function meta(slug: string) {
  const u = getUniversity(slug);
  const sets = solutionsFor(slug);
  if (!u || !sets.length) return null;
  const years = sets.map((s) => s.year);
  const total = sets.reduce((n, s) => n + s.questions.length, 0);
  const span = years.length > 1 ? `${Math.min(...years)}〜${Math.max(...years)}年度` : `${years[0]}年度`;
  return { u, sets, years, total, span };
}

/**
 * よくある質問。
 *
 * 探している人が打ち込む言葉のまま問いを立てる
 * （「名工大の数学の過去問の解答はどこで見られる？」）。
 * 答えはこのページに実際に載っているものと、掲載方針だけで作る。
 * 大学の公式解答の内容には触れない。
 */
function faqFor(slug: string) {
  const m = meta(slug);
  if (!m) return [];
  const { u, sets, total, span } = m;
  const short = shortName(u);
  const items: { q: string; a: string }[] = [];

  items.push({
    q: `${short}の数学の過去問の解答はどこで見られますか？`,
    a:
      `このページに、${span}の全${total}問ぶんを大問ごとに載せています。` +
      `当サイトが独自に解いた解答・計算過程・詳解${sets.some((x) => x.questions.some((q) => q.subs.some((b) => b.alts?.length))) ? "・別解" : ""}で、` +
      `会員登録も料金も要りません。`,
  });

  items.push({
    q: "大学の公式解答ですか？",
    a:
      `いいえ。${NOT_OFFICIAL}` +
      `当サイトで検算はしていますが、誤りが残っている可能性はあります。`,
  });

  items.push({
    q: "問題文は載っていますか？",
    a:
      `載せていません。書き写しも言い換えもしていません。` +
      `${u.university}が問題を公開している年度は、その公開ページへのリンクを各年度のページに置いています。`,
  });

  if (u.facts.examTime || u.facts.questions) {
    items.push({
      q: `${short}の数学はどんな試験ですか？`,
      a: `${factsLine(u)}です。当サイトが${yearsLabel(u) ?? "過去"}の過去問を分析した範囲での形式で、年度別・分野別の表は出題分析のページにまとめています。`,
    });
  }

  const fields = [...new Set(sets.flatMap((x) => x.questions.map((q) => q.field)))];
  if (fields.length) {
    items.push({
      q: `どの分野の解説がありますか？`,
      a: `${fields.join("、")}です。大問ごとにページが分かれているので、分野から選んで読めます。`,
    });
  }

  items.push({
    q: "解説にはどこまで書いてありますか？",
    a:
      "答えだけでなく、どの方針をなぜ選ぶのか、場合分けと端点をどこで確認するのか、" +
      "答案で省略しない方がよい説明は何かまで書いています。配点・採点基準・難易度を大学の公表値として示すことはしていません。",
  });

  return items;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const m = meta(slug);
  if (!m) return {};
  const { u, sets, total, span } = m;
  const title = `${subject(u)} 過去問の解答・解説｜${span}`;
  // description は検索結果にそのまま出る。160字を超えると途中で切られるので、
  // 年度が増えても伸びない書き方にする（3年度以上なら区分・日程は落として年度だけ並べる）。
  const yearList =
    sets.length <= 2
      ? sets.map((s) => `${s.year}年度（${s.division}・${s.schedule}）`).join("、")
      : `${sets.map((s) => s.year).join("・")}年度`;
  // 公式の公開先がない大学で「公式ページへリンク」と書くと、ないものを案内することになる。
  const hasOfficial = sets.some((s) => s.source?.kind === "official");
  const description =
    `${u.university}${u.course ? `（${u.course}）` : ""}の数学の過去問について、当サイトが独自に解いた解答・計算過程・詳解・別解。` +
    `${span}の全${total}問を大問ごとに掲載しています。収録年度は${yearList}。` +
    (hasOfficial
      ? `問題文は載せず、${u.university}公式の問題公開ページへリンクしています。公式解答ではありません。`
      : "問題文は載せていません。公式解答ではありません。");
  const short = shortName(u);
  return {
    title,
    description,
    keywords: [
      `${u.university} 数学 過去問 解答`,
      `${short} 数学 解答`,
      `${short} 数学 解説`,
      `${short} 数学 詳解`,
      `${short} 数学 別解`,
      ...sets.map((s) => `${short} ${s.year} 数学 解答`),
      `${u.university} ${sets[0].year}年度 数学`,
    ],
    alternates: { canonical: `/kaisetsu/${u.slug}` },
    openGraph: {
      title,
      description,
      url: `/kaisetsu/${u.slug}`,
      type: "website",
      images: [{ url: `/og/${u.slug}.jpg`, width: 1200, height: 630, alt: subject(u) }],
    },
    twitter: { card: "summary_large_image", title, description, images: [`/og/${u.slug}.jpg`] },
  };
}

export default async function UniversitySolutions({ params }: Props) {
  const { slug } = await params;
  const m = meta(slug);
  if (!m) notFound();
  const { u, sets, total, span } = m;

  const faq = faqFor(slug);
  const kansei = getKansei(u.slug);
  const mo = moshi.universities.find((x) => x.slug === u.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "トップ", item: site.url },
          { "@type": "ListItem", position: 2, name: "過去問の解答・解説", item: `${site.url}/kaisetsu` },
          { "@type": "ListItem", position: 3, name: subject(u), item: `${site.url}/kaisetsu/${u.slug}` },
        ],
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
        // 年度ごとのページが何なのかを、並びとして示す
        "@type": "ItemList",
        name: `${subject(u)} 過去問の解答・解説（年度別）`,
        itemListElement: sets.map((x, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `${x.year}年度 ${x.subject}（${x.division}・${x.schedule}）`,
          url: `${site.url}${setPath(x)}`,
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div
        className="mx-auto max-w-[46rem] px-5 sm:px-6 lg:max-w-[74rem] lg:px-8"
        style={sectionStyle("kaisetsu")}
      >
        <nav aria-label="パンくず" className="breadcrumb pt-3 text-[0.75rem] text-ink-3">
          <Link href="/" className="hover:text-navy">
            トップ
          </Link>
          <span className="mx-1.5 text-rule">／</span>
          <Link href="/kaisetsu" className="hover:text-navy">
            過去問の解答・解説
          </Link>
          <span className="mx-1.5 text-rule">／</span>
          <span className="text-ink-2">{subject(u)}</span>
        </nav>

        <div className="sec-rule mt-3" />

        <FactStrip
          items={[
            { icon: "pen", label: "独自の解答・詳解" },
            { icon: "doc", label: "問題文は非掲載" },
            { icon: "check", label: `全${total}問・無料` },
          ]}
        />

        <header className="border-b border-rule pb-7 pt-6">
          <div className="flex items-start gap-4 sm:gap-6">
            <div className="min-w-0 flex-1">
              <p className="eyebrow">
                {u.university}
                {u.course && `・${u.course}`}
              </p>
              <h1 className="serif h-page mt-1.5 text-ink">{subject(u)} 過去問の解答・解説</h1>
              <p className="prose-ja mt-4 max-w-[38rem] text-[0.93rem] leading-[1.95] text-ink-2">
                {span}の全{total}問について、当サイトが独自に解いた解答・計算過程・詳解・別解を載せています。
                {u.facts.examTime || u.facts.questions ? `${shortName(u)}の数学は${factsLine(u)}。` : ""}
                方針を選ぶ理由、場合分けと端点の確認、答案で省略しない方がよい説明まで書いています。
              </p>
            </div>
            {u.books.length > 0 && (
              <CoverFan
                covers={u.books.slice(0, 3).map((b) => `/covers/thumb/${b.asin}.webp`)}
                className="shrink-0 pt-1"
                priority
              />
            )}
          </div>

          <p className="prose-ja mt-5 text-[0.86rem] leading-[1.9] text-ink-3">
            {NOT_OFFICIAL}
            <Link href="/kaisetsu/policy" className="ml-1 text-navy underline underline-offset-4">
              掲載方針
            </Link>
          </p>
        </header>

        <div className="mt-10 space-y-9">
          {sets.map((s) => (
            <section key={s.year} aria-labelledby={`y${s.year}`}>
              <h2 id={`y${s.year}`} className="rule-mark serif text-[1.3rem] text-ink">
                <Link href={setPath(s)} className="hover:text-navy">
                  {s.year}年度 {s.subject}（{s.division}・{s.schedule}）
                </Link>
              </h2>
              <ul className="mt-3 divide-y divide-rule border-y border-rule">
                {s.questions.map((q) => (
                  <li key={q.no}>
                    <Link href={questionPath(s, q.no)} className="group flex min-h-[3.4rem] items-center gap-3 py-3">
                      <span className="serif flex size-7 shrink-0 items-center justify-center border border-accent/30 bg-accent-bg text-[0.86rem] tabular-nums text-accent">
                        {q.no}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.97rem] font-semibold text-ink transition-colors group-hover:text-navy">
                          第{q.no}問　{q.field}
                        </span>
                        <span className="mt-0.5 block truncate text-[0.75rem] text-ink-3">
                          {q.topics.join("・")}
                        </span>
                      </span>
                      <span className="badge shrink-0 tabular-nums">小問{q.subs.length}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-2.5 text-[0.86rem]">
                <Link href={setPath(s)} className="font-semibold text-navy underline underline-offset-4">
                  {s.year}年度をまとめて読む
                </Link>
              </p>
            </section>
          ))}
        </div>

        {/* 検索から1問だけ見に来た人に、同じ大学で続けて読めるものを示す */}
        <section aria-labelledby="more" className="mt-14 border-t border-rule pt-8">
          <h2 id="more" className="serif h-sect text-ink">
            {shortName(u)}の数学を、ほかにも
          </h2>
          <ul className="mt-5 divide-y divide-rule border-y border-rule">
            {[
              {
                href: `/univ/${u.slug}`,
                h: `${subject(u)}の傾向と対策`,
                body: `${yearsLabel(u) ?? "過去"}の出題を、年度別・分野別の表にまとめています。`,
              },
              ...(mo
                ? [
                    {
                      href: moshiPath(mo),
                      h: `${mo.university} ${mo.exam}`,
                      body: "この分析をもとに、同じ形式で作る大学別の数学模試です。見本問題と採点表を公開しています。",
                    },
                  ]
                : []),
              ...(kansei
                ? [
                    {
                      href: `/kansei/${kansei.slug}`,
                      h: `${shortName(u)}数学 分野別完成演習`,
                      body: "頻出分野を、標準から本番の水準まで段階的に上げる演習書です。",
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
        </section>

        <section aria-labelledby="faq-heading" className="mt-14">
          <h2 id="faq-heading" className="rule-mark serif h-sect text-ink">
            {shortName(u)}の数学の解答・解説について、よくある質問
          </h2>
          <dl className="mt-5 divide-y divide-rule border-y border-rule">
            {faq.map((f) => (
              <div key={f.q} className="py-4">
                <dt className="flex gap-2.5 text-[0.93rem] font-semibold leading-relaxed text-ink">
                  <span aria-hidden="true" className="serif shrink-0 text-[var(--sec)]">
                    Q.
                  </span>
                  <span className="prose-ja">{f.q}</span>
                </dt>
                <dd className="mt-2 flex gap-2.5">
                  <span aria-hidden="true" className="serif shrink-0 text-ink-3">
                    A.
                  </span>
                  <span className="prose-ja text-[0.93rem] leading-[1.95] text-ink-2">{f.a}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* この種のページに表紙も購入導線も無かった。解説を読み終えた人がいちばん近い */}
        <SolutionFooter set={sets[0]} />
      </div>
    </>
  );
}
