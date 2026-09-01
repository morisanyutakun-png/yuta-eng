import Link from "next/link";

import type { University } from "@/lib/data";
import { yearRange } from "@/lib/data";

export function UniversityCard({ u }: { u: University }) {
  const years = yearRange(u);
  return (
    <Link
      href={`/univ/${u.slug}`}
      className="group flex flex-col rounded-lg border border-slate-200 p-3.5 transition-colors hover:border-sky-400 hover:bg-sky-50/50 dark:border-slate-800 dark:hover:border-sky-700 dark:hover:bg-sky-950/30"
    >
      <span className="text-[0.92rem] font-semibold text-slate-900 group-hover:text-sky-800 dark:text-slate-100 dark:group-hover:text-sky-300">
        {u.name}
      </span>
      <span className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        {[years, u.books.length > 1 ? `全${u.books.length}巻` : null].filter(Boolean).join("・")}
      </span>
    </Link>
  );
}
