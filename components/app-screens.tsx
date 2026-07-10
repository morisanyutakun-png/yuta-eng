/**
 * ノビットスタディ 中高部アプリの実画面に寄せたスマホ表示。
 * 2026-07 の新パンフレット（購入後フロー）に合わせ、購入後のアカウント発行、
 * ログイン、ダッシュボード、提出、返却、レポートまでを同じ見た目で再現する。
 */

type Variant = "account" | "login" | "home" | "submit" | "returned" | "history";

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
    variant: "account",
    title: "決済後、ログイン情報が発行される",
    lead: "決済が完了すると、生徒用のログインIDとPINが表示されます。同じ内容はメールでも届きます。",
    facts: [
      "購入後の戻り先で、そのままログイン情報を確認",
      "ログインIDとPINは、メモまたはスクリーンショットで保存",
      "同じ決済を開き直しても、二重発行されないよう処理",
    ],
  },
  {
    no: "02",
    variant: "login",
    title: "ログインする",
    lead: "発行されたログインIDとPINを入力して、生徒専用の学習画面へ入ります。",
    facts: [
      "生徒はログインIDとPINだけで開始",
      "購入者メールとは別に、生徒ごとの学習アカウントとして管理",
      "ログイン後は、購入した教材が自動でホームに表示",
    ],
  },
  {
    no: "03",
    variant: "home",
    title: "購入教材がダッシュボードに届く",
    lead: "購入した科目に対応する教材が、ダッシュボードの今日の学習と教材別の現在地に表示されます。",
    facts: [
      "購入教材が自動で割り当てられ、すぐ最初の範囲へ進める",
      "未提出・自己採点・返却が分かれ、次の行動が見える",
      "合格数・採点待ち・再提出ありも、教材別に追える",
    ],
  },
  {
    no: "04",
    variant: "submit",
    title: "PDFに取り組んで提出する",
    lead: "課題を開くと、問題PDFと実施範囲が表示されます。PDFや写真を添付して提出できます。",
    facts: [
      "問題PDFを開いて確認。必要なら保存して紙で解いてもOK",
      "アプリ内で直接書くか、GoodNotesなどのPDFを添付",
      "保存したPDFや答案写真を最大3件まで添付",
      "提出すると解答解説PDFが見られ、同時に次の範囲が追加",
    ],
  },
  {
    no: "05",
    variant: "returned",
    title: "返却・再提出も「並行」して進む",
    lead: "提出後は自己採点しながら次へ進み、先生の添削返却は返却タブに届きます。",
    facts: [
      "採点待ち、先生から返却、再提出が必要を分けて表示",
      "不合格や再テストは再提出として戻る",
      "先生のコメントや添削済みPDFを見ながら復習できる",
    ],
  },
  {
    no: "06",
    variant: "history",
    title: "合格状況がレポートに残る",
    lead: "取り組みは学習レポートとして残ります。何が合格済みで、どこへ戻るべきかを振り返れます。",
    facts: [
      "合格率・平均点・合格数・連続学習をひと目で確認",
      "教科別の成績と採点・返却の履歴を一覧",
      "全範囲が返却済みかつ合格になると教材終了",
    ],
  },
];

function LogoMark({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <picture>
      <source type="image/avif" srcSet="/brand/nobit-logo-480.avif" />
      <source type="image/webp" srcSet="/brand/nobit-logo-480.webp" />
      <img
        src="/brand/nobit-logo-480.webp"
        alt="ノビットスタディ"
        width={1970}
        height={375}
        className={className}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}

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

function WebAppShell({
  active,
  children,
}: {
  active: "課題" | "返却" | "成績";
  children: React.ReactNode;
}) {
  return (
    <div className="h-full overflow-hidden bg-[#f3f6f9] text-[#123657]">
      <header className="border-b border-[#25a8df] bg-white px-3 pt-7">
        <LogoMark className="h-4 w-auto" />
        <div className="mt-4 flex items-center gap-1.5">
          <span className="shrink-0 text-[0.58rem] font-extrabold">山田太郎</span>
          <span className="shrink-0 border border-[#d8e1eb] bg-[#f7f9fc] px-1.5 py-0.5 text-[0.38rem] font-extrabold text-[#607289]">
            生徒・中高部
          </span>
          <span className="shrink-0 border border-[#d8e1eb] bg-white px-1.5 py-0.5 text-[0.38rem] font-extrabold text-[#40536b]">
            ログアウト
          </span>
        </div>
        <nav aria-label="アプリ画面タブ" className="mt-3 flex items-end gap-6">
          {(["課題", "返却", "成績"] as const).map((tab) => (
            <span
              key={tab}
              className={`relative pb-2 text-[0.62rem] font-extrabold ${active === tab ? "text-[#25a8df]" : "text-[#607289]"}`}
            >
              {tab}
              {tab === "返却" ? (
                <span className="ml-1 inline-grid h-4 w-4 place-items-center rounded-full bg-[#ef4444] align-middle text-[0.42rem] font-extrabold leading-none text-white">
                  1
                </span>
              ) : null}
              {active === tab ? <span aria-hidden="true" className="absolute bottom-0 left-0 h-0.5 w-full bg-[#25a8df]" /> : null}
            </span>
          ))}
        </nav>
      </header>
      <main className="h-full min-w-0 overflow-hidden bg-[#f3f6f9] px-3 py-3">{children}</main>
    </div>
  );
}

function MiniButton({ children, tone = "blue" }: { children: React.ReactNode; tone?: "blue" | "white" | "red" }) {
  const styles = {
    blue: "bg-[#25a8df] text-white",
    white: "border border-[#d8e1eb] bg-white text-[#40536b]",
    red: "bg-[#c81046] text-white",
  };
  return <span className={`inline-grid min-h-7 place-items-center px-2.5 text-[0.5rem] font-extrabold ${styles[tone]}`}>{children}</span>;
}

function StatusPill({ children, tone = "gray" }: { children: React.ReactNode; tone?: "gray" | "purple" | "red" | "green" }) {
  const styles = {
    gray: "border-[#d8e1eb] bg-[#f7f9fc] text-[#607289]",
    purple: "border-[#ddd6fe] bg-[#f3e8ff] text-[#7c3aed]",
    red: "border-[#fecdd3] bg-[#fff1f2] text-[#e11d48]",
    green: "border-[#bbf7d0] bg-[#ecfdf5] text-[#059669]",
  };
  return <span className={`inline-flex border px-2 py-1 text-[0.52rem] font-extrabold ${styles[tone]}`}>{children}</span>;
}

function AccountScreen() {
  return (
    <div className="h-full bg-white px-6 py-12 text-center">
      <LogoMark className="mx-auto h-8 w-auto" />
      <h3 className="mt-10 text-[1rem] font-extrabold text-[#0f172a]">アカウント発行</h3>
      <p className="mx-auto mt-5 max-w-[12rem] text-[0.62rem] leading-[1.8] text-[#64748b]">
        お申し込みありがとうございます。下のログイン情報で利用いただけます。
      </p>
      <div className="mt-5 rounded-[10px] bg-[#f8fafc] p-4 text-left ring-1 ring-[#d8e1eb]">
        <div className="grid grid-cols-[4.7rem_1fr] items-baseline gap-y-2">
          <span className="text-[0.64rem] font-extrabold text-[#64748b]">ログインID</span>
          <span className="font-mono text-[1rem] font-black tracking-[0.04em] text-[#123657]">st1234</span>
          <span className="text-[0.64rem] font-extrabold text-[#64748b]">パスワード</span>
          <span className="font-mono text-[1rem] font-black tracking-[0.08em] text-[#123657]">2468</span>
          <span className="text-[0.56rem] font-extrabold text-[#64748b]">(PIN)</span>
        </div>
      </div>
      <div className="mt-5 grid min-h-12 place-items-center bg-[#25a8df] text-[0.82rem] font-extrabold text-white">
        ログインする
      </div>
      <p className="mt-5 text-[0.54rem] leading-[1.75] text-[#8b98aa]">
        ログインIDとパスワード（PIN）はメモまたはスクリーンショットの保存をおすすめします。
      </p>
      <p className="mt-8 text-[0.52rem] text-[#94a3b8]">© 2026 Nobit Study</p>
    </div>
  );
}

function LoginScreen() {
  return (
    <div className="h-full bg-white px-6 py-12 text-center">
      <LogoMark className="mx-auto h-8 w-auto" />
      <h3 className="mt-12 text-[1rem] font-extrabold text-[#0f172a]">ログイン</h3>
      <div className="mt-8 grid gap-3 text-left">
        <div className="border border-[#d8e1eb] bg-white px-3 py-3 text-[0.72rem] font-semibold text-[#94a3b8]">
          メールアドレス または ログインID
        </div>
        <div className="border border-[#d8e1eb] bg-white px-3 py-3 text-[0.72rem] font-semibold text-[#94a3b8]">
          パスワード
        </div>
      </div>
      <div className="mt-5 grid min-h-12 place-items-center bg-[#25a8df] text-[0.82rem] font-extrabold text-white">
        ログイン
      </div>
      <p className="mt-5 text-[0.54rem] leading-[1.75] text-[#8b98aa]">
        ログイン情報がわからないときは、教室の先生におたずねください。
      </p>
      <p className="mt-6 text-[0.52rem] text-[#94a3b8]">ノビットスタディについて　｜　© 2026 Nobit Study</p>
    </div>
  );
}

function ActionCard({
  title,
  label,
  count,
  tone,
}: {
  title: string;
  label: string;
  count: string;
  tone: "blue" | "green" | "red";
}) {
  const styles: Record<"blue" | "green" | "red", { card: string; action: string }> = {
    blue: {
      card: "border-l-[#25a8df] bg-[#f2faff] text-[#0284c7]",
      action: "bg-[#25a8df] text-white",
    },
    green: {
      card: "border-l-[#10a37f] bg-[#effbf6] text-[#059669]",
      action: "bg-[#10a37f] text-white",
    },
    red: {
      card: "border-l-[#c81046] bg-[#fff1f4] text-[#c81046]",
      action: "bg-[#c81046] text-white",
    },
  };
  const actionLabel = tone === "green" ? "採点" : tone === "red" ? "確認" : "取組";

  return (
    <div className={`relative min-w-0 overflow-hidden rounded-[6px] border border-[#d8e1eb] border-l-[3px] px-2 py-2.5 ${styles[tone].card}`}>
      <span aria-hidden="true" className="absolute -right-4 -top-5 h-12 w-12 rotate-45 bg-white/55" />
      <p className="relative truncate whitespace-nowrap text-[0.64rem] font-extrabold leading-tight text-[#123657]">{title}</p>
      <p className="relative mt-0.5 truncate text-[0.43rem] font-bold leading-tight text-[#607289]">{label}</p>
      <div className="relative mt-2 grid grid-cols-[1.45rem_1fr] items-stretch gap-1.5">
        <span className="grid h-6 min-w-0 place-items-center rounded-[4px] border border-current bg-white/78 text-[0.78rem] font-black leading-none">
          {count}
        </span>
        <span className={`grid min-h-6 min-w-0 place-items-center rounded-[4px] px-1 text-[0.45rem] font-extrabold leading-none ${styles[tone].action}`}>
          {actionLabel}
        </span>
      </div>
    </div>
  );
}

function ScreenHome() {
  return (
    <WebAppShell active="課題">
      <section className="relative overflow-hidden rounded-[4px] bg-[linear-gradient(125deg,#192653_0%,#193d7e_56%,#0f766e_100%)] px-3.5 py-4 text-white">
        <span className="inline-flex border border-white/35 px-2 py-1 text-[0.4rem] font-black tracking-[0.18em] text-white/90">
          LEARNING DASHBOARD
        </span>
        <p className="mt-3 whitespace-nowrap text-[0.92rem] font-black leading-tight">こんにちは、山田太郎さん</p>
        <p className="mt-2 text-[0.5rem] leading-relaxed text-white/82">復習で定着、演習で得点。着実に積み上げよう。</p>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {["1日連続", "合格 2", "はじめのいっぽ"].map((label) => (
            <span key={label} className="border border-white/30 py-1.5 text-center text-[0.42rem] font-bold text-white/90">{label}</span>
          ))}
        </div>
      </section>

      <div className="mt-3 flex items-end justify-between">
        <div>
          <p className="text-[0.42rem] font-black uppercase tracking-[0.18em] text-[#1d4ed8]">Next Actions</p>
          <p className="text-[0.9rem] font-extrabold text-[#123657]">今日の学習</p>
        </div>
        <span className="rounded-full bg-white px-2.5 py-1 text-[0.42rem] font-extrabold text-[#1d4ed8] ring-1 ring-[#d8e1eb]">
          提出 → 自己採点 → 返却
        </span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-1.5">
        <ActionCard title="課題" label="未提出" count="2" tone="blue" />
        <ActionCard title="自己採点" label="即確認" count="2" tone="green" />
        <ActionCard title="返却" label="添削" count="0" tone="red" />
      </div>

      <section className="mt-3 rounded-[8px] border border-[#d8e1eb] bg-white p-3">
        <div className="flex items-center justify-between">
          <p className="text-[0.74rem] font-extrabold text-[#123657]">学習状況</p>
          <span className="text-[0.48rem] font-extrabold text-[#d97706]">はじめのいっぽ</span>
        </div>
        <div className="mt-3 h-2.5 rounded-full bg-[#e7eef6]">
          <div className="h-full w-[67%] rounded-full bg-[linear-gradient(90deg,#25a8df,#22c55e)]" />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            ["2", "合格", "#ea580c"],
            ["2", "完了", "#059669"],
            ["4", "今週の提出", "#0284c7"],
          ].map(([value, label, color]) => (
            <div key={label} className="rounded-[8px] border border-[#d8e1eb] bg-[#f8fafc] p-2 text-center">
              <p className="text-[1rem] font-black leading-none" style={{ color }}>{value}</p>
              <p className="mt-1 text-[0.4rem] font-extrabold text-[#607289]">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </WebAppShell>
  );
}

function ScreenSubmit() {
  return (
    <WebAppShell active="課題">
      <button className="w-fit rounded-[8px] border border-[#d8e1eb] bg-white px-2.5 py-1.5 text-[0.52rem] font-extrabold text-[#40536b]">
        ← 課題一覧へ
      </button>
      <p className="mt-3 text-[0.94rem] font-extrabold leading-tight tracking-[-0.02em] text-[#123657]">
        数学IA標準 <StatusPill>未提出</StatusPill>
      </p>
      <p className="mt-1.5 text-[0.5rem] leading-relaxed text-[#607289]">山田太郎 ・ 数学 ・ 範囲 数と式 A-1 ・ 2回目</p>

      <section className="mt-3 border border-[#d8e1eb] bg-white p-3">
        <p className="text-[0.68rem] font-extrabold text-[#123657]">課題</p>
        <p className="mt-2 text-[0.48rem] leading-relaxed text-[#607289]">
          問題PDFと解答解説PDFを分離。購入教材に自動割り当て。
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-[0.9rem]" aria-hidden="true">📄</span>
          <span className="min-w-0 flex-1 truncate text-[0.54rem] font-extrabold text-[#0f172a]">数と式 A-1 問題.pdf</span>
          <MiniButton tone="white">開く</MiniButton>
          <MiniButton tone="white">保存</MiniButton>
        </div>
      </section>

      <section className="mt-3 border border-[#d8e1eb] bg-white p-3">
        <p className="text-[0.68rem] font-extrabold text-[#123657]">この課題を進める</p>
        <div className="mt-3 grid min-h-10 place-items-center bg-[#25a8df] text-[0.64rem] font-extrabold text-white">
          一画面で書き込んで解く
        </div>
        <div className="mt-4 border border-[#d8e1eb] bg-[#f8fbfd] p-3">
          <p className="text-[0.58rem] font-extrabold text-[#123657]">提出前の確認</p>
          <p className="mt-1 text-[0.46rem] leading-relaxed text-[#607289]">保存したPDF、GoodNotesのPDF、途中式の写真を最大3件まで添付できます。</p>
          <div className="mt-3 rounded-[12px] border border-dashed border-[#9bd4ef] bg-[#f0f9ff] p-4 text-center">
            <p className="text-[1.4rem]" aria-hidden="true">📎</p>
            <p className="mt-1 text-[0.62rem] font-extrabold text-[#123657]">PDF・写真を添付する</p>
          </div>
          <div className="mt-3 grid min-h-9 place-items-center bg-[#25a8df] text-[0.6rem] font-extrabold text-white">
            まず答案を添付する
          </div>
        </div>
      </section>
    </WebAppShell>
  );
}

function ScreenReturned() {
  return (
    <WebAppShell active="返却">
      <h3 className="text-[1.08rem] font-extrabold tracking-[-0.02em] text-[#123657]">返却</h3>
      <p className="mt-2 text-[0.58rem] leading-relaxed text-[#607289]">先生の採点コメント、添削PDF、再提出の指示だけを確認します。</p>
      <div className="mt-4 flex items-center gap-2">
        <p className="text-[0.84rem] font-extrabold text-[#123657]">確認済み</p>
        <span className="grid h-7 w-7 place-items-center bg-[#25a8df] text-[0.76rem] font-extrabold text-white">2</span>
      </div>

      {["数と式 A-2", "数と式 A-1"].map((range) => (
        <section key={range} className="mt-3 border border-[#d8e1eb] bg-white p-3">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-10 shrink-0 place-items-center rounded-[4px] bg-[linear-gradient(180deg,#f8fafc,#d6f5ef)] text-center text-[0.42rem] font-black text-[#123657] ring-1 ring-[#d8e1eb]">
              数学IA
            </div>
            <div className="min-w-0">
              <p className="text-[0.72rem] font-extrabold text-[#123657]">
                数学IA標準 <StatusPill tone="purple">完了</StatusPill>
              </p>
              <p className="mt-1 text-[0.52rem] text-[#607289]">数学 ・ {range}</p>
            </div>
          </div>
        </section>
      ))}
    </WebAppShell>
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
      <p className="text-[0.58rem] font-extrabold text-[#607289]">{title}</p>
      <p className={`mt-1 text-[1.18rem] font-extrabold leading-none ${colors[tone]}`}>{value}</p>
      <p className="mt-1 text-[0.48rem] leading-snug text-[#8aa0b8]">{sub}</p>
    </div>
  );
}

function ScreenHistory() {
  return (
    <WebAppShell active="成績">
      <h3 className="text-[1.08rem] font-extrabold tracking-[-0.02em] text-[#123657]">学習レポート</h3>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <MetricCard title="合格率" value="67%" sub="2/3 課題" tone="green" />
        <MetricCard title="平均点" value="75%" sub="得点率の平均" tone="blue" />
        <MetricCard title="合格数" value="2" sub="はじめのいっぽ" tone="orange" />
        <MetricCard title="連続学習" value="0" sub="日" tone="pink" />
      </div>

      <section className="mt-3 border border-[#d8e1eb] bg-white p-3">
        <p className="text-[0.7rem] font-extrabold text-[#123657]">教科別の成績</p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-[0.64rem] font-extrabold text-[#123657]">数学</p>
          <p className="text-[0.54rem] font-bold text-[#607289]">合格 2/3 ・ 平均 75%</p>
          <p className="text-[0.72rem] font-extrabold text-[#123657]">67%</p>
        </div>
        <div className="mt-2 h-2 rounded-full bg-[#e7eef6]">
          <div className="h-full w-[67%] rounded-full bg-[#25a8df]" />
        </div>
      </section>

      <section className="mt-3 border border-[#d8e1eb] bg-white p-3">
        <p className="text-[0.7rem] font-extrabold text-[#123657]">得点率の推移</p>
        <div className="relative mt-3 h-20 overflow-hidden bg-[#e9f6fb]">
          <svg viewBox="0 0 220 72" className="absolute inset-0 h-full w-full" aria-hidden>
            <path d="M12 22 L112 22 L206 52" fill="none" stroke={SKY} strokeWidth="3" strokeLinecap="round" />
            <circle cx="12" cy="22" r="3" fill="#fff" stroke={SKY} strokeWidth="3" />
            <circle cx="112" cy="22" r="3" fill="#fff" stroke={SKY} strokeWidth="3" />
            <circle cx="206" cy="52" r="3" fill="#fff" stroke={SKY} strokeWidth="3" />
          </svg>
        </div>
        <p className="mt-2 text-[0.48rem] text-[#607289]">直近3課題 ・ 最終活動 2026/7/5</p>
      </section>

      <section className="mt-3 border border-[#d8e1eb] bg-white p-3">
        <p className="text-[0.7rem] font-extrabold text-[#123657]">採点・返却の履歴</p>
        <ul className="mt-3 grid gap-2">
          {[
            ["不合格", "数学IA標準（数と式 A-3）", "1.00 / 4.00"],
            ["合格", "数学IA標準（数と式 A-2）", "4.00 / 4.00"],
          ].map(([status, title, score]) => (
            <li key={title} className="flex items-center justify-between border-t border-[#e5e7eb] pt-2 text-[0.48rem]">
              <span className={status === "合格" ? "font-extrabold text-[#059669]" : "font-extrabold text-[#e11d48]"}>{status}</span>
              <span className="max-w-[7rem] truncate text-[#123657]">{title}</span>
              <span className="font-bold text-[#123657]">{score}</span>
            </li>
          ))}
        </ul>
      </section>
    </WebAppShell>
  );
}

const BODIES: Record<Variant, () => React.JSX.Element> = {
  account: AccountScreen,
  login: LoginScreen,
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
