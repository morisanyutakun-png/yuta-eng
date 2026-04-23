import type { Metadata } from "next";

import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { focusAreas } from "@/data/focus-areas";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "About | 教育・物理・LaTeX教材制作のプロフィール",
  description:
    "教育ICT、物理教材制作、LaTeX教材作成、学習支援Webアプリ開発に取り組む Yuta のプロフィール、制作思想、専門領域、今後のビジョンを紹介します。",
  keywords: [
    "教育 プロフィール",
    "物理教材制作",
    "LaTeX教材作成",
    "学習支援Webアプリ開発",
    "教材制作 ポートフォリオ",
  ],
  path: "/about",
});

const skills = [
  "教材構成・学習導線設計",
  "物理学習コンテンツ制作",
  "LaTeX による教材・資料制作",
  "Next.js / TypeScript によるWebサイト設計",
  "学習支援Webアプリの企画・UI設計",
  "読みやすさを重視した情報設計とブログ運用",
];

const philosophy = [
  {
    title: "理解の順序を設計する",
    text: "学習者がどこで迷うかを先回りし、定義、例、演習、振り返りの順番を丁寧に整えます。",
  },
  {
    title: "教材を再利用可能な資産にする",
    text: "LaTeX や構造化された原稿管理を活かし、記事、問題、解説、Webコンテンツへ展開しやすい制作体制を重視します。",
  },
  {
    title: "Webアプリは学習の摩擦を減らすために作る",
    text: "アプリそのものを目的にせず、探す、解く、復習する、続けるといった学習行為を自然に支える道具として設計します。",
  },
];

export default function AboutPage() {
  return (
    <Container>
      <Section className="pb-12">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
              About
            </p>
            <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight tracking-[-0.08em] text-slate-950 sm:text-6xl">
              教育ICT・物理教材・LaTeX教材作成で、学びの体験を整える。
            </h1>
          </div>
          <p className="text-lg leading-9 text-slate-600">
            yuta-eng.com は、教育、物理、LaTeX、学習支援Webアプリを軸に、
            学習者が理解へ進みやすい環境を作るための公式サイトです。
            個人ブランドとしての信頼を蓄積しながら、ブログと既存アプリへの導線を育てていきます。
          </p>
        </div>
      </Section>

      <Section
        description="今後、出版実績、開発実績、制作物、登壇情報などを追加しやすいように、プロフィール情報をセクション化しています。"
        eyebrow="Profile"
        title="専門性の中心"
      >
        <div className="grid gap-5 md:grid-cols-3">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 md:col-span-2">
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">
              教育分野への関心
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              学習は、単に情報を読むだけでは前に進みにくいものです。
              どの順で理解するか、どこで練習するか、どのタイミングで復習に戻るか。
              そうした学びの構造を、教材とWeb体験の両面から設計することに関心があります。
            </p>
          </article>
          <article className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white">
            <h2 className="text-2xl font-semibold tracking-[-0.04em]">物理への関心</h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              物理を、公式暗記ではなく概念、現象、数式、演習のつながりとして捉え直すことを重視します。
            </p>
          </article>
        </div>
      </Section>

      <Section
        description="教材制作、組版、情報設計、Web実装を横断し、学習の入口から継続までを支えるためのスキルセットです。"
        eyebrow="Skills"
        title="扱う技術と制作領域"
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <div
              className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-700"
              key={skill}
            >
              {skill}
            </div>
          ))}
        </div>
      </Section>

      <Section
        description="トップページと同じ5領域を、今後の実績・記事・アプリ導線に接続できる形で整理しています。"
        eyebrow="Focus Areas"
        title="継続して深めるテーマ"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {focusAreas.map((area) => (
            <article className="rounded-[2rem] border border-slate-200 bg-white p-6" key={area.title}>
              <h2 className="text-xl font-semibold tracking-[-0.04em] text-slate-950">
                {area.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{area.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        description="制作物の見た目だけでなく、運用のしやすさ、再編集のしやすさ、学習者が使い続けられることを大切にします。"
        eyebrow="Philosophy"
        title="制作方針"
      >
        <div className="grid gap-5 md:grid-cols-3">
          {philosophy.map((item) => (
            <article className="rounded-[2rem] border border-slate-200 bg-white p-6" key={item.title}>
              <h2 className="text-xl font-semibold tracking-[-0.04em] text-slate-950">
                {item.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="pb-24">
        <div className="rounded-[2.5rem] border border-slate-200 bg-gradient-to-br from-white via-sky-50 to-amber-50 p-8 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
            Vision
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl font-semibold tracking-[-0.06em] text-slate-950">
            ブログ、教材、アプリが自然につながる学習基盤へ。
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
            今後は、ブログで蓄積した知見を教材制作や既存アプリの改善へ接続し、
            yuta-eng.com 全体を教育・物理・学習支援のハブとして育てていきます。
            実績や制作物が増えても、情報が散らばらず、読者が必要な場所へ進める構造を保ちます。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/blog">記事を読む</ButtonLink>
            <ButtonLink href="/apps" variant="secondary">
              アプリを見る
            </ButtonLink>
          </div>
        </div>
      </Section>
    </Container>
  );
}
