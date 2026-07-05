"use client";

import { useMemo, useState } from "react";

import {
  buyoutTotal,
  formatYen,
  isCampaignActive,
  listTotal,
  packSavings,
  SUBJECT_AREAS,
  SUBJECTS,
} from "@/lib/pricing";

export function ApplyForm({ canceled }: { canceled?: boolean }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const count = selected.length;
  const campaign = isCampaignActive();
  const list = useMemo(() => listTotal(count), [count]);
  const total = useMemo(() => buyoutTotal(count, campaign), [count, campaign]);
  const savings = useMemo(() => packSavings(count, campaign), [count, campaign]);

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
      {/* 科目選択 */}
      <div>
        {canceled ? (
          <p className="mb-5 rounded-[14px] bg-[#fff7ed] px-4 py-3 text-[0.86rem] font-semibold text-[#9a3412] ring-1 ring-[rgba(234,88,12,0.2)]">
            お支払いはキャンセルされました。教材を選び直して、いつでもやり直せます。
          </p>
        ) : null}

        <p className="text-[0.84rem] font-bold text-[#0b1d4a]">
          ① やり切る教材を選ぶ
          <span className="ml-2 text-[0.78rem] font-normal text-[#64748b]">
            （1教材＝約100日分・2教材以上でパック割）
          </span>
        </p>

        <div className="mt-4 grid gap-4">
          {SUBJECT_AREAS.map((area) => {
            const items = SUBJECTS.filter((s) => s.area === area);
            const color = items[0]?.color ?? "#0b1d4a";
            return (
              <div key={area}>
                <p className="mb-2 flex items-center gap-2 text-[0.78rem] font-bold text-[#475569]">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: color }} />
                  {area}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => {
                    const on = selected.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggle(s.id)}
                        aria-pressed={on}
                        className={`min-h-11 rounded-full px-4 text-[0.9rem] font-semibold transition ${
                          on
                            ? "text-white shadow-[0_10px_22px_-12px_rgba(11,29,74,0.6)]"
                            : "bg-white text-[#0b1d4a] ring-1 ring-[rgba(15,29,74,0.12)] hover:ring-[rgba(15,29,74,0.3)]"
                        }`}
                        style={on ? { background: color } : undefined}
                      >
                        {on ? "✓ " : ""}
                        {s.label}
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
      <div className="lg:sticky lg:top-24">
        <div className="rounded-[22px] bg-white p-6 shadow-[0_30px_60px_-44px_rgba(15,29,74,0.45)] ring-1 ring-[rgba(15,29,74,0.1)]">
          <p className="text-[0.8rem] font-bold text-[#0f766e]">② 内容を確認して申し込む</p>

          <div className="mt-3 min-h-[2.5rem]">
            {count === 0 ? (
              <p className="text-[0.86rem] text-[#94a3b8]">
                左から教材を選ぶと、買い切り価格が表示されます。
              </p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {selected.map((id) => {
                  const s = SUBJECTS.find((x) => x.id === id)!;
                  return (
                    <span
                      key={id}
                      className="rounded-full px-2.5 py-0.5 text-[0.74rem] font-semibold text-white"
                      style={{ background: s.color }}
                    >
                      {s.label}
                    </span>
                  );
                })}
              </div>
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
                <div className="flex items-center justify-between text-[#0d9488]">
                  <dt className="font-bold">開講記念パック割</dt>
                  <dd className="font-bold">−{formatYen(savings)}</dd>
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
