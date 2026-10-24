"use client";

import Image from "next/image";
import { useCart } from "@/components/mock-exams/cart-context";
import { ShoppingCartIcon, CheckIcon } from "@/components/mock-exams/icons";
import { PaymentBrandBadges } from "@/components/mock-exams/payment-badges";
import type { MockExam } from "@/data/mock-exams";

interface BundleCardProps {
  exams: MockExam[];
}

export function BundleExamCard({ exams }: BundleCardProps) {
  const { addMultipleToCart, items, openCart } = useCart();

  // 3模試の抽出
  const set1 = exams.find((e) => e.id === "preview-zento-set1");
  const set2 = exams.find((e) => e.id === "preview-zento-set2");
  const set3 = exams.find((e) => e.id === "preview-zento-set3");

  const bundleExams = [set1, set2, set3].filter((e): e is MockExam => !!e);
  const allInCart =
    bundleExams.length === 3 &&
    bundleExams.every((ex) => items.some((item) => item.exam.id === ex.id));

  // 単品合計価格と特別セット価格
  const originalTotalPrice = 6440; // 1980 + 1980 + 2480
  const bundleSpecialPrice = 4980;
  const discountAmount = originalTotalPrice - bundleSpecialPrice; // 1460

  return (
    <article
      aria-label="全3回コンプリートパッケージ"
      className="group relative overflow-hidden rounded-xl border-2 border-amber-300/80 bg-gradient-to-br from-white via-amber-50/25 to-white shadow-[0_4px_24px_rgba(217,119,6,0.1)] transition-all duration-300 hover:shadow-[0_12px_36px_rgba(217,119,6,0.16)] sm:flex"
    >
      {/* ──────────────────────────────────────────────────────────
          1. 書影（3巻重なりの立体ファンモックアップ）
      ────────────────────────────────────────────────────────── */}
      <div className="relative aspect-[16/9] sm:aspect-auto sm:w-[35%] sm:shrink-0 bg-gradient-to-b from-[#f5ede3] to-[#ebdcd0] border-b sm:border-b-0 sm:border-r border-amber-200/70 p-5 flex flex-col items-center justify-center select-none overflow-hidden">
        {/* 接地シャドウ */}
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 h-5 w-4/5 rounded-full bg-amber-950/20 blur-md" />

        {/* 3巻重なりファン演出（-translate-y-1.5 で上下均等センタリング） */}
        <div className="relative flex items-center justify-center w-full h-[155px] -translate-y-1.5">
          {/* 第3巻（紫）最奥 */}
          <div
            className="absolute right-7 top-2 w-[105px] sm:w-[115px] aspect-[1/1.414] rounded-[2px] bg-white shadow-md border border-purple-200 overflow-hidden transform rotate-12 translate-x-4 transition-transform duration-300 group-hover:rotate-14 group-hover:translate-x-6"
            aria-hidden="true"
          >
            <div className="h-2 w-full bg-purple-600" />
            <div className="bg-slate-900 text-white px-1 py-0.5 text-[6.5px] font-bold text-center">
              第3回 直前用
            </div>
            <Image
              src="/samples/mock-exams/preview-zento-set3/cover.webp"
              alt="第3回表紙"
              width={115}
              height={162}
              className="object-cover opacity-90"
            />
          </div>

          {/* 第2巻（橙）中央奥 */}
          <div
            className="absolute left-6 top-3 w-[108px] sm:w-[118px] aspect-[1/1.414] rounded-[2px] bg-white shadow-md border border-amber-200 overflow-hidden transform -rotate-8 -translate-x-3 transition-transform duration-300 group-hover:-rotate-10 group-hover:-translate-x-5"
            aria-hidden="true"
          >
            <div className="h-2 w-full bg-amber-600" />
            <div className="bg-slate-900 text-white px-1 py-0.5 text-[6.5px] font-bold text-center">
              第2回 秋期用
            </div>
            <Image
              src="/samples/mock-exams/preview-zento-set2/cover.webp"
              alt="第2回表紙"
              width={118}
              height={167}
              className="object-cover opacity-90"
            />
          </div>

          {/* 第1巻（青）手前メイン */}
          <div className="relative z-10 w-[115px] sm:w-[126px] aspect-[1/1.414] rounded-[2px] bg-white shadow-[0_10px_28px_-4px_rgba(15,23,42,0.3)] border border-slate-300 overflow-hidden transform -rotate-1 transition-transform duration-300 group-hover:scale-105">
            <div className="h-2 w-full bg-sky-600" />
            <div className="bg-slate-900 text-white px-1.5 py-0.5 flex justify-between text-[7px] font-bold">
              <span>2027 プレビュー</span>
              <span className="text-amber-300">第1回 夏期</span>
            </div>
            <Image
              src="/samples/mock-exams/preview-zento-set1/cover.webp"
              alt="第1回表紙"
              width={126}
              height={178}
              className="object-contain"
            />
          </div>
        </div>

        {/* 左上バッジ */}
        <span className="absolute left-3 top-3 z-20 inline-flex items-center rounded-md bg-amber-600 px-2.5 py-0.5 text-[10px] font-extrabold text-white shadow-xs">
          全3巻コンプリート
        </span>

        {/* 下部キャプション */}
        <div className="pointer-events-none absolute bottom-2 inset-x-0 z-20 flex items-center justify-center">
          <span className="text-[10.5px] font-bold text-amber-900/80">
            全3回 15大問（全96ページ）収録
          </span>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          2. 本文・お得情報・価格・一括購入ボタン
      ────────────────────────────────────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-6 justify-between">
        <div>
          {/* お得バッジ ＆ セット概要 */}
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="rounded-md border border-amber-300 bg-amber-100/90 px-2.5 py-0.5 text-[11px] font-extrabold text-amber-900 shadow-2xs">
              まとめ買い限定パック
            </span>
            <span className="text-xs font-bold text-rose-600">
              ¥{discountAmount.toLocaleString("ja-JP")} OFF（約23%割引）
            </span>
          </div>

          {/* セットタイトル */}
          <h2 className="text-lg sm:text-[20px] font-extrabold leading-snug tracking-tight text-slate-950 break-words">
            数学記述模試『入試プレビュー』全3回コンプリートパッケージ
            <span className="block text-xs sm:text-sm font-semibold text-slate-600 mt-1 break-words">
              第1回（8月夏期）＋ 第2回（10月秋期）＋ 第3回（12月直前）3巻一括セット
            </span>
          </h2>

          {/* 説明 */}
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            夏期標準から秋期実戦、冬期直前総合まで、二次記述数学を完成させる全15大問・所定解答用紙15枚・加点減点採点基準を完全網羅。段階的に志望校二次合格水準まで引き上げる公式推奨パッケージです。
          </p>

          {/* 収録セットのピル一覧 */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[10.5px] sm:text-[11px]">
            <span className="rounded border border-sky-200 bg-sky-50 px-2 py-0.5 font-bold text-sky-800">
              第1回：数I・A・II・B・Cベクトル（100分）
            </span>
            <span className="rounded border border-amber-200 bg-amber-50 px-2 py-0.5 font-bold text-amber-900">
              第2回：数III・複素数平面・極限含む全範囲（100分）
            </span>
            <span className="rounded border border-purple-200 bg-purple-50 px-2 py-0.5 font-bold text-purple-900">
              第3回：最難関総合・冠模試レベル融合（120分）
            </span>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────
            3. 下部: 価格・割引表示 ＆ 一括カート追加
        ────────────────────────────────────────────────────────── */}
        <div className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-amber-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* 左側: 単品合計 → セット特別価格 */}
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-slate-400 line-through">
                  単品合計 ¥{originalTotalPrice.toLocaleString("ja-JP")}
                </span>
                <span className="rounded bg-rose-50 border border-rose-200 px-1.5 py-0.5 text-[10px] font-extrabold text-rose-700">
                  ¥{discountAmount.toLocaleString("ja-JP")} お得
                </span>
              </div>
              <div className="tabular-nums flex items-baseline mt-0.5">
                <span className="text-[26px] sm:text-[32px] font-black leading-none text-rose-600">
                  ¥{bundleSpecialPrice.toLocaleString("ja-JP")}
                </span>
                <span className="ml-1.5 text-xs font-semibold text-slate-500">
                  （税込） / 3巻買い切り
                </span>
              </div>
              <p className="mt-1 text-[10.5px] sm:text-[11px] text-slate-400 font-normal">
                メール送付・いつでも再DL可能 ｜ 領収書PDF自動発行
              </p>
            </div>

            {/* 右側: 一括追加CTAボタン */}
            <div className="w-full sm:w-auto">
              {allInCart ? (
                <button
                  type="button"
                  onClick={openCart}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white py-3 px-5 text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <CheckIcon size={16} className="text-emerald-400" />
                  <span>3回セット追加済（カートを見る）</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => addMultipleToCart(bundleExams, true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-b from-[#dc2626] to-[#b91c1c] hover:from-[#e11d48] hover:to-[#be123c] text-white py-3 px-5 text-xs sm:text-sm font-bold shadow-[0_4px_16px_rgba(220,38,38,0.38)] hover:shadow-[0_6px_22px_rgba(220,38,38,0.5)] border border-[#ef4444]/40 transition-all duration-200 active:scale-95 cursor-pointer"
                >
                  <ShoppingCartIcon size={17} />
                  <span>全3回をセット購入（¥4,980でカートに追加）</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

