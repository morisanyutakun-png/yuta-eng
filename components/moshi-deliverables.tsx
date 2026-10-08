import { moshi, returnLine } from "@/lib/moshi/config";
import { InfoDetails } from "@/components/info-details";

/**
 * 受験後にお返しするもの。
 *
 * この模試でいちばんの中身なので、要項の1行で済ませず項目として出す。
 * 点数を返すだけの模試と何が違うのかは、ここを読めば分かる。
 *
 * 中身は data/moshi.json に置いてあり、画面・先生向けの案内・
 * 確認メールで同じものを使う。言い方が場所ごとにずれないようにするため。
 */
export function MoshiDeliverables() {
  return (
    <>
      <ul className="mt-4 grid grid-cols-2 gap-px border border-rule bg-rule">
        {moshi.deliverables.map((d) => <li key={d.h} className="bg-white px-3 py-3 text-[0.8rem] font-semibold leading-relaxed text-ink">{d.h}</li>)}
      </ul>
      <InfoDetails title="返却内容を詳しく見る">
      <ol className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
        {moshi.deliverables.map((d, i) => (
          <li key={d.h} className="bg-white px-5 py-4">
            <p className="text-[0.68rem] font-bold tabular-nums tracking-[0.1em] text-[var(--sec)]">
              0{i + 1}
            </p>
            <p className="mt-1 text-[0.95rem] font-semibold text-ink">{d.h}</p>
            <p className="prose-ja mt-1.5 text-[0.85rem] leading-[1.9] text-ink-2">{d.body}</p>
          </li>
        ))}
      </ol>
      <p className="prose-ja mt-4 max-w-[40rem] text-[0.86rem] leading-[1.9] text-ink-2">
        {returnLine}
      </p>
      </InfoDetails>
    </>
  );
}
