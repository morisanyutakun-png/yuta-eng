/**
 * 実際のノビットスタディ 高校部アプリ（kumon-app）の画面を、電話フレームで忠実に再現。
 * 実物のUI（紫アクセント／ホーム・PDF提出・返却/再提出・成績）に合わせている。
 * 題材は山田太郎さんの「物理標準演習」を例に、提出後すぐ次へ進む運用を見せる。
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
    title: "いま取り組む範囲が「見える」",
    lead: "ログインするとまず表示されるホーム画面。今日取り組む課題と、教材ごとの現在地が一目で分かります。",
    facts: [
      "「今日の課題」に、いま優先して取り組む教材と範囲を表示",
      "教材ごとに、合格数・採点待ち・再提出あり・次の範囲を確認",
      "返却待ちの範囲があっても、次の範囲へ進める",
    ],
  },
  {
    no: "02",
    variant: "submit",
    title: "PDFに書き込んで「提出」",
    lead: "課題を開くと、問題PDFと実施範囲が表示されます。タブレットやスマホでそのまま書き込み、提出できます。",
    facts: [
      "問題PDFを開いて確認。必要なら保存して紙で解いてもOK",
      "一画面で書き込んで解くから、タッチペン・指で直接記入",
      "提出すると解答解説PDFが開き、同時に次の範囲が追加",
    ],
  },
  {
    no: "03",
    variant: "returned",
    title: "返却・再提出も「並行」して進む",
    lead: "提出後は自己採点しながら次へ進み、先生の添削返却は返却タブに届きます。やり直しが必要なものもここで確認できます。",
    facts: [
      "採点待ち、先生から返却、再提出が必要を分けて表示",
      "不合格や再テストは再提出として戻り、同じ範囲をもう一度実施",
      "先生のコメントや添削済みPDFを見ながら、次の範囲と復習を並行",
    ],
  },
  {
    no: "04",
    variant: "history",
    title: "合格状況が「記録」される",
    lead: "取り組みは成績としてすべて残ります。いま何が合格済みで、どこに戻るべきかを数値で振り返れます。",
    facts: [
      "合格率・平均点・合格数・連続学習をひと目で確認",
      "教科別の成績と「採点・返却の履歴」を一覧",
      "全範囲が返却済みかつ合格になると教材終了。一冊分PDFも受け取れる",
    ],
  },
];

/* ── ミニアイコン（実UIのチップ・統計セル用） ── */
const iconProps = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
const IconFlame = ({ c = "" }: { c?: string }) => (<svg viewBox="0 0 24 24" className={c} {...iconProps}><path d="M12 3c1.5 3-1.5 4.2-1.5 7A3.5 3.5 0 0014 13c0-1.6-.8-2.6-1.6-3.4.2 1.8-.9 2.6-1.7 2.6 1.1-2.6-.9-5.4-2.2-6.2" /><path d="M8.5 12.5A4.5 4.5 0 1016 15c0-2-1-3.2-2-4.2" /></svg>);
const IconStar = ({ c = "" }: { c?: string }) => (<svg viewBox="0 0 24 24" className={c} fill="currentColor" aria-hidden><path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.9 6.8 19.5l1-5.8L3.6 9.6l5.8-.8z" /></svg>);
const IconMedal = ({ c = "" }: { c?: string }) => (<svg viewBox="0 0 24 24" className={c} {...iconProps}><path d="M9 3l3 6 3-6" /><circle cx="12" cy="15" r="5" /><path d="M12 12.5l1 2 2 .2-1.5 1.4.4 2L12 17l-1.9 1 .4-2L9 14.7l2-.2z" fill="currentColor" stroke="none" /></svg>);
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
            <span className="text-[0.46rem] font-semibold text-[#94a3b8]">山田太郎 ・ ログアウト</span>
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
        <p className="text-[0.72rem] font-extrabold leading-tight">こんにちは、山田太郎さん</p>
        <p className="mt-1 text-[0.48rem] leading-snug text-white/70">提出したら次へ。返却待ちでも止まりません。</p>
        <div className="mt-2.5 flex gap-1.5">
          {[
            { icon: <IconStar c="h-2.5 w-2.5 text-[#fbbf24]" />, t: "合格 12" },
            { icon: <IconCalendar c="h-2.5 w-2.5 text-[#93c5fd]" />, t: "採点待ち 2" },
            { icon: <IconFlame c="h-2.5 w-2.5 text-[#fb923c]" />, t: "連続 6日" },
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
            <p className="mt-0.5 truncate text-[0.72rem] font-extrabold text-[#0b1d4a]">力学 03 等加速度運動</p>
            <p className="text-[0.48rem] text-[#64748b]">物理標準演習 ・ 次の範囲</p>
          </div>
          <PurpleBtn>PDFを開く →</PurpleBtn>
        </div>
      </Card>

      {/* 教材の進み具合 */}
      <Card>
        <div className="flex items-center justify-between">
          <p className="text-[0.58rem] font-extrabold text-[#0b1d4a]">教材の進み具合</p>
          <span className="flex items-center gap-1 text-[0.5rem] font-bold text-[#ea580c]"><IconMedal c="h-2.5 w-2.5" />返却待ちOK</span>
        </div>
        <div className="mt-2 grid gap-2">
          {[
            { label: "物理標準演習", done: "12/100", wait: "採点待ち2", redo: "再提出1", next: "力学04", width: "24%" },
            { label: "化学基礎", done: "8/100", wait: "採点待ち0", redo: "再提出0", next: "酸化還元", width: "16%" },
          ].map((m) => (
            <div key={m.label} className="rounded-[10px] bg-[#f8fafc] p-2">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-[0.52rem] font-extrabold text-[#0b1d4a]">{m.label}</p>
                <p className="text-[0.48rem] font-bold text-[#64748b]">合格 {m.done}</p>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#e2e8f0]">
                <div className="h-full rounded-full" style={{ width: m.width, background: `linear-gradient(90deg,${P},#0d9488)` }} />
              </div>
              <p className="mt-1 flex flex-wrap gap-x-2 gap-y-0.5 text-[0.42rem] font-bold text-[#64748b]">
                <span>{m.wait}</span><span>{m.redo}</span><span>次: {m.next}</span>
              </p>
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
            <SubjTag label="物" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.6rem] font-extrabold text-[#0b1d4a]">力学 03 <span className="ml-1 rounded bg-[#eef2f7] px-1 text-[0.42rem] font-bold text-[#64748b]">未提出</span></p>
              <p className="text-[0.46rem] text-[#64748b]">提出で解答解説PDFが開きます</p>
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
        <SubjTag label="物" />
        <div>
          <p className="text-[0.66rem] font-extrabold text-[#0b1d4a]">力学 03 等加速度運動 <span className="ml-1 rounded bg-[#eef2f7] px-1 text-[0.44rem] font-bold text-[#64748b]">未提出</span></p>
          <p className="text-[0.46rem] text-[#64748b]">物理標準演習</p>
        </div>
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <p className="text-[0.5rem] font-bold" style={{ color: P }}>問題PDF</p>
          <span className="rounded-full bg-[#eef2ff] px-2 py-0.5 text-[0.42rem] font-bold text-[#4f46e5]">PDF</span>
        </div>
        <div className="mt-2 rounded-[10px] bg-[#f8fafc] p-2 ring-1 ring-[#e2e8f0]">
          <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-1">
            <p className="text-[0.46rem] font-bold text-[#0b1d4a]">v-t graph / x-t graph</p>
            <p className="text-[0.42rem] text-[#94a3b8]">1 / 3</p>
          </div>
          <div className="mt-2 grid gap-1.5">
            <div className="h-1.5 w-4/5 rounded bg-[#cbd5e1]" />
            <div className="h-1.5 w-3/5 rounded bg-[#cbd5e1]" />
            <div className="h-16 rounded-[8px] bg-white ring-1 ring-[#e2e8f0]">
              <div className="ml-5 mt-3 h-8 w-24 rounded border-b-2 border-l-2 border-[#94a3b8]" />
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <p className="text-[0.5rem] font-bold text-[#0b1d4a]">一画面で書き込んで解く</p>
        <div className="mt-2 rounded-[10px] border border-dashed border-[#cbd5e1] bg-[#f4f7fb] p-2">
          <div className="h-16 rounded-[8px] bg-white p-2 ring-1 ring-[#e2e8f0]">
            <p className="text-[0.44rem] font-bold text-[#7c3aed]">答案メモ</p>
            <div className="mt-2 h-1 w-20 rotate-[-2deg] rounded bg-[#7c3aed]/50" />
            <div className="mt-2 h-1 w-28 rotate-[1deg] rounded bg-[#7c3aed]/40" />
            <div className="mt-2 h-1 w-16 rotate-[-1deg] rounded bg-[#7c3aed]/40" />
          </div>
          <p className="mt-1.5 text-[0.44rem] leading-[1.6] text-[#64748b]">タッチペン・指で直接記入。保存して紙で解いてもOK。</p>
        </div>
        <button className="mt-2.5 w-full rounded-[8px] py-2 text-[0.58rem] font-bold text-white" style={{ background: P }}>提出して解答解説へ</button>
        <p className="mt-1.5 text-[0.44rem] leading-[1.6] text-[#64748b]">提出すると、解答解説PDFと次の範囲が追加されます。</p>
      </Card>
    </div>
  );
}

function ScreenReturned() {
  return (
    <div className="grid gap-2.5 pt-1">
      <p className="text-[0.5rem] font-semibold text-[#94a3b8]">← 一覧へ</p>
      <div className="grid grid-cols-3 gap-1 rounded-[10px] bg-[#eef2f7] p-1 text-center text-[0.46rem] font-bold">
        <span className="rounded-[7px] bg-white py-1 text-[#64748b]">採点待ち 2</span>
        <span className="rounded-[7px] bg-[#7c3aed] py-1 text-white">返却 1</span>
        <span className="rounded-[7px] bg-white py-1 text-[#ea580c]">再提出 1</span>
      </div>
      <div className="flex items-center gap-2">
        <SubjTag label="物" />
        <div>
          <p className="text-[0.66rem] font-extrabold text-[#0b1d4a]">力学 02 速度と変位 <span className="ml-1 rounded bg-[#eafaf0] px-1 text-[0.44rem] font-bold text-[#16a34a]">返却済み</span></p>
          <p className="text-[0.46rem] text-[#64748b]">次の範囲と並行して確認</p>
        </div>
      </div>

      <Card>
        <p className="text-[0.5rem] font-bold" style={{ color: P }}>採点結果・コメント</p>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="rounded bg-[#16a34a] px-1.5 py-0.5 text-[0.5rem] font-extrabold text-white">合格</span>
          <span className="text-[0.95rem] font-extrabold leading-none text-[#0b1d4a]">42<span className="text-[0.5rem] font-semibold text-[#94a3b8]"> / 50</span></span>
        </div>
        <p className="mt-2 rounded-[8px] bg-[#f4f7fb] p-2 text-[0.5rem] leading-[1.75] text-[#334155]">
          途中式までていねいに書けています。添削PDFで赤字を確認し、次の範囲も進めましょう。
        </p>
        <button className="mt-2 w-full rounded-[8px] py-2 text-[0.58rem] font-bold text-white" style={{ background: P }}>添削PDFを見る</button>
      </Card>

      <Card className="border-l-[3px] border-l-[#ea580c]">
        <p className="text-[0.5rem] font-bold text-[#ea580c]">再提出あり</p>
        <p className="mt-1 text-[0.54rem] font-extrabold text-[#0b1d4a]">力の分解 01</p>
        <p className="mt-0.5 text-[0.44rem] leading-[1.55] text-[#64748b]">不合格・再テストはここに戻ります。同じ範囲をもう一度実施。</p>
      </Card>
    </div>
  );
}

function ScreenHistory() {
  return (
    <div className="grid gap-2.5 pt-1">
      <p className="text-[0.62rem] font-extrabold text-[#0b1d4a]">山田太郎さんの成績</p>

      <div className="grid grid-cols-2 gap-1.5">
        {[
          { n: "86%", l: "合格率", c: "#16a34a" },
          { n: "78", l: "平均点", c: P },
        ].map((s) => (
          <Card key={s.l} className="!p-2.5">
            <p className="text-[1rem] font-extrabold leading-none" style={{ color: s.c }}>{s.n}</p>
            <p className="mt-1 text-[0.44rem] text-[#64748b]">{s.l}</p>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {[
          { n: "12", l: "合格数", c: "#ea580c" },
          { n: "6日", l: "連続学習", c: "#64748b" },
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
          <SubjTag label="物" />
          <div className="min-w-0 flex-1">
            <p className="text-[0.5rem] font-semibold text-[#334155]">物理標準演習 <span className="text-[#94a3b8]">合格12・採点待ち2</span></p>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#e2e8f0]"><div className="h-full w-[24%] rounded-full" style={{ background: `linear-gradient(90deg,${P},#a78bfa)` }} /></div>
          </div>
          <span className="text-[0.56rem] font-extrabold text-[#0b1d4a]">12/100</span>
        </div>
      </Card>

      <Card>
        <p className="text-[0.5rem] font-bold text-[#0b1d4a]">採点・返却の履歴</p>
        <div className="mt-1.5 flex items-start gap-2">
          <span className="mt-0.5 rounded bg-[#16a34a] px-1 py-0.5 text-[0.42rem] font-bold text-white">合格</span>
          <div className="min-w-0 flex-1">
            <p className="text-[0.5rem] font-semibold text-[#0b1d4a]">物理標準演習 力学 02</p>
            <p className="truncate text-[0.44rem] text-[#94a3b8]">添削PDF返却済み。コメント・点数・日付を保存</p>
          </div>
        </div>
      </Card>

      <Card className="bg-[#f0fdf4]">
        <p className="text-[0.5rem] font-bold text-[#15803d]">教材終了条件</p>
        <p className="mt-1 text-[0.48rem] leading-[1.6] text-[#166534]">全範囲が返却済みかつ合格になると終了。一冊分PDFを受け取れます。</p>
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
