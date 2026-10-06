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

// 説明文の見本をそのまま貼ってしまうことがある。
// そのまま繋ぎにいくと DNS の失敗になって原因が分かりにくいので、先に止める。
const placeholder = /[…【】<>]|\.\.\.|xxxx|your[-_]|ここに/i;
if (placeholder.test(url) || !/^postgres(ql)?:\/\/[^@\s]+@[^/\s]+\//.test(url)) {
  console.error(
    [
      "DATABASE_URL が接続文字列の形になっていない。",
      "",
      "  いま渡された値: " + url.replace(/:[^:@/]+@/, ":****@"),
      "",
      "Neon のダッシュボードで Connection string の Pooled connection を選び、",
      "表示された文字列を**そのまま**貼り付けること。見本の記号を残さない。",
      "",
      "  postgresql://<ユーザー>:<パスワード>@ep-xxxx-pooler.<リージョン>.aws.neon.tech/neondb?sslmode=require",
      "                                           ^^^^^^^ ここに -pooler が入っていること",
    ].join("\n"),
  );
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
