import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";
import {
  createBreadcrumbJsonLd,
  createContactPageJsonLd,
  createFaqJsonLd,
  createOrganizationJsonLd,
} from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "無料体験・相談のお申し込み",
  description:
    "ノビットスタディ 中高部の無料体験・受講相談のお申し込みページ。高校物理・数学・英語の記述答案を毎日添削するオンライン学習管理塾です。実際の教材で演習し、答案を提出して、ノビットの添削を体験できます。面談や授業は行わない添削専門の塾です。お気軽にご相談ください。",
  keywords: [
    "ノビットスタディ 無料体験",
    "高校物理 添削 体験",
    "オンライン添削塾 相談",
    "高校生 添削 申し込み",
    "記述答案 添削 体験",
  ],
  path: "/contact",
});

const canDo = [
  {
    title: "実際の教材で演習する",
    body: "塾長オリジナル教材・公式演習本の一部に、実際に取り組んでいただきます。記述前提の問題で「考える力」を体験。",
  },
  {
    title: "答案を提出して添削を受ける",
    body: "提出した答案に、途中式・考え方・減点ポイントまで踏み込んだ添削フィードバックをお返しします。",
  },
  {
    title: "学習管理システムを試す",
    body: "毎日の演習と添削がどう回るのか、独自の学習管理システムの使い方とペース配分をご案内します。",
  },
];

const trust = [
  { label: "サービス形態", value: "オンライン添削・学習管理塾（添削専門）" },
  { label: "塾長", value: siteConfig.author },
  { label: "対応科目", value: "高校物理を中心に、高校数学・英語の記述答案" },
  { label: "対象", value: "高校生・高卒生（中高一貫の高校範囲も相談可）" },
  { label: "対応地域", value: "日本全国（オンライン完結）" },
  { label: "返信目安", value: "1〜2 営業日以内" },
];

const contactFaq = [
  {
    question: "無料体験では何ができますか？",
    answer:
      "実際の教材で演習に取り組み、答案を提出して、ノビットの添削フィードバックを体験できます。学習管理システムの使い方や、毎日のペース配分もあわせてご案内します。費用はかかりません。",
  },
  {
    question: "面談や授業はありますか？",
    answer:
      "ノビットスタディは添削専門の学習管理塾です。現状、面談や授業（ライブ指導）は行っていません。毎日の演習に対して毎日添削を返す形で、自立した学びを支えます。",
  },
  {
    question: "料金はどのくらいですか？",
    answer:
      "料金プランは現在準備中です。「塾としては安価に、毎日プロの添削が受けられる」ことを大切にしています。お申し込み・ご相談時に、最新の料金と受講の流れをご案内します。",
  },
  {
    question: "申し込みから受講までの流れは？",
    answer:
      "下記のメールから、学年・志望校・現在の悩みなどを添えてご連絡ください。折り返し、無料体験の進め方と日程をご案内します。体験後、続けるかどうかはご自由に判断いただけます。",
  },
];

export default function ContactPage() {
  const breadcrumb = createBreadcrumbJsonLd([
    { name: "ホーム", path: "/" },
    { name: "無料体験・相談", path: "/contact" },
  ]);
  const contactPageJsonLd = createContactPageJsonLd();
  const orgJsonLd = createOrganizationJsonLd();
  const faqJsonLd = createFaqJsonLd(contactFaq);

  const subject = encodeURIComponent("[無料体験・相談] ノビットスタディへのお問い合わせ");
  const body = encodeURIComponent(
    "▼ご記入ください\n・学年（例：高2）：\n・志望校／目標（任意）：\n・対応希望科目（物理／数学／英語）：\n・いまの悩み：\n",
  );
  const mailHref = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;

  return (
    <>
      <JsonLd data={[contactPageJsonLd, orgJsonLd, breadcrumb, faqJsonLd]} />

      {/* HERO */}
      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f3f8ff_100%)]">
        <Container className="px-5 sm:px-6">
          <nav aria-label="パンくずリスト" className="pt-7 text-[0.78rem] text-[#94a3b8] sm:pt-9">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link className="transition hover:text-[#0f766e]" href="/">
                  ホーム
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#cbd5e1]">/</li>
              <li className="text-[#475569]">無料体験・相談</li>
            </ol>
          </nav>
          <div className="py-10 sm:py-14 lg:py-16">
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#0f766e] ring-1 ring-[rgba(13,148,136,0.25)]">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#f97316]" />
              Free Trial · 無料体験受付中
            </p>
            <h1 className="mt-5 text-balance text-[2.05rem] font-extrabold leading-[1.22] tracking-[-0.01em] text-[#0b1d4a] sm:text-[2.7rem] sm:leading-[1.18] lg:text-[3rem]">
              まずは無料体験で、
              <br className="hidden sm:block" />
              ノビットの添削を試す。
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-[1rem] leading-[1.95] text-[#334155] sm:text-[1.06rem]">
              高校物理・数学・英語の記述答案を、毎日添削するオンライン学習管理塾です。
              面談や授業は行いません。下記から、お気軽に無料体験・ご相談をお申し込みください。
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <a
                href={mailHref}
                className="group/cta relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-7 text-[0.98rem] font-bold text-white shadow-[0_18px_38px_-14px_rgba(234,88,12,0.7)] transition hover:-translate-y-px"
              >
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,#f97316_0%,#ea580c_100%)]" />
                <span className="relative">メールで無料体験を申し込む</span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#0b1d4a] px-7 text-[0.98rem] font-semibold text-[#0b1d4a] transition hover:bg-[#0b1d4a] hover:text-white"
              >
                {siteConfig.email}
              </a>
            </div>
            <p className="mt-4 text-[0.82rem] leading-[1.8] text-[#94a3b8]">
              ※ LINE・お申し込みフォームでの受付は準備中です。当面はメールにて承ります。
            </p>
          </div>
        </Container>
      </section>

      {/* 無料体験でできること */}
      <section className="bg-[#f8fafc]">
        <Container className="px-5 py-12 sm:px-6 sm:py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">
              Free Trial · 無料体験でできること
            </p>
            <h2 className="mt-3 text-[1.55rem] font-extrabold leading-[1.4] tracking-[-0.005em] text-[#0b1d4a] sm:text-[1.95rem]">
              「演習 → 提出 → 添削」を、実際に体験
            </h2>
          </div>
          <ul className="mt-8 grid gap-5 sm:grid-cols-3">
            {canDo.map((c, i) => (
              <li key={c.title} className="rounded-[18px] bg-white p-6 ring-1 ring-[rgba(15,29,74,0.06)]">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#eef6f6] text-[0.95rem] font-extrabold text-[#0f766e]">
                  {i + 1}
                </span>
                <p className="mt-4 text-[1.05rem] font-extrabold leading-[1.45] text-[#0b1d4a]">{c.title}</p>
                <p className="mt-2 text-[0.88rem] leading-[1.9] text-[#475569]">{c.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* TRUST */}
      <section className="cv-defer bg-white">
        <Container className="px-5 py-14 sm:px-6 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
            <div>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#1d4ed8]">
                Trust · 運営情報
              </p>
              <h2 className="mt-3 text-[1.55rem] font-extrabold leading-[1.4] tracking-[-0.005em] text-[#0b1d4a] sm:text-[1.95rem]">
                安心してご相談いただくために
              </h2>
              <p className="mt-4 text-[0.94rem] leading-[1.95] text-[#475569]">
                ノビットスタディ 中高部は、教材開発者でもある塾長が、
                高校物理を中心に記述答案を毎日添削するオンライン学習管理塾です。
              </p>
            </div>
            <dl className="grid gap-3 rounded-[22px] bg-[#f8fafc] p-6 ring-1 ring-[rgba(15,29,74,0.06)] sm:grid-cols-2 sm:p-8">
              {trust.map((row) => (
                <div key={row.label} className="flex flex-col gap-1">
                  <dt className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[#0f766e]">
                    {row.label}
                  </dt>
                  <dd className="text-[0.94rem] leading-[1.85] text-[#0b1d4a]">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="cv-defer bg-[#f8fafc]">
        <Container className="px-5 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">
              FAQ · よくある質問
            </p>
            <h2 className="mt-3 text-[1.55rem] font-extrabold leading-[1.4] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2rem]">
              お申し込みの前に
            </h2>
            <ol className="mt-8 grid gap-4">
              {contactFaq.map((item) => (
                <li
                  key={item.question}
                  className="rounded-[16px] bg-white p-5 ring-1 ring-[rgba(15,29,74,0.06)] sm:p-6"
                >
                  <p className="flex items-start gap-2.5 text-[1rem] font-extrabold leading-[1.55] text-[#0b1d4a]">
                    <span
                      aria-hidden="true"
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#0d9488] text-[0.78rem] font-bold text-white"
                    >
                      Q
                    </span>
                    {item.question}
                  </p>
                  <p className="mt-3 border-t border-dotted border-[rgba(15,29,74,0.12)] pt-3 text-[0.92rem] leading-[2] text-[#334155]">
                    {item.answer}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                className="group/cta relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full px-8 text-[0.96rem] font-bold text-white shadow-[0_18px_38px_-14px_rgba(234,88,12,0.7)] transition hover:-translate-y-px"
                href={mailHref}
              >
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,#f97316_0%,#ea580c_100%)]" />
                <span className="relative">無料体験を申し込む</span>
              </a>
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#0b1d4a] px-8 text-[0.96rem] font-semibold text-[#0b1d4a] transition hover:bg-[#0b1d4a] hover:text-white"
              >
                サービス内容に戻る
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
