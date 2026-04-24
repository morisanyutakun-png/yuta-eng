import type { Metadata } from "next";

import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { focusAreas } from "@/data/focus-areas";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "About | 森祐太のプロフィールと制作思想",
  description:
    "森祐太のプロフィールページです。高校物理の学び直し、AI・LaTeX を活かした教材制作、学習支援Webアプリ導線の設計を横断する教育開発者としての制作思想と専門領域を紹介します。",
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

const identityPillars = [
  {
    title: "高校物理の理解設計",
    text: "現象、図、数式、演習を切り離さず、どこで止まるかを踏まえて学び直しの導線を作ります。",
  },
  {
    title: "AI・LaTeX を使った教材制作",
    text: "生成AIの下書きをそのまま出さず、LaTeX や Web で再利用できる教材資産として編集します。",
  },
  {
    title: "学習支援アプリへの接続",
    text: "記事や教材で理解した内容を、Eddivom、IT Pass、Physics のような実践の場へつなげます。",
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
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-[-0.08em] text-slate-950 sm:text-5xl lg:text-6xl">
              森祐太は、高校物理・教材制作・学習アプリを横断して学びの導線を設計する人です。
            </h1>
          </div>
          <p className="text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
            高校物理をどう理解し直せるか、AI と LaTeX を使った教材をどう育てるか、
            学習支援アプリをどう実践につなげるか。
            森祐太は、この3つを別々に扱わず、ひとつの学習体験として設計する教育開発者です。
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {["教育開発", "高校物理", "AI教材制作", "LaTeX", "Web Apps"].map((item) => (
            <span
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-[0_16px_45px_-38px_rgba(15,23,42,0.55)]"
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
      </Section>

      <Section
        description="サイト説明より一歩踏み込み、森祐太が何を担っているのかを3つの軸で整理しています。"
        eyebrow="Profile"
        title="森祐太が担っていること"
      >
        <div className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
          <article className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-[0_28px_90px_-72px_rgba(15,23,42,0.7)] sm:rounded-[2.3rem] sm:p-8">
            <h2 className="text-2xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-3xl">
              教材と Web の両方から、学習者が前に進みやすい構造を作る。
            </h2>
            <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base sm:leading-8">
              学習は、読むだけでは前に進みにくく、アプリだけでも続きにくいものです。
              どの順で理解するか、どこで練習するか、どのタイミングで復習へ戻るか。
              森祐太は、その順序を記事、教材、アプリ導線の3つから整えることを仕事の中心に置いています。
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "高校物理の学び直しを主力テーマに扱う",
                "AI と LaTeX を活かした教材制作を実践する",
                "Web アプリを学習の摩擦を減らす道具として設計する",
                "ブログとアプリを分断せず、ひとつの導線としてまとめる",
              ].map((item) => (
                <div
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
          </article>
          <div className="grid gap-4">
            {identityPillars.map((item) => (
              <article
                className="rounded-[1.7rem] border border-slate-200 bg-gradient-to-br from-white via-sky-50 to-amber-50 p-5 sm:rounded-[2rem] sm:p-6"
                key={item.title}
              >
                <h2 className="text-xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-2xl">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
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
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-700 sm:px-5 sm:py-4"
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
            <article className="rounded-[1.7rem] border border-slate-200 bg-white p-5 sm:rounded-[2rem] sm:p-6" key={area.title}>
              <h2 className="text-lg font-semibold tracking-[-0.04em] text-slate-950 sm:text-xl">
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
            <article className="rounded-[1.7rem] border border-slate-200 bg-white p-5 sm:rounded-[2rem] sm:p-6" key={item.title}>
              <h2 className="text-lg font-semibold tracking-[-0.04em] text-slate-950 sm:text-xl">
                {item.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="pb-24">
        <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-sky-50 to-amber-50 p-6 sm:rounded-[2.5rem] sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
            Vision
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-3xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-4xl">
            ブログ、教材、アプリが自然につながる学習基盤へ。
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            今後は、ブログで蓄積した知見を教材制作や既存アプリの改善へ接続し、
            yuta-eng.com 全体を教育・物理・学習支援のハブとして育てていきます。
            実績や制作物が増えても、情報が散らばらず、読者が必要な場所へ進める構造を保ちます。
          </p>
          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <ButtonLink className="w-full sm:w-auto" href="/blog">
              記事を読む
            </ButtonLink>
            <ButtonLink className="w-full sm:w-auto" href="/apps" variant="secondary">
              アプリを見る
            </ButtonLink>
          </div>
        </div>
      </Section>
    </Container>
  );
}
