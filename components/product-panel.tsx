import Image from "next/image";
import Link from "next/link";

import { AmazonButton } from "@/components/amazon-button";

/**
 * 教材1点ぶんの紹介。
 *
 * 並びは「表紙 → 教材名 → だれ向けか → 特徴 → 価格 → ボタン」で固定する。
 * 書店や出版社のサイトは、どの本の紹介もこの順で書いてある。
 * 順番がそろっていれば、読む側は2冊目から同じ位置を見るだけで比べられる。
 * ページごとに並びを変えると、そのたびに読み直すことになる。
 *
 * 「だれ向けか」は手元のデータから言えることだけを書く。
 * 対象者を決め打ちで足したり、確かめていない実績を書いたりはしない。
 */
export type Product = {
  /** 表紙画像のパス */
  cover: string;
  /** 表紙の説明（読み上げ用） */
  coverAlt: string;
  /** 教材名 */
  name: string;
  /** だれ向けか。1行で言い切れる範囲だけ */
  audience: string;
  /** 特徴。3点まで。多いと読まれない */
  points: string[];
  /** 価格・ページ数など、買う前に見る数字 */
  meta?: string | null;
  /** サイト内の詳細ページ */
  href: string;
  /** 詳細ページへのリンクの文言 */
  hrefLabel: string;
  /** Amazon の商品ページ。まだ出ていないものは null */
  amazonUrl?: string | null;
};

export function ProductPanel({ p, priority = false }: { p: Product; priority?: boolean }) {
  return (
    <div className="flex gap-4 sm:gap-5">
      <Link href={p.href} className="w-[92px] shrink-0 sm:w-[116px]">
        <Image
          src={p.cover}
          alt={p.coverAlt}
          width={310}
          height={438}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="(max-width: 640px) 92px, 116px"
          className="w-full border border-rule shadow-[0_1px_2px_rgba(21,24,28,0.07)]"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="serif text-[1.02rem] leading-snug text-ink">
          <Link href={p.href} className="hover:text-navy">
            {p.name}
          </Link>
        </h3>

        <p className="mt-1.5 text-[0.8rem] leading-snug text-navy">{p.audience}</p>

        <ul className="prose-ja mt-2 space-y-1 text-[0.86rem] leading-[1.8] text-ink-2">
          {p.points.map((t) => (
            <li key={t} className="flex gap-1.5">
              <span aria-hidden="true" className="shrink-0 text-ink-3">
                ・
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ul>

        {p.meta && <p className="mt-2 text-[0.75rem] tabular-nums text-ink-3">{p.meta}</p>}

        <div className="mt-3 flex flex-wrap items-center gap-2.5">
          <Link href={p.href} className="btn">
            {p.hrefLabel}
          </Link>
          {p.amazonUrl && <AmazonButton href={p.amazonUrl} label="Amazonで見る" />}
        </div>
      </div>
    </div>
  );
}
