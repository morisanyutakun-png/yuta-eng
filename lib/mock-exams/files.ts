import { readFile, stat } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";

import type { ExamFileKey } from "@/data/mock-exams";

/**
 * 有料 PDF の取り出し。
 *
 * このリポジトリは GitHub で公開されているので、有料の PDF をリポジトリに入れない。
 * `public/` にも置かない（URL を知った人に無料で配ることになる）。
 * 置き場所は次のどちらかで、利用者には URL を見せずにサーバーが中継して返す。
 *
 *   ・STORE_PDF_BASE_URL  … 非公開のストレージ（S3 / R2 / Vercel Blob など）の土台 URL。
 *                           `<土台>/<模試id>/<種類>.pdf` を取りにいく。
 *                           STORE_PDF_TOKEN があれば Authorization: Bearer で渡す。
 *                           本番（Vercel）ではこちらを使う。
 *   ・STORE_PDF_DIR       … 手元のフォルダ。開発中や自前サーバー向け。
 *                           未設定なら ~/模試演習ストア/_dist（scripts/build-mock-exam-pdf.py の出力先）。
 *
 * どちらも `<模試id>/<種類>.pdf` という同じ並びにしておくと、
 * 手元で組んだフォルダをそのままストレージに上げれば済む。
 */

const FILE_KEYS: readonly ExamFileKey[] = [
  "full",
  "problems",
  "answer-sheets",
  "solutions",
  "rubric",
];

export const isFileKey = (v: unknown): v is ExamFileKey =>
  typeof v === "string" && (FILE_KEYS as readonly string[]).includes(v);

/** 模試 id は英小文字・数字・ハイフンだけ。パスの組み立てに使うので厳しく見る */
const SAFE_ID = /^[a-z0-9][a-z0-9-]{1,80}$/;

export type PdfSource = { body: ReadableStream<Uint8Array> | Uint8Array; size: number | null };

export class PdfNotFoundError extends Error {}

export async function loadExamPdf(examId: string, key: ExamFileKey): Promise<PdfSource> {
  if (!SAFE_ID.test(examId) || !isFileKey(key)) throw new PdfNotFoundError("不正な指定");

  const remote = process.env.STORE_PDF_BASE_URL?.trim();
  if (remote) {
    const url = `${remote.replace(/\/+$/, "")}/${examId}/${key}.pdf`;
    const token = process.env.STORE_PDF_TOKEN?.trim();
    const res = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      cache: "no-store",
    });
    if (!res.ok || !res.body) {
      // 置き場所の URL はログにだけ残し、利用者には出さない
      console.error(`[mock-exams/files] 取得失敗 ${res.status} ${examId}/${key}.pdf`);
      throw new PdfNotFoundError(`PDF を取得できない（${res.status}）`);
    }
    const len = Number(res.headers.get("content-length"));
    return { body: res.body, size: Number.isFinite(len) && len > 0 ? len : null };
  }

  // 1. プロジェクト内販売用フォルダ sales/mock-exams/<id>/<key>.pdf を最優先で探索
  const workspaceSalesRoot = path.resolve(process.cwd(), "sales", "mock-exams");
  const workspaceFile = path.join(workspaceSalesRoot, examId, `${key}.pdf`);
  if (workspaceFile.startsWith(workspaceSalesRoot + path.sep)) {
    try {
      const info = await stat(workspaceFile);
      const data = await readFile(workspaceFile);
      return { body: new Uint8Array(data), size: info.size };
    } catch {
      // 次の候補へ
    }
  }

  // 2. STORE_PDF_DIR またはフォールバックフォルダ
  const root = path.resolve(
    process.env.STORE_PDF_DIR?.trim() || path.join(homedir(), "模試演習ストア", "_dist"),
  );
  // public/ の下を指していたら止める（設定の取り違えで有料 PDF を公開しない）
  if (root.split(path.sep).includes("public")) {
    throw new PdfNotFoundError("STORE_PDF_DIR に public/ 配下は指定できない");
  }
  const file = path.join(root, examId, `${key}.pdf`);
  if (!file.startsWith(root + path.sep)) throw new PdfNotFoundError("不正なパス");
  try {
    const info = await stat(file);
    const data = await readFile(file);
    return { body: new Uint8Array(data), size: info.size };
  } catch {
    console.error(`[mock-exams/files] 見つからない ${examId}/${key}.pdf`);
    throw new PdfNotFoundError("PDF が見つからない");
  }
}

