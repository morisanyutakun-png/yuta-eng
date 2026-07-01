/**
 * 実際のノビットスタディ 高校部アプリ（kumon-app）の画面を、電話フレームで忠実に再現。
 * 実物のUI（紫アクセント／あいさつカード＋実績チップ／学習状況カード／
 * 今日の課題・未提出は右ボタンの横並び）に合わせている。題材は 数学ⅠA 二次関数。
 * 実スクリーンショット（public/app-screens/*.png）が用意できたら差し替え可能。
 */

type Variant = "home" | "submit" | "returned" | "history";

const P = "#7c3aed"; // primary purple

export const appSteps: {
  no: string;
  variant: Variant;
  title: string;
  lead: string;
  facts: string[];
}[] = [
  {
    no: "01",
    variant: "home",
    title: "今日の課題が「届く」",
    lead: "ログインするとまず表示されるホーム画面。その日に取り組む課題が自動で並びます。",
    facts: [
      "「今日の課題」に教材名と範囲が表示（例：数学ⅠA 二次関数）",
      "「未提出」に取り組む課題、返却済みは「へんきゃく・かくにん」へ",
      "「学習状況」で合格数・完了・今週の提出を見える化",
    ],
  },
  {
    no: "02",
    variant: "submit",
    title: "問題を見て、解いて「提出」",
    lead: "課題を開くと、範囲と先生からの指示が表示されます。ノートで解いたら、その場で提出。",
    facts: [
      "課題の範囲・指示を確認（例：「途中式も残しましょう」）",
      "「写真をえらぶ・撮る」から提出。何枚でも添付できる",
      "紙でもタブレットでも、解き方は自由",
    ],
  },
  {
    no: "03",
    variant: "returned",
    title: "採点者が「添削」して返却",
    lead: "提出した答案は採点者がていねいに添削。合否・点数・コメントつきで返ってきます。",
    facts: [
      "合否と得点が明確（例：合格 41.00 / 50.00）",
      "コメントで次の一手まで具体的に（例：「次は最大・最小の応用へ」）",
      "確認したら「完了にする」。合格なら次の範囲へ自動で前進",
    ],
  },
  {
    no: "04",
    variant: "history",
    title: "すべて「記録」される",
    lead: "取り組みは成績としてすべて残ります。伸びも弱点も、数値で振り返れます。",
    facts: [
      "合格率・平均得点率・連続学習日数をひと目で（例：合格率100%／平均82%）",
      "教科別の成績と「採点・返却の履歴」を一覧",
      "得点が2件以上たまると得点率の推移グラフが表示",
    ],
  },
];

/* ── ミニアイコン（実UIのチップ・統計セル用） ── */
const iconProps = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
const IconFlame = ({ c = "" }: { c?: string }) => (<svg viewBox="0 0 24 24" className={c} {...iconProps}><path d="M12 3c1.5 3-1.5 4.2-1.5 7A3.5 3.5 0 0014 13c0-1.6-.8-2.6-1.6-3.4.2 1.8-.9 2.6-1.7 2.6 1.1-2.6-.9-5.4-2.2-6.2" /><path d="M8.5 12.5A4.5 4.5 0 1016 15c0-2-1-3.2-2-4.2" /></svg>);
const IconStar = ({ c = "" }: { c?: string }) => (<svg viewBox="0 0 24 24" className={c} fill="currentColor" aria-hidden><path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.9 6.8 19.5l1-5.8L3.6 9.6l5.8-.8z" /></svg>);
const IconMedal = ({ c = "" }: { c?: string }) => (<svg viewBox="0 0 24 24" className={c} {...iconProps}><path d="M9 3l3 6 3-6" /><circle cx="12" cy="15" r="5" /><path d="M12 12.5l1 2 2 .2-1.5 1.4.4 2L12 17l-1.9 1 .4-2L9 14.7l2-.2z" fill="currentColor" stroke="none" /></svg>);
const IconCheck = ({ c = "" }: { c?: string }) => (<svg viewBox="0 0 24 24" className={c} {...iconProps}><circle cx="12" cy="12" r="8.5" /><path d="M8.5 12.3l2.4 2.4 4.6-5" /></svg>);
const IconCalendar = ({ c = "" }: { c?: string }) => (<svg viewBox="0 0 24 24" className={c} {...iconProps}><rect x="4.5" y="5.5" width="15" height="14" rx="2.4" /><path d="M4.5 9.5h15M8.5 3.5v3M15.5 3.5v3" /></svg>);

function PhoneFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative w-[264px] shrink-0 ${className}`}>
      <div className="rounded-[2.4rem] bg-[#0b1d4a] p-2.5 shadow-[0_50px_80px_-40px_rgba(11,29,74,0.7)] ring-1 ring-white/10">
        <div className="relative overflow-hidden rounded-[1.9rem] bg-[#f3f5f9]">
          <div className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-[#0b1d4a]" />
          <div className="flex items-center justify-between border-b border-[#e6ebf3] bg-white px-3 pb-2 pt-7">
            <picture>
              <source type="image/avif" srcSet="/brand/nobit-logo-480.avif" />
              <source type="image/webp" srcSet="/brand/nobit-logo-480.webp" />
              <img src="/brand/nobit-logo-480.webp" alt="ノビットスタディ" width={1970} height={375} className="h-3.5 w-auto" loading="lazy" decoding="async" />
            </picture>
            <span className="text-[0.46rem] font-semibold text-[#94a3b8]">山田 太郎 ・ ログアウト</span>
          </div>
          <div className="max-h-[520px] overflow-hidden px-3 pb-4 pt-2.5">{children}</div>
        </div>
      </div>
    </div>
  );
}

const SubjTag = ({ label }: { label: string }) => (
  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[8px] text-[0.62rem] font-extrabold text-white" style={{ background: P }}>
    {label}
  </span>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-[12px] bg-white p-3 ring-1 ring-[rgba(15,29,74,0.07)] ${className}`}>{children}</div>
);

const PurpleBtn = ({ children, small = false }: { children: React.ReactNode; small?: boolean }) => (
  <button className={`shrink-0 rounded-[8px] font-bold text-white ${small ? "px-2.5 py-1.5 text-[0.54rem]" : "px-3 py-2 text-[0.58rem]"}`} style={{ background: P }}>
    {children}
  </button>
);

function ScreenHome() {
  return (
    <div className="grid gap-2.5">
      {/* あいさつカード（濃紺） */}
      <div className="rounded-[14px] bg-[linear-gradient(135deg,#14213d_0%,#1e2a52_100%)] p-3 text-white">
        <p className="text-[0.72rem] font-extrabold leading-tight">こんにちは、山田 太郎 さん</p>
        <p className="mt-1 text-[0.48rem] leading-snug text-white/70">復習で定着、演習で得点。着実に積み上げよう。</p>
        <div className="mt-2.5 flex gap-1.5">
          {[
            { icon: <IconFlame c="h-2.5 w-2.5 text-[#fb923c]" />, t: "0日連続" },
            { icon: <IconStar c="h-2.5 w-2.5 text-[#fbbf24]" />, t: "合格 0" },
            { icon: <IconMedal c="h-2.5 w-2.5 text-[#a78bfa]" />, t: "はじめのいっぽ" },
          ].map((c, i) => (
            <div key={i} className="flex flex-1 items-center justify-center gap-1 rounded-[7px] bg-white/[0.08] px-1 py-1 ring-1 ring-white/15">
              {c.icon}
              <span className="truncate text-[0.44rem] font-bold">{c.t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 今日の課題（横並び・紫左線） */}
      <Card className="border-l-[3px] border-l-[#7c3aed]">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[0.5rem] font-bold" style={{ color: P }}>今日の課題</p>
            <p className="mt-0.5 truncate text-[0.72rem] font-extrabold text-[#0b1d4a]">二次関数</p>
            <p className="text-[0.48rem] text-[#64748b]">数学ⅠA</p>
          </div>
          <PurpleBtn>取り組む →</PurpleBtn>
        </div>
      </Card>

      {/* 学習状況 */}
      <Card>
        <div className="flex items-center justify-between">
          <p className="text-[0.58rem] font-extrabold text-[#0b1d4a]">学習状況</p>
          <span className="flex items-center gap-1 text-[0.5rem] font-bold text-[#ea580c]"><IconMedal c="h-2.5 w-2.5" />はじめのいっぽ</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e2e8f0]"><div className="h-full w-[6%] rounded-full" style={{ background: P }} /></div>
        <p className="mt-1.5 text-[0.48rem] text-[#64748b]">次のランクまで あと 3</p>
        <div className="mt-2 grid grid-cols-3 gap-1.5 text-center">
          {[
            { icon: <IconStar c="mx-auto h-3 w-3" />, n: "0", l: "合格", bg: "#fff7ed", fg: "#ea580c" },
            { icon: <IconCheck c="mx-auto h-3 w-3" />, n: "0", l: "完了", bg: "#ecfdf5", fg: "#16a34a" },
            { icon: <IconCalendar c="mx-auto h-3 w-3" />, n: "0", l: "今週の提出", bg: "#eff6ff", fg: "#1d4ed8" },
          ].map((s) => (
            <div key={s.l} className="rounded-[9px] py-1.5" style={{ background: s.bg }}>
              <span style={{ color: s.fg }}>{s.icon}</span>
              <p className="mt-0.5 text-[0.86rem] font-extrabold leading-none" style={{ color: s.fg }}>{s.n}</p>
              <p className="mt-0.5 text-[0.42rem] text-[#64748b]">{s.l}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* 未提出 */}
      <div>
        <p className="mb-1 flex items-center gap-1.5 text-[0.56rem] font-extrabold text-[#0b1d4a]">
          未提出 <span className="rounded bg-[#1d4ed8] px-1.5 text-[0.44rem] text-white">1</span>
        </p>
        <Card>
          <div className="flex items-center gap-2">
            <SubjTag label="数" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.6rem] font-extrabold text-[#0b1d4a]">二次関数 <span className="ml-1 rounded bg-[#eef2f7] px-1 text-[0.42rem] font-bold text-[#64748b]">未提出</span></p>
              <p className="text-[0.46rem] text-[#64748b]">数学ⅠA</p>
            </div>
            <PurpleBtn small>提出する</PurpleBtn>
          </div>
        </Card>
      </div>
    </div>
  );
}

function ScreenSubmit() {
  return (
    <div className="grid gap-2.5 pt-1">
      <p className="text-[0.5rem] font-semibold text-[#94a3b8]">← 一覧へ</p>
      <div className="flex items-center gap-2">
        <SubjTag label="数" />
        <div>
          <p className="text-[0.66rem] font-extrabold text-[#0b1d4a]">二次関数 <span className="ml-1 rounded bg-[#eef2f7] px-1 text-[0.44rem] font-bold text-[#64748b]">未提出</span></p>
          <p className="text-[0.46rem] text-[#64748b]">数学ⅠA</p>
        </div>
      </div>

      <Card>
        <p className="text-[0.5rem] font-bold" style={{ color: P }}>課題</p>
        <p className="mt-1 text-[0.54rem] leading-[1.7] text-[#334155]">答案を写真に撮って提出してください。<span className="font-bold text-[#0b1d4a]">途中式（平方完成）も残しましょう。</span></p>
      </Card>

      <Card>
        <p className="text-[0.5rem] font-bold text-[#0b1d4a]">答案を提出する</p>
        <div className="mt-2 grid place-items-center gap-1 rounded-[10px] border border-dashed border-[#cbd5e1] bg-[#f4f7fb] py-6">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[0.9rem] ring-1 ring-[#e2e8f0]">📷</span>
          <p className="text-[0.52rem] font-bold text-[#334155]">写真をえらぶ・撮る</p>
          <p className="text-[0.44rem] text-[#94a3b8]">何枚でも複数枚を並べられます</p>
        </div>
        <button className="mt-2.5 w-full rounded-[8px] py-2 text-[0.58rem] font-bold text-white" style={{ background: P }}>写真をえらんで提出</button>
      </Card>
    </div>
  );
}

function ScreenReturned() {
  return (
    <div className="grid gap-2.5 pt-1">
      <p className="text-[0.5rem] font-semibold text-[#94a3b8]">← 一覧へ</p>
      <div className="flex items-center gap-2">
        <SubjTag label="数" />
        <div>
          <p className="text-[0.66rem] font-extrabold text-[#0b1d4a]">二次関数 <span className="ml-1 rounded bg-[#eafaf0] px-1 text-[0.44rem] font-bold text-[#16a34a]">返却済み</span></p>
          <p className="text-[0.46rem] text-[#64748b]">数学ⅠA</p>
        </div>
      </div>

      <Card>
        <p className="text-[0.5rem] font-bold" style={{ color: P }}>採点結果・コメント</p>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="rounded bg-[#16a34a] px-1.5 py-0.5 text-[0.5rem] font-extrabold text-white">合格</span>
          <span className="text-[0.95rem] font-extrabold leading-none text-[#0b1d4a]">41.00<span className="text-[0.5rem] font-semibold text-[#94a3b8]"> / 50.00</span></span>
        </div>
        <p className="mt-2 rounded-[8px] bg-[#f4f7fb] p-2 text-[0.5rem] leading-[1.75] text-[#334155]">
          平方完成まで正確に書けています。合格！次は<span className="font-bold text-[#0b1d4a]">最大・最小の応用</span>へ進みましょう。
        </p>
        <button className="mt-2 w-full rounded-[8px] py-2 text-[0.58rem] font-bold text-white" style={{ background: P }}>確認して完了にする</button>
      </Card>
    </div>
  );
}

function ScreenHistory() {
  return (
    <div className="grid gap-2.5 pt-1">
      <p className="text-[0.62rem] font-extrabold text-[#0b1d4a]">あなたの成績</p>

      <div className="grid grid-cols-2 gap-1.5">
        {[
          { n: "100%", l: "合格率（1/1）", c: "#16a34a" },
          { n: "82%", l: "平均得点率", c: P },
        ].map((s) => (
          <Card key={s.l} className="!p-2.5">
            <p className="text-[1rem] font-extrabold leading-none" style={{ color: s.c }}>{s.n}</p>
            <p className="mt-1 text-[0.44rem] text-[#64748b]">{s.l}</p>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {[
          { n: "1", l: "はなまる", c: "#ea580c" },
          { n: "0", l: "連続学習", c: "#64748b" },
        ].map((s) => (
          <Card key={s.l} className="!p-2.5">
            <p className="text-[0.86rem] font-extrabold leading-none" style={{ color: s.c }}>{s.n}</p>
            <p className="mt-0.5 text-[0.44rem] text-[#64748b]">{s.l}</p>
          </Card>
        ))}
      </div>

      <Card>
        <p className="text-[0.5rem] font-bold text-[#0b1d4a]">教科別の成績</p>
        <div className="mt-1.5 flex items-center gap-2">
          <SubjTag label="数" />
          <div className="min-w-0 flex-1">
            <p className="text-[0.5rem] font-semibold text-[#334155]">数学 <span className="text-[#94a3b8]">合格1・平均82%</span></p>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#e2e8f0]"><div className="h-full w-full rounded-full" style={{ background: `linear-gradient(90deg,${P},#a78bfa)` }} /></div>
          </div>
          <span className="text-[0.56rem] font-extrabold text-[#0b1d4a]">100%</span>
        </div>
      </Card>

      <Card>
        <p className="text-[0.5rem] font-bold text-[#0b1d4a]">採点・返却の履歴</p>
        <div className="mt-1.5 flex items-start gap-2">
          <span className="mt-0.5 rounded bg-[#16a34a] px-1 py-0.5 text-[0.42rem] font-bold text-white">合格</span>
          <div className="min-w-0 flex-1">
            <p className="text-[0.5rem] font-semibold text-[#0b1d4a]">数学ⅠA 二次関数</p>
            <p className="truncate text-[0.44rem] text-[#94a3b8]">平方完成まで正確。合格！次は最大・最小へ</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

const BODIES: Record<Variant, () => React.JSX.Element> = {
  home: ScreenHome,
  submit: ScreenSubmit,
  returned: ScreenReturned,
  history: ScreenHistory,
};

/** 実アプリの1画面を電話フレームで表示。 */
export function AppScreen({ variant, className = "" }: { variant: Variant; className?: string }) {
  const Body = BODIES[variant];
  return (
    <PhoneFrame className={className}>
      <Body />
    </PhoneFrame>
  );
}
