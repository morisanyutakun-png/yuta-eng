import katex from "katex";

import type { Block, Cell, Span } from "@/lib/data";
// 原稿のプリアンブルで定義されている独自命令を KaTeX 側にも用意する。
// 追加を忘れると命令がそのまま赤字で出てしまうので、
// npm run check が「数式に未定義の命令がないか」をこの表で確かめる。
import MACROS from "@/lib/katex-macros.json";

// 数式はビルド時に KaTeX で HTML 化する。クライアント JS を増やさないため。
const mathCache = new Map<string, string>();

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

/**
 * KaTeX に渡す。`display` が真のときは別行立て（displaystyle）で組む。
 *
 * 文中の数式と別行立ての数式では、分数・総和・積分の組み方が変わる。
 * 文中なら小さく詰めた形が正しいが、別行立てで同じ形にすると
 * 分数が潰れて読めない。解答解説の本体は別行立ての式なので、
 * ここを取り違えると紙の本と見た目が大きくずれる。
 */
function renderMath(tex: string, display = false): string {
  const key = display ? `D\u0000${tex}` : tex;
  const hit = mathCache.get(key);
  if (hit !== undefined) return hit;
  let html: string;
  try {
    html = katex.renderToString(protectJapanese(tex), {
      throwOnError: false,
      displayMode: display,
      output: "html",
      macros: MACROS,
      strict: false,
    });
  } catch {
    html = `<span class="font-mono text-sm">${tex.replace(/[<>&]/g, "")}</span>`;
  }
  mathCache.set(key, html);
  return html;
}

/**
 * 原稿の LaTeX では「--」が範囲のダッシュ（–）、「---」が全角ダッシュ（—）に組まれる。
 * 本文にはこの2文字・3文字のまま入っているので、表示するときに組版と同じ字形に直す。
 * （「2019--2026年度」「解答用紙 A1--1」「『---』は小問なしの大問」など）
 */
const dashes = (v: string) => v.replace(/---/g, "—").replace(/--/g, "–");

/**
 * 手で書いた解説用。`$…$` で囲んだところを数式として組み、`**…**` を強調にする。
 * 原稿から起こす Spans と違い、こちらは人が直接書く。
 *
 * 強調と数式は入れ子になりうる（`**$d=y-x$ の動き**` のように、強調が数式をまたぐ）。
 * 先に `$` で切ってしまうと、またいだ `**` が本文に残って見えてしまうので、
 * 両方をひとつの正規表現で拾い、強調の中身はもう一度この関数に通す。
 */
export function MathText({ children }: { children: string }) {
  // この関数は強調の中身で自分を呼び直すので、g つき正規表現は毎回作る
  // （使い回すと lastIndex が入れ子の呼び出しどうしで混ざる）
  const token = /(\*\*[\s\S]+?\*\*)|(\$[^$]+\$)/g;
  // \$ は素の $ として残す（私用領域の文字に退避させてから戻す）
  const src = children.replace(/\\\$/g, "\u0000");
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  const plain = (v: string, key: number) => <span key={key}>{dashes(v.replace(/\u0000/g, "$"))}</span>;

  while ((m = token.exec(src)) !== null) {
    if (m.index > last) out.push(plain(src.slice(last, m.index), out.length));
    if (m[1]) {
      out.push(
        <strong key={out.length} className="font-semibold text-ink">
          <MathText>{m[1].slice(2, -2).replace(/\u0000/g, "\\$")}</MathText>
        </strong>,
      );
    } else {
      const tex = m[2].slice(1, -1).replace(/\u0000/g, "$");
      out.push(<span key={out.length} dangerouslySetInnerHTML={{ __html: renderMath(tex) }} />);
    }
    last = m.index + m[0].length;
  }
  if (last < src.length) out.push(plain(src.slice(last), out.length));
  return <>{out}</>;
}

/** 別行立ての数式。長い式はスマートフォンで横に溢れるので、そこだけ横スクロールさせる。 */
export function DisplayMath({ children }: { children: string }) {
  return (
    <span className="-mx-5 block overflow-x-auto px-5 py-0.5 text-center sm:mx-0 sm:px-0">
      <span
        className="inline-block min-w-0 text-[1.02em]"
        dangerouslySetInnerHTML={{ __html: renderMath(children, true) }}
      />
    </span>
  );
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
            <strong key={i} className="font-semibold text-ink">
              {dashes(s.v)}
            </strong>
          );
        }
        if (s.t === "u") {
          return (
            <em
              key={i}
              className="not-italic font-semibold text-ink [background:linear-gradient(transparent_60%,rgba(154,107,47,0.22)_60%)]"
              style={{ "--mark": "color-mix(in oklch, oklch(0.85 0.14 95) 55%, transparent)" } as React.CSSProperties}
            >
              {dashes(s.v)}
            </em>
          );
        }
        return <span key={i}>{dashes(s.v)}</span>;
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
        <p className="mb-1.5 flex items-center gap-1 text-[0.68rem] text-ink-3 sm:hidden">
          <svg aria-hidden="true" viewBox="0 0 20 20" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 10h14M13 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          横にスクロールできます
        </p>
      )}
      <div className="scroll-hint -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[32rem] border-collapse text-left text-[0.78rem] leading-relaxed">
        <thead>
          <tr className="border-y border-rule bg-paper-2/60">
            {head.map((c, i) => (
              <th
                key={i}
                colSpan={c.colSpan > 1 ? c.colSpan : undefined}
                scope="col"
                className="whitespace-nowrap px-3 py-2 align-bottom text-[0.7rem] font-bold tracking-wide text-ink-2"
              >
                <Spans spans={c.spans} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-rule/70 last:border-0">
              {r.map((c, j) => (
                <td
                  key={j}
                  colSpan={c.colSpan > 1 ? c.colSpan : undefined}
                  className={
                    j === 0
                      ? "whitespace-nowrap px-3 py-2.5 align-top font-semibold text-ink"
                      : "px-3 py-2.5 align-top leading-relaxed text-ink-2"
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
            <p key={i}>
              <Spans spans={b.spans} />
            </p>
          );
        }
        if (b.type === "list") {
          const List = b.ordered ? "ol" : "ul";
          return (
            <List
              key={i}
              className={`space-y-2 border-l-2 border-rule py-1 pl-6 marker:text-ink-3 ${
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
