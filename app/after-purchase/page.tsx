import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/container";
import { PageCtaRow, PrimaryCta, SecondaryCta } from "@/components/cta";
import { JsonLd } from "@/components/json-ld";
import { PostPurchaseFlow } from "@/components/post-purchase-flow";
import { createPageMetadata } from "@/lib/metadata";
import { createBreadcrumbJsonLd, createOrganizationJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = createPageMetadata({
  title: "購入後の流れ｜提出・自己採点・返却まで迷わない",
  description:
    "ノビットスタディ 中高部の購入後の流れ。Stripe決済完了後、ログインIDとPINが発行され、購入教材がアプリへ自動割り当てされます。PDFで実施・提出、提出後の自己採点、返却・再提出、レポートまで画面で確認できます。",
  keywords: ["ノビットスタディ 購入後", "ログイン情報 発行", "教材 自動割り当て", "PDF 提出 添削"],
  path: "/after-purchase",
});

const assurancePoints = [
  {
    title: "ログイン情報は決済後すぐ",
    body: "決済完了後の画面にIDとPINを表示。同じ内容はメールにも届くので、あとから確認できます。",
  },
  {
    title: "購入教材がアプリに反映",
    body: "選んだ教材に合わせて、最初の課題と教材別の現在地がダッシュボードに表示されます。",
  },
  {
    title: "提出後すぐ振り返れる",
    body: "提出すると解答解説PDFで自己採点へ。先生の添削・再提出は返却タブで並行して確認できます。",
  },
];

export default function AfterPurchasePage() {
  return (
    <>
      <JsonLd
        data={[
          createBreadcrumbJsonLd([
            { name: "ホーム", path: "/" },
            { name: "購入後の流れ", path: "/after-purchase" },
          ]),
          createOrganizationJsonLd(),
        ]}
      />

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f3f8ff_100%)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(52% 44% at 9% 5%, rgba(249,115,22,0.13), transparent 62%), radial-gradient(54% 48% at 92% 12%, rgba(13,148,136,0.16), transparent 64%), linear-gradient(rgba(15,29,74,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15,29,74,0.045) 1px, transparent 1px)",
            backgroundSize: "auto, auto, 30px 30px, 30px 30px",
          }}
        />
        <Container className="relative px-6">
          <nav aria-label="パンくずリスト" className="pt-7 text-[0.78rem] text-[#94a3b8] sm:pt-9">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link className="transition hover:text-[#0f766e]" href="/">
                  ホーム
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#cbd5e1]">/</li>
              <li className="text-[#475569]">購入後の流れ</li>
            </ol>
          </nav>

          <div className="grid items-center gap-10 py-10 sm:py-16 lg:grid-cols-[1fr_0.9fr] lg:py-20">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-[0.72rem] font-extrabold tracking-[0.08em] text-[#ea580c] shadow-[0_8px_20px_-12px_rgba(234,88,12,0.45)] ring-1 ring-[rgba(234,88,12,0.2)]">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#f97316]" />
                After purchase · 購入後の流れ
              </p>
              <h1 className="mt-5 text-balance text-[2.25rem] font-extrabold leading-[1.13] tracking-[-0.025em] text-[#0b1d4a] sm:text-[3rem]">
                購入後も、
                <br />
                画面の案内で進める。
              </h1>
              <p className="mt-5 max-w-2xl text-[1rem] leading-[1.95] text-[#334155]">
                購入したあとに「何をすればいいか」で止まらないように。
                ログイン情報の発行、購入教材の自動割り当て、PDFでの実施・提出、自己採点、返却確認までを、実際のアプリ画面に沿って案内します。
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <PrimaryCta href="/apply">教材を選んではじめる</PrimaryCta>
                <SecondaryCta href="/apply#pricing">料金・教材を見る</SecondaryCta>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full bg-[#f97316]/16 blur-2xl" />
              <div className="relative overflow-hidden rounded-[26px] bg-[#0b1d4a] p-5 text-white shadow-[0_34px_82px_-50px_rgba(11,29,74,0.7)]">
                <p className="text-[0.72rem] font-extrabold tracking-[0.18em] text-[#fdba74]">CHECK POINT</p>
                <div className="mt-4 grid gap-3">
                  {assurancePoints.map((point, index) => (
                    <section key={point.title} className="rounded-[16px] bg-white/[0.08] p-4 ring-1 ring-white/10">
                      <p className="flex items-center gap-2 text-[0.95rem] font-extrabold">
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[0.76rem] font-black text-[#0b1d4a]">
                          {index + 1}
                        </span>
                        {point.title}
                      </p>
                      <p className="mt-2 text-[0.82rem] leading-[1.8] text-white/80">{point.body}</p>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#f8fafc]">
        <Container className="px-6 py-12 sm:py-16">
          <PostPurchaseFlow variant="lp" />
        </Container>
      </section>

      <section className="bg-white">
        <Container className="px-6 py-12 sm:py-16">
          <PageCtaRow
            title="流れが見えたら、教材を選ぶだけ。"
            note="購入後はログイン情報の発行から教材の反映までつながります。あとは、やり切る教材を選んで決済へ進んでください。"
          />
        </Container>
      </section>
    </>
  );
}
