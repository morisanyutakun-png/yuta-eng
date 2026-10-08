/**
 * ページの上に置く、要点だけの帯。
 *
 * 狭い画面では、見出しと説明文だけが続いて最初の画面が文字で埋まる。
 * 「何が書いてあるか」を読む前に掴めるよう、短い言葉と小さな印を
 * 1行に並べて、罫で仕切る。予約サイトや資料サイトが最上部に置いている、
 * 支払い方法や受付時間の帯と同じ役目のもの。
 *
 * 置くのは3つまで、1つは9文字までにする。狭い画面でも3つとも見えるように
 * するため、等幅の列に収め、長い表記は折り返す。横スクロールは不要。
 * 印は広い画面で文字に添え、狭い画面では省く。
 */

export type FactIcon = "check" | "doc" | "pen" | "clock" | "grid" | "book" | "yen" | "person";

const paths: Record<FactIcon, React.ReactNode> = {
  check: <path d="M4 10.5l4 4 8-9" />,
  doc: (
    <>
      <path d="M5 2.5h7l3.5 3.5V17.5H5z" />
      <path d="M12 2.5V6h3.5" />
    </>
  ),
  pen: (
    <>
      <path d="M3 17l1-4L14 3l3 3L7 16z" />
      <path d="M12.5 4.5l3 3" />
    </>
  ),
  clock: (
    <>
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 5.5V10l3 2" />
    </>
  ),
  grid: (
    <>
      <rect x="2.5" y="3.5" width="15" height="13" />
      <path d="M2.5 8h15M7.5 8v8.5M12.5 8v8.5" />
    </>
  ),
  book: (
    <>
      <path d="M3.5 3.5h5a2 2 0 0 1 2 2v11a2 2 0 0 0-2-2h-5z" />
      <path d="M17 3.5h-5a2 2 0 0 0-2 2v11a2 2 0 0 1 2-2h5z" />
    </>
  ),
  yen: (
    <>
      <path d="M5.5 4l4.5 6 4.5-6" />
      <path d="M6 11h8M6 14h8M10 10v6" />
    </>
  ),
  person: (
    <>
      <circle cx="10" cy="6.5" r="3" />
      <path d="M3.5 17c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5" />
    </>
  ),
};

export function FactStrip({
  items,
  className = "",
}: {
  items: { icon: FactIcon; label: string }[];
  className?: string;
}) {
  if (!items.length) return null;
  return (
    <ul
      className={`-mx-5 grid auto-cols-fr grid-flow-col border-y border-rule bg-paper-2 sm:-mx-6 lg:mx-0 ${className}`}
    >
      {items.map((f) => (
        <li
          key={f.label}
          className="flex min-w-0 items-center justify-center gap-1.5 border-r border-rule px-2 py-2.5 last:border-r-0 sm:justify-start sm:px-5"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="hidden shrink-0 text-[var(--sec,var(--color-navy))] sm:block sm:size-[1.05rem]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {paths[f.icon]}
          </svg>
          <span className="text-center text-[0.74rem] font-medium leading-relaxed text-ink-2 sm:text-left sm:text-[0.78rem]">
            {f.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
