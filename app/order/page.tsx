import type { Metadata } from "next";
import Link from "next/link";

import { ApplyForm } from "@/components/apply-form";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { PaymentTrust } from "@/components/payment-trust";
import { createPageMetadata } from "@/lib/metadata";
import { createBreadcrumbJsonLd, createOrganizationJsonLd } from "@/lib/structured-data";
import { CAMPAIGN_DEADLINE_LABEL, currentSinglePrice, formatYen, isValidSubjectId, MATERIAL_PRICE, PACK_UNIT_PRICE } from "@/lib/pricing";

export const metadata: Metadata = createPageMetadata({
  title: "教材を選んでカートに入れる｜買い切りで申し込む",
  description:
    `ノビットスタディ 中高部の教材を選んで買い切りで申し込むカート。1教材 開講記念 ${formatYen(currentSinglePrice())}（通常 ${formatYen(MATERIAL_PRICE)}）、2教材以上は1教材 ${formatYen(PACK_UNIT_PRICE)}（${CAMPAIGN_DEADLINE_LABEL}まで）。選ぶと合計が自動計算され、そのまま Stripe の安全な決済（一括）へ。入会金・追加費用0円、自動更新なし。`,
  keywords: ["ノビットスタディ 申し込み", "教材 買い切り", "オンライン添削 申し込み"],
  path: "/order",
});

// 買い物だけに集中する独立ページ。料金の説明や購入後の流れは置かず、
// 「教材を選ぶ → 合計自動計算 → 決済」だけをスムーズに。上に余計な導線を置かない。
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

  const breadcrumb = createBreadcrumbJsonLd([
    { name: "ホーム", path: "/" },
    { name: "料金・お試し", path: "/apply" },
    { name: "教材を選ぶ", path: "/order" },
  ]);

  return (
    <>
      <JsonLd data={[breadcrumb, createOrganizationJsonLd()]} />

      <section className="bg-[#f8fafc]">
        <Container className="px-5 py-8 sm:px-6 sm:py-12">
          <nav aria-label="パンくずリスト" className="text-[0.78rem] text-[#94a3b8]">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link className="transition hover:text-[#0f766e]" href="/">
                  ホーム
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#cbd5e1]">/</li>
              <li>
                <Link className="transition hover:text-[#0f766e]" href="/apply">
                  料金・お試し
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#cbd5e1]">/</li>
              <li className="text-[#475569]">教材を選ぶ</li>
            </ol>
          </nav>

          <div className="mt-5 mb-8 max-w-2xl">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#0f766e]">
              Cart · 教材を選んで申し込む
            </p>
            <h1 className="mt-2 text-[1.5rem] font-extrabold leading-[1.35] tracking-[0] text-[#0b1d4a] sm:text-[2.1rem] sm:leading-[1.25]">
              教材を選ぶと、買い切り価格が決まります。
            </h1>
            <p className="mt-3 text-[0.88rem] leading-[1.85] text-[#475569] sm:text-[0.95rem]">
              やり切る教材だけ選べば、合計が自動計算。そのまま安全な決済（一括）へ進めます。面談・勧誘はありません。
            </p>
          </div>

          <ApplyForm
            canceled={Boolean(canceled)}
            upgradeToken={upgradeToken ?? null}
            initialSubjects={initialSubjects}
          />

          <div className="mt-10">
            <PaymentTrust />
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-[0.82rem] leading-[1.8] text-[#64748b]">
            まず少しだけ試したい方は{" "}
            <Link href="/apply#trial" className="font-semibold text-[#ea580c] underline-offset-2 hover:underline">
              ¥1,980のお試し
            </Link>{" "}
            もあります。ご不明な点は{" "}
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
