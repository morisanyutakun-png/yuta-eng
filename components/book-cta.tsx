import type { Book, University } from "@/lib/data";
import { yearRange } from "@/lib/data";
import { site } from "@/lib/site";

function BookRow({ book }: { book: Book }) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-3 border-t border-amber-200/70 py-3 first:border-0 first:pt-0 dark:border-amber-900/50">
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{book.title}</p>
        <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
          {[book.pages ? `${book.pages}ページ` : null, book.price ? `¥${book.price.toLocaleString()}` : null]
            .filter(Boolean)
            .join("・")}
        </p>
      </div>
      <a
        href={book.amazonUrl}
        rel="noopener nofollow sponsored"
        target="_blank"
        className="shrink-0 rounded-md bg-amber-500 px-4 py-2 text-sm font-bold text-slate-900 transition-colors hover:bg-amber-400"
      >
        Amazonで見る
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
      className="rounded-lg border border-amber-300 bg-amber-50/70 p-5 dark:border-amber-900 dark:bg-amber-950/30"
    >
      <h2 id="cta-heading" className="text-base font-bold text-slate-900 dark:text-slate-100">
        この分析からつくった予想問題集
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {site.seriesName}は、{years ? `${years}の` : ""}この出題分析をもとに書き下ろした
        {u.name}のオリジナル予想問題集です。本番形式の問題に加え、
        <strong className="font-semibold">どこで何点入るかを示した採点基準</strong>と別解を収録しています。
      </p>
      <ul className="mt-4">
        {u.books.map((b) => (
          <BookRow key={b.asin} book={b} />
        ))}
      </ul>
    </section>
  );
}
