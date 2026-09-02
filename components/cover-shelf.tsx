import Image from "next/image";
import Link from "next/link";

import { universities } from "@/lib/data";
import { shortName } from "@/lib/seo";
import { groupOrder } from "@/lib/site";

/**
 * トップの最初の画面に置く表紙の棚。
 * 横に流して並べるので、スマホでも最初の画面に表紙が入る。
 * 1枚ずつが大学ページへの入口を兼ねる。
 */
export function CoverShelf() {
  // 検索されやすい大学から先に並べる
  const order: readonly string[] = groupOrder;
  const list = [...universities].sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group));

  return (
    <section aria-labelledby="shelf-heading" className="mt-6">
      <h2 id="shelf-heading" className="sr-only">
        大学別の分析を表紙から探す
      </h2>
      <ul className="scroll-hint -mx-5 flex snap-x snap-mandatory scroll-pl-5 gap-3 overflow-x-auto px-5 pb-2 sm:-mx-6 sm:scroll-pl-6 sm:px-6">
        {list.map((u, i) => (
          <li key={u.slug} className="w-[104px] shrink-0 snap-start sm:w-[116px]">
            <Link href={`/univ/${u.slug}`} className="group block">
              <Image
                src={`/covers/thumb/${u.books[0].asin}.webp`}
                alt={`${shortName(u)}数学の傾向と対策`}
                width={160}
                height={226}
                // 最初の画面に入る数枚だけ先に読む
                priority={i < 4}
                loading={i < 4 ? undefined : "lazy"}
                sizes="(max-width: 640px) 104px, 116px"
                className="w-full rounded-[2px] border border-rule shadow-[0_1px_4px_rgba(26,29,33,0.16)] transition-shadow group-hover:shadow-[0_3px_10px_rgba(26,29,33,0.24)]"
              />
              <span className="mt-1.5 block truncate text-[0.74rem] text-ink-2 transition-colors group-hover:text-navy">
                {shortName(u)}数学
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-1 text-[0.68rem] text-ink-3">
        横にスクロールすると{universities.length}大学すべて出てきます
      </p>
    </section>
  );
}
