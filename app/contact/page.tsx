import type { Metadata } from "next";

import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "相談する｜Lumora お問い合わせ窓口",
  description:
    "Lumora（学習ハブ）への相談・お問い合わせ窓口。教材設計、AI教材作成、学習支援アプリ企画などを受け付けます。物理塾「物理の森」への受講相談は物理の森サイトから。",
  keywords: [
    "Lumora 相談",
    "教材作成 相談",
    "AI教材 制作 依頼",
    "学習支援Webアプリ 開発",
    "物理の森 受講相談",
  ],
  path: "/contact",
});

const topics = [
  "高校物理の教材・授業設計の相談",
  "AIとLaTeXを使った教材制作の導入",
  "学習支援Webアプリの企画/UI 相談",
  "教育系メディア・ブログ運用の相談",
  "EdTech 領域での協業・寄稿のご依頼",
];

const flow = [
  {
    label: "01",
    title: "メールで概要を送る",
    body: "テーマ、ご希望の範囲、目安スケジュールを教えてください。1営業日以内に返信します。",
  },
  {
    label: "02",
    title: "オンライン or テキストで擦り合わせ",
    body: "30分の通話 or 非同期テキストで、ゴールと制約を整理します。NDA が必要な場合はお知らせください。",
  },
  {
    label: "03",
    title: "見積もり/方針提案 → 開始",
    body: "範囲・進め方・概算費用を文書でお渡しし、合意の上で着手します。",
  },
];

export default function ContactPage() {
  return (
    <Container className="px-4 sm:px-6">
      <header className="mx-auto mt-8 max-w-3xl text-center sm:mt-14">
        <p className="lumora-kicker">CONTACT</p>
        <h1 className="lumora-display mt-5 text-balance text-[1.7rem] leading-[1.55] sm:text-[2.4rem] sm:leading-[1.45]">
          気になっていることを、<br className="hidden sm:block" />
          <span className="lumora-marker">一行</span>送ってください。
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty font-serif text-[0.95rem] leading-[2.1] text-[var(--ink-soft)] sm:text-[1rem]">
          Lumora（学習ハブ）は、教材設計・AI教材制作・学習Webアプリ企画の相談窓口です。物理塾「物理の森」への受講相談は、物理の森の公式サイトから直接お申し込みください。
        </p>
        <div className="lumora-rule" />
      </header>

      <aside
        className="mx-auto mb-8 flex max-w-4xl flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
        style={{
          background:
            "radial-gradient(circle at 95% 10%, rgba(200,146,17,0.18), transparent 45%), linear-gradient(135deg, #0f1c3a 0%, #1f3a6b 100%)",
          border: "1px solid #1a2a4d",
          borderRadius: "4px",
        }}
      >
        <div>
          <p className="inline-flex items-center gap-1.5 font-serif text-[0.7rem] font-bold tracking-[0.22em] text-[#f5d68a]">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--accent-warm)]" />
            物理塾の受講相談はこちら
          </p>
          <p className="mt-2 font-serif text-[1rem] font-bold leading-[1.6] text-white sm:text-[1.08rem]">
            高校物理の受講相談は、Lumora 運営の「物理の森」から。
          </p>
        </div>
        <a
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-sm bg-[var(--accent-warm)] px-5 py-3 font-serif text-[0.9rem] font-bold tracking-[0.06em] text-[#1a1a1a] transition hover:-translate-y-0.5 hover:bg-[#dca424]"
          href={siteConfig.physicsSchoolUrl}
          rel="noreferrer noopener"
          target="_blank"
        >
          物理の森（物理塾）を開く
          <span aria-hidden="true">↗</span>
        </a>
      </aside>

      <section className="mx-auto grid max-w-4xl gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <article
          className="bg-white p-5 sm:p-7"
          style={{
            border: "1px solid var(--line)",
            borderTop: "3px solid var(--accent-deep)",
            borderRadius: "4px",
          }}
        >
          <p className="lumora-eyebrow">EMAIL</p>
          <h2 className="lumora-display mt-3 text-[1.3rem] leading-[1.55] sm:text-[1.55rem]">
            メールで相談する
          </h2>
          <a
            className="mt-5 inline-block break-all rounded-sm bg-[#faf6ec] px-4 py-3 font-serif text-[0.95rem] font-bold text-[var(--ink)] underline decoration-[var(--accent-warm)] decoration-2 underline-offset-4 transition hover:bg-[#fbf3df] sm:text-[1.05rem]"
            href={`mailto:${siteConfig.email}`}
          >
            {siteConfig.email}
          </a>
          <p className="mt-4 border-t border-dotted border-[var(--line)] pt-3 text-[0.88rem] leading-[2] text-[var(--ink-soft)]">
            初回返信は1営業日以内を目安にしています。土日祝は翌営業日になることがあります。
          </p>
          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <ButtonLink
              className="w-full sm:w-auto"
              external
              href={`mailto:${siteConfig.email}`}
            >
              メールを開く
            </ButtonLink>
            <ButtonLink className="w-full sm:w-auto" href="/about" variant="secondary">
              Lumora について
            </ButtonLink>
          </div>
        </article>

        <aside
          className="relative overflow-hidden p-6 text-white sm:p-8"
          style={{
            background:
              "radial-gradient(circle at 92% 8%, rgba(200,146,17,0.18), transparent 40%), linear-gradient(135deg, #0f1c3a 0%, #1f3a6b 100%)",
            border: "1px solid #1a2a4d",
            borderRadius: "4px",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[var(--accent-warm)] to-transparent"
          />
          <p className="font-serif text-[0.78rem] font-bold tracking-[0.22em] text-[#f5d68a]">
            TOPICS · 相談しやすいテーマ
          </p>
          <ul className="mt-5 grid gap-3 font-serif text-[0.92rem] leading-[1.85]">
            {topics.map((topic, idx) => (
              <li className="flex items-start gap-3 text-slate-100" key={topic}>
                <span
                  aria-hidden="true"
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-sm bg-white/10 font-mono text-[0.72rem] font-bold tracking-wider text-[#f5d68a]"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="mx-auto my-12 max-w-4xl sm:my-16">
        <div className="text-center">
          <p className="lumora-eyebrow">PROCESS</p>
          <h2 className="lumora-display mt-3 text-[1.4rem] leading-[1.55] sm:text-[1.7rem]">
            相談から開始までの流れ
          </h2>
        </div>
        <ol className="mt-7 grid gap-4 lg:grid-cols-3">
          {flow.map((item) => (
            <li
              className="bg-white p-5 sm:p-6"
              key={item.title}
              style={{
                border: "1px solid var(--line)",
                borderTop: "3px solid var(--accent-deep)",
                borderRadius: "4px",
                boxShadow: "0 14px 36px -36px rgba(15,23,42,0.4)",
              }}
            >
              <p className="font-serif text-[1.6rem] font-bold leading-none text-[var(--accent-warm)]">
                {item.label}
              </p>
              <h3 className="mt-4 font-serif text-[1.05rem] font-bold leading-[1.55] text-[var(--ink)]">
                {item.title}
              </h3>
              <p className="mt-3 border-t border-dotted border-[var(--line)] pt-3 text-[0.88rem] leading-[2] text-[var(--ink-soft)]">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </Container>
  );
}
