import type { NextRequest } from "next/server";
import Stripe from "stripe";

import { buildRegistration, isYutaCheckoutSession } from "@/lib/registration";

// Stripe SDK は Node ランタイム必須。
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * ノビットスタディの /setup ページ用。決済完了画面から渡された session_id を、
 * このエンドポイントに問い合わせると、メール・氏名・契約科目などを返す。
 * これにより、アプリ側に Stripe の鍵を置かなくても申込内容を引ける。
 *
 * 呼び出し例（アプリのサーバー側から）:
 *   GET https://yuta-eng.com/api/provision/session?session_id=cs_test_...
 *   ヘッダ: x-nobit-secret: <NOBIT_REGISTER_SECRET と同じ値>
 *
 * 未払い（カゴ落ち等）の session_id には 402 を返し、本登録を防ぐ。
 */
export async function GET(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return Response.json(
      { error: "決済の準備中です（STRIPE_SECRET_KEY が未設定）。" },
      { status: 503 },
    );
  }

  // 共有シークレットで保護。設定されている場合のみ照合（本番では必ず設定すること）。
  const expected = process.env.NOBIT_REGISTER_SECRET;
  if (expected && req.headers.get("x-nobit-secret") !== expected) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const sessionId = new URL(req.url).searchParams.get("session_id");
  if (!sessionId) {
    return Response.json({ error: "session_id required" }, { status: 400 });
  }

  const stripe = new Stripe(secret);
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!isYutaCheckoutSession(session)) {
      return Response.json({ error: "not a yuta checkout session" }, { status: 404 });
    }

    const registration = buildRegistration(session);

    if (!registration.paid) {
      return Response.json(
        { error: "payment not completed", paid: false },
        { status: 402 },
      );
    }

    return Response.json(registration);
  } catch (err) {
    const message = err instanceof Error ? err.message : "session lookup failed";
    return Response.json({ error: message }, { status: 404 });
  }
}
