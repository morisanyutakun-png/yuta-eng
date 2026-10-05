import Link from "next/link";

import { amazonUrl, bookMetaLine, yen } from "@/lib/books";
import { getUniversity } from "@/lib/data";
import { subject } from "@/lib/seo";
import { sampleFor } from "@/lib/samples";
import type { SolutionSet } from "@/lib/solutions/types";

/**
 * 解説のあとに置く案内。
 *
 * 解説は最後まで読めるようにしてあり、ここから先は「次に何を見るか」の案内だけ。
 * 読むために会員登録や購入を求めることはしない。
 * 教材は当サイトの運営者が作ったものなので、そうと分かるように書く。
 */
export function SolutionFooter({ set }: { set: SolutionSet }) {
  const u = getUniversity(set.slug);
  if (!u) return null;
  const book = u.books[0];
  const sample = book ? sampleFor(book.asin) : undefined;

  return (
    <section aria-labelledby="next" className="mt-14 border-t border-rule pt-7">
      <h2 id="next" className="serif text-[1.15rem] text-ink">
        この解説のあとに
      </h2>

      <ul className="mt-3 space-y-2 text-[0.9rem]">
        <li>
          <Link href={`/univ/${u.slug}`} className="font-semibold text-navy underline underline-offset-4">
            {subject(u)}の傾向と対策
          </Link>
          <span className="ml-1.5 text-ink-2">
            — 年度別・分野別の出題分析。この年度が全体のどこに位置するかが分かります。
          </span>
        </li>
        <li>
          <Link href="/kaisetsu" className="font-semibold text-navy underline underline-offset-4">
            過去問の解答解説一覧
          </Link>
          <span className="ml-1.5 text-ink-2">— ほかの大学・年度の解説。</span>
        </li>
      </ul>

      {book && (
        <div className="mt-6 border border-rule bg-paper-2/50 px-5 py-4">
          <p className="text-[0.68rem] font-bold tracking-wide text-ink-3">当サイト運営者が制作した教材</p>
          <p className="mt-1.5 text-[0.95rem] font-semibold leading-snug text-ink">{book.title}</p>
          <p className="prose-ja mt-1.5 text-[0.84rem] leading-[1.9] text-ink-2">
            本番と同じ形式で書き下ろした予想問題集です。過去問そのものは入っていません。
            解答・詳解に加えて、小問ごとの加点・減点つきの採点表を載せています。
          </p>
          <p className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.85rem]">
            {sample && (
              <Link
                href={`/univ/${u.slug}#look-inside`}
                data-outbound="sample"
                className="font-semibold text-navy underline underline-offset-4"
              >
                中身を試し読みする（{sample.pages.length}ページ）
              </Link>
            )}
            <a
              href={amazonUrl(book.asin)}
              target="_blank"
              rel="noopener"
              data-outbound="amazon"
              className="font-semibold text-navy underline underline-offset-4"
            >
              Amazonで見る
            </a>
            <span className="text-[0.74rem] tabular-nums text-ink-3">
              {[yen(book.price), bookMetaLine(book)].filter(Boolean).join("・")}
            </span>
          </p>
        </div>
      )}
    </section>
  );
}
