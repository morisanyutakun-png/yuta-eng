import type { RubricSample as RubricSampleData } from "@/data/mock-exams";
import { MathText } from "@/lib/render";

/**
 * 購入前に公開する採点基準の一部。
 *
 * PDF の採点基準（「合格答案をつくる」シリーズと同じ体裁）を、Web でも同じ並びで見せる。
 *   小問見出し（番号・配点）→ 正解 → 加点の行 → × 減点の行
 * 罫線の表にし、点数は右端にそろえる。加点と減点は記号（＋／×）と文字でも区別し、
 * 色だけに頼らない。
 */
export function RubricSample({ sample }: { sample: RubricSampleData }) {
  return (
    <div className="border border-rule bg-white">
      <div className="border-b border-rule bg-paper-2 px-5 py-4 sm:px-6">
        <p className="text-[0.75rem] font-semibold tracking-wide text-ink-3">採点基準の見本：{sample.label}</p>
        <p className="prose-ja mt-2 text-[0.92rem] leading-[1.95] text-ink">
          <MathText>{sample.problem}</MathText>
        </p>
      </div>

      <div className="space-y-7 px-5 py-6 sm:px-6">
        {sample.parts.map((part) => (
          <section key={part.no} aria-label={`小問(${part.no})の採点基準`}>
            <h4 className="flex items-baseline gap-3 text-ink">
              <span aria-hidden="true" className="inline-block h-[1.05em] w-[3px] translate-y-[0.12em] bg-ink" />
              <span className="font-semibold">({part.no})</span>
              <span className="text-[0.84rem] text-ink-3">{part.full}点</span>
            </h4>
            <p className="mt-2 text-[0.9rem] text-ink">
              <span className="mr-3 text-[0.8rem] font-semibold">正解</span>
              <MathText>{part.answer}</MathText>
            </p>

            <div className="table-wrap mt-3">
              <table className="w-full border-y-2 border-ink text-[0.84rem] sm:text-[0.86rem]">
                <caption className="sr-only">
                  小問({part.no})の加点・減点の基準
                </caption>
                <thead className="sr-only">
                  <tr>
                    <th scope="col">基準</th>
                    <th scope="col">点</th>
                  </tr>
                </thead>
                <tbody>
                  {part.plus.map((row, i) => (
                    <tr key={`p${i}`} className="border-b border-rule last:border-b-0">
                      <td className="py-2 pr-3 leading-relaxed text-ink break-words">
                        <MathText>{row.text}</MathText>
                      </td>
                      <td className="w-14 shrink-0 py-2 text-right font-semibold tabular-nums text-ink whitespace-nowrap">
                        +{row.points}
                      </td>
                    </tr>
                  ))}
                  {part.minus.map((row, i) => (
                    <tr
                      key={`m${i}`}
                      className={`border-b border-rule last:border-b-0 ${i === 0 ? "border-t border-t-ink/60" : ""}`}
                    >
                      <td className="py-2 pr-3 leading-relaxed text-ink-2 break-words">
                        <span aria-label="減点" className="mr-1.5 font-semibold text-accent">
                          ×
                        </span>
                        <MathText>{row.text}</MathText>
                      </td>
                      <td className="w-14 shrink-0 py-2 text-right font-semibold tabular-nums text-accent whitespace-nowrap">
                        {row.points.toString().replace("-", "−")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}

        <section aria-label="共通の採点原則" className="border border-rule p-4 text-[0.84rem] leading-relaxed">
          <p className="font-semibold text-ink">この模試で共通に見るところ（抜粋）</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-2">
            {sample.principles.map((p) => (
              <li key={p}>
                <MathText>{p}</MathText>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

