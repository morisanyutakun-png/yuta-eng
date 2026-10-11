import type { FieldChart as Data } from "@/lib/data";
import { fieldChartCaption } from "@/lib/data";

/**
 * 分野別の出題頻度。表よりも偏りが一目で分かるので、棒で見せる。
 * 数値は原稿の分析表そのままで、棒の長さは最大値を基準にした相対長。
 *
 * 分母は「題数で数えた表」のときだけ出す。
 * 原稿には「8年中」という見出しの表もあるが、そこに並ぶ数字は年数ではなく題数で、
 * 分母として扱うと「微分積分 16 / 8年」のような表示になってしまう。
 */
export function FieldChart({
  data,
  name,
  yearCount,
}: {
  data: Data;
  name: string;
  yearCount: number | null;
}) {
  const max = Math.max(...data.items.map((i) => i.count));
  const denom = data.kind === "question" ? data.denom : null;

  return (
    <section aria-labelledby="field-heading" className="mt-12">
      <h2 id="field-heading" className="rule-mark serif text-[1.3rem] leading-snug text-ink sm:text-[1.5rem]">
        {name}の頻出分野
      </h2>
      <p className="prose-ja mt-2.5 text-[0.93rem] text-ink-2">
        {fieldChartCaption(data, yearCount)}棒が長い分野ほど、繰り返し狙われています。
      </p>

      <ol className="mt-5 space-y-3">
        {data.items.map((it) => {
          const pct = Math.round((it.count / max) * 100);
          return (
            <li key={it.label}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[0.93rem] font-semibold leading-snug text-ink">{it.label}</span>
                <span className="shrink-0 serif text-[1.1rem] tabular-nums text-navy">
                  {it.count}
                  <span className="ml-0.5 font-sans text-[0.75rem] font-normal text-ink-3">
                    {denom ? `題/${denom}題` : "題"}
                  </span>
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-paper-2">
                <div
                  className="h-full rounded-full bg-navy"
                  style={{ width: `${pct}%` }}
                  role="img"
                  aria-label={`${it.label} ${it.count}題`}
                />
              </div>
              {/*
                原稿から拾った説明が、助詞から始まっていることがある
                （「三角関数」＋「の置換、加法定理…」のように、分野名のところで切れている）。
                そのまま出すと助詞で始まる文になって読めないので、分野名を頭に補う。
              */}
              {it.note && (
                <p className="prose-ja mt-1.5 text-[0.86rem] text-ink-3">
                  {/^[のはがをにでとやへも]/.test(it.note) ? `${it.label}${it.note}` : it.note}
                </p>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
