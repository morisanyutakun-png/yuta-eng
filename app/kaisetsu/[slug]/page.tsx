import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getUniversity } from "@/lib/data";
import { shortName, subject } from "@/lib/seo";
import { NOT_OFFICIAL, published, questionPath, setPath, solutionsFor } from "@/lib/solutions";
import { site } from "@/lib/site";
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const m = meta(slug);
  if (!m) return {};
  const { u, sets, total, span } = m;
  const title = `${subject(u)} 過去問の解答・解説｜${span}`;
  const description =
    `${u.university}${u.course ? `（${u.course}）` : ""}の数学の過去問について、当サイトが独自に解いた解答・計算過程・詳解・別解。` +
    `${span}の全${total}問を大問ごとに掲載しています。収録年度は${sets.map((s) => `${s.year}年度（${s.division}・${s.schedule}）`).join("、")}。` +
    `問題文は載せず、${u.university}公式の問題公開ページへリンクしています。公式解答ではありません。`;
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "トップ", item: site.url },
      { "@type": "ListItem", position: 2, name: "過去問の解答・解説", item: `${site.url}/kaisetsu` },
      { "@type": "ListItem", position: 3, name: subject(u), item: `${site.url}/kaisetsu/${u.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-[46rem] px-5 sm:px-6 lg:max-w-[74rem] lg:px-8">
        <nav aria-label="パンくず" className="pt-5 text-[0.72rem] text-ink-3">
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

        <header className="pb-6 pt-4">
          <p className="eyebrow">
            {u.university}
            {u.course && `・${u.course}`}
          </p>
          <h1 className="serif mt-1 text-[1.7rem] leading-snug text-ink sm:text-[2.05rem]">
            {subject(u)} 過去問の解答・解説
          </h1>
          <p className="prose-ja mt-3 max-w-[38rem] text-[0.92rem] leading-[1.95] text-ink-2">
            {span}の全{total}問について、当サイトが独自に解いた解答・計算過程・詳解・別解を載せています。
            方針を選ぶ理由、場合分けと端点の確認、答案で省略しない方がよい説明まで書いています。
          </p>
          <div className="mt-5 max-w-[40rem] border border-rule">
            <p className="border-b border-rule bg-paper-2 px-4 py-2 text-[0.74rem] font-bold tracking-wide text-navy">
              掲載について
            </p>
            <p className="prose-ja px-4 py-2.5 text-[0.85rem] leading-[1.9] text-ink-2">{NOT_OFFICIAL}</p>
          </div>
        </header>

        <div className="space-y-9">
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
                      <span className="serif flex size-7 shrink-0 items-center justify-center border border-accent/30 bg-accent-bg text-[0.84rem] tabular-nums text-accent">
                        {q.no}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.94rem] font-semibold text-ink transition-colors group-hover:text-navy">
                          第{q.no}問　{q.field}
                        </span>
                        <span className="mt-0.5 block truncate text-[0.73rem] text-ink-3">
                          {q.topics.join("・")}
                        </span>
                      </span>
                      <span className="badge shrink-0 tabular-nums">小問{q.subs.length}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-2.5 text-[0.84rem]">
                <Link href={setPath(s)} className="font-semibold text-navy underline underline-offset-4">
                  {s.year}年度をまとめて読む
                </Link>
              </p>
            </section>
          ))}
        </div>

        <section className="mt-12 border-t border-rule pt-7">
          <p className="text-[0.88rem]">
            <Link href={`/univ/${u.slug}`} className="font-semibold text-navy underline underline-offset-4">
              {subject(u)}の傾向と対策
            </Link>
            <span className="ml-1.5 text-ink-2">— 年度別・分野別の出題分析はこちら。</span>
          </p>
        </section>

        {/* この種のページに表紙も購入導線も無かった。解説を読み終えた人がいちばん近い */}
        <SolutionFooter set={sets[0]} />
      </div>
    </>
  );
}
