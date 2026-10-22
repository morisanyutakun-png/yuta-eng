import { NextResponse } from "next/server";

import { storeSeller } from "@/data/mock-exams";
import { getExam } from "@/lib/mock-exams/catalog";
import {
  claimWebhookEvent,
  hasOrderDb,
  markRefundedByPaymentIntent,
  releaseWebhookEvent,
  upsertOrder,
} from "@/lib/mock-exams/db";
import { accessDays, baseUrl } from "@/lib/mock-exams/env";
import { sendPurchaseMail } from "@/lib/mock-exams/mail";
import {
  WebhookSignatureError,
  constructWebhookEvent,
  paymentIntentId,
  type CheckoutSession,
  type StripeEvent,
} from "@/lib/mock-exams/stripe";

/**
 * Stripe からの通知（Webhook）の受け口。
 *
 * 署名を確かめてから処理する。署名の合わない通知は 400 で捨てる
 * （誰でもこの URL に「支払い済み」と送りつけられるため）。
 *
 * 扱うイベント:
 *   checkout.session.completed               … 決済画面の完了。カードなら支払い済み、
 *                                              コンビニ・振込なら入金待ちで届く
 *   checkout.session.async_payment_succeeded … 入金待ちだったものの入金
 *   checkout.session.async_payment_failed    … 期限までに入金されなかった
 *   charge.refunded                          … 全額返金。ダウンロードを止める
 *
 * このストア以外の決済（入試プレビュー側で将来使う支払いリンクなど）は、
 * metadata.store が "mock-exams" でないので触らずに 200 を返す。
 *
 * Stripe ダッシュボードの Webhook 送信先: https://yuta-eng.com/api/stripe/webhook
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!secret) {
    console.error("[mock-exams/webhook] STRIPE_WEBHOOK_SECRET が未設定");
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  // 署名は生の本文に対して計算されているので、JSON として読む前の文字列を使う
  const raw = await req.text();
  let event: StripeEvent;
  try {
    event = constructWebhookEvent(raw, req.headers.get("stripe-signature"), secret);
  } catch (err) {
    const reason = err instanceof WebhookSignatureError ? err.message : "unknown";
    console.warn(`[mock-exams/webhook] 拒否: ${reason}`);
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  const db = hasOrderDb();
  if (db) {
    try {
      if (!(await claimWebhookEvent(event.id, event.type))) {
        return NextResponse.json({ received: true, duplicate: true });
      }
    } catch (err) {
      console.error("[mock-exams/webhook] イベントの記録に失敗", err);
      return NextResponse.json({ error: "db" }, { status: 500 });
    }
  }

  try {
    await handle(event, req);
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error(`[mock-exams/webhook] 処理に失敗 ${event.type} ${event.id}`, err);
    // 記録を戻して 500 を返すと、Stripe が時間をおいて送り直してくれる
    if (db) await releaseWebhookEvent(event.id).catch(() => {});
    return NextResponse.json({ error: "handler failed" }, { status: 500 });
  }
}

async function handle(event: StripeEvent, req: Request) {
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
    case "checkout.session.async_payment_failed":
      return onSession(event, event.data.object as unknown as CheckoutSession, req);
    case "charge.refunded":
      return onRefund(event.data.object as { refunded?: boolean; payment_intent?: string | null });
    default:
      return;
  }
}

async function onSession(event: StripeEvent, session: CheckoutSession, req: Request) {
  if (session.metadata?.store !== "mock-exams") return;
  const exam = getExam(session.metadata?.examId ?? "");
  if (!exam) {
    console.error(`[mock-exams/webhook] 商品定義に無い examId: ${session.metadata?.examId} (${session.id})`);
    return;
  }

  const status =
    event.type === "checkout.session.async_payment_failed"
      ? "failed"
      : session.payment_status === "paid"
        ? "paid"
        : "pending";

  if (status === "paid" && session.amount_total !== null && session.amount_total !== exam.price) {
    // Price ID の金額と商品定義の表示価格がずれている。画面の表示を直すこと
    console.warn(
      `[mock-exams/webhook] 金額の不一致 ${exam.id}: 決済 ${session.amount_total} / 表示 ${exam.price}（${session.id}）`,
    );
  }

  const email = session.customer_details?.email ?? null;

  // 決済完了ログ。DB が無い構成でも Vercel のログで追えるようにする（メールは伏せる）
  console.info(
    `[mock-exams/webhook] ${event.type} ${session.id} exam=${exam.id} status=${status} amount=${session.amount_total} live=${session.livemode}`,
  );

  if (hasOrderDb()) {
    await upsertOrder({
      sessionId: session.id,
      examId: exam.id,
      status,
      amountTotal: session.amount_total,
      currency: session.currency,
      email,
      paymentIntentId: paymentIntentId(session),
      livemode: session.livemode,
    });
  }

  // 支払いが確定したときだけ、閲覧ページの URL（＝再ダウンロードの鍵）を送る
  if (status === "paid" && email) {
    const viewUrl = `${baseUrl(req)}/mock-exams/${exam.id}/view?session_id=${encodeURIComponent(session.id)}`;
    await sendPurchaseMail(email, exam, viewUrl, accessDays(storeSeller.accessDays));
  }
}

async function onRefund(charge: { refunded?: boolean; payment_intent?: string | null }) {
  // 一部返金ではダウンロードを止めない。全額返金のときだけ止める
  if (!charge.refunded || !charge.payment_intent || !hasOrderDb()) return;
  const n = await markRefundedByPaymentIntent(charge.payment_intent);
  if (n > 0) console.info(`[mock-exams/webhook] 返金によりダウンロード停止 pi=${charge.payment_intent}`);
}

