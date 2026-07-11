"use client";

import { type CSSProperties, useMemo, useState } from "react";

import {
  buyoutTotal,
  CAMPAIGN_DEADLINE_LABEL,
  CAMPAIGN_DEADLINE_SHORT_LABEL,
  formatYen,
  GRADING_COUNT,
  isCampaignActive,
  listTotal,
  packSavings,
  PACK_UNIT_SAVINGS,
  SUBJECT_AREAS,
  SUBJECTS,
} from "@/lib/pricing";

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

function getMaterialProfile(subject: (typeof SUBJECTS)[number]) {
  return MATERIAL_PROFILES[subject.id] ?? {
    title: `${subject.label} 教材`,
    level: "標準",
    target: "高校生",
    coverage: "取り組みサイズの演習と添削で、答案を整える教材です。",
  };
}

export function ApplyForm({ canceled }: { canceled?: boolean }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const count = selected.length;
  const campaign = isCampaignActive();
  const list = useMemo(() => listTotal(count), [count]);
  const total = useMemo(() => buyoutTotal(count, campaign), [count, campaign]);
  const savings = useMemo(() => packSavings(count, campaign), [count, campaign]);
  const selectedMaterials = useMemo(
    () =>
      selected
        .map((id) => SUBJECTS.find((subject) => subject.id === id))
        .filter((subject): subject is (typeof SUBJECTS)[number] => Boolean(subject)),
    [selected],
  );

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  async function submit() {
    if (count === 0 || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjects: selected }),
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

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-10">
      {/* 教材選択 */}
      <div className="order-2 lg:order-1">
        {canceled ? (
          <p className="mb-5 rounded-[14px] bg-[#fff7ed] px-4 py-3 text-[0.86rem] font-semibold text-[#9a3412] ring-1 ring-[rgba(234,88,12,0.2)]">
            お支払いはキャンセルされました。教材を選び直して、いつでもやり直せます。
          </p>
        ) : null}

        <div>
          <p className="text-[0.84rem] font-bold text-[#0b1d4a]">
            <span className="hidden lg:inline">① </span>購入する教材を選ぶ
          </p>
          <p className="mt-1 text-[0.8rem] leading-[1.8] text-[#64748b]">
            <span className="lg:hidden">
              タップで教材を選ぶと、合計金額が出ます。2教材以上は{CAMPAIGN_DEADLINE_SHORT_LABEL}までパック割。
            </span>
            <span className="hidden lg:inline">
              教材名・目安レベル・対象を確認して選べます。1教材＝約{GRADING_COUNT}日分、2教材以上は{CAMPAIGN_DEADLINE_LABEL}までパック割です。
            </span>
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
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggle(s.id)}
                        aria-pressed={on}
                        className={`relative min-h-0 rounded-lg p-3 text-left transition sm:min-h-[13.25rem] sm:p-4 ${
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
                        <span className="flex items-start justify-between gap-3">
                          <span
                            className="rounded-full px-2.5 py-1 text-[0.65rem] font-bold text-white sm:text-[0.7rem]"
                            style={{ background: color }}
                          >
                            {s.label}
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
                        <span className={`mt-2 flex gap-3 sm:mt-3 ${profile.cover ? "items-start" : ""}`}>
                          {profile.cover ? (
                            <span className="hidden w-[4.7rem] shrink-0 overflow-hidden rounded-md bg-[#f8fafc] shadow-[0_16px_28px_-20px_rgba(11,29,74,0.7)] ring-1 ring-[rgba(15,29,74,0.08)] sm:block">
                              <picture>
                                <source type="image/avif" srcSet={`/books/${profile.cover.asin}.avif`} />
                                <source type="image/webp" srcSet={`/books/${profile.cover.asin}.webp`} />
                                <img
                                  src={`/books/${profile.cover.asin}.webp`}
                                  alt={profile.cover.alt}
                                  width={320}
                                  height={451}
                                  loading="lazy"
                                  decoding="async"
                                  className="block aspect-[71/100] h-auto w-full object-cover"
                                />
                              </picture>
                            </span>
                          ) : null}
                          <span className="block min-w-0 flex-1">
                            <span className="block text-[0.9rem] font-extrabold leading-[1.42] text-[#0b1d4a] sm:text-[1.03rem] sm:leading-[1.45]">
                              {profile.title}
                            </span>
                            <span className="mt-1.5 flex flex-wrap gap-1.5 sm:mt-2">
                              <span className="rounded-full bg-[#f1f5f9] px-2 py-1 text-[0.64rem] font-bold text-[#475569] sm:text-[0.7rem]">
                                目安レベル：{profile.level}
                              </span>
                              <span className="rounded-full bg-[#fff7ed] px-2 py-1 text-[0.64rem] font-bold text-[#9a3412] sm:text-[0.7rem]">
                                {profile.target}
                              </span>
                            </span>
                            <span className="mt-3 hidden text-[0.78rem] leading-[1.7] text-[#64748b] sm:block">
                              <span className="font-bold text-[#334155]">収録範囲：</span>
                              {profile.coverage}
                            </span>
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 金額サマリー＋申込 */}
      <div className="order-1 lg:sticky lg:top-24 lg:order-2">
        <div className="rounded-[22px] bg-white p-6 shadow-[0_30px_60px_-44px_rgba(15,29,74,0.45)] ring-1 ring-[rgba(15,29,74,0.1)]">
          <p className="text-[0.8rem] font-bold text-[#0f766e]">
            <span className="hidden lg:inline">② </span>内容を確認して申し込む
          </p>

          <div className="mt-3 min-h-[2.5rem]">
            {count === 0 ? (
              <p className="text-[0.86rem] text-[#94a3b8]">
                下の教材をタップすると、ここに買い切り価格が表示されます。
              </p>
            ) : (
              <ul className="grid gap-2">
                {selectedMaterials.map((s) => {
                  const profile = getMaterialProfile(s);
                  return (
                    <li
                      key={s.id}
                      className="border-l-2 py-1 pl-3 text-[0.78rem]"
                      style={{ borderColor: s.color }}
                    >
                      <span className="block font-bold text-[#0b1d4a]">{profile.title}</span>
                      <span className="mt-0.5 block text-[#64748b]">目安レベル：{profile.level}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <dl className="mt-4 grid gap-2 border-t border-[rgba(15,29,74,0.08)] pt-4 text-[0.9rem]">
            <div className="flex items-center justify-between text-[#475569]">
              <dt>選択した教材</dt>
              <dd className="font-bold text-[#0b1d4a]">{count}教材</dd>
            </div>
            {savings > 0 ? (
              <>
                <div className="flex items-center justify-between text-[#94a3b8]">
                  <dt>定価</dt>
                  <dd className="font-semibold line-through">{formatYen(list)}</dd>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 rounded-[12px] bg-[#ecfdf5] px-3 py-2 text-[#0d9488] ring-1 ring-[rgba(13,148,136,0.14)]">
                  <dt className="font-bold">開講記念パック割</dt>
                  <dd className="font-bold">−{formatYen(savings)}</dd>
                  <dd className="col-span-2 text-[0.72rem] font-semibold leading-[1.45] text-[#0f766e]">
                    <span className="sm:hidden">{CAMPAIGN_DEADLINE_SHORT_LABEL}まで・1教材{formatYen(PACK_UNIT_SAVINGS)}OFF</span>
                    <span className="hidden sm:inline">{CAMPAIGN_DEADLINE_LABEL}まで・1教材あたり{formatYen(PACK_UNIT_SAVINGS)}OFF</span>
                  </dd>
                </div>
              </>
            ) : null}
            <div className="flex items-baseline justify-between border-t border-dashed border-[rgba(15,29,74,0.14)] pt-2">
              <dt className="text-[0.86rem] font-bold text-[#ea580c]">買い切り合計</dt>
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
            disabled={count === 0 || loading}
            className="group/cta relative mt-4 inline-flex min-h-12 w-full items-center justify-center overflow-hidden rounded-full px-6 text-[0.98rem] font-bold text-white transition enabled:hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,#f97316_0%,#ea580c_100%)]" />
            <span className="relative">
              {loading ? "決済ページへ移動中…" : "この教材を申し込む（買い切り）"}
            </span>
          </button>
          <p className="mt-3 text-center text-[0.74rem] leading-[1.7] text-[#94a3b8]">
            入会金・追加費用0円／買い切り・自動更新なし。お支払いは Stripe の安全な決済画面（一括）で行います。
          </p>
        </div>
      </div>
    </div>
  );
}
