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

export function SecondaryCta({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#0b1d4a] px-7 text-[0.98rem] font-semibold tracking-[0.01em] text-[#0b1d4a] transition hover:bg-[#0b1d4a] hover:text-white"
    >
      {children}
    </Link>
  );
}

/** ページ下部の申込・料金への誘導ブロック（詳細ページ共通）。 */
export function PageCtaRow({ note }: { note?: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      {note ? <p className="text-center text-[0.92rem] font-semibold text-[#475569]">{note}</p> : null}
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <PrimaryCta href="/apply">料金を見て申し込む（初月半額）</PrimaryCta>
        <SecondaryCta href="/apply#pricing">料金・科目を見る</SecondaryCta>
      </div>
    </div>
  );
}
