import type { SectionKey } from "@/lib/sections";

/**
 * 柱ごとの記号。
 *
 * 「このページは何をするところか」を、文字を読む前に伝えるための線画。
 * 写真や挿絵ではなく、そのページで実際に出てくるもの（表・答案・棒・目盛り・
 * 背表紙・黒板）をそのまま簡略に描く。意味の分からない飾りは置かない。
 *
 * 色は `currentColor` ひとつ。柱の色は呼ぶ側で決める。
 * 読み上げには出さない（隣に必ず文字の見出しがある）。
 */

const base = {
  viewBox: "0 0 48 48",
  "aria-hidden": true as const,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** 大学別分析：年度と分野の表。頻出の列だけ塗る */
function Table({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <rect x="7" y="9" width="34" height="30" />
      <path d="M7 17h34M17 17v22M28 17v22" />
      <path d="M7 25h34M7 32h34" opacity="0.55" />
      <rect x="28" y="17" width="13" height="8" fill="currentColor" opacity="0.18" stroke="none" />
      <rect x="28" y="32" width="13" height="7" fill="currentColor" opacity="0.18" stroke="none" />
    </svg>
  );
}

/** 過去問の解答・解説：書いた答案に印が入る */
function Sheet({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M11 7h20l6 6v28H11z" />
      <path d="M31 7v6h6" />
      <path d="M16 21h11M16 27h14M16 33h8" opacity="0.6" />
      <path d="M26 33l3.5 4L37 27" strokeWidth="2.2" />
    </svg>
  );
}

/** オンライン模試：提出した答案が採点されて返る */
function Score({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <rect x="8" y="8" width="24" height="30" />
      <path d="M13 16h14M13 22h11M13 28h8" opacity="0.6" />
      <circle cx="33" cy="30" r="9" />
      <path d="M29 30h8" />
    </svg>
  );
}

/** 完成演習：分野ごとに段を積み上げて仕上げる */
function Levels({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M8 40h32" />
      {[
        { x: 11, h: 9 },
        { x: 20, h: 17 },
        { x: 29, h: 25 },
      ].map((b) => (
        <rect key={b.x} x={b.x} y={40 - b.h} width="8" height={b.h} fill="currentColor" fillOpacity="0.14" />
      ))}
      <path d="M11 31h8M20 23h8M29 15h8" />
    </svg>
  );
}

/** 志望校診断：得点の形から行き先を指す目盛り */
function Dial({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M8 34a16 16 0 0 1 32 0" />
      <path d="M11 25.5l2.6 1.5M24 18v3M37 25.5l-2.6 1.5" opacity="0.6" />
      <path d="M24 34l9-9" strokeWidth="2.2" />
      <circle cx="24" cy="34" r="2.4" fill="currentColor" stroke="none" />
      <path d="M8 34h5M35 34h5" opacity="0.6" />
    </svg>
  );
}

/** 刊行物：並べた背表紙 */
function Spines({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <rect x="9" y="11" width="8" height="28" />
      <rect x="20" y="11" width="8" height="28" fill="currentColor" fillOpacity="0.14" />
      <path d="M31 13l8 1.6-3.4 25.4-8-1.6z" />
      <path d="M11 18h4M22 18h4" opacity="0.6" />
    </svg>
  );
}

/** 先生方へ：黒板と、引いた線 */
function Board({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <rect x="7" y="9" width="34" height="23" />
      <path d="M12 16h13M12 22h20" opacity="0.6" />
      <path d="M14 39h20M24 32v7" />
    </svg>
  );
}

const marks: Record<SectionKey, (p: { className?: string }) => React.ReactElement> = {
  universities: Table,
  kaisetsu: Sheet,
  moshi: Score,
  kansei: Levels,
  shindan: Dial,
  books: Spines,
  educators: Board,
};

export function SectionMark({ section, className }: { section: SectionKey; className?: string }) {
  const Mark = marks[section];
  return <Mark className={className} />;
}
