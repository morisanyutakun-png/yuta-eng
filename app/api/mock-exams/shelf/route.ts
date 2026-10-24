import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

import type { ExamLevel, ExamStatus, MockExam } from "@/data/mock-exams";
import { isStoreEnabled } from "@/lib/mock-exams/env";
import { checkExamFiles, getEnrichedShelfItems } from "@/lib/mock-exams/shelf-server";

export const dynamic = "force-dynamic";

const SALES_ROOT = path.resolve(process.cwd(), "sales", "mock-exams");

function ensureSalesDir() {
  try {
    if (!fs.existsSync(SALES_ROOT)) {
      fs.mkdirSync(SALES_ROOT, { recursive: true });
    }
  } catch {
    // Read-only filesystem in serverless
  }
}

function safeWrite(targetPath: string, data: Buffer | string) {
  try {
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, data);
  } catch {
    const tmpBase = path.join("/tmp", "sales-mock-exams");
    const relative = path.relative(SALES_ROOT, targetPath);
    const tmpTarget = path.join(tmpBase, relative);
    fs.mkdirSync(path.dirname(tmpTarget), { recursive: true });
    fs.writeFileSync(tmpTarget, data);
  }
}

function getProductJson(examId: string): Partial<MockExam> {
  const candidatePaths = [
    path.join("/tmp", "sales-mock-exams", examId, "product.json"),
    path.join(SALES_ROOT, examId, "product.json"),
  ];
  if (process.env.LAMBDA_TASK_ROOT) {
    candidatePaths.push(path.join(process.env.LAMBDA_TASK_ROOT, "sales", "mock-exams", examId, "product.json"));
  }
  const p = candidatePaths.find((pathStr) => fs.existsSync(pathStr));
  if (!p) return {};
  try {
    return JSON.parse(fs.readFileSync(p, "utf-8"));
  } catch {
    return {};
  }
}

function checkAdminAuth(req: Request): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  const adminSecret = process.env.STORE_DOWNLOAD_SECRET;
  if (!adminSecret) return true;
  const url = new URL(req.url);
  const authHeader = req.headers.get("authorization");
  if (authHeader === `Bearer ${adminSecret}`) return true;
  if (url.searchParams.get("key") === adminSecret) return true;
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.match(/store_admin_key=([^;]+)/);
  if (match && decodeURIComponent(match[1]) === adminSecret) return true;
  return false;
}

function authCookieHeader(): Record<string, string> {
  const adminSecret = process.env.STORE_DOWNLOAD_SECRET;
  if (!adminSecret) return {};
  return {
    "Set-Cookie": `store_admin_key=${encodeURIComponent(adminSecret)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`,
  };
}

export async function GET(req: Request) {
  if (!isStoreEnabled()) {
    return NextResponse.json({ error: "Store disabled" }, { status: 403 });
  }
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  ensureSalesDir();

  const url = new URL(req.url);
  const download = url.searchParams.get("download");
  const examId = url.searchParams.get("id")?.trim();
  const fileKey = url.searchParams.get("file")?.trim() || "full.pdf";

  // 管理者用ダイレクトPDFプレビュー/ダウンロード
  if (download === "1" && examId) {
    if (!/^[a-z0-9][a-z0-9-]{1,60}$/.test(examId)) {
      return NextResponse.json({ error: "Invalid exam ID" }, { status: 400 });
    }
    const safeFilename = path.basename(fileKey);
    if (!safeFilename.endsWith(".pdf")) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    const candidatePaths = [
      path.join("/tmp", "sales-mock-exams", examId, safeFilename),
      path.join(SALES_ROOT, examId, safeFilename),
    ];
    if (process.env.LAMBDA_TASK_ROOT) {
      candidatePaths.push(path.join(process.env.LAMBDA_TASK_ROOT, "sales", "mock-exams", examId, safeFilename));
    }
    const filePath = candidatePaths.find((p) => fs.existsSync(p));
    if (!filePath) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    try {
      const fileBuffer = fs.readFileSync(filePath);
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `inline; filename="${examId}-${safeFilename}"`,
          "Content-Length": String(fileBuffer.length),
          "Cache-Control": "no-store, must-revalidate",
        },
      });
    } catch (err) {
      console.error("[shelf/download] Error reading file:", err);
      return NextResponse.json({ error: "Error reading file" }, { status: 500 });
    }
  }

  const items = getEnrichedShelfItems();

  return NextResponse.json(
    {
      salesDir: "sales/mock-exams",
      items,
    },
    {
      headers: authCookieHeader(),
    },
  );
}

export async function POST(req: Request) {
  if (!isStoreEnabled()) {
    return NextResponse.json({ error: "Store disabled" }, { status: 403 });
  }
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  ensureSalesDir();

  try {
    const contentType = req.headers.get("content-type") || "";

    let id = "";
    let status: ExamStatus | undefined;
    let level: ExamLevel | undefined;
    let title: string | undefined;
    let shortTitle: string | undefined;
    let edition: string | undefined;
    let scope: string | undefined;
    let minutes: number | undefined;
    let fullMark: number | undefined;
    let daimonCount: number | undefined;
    let price: number | undefined;
    let summary: string | undefined;
    let universities: string | undefined;
    let deviation: string | undefined;
    let audience: string | undefined;
    let badges: string[] | undefined;

    // アップロードされたPDFファイル群
    const uploadedPdfs: { key: string; filename: string; buffer: Buffer }[] = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      id = (formData.get("id") as string)?.trim() || "";
      status = (formData.get("status") as ExamStatus) || undefined;
      level = (formData.get("level") as ExamLevel) || undefined;
      title = (formData.get("title") as string)?.trim() || undefined;
      shortTitle = (formData.get("shortTitle") as string)?.trim() || undefined;
      edition = (formData.get("edition") as string)?.trim() || undefined;
      scope = (formData.get("scope") as string)?.trim() || undefined;
      minutes = formData.get("minutes") ? Number(formData.get("minutes")) : undefined;
      fullMark = formData.get("fullMark") ? Number(formData.get("fullMark")) : undefined;
      daimonCount = formData.get("daimonCount") ? Number(formData.get("daimonCount")) : undefined;
      price = formData.get("price") ? Number(formData.get("price")) : undefined;
      summary = (formData.get("summary") as string)?.trim() || undefined;
      universities = (formData.get("universities") as string)?.trim() || undefined;
      deviation = (formData.get("deviation") as string)?.trim() || undefined;
      audience = (formData.get("audience") as string)?.trim() || undefined;

      const rawBadges = (formData.get("badges") as string)?.trim();
      if (rawBadges) {
        badges = rawBadges.split(",").map((s) => s.trim()).filter(Boolean);
      }

      // ファイルの読み出し（fullPdf, problemsPdf など）
      const pdfFieldMappings: { field: string; filename: string }[] = [
        { field: "fullPdf", filename: "full.pdf" },
        { field: "problemsPdf", filename: "problems.pdf" },
        { field: "answerSheetsPdf", filename: "answer-sheets.pdf" },
        { field: "solutionsPdf", filename: "solutions.pdf" },
        { field: "rubricPdf", filename: "rubric.pdf" },
      ];

      for (const mapping of pdfFieldMappings) {
        const fileEntry = formData.get(mapping.field);
        if (fileEntry && typeof fileEntry === "object" && "arrayBuffer" in fileEntry) {
          const file = fileEntry as File;
          if (file.size > 0) {
            const arrayBuffer = await file.arrayBuffer();
            uploadedPdfs.push({
              key: mapping.field,
              filename: mapping.filename,
              buffer: Buffer.from(arrayBuffer),
            });
          }
        }
      }
    } else {
      const payload = (await req.json()) as Partial<MockExam> & {
        universities?: string;
        deviation?: string;
        audience?: string;
      };
      id = payload.id?.trim() || "";
      status = payload.status;
      level = payload.level;
      title = payload.title?.trim();
      shortTitle = payload.shortTitle?.trim();
      edition = payload.edition?.trim();
      scope = payload.scope?.trim();
      minutes = payload.minutes;
      fullMark = payload.fullMark;
      daimonCount = payload.daimonCount;
      price = payload.price;
      summary = payload.summary?.trim();
      universities = payload.target?.universities ?? payload.universities;
      deviation = payload.target?.deviation ?? payload.deviation;
      audience = payload.target?.audience ?? payload.audience;
      badges = payload.badges;
    }

    if (!id || !/^[a-z0-9][a-z0-9-]{1,60}$/.test(id)) {
      return NextResponse.json(
        { error: "模試IDは半角英小文字・数字・ハイフン（2〜60文字）で入力してください。" },
        { status: 400 },
      );
    }

    const itemDir = path.join(SALES_ROOT, id);

    // アップロードされたPDFを保存
    for (const pdf of uploadedPdfs) {
      const destPath = path.join(itemDir, pdf.filename);
      safeWrite(destPath, pdf.buffer);
    }

    const productJsonPath = path.join(itemDir, "product.json");
    const existingData: Partial<MockExam> = getProductJson(id);

    // タイトルと短縮名の整合
    const finalTitle = title || existingData.title || `数学記述模試『入試プレビュー』 ${id}`;
    const finalShortTitle =
      shortTitle || existingData.shortTitle || title?.split(" ")[1] || finalTitle;

    const updatedExam: MockExam = {
      id,
      status: status ?? existingData.status ?? "on-sale",
      level: level ?? existingData.level ?? "zento-standard",
      title: finalTitle,
      shortTitle: finalShortTitle,
      edition: edition || existingData.edition || "2027年度対策",
      target: {
        universities: universities ?? existingData.target?.universities ?? "国公立大・難関私大",
        deviation: deviation ?? existingData.target?.deviation ?? "全統記述 偏差値 55〜65 目安",
        audience: audience ?? existingData.target?.audience ?? "高校生・浪人生",
      },
      scope: scope || existingData.scope || "数学I・A・II・B・C・III",
      minutes: Number(minutes) || existingData.minutes || 100,
      fullMark: Number(fullMark) || existingData.fullMark || 100,
      daimonCount: Number(daimonCount) || existingData.daimonCount || 5,
      price: Number(price) !== undefined && !Number.isNaN(Number(price)) ? Number(price) : (existingData.price ?? 1980),
      badges: badges ?? existingData.badges ?? ["問題・解答用紙・解説・採点基準", "A4 PDF完全版"],
      summary: summary || existingData.summary || "入試プレビュー演習パッケージ",
      aims: existingData.aims ?? [
        "記述答案の減点されない書き方を習熟する。",
        "出題者の意図を読み取り論理的に表現する。",
      ],
      structure: existingData.structure ?? [
        { no: 1, field: "小問集合", points: 20, theme: "標準・頻出小問" },
        { no: 2, field: "微分・積分", points: 20, theme: "応用題" },
        { no: 3, field: "数列", points: 20, theme: "漸化式・和" },
        { no: 4, field: "ベクトル", points: 20, theme: "空間図形" },
        { no: 5, field: "総合問題", points: 20, theme: "発展題" },
      ],
      fields: existingData.fields ?? ["小問集合", "微分積分", "数列", "ベクトル"],
      rubricSample: existingData.rubricSample ?? {
        label: "大問1（小問集合）より",
        problem: "問題の概要",
        parts: [
          {
            no: 1,
            full: 5,
            answer: "模範解答の数値・式",
            plus: [{ text: "方針が立っている", points: 3 }],
            minus: [{ text: "計算ミス", points: -1 }],
          },
        ],
        principles: ["答えのみの答案は不可。導出過程を明記すること。"],
      },
      files: existingData.files ?? [
        { key: "full", label: "一括統合版（問題・解答用紙・解説・採点基準）", note: "A4完全版PDF" },
        { key: "problems", label: "問題冊子", note: "A4印刷用" },
        { key: "answer-sheets", label: "所定解答用紙", note: "大問別解答枠つき" },
        { key: "solutions", label: "解答・解説", note: "模範解答＋別解" },
        { key: "rubric", label: "採点基準", note: "小問別加点・減点表" },
      ],
      previews: existingData.previews ?? [],
      stripePriceId: existingData.stripePriceId,
    };

    safeWrite(productJsonPath, JSON.stringify(updatedExam, null, 2) + "\n");

    const shelfInfo = checkExamFiles(id);

    return NextResponse.json(
      {
        success: true,
        message: `商品「${updatedExam.title}」を${uploadedPdfs.length > 0 ? "PDFファイルと共に" : ""}保存しました。`,
        exam: {
          ...updatedExam,
          shelf: shelfInfo,
        },
      },
      {
        headers: authCookieHeader(),
      },
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[shelf/POST] Error:", err);
    return NextResponse.json({ error: `保存に失敗しました: ${msg}` }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!isStoreEnabled()) {
    return NextResponse.json({ error: "Store disabled" }, { status: 403 });
  }
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const id = url.searchParams.get("id")?.trim();

  if (!id || !/^[a-z0-9][a-z0-9-]{1,60}$/.test(id)) {
    return NextResponse.json({ error: "無効なIDです" }, { status: 400 });
  }

  const itemDir = path.join(SALES_ROOT, id);

  try {
    if (fs.existsSync(itemDir)) {
      fs.rmSync(itemDir, { recursive: true, force: true });
    }
    const tmpDir = path.join("/tmp", "sales-mock-exams", id);
    if (fs.existsSync(tmpDir)) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
    return NextResponse.json(
      {
        success: true,
        message: `商品「${id}」を商品棚から削除しました。`,
      },
      {
        headers: authCookieHeader(),
      },
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `削除に失敗しました: ${msg}` }, { status: 500 });
  }
}
