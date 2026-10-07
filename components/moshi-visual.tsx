/**
 * 模試の案内に添える図。
 *
 * 写真が無いので、この模試で実際に起きることを図にする。
 * 線は紺、採点の書きこみは朱、地は白。サイトの配色をそのまま使う。
 *
 * 位置は数えて置く。見た目で寄せると、行と朱の印がずれて
 * 「どの行に点が付いたのか」が読めなくなる。
 * 実在の大学の答案用紙を写したものではなく、こちらで描いた図。
 */

const INK = "#c8ccd2";
const NAVY = "#1b3a63";
const RULE = "#dcd8cf";
const RED = "#b3412f";

/** 手書きの式を表す波線。1行の高さは 14、ブロックの先頭からの並び */
function Lines({ x, y, widths }: { x: number; y: number; widths: number[] }) {
  return (
    <>
      {widths.map((w, i) => (
        <rect key={i} x={x} y={y + i * 14} width={w} height="2.6" rx="1.3" fill={INK} />
      ))}
    </>
  );
}

/**
 * 採点済みの答案。
 *
 * 大問を2つ置き、それぞれの**ブロックの縦の中心**に朱の印と点数を並べる。
 * 印は右の余白にそろえてあり、本文と重ならない。
 */
export function AnswerSheet({ className = "" }: { className?: string }) {
  // ブロックの位置を先に決めてから、印をその中心に置く
  const blocks = [
    { label: 1, y: 44, widths: [150, 128, 164], mark: "check" as const, score: "+8" },
    { label: 2, y: 116, widths: [138, 160, 120], mark: "part" as const, score: "+3" },
  ];

  return (
    <svg
      viewBox="0 0 300 250"
      role="img"
      aria-label="記述答案に朱で部分点が書きこまれ、大問ごとの得点が出ている図"
      className={className}
    >
      {/* 答案用紙 */}
      <rect x="4" y="6" width="252" height="226" fill="#fff" stroke={RULE} />
      <rect x="4" y="6" width="252" height="24" fill="#f5f6f8" stroke={RULE} />
      <rect x="16" y="14" width="52" height="7" rx="1.5" fill={INK} />
      <rect x="76" y="14" width="30" height="7" rx="1.5" fill="#e8eaed" />

      {blocks.map((b) => {
        // 行は3本。ブロックの縦の中心＝真ん中の行の高さにそろえる
        const mid = b.y + 14 + 1.3;
        return (
          <g key={b.label}>
            {/* 大問番号 */}
            <rect x="16" y={b.y - 12} width="15" height="11" rx="1.5" fill={NAVY} />
            <text x="23.5" y={b.y - 3.5} textAnchor="middle" fill="#fff" style={{ fontSize: 8, fontWeight: 700 }}>
              {b.label}
            </text>

            <Lines x={16} y={b.y} widths={b.widths} />

            {/* 朱の印。右の余白にそろえる */}
            {b.mark === "check" ? (
              <path
                d={`M196 ${mid} l5 6 l11 -14`}
                fill="none"
                stroke={RED}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <g fill="none" stroke={RED} strokeWidth="1.9" strokeLinecap="round">
                <circle cx="203" cy={mid} r="7.5" />
                <path d={`M199 ${mid} h8`} />
              </g>
            )}
            <text x="220" y={mid + 4.5} fill={RED} style={{ fontSize: 12, fontWeight: 700 }}>
              {b.score}
            </text>
          </g>
        );
      })}

      {/* 途中式への書きこみ。1行だけ朱の下線を引いて、式を見ていることを示す */}
      <path d="M16 134.5 h86" stroke={RED} strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />

      {/* 得点。紙の右下に重ねる */}
      <g transform="translate(126 172)">
        <rect width="150" height="60" fill="#fff" stroke={NAVY} strokeWidth="1.4" />
        <text x="14" y="21" fill="#666d76" style={{ fontSize: 10 }}>
          大問別の得点
        </text>
        <text x="14" y="47" fill="#15181c" style={{ fontSize: 21, fontWeight: 700 }}>
          42
        </text>
        <text x="46" y="47" fill="#666d76" style={{ fontSize: 11 }}>
          / 50
        </text>
        {/* 大問ごとの棒。右へ行くほど低くする */}
        <g>
          {[
            { x: 86, h: 18 },
            { x: 106, h: 12 },
            { x: 126, h: 7 },
          ].map((b) => (
            <rect key={b.x} x={b.x} y={48 - b.h} width="12" height={b.h} fill={NAVY} opacity={0.85} />
          ))}
          <path d="M84 49 h60" stroke={RULE} strokeWidth="1" />
        </g>
      </g>
    </svg>
  );
}

/* ───── 特長に添える小さな図 ───── */

/** 人が読んで点を付ける。ペン先と、行に入った印 */
export function MarkIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 48" aria-hidden="true" className={className}>
      <rect x="2" y="6" width="46" height="36" fill="#fff" stroke={RULE} />
      {[14, 22, 30].map((y, i) => (
        <rect key={y} x="9" y={y} width={[28, 22, 25][i]} height="2.4" rx="1.2" fill={INK} />
      ))}
      <path d="M38 20 l4 5 l9 -12" fill="none" stroke={RED} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      {/* ペン */}
      <g transform="rotate(38 60 30)">
        <rect x="56" y="12" width="7" height="22" rx="1" fill={NAVY} />
        <path d="M56 34 h7 l-3.5 6 z" fill={RED} />
      </g>
    </svg>
  );
}

/** 期間のうち好きな日に受ける。枠の中の1日に印 */
export function PeriodIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 48" aria-hidden="true" className={className}>
      <rect x="4" y="8" width="64" height="34" fill="#fff" stroke={RULE} />
      <rect x="4" y="8" width="64" height="8" fill="#f5f6f8" stroke={RULE} />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3, 4, 5].map((c) => {
          const on = r === 1 && c === 3;
          return (
            <rect
              key={`${r}-${c}`}
              x={9 + c * 10}
              y={20 + r * 8}
              width="7"
              height="5"
              rx="1"
              fill={on ? RED : "#e8eaed"}
            />
          );
        }),
      )}
      <path d="M9 44 h54" stroke={NAVY} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9 41 v6M63 41 v6" stroke={NAVY} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** 大学ごとに形が違う。大問の並びを3通り並べる */
export function PerUnivIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 48" aria-hidden="true" className={className}>
      {[
        { x: 2, n: 4 },
        { x: 26, n: 6 },
        { x: 50, n: 3 },
      ].map((col, i) => (
        <g key={col.x}>
          <rect x={col.x} y="6" width="20" height="36" fill="#fff" stroke={RULE} />
          {Array.from({ length: col.n }, (_, k) => (
            <rect
              key={k}
              x={col.x + 4}
              y={11 + k * (30 / col.n)}
              width="12"
              height={Math.max(2.4, 30 / col.n - 3)}
              rx="1"
              fill={i === 1 ? NAVY : INK}
              opacity={i === 1 ? 0.9 : 1}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

/**
 * 申し込んでから返ってくるまでの流れ。
 *
 * 大手の模試案内はかならずこの図を出す。初めての人が一番知りたいのは
 * 「申し込んだら次に何が起きるか」で、それを文章で書くと読まれない。
 */
export function Flow() {
  const steps = [
    { n: "1", h: "参加申込", b: "受験したい大学を選んで申し込みます。この時点では料金は発生しません。" },
    { n: "2", h: "日程のご案内", b: "正式な受験期間とお支払い方法を、メールでお知らせします。" },
    { n: "3", h: "期間内に受験", b: "都合のよい日時に、本番と同じ試験時間を目安として取り組みます。" },
    { n: "4", h: "採点と返却", b: "人の手で採点し、得点・講評・分野別の得意不得意・今後の助言をお返しします。" },
  ];

  return (
    <ol className="mt-6 grid gap-px overflow-hidden border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s) => (
        <li key={s.n} className="bg-white p-4 lg:p-5">
          <p className="flex items-center gap-2">
            <span className="serif flex size-6 items-center justify-center bg-navy text-[0.78rem] font-bold text-white">
              {s.n}
            </span>
            <span className="text-[0.92rem] font-semibold text-ink">{s.h}</span>
          </p>
          <p className="prose-ja mt-2 text-[0.82rem] leading-[1.85] text-ink-2">{s.b}</p>
        </li>
      ))}
    </ol>
  );
}
