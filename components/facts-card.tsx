import type { University } from "@/lib/data";
import { yearRange } from "@/lib/data";

type Row = { label: string; value: string };

/** ページ冒頭の「ひと目でわかる」欄。原稿から確実に取れた項目だけを並べる。 */
export function FactsCard({ u }: { u: University }) {
  const rows: Row[] = [];
  if (u.facts.examTime) rows.push({ label: "試験時間", value: `${u.facts.examTime}分` });
  if (u.facts.questions) rows.push({ label: "大問数", value: `${u.facts.questions}題` });
  if (u.facts.style) rows.push({ label: "解答形式", value: u.facts.style });
  if (u.facts.points) rows.push({ label: "配点", value: `${u.facts.points}点` });
  const years = yearRange(u);
  if (years) rows.push({ label: "分析年度", value: years });

  if (rows.length < 2) return null;

  return (
    <section aria-labelledby="facts-heading" className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-900/60">
      <h2 id="facts-heading" className="text-xs font-bold tracking-wide text-slate-500 dark:text-slate-400">
        ひと目でわかる{u.name}
      </h2>
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
        {rows.map((r) => (
          <div key={r.label}>
            <dt className="text-[0.7rem] text-slate-500 dark:text-slate-400">{r.label}</dt>
            <dd className="mt-0.5 text-[1.05rem] font-bold tabular-nums text-slate-900 dark:text-slate-100">
              {r.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
