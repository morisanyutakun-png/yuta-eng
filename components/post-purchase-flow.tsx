import { AppScreen } from "@/components/app-screens";
import { PrimaryCta, SecondaryCta } from "@/components/cta";
import { cn } from "@/lib/utils";

type FlowVariant = "lp" | "apply";
type VisualKind = "credentials" | "login" | "home" | "submit";

const flowSteps: Array<{
  n: string;
  title: string;
  body: string;
  visual: VisualKind;
}> = [
  {
    n: "01",
    title: "ログイン情報を発行",
    body: "決済完了後、生徒用のログインIDとPINを表示。同じ内容は申し込みメールにも届きます。",
    visual: "credentials",
  },
  {
    n: "02",
    title: "アプリにログイン",
    body: "発行されたIDとPINで、生徒専用の学習画面へ。購入者メールとは別に管理されます。",
    visual: "login",
  },
  {
    n: "03",
    title: "教材が自動で届く",
    body: "選んだ教材がホームに反映。先生の手配を待たず、最初の範囲へ進めます。",
    visual: "home",
  },
  {
    n: "04",
    title: "PDFで実施・提出",
    body: "PDFに取り組んで提出。解答解説が開き、同時に次の範囲が追加されます。",
    visual: "submit",
  },
];

const flowLabels = ["決済完了", "ログイン情報", "ログイン", "教材自動割り当て", "PDF提出"];

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.3 4.3L19 7" />
    </svg>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

function MiniPhone({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative mx-auto w-[210px] shrink-0", className)}>
      <div className="rounded-[2rem] bg-[#0b1d4a] p-2 shadow-[0_34px_56px_-36px_rgba(11,29,74,0.75)] ring-1 ring-white/10">
        <div className="relative h-[378px] overflow-hidden rounded-[1.45rem] bg-[#f4f8fc]">
          <div className="pointer-events-none absolute left-1/2 top-2 z-20 h-3 w-14 -translate-x-1/2 rounded-full bg-[#0b1d4a]" />
          {children}
        </div>
      </div>
    </div>
  );
}

function MiniHeader() {
  return (
    <header className="border-b-2 border-[#25a8df] bg-white px-3.5 pb-3 pt-7">
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
          className="h-5 w-auto"
        />
      </picture>
    </header>
  );
}

function CredentialsScreen() {
  return (
    <MiniPhone>
      <MiniHeader />
      <main className="px-3.5 py-4">
        <div className="rounded-[18px] bg-white p-4 shadow-[0_20px_36px_-28px_rgba(15,29,74,0.65)] ring-1 ring-[#d8e1eb]">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ecfdf5] px-2.5 py-1 text-[0.58rem] font-extrabold text-[#0f766e]">
            <CheckIcon className="h-3 w-3" />
            決済完了
          </span>
          <p className="mt-3 text-[0.95rem] font-extrabold leading-snug text-[#123657]">
            ログイン情報が
            <br />
            発行されました
          </p>
          <p className="mt-2 text-[0.58rem] leading-relaxed text-[#607289]">
            画面を閉じる前に、IDとPINを保存してください。
          </p>
          <dl className="mt-4 grid gap-2">
            <div className="rounded-[12px] bg-[#f3f6f9] p-3 ring-1 ring-[#e4ebf2]">
              <dt className="text-[0.52rem] font-extrabold text-[#607289]">ログインID</dt>
              <dd className="mt-1 font-mono text-[0.92rem] font-black tracking-[0.06em] text-[#0b1d4a]">NBT-482913</dd>
            </div>
            <div className="rounded-[12px] bg-[#fff7ed] p-3 ring-1 ring-[#fed7aa]">
              <dt className="text-[0.52rem] font-extrabold text-[#9a3412]">PIN</dt>
              <dd className="mt-1 font-mono text-[1.15rem] font-black tracking-[0.16em] text-[#ea580c]">7394</dd>
            </div>
          </dl>
        </div>
        <div className="mt-3 rounded-[14px] bg-[#eef6f6] px-3 py-2.5 text-[0.56rem] font-bold leading-relaxed text-[#0f5e5e] ring-1 ring-[#cdece7]">
          同じ内容をメールにも送信済みです。
        </div>
      </main>
    </MiniPhone>
  );
}

function LoginScreen() {
  return (
    <MiniPhone>
      <MiniHeader />
      <main className="px-3.5 py-4">
        <p className="text-[1.05rem] font-extrabold text-[#123657]">ログイン</p>
        <p className="mt-1.5 text-[0.58rem] leading-relaxed text-[#607289]">
          発行されたIDとPINで、生徒専用の画面に入ります。
        </p>
        <div className="mt-4 grid gap-3 rounded-[18px] bg-white p-4 ring-1 ring-[#d8e1eb]">
          <label className="grid gap-1.5">
            <span className="text-[0.56rem] font-extrabold text-[#607289]">ログインID</span>
            <span className="rounded-[10px] border border-[#d8e1eb] bg-[#f8fbfd] px-3 py-2 font-mono text-[0.72rem] font-black tracking-[0.04em] text-[#0b1d4a]">
              NBT-482913
            </span>
          </label>
          <label className="grid gap-1.5">
            <span className="text-[0.56rem] font-extrabold text-[#607289]">PIN</span>
            <span className="rounded-[10px] border border-[#d8e1eb] bg-[#f8fbfd] px-3 py-2 font-mono text-[0.72rem] font-black tracking-[0.24em] text-[#0b1d4a]">
              7394
            </span>
          </label>
          <button className="mt-1 min-h-10 rounded-[10px] bg-[#25a8df] px-3 text-[0.72rem] font-extrabold text-white">
            学習画面へ
          </button>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {["メールから確認", "保存して入力"].map((label) => (
            <span key={label} className="rounded-[10px] bg-white px-2 py-2 text-center text-[0.5rem] font-extrabold text-[#607289] ring-1 ring-[#d8e1eb]">
              {label}
            </span>
          ))}
        </div>
      </main>
    </MiniPhone>
  );
}

function AppScreenClip({ variant }: { variant: "home" | "submit" }) {
  return (
    <div className="relative mx-auto h-[408px] w-[230px] overflow-hidden">
      <AppScreen variant={variant} className="origin-top scale-[0.85]" />
    </div>
  );
}

function FlowVisual({ kind }: { kind: VisualKind }) {
  if (kind === "credentials") return <CredentialsScreen />;
  if (kind === "login") return <LoginScreen />;
  if (kind === "home") return <AppScreenClip variant="home" />;
  return <AppScreenClip variant="submit" />;
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
  const isLp = variant === "lp";
  const shouldShowCta = showCta ?? isLp;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#f8fbfd_0%,#ffffff_55%,#eef6f6_100%)] p-5 ring-1 ring-[rgba(15,29,74,0.08)] sm:p-7 lg:p-9",
        isLp && "shadow-[0_34px_80px_-58px_rgba(15,29,74,0.65)]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,29,74,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,29,74,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 78% 70% at 76% 35%, #000 18%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse 78% 70% at 76% 35%, #000 18%, transparent 78%)",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#25a8df]/10 blur-2xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[#f97316]/10 blur-2xl" />

      <div className="relative">
        <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-10">
          <div>
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#0f766e]">
              After purchase
            </p>
            <h2 className="mt-3 text-[1.55rem] font-extrabold leading-[1.35] tracking-[-0.005em] text-[#0b1d4a] sm:text-[2rem]">
              購入後も、最初の一問まで迷わない。
            </h2>
            <p className="mt-3 max-w-xl text-[0.94rem] leading-[1.9] text-[#475569]">
              決済完了からログイン情報の発行、購入教材の自動割り当て、PDFでの実施・提出まで。生徒がすぐ学習に入れる流れを画面に沿って案内します。
            </p>
          </div>

          <ol className="flex flex-wrap items-center gap-2 lg:justify-end">
            {flowLabels.map((label, i) => (
              <li key={label} className="flex items-center gap-2">
                <span className="inline-flex min-h-8 items-center rounded-full bg-white px-3 text-[0.72rem] font-extrabold text-[#0b1d4a] shadow-[0_10px_22px_-18px_rgba(15,29,74,0.55)] ring-1 ring-[rgba(15,29,74,0.08)]">
                  {label}
                </span>
                {i < flowLabels.length - 1 ? <ArrowIcon className="hidden h-4 w-4 text-[#0f766e] sm:block" /> : null}
              </li>
            ))}
          </ol>
        </div>

        <div className="-mx-5 mt-8 flex snap-x gap-4 overflow-x-auto px-5 pb-5 sm:-mx-7 sm:px-7 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0">
          {flowSteps.map((step) => (
            <article
              key={step.n}
              className="min-w-[17rem] snap-center rounded-[22px] bg-white p-4 shadow-[0_24px_56px_-42px_rgba(15,29,74,0.62)] ring-1 ring-[rgba(15,29,74,0.08)] lg:min-w-0"
            >
              <div className="relative flex h-[26.5rem] items-start justify-center overflow-hidden rounded-[18px] bg-[#eef6f8] pt-4 ring-1 ring-[rgba(15,29,74,0.06)]">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-2 text-[4.8rem] font-black leading-none tracking-[-0.08em] text-[#0b1d4a]/[0.045]"
                >
                  {step.n}
                </span>
                <FlowVisual kind={step.visual} />
              </div>
              <div className="mt-4">
                <p className="flex items-center gap-2 text-[0.72rem] font-extrabold tracking-[0.14em] text-[#0f766e]">
                  STEP {step.n}
                  {step.n === "01" ? (
                    <span className="rounded-full bg-[#fff7ed] px-2 py-0.5 text-[0.62rem] tracking-normal text-[#ea580c]">
                      メールにも届く
                    </span>
                  ) : null}
                </p>
                <h3 className="mt-2 text-[1.02rem] font-extrabold leading-[1.45] text-[#0b1d4a]">{step.title}</h3>
                <p className="mt-1.5 text-[0.8rem] leading-[1.75] text-[#64748b]">{step.body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-7 grid gap-4 border-t border-dashed border-[rgba(15,29,74,0.12)] pt-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {["ログイン情報を画面とメールで確認", "教材は購入内容から自動反映", "返却待ちで学習が止まらない", "提出後に次の範囲へ進む"].map((item) => (
              <li key={item} className="flex items-start gap-2 text-[0.78rem] font-semibold leading-[1.65] text-[#475569]">
                <span aria-hidden="true" className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#0d9488] text-white">
                  <CheckIcon className="h-2.5 w-2.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          {shouldShowCta ? (
            <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
              <PrimaryCta href="/apply">教材を選んではじめる</PrimaryCta>
              <SecondaryCta href="/app">アプリ画面を見る</SecondaryCta>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
