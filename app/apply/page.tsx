import type { Metadata } from "next";
import Link from "next/link";

import { ApplyForm } from "@/components/apply-form";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { createPageMetadata } from "@/lib/metadata";
import { createBreadcrumbJsonLd, createOrganizationJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "お申し込み｜科目を選んで初月半額ではじめる",
  description:
    "ノビットスタディ 中高部のお申し込み。物理・化学・数学・英語の9科目から必要な分だけ選ぶと、料金が自動計算され、そのまま Stripe の安全な決済へ。初月半額・入会金/教材費0円、いつでも解約できます。",
  keywords: ["ノビットスタディ 申し込み", "オンライン添削 申し込み", "理系 添削 月額"],
  path: "/apply",
});

const steps = [
  { n: "1", t: "科目を選ぶ", b: "必要な科目だけ。あとから追加・解約もOK。" },
  { n: "2", t: "決済（Stripe）", b: "金額が自動計算され、安全な決済画面へ。" },
  { n: "3", t: "アプリで開始", b: "登録後すぐ、公式アプリで学習を始められます。" },
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
              いまなら初月半額・入会金0円
            </p>
            <h1 className="mt-4 text-[2rem] font-extrabold leading-[1.22] tracking-[-0.01em] text-[#0b1d4a] sm:text-[2.6rem]">
              科目を選んで、申し込む。
            </h1>
            <p className="mt-4 max-w-2xl text-[0.98rem] leading-[1.9] text-[#334155]">
              面談も勧誘もありません。必要な科目を選ぶと料金が自動で決まり、そのまま安全な決済に進めます。
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

      <section className="bg-[#f8fafc]">
        <Container className="px-5 py-10 sm:px-6 sm:py-14">
          <ApplyForm canceled={Boolean(canceled)} />
          <p className="mx-auto mt-8 max-w-3xl text-center text-[0.82rem] leading-[1.8] text-[#64748b]">
            ご不明な点は{" "}
            <Link href="/contact" className="font-semibold text-[#0f766e] underline-offset-2 hover:underline">
              質問・相談の窓口
            </Link>{" "}
            からどうぞ。料金や対応科目は{" "}
            <Link href="/#pricing" className="font-semibold text-[#0f766e] underline-offset-2 hover:underline">
              料金・対応科目
            </Link>{" "}
            もご覧ください。
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-center text-[0.78rem] leading-[1.8] text-[#94a3b8]">
            お申し込みの前に{" "}
            <Link href="/legal/tokushoho" className="underline underline-offset-2 hover:text-[#0f766e]">
              特定商取引法に基づく表記
            </Link>
            ・
            <Link href="/legal/refund" className="underline underline-offset-2 hover:text-[#0f766e]">
              返金・解約ポリシー
            </Link>
            ・
            <Link href="/legal/privacy" className="underline underline-offset-2 hover:text-[#0f766e]">
              プライバシーポリシー
            </Link>
            をご確認ください。お申し込みをもって、これらに同意いただいたものとみなします。
          </p>
        </Container>
      </section>
    </>
  );
}
