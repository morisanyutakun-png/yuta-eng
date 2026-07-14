import type { Metadata } from "next";
import Link from "next/link";

import { ApplyForm } from "@/components/apply-form";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { PaymentTrust } from "@/components/payment-trust";
import { PostPurchaseTeaser } from "@/components/post-purchase-flow";
import { PricingTable, SubjectChips } from "@/components/pricing-table";
import { TrialSection } from "@/components/trial-section";
import { createPageMetadata } from "@/lib/metadata";
import { createBreadcrumbJsonLd, createOrganizationJsonLd } from "@/lib/structured-data";
import { CAMPAIGN_DEADLINE_LABEL, CAMPAIGN_DEADLINE_SHORT_LABEL, formatYen, isValidSubjectId, packSavings } from "@/lib/pricing";

export const metadata: Metadata = createPageMetadata({
  title: "料金・お申し込み｜教材を選んで買い切りではじめる",
  description:
    `ノビットスタディ 中高部の料金とお申し込み。教材ごとの買い切り（開講記念 1教材 ¥9,800／通常 ¥14,800・約100回分の課題＋添削込み・入会金/追加費用0円）。${CAMPAIGN_DEADLINE_LABEL}まで開講記念価格、2教材以上はパック割。物理・化学・数学・英語の10教材から選ぶと買い切り価格が自動計算され、そのまま Stripe の安全な決済（一括）へ。自動更新はありません。`,
  keywords: ["ノビットスタディ 料金", "オンライン添削 料金", "理系 添削 買い切り", "ノビットスタディ 申し込み"],
  path: "/apply",
});

const steps = [
  { n: "1", t: "教材を選ぶ", b: "やり切りたい教材だけ。あとから追加もOK。" },
  { n: "2", t: "決済（Stripe）", b: "買い切り価格が自動計算され、安全な決済画面へ。" },
  { n: "3", t: "アプリで開始", b: "登録後すぐ、公式アプリで学習を始められます。" },
];

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string; u?: string; add?: string | string[] }>;
}) {
  const { canceled, u: upgradeToken, add } = await searchParams;

  // トップの教材カード「カートに入れる」から渡る事前選択（?add=math-1a など）。
  const initialSubjects = Array.from(
    new Set(
      (Array.isArray(add) ? add : add ? [add] : [])
        .flatMap((v) => v.split(","))
        .map((v) => v.trim())
        .filter(isValidSubjectId),
    ),
  );
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
            <p className="inline-flex max-w-full items-center gap-2 rounded-full bg-white px-3 py-1.5 text-center text-[0.68rem] font-bold leading-snug tracking-[0] text-[#ea580c] ring-1 ring-[rgba(234,88,12,0.3)] sm:px-3.5 sm:text-[0.72rem] sm:tracking-[0.06em]">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#f97316]" />
              <span className="sm:hidden">{CAMPAIGN_DEADLINE_SHORT_LABEL}まで パック割・入会金0円</span>
              <span className="hidden sm:inline">{CAMPAIGN_DEADLINE_LABEL}まで 開講記念パック割・入会金0円</span>
            </p>
            <h1 className="mt-4 text-[1.75rem] font-extrabold leading-[1.3] tracking-[0] text-[#0b1d4a] sm:text-[2.6rem] sm:leading-[1.22] sm:tracking-[-0.01em]">
              教材を選んで、申し込む。
            </h1>
            <p className="mt-4 max-w-2xl text-[0.9rem] leading-[1.75] text-[#334155] sm:text-[0.98rem] sm:leading-[1.9]">
              <span className="sm:hidden">教材を選ぶと、合計金額が自動で分かります。面談・勧誘はありません。</span>
              <span className="hidden sm:inline">
                面談も勧誘もありません。やり切る教材を選ぶと買い切り価格が自動で決まり、
                <br className="hidden lg:block" />
                そのまま<span className="whitespace-nowrap">安全な決済（一括）</span>に進めます。
              </span>
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
            <h2 className="mt-3 text-[1.42rem] font-extrabold leading-[1.45] tracking-[0] text-[#0b1d4a] sm:text-[2rem] sm:leading-[1.35] sm:tracking-[-0.005em]">
              <span className="sm:hidden">2教材で{formatYen(packSavings(2, true))}おトク。</span>
              <span className="hidden sm:inline">{CAMPAIGN_DEADLINE_LABEL}まで、2教材で{formatYen(packSavings(2, true))}おトク。</span>
            </h2>
            <p className="mt-3 text-[0.88rem] leading-[1.75] text-[#475569] sm:text-[0.95rem] sm:leading-[1.9]">
              <span className="sm:hidden">入会金・追加費用は0円。必要な教材だけ選べます。</span>
              <span className="hidden sm:inline">
                入会金・追加費用は0円。理系を中心に10教材から、必要な教材だけ選べます。
                <br className="hidden lg:block" />
                <strong className="font-bold text-[#ea580c]">2教材以上なら、期間限定のパック割が適用されます</strong>。
              </span>
            </p>
          </div>
          <SubjectChips className="mx-auto mt-8 max-w-3xl" />
          <div className="mt-10">
            <PricingTable cta={{ href: "#form", label: "教材を選んでパック割を確認する" }} />
          </div>
          <PostPurchaseTeaser className="mt-10" tone="warm" />
        </Container>
      </section>

      {/* 申込フォーム（教材選択→自動計算→決済） */}
      <section id="form" className="scroll-mt-24 bg-[#f8fafc]">
        <Container className="px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">
              Apply · 教材を選んで申し込む
            </p>
            <h2 className="mt-3 text-[1.42rem] font-extrabold leading-[1.45] tracking-[0] text-[#0b1d4a] sm:text-[2rem] sm:leading-[1.35] sm:tracking-[-0.005em]">
              やり切る教材を選ぶと、買い切り価格が決まります。
            </h2>
          </div>

          <ApplyForm
            canceled={Boolean(canceled)}
            upgradeToken={upgradeToken ?? null}
            initialSubjects={initialSubjects}
          />

          <div id="trial" className="mt-12 scroll-mt-24">
            <TrialSection />
          </div>

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
