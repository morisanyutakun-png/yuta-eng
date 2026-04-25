import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/data/site";
import { getLatestPosts } from "@/lib/blog";
import { createPageMetadata } from "@/lib/metadata";
import {
  createEducationalServiceJsonLd,
  createHomeFaqJsonLd,
  createHomePageJsonLd,
  createItemListJsonLd,
} from "@/lib/structured-data";

const visitorPaths = [
  {
    label: "Physics",
    badge: "高校生・受験生向け",
    title: "高校物理を「理解」で乗り越える",
    description:
      "公式の暗記で止まらないために、現象 → 図 → 式の順で物理を読む方法を、図と表でわかりやすく解説。",
    benefits: [
      "力学のつまずきを「変化を読む力」で解消",
      "微積を使わずに加速度の意味を理解",
      "テスト直前と通年学習の両方に使える",
    ],
    href: "/blog/physics-material-creation",
    cta: "物理の記事を読む",
  },
  {
    label: "Materials",
    badge: "先生・塾講師・教材制作者向け",
    title: "教材作成を AI でラクに続ける",
    description:
      "生成AI下書き → LaTeX整形 → PDF/Web展開のワークフローを、コピペ可能なテンプレ付きで紹介。",
    benefits: [
      "毎年作り直しが消える「資産化」設計",
      "AI に任せていい仕事/ダメな仕事の整理",
      "小テスト・類題・解答PDFを一気通貫で",
    ],
    href: "/blog/latex-web-workflow",
    cta: "教材作成AIの記事を読む",
  },
  {
    label: "EdTech",
    badge: "学校ICT・プロダクト担当向け",
    title: "「使われる」学習アプリを設計する",
    description:
      "GIGAスクール後の教室で、紙・PDF・アプリを分断させずに学習動線を設計する考え方をまとめました。",
    benefits: [
      "機能を増やさず動線で勝負する設計指針",
      "学習ループ「読む → 解く → 戻る → 続ける」",
      "自社アプリを評価できるチェックリスト付き",
    ],
    href: "/blog/education-technology-learning-design",
    cta: "学習アプリ設計の記事を読む",
  },
];

const problems = [
  {
    icon: "📐",
    pain: "公式は覚えたのに、ちょっと条件が変わると解けない",
    answer: "物理を「式の暗記」ではなく「変化の読み取り」として学び直すための記事を用意しています。",
    href: "/blog/physics-material-creation",
  },
  {
    icon: "🤖",
    pain: "AIに教材を作らせたいのに、結局自分で書き直している",
    answer: "AI・LaTeX・Web の役割分担と、5ステップの教材作成ワークフローでラクに続けられます。",
    href: "/blog/latex-web-workflow",
  },
  {
    icon: "📱",
    pain: "学習アプリを導入したのに、生徒が続けて使ってくれない",
    answer: "「機能の足し算」ではなく「動線設計」でアプリを設計し直す考え方を、図解で解説します。",
    href: "/blog/education-technology-learning-design",
  },
];

const trustPoints = [
  {
    title: "一次情報ベース",
    body: "学習指導要領、物理教育研究、教育ICT政策など、原典をたどって書いています。",
  },
  {
    title: "実践とつながる",
    body: "Eddivom など実際に動いている学習アプリの設計と、ブログの内容が地続きです。",
  },
  {
    title: "図と表で速く読める",
    body: "ステップ図・比較表・チェックリストで、忙しい先生や受験生でも要点だけつかめます。",
  },
];

const faqItems = [
  {
    question: "Lumora はどんな人のためのサイトですか？",
    answer:
      "高校物理でつまずいた高校生・受験生、AIで教材を作りたい先生や塾講師、学習支援アプリを設計する EdTech 担当者の3層を想定しています。それぞれの入口から記事へ進めます。",
  },
  {
    question: "記事は無料で読めますか？",
    answer:
      "すべての記事は無料で公開しています。一次情報リンクや図解も含めて全文をそのまま読めます。",
  },
  {
    question: "個別の相談やお仕事依頼はできますか？",
    answer:
      "教材設計、AI教材作成、学習Webアプリの企画相談などはお問い合わせから受け付けています。まずは気軽にメールしてください。",
  },
  {
    question: "Eddivom は Lumora と同じ運営ですか？",
    answer:
      "Eddivom は Lumora が公式に紹介している学習支援Webアプリで、AIとLaTeXによる教材作成を体験できます。アプリ一覧から開けます。",
  },
];

export const metadata: Metadata = createPageMetadata({
  title: "Lumora｜高校物理 × 教材作成AI × EdTech 学習スタジオ",
  description:
    "高校物理を理解で乗り越えたい人、教材作成をAIでラクに続けたい先生、学習支援アプリを設計したい EdTech 担当者へ。Lumora は、読む・解く・つなぐを一本の動線でまとめた EdTech 学習スタジオです。",
  keywords: [
    "高校物理 わかりやすい",
    "高校物理 苦手克服",
    "教材作成AI",
    "AI教材作成",
    "LaTeX 教材作成",
    "学習支援Webアプリ",
    "GIGAスクール 教材作成",
    "EdTech",
    "個別最適な学び",
    "Lumora",
  ],
  path: "/",
});

export default function Home() {
  const latestPosts = getLatestPosts(3);
  const homeJsonLd = [
    createHomePageJsonLd(),
    createEducationalServiceJsonLd(),
    createHomeFaqJsonLd(),
    createItemListJsonLd(
      "Lumora の最新ブログ記事",
      latestPosts.map((post) => ({
        name: post.title,
        description: post.description,
        url: new URL(`/blog/${post.slug}`, siteConfig.url).toString(),
      })),
    ),
  ];

  return (
    <>
      <JsonLd data={homeJsonLd} />

      <Container className="px-4 sm:px-6">
        {/* HERO */}
        <section className="pt-6 pb-10 sm:pt-12 sm:pb-16 lg:pt-20 lg:pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-sky-800">
              <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
              Lumora EdTech Studio
            </p>
            <h1 className="mt-4 text-balance font-serif text-[1.95rem] font-bold leading-[1.4] tracking-[-0.02em] text-slate-950 sm:mt-6 sm:text-[2.6rem] sm:leading-[1.32] lg:text-[3.1rem] lg:leading-[1.25]">
              高校物理を「理解」で乗り越え、<br className="hidden sm:block" />
              教材作成をAIで「ラク」に続ける。
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-[0.98rem] leading-[1.95] text-slate-600 sm:mt-6 sm:text-[1.05rem] sm:leading-[2]">
              Lumora は、高校物理の理解、AI・LaTeX による教材作成、学習支援アプリの設計を、図と表でわかりやすく整理する EdTech スタジオです。読んで → 解いて → つなぐ。学びと教材制作を一本の動線でつなげます。
            </p>
            <div className="mx-auto mt-7 flex max-w-md flex-col gap-2.5 sm:mt-8 sm:flex-row sm:justify-center">
              <ButtonLink className="w-full sm:w-auto" href="/blog">
                ブログを読む
              </ButtonLink>
              <ButtonLink className="w-full sm:w-auto" href="/apps" variant="secondary">
                アプリを見る
              </ButtonLink>
            </div>
            <div className="mx-auto mt-7 grid max-w-2xl grid-cols-3 gap-2 text-center sm:mt-8 sm:gap-3">
              {[
                { num: "3", label: "テーマ別の入口" },
                { num: "100%", label: "無料で全文公開" },
                { num: "Mobile", label: "モバイル最適化" },
              ].map((item) => (
                <div
                  className="rounded-xl border border-slate-200 bg-white px-2 py-3 sm:rounded-2xl sm:px-3 sm:py-4"
                  key={item.label}
                >
                  <p className="font-mono text-[0.95rem] font-bold text-sky-800 sm:text-base">
                    {item.num}
                  </p>
                  <p className="mt-1 text-[0.7rem] leading-[1.4] text-slate-500 sm:text-xs">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROBLEM SECTION */}
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_22px_70px_-60px_rgba(15,23,42,0.5)] sm:rounded-[1.6rem] sm:p-8 lg:p-10">
          <div className="mb-6 sm:mb-8 sm:text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-sky-700">
              こんな悩みはありませんか？
            </p>
            <h2 className="mt-2 text-balance font-serif text-[1.5rem] font-bold leading-[1.45] tracking-[-0.02em] text-slate-950 sm:text-[1.85rem] sm:leading-[1.4]">
              よくあるつまずきと、Lumora での解決方法
            </h2>
          </div>
          <ul className="grid gap-3 sm:gap-4 lg:grid-cols-3">
            {problems.map((problem) => (
              <li key={problem.pain}>
                <Link
                  className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white sm:p-5"
                  href={problem.href}
                >
                  <div className="flex items-start gap-2">
                    <span aria-hidden="true" className="text-2xl">
                      {problem.icon}
                    </span>
                    <p className="text-[0.95rem] font-bold leading-[1.65] text-slate-950">
                      {problem.pain}
                    </p>
                  </div>
                  <p className="mt-3 text-[0.88rem] leading-[1.85] text-slate-600">
                    {problem.answer}
                  </p>
                  <p className="mt-3 inline-flex items-center gap-1 text-[0.82rem] font-bold text-sky-700">
                    解決方法を見る <span aria-hidden="true">→</span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* MAIN PATHS */}
        <section className="mt-12 sm:mt-16 lg:mt-20" id="paths">
          <div className="mx-auto max-w-3xl sm:text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-sky-700">
              3つの入口から始める
            </p>
            <h2 className="mt-2 text-balance font-serif text-[1.55rem] font-bold leading-[1.42] tracking-[-0.02em] text-slate-950 sm:text-[2rem] sm:leading-[1.36]">
              あなたの目的に近い入口から、<br className="hidden sm:block" />
              そのまま読み始められます。
            </h2>
          </div>
          <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 lg:grid-cols-3">
            {visitorPaths.map((path) => (
              <Link
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_55px_-48px_rgba(15,23,42,0.5)] transition hover:-translate-y-1 hover:border-sky-200 sm:rounded-[1.4rem]"
                href={path.href}
                key={path.title}
              >
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-sky-50/60 px-4 py-3 sm:px-5">
                  <span className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] text-sky-800">
                    {path.label}
                  </span>
                  <span className="rounded-full bg-white px-2.5 py-1 text-[0.65rem] font-semibold text-slate-600 ring-1 ring-inset ring-slate-200">
                    {path.badge}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h3 className="text-[1.1rem] font-bold leading-[1.5] tracking-[-0.01em] text-slate-950 transition group-hover:text-sky-800 sm:text-[1.2rem]">
                    {path.title}
                  </h3>
                  <p className="mt-3 text-[0.9rem] leading-[1.85] text-slate-600">
                    {path.description}
                  </p>
                  <ul className="mt-4 grid gap-1.5">
                    {path.benefits.map((benefit) => (
                      <li
                        className="flex gap-1.5 text-[0.85rem] leading-[1.65] text-slate-700"
                        key={benefit}
                      >
                        <span
                          aria-hidden="true"
                          className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-sky-100 text-[0.6rem] font-bold text-sky-800"
                        >
                          ✓
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 inline-flex items-center gap-1 text-[0.85rem] font-bold text-sky-800">
                    {path.cta} <span aria-hidden="true">→</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* TRUST */}
        <section className="mt-12 rounded-3xl bg-gradient-to-br from-sky-50 via-white to-amber-50 p-5 sm:mt-16 sm:rounded-[1.6rem] sm:p-8 lg:mt-20 lg:p-10">
          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:items-center">
            <div>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-sky-700">
                Lumora が大切にしていること
              </p>
              <h2 className="mt-2 text-balance font-serif text-[1.5rem] font-bold leading-[1.42] tracking-[-0.02em] text-slate-950 sm:text-[1.9rem] sm:leading-[1.36]">
                図と表で速く読めて、一次情報で確かめられる。
              </h2>
              <p className="mt-3 text-[0.95rem] leading-[1.95] text-slate-600 sm:text-base sm:leading-[2]">
                抽象的な理念ではなく、すぐ使える形へ落とし込むこと。教材設計、AIプロンプト、アプリの動線まで、現場で動くレベルで言語化することを大切にしています。
              </p>
            </div>
            <div className="grid gap-3">
              {trustPoints.map((point, index) => (
                <div
                  className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-[0_14px_45px_-40px_rgba(15,23,42,0.4)] backdrop-blur sm:p-5"
                  key={point.title}
                >
                  <p className="font-mono text-[0.72rem] font-bold text-sky-800">
                    0{index + 1}
                  </p>
                  <h3 className="mt-2 text-[1rem] font-bold tracking-[-0.01em] text-slate-950 sm:text-[1.05rem]">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-[0.88rem] leading-[1.85] text-slate-600">
                    {point.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LATEST ARTICLES */}
        <section className="mt-12 sm:mt-16 lg:mt-20">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-sky-700">
                Latest Articles
              </p>
              <h2 className="mt-2 font-serif text-[1.5rem] font-bold leading-[1.42] tracking-[-0.02em] text-slate-950 sm:text-[1.85rem]">
                最新の記事
              </h2>
            </div>
            <ButtonLink className="hidden sm:inline-flex" href="/blog" variant="secondary">
              ブログ一覧へ
            </ButtonLink>
          </div>
          <ul className="mt-6 grid gap-4 sm:gap-5 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  className="group block h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_14px_45px_-40px_rgba(15,23,42,0.4)] transition hover:-translate-y-1 hover:border-sky-200 sm:rounded-[1.4rem] sm:p-5"
                  href={`/blog/${post.slug}`}
                >
                  <div className="flex flex-wrap items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    <span className="rounded-full bg-sky-100 px-2.5 py-1 text-sky-800">
                      {post.category}
                    </span>
                    <time className="text-slate-500" dateTime={post.date}>
                      {post.formattedDate}
                    </time>
                  </div>
                  <h3 className="mt-3 text-[1.05rem] font-bold leading-[1.55] tracking-[-0.01em] text-slate-950 transition group-hover:text-sky-800 sm:text-[1.15rem]">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-[0.88rem] leading-[1.85] text-slate-600">
                    {post.description}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1 text-[0.82rem] font-bold text-sky-800">
                    続きを読む <span aria-hidden="true">→</span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-center sm:hidden">
            <ButtonLink href="/blog" variant="secondary">
              ブログ一覧へ
            </ButtonLink>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-12 sm:mt-16 lg:mt-20">
          <div className="mx-auto max-w-3xl sm:text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-sky-700">
              FAQ
            </p>
            <h2 className="mt-2 font-serif text-[1.5rem] font-bold leading-[1.42] tracking-[-0.02em] text-slate-950 sm:text-[1.85rem]">
              よくある質問
            </h2>
          </div>
          <ul className="mx-auto mt-6 grid max-w-3xl gap-3 sm:mt-8">
            {faqItems.map((item) => (
              <li
                className="rounded-2xl border border-slate-200 bg-white p-4 sm:rounded-[1.2rem] sm:p-5"
                key={item.question}
              >
                <p className="flex gap-2 text-[0.95rem] font-bold leading-[1.55] text-slate-950">
                  <span
                    aria-hidden="true"
                    className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-sky-700 text-[0.65rem] font-bold text-white"
                  >
                    Q
                  </span>
                  {item.question}
                </p>
                <p className="mt-3 flex gap-2 text-[0.9rem] leading-[1.85] text-slate-600">
                  <span
                    aria-hidden="true"
                    className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber-100 text-[0.65rem] font-bold text-amber-700"
                  >
                    A
                  </span>
                  {item.answer}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* FINAL CTA */}
        <section className="my-12 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-sky-900 p-6 text-white shadow-[0_30px_90px_-70px_rgba(15,23,42,0.9)] sm:my-16 sm:rounded-[1.6rem] sm:p-10 lg:my-20 lg:p-14">
          <div className="mx-auto max-w-2xl sm:text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-sky-300">
              Start with Lumora
            </p>
            <h2 className="mt-3 text-balance font-serif text-[1.7rem] font-bold leading-[1.4] tracking-[-0.02em] sm:text-[2.1rem] sm:leading-[1.32]">
              読んで → 解いて → つなぐ。<br className="hidden sm:block" />
              学びの動線、ここから始めませんか？
            </h2>
            <p className="mt-4 text-[0.95rem] leading-[1.95] text-slate-300 sm:mt-5 sm:text-base sm:leading-[2]">
              Lumora は、高校物理から教材作成AI、学習支援アプリまでを一本の動線でつなげる EdTech スタジオです。すべて無料で公開しているので、まずは気になる入口から開いてください。
            </p>
            <div className="mx-auto mt-7 flex max-w-md flex-col gap-2.5 sm:mt-8 sm:flex-row sm:justify-center">
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-[0.95rem] font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-200"
                href="/blog"
              >
                ブログを読む →
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-[0.95rem] font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
                href="/contact"
              >
                相談する
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
