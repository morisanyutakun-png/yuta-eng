"use client";

import { useSearchParams } from "next/navigation";

/**
 * 決済から戻ってきたとき・決済を始められなかったときの知らせ。
 *
 * 詳細ページは静的に組むので、URL の ?error= / ?canceled= はここ（画面側）で読む。
 * 親で Suspense に包んで使う。
 */
const MESSAGES: Record<string, string> = {
  "not-agreed": "購入前の確認事項への同意にチェックを入れてください。",
  "not-on-sale": "この模試はまだ販売していません。",
  "not-found": "模試が見つかりませんでした。",
  unavailable: "ただいま決済を受け付けられません。時間をおいてお試しください。",
  "checkout-failed": "決済画面を開けませんでした。時間をおいてもう一度お試しください。",
};

export function CheckoutNotice() {
  const params = useSearchParams();
  const error = params.get("error");
  const canceled = params.get("canceled");

  if (error && MESSAGES[error]) {
    return (
      <p role="alert" className="border border-accent bg-accent-bg px-4 py-3 text-[0.88rem] font-semibold text-accent">
        {MESSAGES[error]}
      </p>
    );
  }
  if (canceled) {
    return (
      <p role="status" className="border border-rule bg-paper-2 px-4 py-3 text-[0.88rem] text-ink-2">
        決済は完了していません（料金は発生していません）。もう一度購入する場合は下のボタンからお進みください。
      </p>
    );
  }
  return null;
}

