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
  const dynamicExamsMap = new Map<string, MockExam>();
  const scanDirectory = (dirPath: string) => {
    try {
      if (!fs.existsSync(dirPath)) return;
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const productJsonPath = path.join(dirPath, entry.name, "product.json");
          if (fs.existsSync(productJsonPath)) {
            try {
              const raw = fs.readFileSync(productJsonPath, "utf-8");
              const parsed = JSON.parse(raw) as MockExam;
              if (parsed && typeof parsed.id === "string" && parsed.id.trim()) {
                dynamicExamsMap.set(parsed.id, parsed);
              }
            } catch (readErr) {
              console.error(`[catalog-server] ${entry.name}/product.json 読み込み失敗:`, readErr);
            }
          }
        }
      }
    } catch (err) {
      console.error(`[catalog-server] フォルダ走査エラー (${dirPath}):`, err);
    }
  };

  // 1. Git管理されている sales/mock-exams を走査
  scanDirectory(path.resolve(process.cwd(), "sales", "mock-exams"));

  // 2. AWS Lambda / Vercel Serverless のタスクルートを走査
  if (process.env.LAMBDA_TASK_ROOT) {
    scanDirectory(path.join(process.env.LAMBDA_TASK_ROOT, "sales", "mock-exams"));
  }

  // 3. サーバーレス環境での編集・追加（/tmp/sales-mock-exams）があれば上書き
  scanDirectory(path.join("/tmp", "sales-mock-exams"));

  return Array.from(dynamicExamsMap.values());
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

