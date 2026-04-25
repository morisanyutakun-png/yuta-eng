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

type VisitorPath = {
  no: string;
  label: string;
  badge: string;
  title: string;
  description: string;
  benefits: string[];
  href: string;
  cta: string;
  external?: boolean;
  primary?: boolean;
};

const visitorPaths: VisitorPath[] = [
  {
    no: "01",
    label: "Lumora Physics",
    badge: "高校生・受験生向け｜物理専門塾【公式サイト】",
    title: "高校物理を「理解」で乗り越える、物理専門塾へ。",
    description:
      "Lumora Physics は、高校物理に特化したオンライン専門塾です。公式暗記ではなく、現象 → 図 → 式の順で読み解く力を、個別カリキュラムで育てます。受講相談は専門塾サイトから受付中。",
    benefits: [
      "物理基礎・物理の通年指導と定期テスト対策",
      "共通テスト／国公立二次／私大入試まで対応",
      "つまずいた前提単元へ戻れる個別カリキュラム",
    ],
    href: "https://physics.yuta-eng.com",
    cta: "物理専門塾サイトを開く",
    external: true,
    primary: true,
  },
  {
    no: "02",
    label: "Materials AI",
    badge: "先生・塾講師・教材制作者向け",
    title: "教材作成を AI でラクに続ける",
    description:
      "生成AI下書き → LaTeX整形 → PDF/Web展開のワークフローを、コピペ可能なテンプレ付きで紹介。Eddivom（外部公式アプリ）への入口にもなります。",
    benefits: [
      "毎年作り直しが消える「資産化」設計",
      "AI に任せていい仕事 / ダメな仕事の整理",
      "小テスト・類題・解答PDFを一気通貫で",
    ],
    href: "/blog/latex-web-workflow",
    cta: "教材作成AIの記事を読む",
  },
  {
    no: "03",
    label: "EdTech Design",
    badge: "学校ICT・EdTechプロダクト担当向け",
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
    badge: "高校物理 専門塾",
    pain: "公式は覚えたのに、ちょっと条件が変わると解けない",
    answer:
      "物理専門塾「Lumora Physics」では、現象 → 図 → 式の順で読み解く力を個別カリキュラムで育てます。受講相談は専門塾サイトから。",
    href: "https://physics.yuta-eng.com",
    external: true,
  },
  {
    badge: "教材制作",
    pain: "AIに教材を作らせたいのに、結局自分で書き直している",
    answer:
      "AI・LaTeX・Web の役割分担と、5ステップの教材作成ワークフローでラクに続けられます。",
    href: "/blog/latex-web-workflow",
    external: false,
  },
  {
    badge: "学習設計",
    pain: "学習アプリを導入したのに、生徒が続けて使ってくれない",
    answer:
      "「機能の足し算」ではなく「動線設計」でアプリを設計し直す考え方を、図解で解説します。",
    href: "/blog/education-technology-learning-design",
    external: false,
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
    question: "yuta-eng.com（Lumora）はどんなサイトですか？",
    answer:
      "yuta-eng.com は、Lumora が運営する学習ハブ（権威ページ）です。物理専門塾「Lumora Physics（physics.yuta-eng.com）」、教材作成アプリ Eddivom、IT Pass などの公式入口を1つにまとめています。",
  },
  {
    question: "物理専門塾の受講申し込みはどこからしますか？",
    answer:
      "物理専門塾「Lumora Physics」の公式サイトは https://physics.yuta-eng.com です。受講相談・申し込み・カリキュラム詳細は専門塾サイトから直接アクセスしてください。当ハブからは各セクションのボタンで遷移できます。",
  },
  {
    question: "ブログの記事は無料で読めますか？",
    answer:
      "yuta-eng.com で公開している記事はすべて無料で全文を読めます。一次情報リンクや図解も含めて公開しています。",
  },
  {
    question: "Eddivom や IT Pass は Lumora の運営ですか？",
    answer:
      "Eddivom は Lumora が公式に提携・紹介する教材作成アプリ、IT Pass は外部の学習アプリです。yuta-eng.com を学習ハブとして、それぞれの公式サイトへ案内しています。",
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

function HeroIllustration() {
  return (
    <svg
      aria-hidden="true"
      className="block h-full w-full"
      viewBox="0 0 460 380"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hero-paper" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fdfaf2" />
          <stop offset="1" stopColor="#f4ecda" />
        </linearGradient>
        <linearGradient id="hero-deep" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#1f3a6b" />
          <stop offset="1" stopColor="#0f1c3a" />
        </linearGradient>
        <pattern id="hero-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0 L0 0 0 20" stroke="rgba(15,23,42,0.06)" strokeWidth="0.5" fill="none" />
        </pattern>
        <marker
          id="hero-arrow-warm"
          markerWidth="14"
          markerHeight="14"
          refX="11"
          refY="7"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path d="M2 2 L12 7 L2 12 z" fill="#c89211" />
        </marker>
      </defs>
      {/* Background paper */}
      <rect x="14" y="14" width="432" height="352" rx="6" fill="url(#hero-paper)" stroke="#d8cfb8" />
      <rect x="14" y="14" width="432" height="352" rx="6" fill="url(#hero-grid)" />
      {/* Top ribbon */}
      <rect x="14" y="14" width="432" height="34" fill="#0f1c3a" rx="6 6 0 0" />
      <rect x="14" y="14" width="432" height="34" fill="#0f1c3a" />
      <rect x="14" y="48" width="432" height="3" fill="#c89211" />
      <text
        x="36"
        y="36"
        fill="#f5d68a"
        fontFamily="serif"
        fontSize="13"
        fontWeight="700"
        letterSpacing="0.3em"
      >
        LUMORA EDTECH STUDIO · EST 2026
      </text>
      <circle cx="424" cy="31" r="6" fill="#c89211" />
      {/* Title block */}
      <text
        x="40"
        y="92"
        fill="#1f3a6b"
        fontFamily="serif"
        fontSize="11"
        fontWeight="700"
        letterSpacing="0.3em"
      >
        FOR LEARNERS · TEACHERS · EDTECH
      </text>
      <line x1="40" y1="104" x2="120" y2="104" stroke="#c89211" strokeWidth="2" />
      <text x="40" y="138" fill="#1a1a1a" fontFamily="serif" fontSize="26" fontWeight="700">
        高校物理を「理解」で
      </text>
      <text x="40" y="170" fill="#1a1a1a" fontFamily="serif" fontSize="26" fontWeight="700">
        乗り越え、教材作成を
      </text>
      <text x="40" y="202" fill="#1a1a1a" fontFamily="serif" fontSize="26" fontWeight="700">
        AIで「ラク」に続ける。
      </text>
      {/* Diagram: physics graph */}
      <g transform="translate(40 230)">
        <rect width="170" height="118" rx="4" fill="#ffffff" stroke="#d8cfb8" />
        <text x="12" y="22" fill="#1f3a6b" fontFamily="serif" fontSize="10" fontWeight="700">
          PHYSICS · v–t
        </text>
        <line x1="12" y1="98" x2="158" y2="98" stroke="#1a1a1a" strokeWidth="1.3" />
        <line x1="12" y1="34" x2="12" y2="98" stroke="#1a1a1a" strokeWidth="1.3" />
        <path d="M12 96 Q60 90 100 60 T158 28" stroke="#1f3a6b" strokeWidth="2.4" fill="none" />
        <path d="M12 96 Q60 90 100 60 T158 28 L158 98 L12 98 Z" fill="rgba(31,111,235,0.12)" />
        <circle cx="100" cy="60" r="3.5" fill="#c89211" />
        <text x="106" y="56" fill="#1a1a1a" fontFamily="serif" fontSize="9" fontWeight="600">
          傾き=速さ
        </text>
        <text x="58" y="92" fill="#1f3a6b" fontFamily="serif" fontSize="9" fontWeight="600">
          面積=距離
        </text>
      </g>
      {/* Diagram: material workflow */}
      <g transform="translate(228 230)">
        <rect width="178" height="118" rx="4" fill="url(#hero-deep)" />
        <text
          x="12"
          y="22"
          fill="#f5d68a"
          fontFamily="serif"
          fontSize="10"
          fontWeight="700"
          letterSpacing="0.16em"
        >
          MATERIAL FLOW
        </text>
        {[
          { x: 14, label: "AI" },
          { x: 70, label: "LaTeX" },
          { x: 130, label: "Web" },
        ].map((node) => (
          <g key={node.label}>
            <rect
              x={node.x}
              y="46"
              width="38"
              height="38"
              rx="4"
              fill="#ffffff"
              stroke="#c89211"
              strokeWidth="1.2"
            />
            <text
              x={node.x + 19}
              y="69"
              textAnchor="middle"
              fontFamily="serif"
              fontSize="10"
              fontWeight="700"
              fill="#1a1a1a"
            >
              {node.label}
            </text>
          </g>
        ))}
        <line
          x1="52"
          y1="65"
          x2="70"
          y2="65"
          stroke="#c89211"
          strokeWidth="2"
          markerEnd="url(#hero-arrow-warm)"
        />
        <line
          x1="108"
          y1="65"
          x2="126"
          y2="65"
          stroke="#c89211"
          strokeWidth="2"
          markerEnd="url(#hero-arrow-warm)"
        />
        <text
          x="89"
          y="105"
          textAnchor="middle"
          fill="#d6d3c8"
          fontFamily="serif"
          fontSize="9"
          letterSpacing="0.1em"
        >
          下書き → 整える → 届ける
        </text>
      </g>
      {/* Bottom seal */}
      <g transform="translate(360 88)">
        <circle r="34" fill="#fbf6e8" stroke="#c89211" strokeWidth="2" />
        <circle r="29" fill="none" stroke="#c89211" strokeWidth="0.8" strokeDasharray="2 3" />
        <text
          textAnchor="middle"
          y="-6"
          fontFamily="serif"
          fontSize="8"
          fontWeight="700"
          fill="#1f3a6b"
          letterSpacing="0.2em"
        >
          OFFICIAL
        </text>
        <text
          textAnchor="middle"
          y="6"
          fontFamily="serif"
          fontSize="11"
          fontWeight="700"
          fill="#1a1a1a"
        >
          LUMORA
        </text>
        <text
          textAnchor="middle"
          y="20"
          fontFamily="serif"
          fontSize="7"
          fill="#6b4a09"
          letterSpacing="0.16em"
        >
          STUDIO
        </text>
      </g>
    </svg>
  );
}

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

      {/* HERO with paper feel */}
      <section className="lumora-mesh relative overflow-hidden border-b border-[var(--line)]">
        <div className="lumora-grid-bg pointer-events-none absolute inset-0 opacity-40" />
        <Container className="relative px-4 sm:px-6">
          <div className="grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
            <div>
              <p className="lumora-kicker">LUMORA · LEARNING HUB</p>
              <h1 className="lumora-display mt-5 text-balance text-[1.85rem] leading-[1.55] sm:mt-7 sm:text-[2.5rem] sm:leading-[1.45] lg:text-[3rem] lg:leading-[1.4]">
                <span className="lumora-marker">物理専門塾</span> も、教材作成AI も。<br className="hidden sm:block" />
                学びと教育のすべての入口を、ここに。
              </h1>
              <p className="lumora-lead mt-6 max-w-xl text-pretty text-[0.98rem] sm:mt-7 sm:text-[1.05rem]">
                yuta-eng.com（Lumora）は、物理専門塾「Lumora Physics」、教材作成AI、学習支援アプリの公式入口をひとつにまとめた学習ハブです。記事で考え方を学び、各サービスへそのまま進めます。
              </p>
              <div className="mt-7 flex flex-col gap-2.5 sm:mt-9 sm:flex-row">
                <a
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-[var(--accent-deep)] px-6 py-3 font-serif text-[0.95rem] font-bold tracking-[0.06em] text-white shadow-[0_14px_30px_-18px_rgba(15,23,42,0.65)] transition hover:-translate-y-0.5 hover:bg-[#16305c]"
                  href={siteConfig.physicsSchoolUrl}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--accent-warm)]" />
                  物理専門塾サイトを開く
                  <span aria-hidden="true" className="text-[#f5d68a]">↗</span>
                </a>
                <ButtonLink className="w-full sm:w-auto" href="/blog" variant="secondary">
                  ブログを読む
                </ButtonLink>
              </div>
              <div className="mt-9 grid grid-cols-3 gap-0 border-y border-[var(--line)] py-5 sm:mt-12 sm:gap-6 sm:py-6">
                {[
                  { num: "1", unit: "塾", label: "物理専門塾の公式" },
                  { num: "3", unit: "アプリ", label: "公式入口を集約" },
                  { num: "100", unit: "%", label: "記事は無料公開" },
                ].map((item, i) => (
                  <div
                    className={`lumora-stat px-2 text-center sm:text-left ${i > 0 ? "border-l border-[var(--line)]" : ""}`}
                    key={item.label}
                  >
                    <p className="lumora-stat-num">
                      {item.num}
                      <span className="ml-0.5 text-[0.95rem] font-bold text-[var(--accent-warm)]">
                        {item.unit}
                      </span>
                    </p>
                    <p className="lumora-stat-label mt-1.5">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -left-3 -top-3 h-full w-full rounded-md border border-[var(--accent-warm)] sm:-left-4 sm:-top-4"
              />
              <div className="relative overflow-hidden rounded-md border border-[var(--line)] bg-white shadow-[0_30px_70px_-50px_rgba(15,23,42,0.4)]">
                <HeroIllustration />
              </div>
              <div className="absolute -bottom-3 left-4 inline-flex items-center gap-2 rounded-sm bg-[var(--accent-deep)] px-3 py-1.5 text-[0.7rem] font-bold tracking-[0.18em] text-white shadow-[0_18px_30px_-22px_rgba(15,23,42,0.5)] sm:-bottom-4 sm:left-6 sm:text-[0.78rem]">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--accent-warm)]" />
                EST.&nbsp;2026 · OFFICIAL HUB
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="px-4 sm:px-6">
        {/* PROBLEMS */}
        <section className="pt-12 sm:pt-20 lg:pt-24">
          <div className="text-center">
            <p className="lumora-eyebrow">CONCERNS WE ANSWER</p>
            <h2 className="lumora-display mt-3 text-balance text-[1.5rem] leading-[1.55] sm:text-[2rem]">
              こんな悩みは、ありませんか。
            </h2>
            <div className="lumora-rule" />
          </div>
          <ul className="mt-8 grid gap-4 sm:gap-5 lg:grid-cols-3">
            {problems.map((problem, idx) => {
              const cardClass =
                "group relative flex h-full flex-col bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-40px_rgba(15,23,42,0.45)] sm:p-6";
              const cardStyle = {
                border: "1px solid var(--line)",
                borderTop: "3px solid var(--accent-deep)",
                borderRadius: "4px",
              };
              const inner = (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-[0.78rem] font-bold tracking-[0.16em] text-[var(--accent-warm)]">
                      0{idx + 1}
                    </span>
                    <span className="rounded-sm bg-[#faf6ec] px-2 py-1 font-serif text-[0.7rem] font-bold tracking-[0.14em] text-[var(--accent-deep)]">
                      {problem.badge}
                    </span>
                  </div>
                  <p className="mt-4 font-serif text-[1.02rem] font-bold leading-[1.7] text-[var(--ink)] sm:text-[1.08rem]">
                    「{problem.pain}」
                  </p>
                  <p className="mt-3 border-t border-dotted border-[var(--line)] pt-3 text-[0.88rem] leading-[2] text-[var(--ink-soft)]">
                    {problem.answer}
                  </p>
                  <p className="mt-5 inline-flex items-center gap-1 font-serif text-[0.85rem] font-bold tracking-[0.06em] text-[var(--accent-deep)]">
                    {problem.external ? "物理専門塾サイトを開く" : "解決方法を見る"}
                    <span aria-hidden="true">{problem.external ? "↗" : "→"}</span>
                  </p>
                </>
              );

              return (
                <li key={problem.pain}>
                  {problem.external ? (
                    <a
                      className={cardClass}
                      href={problem.href}
                      rel="noreferrer noopener"
                      target="_blank"
                      style={cardStyle}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link className={cardClass} href={problem.href} style={cardStyle}>
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        {/* PATHS */}
        <section className="mt-16 sm:mt-24" id="paths">
          <div className="text-center">
            <p className="lumora-eyebrow">START HERE</p>
            <h2 className="lumora-display mt-3 text-balance text-[1.5rem] leading-[1.55] sm:text-[2rem]">
              3つの入口から、読みはじめる。
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[0.95rem] leading-[2] text-[var(--ink-soft)] sm:text-base">
              読者の目的に合わせて、最初の1記事を選べます。どこから読んでも、最後はひとつの学びの動線につながります。
            </p>
            <div className="lumora-rule" />
          </div>

          <ol className="mt-8 grid gap-5 sm:gap-6 lg:grid-cols-3">
            {visitorPaths.map((path) => {
              const cardClass = path.primary
                ? "group relative flex h-full flex-col overflow-hidden bg-white transition hover:-translate-y-1 hover:shadow-[0_30px_60px_-44px_rgba(15,23,42,0.5)]"
                : "group relative flex h-full flex-col overflow-hidden bg-white transition hover:-translate-y-1 hover:shadow-[0_30px_60px_-44px_rgba(15,23,42,0.45)]";
              const cardStyle = path.primary
                ? {
                    border: "2px solid var(--accent-deep)",
                    borderRadius: "4px",
                    boxShadow: "0 18px 50px -36px rgba(15,23,42,0.4)",
                  }
                : { border: "1px solid var(--line)", borderRadius: "4px" };

              const headerStyle = path.primary
                ? {
                    background:
                      "linear-gradient(135deg, #0f1c3a 0%, #1f3a6b 100%)",
                    borderBottom: "1px solid #1a2a4d",
                  }
                : {
                    background:
                      "linear-gradient(135deg, #f6f1e2 0%, #fbf9f4 100%)",
                    borderBottom: "1px solid var(--line)",
                  };

              const inner = (
                <>
                  <div
                    className="relative flex items-center justify-between overflow-hidden px-4 py-3 sm:px-5"
                    style={headerStyle}
                  >
                    <div>
                      {path.primary ? (
                        <p className="inline-flex items-center gap-1.5 font-serif text-[0.7rem] font-bold tracking-[0.22em] text-[#f5d68a]">
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-[var(--accent-warm)]"
                          />
                          OFFICIAL · 物理専門塾
                        </p>
                      ) : (
                        <p className="font-serif text-[0.74rem] font-bold tracking-[0.22em] text-[var(--accent-deep)]">
                          {path.label}
                        </p>
                      )}
                      <p
                        className={`mt-0.5 text-[0.7rem] ${path.primary ? "text-[#d6d3c8]" : "text-[var(--ink-soft)]"}`}
                      >
                        {path.badge}
                      </p>
                    </div>
                    <span
                      className={`font-serif text-[2.4rem] font-bold leading-none ${path.primary ? "text-[#f5d68a]" : "text-[var(--accent-warm)]"}`}
                      aria-hidden="true"
                    >
                      {path.no}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="font-serif text-[1.12rem] font-bold leading-[1.6] text-[var(--ink)] sm:text-[1.22rem]">
                      {path.title}
                    </h3>
                    <p className="mt-3 text-[0.9rem] leading-[2] text-[var(--ink-soft)]">
                      {path.description}
                    </p>
                    <ul className="mt-5 grid gap-2.5 border-t border-dotted border-[var(--line)] pt-4">
                      {path.benefits.map((benefit) => (
                        <li
                          className="flex gap-2 text-[0.86rem] leading-[1.85] text-[var(--ink)]"
                          key={benefit}
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[0.55em] h-[0.45em] w-[0.45em] shrink-0 rotate-45 bg-[var(--accent-deep)]"
                          />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    {path.primary ? (
                      <span className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-sm bg-[var(--accent-deep)] px-4 py-3 pt-3 font-serif text-[0.88rem] font-bold tracking-[0.06em] text-white transition group-hover:bg-[#16305c]">
                        {path.cta}
                        <span aria-hidden="true" className="text-[#f5d68a]">↗</span>
                      </span>
                    ) : (
                      <p className="mt-auto inline-flex items-center gap-1 pt-6 font-serif text-[0.88rem] font-bold tracking-[0.04em] text-[var(--accent-deep)]">
                        {path.cta} <span aria-hidden="true">→</span>
                      </p>
                    )}
                  </div>
                </>
              );

              return (
                <li key={path.title}>
                  {path.external ? (
                    <a
                      className={cardClass}
                      href={path.href}
                      rel="noreferrer noopener"
                      target="_blank"
                      style={cardStyle}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link className={cardClass} href={path.href} style={cardStyle}>
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </section>

        {/* TRUST PANEL */}
        <section
          className="relative mt-16 overflow-hidden sm:mt-24"
          style={{
            background:
              "linear-gradient(135deg, #fbf6e8 0%, #fbf9f4 60%, #ffffff 100%)",
            border: "1px solid var(--line)",
            borderRadius: "4px",
          }}
        >
          <div
            aria-hidden="true"
            className="lumora-grid-bg absolute inset-0 opacity-40"
          />
          <div className="relative grid gap-6 p-5 sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:p-12">
            <div>
              <p className="lumora-eyebrow">OUR STANDARD</p>
              <h2 className="lumora-display mt-3 text-balance text-[1.45rem] leading-[1.55] sm:text-[1.95rem]">
                図と表で速く読めて、<br />
                一次情報で確かめられる。
              </h2>
              <p className="mt-5 text-[0.95rem] leading-[2.05] text-[var(--ink-soft)] sm:text-[1rem]">
                抽象的な理念ではなく、現場ですぐ使える形へ落とし込むこと。教材設計、AIプロンプト、アプリの動線まで、現場で動くレベルで言語化することを大切にしています。
              </p>
            </div>
            <ol className="grid gap-4 sm:grid-cols-1">
              {trustPoints.map((point, idx) => (
                <li
                  className="flex gap-4 bg-white/85 p-4 backdrop-blur sm:p-5"
                  key={point.title}
                  style={{
                    border: "1px solid var(--line)",
                    borderRadius: "3px",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-sm bg-[var(--accent-deep)] font-serif text-[1.1rem] font-bold text-white"
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-serif text-[1.02rem] font-bold leading-[1.55] text-[var(--ink)] sm:text-[1.08rem]">
                      {point.title}
                    </h3>
                    <p className="mt-1.5 text-[0.88rem] leading-[1.95] text-[var(--ink-soft)]">
                      {point.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* PHYSICS SCHOOL BANNER */}
        <section
          className="relative mt-16 overflow-hidden sm:mt-24"
          style={{
            background:
              "radial-gradient(circle at 90% 10%, rgba(200,146,17,0.22), transparent 42%), linear-gradient(135deg, #0f1c3a 0%, #1f3a6b 65%, #2c4d80 100%)",
            border: "1px solid #1a2a4d",
            borderRadius: "4px",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[var(--accent-warm)] to-transparent"
          />
          <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-14">
            <div>
              <p className="inline-flex items-center gap-2 font-serif text-[0.74rem] font-bold tracking-[0.24em] text-[#f5d68a]">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--accent-warm)]" />
                LUMORA PHYSICS · 物理専門塾【公式サイト】
              </p>
              <h2 className="lumora-display mt-4 text-balance text-[1.55rem] leading-[1.5] text-white sm:text-[2.1rem] sm:leading-[1.45]">
                高校物理に特化した、<br className="hidden sm:block" />
                オンライン専門塾の公式サイトはこちら。
              </h2>
              <p className="mt-5 font-serif text-[0.95rem] leading-[2.05] text-[#d6d3c8] sm:text-[1rem]">
                yuta-eng.com（学習ハブ）から、物理専門塾「Lumora Physics」の公式サイトへ直接移動できます。受講相談・カリキュラム詳細・お申し込みは専門塾サイトから。
              </p>
              <ul className="mt-6 grid gap-2.5 border-t border-white/15 pt-5 sm:grid-cols-2">
                {[
                  "物理基礎・物理の通年指導",
                  "定期テスト／推薦・総合型対策",
                  "共通テスト・国公立二次対策",
                  "個別カリキュラムで前提に戻れる",
                ].map((item) => (
                  <li
                    className="flex gap-2 font-serif text-[0.86rem] leading-[1.85] text-[#e8e6dd]"
                    key={item}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.55em] h-[0.45em] w-[0.45em] shrink-0 rotate-45 bg-[var(--accent-warm)]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
                <a
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-[var(--accent-warm)] px-7 py-3 font-serif text-[0.95rem] font-bold tracking-[0.06em] text-[#1a1a1a] transition hover:-translate-y-0.5 hover:bg-[#dca424]"
                  href={siteConfig.physicsSchoolUrl}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  物理専門塾サイトを開く
                  <span aria-hidden="true">↗</span>
                </a>
                <Link
                  className="inline-flex min-h-12 items-center justify-center rounded-sm border border-white/35 bg-transparent px-6 py-3 font-serif text-[0.95rem] font-bold tracking-[0.06em] text-white transition hover:-translate-y-0.5 hover:border-white"
                  href="/blog/physics-material-creation"
                >
                  指導方針を読む（記事）
                </Link>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="relative hidden overflow-hidden rounded-sm border border-white/20 bg-white/[0.04] p-6 lg:block"
            >
              <p className="font-serif text-[0.7rem] font-bold tracking-[0.24em] text-[#f5d68a]">
                CURRICULUM SAMPLE
              </p>
              <ol className="mt-5 grid gap-4">
                {[
                  { step: "01", label: "現象を観察する", body: "実験動画／図／日常例で「何が変化しているか」を言語化" },
                  { step: "02", label: "図とグラフで読む", body: "傾き・面積・変化率の見方を、まず数式なしで定着" },
                  { step: "03", label: "式は最後に要約", body: "覚える対象ではなく、関係を短く書いた“まとめ”として導入" },
                ].map((s) => (
                  <li className="grid grid-cols-[2.4rem_1fr] gap-3" key={s.step}>
                    <span className="grid h-8 w-8 place-items-center rounded-sm bg-[var(--accent-warm)] font-serif text-[0.85rem] font-bold text-[#1a1a1a]">
                      {s.step}
                    </span>
                    <div>
                      <p className="font-serif text-[0.95rem] font-bold text-white">{s.label}</p>
                      <p className="mt-1 font-serif text-[0.78rem] leading-[1.85] text-[#cbc8bc]">
                        {s.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* LATEST */}
        <section className="mt-16 sm:mt-24">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--line)] pb-4">
            <div>
              <p className="lumora-eyebrow">LATEST ARTICLES</p>
              <h2 className="lumora-display mt-2 text-[1.4rem] leading-[1.45] sm:text-[1.85rem]">
                最新の記事
              </h2>
            </div>
            <ButtonLink className="hidden sm:inline-flex" href="/blog" variant="secondary">
              ブログ一覧へ →
            </ButtonLink>
          </div>
          <ul className="mt-6 grid gap-4 sm:gap-5 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  className="group block h-full bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-40px_rgba(15,23,42,0.45)] sm:p-6"
                  href={`/blog/${post.slug}`}
                  style={{
                    border: "1px solid var(--line)",
                    borderTop: "3px solid var(--accent-deep)",
                    borderRadius: "4px",
                  }}
                >
                  <div className="flex flex-wrap items-center gap-2 font-serif text-[0.72rem] font-bold tracking-[0.16em] text-[var(--ink-soft)]">
                    <span className="rounded-sm bg-[#faf6ec] px-2 py-1 text-[var(--accent-deep)]">
                      {post.category}
                    </span>
                    <time className="text-[var(--ink-soft)]" dateTime={post.date}>
                      {post.formattedDate}
                    </time>
                  </div>
                  <h3 className="mt-4 font-serif text-[1.05rem] font-bold leading-[1.65] text-[var(--ink)] transition group-hover:text-[var(--accent-deep)] sm:text-[1.15rem]">
                    {post.title}
                  </h3>
                  <p className="mt-3 border-t border-dotted border-[var(--line)] pt-3 text-[0.88rem] leading-[2] text-[var(--ink-soft)]">
                    {post.description}
                  </p>
                  <p className="mt-5 inline-flex items-center gap-1 font-serif text-[0.84rem] font-bold tracking-[0.04em] text-[var(--accent-deep)]">
                    続きを読む <span aria-hidden="true">→</span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-center sm:hidden">
            <ButtonLink href="/blog" variant="secondary">
              ブログ一覧へ →
            </ButtonLink>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16 sm:mt-24">
          <div className="text-center">
            <p className="lumora-eyebrow">FAQ</p>
            <h2 className="lumora-display mt-3 text-[1.5rem] leading-[1.55] sm:text-[2rem]">
              よくある質問
            </h2>
            <div className="lumora-rule" />
          </div>
          <ul className="mx-auto mt-6 grid max-w-3xl gap-3">
            {faqItems.map((item) => (
              <li
                className="bg-white p-4 sm:p-5"
                key={item.question}
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: "3px",
                }}
              >
                <p className="flex items-start gap-2.5 font-serif text-[0.98rem] font-bold leading-[1.65] text-[var(--ink)]">
                  <span
                    aria-hidden="true"
                    className="grid h-6 w-6 shrink-0 place-items-center rounded-sm bg-[var(--accent-deep)] font-serif text-[0.78rem] font-bold text-white"
                  >
                    Q
                  </span>
                  {item.question}
                </p>
                <p className="mt-3 flex items-start gap-2.5 border-t border-dotted border-[var(--line)] pt-3 text-[0.9rem] leading-[2] text-[var(--ink-soft)]">
                  <span
                    aria-hidden="true"
                    className="grid h-6 w-6 shrink-0 place-items-center rounded-sm bg-[var(--accent-warm)] font-serif text-[0.78rem] font-bold text-white"
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
        <section
          className="relative my-16 overflow-hidden sm:my-24"
          style={{
            background:
              "radial-gradient(circle at 92% 8%, rgba(200,146,17,0.18), transparent 40%), linear-gradient(135deg, #0f1c3a 0%, #1f3a6b 100%)",
            border: "1px solid #1a2a4d",
            borderRadius: "4px",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[var(--accent-warm)] to-transparent"
          />
          <div className="relative px-6 py-12 text-center sm:px-12 sm:py-16">
            <p className="font-serif text-[0.78rem] font-bold tracking-[0.28em] text-[#f5d68a]">
              YUTA-ENG.COM · LEARNING HUB
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl text-balance font-serif text-[1.65rem] font-bold leading-[1.55] text-white sm:text-[2.1rem] sm:leading-[1.45]">
              すべての入口を、ひとつのハブで。<br className="hidden sm:block" />
              次の一歩を、ここから選んでください。
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[0.93rem] leading-[2] text-[#d6d3c8] sm:text-[1rem]">
              yuta-eng.com は、物理専門塾「Lumora Physics」と、教材作成アプリ Eddivom、学習支援アプリへの公式入口を集約した学習ハブです。
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-2.5 sm:mt-9 sm:flex-row">
              <a
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-[var(--accent-warm)] px-7 py-3 font-serif text-[0.95rem] font-bold tracking-[0.06em] text-[#1a1a1a] transition hover:-translate-y-0.5 hover:bg-[#dca424]"
                href={siteConfig.physicsSchoolUrl}
                rel="noreferrer noopener"
                target="_blank"
              >
                物理専門塾サイトを開く
                <span aria-hidden="true">↗</span>
              </a>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-sm border border-white/35 bg-transparent px-7 py-3 font-serif text-[0.95rem] font-bold tracking-[0.06em] text-white transition hover:-translate-y-0.5 hover:border-white"
                href="/apps"
              >
                アプリ一覧を見る
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
