/**
 * ノビットスタディ 高校部アプリの実画面に寄せたスマホ表示。
 * パンフレット用の実スクリーンショットと同じ、白ヘッダー・青タブ・水色CTAの画面設計で再現する。
 * 個人名は公開ページ用に「山田太郎さん」のサンプル表示にしている。
 */

type Variant = "home" | "submit" | "returned" | "history";
type ActiveTab = "task" | "return" | "grade" | "none";

const SKY = "#25a8df";

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
    lead: "提出後は自己採点しながら次へ進み、先生からの返却と再提出依頼は返却タブに届きます。",
    facts: [
      "返却タブで、先生からの返却と再提出が必要な課題を確認",
      "再提出依頼は同じ範囲をもう一度実施する課題として表示",
      "返却待ちでも、次の範囲と復習を並行して進められる",
    ],
  },
  {
    no: "04",
    variant: "history",
    title: "合格状況が「記録」される",
    lead: "取り組みは成績としてすべて残ります。いま何が合格済みで、どこに戻るべきかを数値で振り返れます。",
    facts: [
      "合格率・平均点・合格数・連続学習をひと目で確認",
      "教科別の成績と得点率の推移を一覧",
      "全範囲が返却済みかつ合格になると教材終了。一冊分PDFも受け取れる",
    ],
  },
];

const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const IconFlame = ({ c = "" }: { c?: string }) => (
  <svg viewBox="0 0 24 24" className={c} {...iconProps}>
    <path d="M12 3c1.5 3-1.5 4.2-1.5 7A3.5 3.5 0 0014 13c0-1.6-.8-2.6-1.6-3.4.2 1.8-.9 2.6-1.7 2.6 1.1-2.6-.9-5.4-2.2-6.2" />
    <path d="M8.5 12.5A4.5 4.5 0 1016 15c0-2-1-3.2-2-4.2" />
  </svg>
);

const IconStar = ({ c = "" }: { c?: string }) => (
  <svg viewBox="0 0 24 24" className={c} fill="currentColor" aria-hidden>
    <path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.9 6.8 19.5l1-5.8L3.6 9.6l5.8-.8z" />
  </svg>
);

const IconMedal = ({ c = "" }: { c?: string }) => (
  <svg viewBox="0 0 24 24" className={c} {...iconProps}>
    <path d="M9 3l3 6 3-6" />
    <circle cx="12" cy="15" r="5" />
    <path d="M12 12.5l1 2 2 .2-1.5 1.4.4 2L12 17l-1.9 1 .4-2L9 14.7l2-.2z" fill="currentColor" stroke="none" />
  </svg>
);

function PhoneFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative w-[270px] shrink-0 ${className}`}>
      <div className="rounded-[2.35rem] bg-[#0b1d4a] p-2.5 shadow-[0_50px_80px_-42px_rgba(11,29,74,0.75)] ring-1 ring-white/10">
        <div className="relative h-[486px] overflow-hidden rounded-[1.75rem] bg-[#f3f6f9]">
          <div className="pointer-events-none absolute left-1/2 top-2 z-20 h-3.5 w-16 -translate-x-1/2 rounded-full bg-[#0b1d4a]" />
          {children}
        </div>
      </div>
    </div>
  );
}

function AppChrome({
  active,
  children,
}: {
  active: ActiveTab;
  children: React.ReactNode;
}) {
  return (
    <div className="h-full overflow-hidden bg-[#f3f6f9] text-[#123657]">
      <header className="border-b-[2px] border-b-[#25a8df] bg-white px-4 pt-7">
        <picture>
          <source type="image/avif" srcSet="/brand/nobit-logo-480.avif" />
          <source type="image/webp" srcSet="/brand/nobit-logo-480.webp" />
          <img src="/brand/nobit-logo-480.webp" alt="ノビットスタディ" width={1970} height={375} className="h-5 w-auto" loading="lazy" decoding="async" />
        </picture>
        <div className="mt-5 flex items-center gap-2">
          <span className="shrink-0 text-[0.78rem] font-extrabold tracking-[-0.01em]">山田太郎</span>
          <span className="shrink-0 border border-[#d8e1eb] bg-[#f7f9fc] px-2 py-1 text-[0.56rem] font-extrabold text-[#607289]">
            生徒・中高部
          </span>
          <span className="shrink-0 border border-[#d8e1eb] bg-white px-2 py-1 text-[0.56rem] font-extrabold text-[#40536b]">
            ログアウト
          </span>
        </div>
        <nav aria-label="アプリ画面タブ" className="mt-4 flex items-end gap-7">
          <Tab label="課題" active={active === "task"} />
          <Tab label="返却" active={active === "return"} badge="1" />
          <Tab label="成績" active={active === "grade"} />
        </nav>
      </header>
      <main className="h-full bg-[#f3f6f9] px-3.5 py-4">{children}</main>
    </div>
  );
}

function Tab({ label, active, badge }: { label: string; active: boolean; badge?: string }) {
  return (
    <span className={`relative pb-3 text-[0.82rem] font-extrabold ${active ? "text-[#25a8df]" : "text-[#607289]"}`}>
      {label}
      {badge ? (
        <span className="ml-1.5 inline-grid h-5 w-5 place-items-center rounded-full bg-[#ef4444] align-middle text-[0.58rem] font-extrabold leading-none text-white">
          {badge}
        </span>
      ) : null}
      {active ? <span aria-hidden="true" className="absolute bottom-0 left-0 h-[3px] w-full bg-[#25a8df]" /> : null}
    </span>
  );
}

function AppPanel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`border border-[#d8e1eb] bg-white p-3.5 ${className}`}>{children}</section>;
}

function AppButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button className={`min-h-10 w-full bg-[#25a8df] px-3 text-center text-[0.74rem] font-extrabold text-white ${className}`}>
      {children}
    </button>
  );
}

function GhostButton({ children }: { children: React.ReactNode }) {
  return <button className="rounded-[8px] border border-[#d8e1eb] bg-white px-2.5 py-1.5 text-[0.58rem] font-extrabold text-[#40536b]">{children}</button>;
}

function StatChip({ children, icon }: { children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <span className="flex min-w-0 items-center justify-center gap-0.5 border border-white/40 px-1 py-1.5 text-[0.5rem] font-extrabold text-white/95">
      {icon}
      <span className="truncate">{children}</span>
    </span>
  );
}

function StatusBox({ value, label, tone }: { value: string; label: string; tone: "orange" | "green" | "blue" }) {
  const colors = {
    orange: "border-[#fed7aa] bg-[#fff7ed] text-[#ea580c]",
    green: "border-[#bbf7d0] bg-[#ecfdf5] text-[#059669]",
    blue: "border-[#bae6fd] bg-[#eff6ff] text-[#0284c7]",
  };
  return (
    <div className={`border p-2 text-center ${colors[tone]}`}>
      <p className="text-[1rem] font-extrabold leading-none">{value}</p>
      <p className="mt-1 text-[0.46rem] font-extrabold text-[#607289]">{label}</p>
    </div>
  );
}

function SubjectSquare({ label = "数" }: { label?: string }) {
  return <span className="grid h-10 w-10 shrink-0 place-items-center bg-[#25a8df] text-[0.9rem] font-extrabold text-white">{label}</span>;
}

function StatusBadge({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "red" }) {
  return (
    <span className={`inline-flex border px-2 py-1 text-[0.58rem] font-extrabold ${tone === "red" ? "border-[#fecdd3] bg-[#fff1f2] text-[#e11d48]" : "border-[#d8e1eb] bg-[#f7f9fc] text-[#607289]"}`}>
      {children}
    </span>
  );
}

function ScreenHome() {
  return (
    <AppChrome active="task">
      <div className="grid gap-3">
        <section className="bg-[#182957] px-3.5 py-4 text-white">
          <p className="whitespace-nowrap text-[0.96rem] font-extrabold leading-tight tracking-[-0.02em]">こんにちは、山田太郎さん</p>
          <p className="mt-2 text-[0.65rem] leading-relaxed text-white/88">目標から逆算して、今日の一歩を踏み出そう。</p>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            <StatChip icon={<IconFlame c="h-3 w-3" />}>0日連続</StatChip>
            <StatChip icon={<IconStar c="h-3 w-3" />}>合格 2</StatChip>
            <StatChip icon={<IconMedal c="h-3 w-3" />}>はじめのいっぽ</StatChip>
          </div>
        </section>

        <AppPanel>
          <p className="text-[0.68rem] font-extrabold text-[#25a8df]">今日の課題</p>
          <p className="mt-1.5 text-[0.94rem] font-extrabold leading-tight text-[#123657]">数学IA標準</p>
          <p className="mt-1 text-[0.62rem] leading-relaxed text-[#607289]">数学 ・ 数と式 A-3</p>
          <AppButton className="mt-3">取り組む →</AppButton>
        </AppPanel>

        <AppPanel>
          <div className="flex items-center justify-between gap-2">
            <p className="text-[0.82rem] font-extrabold text-[#123657]">学習状況</p>
            <span className="flex items-center gap-1 text-[0.58rem] font-extrabold text-[#d97706]">
              <IconMedal c="h-3 w-3" />
              はじめのいっぽ
            </span>
          </div>
          <div className="mt-3 h-3 bg-[#e7eef6]">
            <div className="h-full w-[67%] bg-[linear-gradient(90deg,#25a8df,#22c55e)]" />
          </div>
          <p className="mt-2 text-[0.66rem] font-extrabold text-[#607289]">次のランクまで あと 1</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <StatusBox value="2" label="合格" tone="orange" />
            <StatusBox value="2" label="完了" tone="green" />
            <StatusBox value="3" label="今週の提出" tone="blue" />
          </div>
        </AppPanel>
      </div>
    </AppChrome>
  );
}

function ScreenSubmit() {
  return (
    <AppChrome active="none">
      <div className="grid gap-3">
        <button className="w-fit rounded-[8px] border border-[#d8e1eb] bg-white px-2.5 py-1.5 text-[0.62rem] font-extrabold text-[#40536b]">
          ← 課題一覧へ
        </button>
        <div>
          <p className="text-[1rem] font-extrabold leading-tight tracking-[-0.02em] text-[#123657]">
            数学IA標準 <StatusBadge>未提出</StatusBadge>
          </p>
          <p className="mt-2 text-[0.62rem] leading-relaxed text-[#607289]">山田太郎 ・ 数学 ・ 範囲 数と式 B-1 ・ 4回目</p>
        </div>

        <AppPanel>
          <p className="text-[0.82rem] font-extrabold text-[#123657]">課題</p>
          <div className="mt-4 flex items-center gap-2">
            <span aria-hidden="true" className="text-[0.82rem]">📄</span>
            <p className="min-w-0 flex-1 truncate text-[0.82rem] font-extrabold text-[#0f172a]">数と式 B-1.pdf</p>
            <GhostButton>開く</GhostButton>
            <GhostButton>保存する</GhostButton>
          </div>
        </AppPanel>

        <AppPanel>
          <p className="text-[0.82rem] font-extrabold text-[#123657]">この課題を解く</p>
          <AppButton className="mt-4">✏️ 一画面で書き込んで解く</AppButton>
          <p className="mt-3 text-[0.62rem] leading-[1.8] text-[#607289]">
            タッチペン・指で直接書き込めます。書いた内容は自動保存され、提出するまで消えません。
          </p>
        </AppPanel>
      </div>
    </AppChrome>
  );
}

function ScreenReturned() {
  return (
    <AppChrome active="return">
      <div className="grid gap-3">
        <div>
          <h3 className="text-[1.08rem] font-extrabold tracking-[-0.02em] text-[#123657]">返却・答え合わせ</h3>
          <p className="mt-2 text-[0.62rem] leading-relaxed text-[#607289]">提出した課題の自己採点と、先生からの返却をここで確認します。</p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-[0.9rem] font-extrabold text-[#123657]">再提出が必要</p>
          <span className="grid h-7 w-7 place-items-center bg-[#25a8df] text-[0.76rem] font-extrabold text-white">1</span>
        </div>

        <AppPanel>
          <div className="flex items-start gap-3">
            <SubjectSquare />
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-center gap-2 text-[0.86rem] font-extrabold leading-tight text-[#123657]">
                数学IA標準
                <StatusBadge tone="red">再提出依頼</StatusBadge>
              </p>
              <p className="mt-2 text-[0.62rem] leading-relaxed text-[#607289]">数学 ・ 数と式 A-3</p>
            </div>
          </div>
          <AppButton className="mt-4">再提出する</AppButton>
        </AppPanel>

        <AppPanel>
          <p className="text-[0.76rem] font-extrabold text-[#123657]">返却済みの課題</p>
          <div className="mt-3 flex items-center gap-3 border-t border-[#e4ebf2] pt-3">
            <SubjectSquare />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.72rem] font-extrabold text-[#123657]">数学IA標準 数と式 A-2</p>
              <p className="mt-1 text-[0.56rem] text-[#607289]">合格。添削PDFとコメントを確認できます。</p>
            </div>
          </div>
        </AppPanel>
      </div>
    </AppChrome>
  );
}

function MetricCard({ title, value, sub, tone }: { title: string; value: string; sub: string; tone: "green" | "blue" | "orange" | "pink" }) {
  const colors = {
    green: "text-[#059669]",
    blue: "text-[#25a8df]",
    orange: "text-[#ea580c]",
    pink: "text-[#db2777]",
  };
  return (
    <div className="rounded-[8px] border border-[#d8e1eb] bg-white p-3">
      <p className="text-[0.68rem] font-extrabold text-[#607289]">{title}</p>
      <p className={`mt-1 text-[1.25rem] font-extrabold leading-none ${colors[tone]}`}>{value}</p>
      <p className="mt-1 text-[0.56rem] leading-snug text-[#8aa0b8]">{sub}</p>
    </div>
  );
}

function ScreenHistory() {
  return (
    <AppChrome active="grade">
      <div className="grid gap-3">
        <div>
          <h3 className="text-[1.08rem] font-extrabold tracking-[-0.02em] text-[#123657]">成績</h3>
          <p className="mt-2 text-[0.62rem] leading-relaxed text-[#607289]">あなたの成績 ・ 高3 です。</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <MetricCard title="合格率" value="67%" sub="2/3 課題" tone="green" />
          <MetricCard title="平均点" value="75%" sub="得点率の平均" tone="blue" />
          <MetricCard title="合格数" value="2" sub="はじめのいっぽ" tone="orange" />
          <MetricCard title="連続学習" value="0" sub="日" tone="pink" />
        </div>

        <AppPanel>
          <p className="text-[0.82rem] font-extrabold text-[#123657]">教科別の成績</p>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="text-[0.82rem] font-extrabold text-[#123657]">数学</p>
              <p className="mt-1 text-[0.58rem] text-[#607289]">合格 2/3 ・ 平均 75%</p>
            </div>
            <p className="text-[0.9rem] font-extrabold text-[#123657]">67%</p>
          </div>
          <div className="mt-2 h-2 bg-[#e7eef6]">
            <div className="h-full w-[67%] bg-[#25a8df]" />
          </div>
        </AppPanel>

        <AppPanel>
          <p className="text-[0.82rem] font-extrabold text-[#123657]">得点率の推移</p>
          <div className="relative mt-4 h-20 overflow-hidden bg-[#e9f6fb]">
            <div className="absolute left-3 right-3 top-10 border-t border-dashed border-[#c8ddeb]" />
            <svg viewBox="0 0 220 72" className="absolute inset-0 h-full w-full" aria-hidden>
              <path d="M16 28 L112 28 L204 56" fill="none" stroke={SKY} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="16" cy="28" r="3" fill="#fff" stroke={SKY} strokeWidth="3" />
              <circle cx="112" cy="28" r="3" fill="#fff" stroke={SKY} strokeWidth="3" />
              <circle cx="204" cy="56" r="3" fill="#fff" stroke={SKY} strokeWidth="3" />
            </svg>
          </div>
          <p className="mt-2 text-[0.58rem] text-[#607289]">直近 3 課題 ・ 最終活動 2026/7/5</p>
        </AppPanel>
      </div>
    </AppChrome>
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
