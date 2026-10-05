import { AmazonButton } from "@/components/amazon-button";
import { SampleViewer } from "@/components/look-inside";
import { amazonUrl, bookMetaLine, yen } from "@/lib/books";
import { SAMPLE_NOTICE, sampleFor } from "@/lib/samples";

type SampleBook = {
  asin: string;
  /** 表示する書名（巻までわかる形） */
  title: string;
  price?: number | null;
  pages?: number | null;
  released?: string | null;
};

/**
 * 「書籍の中身を見る」。
 *
 * 書店で手に取ったときと同じように、試験の扉・問題・解答を1ページずつ見てもらう。
 * 抜粋が用意できていない本では何も出さない（空の枠や押せないボタンを置かない）。
 */
export function LookInsideSection({
  book,
  className = "",
  headingId = "look-inside",
}: {
  book: SampleBook;
  className?: string;
  headingId?: string;
}) {
  const sample = sampleFor(book.asin);
  if (!sample) return null;

  return (
    <section aria-labelledby={headingId} className={`mt-14 ${className}`}>
      <h2 id={headingId} className="rule-mark serif text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
        書籍の中身を見る（試し読み）
      </h2>
      <p className="prose-ja mt-3 text-[0.9rem] text-ink-2">
        <span className="font-semibold text-ink">{book.title}</span>
        から、{sample.pages.length}ページを抜き出して載せています。{SAMPLE_NOTICE}
        画像を押すと拡大できます。
      </p>

      <SampleViewer pages={sample.pages} title={book.title} />

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2.5">
        <AmazonButton href={amazonUrl(book.asin)} label="Amazonで見る" />
        <a
          href={sample.pdf}
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-11 items-center gap-1.5 text-[0.85rem] font-semibold text-navy underline underline-offset-4"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M5 2.5h6l4 4v11H5z" strokeLinejoin="round" />
            <path d="M11 2.5v4h4" strokeLinejoin="round" />
          </svg>
          抜粋をPDFでまとめて見る
        </a>
        <span className="text-[0.74rem] tabular-nums text-ink-3">
          {[yen(book.price), bookMetaLine(book)].filter(Boolean).join("・")}
        </span>
      </div>
    </section>
  );
}
