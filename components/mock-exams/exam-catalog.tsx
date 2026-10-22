"use client";

import { useState } from "react";

import { ExamCard } from "@/components/mock-exams/exam-card";
import { examLevels, type ExamLevel, type MockExam } from "@/data/mock-exams";

/**
 * 難易度別の絞り込みと商品の札。
 *
 * ページ自体は静的に組み（検索エンジンにも全商品が見える）、絞り込みだけを
 * 画面側で行う。区分ボタンは aria-pressed で押されているかを読み上げに伝える。
 */
type Filter = ExamLevel | "all";

const ORDER: ExamLevel[] = ["zento-standard", "zento-high", "kanmuri"];

export function ExamCatalog({ exams }: { exams: MockExam[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const choose = (f: Filter) => {
    setFilter(f);
  };

  const shown = filter === "all" ? exams : exams.filter((e) => e.level === filter);
  const count = (f: Filter) => (f === "all" ? exams.length : exams.filter((e) => e.level === f).length);

  const options: { key: Filter; label: string }[] = [
    { key: "all", label: "すべて" },
    ...ORDER.map((k) => ({ key: k, label: examLevels[k].label })),
  ];

  return (
    <div>
      <div role="group" aria-label="難易度で絞り込む" className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = filter === o.key;
          return (
            <button
              key={o.key}
              type="button"
              aria-pressed={on}
              onClick={() => choose(o.key)}
              className={`inline-flex min-h-11 items-center gap-1.5 border px-4 text-[0.86rem] transition-colors ${
                on
                  ? "border-[var(--sec)] bg-[var(--sec)] font-semibold text-white"
                  : "border-rule bg-white text-ink hover:border-[var(--sec)] hover:text-[var(--sec)]"
              }`}
            >
              {o.label}
              <span className={on ? "text-white/80" : "text-ink-3"}>{count(o.key)}</span>
            </button>
          );
        })}
      </div>

      {filter !== "all" && (
        <p className="prose-ja mt-3 text-[0.86rem] leading-relaxed text-ink-2">{examLevels[filter].note}</p>
      )}

      <p className="sr-only" aria-live="polite">
        {shown.length}件の模試を表示しています
      </p>

      {shown.length ? (
        <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((e) => (
            <li key={e.id}>
              <ExamCard exam={e} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 border border-rule bg-paper-2 p-5 text-[0.9rem] text-ink-2">
          この区分の模試は準備中です。
        </p>
      )}
    </div>
  );
}

