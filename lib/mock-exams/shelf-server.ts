import fs from "node:fs";
import path from "node:path";

import { allExams } from "@/lib/mock-exams/catalog-server";

const SALES_ROOT = path.resolve(process.cwd(), "sales", "mock-exams");

export interface ShelfFileInfo {
  name: string;
  size: number;
  sizeFormatted: string;
  mtime: string;
}

export interface ShelfInfo {
  hasDir: boolean;
  hasProductJson: boolean;
  pdfCount: number;
  pdfs: string[];
  fullPdf?: ShelfFileInfo;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getCandidateDirs(id: string): string[] {
  const dirs: string[] = [
    path.join("/tmp", "sales-mock-exams", id),
    path.resolve(process.cwd(), "sales", "mock-exams", id),
  ];
  if (process.env.LAMBDA_TASK_ROOT) {
    dirs.push(path.join(process.env.LAMBDA_TASK_ROOT, "sales", "mock-exams", id));
  }
  return dirs;
}

export function checkExamFiles(id: string): ShelfInfo {
  const candidateDirs = getCandidateDirs(id);
  const existingDir = candidateDirs.find((d) => fs.existsSync(d));

  if (!existingDir) {
    return {
      hasDir: false,
      hasProductJson: false,
      pdfCount: 0,
      pdfs: [],
    };
  }

  let hasProductJson = false;
  let fullPdfPath: string | null = null;

  for (const dir of candidateDirs) {
    if (!hasProductJson && fs.existsSync(path.join(dir, "product.json"))) {
      hasProductJson = true;
    }
    if (!fullPdfPath && fs.existsSync(path.join(dir, "full.pdf"))) {
      fullPdfPath = path.join(dir, "full.pdf");
    }
  }

  let fullPdfInfo: ShelfFileInfo | undefined;
  if (fullPdfPath) {
    try {
      const st = fs.statSync(fullPdfPath);
      fullPdfInfo = {
        name: "full.pdf",
        size: st.size,
        sizeFormatted: formatBytes(st.size),
        mtime: st.mtime.toLocaleString("ja-JP", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
    } catch {
      // ignore
    }
  }

  const hasFull = Boolean(fullPdfInfo);

  return {
    hasDir: true,
    hasProductJson,
    pdfCount: hasFull ? 1 : 0,
    pdfs: hasFull ? ["full.pdf"] : [],
    fullPdf: fullPdfInfo,
  };
}

export function getEnrichedShelfItems() {
  const exams = allExams();
  return exams.map((exam) => ({
    ...exam,
    shelf: checkExamFiles(exam.id),
  }));
}
