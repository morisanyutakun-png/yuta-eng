import Image from "next/image";
import Link from "next/link";

import { AmazonButton } from "@/components/amazon-button";
import { AsideCard } from "@/components/article-layout";
import { bookMetaLine, yen, type Book } from "@/lib/books";

/**
 * 画面が広いときに、本文の横へ出しっぱなしにする購入導線。
 * スクロールしても視界に残るので、読み終えてから探し直さなくて済む。
 */
export function AsideBook({
  eyebrow,
  title,
  cover,
  href,
  book,
  detail,
  note,
}: {
  eyebrow: string;
  title: string;
  cover: string;
  /** Amazon の商品ページ */
  href: string;
  book?: Pick<Book, "pages" | "price" | "released"> | null;
  /** サイト内の詳しいページ（あれば） */
  detail?: { href: string; label: string };
  note?: string;
}) {
  return (
    <AsideCard>
      <p className="text-[0.66rem] font-bold tracking-wide text-accent">{eyebrow}</p>
      <div className="mt-2 flex gap-3">
        <Image
          src={cover}
          alt={`${title}の表紙`}
          width={310}
          height={438}
          sizes="88px"
          className="h-fit w-[88px] shrink-0 rounded-[2px] border border-rule shadow-[0_1px_4px_rgba(26,29,33,0.16)]"
        />
        <div className="min-w-0">
          <p className="serif text-[0.92rem] leading-snug text-ink">{title}</p>
          {note && <p className="prose-ja mt-1 text-[0.72rem] text-ink-2">{note}</p>}
          <p className="mt-1 text-[0.7rem] tabular-nums text-ink-3">
            {[yen(book?.price), bookMetaLine(book)].filter(Boolean).join("・")}
          </p>
        </div>
      </div>
      <AmazonButton href={href} className="mt-3 w-full !min-h-10 !text-[0.85rem]" />
      {detail && (
        <Link
          href={detail.href}
          className="mt-2 block text-center text-[0.78rem] font-semibold text-navy underline underline-offset-4"
        >
          {detail.label}
        </Link>
      )}
    </AsideCard>
  );
}
