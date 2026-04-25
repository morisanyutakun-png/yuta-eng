import type { Metadata } from "next";

import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Lumora とは｜運営者プロフィールと制作思想",
  description:
    "Lumora（ルモラ）は、高校物理を理解で乗り越え、AI・LaTeX で教材作成をラクに続け、学習支援Webアプリを動線で設計する EdTech スタジオです。運営者と制作思想を紹介します。",
  keywords: [
    "Lumora",
    "EdTech プロフィール",
    "教材制作 ポートフォリオ",
    "AI教材制作",
    "学習支援Webアプリ開発",
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
    body: "ブログ・教材・学習アプリを分断せず、ひとつの学びの動線として運用する EdTech スタジオを運営中。",
  },
];

export default function AboutPage() {
  return (
    <Container className="px-4 sm:px-6">
      {/* HERO */}
      <header className="mx-auto mt-6 max-w-3xl text-center sm:mt-12">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-sky-700">
          About Lumora
        </p>
        <h1 className="mt-3 text-balance font-serif text-[1.85rem] font-bold leading-[1.42] tracking-[-0.02em] text-slate-950 sm:text-[2.4rem] sm:leading-[1.32]">
          高校物理 × 教材作成AI × EdTech を、<br className="hidden sm:block" />
          ひとつの動線でつなぐスタジオ。
        </h1>
        <p className="mt-4 text-pretty text-[0.95rem] leading-[1.95] text-slate-600 sm:text-[1.05rem] sm:leading-[2]">
          Lumora（ルモラ）は、{siteConfig.author}が運営する EdTech 学習スタジオです。物理を理解で乗り越えるための記事、AI と LaTeX で教材作成をラクに続けるためのワークフロー、学習支援Webアプリを動線で設計する考え方を、ひとつのサイトでまとめて発信しています。
        </p>
      </header>

      {/* PHILOSOPHY */}
      <section className="mt-10 sm:mt-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-sky-700">
            制作思想
          </p>
          <h2 className="mt-2 font-serif text-[1.5rem] font-bold leading-[1.42] tracking-[-0.02em] text-slate-950 sm:text-[1.9rem]">
            Lumora が大切にしている3つの軸
          </h2>
        </div>
        <ul className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-3">
          {philosophy.map((item) => (
            <li
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_55px_-50px_rgba(15,23,42,0.45)] sm:rounded-[1.4rem] sm:p-6"
              key={item.title}
            >
              <p className="font-mono text-[0.78rem] font-bold text-sky-800">
                {item.label}
              </p>
              <h3 className="mt-3 text-[1.05rem] font-bold leading-[1.5] tracking-[-0.01em] text-slate-950 sm:text-[1.15rem]">
                {item.title}
              </h3>
              <p className="mt-3 text-[0.9rem] leading-[1.85] text-slate-600">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* STORY */}
      <section className="mt-12 rounded-3xl bg-gradient-to-br from-sky-50 via-white to-amber-50 p-5 sm:mt-16 sm:rounded-[1.6rem] sm:p-8 lg:p-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-sky-700">
            Story
          </p>
          <h2 className="mt-2 font-serif text-[1.5rem] font-bold leading-[1.42] tracking-[-0.02em] text-slate-950 sm:text-[1.9rem]">
            Lumora が生まれた背景
          </h2>
          <ul className="mt-6 grid gap-3">
            {story.map((item) => (
              <li
                className="rounded-2xl border border-white/80 bg-white/90 p-4 shadow-[0_14px_40px_-36px_rgba(15,23,42,0.45)] sm:p-5"
                key={item.title}
              >
                <p className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.18em] text-amber-700">
                  {item.year}
                </p>
                <h3 className="mt-2 text-[1rem] font-bold tracking-[-0.01em] text-slate-950 sm:text-[1.05rem]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.9rem] leading-[1.85] text-slate-600">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SKILLS */}
      <section className="mt-12 sm:mt-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-sky-700">
            Skills
          </p>
          <h2 className="mt-2 font-serif text-[1.5rem] font-bold leading-[1.42] tracking-[-0.02em] text-slate-950 sm:text-[1.9rem]">
            扱う領域
          </h2>
        </div>
        <ul className="mx-auto mt-6 grid max-w-3xl gap-2.5 sm:mt-8 sm:grid-cols-2">
          {skills.map((skill) => (
            <li
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3.5 sm:p-4"
              key={skill.label}
            >
              <span className="grid h-7 shrink-0 place-items-center rounded-full bg-sky-100 px-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-sky-800">
                {skill.label}
              </span>
              <p className="text-[0.88rem] leading-[1.7] text-slate-700">
                {skill.text}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="my-12 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 to-sky-900 p-6 text-white sm:my-16 sm:rounded-[1.6rem] sm:p-10">
        <div className="mx-auto max-w-2xl sm:text-center">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-sky-300">
            Vision
          </p>
          <h2 className="mt-3 font-serif text-[1.5rem] font-bold leading-[1.42] tracking-[-0.02em] sm:text-[1.95rem]">
            ブログ・教材・アプリを<br className="hidden sm:block" />
            ひとつの学習動線へ。
          </h2>
          <p className="mt-4 text-[0.95rem] leading-[1.95] text-slate-300">
            Lumora はこれから、記事と教材とアプリの境界をさらに薄くしていきます。読む・解く・つなぐが地続きの学習体験を作り続けます。
          </p>
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
            <ButtonLink className="w-full sm:w-auto" href="/blog">
              ブログを読む
            </ButtonLink>
            <ButtonLink className="w-full sm:w-auto" href="/contact" variant="secondary">
              相談する
            </ButtonLink>
          </div>
        </div>
      </section>
    </Container>
  );
}
