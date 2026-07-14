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

  return (
    <div className="rounded-[22px] bg-white p-6 ring-1 ring-[rgba(15,29,74,0.1)] shadow-[0_30px_64px_-50px_rgba(11,29,74,0.5)] sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#0f766e]">Trial · お試し</p>
          <h3 className="mt-2 text-[1.3rem] font-extrabold leading-[1.4] text-[#0b1d4a] sm:text-[1.55rem]">
            まず添削{TRIAL_GRADING_COUNT}回、{formatYen(TRIAL_PRICE)}で試す。
          </h3>
        </div>
        <p className="text-[0.84rem] leading-[1.7] text-[#64748b] sm:max-w-[17rem]">
          指定教材の{TRIAL_GRADING_COUNT}課題・解答解説・答案添削{TRIAL_GRADING_COUNT}回・アプリ体験つき。本契約に進むと{formatYen(TRIAL_PRICE)}を値引きします。
        </p>
      </div>

      <fieldset className="mt-5">
        <legend className="sr-only">お試しする教材を選ぶ</legend>
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
                    : "bg-[#f8fafc] ring-1 ring-[rgba(15,29,74,0.08)] hover:ring-[rgba(15,29,74,0.24)]"
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

      <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-baseline gap-1.5">
          <span className="text-[0.82rem] font-bold text-[#475569]">お試し</span>
          <span className="text-[1.9rem] font-black leading-none tracking-[-0.02em] text-[#0b1d4a]">{formatYen(TRIAL_PRICE)}</span>
          <span className="text-[0.8rem] font-bold text-[#475569]">（税込）</span>
        </p>
        <button
          type="button"
          onClick={submit}
          disabled={!selected || loading}
          data-cta-location="trial_submit"
          className="relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full px-6 text-[0.96rem] font-bold text-white transition enabled:hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,#f97316_0%,#ea580c_100%)]" />
          <span className="relative">{loading ? "決済ページへ移動中…" : `お試しを申し込む（${formatYen(TRIAL_PRICE)}）`}</span>
        </button>
      </div>
      <p className="mt-3 text-[0.76rem] leading-[1.7] text-[#94a3b8]">
        無料体験ではありません。お支払いは Stripe の安全な決済画面（一括）です。本契約時の{formatYen(TRIAL_PRICE)}値引きは、アプリの「本契約はこちら」からお進みください。
      </p>
    </div>
  );
}
