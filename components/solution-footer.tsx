import Image from "next/image";
import Link from "next/link";

import { AmazonButton } from "@/components/amazon-button";
import { SampleViewer } from "@/components/look-inside";
import { amazonUrl, bookMetaLine, yen } from "@/lib/books";
import { getUniversity } from "@/lib/data";
import { SAMPLE_NOTICE, sampleFor } from "@/lib/samples";
import { subject } from "@/lib/seo";
import { getKansei } from "@/lib/series";
import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 解説のあとに置く案内。
 *
 * ここに来た人は、その大学の、その年度の問題を1問ずつ読み終えたところ。
 * いちばん知りたいのは「同じ書き方の問題と解説が、まとまって手に入るか」なので、
 * 表紙と中身（試し読み）をその場で見せる。別のページへ飛ばして探させない。
 *
 * ただし解説は最後まで無料で読めるようにしてあり、
 * 読むために会員登録や購入を求めることはしない。ここから先は案内だけ。
 */
export function SolutionFooter({ set }: { set: SolutionSet }) {
  const u = getUniversity(set.slug);
  if (!u) return null;
  const book = u.books[0];
  const sample = book ? sampleFor(book.asin) : undefined;
  const kansei = getKansei(set.slug);

  return (
    <section aria-labelledby="next" className="mt-16 border-t-2 border-ink/80 pt-8">
      {book && (
        <>
          <p className="text-[0.75rem] font-bold tracking-wide text-ink-3">当サイト運営者が制作した教材</p>
          <h2 id="next" className="serif mt-1.5 text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
            同じ形式の問題を、{book.rounds ?? 5}回分
          </h2>

          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:gap-6">
            <Link href={`/univ/${u.slug}#books`} className="shrink-0 self-start">
              <Image
                src={`/covers/${book.asin}.webp`}
                alt={`${book.title}の表紙`}
                width={310}
                height={438}
                sizes="(max-width: 640px) 40vw, 150px"
                className="w-[9.5rem] max-w-[40vw] rounded-[2px] border border-rule shadow-[0_1px_2px_rgba(21,24,28,0.07)]"
              />
            </Link>

            <div className="min-w-0 flex-1">
              <p className="text-[1rem] font-semibold leading-snug text-ink">{book.title}</p>
              <p className="prose-ja mt-2 text-[0.93rem] leading-[1.95] text-ink-2">
                {subject(u)}の出題を分析して書き下ろした予想問題集です。過去問そのものは入っていません。
                本番と同じ試験時間・大問構成で{book.rounds ?? 5}回分、
                解答・詳解{u.books.some((b) => b.altSolutions) ? "・別解" : ""}に加えて、
                小問ごとの加点・減点つきの採点表を収録しています。
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2.5">
                <AmazonButton href={amazonUrl(book.asin)} label="Amazonで見る" />
                <Link
                  href={`/univ/${u.slug}#books`}
                  className="text-[0.86rem] font-semibold text-navy underline underline-offset-4"
                >
                  {u.books.length > 1 ? `全${u.books.length}巻を見る` : "収録内容を見る"}
                </Link>
                <span className="text-[0.8rem] tabular-nums text-ink-3">
                  {[yen(book.price), bookMetaLine(book)].filter(Boolean).join("・")}
                </span>
              </div>
            </div>
          </div>

          {sample && (
            <div className="mt-8">
              <h3 className="text-[0.93rem] font-semibold text-ink">中身を試し読みする</h3>
              <p className="prose-ja mt-1.5 text-[0.86rem] leading-[1.9] text-ink-2">
                {SAMPLE_NOTICE}画像を押すと拡大できます。
              </p>
              <SampleViewer pages={sample.pages} title={book.title} />
              <p className="mt-3 text-[0.86rem]">
                <a
                  href={sample.pdf}
                  target="_blank"
                  rel="noopener"
                  data-outbound="sample"
                  className="font-semibold text-navy underline underline-offset-4"
                >
                  抜粋をPDFでまとめて見る
                </a>
              </p>
            </div>
          )}
        </>
      )}

      <div className="mt-10 border-t border-rule pt-6">
        <h3 className="text-[0.93rem] font-semibold text-ink">関連するページ</h3>
        <ul className="mt-2.5 space-y-2 text-[0.93rem]">
          <li>
            <Link href={`/univ/${u.slug}`} className="font-semibold text-navy underline underline-offset-4">
              {subject(u)}の傾向と対策
            </Link>
            <span className="ml-1.5 text-ink-2">
              — 年度別・分野別の出題分析。この年度が全体のどこに位置するかが分かります。
            </span>
          </li>
          {kansei?.published && (
            <li>
              <Link href={`/kansei/${kansei.slug}`} className="font-semibold text-navy underline underline-offset-4">
                {kansei.name} 分野別完成演習
              </Link>
              <span className="ml-1.5 text-ink-2">
                — 過去問に入る前に、頻出{kansei.total.fields}分野を段階的に固める演習書です。
              </span>
            </li>
          )}
          <li>
            <Link href={`/kaisetsu/${set.slug}`} className="font-semibold text-navy underline underline-offset-4">
              {subject(u)}のほかの年度
            </Link>
            <span className="ml-1.5 text-ink-2">— 同じ大学の解答・解説一覧。</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
