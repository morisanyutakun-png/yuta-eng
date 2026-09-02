import Image from "next/image";

import type { Book, University } from "@/lib/data";
import { yearRange } from "@/lib/data";
import { shortName } from "@/lib/seo";
import { site } from "@/lib/site";

function Cover({ book, priority = false }: { book: Book; priority?: boolean }) {
  return (
    <Image
      src={`/covers/${book.asin}.webp`}
      alt={`${book.title}の表紙`}
      width={310}
      height={438}
      priority={priority}
      sizes="(max-width: 640px) 33vw, 160px"
      className="w-full rounded-[3px] border border-rule shadow-[0_1px_3px_rgba(26,29,33,0.14)]"
    />
  );
}

function BookRow({ book }: { book: Book }) {
  const meta = [book.pages ? `${book.pages}ページ` : null, book.price ? `¥${book.price.toLocaleString()}` : null]
    .filter(Boolean)
    .join("・");

  return (
    <li className="flex gap-4 border-t border-rule pt-5 first:border-0 first:pt-0">
      <div className="w-[86px] shrink-0 sm:w-[104px]">
        <Cover book={book} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="serif text-[0.95rem] leading-snug text-ink">{book.title}</p>
        {meta && <p className="mt-1 text-[0.75rem] text-ink-3">{meta}</p>}
        <a
          href={book.amazonUrl}
          rel="noopener nofollow sponsored"
          target="_blank"
          className="mt-auto flex min-h-11 items-center justify-center gap-1.5 rounded-[4px] bg-[#ffa41c] px-4 text-[0.9rem] font-bold text-[#111] transition-colors hover:bg-[#ffb454]"
        >
          Amazonで見る
          <svg aria-hidden="true" viewBox="0 0 20 20" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M7 13 13 7M8 7h5v5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </li>
  );
}

/** ページ途中に置く軽い導線。分析を読んでいる途中で目に入るようにする。 */
export function InlineCta({ u }: { u: University }) {
  const book = u.books[0];
  const short = shortName(u);
  return (
    <aside className="my-11 border-y border-navy/20 bg-paper-2/70 px-4 py-5">
      <div className="flex gap-4">
        <div className="w-[76px] shrink-0">
          <Cover book={book} priority />
        </div>
        <div className="min-w-0">
          <p className="text-[0.68rem] font-bold tracking-wide text-accent">この分析からつくった問題集</p>
          <p className="serif mt-1 text-[1.02rem] leading-snug text-ink">
            {short}数学の予想問題を、採点基準つきで解く
          </p>
          <p className="prose-ja mt-1.5 text-[0.8rem] text-ink-2">
            本番形式の全5回。どこで何点入るかまで示してあります。
          </p>
          <a
            href={book.amazonUrl}
            rel="noopener nofollow sponsored"
            target="_blank"
            className="mt-3 inline-flex min-h-10 items-center gap-1.5 rounded-[4px] bg-[#ffa41c] px-4 text-[0.85rem] font-bold text-[#111] transition-colors hover:bg-[#ffb454]"
          >
            Amazonで見る
            <svg aria-hidden="true" viewBox="0 0 20 20" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M7 13 13 7M8 7h5v5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </aside>
  );
}

/** ページ末尾の本命の導線。全巻を表紙つきで並べる。 */
export function BookCta({ u }: { u: University }) {
  const years = yearRange(u);
  const short = shortName(u);
  return (
    <section aria-labelledby="cta-heading" className="border border-navy/25 bg-white p-5 sm:p-7">
      <p className="text-[0.68rem] font-bold tracking-wide text-accent">{site.seriesName}</p>
      <h2 id="cta-heading" className="serif mt-1.5 text-[1.25rem] leading-snug text-ink sm:text-[1.4rem]">
        {short}数学の予想問題集
      </h2>
      <p className="prose-ja mt-2.5 text-[0.9rem] text-ink-2">
        このページの{years ? `${years}の` : ""}出題分析をもとに書き下ろした、{short}数学のオリジナル予想問題集です。本番と同じ形式の問題に加えて、
        <strong className="font-semibold text-ink">どこで何点入るかを示した採点基準</strong>
        と別解を収録しています。
      </p>
      <ul className="mt-6 space-y-5">
        {u.books.map((b) => (
          <BookRow key={b.asin} book={b} />
        ))}
      </ul>
      <p className="mt-5 border-t border-rule pt-3 text-[0.7rem] leading-relaxed text-ink-3">
        非公式の自作教材です。{u.university}とは関係ありません。価格・在庫は Amazon の表示が優先されます。
      </p>
    </section>
  );
}
