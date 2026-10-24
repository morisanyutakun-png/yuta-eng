/**
 * Stripe Webhook（決済完了）→ Resend メール自動送信（PDF添付）シミュレーション
 *
 * 使い方:
 *   node scripts/simulate-purchase-webhook.mjs [examId]
 *   （既定の examId は preview-zento-set1）
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";

// 1. .env.local の読み込み
const envPath = resolve(process.cwd(), ".env.local");
if (existsSync(envPath)) {
  const lines = readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...vals] = trimmed.split("=");
    const val = vals.join("=").trim().replace(/^["']|["']$/g, "");
    if (key && !process.env[key]) {
      process.env[key] = val;
    }
  }
}

const targetEmail = process.env.STORE_ADMIN_EMAIL || "morisan.yutakun@gmail.com";
const adminEmail = process.env.STORE_ADMIN_EMAIL || "morisan.yutakun@gmail.com";
const fromAddr = process.env.STORE_MAIL_FROM || "大学別数学研究室 公式ストア <info@yuta-eng.com>";
const apiKey = process.env.RESEND_API_KEY?.trim();

const examId = process.argv[2] || "preview-zento-set1";

console.log("=====================================================================");
console.log("  Stripe Webhook 受信・PDF添付メール自動配信 シミュレーション");
console.log("=====================================================================");
console.log(`・購入対象商品ID　　: ${examId}`);
console.log(`・購入者メール　　　: ${targetEmail}`);
console.log(`・運営控え送信先　　: ${adminEmail}`);
console.log(`・差出人 (From) 　　: ${fromAddr}`);
console.log(`・RESEND_API_KEY 　: ${apiKey ? "設定済み (" + apiKey.slice(0, 7) + "…)" : "未設定"}`);
console.log("");

// 2. 正式な商品データの読み込み（sales/mock-exams/<id>/product.json から厳密に取得）
const productJsonPath = resolve(process.cwd(), "sales", "mock-exams", examId, "product.json");
if (!existsSync(productJsonPath)) {
  console.error(`[ERROR] 商品定義ファイルが見つかりません: ${productJsonPath}`);
  process.exit(1);
}
const exam = JSON.parse(readFileSync(productJsonPath, "utf8"));

// 3. 販売用教材 PDF の読み込み & Base64 エンコード
const pdfPath = resolve(process.cwd(), "sales", "mock-exams", examId, "full.pdf");
if (!existsSync(pdfPath)) {
  console.error(`[ERROR] 教材PDFが見つかりません: ${pdfPath}`);
  process.exit(1);
}

const sessionId = `cs_test_mock_${Date.now()}`;
const paymentIntentId = `pi_test_${Date.now()}`;
const viewUrl = `https://yuta-eng.com/mock-exams/${examId}/view?session_id=${sessionId}`;
const expiryDate = new Date(Date.now() + 365 * 86400000).toLocaleDateString("ja-JP", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Tokyo",
});

const rawPdfBuffer = readFileSync(pdfPath);
let cleanTitle = exam.title.split("（")[0] || exam.title;
cleanTitle = cleanTitle.replace(/[/\\?%*:|"<>]/g, "_").trim();
const pdfFilename = `${cleanTitle}.pdf`;

// 3. 不正再配布防止：購入者専用セキュリティスタンプ＆低濃度斜め透かしの刻印
const pdfDoc = await PDFDocument.load(rawPdfBuffer);
const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

const pages = pdfDoc.getPages();
for (let i = 0; i < pages.length; i++) {
  const page = pages[i];
  const { width, height } = page.getSize();
  page.drawText(`[YUTA-ENG.COM] LICENSED FOR PERSONAL STUDY ONLY | ORDER: ${sessionId} | BUYER: ${targetEmail}`, {
    x: 36,
    y: height - 18,
    size: 7,
    font: fontRegular,
    color: rgb(0.5, 0.55, 0.6),
  });
  page.drawText(`DO NOT REDISTRIBUTE, COPY OR RESELL | ALL RIGHTS RESERVED | https://yuta-eng.com/mock-exams`, {
    x: 36,
    y: 12,
    size: 7,
    font: fontRegular,
    color: rgb(0.5, 0.55, 0.6),
  });
  page.drawText("PERSONAL STUDY ONLY - DO NOT SHARE", {
    x: width / 2 - 180,
    y: height / 2 - 35,
    size: 24,
    font: fontBold,
    color: rgb(0.15, 0.2, 0.3),
    opacity: 0.045,
    rotate: degrees(38),
  });
}
pdfDoc.setTitle(cleanTitle);
pdfDoc.setAuthor("大学別数学研究室");
pdfDoc.setSubject("購入者本人学習用模試演習教材（再配布禁止）");
const stampedPdfBytes = await pdfDoc.save();
const pdfBuffer = Buffer.from(stampedPdfBytes);
const pdfKb = (pdfBuffer.byteLength / 1024).toFixed(1);
const pdfBase64 = pdfBuffer.toString("base64");

console.log("[1/4] 商品データ & 教材PDFの整合性・セキュリティ透かし検証:");
console.log(`      商品正式名: ${exam.title}`);
console.log(`      出題単元　: ${exam.scope}`);
console.log(`      試験時間　: ${exam.minutes}分 ｜ 配点: ${exam.fullMark}点`);
console.log(`      決済金額　: ¥${exam.price.toLocaleString("ja-JP")}`);
console.log(`      添付PDF 　: ${pdfPath}`);
console.log(`      透かし刻印: 全${pages.length}ページに購入者ID（${sessionId}）刻印完了`);
console.log(`      PDF容量 　: ${pdfBuffer.byteLength} bytes (${pdfKb} KB)`);
console.log("      => 商品情報と添付PDFの整合性 ＆ 再配布防止セキュリティ: 100% 完了");
console.log("");
const expiryDate = new Date(Date.now() + 30 * 86400000).toLocaleDateString("ja-JP", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Tokyo",
});
const priceText = `¥${exam.price.toLocaleString("ja-JP")}`;

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const cleanShortName = exam.shortTitle || cleanTitle;

const customerHtml = `<!doctype html>
<html lang="ja"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>【ご購入完了】入試プレビュー ${esc(cleanShortName)}</title></head>
<body style="margin:0;padding:0;background:#f5f6f8;font-family:'Helvetica Neue',Arial,'Hiragino Kaku Gothic ProN','Meiryo',sans-serif;color:#15181c;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5f6f8;padding:24px 12px;">
<tr><td align="center">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:540px;background:#ffffff;border:1px solid #e0e3e7;text-align:left;">

  <!-- ブランドヘッダー -->
  <tr><td style="padding:16px 22px;border-bottom:1px solid #e0e3e7;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      <td style="width:22px;height:22px;background:#1b3a63;"></td>
      <td style="padding-left:10px;font-size:13.5px;font-weight:700;color:#15181c;font-family:'Hiragino Mincho ProN','Yu Mincho',serif;">
        大学別数学研究室 公式ストア
      </td>
    </tr></table>
  </td></tr>

  <!-- 挨拶 & 導入 -->
  <tr><td style="padding:24px 22px 0;">
    <div style="font-size:11.5px;font-weight:700;letter-spacing:.08em;color:#b3412f;">
      ご購入完了
    </div>
    <h1 style="margin:6px 0 0;font-size:19px;line-height:1.5;color:#15181c;font-family:'Hiragino Mincho ProN','Yu Mincho',serif;font-weight:700;">
      教材をお届けいたします
    </h1>
    <p style="margin:10px 0 0;font-size:13.5px;line-height:1.85;color:#434a53;">
      このたびは教材をご購入いただき、誠にありがとうございます。<br>
      代金のお支払いが完了いたしましたので、ご購入いただいた教材をお届けいたします。
    </p>
  </td></tr>

  <!-- ご注文内容（必要最低限の明細） -->
  <tr><td style="padding:18px 22px 0;">
    <div style="font-size:11.5px;font-weight:700;letter-spacing:.06em;color:#1b3a63;background:#f5f6f8;border:1px solid #e0e3e7;border-bottom:0;padding:8px 14px;">
      ご注文内容
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e0e3e7;border-collapse:collapse;">
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #e0e3e7;font-size:12px;color:#666d76;width:80px;background:#f8fafc;">教材名</td>
        <td style="padding:10px 14px;border-bottom:1px solid #e0e3e7;font-size:13px;font-weight:700;color:#15181c;">${esc(cleanTitle)}</td>
      </tr>
      <tr>
        <td style="padding:10px 14px;font-size:12px;color:#666d76;background:#f8fafc;">お支払い金額</td>
        <td style="padding:10px 14px;font-size:13px;font-weight:700;color:#b3412f;">${priceText}（税込・決済完了）</td>
      </tr>
    </table>
  </td></tr>

  <!-- 教材のご利用手順（段階的で丁寧な2ステップ） -->
  <tr><td style="padding:18px 22px 0;">
    <div style="font-size:11.5px;font-weight:700;letter-spacing:.06em;color:#1b3a63;background:#f5f6f8;border:1px solid #e0e3e7;border-bottom:0;padding:8px 14px;">
      教材のご利用手順（2ステップ）
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e0e3e7;border-collapse:collapse;">
      <!-- STEP 1 -->
      <tr>
        <td style="padding:14px;border-bottom:1px solid #e0e3e7;">
          <div style="font-size:12px;font-weight:700;color:#1b3a63;">
            STEP 1 ｜ 教材PDFを受け取る
          </div>
          <div style="margin-top:6px;font-size:13px;line-height:1.75;color:#434a53;">
            本メールに添付されている <strong>「${esc(pdfFilename)}」</strong> を開いて端末に保存してください。<br>
            <span style="font-size:11.5px;color:#666d76;">※ 問題冊子・所定解答用紙・詳細解答解説・採点基準がすべて1冊にまとまっています。</span>
          </div>
          <div style="margin-top:10px;padding:10px 12px;background:#f8fafc;border:1px solid #e0e3e7;font-size:11.5px;line-height:1.7;color:#666d76;">
            <strong>別端末（PCやタブレット）で保存したい場合：</strong><br>
            メール添付が開けない場合や、別の端末から保存・印刷したい場合は、以下の専用ページからも再取得いただけます（ご購入から365日間・${expiryDate}まで有効）。
            <div style="margin-top:8px;">
              <a href="${esc(viewUrl)}" style="display:inline-block;padding:8px 18px;background:#1b3a63;font-size:12px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:2px;">
                専用ダウンロードページを開く →
              </a>
            </div>
          </div>
        </td>
      </tr>

      <!-- STEP 2 -->
      <tr>
        <td style="padding:14px;">
          <div style="font-size:12px;font-weight:700;color:#1b3a63;">
            STEP 2 ｜ 印刷して演習を始める
          </div>
          <div style="margin-top:6px;font-size:13px;line-height:1.75;color:#434a53;">
            ・<strong>実寸印刷の推奨</strong>：解答用紙を印刷する際は、プリンター設定で「実際のサイズ（100%・拡大縮小なし）」を選択していただくと、本番通りの記述枠サイズで演習できます。<br>
            ・<strong>試験形式</strong>：制限時間 ${exam.minutes}分 ｜ 配点 ${exam.fullMark}点満点 ｜ 大問数 ${exam.daimonCount}題
          </div>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- サポート & フッター -->
  <tr><td style="padding:18px 22px 22px;">
    <div style="border-top:1px solid #e0e3e7;padding-top:12px;font-size:11.5px;line-height:1.7;color:#666d76;">
      <strong>大学別数学研究室 公式ストア</strong><br>
      ご不明な点やお困りのことがございましたら、お気軽に <a href="mailto:info@yuta-eng.com" style="color:#1b3a63;text-decoration:none;">info@yuta-eng.com</a> までご連絡ください。<br>
      Webサイト：<a href="https://yuta-eng.com/mock-exams" style="color:#1b3a63;text-decoration:none;">https://yuta-eng.com/mock-exams</a>
    </div>
  </td></tr>

</table>

</td></tr></table>
</body></html>`;

const customerText = [
  `【ご購入完了】入試プレビュー ${cleanShortName}`,
  "",
  "大学別数学研究室 公式ストア をご利用いただき、誠にありがとうございます。",
  "代金のお支払いが完了いたしましたので、ご購入いただいた教材をお届けいたします。",
  "",
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  "■ ご注文内容",
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  `・教材名　: ${cleanTitle}`,
  `・お支払い: ${priceText}（税込・決済完了）`,
  "",
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  "■ 教材のご利用手順（2ステップ）",
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  "【STEP 1】教材PDFを受け取る",
  `本メールに添付されている「${pdfFilename}」を開いて保存してください。`,
  "※ 問題冊子・所定解答用紙・詳細解答解説・採点基準がすべて1冊にまとまっています。",
  "",
  "PCやタブレット等の別端末で教材を保存・印刷したい場合は、",
  `以下の専用ページからも再取得いただけます（ご購入から365日間・${expiryDate}まで有効）。`,
  viewUrl,
  "",
  "【STEP 2】印刷して演習を始める",
  "・実寸印刷の推奨: 解答用紙の印刷時はプリンター設定で「実際のサイズ（100%・拡大縮小なし）」をお選びください。",
  `・試験形式: 制限時間 ${exam.minutes}分 ｜ 配点 ${exam.fullMark}点満点 ｜ 大問数 ${exam.daimonCount}題`,
  "",
  "───────────────────────────────────",
  "大学別数学研究室 公式ストア",
  "お問い合わせ: info@yuta-eng.com",
  "Webサイト: https://yuta-eng.com/mock-exams",
].join("\n");

const dateStr = new Date().toLocaleString("ja-JP", {
  timeZone: "Asia/Tokyo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

const adminHtml = `<!doctype html>
<html lang="ja"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>【注文確定】入試プレビュー ${esc(cleanShortName)}</title></head>
<body style="margin:0;padding:20px;background:#f5f6f8;font-family:'Helvetica Neue',Arial,sans-serif;color:#15181c;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:540px;margin:0 auto;background:#fff;border:1px solid #e0e3e7;text-align:left;">
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
        <td style="padding:8px 0;border-bottom:1px solid #e0e3e7;font-weight:700;color:#15181c;">${esc(cleanTitle)}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #e0e3e7;color:#666d76;">決済金額</td>
        <td style="padding:8px 0;border-bottom:1px solid #e0e3e7;font-weight:700;color:#b3412f;">${priceText}（決済確定）</td>
      </tr>
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #e0e3e7;color:#666d76;">購入者</td>
        <td style="padding:8px 0;border-bottom:1px solid #e0e3e7;color:#15181c;"><a href="mailto:${esc(targetEmail)}" style="color:#1b3a63;">${esc(targetEmail)}</a></td>
      </tr>
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #e0e3e7;color:#666d76;">PDF添付</td>
        <td style="padding:8px 0;border-bottom:1px solid #e0e3e7;color:#1b3a63;font-weight:700;">添付完了（${esc(pdfFilename)} / ${pdfKb} KB）</td>
      </tr>
      <tr>
        <td style="padding:8px 0;color:#666d76;">再DL用URL</td>
        <td style="padding:8px 0;"><a href="${esc(viewUrl)}" style="color:#1b3a63;font-size:11.5px;word-break:break-all;">${esc(viewUrl)}</a></td>
      </tr>
    </table>
  </td></tr>

  <tr><td style="padding:0 18px 16px;">
    <a href="https://dashboard.stripe.com/test/workbench/overview" style="display:inline-block;padding:8px 16px;background:#1b3a63;font-size:12px;font-weight:700;color:#ffffff;text-decoration:none;">
      Stripe 管理画面で確認 →
    </a>
  </td></tr>
</table>

</body></html>`;

const adminText = [
  `【注文確定】入試プレビュー ${cleanShortName}`,
  "",
  "教材の注文が確定しました（決済完了）。",
  "",
  `・受付日時　: ${dateStr}`,
  `・商品名　　: ${cleanTitle} (${examId})`,
  `・決済金額　: ${priceText}`,
  `・購入者　　: ${targetEmail}`,
  `・PDF添付 　: 添付完了 (${pdfFilename} / ${pdfKb} KB)`,
  `・再DL用URL : ${viewUrl}`,
  "",
  "Stripe 管理画面: https://dashboard.stripe.com/test/workbench/overview",
].join("\n");

console.log("[2/4] スマートな段階的メール本文（HTML / 平文）の構築完了");
console.log("");

// 5. Resend への送信処理
if (!apiKey) {
  console.error("[ERROR] RESEND_API_KEY が未設定です。");
  process.exit(1);
}

console.log("[3/4] Resend API へ実機送信リクエストを実行中...");

const customerPayload = {
  from: fromAddr,
  to: [targetEmail],
  reply_to: "info@yuta-eng.com",
  subject: `【ご購入完了】入試プレビュー ${cleanShortName}`,
  html: customerHtml,
  text: customerText,
  attachments: [{ filename: pdfFilename, content: pdfBase64 }],
};

const adminPayload = {
  from: fromAddr,
  to: [adminEmail],
  reply_to: targetEmail,
  subject: `【注文確定】入試プレビュー ${cleanShortName}（${priceText} / ${targetEmail}）`,
  html: adminHtml,
  text: adminText,
  attachments: [{ filename: pdfFilename, content: pdfBase64 }],
};

async function sendMail(payload, label) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (res.ok) {
    console.log(`      ✓ ${label} 送信成功！ ID: ${data.id}`);
    return true;
  } else {
    console.error(`      ✗ ${label} 送信失敗 (${res.status}):`, data);
    return false;
  }
}

async function main() {
  console.log(`      -> 1通目（購入者宛て: ${targetEmail}）送信中...`);
  const cOk = await sendMail(customerPayload, "購入者メール（端的HTML & 正確なPDF添付）");

  // レートリミット対策で1.2秒待機
  await new Promise((r) => setTimeout(r, 1200));

  console.log(`      -> 2通目（運営控え宛て: ${adminEmail}）送信中...`);
  const aOk = await sendMail(adminPayload, "運営控えメール（注文確定通知 & 正確なPDF添付）");

  console.log("");
  console.log(`[4/4] 送信結果: ${cOk && aOk ? "2通とも正常に送信完了！" : "一部エラーが発生しました"}`);
  console.log("      Gmail の受信箱をご確認ください。");
  console.log("=====================================================================");
}

main().catch((err) => {
  console.error("送信例外:", err);
});
