import type { Metadata } from "next";
import Link from "next/link";

import { PurchaseEventTracker } from "@/components/analytics-events";
import { Container } from "@/components/container";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "お申し込み完了",
    description: "ノビットスタディ 中高部のお申し込みが完了しました。",
    path: "/apply/complete",
  }),
  robots: { index: false, follow: false },
};

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ApplyCompletePage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string | string[]; setup?: string | string[] }>;
}) {
  const params = await searchParams;
  const sessionId = firstParam(params.session_id) ?? null;
  const setupRequested = firstParam(params.setup) === "1";
  const appUrl = process.env.NOBIT_APP_URL?.replace(/\/$/, "");
  const setupHref =
    setupRequested && appUrl && sessionId
      ? `${appUrl}/setup?session_id=${encodeURIComponent(sessionId)}`
      : null;
  const isRedirectingToSetup = Boolean(setupHref);

  return (
    <section className="bg-[linear-gradient(180deg,#ffffff_0%,#eef6f6_100%)]">
      <PurchaseEventTracker sessionId={sessionId} redirectUrl={setupHref} />
      <Container className="px-6">
        <div className="mx-auto flex max-w-xl flex-col items-center py-20 text-center sm:py-28">
          {isRedirectingToSetup ? (
            <span className="relative grid h-16 w-16 place-items-center rounded-full bg-[#0b1d4a] text-white shadow-[0_18px_30px_-14px_rgba(11,29,74,0.55)]">
              <span className="absolute inset-0 rounded-full border-2 border-[#7dd3fc]/45 border-t-white animate-spin" />
              <span className="h-2.5 w-2.5 rounded-full bg-white" />
            </span>
          ) : (
            <span className="grid h-16 w-16 place-items-center rounded-full bg-[#16a34a] text-[1.8rem] text-white shadow-[0_18px_30px_-14px_rgba(22,163,74,0.6)]">
              ✓
            </span>
          )}
          <h1 className="mt-6 text-[1.8rem] font-extrabold leading-[1.3] tracking-[-0.01em] text-[#0b1d4a] sm:text-[2.2rem]">
            {isRedirectingToSetup ? "アプリの設定画面へ移動しています" : "お申し込み、ありがとうございます！"}
          </h1>
          <p className="mt-5 text-[0.98rem] leading-[1.95] text-[#334155]">
            {isRedirectingToSetup
              ? "決済の確認が完了しました。ログイン情報の発行を進めていますので、このまま少しだけお待ちください。"
              : "決済が完了しました。ご登録のメールアドレス宛に、公式アプリ「ノビットスタディ」のご案内とログイン情報をお送りします。届かない場合は迷惑メールフォルダもご確認ください。"}
          </p>
          <div className="mt-5 rounded-[16px] bg-white px-6 py-4 text-[0.86rem] leading-[1.8] text-[#475569] ring-1 ring-[rgba(15,29,74,0.08)]">
            {isRedirectingToSetup
              ? "数秒でノビットスタディの初期設定画面が開きます。切り替わらない場合は、下のボタンから進めます。"
              : "買い切りのお申し込みです。自動更新や継続課金はありません。教材は、1教材につき約100日分の課題と毎日の添削を順次お届けします。"}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {setupHref ? (
              <a
                href={setupHref}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0b1d4a] px-7 text-[0.95rem] font-semibold text-white transition hover:bg-[#0f5e5e]"
              >
                公式アプリを設定する
              </a>
            ) : null}
            <Link
              href="/"
              className={`inline-flex min-h-12 items-center justify-center rounded-full px-7 text-[0.95rem] font-semibold transition ${
                setupHref
                  ? "border border-[#0b1d4a] text-[#0b1d4a] hover:bg-[#0b1d4a] hover:text-white"
                  : "bg-[#0b1d4a] text-white hover:bg-[#0f5e5e]"
              }`}
            >
              トップへ戻る
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#0b1d4a] px-7 text-[0.95rem] font-semibold text-[#0b1d4a] transition hover:bg-[#0b1d4a] hover:text-white"
            >
              質問・相談する
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
