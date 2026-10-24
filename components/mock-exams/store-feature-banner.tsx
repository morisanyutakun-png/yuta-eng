import { PaymentBrandBadges } from "@/components/mock-exams/payment-badges";

/**
 * ヘッダー直下の極細ユーティリティバー（教育機関・大手出版EC仕様）。
 *
 * 白いカード枠や左青太線、アイコン丸バッジなどのAIテンプレを排し、
 * ヘッダー直下に落ち着いた薄い帯（#e8ecf2）で収録内容・形式・納品・決済手段を端正に提示する。
 */
export function StoreUtilityBar() {
  return (
    <aside
      aria-label="模試演習パッケージの納品仕様"
      className="border-b border-[#dce2ea] bg-[#e8ecf2] py-2 text-xs text-[#334155]"
    >
      <div className="mx-auto flex max-w-[1040px] flex-wrap items-center justify-between gap-x-6 gap-y-1.5 px-3 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-5 gap-y-1 text-[11px] sm:text-xs">
          <span className="leading-snug break-words">
            <strong className="font-semibold text-slate-800">収録内容：</strong>
            問題冊子・所定解答用紙5枚・模範解答・採点基準（全32p）
          </span>
          <span className="hidden sm:inline text-[#cbd5e1]" aria-hidden="true">
            |
          </span>
          <span className="leading-snug break-words">
            <strong className="font-semibold text-slate-800">形式：</strong>
            A4原寸ベクターPDF（自宅・コンビニ印刷対応）
          </span>
          <span className="hidden sm:inline text-[#cbd5e1]" aria-hidden="true">
            |
          </span>
          <span className="leading-snug break-words">
            <strong className="font-semibold text-slate-800">納品：</strong>
            オンライン決済後 即時ダウンロード
          </span>
        </div>

        {/* 右端: 決済ブランドの視覚的提示 */}
        <div className="hidden sm:flex items-center gap-2 text-slate-600">
          <span className="text-[11px] font-medium text-slate-500 whitespace-nowrap">対応決済:</span>
          <PaymentBrandBadges compact />
        </div>
      </div>
    </aside>
  );
}

// 互換性エイリアス
export const StoreFeatureBanner = StoreUtilityBar;
