// サイトに出しているデータの突き合わせ。`npm run check` で実行する。
//
// 原稿・Amazon・サイトの3つがずれていないか、数字が常識的な範囲に収まっているかを見る。
// 1つでも引っかかったら終了コード 1 を返すので、公開前に流す。
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { bookRegistry } from "./book-registry.mjs";
import { universityMeta } from "./university-meta.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(readFileSync(join(ROOT, p), "utf8"));
const books = read("data/books.json");
const analysis = read("data/analysis.json");
const series = read("data/series.json");
const samples = read("data/samples.json");

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

  // 問題・解説・採点基準が同じ回（章）から出ていないか
  const from = {};
  for (const p of s.pages) {
    const kind = p.label.replace("の例", "").replace("（続き）", "");
    if (["問題", "解説", "採点基準"].includes(kind)) (from[kind] ||= new Set()).add(p.section);
  }
  const used = Object.values(from).flatMap((v) => [...v]);
  if (used.length !== new Set(used).size) ng(`試し読み ${asin}: 問題・解説・採点基準が同じ回から出ている`);
  if (!s.pages.some((p) => p.label.includes("問題"))) ng(`試し読み ${asin}: 問題のページがない`);
}
// 本文まるごとのPDFを公開していないか（抜粋は多くても6ページ）
for (const f of readdirSync(join(ROOT, "public", "samples"), { recursive: true })) {
  if (typeof f === "string" && f.endsWith(".pdf")) {
    const asin = f.split("/")[0];
    const pages = samples[asin]?.pages.length;
    if (!pages) ng(`public/samples/${f}: data/samples.json にない PDF`);
  }
}

/* ── 「N大学」と書いている数が、区分の数になっていないか ── */
const pageCount = analysis.length;
const uniCount = new Set(analysis.map((u) => u.university)).size;
if (pageCount === uniCount) ng("大学数とページ数が同じ。区分の分割が壊れている可能性がある");

/* ── 結果 ── */
const gokaku = Object.values(books).filter((b) => b.series === "gokaku").length;
console.log(
  `試し読み ${Object.keys(samples).length}冊 ${Object.values(samples).reduce((a, s) => a + s.pages.length, 0)}ページ`,
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
