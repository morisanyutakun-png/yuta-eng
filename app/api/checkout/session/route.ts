import type { NextRequest } from "next/server";
import Stripe from "stripe";

// Stripe SDK は Node ランタイム必須。購入計測用に毎回最新のセッションを確認する。
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function splitMetadataList(value: string | undefined, separator: string) {
  return (value ?? "")
    .split(separator)
    .map((v) => v.trim())
    .filter(Boolean);
}

function numberFromMetadata(value: string | undefined) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

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

    const subjectIds = splitMetadataList(session.metadata?.subjects, ",");
    const subjectLabels = splitMetadataList(session.metadata?.subject_labels, "・");
    const value =
      numberFromMetadata(session.metadata?.amount) ||
      numberFromMetadata(String(session.amount_total ?? ""));
    const count =
      numberFromMetadata(session.metadata?.subject_count) ||
      Math.max(subjectIds.length, subjectLabels.length, 1);
    const itemPrice = count > 0 ? Math.round((value / count) * 100) / 100 : value;
    const itemCount = Math.max(subjectIds.length, subjectLabels.length, count, 1);

    return Response.json({
      paid: true,
      transactionId: session.id,
      value,
      currency: (session.currency ?? "jpy").toUpperCase(),
      items: Array.from({ length: itemCount }, (_, i) => ({
        item_id: subjectIds[i] ?? `subject-${i + 1}`,
        item_name: subjectLabels[i] ?? "ノビットスタディ 教材",
        price: itemPrice,
        quantity: 1,
      })),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "session lookup failed";
    return Response.json({ error: message }, { status: 404 });
  }
}
