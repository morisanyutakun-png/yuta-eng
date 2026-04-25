import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/container";
import { apps } from "@/data/apps";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "高校物理塾・教材作成AI・IT学習アプリの公式サービス一覧 - Solvora",
  description:
    "高校物理オンライン専門塾「物理の森」、AI×LaTeXで教材を自動化する Eddivom、IT 基礎学習アプリ IT Pass を一覧で比較。Solvora が運営・公式紹介する各サービスの公式入口へ直接アクセスできます。",
  keywords: [
    "高校物理 塾",
    "高校物理 オンライン塾",
    "教材作成 AI",
    "Eddivom",
    "IT Pass",
    "理系 学習アプリ",
  ],
  path: "/apps",
});

export default function AppsPage() {
  const featuredApp = apps.find((a) => a.featured);
  const otherApps = apps.filter((a) => !a.featured);

  return (
    <>
      {/* HERO */}
      <section className="bg-white">
        <Container className="px-6">
          <div className="py-16 sm:py-20 lg:py-24">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
              Services · Solvora
            </p>
            <h1 className="mt-4 text-balance text-[2.05rem] font-extrabold leading-[1.22] tracking-[-0.01em] text-[#0b1d4a] sm:text-[2.7rem] sm:leading-[1.18] lg:text-[3.1rem]">
              高校物理の塾も、教材作成 AI も。
              <br className="hidden sm:block" />
              理系の学びを支える公式サービス。
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-[1rem] leading-[1.95] text-[#334155] sm:text-[1.08rem]">
              Solvora が運営する高校物理専門オンライン塾「物理の森」と、提携・紹介する教材作成 AI Eddivom、IT 学習アプリ IT Pass。受験生・教員・社会人それぞれに合った入口を、ここから直接ひらけます。
            </p>
          </div>
        </Container>
      </section>

      {/* FEATURED: Physics School */}
      {featuredApp ? (
        <section className="bg-[#f8fafc]">
          <Container className="px-6 py-16 sm:py-20">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
              Featured · 直営事業
            </p>
            <div
              className="mt-6 grid items-center gap-10 overflow-hidden rounded-[28px] p-8 ring-1 ring-[rgba(15,29,74,0.08)] sm:p-12 lg:grid-cols-[1fr_1fr] lg:gap-14"
              style={{
                background:
                  "radial-gradient(circle at 95% 10%, rgba(56,189,248,0.22), transparent 50%), linear-gradient(135deg, #0b1d4a 0%, #1e3a8a 100%)",
                color: "#ffffff",
              }}
            >
              <div>
                <p className="text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-[#bae6fd]">
                  {featuredApp.category} · {featuredApp.status}
                </p>
                <h2 className="mt-4 text-balance text-[2rem] font-extrabold leading-[1.2] tracking-[-0.005em] sm:text-[2.6rem]">
                  {featuredApp.name}
                </h2>
                <p className="mt-4 text-[1rem] leading-[1.85] text-white/85 sm:text-[1.05rem]">
                  {featuredApp.comparison}
                </p>
                <p className="mt-5 text-[0.92rem] leading-[1.95] text-white/75">
                  {featuredApp.description}
                </p>
                <a
                  href={featuredApp.href}
                  rel="noreferrer noopener"
                  target="_blank"
                  className="mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-[0.95rem] font-semibold tracking-[0.02em] text-[#0b1d4a] transition hover:-translate-y-0.5 hover:bg-[#bae6fd]"
                >
                  {featuredApp.ctaLabel}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className="rounded-[22px] bg-white/10 p-6 ring-1 ring-white/15 backdrop-blur-sm sm:p-7">
                <p className="text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-[#bae6fd]">
                  向いている人
                </p>
                <p className="mt-3 text-[0.95rem] leading-[1.85] text-white">
                  {featuredApp.audience}
                </p>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* OTHER SERVICES */}
      <section className="bg-white">
        <Container className="px-6 py-20 sm:py-24">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
                Partner Services
              </p>
              <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.2rem]">
                公式紹介する学習アプリ
              </h2>
            </div>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {otherApps.map((app) => (
              <li key={app.name}>
                <a
                  href={app.href}
                  rel="noreferrer noopener"
                  target="_blank"
                  className="group flex h-full flex-col rounded-[22px] bg-white p-7 ring-1 ring-[rgba(15,29,74,0.06)] transition hover:-translate-y-1 hover:shadow-[0_28px_50px_-32px_rgba(15,29,74,0.4)] sm:p-8"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[#1d4ed8]">
                      {app.category}
                    </p>
                    <span className="rounded-full bg-[#f1f5f9] px-3 py-1 text-[0.72rem] font-semibold text-[#475569]">
                      {app.status}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[1.6rem] font-extrabold tracking-[-0.005em] text-[#0b1d4a] transition group-hover:text-[#1d4ed8]">
                    {app.name}
                  </h3>
                  <p className="mt-3 text-[0.96rem] font-semibold leading-[1.7] text-[#0b1d4a]">
                    {app.comparison}
                  </p>
                  <p className="mt-3 text-[0.9rem] leading-[1.95] text-[#475569]">
                    {app.description}
                  </p>
                  <div className="mt-5 rounded-[14px] bg-[#f8fafc] p-4 ring-1 ring-[rgba(15,29,74,0.06)]">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#1d4ed8]">
                      向いている人
                    </p>
                    <p className="mt-2 text-[0.88rem] leading-[1.85] text-[#334155]">
                      {app.audience}
                    </p>
                  </div>
                  <span className="mt-auto pt-6 text-[0.95rem] font-semibold text-[#1d4ed8] transition group-hover:text-[#0b1d4a]">
                    {app.ctaLabel} <span aria-hidden="true">↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* BRAND STRUCTURE */}
      <section className="bg-[#f8fafc]">
        <Container className="px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
              Brand Structure
            </p>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.2rem]">
              Solvora と各事業の関係
            </h2>
            <p className="mt-4 text-[0.95rem] leading-[1.95] text-[#475569]">
              Solvora は学習ハブの親ブランド。物理の森は Solvora が運営する直営の物理専門塾、Eddivom と IT Pass は提携・紹介する公式パートナーアプリです。
            </p>
          </div>
          <ul className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-3">
            <li className="rounded-[22px] bg-white p-6 ring-1 ring-[rgba(15,29,74,0.06)]">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#1d4ed8]">
                親ブランド
              </p>
              <p className="mt-3 text-[1.15rem] font-extrabold text-[#0b1d4a]">
                Solvora
              </p>
              <p className="mt-2 text-[0.85rem] leading-[1.85] text-[#475569]">
                yuta-eng.com で運営する学習ハブ。記事と各サービスの公式入口を集約します。
              </p>
            </li>
            <li className="rounded-[22px] bg-[#0b1d4a] p-6 text-white">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#bae6fd]">
                直営 / 物理専門塾
              </p>
              <p className="mt-3 text-[1.15rem] font-extrabold">物理の森</p>
              <p className="mt-2 text-[0.85rem] leading-[1.85] text-white/80">
                Solvora が運営する高校物理オンライン専門塾。
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
                教材作成 AI と IT 学習の公式パートナーアプリ。
              </p>
            </li>
          </ul>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0b1d4a] px-7 text-[0.95rem] font-semibold tracking-[0.02em] text-white transition hover:bg-[#1e3a8a]"
              href={siteConfig.physicsSchoolUrl}
              rel="noreferrer noopener"
              target="_blank"
            >
              物理の森を開く <span aria-hidden="true">↗</span>
            </a>
            <Link
              href="/blog"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#0b1d4a] px-7 text-[0.95rem] font-semibold tracking-[0.02em] text-[#0b1d4a] transition hover:bg-[#0b1d4a] hover:text-white"
            >
              ブログを読む
            </Link>
            <Link
              href="/about"
              className="inline-flex min-h-12 items-center justify-center rounded-full px-4 text-[0.95rem] font-semibold text-[#1d4ed8] transition hover:text-[#0b1d4a]"
            >
              Solvora について <span aria-hidden="true" className="ml-1">→</span>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
