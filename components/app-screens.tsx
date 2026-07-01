/**
 * 実際のノビットスタディ 高校部アプリの4画面を、電話フレームで忠実に再現したモック。
 * パンフレット（届く → 提出 → 添削返却 → 記録）の実画面・実データ・配色に合わせている。
 * 実スクリーンショット（public/app-screens/*.png）が用意できたら差し替え可能。
 */

type Variant = "home" | "submit" | "returned" | "history";

/** 各画面に対応する STEP 解説（ページ側で使い回す）。 */
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
      "「今日の課題」に教材名と範囲が表示（例：数学Ⅱ 三角関数／p.42〜46）",
      "「やること」に未提出、「へんきゃく・かくにん」に返却済みが並ぶ",
      "「がんばりメーター」で合格数・連続学習を見える化",
    ],
  },
  {
    no: "02",
    variant: "submit",
    title: "問題を見て、解いて「提出」",
    lead: "課題を開くと、範囲と先生からの指示が表示されます。ノートで解いたら、その場で提出。",
    facts: [
      "課題の範囲・指示を確認（例：「途中式も残しましょう」）",
      "「答案を提出する」から写真をえらぶ・撮る。何枚でも添付できる",
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
      "コメントで次の一手まで具体的に（例：「次は力学16〜へ」）",
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

const BLUE = "#1d4ed8";

function PhoneFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative w-[262px] shrink-0 ${className}`}>
      <div className="rounded-[2.4rem] bg-[#0b1d4a] p-2.5 shadow-[0_50px_80px_-40px_rgba(11,29,74,0.7)] ring-1 ring-white/10">
        <div className="relative overflow-hidden rounded-[1.9rem] bg-[#eef2f7]">
          <div className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-[#0b1d4a]" />
          {/* アプリ上部バー（ロゴ＋ユーザー） */}
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

/** 「課題 / 成績」タブ。 */
function Tabs({ active }: { active: "課題" | "成績" }) {
  return (
    <div className="mb-2.5 flex gap-1 rounded-full bg-[#e2e8f0] p-0.5 text-[0.54rem] font-bold">
      {(["課題", "成績"] as const).map((t) => (
        <span
          key={t}
          className={`flex-1 rounded-full py-1 text-center ${
            active === t ? "bg-white text-[#0b1d4a] shadow-[0_2px_6px_-2px_rgba(15,29,74,0.3)]" : "text-[#94a3b8]"
          }`}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

const SubjTag = ({ label, color }: { label: string; color: string }) => (
  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-[6px] text-[0.56rem] font-extrabold text-white" style={{ background: color }}>
    {label}
  </span>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-[12px] bg-white p-2.5 ring-1 ring-[rgba(15,29,74,0.07)] ${className}`}>{children}</div>
);

const PrimaryBtn = ({ children }: { children: React.ReactNode }) => (
  <button className="mt-2 w-full rounded-[8px] py-1.5 text-[0.56rem] font-bold text-white" style={{ background: BLUE }}>
    {children}
  </button>
);

function ScreenHome() {
  return (
    <div>
      <Tabs active="課題" />
      <div className="grid gap-2.5">
        {/* あいさつカード（濃紺） */}
        <div className="rounded-[14px] bg-[linear-gradient(135deg,#0f172a_0%,#1e3a8a_100%)] p-3 text-white">
          <p className="text-[0.7rem] font-extrabold leading-tight">こんにちは、山田 太郎さん</p>
          <p className="mt-0.5 text-[0.5rem] text-white/70">全国・中高部</p>
          <div className="mt-2 flex gap-1.5">
            {[
              { t: "はじめのいっぽ", s: "称号" },
              { t: "1", s: "はなまる" },
              { t: "0", s: "れんぞく" },
            ].map((c) => (
              <div key={c.s} className="flex-1 rounded-[7px] bg-white/12 px-1.5 py-1 text-center ring-1 ring-white/15">
                <p className="truncate text-[0.5rem] font-bold leading-none">{c.t}</p>
                <p className="mt-0.5 text-[0.42rem] text-white/70">{c.s}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 今日の課題 */}
        <Card>
          <p className="text-[0.5rem] font-bold text-[#0f766e]">今日の課題</p>
          <div className="mt-1.5 flex items-center gap-2">
            <SubjTag label="数" color="#16a34a" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.62rem] font-extrabold text-[#0b1d4a]">数学Ⅱ 三角関数</p>
              <p className="text-[0.48rem] text-[#64748b]">数学 ／ p.42〜46</p>
            </div>
          </div>
          <PrimaryBtn>はじめる →</PrimaryBtn>
        </Card>

        {/* がんばりメーター */}
        <Card>
          <div className="flex items-center justify-between">
            <p className="text-[0.56rem] font-extrabold text-[#0b1d4a]">がんばりメーター</p>
            <p className="text-[0.46rem] font-semibold text-[#0f766e]">つぎの称号まであと2こ</p>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1.5 text-center">
            {[
              { n: "1", l: "合格数", c: "#16a34a" },
              { n: "0", l: "かんりょう", c: BLUE },
              { n: "0", l: "今週の提出", c: "#ea580c" },
            ].map((s) => (
              <div key={s.l} className="rounded-[8px] bg-[#f4f7fb] py-1.5">
                <p className="text-[0.8rem] font-extrabold leading-none" style={{ color: s.c }}>{s.n}</p>
                <p className="mt-0.5 text-[0.44rem] text-[#64748b]">{s.l}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* やること */}
        <div>
          <p className="mb-1 text-[0.5rem] font-bold text-[#475569]">やること <span className="text-[#ea580c]">1</span></p>
          <Card className="!p-2">
            <div className="flex items-center gap-2">
              <SubjTag label="数" color="#16a34a" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.56rem] font-bold text-[#0b1d4a]">数学Ⅱ 三角関数 <span className="ml-1 rounded bg-[#fff1e6] px-1 text-[0.42rem] font-bold text-[#ea580c]">未提出</span></p>
                <p className="text-[0.44rem] text-[#64748b]">数学 ／ p.42〜46</p>
              </div>
            </div>
            <PrimaryBtn>ていしゅつする</PrimaryBtn>
          </Card>
        </div>

        {/* へんきゃく・かくにん */}
        <div>
          <p className="mb-1 text-[0.5rem] font-bold text-[#475569]">へんきゃく・かくにん <span className="text-[#16a34a]">1</span></p>
          <Card className="!p-2">
            <div className="flex items-center gap-2">
              <SubjTag label="物" color={BLUE} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.56rem] font-bold text-[#0b1d4a]">物理 力学 <span className="ml-1 rounded bg-[#eafaf0] px-1 text-[0.42rem] font-bold text-[#16a34a]">返却済み</span></p>
                <p className="text-[0.44rem] text-[#64748b]">物理 ／ 力学12〜15</p>
              </div>
            </div>
            <button className="mt-2 w-full rounded-[8px] bg-[#eef2ff] py-1.5 text-[0.54rem] font-bold" style={{ color: BLUE }}>けっかを見る</button>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ScreenSubmit() {
  return (
    <div className="grid gap-2.5 pt-1">
      <p className="text-[0.5rem] font-semibold text-[#94a3b8]">← 一覧へ</p>
      <div className="flex items-center gap-2">
        <SubjTag label="数" color="#16a34a" />
        <p className="text-[0.64rem] font-extrabold text-[#0b1d4a]">数学Ⅱ 三角関数 <span className="ml-1 rounded bg-[#fff1e6] px-1 text-[0.44rem] font-bold text-[#ea580c]">未提出</span></p>
      </div>
      <p className="-mt-1.5 text-[0.48rem] text-[#64748b]">数学 ／ 範囲 p.42〜46</p>

      <Card>
        <p className="text-[0.5rem] font-bold text-[#0f766e]">課題</p>
        <p className="mt-1 text-[0.54rem] leading-[1.7] text-[#334155]">答案を写真に撮って提出してください。<span className="font-bold text-[#0b1d4a]">途中式も残しましょう。</span></p>
      </Card>

      <Card>
        <p className="text-[0.5rem] font-bold text-[#0b1d4a]">答案を提出する</p>
        <div className="mt-2 grid place-items-center gap-1 rounded-[10px] border border-dashed border-[#cbd5e1] bg-[#f4f7fb] py-6">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[0.9rem] ring-1 ring-[#e2e8f0]">📷</span>
          <p className="text-[0.52rem] font-bold text-[#334155]">写真をえらぶ・撮る</p>
          <p className="text-[0.44rem] text-[#94a3b8]">何枚でも複数枚を並べられます</p>
        </div>
        <PrimaryBtn>写真をえらんで提出</PrimaryBtn>
      </Card>
    </div>
  );
}

function ScreenReturned() {
  return (
    <div className="grid gap-2.5 pt-1">
      <p className="text-[0.5rem] font-semibold text-[#94a3b8]">← 一覧へ</p>
      <div className="flex items-center gap-2">
        <SubjTag label="物" color={BLUE} />
        <p className="text-[0.64rem] font-extrabold text-[#0b1d4a]">物理 力学 <span className="ml-1 rounded bg-[#eafaf0] px-1 text-[0.44rem] font-bold text-[#16a34a]">返却済み</span></p>
      </div>
      <p className="-mt-1.5 text-[0.48rem] text-[#64748b]">物理 ／ 力学12〜15</p>

      <Card>
        <p className="text-[0.5rem] font-bold text-[#0f766e]">採点結果・コメント</p>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="rounded bg-[#16a34a] px-1.5 py-0.5 text-[0.5rem] font-extrabold text-white">合格</span>
          <span className="text-[0.95rem] font-extrabold leading-none text-[#0b1d4a]">41.00<span className="text-[0.5rem] font-semibold text-[#94a3b8]"> / 50.00</span></span>
        </div>
        <p className="mt-2 rounded-[8px] bg-[#f4f7fb] p-2 text-[0.5rem] leading-[1.75] text-[#334155]">
          途中式までていねいに書けています。合格！次は<span className="font-bold text-[#0b1d4a]">力学16〜</span>へ進みましょう。
        </p>
        <button className="mt-2 w-full rounded-[8px] py-1.5 text-[0.56rem] font-bold text-white" style={{ background: BLUE }}>確認して完了にする</button>
      </Card>
    </div>
  );
}

function ScreenHistory() {
  return (
    <div>
      <Tabs active="成績" />
      <div className="grid gap-2.5">
        <p className="text-[0.6rem] font-extrabold text-[#0b1d4a]">あなたの成績</p>

        <div className="grid grid-cols-2 gap-1.5">
          {[
            { n: "100%", l: "合格率（1/1）", c: "#16a34a" },
            { n: "82%", l: "平均得点率", c: BLUE },
          ].map((s) => (
            <Card key={s.l} className="!p-2">
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
            <Card key={s.l} className="!p-2">
              <p className="text-[0.86rem] font-extrabold leading-none" style={{ color: s.c }}>{s.n}</p>
              <p className="mt-0.5 text-[0.44rem] text-[#64748b]">{s.l}</p>
            </Card>
          ))}
        </div>

        <Card>
          <p className="text-[0.5rem] font-bold text-[#0b1d4a]">教科別の成績</p>
          <div className="mt-1.5 flex items-center gap-2">
            <SubjTag label="物" color={BLUE} />
            <div className="min-w-0 flex-1">
              <p className="text-[0.5rem] font-semibold text-[#334155]">物理 <span className="text-[#94a3b8]">合格1・平均82%</span></p>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#e2e8f0]"><div className="h-full w-full rounded-full bg-[linear-gradient(90deg,#1d4ed8,#0d9488)]" /></div>
            </div>
            <span className="text-[0.56rem] font-extrabold text-[#0b1d4a]">100%</span>
          </div>
        </Card>

        <Card>
          <p className="text-[0.5rem] font-bold text-[#0b1d4a]">採点・返却の履歴</p>
          <div className="mt-1.5 flex items-start gap-2">
            <span className="mt-0.5 rounded bg-[#16a34a] px-1 py-0.5 text-[0.42rem] font-bold text-white">合格</span>
            <div className="min-w-0 flex-1">
              <p className="text-[0.5rem] font-semibold text-[#0b1d4a]">物理 力学（力学12〜15）</p>
              <p className="truncate text-[0.44rem] text-[#94a3b8]">途中式までていねい。合格！次は力学16〜へ</p>
            </div>
          </div>
        </Card>
      </div>
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
