import Link from "next/link";

/**
 * ストアの中だけに出す細い帯。
 *
 * サイト共通のヘッダー・フッター（app/layout.tsx）には手を入れず、
 * ストア配下（/mock-exams）の中で「いまストアにいる」ことと、
 * 一覧・表記・本番の模試への行き来をここで済ませる。
 */
export function StoreBar() {
  return (
    <div className="border-b border-rule bg-paper-2">
      <div className="page page-wide flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2">
        <Link href="/mock-exams" className="flex min-h-11 items-center gap-2 text-ink">
          <span aria-hidden="true" className="inline-block size-1.5 bg-[var(--sec)]" />
          <span className="serif text-[0.93rem]">模試演習ストア</span>
          <span className="hidden text-[0.75rem] text-ink-3 sm:inline">問題・解答用紙・解説・採点基準のPDF</span>
        </Link>
        <nav aria-label="ストア内" className="flex flex-wrap items-center gap-x-5 text-[0.8rem] text-ink-2">
          <Link href="/mock-exams" className="flex min-h-11 items-center hover:text-navy">
            模試一覧
          </Link>
          <Link href="/moshi" className="flex min-h-11 items-center hover:text-navy">
            添削付きの本番（入試プレビュー）
          </Link>
          <Link href="/mock-exams/legal" className="flex min-h-11 items-center hover:text-navy">
            特定商取引法に基づく表記
          </Link>
        </nav>
      </div>
    </div>
  );
}

