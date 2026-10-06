import Image from "next/image";
import Link from "next/link";

import { kanseiAll, type Kansei } from "@/lib/series";

/** 「8分野・29題・116小問」のような1行。 */
export function kanseiFacts(k: Kansei) {
  return [
    `${k.total.fields}分野`,
    `${k.total.problems}題`,
    k.total.subquestions ? `${k.total.subquestions}小問` : null,
  ]
    .filter(Boolean)
    .join("・");
}

/**
 * 大学別の完成演習を並べる一覧。
 * 公開済みは表紙つきで各大学のページへ、未公開は「近日追加予定」として並べるだけにする
 * （表紙は発売までに変わりうるので出さない）。
 */
export function KanseiCards({ headingLevel: H = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const published = kanseiAll.filter((k) => k.published);
  const upcoming = kanseiAll.filter((k) => !k.published);
  return (
    <div>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-4">
        {published.map((k) => (
          <li key={k.slug}>
            <Link href={`/kansei/${k.slug}`} className="group block">
              <Image
                src={k.cover}
                alt={`${k.name} 分野別完成演習の表紙`}
                width={310}
                height={438}
                sizes="(max-width: 640px) 45vw, 160px"
                className="w-full rounded-[2px] border border-rule shadow-[0_1px_2px_rgba(21,24,28,0.07)] transition-shadow group-hover:shadow-[0_2px_6px_rgba(21,24,28,0.12)]"
              />
              <H className="mt-2 text-[0.86rem] font-semibold leading-snug text-ink transition-colors group-hover:text-navy">
                {k.name}
              </H>
              <p className="mt-0.5 text-[0.7rem] tabular-nums text-ink-3">{kanseiFacts(k)}</p>
            </Link>
          </li>
        ))}
      </ul>
      {/* 近日追加予定は表紙を出さない（発売までに変わりうる）。ASIN が入れば上の並びに加わる */}
      {upcoming.length > 0 && (
        <p className="mt-5 border-t border-dashed border-rule pt-3 text-[0.8rem] text-ink-2">
          <span className="mr-2 text-[0.7rem] font-bold text-accent">近日追加予定</span>
          {upcoming.map((k) => k.name).join("・")}
        </p>
      )}
    </div>
  );
}
