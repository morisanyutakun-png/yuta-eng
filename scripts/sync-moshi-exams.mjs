/**
 * 入試プレビュー（本番の問題冊子PDF）をリポジトリへ取り込む。
 *
 * 原稿と LaTeX は `~/入試プレビュー模試/` にあり、リポジトリには入れない。
 * ここで取り込むのは、`build.py` が出力した**配布用のPDF1本**だけである。
 * 決済後の自動返信メールに添付するので、サイトと同じ場所にないと扱いにくい。
 *
 * 置き場所は `assets/moshi-exams/<回>/<大学id>.pdf`。
 * **`public/` には絶対に置かない。** `public/` は誰でも URL で取得できるため、
 * 置いた時点で有料の問題冊子が無料で配られることになる。
 * `assets/` は静的配信の対象外で、サーバー側のコードからだけ読める。
 *
 * ファイル名を大学 id にそろえるのは、`data/moshi.json` の id から
 * 添付するPDFを引けるようにするため。受信者に見えるファイル名は
 * manifest.json の `filename` を使う（日本語のままにしたいので分けている）。
 *
 * 使い方: npm run moshi:pdf
 */
import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";

/** 回ごとに分ける。第2回を作ったらここを増やす */
const ROUND = "round1";

/** 原稿のある場所。リポジトリの外にあるので、ここだけが外部への参照 */
const SOURCE_ROOT = path.join(homedir(), "入試プレビュー模試");

/** `data/moshi.json` の大学 id と、原稿フォルダ名の対応 */
const FOLDERS = {
  "mie-rikei": "三重大",
  "nagoya-rikei": "名大理系",
  nitech: "名工大",
  "kagakudai-rikou": "東京科学大",
  hitotsubashi: "一橋大",
  "tohoku-rikei": "東北大理系",
  "tsukuba-rikei": "筑波大",
  "kobe-rikei": "神戸大理系",
  "chiba-rikei": "千葉大理系",
  "okayama-rikei": "岡山大理系",
};

const repoRoot = path.resolve(import.meta.dirname, "..");
const outDir = path.join(repoRoot, "assets", "moshi-exams", ROUND);

const moshi = JSON.parse(readFileSync(path.join(repoRoot, "data", "moshi.json"), "utf8"));

/** サイトに出している大学と、対応表がずれていないか先に確かめる */
const siteIds = moshi.universities.map((u) => u.id);
const missing = siteIds.filter((id) => !FOLDERS[id]);
const extra = Object.keys(FOLDERS).filter((id) => !siteIds.includes(id));
if (missing.length || extra.length) {
  if (missing.length) console.error(`原稿フォルダの対応がない大学: ${missing.join(", ")}`);
  if (extra.length) console.error(`data/moshi.json にない大学 id: ${extra.join(", ")}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

const entries = [];
let failed = 0;

for (const u of moshi.universities) {
  const pdfDir = path.join(SOURCE_ROOT, FOLDERS[u.id], "PDF");

  let found;
  try {
    found = readdirSync(pdfDir).filter((f) => f.endsWith(".pdf"));
  } catch {
    console.error(`× ${u.university}　${pdfDir} が見つからない`);
    failed++;
    continue;
  }
  if (found.length !== 1) {
    console.error(`× ${u.university}　PDF が ${found.length} 本ある（1本だけにする）`);
    failed++;
    continue;
  }

  const src = path.join(pdfDir, found[0]);
  const dest = path.join(outDir, `${u.id}.pdf`);
  copyFileSync(src, dest);

  const bytes = readFileSync(dest);
  entries.push({
    id: u.id,
    university: u.university,
    exam: u.exam,
    /** 添付したときに受信者に見えるファイル名 */
    filename: found[0],
    file: path.posix.join("assets", "moshi-exams", ROUND, `${u.id}.pdf`),
    bytes: bytes.length,
    sha256: createHash("sha256").update(bytes).digest("hex"),
  });

  const kb = (bytes.length / 1024).toFixed(0);
  console.log(`○ ${u.university.padEnd(8, "　")} ${String(kb).padStart(4)} KB  ${found[0]}`);
}

if (failed) {
  console.error(`\n${failed} 件取り込めなかった。manifest は更新していない。`);
  process.exit(1);
}

writeFileSync(
  path.join(outDir, "manifest.json"),
  `${JSON.stringify({ round: moshi.round ?? ROUND, exams: entries }, null, 2)}\n`,
);

const total = entries.reduce((s, e) => s + e.bytes, 0);
console.log(`\n${entries.length} 大学・計 ${(total / 1024 / 1024).toFixed(1)} MB を ${path.relative(repoRoot, outDir)} に取り込んだ。`);
