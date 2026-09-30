// 登録簿（scripts/book-registry.mjs）の ASIN について、Amazon の商品ページから
// 書名・価格・ページ数・発売日・ISBN を取り直し、data/books.json に書き出す。
//
//   npm run data:books
//
// 商品情報は Amazon にしかないので、ここだけネットワークを使う。
// 出力はリポジトリにコミットしておき、サイトのビルドではこの JSON だけを読む。
// 1件ずつ間を空けて取りに行くので、89件で2分ほどかかる。
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { bookRegistry } from "./book-registry.mjs";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "books.json");
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const unescapeHtml = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
const strip = (s) => unescapeHtml(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();

/** 商品ページの HTML から必要な項目だけを取り出す。 */
function parse(html) {
  const title = html.match(/id="productTitle"[^>]*>([\s\S]*?)<\/span>/);
  if (!title) return null;
  const detail = (label, re) => {
    const m = html.match(new RegExp(`${label}[\\s\\S]{0,400}?<span>\\s*${re}`));
    return m ? m[1] : null;
  };
  const price = html.match(/"priceAmount":([\d.]+)/);
  return {
    fullTitle: strip(title[1]),
    price: price ? Math.round(Number(price[1])) : null,
    pages: Number(detail("本の長さ", "([\\d,]+)ページ")?.replace(/,/g, "")) || null,
    released: detail("発売日", "([0-9]{4}/[0-9]{1,2}/[0-9]{1,2})")?.replace(/\//g, "-").replace(/-(\d)(?=-|$)/g, "-0$1") ?? null,
    isbn13: detail("ISBN-13", "([0-9-]+)"),
  };
}

/**
 * 一覧や見出しに出す短い書名。
 * Amazon の商品名は「合格答案をつくる 東大理系数学 2027 Vol.2: 2019-2026年度の…」と
 * 副題が長いので、コロンの前までを表示用に使う。
 */
const shortTitle = (full) => full.split(/[:：]/)[0].trim();

const out = {};
const failed = [];
for (const [i, b] of bookRegistry.entries()) {
  let html = "";
  for (let attempt = 0; attempt < 3 && !html; attempt++) {
    if (attempt) await sleep(3000);
    try {
      const res = await fetch(`https://www.amazon.co.jp/dp/${b.asin}`, {
        headers: { "user-agent": UA, "accept-language": "ja-JP,ja;q=0.9" },
      });
      if (res.ok) html = await res.text();
    } catch {
      /* 次の試行へ */
    }
  }
  const parsed = html && parse(html);
  if (!parsed) {
    failed.push(b.asin);
  } else {
    out[b.asin] = { ...b, title: shortTitle(parsed.fullTitle), ...parsed };
  }
  process.stdout.write(`\r取得 ${i + 1}/${bookRegistry.length}`);
  await sleep(900);
}
process.stdout.write("\n");

if (failed.length) {
  console.error(`取得できませんでした: ${failed.join(", ")}`);
  console.error("data/books.json は更新していません。時間をおいて実行し直してください。");
  process.exit(1);
}

// 既存の並び（登録簿の順）を保って書き出す
writeFileSync(OUT, `${JSON.stringify(out, null, 2)}\n`);

const n = (s) => Object.values(out).filter((b) => b.series === s).length;
console.log(
  `data/books.json: ${Object.keys(out).length} 冊` +
    `（合格答案をつくる ${n("gokaku")} / 分野別完成演習 ${n("kansei")} / 志望校診断模試 ${n("shindan")}）`,
);
const prices = [...new Set(Object.values(out).map((b) => b.price))];
console.log(`価格: ${prices.map((p) => `¥${p?.toLocaleString("ja-JP")}`).join("・")}`);
const noMeta = Object.values(out).filter((b) => !b.pages || !b.released);
if (noMeta.length) console.log(`ページ数か発売日が取れなかった本: ${noMeta.map((b) => b.asin).join(", ")}`);
