import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import {
  feSupportAudience,
  feSupportFaq,
  feSupportMeta,
  feSupportPlans,
  feSupportPriceNote,
  feSupportRoute,
  feSupportTopics,
} from "@/data/fe-support";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";
import {
  createBreadcrumbJsonLd,
  createFaqJsonLd,
} from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: feSupportMeta.title,
  description: feSupportMeta.description,
  keywords: [
    "基本情報技術者試験",
    "基本情報 学習サポート",
    "基本情報 科目B",
    "基本情報 アルゴリズム",
    "擬似言語",
    "情報セキュリティ 対策",
    "基本情報 個別指導",
    "応用情報技術者",
  ],
  path: feSupportRoute,
});

const contactSubject = encodeURIComponent(
  "[基本情報サポート] 学習サポートについて",
);
const mailHref = `mailto:${siteConfig.email}?subject=${contactSubject}`;

const yenFormat = new Intl.NumberFormat("ja-JP");

export default function FeSupportPage() {
  const breadcrumb = createBreadcrumbJsonLd([
    { name: "ホーム", path: "/" },
    { name: "個別サポート", path: "/services" },
    { name: feSupportMeta.pageTitle, path: feSupportRoute },
  ]);
  const faqJsonLd = createFaqJsonLd(feSupportFaq);
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: feSupportMeta.pageTitle,
    description: feSupportMeta.description,
    serviceType: "基本情報技術者試験 学習サポート",
    url: new URL(feSupportRoute, siteConfig.url).toString(),
    areaServed: { "@type": "Country", name: "Japan" },
    provider: {
      "@type": "Person",
      name: siteConfig.author,
      url: new URL("/about", siteConfig.url).toString(),
    },
    offers: feSupportPlans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      price: String(plan.price),
      priceCurrency: "JPY",
      description: plan.description,
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumb, faqJsonLd, serviceJsonLd]} />

      {/* HERO */}
      <section className="bg-white">
        <Container className="px-5 sm:px-6">
          <nav
            aria-label="パンくずリスト"
            className="pt-7 text-[0.78rem] text-[#94a3b8] sm:pt-9"
          >
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link className="transition hover:text-[#1d4ed8]" href="/">
                  ホーム
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#cbd5e1]">/</li>
              <li className="text-[#475569]">個別サポート</li>
              <li aria-hidden="true" className="text-[#cbd5e1]">/</li>
              <li className="text-[#475569]">基本情報技術者試験 学習サポート</li>
            </ol>
          </nav>

          <div className="py-10 sm:py-14 lg:py-16">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8] sm:text-[0.78rem]">
              個別サポート · 基本情報技術者試験
            </p>
            <h1 className="mt-4 text-balance text-[1.85rem] font-extrabold leading-[1.28] tracking-[-0.01em] text-[#0b1d4a] sm:text-[2.4rem] sm:leading-[1.22] lg:text-[2.8rem]">
              {feSupportMeta.pageTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-[0.98rem] leading-[1.95] text-[#334155] sm:text-[1.04rem]">
              {feSupportMeta.pageSubtitle}
            </p>
            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <a
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0b1d4a] px-6 text-[0.92rem] font-semibold tracking-[0.02em] text-white transition hover:bg-[#1e3a8a]"
                href={mailHref}
              >
                学習サポートについて問い合わせる
              </a>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#0b1d4a] px-6 text-[0.92rem] font-semibold tracking-[0.02em] text-[#0b1d4a] transition hover:bg-[#0b1d4a] hover:text-white"
              >
                相談する
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* AUDIENCE */}
      <section className="bg-[#f8fafc]">
        <Container className="px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
              こんな人向けです
            </p>
            <h2 className="mt-3 text-[1.4rem] font-extrabold leading-[1.4] tracking-[-0.005em] text-[#0b1d4a] sm:text-[1.7rem]">
              独学で詰まりやすい部分を、必要な分だけ整理します
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {feSupportAudience.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-[14px] bg-white p-4 ring-1 ring-[rgba(15,29,74,0.06)]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1d4ed8]"
                  />
                  <span className="text-[0.92rem] leading-[1.85] text-[#0b1d4a]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* SUPPORT TOPICS */}
      <section className="bg-white">
        <Container className="px-5 py-12 sm:px-6 sm:py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
              サポート内容
            </p>
            <h2 className="mt-3 text-[1.4rem] font-extrabold leading-[1.4] tracking-[-0.005em] text-[#0b1d4a] sm:text-[1.85rem]">
              アルゴリズム・擬似言語・情報セキュリティを中心に
            </h2>
            <p className="mt-3 text-[0.94rem] leading-[1.95] text-[#475569]">
              全範囲を体系的に教えるのではなく、独学者が詰まる部分を順に整理する形で進めます。必要なテーマだけを選ぶこともできます。
            </p>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {feSupportTopics.map((topic) => (
              <li
                key={topic.title}
                className="rounded-[18px] bg-[#f8fafc] p-5 ring-1 ring-[rgba(15,29,74,0.06)] sm:p-6"
              >
                <p className="text-[1rem] font-extrabold leading-[1.5] text-[#0b1d4a]">
                  {topic.title}
                </p>
                <p className="mt-2 text-[0.9rem] leading-[1.85] text-[#475569]">
                  {topic.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* PRICING */}
      <section className="bg-[#f8fafc]">
        <Container className="px-5 py-12 sm:px-6 sm:py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
              料金例
            </p>
            <h2 className="mt-3 text-[1.4rem] font-extrabold leading-[1.4] tracking-[-0.005em] text-[#0b1d4a] sm:text-[1.85rem]">
              必要な分だけ依頼できる料金体系
            </h2>
          </div>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {feSupportPlans.map((plan) => (
              <li
                key={plan.name}
                className={
                  "flex h-full flex-col rounded-[20px] bg-white p-6 ring-1 sm:p-7 " +
                  (plan.highlight
                    ? "ring-[#1d4ed8] shadow-[0_24px_50px_-38px_rgba(29,78,216,0.55)]"
                    : "ring-[rgba(15,29,74,0.08)]")
                }
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[1rem] font-extrabold text-[#0b1d4a]">
                    {plan.name}
                  </p>
                  {plan.duration ? (
                    <span className="text-[0.78rem] font-semibold text-[#475569]">
                      {plan.duration}
                    </span>
                  ) : null}
                </div>
                <p className="mt-4 text-[1.6rem] font-extrabold tracking-[-0.01em] text-[#0b1d4a] sm:text-[1.85rem]">
                  ¥{yenFormat.format(plan.price)}
                  {plan.unit ? (
                    <span className="ml-1 text-[0.86rem] font-semibold text-[#475569]">
                      {plan.unit}
                    </span>
                  ) : null}
                </p>
                <p className="mt-3 text-[0.9rem] leading-[1.85] text-[#475569]">
                  {plan.description}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-3xl text-[0.82rem] leading-[1.85] text-[#64748b]">
            {feSupportPriceNote}
          </p>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <Container className="px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
              FAQ
            </p>
            <h2 className="mt-3 text-[1.4rem] font-extrabold leading-[1.4] tracking-[-0.005em] text-[#0b1d4a] sm:text-[1.7rem]">
              よくある質問
            </h2>
            <ol className="mt-7 grid gap-4">
              {feSupportFaq.map((item) => (
                <li
                  key={item.question}
                  className="rounded-[16px] bg-[#f8fafc] p-5 ring-1 ring-[rgba(15,29,74,0.06)] sm:p-6"
                >
                  <p className="flex items-start gap-2.5 text-[0.98rem] font-extrabold leading-[1.55] text-[#0b1d4a]">
                    <span
                      aria-hidden="true"
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#1d4ed8] text-[0.74rem] font-bold text-white"
                    >
                      Q
                    </span>
                    {item.question}
                  </p>
                  <p className="mt-3 border-t border-dotted border-[rgba(15,29,74,0.12)] pt-3 text-[0.9rem] leading-[1.95] text-[#334155]">
                    {item.answer}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-[#f8fafc]">
        <Container className="px-5 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <h2 className="text-balance text-[1.5rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[1.95rem]">
              一度、現状を整理してみませんか。
            </h2>
            <p className="mt-4 text-[0.94rem] leading-[1.95] text-[#475569]">
              初回相談は 60 分。残り時間とつまずきを共有いただければ、その場で次の 1〜2 週間の進め方を提案します。
            </p>
            <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <a
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0b1d4a] px-7 text-[0.95rem] font-semibold text-white transition hover:bg-[#1e3a8a]"
                href={mailHref}
              >
                学習サポートについて問い合わせる
              </a>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#0b1d4a] px-7 text-[0.95rem] font-semibold text-[#0b1d4a] transition hover:bg-[#0b1d4a] hover:text-white"
              >
                Contact ページへ
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
