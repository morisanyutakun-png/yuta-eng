import type { NextRequest } from "next/server";
import Stripe from "stripe";

import {
  forwardRegistration,
  RegistrationForwardError,
} from "@/lib/registration-forwarding";
import { sendGa4Purchase } from "@/lib/ga4";
import { buildRegistration, isYutaCheckoutSession } from "@/lib/registration";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function readSessionId(req: NextRequest) {
  const fromQuery = req.nextUrl.searchParams.get("session_id");
  if (fromQuery) return fromQuery;

  const body = (await req.json().catch(() => null)) as {
    session_id?: unknown;
  } | null;
  return typeof body?.session_id === "string" ? body.session_id : null;
}

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return Response.json(
      { error: "決済の準備中です（STRIPE_SECRET_KEY が未設定）。" },
      { status: 503 },
    );
  }

  const expected = process.env.NOBIT_REGISTER_SECRET;
  if (!expected) {
    return Response.json(
      { error: "NOBIT_REGISTER_SECRET is not configured" },
      { status: 503 },
    );
  }

  if (req.headers.get("x-nobit-secret") !== expected) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const sessionId = await readSessionId(req);
  if (!sessionId) {
    return Response.json({ error: "session_id required" }, { status: 400 });
  }

  const stripe = new Stripe(secret);

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!isYutaCheckoutSession(session)) {
      return Response.json({ error: "not a yuta checkout session" }, { status: 400 });
    }

    const registration = buildRegistration(session, session.created);

    if (!registration.paid) {
      return Response.json(
        { error: "payment not completed", paid: false },
        { status: 402 },
      );
    }

    const forward = await forwardRegistration(registration);
    const ga4 = await sendGa4Purchase(session);

    return Response.json({
      forwarded: true,
      forwardStatus: forward.status,
      ga4,
      stripeSessionId: registration.stripeSessionId,
      email: registration.email,
    });
  } catch (err) {
    console.error("[nobit] registration replay failed", err);

    const status =
      err instanceof RegistrationForwardError ? err.status : 502;
    const message =
      err instanceof Error ? err.message : "registration replay failed";
    return Response.json({ error: message }, { status });
  }
}
