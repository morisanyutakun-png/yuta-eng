// 原稿の LaTeX を読むための共通部品。
// extract-analysis.mjs（合格答案をつくる）と extract-series.mjs（過去問の前に）で使う。
// どちらも原稿は読むだけで、書き換えない。

/* ─────────────── 波括弧の対応取り ─────────────── */

// tex[start] が '{' のとき、対応する '}' の直後の位置と中身を返す。
export function readGroup(tex, start) {
  if (tex[start] !== "{") return null;
  let depth = 0;
  for (let i = start; i < tex.length; i++) {
    if (tex[i] === "\\") { i++; continue; }
    if (tex[i] === "{") depth++;
    else if (tex[i] === "}") {
      depth--;
      if (depth === 0) return { body: tex.slice(start + 1, i), end: i + 1 };
    }
  }
  return null;
}

/* ─────────────── インライン ─────────────── */

export const SYMBOLS = {
  "\\to": "→", "\\times": "×", "\\cdots": "…", "\\ldots": "…",
  "\\pm": "±", "\\leqq": "≦", "\\geqq": "≧", "\\le": "≦", "\\ge": "≧",
  "\\neq": "≠", "\\approx": "≒", "\\alpha": "α", "\\beta": "β",
  "\\pi": "π", "\\theta": "θ", "\\%": "%", "\\&": "&", "\\#": "#",
  // 三重大の原稿で使われている区分の丸数字
  "\\kA": "①", "\\kB": "②", "\\kC": "③",
};

// 体裁だけの命令（引数なし）。落として構わない。
const DROP_PLAIN = new Set([
  "noindent", "medskip", "smallskip", "bigskip", "small", "footnotesize",
  "scriptsize", "normalsize", "centering", "toprule", "midrule", "bottomrule",
  "endhead", "endfirsthead", "hline", "fill", "par", "textstyle", "displaystyle",
  "dsp", "quad", "qquad", "newpage", "clearpage", "vfill", "raggedright",
]);

// 引数1つを取り、中身だけ残す命令。
const UNWRAP_ONE = new Set([
  "emph", "text", "mbox", "textrm", "textsf", "mathrm", "underline", "uline",
]);

// 強調として扱う独自命令（\ans{…}＝色つき強調）
const BOLD_ONE = new Set(["ans"]);

/**
 * LaTeX のインライン片を span の配列にする。
 * span: {t:"text"|"b"|"u"|"math", v:string}
 */
export function parseSpans(tex) {
  const out = [];
  const push = (t, v) => {
    if (!v) return;
    const last = out[out.length - 1];
    if (last && last.t === t && t === "text") last.v += v;
    else out.push({ t, v });
  };

  let i = 0;
  let buf = "";
  const flush = () => { push("text", buf); buf = ""; };

  while (i < tex.length) {
    const ch = tex[i];

    if (ch === "%") { // コメント：行末まで
      const nl = tex.indexOf("\n", i);
      i = nl === -1 ? tex.length : nl + 1;
      continue;
    }

    if (ch === "$") { // インライン数式
      const close = tex.indexOf("$", i + 1);
      if (close === -1) { i++; continue; }
      flush();
      const body = tex.slice(i + 1, close).trim();
      if (body) out.push({ t: "math", v: body });
      i = close + 1;
      continue;
    }

    if (ch === "\\") {
      const m = /^\\([a-zA-Z]+)\*?/.exec(tex.slice(i));
      if (!m) {
        const esc = tex.slice(i, i + 2);
        // \, \; \: \! は空き調整。文字ではないので落とす。
        if (",;:! ".includes(esc[1])) { i += 2; continue; }
        // \& \% \# などのエスケープ
        buf += SYMBOLS[esc] ?? esc[1] ?? "";
        i += 2;
        continue;
      }
      const name = m[1];
      let j = i + m[0].length;

      if (SYMBOLS["\\" + name]) { buf += SYMBOLS["\\" + name]; i = j; continue; }

      if (name === "textbf" || name === "underLine" || BOLD_ONE.has(name)) {
        while (tex[j] === " ") j++;
        const g = readGroup(tex, j);
        if (g) {
          flush();
          const mark = name === "underLine" ? "u" : "b";
          // 入れ子は畳んで、外側の強調だけ残す。
          for (const s of parseSpans(g.body)) {
            out.push(s.t === "text" ? { t: mark, v: s.v } : s);
          }
          i = g.end;
          continue;
        }
      }

      if (UNWRAP_ONE.has(name)) {
        while (tex[j] === " ") j++;
        const g = readGroup(tex, j);
        if (g) { buf += ""; flush(); out.push(...parseSpans(g.body)); i = g.end; continue; }
      }

      if (DROP_PLAIN.has(name)) {
        // 続く空白は区切りとして 1 つ残す
        while (tex[j] === " ") j++;
        buf += " ";
        i = j;
        continue;
      }

      // 未知の命令：引数があれば中身を残し、なければ捨てる
      while (tex[j] === " ") j++;
      const g = readGroup(tex, j);
      if (g) { flush(); out.push(...parseSpans(g.body)); i = g.end; continue; }
      i = j;
      continue;
    }

    if (ch === "~") { buf += " "; i++; continue; }
    if (ch === "{" || ch === "}") { i++; continue; }

    buf += ch;
    i++;
  }
  flush();

  // 空白と約物の正規化
  for (const s of out) {
    if (s.t === "math") continue;
    s.v = s.v
      .replace(/\s+/g, " ")
      // 原稿は理数系の慣習で全角カンマ・ピリオドを使う。web の読み物としては読点・句点に直す。
      // 「1．形式」のような見出し番号は壊さないよう、数字の直後のピリオドは残す。
      .replace(/，/g, "、")
      .replace(/(?<!\d)．/g, "。")
      // 和文どうしの間に入った改行由来の空白を詰める
      .replace(/([^\x00-\x7F])[ ]+(?=[^\x00-\x7F])/g, "$1");
  }
  const trimmed = out.filter((s) => s.v.trim() !== "" || s.t === "text");
  if (trimmed.length) {
    trimmed[0].v = trimmed[0].v.replace(/^\s+/, "");
    trimmed[trimmed.length - 1].v = trimmed[trimmed.length - 1].v.replace(/\s+$/, "");
  }
  return trimmed.filter((s) => s.v !== "");
}

export function spansToText(spans) {
  return spans.map((s) => (s.t === "math" ? `$${s.v}$` : s.v)).join("").replace(/\s+/g, " ").trim();
}

/*
 * 数式を「素の文字」に落とすための対応表。
 * plainMath() 専用で、KaTeX に渡す本文の数式には触らない。
 */
const MATH_PLAIN = {
  "\\to": "→", "\\rightarrow": "→", "\\times": "×", "\\cdot": "・",
  "\\cdots": "…", "\\ldots": "…", "\\dots": "…",
  "\\pm": "±", "\\mp": "∓", "\\div": "÷",
  "\\leqq": "≦", "\\geqq": "≧", "\\leq": "≦", "\\geq": "≧",
  "\\le": "≦", "\\ge": "≧", "\\neq": "≠", "\\approx": "≒",
  "\\alpha": "α", "\\beta": "β", "\\gamma": "γ", "\\delta": "δ",
  "\\theta": "θ", "\\lambda": "λ", "\\mu": "μ", "\\sigma": "σ",
  "\\pi": "π", "\\omega": "ω", "\\varepsilon": "ε", "\\phi": "φ",
  "\\Sigma": "Σ", "\\Delta": "Δ", "\\infty": "∞",
  "\\%": "%", "\\&": "&", "\\#": "#", "\\,": "", "\\;": "", "\\!": "",
};

/**
 * インライン数式を、素のテキストとして読める形に落とす。
 *
 * 原稿は「配点は $100$ 点」「3完+$\alpha$」「満点の $72\%$」のように、
 * ただの数字や記号まで数式にしている。これを $…$ のまま平文へ入れると
 * 生の LaTeX が画面に出てしまい、逆に丸ごと削ると数字が消える。
 * 数字・ギリシャ文字・簡単な記号だけの式は文字に直し、
 * 手に負えない式（分数・積分・添字つき）は null を返して呼び出し側に捨てさせる。
 */
export function plainMath(tex) {
  let t = tex.trim();
  if (!t) return "";
  // \ansheet{11} のような組版専用の命令は、平文では意味を持たない
  if (/\\(ansheet|dsp|displaystyle|textstyle)\b/.test(t)) return null;
  for (const [k, v] of Object.entries(MATH_PLAIN)) t = t.split(k).join(v);
  t = t.replace(/[{}$]/g, "").replace(/\s+/g, "");
  // 命令が残っている＝落とし切れない式。平文には出さない。
  if (/\\[a-zA-Z]/.test(t)) return null;
  // ^ _ が残る式（x^{2}、S_{n} など）も、素の文字では読めない
  if (/[\^_]/.test(t)) return null;
  return t;
}

/**
 * 平文フィールド（要約・目標点・見出し・分野名）用の文字列化。
 * spansToText と違い、$…$ を残さない。
 */
export function spansToPlain(spans) {
  let out = "";
  for (const s of spans) {
    if (s.t !== "math") { out += s.v; continue; }
    const p = plainMath(s.v);
    if (p === null) continue; // 読めない式は落とす
    // 「満点の72%」のように和文と地続きになるので、前後の空白は足さない
    out += p;
  }
  return out
    .replace(/\s+/g, " ")
    // LaTeX の範囲ダッシュ（2023--2026）を全角波ダッシュに寄せる
    .replace(/(\d)\s*--\s*(\d)/g, "$1〜$2")
    .replace(/\(\s*〜\s*\)|（\s*〜\s*）/g, "")
    // 数式を落とした跡に残る空括弧・二重読点を掃除する
    .replace(/[（(]\s*[）)]/g, "")
    .replace(/、\s*、/g, "、")
    .replace(/\s+([、。）」])/g, "$1")
    .trim();
}

/* ─────────────── 表 ─────────────── */

export function parseTables(tex) {
  const tables = [];
  const re = /\\begin\{(tabular|longtable)\}/g;
  let m;
  while ((m = re.exec(tex))) {
    let j = m.index + m[0].length;
    while (tex[j] === " " || tex[j] === "\n") j++;
    if (tex[j] === "[") j = tex.indexOf("]", j) + 1; // longtable の位置指定
    while (tex[j] === " " || tex[j] === "\n") j++;
    const spec = readGroup(tex, j); // 列指定を読み飛ばす
    if (!spec) continue;
    const endTag = `\\end{${m[1]}}`;
    const end = tex.indexOf(endTag, spec.end);
    if (end === -1) continue;

    const body = tex.slice(spec.end, end);
    const rows = [];
    for (const raw of body.split(/\\\\/)) {
      const line = raw
        .replace(/\\cmidrule(\([^)]*\))?\{[^}]*\}/g, "")
        .replace(/\\(toprule|midrule|bottomrule|hline|endhead|endfirsthead)\b/g, "")
        .trim();
      if (!line) continue;
      // & で分割（\& は除く）
      const cells = [];
      let cur = "";
      let depth = 0;
      for (let k = 0; k < line.length; k++) {
        const c = line[k];
        if (c === "\\") { cur += line.slice(k, k + 2); k++; continue; }
        if (c === "{") depth++;
        if (c === "}") depth--;
        if (c === "&" && depth === 0) { cells.push(cur); cur = ""; continue; }
        cur += c;
      }
      cells.push(cur);
      const parsed = cells.map((c) => {
        // \multicolumn{n}{spec}{中身} は colSpan つきのセルにする
        const mc = /^\s*\\multicolumn\s*\{(\d+)\}\s*\{/.exec(c);
        if (mc) {
          const specG = readGroup(c, c.indexOf("{", mc[0].length - 1));
          const contentG = specG && readGroup(c, c.indexOf("{", specG.end));
          if (contentG) return { spans: parseSpans(contentG.body), colSpan: Number(mc[1]) };
        }
        return { spans: parseSpans(c), colSpan: 1 };
      });
      if (parsed.some((p) => p.spans.length)) rows.push(parsed);
    }
    if (rows.length < 2) continue;
    tables.push({ head: rows[0], rows: rows.slice(1), at: m.index });
  }
  return tables;
}

// 箇条書きを取り出す
export function parseLists(tex) {
  const lists = [];
  const re = /\\begin\{(enumerate|itemize)\}(\[[^\]]*\])?([\s\S]*?)\\end\{\1\}/g;
  let m;
  while ((m = re.exec(tex))) {
    const items = m[3]
      .split(/\\item\b/)
      .slice(1)
      .map((s) => parseSpans(s))
      .filter((s) => spansToText(s).length > 1);
    if (items.length) lists.push({ ordered: m[1] === "enumerate", items, at: m.index });
  }
  return lists;
}
