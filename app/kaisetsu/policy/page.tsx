import type { Metadata } from "next";
import Link from "next/link";

import { site } from "@/lib/site";

const title = "解答・解説の掲載方針｜問題文を載せない理由";
const description =
  "当サイトの過去問解説は、問題文・図・表を一切掲載せず、独自に解いた解答・計算過程・詳解・別解だけを公開しています。" +
  "大学公式の解答や予備校・問題集の解説は引用も要約もしていません。問題文の確認方法、リンクの扱い、誤りの指摘先をまとめています。";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["入試問題 著作権", "過去問 解答 掲載", "解答速報 問題文", "入試数学 解説 方針"],
  alternates: { canonical: "/kaisetsu/policy" },
  openGraph: { title, description, url: "/kaisetsu/policy", type: "article", images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: site.name }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og/home.jpg"] },
};

/** 見出しと本文の対。方針は箇条書きより、理由まで書いた段落のほうが伝わる。 */
const sections: { h: string; body: string[] }[] = [
  {
    h: "問題文は載せません",
    body: [
      "入試問題の著作権は各大学にあります。当サイトは、問題文・図・表を、そのままの形でも、書き写した形でも、言い換えた形でも掲載しません。画像やスクリーンショットも置きません。",
      "載せているのは、大学の公式解答ではなく、問題を自分で解いて書いた当サイト独自の解答・計算過程・詳解・別解だけです。解説の中で $a$ や $P_n$ といった記号や、計算に必要な条件に触れることはありますが、問題文の言い回しや構成をなぞることはしません。",
    ],
  },
  {
    h: "大学の公式解答・他社の解説は使いません",
    body: [
      "大学が公表している解答例や出題意図は、大学が書いた文章です。引用も要約もしていません。",
      "赤本・予備校・問題集など、ほかの会社がつくった解答解説も同じです。読んで言い換えることはしていません。解説はすべて、実際の問題にあたって一から解き直したものです。",
    ],
  },
  {
    h: "問題文の確認方法",
    body: [
      "大学が自分のサイトで問題を公開している年度は、そのページへふつうの文字リンクを張っています。リンク先が大学の公式ページであることが分かる文言を添えています。",
      "公開されていない年度には、リンクを張りません。問題を転載している非公式のサイトへも案内しません。お手元の過去問集・赤本などでご確認ください。",
      "公式ページを当サイトのページ内に埋め込むこと（iframe）や、問題のPDFを当サイトへ複製することはしていません。",
    ],
  },
  {
    h: "配点・採点基準・難易度について",
    body: [
      "大学が公表していない配点・採点基準・難易度を、公式の情報として示すことはしません。",
      "解説に「当サイトの体感難易度」と書いてあるものは、運営者が自分で解いたうえでの見立てです。大学の評価ではありません。",
    ],
  },
  {
    h: "正確さについて",
    body: [
      "掲載している解答は、式変形とは別の方法（数値計算や全数探索など）でも確かめてから公開しています。それでも誤りが残っている可能性はあります。",
      "お気づきの点があれば、各ページの大学名・年度・大問番号を添えてお知らせください。確認のうえ訂正し、更新日を改めます。",
    ],
  },
  {
    h: "教材との関係",
    body: [
      "解説は最後まで無料で読めます。読むために会員登録やメールアドレスの登録をお願いすることはありません。",
      "解説のあとに、当サイトの運営者が制作した問題集を案内しています。これは運営者自身がつくった教材で、大学や予備校の教材ではありません。中身は試し読みで確認できます。",
    ],
  },
];

export default function PolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: { "@type": "Person", name: site.author },
    publisher: { "@type": "Organization", name: site.name },
    inLanguage: "ja",
    url: `${site.url}/kaisetsu/policy`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-[46rem] px-5 sm:px-6 lg:px-8">
        <nav aria-label="パンくず" className="breadcrumb pt-3 text-[0.75rem] text-ink-3">
          <Link href="/" className="hover:text-navy">
            トップ
          </Link>
          <span className="mx-1.5 text-rule">／</span>
          <Link href="/kaisetsu" className="hover:text-navy">
            過去問の解答・解説
          </Link>
          <span className="mx-1.5 text-rule">／</span>
          <span className="text-ink-2">掲載方針</span>
        </nav>

        <header className="pb-6 pt-4">
          <h1 className="serif text-[1.7rem] leading-snug text-ink sm:text-[2.05rem]">解答・解説の掲載方針</h1>
          <p className="prose-ja mt-3 text-[0.93rem] leading-[1.95] text-ink-2">
            当サイトの過去問解説を、どういう考えで作って出しているかをまとめています。
          </p>
        </header>

        <div className="space-y-10">
          {sections.map((s) => (
            <section key={s.h} aria-labelledby={s.h}>
              <h2 id={s.h} className="rule-mark serif text-[1.25rem] leading-snug text-ink">
                {s.h}
              </h2>
              <div className="prose-ja mt-3 space-y-3 text-[0.93rem] leading-[1.95] text-ink-2">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-14 border-t border-rule pt-6 text-[0.93rem]">
          <Link href="/kaisetsu" className="font-semibold text-navy underline underline-offset-4">
            過去問の解答・解説に戻る
          </Link>
        </p>
      </div>
    </>
  );
}
