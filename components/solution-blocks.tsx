import { FigureView } from "@/components/figure";
import { DisplayMath, MathText } from "@/lib/render";
import type { Block, SubQuestion } from "@/lib/solutions/types";

/**
 * 解説の本文。
 *
 * 体裁は「合格答案をつくる」シリーズの解答解説に合わせてある。つまり、
 * 小問の中に見出しを立てず、**地の文の論証をそのまま流す**。
 * 「方針」「計算」「検算」といったラベルで区画を切ると、読む側は
 * 答案に書き写せる文章ではなく箇条書きの資料として読んでしまう。
 * 入試で書くのは地の文なので、ここでも地の文で通す。
 *
 * 補足（note）も囲み枠にせず、太字の書き出しに続けて本文として書く。
 * 枠が増えるほどページは散らかり、どこが本筋か分からなくなる。
 *
 * 別行立ての数式だけは横に溢れうるので、そこだけ横スクロールさせる。
 */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-ja space-y-3 text-[0.92rem] leading-[1.95] text-ink-2">
      {blocks.map((b, i) => {
        if (b.k === "math") return <DisplayMath key={i}>{b.t}</DisplayMath>;

        if (b.k === "figure") return <FigureView key={i} fig={b.fig} />;

        if (b.k === "steps") {
          // 順番に意味がある箇所。枠では囲わず、番号だけで本文と区別する
          return (
            <ol key={i} className="list-decimal space-y-1.5 pl-6 marker:text-ink-3">
              {b.items.map((it, j) => (
                <li key={j}>
                  <MathText>{it}</MathText>
                </li>
              ))}
            </ol>
          );
        }

        if (b.k === "note") {
          // 見出しを立てず、太字の書き出しから地の文へ続ける
          return (
            <p key={i}>
              {b.title && (
                <strong className="font-semibold text-ink">
                  <MathText>{b.title}</MathText>
                  {"　"}
                </strong>
              )}
              <MathText>{b.t}</MathText>
            </p>
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
 * 画面に出すラベルは「答」と「別解」の2つだけにしてある。
 * 方針は論証の最初の段落として地の文に溶かし、検算と注意は
 * 太字の書き出しに続く本文として書く。見出しは小問番号の行だけ。
 *
 * 答を本文より前に置くのは、答え合わせだけしたい人が
 * 長い計算を読み飛ばさずに済むようにするため。
 */
export function SubQuestionBlock({ sub, qNo }: { sub: SubQuestion; qNo: number }) {
  // 大問ページの見出しが id="q1" を使うので、小問は必ず別の id にする
  // （小問に分かれていない大問は label が空になり、そのままだと id がぶつかる）
  const id = `q${qNo}-${sub.label.replace(/[()（）]/g, "") || "all"}`;

  return (
    <section aria-labelledby={id} className="mt-10 border-t border-rule pt-7 first:mt-6 first:border-0 first:pt-0">
      <h3 id={id} className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        {sub.label && <span className="serif text-[1.15rem] font-semibold text-accent">{sub.label}</span>}
        <span className="text-[0.92rem] font-semibold leading-snug text-ink">
          <MathText>{sub.task}</MathText>
        </span>
      </h3>

      {/* ページで一番見られるのは答。ここだけ朱で囲って、走り読みでも拾えるようにする */}
      <p className="mt-3 flex gap-3 border border-accent/30 bg-accent-bg px-4 py-3 text-[0.97rem] text-ink">
        <span className="mt-[0.15rem] shrink-0 text-[0.7rem] font-bold tracking-wide text-accent">答</span>
        <span className="min-w-0">
          <MathText>{sub.answer}</MathText>
        </span>
      </p>

      {/* 方針は論証の第1段落。ラベルを付けずに地の文として読ませる */}
      <div className="prose-ja mt-4 space-y-3 text-[0.92rem] leading-[1.95] text-ink-2">
        <p>
          <MathText>{sub.approach}</MathText>
        </p>
      </div>

      <div className="mt-3">
        <Blocks blocks={sub.blocks} />
      </div>

      {/*
        検算と、答案で落としてはいけない点。見出し語は付けない。
        「確かめ。」のようなラベルを置くと、答案に書き写せる文章ではなく
        資料の付録として読まれる。本文と同じ地の文のまま、間を空けて続ける。
      */}
      {sub.check && (
        <p className="prose-ja mt-3.5 text-[0.92rem] leading-[1.95] text-ink-2">
          <MathText>{sub.check}</MathText>
        </p>
      )}

      {sub.pitfalls?.length ? (
        <div className="prose-ja mt-3.5 space-y-2.5 text-[0.92rem] leading-[1.95] text-ink-2">
          {sub.pitfalls.map((p, i) => (
            <p key={i}>
              <MathText>{p}</MathText>
            </p>
          ))}
        </div>
      ) : null}

      {sub.alts?.map((alt, i) => (
        <details key={i} className="group mt-4 border-l-2 border-rule pl-4">
          <summary className="cursor-pointer list-none text-[0.88rem] font-semibold text-navy [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">▸ </span>
            <span className="hidden group-open:inline">▾ </span>
            別解：<MathText>{alt.title}</MathText>
          </summary>
          <div className="mt-2.5">
            <Blocks blocks={alt.blocks} />
          </div>
        </details>
      ))}
    </section>
  );
}
