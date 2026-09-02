import type { University } from "@/lib/data";

type Row = { label: string; value: string; sub?: string };

/** ページ冒頭の要点。原稿から確実に取れた項目だけを並べる。 */
export function FactsCard({ u }: { u: University }) {
  const rows: Row[] = [];
  const { examTime, questions, style, points } = u.facts;

  if (examTime) rows.push({ label: "試験時間", value: String(examTime), sub: "分" });
  if (questions) rows.push({ label: "大問数", value: String(questions), sub: "題" });
  if (examTime && questions) {
    rows.push({ label: "1題あたり", value: String(Math.round(examTime / questions)), sub: "分" });
  }
  if (points) rows.push({ label: "配点", value: String(points), sub: "点" });
  if (style) rows.push({ label: "解答形式", value: style });
  // 3列に収まるよう「2019–26」と短く出す（正式な表記は本文側にある）
  if (u.years.length === 2) {
    rows.push({ label: "分析年度", value: `${u.years[0]}–${u.years[1].slice(2)}`, sub: "年度" });
  }

  if (rows.length < 2) return null;

  return (
    <section aria-labelledby="facts-heading" className="border-y border-rule py-5">
      <h2 id="facts-heading" className="sr-only">
        {u.name}の試験形式
      </h2>
      <dl className="grid grid-cols-3 gap-x-3 gap-y-5">
        {rows.map((r) => (
          <div key={r.label}>
            <dt className="text-[0.68rem] text-ink-3">{r.label}</dt>
            <dd className="serif mt-1 leading-none text-ink">
              <span
                className={
                  // 数値は大きく、「完全記述式」「2019–26」のような長い値は本文寄りの大きさに
                  r.value.length <= 3 && r.sub ? "text-[1.6rem] tabular-nums" : "text-[1.05rem] tabular-nums"
                }
              >
                {r.value}
              </span>
              {r.sub && <span className="ml-0.5 font-sans text-[0.72rem] font-normal text-ink-3">{r.sub}</span>}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
