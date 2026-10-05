// ビルドした HTML の点検。`npm run check:html`（`npm run build` のあとに流す）。
//
// データの突き合わせは check-data.mjs が見るので、ここは「出来上がった画面」だけを見る。
// id の重複・見出しの飛び・title や description の欠け・リンク切れなど、
// 本番に出してからでないと気づきにくいものを、ビルド結果の時点で止める。
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const APP = join(ROOT, ".next", "server", "app");
const PUBLIC = join(ROOT, "public");

if (!existsSync(APP)) {
  console.error("ビルド結果がない。先に npm run build を実行する");
  process.exit(1);
}

const problems = [];
const ng = (page, msg) => problems.push(`${page}: ${msg}`);

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith(".html") ? [p] : [];
  });

// _not-found や _global-error は Next が用意する枠で、点検の対象にしない
const files = walk(APP).filter((f) => !/\/_(?:not-found|global-error)\.html$/.test(f));
const strip = (s) => s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const text = (html) =>
  strip(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " "));

const linked = new Map(); // 内部リンク・画像 → 最初に見つけたページ
const seen = new Set();

for (const f of files) {
  const page = f.slice(APP.length).replace(/\.html$/, "").replace(/\/index$/, "") || "/";
  const html = readFileSync(f, "utf8");
  seen.add(page);

  /* ── <head> ── */
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  const canon = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? "";
  if (!title) ng(page, "title がない");
  else if (title.length > 62) ng(page, `title が ${title.length} 字（62字まで）`);
  if (!desc) ng(page, "description がない");
  else if (desc.length < 60 || desc.length > 160) ng(page, `description が ${desc.length} 字（60〜160字）`);
  if (!canon) ng(page, "canonical がない");
  if (!/<meta property="og:image"/.test(html)) ng(page, "og:image がない");

  /* ── 見出し ── */
  const h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
  if (h1.length !== 1) ng(page, `h1 が ${h1.length} 個`);
  const levels = [...html.matchAll(/<h([1-4])[\s>]/g)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i - 1] > 1) {
      ng(page, `見出しが h${levels[i - 1]} → h${levels[i]} に飛んでいる`);
      break;
    }
  }

  /* ── id の重複（aria-labelledby や #リンクが壊れる） ── */
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dup = [...new Set(ids.filter((v, i) => ids.indexOf(v) !== i))];
  if (dup.length) ng(page, `id が重なっている: ${dup.join(" ")}`);

  /* ── ページ内リンクの行き先があるか ── */
  for (const m of html.matchAll(/href="#([^"]+)"/g)) {
    if (!ids.includes(m[1])) ng(page, `#${m[1]} の行き先がない`);
  }

  /* ── 画像の代替テキスト ── */
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="/.test(m[0])) ng(page, "alt のない img がある");
  }

  /* ── 構造化データ ── */
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch (e) {
      ng(page, `JSON-LD が壊れている（${e.message.slice(0, 40)}）`);
    }
  }

  /* ── 組版の取りこぼし ── */
  const body = text(html);
  if (/katex-error/.test(html)) ng(page, "組めなかった数式がある");
  for (const [name, re] of [
    ["LaTeX の命令", /\\[a-zA-Z]{2,}/],
    ["undefined", /\bundefined\b/],
    ["NaN", /\bNaN\b/],
    ["[object", /\[object /],
  ]) {
    const hit = body.match(re);
    if (hit) ng(page, `${name}が残っている「${body.slice(Math.max(0, hit.index - 20), hit.index + 30)}」`);
  }

  /* ── リンクと画像を集める ── */
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    if (!m[1].startsWith("/_next/") && !linked.has(m[1])) linked.set(m[1], page);
  }
  for (const m of html.matchAll(/src="(\/[^"?]+\.(?:webp|jpg|png|svg))"/g)) if (!linked.has(m[1])) linked.set(m[1], page);
  for (const m of html.matchAll(/url=%2F([^&"]+)/g)) {
    const p = "/" + decodeURIComponent(m[1]);
    if (!linked.has(p)) linked.set(p, page);
  }
}

/* ── リンク切れ ── */
for (const [path, from] of linked) {
  const clean = path.replace(/\/$/, "") || "/";
  if (seen.has(clean) || seen.has(path)) continue;
  if (existsSync(join(PUBLIC, path))) continue;
  if (["/sitemap.xml", "/robots.txt", "/icon.svg"].includes(path)) continue;
  ng(from, `リンク切れ ${path}`);
}

/* ── sitemap とページの対応 ── */
const sitemap = join(APP, "sitemap.xml.body");
if (existsSync(sitemap)) {
  const locs = [...readFileSync(sitemap, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    new URL(m[1]).pathname.replace(/\/$/, "") || "/",
  );
  for (const l of locs) if (!seen.has(l)) ng("sitemap", `${l} のページがない`);
}

console.log(`ビルド結果 ${files.length} ページ / 内部リンク・画像 ${linked.size} 件`);
if (problems.length) {
  console.log(`\n要確認 ${problems.length} 件:`);
  for (const p of problems) console.log("  -", p);
  process.exitCode = 1;
} else {
  console.log("画面の点検: 問題なし");
}
