import type { Metadata } from "next";
import Link from "next/link";

import { siteTotals, universityCount } from "@/lib/data";
import { sampleCount } from "@/lib/samples";
import { kanseiPublished } from "@/lib/series";
import { site } from "@/lib/site";

/**
 * 学校・塾・予備校の先生向けの案内。
 *
 * 売り込むページではなく、調べに来た先生が「指導用にも使えるか」を
 * 自分で判断できるようにするページ。だから次の3つを守る。
 *
 *   ・確かめていない実績は書かない（「採用実績多数」などは使わない）
 *   ・Amazon 側の仕組み（数量割引・法人向け特典）を断定しない
 *   ・導線は「中身を確かめる」ほうを先に、買うほうは後ろに置く
 *
 * 数字はすべて実データから出す。原稿が増えれば自動で変わる。
 */

const totals = siteTotals();

const title = "学校・塾・予備校関係者の方へ";
const description =
  `大学受験指導における演習教材としてのご案内です。当サイトで紹介している教材は、` +
  `${universityCount()}大学・${totals.sections}区分の数学入試を分析して大学別に書き下ろした予想問題集と分野別演習書で、` +
  `個人の学習だけでなく、授業・講習・課題演習にもご利用いただけます。中身は試し読みで確認できます。`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "大学受験 教材 学校採用",
    "塾 予備校 教材",
    "受験数学 演習教材",
    "大学別 数学 問題集 指導用",
    "講習 教材 数学",
  ],
  alternates: { canonical: "/educators" },
  openGraph: {
    title,
    description,
    url: "/educators",
    type: "article",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og/home.jpg"] },
};

/** 教材の特徴。実際の中身と食い違わないことだけを書く。 */
const features: { h: string; body: string }[] = [
  {
    h: "大学別・区分別に設計しています",
    body:
      `${universityCount()}大学・${totals.sections}区分（理系／文系／中期日程など）それぞれについて、` +
      `${totals.span}の出題を分析し、試験時間・大問構成・解答形式・頻出分野に合わせて問題を書き下ろしています。` +
      `志望校が決まっている生徒に、その大学の形式のまま演習させることができます。`,
  },
  {
    h: "過去問演習の前後、どちらにも置けます",
    body:
      `分野別完成演習（${kanseiPublished.length}冊）は、標準問題を終えてから過去問に入るまでの間を埋めるための、頻出分野別の演習書です。` +
      `合格答案をつくる（${totals.books}冊）は本番と同じ形式の予想問題集で、過去問演習と並べて使えます。` +
      `講習の進度に合わせて、どちらから入るかを選べます。`,
  },
  {
    h: "授業・講習・課題演習に使えます",
    body:
      "試験1回分がそのまま時間を計った演習になるほか、大問単位で切り出して課題にすることもできます。" +
      "分野別完成演習は章ごとに分野がまとまっているので、分野別の補習にも使えます。",
  },
  {
    h: "解答・解説を収録しています",
    body:
      "答えだけでなく、解法の方針、計算過程、別解を載せています。" +
      "予想問題集には小問ごとの加点・減点を示した採点表を収録しているので、記述答案の採点基準をそろえる材料になります。",
  },
  {
    h: "Amazon から購入できます",
    body:
      "すべて Amazon.co.jp で販売しています。価格・在庫・配送については Amazon の商品ページの表示が優先されます。",
  },
];

export default function EducatorsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${site.url}/educators`,
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
    inLanguage: "ja",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-[42rem] px-5 sm:px-6 lg:px-8">
        <nav aria-label="パンくず" className="pt-5 text-[0.72rem] text-ink-3">
          <Link href="/" className="hover:text-navy">
            トップ
          </Link>
          <span className="mx-1.5 text-rule">／</span>
          <span className="text-ink-2">学校・塾・予備校関係者の方へ</span>
        </nav>

        <header className="border-b border-rule pb-9 pt-6">
          <h1 className="serif text-[1.6rem] leading-[1.45] text-ink sm:text-[2rem]">
            学校・塾・予備校関係者の方へ
          </h1>
          <p className="mt-3 text-[1rem] leading-relaxed text-ink-2 sm:text-[1.05rem]">
            大学受験指導における演習教材としてご活用いただけます。
          </p>
        </header>

        <section aria-labelledby="intro" className="pt-9">
          <h2 id="intro" className="sr-only">
            はじめに
          </h2>
          <div className="prose-ja space-y-4 text-[0.93rem] leading-[2] text-ink-2">
            <p>
              当サイトで紹介している教材は、大学入試の数学を大学別・区分別に分析し、その形式に合わせて書き下ろした
              予想問題集と分野別演習書です。個人での学習を想定して作っていますが、
              学校・塾・予備校での演習教材や講習教材としてもご利用いただけます。
            </p>
            <p>
              採用をご検討の際は、まず中身をご確認ください。
              各大学のページに抜粋を載せており、問題・解説・答案の体裁を、購入前にそのままご覧いただけます。
            </p>
          </div>
        </section>

        <section aria-labelledby="features" className="mt-14">
          <h2 id="features" className="serif border-b border-rule pb-2.5 text-[1.2rem] text-ink">
            教材の特徴
          </h2>
          <dl className="mt-6 space-y-7">
            {features.map((f) => (
              <div key={f.h}>
                <dt className="text-[0.95rem] font-semibold leading-snug text-ink">{f.h}</dt>
                <dd className="prose-ja mt-1.5 text-[0.9rem] leading-[2] text-ink-2">{f.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="check" className="mt-14">
          <h2 id="check" className="serif border-b border-rule pb-2.5 text-[1.2rem] text-ink">
            教材を確認する
          </h2>
          <ul className="mt-5 divide-y divide-rule border-y border-rule">
            {[
              {
                href: "/books",
                h: "教材一覧",
                body: `刊行している全${totals.books + kanseiPublished.length + 1}冊を、学習の段階ごとに並べています。`,
              },
              {
                href: "/universities",
                h: "大学別の出題分析と試し読み",
                body: `大学を選ぶと、出題分析と、その大学の教材の抜粋（${sampleCount}冊ぶん）をご覧いただけます。`,
              },
              {
                href: "/kaisetsu",
                h: "過去問の解答・解説",
                body: "当サイトが独自に作成した解答例です。解説の書き方の方針をご確認いただけます。",
              },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="group flex items-center justify-between gap-5 py-4">
                  <span className="min-w-0">
                    <span className="block text-[0.93rem] font-semibold text-ink transition-colors group-hover:text-navy">
                      {l.h}
                    </span>
                    <span className="mt-1 block text-[0.82rem] leading-relaxed text-ink-3">{l.body}</span>
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

        <section aria-labelledby="multiple" className="mt-14">
          <h2 id="multiple" className="serif border-b border-rule pb-2.5 text-[1.2rem] text-ink">
            複数冊でのご利用について
          </h2>
          <div className="prose-ja mt-5 space-y-4 text-[0.9rem] leading-[2] text-ink-2">
            <p>
              複数名でのご利用をご検討の場合も、通常の商品ページから購入いただけます。
              各教材のページに Amazon の商品ページへのリンクを置いています。
            </p>
            <p className="text-[0.84rem] text-ink-3">
              まとめてのご購入にあたっての条件（在庫・配送・支払い方法など）は、
              Amazon の商品ページおよび Amazon の各サービスの案内をご確認ください。
              当サイトではそれらの可否を判断しかねます。
            </p>
          </div>
        </section>

        <section aria-labelledby="contact" className="mt-14">
          <h2 id="contact" className="serif border-b border-rule pb-2.5 text-[1.2rem] text-ink">
            お問い合わせ
          </h2>
          <div className="prose-ja mt-5 space-y-4 text-[0.9rem] leading-[2] text-ink-2">
            <p>
              教材内容や授業・講習での利用についてご不明な点がございましたら、お問い合わせください。
              収録範囲、難易度、進度に合わせた使い方などについてお答えします。
            </p>
            {site.contact && (
              <p>
                <a
                  href={site.contact.includes("@") ? `mailto:${site.contact}` : site.contact}
                  className="inline-flex min-h-11 items-center border border-rule bg-paper-2/60 px-5 text-[0.9rem] font-semibold text-navy transition-colors hover:border-navy/40"
                >
                  お問い合わせ
                </a>
              </p>
            )}
          </div>
        </section>

        <p className="prose-ja mt-14 border-t border-rule pt-6 text-[0.78rem] leading-[1.9] text-ink-3">
          本サイトおよび教材は、各大学とは関係のない、独自に制作した非公式の教材です。
          問題文の転載は行っていません。価格・在庫は Amazon の表示が優先されます。
        </p>
      </div>
    </>
  );
}
