import Link from "next/link";

/**
 * 模試演習ストア専用のヘッダーナビゲーションバー（Zenn / SEshopスタイル）。
 *
 * 清潔な白基調で、ストア名称・商品一覧・棚管理・特商法・研究室への戻り口を自然な日本語で配置。
 */
export function StoreBar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-2.5 sm:px-6">
        {/* ストアロゴ・名称 */}
        <Link
          href="/mock-exams"
          className="group flex items-center gap-2 text-slate-900 transition-colors"
        >
          <span className="text-xs font-bold tracking-tight text-slate-900 sm:text-sm">
            数学記述模試『入試プレビュー』ストア
          </span>
          <span className="hidden rounded border border-slate-300 bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700 sm:inline">
            A4印刷用PDF直販
          </span>
        </Link>

        {/* ナビゲーションリンク */}
        <nav
          aria-label="ストア内メニュー"
          className="flex flex-wrap items-center gap-x-4 text-xs font-medium text-slate-600 sm:gap-x-5"
        >
          <Link
            href="/mock-exams"
            className="text-slate-900 font-bold hover:text-slate-700 transition-colors"
          >
            商品一覧
          </Link>
          <Link
            href="/mock-exams/shelf"
            className="font-medium text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1"
          >
            <span>本棚管理</span>
            <span className="text-[10px]">↗</span>
          </Link>
          <Link
            href="/mock-exams/legal"
            className="hover:text-slate-900 transition-colors"
          >
            特定商取引法表記
          </Link>
          <span className="text-slate-200">|</span>
          <Link
            href="/"
            className="hover:text-slate-900 transition-colors text-slate-500"
          >
            ← 研究室トップ
          </Link>
        </nav>
      </div>
    </header>
  );
}
