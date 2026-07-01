import Link from "next/link";

function IconLock({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.2" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15.4" r="1.3" />
    </svg>
  );
}
function IconCheck({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.3 4.3L19 7" />
    </svg>
  );
}

/** 決済の安心（Stripe 連携）＋法的ページへの導線。申込ページに掲載。 */
export function PaymentTrust() {
  return (
    <div className="mx-auto max-w-2xl rounded-[22px] bg-white p-6 ring-1 ring-[rgba(15,29,74,0.08)] shadow-[0_28px_56px_-44px_rgba(11,29,74,0.45)] sm:p-7">
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] bg-[#eef6f6] text-[#0f766e] ring-1 ring-[rgba(13,148,136,0.18)]"
        >
          <IconLock className="h-6 w-6" />
        </span>
        <div>
          <p className="text-[1.02rem] font-extrabold leading-[1.5] text-[#0b1d4a]">
            お支払いは、世界標準の決済システム{" "}
            <span className="font-extrabold text-[#635bff]">Stripe</span> で安全に。
          </p>
          <p className="mt-2 text-[0.88rem] leading-[1.95] text-[#475569]">
            Stripe は世界中の企業が採用し、国際カードセキュリティ基準（PCI DSS）に準拠した決済基盤。
            カード情報は Stripe が暗号化して処理し、
            <strong className="font-bold text-[#0b1d4a]">
              当サービスがカード番号を保持・閲覧することはありません
            </strong>
            。
          </p>
        </div>
      </div>
      <ul className="mt-5 grid gap-x-6 gap-y-2.5 border-t border-[rgba(15,29,74,0.08)] pt-5 sm:grid-cols-2">
        {[
          "通信は SSL で常時暗号化",
          "カード情報は非保持（Stripe が管理）",
          "いつでもオンラインで解約 OK",
          "入会金・教材費 0円／初月半額",
        ].map((text) => (
          <li key={text} className="flex items-center gap-2.5 text-[0.88rem] font-semibold text-[#334155]">
            <span aria-hidden="true" className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#0d9488] text-white">
              <IconCheck className="h-3.5 w-3.5" />
            </span>
            <span>{text}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 border-t border-[rgba(15,29,74,0.08)] pt-4 text-[0.78rem] leading-[1.85] text-[#64748b]">
        ご契約の前に{" "}
        <Link className="font-semibold text-[#0f766e] underline" href="/legal/tokushoho">
          特定商取引法に基づく表記
        </Link>
        ・
        <Link className="font-semibold text-[#0f766e] underline" href="/legal/refund">
          返金・解約ポリシー
        </Link>
        ・
        <Link className="font-semibold text-[#0f766e] underline" href="/legal/privacy">
          プライバシーポリシー
        </Link>
        をご確認ください。
      </p>
    </div>
  );
}
