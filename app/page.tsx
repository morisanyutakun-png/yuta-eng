import Link from "next/link";

import { AppCard } from "@/components/app-card";
import { ArticleCard } from "@/components/article-card";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { apps } from "@/data/apps";
import { focusAreas } from "@/data/focus-areas";
import { seoClusters } from "@/data/seo";
import { getLatestPosts } from "@/lib/blog";

const heroKeywords = ["教育ICT", "物理学習", "LaTeX教材", "学習支援Webアプリ"];

export default function Home() {
  const latestPosts = getLatestPosts(3);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#f7f7f2]">
        <div className="ambient-grid absolute inset-0 -z-20" />
        <div className="hero-glow absolute left-1/2 top-10 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.38),rgba(14,165,233,0.16)_38%,transparent_68%)] blur-3xl" />
        <div className="absolute right-[-18rem] top-24 -z-10 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.25),transparent_64%)] blur-3xl" />

        <Container className="grid min-h-[calc(100vh-4rem)] items-center gap-14 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-24">
          <div className="fade-up">
            <p className="inline-flex rounded-full border border-white/80 bg-white/75 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-xl">
              教材制作・物理学習・LaTeX・Webアプリの公式ハブ
            </p>
            <h1 className="text-balance mt-7 max-w-4xl font-serif text-5xl font-semibold leading-[1.04] tracking-[-0.09em] text-slate-950 sm:text-6xl lg:text-7xl">
              学びを、もっと探しやすく。もっと続けやすく。
            </h1>
            <p className="text-pretty mt-7 max-w-2xl text-lg leading-9 text-slate-600">
              yuta-eng.com は、教育ICT、物理教材、LaTeX組版、学習支援Webアプリを
              一つにつなぐブランドサイトです。記事で知見を蓄積し、既存アプリへ迷わず進める導線を作ります。
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
            <div className="float-slow absolute -left-5 top-12 hidden rounded-3xl border border-white/70 bg-white/75 p-4 shadow-[0_25px_80px_-55px_rgba(15,23,42,0.7)] backdrop-blur-xl md:block">
              <p className="font-mono text-xs text-slate-500">search intent</p>
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
                      <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em]">
                        Yuta Eng OS
                      </h2>
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
        </Container>
      </section>

      <Container>
        <Section
          className="fade-up fade-up-delay-1"
          description="既存アプリを再実装せず、Apple Storeの棚のように見つけやすく並べる。各カードは公式の外部導線として機能します。"
          eyebrow="Apps Showcase"
          headerAction={
            <ButtonLink href="/apps" variant="secondary">
              アプリ一覧へ
            </ButtonLink>
          }
          title="既存アプリを、きれいに選べる入口へ"
        >
          <div className="grid gap-5 lg:grid-cols-3">
            {apps.map((app) => (
              <AppCard app={app} featured key={app.href} />
            ))}
          </div>
        </Section>

        <Section
          description="検索されやすい語をただ並べるのではなく、読者の検索意図ごとに記事・About・Appsを接続します。"
          eyebrow="SEO Content System"
          title="SEOキーワードを、運用しやすい記事テーマに変換"
        >
          <div className="grid gap-4 lg:grid-cols-4">
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
              </Link>
            ))}
          </div>
        </Section>

        <Section
          description="専門領域を5つに整理し、記事・教材・アプリへ展開しやすい情報設計にしています。"
          eyebrow="Focus Areas"
          title="何をしている人か、一瞬で伝わる構造"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
          </div>
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
          <div className="grid gap-5 md:grid-cols-3">
            {latestPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
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
