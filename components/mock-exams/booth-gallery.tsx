"use client";

import { useState } from "react";
import Image from "next/image";
import type { MockExam } from "@/data/mock-exams";
import { EyeIcon, LockIcon } from "@/components/mock-exams/icons";
import { PreviewModal } from "@/components/mock-exams/preview-modal";

interface PreviewItem {
  src: string;
  label: string;
  width?: number;
  height?: number;
}

interface BoothGalleryProps {
  previews: PreviewItem[];
  title: string;
  exam?: MockExam;
}

export function BoothGallery({ previews, title, exam }: BoothGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!previews || previews.length === 0) {
    return null;
  }

  const current = previews[selectedIndex] || previews[0];
  const isProblem = current.src.includes("problem");
  const isSolution = current.src.includes("solution");
  const isRubric = current.src.includes("rubric");

  return (
    <div className="flex flex-col gap-3">
      {/* ──────────────────────────────────────────────────────────
          メインプレビュー表示（BOOTH大型画像ビュー）
      ────────────────────────────────────────────────────────── */}
      <div
        className="relative aspect-[1/1.414] w-full max-w-md mx-auto overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-xs flex items-center justify-center group cursor-pointer select-none"
        onClick={() => setIsModalOpen(true)}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      >
        <Image
          src={current.src}
          alt={current.label || title}
          fill
          priority
          sizes="(max-width: 640px) 100vw, 450px"
          className="object-contain transition-transform duration-300 ease-out group-hover:scale-[1.02] pointer-events-none"
        />

        {/* 左端の折り目・冊子シャドウ */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/15 via-black/5 to-transparent" />

        {/* 斜め透かしパターンオーバーレイ（表紙以外） */}
        {selectedIndex > 0 && (
          <div
            className="pointer-events-none absolute inset-0 select-none opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='260' height='130' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='15' y='65' fill='%2364748b' font-size='11' font-family='sans-serif' font-weight='bold' transform='rotate(-25 130 65)'%3ESAMPLE ｜ 見本・転載禁止%3C/text%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
            }}
          />
        )}

        {/* ① 問題紙（problem）：大問[1]は読ませ、大問[2]・[3]（下64%）をボカシ＋白グラデーションで保護 */}
        {isProblem && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[36%] bg-gradient-to-b from-white/70 via-white/95 to-white backdrop-blur-md flex flex-col items-center justify-center p-3 text-center select-none z-10 border-t border-slate-200/90">
            <div className="rounded-lg border border-amber-400/80 bg-slate-900/95 p-3 text-white shadow-lg max-w-[280px]">
              <div className="flex items-center justify-center gap-1 text-amber-400 font-bold text-[11px]">
                <LockIcon size={13} />
                <span>大問2〜5は購入後に収録</span>
              </div>
              <p className="mt-1 text-[9.5px] text-slate-300">
                クリックして全画面立ち読み（全問解説・採点基準つき）
              </p>
            </div>
          </div>
        )}

        {/* ② 解答解説（solution）：上部62%は見せ、下部38%をボカシ保護 */}
        {isSolution && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[62%] bg-gradient-to-b from-white/75 via-white/95 to-white backdrop-blur-md flex flex-col items-center justify-center p-2 text-center select-none z-10 border-t border-slate-200/90">
            <div className="rounded-lg border border-amber-400/80 bg-slate-900/95 px-3 py-2 text-white shadow-md max-w-[280px]">
              <div className="flex items-center justify-center gap-1 text-amber-400 font-bold text-[10.5px]">
                <LockIcon size={12} />
                <span>(2)以降の解答解説は購入後に収録</span>
              </div>
            </div>
          </div>
        )}

        {/* 画像ラベルバッジ（左上） */}
        <div className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 flex items-center gap-1.5 z-20 max-w-[62%]">
          <span className="rounded bg-slate-900/85 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-bold text-white shadow-2xs backdrop-blur-xs truncate">
            {selectedIndex + 1} / {previews.length}　{current.label}
          </span>
        </div>

        {/* ネタバレ防止バッジ（右上） */}
        {isProblem && (
          <div className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 pointer-events-none z-20">
            <span className="rounded bg-amber-400 text-slate-950 px-1.5 sm:px-2 py-0.5 text-[9.5px] sm:text-[10px] font-bold shadow-xs border border-amber-300">
              🔒 大問2〜5 マスキング
            </span>
          </div>
        )}
        {isSolution && (
          <div className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 pointer-events-none z-20">
            <span className="rounded bg-amber-400 text-slate-950 px-1.5 sm:px-2 py-0.5 text-[9.5px] sm:text-[10px] font-bold shadow-xs border border-amber-300">
              🔒 解答下部 マスキング
            </span>
          </div>
        )}
        {isRubric && (
          <div className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 pointer-events-none z-20">
            <span className="rounded bg-emerald-500 text-white px-1.5 sm:px-2 py-0.5 text-[9.5px] sm:text-[10px] font-bold shadow-xs border border-emerald-400">
              ✓ 採点基準 全文公開中
            </span>
          </div>
        )}

        {/* 拡大案内ホバーバッジ（中央） */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity z-30">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/90 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md backdrop-blur-xs">
            <EyeIcon size={14} />
            <span>クリックして拡大・立ち読み</span>
          </span>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          サムネイルカルーセル／セレクター（BOOTHスタイル横並び）
      ────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 max-w-md mx-auto w-full">
        {previews.map((item, idx) => {
          const isActive = idx === selectedIndex;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative h-16 w-12 sm:h-20 sm:w-14 shrink-0 overflow-hidden rounded-sm border bg-white transition-all ${
                isActive
                  ? "ring-2 ring-slate-900 border-transparent shadow-xs scale-105"
                  : "border-slate-200 opacity-65 hover:opacity-100 hover:border-slate-400"
              }`}
              title={item.label}
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                sizes="60px"
                className="object-contain"
              />
              <span className="absolute bottom-0 inset-x-0 bg-slate-900/80 text-[9px] text-white text-center py-0.5 truncate px-0.5">
                {idx + 1}
              </span>
            </button>
          );
        })}
      </div>

      {/* ──────────────────────────────────────────────────────────
          立ち読みモーダル起動ボタン
      ────────────────────────────────────────────────────────── */}
      <div className="max-w-md mx-auto w-full">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white py-2 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 hover:border-slate-400 transition"
        >
          <EyeIcon size={15} className="text-slate-700" />
          <span>全画面サンプルで立ち読みする（全{previews.length}枚）</span>
        </button>
      </div>

      {/* 全画面立ち読みモーダル */}
      {isModalOpen && (
        <PreviewModal
          previews={previews}
          title={title}
          exam={exam}
          externalOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

