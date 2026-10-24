"use client";

import { CheckIcon, DownloadIcon, FileTextIcon } from "@/components/mock-exams/icons";

interface ShopHeroProps {
  totalCount: number;
}

/**
 * 模試演習ストアの導入部（LPファーストビュー）。
 *
 * 巨大な囲み枠やAI特有のスプリットプレビューを完全排除し、
 * hidamariの軽快で洗練されたレイアウト（左: タイトル ＆ 趣旨 / 右: 3ステップ進行）に準拠。
 * ファーストビュー内で商品棚（カード一覧）が即座に目に入る高密度・低重心設計。
 */
export function ShopHero({ totalCount }: ShopHeroProps) {
  return (
    <section className="mx-auto max-w-5xl px-4 pt-5 pb-2 sm:px-6">
      {/* ──────────────────────────────────────────────────────────
          1. 1行ヘッダー: 左側コピー ＆ 右側3ステップナビ（hidamariスタイル）
      ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-3.5 border-b border-slate-200/80">
        {/* 左側: カテゴリ ＆ 見出し ＆ サブコピー */}
        <div className="min-w-0 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-[#1b3a63]">
              2027年度 新課程対応
            </span>
            <span className="text-slate-400">／</span>
            <span>A4印刷用 模試PDF直販ストア</span>
          </div>

          <h1 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            数学記述模試の演習PDFを選ぶ
          </h1>

          <p className="mt-1 text-xs text-slate-600 leading-relaxed">
            国公立二次・難関大二次対策の数学オリジナル記述模試PDF直販。「問題冊子」「大問別所定解答用紙5枚」「模範解答・別解」「小問別加点減点表」（全32〜33p）を決済後すぐにダウンロードいただけます。
          </p>
        </div>

        {/* 右側: 軽快な3ステップナビ（hidamariスタイル） */}
        <nav aria-label="ご購入の流れ" className="w-full sm:w-[290px] shrink-0">
          <ol className="grid grid-cols-3 text-center">
            <li className="relative flex flex-col items-center">
              <span className="relative z-10 grid h-7 w-7 place-items-center rounded-full text-[11px] font-bold bg-[#1b3a63] text-white shadow-xs">
                1
              </span>
              <span className="mt-1.5 truncate text-[11px] font-bold text-slate-900">
                模試PDF選択
              </span>
            </li>
            <li className="relative flex flex-col items-center">
              <span
                aria-hidden="true"
                className="absolute right-1/2 top-3.5 h-px w-full bg-slate-200"
              />
              <span className="relative z-10 grid h-7 w-7 place-items-center rounded-full text-[11px] font-semibold border border-slate-200 bg-white text-slate-500">
                2
              </span>
              <span className="mt-1.5 truncate text-[11px] font-medium text-slate-600">
                オンライン決済
              </span>
            </li>
            <li className="relative flex flex-col items-center">
              <span
                aria-hidden="true"
                className="absolute right-1/2 top-3.5 h-px w-full bg-slate-200"
              />
              <span className="relative z-10 grid h-7 w-7 place-items-center rounded-full text-[11px] font-semibold border border-slate-200 bg-white text-slate-500">
                3
              </span>
              <span className="mt-1.5 truncate text-[11px] font-medium text-slate-600">
                即時ダウンロード
              </span>
            </li>
          </ol>
        </nav>
      </div>

      {/* ──────────────────────────────────────────────────────────
          2. スペック・安心シグナルのコンパクトストリップ（縦幅をとらない水平配置）
      ────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-y-1.5 pt-2 text-[11px] text-slate-500">
        <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1">
          <span className="flex items-center gap-1 font-medium text-slate-700">
            <FileTextIcon size={13} className="text-[#1b3a63]" />
            <span>A4原寸ベクターPDF（全32p同梱）</span>
          </span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1 font-medium text-slate-700">
            <DownloadIcon size={13} className="text-[#1b3a63]" />
            <span>決済完了後その場で即時DL</span>
          </span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1 font-medium text-slate-700">
            <CheckIcon size={13} className="text-[#1b3a63]" />
            <span>小問別加点・減点表つき</span>
          </span>
        </div>
        <span className="text-slate-500">
          領収書PDF 自動即時発行（経費精算対応）
        </span>
      </div>
    </section>
  );
}
