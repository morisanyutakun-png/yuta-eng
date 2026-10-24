import { NextResponse } from "next/server";

import { isOnSale, stripePriceIdFor } from "@/lib/mock-exams/catalog";
import { getExam } from "@/lib/mock-exams/catalog-server";
import { baseUrl } from "@/lib/mock-exams/env";
import { StripeApiError, createCheckoutSession, hasStripe } from "@/lib/mock-exams/stripe";

/**
 * 決済画面（Stripe Checkout）を作って、そこへ送り出す。
 *
 * 購入ボタンはふつうのフォーム送信（JS なしでも動く）。成功すれば 303 で
 * Stripe の決済画面へ、失敗すれば詳細ページへ理由つきで戻す。
 * fetch で JSON を送った場合は { url } を返す。
 *
 * 金額・商品名は画面から受け取らない。受け取るのは模試の id だけで、
 * 価格は必ずサーバー側の商品定義（data/mock-exams.ts）から引く。
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Parsed = { examId: string; agreed: boolean; wantsJson: boolean };

async function parse(req: Request): Promise<Parsed> {
  const type = req.headers.get("content-type") ?? "";
  if (type.includes("application/json")) {
    const body = (await req.json().catch(() => ({}))) as { examId?: unknown; agreed?: unknown };
    return { examId: String(body.examId ?? ""), agreed: body.agreed === true, wantsJson: true };
  }
  const form = await req.formData().catch(() => null);
  return {
    examId: String(form?.get("examId") ?? ""),
    agreed: form?.get("agreed") === "on" || form?.get("agreed") === "true",
    wantsJson: false,
  };
}

export async function POST(req: Request) {
  const { examId, agreed, wantsJson } = await parse(req);
  const origin = baseUrl(req);
  const exam = getExam(examId);

  const fail = (code: string, status: number) =>
    wantsJson
      ? NextResponse.json({ error: code }, { status })
      : NextResponse.redirect(`${origin}${exam ? `/mock-exams/${exam.id}` : "/mock-exams"}?error=${code}#purchase`, 303);

  if (!exam) return fail("not-found", 404);
  if (!isOnSale(exam)) return fail("not-on-sale", 409);
  // 最終確認（返品不可・利用規約）への同意は、画面の required だけに頼らずここでも見る
  if (!agreed) return fail("not-agreed", 400);
  if (!hasStripe()) return fail("unavailable", 503);

  try {
    const session = await createCheckoutSession({
      examId: exam.id,
      title: exam.title,
      amount: exam.price,
      priceId: stripePriceIdFor(exam),
      successUrl: `${origin}/mock-exams/${exam.id}/view?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${origin}/mock-exams/${exam.id}?canceled=1#purchase`,
    });
    if (!session.url) return fail("checkout-failed", 502);
    return wantsJson ? NextResponse.json({ url: session.url }) : NextResponse.redirect(session.url, 303);
  } catch (err) {
    if (!(err instanceof StripeApiError)) console.error("[mock-exams/checkout]", err);
    return fail("checkout-failed", 502);
  }
}

