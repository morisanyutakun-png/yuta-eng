import { PrimaryCta, SecondaryCta } from "@/components/cta";
import { AppScreen, type AppScreenVariant } from "@/components/app-screens";
import { cn } from "@/lib/utils";

type FlowVariant = "lp" | "apply";
type VisualKind = AppScreenVariant;

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
    title: "ダッシュボードに購入教材が自動で届く",
    body: (
      <>
        ログインすると、購入した科目に対応する教材が
        <strong className="font-extrabold">今日の学習</strong>と
        <strong className="font-extrabold">教材別の現在地</strong>に表示されます。先生が手動で配るのを待たず、すぐ最初の範囲へ進めます。
      </>
    ),
    bullets: [
      "例：数学IAの購入で、数学IA標準が自動割り当て。",
      "教材表紙と範囲名で、どの本を進めているか分かります。",
      "未提出・自己採点・返却がボタンとして分かれ、次の行動がすぐ分かります。",
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
      "「画面で解く」から、タッチペン・指で直接記入し、PDFとして保存。",
      "保存したPDF、GoodNotesのPDF、紙に解いた答案写真を最大3件まで添付できます。",
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
    title: "合格状況がレポートに残る",
    body: "取り組みはダッシュボードの学習レポートとして残ります。いま何が合格済みで、どこに戻るべきかを数値で振り返れます。",
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

function StepVisual({ kind }: { kind: VisualKind }) {
  return (
    <figure className="mx-auto w-[13.7rem] shrink-0 text-center lg:mx-0">
      <AppScreen variant={kind} size="sm" className="mx-auto" />
      <figcaption className="mt-3 text-[0.78rem] leading-none text-[#8b98aa] sm:mt-4">
        実際のアプリ画面
      </figcaption>
    </figure>
  );
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
              購入後も、提出・自己採点・返却まで迷わない。
            </h2>
          </div>
          <p className="shrink-0 text-[0.95rem] font-extrabold tracking-[0.06em] text-white/95">
            ノビットスタディ｜中高部
          </p>
        </div>
        <p className="mt-4 max-w-5xl font-serif text-[0.95rem] leading-[2] text-white/90 sm:text-[1.03rem]">
          決済完了 → ログイン情報の発行 → 購入教材の自動割り当て → PDFで実施 → 提出後すぐ自己採点 → 返却確認へ。生徒が次の一問へ進むまでを、実際の画面に沿って案内します。
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
          {["返却待ちで止まらない", "PDF・写真は最大3件", "再提出も見える", "完了PDFを受け取れる"].map((label) => (
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
