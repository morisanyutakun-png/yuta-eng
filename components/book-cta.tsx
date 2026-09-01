import type { Book, University } from "@/lib/data";
import { yearRange } from "@/lib/data";
import { site } from "@/lib/site";

function BookRow({ book }: { book: Book }) {
  const meta = [book.pages ? `${book.pages}ページ` : null, book.price ? `¥${book.price.toLocaleString()}` : null]
    .filter(Boolean)
    .join("・");

  return (
    <li className="rounded-xl border border-amber-200 bg-white p-4 dark:border-amber-900/60 dark:bg-slate-900">
      <p className="head-ja text-[0.9rem] font-semibold leading-snug text-slate-900 dark:text-slate-100">
        {book.title}
      </p>
      {meta && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{meta}</p>}
      <a
        href={book.amazonUrl}
        rel="noopener nofollow sponsored"
        target="_blank"
        className="mt-3 flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-4 text-sm font-bold text-slate-900 transition-colors hover:bg-amber-400"
      >
        Amazonで見る
        <svg aria-hidden="true" viewBox="0 0 20 20" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M7 13 13 7M8 7h5v5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="sr-only">（Amazon.co.jp・別タブで開きます）</span>
      </a>
    </li>
  );
}

/** 大学ページの導線。分析に対応する予想問題集を Amazon へ直接つなぐ。 */
export function BookCta({ u }: { u: University }) {
  const years = yearRange(u);
  return (
    <section
      aria-labelledby="cta-heading"
      className="rounded-2xl border border-amber-300 bg-amber-50/70 p-5 dark:border-amber-900 dark:bg-amber-950/25"
    >
      <h2 id="cta-heading" className="head-ja text-[1.05rem] font-bold text-slate-900 dark:text-slate-100">
        この分析からつくった予想問題集
      </h2>
      <p className="prose-ja mt-2 text-sm text-slate-700 dark:text-slate-300">
        {years ? `${years}の` : ""}この出題分析をもとに書き下ろした{u.name}のオリジナル予想問題集です。
        本番形式の問題に加えて、
        <strong className="font-semibold text-slate-900 dark:text-slate-100">
          どこで何点入るかを示した採点基準
        </strong>
        と別解を収録しています。
      </p>
      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {u.books.map((b) => (
          <BookRow key={b.asin} book={b} />
        ))}
      </ul>
      <p className="mt-3 text-[0.7rem] text-slate-500 dark:text-slate-400">
        {site.seriesName}（非公式）。各大学とは関係ありません。
      </p>
    </section>
  );
}
