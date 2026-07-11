import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";
import { CAMPAIGN_DEADLINE_LABEL, formatYen, packSavings, PACK_UNIT_SAVINGS } from "@/lib/pricing";
import {
  createBreadcrumbJsonLd,
  createContactPageJsonLd,
  createFaqJsonLd,
  createOrganizationJsonLd,
} from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "お申し込み・ご相談｜買い切りではじめる",
  description:
    `ノビットスタディ 中高部のお申し込み・ご相談ページ。物理・化学・数学・英語の答案を添削する、授業をしないオンライン添削塾です。教材ごとの買い切り（1教材 ¥14,800〜・約100回分の課題＋添削込み・入会金0円）、${CAMPAIGN_DEADLINE_LABEL}まで2教材以上でパック割。面談や勧誘は一切ありません。お気軽にお申し込み・ご相談ください。`,
  keywords: [
    "ノビットスタディ 申し込み",
    "オンライン添削塾 申し込み",
    "理系 添削 申し込み",
    "高校生 添削 オンライン",
    "添削 アプリ 保護者",
  ],
  path: "/contact",
});

const canDo = [
  {
    title: "教材を選んで、すぐ始められる",
    body: "物理・化学・数学・英語の10教材から、やり切る分だけ。教材ごとの買い切りで、あとから追加もできます。",
  },
  {
    title: "提出した答案に添削が返る",
    body: "提出した答案に、途中式・考え方・減点ポイントまで踏み込んだ添削をお返しします。授業はありません。",
  },
  {
    title: "アプリで進捗が見える",
    body: "課題・提出・添削・進捗を公式アプリに集約。生徒アカウントの画面を家でも確認できるので、面談がなくても見守りやすいです。",
  },
];

const trust = [
  { label: "サービス形態", value: "オンライン添削・学習管理塾（添削専門）" },
  { label: "塾長", value: siteConfig.author },
  { label: "対応教材", value: "物理・化学・数学・英語（10教材／教材ごとに選択）" },
  { label: "料金", value: `1教材 買い切り¥14,800〜・${CAMPAIGN_DEADLINE_LABEL}までパック割・入会金/追加費用0円` },
  { label: "対象", value: "高校生・高卒生（中高一貫の高校範囲も相談可）" },
  { label: "返信目安", value: "1〜2 営業日以内（面談・勧誘なし）" },
];

const contactFaq = [
  {
    question: "開講記念パック割とは？ どのくらいで始められますか？",
    answer:
      `2教材以上を同時にお申し込みの場合、1教材あたり ¥12,400（通常より1教材あたり ${formatYen(PACK_UNIT_SAVINGS)} OFF、例：2教材 ¥24,800）になる開講記念のパック割です（${CAMPAIGN_DEADLINE_LABEL}まで）。入会金・追加費用はかかりません。お申し込み後、購入した教材からすぐに学習を開始できます。`,
  },
  {
    question: "面談や授業はありますか？ 勧誘されませんか？",
    answer:
      "ノビットスタディは添削専門の学習管理塾です。面談や授業（ライブ指導）、電話・対面での勧誘は一切行っていません。教材演習に提出ごとの添削を返す形で、自立した学びを支えます。",
  },
  {
    question: "料金と対応教材は？",
    answer:
      `料金は教材（講座）ごとの買い切りです。1教材 ¥14,800（約100回分の課題＋添削込み）。${CAMPAIGN_DEADLINE_LABEL}まで、2教材以上は開講記念パック割で1教材あたり ¥12,400（2教材で${formatYen(packSavings(2, true))}おトク、例：2教材 ¥24,800）。対応教材は物理 基礎・物理 標準・物理 発展・化学基礎・化学・数学IA・IIBC・IIIC・英語長文・英文法です。`,
  },
  {
    question: "保護者も進捗を確認できますか？",
    answer:
      "はい。公式アプリ「ノビットスタディ」で、提出数・添削完了・連続日数などを見える化しています。ご家庭でも生徒アカウントの画面を確認すれば、お子さまの進捗を一緒に見守れます。",
  },
];

export default function ContactPage() {
  const breadcrumb = createBreadcrumbJsonLd([
    { name: "ホーム", path: "/" },
    { name: "お申し込み・相談", path: "/contact" },
  ]);
  const contactPageJsonLd = createContactPageJsonLd();
  const orgJsonLd = createOrganizationJsonLd();
  const faqJsonLd = createFaqJsonLd(contactFaq);

  const subject = encodeURIComponent("[お申し込み・相談] ノビットスタディへのお問い合わせ");
  const body = encodeURIComponent(
    "▼ご記入ください\n・学年（例：高2）：\n・志望校／目標（任意）：\n・希望教材（物理 基礎／物理 標準／物理 発展／化学／数学IA・IIBC・IIIC／英語長文／英文法 から）：\n・いまの悩み：\n",
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
              <li className="text-[#475569]">お申し込み・相談</li>
            </ol>
          </nav>
          <div className="py-10 sm:py-14 lg:py-16">
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#ea580c] ring-1 ring-[rgba(234,88,12,0.3)]">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#f97316]" />
              {CAMPAIGN_DEADLINE_LABEL}まで 開講記念パック割・入会金0円
            </p>
            <h1 className="mt-5 text-balance text-[2.05rem] font-extrabold leading-[1.22] tracking-[-0.01em] text-[#0b1d4a] sm:text-[2.7rem] sm:leading-[1.18] lg:text-[3rem]">
              買い切りで、
              <br className="hidden sm:block" />
              ノビットを始める。
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-[1rem] leading-[1.95] text-[#334155] sm:text-[1.06rem]">
              物理・化学・数学・英語の答案を、添削する授業をしないオンライン塾です。
              面談や勧誘は一切ありません。下記から、希望の教材を添えてお気軽にお申し込み・ご相談ください。
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <a
                href={mailHref}
                className="group/cta relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-7 text-[0.98rem] font-bold text-white shadow-[0_18px_38px_-14px_rgba(234,88,12,0.7)] transition hover:-translate-y-px"
              >
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,#f97316_0%,#ea580c_100%)]" />
                <span className="relative">メールで申し込む（買い切り）</span>
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

      {/* 始めると、できること */}
      <section className="bg-[#f8fafc]">
        <Container className="px-5 py-12 sm:px-6 sm:py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">
              Start · 始めると、できること
            </p>
            <h2 className="mt-3 text-[1.55rem] font-extrabold leading-[1.4] tracking-[-0.005em] text-[#0b1d4a] sm:text-[1.95rem]">
              選んで、出して、添削。
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
                物理・化学・数学・英語の答案を添削するオンライン添削塾です。
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
                <span className="relative">買い切りで申し込む</span>
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
