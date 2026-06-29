import type { NextRequest } from "next/server";
import Stripe from "stripe";

import { siteConfig } from "@/data/site";
import {
  CURRENCY,
  FIRST_MONTH_COUPON_ID,
  isValidSubjectId,
  monthlyTotal,
  subjectsByIds,
} from "@/lib/pricing";

// Stripe SDK は Node ランタイム必須。決済はリクエスト時に毎回実行する。
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** 初月半額クーポンを冪等に用意（無ければ作成）。 */
async function ensureFirstMonthCoupon(stripe: Stripe): Promise<string> {
  try {
    await stripe.coupons.retrieve(FIRST_MONTH_COUPON_ID);
  } catch {
    await stripe.coupons.create({
      id: FIRST_MONTH_COUPON_ID,
      name: "初月半額",
      percent_off: 50,
      duration: "once",
    });
  }
  return FIRST_MONTH_COUPON_ID;
}

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return Response.json(
      { error: "決済の準備中です（STRIPE_SECRET_KEY が未設定）。" },
      { status: 503 },
    );
  }

  const stripe = new Stripe(secret);

  const body = (await req.json().catch(() => null)) as {
    subjects?: unknown;
  } | null;
  const ids = Array.isArray(body?.subjects)
    ? Array.from(new Set(body.subjects.filter(isValidSubjectId)))
    : [];

  if (ids.length === 0) {
    return Response.json(
      { error: "科目を1つ以上選んでください。" },
      { status: 400 },
    );
  }

  // 金額はサーバー側で必ず再計算（クライアントの値は信用しない）。
  const count = ids.length;
  const amount = monthlyTotal(count);
  const subjects = subjectsByIds(ids);
  const labels = subjects.map((s) => s.label);
  const metadata = {
    subjects: ids.join(","),
    subject_labels: labels.join("・"),
    subject_count: String(count),
    monthly_amount: String(amount),
  };

  const origin = siteConfig.url || new URL(req.url).origin;

  try {
    const couponId = await ensureFirstMonthCoupon(stripe);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            unit_amount: amount,
            recurring: { interval: "month" },
            product_data: {
              name: `ノビットスタディ 中高部 月額（${count}教科）`,
              description: labels.join("・"),
            },
          },
        },
      ],
      discounts: [{ coupon: couponId }],
      // 管理システム連携用。Webhook で session/subscription から読み取れる。
      metadata,
      subscription_data: { metadata },
      custom_fields: [
        {
          key: "student_name",
          label: { type: "custom", custom: "生徒の氏名" },
          type: "text",
        },
        {
          key: "grade",
          label: { type: "custom", custom: "学年" },
          type: "dropdown",
          dropdown: {
            options: [
              { label: "高校1年", value: "h1" },
              { label: "高校2年", value: "h2" },
              { label: "高校3年", value: "h3" },
              { label: "高卒生", value: "grad" },
              { label: "その他", value: "other" },
            ],
          },
        },
      ],
      customer_creation: "always",
      phone_number_collection: { enabled: true },
      // 初月半額クーポンを discounts で自動適用するため、allow_promotion_codes は
      // 併用不可（Stripe 仕様）。プロモコード入力欄は出さない。
      locale: "ja",
      success_url: `${origin}/apply/complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/apply?canceled=1`,
    });

    return Response.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "決済の作成に失敗しました。";
    return Response.json({ error: message }, { status: 500 });
  }
}
