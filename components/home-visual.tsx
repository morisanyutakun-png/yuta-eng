/**
 * トップの最初の画面に置く図。
 *
 * このサイトが何を作っているのかを、文章を読む前に見せるためのもの。
 * 実際の大学ページに出している「年度 × 分野の出題表」をそのまま簡略に描く。
 * 架空の飾りではなく、来た人がこのあと見る画面の縮図になっている。
 *
 * 数値は見本で、特定の大学の分析結果ではない。濃さは出題の多さ、
 * 右の棒は年度を通した合計。どちらも同じ並びから計算して置くので、
 * 表と棒がずれることがない。
 */

const NAVY = "#1b3a63";
const RULE = "#e0e3e7";
const INK3 = "#666d76";

const YEARS = ["22", "23", "24", "25", "26"];

/** 行ごとの出題の多さ（0〜3）。見本の値 */
const ROWS: { label: string; v: number[] }[] = [
  { label: "微分積分", v: [3, 3, 2, 3, 3] },
  { label: "確率", v: [2, 1, 2, 2, 1] },
  { label: "整数", v: [1, 2, 1, 0, 2] },
  { label: "ベクトル", v: [0, 2, 1, 2, 1] },
  { label: "数列", v: [2, 0, 2, 1, 2] },
];

const COL_X = 54; // 表の左端
const COL_W = 27; // 1年度ぶんの幅
const ROW_Y = 26; // 見出し行の下端
const ROW_H = 25;
const BAR_X = COL_X + COL_W * YEARS.length + 16;
const BAR_MAX = 74;

export function AnalysisTable({ className = "" }: { className?: string }) {
  const totals = ROWS.map((r) => r.v.reduce((a, b) => a + b, 0));
  const top = Math.max(...totals);

  return (
    <svg
      viewBox={`0 0 ${BAR_X + BAR_MAX + 6} ${ROW_Y + ROW_H * ROWS.length + 6}`}
      role="img"
      aria-label="年度を横、分野を縦に並べた出題表。分野ごとの出題の多さを濃さで示し、右に年度を通した合計を棒で添えた図"
      className={className}
    >
      {/* 年度の見出し */}
      {YEARS.map((y, i) => (
        <text
          key={y}
          x={COL_X + COL_W * i + COL_W / 2}
          y={18}
          textAnchor="middle"
          fill={INK3}
          style={{ fontSize: 9 }}
        >
          {y}
        </text>
      ))}
      <path d={`M0 ${ROW_Y}h${BAR_X + BAR_MAX}`} stroke={RULE} />

      {ROWS.map((r, ri) => {
        const y = ROW_Y + ROW_H * ri;
        const mid = y + ROW_H / 2;
        return (
          <g key={r.label}>
            {/* 分野名。表の左に右そろえで置く */}
            <text x={COL_X - 8} y={mid + 3.2} textAnchor="end" fill="#434a53" style={{ fontSize: 9.5 }}>
              {r.label}
            </text>

            {/* 出題の多さ。0 のところは枠だけ残して空けておく */}
            {r.v.map((v, ci) => (
              <rect
                key={ci}
                x={COL_X + COL_W * ci + 3}
                y={mid - 8}
                width={COL_W - 6}
                height="16"
                fill={v === 0 ? "#fff" : NAVY}
                fillOpacity={v === 0 ? 1 : 0.14 + 0.24 * v}
                stroke={v === 0 ? RULE : "none"}
              />
            ))}

            {/* 年度を通した合計 */}
            <rect
              x={BAR_X}
              y={mid - 4}
              width={Math.max(4, (BAR_MAX * totals[ri]) / top)}
              height="8"
              fill={NAVY}
              fillOpacity="0.85"
            />
            <path d={`M0 ${y + ROW_H}h${BAR_X + BAR_MAX}`} stroke={RULE} strokeOpacity="0.7" />
          </g>
        );
      })}
    </svg>
  );
}
