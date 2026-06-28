import type { NextRequest } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Stripe Webhook。支払い完了（checkout.session.completed）で、生徒の登録情報と
 * 申込科目を取り出し、ノビットスタディの管理システムへ連携する入口。
 *
 * 連携先は環境変数 NOBIT_REGISTER_WEBHOOK_URL に管理システムのエンドポイントを
 * 設定すると、そこへ JSON を POST する（未設定ならログ出力のみ）。
 */
export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !whSecret) {
    return new Response("webhook not configured", { status: 503 });
  }

  const stripe = new Stripe(secret);
  const sig = req.headers.get("stripe-signature");
  const raw = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig ?? "", whSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "invalid signature";
    return new Response(`Webhook signature verification failed: ${message}`, {
      status: 400,
    });
  }

  if (event.type === "checkout.session.completed") {
    const s = event.data.object;
    const fields = Object.fromEntries(
      (s.custom_fields ?? []).map((f) => [
        f.key,
        f.type === "dropdown" ? f.dropdown?.value : f.text?.value,
      ]),
    );

    const registration = {
      type: "new_subscription",
      stripeCustomerId: s.customer,
      stripeSubscriptionId: s.subscription,
      stripeSessionId: s.id,
      email: s.customer_details?.email ?? null,
      name: s.customer_details?.name ?? null,
      phone: s.customer_details?.phone ?? null,
      studentName: fields.student_name ?? null,
      grade: fields.grade ?? null,
      subjects: s.metadata?.subjects ?? "",
      subjectLabels: s.metadata?.subject_labels ?? "",
      subjectCount: s.metadata?.subject_count ?? "",
      monthlyAmount: s.metadata?.monthly_amount ?? "",
      createdAt: new Date(event.created * 1000).toISOString(),
    };

    const forwardUrl = process.env.NOBIT_REGISTER_WEBHOOK_URL;
    if (forwardUrl) {
      try {
        await fetch(forwardUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(process.env.NOBIT_REGISTER_SECRET
              ? { "x-nobit-secret": process.env.NOBIT_REGISTER_SECRET }
              : {}),
          },
          body: JSON.stringify(registration),
        });
      } catch (err) {
        console.error("[nobit] forward to management system failed", err);
      }
    } else {
      // 連携先未設定。ログに残しておく（Vercel のログで確認可能）。
      console.log("[nobit] new registration", registration);
    }
  }

  return Response.json({ received: true });
}
