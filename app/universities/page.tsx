import type { Metadata } from "next";
import Link from "next/link";

import { byGroup, summarize, universities, yearRange } from "@/lib/data";
import { groupOrder, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "大学一覧",
  description: `${site.name}で分析している${universities.length}大学の一覧。旧帝大・難関国公立から医学部・私立大まで、大学ごとの数学の出題形式と分野の偏りを掲載しています。`,
  alternates: { canonical: "/universities" },
};

export default function UniversitiesPage() {
  const groups = byGroup(groupOrder);

  return (
    <div className="mx-auto max-w-4xl px-4">
      <nav aria-label="パンくず" className="pt-6 text-xs text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-sky-700 dark:hover:text-sky-400">
          トップ
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-slate-700 dark:text-slate-300">大学一覧</span>
      </nav>

      <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">大学一覧</h1>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-slate-700 dark:text-slate-300">
        分析している{universities.length}大学です。大学名をたどると、年度別の出題一覧と分野別の頻度を見られます。
      </p>

      {groups.map(([group, list]) => (
        <section key={group} className="mt-10">
          <h2 className="border-b border-slate-200 pb-2 text-lg font-bold text-slate-900 dark:border-slate-800 dark:text-slate-100">
            {group}
          </h2>
          <ul className="mt-1 divide-y divide-slate-100 dark:divide-slate-800/70">
            {list.map((u) => (
              <li key={u.slug}>
                <Link href={`/univ/${u.slug}`} className="block py-3.5 transition-colors hover:bg-sky-50/50 dark:hover:bg-sky-950/20">
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{u.name}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {[u.university, yearRange(u)].filter(Boolean).join("・")}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-[0.83rem] leading-relaxed text-slate-600 dark:text-slate-400">
                    {summarize(u, 120)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
