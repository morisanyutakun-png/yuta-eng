import type { NextRequest } from "next/server";
import Stripe from "stripe";

import {
  forwardRegistration,
  RegistrationForwardError,
} from "@/lib/registration-forwarding";
import { sendGa4Purchase } from "@/lib/ga4";
import { buildRegistration } from "@/lib/registration";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Stripe Webhook。支払い完了（checkout.session.completed）で、生徒の登録情報と
 * 申込科目を取り出し、ノビットスタディの管理システムへ連携する入口。
 *
 * 連携先は環境変数 NOBIT_REGISTER_WEBHOOK_URL に管理システムのエンドポイントを
 * 設定し、そこへ JSON を POST する。失敗時は 2xx を返さず Stripe の再試行に任せる。
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
    try {
      const checkoutSession = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
      );
      const registration = buildRegistration(checkoutSession, event.created);

      await forwardRegistration(registration);
      await sendGa4Purchase(checkoutSession);
    } catch (err) {
      console.error("[nobit] registration forward failed", err);

      const status =
        err instanceof RegistrationForwardError ? err.status : 502;
      const message =
        err instanceof Error ? err.message : "registration forward failed";
      return Response.json({ error: message }, { status });
    }
  }

  return Response.json({ received: true });
}
