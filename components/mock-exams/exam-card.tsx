"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/components/mock-exams/cart-context";
import { EyeIcon, ShoppingCartIcon } from "@/components/mock-exams/icons";
import { PaymentBrandBadges } from "@/components/mock-exams/payment-badges";
import { PreviewModal } from "@/components/mock-exams/preview-modal";
import type { MockExam } from "@/data/mock-exams";

// 商品ごとのランク・季節感・個性に応じたアクセントカラー設計
const colorThemeMap: Record<
  string,
  {
    badgeClass: string;
    peekSrc: string;
    stripeBg: string;
    editionShort: string;
    volNumber: string;
    accentColor: string;
  }
> = {
  "preview-zento-set1": {
    badgeClass: "bg-sky-50 text-sky-800 border-sky-200/90 font-bold",
    peekSrc: "/samples/mock-exams/preview-zento-set1/answer-sheet.webp",
    stripeBg: "bg-sky-600",
    editionShort: "第1回 8月夏期",
    volNumber: "第1回",
    accentColor: "#0284c7",
  },
  "preview-zento-set2": {
    badgeClass: "bg-amber-50 text-amber-900 border-amber-200/90 font-bold",
    peekSrc: "/samples/mock-exams/preview-zento-set2/answer-sheet.webp",
    stripeBg: "bg-amber-600",
    editionShort: "第2回 10月秋期",
    volNumber: "第2回",
    accentColor: "#d97706",
  },
  "preview-zento-set3": {
    badgeClass: "bg-purple-50 text-purple-900 border-purple-200/90 font-bold",
    peekSrc: "/samples/mock-exams/preview-zento-set3/answer-sheet.webp",
    stripeBg: "bg-purple-600",
    editionShort: "第3回 12月直前",
    volNumber: "第3回",
    accentColor: "#7c3aed",
  },
};

export function ExamCard({
  exam,
  priority = false,
}: {
  exam: MockExam;
  priority?: boolean;
}) {
  const { addToCart, isInCart } = useCart();
  const [showPreview, setShowPreview] = useState(false);
  const onSale = exam.status === "on-sale";
  const inCart = isInCart(exam.id);
  const thumbnail =
    exam.previews?.[0]?.src || `/samples/mock-exams/${exam.id}/cover.webp`;

  const theme = colorThemeMap[exam.id] || {
    badgeClass: "bg-slate-100 text-slate-800 border-slate-200 font-bold",
    peekSrc: "/samples/mock-exams/preview-zento-set1/answer-sheet.webp",
    stripeBg: "bg-slate-800",
    editionShort: exam.monthLabel || "模試演習",
    volNumber: "演習版",
    accentColor: "#1e293b",
  };

  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_14px_32px_rgba(15,23,42,0.1)] hover:-translate-y-0.5 transition-all duration-300 sm:flex sm:min-h-[250px]">
      {/* ──────────────────────────────────────────────────────────
          1. 書影（立体3Dモックアップ：上下均等センタリング ＆ プレビュー感の演出）
      ────────────────────────────────────────────────────────── */}
      <div className="group/thumb relative aspect-[16/9] sm:aspect-auto sm:w-[35%] sm:shrink-0 bg-[#e8edf4] border-b sm:border-b-0 sm:border-r border-slate-200/80 p-5 flex items-center justify-center select-none overflow-hidden">
        {/* 接地シャドウ（濃いクールグレー床の上で自然に沈む影・上下バランス調整） */}
        <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 h-5 w-3/4 rounded-full bg-slate-900/20 blur-md" />

        {/* 3Dモックアップ本体（-translate-y-2 で上下マージンを均等センタリング） */}
        <div className="relative flex items-center justify-center w-full -translate-y-2">
          {/* 背後のチラ見せ所定解答用紙 */}
          <div
            className="absolute right-4 top-2 sm:right-6 sm:top-2 w-[125px] sm:w-[138px] aspect-[1/1.414] rounded-xs bg-white shadow-md border border-slate-200/90 overflow-hidden transform rotate-6 translate-x-3 transition-transform duration-300 ease-out group-hover/thumb:rotate-8 group-hover/thumb:translate-x-5"
            aria-hidden="true"
          >
            <Image
              src={theme.peekSrc}
              alt="所定解答用紙見本"
              fill
              sizes="160px"
              className="object-cover object-top opacity-85"
              priority={priority}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/15 via-transparent to-transparent" />
          </div>

          {/* 前面のメイン問題冊子（クリックで拡大プレビュー） */}
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            aria-label={`${exam.title}の見本ページを拡大プレビュー`}
            className="relative z-10 w-[135px] sm:w-[148px] aspect-[1/1.414] overflow-hidden rounded-[2px] bg-white shadow-[0_8px_24px_-4px_rgba(15,23,42,0.25)] border border-slate-300/90 transform -rotate-2 transition-all duration-300 ease-out group-hover/thumb:-rotate-1 group-hover/thumb:scale-[1.03] group-hover/thumb:shadow-[0_14px_32px_-4px_rgba(15,23,42,0.32)] flex flex-col text-left cursor-pointer"
          >
            {/* 回別・季節ごとの上端カラー帯（表紙の差別化） */}
            <div className={`h-2.5 w-full shrink-0 ${theme.stripeBg}`} />
            <div className="bg-slate-900/95 text-white px-1.5 py-0.5 flex items-center justify-between text-[7.5px] font-bold tracking-tight shrink-0">
              <span>2027 入試プレビュー</span>
              <span className="text-[7px] text-amber-300 font-extrabold">{theme.editionShort}</span>
            </div>

            {/* 表紙画像本体 */}
            <div className="relative flex-1 w-full overflow-hidden bg-white">
              <Image
                src={thumbnail}
                alt={exam.title}
                fill
                sizes="(max-width: 640px) 160px, 200px"
                className="object-contain"
                priority={priority}
              />
              {/* 左端の背表紙シャドウ */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/25 via-black/5 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 left-1 w-px bg-white/40" />
              {/* 右端の小口（ページ厚み） */}
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1 bg-gradient-to-l from-slate-300 to-transparent" />
            </div>

            {/* ホバー時に現れる「拡大プレビュー」バッジ */}
            <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="rounded-full bg-slate-900/90 backdrop-blur-xs px-2.5 py-1 text-[10px] font-bold text-white shadow-md flex items-center gap-1 transform translate-y-1 group-hover/thumb:translate-y-0 transition-transform">
                <EyeIcon size={12} />
                <span>中身を見る</span>
              </span>
            </div>
          </button>
        </div>

        {/* サムネイル左上の回数ナンバーバッジ（第1回 / 第2回 / 第3回） */}
        <span
          className={`absolute left-3 top-3 z-20 inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold shadow-xs ${theme.badgeClass}`}
        >
          {theme.volNumber}
        </span>

        {/* 下部キャプション ＆ ドットインジケーター（複数枚プレビュー感の演出） */}
        <div className="pointer-events-none absolute bottom-2 inset-x-0 z-20 flex items-center justify-center gap-1.5">
          <div className="flex items-center gap-1" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400/60" />
          </div>
          <span className="text-[10px] font-semibold text-slate-500">
            全4点プレビュー
          </span>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          2. 本文・商品固有スペック・価格・ボタン群
      ────────────────────────────────────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-6 justify-between">
        <div>
          {/* 商品区分バッジ ＆ 対象志望校 */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5">
            <span
              className={`rounded-md border px-2 py-0.5 text-[10.5px] sm:text-[11px] ${theme.badgeClass}`}
            >
              {exam.edition || exam.monthLabel}
            </span>
            {exam.targetSummary && (
              <span className="text-[11px] sm:text-xs font-medium text-slate-500">
                {exam.targetSummary}
              </span>
            )}
          </div>

          {/* 商品タイトル */}
          <Link href={`/mock-exams/${exam.id}`} className="group/title block">
            <h2 className="text-base sm:text-[20px] font-bold leading-snug tracking-tight text-slate-900 transition-colors group-hover/title:text-[#1b3a63] break-words">
              {exam.title}
            </h2>
          </Link>

          {/* 商品固有の具体的スペック（共通スペックの重複を排除し、固有情報に特化） */}
          <div className="mt-2.5 sm:mt-3 mb-4 sm:mb-5 space-y-2 sm:space-y-2.5">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
              <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 font-bold text-slate-800 text-[11px] sm:text-xs">
                {exam.minutes}分 ｜ 大問{exam.daimonCount}題 ｜ {exam.fullMark}点満点
              </span>
              <span className="text-xs text-slate-600 font-medium break-words">
                出題範囲: {exam.scope}
              </span>
            </div>

            {/* 具体的な出題単元タグ（1行でピシッと揃うよう文字サイズ・余白を最適化） */}
            <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[10.5px] text-slate-600">
              <span className="font-semibold text-slate-400 shrink-0 text-[10.5px] sm:text-[11px]">出題単元:</span>
              {exam.fields.map((field) => (
                <span
                  key={field}
                  className="rounded border border-slate-200/80 bg-slate-50 px-1.5 py-0.5 text-slate-700 font-medium"
                >
                  {field}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────
            3. 下部: 価格・安心材料 ＆ アクションボタン（空白を埋めて1箇所に集約）
        ────────────────────────────────────────────────────────── */}
        <div className="mt-auto pt-3.5 sm:pt-4 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* 左側: 価格表示 ＆ 安心材料の補足テキスト ＆ 決済ブランド */}
            <div>
              <div className="tabular-nums flex items-baseline">
                <span className="text-[24px] sm:text-[28px] font-black leading-none text-slate-900">
                  ¥{exam.price.toLocaleString("ja-JP")}
                </span>
                <span className="ml-1.5 text-xs font-semibold text-slate-500">
                  （税込） / 買い切り
                </span>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10.5px] sm:text-[11px] text-slate-400 font-normal">
                <span>メール送付・いつでも再DL可能</span>
                <span className="text-slate-300">|</span>
                <span>領収書PDF自動発行</span>
                <span className="hidden xl:inline text-slate-300">|</span>
                <div className="hidden xl:inline-flex">
                  <PaymentBrandBadges compact />
                </div>
              </div>
            </div>

            {/* 右側: ボタン群（「サンプルを見る」＋「カートに入れる」のペア配置） */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {exam.previews && exam.previews.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 py-2.5 px-3 text-xs font-bold shadow-2xs transition active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <EyeIcon size={14} className="text-slate-500" />
                  <span>サンプルを見る</span>
                </button>
              )}

              {onSale ? (
                <button
                  type="button"
                  onClick={() => addToCart(exam, true)}
                  className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg py-2.5 px-4 sm:px-5 text-xs sm:text-sm font-bold transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap ${
                    inCart
                      ? "bg-slate-900 text-white hover:bg-slate-800 shadow-md"
                      : "bg-gradient-to-b from-[#dc2626] to-[#b91c1c] hover:from-[#e11d48] hover:to-[#be123c] text-white shadow-[0_3px_12px_rgba(220,38,38,0.32)] hover:shadow-[0_6px_18px_rgba(220,38,38,0.45)] border border-[#ef4444]/40"
                  }`}
                >
                  <ShoppingCartIcon size={16} />
                  <span>{inCart ? "カートを見る" : "カートに入れる"}</span>
                </button>
              ) : (
                <span className="flex-1 sm:flex-initial text-center rounded-lg bg-slate-100 px-5 py-2.5 text-xs font-semibold text-slate-400">
                  準備中
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 立ち読みプレビューモーダル */}
      {exam.previews && exam.previews.length > 0 && (
        <PreviewModal
          previews={exam.previews}
          title={exam.title}
          exam={exam}
          externalOpen={showPreview}
          onClose={() => setShowPreview(false)}
          hideTrigger
        />
      )}
    </article>
  );
}
