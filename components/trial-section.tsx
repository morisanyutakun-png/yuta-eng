"use client";

import { useState } from "react";

import { gtagEvent } from "@/components/lp-tracking";
import {
  formatYen,
  TRIAL_GRADING_COUNT,
  TRIAL_PRICE,
  TRIAL_SUBJECTS,
} from "@/lib/pricing";

function trialItem(id: string, name: string) {
  return {
    item_id: id,
    item_name: name,
    item_brand: "ノビットスタディ",
    item_category: "お試し",
    price: TRIAL_PRICE,
    quantity: 1,
  };
}

/**
 * お試し（3課題・添削3回・1,980円）の申込セクション。通常のカゴとは独立した
 * 単品フロー。選んだ1教材を /api/checkout（trial ルート）へ送る。
 */
export function TrialSection() {
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (!selected || loading) return;
    const trial = TRIAL_SUBJECTS.find((t) => t.id === selected);
    if (!trial) return;
    setLoading(true);
    setError(null);
    gtagEvent("begin_checkout", {
      currency: "JPY",
      value: TRIAL_PRICE,
      coupon: "trial",
      items: [trialItem(trial.id, trial.registrationLabel)],
    });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjects: [trial.id] }),
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

  function pick(id: string) {
    setSelected(id);
    const trial = TRIAL_SUBJECTS.find((t) => t.id === id);
    if (trial) {
      gtagEvent("select_item", {
        item_list_id: "trial_materials",
        item_list_name: "ノビットスタディ お試し",
        items: [trialItem(trial.id, trial.registrationLabel)],
      });
    }
  }

  const selectedTrial = TRIAL_SUBJECTS.find((t) => t.id === selected);

  return (
    <div className="relative overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#fff7ed_0%,#ffffff_46%,#eff6ff_100%)] p-6 ring-1 ring-[rgba(234,88,12,0.3)] shadow-[0_38px_84px_-50px_rgba(234,88,12,0.55)] sm:p-8">
      {/* おすすめリボン */}
      <span className="pointer-events-none absolute right-0 top-0 rounded-bl-[16px] bg-[#ea580c] px-4 py-1.5 text-[0.72rem] font-black tracking-[0.12em] text-white shadow-[0_10px_20px_-10px_rgba(234,88,12,0.8)]">
        おすすめ
      </span>

      <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-[#ea580c]">Trial · まずはここから</p>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-[1.2rem] font-bold text-[#9a3412]">まず添削{TRIAL_GRADING_COUNT}回だけ</span>
        <span className="text-[2.7rem] font-black leading-none tracking-[-0.02em] text-[#ea580c] sm:text-[3rem]">{formatYen(TRIAL_PRICE)}</span>
        <span className="text-[0.9rem] font-bold text-[#475569]">（税込）</span>
      </div>
      <p className="mt-2 max-w-2xl text-[0.9rem] leading-[1.85] text-[#475569]">
        いきなり買い切りは不安な方へ。指定教材の{TRIAL_GRADING_COUNT}課題＋解答解説＋答案添削{TRIAL_GRADING_COUNT}回＋アプリ体験つき。
        <span className="font-bold text-[#0f766e]">本契約に進めば、この{formatYen(TRIAL_PRICE)}は全額値引き</span>。
      </p>

      <ul className="mt-3 flex flex-wrap gap-2">
        {[`${TRIAL_GRADING_COUNT}課題`, "解答解説つき", `答案添削${TRIAL_GRADING_COUNT}回`, "アプリ体験"].map((t) => (
          <li key={t} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[0.78rem] font-bold text-[#9a3412] ring-1 ring-[rgba(234,88,12,0.18)]">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#ea580c]" />
            {t}
          </li>
        ))}
      </ul>

      <fieldset className="mt-5">
        <legend className="mb-2 text-[0.84rem] font-bold text-[#0b1d4a]">お試しする教材を1つ選ぶ</legend>
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {TRIAL_SUBJECTS.map((t) => {
            const on = selected === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => pick(t.id)}
                aria-pressed={on}
                className={`flex items-center justify-between gap-2 rounded-[12px] px-3.5 py-3 text-left transition ${
                  on
                    ? "bg-[#fff7ed] ring-2 ring-[#ea580c]"
                    : "bg-white ring-1 ring-[rgba(15,29,74,0.1)] hover:ring-[rgba(234,88,12,0.4)]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: t.color }} />
                  <span className="text-[0.9rem] font-bold text-[#0b1d4a]">{t.label.replace(`（添削${TRIAL_GRADING_COUNT}回）`, "")}</span>
                </span>
                <span
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[0.7rem] font-extrabold ${
                    on ? "bg-[#ea580c] text-white" : "text-transparent ring-1 ring-[rgba(15,29,74,0.16)]"
                  }`}
                  aria-hidden="true"
                >
                  ✓
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {error ? (
        <p className="mt-4 rounded-[10px] bg-[#fef2f2] px-3 py-2 text-[0.82rem] font-semibold text-[#b91c1c]">{error}</p>
      ) : null}

      <button
        type="button"
        onClick={submit}
        disabled={!selected || loading}
        data-cta-location="trial_submit"
        className="group relative mt-5 inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-[1rem] font-extrabold text-white shadow-[0_18px_38px_-14px_rgba(234,88,12,0.85)] transition enabled:hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,#f97316_0%,#ea580c_100%)]" />
        <span className="relative">
          {loading
            ? "決済ページへ移動中…"
            : selected
              ? `${selectedTrial?.label.replace(`（添削${TRIAL_GRADING_COUNT}回）`, "") ?? "この教材"}のお試しを申し込む（${formatYen(TRIAL_PRICE)}）`
              : "お試しする教材を選んでください"}
        </span>
        {!loading && selected ? <span aria-hidden="true" className="relative">→</span> : null}
      </button>
      <p className="mt-3 text-[0.76rem] leading-[1.7] text-[#94a3b8]">
        無料体験ではありません。お支払いは Stripe の安全な決済画面（一括）です。本契約時の{formatYen(TRIAL_PRICE)}値引きは、アプリの「本契約はこちら」からお進みください。
      </p>
    </div>
  );
}
