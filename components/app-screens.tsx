import Image from "next/image";

const screenAssetVersion = "20260711";

/**
 * ノビットスタディ 中高部アプリの実画面に寄せたスマホ表示。
 * 2026-07 の新パンフレットから切り出した画面画像を使い、購入後のアカウント発行、
 * ログイン、ダッシュボード、提出、返却、レポートまでを同じ見た目で見せる。
 */

export type AppScreenVariant = "account" | "login" | "home" | "submit" | "returned" | "history";

export const appSteps: {
  no: string;
  variant: AppScreenVariant;
  title: string;
  lead: string;
  facts: string[];
}[] = [
  {
    no: "01",
    variant: "account",
    title: "決済完了後、ログイン情報が発行される",
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
    title: "ダッシュボードに購入教材が自動で届く",
    lead: "購入した科目に対応する教材が、ダッシュボードの今日の学習と教材別の現在地に表示されます。",
    facts: [
      "例: 数学IAの購入で、数学IA標準が自動割り当て",
      "教材表紙と範囲名で、どの本を進めているか確認",
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
      "「画面で解く」から、タッチペン・指で直接記入してPDF保存",
      "保存したPDF、GoodNotesのPDF、紙に解いた答案写真を最大3件まで添付",
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
      "全範囲が返却済みかつ合格になると教材終了。一冊分PDFも受け取れる",
    ],
  },
];

type ScreenOverlay = {
  text: string;
  className: string;
};

type ScreenFooter = {
  eyebrow: string;
  title: string;
  items: {
    label: string;
    value: string;
    tone: "blue" | "green" | "rose" | "orange";
  }[];
};

type AppScreenImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  imageClassName?: string;
  overlays?: ScreenOverlay[];
  footer?: ScreenFooter;
};

export const appScreenImages: Record<AppScreenVariant, AppScreenImage> = {
  account: {
    src: `/app-screens/account.png?v=${screenAssetVersion}`,
    width: 392,
    height: 566,
    alt: "購入後に発行されるログイン情報の画面",
    imageClassName: "w-full",
  },
  login: {
    src: `/app-screens/login.png?v=${screenAssetVersion}`,
    width: 392,
    height: 554,
    alt: "ログインIDとPINを入力するログイン画面",
    imageClassName: "w-full",
  },
  home: {
    src: `/app-screens/dashboard.png?v=${screenAssetVersion}`,
    width: 724,
    height: 204,
    alt: "購入教材が届いたダッシュボード画面",
    imageClassName: "w-full",
    footer: {
      eyebrow: "NEXT ACTIONS",
      title: "今日の学習",
      items: [
        { label: "課題", value: "2", tone: "blue" },
        { label: "自己採点", value: "2", tone: "green" },
        { label: "返却", value: "0", tone: "rose" },
      ],
    },
  },
  submit: {
    src: `/app-screens/submit.png?v=${screenAssetVersion}`,
    width: 666,
    height: 387,
    alt: "数学IA標準の課題提出画面",
    imageClassName: "w-full",
    footer: {
      eyebrow: "SUBMIT",
      title: "PDF・写真を添付して提出",
      items: [
        { label: "問題PDF", value: "開く", tone: "blue" },
        { label: "答案", value: "添付", tone: "green" },
        { label: "上限", value: "3件", tone: "orange" },
      ],
    },
  },
  returned: {
    src: `/app-screens/returned.png?v=${screenAssetVersion}`,
    width: 411,
    height: 362,
    alt: "先生から返却された添削結果の画面",
    imageClassName: "w-full",
    footer: {
      eyebrow: "RETURNED",
      title: "添削PDFとコメントを確認",
      items: [
        { label: "確認済み", value: "2", tone: "blue" },
        { label: "状態", value: "完了", tone: "green" },
        { label: "復習", value: "次へ", tone: "orange" },
      ],
    },
  },
  history: {
    src: `/app-screens/report.png?v=${screenAssetVersion}`,
    width: 980,
    height: 1180,
    alt: "学習レポートと採点履歴の画面",
    imageClassName: "w-full",
    footer: {
      eyebrow: "REPORT",
      title: "合格率と返却履歴を記録",
      items: [
        { label: "合格率", value: "67%", tone: "green" },
        { label: "平均点", value: "75%", tone: "blue" },
        { label: "合格数", value: "2", tone: "orange" },
      ],
    },
  },
};

const footerToneStyles = {
  blue: "border-[#bae6fd] bg-[#eff9ff] text-[#0284c7]",
  green: "border-[#bbf7d0] bg-[#f0fdf4] text-[#059669]",
  rose: "border-[#fecdd3] bg-[#fff1f4] text-[#c81046]",
  orange: "border-[#fed7aa] bg-[#fff7ed] text-[#ea580c]",
} as const;

function LogoMark({ className = "h-4 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/brand/nobit-logo-480.webp"
      alt="ノビットスタディ"
      width={1970}
      height={375}
      sizes="120px"
      className={className}
    />
  );
}

function MobileShell({
  active,
  children,
}: {
  active: "ダッシュボード" | "課題" | "自己採点" | "返却";
  children: React.ReactNode;
}) {
  return (
    <div className="h-full overflow-hidden bg-[#f3f6f9] text-[#123657]">
      <header className="border-b border-[#25a8df] bg-white px-3 pt-7">
        <LogoMark className="h-4 w-auto" />
        <div className="mt-2.5 flex min-w-0 items-center gap-1.5">
          <span className="shrink-0 text-[0.56rem] font-black leading-none">山田太郎</span>
          <span className="shrink-0 border border-[#d8e1eb] bg-[#f7f9fc] px-1.5 py-1 text-[0.36rem] font-extrabold leading-none text-[#607289]">
            生徒・中高部
          </span>
          <span className="shrink-0 border border-[#d8e1eb] bg-white px-1.5 py-1 text-[0.36rem] font-extrabold leading-none text-[#40536b]">
            ログアウト
          </span>
        </div>
        <nav aria-label="アプリ画面タブ" className="mt-2.5 grid grid-cols-4 text-center text-[0.43rem] font-black">
          {(["ダッシュボード", "課題", "自己採点", "返却"] as const).map((tab) => (
            <span
              key={tab}
              className={`relative pb-2 leading-none ${active === tab ? "text-[#25a8df]" : "text-[#607289]"}`}
            >
              {tab}
              {tab === "課題" || tab === "自己採点" ? (
                <span className="ml-1 inline-grid h-3.5 w-3.5 place-items-center rounded-full bg-[#ef4444] align-middle text-[0.36rem] leading-none text-white">
                  2
                </span>
              ) : null}
              {active === tab ? <span aria-hidden="true" className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#25a8df]" /> : null}
            </span>
          ))}
        </nav>
      </header>
      <main className="h-[calc(100%-6.25rem)] overflow-hidden px-3 py-3">{children}</main>
    </div>
  );
}

function StatusBadge({ children, tone = "blue" }: { children: React.ReactNode; tone?: "blue" | "green" | "rose" | "orange" | "purple" }) {
  const styles = {
    blue: "bg-[#e0f2fe] text-[#0284c7]",
    green: "bg-[#dcfce7] text-[#059669]",
    rose: "bg-[#ffe4e6] text-[#c81046]",
    orange: "bg-[#ffedd5] text-[#ea580c]",
    purple: "bg-[#ede9fe] text-[#7c3aed]",
  } as const;

  return <span className={`inline-flex items-center px-1.5 py-0.5 text-[0.42rem] font-black leading-none ${styles[tone]}`}>{children}</span>;
}

function ActionTile({
  label,
  caption,
  value,
  tone,
}: {
  label: string;
  caption: string;
  value: string;
  tone: "blue" | "green" | "rose";
}) {
  const styles = {
    blue: "border-l-[#25a8df] bg-[#f2faff] text-[#0284c7]",
    green: "border-l-[#10a37f] bg-[#effbf6] text-[#059669]",
    rose: "border-l-[#c81046] bg-[#fff1f4] text-[#c81046]",
  } as const;

  return (
    <div className={`min-w-0 rounded-[7px] border border-[#d8e1eb] border-l-[3px] px-2 py-2 ${styles[tone]}`}>
      <p className="truncate text-[0.56rem] font-black leading-tight text-[#123657]">{label}</p>
      <p className="mt-0.5 truncate text-[0.36rem] font-bold leading-none text-[#607289]">{caption}</p>
      <div className="mt-2 grid grid-cols-[1.25rem_1fr] items-center gap-1.5">
        <span className="grid h-5 place-items-center border border-current bg-white/75 text-[0.68rem] font-black leading-none">{value}</span>
        <span className="truncate text-[0.4rem] font-black leading-none">{tone === "green" ? "採点" : tone === "rose" ? "確認" : "取組"}</span>
      </div>
    </div>
  );
}

function ScreenHomeMobile() {
  return (
    <MobileShell active="ダッシュボード">
      <section className="relative overflow-hidden rounded-[8px] bg-[linear-gradient(125deg,#182653_0%,#173a79_54%,#0f766e_100%)] px-3 py-3 text-white">
        <span className="inline-flex border border-white/35 px-2 py-1 text-[0.36rem] font-black tracking-[0.18em] text-white/90">
          LEARNING DASHBOARD
        </span>
        <p className="mt-2 whitespace-nowrap text-[0.86rem] font-black leading-tight">こんにちは、山田太郎さん</p>
        <p className="mt-1.5 text-[0.46rem] leading-relaxed text-white/82">復習で定着、演習で得点。着実に積み上げよう。</p>
        <div className="mt-2.5 grid grid-cols-3 gap-1.5">
          {["1日連続", "合格 2", "はじめのいっぽ"].map((label) => (
            <span key={label} className="border border-white/30 py-1.5 text-center text-[0.34rem] font-bold leading-none text-white/90">
              {label}
            </span>
          ))}
        </div>
      </section>

      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-[0.36rem] font-black uppercase tracking-[0.18em] text-[#1d4ed8]">Next Actions</p>
          <p className="text-[0.84rem] font-black leading-tight text-[#123657]">今日の学習</p>
        </div>
        <span className="rounded-full bg-white px-2 py-1 text-[0.34rem] font-black leading-none text-[#1d4ed8] ring-1 ring-[#d8e1eb]">
          提出 → 自己採点 → 返却
        </span>
      </div>

      <div className="mt-2 grid gap-1.5">
        <ActionTile label="課題" caption="未提出" value="2" tone="blue" />
        <ActionTile label="自己採点" caption="即確認" value="2" tone="green" />
        <ActionTile label="返却" caption="添削" value="0" tone="rose" />
      </div>

      <section className="mt-3 rounded-[9px] border border-[#d8e1eb] bg-white p-2.5">
        <div className="mb-2 flex items-center gap-1.5">
          <p className="text-[0.62rem] font-black leading-none text-[#123657]">教材別の現在地</p>
          <span className="grid h-4 w-4 place-items-center bg-[#123657] text-[0.42rem] font-black leading-none text-white">2</span>
        </div>
        {[
          ["数学", "数学IA標準", "採点待ち: 数と式 B-1", "合格 2 / 全90　採点待ち 1", "blue"],
          ["物理", "物理入門演習", "採点待ち: 演習2 すれ違いと出会いの時刻", "合格 0 / 全89　採点待ち 1", "green"],
        ].map(([subject, title, range, meta, tone]) => (
          <div key={title} className={`mb-1.5 grid grid-cols-[2.35rem_1fr_auto] gap-2 rounded-[7px] border border-[#d8e1eb] border-l-[3px] ${tone === "blue" ? "border-l-[#25a8df]" : "border-l-[#10a37f]"} bg-white p-2 last:mb-0`}>
            <div className="h-10 rounded-[4px] bg-[linear-gradient(180deg,#f8fafc_0%,#d7f2ef_100%)] ring-1 ring-[#d8e1eb]" />
            <div className="min-w-0">
              <p className="text-[0.36rem] font-bold leading-none text-[#607289]">{subject}</p>
              <p className="mt-1 truncate text-[0.54rem] font-black leading-none text-[#123657]">{title}</p>
              <p className="mt-1 truncate text-[0.36rem] font-bold leading-none text-[#607289]">{range}</p>
              <div className="mt-1.5 h-1.5 rounded-full bg-[#e7eef6]">
                <div className={`h-full rounded-full ${tone === "blue" ? "w-[38%] bg-[#25a8df]" : "w-[16%] bg-[#10a37f]"}`} />
              </div>
              <p className="mt-1 text-[0.32rem] font-bold leading-none text-[#607289]">{meta}</p>
            </div>
            <span className="h-fit rounded-full border border-[#fde68a] bg-[#fff7ed] px-1.5 py-0.5 text-[0.32rem] font-black leading-none text-[#d97706]">
              採点待ち
            </span>
          </div>
        ))}
      </section>
    </MobileShell>
  );
}

function ScreenSubmitMobile() {
  return (
    <MobileShell active="課題">
      <section className="rounded-[9px] border border-[#d8e1eb] border-l-[3px] border-l-[#25a8df] bg-white p-3">
        <div className="grid grid-cols-[3.1rem_1fr] gap-2.5">
          <div className="h-[4.3rem] rounded-[5px] bg-[linear-gradient(180deg,#f8fafc_0%,#d7f2ef_100%)] shadow-[0_8px_18px_-14px_rgba(11,29,74,0.5)] ring-1 ring-[#d8e1eb]" />
          <div className="min-w-0">
            <div className="flex flex-wrap gap-1.5">
              <StatusBadge>今回の教材</StatusBadge>
              <StatusBadge tone="blue">未提出</StatusBadge>
            </div>
            <h3 className="mt-2 truncate text-[0.98rem] font-black leading-tight tracking-[-0.01em] text-[#123657]">数学IA標準</h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["数学", "数と式 B-1", "4回目"].map((label) => (
                <span key={label} className="rounded-full bg-[#f2f6fa] px-2 py-1 text-[0.38rem] font-black leading-none text-[#607289]">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-[1.65rem_1fr_auto] items-center gap-2 rounded-[8px] border border-[#d8e1eb] bg-[#fbfdff] p-2">
          <span className="grid h-7 w-7 place-items-center rounded-[6px] bg-[#e0f2fe] text-[0.34rem] font-black leading-none text-[#0284c7]">
            PDF
          </span>
          <div className="min-w-0">
            <p className="truncate text-[0.54rem] font-black leading-none text-[#123657]">数と式 B-1.pdf</p>
            <p className="mt-1 text-[0.34rem] font-bold leading-none text-[#607289]">問題PDF</p>
          </div>
          <div className="flex gap-1">
            <span className="rounded-[6px] border border-[#d8e1eb] bg-white px-1.5 py-1 text-[0.34rem] font-black leading-none text-[#40536b]">開く</span>
            <span className="rounded-[6px] border border-[#d8e1eb] bg-white px-1.5 py-1 text-[0.34rem] font-black leading-none text-[#40536b]">保存</span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-[1fr_1.12fr] gap-2">
          <div className="grid min-h-[5.25rem] content-center gap-2 rounded-[8px] border border-[#9bd4ef] bg-[#eaf7fd] p-3">
            <span className="grid h-8 w-8 place-items-center rounded-[7px] bg-[#25a8df] text-white" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3z" />
                <path d="M13.5 8.5l2 2" />
              </svg>
            </span>
            <p className="text-[0.66rem] font-black leading-none text-[#123657]">画面で解く</p>
          </div>
          <div className="rounded-[8px] border border-[#d8e1eb] bg-white p-2">
            <div className="flex items-center justify-between gap-1">
              <p className="text-[0.52rem] font-black leading-none text-[#123657]">答案を提出</p>
              <span className="rounded-full bg-[#f2f6fa] px-1.5 py-1 text-[0.3rem] font-black leading-none text-[#607289]">
                最大3件
              </span>
            </div>
            <div className="mt-2 rounded-[7px] border border-dashed border-[#9bd4ef] bg-[#f8fbff] p-2 text-center">
              <p className="text-[0.46rem] font-black leading-tight text-[#123657]">答案ファイルを選ぶ</p>
              <p className="mt-1 text-[0.32rem] font-bold leading-tight text-[#607289]">PDF・写真・GoodNotes</p>
            </div>
          </div>
        </div>
      </section>
    </MobileShell>
  );
}

function ScreenReturnedMobile() {
  return (
    <MobileShell active="返却">
      <h3 className="text-[1rem] font-black leading-tight tracking-[-0.01em] text-[#123657]">返却</h3>
      <p className="mt-1.5 text-[0.48rem] font-bold leading-relaxed text-[#607289]">先生の採点コメント、添削PDF、再提出の指示だけを確認します。</p>
      <div className="mt-3 flex items-center gap-2">
        <p className="text-[0.72rem] font-black text-[#123657]">確認済み</p>
        <span className="grid h-6 w-6 place-items-center rounded-[6px] bg-[#25a8df] text-[0.62rem] font-black leading-none text-white">2</span>
      </div>

      <div className="mt-3 grid gap-2">
        {["数と式 A-2", "数と式 A-1"].map((range) => (
          <section key={range} className="rounded-[9px] border border-[#d8e1eb] bg-white p-3">
            <div className="flex items-center gap-2.5">
              <div className="grid h-11 w-9 shrink-0 place-items-center rounded-[5px] bg-[linear-gradient(180deg,#f8fafc,#d6f5ef)] text-center text-[0.36rem] font-black leading-tight text-[#123657] ring-1 ring-[#d8e1eb]">
                数学<br />IA
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.66rem] font-black leading-tight text-[#123657]">数学IA標準 <StatusBadge tone="purple">完了</StatusBadge></p>
                <p className="mt-1 text-[0.46rem] font-bold leading-none text-[#607289]">数学 ・ {range}</p>
              </div>
            </div>
          </section>
        ))}
      </div>
    </MobileShell>
  );
}

function MetricCard({ title, value, sub, tone }: { title: string; value: string; sub: string; tone: "green" | "blue" | "orange" | "rose" }) {
  const colors = {
    green: "text-[#059669]",
    blue: "text-[#25a8df]",
    orange: "text-[#ea580c]",
    rose: "text-[#db2777]",
  } as const;

  return (
    <div className="rounded-[8px] border border-[#d8e1eb] bg-white px-2.5 py-2.5">
      <p className="text-[0.42rem] font-black leading-none text-[#607289]">{title}</p>
      <p className={`mt-1 text-[0.96rem] font-black leading-none ${colors[tone]}`}>{value}</p>
      <p className="mt-1 truncate text-[0.34rem] font-bold leading-none text-[#8aa0b8]">{sub}</p>
    </div>
  );
}

function ScreenHistoryMobile() {
  return (
    <MobileShell active="ダッシュボード">
      <h3 className="text-[1rem] font-black leading-tight tracking-[-0.01em] text-[#123657]">学習レポート</h3>
      <p className="mt-1 text-[0.46rem] font-bold leading-none text-[#607289]">あなたの成績 ・ 高3です。</p>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <MetricCard title="合格率" value="67%" sub="2/3 課題" tone="green" />
        <MetricCard title="平均点" value="75%" sub="得点率の平均" tone="blue" />
        <MetricCard title="合格数" value="2" sub="はじめのいっぽ" tone="orange" />
        <MetricCard title="連続学習" value="0" sub="日" tone="rose" />
      </div>

      <section className="mt-3 rounded-[9px] border border-[#d8e1eb] bg-white p-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[0.62rem] font-black leading-none text-[#123657]">教科別の成績</p>
            <p className="mt-2 text-[0.5rem] font-black leading-none text-[#123657]">数学</p>
          </div>
          <p className="text-[0.46rem] font-bold leading-none text-[#607289]">合格 2/3 ・ 平均 75%</p>
          <p className="text-[0.7rem] font-black leading-none text-[#123657]">67%</p>
        </div>
        <div className="mt-2 h-2 rounded-full bg-[#e7eef6]">
          <div className="h-full w-[67%] rounded-full bg-[#25a8df]" />
        </div>
      </section>

      <section className="mt-3 rounded-[9px] border border-[#d8e1eb] bg-white p-3">
        <p className="text-[0.62rem] font-black leading-none text-[#123657]">採点・返却の履歴</p>
        <ul className="mt-2 grid gap-2">
          {[
            ["不合格", "数と式 A-3", "1.00"],
            ["合格", "数と式 A-2", "4.00"],
            ["合格", "数と式 A-1", "4.00"],
          ].map(([status, title, score]) => (
            <li key={title} className="grid grid-cols-[2.8rem_1fr_auto] items-center gap-2 border-t border-[#e5e7eb] pt-2 text-[0.43rem]">
              <span className={`font-black leading-none ${status === "合格" ? "text-[#059669]" : "text-[#e11d48]"}`}>{status}</span>
              <span className="truncate font-bold leading-none text-[#123657]">数学IA標準（{title}）</span>
              <span className="font-black leading-none text-[#123657]">{score}</span>
            </li>
          ))}
        </ul>
      </section>
    </MobileShell>
  );
}

const mobileBodies: Partial<Record<AppScreenVariant, () => React.JSX.Element>> = {
  home: ScreenHomeMobile,
  submit: ScreenSubmitMobile,
  returned: ScreenReturnedMobile,
  history: ScreenHistoryMobile,
};

const phoneSizes = {
  sm: {
    root: "w-[218px]",
    padding: "p-2",
    radius: "rounded-[2rem]",
    screenRadius: "rounded-[1.45rem]",
    viewport: "h-[392px]",
    notch: "top-1.5 h-3 w-14",
    sizes: "218px",
  },
  md: {
    root: "w-[270px]",
    padding: "p-2.5",
    radius: "rounded-[2.35rem]",
    screenRadius: "rounded-[1.75rem]",
    viewport: "h-[486px]",
    notch: "top-2 h-3.5 w-16",
    sizes: "270px",
  },
} as const;

/** 実アプリの1画面を電話フレームで表示。 */
export function AppScreen({
  variant,
  className = "",
  size = "md",
}: {
  variant: AppScreenVariant;
  className?: string;
  size?: keyof typeof phoneSizes;
}) {
  const screen = appScreenImages[variant];
  const frame = phoneSizes[size];
  const Body = mobileBodies[variant];

  return (
    <div className={`relative ${frame.root} shrink-0 ${className}`}>
      <div
        className={`${frame.radius} ${frame.padding} bg-[#0b1d4a] shadow-[0_50px_80px_-42px_rgba(11,29,74,0.75)] ring-1 ring-white/10`}
      >
        <div className={`relative ${frame.viewport} ${frame.screenRadius} overflow-hidden bg-[#f3f6f9]`}>
          <div
            className={`pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 rounded-full bg-[#0b1d4a] ${frame.notch}`}
          />
          {Body ? (
            <Body />
          ) : (
            <div className={`relative ${screen.imageClassName ?? "w-full"}`} style={{ aspectRatio: `${screen.width} / ${screen.height}` }}>
              <Image
                src={screen.src}
                alt={screen.alt}
                width={screen.width}
                height={screen.height}
                sizes={frame.sizes}
                className="block h-auto w-full"
                priority={variant === "home"}
              />
              {screen.overlays?.map((overlay) => (
                <span key={overlay.text} className={`absolute ${overlay.className}`}>
                  {overlay.text}
                </span>
              ))}
            </div>
          )}
          {!Body && screen.footer ? (
            <section className="mx-3 mt-3 rounded-[14px] bg-white/96 p-3 shadow-[0_16px_34px_-28px_rgba(11,29,74,0.65)] ring-1 ring-[#d8e1eb]">
              <p className="text-[0.42rem] font-black uppercase tracking-[0.18em] text-[#1d4ed8]">{screen.footer.eyebrow}</p>
              <p className="mt-1 text-[0.82rem] font-extrabold leading-tight text-[#123657]">{screen.footer.title}</p>
              <div className="mt-2 grid grid-cols-3 gap-1.5">
                {screen.footer.items.map((item) => (
                  <div key={`${item.label}-${item.value}`} className={`rounded-[8px] border px-1.5 py-2 text-center ${footerToneStyles[item.tone]}`}>
                    <p className="truncate text-[0.42rem] font-extrabold leading-none">{item.label}</p>
                    <p className="mt-1 text-[0.72rem] font-black leading-none">{item.value}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
