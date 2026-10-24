"use client";

import Link from "next/link";
import { useCart } from "@/components/mock-exams/cart-context";
import { FileTextIcon, ShoppingCartIcon } from "@/components/mock-exams/icons";
import { StoreLogoMark } from "@/components/mock-exams/store-logo";

export function BoothHeader() {
  const { totalCount, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#0f172a] text-white shadow-sm">
      <div className="mx-auto flex max-w-[1040px] items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        {/* ブランドロゴ ＆ ショップ名 */}
        <Link
          href="/mock-exams"
          className="group flex items-center gap-2.5 text-white transition-opacity hover:opacity-90"
        >
          <StoreLogoMark size={30} dark />
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base font-bold tracking-tight text-white leading-tight">
              大学別数学研究室 公式ストア
            </span>
            <span className="hidden sm:inline-block rounded bg-white/10 border border-white/15 px-2 py-0.5 text-[10px] font-bold text-slate-200">
              模試PDF直販
            </span>
          </div>
        </Link>

        {/* 右側アクションメニュー（アカデミックECヘッダー） */}
        <nav
          aria-label="ストアユーティリティ"
          className="flex items-center gap-2 sm:gap-4 text-xs font-medium"
        >
          {/* 研究室サイトへ */}
          <Link
            href="/"
            className="hidden md:inline-flex text-[11px] text-slate-400 hover:text-white transition-colors"
          >
            研究室トップ
          </Link>

          <span className="hidden md:inline text-slate-700">|</span>

          {/* 購入履歴（書類アイコンつき） */}
          <Link
            href="/mock-exams/shelf"
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition"
          >
            <FileTextIcon size={16} className="text-slate-300" />
            <span>購入履歴</span>
          </Link>

          {/* カートボタン（EC王道UI: アイコン + 右上赤丸白抜きバッジ） */}
          <button
            type="button"
            onClick={openCart}
            aria-label={`ショッピングカート（${totalCount}点）`}
            className="relative flex items-center gap-2 rounded-lg border border-white/35 bg-[#1e293b] hover:bg-[#334155] hover:border-white/60 px-3.5 py-2 font-bold text-white shadow-sm transition active:scale-95"
          >
            <div className="relative flex items-center justify-center">
              <ShoppingCartIcon size={18} className="text-white" />
              {totalCount > 0 && (
                <span className="absolute -top-2.5 -right-3 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#dc2626] px-1 text-[10px] font-bold text-white shadow-xs ring-2 ring-[#0f172a]">
                  {totalCount}
                </span>
              )}
            </div>
            <span className="text-xs">カート</span>
            {totalCount > 0 ? (
              <span className="text-xs font-bold text-[#fca5a5] tabular-nums">
                ({totalCount})
              </span>
            ) : (
              <span className="text-xs text-slate-300 font-semibold tabular-nums">
                (0)
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
