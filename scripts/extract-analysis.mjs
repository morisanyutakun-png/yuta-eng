// front.tex（原稿の「はじめに」）から出題分析セクションを構造化 JSON に変換する。
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { universityMeta } from "./university-meta.mjs";

const HOME = process.env.HOME ?? "/Users/moriyuuta";
const PRODUCT_CSV = join(HOME, "KDP_app/scripts/data/product-list.csv");
const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "data");

/* ─────────────── CSV ─────────────── */

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"') {
        if (text[i + 1] === '"') { cell += '"'; i++; } else quoted = false;
      } else cell += ch;
      continue;
    }
    if (ch === '"') quoted = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else if (ch !== "\r") cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.some((c) => c.trim()));
}

/* ─────────────── 波括弧の対応取り ─────────────── */

// tex[start] が '{' のとき、対応する '}' の直後の位置と中身を返す。
function readGroup(tex, start) {
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

const SYMBOLS = {
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
function parseSpans(tex) {
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

  // 空白の正規化
  for (const s of out) if (s.t !== "math") s.v = s.v.replace(/\s+/g, " ");
  const trimmed = out.filter((s) => s.v.trim() !== "" || s.t === "text");
  if (trimmed.length) {
    trimmed[0].v = trimmed[0].v.replace(/^\s+/, "");
    trimmed[trimmed.length - 1].v = trimmed[trimmed.length - 1].v.replace(/\s+$/, "");
  }
  return trimmed.filter((s) => s.v !== "");
}

function spansToText(spans) {
  return spans.map((s) => (s.t === "math" ? `$${s.v}$` : s.v)).join("").replace(/\s+/g, " ").trim();
}

/* ─────────────── 表 ─────────────── */

function parseTables(tex) {
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

/* ─────────────── 本体 ─────────────── */

// \hdA / \hdB の見出し位置を集める
function findHeadings(tex) {
  const out = [];
  const re = /\\hd([AB])\s*\{/g;
  let m;
  while ((m = re.exec(tex))) {
    const g = readGroup(tex, m.index + m[0].length - 1);
    if (!g) continue;
    out.push({ level: m[1], title: spansToText(parseSpans(g.body)), start: m.index, bodyStart: g.end });
  }
  return out;
}

// 箇条書きを取り出す
function parseLists(tex) {
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

// 書籍の中身に言及する文（サイトでは意味をなさない）
const BOOK_SENTENCE = /本書|本巻|第[０-９0-9一二三四五六七八九]+巻|付録[A-Z]|収録し|併載/;

/**
 * 段落から「本書では〜」の類の文だけを落とす。
 * 分析そのものの文は残す。全部落ちたら段落ごと捨てる。
 */
function dropBookSentences(spans) {
  // 文の区切り（。）で span 列を分割する
  const sentences = [];
  let cur = [];
  for (const s of spans) {
    if (s.t === "math") { cur.push(s); continue; }
    let rest = s.v;
    let idx;
    while ((idx = rest.indexOf("。")) !== -1) {
      cur.push({ ...s, v: rest.slice(0, idx + 1) });
      sentences.push(cur);
      cur = [];
      rest = rest.slice(idx + 1);
    }
    if (rest) cur.push({ ...s, v: rest });
  }
  if (cur.length) sentences.push(cur);

  const kept = sentences.filter((sent) => !BOOK_SENTENCE.test(spansToText(sent)));
  return kept.flat();
}

const BOOK_COL = /本書|本巻/;

/**
 * 表から書籍固有の要素を取り除く。
 * ・「本書30題中」のような列は落とす（分析の列は残す）
 * ・第1回〜第5回という「本書の回」の表そのものは落とす
 * 落とすべき表なら null を返す。
 */
function sanitizeTable(t) {
  let { head, rows } = t;

  // 「第1回」「第2回」…が並ぶ表＝本書の構成表
  const roundRows = rows.filter((r) => /^第[０-９0-9一二三四五六七八九]+回$/.test(spansToText(r[0]?.spans ?? [])));
  if (roundRows.length >= 2) return null;

  const flat = [head, ...rows].every((r) => r.every((c) => c.colSpan === 1));
  if (flat) {
    const drop = head.map((c, i) => (BOOK_COL.test(spansToText(c.spans)) ? i : -1)).filter((i) => i >= 0);
    if (drop.length) {
      const keep = (r) => r.filter((_, i) => !drop.includes(i));
      head = keep(head);
      rows = rows.map(keep);
    }
  }

  // 「本書 第1〜5回（平均）」のような、書籍側の実績を並べた行も落とす
  rows = rows.filter((r) => !BOOK_COL.test(spansToText(r[0]?.spans ?? [])));

  // セル内に混じった「本書では〜」の文だけを落とす（分析の文は残す）
  const clean = (r) => r.map((c) => (BOOK_COL.test(spansToText(c.spans)) ? { ...c, spans: dropBookSentences(c.spans) } : c));
  rows = rows.map(clean).filter((r) => r.some((c) => c.spans.length));

  if (head.length < 2 || rows.length === 0) return null;
  if (BOOK_COL.test(spansToText(head[0]?.spans ?? []))) return null;
  return { ...t, head, rows };
}

// 見出し配下の本文を、段落・表・箇条書きの並びに落とす
function blocksFor(tex, from, to) {
  const slice = tex.slice(from, to);
  const tables = parseTables(slice);
  const lists = parseLists(slice);

  // 表・箇条書きの領域を伏せてから段落を拾う
  let masked = slice;
  const spans = [];
  const envRe = /\\begin\{(tabular|longtable|center|minipage|enumerate|itemize)\}(\[[^\]]*\])?[\s\S]*?\\end\{\1\}/g;
  let em;
  while ((em = envRe.exec(slice))) spans.push([em.index, em.index + em[0].length]);
  for (const [s, e] of spans.reverse()) masked = masked.slice(0, s) + " ".repeat(e - s) + masked.slice(e);

  // 元の出現順を保って並べ直す
  const blocks = [];
  for (const chunk of masked.split(/\n\s*\n/)) {
    const p = dropBookSentences(parseSpans(chunk));
    if (spansToText(p).length > 8) blocks.push({ type: "p", spans: p });
  }
  for (const l of lists) {
    const items = l.items.map((it) => dropBookSentences(it)).filter((it) => spansToText(it).length > 1);
    if (items.length) blocks.push({ type: "list", ordered: l.ordered, items });
  }
  for (const t of tables) {
    const clean = sanitizeTable(t);
    if (clean) blocks.push({ type: "table", head: clean.head, rows: clean.rows });
  }
  return blocks;
}

function extract(dir) {
  const tex = readFileSync(join(HOME, dir, "front.tex"), "utf8");
  const heads = findHeadings(tex);
  if (!heads.length) return null;

  // 「1．…の出題分析」から次の \hdA までが分析セクション
  const aIdx = heads.findIndex((h) => h.level === "A");
  if (aIdx === -1) return null;
  const analysisHead = heads[aIdx];
  const nextA = heads.findIndex((h, i) => i > aIdx && h.level === "A");
  const endPos = nextA === -1 ? tex.length : heads[nextA].start;

  const subs = [];
  const inRange = heads.filter((h, i) => i > aIdx && h.start < endPos && h.level === "B");
  for (let i = 0; i < inRange.length; i++) {
    const h = inRange[i];
    const to = i + 1 < inRange.length ? inRange[i + 1].start : endPos;
    subs.push({ title: h.title, blocks: blocksFor(tex, h.bodyStart, to) });
  }

  // 「本書について」（分析セクションより前の \hdB）は除外済み
  const lead = blocksFor(tex, analysisHead.bodyStart, inRange.length ? inRange[0].start : endPos);

  return { analysisTitle: analysisHead.title, lead, sections: subs };
}

/* ─────────────── 表の役割づけ ─────────────── */

const cellText = (c) => (c ? spansToText(c.spans) : "");

// 年度が縦に並ぶ表＝年度別出題一覧
const isYearTable = (t) => t.rows.filter((r) => /^(19|20)\d\d/.test(cellText(r[0]))).length >= 3;

// 「分野 / 回数 / 特徴」の表＝分野別頻度
const isFieldTable = (t) => /分野|項目|単元/.test(cellText(t.head[0])) && !isYearTable(t);

/* ─────────────── 実行 ─────────────── */

// 本書の構成に関する節はサイトには載せない（分析だけを出す）。
const BOOK_ONLY = /回の並び|校正|本書|付録|使い方|収録/;

const volNo = (t) => Number((t.match(/Vol\.?\s*(\d+)/) || [])[1] ?? 1);

// まず原稿フォルダごとに巻をまとめ、巻数順に並べる。
const rows = parseCsv(readFileSync(PRODUCT_CSV, "utf8"));
const byFolder = new Map();
const skipped = [];

for (const r of rows.slice(1)) {
  const [title, asin, pages, , , price, pdf] = r;
  const dir = pdf.replace(/\/[^/]*$/, "");
  const folder = dir.split("/")[0];
  if (!universityMeta[folder]) { skipped.push({ title, why: "メタ未登録（英語など）" }); continue; }
  if (!byFolder.has(folder)) byFolder.set(folder, []);
  byFolder.get(folder).push({
    dir,
    title: title.trim(),
    asin: asin.trim(),
    price: Number(price) || null,
    pages: Number(pages) || null,
    amazonUrl: `https://www.amazon.co.jp/dp/${asin.trim()}`,
  });
}

const items = [];

for (const [folder, rawBooks] of byFolder) {
  const meta = universityMeta[folder];
  const books = rawBooks.sort((a, b) => volNo(a.title) - volNo(b.title));

  // 巻ごとに「はじめに」を読み、分析が最も充実したものを代表に選ぶ。
  // （第2巻以降は「〜を受ける前に」など分析表を持たない構成のことがある）
  let best = null;
  for (const b of books) {
    let data;
    try {
      data = extract(b.dir);
    } catch (e) {
      skipped.push({ title: b.title, why: e.message });
      continue;
    }
    if (!data) continue;
    const tables = [...data.lead, ...data.sections.flatMap((s) => s.blocks)].filter((x) => x.type === "table");
    const score = (tables.some(isYearTable) ? 100 : 0) + tables.length + data.sections.length;
    if (!best || score > best.score) best = { data, tables, score, from: b.title };
  }
  if (!best) { skipped.push({ title: folder, why: "分析セクションを取得できず" }); continue; }

  const { data, tables } = best;
  items.push({
    ...meta,
    folder,
    analysisTitle: data.analysisTitle,
    // 分析対象年度（「（2019--2026年度）」等）を見出しから拾う
    years: (data.analysisTitle.match(/((?:19|20)\d\d)\s*[-–—]+\s*((?:19|20)\d\d)/) || []).slice(1),
    lead: data.lead,
    sections: data.sections.filter((s) => !BOOK_ONLY.test(s.title)),
    yearTable: tables.find(isYearTable) ?? null,
    fieldTable: tables.find(isFieldTable) ?? null,
    books: books.map((b) => ({ title: b.title, asin: b.asin, price: b.price, pages: b.pages, amazonUrl: b.amazonUrl })),
  });
}

mkdirSync(join(OUT_DIR), { recursive: true });
writeFileSync(join(OUT_DIR, "analysis.json"), JSON.stringify(items, null, 2));

/* ─────────────── 検証 ─────────────── */

const bookCount = items.reduce((a, g) => a + g.books.length, 0);
console.log(`大学ページ: ${items.length} 件 / 書籍: ${bookCount} 冊`);
for (const s of skipped) console.log("  skip:", s.title, "|", s.why);

const problems = [];
for (const g of items) {
  if (!g.yearTable) problems.push(`${g.name}: 年度別表なし`);
  if (!g.sections.length) problems.push(`${g.name}: 分析セクションなし`);
  if (/tabular|enumerate|linewidth/.test(JSON.stringify(g))) problems.push(`${g.name}: LaTeX残渣`);
}
const slugs = items.map((g) => g.slug);
const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
if (dupes.length) problems.push(`slug 重複: ${dupes.join(", ")}`);

if (problems.length) {
  console.log("\n要確認:");
  for (const p of problems) console.log("  -", p);
} else {
  console.log("検証: 問題なし");
}
