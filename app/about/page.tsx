import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/container";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Lumora とは｜学習ハブの運営方針と事業構成",
  description:
    "Lumora（ルモラ）は、物理専門塾「物理の森」の運営、教材作成AIや学習支援アプリの紹介をひとつにまとめる学習ハブブランドです。運営者と各事業の関係、制作思想を紹介します。",
  keywords: [
    "Lumora",
    "学習ハブ",
    "物理の森",
    "EdTech プロフィール",
    "教材制作 ポートフォリオ",
  ],
  path: "/about",
});

const philosophy = [
  {
    label: "01",
    title: "理解の順序を設計する",
    text: "学習者がどこで止まりやすいかを先回りして、現象 → 図 → 式 → 演習の順番を丁寧に整える。公式の暗記より、変化を読む力を育てます。",
  },
  {
    label: "02",
    title: "教材を「使い捨て」にしない",
    text: "AI下書き・LaTeX整形・MDX展開を組み合わせ、教材を1回で終わらせず、毎年磨かれる資産として運用できる仕組みを作ります。",
  },
  {
    label: "03",
    title: "学習アプリは動線で設計する",
    text: "機能の足し算ではなく、学習者の迷いを減らす導線を中心に設計する。読む・解く・戻る・続けるが分断しないアプリを目指します。",
  },
];

const skills = [
  { label: "Education", text: "教材構成・学習導線設計・授業教材改善" },
  { label: "Physics", text: "高校物理・物理基礎の概念理解と演習設計" },
  { label: "LaTeX", text: "数式組版・問題集テンプレ・印刷教材の制作" },
  { label: "AI", text: "教材作成AIのプロンプト設計と編集ワークフロー" },
  { label: "Web", text: "Next.js / TypeScript / Tailwind CSS による Web 実装" },
  { label: "Content", text: "SEOを意識した教育コンテンツ運用とMDX執筆" },
];

const story = [
  {
    year: "Background",
    title: "高校物理を「理解」で乗り越えた経験から",
    body: "公式暗記で物理に苦しんだ経験から、現象・図・式が地続きで見える教え方を試行錯誤してきました。",
  },
  {
    year: "Approach",
    title: "AI と LaTeX で教材制作を再設計",
    body: "教材を毎回作り直す消耗をなくすため、生成AIとLaTeXを組み合わせた制作ワークフローを構築。",
  },
  {
    year: "Now",
    title: "Lumora として動線を一本にまとめる",
    body: "親ブランド Lumora の下に、物理専門塾「物理の森」を直営事業として置き、教材作成AIや学習アプリも公式入口で接続。すべてを一本の動線で運営しています。",
  },
];

export default function AboutPage() {
  return (
    <Container className="px-4 sm:px-6">
      {/* HERO */}
      <header className="mx-auto mt-8 max-w-3xl text-center sm:mt-14">
        <p className="lumora-kicker">ABOUT LUMORA</p>
        <h1 className="lumora-display mt-5 text-balance text-[1.7rem] leading-[1.55] sm:text-[2.4rem] sm:leading-[1.45]">
          Lumora は、学びと教育の<br className="hidden sm:block" />
          入口をまとめる<span className="lumora-marker">学習ハブブランド</span>。
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty font-serif text-[0.95rem] leading-[2.1] text-[var(--ink-soft)] sm:text-[1rem]">
          Lumora（ルモラ）は、{siteConfig.author}が運営する学習ハブブランドです。Lumora の中で、物理専門塾「物理の森」を直営事業として運営し、Eddivom や IT Pass といった教材作成・学習アプリの公式入口も集約しています。
        </p>
        <div className="lumora-rule" />
      </header>

      {/* BRAND STRUCTURE */}
      <section className="mt-10 sm:mt-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="lumora-eyebrow">BRAND STRUCTURE</p>
          <h2 className="lumora-display mt-3 text-[1.4rem] leading-[1.55] sm:text-[1.9rem]">
            Lumora と各事業の関係
          </h2>
        </div>
        <ul className="mx-auto mt-7 grid max-w-4xl gap-3 sm:grid-cols-3">
          <li className="rounded-sm border border-[var(--line)] bg-white p-5">
            <p className="font-serif text-[0.7rem] font-bold tracking-[0.2em] text-[var(--accent-deep)]">
              親ブランド
            </p>
            <p className="mt-2 font-serif text-[1.05rem] font-bold text-[var(--ink)]">
              Lumora
            </p>
            <p className="mt-1 text-[0.82rem] leading-[1.85] text-[var(--ink-soft)]">
              yuta-eng.com で運営する学習ハブブランド。記事と公式入口を集約。
            </p>
          </li>
          <li className="rounded-sm border-2 border-[var(--accent-deep)] bg-white p-5">
            <p className="font-serif text-[0.7rem] font-bold tracking-[0.2em] text-[var(--accent-warm)]">
              直営事業 / 物理専門塾
            </p>
            <p className="mt-2 font-serif text-[1.05rem] font-bold text-[var(--ink)]">
              物理の森
            </p>
            <p className="mt-1 text-[0.82rem] leading-[1.85] text-[var(--ink-soft)]">
              Lumora が運営する高校物理オンライン専門塾（physics.yuta-eng.com）。
            </p>
          </li>
          <li className="rounded-sm border border-[var(--line)] bg-white p-5">
            <p className="font-serif text-[0.7rem] font-bold tracking-[0.2em] text-[var(--accent-deep)]">
              提携・紹介
            </p>
            <p className="mt-2 font-serif text-[1.05rem] font-bold text-[var(--ink)]">
              Eddivom · IT Pass
            </p>
            <p className="mt-1 text-[0.82rem] leading-[1.85] text-[var(--ink-soft)]">
              Lumora が公式に紹介する教材作成・IT 学習の外部パートナー。
            </p>
          </li>
        </ul>
      </section>

      {/* PHILOSOPHY */}
      <section className="mt-10 sm:mt-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="lumora-eyebrow">PHILOSOPHY</p>
          <h2 className="lumora-display mt-3 text-[1.4rem] leading-[1.55] sm:text-[1.9rem]">
            Lumora が大切にしている3つの軸
          </h2>
        </div>
        <ul className="mt-8 grid gap-4 sm:gap-5 lg:grid-cols-3">
          {philosophy.map((item) => (
            <li
              className="bg-white p-5 sm:p-7"
              key={item.title}
              style={{
                border: "1px solid var(--line)",
                borderTop: "3px solid var(--accent-deep)",
                borderRadius: "4px",
                boxShadow: "0 14px 40px -36px rgba(15,23,42,0.4)",
              }}
            >
              <p className="font-serif text-[1.6rem] font-bold leading-none text-[var(--accent-warm)]">
                {item.label}
              </p>
              <h3 className="mt-4 font-serif text-[1.08rem] font-bold leading-[1.55] text-[var(--ink)] sm:text-[1.18rem]">
                {item.title}
              </h3>
              <p className="mt-3 border-t border-dotted border-[var(--line)] pt-3 text-[0.9rem] leading-[2] text-[var(--ink-soft)]">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* STORY */}
      <section
        className="mt-12 p-5 sm:mt-16 sm:p-10"
        style={{
          background:
            "linear-gradient(135deg, #fbf6e8 0%, #fbf9f4 60%, #ffffff 100%)",
          border: "1px solid var(--line)",
          borderRadius: "4px",
        }}
      >
        <div className="mx-auto max-w-3xl">
          <p className="lumora-eyebrow">STORY</p>
          <h2 className="lumora-display mt-3 text-[1.4rem] leading-[1.55] sm:text-[1.9rem]">
            Lumora が生まれた背景
          </h2>
          <ol className="mt-7 grid gap-4">
            {story.map((item, idx) => (
              <li
                className="grid grid-cols-[2.6rem_1fr] gap-4 bg-white p-5"
                key={item.title}
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: "3px",
                }}
              >
                <span
                  aria-hidden="true"
                  className="grid h-10 w-10 place-items-center rounded-sm bg-[var(--accent-deep)] font-serif text-[1rem] font-bold text-white"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-serif text-[0.78rem] font-bold tracking-[0.22em] text-[var(--accent-warm)]">
                    {item.year}
                  </p>
                  <h3 className="mt-1.5 font-serif text-[1.02rem] font-bold leading-[1.55] text-[var(--ink)] sm:text-[1.08rem]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.9rem] leading-[2] text-[var(--ink-soft)]">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SKILLS */}
      <section className="mt-12 sm:mt-16">
        <div className="mx-auto max-w-3xl">
          <p className="lumora-eyebrow">SKILLS</p>
          <h2 className="lumora-display mt-3 text-[1.4rem] leading-[1.55] sm:text-[1.9rem]">
            扱う領域
          </h2>
        </div>
        <ul className="mx-auto mt-7 grid max-w-3xl gap-2.5 sm:grid-cols-2">
          {skills.map((skill) => (
            <li
              className="flex items-start gap-3 bg-white p-4"
              key={skill.label}
              style={{
                border: "1px solid var(--line)",
                borderRadius: "3px",
              }}
            >
              <span className="grid h-7 shrink-0 place-items-center rounded-sm bg-[var(--accent-deep)] px-2.5 font-serif text-[0.7rem] font-bold uppercase tracking-[0.16em] text-white">
                {skill.label}
              </span>
              <p className="text-[0.9rem] leading-[1.85] text-[var(--ink)]">
                {skill.text}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section
        className="relative my-12 overflow-hidden p-8 text-white sm:my-16 sm:p-12"
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
        <div className="mx-auto max-w-2xl sm:text-center">
          <p className="font-serif text-[0.78rem] font-bold tracking-[0.28em] text-[#f5d68a]">
            VISION
          </p>
          <h2 className="mt-4 font-serif text-[1.5rem] font-bold leading-[1.5] sm:text-[1.95rem]">
            ブログ・教材・アプリを<br className="hidden sm:block" />
            ひとつの学習動線へ。
          </h2>
          <p className="mt-5 font-serif text-[0.95rem] leading-[2.05] text-[#d6d3c8]">
            Lumora はこれから、物理の森と記事・教材アプリの境界をさらに薄くしていきます。読む・解く・つなぐが地続きの学習体験を作り続けます。
          </p>
          <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-[var(--accent-warm)] px-7 py-3 font-serif text-[0.95rem] font-bold tracking-[0.06em] text-[#1a1a1a] transition hover:-translate-y-0.5 hover:bg-[#dca424]"
              href={siteConfig.physicsSchoolUrl}
              rel="noreferrer noopener"
              target="_blank"
            >
              物理の森（物理塾）を開く ↗
            </a>
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-sm border border-white/35 bg-transparent px-7 py-3 font-serif text-[0.95rem] font-bold tracking-[0.06em] text-white transition hover:-translate-y-0.5 hover:border-white"
              href="/contact"
            >
              相談する
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
}
