import type { Metadata } from "next";
import Link from "next/link";

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

export default function ApplyCompletePage() {
  return (
    <section className="bg-[linear-gradient(180deg,#ffffff_0%,#eef6f6_100%)]">
      <Container className="px-6">
        <div className="mx-auto flex max-w-xl flex-col items-center py-20 text-center sm:py-28">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-[#16a34a] text-[1.8rem] text-white shadow-[0_18px_30px_-14px_rgba(22,163,74,0.6)]">
            ✓
          </span>
          <h1 className="mt-6 text-[1.8rem] font-extrabold leading-[1.3] tracking-[-0.01em] text-[#0b1d4a] sm:text-[2.2rem]">
            お申し込み、ありがとうございます！
          </h1>
          <p className="mt-5 text-[0.98rem] leading-[1.95] text-[#334155]">
            決済が完了しました。ご登録のメールアドレス宛に、公式アプリ「ノビットスタディ」の
            ご案内とログイン情報をお送りします。届かない場合は迷惑メールフォルダもご確認ください。
          </p>
          <div className="mt-5 rounded-[16px] bg-white px-6 py-4 text-[0.86rem] leading-[1.8] text-[#475569] ring-1 ring-[rgba(15,29,74,0.08)]">
            買い切りのお申し込みです。自動更新や継続課金はありません。教材は、1教材につき約100日分の課題と毎日の添削を順次お届けします。
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0b1d4a] px-7 text-[0.95rem] font-semibold text-white transition hover:bg-[#0f5e5e]"
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
