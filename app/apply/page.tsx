import type { Metadata } from "next";
import Link from "next/link";

import { ApplyForm } from "@/components/apply-form";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { PaymentTrust } from "@/components/payment-trust";
import { PricingTable, SubjectChips } from "@/components/pricing-table";
import { createPageMetadata } from "@/lib/metadata";
import { createBreadcrumbJsonLd, createOrganizationJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "料金・お申し込み｜教材を選んで買い切りではじめる",
  description:
    "ノビットスタディ 中高部の料金とお申し込み。教材ごとの買い切り（1教材 ¥14,800〜・約100回分の課題＋添削込み・入会金/追加費用0円）。8/6まで2教材以上でパック割。物理・化学・数学・英語の10教材から選ぶと買い切り価格が自動計算され、そのまま Stripe の安全な決済（一括）へ。自動更新はありません。",
  keywords: ["ノビットスタディ 料金", "オンライン添削 料金", "理系 添削 買い切り", "ノビットスタディ 申し込み"],
  path: "/apply",
});

const steps = [
  { n: "1", t: "教材を選ぶ", b: "やり切りたい教材だけ。あとから追加もOK。" },
  { n: "2", t: "決済（Stripe）", b: "買い切り価格が自動計算され、安全な決済画面へ。" },
  { n: "3", t: "アプリで開始", b: "登録後すぐ、公式アプリで学習を始められます。" },
];

const afterPurchaseSteps = [
  { n: "01", t: "決済完了", b: "Stripe の決済完了後、購入内容をもとに登録処理へ進みます。" },
  { n: "02", t: "メールで案内", b: "ログイン情報と開始方法を、申し込み時のメールアドレスへ送ります。" },
  { n: "03", t: "教材を自動反映", b: "選んだ教材がアプリに割り当てられ、課題を確認できます。" },
  { n: "04", t: "好きな時に開始", b: "PDFを開いて取り組み、提出すると次の範囲へ進めます。" },
];

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>;
}) {
  const { canceled } = await searchParams;
  const breadcrumb = createBreadcrumbJsonLd([
    { name: "ホーム", path: "/" },
    { name: "お申し込み", path: "/apply" },
  ]);

  return (
    <>
      <JsonLd data={[breadcrumb, createOrganizationJsonLd()]} />

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
              <li className="text-[#475569]">お申し込み</li>
            </ol>
          </nav>
          <div className="py-9 sm:py-12">
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.72rem] font-bold tracking-[0.06em] text-[#ea580c] ring-1 ring-[rgba(234,88,12,0.3)]">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#f97316]" />
              8/6まで 開講記念パック割・入会金0円
            </p>
            <h1 className="mt-4 text-[2rem] font-extrabold leading-[1.22] tracking-[-0.01em] text-[#0b1d4a] sm:text-[2.6rem]">
              教材を選んで、申し込む。
            </h1>
            <p className="mt-4 max-w-2xl text-[0.98rem] leading-[1.9] text-[#334155]">
              面談も勧誘もありません。やり切る教材を選ぶと買い切り価格が自動で決まり、そのまま安全な決済（一括）に進めます。
            </p>
            <ol className="mt-6 grid gap-3 sm:grid-cols-3">
              {steps.map((s) => (
                <li key={s.n} className="flex items-start gap-3 rounded-[14px] bg-white p-4 ring-1 ring-[rgba(15,29,74,0.06)]">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#0b1d4a] text-[0.8rem] font-extrabold text-white">
                    {s.n}
                  </span>
                  <span>
                    <span className="block text-[0.92rem] font-bold text-[#0b1d4a]">{s.t}</span>
                    <span className="mt-0.5 block text-[0.78rem] leading-[1.6] text-[#64748b]">{s.b}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* 料金の全体像（この申込ページに集約） */}
      <section id="pricing" className="scroll-mt-24 bg-white">
        <Container className="px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#ea580c]">
              Price · 料金・対応教材
            </p>
            <h2 className="mt-3 text-[1.6rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2rem]">
              8/6まで、期間限定パック割。
            </h2>
            <p className="mt-3 text-[0.95rem] leading-[1.9] text-[#475569]">
              入会金・追加費用は0円。理系を中心に10教材から、必要な教材だけ選べます。
              <strong className="font-bold text-[#ea580c]">2教材以上なら、期間限定のパック割が適用されます</strong>。
            </p>
          </div>
          <SubjectChips className="mx-auto mt-8 max-w-3xl" />
          <div className="mt-10">
            <PricingTable cta={{ href: "#form", label: "教材を選んでパック割を確認する" }} />
          </div>
          <div className="mx-auto mt-9 max-w-4xl rounded-[22px] bg-[#f8fafc] p-5 ring-1 ring-[rgba(15,29,74,0.08)] sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#0f766e]">
                  After purchase
                </p>
                <h3 className="mt-2 text-[1.25rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a]">
                  購入後の流れ
                </h3>
              </div>
              <p className="max-w-md text-[0.82rem] leading-[1.75] text-[#64748b]">
                決済後は、ログイン情報の案内と教材の割り当てまで自動で進みます。
              </p>
            </div>
            <ol className="mt-5 grid gap-3 sm:grid-cols-4">
              {afterPurchaseSteps.map((step) => (
                <li key={step.n} className="rounded-[16px] bg-white p-4 ring-1 ring-[rgba(15,29,74,0.06)]">
                  <span className="text-[0.68rem] font-extrabold tracking-[0.14em] text-[#0f766e]">
                    {step.n}
                  </span>
                  <span className="mt-2 block text-[0.92rem] font-extrabold text-[#0b1d4a]">{step.t}</span>
                  <span className="mt-1.5 block text-[0.76rem] leading-[1.65] text-[#64748b]">{step.b}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* 申込フォーム（教材選択→自動計算→決済） */}
      <section id="form" className="scroll-mt-24 bg-[#f8fafc]">
        <Container className="px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">
              Apply · 教材を選んで申し込む
            </p>
            <h2 className="mt-3 text-[1.6rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2rem]">
              やり切る教材を選ぶと、買い切り価格が決まります。
            </h2>
          </div>

          <ApplyForm canceled={Boolean(canceled)} />

          <div className="mt-10">
            <PaymentTrust />
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-[0.82rem] leading-[1.8] text-[#64748b]">
            ご不明な点は{" "}
            <Link href="/contact" className="font-semibold text-[#0f766e] underline-offset-2 hover:underline">
              質問・相談の窓口
            </Link>{" "}
            からどうぞ。お申し込みをもって、上記の各ポリシーに同意いただいたものとみなします。
          </p>
        </Container>
      </section>
    </>
  );
}
