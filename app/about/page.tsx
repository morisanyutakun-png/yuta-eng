import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";
import { createBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "理系学習ハブ Solvora の運営方針と事業構成、運営者プロフィール",
  description:
    "高校物理オンライン専門塾「物理の森」、AI×LaTeX教材作成、学習支援アプリをまとめる理系学習ハブ Solvora（ソルヴォラ）の運営方針、事業構成、運営者 森 祐太のプロフィールと制作思想を紹介します。",
  keywords: [
    "Solvora とは",
    "理系 学習ハブ",
    "物理の森 運営",
    "EdTech 運営者",
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
  { label: "Education", text: "教材構成、学習導線設計、授業教材改善" },
  { label: "Physics", text: "高校物理、物理基礎の概念理解と演習設計" },
  { label: "LaTeX", text: "数式組版、問題集テンプレ、印刷教材の制作" },
  { label: "AI", text: "教材作成 AI のプロンプト設計と編集ワークフロー" },
  { label: "Web", text: "Next.js / TypeScript / Tailwind CSS による Web 実装" },
  { label: "Content", text: "SEO を意識した教育コンテンツ運用と MDX 執筆" },
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
    body: "教材を毎回作り直す消耗をなくすため、生成 AI と LaTeX を組み合わせた制作ワークフローを構築。",
  },
  {
    year: "Now",
    title: "Solvora として動線を一本にまとめる",
    body: "親ブランド Solvora の下に、物理専門塾「物理の森」を直営事業として置き、教材作成 AI や学習アプリも公式入口で接続。すべてを一本の動線で運営しています。",
  },
];

export default function AboutPage() {
  const breadcrumb = createBreadcrumbJsonLd([
    { name: "ホーム", path: "/" },
    { name: "About", path: "/about" },
  ]);
  return (
    <>
      <JsonLd data={breadcrumb} />
      {/* HERO */}
      <section className="bg-white">
        <Container className="px-5 sm:px-6">
          <nav aria-label="パンくずリスト" className="pt-7 text-[0.78rem] text-[#94a3b8] sm:pt-9">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link className="transition hover:text-[#1d4ed8]" href="/">
                  ホーム
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#cbd5e1]">/</li>
              <li className="text-[#475569]">About</li>
            </ol>
          </nav>
          <div className="py-10 sm:py-16 lg:py-20">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
              About · Solvora
            </p>
            <h1 className="mt-4 text-balance text-[2.05rem] font-extrabold leading-[1.22] tracking-[-0.01em] text-[#0b1d4a] sm:text-[2.7rem] sm:leading-[1.18] lg:text-[3.1rem]">
              理系の学びと教育の入口を、
              <br className="hidden sm:block" />
              ひとつの学習ハブに。
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-[1rem] leading-[1.95] text-[#334155] sm:text-[1.08rem]">
              Solvora（ソルヴォラ）は、{siteConfig.author}が運営する理系学習ハブブランドです。物理専門オンライン塾「物理の森」を直営し、Eddivom や IT Pass といった教材作成・学習アプリの公式入口も集約しています。
            </p>
          </div>
        </Container>
      </section>

      {/* BRAND STRUCTURE */}
      <section className="bg-[#f8fafc]">
        <Container className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
              Brand Structure
            </p>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.2rem]">
              Solvora と各事業の関係
            </h2>
          </div>
          <ul className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-3">
            <li className="rounded-[22px] bg-white p-6 ring-1 ring-[rgba(15,29,74,0.06)]">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#1d4ed8]">
                親ブランド
              </p>
              <p className="mt-3 text-[1.15rem] font-extrabold text-[#0b1d4a]">Solvora</p>
              <p className="mt-2 text-[0.85rem] leading-[1.85] text-[#475569]">
                yuta-eng.com で運営する学習ハブブランド。記事と公式入口を集約。
              </p>
            </li>
            <li className="rounded-[22px] bg-[#0b1d4a] p-6 text-white">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#bae6fd]">
                直営 / 物理専門塾
              </p>
              <p className="mt-3 text-[1.15rem] font-extrabold">物理の森</p>
              <p className="mt-2 text-[0.85rem] leading-[1.85] text-white/80">
                Solvora が運営する高校物理オンライン専門塾（physics.yuta-eng.com）。
              </p>
            </li>
            <li className="rounded-[22px] bg-white p-6 ring-1 ring-[rgba(15,29,74,0.06)]">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#1d4ed8]">
                提携・紹介
              </p>
              <p className="mt-3 text-[1.15rem] font-extrabold text-[#0b1d4a]">
                Eddivom · IT Pass
              </p>
              <p className="mt-2 text-[0.85rem] leading-[1.85] text-[#475569]">
                Solvora が公式に紹介する教材作成 AI と IT 学習アプリ。
              </p>
            </li>
          </ul>
        </Container>
      </section>

      {/* PHILOSOPHY */}
      <section className="bg-white">
        <Container className="px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
              Philosophy
            </p>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.2rem]">
              Solvora が大切にしている 3 つの軸
            </h2>
          </div>
          <ul className="mt-10 grid gap-5 lg:grid-cols-3">
            {philosophy.map((item) => (
              <li
                key={item.title}
                className="rounded-[22px] bg-white p-7 ring-1 ring-[rgba(15,29,74,0.06)] transition hover:-translate-y-1 hover:shadow-[0_28px_50px_-32px_rgba(15,29,74,0.4)]"
              >
                <p className="text-[1.6rem] font-extrabold leading-none text-[#1d4ed8]">
                  {item.label}
                </p>
                <h3 className="mt-4 text-[1.1rem] font-extrabold leading-[1.5] tracking-[-0.005em] text-[#0b1d4a]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-[1.95] text-[#475569]">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* STORY */}
      <section className="bg-[#f8fafc]">
        <Container className="px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
              Story
            </p>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.2rem]">
              Solvora が生まれた背景
            </h2>
          </div>
          <ol className="mx-auto mt-10 grid max-w-3xl gap-4">
            {story.map((item, idx) => (
              <li
                key={item.title}
                className="grid grid-cols-[3rem_1fr] gap-5 rounded-[22px] bg-white p-6 ring-1 ring-[rgba(15,29,74,0.06)] sm:grid-cols-[3.4rem_1fr] sm:p-7"
              >
                <span
                  aria-hidden="true"
                  className="grid h-12 w-12 place-items-center rounded-full bg-[#0b1d4a] text-[1rem] font-extrabold text-white"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-[#1d4ed8]">
                    {item.year}
                  </p>
                  <h3 className="mt-2 text-[1.05rem] font-extrabold leading-[1.5] tracking-[-0.005em] text-[#0b1d4a] sm:text-[1.15rem]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.92rem] leading-[1.95] text-[#475569]">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* SKILLS */}
      <section className="bg-white">
        <Container className="px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
              Skills
            </p>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.2rem]">
              扱う領域
            </h2>
          </div>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
            {skills.map((skill) => (
              <li
                key={skill.label}
                className="flex items-start gap-4 rounded-[18px] bg-[#f8fafc] p-5 ring-1 ring-[rgba(15,29,74,0.06)]"
              >
                <span className="grid h-7 shrink-0 place-items-center rounded-full bg-[#0b1d4a] px-3 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-white">
                  {skill.label}
                </span>
                <p className="text-[0.92rem] leading-[1.85] text-[#334155]">{skill.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* VISION CTA */}
      <section className="bg-[#f8fafc]">
        <Container className="px-6 pb-24 pt-4 sm:pb-32">
          <div
            className="mx-auto max-w-5xl overflow-hidden rounded-[28px] p-10 ring-1 ring-[rgba(15,29,74,0.08)] sm:p-14"
            style={{
              background:
                "radial-gradient(circle at 95% 10%, rgba(56,189,248,0.22), transparent 50%), linear-gradient(135deg, #0b1d4a 0%, #1e3a8a 100%)",
              color: "#ffffff",
            }}
          >
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.28em] text-[#bae6fd]">
                Vision
              </p>
              <h2 className="mt-4 text-balance text-[1.6rem] font-extrabold leading-[1.4] sm:text-[2rem]">
                ブログ・教材・アプリを、
                <br className="hidden sm:block" />
                ひとつの学習動線へ。
              </h2>
              <p className="mt-5 text-[0.95rem] leading-[1.95] text-white/85">
                Solvora はこれから、物理の森と記事・教材アプリの境界をさらに薄くしていきます。読む・解く・つなぐが地続きの学習体験を作り続けます。
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-[0.95rem] font-semibold tracking-[0.02em] text-[#0b1d4a] transition hover:-translate-y-0.5 hover:bg-[#bae6fd]"
                  href={siteConfig.physicsSchoolUrl}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  物理の森を開く <span aria-hidden="true">↗</span>
                </a>
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-7 text-[0.95rem] font-semibold tracking-[0.02em] text-white transition hover:bg-white hover:text-[#0b1d4a]"
                >
                  相談する
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
