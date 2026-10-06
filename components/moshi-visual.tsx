/**
 * 模試の見出しに添える図。
 *
 * 写真が無いので、この模試で実際に起きることを図にする。
 * 描いているのは「手書きの記述答案に、朱で部分点が入っている」状態で、
 * この模試の中心にあるもの（記述を人が読んで点を付ける）をそのまま示している。
 *
 * 文字は読ませない。答案の中身は波線で表し、朱の印と得点だけを見せる。
 * 実在の大学の答案用紙を写したものではなく、こちらで描いた図。
 */
export function AnswerSheet({ className = "" }: { className?: string }) {
  // 手書きらしく見せるための、少しずつ長さの違う行
  const lines = [
    [0, 196], [0, 168], [0, 210], [0, 142],
    [0, 188], [0, 205], [0, 160],
  ];

  return (
    <svg
      viewBox="0 0 320 236"
      role="img"
      aria-label="記述答案に朱で部分点が書き込まれ、得点が算出されている図"
      className={className}
    >
      {/* 答案用紙 */}
      <rect x="18" y="10" width="248" height="216" fill="#fff" stroke="#dcd8cf" />
      <rect x="18" y="10" width="248" height="22" fill="#f5f6f8" stroke="#dcd8cf" />
      <rect x="30" y="18" width="46" height="6" rx="1" fill="#c8ccd2" />
      <rect x="84" y="18" width="28" height="6" rx="1" fill="#e0e3e7" />

      {/* 大問の見出しと、手書きの式を表す波線 */}
      {[0, 1].map((blk) => (
        <g key={blk} transform={`translate(0 ${blk * 92})`}>
          <rect x="30" y="44" width="16" height="7" rx="1" fill="#1b3a63" />
          {lines.slice(blk * 4, blk * 4 + (blk ? 3 : 4)).map(([, w], i) => (
            <rect
              key={i}
              x="30"
              y={58 + i * 15}
              width={w * 0.82}
              height="2.4"
              rx="1.2"
              fill="#c8ccd2"
            />
          ))}
        </g>
      ))}

      {/* 朱の採点。丸・部分点・短いコメント線 */}
      <g stroke="#b3412f" fill="none" strokeWidth="2" strokeLinecap="round">
        {/* 合っているところの印 */}
        <path d="M228 60 l5 6 l10 -14" />
        <path d="M228 150 l5 6 l10 -14" />
        {/* 途中までの印 */}
        <circle cx="236" cy="104" r="7.5" strokeWidth="1.8" />
        <path d="M232 104 h8" strokeWidth="1.8" />
      </g>
      <text x="252" y="66" fill="#b3412f" style={{ fontSize: 11, fontWeight: 700 }}>
        +8
      </text>
      <text x="252" y="109" fill="#b3412f" style={{ fontSize: 11, fontWeight: 700 }}>
        +3
      </text>
      <text x="252" y="156" fill="#b3412f" style={{ fontSize: 11, fontWeight: 700 }}>
        +9
      </text>

      {/* 得点。右下にずらして重ねる */}
      <g transform="translate(176 164)">
        <rect width="134" height="58" fill="#fff" stroke="#1b3a63" strokeWidth="1.4" />
        <text x="12" y="20" fill="#666d76" style={{ fontSize: 9.5 }}>
          大問別の得点
        </text>
        <text x="12" y="44" fill="#15181c" style={{ fontSize: 19, fontWeight: 700 }}>
          42
        </text>
        <text x="40" y="44" fill="#666d76" style={{ fontSize: 10 }}>
          / 50
        </text>
        <g stroke="#1b3a63" strokeWidth="3" strokeLinecap="round">
          <path d="M72 40 h14" />
          <path d="M92 36 h14" opacity="0.55" />
          <path d="M112 42 h10" opacity="0.3" />
        </g>
      </g>
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
    { n: "4", h: "採点と返却", b: "答案を提出すると、人の手で採点し、得点と詳細な解説をお返しします。" },
  ];

  return (
    <ol className="mt-6 grid gap-px overflow-hidden border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s) => (
        <li key={s.n} className="bg-white p-4">
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
