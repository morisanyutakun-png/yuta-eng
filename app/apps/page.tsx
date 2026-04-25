import type { Metadata } from "next";

import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { apps } from "@/data/apps";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "アプリ一覧｜Lumora が紹介する学習支援Webアプリ",
  description:
    "Lumora が公式に紹介する学習支援Webアプリ一覧。教材作成AIで人気の Eddivom、IT基礎学習の IT Pass、物理学習の Physics をまとめて確認できます。",
  keywords: [
    "学習支援Webアプリ",
    "教材作成AI アプリ",
    "Eddivom",
    "IT Pass",
    "物理 アプリ",
  ],
  path: "/apps",
});

export default function AppsPage() {
  return (
    <Container className="px-4 sm:px-6">
      <header className="mx-auto mt-8 max-w-3xl text-center sm:mt-14">
        <p className="lumora-kicker">OFFICIAL APPS</p>
        <h1 className="lumora-display mt-5 text-balance text-[1.7rem] leading-[1.55] sm:text-[2.4rem] sm:leading-[1.45]">
          学んだことを、<br className="hidden sm:block" />
          そのまま<span className="lumora-marker">手を動かす場所</span>へ。
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty font-serif text-[0.95rem] leading-[2.1] text-[var(--ink-soft)] sm:text-[1rem]">
          Lumora が公式に紹介する学習支援Webアプリの一覧です。記事で整理した考え方を、実際の問題演習や教材制作につなげるための入口としてお使いください。
        </p>
        <div className="lumora-rule" />
      </header>

      <ul className="mx-auto grid max-w-5xl gap-4 sm:gap-5 lg:grid-cols-3">
        {apps.map((app, idx) => (
          <li
            className="bg-white p-5 sm:p-6"
            key={app.name}
            style={{
              border: "1px solid var(--line)",
              borderTop: "3px solid var(--accent-deep)",
              borderRadius: "4px",
              boxShadow: "0 14px 40px -36px rgba(15,23,42,0.4)",
            }}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-mono text-[0.78rem] font-bold tracking-[0.16em] text-[var(--accent-warm)]">
                APP · 0{idx + 1}
              </span>
              <span className="rounded-sm bg-[#fbf3df] px-2.5 py-1 font-serif text-[0.7rem] font-bold tracking-[0.12em] text-[var(--accent-warm)]">
                {app.status}
              </span>
            </div>
            <h2 className="mt-3 font-serif text-[1.45rem] font-bold tracking-[0.02em] text-[var(--ink)] sm:text-[1.6rem]">
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
            <ButtonLink className="mt-5 w-full" external href={app.href}>
              {app.ctaLabel} ↗
            </ButtonLink>
          </li>
        ))}
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
        <p className="lumora-eyebrow">FOR VISITORS</p>
        <h2 className="lumora-display mt-3 text-[1.3rem] leading-[1.55] sm:text-[1.7rem]">
          アプリの背景や使い方は、<br className="hidden sm:block" />
          ブログとプロフィールで補足しています。
        </h2>
        <p className="mt-4 text-[0.92rem] leading-[2] text-[var(--ink-soft)]">
          アプリを使う前に、教材作成や学習支援の考え方を読んでおくと、より自然に使い始められます。気になる入口から開いてみてください。
        </p>
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <ButtonLink className="w-full sm:w-auto" href="/blog">
            ブログを読む
          </ButtonLink>
          <ButtonLink className="w-full sm:w-auto" href="/about" variant="secondary">
            Lumora について
          </ButtonLink>
        </div>
      </section>
    </Container>
  );
}
