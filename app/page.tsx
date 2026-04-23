import type { Metadata } from "next";
import Link from "next/link";

import { AppCard } from "@/components/app-card";
import { ArticleCard } from "@/components/article-card";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { HeroMotion } from "@/components/hero-motion";
import { JsonLd } from "@/components/json-ld";
import { Section } from "@/components/section";
import { StaggerReveal } from "@/components/stagger-reveal";
import { apps } from "@/data/apps";
import { focusAreas } from "@/data/focus-areas";
import {
  designSystemNotes,
  homepageAnswers,
  visitorPaths,
} from "@/data/home";
import { seoClusters } from "@/data/seo";
import { siteConfig } from "@/data/site";
import { getLatestPosts } from "@/lib/blog";
import { createPageMetadata } from "@/lib/metadata";
import {
  createEducationalServiceJsonLd,
  createHomeFaqJsonLd,
  createHomePageJsonLd,
  createItemListJsonLd,
} from "@/lib/structured-data";

const heroKeywords = [
  "高校物理 塾",
  "高校物理 オンライン塾",
  "教材作成AI 自動",
  "生成AI 教材作成",
  "GIGAスクール",
  "EdTech",
  "学習支援Webアプリ",
];

const heroStats = [
  {
    value: "Physics",
    label: "高校物理を図・数式・演習で理解",
  },
  {
    value: "AI",
    label: "教材作成AIとLaTeXで制作を高速化",
  },
  {
    value: "Apps",
    label: "学習支援Webアプリへ自然に接続",
  },
];

const studioTiles = [
  {
    label: "Step 01",
    title: "つまずきを言語化",
    detail: "力学・物理基礎の苦手を小さな問いに分ける",
  },
  {
    label: "Step 02",
    title: "図解と数式へ変換",
    detail: "現象、自由物体図、式、単位を同じ画面で見る",
  },
  {
    label: "Step 03",
    title: "AI教材で復習",
    detail: "問題案、解説案、LaTeX化まで育てる",
  },
];

const psychologyCards = [
  {
    title: "安心して選べる",
    text: "入口を3つに絞り、訪問者が自分の目的をすぐ選べるようにします。",
  },
  {
    title: "小さく進める",
    text: "読む、理解する、演習する、アプリへ進む流れを段階化して負荷を下げます。",
  },
  {
    title: "戻れるから続く",
    text: "つまずいた前提知識へ戻れる導線を置き、自己効力感を保ちます。",
  },
];

const learningFlow = [
  {
    label: "Physics",
    title: "高校物理の理解から始める",
    description:
      "高校物理の塾を探す人が知りたいのは、公式の量ではなく、どこで理解できるかです。概念、図、数式、演習を同じ流れで整理します。",
  },
  {
    label: "AI Materials",
    title: "AI教材作成で学びを速く形にする",
    description:
      "教材作成AIを、下書き、問題案、解説案、LaTeX化、Web化へつなげます。自動化しつつ、学習者に伝わる順序へ編集します。",
  },
  {
    label: "EdTech Apps",
    title: "学習支援Webアプリへ接続する",
    description:
      "記事や教材だけで終わらせず、必要になったタイミングで Eddivom、IT Pass、Physics へ進める導線を設計します。",
  },
];

const actionCards = [
  {
    title: "高校物理でつまずいている",
    text: "力学・物理基礎・問題演習の考え方を、まずは記事から整理できます。",
    href: "/blog/physics-material-creation",
    cta: "物理の入口へ",
  },
  {
    title: "教材作成をAIで効率化したい",
    text: "生成AI、LaTeX、Webを組み合わせた教材制作ワークフローへ進めます。",
    href: "/blog/latex-web-workflow",
    cta: "教材制作へ",
  },
  {
    title: "学習支援アプリを見たい",
    text: "EdTechやGIGAスクール文脈に合う既存アプリの入口を一覧で確認できます。",
    href: "/apps",
    cta: "アプリを見る",
  },
];

export const metadata: Metadata = createPageMetadata({
  title: "高校物理の塾・教材作成AI・EdTech学習支援 | Yuta Eng",
  description:
    "高校物理の塾を探す人、教材作成AIを自動化したい人、GIGAスクールや教育DXに合う学習支援Webアプリを知りたい人のためのEdTech学習スタジオです。",
  keywords: [
    "高校物理 塾",
    "高校物理 オンライン塾",
    "物理基礎 定期テスト対策",
    "教材作成AI 自動",
    "AI教材作成",
    "生成AI 教材作成",
    "GIGAスクール 教材作成",
    "EdTech 学習支援",
    "教育DX 学習支援Webアプリ",
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
      "yuta-eng.com が案内する既存学習支援アプリ",
      apps.map((app) => ({
        name: app.name,
        description: app.description,
        url: app.href,
      })),
    ),
    createItemListJsonLd(
      "yuta-eng.com の最新ブログ記事",
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
      <HeroMotion className="home-hero relative isolate overflow-hidden">
        <div className="ambient-grid absolute inset-0 -z-30" />
        <div className="home-aurora absolute inset-0 -z-20" />
        <div className="hero-glow absolute left-[8%] top-28 -z-10 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.42),rgba(56,189,248,0.16)_44%,transparent_70%)] blur-3xl" />
        <div className="motion-depth-2 absolute right-[-12rem] top-10 -z-10 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(253,186,116,0.38),rgba(250,204,21,0.12)_48%,transparent_70%)] blur-3xl" />

        <Container className="grid min-h-[calc(100vh-4rem)] items-center gap-14 py-16 lg:grid-cols-[0.94fr_1.06fr] lg:py-24">
          <div className="fade-up">
            <p className="liquid-glass inline-flex rounded-full px-4 py-2 text-sm font-semibold text-slate-700">
              高校物理の塾 × AI教材作成 × EdTech学習支援
            </p>
            <h1 className="text-balance mt-7 max-w-5xl font-serif text-5xl font-semibold leading-[1.03] tracking-[-0.095em] text-slate-950 sm:text-6xl lg:text-7xl">
              高校物理を、わかるまで導く。AI教材と学習アプリで育つ明るい学習スタジオ。
            </h1>
            <p className="text-pretty mt-7 max-w-2xl text-lg leading-9 text-slate-600">
              Yuta Eng は、高校物理の理解、教材作成AIの自動化、
              LaTeX教材、GIGAスクール時代の学習支援Webアプリをつなぐ
              EdTechハブです。検索で来た人が、次に何をすればよいかまで
              迷わず進めるホームにしています。
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {heroKeywords.map((keyword) => (
                <span className="keyword-pill" key={keyword}>
                  {keyword}
                </span>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/blog/physics-material-creation">
                高校物理の入口へ
              </ButtonLink>
              <ButtonLink href="/blog/latex-web-workflow" variant="secondary">
                AI教材制作を見る
              </ButtonLink>
              <ButtonLink href="/apps" variant="secondary">
                学習アプリを見る
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                相談する
              </ButtonLink>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {heroStats.map((item) => (
                <div className="liquid-glass rounded-[1.4rem] p-4" key={item.value}>
                  <p className="font-mono text-sm font-semibold text-sky-700">
                    {item.value}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-up fade-up-delay-2 relative">
            <div className="motion-depth-1 relative">
              <div className="float-slow liquid-glass absolute -left-4 top-10 hidden rounded-[1.7rem] p-4 shadow-[0_25px_80px_-55px_rgba(14,165,233,0.75)] md:block">
                <p className="font-mono text-xs text-slate-500">search intent</p>
                <p className="mt-1 text-sm font-semibold text-slate-950">
                  高校物理 塾
                </p>
              </div>
              <div className="studio-device rounded-[3.2rem] p-3 shadow-[0_45px_140px_-78px_rgba(15,23,42,0.72)]">
                <div className="rounded-[2.75rem] bg-white p-4">
                  <div className="studio-screen relative overflow-hidden rounded-[2.35rem] p-6">
                    <div className="relative flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
                          Learning Studio
                        </p>
                        <p className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-slate-950">
                          Physics OS
                        </p>
                      </div>
                      <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-800">
                        clear path
                      </span>
                    </div>

                    <div className="relative mt-8 grid gap-3">
                      {studioTiles.map((tile, index) => (
                        <div
                          className="studio-tile grid gap-4 rounded-[1.65rem] p-4 sm:grid-cols-[auto_1fr]"
                          key={tile.title}
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 font-mono text-sm font-semibold text-white">
                            0{index + 1}
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                              {tile.label}
                            </p>
                            <p className="mt-1 text-lg font-semibold tracking-[-0.04em] text-slate-950">
                              {tile.title}
                            </p>
                            <p className="mt-2 text-xs leading-5 text-slate-600">
                              {tile.detail}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="relative mt-4 grid gap-3 sm:grid-cols-3">
                      {apps.map((app) => (
                        <a
                          className="app-dock-card rounded-[1.35rem] p-4 transition hover:-translate-y-1"
                          href={app.href}
                          key={app.href}
                          rel="noreferrer noopener"
                          target="_blank"
                        >
                          <p className="font-semibold text-slate-950">{app.name}</p>
                          <p className="mt-3 text-xs leading-5 text-slate-500">
                            {app.category}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </HeroMotion>

      <Container>
        <Section
          description="検索で来る人の目的を3つに分けました。高校生、先生、教材制作者、EdTech関係者が自分の入口をすぐ選べる構成です。"
          eyebrow="Search Intent"
          title="SEOキーワードを、迷わない入口に変える"
        >
          <StaggerReveal className="grid gap-5 lg:grid-cols-3">
            {visitorPaths.map((path) => (
              <Link
                className="intent-lens-card group relative flex min-h-80 flex-col overflow-hidden rounded-[2.6rem] p-6 transition hover:-translate-y-1"
                href={path.href}
                key={path.title}
              >
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                    {path.label}
                  </p>
                  <h2 className="text-balance mt-5 text-3xl font-semibold tracking-[-0.06em] text-slate-950">
                    {path.title}
                  </h2>
                  <p className="mt-5 rounded-2xl bg-white/70 p-4 text-sm leading-7 text-slate-600 shadow-sm backdrop-blur">
                    {path.query}
                  </p>
                </div>
                <div className="relative mt-auto pt-12">
                  <p className="text-sm leading-7 text-slate-600">
                    {path.description}
                  </p>
                  <p className="mt-6 text-sm font-semibold text-slate-950">
                    {path.cta} <span aria-hidden="true">→</span>
                  </p>
                </div>
              </Link>
            ))}
          </StaggerReveal>
        </Section>

        <Section
          description="すぐ読む、作る、使うの3アクションに分け、初回訪問でも次の行動が自然に決まるようにしています。"
          eyebrow="Action Design"
          title="心理的ハードルを下げる、最初の一歩"
        >
          <StaggerReveal className="grid gap-4 md:grid-cols-3">
            {actionCards.map((card) => (
              <Link
                className="action-card group rounded-[2.2rem] p-6 transition hover:-translate-y-1"
                href={card.href}
                key={card.title}
              >
                <h2 className="text-2xl font-semibold tracking-[-0.05em] text-slate-950">
                  {card.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{card.text}</p>
                <p className="mt-7 text-sm font-semibold text-slate-950">
                  {card.cta} <span aria-hidden="true">→</span>
                </p>
              </Link>
            ))}
          </StaggerReveal>
        </Section>

        <Section
          description="既存アプリを再実装せず、見つけやすいアプリ棚として並べます。高校物理、IT学習、教材導線を明るいプロダクト体験に接続します。"
          eyebrow="Apps Showcase"
          headerAction={
            <ButtonLink href="/apps" variant="secondary">
              アプリ一覧へ
            </ButtonLink>
          }
          title="学習支援Webアプリを、きれいに選べる入口へ"
        >
          <StaggerReveal className="grid gap-5 lg:grid-cols-3">
            {apps.map((app) => (
              <AppCard app={app} featured key={app.href} />
            ))}
          </StaggerReveal>
        </Section>

        <Section
          description="ロングテールSEOは、同じ言葉を詰め込むのではなく、検索意図ごとの答えと内部リンクを作ることが大切です。"
          eyebrow="SEO Topic Map"
          title="高校物理・教材作成AI・GIGAスクールを一貫したテーマへ"
        >
          <StaggerReveal className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {seoClusters.map((cluster) => (
              <Link
                className="seo-cluster-card group rounded-[2rem] p-6 transition hover:-translate-y-1"
                href={cluster.route}
                key={cluster.primary}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                  {cluster.label}
                </p>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-slate-950">
                  {cluster.primary}
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {cluster.intent}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {cluster.supporting.slice(0, 5).map((word) => (
                    <span className="keyword-pill compact" key={word}>
                      {word}
                    </span>
                  ))}
                </div>
                <div className="mt-5 border-t border-sky-100 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Long-tail
                  </p>
                  <ul className="mt-3 space-y-2 text-xs leading-5 text-slate-500">
                    {cluster.longTail.map((word) => (
                      <li key={word}>{word}</li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </StaggerReveal>
        </Section>

        <Section
          description="見た目の装飾だけではなく、安心して選び、少しずつ進み、また戻れることをデザインの中心に置いています。"
          eyebrow="Learning Psychology"
          title="明るさ、余白、動きで「学べそう」を作る"
        >
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="canva-board relative overflow-hidden rounded-[3rem] border border-white/80 p-6 shadow-[0_35px_130px_-90px_rgba(15,23,42,0.72)]">
              <div className="grid gap-4 sm:grid-cols-2">
                {designSystemNotes.map((note, index) => (
                  <article
                    className="rounded-[2rem] border border-white/80 bg-white/80 p-5 backdrop-blur-xl"
                    key={note}
                  >
                    <p className="font-mono text-xs text-sky-700">
                      design / 0{index + 1}
                    </p>
                    <p className="mt-5 text-base font-semibold leading-7 tracking-[-0.03em] text-slate-950">
                      {note}
                    </p>
                  </article>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              {psychologyCards.map((card, index) => (
                <article
                  className="psychology-card rounded-[2rem] p-6"
                  key={card.title}
                >
                  <p className="font-mono text-xs font-semibold text-sky-700">
                    0{index + 1}
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-slate-950">
                    {card.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {card.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Section>

        <Section
          description="スクロールしながら、高校物理の記事、AI教材制作、学習支援アプリがどうつながるかを追える構成にしています。"
          eyebrow="Learning Flow"
          title="記事から教材、アプリまでを一本の流れにする"
        >
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="overflow-hidden rounded-[2.5rem] border border-white/15 bg-slate-950 p-7 text-white shadow-[0_30px_110px_-80px_rgba(15,23,42,0.95)]">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">
                  Dynamic Hub
                </p>
                <h2 className="text-balance mt-5 font-serif text-4xl font-semibold tracking-[-0.07em]">
                  読むほど、次に進む場所が見えてくる。
                </h2>
                <p className="mt-5 text-sm leading-7 text-slate-300">
                  ホームページを固定の名刺ではなく、記事、教材、アプリが育つ
                  学習ハブとして設計しています。
                </p>
                <div className="mt-8 grid grid-cols-3 gap-2">
                  {["Blog", "AI", "Apps"].map((item) => (
                    <div
                      className="rounded-2xl border border-white/10 bg-white/[0.08] p-3 text-center text-xs font-semibold text-slate-200"
                      key={item}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <StaggerReveal className="grid gap-4" step={120}>
              {learningFlow.map((item, index) => (
                <article
                  className="motion-step-card relative overflow-hidden rounded-[2.2rem] border border-slate-200 p-6 shadow-[0_22px_80px_-62px_rgba(15,23,42,0.75)] transition hover:-translate-y-1 hover:border-sky-200"
                  key={item.title}
                >
                  <div className="flex flex-wrap items-start justify-between gap-5">
                    <div>
                      <p className="font-mono text-sm font-semibold text-sky-700">
                        0{index + 1} / {item.label}
                      </p>
                      <h2 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-slate-950">
                        {item.title}
                      </h2>
                    </div>
                    <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                      step
                    </span>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </article>
              ))}
            </StaggerReveal>
          </div>
        </Section>

        <Section
          description="専門領域を5つに整理し、記事・教材・アプリへ展開しやすい情報設計にしています。"
          eyebrow="Focus Areas"
          title="何をしている人か、一瞬で伝わる構造"
        >
          <StaggerReveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {focusAreas.map((area, index) => (
              <article
                className="group rounded-[1.75rem] border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:bg-slate-950 hover:text-white"
                key={area.title}
              >
                <p className="font-mono text-xs text-sky-700 group-hover:text-sky-200">
                  0{index + 1}
                </p>
                <h2 className="mt-5 text-lg font-semibold tracking-[-0.04em]">
                  {area.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 transition group-hover:text-slate-300">
                  {area.description}
                </p>
              </article>
            ))}
          </StaggerReveal>
        </Section>

        <Section
          description="初めて来た人が最初に知りたいことを、短い回答としてホームにも置いています。FAQ構造化データとも対応させています。"
          eyebrow="Helpful Answers"
          title="よくある疑問に短く答える"
        >
          <StaggerReveal className="grid gap-4 md:grid-cols-2">
            {homepageAnswers.map((item) => (
              <article
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_22px_80px_-65px_rgba(15,23,42,0.6)]"
                key={item.question}
              >
                <h2 className="text-xl font-semibold tracking-[-0.04em] text-slate-950">
                  {item.question}
                </h2>
                <p className="mt-4 text-sm leading-8 text-slate-600">
                  {item.answer}
                </p>
              </article>
            ))}
          </StaggerReveal>
        </Section>

        <Section
          description="一覧で要点を判断しやすく、詳細ページでは読み始める前に得られることを整理します。"
          eyebrow="Latest Articles"
          headerAction={
            <ButtonLink href="/blog" variant="secondary">
              Blog一覧へ
            </ButtonLink>
          }
          title="最近の記事"
        >
          <StaggerReveal className="grid gap-5 md:grid-cols-3">
            {latestPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </StaggerReveal>
        </Section>

        <Section className="pb-24">
          <div className="final-cta overflow-hidden rounded-[2.9rem] p-1 shadow-[0_30px_110px_-80px_rgba(15,23,42,0.75)]">
            <div className="grid gap-0 rounded-[2.65rem] bg-white/[0.86] backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative overflow-hidden rounded-[2.65rem] bg-[radial-gradient(circle_at_20%_20%,rgba(125,211,252,0.42),transparent_35%),linear-gradient(145deg,#0f172a,#0f766e)] p-8 text-white sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-100">
                  Start Here
                </p>
                <h2 className="text-balance mt-4 font-serif text-4xl font-semibold tracking-[-0.06em]">
                  高校物理、AI教材、学習アプリをひとつの学習体験へ。
                </h2>
              </div>
              <div className="p-8 sm:p-10">
                <p className="text-pretty text-base leading-8 text-slate-600">
                  物理やITの学習で大切なのは、正しい情報だけでなく、
                  どの順序で理解し、どこで手を動かし、どう復習に戻れるかです。
                  Yuta Eng では、教材制作とWebアプリ開発の両面から、
                  学習者が迷いにくい環境づくりを進めます。
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <ButtonLink href="/about">制作思想を読む</ButtonLink>
                  <ButtonLink href="/contact" variant="secondary">
                    相談する
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </>
  );
}
