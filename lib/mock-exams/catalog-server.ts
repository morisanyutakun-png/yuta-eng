import fs from "node:fs";
import path from "node:path";

import { mockExams as staticMockExams, type MockExam } from "@/data/mock-exams";

/**
 * サーバーサイド専用の商品データ読み出し。
 *
 * `sales/mock-exams/<id>/product.json` を動的に走査・取得し、
 * 最新の商品データを返す。
 */

function loadDynamicExams(): MockExam[] {
  const dynamicExams: MockExam[] = [];
  try {
    const salesDir = path.resolve(process.cwd(), "sales", "mock-exams");
    if (fs.existsSync(salesDir)) {
      const entries = fs.readdirSync(salesDir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const productJsonPath = path.join(salesDir, entry.name, "product.json");
          if (fs.existsSync(productJsonPath)) {
            try {
              const raw = fs.readFileSync(productJsonPath, "utf-8");
              const parsed = JSON.parse(raw) as MockExam;
              if (parsed && typeof parsed.id === "string" && parsed.id.trim()) {
                dynamicExams.push(parsed);
              }
            } catch (readErr) {
              console.error(`[catalog-server] ${entry.name}/product.json 読み込み失敗:`, readErr);
            }
          }
        }
      }
    }
  } catch (err) {
    console.error("[catalog-server] 動的商品フォルダ走査エラー:", err);
  }
  return dynamicExams;
}

export function allExams(): MockExam[] {
  const dynamicList = loadDynamicExams();
  if (dynamicList.length > 0) {
    return dynamicList.sort((a, b) => a.id.localeCompare(b.id));
  }
  return staticMockExams;
}

export const getExam = (id: string): MockExam | undefined =>
  allExams().find((e) => e.id === id);

