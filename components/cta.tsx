import Link from "next/link";

import { Blob } from "@/components/decor";
import {
  CAMPAIGN_DEADLINE_LABEL,
  CAMPAIGN_DEADLINE_SHORT_LABEL,
  currentSinglePrice,
  formatYen,
  isCampaignActive,
  MATERIAL_PRICE,
  PACK_UNIT_PRICE,
} from "@/lib/pricing";

export function PrimaryCta({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group/cta relative inline-flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full px-5 text-center text-[0.94rem] font-bold leading-snug tracking-[0] text-white shadow-[0_18px_38px_-14px_rgba(234,88,12,0.7)] transition hover:-translate-y-px hover:shadow-[0_22px_44px_-14px_rgba(234,88,12,0.8)] sm:w-auto sm:px-7 sm:text-[0.98rem] sm:tracking-[0.01em]"
    >
      <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,#f97316_0%,#ea580c_100%)]" />
      <span
        aria-hidden="true"
        className="absolute -inset-x-1 -inset-y-1 -translate-x-full bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.5)_50%,transparent_70%)] transition duration-700 group-hover/cta:translate-x-full"
      />
      <span className="relative min-w-0">{children}</span>
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
      className={`inline-flex min-h-12 w-full items-center justify-center rounded-full border px-5 text-center text-[0.94rem] font-semibold leading-snug tracking-[0] transition sm:w-auto sm:px-7 sm:text-[0.98rem] sm:tracking-[0.01em] ${styles}`}
    >
      {children}
    </Link>
  );
}

function CtaCheck({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.3 4.3L19 7" />
    </svg>
  );
}

/** 「開講記念 パック割」のギザギザ封緘シール（申込直前の値ごろ感を一点に集める）。 */
function CampaignSeal({ className = "" }: { className?: string }) {
  const spikes = 16;
  const pts: string[] = [];
  for (let i = 0; i < spikes * 2; i += 1) {
    const r = i % 2 === 0 ? 49 : 39;
    const a = (Math.PI / spikes) * i - Math.PI / 2;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`);
  }
  return (
    <div aria-hidden="true" className={`relative ${className}`}>
      <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_10px_18px_rgba(124,25,0,0.4)]">
        <polygon points={pts.join(" ")} fill="#f97316" />
        <circle cx="50" cy="50" r="34" fill="none" stroke="#ffe8d1" strokeWidth="1.4" strokeDasharray="2 3" />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center leading-none text-white">
          <p className="text-[0.5rem] font-extrabold tracking-[0.12em]">開講記念</p>
          <p className="mt-0.5 text-[0.98rem] font-black">価格</p>
          <p className="mt-0.5 text-[0.48rem] font-black tracking-[0.03em]">{CAMPAIGN_DEADLINE_SHORT_LABEL}まで</p>
        </div>
      </div>
    </div>
  );
}

/**
 * ページ下部の申込・料金への誘導ブロック（詳細ページ共通）。
 * 申込直前の最後のひと押し。パンフレットの裏表紙のように、実在するオファー
 * （開講記念¥9,800・通常¥14,800・入会金/追加費用0円・自動更新なし）を封緘シールで見せ、
 * 濃紺×方眼テクスチャのカードで最後にアクションへ視線を集める。虚偽の実績は載せない。
 */
export function PageCtaRow({ title, note }: { title?: string; note?: string }) {
  const campaign = isCampaignActive();
  const single = currentSinglePrice(campaign);
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#0b1d4a_0%,#0f3b5a_55%,#0f5e5e_100%)] px-6 py-11 shadow-[0_44px_90px_-46px_rgba(11,29,74,0.75)] ring-1 ring-white/10 sm:px-11 sm:py-14">
      {/* 方眼ノートのテクスチャ（ブランドの演習モチーフ／左上に集めてにじませる） */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.6]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 75% 85% at 22% 12%, #000 18%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 85% at 22% 12%, #000 18%, transparent 72%)",
        }}
      />
      {/* 有機的なブロブと光の粒 */}
      <Blob fill="#5eead4" className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 opacity-[0.16]" />
      <Blob fill="#818cf8" className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 opacity-[0.16]" />
      <span aria-hidden="true" className="pointer-events-none absolute right-[14%] top-10 h-2 w-2 rounded-full bg-[#5eead4]/70" />
      <span aria-hidden="true" className="pointer-events-none absolute left-[10%] bottom-12 h-1.5 w-1.5 rounded-full bg-white/50" />

      <div className="relative grid items-center gap-9 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        {/* 左：メッセージ＋アクション */}
        <div className="text-center lg:text-left">
          <p className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-[#f97316] px-3 py-1 text-center text-[0.68rem] font-bold leading-snug tracking-[0] text-white shadow-[0_10px_24px_-10px_rgba(234,88,12,0.9)] sm:px-3.5 sm:text-[0.72rem] sm:tracking-[0.04em]">
            <span aria-hidden="true">🎁</span>
            {campaign ? (
              <>
                <span className="sm:hidden">{CAMPAIGN_DEADLINE_SHORT_LABEL}まで 開講記念価格</span>
                <span className="hidden sm:inline">{CAMPAIGN_DEADLINE_LABEL}まで 開講記念価格</span>
              </>
            ) : "教材は、修了までずっと自分のもの"}
          </p>
          <h2 className="mt-4 text-[1.55rem] font-extrabold leading-[1.32] tracking-[-0.01em] text-white sm:text-[2rem]">
            {title ?? "1冊を、最後までやり切る。"}
          </h2>
          {note ? <p className="mt-3 text-[0.95rem] leading-[1.85] text-white/85">{note}</p> : null}

          <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:flex-col lg:items-start">
            <PrimaryCta href="/apply">教材を買って、はじめる</PrimaryCta>
            <SecondaryCta href="/apply#pricing" tone="dark">
              料金・教材を見る
            </SecondaryCta>
          </div>
        </div>

        {/* 右：買い切り価格を封緘シールつきの白カードで見せる（パンフレットの値札） */}
        <div className="relative mx-auto w-full max-w-[19rem]">
          <CampaignSeal className="absolute -right-4 -top-6 z-10 h-[4.6rem] w-[4.6rem] rotate-[10deg]" />
          <div className="rounded-[22px] bg-white p-6 text-center shadow-[0_36px_70px_-34px_rgba(0,0,0,0.6)] ring-1 ring-white/70">
            <p className="text-[0.72rem] font-bold tracking-[0.08em] text-[#0f766e]">
              {campaign ? "開講記念価格・1教材 買い切り（税込）" : "1教材 買い切り（税込）"}
            </p>
            <div className="mt-2.5 flex items-baseline justify-center gap-1.5">
              {campaign ? (
                <span className="text-[1.05rem] font-bold text-[#94a3b8] line-through">{formatYen(MATERIAL_PRICE)}</span>
              ) : null}
              <span className="text-[2.55rem] font-black leading-none tracking-[-0.02em] text-[#0b1d4a]">{formatYen(single)}</span>
            </div>
            <p className="mt-1.5 text-[0.74rem] font-bold text-[#ea580c]">
              教材・解答解説・添削（約100回）・アプリ込み
            </p>
            {campaign ? (
              <p className="mt-1 text-[0.7rem] font-bold text-[#0f766e]">
                2教材パックは1教材 {formatYen(PACK_UNIT_PRICE)}・{CAMPAIGN_DEADLINE_SHORT_LABEL}まで
              </p>
            ) : null}
            <ul className="mt-4 grid gap-2 border-t border-dashed border-[rgba(15,29,74,0.18)] pt-4 text-left">
              {["入会金・追加費用 0円", "買い切り・自動更新なし", "提出ごとに講師の添削つき"].map((t) => (
                <li key={t} className="flex items-center gap-2 text-[0.82rem] font-semibold text-[#334155]">
                  <span aria-hidden="true" className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#0d9488] text-white">
                    <CtaCheck className="h-2.5 w-2.5" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
