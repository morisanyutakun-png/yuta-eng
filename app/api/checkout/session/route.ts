import type { NextRequest } from "next/server";
import Stripe from "stripe";

import { buildPurchaseAnalytics } from "@/lib/ga4";

// Stripe SDK は Node ランタイム必須。購入計測用に毎回最新のセッションを確認する。
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return Response.json(
      { error: "決済の準備中です（STRIPE_SECRET_KEY が未設定）。" },
      { status: 503 },
    );
  }

  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return Response.json({ error: "session_id required" }, { status: 400 });
  }

  const stripe = new Stripe(secret);

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paid = session.payment_status === "paid";

    if (!paid) {
      return Response.json({ paid: false }, { status: 402 });
    }

    return Response.json(buildPurchaseAnalytics(session));
  } catch (err) {
    const message = err instanceof Error ? err.message : "session lookup failed";
    return Response.json({ error: message }, { status: 404 });
  }
}
