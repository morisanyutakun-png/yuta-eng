import Link from "next/link";

import { sectionStyle, sections, type SectionKey } from "@/lib/sections";

/**
 * 「いま何をしたいか」から入口を選ばせる4枚。
 *
 * このサイトには分析・診断・演習・予想問題集と性質の違うものが並んでいて、
 * 名前を見ただけではどれが自分向けか分からない。だから**名前ではなく用件**を
 * 大きく出し、行き先の名前はその下に小さく添える。
 *
 * 枠の色はそれぞれの行き先の柱の色にそろえる。先のページを開いたときに
 * 同じ色が出てくるので、どこへ来たのかが分かる。
 *
 * 文章は1行に収める。ここで説明しきろうとすると、4つ並べた意味がなくなる。
 */

export type Intent = {
  /** 用件。利用者の言葉で書く */
  want: string;
  /** 行き先の名前 */
  to: string;
  /** 1行の説明 */
  body: string;
  href: string;
  section: SectionKey;
  /** 無料資料と購入する書籍を、初見でも区別できるようにする。 */
  kind: string;
};

export function IntentCards({ items }: { items: Intent[] }) {
  return (
    <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {items.map((it) => (
        <li key={it.href}>
          <Link
            href={it.href}
            style={sectionStyle(it.section)}
            className="group flex h-full flex-col border border-rule bg-white transition-colors hover:border-[var(--sec)]"
          >
            <span className="sec-rule" />
            <span className="flex flex-1 flex-col px-3 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-4">
              <span className="text-[0.75rem] font-bold tabular-nums tracking-[0.1em] text-[var(--sec)]">
                {it.kind}
              </span>
              <span className="serif mt-2 text-[0.97rem] leading-snug text-ink sm:text-[1.05rem]">{it.want}</span>
              <span className="prose-ja mt-2.5 hidden text-[0.86rem] leading-[1.85] text-ink-2 sm:block">{it.body}</span>
              <span className="mt-4 flex items-center gap-1.5 pt-1 text-[0.86rem] font-semibold text-[var(--sec)]">
                {it.to}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className="size-3 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                >
                  <path d="m7 4 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** 柱のラベルをそのまま行き先の名前に使うとき */
export const sectionLabel = (k: SectionKey) => sections[k].eyebrow;
