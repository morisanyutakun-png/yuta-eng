import katex from "katex";

import type { Block, Cell, Span } from "@/lib/data";

// 数式はビルド時に KaTeX で HTML 化する。クライアント JS を増やさないため。
const mathCache = new Map<string, string>();

// 原稿のプリアンブルで定義されている独自命令を KaTeX 側にも用意する。
const MACROS: Record<string, string> = {
  "\\kuur": "\\boxed{\\text{#1}}", // 解説中の空所記号
  "\\kubunmark": "\\text{#1}",
  "\\dsp": "\\displaystyle",
  "\\ans": "\\underline{#1}",
  "\\underLine": "\\underline{#1}",
  "\\Pt": "\\mathrm{#1}", // 点の名前
  "\\Vec": "\\overrightarrow{\\mathrm{#1}}",
  "\\Cb": "{}_{#1}\\mathrm{C}_{#2}", // 組合せ
  "\\MF": "\\frac{#1}{#2}",
  "\\Ma": "\\boxed{#1}", // マーク欄
  "\\ansheet": "\\boxed{\\textbf{#1}}", // 解答用紙番号
};

const CJK_RUN = /[぀-ヿ㐀-䶿一-鿿ｦ-ﾟ々〆ー]+/g;
const SENTINEL = "\uE000"; // TeX 本文には現れない私用領域の文字

/**
 * 数式中の裸の日本語を \text{} で包む。
 * KaTeX は数式モードの和文を警告つきで崩して出すため、事前に直しておく。
 */
function protectJapanese(tex: string): string {
  // すでに \text{…} などに入っているものは触らない。
  const kept: string[] = [];
  const masked = tex.replace(/\\(?:text|mathrm|operatorname)\s*\{[^{}]*\}/g, (m) => {
    kept.push(m);
    return `${SENTINEL}${kept.length - 1}${SENTINEL}`;
  });
  const wrapped = masked.replace(CJK_RUN, (m) => `\\text{${m}}`);
  return wrapped.replace(
    new RegExp(`${SENTINEL}(\\d+)${SENTINEL}`, "g"),
    (_, i: string) => kept[Number(i)],
  );
}

function renderMath(tex: string): string {
  const hit = mathCache.get(tex);
  if (hit !== undefined) return hit;
  let html: string;
  try {
    html = katex.renderToString(protectJapanese(tex), {
      throwOnError: false,
      displayMode: false,
      output: "html",
      macros: MACROS,
      strict: false,
    });
  } catch {
    html = `<span class="font-mono text-sm">${tex.replace(/[<>&]/g, "")}</span>`;
  }
  mathCache.set(tex, html);
  return html;
}

export function Spans({ spans }: { spans: Span[] }) {
  return (
    <>
      {spans.map((s, i) => {
        if (s.t === "math") {
          return <span key={i} dangerouslySetInnerHTML={{ __html: renderMath(s.v) }} />;
        }
        if (s.t === "b") {
          return (
            <strong key={i} className="font-semibold text-slate-900 dark:text-slate-100">
              {s.v}
            </strong>
          );
        }
        if (s.t === "u") {
          return (
            <em
              key={i}
              className="not-italic font-semibold text-slate-900 [background:linear-gradient(transparent_62%,var(--mark)_62%)] dark:text-slate-100"
              style={{ "--mark": "color-mix(in oklch, oklch(0.85 0.14 95) 55%, transparent)" } as React.CSSProperties}
            >
              {s.v}
            </em>
          );
        }
        return <span key={i}>{s.v}</span>;
      })}
    </>
  );
}

function Table({ head, rows }: { head: Cell[]; rows: Cell[][] }) {
  // 列が多い表はモバイルで横に溢れるので、スクロールできることを明示する
  const wide = head.length > 3;
  return (
    <div>
      {wide && (
        <p className="mb-1.5 flex items-center gap-1 text-[0.7rem] text-slate-400 sm:hidden">
          <svg aria-hidden="true" viewBox="0 0 20 20" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 10h14M13 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          横にスクロールできます
        </p>
      )}
      <div className="scroll-hint -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[34rem] border-collapse text-left text-[0.8rem] leading-relaxed">
        <thead>
          <tr className="border-b border-slate-300 bg-slate-50 dark:border-slate-600 dark:bg-slate-900">
            {head.map((c, i) => (
              <th
                key={i}
                colSpan={c.colSpan > 1 ? c.colSpan : undefined}
                scope="col"
                className="whitespace-nowrap px-3 py-2.5 align-bottom text-[0.72rem] font-bold tracking-wide text-slate-600 dark:text-slate-300"
              >
                <Spans spans={c.spans} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-slate-100 last:border-0 dark:border-slate-800/70">
              {r.map((c, j) => (
                <td
                  key={j}
                  colSpan={c.colSpan > 1 ? c.colSpan : undefined}
                  className={
                    j === 0
                      ? "whitespace-nowrap px-3 py-2.5 align-top font-semibold text-slate-800 dark:text-slate-200"
                      : "px-3 py-2.5 align-top leading-relaxed text-slate-700 dark:text-slate-300"
                  }
                >
                  <Spans spans={c.spans} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === "p") {
          return (
            <p key={i} className="text-[0.95rem] text-slate-800 dark:text-slate-300">
              <Spans spans={b.spans} />
            </p>
          );
        }
        if (b.type === "list") {
          const List = b.ordered ? "ol" : "ul";
          return (
            <List
              key={i}
              className={`space-y-2 rounded-xl bg-slate-50 py-4 pl-9 pr-4 text-[0.95rem] text-slate-800 marker:text-slate-400 dark:bg-slate-900/60 dark:text-slate-300 ${
                b.ordered ? "list-decimal" : "list-disc"
              }`}
            >
              {b.items.map((it, j) => (
                <li key={j}>
                  <Spans spans={it} />
                </li>
              ))}
            </List>
          );
        }
        return <Table key={i} head={b.head} rows={b.rows} />;
      })}
    </>
  );
}
