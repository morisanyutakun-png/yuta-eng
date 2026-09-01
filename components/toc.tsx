import { cleanHeading, sectionId } from "@/lib/data";

/** 記事の目次。長いページを上から順に読ませないための入口。 */
export function Toc({ titles }: { titles: string[] }) {
  if (titles.length < 3) return null;
  return (
    <nav aria-labelledby="toc-heading" className="rounded-2xl border border-slate-200 p-4 sm:p-5 dark:border-slate-800">
      <h2 id="toc-heading" className="text-xs font-bold tracking-wide text-slate-500 dark:text-slate-400">
        目次
      </h2>
      <ol className="mt-2.5 space-y-0.5">
        {titles.map((t, i) => (
          <li key={i}>
            <a
              href={`#${sectionId(i)}`}
              className="head-ja flex gap-2.5 rounded-lg px-2 py-2 text-[0.9rem] leading-relaxed text-slate-700 transition-colors hover:bg-sky-50 hover:text-sky-800 dark:text-slate-300 dark:hover:bg-sky-950/40 dark:hover:text-sky-300"
            >
              <span className="shrink-0 tabular-nums font-semibold text-slate-400">{i + 1}.</span>
              <span>{cleanHeading(t)}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
