import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { apps } from "@/data/apps";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";
import {
  createBreadcrumbJsonLd,
  createEducationalOrganizationJsonLd,
  createFaqJsonLd,
  createItemListJsonLd,
  createSoftwareAppJsonLd,
} from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title:
    "物理専門塾オンライン・高校物理アプリ・LaTeX教材作成・ITパスポートアプリ - Solvora",
  description:
    "Solvora が運営する物理専門塾「物理の森」、高校物理アプリ「Physics」、LaTeX教材作成アプリ「Eddivom」、ITパスポート対策アプリ「IT Pass」を1ページで比較。受験生・教員・社会人それぞれに最適な公式入口へ直接アクセスできます。",
  keywords: [
    "物理専門塾 オンライン",
    "高校物理 アプリ",
    "LaTeX 教材作成",
    "ITパスポート アプリ",
    "高校物理 オンライン塾",
    "教材作成 AI",
    "物理 個別指導 オンライン",
  ],
  path: "/apps",
});

export default function AppsPage() {
  const featured = apps.find((a) => a.featured);
  const others = apps.filter((a) => !a.featured);
  const allFaq = apps.flatMap((a) =>
    a.faq.map((f) => ({
      question: f.question,
      answer: f.answer,
    })),
  );
  const breadcrumb = createBreadcrumbJsonLd([
    { name: "ホーム", path: "/" },
    { name: "サービス一覧", path: "/apps" },
  ]);
  const itemList = createItemListJsonLd(
    "Solvora の公式サービス一覧",
    apps.map((a) => ({
      name: `${a.name}（${a.primaryKeyword}）`,
      description: a.comparison,
      url: a.href,
    })),
  );
  const serviceJsonLd = apps.map((a) => {
    const input = {
      name: a.name,
      alternateName: a.alternateName,
      description: a.description,
      url: a.href,
      audience: a.schemaAudience,
    };
    return a.schemaType === "EducationalOrganization"
      ? createEducationalOrganizationJsonLd(input)
      : createSoftwareAppJsonLd(input);
  });
  const faqJsonLd = createFaqJsonLd(allFaq);

  return (
    <>
      <JsonLd data={[breadcrumb, itemList, ...serviceJsonLd, faqJsonLd]} />

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
              <li className="text-[#475569]">サービス一覧</li>
            </ol>
          </nav>

          <div className="py-10 sm:py-16 lg:py-20">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
              Services · Solvora
            </p>
            <h1 className="mt-4 text-balance text-[1.85rem] font-extrabold leading-[1.25] tracking-[-0.01em] text-[#0b1d4a] sm:text-[2.4rem] sm:leading-[1.2] lg:text-[2.9rem]">
              物理専門塾オンライン、高校物理アプリ、
              <br className="hidden sm:block" />
              LaTeX 教材作成、ITパスポート アプリ。
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-[0.98rem] leading-[1.95] text-[#334155] sm:mt-6 sm:text-[1.06rem]">
              Solvora が運営・公式紹介する 4 つのサービスを 1 ページにまとめました。高校生・受験生から教員・社会人まで、目的別に最短ルートで公式サイトへアクセスできます。
            </p>
          </div>
        </Container>
      </section>

      {/* FEATURED: 物理の森 */}
      {featured ? (
        <section className="bg-[#f8fafc]" id={featured.slug}>
          <Container className="px-5 py-14 sm:px-6 sm:py-20">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
              {featured.category} · {featured.status}
            </p>
            <h2 className="mt-3 text-balance text-[1.7rem] font-extrabold leading-[1.3] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.1rem]">
              {featured.name}｜{featured.primaryKeyword}
            </h2>
            <div
              className="mt-7 grid items-stretch gap-8 overflow-hidden rounded-[24px] p-7 ring-1 ring-[rgba(15,29,74,0.08)] sm:p-10 lg:grid-cols-[1fr_1fr] lg:gap-12"
              style={{
                background:
                  "radial-gradient(circle at 95% 10%, rgba(56,189,248,0.22), transparent 50%), linear-gradient(135deg, #0b1d4a 0%, #1e3a8a 100%)",
                color: "#ffffff",
              }}
            >
              <div>
                <p className="text-[0.95rem] font-semibold leading-[1.7] text-white sm:text-[1.05rem]">
                  {featured.comparison}
                </p>
                <p className="mt-4 text-[0.92rem] leading-[1.95] text-white/80">
                  {featured.description}
                </p>
                <a
                  href={featured.href}
                  rel="noreferrer noopener"
                  target="_blank"
                  className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-[0.95rem] font-semibold tracking-[0.02em] text-[#0b1d4a] transition hover:-translate-y-0.5 hover:bg-[#bae6fd]"
                >
                  {featured.ctaLabel} <span aria-hidden="true">↗</span>
                </a>
              </div>
              <ul className="grid gap-3.5">
                {featured.highlights.map((h) => (
                  <li key={h.title} className="rounded-[18px] bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur-sm sm:p-5">
                    <p className="text-[0.95rem] font-bold text-white">{h.title}</p>
                    <p className="mt-1.5 text-[0.85rem] leading-[1.85] text-white/80">{h.body}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 grid gap-3 rounded-[20px] bg-white p-6 ring-1 ring-[rgba(15,29,74,0.06)] sm:p-7">
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[#1d4ed8]">
                向いている人
              </p>
              <p className="text-[0.92rem] leading-[1.85] text-[#334155]">{featured.audience}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {featured.secondaryKeywords.map((k) => (
                  <span
                    key={k}
                    className="inline-flex items-center rounded-full bg-[#f1f5f9] px-3 py-1 text-[0.74rem] font-medium text-[#475569] ring-1 ring-[rgba(15,29,74,0.06)]"
                  >
                    #{k}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* OTHER SERVICES */}
      <section className="bg-white">
        <Container className="px-5 py-14 sm:px-6 sm:py-20">
          <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
            All Services
          </p>
          <h2 className="mt-3 text-[1.5rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[1.95rem]">
            目的別の公式入口
          </h2>

          <div className="mt-10 grid gap-12 sm:gap-14">
            {others.map((app, idx) => (
              <article key={app.slug} id={app.slug} className="scroll-mt-24 sm:scroll-mt-28">
                <p className="text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-[#1d4ed8]">
                  {app.category} · {app.status}
                </p>
                <h2 className="mt-2 text-balance text-[1.5rem] font-extrabold leading-[1.3] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2rem]">
                  {app.name}｜{app.primaryKeyword}
                </h2>
                {app.image ? (
                  <div className="relative mt-5 overflow-hidden rounded-[18px] bg-gradient-to-br from-[#eef4ff] via-[#fff7ed] to-[#fef3c7] ring-1 ring-[rgba(15,29,74,0.08)] shadow-[0_24px_60px_-40px_rgba(15,29,74,0.4)] sm:mt-6 sm:rounded-[24px]">
                    <Image
                      src={app.image}
                      alt={`${app.name} — ${app.primaryKeyword}`}
                      width={app.imageWidth ?? 1536}
                      height={app.imageHeight ?? 1024}
                      sizes="(min-width: 1024px) 768px, 100vw"
                      className="h-auto w-full"
                    />
                  </div>
                ) : null}
                <p className="mt-4 max-w-3xl text-[0.96rem] font-semibold leading-[1.75] text-[#0b1d4a] sm:mt-5">
                  {app.comparison}
                </p>
                <p className="mt-3 max-w-3xl text-[0.92rem] leading-[1.95] text-[#475569]">
                  {app.description}
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {app.highlights.map((h) => (
                    <div
                      key={h.title}
                      className="rounded-[18px] bg-[#f8fafc] p-5 ring-1 ring-[rgba(15,29,74,0.06)]"
                    >
                      <p className="text-[0.95rem] font-extrabold leading-[1.5] text-[#0b1d4a]">
                        {h.title}
                      </p>
                      <p className="mt-2 text-[0.85rem] leading-[1.85] text-[#475569]">{h.body}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#94a3b8]">
                    関連キーワード
                  </span>
                  {app.secondaryKeywords.map((k) => (
                    <span
                      key={k}
                      className="inline-flex items-center rounded-full bg-[#f1f5f9] px-3 py-1 text-[0.74rem] font-medium text-[#475569] ring-1 ring-[rgba(15,29,74,0.06)]"
                    >
                      #{k}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={app.href}
                    rel="noreferrer noopener"
                    target="_blank"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0b1d4a] px-6 text-[0.94rem] font-semibold tracking-[0.02em] text-white transition hover:bg-[#1e3a8a]"
                  >
                    {app.ctaLabel} <span aria-hidden="true">↗</span>
                  </a>
                  <p className="text-[0.86rem] leading-[1.85] text-[#475569]">
                    向いている人：{app.audience}
                  </p>
                </div>

                {/* Per-service FAQ */}
                <details className="group mt-7 rounded-[18px] bg-[#f8fafc] ring-1 ring-[rgba(15,29,74,0.06)]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5 text-[0.92rem] font-bold tracking-[-0.005em] text-[#0b1d4a] [&::-webkit-details-marker]:hidden">
                    <span>{app.primaryKeyword} に関するよくある質問</span>
                    <span aria-hidden="true" className="text-[#1d4ed8] transition group-open:rotate-90">
                      →
                    </span>
                  </summary>
                  <ul className="grid gap-4 px-5 pb-5">
                    {app.faq.map((q) => (
                      <li key={q.question}>
                        <p className="text-[0.88rem] font-bold text-[#0b1d4a]">Q. {q.question}</p>
                        <p className="mt-1.5 text-[0.86rem] leading-[1.85] text-[#475569]">A. {q.answer}</p>
                      </li>
                    ))}
                  </ul>
                </details>

                {idx < others.length - 1 ? (
                  <hr className="mt-12 border-t border-[rgba(15,29,74,0.08)]" />
                ) : null}
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* BRAND STRUCTURE */}
      <section className="bg-[#f8fafc]">
        <Container className="px-5 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
              Brand Structure
            </p>
            <h2 className="mt-3 text-[1.55rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.05rem]">
              Solvora と各サービスの関係
            </h2>
            <p className="mt-4 text-[0.92rem] leading-[1.95] text-[#475569]">
              Solvora は理系学習ハブの親ブランド。物理の森は Solvora が直営するオンライン物理専門塾、Physics は高校物理アプリ、Eddivom は LaTeX 教材作成 AI、IT Pass は IT パスポート アプリです。
            </p>
          </div>
          <div className="mx-auto mt-10 flex flex-wrap justify-center gap-3">
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0b1d4a] px-6 text-[0.94rem] font-semibold tracking-[0.02em] text-white transition hover:bg-[#1e3a8a]"
              href={siteConfig.physicsSchoolUrl}
              rel="noreferrer noopener"
              target="_blank"
            >
              物理の森を開く <span aria-hidden="true">↗</span>
            </a>
            <Link
              href="/blog"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#0b1d4a] px-6 text-[0.94rem] font-semibold tracking-[0.02em] text-[#0b1d4a] transition hover:bg-[#0b1d4a] hover:text-white"
            >
              ブログを読む
            </Link>
            <Link
              href="/about"
              className="inline-flex min-h-12 items-center justify-center rounded-full px-4 text-[0.94rem] font-semibold text-[#1d4ed8] transition hover:text-[#0b1d4a]"
            >
              Solvora について <span aria-hidden="true" className="ml-1">→</span>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
