import { cleanHeading, sectionId } from "@/lib/data";

/**
 * 記事の目次。長いページを上から順に読ませないための入口。
 * スマホでは本文の頭に置き、画面が広いときは袖に出しっぱなしにする（variant="aside"）。
 */
export function Toc({ titles, variant = "inline" }: { titles: string[]; variant?: "inline" | "aside" }) {
  if (titles.length < 3) return null;
  const aside = variant === "aside";
  return (
    <nav
      aria-labelledby={aside ? "toc-aside-heading" : "toc-heading"}
      className={aside ? "border border-rule bg-white px-4 py-4" : "mt-7 bg-paper-2/70 px-4 py-4 sm:px-5 lg:hidden"}
    >
      <h2 id={aside ? "toc-aside-heading" : "toc-heading"} className="text-[0.68rem] font-bold tracking-wide text-ink-3">
        このページの内容
      </h2>
      <ol className="mt-2">
        {titles.map((t, i) => (
          <li key={i}>
            <a
              href={`#${sectionId(i)}`}
              className="flex gap-2.5 py-1.5 text-[0.88rem] leading-relaxed text-ink-2 transition-colors hover:text-navy"
            >
              <span aria-hidden="true" className="serif shrink-0 tabular-nums text-ink-3">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="prose-ja underline decoration-rule underline-offset-4">{cleanHeading(t)}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
