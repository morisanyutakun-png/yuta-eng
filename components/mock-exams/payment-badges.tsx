/**
 * 主要決済ブランドの視覚的ロゴバッジ群。
 *
 * ECサイトとしての具体性と信頼感を即座に伝えるため、
 * Visa / Mastercard / JCB / American Express / Apple Pay を端正なミニバッジで描画する。
 */
export function PaymentBrandBadges({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-1 select-none ${compact ? "scale-90 origin-left" : ""}`}>
      {/* VISA */}
      <span
        title="Visa"
        className="inline-flex h-4 items-center justify-center rounded-[3px] border border-slate-300 bg-white px-1.5 text-[9px] font-black italic tracking-tighter text-[#1a1f71] shadow-2xs"
      >
        VISA
      </span>

      {/* Mastercard */}
      <span
        title="Mastercard"
        className="inline-flex h-4 items-center justify-center gap-0.5 rounded-[3px] border border-slate-300 bg-white px-1.5 shadow-2xs"
      >
        <span className="flex items-center -space-x-1">
          <span className="h-2.5 w-2.5 rounded-full bg-[#eb001b]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f79e1b] opacity-90" />
        </span>
      </span>

      {/* JCB */}
      <span
        title="JCB"
        className="inline-flex h-4 items-center justify-center rounded-[3px] border border-slate-300 bg-white px-1.5 text-[8.5px] font-black tracking-tight text-[#0f5ca8] shadow-2xs"
      >
        JCB
      </span>

      {/* AMEX */}
      <span
        title="American Express"
        className="inline-flex h-4 items-center justify-center rounded-[3px] border border-slate-300 bg-[#006fcf] px-1 text-[7.5px] font-black tracking-tighter text-white shadow-2xs"
      >
        AMEX
      </span>

      {/* Apple Pay */}
      <span
        title="Apple Pay"
        className="inline-flex h-4 items-center justify-center rounded-[3px] border border-slate-300 bg-black px-1.5 text-[8.5px] font-bold text-white shadow-2xs"
      >
        Pay
      </span>
    </div>
  );
}

