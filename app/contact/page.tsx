import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/container";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "高校物理塾の受講相談・教材制作の問い合わせ窓口 - Solvora",
  description:
    "高校物理オンライン塾「物理の森」の受講相談、AI×LaTeXによる教材制作、学習支援Webアプリ企画の問い合わせ窓口。メールで概要を送れば1営業日以内に返信します。受講相談は初回無料。",
  keywords: [
    "高校物理 塾 相談",
    "物理の森 受講相談",
    "教材作成 依頼",
    "AI 教材制作",
    "学習支援 Webアプリ 開発",
  ],
  path: "/contact",
});

const topics = [
  "高校物理の受講相談（物理の森）",
  "AI と LaTeX を使った教材制作の導入",
  "学習支援 Web アプリの企画・UI 相談",
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
    title: "オンラインで擦り合わせ",
    body: "30分の通話、または非同期テキストで、ゴールと制約を整理します。NDA が必要な場合はお知らせください。",
  },
  {
    label: "03",
    title: "見積もり・方針提案 → 開始",
    body: "範囲・進め方・概算費用を文書でお渡しし、合意の上で着手します。",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-white">
        <Container className="px-6">
          <div className="py-16 sm:py-20 lg:py-24">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
              Contact · Solvora
            </p>
            <h1 className="mt-4 text-balance text-[2.05rem] font-extrabold leading-[1.22] tracking-[-0.01em] text-[#0b1d4a] sm:text-[2.7rem] sm:leading-[1.18] lg:text-[3.1rem]">
              高校物理の受講相談、
              <br className="hidden sm:block" />
              教材制作のご依頼はこちら。
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-[1rem] leading-[1.95] text-[#334155] sm:text-[1.08rem]">
              高校物理オンライン塾「物理の森」の受講相談、教材設計、AI 教材制作、学習支援 Web アプリ企画のお問い合わせ窓口です。受講相談は初回無料、まずは気になっていることを一行送ってください。
            </p>
          </div>
        </Container>
      </section>

      {/* PHYSICS SCHOOL CTA */}
      <section className="bg-[#f8fafc]">
        <Container className="px-6 py-12 sm:py-16">
          <div
            className="grid items-center gap-6 overflow-hidden rounded-[28px] p-7 ring-1 ring-[rgba(15,29,74,0.08)] sm:p-10 lg:grid-cols-[1.1fr_0.9fr]"
            style={{
              background:
                "radial-gradient(circle at 95% 10%, rgba(56,189,248,0.22), transparent 50%), linear-gradient(135deg, #0b1d4a 0%, #1e3a8a 100%)",
              color: "#ffffff",
            }}
          >
            <div>
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-[#bae6fd]">
                Physics · 受講相談
              </p>
              <h2 className="mt-3 text-balance text-[1.5rem] font-extrabold leading-[1.35] sm:text-[1.85rem]">
                高校物理の受講相談は、物理の森から。
              </h2>
              <p className="mt-3 text-[0.95rem] leading-[1.85] text-white/85">
                物理基礎・物理の通年指導、定期テスト対策、共通テスト・国公立二次・私大入試まで対応するオンライン専門塾です。
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <a
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-[0.95rem] font-semibold tracking-[0.02em] text-[#0b1d4a] transition hover:-translate-y-0.5 hover:bg-[#bae6fd]"
                href={siteConfig.physicsSchoolUrl}
                rel="noreferrer noopener"
                target="_blank"
              >
                物理の森を開く <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* EMAIL + TOPICS */}
      <section className="bg-white">
        <Container className="px-6 py-16 sm:py-20">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-[28px] bg-white p-8 ring-1 ring-[rgba(15,29,74,0.08)] shadow-[0_28px_60px_-40px_rgba(15,29,74,0.4)] sm:p-10">
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
                Email
              </p>
              <h2 className="mt-3 text-[1.5rem] font-extrabold leading-[1.4] tracking-[-0.005em] text-[#0b1d4a] sm:text-[1.8rem]">
                メールで相談する
              </h2>
              <a
                className="mt-6 inline-block break-all rounded-full bg-[#f1f5f9] px-5 py-3 text-[0.95rem] font-semibold text-[#0b1d4a] underline decoration-[#1d4ed8] decoration-2 underline-offset-4 transition hover:bg-[#e0e7ef] sm:text-[1.05rem]"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
              <p className="mt-5 text-[0.9rem] leading-[1.95] text-[#475569]">
                初回返信は1営業日以内が目安です。土日祝は翌営業日になることがあります。
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0b1d4a] px-7 text-[0.95rem] font-semibold tracking-[0.02em] text-white transition hover:bg-[#1e3a8a]"
                  href={`mailto:${siteConfig.email}`}
                >
                  メールを開く
                </a>
                <Link
                  href="/about"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#0b1d4a] px-7 text-[0.95rem] font-semibold tracking-[0.02em] text-[#0b1d4a] transition hover:bg-[#0b1d4a] hover:text-white"
                >
                  Solvora について
                </Link>
              </div>
            </article>

            <aside className="rounded-[28px] bg-[#f8fafc] p-8 ring-1 ring-[rgba(15,29,74,0.06)] sm:p-10">
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
                Topics · 相談しやすいテーマ
              </p>
              <ul className="mt-6 grid gap-3.5">
                {topics.map((topic, idx) => (
                  <li key={topic} className="flex items-start gap-3 text-[0.94rem] leading-[1.85] text-[#0b1d4a]">
                    <span
                      aria-hidden="true"
                      className="mt-[0.2em] grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#1d4ed8] text-[0.72rem] font-bold text-white"
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </section>

      {/* FLOW */}
      <section className="bg-[#f8fafc]">
        <Container className="px-6 py-20 sm:py-24">
          <div className="text-center">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
              Process
            </p>
            <h2 className="mt-3 text-[1.7rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2.2rem]">
              相談から開始までの流れ
            </h2>
          </div>
          <ol className="mx-auto mt-10 grid max-w-5xl gap-5 lg:grid-cols-3">
            {flow.map((item) => (
              <li
                key={item.title}
                className="rounded-[22px] bg-white p-7 ring-1 ring-[rgba(15,29,74,0.06)] transition hover:-translate-y-1 hover:shadow-[0_28px_50px_-32px_rgba(15,29,74,0.4)]"
              >
                <p className="text-[1.6rem] font-extrabold leading-none text-[#1d4ed8]">
                  {item.label}
                </p>
                <h3 className="mt-4 text-[1.1rem] font-extrabold leading-[1.5] tracking-[-0.005em] text-[#0b1d4a]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-[1.95] text-[#475569]">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
