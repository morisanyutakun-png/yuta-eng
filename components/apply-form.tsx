"use client";

import { type CSSProperties, useMemo, useState } from "react";

import {
  buyoutTotal,
  CAMPAIGN_DEADLINE_LABEL,
  CAMPAIGN_DEADLINE_SHORT_LABEL,
  currentSinglePrice,
  formatYen,
  GRADING_COUNT,
  isCampaignActive,
  listTotal,
  MATERIAL_PRICE,
  packSavings,
  PACK_UNIT_PRICE,
  SUBJECT_AREAS,
  SUBJECTS,
  TRIAL_CREDIT,
  TRIAL_GRADING_COUNT,
  TRIAL_PRICE,
  TRIAL_SUBJECTS,
} from "@/lib/pricing";
import { gtagEvent } from "@/components/lp-tracking";
import { subjectToItem } from "@/lib/ga4-items";

// お試し（*-trial）を、対応するフル教材の id から引ける表。商品棚の各カードに
// 「お試し」ボタンを出すために使う。
const trialByFullId = new Map(TRIAL_SUBJECTS.map((t) => [t.trialOf, t]));

type MaterialProfile = {
  title: string;
  level: string;
  target: string;
  coverage: string;
  cover?: {
    asin: string;
    alt: string;
  };
};

const MATERIAL_PROFILES: Record<string, MaterialProfile> = {
  "physics-basic": {
    title: "高校物理 入門演習",
    level: "基礎",
    target: "物理が苦手・初学者・共通テスト導入",
    coverage: "力学・熱・波動・電磁気・原子まで全分野収録。公式の意味と立式の土台を固めます。",
    cover: {
      asin: "B0H4J34162",
      alt: "高校物理 入門演習の教材表紙",
    },
  },
  physics: {
    title: "高校物理 標準演習",
    level: "標準",
    target: "共通テスト-国公立二次標準",
    coverage: "力学・熱・波動・電磁気・原子まで全分野収録。入試標準レベルを分野横断で鍛えます。",
    cover: {
      asin: "B0H3LLW1F2",
      alt: "高校物理 標準演習の教材表紙",
    },
  },
  "physics-advanced": {
    title: "高校物理 発展演習",
    level: "発展",
    target: "難関大・記述対策",
    coverage: "力学・熱・波動・電磁気・原子まで全分野収録。応用問題で答案の組み立てを磨きます。",
    cover: {
      asin: "B0H639CPQW",
      alt: "高校物理 発展演習の教材表紙",
    },
  },
  "chemistry-basic": {
    title: "ノビットの化学基礎 標準演習",
    level: "基礎",
    target: "高1-高2・共通テスト導入",
    coverage: "化学基礎の全分野を収録。物質量・酸塩基・酸化還元まで一通り確認します。",
    cover: {
      asin: "B0H7YWLDJJ",
      alt: "ノビットの化学基礎 標準演習の教材表紙",
    },
  },
  chemistry: {
    title: "ノビットの化学 標準",
    level: "標準",
    target: "高2-受験生・理系化学",
    coverage: "理論・無機・有機・高分子まで全分野収録。計算過程と知識の使い方を添削で整えます。",
    cover: {
      asin: "B0H7RHT1NF",
      alt: "ノビットの化学 標準の教材表紙",
    },
  },
  "math-1a": {
    title: "ノビットの数学ⅠA 標準演習",
    level: "基礎-標準",
    target: "高1-受験基礎",
    coverage: "数と式・二次関数・三角比・場合の数など、数学I・Aの主要範囲を答案の型まで練習します。",
    cover: {
      asin: "B0H6ZRPLVJ",
      alt: "ノビットの数学ⅠA 標準演習の教材表紙",
    },
  },
  "math-2bc": {
    title: "ノビットの数学ⅡBC 標準演習",
    level: "標準",
    target: "高2-受験基礎",
    coverage: "数学II・B・Cの主要範囲を、途中式で伝わる答案づくりまで練習します。",
    cover: {
      asin: "B0H71TQJYY",
      alt: "ノビットの数学ⅡBC 標準演習の教材表紙",
    },
  },
  "math-3c": {
    title: "ノビットの数学ⅢC 標準演習",
    level: "標準-発展導入",
    target: "理系受験生",
    coverage: "極限・微積分・複素数平面など、理系入試につながる範囲を段階的に積みます。",
    cover: {
      asin: "B0H724CBBT",
      alt: "ノビットの数学ⅢC 標準演習の教材表紙",
    },
  },
  "english-reading": {
    title: "ノビットの英語・長文 Standard",
    level: "基礎-標準",
    target: "高1-受験基礎",
    coverage: "文構造・根拠・設問処理を押さえながら、読み方を提出ごとの添削で整えます。",
    cover: {
      asin: "B0H7LPFKN1",
      alt: "ノビットの英語・長文 Standardの教材表紙",
    },
  },
  "english-grammar": {
    title: "ノビットの英語・文法 Standard",
    level: "基礎-標準",
    target: "高校英文法の総点検",
    coverage: "高校英文法の主要事項を小さく確認し、英作文や読解に使える形にします。",
    cover: {
      asin: "B0H7LQW2W8",
      alt: "ノビットの英語・文法 Standardの教材表紙",
    },
  },
};

const PRODUCT_LIST_ID = "apply-product-list";

function getMaterialProfile(subject: (typeof SUBJECTS)[number]) {
  return MATERIAL_PROFILES[subject.id] ?? {
    title: `${subject.label} 教材`,
    level: "標準",
    target: "高校生",
    coverage: "取り組みサイズの演習と添削で、答案を整える教材です。",
  };
}

function MaterialCoverFrame({
  cover,
  className = "",
  imageClassName = "scale-[1.06]",
}: {
  cover: NonNullable<MaterialProfile["cover"]>;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <span className={`block aspect-[71/100] shrink-0 overflow-hidden rounded-md bg-[#f8fafc] shadow-[0_16px_28px_-20px_rgba(11,29,74,0.7)] ring-1 ring-[rgba(15,29,74,0.08)] ${className}`}>
      <picture className="block h-full w-full">
        <source type="image/avif" srcSet={`/books/${cover.asin}.avif`} />
        <source type="image/webp" srcSet={`/books/${cover.asin}.webp`} />
        <img
          src={`/books/${cover.asin}.webp`}
          alt={cover.alt}
          width={320}
          height={451}
          loading="lazy"
          decoding="async"
          className={`block h-full w-full object-cover ${imageClassName}`}
        />
      </picture>
    </span>
  );
}

export function ApplyForm({
  canceled,
  upgradeToken,
  initialSubjects = [],
}: {
  canceled?: boolean;
  upgradeToken?: string | null;
  /** トップの教材カードから渡る事前選択（?add=）。カートに入った状態で開く。 */
  initialSubjects?: string[];
}) {
  const [selected, setSelected] = useState<string[]>(() =>
    Array.from(new Set(initialSubjects.filter((id) => SUBJECTS.some((s) => s.id === id)))),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const campaign = isCampaignActive();
  const unitPrice = currentSinglePrice(campaign);

  // カートは買い切り（フル）とお試し（*-trial）を両方持てる。ただし決済は「どちらか一方」。
  const fullIds = useMemo(() => selected.filter((id) => SUBJECTS.some((s) => s.id === id)), [selected]);
  const trialIds = useMemo(() => selected.filter((id) => TRIAL_SUBJECTS.some((t) => t.id === id)), [selected]);
  const fullCount = fullIds.length;
  const trialCount = trialIds.length;
  const count = selected.length;
  const isMixed = fullCount > 0 && trialCount > 0;

  const list = useMemo(() => listTotal(fullCount), [fullCount]);
  const rawTotal = useMemo(() => buyoutTotal(fullCount, campaign), [fullCount, campaign]);
  // 本契約特典（−¥1,980）は「買い切りのみ・お試し無し」のときの見込み。最終額は決済画面で確定。
  const isUpgrade = Boolean(upgradeToken) && fullCount > 0 && trialCount === 0;
  const total = (isUpgrade ? Math.max(0, rawTotal - TRIAL_CREDIT) : rawTotal) + trialCount * TRIAL_PRICE;
  const savings = useMemo(() => packSavings(fullCount, campaign), [fullCount, campaign]);

  // 買い切り＋お試しをまとめたカート表示用アイテム。
  const cartItems = useMemo(
    () =>
      selected
        .map((id) => {
          const full = SUBJECTS.find((s) => s.id === id);
          if (full) {
            const p = getMaterialProfile(full);
            return { id, kind: "full" as const, title: p.title, short: full.label, level: p.level, price: unitPrice, color: full.color, cover: p.cover };
          }
          const trial = TRIAL_SUBJECTS.find((t) => t.id === id);
          if (trial) {
            const fullSub = SUBJECTS.find((s) => s.id === trial.trialOf);
            const cover = fullSub ? getMaterialProfile(fullSub).cover : undefined;
            const nm = trial.label.replace(`（添削${TRIAL_GRADING_COUNT}回）`, "");
            return { id, kind: "trial" as const, title: `${nm}（お試し・添削${TRIAL_GRADING_COUNT}回）`, short: `${nm} お試し`, level: "お試し", price: TRIAL_PRICE, color: trial.color, cover };
          }
          return null;
        })
        .filter((x): x is NonNullable<typeof x> => Boolean(x)),
    [selected, unitPrice],
  );
  const selectedSummary = cartItems.map((i) => i.short).join("・");

  function toggle(id: string) {
    setSelected((prev) => {
      const adding = !prev.includes(id);
      if (adding) {
        const subject = SUBJECTS.find((s) => s.id === id);
        if (subject) {
          gtagEvent("select_item", {
            item_list_id: "apply_materials",
            item_list_name: "ノビットスタディ 対応教材",
            items: [subjectToItem(subject, currentSinglePrice(campaign))],
          });
        }
      }
      return adding ? [...prev, id] : prev.filter((x) => x !== id);
    });
  }

  function scrollToProducts() {
    document.getElementById(PRODUCT_LIST_ID)?.scrollIntoView({ block: "start" });
  }

  async function submit() {
    if (count === 0 || loading) return;
    if (isMixed) {
      setError("お試しと買い切りは、分けてお申し込みください（どちらか一方にしてください）。");
      return;
    }
    setLoading(true);
    setError(null);
    // 決済ページ（Stripe）へ遷移する直前に begin_checkout を送る。
    gtagEvent("begin_checkout", {
      currency: "JPY",
      value: total,
      coupon: isUpgrade ? "trial-upgrade" : trialCount > 0 ? "trial" : savings > 0 ? "opening-campaign" : undefined,
      items: cartItems.map((i) => ({
        item_id: i.id,
        item_name: i.short,
        item_brand: "ノビットスタディ",
        item_category: i.kind === "trial" ? "お試し" : "教材",
        price: i.price,
        quantity: 1,
      })),
    });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subjects: selected,
          ...(isUpgrade && upgradeToken ? { upgrade: upgradeToken } : {}),
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "お申し込みの開始に失敗しました。時間をおいて再度お試しください。");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("通信に失敗しました。電波の良い場所で再度お試しください。");
      setLoading(false);
    }
  }

  // お試し（*-trial）をカートに出し入れ。買い切りと同じカートに入るが、決済は一方のみ。
  function toggleTrial(fullId: string) {
    const trial = trialByFullId.get(fullId);
    if (!trial) return;
    setSelected((prev) => {
      const adding = !prev.includes(trial.id);
      if (adding) {
        gtagEvent("select_item", {
          item_list_id: "apply_trial",
          item_list_name: "ノビットスタディ お試し",
          items: [
            {
              item_id: trial.id,
              item_name: trial.registrationLabel,
              item_brand: "ノビットスタディ",
              item_category: "お試し",
              price: TRIAL_PRICE,
              quantity: 1,
            },
          ],
        });
      }
      return adding ? [...prev, trial.id] : prev.filter((x) => x !== trial.id);
    });
  }

  return (
    <>
    <div className="grid gap-8 pb-40 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-10 lg:pb-0">
      {/* 教材選択 */}
      <div className="order-1">
        {canceled ? (
          <p className="mb-5 rounded-[14px] bg-[#fff7ed] px-4 py-3 text-[0.86rem] font-semibold text-[#9a3412] ring-1 ring-[rgba(234,88,12,0.2)]">
            お支払いはキャンセルされました。教材を選び直して、いつでもやり直せます。
          </p>
        ) : null}

        {upgradeToken ? (
          <p className="mb-5 flex items-start gap-2 rounded-[14px] bg-[#ecfdf5] px-4 py-3 text-[0.86rem] font-semibold text-[#0f766e] ring-1 ring-[rgba(13,148,136,0.22)]">
            <span aria-hidden="true" className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#0d9488] text-white">✓</span>
            お試しからの本契約特典として <strong className="mx-1 font-extrabold">{formatYen(TRIAL_CREDIT)} 値引き</strong> を適用します（最終金額は決済画面でご確認ください）。
          </p>
        ) : null}

        <div id={PRODUCT_LIST_ID}>
          <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.16em] text-[#0f766e]">
            商品一覧
          </p>
          <p className="mt-1 text-[1.02rem] font-extrabold text-[#0b1d4a]">
            <span className="hidden lg:inline">① </span>教材を選ぶ（お試し／買い切り）
          </p>
          <p className="mt-1 text-[0.8rem] leading-[1.8] text-[#64748b]">
            <span className="lg:hidden">
              各カードで選べます。<span className="font-bold text-[#0b1d4a]">買い切り</span>は教材をタップしてカートへ、<span className="font-bold text-[#ea580c]">お試し</span>はカード下の「お試し」ボタンから。
            </span>
            <span className="hidden lg:inline">
              各教材で「買い切り」か「お試し」を選べます。買い切りは教材を選んでカートへ（2教材以上は{CAMPAIGN_DEADLINE_LABEL}までパック割）。まず試すなら各カード下の<span className="font-bold text-[#ea580c]">「お試し（{formatYen(TRIAL_PRICE)}・添削{TRIAL_GRADING_COUNT}回）」</span>から。
            </span>
          </p>
          <p className="mt-3 inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-[12px] bg-white px-3 py-2 text-[0.78rem] font-bold leading-snug text-[#0b1d4a] ring-1 ring-[rgba(15,29,74,0.08)]">
            {campaign ? (
              <>
                <span className="text-[0.72rem] font-semibold text-[#94a3b8] line-through">{formatYen(MATERIAL_PRICE)}</span>
                <span className="text-[#ea580c]">開講記念 1教材 {formatYen(unitPrice)}</span>
                <span className="text-[#64748b]">／ 2教材以上は1教材 {formatYen(PACK_UNIT_PRICE)}</span>
              </>
            ) : (
              <span>1教材 {formatYen(MATERIAL_PRICE)}</span>
            )}
          </p>
        </div>

        <div className="mt-4 grid gap-3 sm:gap-4">
          {SUBJECT_AREAS.map((area) => {
            const items = SUBJECTS.filter((s) => s.area === area);
            const color = items[0]?.color ?? "#0b1d4a";
            return (
              <div key={area}>
                <p className="mb-2 flex items-center gap-2 text-[0.78rem] font-bold text-[#475569]">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: color }} />
                  {area}の教材
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {items.map((s) => {
                    const on = selected.includes(s.id);
                    const profile = getMaterialProfile(s);
                    const trial = trialByFullId.get(s.id);
                    return (
                      <div key={s.id} className="flex flex-col gap-1.5">
                      <button
                        type="button"
                        onClick={() => toggle(s.id)}
                        aria-pressed={on}
                        className={`relative min-h-0 overflow-hidden rounded-lg p-3 text-left transition sm:min-h-[13.25rem] sm:p-4 ${
                          on
                            ? "bg-white shadow-[0_16px_30px_-26px_rgba(11,29,74,0.7)] ring-2 sm:shadow-[0_24px_42px_-30px_rgba(11,29,74,0.7)]"
                            : "bg-white text-[#0b1d4a] ring-1 ring-[rgba(15,29,74,0.1)] hover:-translate-y-0.5 hover:ring-[rgba(15,29,74,0.24)]"
                        }`}
                        style={
                          on
                            ? ({
                                "--tw-ring-color": color,
                                boxShadow: `0 24px 42px -30px ${color}`,
                              } as CSSProperties)
                            : undefined
                        }
                      >
                        <span className="flex min-w-0 gap-3 sm:gap-3.5">
                          {profile.cover ? (
                            <span
                              className="flex w-[5.25rem] shrink-0 self-stretch rounded-[10px] p-1.5 ring-1 ring-[rgba(15,29,74,0.06)] sm:w-[5.85rem] sm:p-2"
                              style={{
                                background: `linear-gradient(180deg, ${color}22 0%, rgba(248,250,252,0.9) 100%)`,
                              }}
                            >
                              <MaterialCoverFrame cover={profile.cover} className="w-full self-start rounded-[7px] sm:rounded-lg" />
                            </span>
                          ) : null}
                          <span className="block min-w-0 flex-1">
                            <span className="flex items-start justify-between gap-2">
                              <span className="flex min-w-0 flex-wrap items-center gap-1.5">
                                <span className="rounded-full bg-[#0b1d4a] px-2.5 py-1 text-[0.65rem] font-bold text-white sm:text-[0.7rem]">
                                  商品
                                </span>
                                <span
                                  className="rounded-full px-2.5 py-1 text-[0.65rem] font-bold text-white sm:text-[0.7rem]"
                                  style={{ background: color }}
                                >
                                  {s.label}
                                </span>
                                <span className="rounded-full bg-[#f1f5f9] px-2 py-1 text-[0.64rem] font-bold text-[#475569] sm:text-[0.7rem]">
                                  {profile.level}
                                </span>
                              </span>
                              <span
                                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[0.78rem] font-extrabold ${
                                  on ? "text-white" : "text-transparent ring-1 ring-[rgba(15,29,74,0.14)]"
                                }`}
                                style={on ? { background: color } : undefined}
                                aria-hidden="true"
                              >
                                ✓
                              </span>
                            </span>
                            <span className="mt-2 block text-[0.9rem] font-extrabold leading-[1.42] text-[#0b1d4a] sm:text-[1.03rem] sm:leading-[1.45]">
                              {profile.title}
                            </span>
                            <span className="mt-1.5 block text-[0.72rem] font-semibold leading-[1.55] text-[#475569] sm:mt-2 sm:text-[0.74rem]">
                              {profile.target}
                            </span>
                            <span className="mt-2 block text-[0.72rem] leading-[1.6] text-[#64748b] sm:mt-3 sm:text-[0.78rem] sm:leading-[1.7]">
                              <span className="font-bold text-[#334155]">収録範囲：</span>
                              <span className="hidden sm:inline">{profile.coverage}</span>
                              <span className="sm:hidden">約{GRADING_COUNT}回分・提出ごとに添削つき。</span>
                            </span>
                            <span className="mt-3 flex items-center justify-between gap-2 border-t border-[rgba(15,29,74,0.08)] pt-3">
                              <span className="min-w-0">
                                <span className="block text-[0.68rem] font-bold text-[#64748b]">
                                  {campaign ? "開講記念・買い切り" : "買い切り"}
                                </span>
                                <span className="flex items-baseline gap-1.5">
                                  {campaign ? (
                                    <span className="text-[0.72rem] font-semibold text-[#94a3b8] line-through">
                                      {formatYen(MATERIAL_PRICE)}
                                    </span>
                                  ) : null}
                                  <span className="block text-[0.98rem] font-extrabold leading-none text-[#0b1d4a]">
                                    {formatYen(unitPrice)}
                                  </span>
                                </span>
                              </span>
                              <span
                                className={`inline-flex min-h-9 shrink-0 items-center justify-center rounded-full px-3 text-[0.76rem] font-extrabold ${
                                  on
                                    ? "bg-[#ecfdf5] text-[#0f766e] ring-1 ring-[rgba(13,148,136,0.22)]"
                                    : "bg-[#fff7ed] text-[#ea580c] ring-1 ring-[rgba(234,88,12,0.22)]"
                                }`}
                              >
                                {on ? "追加済み" : "カートに追加"}
                              </span>
                            </span>
                          </span>
                        </span>
                      </button>
                      {/* この教材の「お試し（¥1,980・添削3回）」＝棚の中で買い切りと並ぶ、カートに入る選択肢 */}
                      {trial ? (() => {
                        const trialOn = selected.includes(trial.id);
                        return (
                          <button
                            type="button"
                            onClick={() => toggleTrial(s.id)}
                            aria-pressed={trialOn}
                            data-cta-location={`shelf_trial_${s.id}`}
                            className={`flex items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left transition ${
                              trialOn
                                ? "border-[#ea580c] bg-[#fff1e6]"
                                : "border-dashed border-[rgba(234,88,12,0.45)] bg-[#fff7ed] hover:bg-[#ffedd5]"
                            }`}
                          >
                            <span className="flex items-center gap-1.5">
                              <span className="rounded-full bg-[#ea580c] px-1.5 py-0.5 text-[0.6rem] font-extrabold text-white">お試し</span>
                              <span className="text-[0.76rem] font-bold text-[#9a3412]">添削{TRIAL_GRADING_COUNT}回 {formatYen(TRIAL_PRICE)}</span>
                            </span>
                            <span
                              className={`inline-flex min-h-8 shrink-0 items-center justify-center rounded-full px-2.5 text-[0.72rem] font-extrabold ${
                                trialOn
                                  ? "bg-[#ecfdf5] text-[#0f766e] ring-1 ring-[rgba(13,148,136,0.22)]"
                                  : "bg-[#ea580c] text-white"
                              }`}
                            >
                              {trialOn ? "追加済み" : "カートに追加"}
                            </span>
                          </button>
                        );
                      })() : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 金額サマリー＋申込 */}
      <div className="hidden lg:sticky lg:top-24 lg:order-2 lg:block">
        <div className="rounded-[22px] bg-white p-6 shadow-[0_30px_60px_-44px_rgba(15,29,74,0.45)] ring-1 ring-[rgba(15,29,74,0.1)]">
          <p className="text-[0.8rem] font-bold text-[#0f766e]">
            <span className="hidden lg:inline">② </span>内容を確認して申し込む
          </p>

          <div className="mt-3 min-h-[2.5rem]">
            {count === 0 ? (
              <p className="text-[0.86rem] text-[#94a3b8]">
                左で教材（お試し／買い切り）を選ぶと、ここに合計が表示されます。
              </p>
            ) : (
              <ul className="grid gap-2">
                {cartItems.map((i) => (
                  <li
                    key={i.id}
                    className="flex items-center justify-between gap-2 border-l-2 py-1 pl-3 text-[0.78rem]"
                    style={{ borderColor: i.color }}
                  >
                    <span className="min-w-0">
                      <span className="block font-bold text-[#0b1d4a]">{i.title}</span>
                      <span className="mt-0.5 block text-[#64748b]">
                        {i.kind === "trial" ? `お試し・添削${TRIAL_GRADING_COUNT}回` : `目安レベル：${i.level}`}
                      </span>
                    </span>
                    <span className="shrink-0 text-[0.8rem] font-bold text-[#0b1d4a]">{formatYen(i.price)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <dl className="mt-4 grid gap-2 border-t border-[rgba(15,29,74,0.08)] pt-4 text-[0.9rem]">
            <div className="flex items-center justify-between text-[#475569]">
              <dt>選択した内容</dt>
              <dd className="font-bold text-[#0b1d4a]">
                {fullCount > 0 ? `買い切り${fullCount}教材` : ""}
                {fullCount > 0 && trialCount > 0 ? "／" : ""}
                {trialCount > 0 ? `お試し${trialCount}件` : ""}
              </dd>
            </div>
            {savings > 0 && !isMixed ? (
              <>
                <div className="flex items-center justify-between text-[#94a3b8]">
                  <dt>定価</dt>
                  <dd className="font-semibold line-through">{formatYen(list)}</dd>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 rounded-[12px] bg-[#ecfdf5] px-3 py-2 text-[#0d9488] ring-1 ring-[rgba(13,148,136,0.14)]">
                  <dt className="font-bold">{fullCount >= 2 ? "開講記念パック割" : "開講記念価格"}</dt>
                  <dd className="font-bold">−{formatYen(savings)}</dd>
                  <dd className="col-span-2 text-[0.72rem] font-semibold leading-[1.45] text-[#0f766e]">
                    <span className="sm:hidden">{CAMPAIGN_DEADLINE_SHORT_LABEL}まで</span>
                    <span className="hidden sm:inline">{CAMPAIGN_DEADLINE_LABEL}まで・{fullCount >= 2 ? `1教材 ${formatYen(PACK_UNIT_PRICE)}` : `1教材 ${formatYen(unitPrice)}`}</span>
                  </dd>
                </div>
              </>
            ) : null}
            {isUpgrade ? (
              <div className="flex items-center justify-between rounded-[12px] bg-[#ecfdf5] px-3 py-2 text-[#0d9488] ring-1 ring-[rgba(13,148,136,0.14)]">
                <dt className="font-bold">本契約特典（お試し分）</dt>
                <dd className="font-bold">−{formatYen(TRIAL_CREDIT)}</dd>
              </div>
            ) : null}
            {isMixed ? (
              <p className="rounded-[10px] bg-[#fff7ed] px-3 py-2 text-[0.76rem] font-semibold leading-[1.5] text-[#9a3412] ring-1 ring-[rgba(234,88,12,0.22)]">
                お試しと買い切りは分けてのお申し込みになります。どちらか一方にしてください。
              </p>
            ) : null}
            <div className="flex items-baseline justify-between border-t border-dashed border-[rgba(15,29,74,0.14)] pt-2">
              <dt className="text-[0.86rem] font-bold text-[#ea580c]">合計</dt>
              <dd className="text-[1.6rem] font-extrabold leading-none text-[#0b1d4a]">
                {formatYen(total)}
              </dd>
            </div>
          </dl>

          {error ? (
            <p className="mt-3 rounded-[10px] bg-[#fef2f2] px-3 py-2 text-[0.8rem] font-semibold text-[#b91c1c]">
              {error}
            </p>
          ) : null}

          <button
            type="button"
            onClick={submit}
            disabled={count === 0 || loading || isMixed}
            className="group/cta relative mt-4 inline-flex min-h-12 w-full items-center justify-center overflow-hidden rounded-full px-6 text-[0.98rem] font-bold text-white transition enabled:hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,#f97316_0%,#ea580c_100%)]" />
            <span className="relative">
              {loading
                ? "決済ページへ移動中…"
                : isMixed
                  ? "どちらか一方にしてください"
                  : trialCount > 0
                    ? `お試しを申し込む（${formatYen(total)}）`
                    : `買い切りで申し込む（${formatYen(total)}）`}
            </span>
          </button>
          <p className="mt-3 text-center text-[0.74rem] leading-[1.7] text-[#94a3b8]">
            入会金・追加費用0円／買い切り・自動更新なし。お支払いは Stripe の安全な決済画面（一括）で行います。
          </p>
        </div>
      </div>
    </div>
      <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden" role="region" aria-label="購入カート">
        <div className="mx-auto max-w-[40rem] px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
          <div className="rounded-[18px] bg-white/95 p-3 shadow-[0_18px_50px_-18px_rgba(11,29,74,0.45)] ring-1 ring-[rgba(15,29,74,0.12)] backdrop-blur">
            {error ? (
              <p className="mb-2 rounded-[10px] bg-[#fef2f2] px-3 py-2 text-[0.76rem] font-semibold leading-[1.45] text-[#b91c1c]">
                {error}
              </p>
            ) : null}
            <div className="flex items-center gap-3">
              <span className="flex w-[4.8rem] shrink-0 items-center -space-x-2" aria-hidden="true">
                {count === 0 ? (
                  <span className="grid h-12 w-[3rem] place-items-center rounded-[10px] bg-[#f8fafc] text-[0.7rem] font-extrabold leading-tight text-[#94a3b8] ring-1 ring-[rgba(15,29,74,0.08)]">
                    空
                  </span>
                ) : (
                  <>
                    {cartItems.slice(0, 3).map((i) =>
                      i.cover ? (
                        <MaterialCoverFrame
                          key={i.id}
                          cover={i.cover}
                          className="h-12 w-[2.15rem] rounded-[5px] ring-2 ring-white"
                          imageClassName="scale-[1.06]"
                        />
                      ) : (
                        <span
                          key={i.id}
                          className="grid h-12 w-[2.15rem] place-items-center rounded-[5px] bg-[#f1f5f9] text-[0.68rem] font-extrabold text-[#0b1d4a] ring-2 ring-white"
                        >
                          {i.short.slice(0, 1)}
                        </span>
                      ),
                    )}
                    {count > 3 ? (
                      <span className="grid h-12 w-[2.15rem] place-items-center rounded-[5px] bg-[#0b1d4a] text-[0.7rem] font-extrabold text-white ring-2 ring-white">
                        +{count - 3}
                      </span>
                    ) : null}
                  </>
                )}
              </span>
              <div className="min-w-0 flex-1" aria-live="polite">
                <p className="truncate text-[0.74rem] font-bold text-[#0f766e]">
                  カート：{count}件
                </p>
                <p className="mt-0.5 truncate text-[0.68rem] font-semibold text-[#64748b]">
                  {count === 0 ? "商品カードをタップして追加" : selectedSummary}
                </p>
                <p className="mt-0.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="text-[0.7rem] font-bold text-[#475569]">合計</span>
                  <span className="text-[1.18rem] font-extrabold leading-none text-[#0b1d4a]">
                    {formatYen(total)}
                  </span>
                  {isMixed ? (
                    <span className="text-[0.66rem] font-bold text-[#ea580c]">
                      ※お試しと買い切りは分けて
                    </span>
                  ) : savings > 0 ? (
                    <span className="text-[0.68rem] font-bold text-[#ea580c]">
                      {formatYen(savings)}おトク
                    </span>
                  ) : trialCount > 0 ? (
                    <span className="text-[0.68rem] font-semibold text-[#64748b]">お試し</span>
                  ) : (
                    <span className="text-[0.68rem] font-semibold text-[#64748b]">買い切り</span>
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={count === 0 ? scrollToProducts : submit}
                disabled={loading}
                className="relative inline-flex min-h-11 shrink-0 items-center justify-center overflow-hidden rounded-full px-4 text-[0.86rem] font-bold text-white shadow-[0_12px_24px_-14px_rgba(234,88,12,0.85)] transition enabled:active:translate-y-px disabled:cursor-not-allowed disabled:opacity-55"
              >
                <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,#f97316_0%,#ea580c_100%)]" />
                <span className="relative whitespace-nowrap">
                  {loading ? "移動中..." : count === 0 ? "商品を見る" : "会計へ"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
