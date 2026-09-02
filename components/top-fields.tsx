import { fieldsAcrossUniversities } from "@/lib/fields";

/**
 * 全大学を横断して「その分野を出している大学が何校あるか」を見せる。
 * 大学ごとに分母（8年中／40題中…）が違うので、出題回数は足さずに校数で数えている。
 */
export function TopFields() {
  const { items, covered } = fieldsAcrossUniversities(8);
  if (items.length < 4) return null;

  return (
    <section aria-labelledby="top-fields" className="mt-10">
      <h2 id="top-fields" className="serif text-[1.05rem] text-ink">
        どの大学でも狙われる分野
      </h2>
      <p className="prose-ja mt-1.5 text-[0.8rem] text-ink-3">
        分野別の分析が取れた{covered}大学のうち、その分野を出している大学の数。
      </p>
      <ul className="mt-4 space-y-2">
        {items.map((it) => (
          <li key={it.name} className="flex items-center gap-2.5">
            <span className="w-[7.5rem] shrink-0 truncate text-[0.8rem] text-ink sm:w-[10rem]">{it.name}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-paper-2">
              <span
                className="block h-full rounded-full bg-navy"
                style={{ width: `${Math.round((it.universities / covered) * 100)}%` }}
              />
            </span>
            <span className="serif w-11 shrink-0 text-right text-[0.9rem] tabular-nums text-navy">
              {it.universities}
              <span className="ml-0.5 font-sans text-[0.62rem] font-normal text-ink-3">校</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
