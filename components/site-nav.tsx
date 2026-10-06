import Link from "next/link";

/**
 * サイト内のナビゲーション。
 *
 * 画面の広いときは横に並べ、狭いときは1つのボタンにまとめて開かせる。
 * 開閉は `<details>` でやっていて JavaScript を使わない。
 * このサイトは全ページを書き出した静的サイトなので、
 * メニューを開くためだけに実行時のコードを足したくない。
 *
 * 並びは「何を見に来たか」の順。分析・解答・教材・診断がこのサイトの4本柱で、
 * 先生向けはその次に置く。横並びのときも折りたたみのときも**同じ項目**を出す。
 * 画面が狭いと消える項目がある、という状態にしない。
 */

type Item = { href: string; label: string; note: string };

/** 折りたたみでは説明も出す。横並びでは label だけ使う。 */
export function navItems(hasSolutions: boolean): Item[] {
  return [
    { href: "/universities", label: "大学別分析", note: "大学ごとの出題傾向と対策" },
    ...(hasSolutions
      ? [{ href: "/kaisetsu", label: "過去問解答", note: "当サイト独自の解答・解説" }]
      : []),
    { href: "/moshi", label: "オンライン模試", note: "大学別の数学模試・参加申込受付中" },
    { href: "/kansei", label: "完成演習", note: "過去問の前に解く分野別演習" },
    { href: "/shindan", label: "志望校診断", note: "いまの実力から受かる大学を探す" },
    { href: "/books", label: "教材一覧", note: "刊行している全冊を学習段階順に" },
    { href: "/educators", label: "先生方へ", note: "学校・塾・予備校での採用について" },
  ];
}

export function SiteNav({ hasSolutions }: { hasSolutions: boolean }) {
  const items = navItems(hasSolutions);

  return (
    <>
      {/* 広い画面：横に並べる */}
      <nav aria-label="サイト内" className="hidden items-center gap-5 text-[0.8rem] text-ink-2 lg:flex">
        {items.map((it) => (
          <Link key={it.href} href={it.href} className="transition-colors hover:text-navy">
            {it.label}
          </Link>
        ))}
      </nav>

      {/* 狭い画面：ボタンひとつにまとめる */}
      <details className="group relative lg:hidden">
        <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1.5 pl-3 text-[0.8rem] text-ink-2 [&::-webkit-details-marker]:hidden">
          <span className="sr-only">メニューを開く</span>
          <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 5.5h14M3 10h14M3 14.5h14" strokeLinecap="round" className="group-open:hidden" />
            <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" className="hidden group-open:block" />
          </svg>
        </summary>

        <nav
          aria-label="サイト内"
          className="absolute right-0 top-[calc(100%+0.6rem)] z-40 w-[17.5rem] border border-rule bg-paper shadow-[0_4px_16px_rgba(21,24,28,0.14)]"
        >
          <ul className="divide-y divide-rule">
            {items.map((it) => (
              <li key={it.href}>
                <Link href={it.href} className="block px-4 py-3 transition-colors hover:bg-paper-2">
                  <span className="block text-[0.9rem] font-semibold text-ink">{it.label}</span>
                  <span className="mt-0.5 block text-[0.74rem] leading-snug text-ink-3">{it.note}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </details>
    </>
  );
}
