import type { FieldChart as Data } from "@/lib/data";

/**
 * 分野別の出題頻度。表よりも偏りが一目で分かるので、棒で見せる。
 * 数値は原稿の分析表そのままで、割合は最大値を基準にした相対長。
 */
export function FieldChart({ data, name }: { data: Data; name: string }) {
  const max = Math.max(...data.items.map((i) => i.count));
  // 「8年中」「40題中」から分母と単位を取り出し、「8 / 8年」の形で示す
  const m = data.unit.match(/(\d+)\s*([^\d]*?)中/);
  const denom = m ? `${m[1]}${m[2] || "題"}` : "";
  const unit = m ? m[2] || "題" : "題";

  return (
    <section aria-labelledby="field-heading" className="mt-12">
      <h2 id="field-heading" className="rule-mark serif text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
        {name}で狙われる分野
      </h2>
      <p className="prose-ja mt-2.5 text-[0.9rem] text-ink-2">
        {denom ? `${denom}のうち何回出たか。` : ""}棒が長い分野ほど、繰り返し狙われています。
      </p>

      <ol className="mt-5 space-y-3">
        {data.items.map((it) => {
          const pct = Math.round((it.count / max) * 100);
          return (
            <li key={it.label}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[0.88rem] font-semibold leading-snug text-ink">{it.label}</span>
                <span className="shrink-0 serif text-[1.1rem] tabular-nums text-navy">
                  {it.count}
                  {denom && (
                    <span className="ml-0.5 font-sans text-[0.68rem] font-normal text-ink-3">/{denom}</span>
                  )}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-paper-2">
                <div
                  className="h-full rounded-full bg-navy"
                  style={{ width: `${pct}%` }}
                  role="img"
                  aria-label={`${it.label} ${it.count}${unit}`}
                />
              </div>
              {it.note && <p className="prose-ja mt-1.5 text-[0.8rem] text-ink-3">{it.note}</p>}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
