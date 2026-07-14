import Image from "next/image";

const screenAssetVersion = "20260711b";

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
    lead: "購入した科目に対応する教材がダッシュボードに届きます。画面上部では、いま最初にやることだけを強調します。",
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
    lead: "提出後は自己採点しながら次へ進み、先生の添削返却は返却タブに届きます。合格済み・再提出が必要なものを分けて確認できます。",
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
    width: 404,
    height: 526,
    alt: "ログインIDとPINを入力するログイン画面",
    imageClassName: "w-full",
  },
  home: {
    src: `/app-screens/dashboard.png?v=${screenAssetVersion}`,
    width: 860,
    height: 1640,
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
    width: 423,
    height: 379,
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
    width: 724,
    height: 634,
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

function MaterialCover({
  kind = "math",
  className = "",
}: {
  kind?: "math" | "physics";
  className?: string;
}) {
  const cover =
    kind === "math"
      ? {
          src: "/books/B0H6ZRPLVJ.webp",
          alt: "ノビットの数学IA標準演習の教材表紙",
          width: 355,
          height: 500,
        }
      : {
          src: "/books/B0H4J34162.webp",
          alt: "物理入門演習の教材表紙",
          width: 320,
          height: 451,
        };

  return (
    <span className={`relative block shrink-0 overflow-hidden rounded-[5px] bg-white shadow-[0_5px_14px_-12px_rgba(15,29,74,0.6)] ring-1 ring-[#cbd7e4] ${className}`}>
      <Image
        src={cover.src}
        alt={cover.alt}
        width={cover.width}
        height={cover.height}
        sizes="42px"
        className="h-full w-full object-cover"
      />
    </span>
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
      <header className="border-b border-[#25a8df] bg-white px-3 pt-4">
        <LogoMark className="h-3.5 w-auto" />
        <div className="mt-1.5 flex min-w-0 items-center gap-1.5">
          <span className="shrink-0 text-[0.52rem] font-black leading-none">デモ生徒</span>
          <span className="shrink-0 border border-[#d8e1eb] bg-[#f7f9fc] px-1.5 py-0.5 text-[0.34rem] font-extrabold leading-none text-[#607289]">
            デモ画面
          </span>
          <span className="ml-auto shrink-0 border border-[#d8e1eb] bg-white px-1.5 py-0.5 text-[0.34rem] font-extrabold leading-none text-[#40536b]">
            ログアウト
          </span>
        </div>
        <nav aria-label="アプリ画面タブ" className="mt-1.5 grid grid-cols-4 text-center text-[0.39rem] font-black">
          {(["ダッシュボード", "課題", "自己採点", "返却"] as const).map((tab) => (
            <span
              key={tab}
              className={`relative pb-1.5 leading-none ${active === tab ? "text-[#25a8df]" : "text-[#607289]"}`}
            >
              {tab}
              {tab === "課題" || tab === "自己採点" ? (
                <span className="ml-0.5 inline-grid h-3 w-3 place-items-center rounded-full bg-[#ef4444] align-middle text-[0.32rem] leading-none text-white">
                  2
                </span>
              ) : null}
              {active === tab ? <span aria-hidden="true" className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#25a8df]" /> : null}
            </span>
          ))}
        </nav>
      </header>
      <main className="h-[calc(100%-4.65rem)] overflow-hidden px-2.5 py-2.5">{children}</main>
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

function TileGlyph({ kind }: { kind: "tasks" | "self" | "returned" }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (kind === "self") {
    return (
      <svg viewBox="0 0 24 24" className="h-[0.62rem] w-[0.62rem]" aria-hidden="true">
        <path {...common} fill="currentColor" stroke="none" d="M12 3.4l2.5 5.1 5.6.8-4.05 3.95.96 5.6L12 16.3 6.98 18.85l.96-5.6L3.9 9.3l5.6-.8z" />
      </svg>
    );
  }
  if (kind === "returned") {
    return (
      <svg viewBox="0 0 24 24" className="h-[0.62rem] w-[0.62rem]" aria-hidden="true">
        <path {...common} d="M3.5 8.5a8 8 0 1 1-1 5" />
        <path {...common} d="M3 4v4.5h4.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-[0.62rem] w-[0.62rem]" aria-hidden="true">
      <path {...common} d="M5 12.5l4.2 4.2L19 7" />
    </svg>
  );
}

function ActionTile({
  label,
  caption,
  value,
  cta,
  tone,
  kind,
}: {
  label: string;
  caption: string;
  value: string;
  cta: string;
  tone: "blue" | "green" | "rose";
  kind: "tasks" | "self" | "returned";
}) {
  const styles = {
    blue: { accent: "#1d8bd1", chip: "bg-[#e7f3fb] text-[#0d6ba6]" },
    green: { accent: "#0f9e74", chip: "bg-[#e3f6ee] text-[#0a7d5a]" },
    rose: { accent: "#be123c", chip: "bg-[#fce7ec] text-[#a30f34]" },
  } as const;
  const s = styles[tone];

  return (
    <div
      className="flex min-h-[1.72rem] items-center gap-1 rounded-[8px] border border-[#dbe4ee] bg-white py-0.5 pl-1 pr-1 shadow-[0_1px_2px_rgba(18,54,87,0.06)]"
      style={{ borderLeft: `3px solid ${s.accent}` }}
    >
      <span className="grid h-4.5 w-4.5 shrink-0 place-items-center rounded-[5px] text-white" style={{ background: s.accent }}>
        <TileGlyph kind={kind} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[0.44rem] font-black leading-tight text-[#123657]">{label}</span>
        <span className="block truncate text-[0.28rem] font-bold leading-none text-[#8194a8]">{caption}</span>
      </span>
      <span className={`grid h-[0.88rem] min-w-[0.88rem] shrink-0 place-items-center rounded-[5px] px-1 text-[0.5rem] font-black leading-none tabular-nums ${s.chip}`}>
        {value}
      </span>
      <span
        className="inline-flex shrink-0 items-center gap-0.5 rounded-[6px] py-0.5 pl-1.5 pr-1 text-[0.32rem] font-black leading-none text-white"
        style={{ background: s.accent }}
      >
        {cta}
        <svg viewBox="0 0 24 24" className="h-[0.5rem] w-[0.5rem]" aria-hidden="true">
          <path fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </div>
  );
}

function ScreenHomeMobile() {
  return (
    <MobileShell active="ダッシュボード">
      <section className="relative overflow-hidden rounded-[9px] bg-[linear-gradient(125deg,#172653_0%,#16417f_56%,#0f766e_100%)] px-2.5 py-2 text-white shadow-[0_12px_28px_-22px_rgba(11,29,74,0.8)]">
        <span aria-hidden="true" className="absolute -right-8 -top-12 h-28 w-28 rounded-full border border-white/10" />
        <div className="relative flex items-start justify-between gap-2">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-1.5 py-0.5 text-[0.32rem] font-black tracking-[0.12em] text-[#99f6e4]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2dd4bf]" />
              TODAY FOCUS
            </span>
            <p className="mt-1 text-[0.64rem] font-black leading-snug">
              未提出の課題が <span className="text-[#facc15]">2件</span> あります
            </p>
            <p className="mt-0.5 text-[0.36rem] font-bold leading-tight text-white/76">まずは答案を保存して提出へ。</p>
          </div>
          <div className="shrink-0 rounded-[8px] border border-white/15 bg-white/10 px-2 py-1.5 text-center">
            <p className="text-[0.32rem] font-black leading-none text-white/65">合格</p>
            <p className="mt-1 text-[0.76rem] font-black leading-none text-white">2</p>
          </div>
        </div>
        <div className="relative mt-1.5 inline-flex w-full items-center justify-center gap-1 rounded-[8px] bg-white px-2 py-1 text-[0.46rem] font-black leading-none text-[#123657]">
          今日の課題に取り組む
          <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" aria-hidden="true">
            <path fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </section>

      <div className="mt-2 flex items-end justify-between gap-2">
        <div>
          <p className="text-[0.36rem] font-black uppercase tracking-[0.18em] text-[#1d4ed8]">Next Actions</p>
          <p className="text-[0.72rem] font-black leading-tight text-[#123657]">今日の学習</p>
        </div>
        <span className="rounded-full bg-white px-2 py-1 text-[0.31rem] font-black leading-none text-[#0f766e] ring-1 ring-[#d8e1eb]">
          提出 → 自己採点 → 返却
        </span>
      </div>

      <div className="mt-1.5 grid gap-1">
        <ActionTile label="課題" caption="未提出" value="2" cta="取り組む" tone="blue" kind="tasks" />
        <ActionTile label="自己採点" caption="即確認" value="2" cta="答え合わせ" tone="green" kind="self" />
        <ActionTile label="返却" caption="添削" value="0" cta="確認" tone="rose" kind="returned" />
      </div>

      <section className="mt-1.5 rounded-[9px] border border-[#d8e1eb] bg-white p-1.5">
        <div className="mb-1.5 flex items-center gap-1.5">
          <p className="text-[0.54rem] font-black leading-none text-[#123657]">教材別の現在地</p>
          <span className="grid h-3.5 w-3.5 place-items-center bg-[#123657] text-[0.36rem] font-black leading-none text-white">2</span>
        </div>
        {[
          { subject: "数学", title: "数学IA標準", range: "数と式 B-1", meta: "合格 2 / 全90　採点待ち 1", tone: "blue", cover: "math" },
          { subject: "物理", title: "物理入門演習", range: "演習2 すれ違いと出会いの時刻", meta: "合格 0 / 全89　採点待ち 1", tone: "green", cover: "physics" },
        ].map((item) => (
          <div key={item.title} className={`mb-1 grid grid-cols-[1.55rem_1fr_auto] gap-1.5 rounded-[7px] border border-[#d8e1eb] border-l-[3px] ${item.tone === "blue" ? "border-l-[#25a8df]" : "border-l-[#10a37f]"} bg-white p-1 last:mb-0`}>
            <MaterialCover kind={item.cover as "math" | "physics"} className="h-8 w-[1.38rem]" />
            <div className="min-w-0">
              <p className="text-[0.31rem] font-bold leading-none text-[#607289]">{item.subject}</p>
              <p className="mt-0.5 truncate text-[0.46rem] font-black leading-none text-[#123657]">{item.title}</p>
              <p className="mt-0.5 truncate text-[0.31rem] font-bold leading-none text-[#607289]">採点待ち: {item.range}</p>
              <div className="mt-0.5 h-1 rounded-full bg-[#e7eef6]">
                <div className={`h-full rounded-full ${item.tone === "blue" ? "w-[38%] bg-[#25a8df]" : "w-[16%] bg-[#10a37f]"}`} />
              </div>
              <p className="mt-0.5 text-[0.28rem] font-bold leading-none text-[#607289]">{item.meta}</p>
            </div>
            <span className="h-fit rounded-full border border-[#fde68a] bg-[#fff7ed] px-1 py-0.5 text-[0.28rem] font-black leading-none text-[#d97706]">
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
          <MaterialCover className="h-[4.3rem] w-[3.05rem]" />
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
              <MaterialCover className="h-11 w-8" />
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
