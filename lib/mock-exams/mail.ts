import fs from "node:fs";
import path from "node:path";

import type { MockExam } from "@/data/mock-exams";
import { storeSeller } from "@/data/mock-exams";
import { priceLabel } from "@/lib/mock-exams/catalog";
import { loadExamPdf } from "@/lib/mock-exams/files";
import { stampExamPdf } from "@/lib/mock-exams/watermark";
import { site } from "@/lib/site";

/**
 * 模試演習ストア（/mock-exams）の購入確認メール & 運営控えメール送信。
 *
 * 方針:
 * ・長文や冗長な講釈を廃し、購入者が知りたいこと（お礼・添付PDF・明細・再取得導線・注意点）
 *   を端的に伝える。
 * ・購入教材（MockExam）の定義（タイトル・出題範囲・時間・配点）と
 *   添付PDFの内容を厳密に完全一致させる。
 */

export const DEFAULT_STORE_MAIL_FROM = "大学別数学研究室 公式ストア <info@yuta-eng.com>";
export const DEFAULT_STORE_ADMIN_EMAIL = "morisan.yutakun@gmail.com";

export const storeMailFrom = (): string =>
  process.env.STORE_MAIL_FROM?.trim() ||
  DEFAULT_STORE_MAIL_FROM;

export const storeAdminEmail = (): string =>
  process.env.STORE_ADMIN_EMAIL?.trim() ||
  process.env.MOSHI_ADMIN_EMAIL?.trim() ||
  DEFAULT_STORE_ADMIN_EMAIL;

export const canSendStoreMail = (): boolean =>
  Boolean(process.env.RESEND_API_KEY?.trim());

export type MailResult = {
  ok: boolean;
  detail: string;
  hasAttachment?: boolean;
  attachmentName?: string;
  attachmentSize?: number;
};

export type MailAttachment = {
  filename: string;
  content: string; // base64
  contentId?: string;
  content_id?: string;
  contentType?: string;
  content_type?: string;
  disposition?: string;
};

/**
 * コンビニ各社の公式ロゴ（public/images/stores/）をインラインCID添付用に読み込む
 */
export function getStoreLogoAttachments(): MailAttachment[] {
  try {
    const dir = path.join(process.cwd(), "public", "images", "stores");
    const sevenPath = path.join(dir, "seven-eleven.png");
    const lawsonPath = path.join(dir, "lawson.png");
    const familyPath = path.join(dir, "familymart.png");

    const attachments: MailAttachment[] = [];

    if (fs.existsSync(sevenPath)) {
      const content = fs.readFileSync(sevenPath).toString("base64");
      attachments.push({
        filename: "seven-eleven.png",
        content,
        contentId: "seven-eleven-logo",
        content_id: "seven-eleven-logo",
        contentType: "image/png",
        content_type: "image/png",
        disposition: "inline",
      });
    }

    if (fs.existsSync(lawsonPath)) {
      const content = fs.readFileSync(lawsonPath).toString("base64");
      attachments.push({
        filename: "lawson.png",
        content,
        contentId: "lawson-logo",
        content_id: "lawson-logo",
        contentType: "image/png",
        content_type: "image/png",
        disposition: "inline",
      });
    }

    if (fs.existsSync(familyPath)) {
      const content = fs.readFileSync(familyPath).toString("base64");
      attachments.push({
        filename: "familymart.png",
        content,
        contentId: "familymart-logo",
        content_id: "familymart-logo",
        contentType: "image/png",
        content_type: "image/png",
        disposition: "inline",
      });
    }

    return attachments;
  } catch (err) {
    console.warn("[mock-exams/mail] コンビニロゴ画像の読み込み失敗:", err);
    return [];
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/**
 * Resend の HTTP API への送信処理。
 */
async function postToResend(payload: Record<string, unknown>, label: string): Promise<MailResult> {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) {
    console.warn(`[mock-exams/mail] RESEND_API_KEY 未設定のため ${label} の送信をスキップしました`);
    return { ok: false, detail: "RESEND_API_KEY が未設定です" };
  }

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        return { ok: true, detail: "ok" };
      }

      const body = await res.text().catch(() => "");
      let message = body.slice(0, 180);
      try {
        const j = JSON.parse(body);
        message = String(j.message ?? j.error ?? message).slice(0, 180);
      } catch {
        /* parse error fallback */
      }
      const detail = `${res.status} ${message}`.trim();

      if (res.status === 429 && attempt === 0) {
        await sleep(1100);
        continue;
      }

      console.error(`[mock-exams/mail] ${label} 送信失敗: ${detail}`);
      return { ok: false, detail };
    } catch (err) {
      const detail = err instanceof Error ? err.message.slice(0, 180) : "通信エラー";
      console.error(`[mock-exams/mail] ${label} 通信例外: ${detail}`);
      return { ok: false, detail };
    }
  }

  return { ok: false, detail: "429 レート制限が継続" };
}

/**
 * 購入商品に対応する full.pdf（全冊子まとめ）を取得し、
 * 購入者ごとの再配布防止透かし（セキュリティヘッダー・フッター・低濃度斜め透かし）を
 * 埋め込んだ上で Base64 添付オブジェクトを生成
 */
export async function getExamPdfAttachment(
  examId: string,
  examTitle: string,
  options?: { orderId?: string; customerEmail?: string },
): Promise<{ attachment: MailAttachment; size: number } | null> {
  try {
    const pdfSource = await loadExamPdf(examId, "full");
    let buffer: Buffer;

    if (pdfSource.body instanceof Uint8Array) {
      buffer = Buffer.from(pdfSource.body);
    } else {
      const reader = pdfSource.body.getReader();
      const chunks: Uint8Array[] = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) chunks.push(value);
      }
      buffer = Buffer.concat(chunks);
    }

    // PDF表紙と完全一致するファイル名（例: 数学記述模試『入試プレビュー』第1セット［基礎〜標準・定着編］.pdf）
    let cleanTitle = examTitle.split("（")[0] || examTitle;
    cleanTitle = cleanTitle.replace(/[/\\?%*:|"<>]/g, "_").trim();
    const filename = `${cleanTitle}.pdf`;

    // 不正再配布防止の動的透かし＆セキュリティスタンプ刻印
    const stampedBuffer = await stampExamPdf(buffer, {
      orderId: options?.orderId,
      customerEmail: options?.customerEmail,
      examTitle: cleanTitle,
    });

    return {
      attachment: {
        filename,
        content: stampedBuffer.toString("base64"),
      },
      size: stampedBuffer.byteLength,
    };
  } catch (err) {
    console.warn(`[mock-exams/mail] PDF添付の読み込み失敗 (${examId}):`, err instanceof Error ? err.message : err);
    return null;
  }
}

const C = {
  ink: "#15181c",
  ink2: "#434a53",
  ink3: "#666d76",
  rule: "#e0e3e7",
  band: "#f5f6f8",
  navy: "#1b3a63",
  accent: "#b3412f",
};

function formatExpiryDate(days: number): string {
  const d = new Date(Date.now() + days * 86400000);
  const y = d.toLocaleDateString("ja-JP", { year: "numeric", timeZone: "Asia/Tokyo" }).replace(/\D/g, "");
  const m = d.toLocaleDateString("ja-JP", { month: "numeric", timeZone: "Asia/Tokyo" }).replace(/\D/g, "");
  const day = d.toLocaleDateString("ja-JP", { day: "numeric", timeZone: "Asia/Tokyo" }).replace(/\D/g, "");
  return `${y}年${m}月${day}日`;
}

function formatExpiryDateText(days: number): string {
  const d = new Date(Date.now() + days * 86400000);
  return d.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  });
}

/* ─────────────────────────────────────────────────────────────────────────────
 * 顧客向け購入確認メールのテンプレート（本番入試プレビュー公式トーン＆カラー統一）
 * ──────────────────────────────────────────────────────────────────────────── */

export function buildCustomerMailHtml(
  exam: MockExam,
  viewUrl: string,
  days: number,
  hasAttachment: boolean,
  attachmentName?: string,
): string {
  const expiry = formatExpiryDate(days);
  const pdfName = attachmentName || `${exam.title}.pdf`;
  const cleanTitle = exam.title.split("（")[0] || exam.title;
  const cleanShortName = exam.shortTitle || cleanTitle;

  return `<!doctype html>
<html lang="ja"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>【お支払い完了】入試プレビュー ${esc(cleanShortName)}</title>
</head>
<body style="margin:0;padding:0;background:${C.band};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Hiragino Sans','Hiragino Kaku Gothic ProN',Meiryo,sans-serif;color:${C.ink};line-height:1.6;-webkit-font-smoothing:antialiased;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
       style="background:${C.band};padding:24px 12px;">
<tr><td align="center">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
       style="max-width:560px;background:#ffffff;border:1px solid ${C.rule};text-align:left;border-radius:6px;overflow:hidden;">

  <!-- 1. ブランドヘッダー（本番公式トーン） -->
  <tr><td style="padding:16px 24px;border-bottom:1px solid ${C.rule};background:#ffffff;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      <td style="width:20px;height:20px;background:${C.navy};border-radius:3px;"></td>
      <td style="padding-left:10px;font-size:13.5px;font-weight:700;color:${C.ink};letter-spacing:.02em;">
        ${esc(storeSeller.storeName)}
      </td>
    </tr></table>
  </td></tr>

  <!-- 2. タイトル＆お礼メッセージ -->
  <tr><td style="padding:28px 24px 20px;">
    
    <div style="font-size:11.5px;font-weight:700;letter-spacing:.08em;color:${C.accent};margin-bottom:8px;">
      ● お支払い完了 ｜ 教材納品のお知らせ
    </div>
    <h1 style="margin:0 0 14px 0;font-size:18px;line-height:1.45;color:${C.ink};font-weight:800;letter-spacing:-.01em;">
      <span style="display:inline-block;">数学記述模試『入試プレビュー』</span><br>
      <span style="display:inline-block;">${esc(cleanShortName)}</span>
    </h1>
    <p style="margin:0;font-size:13.5px;line-height:1.8;color:${C.ink2};">
      このたびは教材をご購入いただき、誠にありがとうございます。<br>
      お支払いが完了いたしましたので、演習用教材PDFをお届けいたします。
    </p>

    <!-- ご注文明細（上下1pxの細い境界線・端正な配置） -->
    <div style="border-top:1px solid ${C.rule};border-bottom:1px solid ${C.rule};padding:14px 0;margin:22px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="font-size:13.5px;font-weight:700;color:${C.ink};padding:2px 0;line-height:1.5;">
            <span style="display:inline-block;">入試プレビュー</span> <span style="display:inline-block;">${esc(cleanShortName)}</span>
          </td>
          <td align="right" style="font-size:14.5px;font-weight:800;color:${C.accent};text-align:right;white-space:nowrap;padding-left:14px;vertical-align:middle;">
            ¥${exam.price.toLocaleString("ja-JP")}（税込）
          </td>
        </tr>
      </table>
    </div>

    <!-- 3. STEP 01：教材PDFを保存する（注釈を削りスッキリと） -->
    <div style="padding-bottom:22px;border-bottom:1px solid ${C.rule};">
      <div style="font-size:11px;font-weight:800;color:${C.navy};letter-spacing:.08em;margin-bottom:4px;">
        STEP 01
      </div>
      <div style="font-size:15px;font-weight:800;color:${C.ink};margin-bottom:8px;">
        教材PDFを保存する
      </div>
      <p style="margin:0 0 16px 0;font-size:13.5px;line-height:1.8;color:${C.ink2};">
        本メールに添付しているPDF（問題・解答用紙・解答解説・採点基準の全4点収録）を端末に保存してください。iPadやPCなど別端末でダウンロードしたい方は、下記専用ページをご利用いただけます。
      </p>

      <!-- 独立したフルワイドボタン -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
        <tr>
          <td style="background:${C.navy};border-radius:4px;text-align:center;">
            <a href="${esc(viewUrl)}" style="display:block;width:100%;box-sizing:border-box;padding:13px 20px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;text-align:center;letter-spacing:.02em;">
              専用ダウンロードページを開く →
            </a>
          </td>
        </tr>
      </table>
      <div style="font-size:11px;color:${C.ink3};text-align:center;">
        再ダウンロード有効期限：${expiry}まで
      </div>
    </div>

    <!-- 4. STEP 02：印刷して演習を始める（公式ロゴ活用・不自然な改行ゼロ） -->
    <div style="padding-top:22px;">
      <div style="font-size:11px;font-weight:800;color:${C.navy};letter-spacing:.08em;margin-bottom:4px;">
        STEP 02
      </div>
      <div style="font-size:15px;font-weight:800;color:${C.ink};margin-bottom:4px;">
        印刷して演習を始める
      </div>
      <div style="font-size:12.5px;color:${C.ink3};margin-bottom:12px;">
        試験仕様：制限時間 ${exam.minutes}分 ｜ ${exam.fullMark}点満点 ｜ 大問${exam.daimonCount}題
      </div>

      <div style="font-size:13px;line-height:1.8;color:${C.ink2};margin-bottom:14px;">
        本番通りの記述枠サイズで演習いただくため、プリンター設定で<strong>「実際のサイズ（A4・倍率100%）」</strong>を選択して印刷してください。ご自宅にプリンターがない場合も、コンビニ複合機から即日A4印刷が可能です。
      </div>

      <!-- コンビニ印刷対応（各社公式ロゴ画像・3行テーブル） -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
             style="border:1px solid ${C.rule};border-radius:4px;background:#f8fafc;border-collapse:collapse;">
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;width:76px;vertical-align:middle;">
            <img src="cid:seven-eleven-logo" alt="セブン-イレブン" width="76" height="25" style="width:76px;height:25px;display:block;" border="0">
          </td>
          <td style="padding:10px 8px;border-bottom:1px solid #e2e8f0;font-size:13px;font-weight:700;color:${C.ink};vertical-align:middle;">
            セブン-イレブン
          </td>
          <td align="right" style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-size:12px;color:${C.ink2};text-align:right;vertical-align:middle;white-space:nowrap;">
            かんたんnetprint
          </td>
        </tr>
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;width:76px;vertical-align:middle;">
            <img src="cid:lawson-logo" alt="ローソン" width="76" height="25" style="width:76px;height:25px;display:block;" border="0">
          </td>
          <td style="padding:10px 8px;border-bottom:1px solid #e2e8f0;font-size:13px;font-weight:700;color:${C.ink};vertical-align:middle;">
            ローソン
          </td>
          <td align="right" style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-size:12px;color:${C.ink2};text-align:right;vertical-align:middle;white-space:nowrap;">
            ネットワークプリント
          </td>
        </tr>
        <tr>
          <td style="padding:10px 12px;width:76px;vertical-align:middle;">
            <img src="cid:familymart-logo" alt="ファミリーマート" width="76" height="25" style="width:76px;height:25px;display:block;" border="0">
          </td>
          <td style="padding:10px 8px;font-size:13px;font-weight:700;color:${C.ink};vertical-align:middle;">
            ファミリーマート
          </td>
          <td align="right" style="padding:10px 12px;font-size:12px;color:${C.ink2};text-align:right;vertical-align:middle;white-space:nowrap;">
            ネットワークプリント
          </td>
        </tr>
      </table>

    </div>

  </td></tr>

  <!-- 5. フッター -->
  <tr><td style="padding:18px 24px 20px;border-top:1px solid ${C.rule};background:${C.band};font-size:12px;line-height:1.8;color:${C.ink3};">
    <div style="font-size:12.5px;font-weight:700;color:${C.ink};margin-bottom:2px;">
      ${esc(storeSeller.storeName)}
    </div>
    <div>
      公式ストア：<a href="${site.url}/mock-exams" style="color:${C.navy};text-decoration:none;">${esc(site.url.replace(/^https?:\/\//, ""))}/mock-exams</a>
      ${storeSeller.email ? `　|　お問い合わせ：<a href="mailto:${esc(storeSeller.email)}" style="color:${C.navy};text-decoration:none;">${esc(storeSeller.email)}</a>` : ""}
    </div>
  </td></tr>

</table>

</td></tr></table>
</body></html>`;
}

export function buildCustomerMailText(
  exam: MockExam,
  viewUrl: string,
  days: number,
  hasAttachment: boolean,
  attachmentName?: string,
): string {
  const expiry = formatExpiryDateText(days);
  const pdfName = attachmentName || `${exam.title}.pdf`;
  const cleanTitle = exam.title.split("（")[0] || exam.title;
  const cleanShortName = exam.shortTitle || cleanTitle;

  return [
    `【ご購入完了】入試プレビュー ${cleanShortName}`,
    "",
    `${storeSeller.storeName} をご利用いただき、誠にありがとうございます。`,
    "代金のお支払いが完了いたしましたので、演習用教材PDFをお届けいたします。",
    "",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "■ ご注文内容",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    `・ご注文商品：入試プレビュー ${cleanShortName}`,
    `・決済金額　：¥${exam.price.toLocaleString("ja-JP")}（税込・決済完了）`,
    "",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "■ 教材のご利用手順",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "【STEP 01】教材PDFを保存する",
    `本メール添付の「${pdfName}」を開いて保存してください。`,
    "問題冊子・所定解答用紙・解答解説・採点基準の全4点がすべて1冊にまとまっています。",
    "",
    "別端末でのダウンロードや再取得は、以下の専用ページをご利用いただけます。",
    `（有効期限：${expiry}まで）`,
    viewUrl,
    "",
    "【STEP 02】印刷して演習を始める",
    `試験仕様：制限時間 ${exam.minutes}分 ｜ ${exam.fullMark}点満点 ｜ 大問${exam.daimonCount}題`,
    "解答用紙はプリンター設定で「実際のサイズ（A4・倍率100%）」を選択しての印刷を推奨しています。",
    "セブン-イレブン（かんたんnetprint）やローソン・ファミマ（ネットワークプリント）でも即日A4印刷可能です。",
    "",
    "───────────────────────────────────",
    storeSeller.storeName,
    `お問い合わせ：${storeSeller.email}`,
    `Webサイト：${site.url}/mock-exams`,
  ].join("\n");
}

/* ─────────────────────────────────────────────────────────────────────────────
 * 運営向け注文確定控えメールのテンプレート（端的・要点重視）
 * ──────────────────────────────────────────────────────────────────────────── */

export type AdminPurchaseNoticeParams = {
  customerEmail: string;
  exam: MockExam;
  viewUrl: string;
  days: number;
  sessionId: string;
  paymentIntentId?: string | null;
  amountTotal?: number | null;
  livemode?: boolean;
  hasAttachment?: boolean;
  attachmentName?: string;
  attachmentSize?: number;
};

export function buildAdminNoticeHtml(p: AdminPurchaseNoticeParams): string {
  const dateStr = new Date().toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const pi = p.paymentIntentId || "なし";
  const stripeDashboardUrl = pi !== "なし"
    ? `https://dashboard.stripe.com/${p.livemode ? "" : "test/"}payments/${pi}`
    : `https://dashboard.stripe.com/${p.livemode ? "" : "test/"}workbench/overview`;

  return `<!doctype html>
<html lang="ja"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>【注文確定】${esc(p.exam.title)}</title></head>
<body style="margin:0;padding:20px;background:#f5f6f8;font-family:'Helvetica Neue',Arial,sans-serif;color:#15181c;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
       style="max-width:540px;margin:0 auto;background:#fff;border:1px solid #e0e3e7;text-align:left;">
  <tr><td style="padding:14px 18px;border-bottom:2px solid #1b3a63;">
    <div style="font-size:11px;font-weight:700;color:#1b3a63;">
      大学別数学研究室 公式ストア・運営控え
    </div>
    <div style="margin-top:4px;font-size:16px;font-weight:700;color:#15181c;">
      教材の注文が確定しました（決済完了）
    </div>
  </td></tr>

  <tr><td style="padding:10px 18px 14px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-size:12.5px;">
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #e0e3e7;color:#666d76;width:96px;">受付日時</td>
        <td style="padding:8px 0;border-bottom:1px solid #e0e3e7;color:#15181c;">${dateStr}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #e0e3e7;color:#666d76;">商品名</td>
        <td style="padding:8px 0;border-bottom:1px solid #e0e3e7;font-weight:700;color:#15181c;">${esc(p.exam.title)}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #e0e3e7;color:#666d76;">決済金額</td>
        <td style="padding:8px 0;border-bottom:1px solid #e0e3e7;font-weight:700;color:#b3412f;">${esc(priceLabel(p.exam))}（決済確定）</td>
      </tr>
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #e0e3e7;color:#666d76;">購入者</td>
        <td style="padding:8px 0;border-bottom:1px solid #e0e3e7;color:#15181c;"><a href="mailto:${esc(p.customerEmail)}" style="color:#1b3a63;">${esc(p.customerEmail)}</a></td>
      </tr>
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #e0e3e7;color:#666d76;">セッションID</td>
        <td style="padding:8px 0;border-bottom:1px solid #e0e3e7;font-family:monospace;font-size:11.5px;color:#434a53;">${esc(p.sessionId)}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #e0e3e7;color:#666d76;">PDF添付</td>
        <td style="padding:8px 0;border-bottom:1px solid #e0e3e7;color:#1b3a63;font-weight:700;">添付完了（${esc(p.attachmentName ?? "full.pdf")}）</td>
      </tr>
      <tr>
        <td style="padding:8px 0;color:#666d76;">再DL用URL</td>
        <td style="padding:8px 0;"><a href="${esc(p.viewUrl)}" style="color:#1b3a63;font-size:11.5px;word-break:break-all;">${esc(p.viewUrl)}</a></td>
      </tr>
    </table>
  </td></tr>

  <tr><td style="padding:0 18px 16px;">
    <a href="${stripeDashboardUrl}" style="display:inline-block;padding:8px 16px;background:#1b3a63;font-size:12px;font-weight:700;color:#ffffff;text-decoration:none;">
      Stripe 管理画面で確認 →
    </a>
  </td></tr>
</table>

</body></html>`;
}

export function buildAdminNoticeText(p: AdminPurchaseNoticeParams): string {
  const dateStr = new Date().toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return [
    `【注文確定】${p.exam.title}`,
    "",
    "教材の注文が確定しました（決済完了）。",
    "",
    `・受付日時　: ${dateStr}`,
    `・商品名　　: ${p.exam.title} (${p.exam.id})`,
    `・決済金額　: ${priceLabel(p.exam)}`,
    `・購入者　　: ${p.customerEmail}`,
    `・セッション: ${p.sessionId}`,
    `・PDF添付 　: 添付完了 (${p.attachmentName ?? "full.pdf"})`,
    `・再DL用URL : ${p.viewUrl}`,
    "",
    "Stripe 管理画面: " +
      (p.paymentIntentId
        ? `https://dashboard.stripe.com/${p.livemode ? "" : "test/"}payments/${p.paymentIntentId}`
        : `https://dashboard.stripe.com/${p.livemode ? "" : "test/"}workbench/overview`),
  ].join("\n");
}

/* ─────────────────────────────────────────────────────────────────────────────
 * 送信関数本体
 * ──────────────────────────────────────────────────────────────────────────── */

/**
 * 購入者へ購入確認メールを送信（PDFを添付）
 */
export async function sendPurchaseMail(
  to: string,
  exam: MockExam,
  viewUrl: string,
  days: number,
  sessionId?: string,
): Promise<MailResult> {
  const from = storeMailFrom();

  // full.pdf 添付ファイルの読み込み & 購入者限定セキュリティスタンプ
  const pdfData = await getExamPdfAttachment(exam.id, exam.title, {
    orderId: sessionId,
    customerEmail: to,
  });
  const hasAttachment = Boolean(pdfData);
  const attachmentName = pdfData?.attachment.filename;

  const html = buildCustomerMailHtml(exam, viewUrl, days, hasAttachment, attachmentName);
  const text = buildCustomerMailText(exam, viewUrl, days, hasAttachment, attachmentName);

  const cleanShortName = exam.shortTitle || exam.title.split("（")[0] || exam.title;
  const cleanShort = cleanShortName.replace(/^数学記述模試『入試プレビュー』\s*/, "").replace(/^入試プレビュー\s*/, "");

  const payload: Record<string, unknown> = {
    from,
    to: [to],
    reply_to: storeSeller.email,
    subject: `【ご購入完了】入試プレビュー ${cleanShort}`,
    html,
    text,
  };

  const attachments: MailAttachment[] = [];
  // 1. 各コンビニのインラインロゴ画像（数KB）を先頭に配置（メール受信時の即時表示）
  const storeLogos = getStoreLogoAttachments();
  if (storeLogos.length > 0) {
    attachments.push(...storeLogos);
  }
  // 2. 演習用PDF本編（約500KB）を配置
  if (pdfData) {
    attachments.push(pdfData.attachment);
  }
  if (attachments.length > 0) {
    payload.attachments = attachments;
  }

  const result = await postToResend(payload, "購入者への確認メール");
  return {
    ...result,
    hasAttachment,
    attachmentName,
    attachmentSize: pdfData?.size,
  };
}

/**
 * 運営（morisan.yutakun@gmail.com）へ注文確定の控えメールを送信
 */
export async function sendAdminPurchaseNotice(
  p: AdminPurchaseNoticeParams,
): Promise<MailResult> {
  const from = storeMailFrom();
  const to = storeAdminEmail();

  // 運営控えにも同じ透かし入り PDF を添付
  const pdfData = await getExamPdfAttachment(p.exam.id, p.exam.title, {
    orderId: p.sessionId,
    customerEmail: p.customerEmail,
  });
  const hasAttachment = Boolean(pdfData);
  const attachmentName = pdfData?.attachment.filename;

  const paramsWithAttachment: AdminPurchaseNoticeParams = {
    ...p,
    hasAttachment,
    attachmentName,
    attachmentSize: pdfData?.size,
  };

  const html = buildAdminNoticeHtml(paramsWithAttachment);
  const text = buildAdminNoticeText(paramsWithAttachment);

  const cleanShortName = p.exam.shortTitle || p.exam.title.split("（")[0] || p.exam.title;
  const subject = `【注文確定】入試プレビュー ${cleanShortName}（${priceLabel(p.exam)} / ${p.customerEmail}）`;

  const payload: Record<string, unknown> = {
    from,
    to: [to],
    reply_to: p.customerEmail,
    subject,
    html,
    text,
  };

  if (pdfData) {
    payload.attachments = [pdfData.attachment];
  }

  return postToResend(payload, "運営への注文確定控え");
}
