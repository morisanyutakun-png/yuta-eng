interface ShopHeaderProps {
  totalCount?: number;
}

/**
 * 模試演習ストア（ECサイト）の導入部。
 *
 * 重たい囲み枠や冗長な説明文を完全に排し、
 * hidamariの「タイトル ＋ 3ステップ進捗」の軽快で洗練されたレイアウトを採用。
 * すぐ下に商品カードが並び、PDF直販ストアであることが一目で伝わる。
 */
export function ShopHeader({ totalCount }: ShopHeaderProps) {
  return (
    <section className="mx-auto max-w-5xl px-4 pt-6 pb-3 sm:px-6">
      <div className="grid w-full gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-8 pb-3 border-b border-slate-200/80">
        {/* 左側: タイトル ＆ サブコピー */}
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1b3a63] mb-1">
            <span className="font-bold">2027年度 新課程対応</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500">A4印刷用 模試PDF直販</span>
          </div>
          <h1 className="text-[22px] sm:text-[28px] font-bold leading-tight tracking-tight text-slate-900">
            模試PDFを選ぶ
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            決済完了後、問題冊子・所定解答用紙・模範解答・採点基準のA4ベクターPDFをその場で即時ダウンロードいただけます。
          </p>
        </div>

        {/* 右側: 軽快な3ステップナビ（hidamariスタイル） */}
        <nav aria-label="ご購入の流れ" className="w-full sm:w-[320px] shrink-0">
          <ol className="grid grid-cols-3">
            <li aria-current="step" className="relative flex min-w-0 flex-col items-center">
              <span className="relative z-10 grid h-7 w-7 place-items-center rounded-full text-[11px] font-bold bg-[#1b3a63] text-white shadow-xs">
                1
              </span>
              <span className="mt-1.5 truncate text-[11px] font-bold text-slate-900">
                模試PDF選択
              </span>
            </li>
            <li className="relative flex min-w-0 flex-col items-center">
              <span aria-hidden="true" className="absolute right-1/2 top-3.5 h-px w-full bg-slate-200" />
              <span className="relative z-10 grid h-7 w-7 place-items-center rounded-full text-[11px] font-semibold border border-slate-200 bg-white text-slate-400">
                2
              </span>
              <span className="mt-1.5 truncate text-[11px] text-slate-500 font-medium">
                オンライン決済
              </span>
            </li>
            <li className="relative flex min-w-0 flex-col items-center">
              <span aria-hidden="true" className="absolute right-1/2 top-3.5 h-px w-full bg-slate-200" />
              <span className="relative z-10 grid h-7 w-7 place-items-center rounded-full text-[11px] font-semibold border border-slate-200 bg-white text-slate-400">
                3
              </span>
              <span className="mt-1.5 truncate text-[11px] text-slate-500 font-medium">
                即時ダウンロード
              </span>
            </li>
          </ol>
        </nav>
      </div>
    </section>
  );
}
