import { NextResponse } from "next/server";

import { storeSeller } from "@/data/mock-exams";
import { verifyPurchase } from "@/lib/mock-exams/access";
import { downloadName } from "@/lib/mock-exams/catalog";
import { hasOrderDb, recordDownload } from "@/lib/mock-exams/db";
import { StoreConfigError, verifyDownload } from "@/lib/mock-exams/env";
import { PdfNotFoundError, isFileKey, loadExamPdf } from "@/lib/mock-exams/files";
import { stampExamPdf } from "@/lib/mock-exams/watermark";

/**
 * PDF のダウンロード。
 *
 * 閲覧ページが発行した署名つきトークン（15分で失効）を受け取り、
 *   1. 署名と期限を確かめる
 *   2. そのトークンの注文が、いまも支払い済み・閲覧期限内かを確かめ直す（返金済みは止める）
 *   3. 非公開の置き場所から PDF を取り出して、そのまま中継する
 * の順で返す。PDF の本当の在りかは利用者に見せない。
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const deny = (message: string, status: number) =>
  new NextResponse(message, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("t");

  let claims;
  try {
    claims = verifyDownload(token);
  } catch (err) {
    if (err instanceof StoreConfigError) {
      console.error("[mock-exams/download]", err.message);
      return deny("ただいまダウンロードを受け付けられません。", 503);
    }
    throw err;
  }
  if (!claims || !isFileKey(claims.f)) {
    return deny("ダウンロードリンクの有効期限が切れています。購入完了ページを開き直してください。", 410);
  }

  const access = await verifyPurchase(claims.e, claims.s);
  if (!access.ok) {
    const msg =
      access.reason === "refunded"
        ? "返金済みのご注文のため、ダウンロードできません。"
        : access.reason === "expired"
          ? "ダウンロードできる期間を過ぎています。"
          : "ご購入を確認できませんでした。";
    return deny(msg, 403);
  }

  let pdf;
  try {
    pdf = await loadExamPdf(access.exam.id, claims.f);
  } catch (err) {
    if (err instanceof PdfNotFoundError) {
      return deny(`PDF を準備中です。お手数ですが ${storeSeller.email} までご連絡ください。`, 503);
    }
    throw err;
  }

  if (hasOrderDb()) {
    await recordDownload(access.sessionId, claims.f).catch((err) =>
      console.error("[mock-exams/download] 記録に失敗", err),
    );
  }

  let rawBytes: Buffer;
  if (pdf.body instanceof Uint8Array) {
    rawBytes = Buffer.from(pdf.body);
  } else {
    const reader = pdf.body.getReader();
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }
    rawBytes = Buffer.concat(chunks);
  }

  // 不正再配布防止：注文IDごとのセキュリティ透かし・スタンプ刻印
  const stampedBuffer = await stampExamPdf(rawBytes, {
    orderId: access.sessionId,
    examTitle: access.exam.title,
  });

  const name = downloadName(access.exam, claims.f);
  const headers: Record<string, string> = {
    "Content-Type": "application/pdf",
    // 日本語のファイル名は RFC 5987 の形で渡す。古いブラウザ向けに ASCII 名も添える
    "Content-Disposition": `attachment; filename="${access.exam.id}-${claims.f}.pdf"; filename*=UTF-8''${encodeURIComponent(name)}`,
    "Cache-Control": "private, no-store",
    "X-Robots-Tag": "noindex, nofollow",
    "Content-Length": String(stampedBuffer.length),
  };

  return new NextResponse(new Uint8Array(stampedBuffer), { status: 200, headers });
}
