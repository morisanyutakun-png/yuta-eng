import { PrimaryCta, SecondaryCta } from "@/components/cta";
import { cn } from "@/lib/utils";

type FlowVariant = "lp" | "apply";
type VisualKind = "account" | "login" | "home" | "submit" | "returned" | "history";

const steps: Array<{
  no: string;
  title: string;
  body: React.ReactNode;
  bullets: string[];
  visual: VisualKind;
}> = [
  {
    no: "1",
    title: "決済完了後、ログイン情報が発行される",
    body: (
      <>
        決済が完了すると、アカウント発行画面に進みます。ここで生徒用の
        <strong className="font-extrabold">ログインID</strong>と<strong className="font-extrabold">PIN</strong>
        が表示され、同じ内容がメールでも届きます。
      </>
    ),
    bullets: [
      "購入後の戻り先で、そのままログイン情報を確認。",
      "ログインIDとPINは、メモまたはスクリーンショットで保存できます。",
      "同じ決済を開き直しても、二重発行されないよう冪等に処理します。",
    ],
    visual: "account",
  },
  {
    no: "2",
    title: "ログインする",
    body: "発行されたログインIDとPINを入力して、生徒専用の学習画面に入ります。メールから開いても、保存した情報から入力しても同じです。",
    bullets: [
      "生徒はログインIDとPINだけで開始できます。",
      "購入者メールとは別に、生徒ごとの学習アカウントとして管理されます。",
      "ログイン後は、購入した教材が自動でホームに表示されます。",
    ],
    visual: "login",
  },
  {
    no: "3",
    title: "購入教材が自動で割り当たる",
    body: (
      <>
        ログインすると、購入した科目に対応する教材が
        <strong className="font-extrabold">今日の課題</strong>と
        <strong className="font-extrabold">教材の進み具合</strong>に表示されます。先生が手動で配るのを待たず、すぐ最初の範囲へ進めます。
      </>
    ),
    bullets: [
      "例：physics の購入で、物理標準演習が自動割り当て。",
      "「次：演習1」のように、今どこを解くかが見えます。",
      "合格数・採点待ち・再提出ありも、教材別に追えます。",
    ],
    visual: "home",
  },
  {
    no: "4",
    title: "PDFに取り組んで提出する",
    body: (
      <>
        課題を開くと、<strong className="font-extrabold">問題PDF</strong>と実施範囲が表示されます。
        アプリ内で直接書いても、GoodNotesなど別アプリで書いたPDFを添付しても提出できます。
      </>
    ),
    bullets: [
      "問題PDFを開いて確認。必要なら保存して紙で解いてもOK。",
      "「一画面で書き込んで解く」から、タッチペン・指で直接記入。",
      "GoodNotesなどで書き込んだPDFや、紙に解いた答案写真も添付できます。",
      "提出すると、解答解説PDFが見られるようになり、同時に次の範囲が追加されます。",
    ],
    visual: "submit",
  },
  {
    no: "5",
    title: "返却・再提出も「並行」して進む",
    body: "提出後は自己採点しながら次へ進み、先生の添削返却は返却タブに届きます。やり直しが必要なものもここで確認できます。",
    bullets: [
      "採点待ち、先生から返却、再提出が必要を分けて表示。",
      "不合格や再テストは再提出として戻り、同じ範囲をもう一度実施。",
      "先生のコメントや添削済みPDFを見ながら、次の範囲と復習を並行できます。",
    ],
    visual: "returned",
  },
  {
    no: "6",
    title: "合格状況が「記録」される",
    body: "取り組みは成績としてすべて残ります。いま何が合格済みで、どこに戻るべきかを数値で振り返れます。",
    bullets: [
      "合格率・平均点・合格数・連続学習をひと目で確認。",
      "教科別の成績と「採点・返却の履歴」（合否・点数・コメント・日付）を一覧。",
      "全範囲が返却済みかつ合格になると教材終了。一冊分PDFも受け取れます。",
    ],
    visual: "history",
  },
];

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12.5l4.2 4.2L20 5.5" />
    </svg>
  );
}

function LogoMark({ className = "h-4 w-auto" }: { className?: string }) {
  return (
    <picture>
      <source type="image/avif" srcSet="/brand/nobit-logo-480.avif" />
      <source type="image/webp" srcSet="/brand/nobit-logo-480.webp" />
      <img
        src="/brand/nobit-logo-480.webp"
        alt="ノビットスタディ"
        width={1970}
        height={375}
        loading="lazy"
        decoding="async"
        className={className}
      />
    </picture>
  );
}

function ScreenshotFrame({
  children,
  caption = "実際のアプリ画面",
}: {
  children: React.ReactNode;
  caption?: string;
}) {
  return (
    <figure className="mx-auto w-[11.4rem] shrink-0 text-center sm:w-[14rem] lg:mx-0">
      <div className="grid h-[14.8rem] place-items-center overflow-hidden bg-[#eef2f6] p-3 ring-1 ring-[#d8e1eb] sm:h-[17.2rem] sm:p-4">
        <div className="h-full w-[9.25rem] overflow-hidden bg-white shadow-[0_18px_30px_-24px_rgba(15,29,74,0.5)] ring-1 ring-[#d8e1eb] sm:w-[10.8rem]">
          {children}
        </div>
      </div>
      <figcaption className="mt-3 text-[0.78rem] leading-none text-[#8b98aa] sm:mt-4">{caption}</figcaption>
    </figure>
  );
}

function AccountVisual() {
  return (
    <ScreenshotFrame>
      <div className="px-4 py-5 text-center">
        <LogoMark className="mx-auto h-4 w-auto" />
        <p className="mt-4 text-[0.66rem] font-extrabold text-[#0f172a]">アカウント発行</p>
        <p className="mx-auto mt-3 max-w-[8.5rem] text-[0.44rem] leading-relaxed text-[#64748b]">
          決済が完了しました。以下の情報でログインできます。
        </p>
        <div className="mt-4 rounded-[6px] bg-[#f8fafc] p-3 text-left ring-1 ring-[#d8e1eb]">
          <p className="text-[0.42rem] font-bold text-[#64748b]">ログインID</p>
          <p className="mt-1 font-mono text-[0.7rem] font-black tracking-[0.04em] text-[#0b1d4a]">st1234</p>
          <p className="mt-2 text-[0.42rem] font-bold text-[#64748b]">パスワード（PIN）</p>
          <p className="mt-1 font-mono text-[0.7rem] font-black tracking-[0.08em] text-[#0b1d4a]">2468</p>
        </div>
        <div className="mt-3 grid min-h-7 place-items-center bg-[#25a8df] text-[0.48rem] font-extrabold text-white">
          ログインする
        </div>
        <p className="mt-3 text-[0.38rem] leading-relaxed text-[#8b98aa]">
          ログインIDとパスワード（PIN）はメールでも送信されています。
        </p>
      </div>
    </ScreenshotFrame>
  );
}

function LoginVisual() {
  return (
    <ScreenshotFrame>
      <div className="px-4 py-5 text-center">
        <LogoMark className="mx-auto h-4 w-auto" />
        <p className="mt-5 text-[0.68rem] font-extrabold text-[#0f172a]">ログイン</p>
        <div className="mt-4 grid gap-2 text-left">
          <label className="grid gap-1">
            <span className="text-[0.4rem] font-bold text-[#64748b]">ログインID</span>
            <span className="min-h-6 border border-[#d8e1eb] bg-white px-2 py-1 font-mono text-[0.48rem] font-bold text-[#0b1d4a]">st1234</span>
          </label>
          <label className="grid gap-1">
            <span className="text-[0.4rem] font-bold text-[#64748b]">パスワード（PIN）</span>
            <span className="min-h-6 border border-[#d8e1eb] bg-white px-2 py-1 font-mono text-[0.48rem] font-bold tracking-[0.16em] text-[#0b1d4a]">••••</span>
          </label>
        </div>
        <div className="mt-3 grid min-h-7 place-items-center bg-[#25a8df] text-[0.48rem] font-extrabold text-white">
          ログイン
        </div>
        <p className="mt-4 text-[0.36rem] leading-relaxed text-[#8b98aa]">
          ログイン情報がわからないときは、登録メールをご確認ください。
        </p>
        <p className="mt-4 text-[0.34rem] text-[#94a3b8]">© 2026 Nobit Study</p>
      </div>
    </ScreenshotFrame>
  );
}

function AppHeader({ active = "課題" }: { active?: "課題" | "返却" | "成績" }) {
  return (
    <header className="border-b border-[#25a8df] bg-white px-2.5 pt-2">
      <LogoMark className="h-3.5 w-auto" />
      <div className="mt-3 flex items-center gap-1.5">
        <span className="text-[0.5rem] font-extrabold text-[#123657]">山田太郎</span>
        <span className="border border-[#d8e1eb] px-1.5 py-0.5 text-[0.34rem] font-bold text-[#607289]">生徒・中高部</span>
        <span className="border border-[#d8e1eb] px-1.5 py-0.5 text-[0.34rem] font-bold text-[#40536b]">ログアウト</span>
      </div>
      <nav className="mt-2 flex gap-4 text-[0.48rem] font-extrabold text-[#607289]">
        {(["課題", "返却", "成績"] as const).map((item) => (
          <span key={item} className={cn("relative pb-1.5", active === item && "text-[#25a8df]")}>
            {item}
            {item === "返却" ? (
              <span className="ml-1 inline-grid h-3.5 w-3.5 place-items-center rounded-full bg-[#ef4444] align-middle text-[0.34rem] text-white">1</span>
            ) : null}
            {active === item ? <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#25a8df]" /> : null}
          </span>
        ))}
      </nav>
    </header>
  );
}

function HomeVisual() {
  return (
    <ScreenshotFrame>
      <AppHeader active="課題" />
      <main className="bg-[#f3f6f9] px-2.5 py-2.5">
        <section className="bg-[#182957] px-3 py-3 text-white">
          <p className="text-[0.58rem] font-extrabold leading-tight">こんにちは、山田太郎さん</p>
          <p className="mt-1 text-[0.38rem] leading-relaxed text-white/80">目標から逆算して、今日の一歩を踏み出そう。</p>
          <div className="mt-2 grid grid-cols-3 gap-1">
            {["0日連続", "合格 2", "はじめの一歩"].map((label) => (
              <span key={label} className="border border-white/30 py-1 text-center text-[0.32rem] font-bold text-white/90">{label}</span>
            ))}
          </div>
        </section>
        <section className="mt-2 border border-[#d8e1eb] bg-white p-2.5">
          <p className="text-[0.42rem] font-extrabold text-[#25a8df]">今日の課題</p>
          <p className="mt-1 text-[0.62rem] font-extrabold text-[#123657]">数学IA標準</p>
          <p className="mt-1 text-[0.38rem] text-[#607289]">数学・数と式 A-3</p>
          <div className="mt-2 grid min-h-7 place-items-center bg-[#25a8df] text-[0.42rem] font-extrabold text-white">取り組む →</div>
        </section>
        <section className="mt-2 border border-[#d8e1eb] bg-white p-2.5">
          <p className="text-[0.5rem] font-extrabold text-[#123657]">教材の進み具合</p>
          <div className="mt-2 rounded bg-[#eef6f6] p-2">
            <p className="text-[0.42rem] font-bold text-[#123657]">数学IA標準</p>
            <p className="mt-1 text-[0.34rem] text-[#607289]">合格 2/100 ・ 次：数学A-4</p>
          </div>
        </section>
      </main>
    </ScreenshotFrame>
  );
}

function SubmitVisual() {
  return (
    <ScreenshotFrame>
      <AppHeader active="課題" />
      <main className="bg-[#f3f6f9] px-2.5 py-2.5">
        <button className="border border-[#d8e1eb] bg-white px-2 py-1 text-[0.38rem] font-bold text-[#40536b]">← 課題一覧へ</button>
        <p className="mt-2 text-[0.58rem] font-extrabold text-[#123657]">物理標準演習 <span className="border border-[#d8e1eb] px-1 text-[0.34rem] text-[#607289]">未提出</span></p>
        <p className="mt-1 text-[0.34rem] text-[#607289]">山田太郎・物理・範囲 波と式 B-1・4回目</p>
        <section className="mt-2 border border-[#d8e1eb] bg-white p-2.5">
          <p className="text-[0.48rem] font-extrabold text-[#123657]">課題</p>
          <div className="mt-2 grid grid-cols-[1fr_auto_auto] gap-1 border border-[#e4ebf2] bg-[#f8fbfd] p-2">
            <span className="truncate text-[0.4rem] font-bold text-[#123657]">問題PDF</span>
            <span className="border border-[#d8e1eb] bg-white px-1 text-[0.34rem]">開く</span>
            <span className="border border-[#d8e1eb] bg-white px-1 text-[0.34rem]">保存</span>
          </div>
        </section>
        <section className="mt-2 border border-[#d8e1eb] bg-white p-2.5">
          <p className="text-[0.48rem] font-extrabold text-[#123657]">この課題を解く</p>
          <div className="mt-2 grid min-h-7 place-items-center bg-[#25a8df] text-[0.38rem] font-extrabold text-white">一画面で書き込んで解く</div>
          <div className="mt-3 border border-dashed border-[#bae6fd] bg-[#f0f9ff] p-3 text-center text-[0.36rem] font-bold text-[#0284c7]">
            PDF・写真を添付して提出
          </div>
        </section>
      </main>
    </ScreenshotFrame>
  );
}

function ReturnedVisual() {
  return (
    <ScreenshotFrame>
      <AppHeader active="返却" />
      <main className="bg-[#f3f6f9] px-2.5 py-2.5">
        <h4 className="text-[0.62rem] font-extrabold text-[#123657]">返却・答え合わせ</h4>
        <p className="mt-1 text-[0.36rem] leading-relaxed text-[#607289]">提出した課題の自己採点と、先生からの返却をここで確認します。</p>
        <p className="mt-3 text-[0.54rem] font-extrabold text-[#123657]">再提出が必要 <span className="bg-[#25a8df] px-2 py-1 text-white">1</span></p>
        <section className="mt-2 border border-[#d8e1eb] bg-white p-2.5">
          <div className="flex gap-2">
            <span className="grid h-8 w-8 shrink-0 place-items-center bg-[#25a8df] text-[0.5rem] font-bold text-white">数</span>
            <div>
              <p className="text-[0.48rem] font-extrabold text-[#123657]">数学IA標準</p>
              <span className="mt-1 inline-block border border-[#fecdd3] bg-[#fff1f2] px-1.5 py-0.5 text-[0.32rem] font-bold text-[#e11d48]">再提出依頼</span>
              <p className="mt-2 text-[0.34rem] text-[#607289]">数学・数と式 A-3</p>
            </div>
          </div>
          <div className="mt-3 grid min-h-7 place-items-center bg-[#25a8df] text-[0.42rem] font-extrabold text-white">再提出する</div>
        </section>
      </main>
    </ScreenshotFrame>
  );
}

function HistoryVisual() {
  return (
    <ScreenshotFrame>
      <AppHeader active="成績" />
      <main className="bg-[#f3f6f9] px-2.5 py-2.5">
        <h4 className="text-[0.62rem] font-extrabold text-[#123657]">成績</h4>
        <p className="mt-1 text-[0.36rem] text-[#607289]">あなたの成績・高3です。</p>
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          {[
            ["合格率", "67%", "2/3課題"],
            ["平均点", "75%", "得点率の平均"],
            ["合格数", "2", "はじめの一歩"],
            ["連続学習", "0", "日"],
          ].map(([title, value, sub]) => (
            <div key={title} className="rounded border border-[#d8e1eb] bg-white p-2">
              <p className="text-[0.34rem] font-bold text-[#607289]">{title}</p>
              <p className="mt-1 text-[0.72rem] font-extrabold text-[#059669]">{value}</p>
              <p className="text-[0.3rem] text-[#8aa0b8]">{sub}</p>
            </div>
          ))}
        </div>
        <section className="mt-2 border border-[#d8e1eb] bg-white p-2.5">
          <p className="text-[0.46rem] font-extrabold text-[#123657]">教科別の成績</p>
          <div className="mt-2 flex justify-between text-[0.38rem] text-[#607289]">
            <span>数学</span>
            <span>合格 2/3・平均75%</span>
          </div>
          <div className="mt-2 h-1.5 bg-[#e7eef6]"><div className="h-full w-[67%] bg-[#25a8df]" /></div>
        </section>
        <section className="mt-2 border border-[#d8e1eb] bg-white p-2.5">
          <p className="text-[0.46rem] font-extrabold text-[#123657]">得点率の推移</p>
          <svg viewBox="0 0 120 42" className="mt-2 h-12 w-full bg-[#e9f6fb]" aria-hidden>
            <path d="M8 16 L60 16 L112 32" fill="none" stroke="#25a8df" strokeWidth="2" />
          </svg>
        </section>
      </main>
    </ScreenshotFrame>
  );
}

function StepVisual({ kind }: { kind: VisualKind }) {
  if (kind === "account") return <AccountVisual />;
  if (kind === "login") return <LoginVisual />;
  if (kind === "home") return <HomeVisual />;
  if (kind === "submit") return <SubmitVisual />;
  if (kind === "returned") return <ReturnedVisual />;
  return <HistoryVisual />;
}

export function PostPurchaseFlow({
  variant = "lp",
  className = "",
  showCta,
}: {
  variant?: FlowVariant;
  className?: string;
  showCta?: boolean;
}) {
  const shouldShowCta = showCta ?? variant === "lp";

  return (
    <div className={cn("mx-auto max-w-6xl", className)}>
      <div className="bg-[linear-gradient(115deg,#071328_0%,#12326f_62%,#1f3f95_100%)] px-6 py-8 text-white sm:px-10 sm:py-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-[0.86rem] font-extrabold text-[#facc15]">アプリの実画面で見る</p>
            <h2 className="mt-2 text-[1.7rem] font-extrabold leading-[1.32] tracking-[-0.01em] sm:text-[2.35rem]">
              購入後も、決済完了から学習開始まで迷わない。
            </h2>
          </div>
          <p className="shrink-0 text-[0.95rem] font-extrabold tracking-[0.06em] text-white/95">
            ノビットスタディ｜高校部
          </p>
        </div>
        <p className="mt-4 max-w-5xl font-serif text-[0.95rem] leading-[2] text-white/90 sm:text-[1.03rem]">
          決済完了 → ログイン情報の発行 → ログイン → 購入教材の自動割り当て → PDFで実施・提出へ。生徒が最初の一問に入るまでを、実際の画面に沿って案内します。
        </p>
      </div>

      <ol className="mt-8 grid gap-7">
        {steps.map((step) => (
          <li
            key={step.no}
            className="grid gap-6 rounded-[18px] border border-[#d8e1eb] bg-white px-5 py-6 shadow-[0_18px_44px_-38px_rgba(15,29,74,0.45)] sm:px-8 lg:grid-cols-[14rem_1fr] lg:gap-10 lg:px-9"
          >
            <StepVisual kind={step.visual} />
            <div className="min-w-0 self-center">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="inline-flex min-h-7 items-center bg-[#1f3f95] px-3 text-[0.9rem] font-extrabold tracking-[0.04em] text-white">
                  STEP {step.no}
                </span>
                <h3 className="text-[1.25rem] font-extrabold leading-[1.45] tracking-[-0.005em] text-[#0f172a] sm:text-[1.45rem]">
                  {step.title}
                </h3>
              </div>
              <p className="mt-4 font-serif text-[1rem] leading-[1.95] text-[#334155] sm:text-[1.08rem]">
                {step.body}
              </p>
              <ul className="mt-3 grid gap-1.5">
                {step.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 font-serif text-[0.96rem] leading-[1.8] text-[#0f172a] sm:text-[1.04rem]">
                    <CheckIcon className="mt-[0.28em] h-5 w-5 shrink-0 text-[#1f3f95]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-[16px] bg-[linear-gradient(115deg,#071328_0%,#12326f_64%,#1f3f95_100%)] px-6 py-7 text-white sm:px-10">
        <h3 className="text-[1.35rem] font-extrabold leading-[1.5] sm:text-[1.65rem]">
          この6画面で、購入直後から学習の習慣化までつながる。
        </h3>
        <p className="mt-3 font-serif text-[0.95rem] leading-[1.9] text-white/88">
          購入後に迷わずログインでき、購入教材が自動で届き、提出後はすぐ解答解説で振り返って次へ進めます。返却・再提出は別タブで追えるので、生徒も先生も自分のタイミングで学習と添削を進められます。
        </p>
        <ul className="mt-5 flex flex-wrap gap-3">
          {["返却待ちで止まらない", "PDF添付OK", "再提出も見える", "完了PDFを受け取れる"].map((label) => (
            <li key={label} className="rounded-full border border-white/70 px-4 py-1.5 text-[0.82rem] font-extrabold text-white">
              {label}
            </li>
          ))}
        </ul>
      </div>

      {shouldShowCta ? (
        <div className="mt-8 rounded-[18px] bg-[linear-gradient(115deg,#1f3f95_0%,#071328_100%)] px-6 py-8 text-center text-white sm:px-10">
          <h3 className="text-[1.5rem] font-extrabold leading-[1.5] sm:text-[1.9rem]">
            「出す → 振り返る → 次へ進む」を、今日から。
          </h3>
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <PrimaryCta href="/apply">教材を選んではじめる</PrimaryCta>
            <SecondaryCta href="/app" tone="dark">アプリ画面を見る</SecondaryCta>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function FlowSeal({ className = "" }: { className?: string }) {
  const spikes = 18;
  const pts: string[] = [];
  for (let i = 0; i < spikes * 2; i += 1) {
    const r = i % 2 === 0 ? 49 : 39;
    const a = (Math.PI / spikes) * i - Math.PI / 2;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`);
  }

  return (
    <div aria-hidden="true" className={cn("relative", className)}>
      <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_14px_24px_rgba(124,25,0,0.32)]">
        <polygon points={pts.join(" ")} fill="#f97316" />
        <circle cx="50" cy="50" r="34" fill="none" stroke="#ffedd5" strokeWidth="1.4" strokeDasharray="2 3" />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center leading-none text-white">
          <p className="text-[0.52rem] font-extrabold tracking-[0.12em]">決済後</p>
          <p className="mt-0.5 text-[0.95rem] font-black">すぐ発行</p>
          <p className="mt-0.5 text-[0.48rem] font-black tracking-[0.08em]">ID/PIN</p>
        </div>
      </div>
    </div>
  );
}

function FlowMiniSteps() {
  const miniSteps = ["決済完了", "ID/PIN発行", "教材が届く", "最初の一問へ"];

  return (
    <ol className="grid gap-2">
      {miniSteps.map((label, index) => (
        <li key={label} className="flex items-center gap-3 rounded-[14px] bg-white/86 px-3.5 py-3 shadow-[0_12px_24px_-20px_rgba(15,29,74,0.45)] ring-1 ring-white/80">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#0b1d4a] text-[0.72rem] font-black text-white">
            {index + 1}
          </span>
          <span className="text-[0.9rem] font-extrabold text-[#0b1d4a]">{label}</span>
        </li>
      ))}
    </ol>
  );
}

export function PostPurchaseTeaser({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "warm";
}) {
  const warm = tone === "warm";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[26px] border border-[rgba(15,29,74,0.08)] px-5 py-7 shadow-[0_28px_70px_-46px_rgba(15,29,74,0.55)] sm:px-8 sm:py-9",
        warm
          ? "bg-[linear-gradient(135deg,#fff7ed_0%,#ffffff_44%,#eff6ff_100%)]"
          : "bg-[linear-gradient(135deg,#eef6ff_0%,#ffffff_48%,#ecfdf5_100%)]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.42]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,29,74,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(15,29,74,0.07) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 72% 74% at 20% 18%, #000 16%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(ellipse 72% 74% at 20% 18%, #000 16%, transparent 72%)",
        }}
      />
      <FlowSeal className="absolute -right-4 -top-5 h-24 w-24 rotate-12 sm:-right-3 sm:-top-4 sm:h-28 sm:w-28" />

      <div className="relative grid items-center gap-7 lg:grid-cols-[1fr_18rem] lg:gap-10">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/82 px-3.5 py-1.5 text-[0.72rem] font-extrabold tracking-[0.08em] text-[#ea580c] shadow-[0_8px_20px_-14px_rgba(234,88,12,0.55)] ring-1 ring-[rgba(234,88,12,0.18)]">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#f97316]" />
            購入後の流れ
          </p>
          <h2 className="mt-4 max-w-2xl text-balance text-[1.75rem] font-extrabold leading-[1.28] tracking-[-0.01em] text-[#0b1d4a] sm:text-[2.25rem]">
            購入後も、最初の一問まで迷わない。
          </h2>
          <p className="mt-4 max-w-2xl text-[0.98rem] leading-[1.9] text-[#334155]">
            決済完了後はログイン情報を発行し、購入教材をアプリへ自動で反映。
            PDFでの実施・提出まで、生徒がすぐ学習に入れる流れを画面に沿って確認できます。
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {["メールにも届く", "教材自動割り当て", "PDF提出まで案内"].map((label) => (
              <li key={label} className="rounded-full bg-white px-3 py-1.5 text-[0.78rem] font-extrabold text-[#0f766e] ring-1 ring-[rgba(13,148,136,0.16)]">
                {label}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <PrimaryCta href="/after-purchase">購入後の流れを見る</PrimaryCta>
            <SecondaryCta href="/apply#pricing">料金・教材を確認</SecondaryCta>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[18rem]">
          <div className="absolute -left-3 top-4 h-16 w-16 rounded-full bg-[#38bdf8]/18 blur-2xl" />
          <div className="relative rounded-[22px] bg-[#0b1d4a] p-3 shadow-[0_32px_58px_-34px_rgba(11,29,74,0.65)]">
            <FlowMiniSteps />
          </div>
        </div>
      </div>
    </div>
  );
}
