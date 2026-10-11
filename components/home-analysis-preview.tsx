import Link from "next/link";

import { getUniversity, universities, yearRange } from "@/lib/data";

/** 掲載データを小さく抜粋し、スマホでも分析の中身を先に見せる。 */
export function HomeAnalysisPreview() {
  const university = getUniversity("nagoya-rikei") ?? universities.find((u) => u.fieldChart);
  if (!university?.fieldChart?.items.length) return null;
  const fields = [...university.fieldChart.items].sort((a, b) => b.count - a.count).slice(0, 2);
  const max = Math.max(...fields.map((field) => field.count));

  return (
    <Link href={`/univ/${university.slug}`} className="group mt-3 block border border-rule bg-white px-3 py-2.5 text-ink transition-colors hover:border-navy sm:px-4 sm:py-3" aria-label={`${university.university}${university.course}数学の出題分析を読む`}>
      <div className="flex items-center justify-between gap-2 text-[0.75rem] leading-relaxed text-ink-3">
        <span>掲載中の分析の一例</span>
        <span>{yearRange(university)}</span>
      </div>
      <div className="mt-0.5 flex items-baseline justify-between gap-2">
        <p className="text-[0.86rem] font-semibold group-hover:text-navy">{university.university} {university.course}数学</p>
        <span className="shrink-0 text-[0.75rem] text-ink-2">
          {university.facts.examTime && `${university.facts.examTime}分`}
          {!university.facts.selective && university.facts.questions && `・大問${university.facts.questions}題`}
          <span className="ml-2 text-navy" aria-hidden="true">→</span>
        </span>
      </div>
      <ul className="mt-2 space-y-1.5" aria-label="頻出分野の出題数（掲載分析から抜粋）">
        {fields.map((field) => (
          <li key={field.label} className="grid grid-cols-[5rem_minmax(0,1fr)_2rem] items-center gap-2 text-[0.75rem] leading-snug">
            <span>{field.label.split(/[（(]/)[0]}</span>
            <span className="h-1.5 bg-paper-2" aria-hidden="true"><span className="block h-full bg-navy/80" style={{ width: `${max > 0 ? (field.count / max) * 100 : 0}%` }} /></span>
            <span className="text-right tabular-nums text-navy">{field.count}題</span>
          </li>
        ))}
      </ul>
    </Link>
  );
}
