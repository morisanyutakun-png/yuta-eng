import type { NextRequest } from "next/server";
import Stripe from "stripe";

import { siteConfig } from "@/data/site";
import {
  buyoutTotal,
  CURRENCY,
  isCampaignActive,
  isValidSubjectId,
  listTotal,
  subjectsByIds,
} from "@/lib/pricing";

// Stripe SDK は Node ランタイム必須。決済はリクエスト時に毎回実行する。
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
      { error: "教材を1つ以上選んでください。" },
      { status: 400 },
    );
  }

  // 金額はサーバー側で必ず再計算（クライアントの値は信用しない）。
  // 買い切り：サーバー時刻でキャンペーン（2教材以上パック割）を判定して合計を確定する。
  const count = ids.length;
  const campaign = isCampaignActive();
  const amount = buyoutTotal(count, campaign);
  const list = listTotal(count);
  const subjects = subjectsByIds(ids);
  const labels = subjects.map((s) => s.label);
  const metadata = {
    subjects: ids.join(","),
    subject_labels: labels.join("・"),
    subject_count: String(count),
    amount: String(amount),
    // 旧アプリ連携との後方互換。買い切り額を旧 monthly_amount 名でも渡す。
    monthly_amount: String(amount),
    list_amount: String(list),
    campaign: campaign && count >= 2 ? "pack" : "",
  };

  const origin = siteConfig.url || new URL(req.url).origin;

  // 決済完了後の戻り先。ノビットスタディアプリの初期設定ページ（/setup）が
  // あればそこへ session_id 付きで送り、その場でパスワード設定→ログインさせる。
  // 未設定なら yuta-eng 内の完了ページにフォールバック。
  const appUrl = process.env.NOBIT_APP_URL?.replace(/\/$/, "");
  const successUrl = appUrl
    ? `${appUrl}/setup?session_id={CHECKOUT_SESSION_ID}`
    : `${origin}/apply/complete?session_id={CHECKOUT_SESSION_ID}`;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            unit_amount: amount,
            product_data: {
              name: `ノビットスタディ 中高部 教材 買い切り（${count}教材）`,
              description: labels.join("・"),
            },
          },
        },
      ],
      // 管理システム連携用。Webhook で session から読み取れる。
      metadata,
      // 買い切り（一括）。顧客レコードを常に作成しておく（連携・領収書用）。
      customer_creation: "always",
      payment_intent_data: { metadata },
      // 領収書メールを自動送付（買い切りの安心材料）。
      invoice_creation: { enabled: true },
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
      phone_number_collection: { enabled: true },
      locale: "ja",
      success_url: successUrl,
      cancel_url: `${origin}/apply?canceled=1`,
    });

    return Response.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "決済の作成に失敗しました。";
    return Response.json({ error: message }, { status: 500 });
  }
}
