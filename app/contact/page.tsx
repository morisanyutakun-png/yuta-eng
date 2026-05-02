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
  title: "お問い合わせ｜EdTech SaaS／物理講座の外注",
  description:
    "Solvora の窓口は、(1) AI×LaTeX 教材作成「Eddivom」など EdTech SaaS の取材・パートナー連携・機能要望、(2) 高校物理講座の外注（物理の森への取り次ぎ）の 2 種類のみ。汎用的な EdTech 導入コンサルや学習相談は受け付けていません。理系人材育成 SaaS の Solvora が運営。",
  keywords: [
    "Solvora 問い合わせ",
    "EdTech SaaS 問い合わせ",
    "教育 SaaS 取材",
    "Eddivom 法人問い合わせ",
    "AI 教材作成 SaaS パートナー",
    "理系人材育成 EdTech 取材",
    "EdTech スタートアップ 取材",
    "物理講座 外注",
    "高校物理 講師 業務委託",
    "物理 教材 外注",
  ],
  path: "/contact",
});

const lanes = [
  {
    eyebrow: "Lane A · SaaS",
    badgeBg: "#1d4ed8",
    title: "EdTech SaaS のお問い合わせ",
    body: "AI×LaTeX 教材作成 SaaS『Eddivom』、高校物理アプリ『Physics』、ITパスポート アプリ『IT Pass』に関する内容のみ。法人 / メディア / 個人いずれも歓迎します。",
    bullets: [
      "Eddivom など SaaS の機能要望・不具合報告・サポート",
      "メディア取材・寄稿・登壇のご依頼",
      "EdTech / 教育 SaaS パートナー連携・OEM・代理店相談",
      "学校・予備校・教材会社からの SaaS 一括導入の見積依頼",
    ],
    cta: { label: "SaaS の問い合わせを送る", href: `mailto:${siteConfig.email}?subject=%5BSaaS%5D%20Solvora%20%E3%81%B8%E3%81%AE%E3%81%8A%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B` },
    secondary: { label: "サービス一覧を見る", href: "/apps" },
  },
  {
    eyebrow: "Lane B · 物理講座 外注",
    badgeBg: "#0f1c3a",
    title: "高校物理講座の外注（物理の森が受託）",
    body: "高校・予備校・通信教育・教材会社からの『高校物理 講師業務の業務委託 / 講座外注 / 教材監修』はすべて Solvora 直営の物理専門塾『物理の森』が受託します。Solvora 本体では受け付けていません。",
    bullets: [
      "高校物理（力学・電磁気・波動・熱・原子）の講座コマ外注",
      "定期テスト・共通テスト・国公立二次・私大入試の対策講座外注",
      "物理問題の解説執筆・教材監修・模試解答制作",
      "高校生向け個別指導の受講相談（物理の森公式サイトから）",
    ],
    cta: { label: "物理の森の窓口を開く", href: siteConfig.physicsSchoolUrl, external: true },
    secondary: null as { label: string; href: string } | null,
  },
];

const trust = [
  { label: "事業形態", value: "EdTech スタートアップ／個人事業" },
  { label: "代表", value: siteConfig.author },
  { label: "対応領域", value: "AI 教材作成 SaaS、学習支援 SaaS、高校物理講座（外注は物理の森）" },
  { label: "対応地域", value: "日本全国（オンライン）" },
  { label: "返信目安", value: "1 営業日以内（土日祝は翌営業日）" },
  { label: "対応言語", value: "日本語（英語は要相談）" },
];

const notAccepted = [
  "汎用的な『EdTech 導入相談』『教育コンサル』",
  "個人の学習相談（高校物理の受講相談は物理の森の公式サイトから）",
  "営業電話・無差別 BtoB 営業メール",
  "Solvora と関係のない教材・教育サービスの宣伝依頼",
];

const contactFaq = [
  {
    question: "Solvora に EdTech 導入のコンサルや、学校・自治体向けの教育DX 相談はできますか？",
    answer:
      "Solvora は EdTech SaaS を提供する立場で、汎用的な EdTech 導入コンサル・教育DX コンサルは受け付けていません。Eddivom など Solvora の SaaS を導入したい、複数ライセンスで使いたい、API パートナーになりたい等の場合は Lane A の窓口からご連絡ください。",
  },
  {
    question: "Eddivom（AI 教材作成 SaaS）の機能要望や不具合報告はどこに送ればいい？",
    answer:
      "Solvora 本体の Contact メールで受け付けています。再現手順・スクリーンショット・ご利用環境（OS / ブラウザ）を添えてお送りください。重大な不具合は最優先で対応します。",
  },
  {
    question: "高校物理の受講相談や個別指導の依頼はできますか？",
    answer:
      "Solvora 本体では受け付けていません。受講相談・個別指導・物理講座の外注はすべて Solvora 直営の物理専門塾『物理の森』が受託します。Lane B のリンクから物理の森の公式サイトへお進みください。",
  },
  {
    question: "返信はどれくらいで届きますか？",
    answer:
      "初回返信は 1 営業日以内が目安です。土日祝に送付された場合は翌営業日になることがあります。営業メール・関係のない宣伝への返信は行っていません。",
  },
  {
    question: "メディア取材・寄稿・登壇の依頼はどこから？",
    answer:
      "Lane A の窓口からご連絡ください。テーマ（理系人材育成 / EdTech SaaS / AI 教材作成 / 高校物理 等）、想定読者、媒体名、希望日程を添えていただければ調整がスムーズです。",
  },
];

export default function ContactPage() {
  const breadcrumb = createBreadcrumbJsonLd([
    { name: "ホーム", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);
  const contactPageJsonLd = createContactPageJsonLd();
  const orgJsonLd = createOrganizationJsonLd();
  const faqJsonLd = createFaqJsonLd(contactFaq);

  const subjectSaas = encodeURIComponent("[SaaS] Solvora へのお問い合わせ");
  const subjectPhysics = encodeURIComponent("[物理講座 外注] お問い合わせ");

  return (
    <>
      <JsonLd data={[contactPageJsonLd, orgJsonLd, breadcrumb, faqJsonLd]} />

      {/* HERO — clear positioning: SaaS-first, two lanes only */}
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
              <li className="text-[#475569]">Contact</li>
            </ol>
          </nav>
          <div className="py-10 sm:py-16 lg:py-20">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8] sm:text-[0.78rem]">
              Contact · EdTech SaaS / 理系人材育成
            </p>
            <h1 className="mt-4 text-balance text-[2.05rem] font-extrabold leading-[1.22] tracking-[-0.01em] text-[#0b1d4a] sm:text-[2.7rem] sm:leading-[1.18] lg:text-[3.1rem]">
              Solvora の窓口は、
              <br className="hidden sm:block" />
              SaaS と物理講座 外注の 2 つだけ。
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-[1rem] leading-[1.95] text-[#334155] sm:text-[1.08rem]">
              Solvora は <strong className="font-bold text-[#0b1d4a]">理系人材育成 EdTech SaaS</strong>{" "}
              を開発する EdTech スタートアップです。お問い合わせは下記 2 種類のみ受け付けています。
              個人の学習相談・汎用的な EdTech 導入コンサルは受け付けていません。
            </p>
            {/* Pills: clarify the 2 lanes inline so users self-select instantly */}
            <ul className="mt-7 flex flex-wrap gap-2.5">
              <li>
                <a
                  href="#lane-saas"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0b1d4a] px-4 py-2 text-[0.86rem] font-semibold text-white transition hover:bg-[#1e3a8a]"
                >
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#bae6fd]" />
                  Lane A · SaaS のお問い合わせ
                </a>
              </li>
              <li>
                <a
                  href="#lane-physics"
                  className="inline-flex items-center gap-2 rounded-full border border-[#0b1d4a] bg-white px-4 py-2 text-[0.86rem] font-semibold text-[#0b1d4a] transition hover:bg-[#0b1d4a] hover:text-white"
                >
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#1d4ed8]" />
                  Lane B · 物理講座の外注
                </a>
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* TWO LANES */}
      <section className="bg-[#f8fafc]">
        <Container className="px-5 py-12 sm:px-6 sm:py-16 lg:py-20">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-7">
            {lanes.map((lane, idx) => {
              const isSaaS = idx === 0;
              const anchor = isSaaS ? "lane-saas" : "lane-physics";
              const subject = isSaaS ? subjectSaas : subjectPhysics;
              const ctaHref = isSaaS
                ? `mailto:${siteConfig.email}?subject=${subject}`
                : lane.cta.href;

              return (
                <article
                  key={lane.title}
                  id={anchor}
                  className="scroll-mt-24 rounded-[24px] bg-white p-7 ring-1 ring-[rgba(15,29,74,0.08)] shadow-[0_24px_50px_-38px_rgba(15,29,74,0.4)] sm:rounded-[28px] sm:p-9"
                >
                  <span
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white sm:text-[0.74rem]"
                    style={{ background: lane.badgeBg }}
                  >
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/70" />
                    {lane.eyebrow}
                  </span>
                  <h2 className="mt-4 text-balance text-[1.4rem] font-extrabold leading-[1.4] tracking-[-0.005em] text-[#0b1d4a] sm:text-[1.6rem]">
                    {lane.title}
                  </h2>
                  <p className="mt-3 text-[0.95rem] leading-[1.95] text-[#334155]">
                    {lane.body}
                  </p>

                  <ul className="mt-5 grid gap-2.5">
                    {lane.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-[0.92rem] leading-[1.85] text-[#0b1d4a]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: lane.badgeBg }}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                    {lane.cta.external ? (
                      <a
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.94rem] font-semibold tracking-[0.02em] text-white transition hover:-translate-y-0.5"
                        href={ctaHref}
                        rel="noreferrer noopener"
                        target="_blank"
                        style={{ background: lane.badgeBg }}
                      >
                        {lane.cta.label} <span aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <a
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.94rem] font-semibold tracking-[0.02em] text-white transition hover:-translate-y-0.5"
                        href={ctaHref}
                        style={{ background: lane.badgeBg }}
                      >
                        {lane.cta.label}
                      </a>
                    )}
                    {lane.secondary ? (
                      <Link
                        href={lane.secondary.href}
                        className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#0b1d4a] px-6 text-[0.94rem] font-semibold tracking-[0.02em] text-[#0b1d4a] transition hover:bg-[#0b1d4a] hover:text-white"
                      >
                        {lane.secondary.label}
                      </Link>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* TRUST · 運営者・対応領域（EEAT 強化） */}
      <section className="cv-defer bg-white">
        <Container className="px-5 py-14 sm:px-6 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
            <div>
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
                Trust · 運営情報
              </p>
              <h2 className="mt-3 text-[1.55rem] font-extrabold leading-[1.4] tracking-[-0.005em] text-[#0b1d4a] sm:text-[1.95rem]">
                信頼してご連絡いただくために
              </h2>
              <p className="mt-4 text-[0.94rem] leading-[1.95] text-[#475569]">
                Solvora は、理系人材育成のための EdTech SaaS を提供する{" "}
                <strong className="font-bold text-[#0b1d4a]">EdTech スタートアップ</strong>。
                {" "}
                直営の物理専門塾「物理の森」と合わせて、AI 教材作成・学習支援アプリ・物理教育の 3 領域を運営しています。
              </p>
            </div>
            <dl className="grid gap-3 rounded-[22px] bg-[#f8fafc] p-6 ring-1 ring-[rgba(15,29,74,0.06)] sm:grid-cols-2 sm:p-8">
              {trust.map((row) => (
                <div key={row.label} className="flex flex-col gap-1">
                  <dt className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#1d4ed8]">
                    {row.label}
                  </dt>
                  <dd className="text-[0.94rem] leading-[1.85] text-[#0b1d4a]">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* SCOPE · 受け付けないもの（透明性 + ボリューム削減） */}
      <section className="cv-defer bg-[#f8fafc]">
        <Container className="px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#b45309]">
              Out of Scope · 受け付けていないもの
            </p>
            <h2 className="mt-3 text-[1.4rem] font-extrabold leading-[1.4] tracking-[-0.005em] text-[#0b1d4a] sm:text-[1.7rem]">
              この 4 つは、別の窓口へどうぞ
            </h2>
            <p className="mt-3 text-[0.92rem] leading-[1.95] text-[#475569]">
              Solvora は SaaS 開発と物理講座の外注に集中しています。下記は対応しません。
            </p>
            <ul className="mt-6 grid gap-3">
              {notAccepted.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-[14px] bg-white p-4 ring-1 ring-[rgba(180,83,9,0.18)] sm:p-5"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.1em] grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#fef3c7] text-[0.78rem] font-bold text-[#92400e]"
                  >
                    !
                  </span>
                  <span className="text-[0.92rem] leading-[1.85] text-[#0b1d4a]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="cv-defer bg-white">
        <Container className="px-5 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#1d4ed8]">
              FAQ · よくある質問
            </p>
            <h2 className="mt-3 text-[1.55rem] font-extrabold leading-[1.4] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2rem]">
              お問い合わせの前に
            </h2>
            <ol className="mt-8 grid gap-4">
              {contactFaq.map((item) => (
                <li
                  key={item.question}
                  className="rounded-[16px] bg-[#f8fafc] p-5 ring-1 ring-[rgba(15,29,74,0.06)] sm:p-6"
                >
                  <p className="flex items-start gap-2.5 text-[1rem] font-extrabold leading-[1.55] text-[#0b1d4a]">
                    <span
                      aria-hidden="true"
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#1d4ed8] text-[0.78rem] font-bold text-white"
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

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0b1d4a] px-7 text-[0.95rem] font-semibold tracking-[0.02em] text-white transition hover:bg-[#1e3a8a]"
                href={`mailto:${siteConfig.email}?subject=${subjectSaas}`}
              >
                SaaS の問い合わせを送る
              </a>
              <a
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#0b1d4a] px-7 text-[0.95rem] font-semibold tracking-[0.02em] text-[#0b1d4a] transition hover:bg-[#0b1d4a] hover:text-white"
                href={siteConfig.physicsSchoolUrl}
                rel="noreferrer noopener"
                target="_blank"
              >
                物理の森の窓口を開く ↗
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
