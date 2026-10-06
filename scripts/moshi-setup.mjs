/**
 * 模試の申込テーブルを作る。
 *
 *   DATABASE_URL='postgres://…' node scripts/moshi-setup.mjs
 *
 * 何度実行しても同じ結果になる（create table if not exists）。
 * 既存のテーブルには触らない。
 */
import { readFileSync } from "node:fs";
import pg from "pg";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL が設定されていない。Neon の接続文字列を渡すこと。");
  process.exit(1);
}

const text = readFileSync(new URL("./moshi-schema.sql", import.meta.url), "utf8");
const client = new pg.Client({
  connectionString: url,
  ssl: /sslmode=disable|localhost|127\.0\.0\.1/.test(url) ? false : { rejectUnauthorized: true },
});
await client.connect();

// 先にコメント行を落としてから文ごとに分ける。
// 先に分けると、先頭のコメントと最初の文が1つの塊になり、
// 「-- で始まる」という理由でその文ごと捨ててしまう。
const statements = text
  .split("\n")
  .filter((line) => !line.trim().startsWith("--"))
  .join("\n")
  .split(/;\s*$/m)
  .map((s) => s.trim())
  .filter(Boolean);

for (const s of statements) {
  await client.query(s);
  console.log("OK  " + s.split("\n")[0].slice(0, 72));
}
await client.end();
console.log(`\n${statements.length} 文を実行した。`);
