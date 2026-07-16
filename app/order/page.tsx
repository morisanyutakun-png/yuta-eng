import type { Metadata } from "next";
import Link from "next/link";

import { ApplyForm } from "@/components/apply-form";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { PaymentTrust } from "@/components/payment-trust";
import { PricingTable, SubjectChips } from "@/components/pricing-table";
import { TrialSection } from "@/components/trial-section";
import { createPageMetadata } from "@/lib/metadata";
import { createBreadcrumbJsonLd, createOrganizationJsonLd } from "@/lib/structured-data";
import {
  CAMPAIGN_DEADLINE_LABEL,
  currentSinglePrice,
  formatYen,
  isValidSubjectId,
  MATERIAL_PRICE,
  TRIAL_CREDIT,
  TRIAL_PRICE,
} from "@/lib/pricing";
import { verifyUpgradeToken } from "@/lib/upgrade-token";

export const metadata: Metadata = createPageMetadata({
  title: "教材を選ぶ｜お試し¥1,980・買い切り¥9,800",
  description:
    `ノビットスタディ 中高部の申し込み。まずは添削3回のお試し ${formatYen(TRIAL_PRICE)}（続けるなら全額値引き）、または1教材ごとの買い切り（開講記念 ${formatYen(currentSinglePrice())}／通常 ${formatYen(MATERIAL_PRICE)}）。選ぶと合計が自動計算され、そのまま Stripe の安全な決済（一括）へ。入会金・追加費用0円、自動更新なし。面談・勧誘はありません。`,
  keywords: ["ノビットスタディ 申し込み", "オンライン添削 お試し", "教材 買い切り", "理系 添削 申し込み"],
  path: "/order",
});

// お試しと買い切りを1ページに集約した「教材を選ぶ」ページ。上に料金の読み物や
// 購入後の流れは置かず、「お試し or 買い切りを選ぶ → 合計自動計算 → 決済」に集中させる。
export default async function OrderPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string; u?: string; add?: string | string[] }>;
}) {
  const { canceled, u: upgradeToken, add } = await searchParams;

  const initialSubjects = Array.from(
    new Set(
      (Array.isArray(add) ? add : add ? [add] : [])
        .flatMap((v) => v.split(","))
        .map((v) => v.trim())
        .filter(isValidSubjectId),
    ),
  );

  // お試し→本契約のアップグレード（アプリの「本契約はこちら」から ?u=<署名> で着地）。
  const verifiedUpgrade = upgradeToken
    ? verifyUpgradeToken(upgradeToken, process.env.NOBIT_REGISTER_SECRET)
    : null;
  const isUpgrade = Boolean(verifiedUpgrade?.ok);

  const breadcrumb = createBreadcrumbJsonLd([
    { name: "ホーム", path: "/" },
    { name: "教材を選ぶ", path: "/order" },
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
              <li className="text-[#475569]">教材を選ぶ</li>
            </ol>
          </nav>
          <div className="pt-8 sm:pt-10">
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.72rem] font-bold text-[#ea580c] ring-1 ring-[rgba(234,88,12,0.3)]">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#f97316]" />
              お試し{formatYen(TRIAL_PRICE)}から／買い切り{formatYen(currentSinglePrice())}〜
            </p>
            <h1 className="mt-4 text-[1.6rem] font-extrabold leading-[1.3] tracking-[0] text-[#0b1d4a] sm:text-[2.4rem] sm:leading-[1.22]">
              教材を選んで、申し込む。
            </h1>
            <p className="mt-3 max-w-2xl text-[0.9rem] leading-[1.85] text-[#334155] sm:text-[0.98rem]">
              まずは{formatYen(TRIAL_PRICE)}のお試しから、または1教材まるごとの買い切りから。選ぶと合計が自動計算され、そのまま安全な決済（一括）へ進めます。面談・勧誘はありません。
            </p>
          </div>
        </Container>
      </section>

      {/* アップグレード案内（お試し→本契約・¥1,980引き）。アプリの「本契約はこちら」からのみ。 */}
      {isUpgrade ? (
        <section className="bg-[linear-gradient(120deg,#0b1d4a_0%,#0f5e5e_100%)]">
          <Container className="px-5 py-5 sm:px-6">
            <div className="mx-auto max-w-5xl text-center text-white sm:text-left">
              <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.16em] text-[#5eead4]">
                Upgrade · お試しからの本契約
              </p>
              <p className="mt-1 text-[1rem] font-extrabold leading-[1.5]">
                本コースが <span className="text-[#fdba74]">{formatYen(TRIAL_CREDIT)}引き</span> で申し込めます。下の「本コース」から教材を選んでお進みください（値引きは自動適用）。
              </p>
            </div>
          </Container>
        </section>
      ) : null}

      {/* ① お試し（おすすめ・まずはここから） */}
      <section id="trial" className="scroll-mt-24 bg-[#f8fafc]">
        <Container className="px-5 py-12 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 text-center">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#ea580c]">
                Plan A · おすすめの入口
              </p>
              <h2 className="mt-3 text-[1.4rem] font-extrabold leading-[1.45] text-[#0b1d4a] sm:text-[1.9rem]">
                いきなり買い切りは不安？ まず{formatYen(TRIAL_PRICE)}で。
              </h2>
              <p className="mt-3 text-[0.88rem] leading-[1.85] text-[#475569] sm:text-[0.95rem]">
                添削3回のお試しで、まず手応えを確かめられます。続けるなら、お試し代はまるごと値引き。
              </p>
            </div>
            <TrialSection />
          </div>
        </Container>
      </section>

      {/* ② 本コース（1教材まるごとの買い切り）＝ カート */}
      <section id="full" className="scroll-mt-24 bg-white">
        <Container className="px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#0f766e]">
              Plan B · 本コース（1教材まるごと）
            </p>
            <h2 className="mt-3 text-[1.4rem] font-extrabold leading-[1.45] text-[#0b1d4a] sm:text-[1.9rem]">
              じっくりやり切るなら、買い切り。
            </h2>
            <p className="mt-3 text-[0.88rem] leading-[1.85] text-[#475569] sm:text-[0.95rem]">
              1教材＝約100回分の演習＋添削。開講記念 {formatYen(currentSinglePrice())}（通常{formatYen(MATERIAL_PRICE)}）。
              <span className="font-bold text-[#ea580c]"> お試しから進む場合は{formatYen(TRIAL_CREDIT)}を値引き</span>。
              {CAMPAIGN_DEADLINE_LABEL}まで2教材以上はパック割。
            </p>
          </div>
          <SubjectChips className="mx-auto mt-8 max-w-3xl" />
          <div className="mt-10">
            <PricingTable />
          </div>

          {/* カート（教材選択→自動計算→決済） */}
          <div id="form" className="mt-12 scroll-mt-24">
            <ApplyForm
              canceled={Boolean(canceled)}
              upgradeToken={upgradeToken ?? null}
              initialSubjects={initialSubjects}
            />
          </div>

          <div className="mt-10">
            <PaymentTrust />
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-[0.82rem] leading-[1.8] text-[#64748b]">
            ご不明な点は{" "}
            <Link href="/contact" className="font-semibold text-[#0f766e] underline-offset-2 hover:underline">
              質問・相談の窓口
            </Link>{" "}
            からどうぞ。お申し込みをもって、各ポリシーに同意いただいたものとみなします。
          </p>
        </Container>
      </section>
    </>
  );
}
