import { NextResponse } from "next/server";

import { storeSeller } from "@/data/mock-exams";
import { allExams, getExam } from "@/lib/mock-exams/catalog-server";
import {
  buildAdminNoticeHtml,
  buildAdminNoticeText,
  buildCustomerMailHtml,
  buildCustomerMailText,
  canSendStoreMail,
  getExamPdfAttachment,
  sendAdminPurchaseNotice,
  sendPurchaseMail,
  storeAdminEmail,
  storeMailFrom,
  type AdminPurchaseNoticeParams,
} from "@/lib/mock-exams/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

export async function GET(req: Request) {
  if (!checkAdminAuth(req)) {
    return new Response("Unauthorized", { status: 401 });
  }
  const url = new URL(req.url);
  const view = url.searchParams.get("view");
  const type = url.searchParams.get("type") || "customer";
  const examId = url.searchParams.get("exam") || "preview-zento-set1";

  const exams = allExams();
  const exam = getExam(examId) || exams[0];
  if (!exam) {
    return new Response("商品データが見つかりません", { status: 404 });
  }

  const dummySessionId = "cs_test_preview_sample_session_id_12345";
  const dummyViewUrl = `${url.origin}/mock-exams/${exam.id}/view?session_id=${dummySessionId}`;
  const days = storeSeller.accessDays;

  // 1. 直接HTMLプレビュー表示モード
  if (view === "preview") {
    if (type === "admin") {
      const adminParams: AdminPurchaseNoticeParams = {
        customerEmail: "sample-buyer@example.com",
        exam,
        viewUrl: dummyViewUrl,
        days,
        sessionId: dummySessionId,
        paymentIntentId: "pi_test_sample_intent_98765",
        amountTotal: exam.price,
        livemode: false,
        hasAttachment: true,
        attachmentName: `${exam.title}.pdf`,
        attachmentSize: 527581,
      };
      const html = buildAdminNoticeHtml(adminParams);
      return new Response(html, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    let html = buildCustomerMailHtml(exam, dummyViewUrl, days, true, `${exam.title}.pdf`);
    html = html
      .replace(/cid:seven-eleven-logo/g, "/images/stores/seven-eleven.png")
      .replace(/cid:lawson-logo/g, "/images/stores/lawson.png")
      .replace(/cid:familymart-logo/g, "/images/stores/familymart.png");
    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // 2. プレーンテキスト表示モード
  if (view === "raw-text") {
    if (type === "admin") {
      const adminParams: AdminPurchaseNoticeParams = {
        customerEmail: "sample-buyer@example.com",
        exam,
        viewUrl: dummyViewUrl,
        days,
        sessionId: dummySessionId,
        paymentIntentId: "pi_test_sample_intent_98765",
        amountTotal: exam.price,
        livemode: false,
        hasAttachment: true,
        attachmentName: `${exam.title}.pdf`,
        attachmentSize: 527581,
      };
      const text = buildAdminNoticeText(adminParams);
      return new Response(text, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    const text = buildCustomerMailText(exam, dummyViewUrl, days, true, `${exam.title}.pdf`);
    return new Response(text, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  // 3. 開発者用テスト・確認コントロールパネル
  const pdfData = await getExamPdfAttachment(exam.id, exam.title);
  const pdfBytes = pdfData?.size ?? 0;
  const pdfKb = (pdfBytes / 1024).toFixed(1);
  const hasResendKey = canSendStoreMail();
  const fromAddr = storeMailFrom();
  const adminAddr = storeAdminEmail();

  const consoleHtml = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>メール送受信・添付確認コンソール ｜ 大学別数学研究室</title>
  <style>
    :root {
      --navy: #1b3a63;
      --navy-dark: #0f233d;
      --accent: #b3412f;
      --bg: #f8fafc;
      --card: #ffffff;
      --border: #e2e8f0;
      --text: #1e293b;
      --subtext: #64748b;
      --green: #15803d;
      --green-bg: #f0fdf4;
      --green-border: #86efac;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 24px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .header {
      background: var(--navy-dark);
      color: #fff;
      padding: 20px 24px;
      border-radius: 8px 8px 0 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }
    .header h1 {
      margin: 0;
      font-size: 18px;
      font-weight: 700;
      letter-spacing: .02em;
    }
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
    }
    .badge-live { background: #22c55e; color: #022c22; }
    .badge-warn { background: #f59e0b; color: #451a03; }
    .status-bar {
      background: var(--card);
      border: 1px solid var(--border);
      border-top: 0;
      padding: 16px 24px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
      margin-bottom: 20px;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .stat-item {
      font-size: 13px;
    }
    .stat-label {
      color: var(--subtext);
      font-size: 11.5px;
      font-weight: 600;
      margin-bottom: 2px;
    }
    .stat-val {
      font-weight: 600;
      color: var(--text);
      word-break: break-all;
    }
    .grid {
      display: grid;
      grid-template-columns: 380px 1fr;
      gap: 20px;
      align-items: start;
    }
    @media (max-width: 900px) {
      .grid { grid-template-columns: 1fr; }
    }
    .panel {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .panel h2 {
      margin: 0 0 14px;
      font-size: 15px;
      color: var(--navy);
      border-bottom: 1px solid var(--border);
      padding-bottom: 8px;
    }
    .form-group {
      margin-bottom: 14px;
    }
    .form-group label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: var(--text);
      margin-bottom: 4px;
    }
    .form-control {
      width: 100%;
      padding: 8px 12px;
      font-size: 13px;
      border: 1px solid var(--border);
      border-radius: 4px;
      background: #fff;
    }
    .checkbox-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin: 14px 0;
      font-size: 13px;
    }
    .checkbox-group label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
    .btn {
      display: inline-block;
      width: 100%;
      padding: 11px 16px;
      background: var(--navy);
      color: #fff;
      font-size: 13.5px;
      font-weight: 700;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      text-align: center;
      transition: background 0.15s;
    }
    .btn:hover { background: #254a7d; }
    .btn:disabled { background: #94a3b8; cursor: not-allowed; }
    .tabs {
      display: flex;
      gap: 6px;
      margin-bottom: 12px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 8px;
    }
    .tab-btn {
      padding: 6px 14px;
      font-size: 12.5px;
      font-weight: 600;
      background: #f1f5f9;
      color: var(--subtext);
      border: 1px solid var(--border);
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
    }
    .tab-btn.active {
      background: var(--navy);
      color: #fff;
      border-color: var(--navy);
    }
    .preview-frame {
      width: 100%;
      height: 720px;
      border: 1px solid var(--border);
      border-radius: 4px;
      background: #f5f6f8;
    }
    .alert {
      padding: 12px 14px;
      border-radius: 4px;
      font-size: 12.5px;
      margin-bottom: 14px;
      line-height: 1.6;
    }
    .alert-success { background: var(--green-bg); border: 1px solid var(--green-border); color: var(--green); }
    .alert-warn { background: #fffbeb; border: 1px solid #fde68a; color: #92400e; }
    #sendResult {
      margin-top: 14px;
      display: none;
    }
    pre {
      background: #0f172a;
      color: #e2e8f0;
      padding: 12px;
      border-radius: 4px;
      font-size: 11.5px;
      overflow-x: auto;
      max-height: 240px;
    }
  </style>
</head>
<body>

<div class="container">
  <div class="header">
    <div>
      <h1>模試PDFストア ｜ メール送信・PDF添付検証コンソール</h1>
      <div style="font-size:12px;color:#94a3b8;margin-top:2px;">顧客向け購入完了メール（PDF添付）と運営控えメールの動作検証</div>
    </div>
    <div>
      <span class="badge ${hasResendKey ? "badge-live" : "badge-warn"}">
        ${hasResendKey ? "● Resend API 有効（実機送信可）" : "▲ RESEND_API_KEY 未設定（モック・画面確認可）"}
      </span>
    </div>
  </div>

  <div class="status-bar">
    <div class="stat-item">
      <div class="stat-label">差出人（From / 送信元）</div>
      <div class="stat-val">${fromAddr}</div>
    </div>
    <div class="stat-item">
      <div class="stat-label">運営控えの送信先（To）</div>
      <div class="stat-val">${adminAddr}</div>
    </div>
    <div class="stat-item">
      <div class="stat-label">添付PDF（sales/mock-exams/${exam.id}/full.pdf）</div>
      <div class="stat-val" style="color:${pdfBytes > 0 ? "var(--green)" : "var(--accent)"};">
        ${pdfBytes > 0 ? `✓ 存在確認完了 (${pdfKb} KB / Resend上限40MB以内)` : "✗ PDFが見つかりません"}
      </div>
    </div>
    <div class="stat-item">
      <div class="stat-label">対象商品（検証用切り替え）</div>
      <select class="form-control" style="padding:4px 8px;font-size:12px;" onchange="location.href='?exam='+this.value+'&type=${type}'">
        ${exams
          .map(
            (e) =>
              `<option value="${e.id}" ${e.id === exam.id ? "selected" : ""}>${e.title} (¥${e.price.toLocaleString("ja-JP")})</option>`,
          )
          .join("")}
      </select>
    </div>
  </div>

  <div class="grid">
    <!-- 左側: 送信テスト実行フォーム -->
    <div class="panel">
      <h2>🚀 実際にテスト送信する</h2>
      <div class="alert ${hasResendKey ? "alert-success" : "alert-warn"}">
        ${
          hasResendKey
            ? `<strong>Resend 接続完了:</strong> 送信ボタンを押すと、添付PDF付きで実際に受信箱へ送られます。`
            : `<strong>手元プレビュー中:</strong> 実際の送信には <code>.env.local</code> に <code>RESEND_API_KEY=re_...</code> を記載して dev サーバーを再起動するか、下の欄に入力してください。`
        }
      </div>

      <form id="testMailForm" onsubmit="handleSend(event)">
        <input type="hidden" name="examId" value="${exam.id}">

        ${
          !hasResendKey
            ? `
        <div class="form-group">
          <label>一時 Resend API Key（未設定時のみ入力可）</label>
          <input type="password" name="apiKey" class="form-control" placeholder="re_xxxxxxxxxxxx">
        </div>
        `
            : ""
        }

        <div class="form-group">
          <label>顧客メール送信先アドレス</label>
          <input type="email" name="customerEmail" class="form-control" value="${adminAddr}" required>
          <div style="font-size:11px;color:var(--subtext);margin-top:3px;">
            ※ 初期値はあなたのGmailになっています。自分宛に送って添付の開け方を確認できます。
          </div>
        </div>

        <div class="checkbox-group">
          <label>
            <input type="checkbox" name="sendCustomer" value="true" checked>
            <strong>① 顧客向け購入確認メールを送信</strong>（${pdfKb} KB のPDFを添付）
          </label>
          <label>
            <input type="checkbox" name="sendAdmin" value="true" checked>
            <strong>② 運営控えメールを送信</strong>（${adminAddr} 宛）
          </label>
        </div>

        <button type="submit" id="submitBtn" class="btn">
          ✉️ テストメールを送信する
        </button>
      </form>

      <div id="sendResult"></div>

      <div style="margin-top:20px;padding-top:14px;border-top:1px solid var(--border);font-size:11.5px;color:var(--subtext);line-height:1.7;">
        <strong>テストのポイント：</strong><br>
        1. <strong>顧客向けメール</strong>: 受信箱でPDF添付ファイル（約500KB）が開けるか、ダウンロードリンクが有効か確認します。<br>
        2. <strong>運営控えメール</strong>: 件名に <code>【ストア注文確定】...</code> と記載され、決済金額や購入者アドレスが整理されているか確認します。<br>
        3. <strong>同一アドレス届出</strong>: 顧客と運営の宛先が同じでも、別々のメールとして2通届くよう設計されています。
      </div>
    </div>

    <!-- 右側: リアルタイムメールプレビュー -->
    <div class="panel">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <div class="tabs" style="margin-bottom:0;border-bottom:none;">
          <a href="?exam=${exam.id}&type=customer" class="tab-btn ${type === "customer" ? "active" : ""}">
            👤 顧客向け購入確認メール
          </a>
          <a href="?exam=${exam.id}&type=admin" class="tab-btn ${type === "admin" ? "active" : ""}">
            🏢 運営控えメール（${adminAddr}宛）
          </a>
        </div>
        <div>
          <a href="?exam=${exam.id}&type=${type}&view=preview" target="_blank" style="font-size:12px;color:var(--navy);font-weight:600;text-decoration:none;">
            別ウィンドウで全画面表示 ↗
          </a>
          <span style="color:#cbd5e1;margin:0 4px;">|</span>
          <a href="?exam=${exam.id}&type=${type}&view=raw-text" target="_blank" style="font-size:12px;color:var(--subtext);text-decoration:none;">
            平文テキスト ↗
          </a>
        </div>
      </div>

      <iframe src="?exam=${exam.id}&type=${type}&view=preview" class="preview-frame" title="メールプレビュー"></iframe>
    </div>
  </div>
</div>

<script>
async function handleSend(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById("submitBtn");
  const resDiv = document.getElementById("sendResult");

  btn.disabled = true;
  btn.innerText = "送信中...";
  resDiv.style.display = "block";
  resDiv.innerHTML = '<div class="alert" style="background:#f1f5f9;color:#334155;">Resend へリクエスト送信中...</div>';

  const formData = new FormData(form);
  const data = {
    examId: formData.get("examId"),
    customerEmail: formData.get("customerEmail"),
    apiKey: formData.get("apiKey"),
    sendCustomer: formData.get("sendCustomer") === "true",
    sendAdmin: formData.get("sendAdmin") === "true",
  };

  try {
    const res = await fetch("/api/mock-exams/test-mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();

    if (json.ok) {
      resDiv.innerHTML = \`
        <div class="alert alert-success">
          <strong>送信完了！</strong> 受信箱をご確認ください。<br>
          \${json.customer ? '・顧客向け: ' + json.customer.detail + ' (PDF添付: ' + (json.customer.hasAttachment ? '○' : '×') + ')<br>' : ''}
          \${json.admin ? '・運営控え: ' + json.admin.detail + '<br>' : ''}
        </div>
        <pre>\${JSON.stringify(json, null, 2)}</pre>
      \`;
    } else {
      resDiv.innerHTML = \`
        <div class="alert alert-warn">
          <strong>送信エラー:</strong> \${json.error || '不明なエラー'}<br>
          \${json.detail || ''}
        </div>
        <pre>\${JSON.stringify(json, null, 2)}</pre>
      \`;
    }
  } catch (err) {
    resDiv.innerHTML = \`
      <div class="alert alert-warn">
        <strong>通信エラー:</strong> \${err.message}
      </div>
    \`;
  } finally {
    btn.disabled = false;
    btn.innerText = "✉️ テストメールを送信する";
  }
}
</script>

</body>
</html>`;

  return new Response(consoleHtml, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function POST(req: Request) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json().catch(() => ({}));
    const examId = String(body.examId || "preview-zento-set1");
    const customerEmail = String(body.customerEmail || storeAdminEmail()).trim();
    const sendCustomer = body.sendCustomer !== false;
    const sendAdmin = body.sendAdmin !== false;
    const apiKey = typeof body.apiKey === "string" ? body.apiKey.trim() : "";

    // 一時 API キーが渡された場合は環境変数を補完
    if (apiKey && !process.env.RESEND_API_KEY) {
      process.env.RESEND_API_KEY = apiKey;
    }

    const exam = getExam(examId);
    if (!exam) {
      return NextResponse.json({ ok: false, error: "商品が見つかりません" }, { status: 400 });
    }

    const dummySessionId = `cs_test_mock_${Date.now()}`;
    const dummyViewUrl = `https://yuta-eng.com/mock-exams/${exam.id}/view?session_id=${dummySessionId}`;
    const days = storeSeller.accessDays;

    let customerResult = null;
    let adminResult = null;

    // 1. 顧客向けメール送信（PDF添付）
    if (sendCustomer) {
      customerResult = await sendPurchaseMail(customerEmail, exam, dummyViewUrl, days);
    }

    // 2. 運営控えメール送信（morisan.yutakun@gmail.com）
    if (sendAdmin) {
      adminResult = await sendAdminPurchaseNotice({
        customerEmail,
        exam,
        viewUrl: dummyViewUrl,
        days,
        sessionId: dummySessionId,
        paymentIntentId: `pi_test_${Date.now()}`,
        amountTotal: exam.price,
        livemode: false,
      });
    }

    const overallOk = (!sendCustomer || customerResult?.ok) && (!sendAdmin || adminResult?.ok);

    return NextResponse.json({
      ok: Boolean(overallOk),
      exam: { id: exam.id, title: exam.title, price: exam.price },
      from: storeMailFrom(),
      customer: customerResult ? { ...customerResult, to: customerEmail } : null,
      admin: adminResult ? { ...adminResult, to: storeAdminEmail() } : null,
      notes: "テスト送信のログはコンソールおよび Resend ダッシュボードで確認できます",
    });
  } catch (err) {
    console.error("[mock-exams/test-mail] テスト送信例外:", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "サーバー内部エラー" },
      { status: 500 },
    );
  }
}

