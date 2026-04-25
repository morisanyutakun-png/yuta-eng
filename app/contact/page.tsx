import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";
import { createBreadcrumbJsonLd, createFaqJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "理系人材育成・EdTech 導入のご相談窓口｜Solvora お問い合わせ",
  description:
    "Solvora は、AI 教材作成・学習支援アプリ・物理専門塾を集約した理系人材育成 EdTech ハブ。教育DX／GIGA スクール構想後の教材設計、AI×LaTeX 教材制作、学習アプリ企画、物理の森の受講相談まで一括で受け付けています。1営業日以内に返信、受講相談は初回無料。",
  keywords: [
    "理系人材育成 相談",
    "EdTech 導入相談",
    "教育DX コンサル",
    "AI 教材作成 依頼",
    "LaTeX 教材作成 依頼",
    "学習支援アプリ 企画",
    "GIGAスクール 後 教材",
    "物理の森 受講相談",
    "STEM教育 協業",
  ],
  path: "/contact",
});

const topics = [
  "理系人材育成 / EdTech 導入のご相談（学校・塾・企業）",
  "AI × LaTeX を使った教材制作・教育DX の導入",
  "学習支援 Web アプリの企画・UI / プロダクト相談",
  "GIGAスクール構想後の教材設計・運用ご相談",
  "教育系メディア・ブログ運用、寄稿・登壇のご依頼",
  "物理専門オンライン塾「物理の森」の受講相談（初回無料）",
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

const contactFaq = [
  {
    question: "高校物理オンライン塾「物理の森」の受講相談は無料ですか？",
    answer:
      "はい、初回受講相談は無料です。受講前提でなくても構いません。現状の物理の偏差値・志望校・残り時間を伺い、最初の3ヶ月の学習プラン案を提示します。",
  },
  {
    question: "返信はどれくらいで届きますか？",
    answer:
      "初回返信は1営業日以内が目安です。土日祝に送付された場合は翌営業日になることがあります。",
  },
  {
    question: "教材制作・AI×LaTeX 教材の依頼はできますか？",
    answer:
      "はい、AI と LaTeX を使った教材制作の導入支援、テンプレート設計、運用フロー構築まで対応します。テーマ・規模・希望スケジュールをメールでお知らせください。",
  },
];

export default function ContactPage() {
  const breadcrumb = createBreadcrumbJsonLd([
    { name: "ホーム", path: "/" },
    { name: "相談・お問い合わせ", path: "/contact" },
  ]);
  const faqJsonLd = createFaqJsonLd(contactFaq);
  return (
    <>
      <JsonLd data={[breadcrumb, faqJsonLd]} />
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
              <li className="text-[#475569]">相談・お問い合わせ</li>
            </ol>
          </nav>
          <div className="py-10 sm:py-16 lg:py-20">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8] sm:text-[0.78rem]">
              Contact · 理系人材育成 EdTech
            </p>
            <h1 className="mt-4 text-balance text-[2.05rem] font-extrabold leading-[1.22] tracking-[-0.01em] text-[#0b1d4a] sm:text-[2.7rem] sm:leading-[1.18] lg:text-[3.1rem]">
              理系人材育成・EdTech 導入の
              <br className="hidden sm:block" />
              ご相談はこちら。
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-[1rem] leading-[1.95] text-[#334155] sm:text-[1.08rem]">
              Solvora は、AI 教材作成「Eddivom」・物理専門塾「物理の森」・学習アプリを集約した <strong className="font-bold text-[#0b1d4a]">理系人材育成 EdTech ハブ</strong>。教育DX／GIGA スクール構想後の教材設計、AI 教材制作、学習支援アプリ企画、寄稿・登壇のご依頼まで、ここから一括で受け付けています。受講相談は初回無料です。
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
