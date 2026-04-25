import type { Metadata } from "next";

import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { apps } from "@/data/apps";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "事業一覧｜Lumora の運営事業と公式サービス",
  description:
    "Lumora（ルモラ）は学習ハブとして、物理専門塾「物理の森」、教材作成アプリ Eddivom、IT 学習アプリ IT Pass などの公式入口を集約しています。各事業の公式サイトへ直接アクセスできます。",
  keywords: [
    "Lumora 事業",
    "物理の森",
    "高校物理 専門塾",
    "Eddivom",
    "IT Pass",
    "教材作成AI",
    "学習ハブ",
  ],
  path: "/apps",
});

export default function AppsPage() {
  return (
    <Container className="px-4 sm:px-6">
      <header className="mx-auto mt-8 max-w-3xl text-center sm:mt-14">
        <p className="lumora-kicker">LUMORA · BUSINESSES &amp; SERVICES</p>
        <h1 className="lumora-display mt-5 text-balance text-[1.7rem] leading-[1.55] sm:text-[2.4rem] sm:leading-[1.45]">
          物理の森（物理塾）も、<br className="hidden sm:block" />
          教材作成AIも。<span className="lumora-marker">公式入口</span>を、ここに。
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty font-serif text-[0.95rem] leading-[2.1] text-[var(--ink-soft)] sm:text-[1rem]">
          Lumora（ルモラ）は学習ハブとして、運営事業の物理専門塾「物理の森」と、提携・紹介する教材作成アプリ Eddivom、IT 学習アプリ IT Pass の公式入口を集約しています。各サービスへは下記カードから直接遷移できます。
        </p>
        <div className="lumora-rule" />
      </header>

      <ul className="mx-auto grid max-w-5xl gap-4 sm:gap-5 lg:grid-cols-3">
        {apps.map((app, idx) => {
          const isFeatured = Boolean(app.featured);
          return (
            <li
              className={`bg-white p-5 sm:p-6 ${isFeatured ? "lg:col-span-3" : ""}`}
              key={app.name}
              style={
                isFeatured
                  ? {
                      border: "2px solid var(--accent-deep)",
                      borderRadius: "4px",
                      boxShadow:
                        "0 22px 50px -38px rgba(15,23,42,0.45), inset 0 0 0 1px rgba(200,146,17,0.18)",
                      background:
                        "linear-gradient(135deg, #ffffff 0%, #fbf9f4 100%)",
                    }
                  : {
                      border: "1px solid var(--line)",
                      borderTop: "3px solid var(--accent-deep)",
                      borderRadius: "4px",
                      boxShadow: "0 14px 40px -36px rgba(15,23,42,0.4)",
                    }
              }
            >
              <div className="flex items-start justify-between gap-2">
                <span
                  className={`font-mono text-[0.78rem] font-bold tracking-[0.16em] ${isFeatured ? "text-[var(--accent-deep)]" : "text-[var(--accent-warm)]"}`}
                >
                  {isFeatured ? "FEATURED · 物理専門塾" : `BUSINESS · 0${idx + 1}`}
                </span>
                <span
                  className={`rounded-sm px-2.5 py-1 font-serif text-[0.7rem] font-bold tracking-[0.12em] ${isFeatured ? "bg-[var(--accent-deep)] text-white" : "bg-[#fbf3df] text-[var(--accent-warm)]"}`}
                >
                  {app.status}
                </span>
              </div>
              <h2
                className={`mt-3 font-serif font-bold tracking-[0.02em] text-[var(--ink)] ${isFeatured ? "text-[1.65rem] sm:text-[2.05rem]" : "text-[1.45rem] sm:text-[1.6rem]"}`}
              >
                {app.name}
              </h2>
              <p className="mt-1 font-serif text-[0.74rem] font-bold tracking-[0.18em] text-[var(--accent-deep)]">
                {app.category}
              </p>
              <p
                className="mt-4 font-serif text-[0.96rem] font-bold leading-[1.85] text-[var(--ink)]"
                style={{
                  paddingLeft: "0.85rem",
                  borderLeft: "3px solid var(--accent-warm)",
                }}
              >
                {app.comparison}
              </p>
              <p className="mt-3 border-t border-dotted border-[var(--line)] pt-3 text-[0.88rem] leading-[2] text-[var(--ink-soft)]">
                {app.description}
              </p>
              <div
                className="mt-4 px-4 py-3"
                style={{
                  background: "#faf6ec",
                  borderRadius: "3px",
                  border: "1px solid var(--line)",
                }}
              >
                <p className="font-serif text-[0.72rem] font-bold tracking-[0.18em] text-[var(--accent-deep)]">
                  向いている人
                </p>
                <p className="mt-1.5 text-[0.86rem] leading-[1.85] text-[var(--ink)]">
                  {app.audience}
                </p>
              </div>
              {isFeatured ? (
                <a
                  className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-sm bg-[var(--accent-deep)] px-6 py-3 font-serif text-[0.95rem] font-bold tracking-[0.06em] text-white transition hover:-translate-y-0.5 hover:bg-[#16305c]"
                  href={app.href}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--accent-warm)]" />
                  {app.ctaLabel}
                  <span aria-hidden="true" className="text-[#f5d68a]">↗</span>
                </a>
              ) : (
                <ButtonLink className="mt-5 w-full" external href={app.href}>
                  {app.ctaLabel} ↗
                </ButtonLink>
              )}
            </li>
          );
        })}
      </ul>

      <section
        className="mx-auto my-12 max-w-4xl p-5 sm:my-16 sm:p-10"
        style={{
          background:
            "linear-gradient(135deg, #fbf6e8 0%, #fbf9f4 60%, #ffffff 100%)",
          border: "1px solid var(--line)",
          borderRadius: "4px",
        }}
      >
        <p className="lumora-eyebrow">BRAND STRUCTURE</p>
        <h2 className="lumora-display mt-3 text-[1.3rem] leading-[1.55] sm:text-[1.7rem]">
          Lumora（学習ハブ）の中に、各事業があります。
        </h2>
        <p className="mt-4 text-[0.92rem] leading-[2] text-[var(--ink-soft)]">
          Lumora は親ブランド（学習ハブ）、「物理の森」は Lumora が運営する物理専門塾事業、Eddivom や IT Pass は提携・紹介するサービスです。
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          <li className="rounded-sm border border-[var(--line)] bg-white p-4">
            <p className="font-serif text-[0.72rem] font-bold tracking-[0.18em] text-[var(--accent-deep)]">
              親ブランド / HUB
            </p>
            <p className="mt-2 font-serif text-[0.95rem] font-bold text-[var(--ink)]">
              Lumora（yuta-eng.com）
            </p>
            <p className="mt-1 text-[0.82rem] leading-[1.85] text-[var(--ink-soft)]">
              記事と各事業の入口を集約する学習ハブ
            </p>
          </li>
          <li className="rounded-sm border border-[var(--accent-deep)] bg-white p-4">
            <p className="font-serif text-[0.72rem] font-bold tracking-[0.18em] text-[var(--accent-warm)]">
              運営事業 / 物理専門塾
            </p>
            <p className="mt-2 font-serif text-[0.95rem] font-bold text-[var(--ink)]">
              物理の森（physics.yuta-eng.com）
            </p>
            <p className="mt-1 text-[0.82rem] leading-[1.85] text-[var(--ink-soft)]">
              Lumora が運営する高校物理オンライン専門塾
            </p>
          </li>
          <li className="rounded-sm border border-[var(--line)] bg-white p-4">
            <p className="font-serif text-[0.72rem] font-bold tracking-[0.18em] text-[var(--accent-deep)]">
              提携・紹介
            </p>
            <p className="mt-2 font-serif text-[0.95rem] font-bold text-[var(--ink)]">
              Eddivom · IT Pass
            </p>
            <p className="mt-1 text-[0.82rem] leading-[1.85] text-[var(--ink-soft)]">
              教材作成AI・IT 学習の公式パートナーアプリ
            </p>
          </li>
        </ul>
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <a
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-[var(--accent-deep)] px-6 py-3 font-serif text-[0.95rem] font-bold tracking-[0.06em] text-white transition hover:-translate-y-0.5 hover:bg-[#16305c]"
            href={siteConfig.physicsSchoolUrl}
            rel="noreferrer noopener"
            target="_blank"
          >
            物理の森（物理塾）を開く
            <span aria-hidden="true">↗</span>
          </a>
          <ButtonLink className="w-full sm:w-auto" href="/blog" variant="secondary">
            ブログを読む
          </ButtonLink>
          <ButtonLink className="w-full sm:w-auto" href="/about" variant="ghost">
            Lumora について
          </ButtonLink>
        </div>
      </section>
    </Container>
  );
}
