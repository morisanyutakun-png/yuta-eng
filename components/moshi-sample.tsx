import { Blocks } from "@/components/solution-blocks";
import { DisplayMath, MathText } from "@/lib/render";
import { sampleCondition, sampleLead, sampleMeta, sampleSubs, sampleTail } from "@/lib/moshi/sample";

/**
 * 模試の見本。
 *
 * 申し込む前に確かめたいのは「どんな問題か」「どう採点されるのか」の2つ。
 * だから問題をそのまま出し、解答例と採点表をその下に畳んで置く。
 * 畳むのは、先に自分で解いてみたい人の邪魔をしないため。
 *
 * 採点表は**この模試の配点**で、大学が公表しているものではない。
 * そのことを表のすぐ上に書く。読み飛ばされる位置には置かない。
 */
export function MoshiSample() {
  const total = sampleSubs.reduce((n, s) => n + s.points, 0);

  return (
    <div className="mt-6 border border-rule">
      {/* 問題。本番と同じ体裁で出す */}
      <div className="border-b border-rule bg-paper-2 px-5 py-3">
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="serif text-[1.05rem] text-ink">見本問題</span>
          <span className="text-[0.76rem] text-ink-2">
            {sampleMeta.field}／{sampleMeta.points}点／解答時間の目安 {sampleMeta.minutes}分
          </span>
        </p>
      </div>

      <div className="px-5 py-6 sm:px-7">
        <div className="prose-ja text-[0.95rem] leading-[1.95] text-ink">
          <p>
            <MathText>{sampleLead}</MathText>
          </p>
          <DisplayMath>{sampleCondition}</DisplayMath>
          <p>{sampleTail}</p>
        </div>

        <ol className="mt-5 space-y-2.5">
          {sampleSubs.map((s) => (
            <li key={s.label} className="flex gap-3 text-[0.95rem] leading-[1.9] text-ink">
              <span className="serif shrink-0 text-ink-2">{s.label}</span>
              <span className="min-w-0">
                <MathText>{s.task}</MathText>
                <span className="ml-2 text-[0.72rem] text-ink-3">（{s.points}点）</span>
              </span>
            </li>
          ))}
        </ol>

        <p className="mt-5 text-[0.76rem] leading-relaxed text-ink-3">{sampleMeta.note}</p>
      </div>

      {/* 解答例。先に自分で解きたい人のために畳んでおく */}
      <details className="group border-t border-rule">
        <summary className="flex cursor-pointer list-none items-center gap-2 bg-paper-2 px-5 py-3 text-[0.88rem] font-semibold text-navy [&::-webkit-details-marker]:hidden">
          <span className="group-open:hidden">▸</span>
          <span className="hidden group-open:inline">▾</span>
          解答例を見る
        </summary>
        <div className="px-5 py-6 sm:px-7">
          {sampleSubs.map((s) => (
            <section key={s.label} className="mt-9 border-t border-rule pt-7 first:mt-0 first:border-0 first:pt-0">
              <h3 className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span className="serif text-[1.1rem] font-semibold text-accent">{s.label}</span>
                <span className="text-[0.9rem] font-semibold leading-snug text-ink">
                  <MathText>{s.task}</MathText>
                </span>
              </h3>

              <p className="mt-3 flex gap-3 border border-accent/30 bg-accent-bg px-4 py-3 text-[0.97rem] text-ink">
                <span className="mt-[0.15rem] shrink-0 text-[0.7rem] font-bold tracking-wide text-accent">答</span>
                <span className="min-w-0">
                  <MathText>{s.answer}</MathText>
                </span>
              </p>

              <div className="mt-4">
                <Blocks blocks={s.blocks} />
              </div>
            </section>
          ))}
        </div>
      </details>

      {/* 採点表。どこに点が付き、どこで引かれるかを先に見せる */}
      <details className="group border-t border-rule">
        <summary className="flex cursor-pointer list-none items-center gap-2 bg-paper-2 px-5 py-3 text-[0.88rem] font-semibold text-navy [&::-webkit-details-marker]:hidden">
          <span className="group-open:hidden">▸</span>
          <span className="hidden group-open:inline">▾</span>
          採点表を見る
        </summary>
        <div className="px-5 py-6 sm:px-7">
          <p className="prose-ja text-[0.84rem] leading-[1.9] text-ink-2">
            この1題は{total}点満点です。答えが合っているかどうかだけでなく、
            <strong className="font-semibold text-ink">どこまで書けているか</strong>で部分点を付けます。
            下の配点と基準は<strong className="font-semibold text-ink">本模試のもの</strong>で、
            大学が公表しているものではありません。
          </p>

          <ul className="mt-5 divide-y divide-rule border-y border-rule">
            {sampleSubs.map((s) => (
              <li key={s.label} className="py-5">
                <p className="flex items-baseline gap-2.5">
                  <span className="serif text-[1rem] text-ink">{s.label}</span>
                  <span className="badge badge-navy tabular-nums">{s.points}点</span>
                </p>

                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-[0.72rem] font-bold tracking-wide text-ink-3">点が付くところ</p>
                    <ul className="prose-ja mt-1.5 space-y-1.5 text-[0.84rem] leading-[1.85] text-ink-2">
                      {s.gain.map((g) => (
                        <li key={g} className="flex gap-2">
                          <span aria-hidden="true" className="shrink-0 text-navy">＋</span>
                          <span className="min-w-0">
                            <MathText>{g}</MathText>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-[0.72rem] font-bold tracking-wide text-ink-3">引かれるところ</p>
                    <ul className="prose-ja mt-1.5 space-y-1.5 text-[0.84rem] leading-[1.85] text-ink-2">
                      {s.lose.map((l) => (
                        <li key={l} className="flex gap-2">
                          <span aria-hidden="true" className="shrink-0 text-accent">−</span>
                          <span className="min-w-0">
                            <MathText>{l}</MathText>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </details>
    </div>
  );
}
