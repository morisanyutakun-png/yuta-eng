import Link from "next/link";

export function PrimaryCta({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group/cta relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-7 text-[0.98rem] font-bold tracking-[0.01em] text-white shadow-[0_18px_38px_-14px_rgba(234,88,12,0.7)] transition hover:-translate-y-px hover:shadow-[0_22px_44px_-14px_rgba(234,88,12,0.8)]"
    >
      <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,#f97316_0%,#ea580c_100%)]" />
      <span
        aria-hidden="true"
        className="absolute -inset-x-1 -inset-y-1 -translate-x-full bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.5)_50%,transparent_70%)] transition duration-700 group-hover/cta:translate-x-full"
      />
      <span className="relative">{children}</span>
    </Link>
  );
}

export function SecondaryCta({
  href,
  children,
  tone = "light",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  const styles =
    tone === "dark"
      ? "border-white/45 text-white hover:bg-white hover:text-[#0b1d4a]"
      : "border-[#0b1d4a] text-[#0b1d4a] hover:bg-[#0b1d4a] hover:text-white";
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full border px-7 text-[0.98rem] font-semibold tracking-[0.01em] transition ${styles}`}
    >
      {children}
    </Link>
  );
}

/**
 * ページ下部の申込・料金への誘導ブロック（詳細ページ共通）。
 * 申込直前の最後のひと押し。実在するオファー（初月半額・入会金/教材費0円・いつでも解約）だけで
 * 安心材料を添え、濃紺のカードで最後にもう一度アクションへ視線を集める。
 */
export function PageCtaRow({ title, note }: { title?: string; note?: string }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#0b1d4a_0%,#0f3b5a_55%,#0f5e5e_100%)] px-6 py-11 text-center shadow-[0_40px_80px_-44px_rgba(11,29,74,0.7)] sm:px-10 sm:py-12">
      {/* 有機的な光の装飾（overflow-hidden 内でにじませる） */}
      <span aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(94,234,212,0.28),transparent)] blur-2xl" />
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-12 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(129,140,248,0.26),transparent)] blur-2xl" />

      <div className="relative mx-auto max-w-xl">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-[#f97316] px-3.5 py-1 text-[0.72rem] font-bold tracking-[0.04em] text-white shadow-[0_10px_24px_-10px_rgba(234,88,12,0.8)]">
          <span aria-hidden="true">🎁</span>いま始めると初月半額
        </p>
        <h2 className="mt-4 text-[1.55rem] font-extrabold leading-[1.35] tracking-[-0.01em] text-white sm:text-[1.95rem]">
          {title ?? "続く仕組みを、今日から。"}
        </h2>
        {note ? <p className="mt-3 text-[0.95rem] leading-[1.85] text-white/85">{note}</p> : null}

        <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
          <PrimaryCta href="/apply">料金を見て申し込む（初月半額）</PrimaryCta>
          <SecondaryCta href="/apply#pricing" tone="dark">
            料金・科目を見る
          </SecondaryCta>
        </div>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {["入会金・教材費0円", "初月半額", "いつでも解約OK"].map((t) => (
            <li key={t} className="flex items-center gap-1.5 text-[0.82rem] font-semibold text-white/90">
              <span aria-hidden="true" className="grid h-4 w-4 place-items-center rounded-full bg-[#5eead4] text-[#0b1d4a]">
                <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.3 4.3L19 7" /></svg>
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
