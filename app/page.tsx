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
  createHomePageJsonLd,
  createItemListJsonLd,
} from "@/lib/structured-data";

const heroKeywords = ["教育ICT", "物理学習", "LaTeX教材", "学習支援Webアプリ"];

const learningFlow = [
  {
    label: "Article",
    title: "検索意図を記事に変える",
    description:
      "読者が探している言葉を、単なるキーワードではなく、理解しやすい記事テーマへ落とし込みます。",
  },
  {
    label: "Learning",
    title: "教材・図解・数式へ接続する",
    description:
      "物理やLaTeXの知見を記事だけで終わらせず、教材制作や演習設計に使える形へ整理します。",
  },
  {
    label: "Apps",
    title: "既存アプリへ自然に案内する",
    description:
      "必要になったタイミングで Eddivom、IT Pass、Physics へ移動できるよう、導線を邪魔にならない形で配置します。",
  },
];

export const metadata: Metadata = createPageMetadata({
  title: "物理教材・LaTeX教材作成・学習支援Webアプリ開発",
  description:
    "物理教材、LaTeX教材作成、教育ICT、学習支援Webアプリ開発をつなぐ yuta-eng.com の公式ハブです。ブログ、制作思想、既存アプリへの導線を整理しています。",
  keywords: [
    "物理教材制作",
    "LaTeX教材作成",
    "学習支援Webアプリ開発",
    "教育ICT",
    "教材制作Webサイト",
  ],
  path: "/",
});

export default function Home() {
  const latestPosts = getLatestPosts(3);
  const homeJsonLd = [
    createHomePageJsonLd(),
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
      <HeroMotion className="relative isolate overflow-hidden bg-[#f7f7f2]">
        <div className="ambient-grid absolute inset-0 -z-20" />
        <div className="hero-glow absolute left-1/2 top-10 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.38),rgba(14,165,233,0.16)_38%,transparent_68%)] blur-3xl" />
        <div className="motion-depth-2 absolute right-[-18rem] top-24 -z-10 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.25),transparent_64%)] blur-3xl" />

        <Container className="grid min-h-[calc(100vh-4rem)] items-center gap-14 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-24">
          <div className="fade-up">
            <p className="inline-flex rounded-full border border-white/80 bg-white/75 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-xl">
              教材制作・物理学習・LaTeX・Webアプリの公式ハブ
            </p>
            <h1 className="text-balance mt-7 max-w-4xl font-serif text-5xl font-semibold leading-[1.04] tracking-[-0.09em] text-slate-950 sm:text-6xl lg:text-7xl">
              物理教材・LaTeX教材作成・学習支援Webアプリ開発の公式ハブ。
            </h1>
            <p className="text-pretty mt-7 max-w-2xl text-lg leading-9 text-slate-600">
              yuta-eng.com は、教育ICT、物理学習、教材制作、LaTeX組版、
              学習支援Webアプリを一つにつなぐブランドサイトです。
              記事で知見を蓄積し、既存アプリへ迷わず進める導線を作ります。
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {heroKeywords.map((keyword) => (
                <span
                  className="rounded-full border border-white bg-white/70 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur"
                  key={keyword}
                >
                  {keyword}
                </span>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/blog">Blogを見る</ButtonLink>
              <ButtonLink href="/apps" variant="secondary">
                Appsを見る
              </ButtonLink>
              <ButtonLink href="/about" variant="secondary">
                Aboutを見る
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                Contact
              </ButtonLink>
            </div>
          </div>

          <div className="fade-up fade-up-delay-2 relative">
            <div className="motion-depth-1 relative">
              <div className="float-slow absolute -left-5 top-12 hidden rounded-3xl border border-white/70 bg-white/75 p-4 shadow-[0_25px_80px_-55px_rgba(15,23,42,0.7)] backdrop-blur-xl md:block">
                <p className="font-mono text-xs text-slate-500">
                  search intent
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-950">
                  学習支援Webアプリ
                </p>
              </div>
              <div className="rounded-[3rem] border border-white/80 bg-white/70 p-3 shadow-[0_45px_140px_-80px_rgba(15,23,42,0.9)] backdrop-blur-2xl">
                <div className="rounded-[2.55rem] bg-slate-950 p-4 text-white">
                  <div className="rounded-[2.1rem] border border-white/10 bg-[radial-gradient(circle_at_20%_10%,rgba(56,189,248,0.36),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(245,158,11,0.24),transparent_32%),linear-gradient(145deg,#0f172a,#111827_52%,#082f49)] p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-100">
                          Learning Hub
                        </p>
                        <p className="mt-2 text-2xl font-semibold tracking-[-0.05em]">
                          Yuta Eng OS
                        </p>
                      </div>
                      <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-100">
                        Live
                      </span>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                      {apps.map((app) => (
                        <a
                          className="group rounded-[1.4rem] border border-white/10 bg-white/[0.08] p-4 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.12]"
                          href={app.href}
                          key={app.href}
                          rel="noreferrer noopener"
                          target="_blank"
                        >
                          <p className="font-semibold">{app.name}</p>
                          <p className="mt-5 text-xs leading-5 text-slate-300">
                            {app.category}
                          </p>
                          <p className="mt-3 text-xs font-semibold text-sky-100">
                            Open <span aria-hidden="true">→</span>
                          </p>
                        </a>
                      ))}
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
                      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.08] p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
                          Content Pipeline
                        </p>
                        <div className="mt-5 flex items-center gap-2 text-sm text-slate-300">
                          <span className="h-2 flex-1 rounded-full bg-sky-300" />
                          <span className="h-2 flex-1 rounded-full bg-cyan-200" />
                          <span className="h-2 flex-1 rounded-full bg-amber-200" />
                        </div>
                      </div>
                      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.08] p-5">
                        <p className="font-mono text-3xl font-semibold">3</p>
                        <p className="mt-2 text-xs leading-5 text-slate-300">
                          初期記事をSEOクラスタに接続
                        </p>
                      </div>
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
          description="Canvaの編集ボードのように、目的ごとの入口を大きなカードで整理しました。検索して来た人が、自分に合う導線をすぐ選べる構成です。"
          eyebrow="Visitor Paths"
          title="探している目的から、最短で進める"
        >
          <StaggerReveal className="grid gap-5 lg:grid-cols-3">
            {visitorPaths.map((path) => (
              <Link
                className="group visual-path-card relative flex min-h-80 flex-col overflow-hidden rounded-[2.5rem] border border-white/80 p-6 shadow-[0_30px_110px_-80px_rgba(15,23,42,0.85)] transition hover:-translate-y-1"
                href={path.href}
                key={path.title}
              >
                <div className="absolute inset-x-6 top-6 h-28 rounded-[2rem] bg-slate-950/95" />
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-100">
                    {path.label}
                  </p>
                  <p className="mt-8 max-w-[13rem] text-sm leading-6 text-slate-300">
                    {path.query}
                  </p>
                </div>
                <div className="mt-auto pt-16">
                  <h3 className="text-3xl font-semibold tracking-[-0.06em] text-slate-950">
                    {path.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
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
          description="既存アプリを再実装せず、Apple Storeの棚のように見つけやすく並べる。各カードは公式の外部導線として機能します。"
          eyebrow="Apps Showcase"
          headerAction={
            <ButtonLink href="/apps" variant="secondary">
              アプリ一覧へ
            </ButtonLink>
          }
          title="既存アプリを、きれいに選べる入口へ"
        >
          <StaggerReveal className="grid gap-5 lg:grid-cols-3">
            {apps.map((app) => (
              <AppCard app={app} featured key={app.href} />
            ))}
          </StaggerReveal>
        </Section>

        <Section
          description="検索されやすい語をただ並べるのではなく、読者の検索意図ごとに記事・About・Appsを接続します。"
          eyebrow="SEO Content System"
          title="SEOキーワードを、運用しやすい記事テーマに変換"
        >
          <StaggerReveal className="grid gap-4 lg:grid-cols-4">
            {seoClusters.map((cluster) => (
              <Link
                className="group rounded-[2rem] border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_24px_80px_-55px_rgba(14,165,233,0.6)]"
                href={cluster.route}
                key={cluster.primary}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                  {cluster.label}
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-slate-950">
                  {cluster.primary}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {cluster.intent}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {cluster.supporting.slice(0, 3).map((word) => (
                    <span
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                      key={word}
                    >
                      {word}
                    </span>
                  ))}
                </div>
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    long-tail
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
          description="装飾ではなく、情報を速く理解するためのデザイン言語として整理しています。運用でカードや記事が増えても崩れにくい構造です。"
          eyebrow="Design System"
          title="Canva的な見つけやすさを、サイトの情報設計に変換"
        >
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="canva-board relative overflow-hidden rounded-[3rem] border border-slate-200 p-6 shadow-[0_35px_130px_-90px_rgba(15,23,42,0.9)]">
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
            <div className="rounded-[3rem] bg-slate-950 p-7 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">
                Visual SEO
              </p>
              <h3 className="text-balance mt-5 font-serif text-4xl font-semibold tracking-[-0.07em]">
                Googleにも、人にも、何のサイトかを迷わせない。
              </h3>
              <p className="mt-5 text-sm leading-8 text-slate-300">
                見出し、内部リンク、カードのラベル、構造化データを同じテーマに揃えています。
                教育ICT、物理教材、LaTeX教材作成、学習支援Webアプリという軸を、
                視覚とHTML構造の両方から伝えます。
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {heroKeywords.map((keyword) => (
                  <span
                    className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-xs font-semibold text-slate-200"
                    key={keyword}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section
          description="スクロールしながら、記事・教材・アプリがどうつながるかを視覚的に追える構成にしています。"
          eyebrow="Learning Flow"
          title="情報発信からアプリ導線までを、一本の流れにする"
        >
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-[0_30px_110px_-80px_rgba(15,23,42,0.95)]">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">
                  Dynamic Hub
                </p>
                <h3 className="text-balance mt-5 font-serif text-4xl font-semibold tracking-[-0.07em]">
                  読むほど、次に進む場所が見えてくる。
                </h3>
                <p className="mt-5 text-sm leading-7 text-slate-300">
                  このホームページは固定の名刺ではなく、記事、SEOクラスタ、
                  既存アプリの導線が増えるほど育つ情報ハブです。
                </p>
                <div className="mt-8 grid grid-cols-3 gap-2">
                  {["Blog", "Material", "Apps"].map((item) => (
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
                      <h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-slate-950">
                        {item.title}
                      </h3>
                    </div>
                    <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                      scroll step
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
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.04em]">
                  {area.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 transition group-hover:text-slate-300">
                  {area.description}
                </p>
              </article>
            ))}
          </StaggerReveal>
        </Section>

        <Section
          description="検索から来た人が最初に知りたいことを、短い回答としてホームにも置いています。詳しい解説はブログへ育てられる構成です。"
          eyebrow="Helpful Answers"
          title="検索意図に先回りして答える"
        >
          <StaggerReveal className="grid gap-4 md:grid-cols-2">
            {homepageAnswers.map((item) => (
              <article
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_22px_80px_-65px_rgba(15,23,42,0.6)]"
                key={item.question}
              >
                <h3 className="text-xl font-semibold tracking-[-0.04em] text-slate-950">
                  {item.question}
                </h3>
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
          <div className="overflow-hidden rounded-[2.75rem] border border-slate-200 bg-white shadow-[0_30px_110px_-80px_rgba(15,23,42,0.75)]">
            <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.32),transparent_35%),linear-gradient(145deg,#0f172a,#111827)] p-8 text-white sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-200">
                  About Preview
                </p>
                <h2 className="text-balance mt-4 font-serif text-4xl font-semibold tracking-[-0.06em]">
                  教材とプロダクトの間にある、学びやすさを形にする。
                </h2>
              </div>
              <div className="p-8 sm:p-10">
                <p className="text-pretty text-base leading-8 text-slate-600">
                  物理やITの学習で大切なのは、正しい情報だけでなく、
                  どの順序で理解し、どこで手を動かし、どう復習に戻れるかです。
                  yuta-eng.com では、教材制作とWebアプリ開発の両面から、
                  学習者が迷いにくい環境づくりを進めます。
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <ButtonLink href="/about">制作思想を読む</ButtonLink>
                  <Link
                    className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    href="/contact"
                  >
                    相談する <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </>
  );
}
