import Link from "next/link";

/**
 * ストア最上部の薄いお知らせリボン（EC標準の案内バー）。
 *
 * SaaS的な長文説明やステップバーを完全撤去し、
 * わずか36px前後の帯で信頼情報（新課程対応・即時DL・ベクターPDF）を伝達。
 * すぐ下にカテゴリータブと商品棚が展開する。
 */
export function StoreAnnouncementBar() {
  return (
    <div className="border-b border-slate-200 bg-white py-2 text-xs text-slate-600">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="rounded bg-[#1b3a63]/10 px-2 py-0.5 text-[11px] font-bold text-[#1b3a63]">
            2027年度 新課程対応
          </span>
          <span className="font-semibold text-slate-800">
            国公立二次・難関大二次対策 数学記述模試 直販ストア
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-500">
          <span>問題冊子・所定解答用紙5枚・模範解答・小問別採点基準（全32p）</span>
          <span className="text-slate-300">|</span>
          <span className="font-bold text-[#1b3a63]">決済後その場で即時DL</span>
        </div>
      </div>
    </div>
  );
}

