"use client";

import { useCart } from "@/components/mock-exams/cart-context";
import { LockIcon, ShoppingCartIcon } from "@/components/mock-exams/icons";
import type { MockExam } from "@/data/mock-exams";

interface DetailActionButtonsProps {
  exam: MockExam;
}

export function DetailActionButtons({ exam }: DetailActionButtonsProps) {
  const { addToCart, isInCart, openCart } = useCart();
  const inCart = isInCart(exam.id);

  return (
    <div className="flex flex-col gap-2.5 w-full">
      {/* カートに入れるボタン */}
      <button
        type="button"
        onClick={() => {
          if (inCart) {
            openCart();
          } else {
            addToCart(exam, true);
          }
        }}
        className={`w-full inline-flex items-center justify-center gap-2 rounded-lg py-3.5 px-4 text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-98 ${
          inCart
            ? "bg-slate-900 text-white hover:bg-slate-800"
            : "bg-gradient-to-b from-[#dc2626] to-[#b91c1c] hover:from-[#e11d48] hover:to-[#be123c] text-white shadow-[0_3px_12px_rgba(220,38,38,0.32)] border border-[#ef4444]/40"
        }`}
      >
        <ShoppingCartIcon size={18} />
        <span>{inCart ? "カートを見る（追加済）" : "カートに入れる"}</span>
      </button>

      {/* 今すぐ直接購入ボタン（Stripe Checkoutへ直接進む） */}
      <form action="/api/mock-exams/checkout" method="post" className="w-full">
        <input type="hidden" name="examId" value={exam.id} />
        <input type="hidden" name="agreed" value="on" />
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white py-3 px-4 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 transition"
        >
          <LockIcon size={14} className="text-slate-500" />
          <span>この商品だけ今すぐ購入（カード / Apple Pay）</span>
        </button>
      </form>
    </div>
  );
}
