"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/components/mock-exams/cart-context";
import { DownloadIcon, ShoppingCartIcon } from "@/components/mock-exams/icons";
import type { MockExam } from "@/data/mock-exams";

interface StickyCtaProps {
  title: string;
  price: number;
  onSale: boolean;
  targetId?: string;
  exam?: MockExam;
}

export function StickyCta({
  title,
  price,
  onSale,
  targetId = "purchase",
  exam,
}: StickyCtaProps) {
  const [visible, setVisible] = useState(false);
  const { addToCart, isInCart, openCart } = useCart();
  const inCart = exam ? isInCart(exam.id) : false;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 480) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-300 bg-white/95 px-4 py-2.5 backdrop-blur-md shadow-lg animate-in slide-in-from-bottom-2 duration-200">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        {/* 左側: 商品タイトルと税込価格 */}
        <div className="min-w-0">
          <p className="font-bold text-slate-900 text-xs sm:text-sm truncate">
            {title}
          </p>
          <div className="flex items-center gap-2 text-xs">
            <span className="font-extrabold text-slate-900 text-sm sm:text-base">
              ¥{price.toLocaleString("ja-JP")} <span className="text-xs text-slate-500 font-normal">（税込 / 買い切り）</span>
            </span>
            <span className="hidden sm:inline text-[11px] text-slate-500">
              A4 PDF 4点フルセット（問題・解答用紙5枚・解説・採点基準）
            </span>
          </div>
        </div>

        {/* 右側: ボタン群 */}
        <div className="shrink-0 flex items-center gap-2">
          {onSale && exam ? (
            <button
              type="button"
              onClick={() => {
                if (inCart) {
                  openCart();
                } else {
                  addToCart(exam, true);
                }
              }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-b from-[#dc2626] to-[#b91c1c] hover:from-[#e11d48] hover:to-[#be123c] px-5 py-2.5 text-xs font-bold text-white shadow-[0_3px_12px_rgba(220,38,38,0.32)] border border-[#ef4444]/40 transition active:scale-95"
            >
              <ShoppingCartIcon size={14} />
              <span>{inCart ? "カートを見る" : "カートへ追加"}</span>
            </button>
          ) : (
            <span className="rounded-lg bg-slate-100 px-3.5 py-2 text-xs font-bold text-slate-500">
              準備中
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
