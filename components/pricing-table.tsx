import Link from "next/link";

import {
  buyoutTotal,
  CAMPAIGN_DEADLINE_LABEL,
  CAMPAIGN_DEADLINE_SHORT_LABEL,
  formatYen,
  GRADING_COUNT,
  isCampaignActive,
  listTotal,
  MATERIAL_PRICE,
  packSavings,
  PACK_UNIT_PRICE,
  PACK_UNIT_SAVINGS,
  PER_DAY_PRICE,
  PROGRAM_DAYS,
  SUBJECTS,
} from "@/lib/pricing";

const campaign = isCampaignActive();

/** 教材ごとの買い切り（1〜3教材）。数値は lib/pricing から算出＝表と決済で一致。 */
const tiers = [1, 2, 3].map((n) => ({
  count: `${n}教材`,
  total: buyoutTotal(n, campaign),
  list: listTotal(n),
  per: Math.round(buyoutTotal(n, campaign) / n),
  savings: packSavings(n, campaign),
  popular: n === 2,
}));

function PenUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 18"
      fill="none"
      preserveAspectRatio="none"
      className={className}
    >
      <path
        d="M6 11C48 6.5 104 5.8 156 8C172 8.7 187 8.6 196 4.5"
        stroke="#f97316"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 15.5C66 13 128 13 182 14.2"
        stroke="#f97316"
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity="0.38"
      />
    </svg>
  );
}

/** 対応教材のチップ列。lib/pricing の SUBJECTS を単一ソースに描画。 */
export function SubjectChips({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      <span className="text-[0.74rem] font-bold text-[#64748b]">対応教材</span>
      {SUBJECTS.map((s) => (
        <span
          key={s.id}
          className="rounded-full bg-white px-3 py-1 text-[0.8rem] font-semibold text-[#0b1d4a] ring-1 ring-[rgba(15,29,74,0.08)]"
        >
          <span
            aria-hidden="true"
            className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle"
            style={{ background: s.color }}
          />
          {s.label}
        </span>
      ))}
    </div>
  );
}

/**
 * 料金表パネル（採点表ふう・方眼＋手書き注釈）。申込ページに掲載する。
 * 買い切り：1教材＝約100回分の課題＋添削。2教材以上は開講記念パック割。
 * cta を渡すとパネル内にボタンを出す（トップからは詳細を持たず、ここへ誘導）。
 */
export function PricingTable({
  cta,
}: {
  cta?: { href: string; label: string };
}) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_44px_90px_-55px_rgba(11,29,74,0.55)] ring-1 ring-[rgba(15,29,74,0.1)]">
        <div className="flex flex-col gap-1 bg-[linear-gradient(120deg,#0b1d4a_0%,#0f5e5e_100%)] px-5 py-4 text-white sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <p className="text-[0.98rem] font-extrabold tracking-wide">料金表</p>
          <p className="text-[0.74rem] text-white/80">教材ごとの買い切り・税込</p>
        </div>

        <div className="relative px-5 py-7 sm:px-8 sm:py-9">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(13,148,136,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(13,148,136,0.06) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          <div className="relative text-center">
            <p className="text-[0.82rem] font-bold text-[#0f766e]">1教材（約{PROGRAM_DAYS}日ぶん）をやり切る</p>
            <p className="mt-1 flex items-end justify-center gap-1.5 text-[#0b1d4a]">
              <span className="pb-2 text-[1.05rem] font-bold">1日たった</span>
              <span className="relative inline-block">
                <span className="text-[3.1rem] font-extrabold leading-none tracking-[-0.02em] sm:text-[3.6rem]">
                  {PER_DAY_PRICE}
                </span>
                <PenUnderline className="absolute -bottom-1 left-0 h-[0.5em] w-full" />
              </span>
              <span className="pb-2.5 text-[1.05rem] font-bold">円</span>
            </p>
            <p className="mt-2 text-[0.84rem] font-semibold text-[#0f766e]">約{PROGRAM_DAYS}日ぶん・毎回そのつど添削つき</p>
            <p className="mt-1 text-[0.8rem] leading-[1.65] text-[#64748b]">
              <span className="sm:hidden">
                買い切り <span className="font-bold text-[#0b1d4a]">{formatYen(MATERIAL_PRICE)}〜</span>。約{GRADING_COUNT}回分で1日{PER_DAY_PRICE}円。
              </span>
              <span className="hidden sm:inline">
                買い切り <span className="font-bold text-[#0b1d4a]">{formatYen(MATERIAL_PRICE)}〜</span>（税込・添削約{GRADING_COUNT}回＋習慣化アプリ込み）を約{GRADING_COUNT}回分でならすと1日{PER_DAY_PRICE}円。
              </span>
            </p>
            {campaign ? (
              <p className="mt-3.5 flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center rounded-[10px] bg-[#fff1e6] px-3 py-1 text-center text-[0.76rem] font-extrabold leading-snug text-[#ea580c] ring-1 ring-[rgba(234,88,12,0.25)] sm:-rotate-2 sm:text-[0.78rem]">
                  <span className="sm:hidden">{CAMPAIGN_DEADLINE_SHORT_LABEL}まで パック割</span>
                  <span className="hidden sm:inline">{CAMPAIGN_DEADLINE_LABEL}まで 2教材以上でパック割</span>
                </span>
                <span className="inline-flex items-center rounded-[10px] bg-[#0b1d4a] px-3 py-1 text-[0.76rem] font-extrabold text-white shadow-[0_10px_18px_-14px_rgba(11,29,74,0.8)] sm:rotate-1 sm:text-[0.78rem]">
                  1教材あたり {formatYen(PACK_UNIT_SAVINGS)} OFF
                </span>
              </p>
            ) : null}
          </div>

          <ul className="relative mt-7 space-y-2.5">
            {tiers.map((t) => (
              <li
                key={t.count}
                className={`relative flex items-center gap-3 rounded-[14px] px-3.5 py-3 sm:gap-4 sm:px-4 ${
                  t.popular
                    ? "bg-[#fff7ed] ring-1 ring-[rgba(234,88,12,0.35)]"
                    : "bg-[#f8fafc] ring-1 ring-[rgba(15,29,74,0.06)]"
                }`}
              >
                <span
                  className={`grid h-11 w-14 shrink-0 place-items-center rounded-[10px] text-[0.82rem] font-extrabold leading-tight ${
                    t.popular
                      ? "bg-[#f97316] text-white"
                      : "bg-white text-[#0b1d4a] ring-1 ring-[rgba(15,29,74,0.1)]"
                  }`}
                >
                  {t.count}
                </span>
                <span className="flex flex-1 items-baseline gap-1.5">
                  <span className="text-[1.7rem] font-extrabold leading-none tracking-[-0.02em] text-[#0b1d4a] sm:text-[2rem]">
                    {formatYen(t.total)}
                  </span>
                  {t.savings > 0 ? (
                    <span className="text-[0.76rem] font-semibold text-[#94a3b8] line-through">{formatYen(t.list)}</span>
                  ) : null}
                </span>
                <span className="text-right">
                  <span className="block text-[0.74rem] font-semibold text-[#0f766e]">
                    1教材 {formatYen(t.per)}
                  </span>
                  {t.savings > 0 ? (
                    <span className="block text-[0.72rem] font-bold text-[#ea580c]">{formatYen(t.savings)}おトク</span>
                  ) : (
                    <span className="block text-[0.72rem] text-[#94a3b8]">買い切り・追加費用なし</span>
                  )}
                </span>
                {t.popular ? (
                  <span className="absolute right-2 top-1 rounded-[8px] bg-[#0b1d4a] px-2.5 py-1 text-[0.62rem] font-extrabold tracking-[0.04em] text-white shadow-[0_8px_16px_-8px_rgba(11,29,74,0.8)] sm:-right-2 sm:-top-3 sm:-rotate-6">
                    {formatYen(t.savings)}おトク
                  </span>
                ) : null}
              </li>
            ))}

            <li className="flex items-center gap-3 rounded-[14px] border border-dashed border-[rgba(15,29,74,0.18)] bg-white/60 px-3.5 py-3 sm:gap-4 sm:px-4">
              <span className="grid h-11 w-14 shrink-0 place-items-center rounded-[10px] bg-white text-[0.8rem] font-extrabold text-[#475569] ring-1 ring-[rgba(15,29,74,0.1)]">
                4教材〜
              </span>
              <span className="flex-1 text-[0.84rem] leading-[1.6] text-[#475569]">
                {campaign ? (
                  <>
                    <span className="sm:hidden">パック割で <strong className="font-bold text-[#0b1d4a]">1教材 {formatYen(PACK_UNIT_PRICE)}</strong>。{CAMPAIGN_DEADLINE_SHORT_LABEL}まで。</span>
                    <span className="hidden sm:inline">パック割で <strong className="font-bold text-[#0b1d4a]">1教材 {formatYen(PACK_UNIT_PRICE)}</strong>（通常より1教材あたり{formatYen(PACK_UNIT_SAVINGS)}OFF・{CAMPAIGN_DEADLINE_LABEL}まで）</span>
                  </>
                ) : (
                  <>1教材 <strong className="font-bold text-[#0b1d4a]">{formatYen(MATERIAL_PRICE)}</strong> ×（必要な数だけ）</>
                )}
              </span>
            </li>
          </ul>

          {campaign ? (
            <p className="relative mt-4 text-center text-[0.82rem] font-semibold text-[#0f766e]">
              まとめて始めるほど、<span className="text-[#ea580c]">1教材あたり{formatYen(PACK_UNIT_SAVINGS)}おトク</span>になります。
            </p>
          ) : null}

          {cta ? (
            <div className="relative mt-6">
              <Link
                href={cta.href}
                className="group/cta relative flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full text-[0.98rem] font-bold text-white shadow-[0_18px_38px_-14px_rgba(234,88,12,0.7)] transition hover:-translate-y-px"
              >
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,#f97316_0%,#ea580c_100%)]" />
                <span className="relative">{cta.label}</span>
                <span aria-hidden="true" className="relative">→</span>
              </Link>
            </div>
          ) : null}

          <p className="relative mt-4 text-center text-[0.74rem] text-[#94a3b8]">
            入会金・追加費用0円／買い切り・自動更新なし。教材は修了まであなたのもの。
          </p>
        </div>
      </div>

      {/* 教材・完走の価値（塾比較ではなく、教材をやり切る仕組みを訴求） */}
      <div className="mt-8 flex flex-col items-center gap-3 rounded-[18px] bg-[#eef6f6] p-5 text-center ring-1 ring-[rgba(13,148,136,0.18)] sm:flex-row sm:justify-center sm:gap-6 sm:text-left">
        <p className="text-[0.86rem] leading-[1.7] text-[#475569]">
          問題集は独学だと、<span className="font-bold text-[#0b1d4a]">多くの人が途中で止まります</span>。
        </p>
        <span aria-hidden="true" className="hidden text-[#0d9488] sm:block">→</span>
        <p className="text-[0.95rem] font-extrabold leading-[1.5] text-[#0f766e]">
          提出ごとの添削と習慣化で、<span className="text-[1.05rem]">1冊を最後までやり切る</span>。
        </p>
      </div>
    </div>
  );
}
