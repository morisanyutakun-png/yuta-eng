import type { Metadata } from "next";
import Link from "next/link";

import { ApplyForm } from "@/components/apply-form";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { PaymentTrust } from "@/components/payment-trust";
import { createPageMetadata } from "@/lib/metadata";
import { createBreadcrumbJsonLd, createOrganizationJsonLd } from "@/lib/structured-data";
import {
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
    `ノビットスタディ 中高部の申し込み。教材ごとに「お試し ${formatYen(TRIAL_PRICE)}（添削3回）」か「買い切り ${formatYen(currentSinglePrice())}（通常 ${formatYen(MATERIAL_PRICE)}・約100回分）」を選べます。選ぶと合計が自動計算され、そのまま Stripe の安全な決済（一括）へ。入会金・追加費用0円、自動更新なし。面談・勧誘はありません。`,
  keywords: ["ノビットスタディ 申し込み", "オンライン添削 お試し", "教材 買い切り", "理系 添削 申し込み"],
  path: "/order",
});

// 「教材を選ぶ」＝お試し／買い切りが1つにまとまった商品棚のみのページ。
// 料金表やお試しの読み物カードは料金セクション（LP）に置き、ここは選んで買うことに集中させる。
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
          <div className="pt-8 pb-2 sm:pt-10">
            <h1 className="text-[1.6rem] font-extrabold leading-[1.3] tracking-[0] text-[#0b1d4a] sm:text-[2.3rem] sm:leading-[1.22]">
              教材を選んで、申し込む。
            </h1>
            <p className="mt-3 max-w-2xl text-[0.9rem] leading-[1.85] text-[#334155] sm:text-[0.98rem]">
              教材ごとに<span className="font-bold text-[#ea580c]">「お試し {formatYen(TRIAL_PRICE)}」</span>か
              <span className="font-bold text-[#0b1d4a]">「買い切り {formatYen(currentSinglePrice())}」</span>を選べます。
              選ぶと合計が自動計算され、そのまま安全な決済（一括）へ。面談・勧誘はありません。
              <Link href="/#pricing" className="ml-1 font-semibold text-[#0f766e] underline underline-offset-2">
                料金のくわしい説明はこちら
              </Link>
              。
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
                本コースが <span className="text-[#fdba74]">{formatYen(TRIAL_CREDIT)}引き</span> で申し込めます。下の商品棚から教材を「買い切り」でカートに入れてお進みください（値引きは自動適用）。
              </p>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="bg-[#f8fafc]">
        <Container className="px-5 py-10 sm:px-6 sm:py-14">
          <ApplyForm
            canceled={Boolean(canceled)}
            upgradeToken={upgradeToken ?? null}
            initialSubjects={initialSubjects}
          />

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
