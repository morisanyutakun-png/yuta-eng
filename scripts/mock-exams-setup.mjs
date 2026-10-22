/**
 * 模試演習ストアの注文テーブルを作る。
 *
 *   DATABASE_URL='postgres://…' node scripts/mock-exams-setup.mjs
 *
 * 何度実行しても同じ結果になる（create … if not exists）。
 * 入試プレビューの申込テーブルには触らない。
 * package.json にスクリプトを足さずに済むよう、node で直接実行する。
 */
import { readFileSync } from "node:fs";
import pg from "pg";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL が設定されていない。接続文字列を渡すこと。");
  process.exit(1);
}
if (!/^postgres(ql)?:\/\/[^@\s]+@[^/\s]+\//.test(url) || /[…【】<>]|xxxx|your[-_]/i.test(url)) {
  console.error("DATABASE_URL が接続文字列の形になっていない: " + url.replace(/:[^:@/]+@/, ":****@"));
  process.exit(1);
}

const text = readFileSync(new URL("./mock-exams-schema.sql", import.meta.url), "utf8");
const client = new pg.Client({
  connectionString: url,
  ssl: /sslmode=disable|localhost|127\.0\.0\.1/.test(url) ? false : { rejectUnauthorized: true },
});
await client.connect();

// コメント行を先に落としてから文ごとに分ける
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

