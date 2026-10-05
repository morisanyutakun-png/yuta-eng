import { DisplayMath, MathText } from "@/lib/render";
import type { Block, SubQuestion } from "@/lib/solutions/types";

/**
 * 解説の本文。
 *
 * 長い計算過程をスマートフォンで読むことを前提にしている。
 * 別行立ての数式だけは横に溢れうるので、そこだけ横スクロールさせ（DisplayMath）、
 * 本文そのものは画面幅に収める。
 */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-ja space-y-3 text-[0.92rem] leading-[1.95] text-ink-2">
      {blocks.map((b, i) => {
        if (b.k === "math") return <DisplayMath key={i}>{b.t}</DisplayMath>;
        if (b.k === "steps") {
          return (
            <ol key={i} className="list-decimal space-y-1.5 border-l-2 border-rule py-1 pl-6 marker:text-ink-3">
              {b.items.map((it, j) => (
                <li key={j}>
                  <MathText>{it}</MathText>
                </li>
              ))}
            </ol>
          );
        }
        if (b.k === "note") {
          return (
            <aside key={i} className="border-l-2 border-navy/35 bg-paper-2/60 px-4 py-3 text-[0.86rem]">
              {b.title && (
                <p className="mb-1 font-semibold text-ink">
                  <MathText>{b.title}</MathText>
                </p>
              )}
              <p>
                <MathText>{b.t}</MathText>
              </p>
            </aside>
          );
        }
        return (
          <p key={i}>
            <MathText>{b.t}</MathText>
          </p>
        );
      })}
    </div>
  );
}

/**
 * 小問ひとつ分。
 *
 * 順番は「何を求めるか → 答 → なぜその方針か → 計算 → 別解 → 検算 → つまずきやすい点」。
 * 答えを先に置くのは、答え合わせだけしたい人がスクロールしなくて済むようにするため。
 */
export function SubQuestionBlock({ sub, qNo }: { sub: SubQuestion; qNo: number }) {
  // 大問ページの見出しが id="q1" を使うので、小問は必ず別の id にする
  // （小問に分かれていない大問は label が空になり、そのままだと id がぶつかる）
  const id = `q${qNo}-${sub.label.replace(/[()（）]/g, "") || "all"}`;
  return (
    <section aria-labelledby={id} className="mt-9 first:mt-6">
      <h3 id={id} className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        {sub.label && <span className="serif text-[1.08rem] font-semibold text-navy">{sub.label}</span>}
        <span className="text-[0.92rem] font-semibold leading-snug text-ink">
          <MathText>{sub.task}</MathText>
        </span>
      </h3>

      <p className="mt-2.5 border-y border-rule bg-paper-2/70 px-4 py-2.5 text-[0.95rem] text-ink">
        <span className="mr-2 text-[0.68rem] font-bold tracking-wide text-accent">答</span>
        <MathText>{sub.answer}</MathText>
      </p>

      <p className="prose-ja mt-3.5 text-[0.9rem] leading-[1.9] text-ink-2">
        <span className="mr-1.5 text-[0.68rem] font-bold tracking-wide text-ink-3">方針</span>
        <MathText>{sub.approach}</MathText>
      </p>

      <div className="mt-3.5">
        <Blocks blocks={sub.blocks} />
      </div>

      {sub.alts?.map((alt, i) => (
        <details key={i} className="mt-4 border border-rule bg-paper-2/40">
          <summary className="cursor-pointer px-4 py-2.5 text-[0.86rem] font-semibold text-navy">
            別解 <MathText>{alt.title}</MathText>
          </summary>
          <div className="border-t border-rule px-4 py-3">
            <Blocks blocks={alt.blocks} />
          </div>
        </details>
      ))}

      {sub.check && (
        <div className="mt-4 border-l-2 border-accent/50 bg-accent/5 px-4 py-3">
          <p className="mb-1 text-[0.72rem] font-bold tracking-wide text-ink-2">検算</p>
          <p className="prose-ja text-[0.86rem] leading-[1.9] text-ink-2">
            <MathText>{sub.check}</MathText>
          </p>
        </div>
      )}

      {sub.pitfalls?.length ? (
        <div className="mt-4">
          <p className="mb-1.5 text-[0.72rem] font-bold tracking-wide text-ink-2">答案で省略しない方がよい点</p>
          <ul className="prose-ja list-disc space-y-1.5 pl-5 text-[0.86rem] leading-[1.9] text-ink-2 marker:text-ink-3">
            {sub.pitfalls.map((p, i) => (
              <li key={i}>
                <MathText>{p}</MathText>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
