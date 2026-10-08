// サイトに出しているデータの突き合わせ。`npm run check` で実行する。
//
// 原稿・Amazon・サイトの3つがずれていないか、数字が常識的な範囲に収まっているかを見る。
// 1つでも引っかかったら終了コード 1 を返すので、公開前に流す。
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import katex from "katex";

import { bookRegistry } from "./book-registry.mjs";
import { universityMeta } from "./university-meta.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(readFileSync(join(ROOT, p), "utf8"));
const books = read("data/books.json");
const analysis = read("data/analysis.json");
const series = read("data/series.json");
const samples = read("data/samples.json");
const moshiSample = read("data/moshi-sample.json");
const macros = read("lib/katex-macros.json");

const problems = [];
const ng = (msg) => problems.push(msg);
const file = (p) => existsSync(join(ROOT, "public", p));

/* ── 登録簿と取得データ ── */
for (const r of bookRegistry) if (!books[r.asin]) ng(`books.json に ${r.asin}（${r.slug}）がない。npm run data:books を実行`);
for (const asin of Object.keys(books)) {
  if (!bookRegistry.some((r) => r.asin === asin)) ng(`登録簿にない本が books.json にある: ${asin}`);
}
for (const b of Object.values(books)) {
  if (!b.price) ng(`${b.asin} ${b.title}: 価格が取れていない`);
  if (!b.pages) ng(`${b.asin} ${b.title}: ページ数が取れていない`);
  if (!b.released) ng(`${b.asin} ${b.title}: 発売日が取れていない`);
  if (b.series === "gokaku" && !universityMeta[Object.keys(universityMeta).find((k) => universityMeta[k].slug === b.slug)])
    ng(`${b.asin}: slug ${b.slug} が university-meta にない`);
}

/* ── 大学ページ ── */
const slugs = new Set(analysis.map((u) => u.slug));
for (const u of analysis) {
  if (!u.books.length) ng(`${u.slug}: 販売中の本がない`);
  for (const b of u.books) {
    const src = books[b.asin];
    if (!src) { ng(`${u.slug}: ${b.asin} が books.json にない`); continue; }
    if (src.price !== b.price) ng(`${u.slug} ${b.title}: 価格がずれている（サイト ${b.price} / Amazon ${src.price}）`);
    if (src.pages !== b.pages) ng(`${u.slug} ${b.title}: ページ数がずれている（サイト ${b.pages} / Amazon ${src.pages}）`);
    if (!file(`/covers/${b.asin}.webp`)) ng(`${u.slug}: 表紙がない（${b.asin}）`);
    if (!file(`/covers/thumb/${b.asin}.webp`)) ng(`${u.slug}: サムネイルがない（${b.asin}）`);
    if (!b.rounds) ng(`${u.slug} ${b.title}: 収録回数が取れていない`);
  }
  if (!file(`/og/${u.slug}.jpg`)) ng(`${u.slug}: OG 画像がない`);

  const f = u.facts;
  if (f.examTime && (f.examTime < 30 || f.examTime > 300)) ng(`${u.slug}: 試験時間 ${f.examTime}分 は範囲外`);
  if (f.questions && (f.questions < 1 || f.questions > 12)) ng(`${u.slug}: 大問 ${f.questions}題 は範囲外`);
  if (f.points && (f.points < 20 || f.points > 1500)) ng(`${u.slug}: 配点 ${f.points}点 は範囲外`);
  if (f.questions && f.selective) ng(`${u.slug}: 選択制なのに大問数を出している`);
  if (f.examTime && f.questions) {
    const per = f.examTime / f.questions;
    if (per < 8 || per > 60) ng(`${u.slug}: 1題あたり ${Math.round(per)}分 は不自然`);
  }

  if (u.years.length === 2) {
    const [a, b] = u.years.map(Number);
    if (a > b) ng(`${u.slug}: 年度が逆（${u.years.join("〜")}）`);
    if (u.yearCount && (u.yearCount < 1 || u.yearCount > 12)) ng(`${u.slug}: 分析年数 ${u.yearCount} は範囲外`);
    if (u.yearCount && u.yearCount > b - a + 1) ng(`${u.slug}: 分析年数 ${u.yearCount} が年度の幅を超えている`);
  }

  const c = u.fieldChart;
  if (c) {
    if (c.kind === "question" && c.denom) {
      for (const it of c.items) if (it.count > c.denom) ng(`${u.slug}: 分野「${it.label}」${it.count} が分母 ${c.denom} を超えている`);
    }
    if (c.items.some((it) => it.count < 0)) ng(`${u.slug}: 分野の出題数が負`);
  }

  // 画面に出す平文に LaTeX が残っていないか
  const plain = [u.summary, u.goal, u.change, ...u.sections.map((s) => s.title)].filter(Boolean);
  for (const t of plain) if (/\$|\\[a-zA-Z]{2,}/.test(t)) ng(`${u.slug}: LaTeX が残っている「${t.slice(0, 40)}」`);
}

/* ── 「過去問の前に」 ── */
for (const k of series.kansei) {
  if (!slugs.has(k.slug)) ng(`分野別完成演習 ${k.slug}: 同じ slug の大学ページがない`);
  const listed = k.chapters.reduce((a, ch) => a + ch.list.length, 0);
  if (listed !== k.total.problems) ng(`分野別完成演習 ${k.slug}: 章扉 ${listed}題 ≠ 合計 ${k.total.problems}題`);
  const book = Object.values(books).find((b) => b.series === "kansei" && b.slug === k.slug);
  if (book) {
    if (!file(`/covers/kansei/${k.slug}.webp`)) ng(`分野別完成演習 ${k.slug}: 表紙がない`);
    if (!file(`/og/kansei-${k.slug}.jpg`)) ng(`分野別完成演習 ${k.slug}: OG 画像がない`);
  }
}
const shindanUnis = series.shindan.universities.map((u) => u.name);
const kanseiUnis = series.kansei.map((k) => k.university);
for (const name of shindanUnis) {
  if (!kanseiUnis.some((u) => u.startsWith(name))) ng(`診断模試が判定する ${name} に分野別完成演習がない`);
}
const tagPoints = (xs) => xs.reduce((a, t) => a + t.points, 0);
if (tagPoints(series.shindan.tags.field) !== series.shindan.points) ng("診断模試: 分野タグの配点合計が満点と合わない");
if (tagPoints(series.shindan.tags.ability) !== series.shindan.points) ng("診断模試: 能力タグの配点合計が満点と合わない");

/* ── 試し読み（抜粋） ── */
for (const [asin, s] of Object.entries(samples)) {
  if (!books[asin]) ng(`試し読み ${asin}: 登録簿にない本の抜粋がある`);
  if (s.pages.length < 4 || s.pages.length > 6) ng(`試し読み ${asin}: 抜粋が ${s.pages.length} ページ（4〜6 のはず）`);
  if (!file(s.pdf.replace(/^\//, "/"))) ng(`試し読み ${asin}: 抜粋PDFがない`);
  for (const p of s.pages) if (!file(p.file)) ng(`試し読み ${asin}: 画像がない（${p.file}）`);

  // 扉と問題が核。目次・使い方・採点基準は入れない
  const kinds = s.pages.map((p) => p.kind);
  if (!kinds.includes("扉")) ng(`試し読み ${asin}: 扉のページがない`);
  if (kinds.filter((k) => k === "扉" || k === "問題").length < 2) ng(`試し読み ${asin}: 問題のページが足りない`);
  for (const k of kinds) if (!["扉", "問題", "解答", "診断"].includes(k)) ng(`試し読み ${asin}: 出さない種類のページがある（${k}）`);

  // 同じ回（章）から、扉・問題・解答が重なって出ていないか
  const unitOf = (p) => p.label.match(/^第\d+[回章]/)?.[0];
  const byUnit = {};
  for (const p of s.pages) (byUnit[unitOf(p)] ||= new Set()).add(p.kind);
  for (const [unit, set] of Object.entries(byUnit)) {
    if (set.size > 1) ng(`試し読み ${asin}: ${unit} から ${[...set].join("・")} が揃って出ている`);
  }
  for (const p of s.pages) if (!unitOf(p)) ng(`試し読み ${asin}: 回（章）のわからない見出し「${p.label}」`);
}
/* ── 模試の見本 ──
   書籍の抜粋ではなく、模試のために組んだ冊子をまるごと出している。
   こちらは全ページを出してよいが、分量が増えていないかは見ておく。 */
{
  // 問題の見本と、返却の見本。どちらも揃っていないと「何が返るか」が伝わらない。
  const want = {
    problem: ["扉", "問題", "解答", "採点"],
    return: ["成績", "講評", "助言"],
  };
  for (const [key, need] of Object.entries(want)) {
    const s = moshiSample[key];
    if (!s) {
      ng(`模試の見本: ${key} がない`);
      continue;
    }
    if (!file(s.pdf)) ng(`模試の見本(${key}): PDFがない`);
    if (s.pages.length < 4 || s.pages.length > 8) ng(`模試の見本(${key}): ${s.pages.length} ページ（4〜8 のはず）`);
    for (const p of s.pages) if (!file(p.file)) ng(`模試の見本(${key}): 画像がない（${p.file}）`);
    const kinds = s.pages.map((p) => p.kind);
    for (const k of need) if (!kinds.includes(k)) ng(`模試の見本(${key}): ${k}のページがない`);
    for (const k of kinds) if (!need.includes(k)) ng(`模試の見本(${key}): 出さない種類のページがある（${k}）`);
  }
}

// 本文まるごとのPDFを公開していないか（書籍の抜粋は多くても6ページ）
for (const f of readdirSync(join(ROOT, "public", "samples"), { recursive: true })) {
  if (typeof f === "string" && f.endsWith(".pdf")) {
    const dir = f.split("/")[0];
    if (dir === "moshi") continue; // 模試の見本は上で見ている
    const pages = samples[dir]?.pages.length;
    if (!pages) ng(`public/samples/${f}: data/samples.json にない PDF`);
  }
}

/* ── 数式が組めるか ──
   原稿の独自命令（\probref など）を lib/katex-macros.json に足し忘れると、
   その命令が赤字でそのまま画面に出てしまう。実際に組んで確かめる。 */
const mathSeen = new Set();
const mathBad = new Map();
const walkMath = (node, where) => {
  if (Array.isArray(node)) return node.forEach((n) => walkMath(n, where));
  if (!node || typeof node !== "object") return;
  if (node.t === "math" && typeof node.v === "string") {
    if (mathSeen.has(node.v)) return;
    mathSeen.add(node.v);
    try {
      const html = katex.renderToString(node.v, { throwOnError: true, macros: { ...macros }, strict: false });
      if (html.includes("katex-error")) throw new Error("組めない数式");
    } catch (e) {
      mathBad.set(node.v, [where, e.message.split("\n")[0]]);
    }
    return;
  }
  for (const v of Object.values(node)) walkMath(v, node.slug ?? where);
};
walkMath(analysis, "analysis");
walkMath(series, "series");
for (const [tex, [where, msg]] of mathBad) ng(`${where}: 数式が組めない「${tex.slice(0, 40)}」（${msg}）`);

/* ── 平文に LaTeX の命令が残っていないか ── */
const walkPlain = (node, where) => {
  if (typeof node === "string") {
    const m = node.match(/\\[a-zA-Z]{2,}/);
    if (m) ng(`${where}: 平文に ${m[0]} が残っている「${node.slice(0, 40)}」`);
    return;
  }
  if (Array.isArray(node)) return node.forEach((n) => walkPlain(n, where));
  if (!node || typeof node !== "object" || node.t === "math") return;
  for (const v of Object.values(node)) walkPlain(v, node.slug ?? where);
};
walkPlain(analysis, "analysis");
walkPlain(series, "series");

/* ── 「N大学」と書いている数が、区分の数になっていないか ── */
const pageCount = analysis.length;
const uniCount = new Set(analysis.map((u) => u.university)).size;
if (pageCount === uniCount) ng("大学数とページ数が同じ。区分の分割が壊れている可能性がある");

/* ── 結果 ── */
const gokaku = Object.values(books).filter((b) => b.series === "gokaku").length;
console.log(
  `試し読み ${Object.keys(samples).length}冊 ${Object.values(samples).reduce((a, s) => a + s.pages.length, 0)}ページ`,
  `模試の見本 ${Object.values(moshiSample).reduce((a, b) => a + b.pages.length, 0)}ページ`,
);
console.log(
  `大学 ${uniCount}（ページ ${pageCount} 区分） / 合格答案をつくる ${gokaku}冊 / 分野別完成演習 ${series.kansei.length}冊（販売中 ` +
    `${Object.values(books).filter((b) => b.series === "kansei").length}冊）`,
);
if (problems.length) {
  console.log(`\n要確認 ${problems.length} 件:`);
  for (const p of problems) console.log("  -", p);
  process.exitCode = 1;
} else {
  console.log("データの突き合わせ: 問題なし");
}
