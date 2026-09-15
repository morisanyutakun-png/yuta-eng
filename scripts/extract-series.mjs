// 「過去問の前に」シリーズ（分野別完成演習・志望校診断模試）の原稿から、
// サイトに載せる構成情報を data/series.json に書き出す。
//
// 原稿は読むだけで書き換えない。本文の問題・解答は一切取り出さず、
// 「はじめに」と章扉（分野・出題傾向・収録問題の題材名・目標時間）だけを使う。
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { parseLists, parseSpans, parseTables, readGroup, spansToPlain } from "./lib/latex.mjs";
import { kanseiBooks, shindanBook } from "./series-meta.mjs";

const HOME = process.env.HOME ?? "/Users/moriyuuta";
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "series.json");

const problems = [];
const warn = (msg) => problems.push(msg);

/* ─────────────── 共通 ─────────────── */

const read = (p) => readFileSync(p, "utf8");
const plain = (tex) => spansToPlain(parseSpans(tex)).replace(/\s+/g, "");
const toNum = (s) => Number(String(s).replace(/[^\d]/g, "")) || 0;

/** `\cmd{...}` の中身を順に返す（入れ子の波括弧に対応）。 */
function groupsOf(tex, cmd) {
  const out = [];
  const re = new RegExp(`\\\\${cmd}\\s*\\{`, "g");
  let m;
  while ((m = re.exec(tex))) {
    const args = [];
    let j = m.index + m[0].length - 1;
    // 引数が続くかぎり読む（\Chap{1}{分野}{範囲 ─ 見出し} のような複数引数）
    while (tex[j] === "{") {
      const g = readGroup(tex, j);
      if (!g) break;
      args.push(g.body);
      j = g.end;
      while (tex[j] === " ") j++;
    }
    out.push(args);
  }
  return out;
}

/** 見出し \hdB{…} から次の見出しまでの本文。 */
function sectionBody(tex, titleStart) {
  const i = tex.indexOf(`\\hdB{${titleStart}`);
  if (i === -1) return "";
  // 見出しの文字列そのものは本文に含めない
  const title = readGroup(tex, i + 4);
  const rest = tex.slice(title ? title.end : i + 5);
  const next = rest.search(/\\hd[AB]\{/);
  return next === -1 ? rest : rest.slice(0, next);
}

/**
 * 地の文を段落と箇条書きのブロックにする（表は扱わない）。
 * lib/render.tsx の Blocks でそのまま描ける形。
 */
function blocksOf(tex) {
  const src = tex.replace(/(^|[^\\])%.*$/gm, "$1");
  const lists = parseLists(src);
  const blocks = [];
  let cursor = 0;
  const pushParas = (chunk) => {
    for (const para of chunk.split(/\n\s*\n|\\par\b|\\medskip|\\smallskip|\\bigskip/)) {
      const spans = parseSpans(para.replace(/\\noindent/g, ""));
      if (spansToPlain(spans).replace(/\s+/g, "").length > 1) blocks.push({ type: "p", spans });
    }
  };
  for (const l of lists) {
    pushParas(src.slice(cursor, l.at));
    blocks.push({ type: "list", ordered: l.ordered, items: l.items });
    const end = src.indexOf(`\\end{${l.ordered ? "enumerate" : "itemize"}}`, l.at);
    cursor = end === -1 ? src.length : end + 14;
  }
  pushParas(src.slice(cursor));
  return blocks;
}

/**
 * span 列の後始末。原稿の「$2019$--$2026$」は数式・「--」・数式に分かれるので、
 * 文字の側の「--」を波ダッシュに直す。
 */
function tidySpans(spans) {
  return spans.map((s) => (s.t === "math" ? s : { ...s, v: s.v.replace(/\s*--\s*/g, "〜") }));
}
function tidyBlocks(blocks) {
  return blocks.map((b) =>
    b.type === "p" ? { ...b, spans: tidySpans(b.spans) } : b.type === "list" ? { ...b, items: b.items.map(tidySpans) } : b,
  );
}

/** 平文フィールドに \ や $ が残っていないか（生の LaTeX を画面に出さないため）。 */
function assertPlain(label, s) {
  if (/[\\$]/.test(s)) warn(`${label}: LaTeX が残っている「${s.slice(0, 40)}」`);
  return s;
}

/* ─────────────── 分野別完成演習 ─────────────── */

/**
 * 「2.1 章の並び」の表を読む。原稿によって列の組み方が3通りある。
 *   標準 | やや難 | 本番接続 | 小問      （京大）
 *   小問 | 標準／やや難／本番接続        （阪大）
 *   標準 | やや難／本番接続              （その他）
 */
function chapterTable(front) {
  const t = parseTables(front).find((x) => x.head.some((c) => spansToPlain(c.spans).includes("題数")));
  if (!t) return null;
  const head = t.head.map((c) => spansToPlain(c.spans).replace(/\s+/g, ""));
  const col = (name) => head.findIndex((h) => h === name);
  const cell = (r, i) => (i >= 0 && r[i] ? spansToPlain(r[i].spans).replace(/\s+/g, "") : "");

  const parseRow = (r) => {
    const levels = { standard: 0, hard: 0, honban: 0 };
    const all = col("標準／やや難／本番接続");
    if (all >= 0) {
      const [a, b, c] = cell(r, all).split("／").map(toNum);
      Object.assign(levels, { standard: a, hard: b, honban: c });
    } else {
      levels.standard = toNum(cell(r, col("標準")));
      const hb = col("やや難／本番接続");
      if (hb >= 0) {
        const [b, c] = cell(r, hb).split("／").map(toNum);
        Object.assign(levels, { hard: b, honban: c });
      } else {
        levels.hard = toNum(cell(r, col("やや難")));
        levels.honban = toNum(cell(r, col("本番接続")));
      }
    }
    return {
      no: toNum(cell(r, col("章"))),
      field: cell(r, col("分野")).replace(/，/g, "、"),
      range: cell(r, col("範囲")),
      problems: toNum(cell(r, col("題数"))),
      subquestions: col("小問") >= 0 ? toNum(cell(r, col("小問"))) : null,
      minutes: toNum(cell(r, col("目標時間"))),
      ...levels,
    };
  };

  const rows = t.rows.filter((r) => cell(r, col("章")) || cell(r, col("分野")));
  const total = rows.find((r) => cell(r, col("分野")) === "計");
  return {
    chapters: rows.filter((r) => /^\d+$/.test(cell(r, col("章")))).map(parseRow),
    total: total ? parseRow(total) : null,
  };
}

/** 章扉（chN_q.tex）から、分野名・一言・出題傾向・収録問題を読む。 */
function chapterOpener(tex, file) {
  const chap = groupsOf(tex, "Chap")[0];
  if (!chap || chap.length < 3) {
    warn(`${file}: \\Chap が読めない`);
    return null;
  }
  const [range, lead] = plain(chap[2]).split("─").map((s) => s.trim());
  const koryaku = groupsOf(tex, "koryaku")[0]?.[0] ?? "";
  const shomondai = groupsOf(tex, "shomondai")[0]?.[0] ?? "";

  const list = [];
  for (const raw of shomondai.split(/\\\\/)) {
    const cells = raw.split(/(?<!\\)&/);
    if (cells.length < 4) continue;
    const id = plain(cells[0]);
    if (!/^\d+-\d+$/.test(id)) continue;
    list.push({
      id,
      level: plain(cells[1]),
      title: tidySpans(parseSpans(cells[2])),
      minutes: toNum(plain(cells[3])),
    });
  }

  return {
    no: toNum(chap[0]),
    field: assertPlain(file, plain(chap[1])),
    range: assertPlain(file, range ?? ""),
    lead: assertPlain(file, lead ?? ""),
    strategy: tidyBlocks(blocksOf(koryaku)),
    problems: list,
  };
}

/**
 * 「本書はどこに置かれる本か」の冒頭＝その大学の過去問で受験生が止まる理由。
 * 過去問の問題文を引いている文（数式を含む文・年度つきの引用）は、
 * サイトでは問題文を転載しない方針なので落とす。
 */
function openerOf(front) {
  const body = sectionBody(front, "本書はどこに置かれる本か");
  const beforeTable = body.split(/\\begin\{center\}|本書はその/)[0];
  const text = spansToPlain(parseSpans(beforeTable.replace(/(^|[^\\])%.*$/gm, "$1"))).replace(/\s+/g, "");
  const kept = [];
  for (const s of text.split(/(?<=。)/)) {
    if (!s) continue;
    if (/年度.{0,4}(大問|第\d+問)|「[^」]*(求めよ|示せ)[^」]*」|たとえば|全文が次/.test(s)) continue;
    // 落とした例を指す文（「この2題に手が出ないのは」）は、例がないと意味をなさない
    if (/この\d+題/.test(s)) continue;
    kept.push(s);
  }
  return kept.join("");
}

function extractKansei(meta) {
  const dir = join(HOME, meta.dir);
  const front = read(join(dir, "front.tex"));
  const main = read(join(dir, "main.tex"));
  const files = readdirSync(dir);

  // 章の表と小問数は「2.1 章の並び」の節だけから読む。
  // 第1節には過去問の小問数（阪大「40大問に対して小問は計87問」など）が書かれていて、
  // 原稿全体から探すとそちらを本書の数として拾ってしまう。
  const structure = sectionBody(front, "2.1");
  const table = chapterTable(structure);
  if (!table) warn(`${meta.slug}: 章の表が見つからない`);

  const openers = files
    .filter((f) => /^ch\d+_q\.tex$/.test(f))
    .sort((a, b) => toNum(a) - toNum(b))
    .map((f) => chapterOpener(read(join(dir, f)), `${meta.slug}/${f}`))
    .filter(Boolean);

  // 小問の総数は、表に列があればそれを、なければ本文か表紙の一文から取る
  const subq =
    table?.total?.subquestions ?? (toNum((plain(structure).match(/全\d+題・小問は計(\d+)問/) || [])[1]) || null);
  const subqFromCover = toNum((plain(main).match(/全\d+題（(\d+)小問）/) || [])[1]);

  const years = (plain(front).match(/過去\d+年の出題（(\d{4})〜(\d{4})年度）/) || []).slice(1).map(Number);

  // 付録の見出し（「付録A 自分で用意する公式集」など）。巻によって中身が違う
  const appendixTex = files.includes("appendix.tex") ? read(join(dir, "appendix.tex")) : "";
  const appendices = [...appendixTex.matchAll(/\\section\*?\{(付録[A-Z])[\s　]*([^}]*)\}/g)].map((m) => ({
    label: m[1],
    title: plain(m[2]).replace(/\s+/g, ""),
  }));
  if (!appendices.length) warn(`${meta.slug}: 付録の見出しが読めない`);
  for (const a of appendices) assertPlain(`${meta.slug}/付録`, a.title);

  const honban = files
    .filter((f) => /^ch\d+_a\.tex$/.test(f))
    .some((f) => read(join(dir, f)).includes("本番ならこう出る"));

  // 数学III を使わずに解ける章（表の「範囲」に III を含まない章）
  const chapters = (table?.chapters ?? []).map((c) => {
    const o = openers.find((x) => x.no === c.no);
    return { ...c, lead: o?.lead ?? "", strategy: o?.strategy ?? [], list: o?.problems ?? [] };
  });
  // 数学III を学ぶ前に解ける章。原稿の「数学III 履修中 → 第1章〜第5章（…19題）だけを解く」を正とする。
  // 九大は第3章が「数学B（一部 III）」なので「第1・2・4・5章」と飛び飛びになる。
  const beforeIII = chapters.filter((c) => !/III/.test(c.range));
  const stated = plain(front).match(/数学III履修中&(第[\d・]+章(?:〜第\d+章)?)（[^）]*?(\d+)題/);
  if (!stated) warn(`${meta.slug}: 「数学III 履修中」の記述が読めない`);
  else if (Number(stated[2]) !== beforeIII.reduce((a, c) => a + c.problems, 0)) {
    warn(`${meta.slug}: 数学III前の題数 原稿 ${stated[2]} ≠ 表から数えた ${beforeIII.reduce((a, c) => a + c.problems, 0)}`);
  }

  const total = {
    fields: chapters.length,
    problems: table?.total?.problems ?? chapters.reduce((a, c) => a + c.problems, 0),
    subquestions: subq || subqFromCover || null,
    minutes: table?.total?.minutes ?? chapters.reduce((a, c) => a + c.minutes, 0),
    standard: table?.total?.standard ?? 0,
    hard: table?.total?.hard ?? 0,
    honban: table?.total?.honban ?? 0,
  };

  /* 原稿の中での食い違いを検出する（表・章扉・表紙の3か所で数が合うか） */
  const listed = chapters.reduce((a, c) => a + c.list.length, 0);
  if (listed !== total.problems) warn(`${meta.slug}: 章扉の問題数 ${listed} ≠ 表の題数 ${total.problems}`);
  for (const c of chapters) {
    if (c.list.length !== c.problems) warn(`${meta.slug} 第${c.no}章: 章扉 ${c.list.length}題 ≠ 表 ${c.problems}題`);
    const lv = (name) => c.list.filter((p) => p.level === name).length;
    if (lv("標準") !== c.standard || lv("やや難") !== c.hard || lv("本番接続") !== c.honban) {
      warn(`${meta.slug} 第${c.no}章: レベル内訳が表と章扉で違う`);
    }
    const mins = c.list.reduce((a, p) => a + p.minutes, 0);
    if (mins !== c.minutes) warn(`${meta.slug} 第${c.no}章: 目標時間 章扉 ${mins}分 ≠ 表 ${c.minutes}分`);
    if (!c.strategy.length) warn(`${meta.slug} 第${c.no}章: 出題傾向（koryaku）が空`);
  }
  if (subqFromCover && total.subquestions && subqFromCover !== total.subquestions) {
    warn(`${meta.slug}: 小問数 表紙 ${subqFromCover} ≠ 本文 ${total.subquestions}`);
  }
  if (years.length !== 2) warn(`${meta.slug}: 分析年度が読めない`);

  return {
    ...meta,
    dir: undefined,
    years,
    total,
    beforeIII: {
      label: stated ? stated[1] : null,
      chapters: beforeIII.map((c) => c.no),
      problems: beforeIII.reduce((a, c) => a + c.problems, 0),
    },
    honban,
    appendices,
    opener: assertPlain(meta.slug, openerOf(front)),
    chapters,
  };
}

/* ─────────────── 志望校診断模試 ─────────────── */

function extractShindan(meta) {
  const dir = join(HOME, meta.dir);
  const front = read(join(dir, "front.tex"));
  const text = plain(front);

  const fmt = text.match(/模試が(\d+)回入っている。1回(\d+)分・大問(\d+)題・(\d+)点。/);
  if (!fmt) warn("shindan: 模試の形式（回数・時間・題数・配点）が読めない");
  const total = toNum((text.match(/収録した(\d+)題/) || [])[1]);

  const tables = parseTables(front);
  const cellsOf = (row) => row.map((c) => spansToPlain(c.spans).replace(/\s+/g, " ").trim());
  const findTable = (word) => tables.find((t) => cellsOf(t.head).some((h) => h.includes(word)));

  // 8大学の形式
  const uniT = findTable("公式集");
  const universities = (uniT?.rows ?? []).map((r) => {
    const [name, minutes, questions, per, formula] = cellsOf(r);
    return {
      name,
      minutes: toNum(minutes),
      questions: toNum(questions),
      perQuestion: Number(per.replace(/[^\d.]/g, "")),
      formula: formula === "あり",
      summary: tidySpans(r[5]?.spans ?? []),
    };
  });
  if (universities.length !== 8) warn(`shindan: 大学の表が ${universities.length} 行（8 のはず）`);

  // 9つのタグ（分野4・能力5）。見出し行（「分野タグ（4つ）」）で区切る
  const tagT = tables.find((t) => [t.head, ...t.rows].some((r) => cellsOf(r).some((c) => c.includes("能力タグ"))));
  const tags = { field: [], ability: [] };
  let group = null;
  for (const r of tagT ? [tagT.head, ...tagT.rows] : []) {
    const c = cellsOf(r);
    if (c.length === 1 || r[0]?.colSpan > 1) {
      group = c[0].includes("能力") ? "ability" : c[0].includes("分野") ? "field" : group;
      continue;
    }
    if (group && c.length >= 3) tags[group].push({ name: c[0], points: toNum(c[1]), desc: tidySpans(r[2].spans) });
  }
  const sum = (xs) => xs.reduce((a, x) => a + x.points, 0);
  if (tags.field.length !== 4 || tags.ability.length !== 5) warn("shindan: タグが 4＋5 になっていない");
  if (fmt && (sum(tags.field) !== Number(fmt[4]) || sum(tags.ability) !== Number(fmt[4]))) {
    warn(`shindan: タグの配点合計が ${fmt[4]} 点にならない（分野 ${sum(tags.field)}・能力 ${sum(tags.ability)}）`);
  }

  // わかること・わからないこと
  const knowT = findTable("わかる");
  const scope = {};
  for (const r of knowT ? [knowT.head, ...knowT.rows] : []) {
    const c = cellsOf(r);
    if (c[0] === "わかる") scope.knows = r[1].spans;
    if (c[0] === "わからない") scope.unknown = r[1].spans;
  }

  // 判定の読み方（高・標・要）
  const judgeT = tables.find((t) => [t.head, ...t.rows].some((r) => cellsOf(r)[0]?.startsWith("要")));
  const judgements = (judgeT ? [judgeT.head, ...judgeT.rows] : [])
    .map((r) => ({ label: cellsOf(r)[0], desc: r[1]?.spans ?? [] }))
    .filter((j) => /^(高|標|要)/.test(j.label));

  // 回ごとの「たまたま動く幅」
  const noiseT = tables.find((t) => [t.head, ...t.rows].some((r) => cellsOf(r)[0]?.includes("たまたま動く幅")));
  const noiseRow = noiseT && [noiseT.head, ...noiseT.rows].find((r) => cellsOf(r)[0].includes("たまたま動く幅"));
  const noise = noiseRow ? cellsOf(noiseRow).slice(1).map((v) => Number(v.replace(/[^\d.]/g, ""))) : [];

  // 差が出る分野（「差がつかない」「差がつく」の表）
  const diffT = findTable("差がつかない") ?? tables.find((t) => [t.head, ...t.rows].some((r) => cellsOf(r)[0] === "差がつく"));
  const differences = {};
  for (const r of diffT ? [diffT.head, ...diffT.rows] : []) {
    const c = cellsOf(r);
    if (c[0] === "差がつかない") differences.same = tidySpans(r[1].spans);
  }
  // 「差がつく」の欄は \par で区切った3項目（確率・整数・時間）。1文につなげず項目のまま持つ
  const differRaw = front.match(/\\textbf\{差がつく\}\s*&([\s\S]*?)\\\\\s*\n/);
  differences.differ = differRaw
    ? differRaw[1].split(/\\par\b/).map((x) => tidySpans(parseSpans(x))).filter((x) => spansToPlain(x).trim())
    : [];
  if (differences.differ.length < 2) warn("shindan: 「差がつく」の項目が読めない");

  const sougou = read(join(dir, "sougou.tex"));
  const next = plain(sectionBody(sougou, "ここから先"));

  return {
    slug: meta.slug,
    name: meta.name,
    rounds: fmt ? Number(fmt[1]) : null,
    minutes: fmt ? Number(fmt[2]) : null,
    questions: fmt ? Number(fmt[3]) : null,
    points: fmt ? Number(fmt[4]) : null,
    problems: total || null,
    pastExams: toNum((text.match(/のべ(\d+)題/) || [])[1]) || null,
    universities,
    tags,
    scope,
    judgements,
    noise,
    differences,
    next: assertPlain("shindan/next", next),
    easier: /各大学の本番より少し易しい/.test(text),
  };
}

/* ─────────────── 実行 ─────────────── */

const kansei = [];
for (const meta of kanseiBooks) {
  if (!existsSync(join(HOME, meta.dir, "front.tex"))) {
    warn(`${meta.slug}: 原稿が見つからない（${meta.dir}）`);
    continue;
  }
  kansei.push(extractKansei(meta));
}
const shindan = extractShindan(shindanBook);

writeFileSync(OUT, JSON.stringify({ kansei, shindan }, null, 2));

console.log(`分野別完成演習: ${kansei.length} 冊`);
for (const k of kansei) {
  console.log(
    `  ${k.name.padEnd(8, "　")} ${k.total.fields}分野・${k.total.problems}題・${k.total.subquestions}小問・${k.total.minutes}分` +
      `  分析 ${k.years.join("〜")}  III前 ${k.beforeIII.label}${k.beforeIII.problems}題${k.honban ? "  本番ならこう出る" : ""}`,
  );
}
console.log(
  `志望校診断模試: ${shindan.rounds}回・${shindan.minutes}分・大問${shindan.questions}題・${shindan.points}点・全${shindan.problems}題・対象${shindan.universities.length}大学`,
);
if (problems.length) {
  console.log("\n要確認:");
  for (const p of problems) console.log("  -", p);
  process.exitCode = 1;
}
