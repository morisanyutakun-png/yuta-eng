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

export function checkExamFiles(id: string): ShelfInfo {
  const dir = path.join(SALES_ROOT, id);
  const exists = fs.existsSync(dir);
  if (!exists) {
    return {
      hasDir: false,
      hasProductJson: false,
      pdfCount: 0,
      pdfs: [],
    };
  }
  const hasProductJson = fs.existsSync(path.join(dir, "product.json"));
  const expectedPdfs = ["full.pdf", "problems.pdf", "answer-sheets.pdf", "solutions.pdf", "rubric.pdf"];
  const presentPdfs = expectedPdfs.filter((f) => fs.existsSync(path.join(dir, f)));

  let fullPdfInfo: ShelfFileInfo | undefined;
  const fullPdfPath = path.join(dir, "full.pdf");
  if (fs.existsSync(fullPdfPath)) {
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

  return {
    hasDir: true,
    hasProductJson,
    pdfCount: presentPdfs.length,
    pdfs: presentPdfs,
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
