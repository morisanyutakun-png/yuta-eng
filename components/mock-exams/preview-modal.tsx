"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { MockExam } from "@/data/mock-exams";
import { useCart } from "@/components/mock-exams/cart-context";
import { EyeIcon, LockIcon, ShoppingCartIcon, XIcon } from "@/components/mock-exams/icons";

interface PreviewItem {
  src: string;
  label: string;
  width?: number;
  height?: number;
}

interface PreviewModalProps {
  previews: PreviewItem[];
  title: string;
  exam?: MockExam;
  externalOpen?: boolean;
  onClose?: () => void;
  hideTrigger?: boolean;
}

export function PreviewModal({
  previews,
  title,
  exam,
  externalOpen,
  onClose,
  hideTrigger = false,
}: PreviewModalProps) {
  const { addToCart, isInCart } = useCart();
  const [internalOpen, setInternalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
  const handleClose = () => {
    setInternalOpen(false);
    onClose?.();
  };
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % previews.length);
      }
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + previews.length) % previews.length);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, previews.length]);

  if (!previews || previews.length === 0) return null;

  const current = previews[currentIndex];
  const isProblem = current.src.includes("problem");
  const isSolution = current.src.includes("solution");
  const isRubric = current.src.includes("rubric");

  const modalElement = isOpen ? (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-3 sm:p-4 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="relative flex h-full max-h-[92vh] w-full max-w-4xl flex-col rounded-xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* モーダルヘッダー */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="rounded bg-slate-900 px-2 py-0.5 text-xs font-semibold text-white">
              {currentIndex + 1} / {previews.length} ページ
            </span>
            <span className="text-xs font-bold text-slate-800 truncate">
              {current.label}
            </span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
            aria-label="閉じる"
          >
            <XIcon size={14} />
            <span>閉じる</span>
          </button>
        </div>

        {/* サムネイル切り替えタブ */}
        <div className="flex items-center gap-1.5 overflow-x-auto border-b border-slate-200 bg-slate-100/70 px-3 py-2 text-xs">
          {previews.map((item, idx) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`shrink-0 rounded px-2.5 py-1 transition-all ${
                idx === currentIndex
                  ? "bg-slate-900 text-white font-bold"
                  : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* メインプレビュー画像エリア */}
        <div
          className="relative flex-1 overflow-auto bg-slate-100 p-4 flex items-center justify-center select-none"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        >
          <div className="relative h-full w-auto aspect-[1/1.414] max-h-[72vh] shadow-md rounded border border-slate-200 bg-white overflow-hidden">
            <Image
              src={current.src}
              alt={current.label}
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-contain pointer-events-none"
            />

            {/* 斜め透かしオーバーレイ（表紙以外） */}
            {currentIndex > 0 && (
              <div
                className="pointer-events-none absolute inset-0 select-none opacity-30"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='300' height='150' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='20' y='75' fill='%2364748b' font-size='12' font-family='sans-serif' font-weight='bold' transform='rotate(-25 150 75)'%3ESAMPLE ｜ 見本・転載禁止%3C/text%3E%3C/svg%3E")`,
                  backgroundRepeat: "repeat",
                }}
              />
            )}

            {/* ① 問題紙（problem）：大問[1]は読ませ、大問[2]・[3]（下64%）をボカシ＋白グラデーションで保護 */}
            {isProblem && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[36%] bg-gradient-to-b from-white/70 via-white/95 to-white backdrop-blur-md flex flex-col items-center justify-center p-4 text-center select-none z-10 border-t border-slate-200/90">
                <div className="rounded-xl border border-amber-400/80 bg-slate-900/95 p-4 sm:p-5 text-white shadow-xl max-w-sm sm:max-w-md mx-auto">
                  <div className="flex items-center justify-center gap-1.5 text-amber-400 font-bold text-xs sm:text-sm">
                    <LockIcon size={16} />
                    <span>大問2〜大問5は購入後に収録（全5大問・100分）</span>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-300 leading-relaxed">
                    問題冊子・所定解答用紙5枚・全問記述答案・小問別配点基準はご購入後すぐにお手元に届きます。
                  </p>
                  {exam && (
                    <div className="mt-3 pt-2.5 border-t border-slate-700/80 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          addToCart(exam, true);
                          handleClose();
                        }}
                        className="pointer-events-auto inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-b from-[#dc2626] to-[#b91c1c] hover:from-[#e11d48] hover:to-[#be123c] px-3.5 py-1.5 text-xs font-bold text-white shadow-[0_2px_8px_rgba(220,38,38,0.32)] border border-[#ef4444]/40 transition active:scale-95 cursor-pointer"
                      >
                        <ShoppingCartIcon size={13} />
                        <span>このままカートに入れる（¥{exam.price.toLocaleString("ja-JP")}）</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ② 解答解説（solution）：上部62%（大問1完答プロセス）は見せ、下部38%（(2)以降）をボカシ保護 */}
            {isSolution && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[62%] bg-gradient-to-b from-white/75 via-white/95 to-white backdrop-blur-md flex flex-col items-center justify-center p-3 text-center select-none z-10 border-t border-slate-200/90">
                <div className="rounded-xl border border-amber-400/80 bg-slate-900/95 px-4 py-2.5 sm:py-3 text-white shadow-lg max-w-sm sm:max-w-md mx-auto">
                  <div className="flex items-center justify-center gap-1.5 text-amber-400 font-bold text-xs">
                    <LockIcon size={14} />
                    <span>(2)以降の解答解説・別解・採点講評は購入後に収録</span>
                  </div>
                  <p className="mt-1 text-[10.5px] text-slate-300">
                    完全な記述答案・論述プロセス・減点防止ポイントはご購入後にご覧いただけます。
                  </p>
                </div>
              </div>
            )}

            {/* 右上バッジ：問題紙・解答解説・採点基準で差別化 */}
            {isProblem && (
              <div className="absolute top-2.5 right-2.5 pointer-events-none z-20">
                <span className="rounded bg-amber-400 text-slate-950 px-2 py-0.5 text-[10px] font-bold shadow-xs border border-amber-300">
                  🔒 大問2〜5 マスキング済（ネタバレ防止）
                </span>
              </div>
            )}
            {isSolution && (
              <div className="absolute top-2.5 right-2.5 pointer-events-none z-20">
                <span className="rounded bg-amber-400 text-slate-950 px-2 py-0.5 text-[10px] font-bold shadow-xs border border-amber-300">
                  🔒 解答下部 マスキング済（解答流出防止）
                </span>
              </div>
            )}
            {isRubric && (
              <div className="absolute top-2.5 right-2.5 pointer-events-none z-20">
                <span className="rounded bg-emerald-500 text-white px-2 py-0.5 text-[10px] font-bold shadow-xs border border-emerald-400">
                  ✓ 配点・評価基準 全文公開中
                </span>
              </div>
            )}
          </div>

          {/* 前へ / 次へ矢印 */}
          <button
            type="button"
            onClick={() =>
              setCurrentIndex((prev) => (prev - 1 + previews.length) % previews.length)
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/60 p-2 text-white hover:bg-slate-900 backdrop-blur-xs transition"
            aria-label="前のページ"
          >
            ◀
          </button>
          <button
            type="button"
            onClick={() => setCurrentIndex((prev) => (prev + 1) % previews.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/60 p-2 text-white hover:bg-slate-900 backdrop-blur-xs transition"
            aria-label="次のページ"
          >
            ▶
          </button>
        </div>

        {/* モーダルフッター（EC王道導線：閉じる ＆ カートに入れる） */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 py-3 text-xs">
          <span className="text-slate-500 text-[11px] hidden sm:inline">
            ※見本は大問1の一部を掲載。ご購入後は全5大問（計32〜33ページ）の完全版PDFをお届けします。
          </span>
          <div className="flex items-center gap-2.5 ml-auto">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-slate-300 bg-white px-3.5 py-2 font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition shadow-2xs cursor-pointer"
            >
              閉じる
            </button>
            {exam && (
              <button
                type="button"
                onClick={() => {
                  addToCart(exam, true);
                  handleClose();
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-b from-[#dc2626] to-[#b91c1c] hover:from-[#e11d48] hover:to-[#be123c] px-4 py-2 font-bold text-white shadow-[0_2px_10px_rgba(220,38,38,0.32)] border border-[#ef4444]/40 transition active:scale-95 cursor-pointer"
              >
                <ShoppingCartIcon size={15} />
                <span>
                  {isInCart(exam.id)
                    ? "カートに追加済（カートを開く）"
                    : `カートに入れる（¥${exam.price.toLocaleString("ja-JP")}）`}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;

  if (hideTrigger) {
    if (!isOpen || !mounted) return null;
    return createPortal(modalElement, document.body);
  }

  return (
    <>
      {!hideTrigger && externalOpen === undefined && (
        <button
          type="button"
          onClick={() => setInternalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 hover:border-slate-400 transition-all cursor-pointer"
        >
          <EyeIcon size={16} className="text-slate-800" />
          <span>無料サンプルを立ち読みする（全{previews.length}枚）</span>
        </button>
      )}
      {isOpen && mounted && createPortal(modalElement, document.body)}
    </>
  );
}
