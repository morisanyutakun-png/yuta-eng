import Link from "next/link";

import { AppCard } from "@/components/app-card";
import { ArticleCard } from "@/components/article-card";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { apps } from "@/data/apps";
import { focusAreas } from "@/data/focus-areas";
import { getLatestPosts } from "@/lib/blog";

export default function Home() {
  const latestPosts = getLatestPosts(3);

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,#dff7ff_0,#fbfaf7_36%,#fff7ed_100%)]">
        <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[linear-gradient(120deg,rgba(14,165,233,0.18),rgba(245,158,11,0.16),transparent)]" />
        <Container className="grid min-h-[calc(100vh-4rem)] items-center gap-12 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <div>
            <p className="inline-flex rounded-full border border-sky-200 bg-white/75 px-4 py-2 text-sm font-semibold text-sky-800 shadow-sm">
              yuta-eng.com official brand site
            </p>
            <h1 className="mt-7 max-w-4xl font-serif text-5xl font-semibold leading-[1.12] tracking-[-0.08em] text-slate-950 sm:text-6xl lg:text-7xl">
              教育、物理、LaTeX、Webアプリで学びの入口を設計する。
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-9 text-slate-600">
              yuta-eng.com は、教材制作と学習支援Webアプリ開発をつなぐ公式ハブです。
              ブログで知見を蓄積し、既存アプリへの導線を整理しながら、
              学びやすい環境づくりを発信します。
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/blog">Blogを見る</ButtonLink>
              <ButtonLink href="/about" variant="secondary">
                Aboutを見る
              </ButtonLink>
              <ButtonLink href="/apps" variant="secondary">
                Appsを見る
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                Contact
              </ButtonLink>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-white/50 blur-2xl" />
            <div className="rounded-[2.5rem] border border-white/80 bg-white/75 p-5 shadow-[0_30px_100px_-60px_rgba(15,23,42,0.8)] backdrop-blur">
              <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-200">
                  Site Architecture
                </p>
                <div className="mt-8 grid gap-3">
                  {[
                    ["Brand", "専門性と思想を伝える公式サイト"],
                    ["Blog", "SEOと知見蓄積の中心"],
                    ["Apps", "既存アプリへの公式導線"],
                    ["Contact", "相談と連絡の入口"],
                  ].map(([label, text]) => (
                    <div
                      className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                      key={label}
                    >
                      <p className="text-lg font-semibold">{label}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <Section
          description="Eddivom、IT Pass、Physics はすでに運用されている外部アプリです。このサイトではアプリ本体を再実装せず、公式ハブとして各サービスへ案内します。"
          eyebrow="Apps Highlight"
          headerAction={
            <ButtonLink href="/apps" variant="secondary">
              すべてのアプリを見る
            </ButtonLink>
          }
          title="既存アプリへの入口"
        >
          <div className="grid gap-5 md:grid-cols-3">
            {apps.map((app) => (
              <AppCard app={app} featured key={app.href} />
            ))}
          </div>
        </Section>

        <Section
          description="専門領域をばらばらに扱うのではなく、教材設計、理解支援、Web実装までを一つの学習体験として捉えます。"
          eyebrow="Focus Areas"
          title="学びの構造をつくる5つの軸"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {focusAreas.map((area) => (
              <article
                className="rounded-[1.75rem] border border-slate-200 bg-white p-5"
                key={area.title}
              >
                <h3 className="text-lg font-semibold tracking-[-0.04em] text-slate-950">
                  {area.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {area.description}
                </p>
              </article>
            ))}
          </div>
        </Section>

        <Section
          description="教育、物理、LaTeX、学習支援Web制作に関する考え方を、自サイトのブログとして継続的に蓄積します。"
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
          <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white">
            <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="bg-slate-950 p-8 text-white sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-200">
                  About Preview
                </p>
                <h2 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.06em]">
                  教材とプロダクトの間にある、学びやすさを形にする。
                </h2>
              </div>
              <div className="p-8 sm:p-10">
                <p className="text-base leading-8 text-slate-600">
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
