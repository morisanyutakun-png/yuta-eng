import type { NextRequest } from "next/server";
import Stripe from "stripe";

import { siteConfig } from "@/data/site";
import {
  buyoutTotal,
  CURRENCY,
  isCampaignActive,
  isTrialSubjectId,
  isValidSubjectId,
  listTotal,
  registrationLabelsBySubjects,
  subjectsByIds,
  trialSubjectsByIds,
  trialTotal,
  TRIAL_CREDIT,
} from "@/lib/pricing";
import {
  ga4SessionCookieName,
  parseGaClientId,
  parseGaSessionId,
} from "@/lib/ga4";
import { verifyUpgradeToken } from "@/lib/upgrade-token";

// Stripe SDK は Node ランタイム必須。決済はリクエスト時に毎回実行する。
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GA4 由来の client/session id を Cookie から取り出す（計測用メタデータ）。 */
function gaMetadata(req: NextRequest) {
  const gaClientId = parseGaClientId(req.cookies.get("_ga")?.value);
  const gaSessionId = parseGaSessionId(
    req.cookies.get(ga4SessionCookieName())?.value,
  );
  return {
    ...(gaClientId ? { ga_client_id: gaClientId } : {}),
    ...(gaSessionId ? { ga_session_id: gaSessionId } : {}),
  };
}

/** この jti を使った本契約（−1,980）がすでに成立していないか。単回化のガード。 */
async function isUpgradeJtiConsumed(stripe: Stripe, jti: string): Promise<boolean> {
  const r = await stripe.paymentIntents.search({
    query: `metadata['upgrade_jti']:'${jti}' AND status:'succeeded'`,
    limit: 1,
  });
  return r.data.length > 0;
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
    upgrade?: unknown;
  } | null;

  const uniqueIds = Array.isArray(body?.subjects)
    ? Array.from(
        new Set(body.subjects.filter((v): v is string => typeof v === "string")),
      )
    : [];
  const fullIds = uniqueIds.filter(isValidSubjectId);
  const trialIds = uniqueIds.filter(isTrialSubjectId);

  // お試しと通常教材の混在はカゴを分ける（価格体系・アップグレード導線が別のため）。
  if (fullIds.length > 0 && trialIds.length > 0) {
    return Response.json(
      { error: "お試しと通常教材は分けてお申し込みください。" },
      { status: 400 },
    );
  }
  if (fullIds.length === 0 && trialIds.length === 0) {
    return Response.json(
      { error: "教材を1つ以上選んでください。" },
      { status: 400 },
    );
  }

  const origin = siteConfig.url || new URL(req.url).origin;
  const appUrl = process.env.NOBIT_APP_URL?.replace(/\/$/, "");
  const successUrl = appUrl
    ? `${origin}/apply/complete?session_id={CHECKOUT_SESSION_ID}&setup=1`
    : `${origin}/apply/complete?session_id={CHECKOUT_SESSION_ID}`;

  // Stripe Checkout の共通設定（お試し／本契約で共有）。
  const commonParams: Omit<Stripe.Checkout.SessionCreateParams, "line_items" | "metadata" | "payment_intent_data"> = {
    mode: "payment",
    customer_creation: "always",
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
  };

  try {
    /* ───────────── お試し（3課題・添削3回・1,980円） ───────────── */
    if (trialIds.length > 0) {
      const trials = trialSubjectsByIds(trialIds);
      const count = trials.length;
      const amount = trialTotal(count);
      const labels = trials.map((t) => t.label);
      const registrationLabels = trials.map((t) => t.registrationLabel);
      const metadata = {
        source: "yuta-eng",
        plan: "trial",
        subjects: trials.map((t) => t.id).join(","),
        subject_labels: registrationLabels.join("・"),
        subject_count: String(count),
        amount: String(amount),
        monthly_amount: String(amount),
        list_amount: String(amount),
        // アプリはこのフル教材idに対応する「3課題教材」を割り当てる。
        trial_of: trials.map((t) => t.trialOf).join(","),
        campaign: "",
        ...gaMetadata(req),
      };

      const session = await stripe.checkout.sessions.create({
        ...commonParams,
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: CURRENCY,
              unit_amount: amount,
              product_data: {
                name: `ノビットスタディ お試し（添削3回・${count}教材）`,
                description: labels.join("・"),
              },
            },
          },
        ],
        metadata,
        payment_intent_data: { metadata },
      });

      return Response.json({ url: session.url });
    }

    /* ───────────── 通常（買い切り）＋任意のアップグレード値引き ───────────── */
    const count = fullIds.length;
    const campaign = isCampaignActive();
    const list = listTotal(count);
    const subjects = subjectsByIds(fullIds);
    const labels = subjects.map((s) => s.label);
    const registrationLabels = registrationLabelsBySubjects(subjects);

    // 金額はサーバー側で必ず再計算（クライアントの値は信用しない）。
    let amount = buyoutTotal(count, campaign);
    let plan = "full";
    let creditMeta: Record<string, string> = {};

    // お試し → 本契約のアップグレード。署名付きトークンを検証し、対象のフル教材が
    // カゴにあり、かつ jti が未使用のときだけ −TRIAL_CREDIT を適用する。
    // 検証・照会に失敗したら「割引を付けない（通常額）」にフォールバック＝amount と
    // 実請求額は常に一致し、決済不整合は起きない。
    const upgradeToken = typeof body?.upgrade === "string" ? body.upgrade : null;
    if (upgradeToken) {
      const verified = verifyUpgradeToken(
        upgradeToken,
        process.env.NOBIT_REGISTER_SECRET,
      );
      if (verified.ok && fullIds.includes(verified.payload.s)) {
        let consumed = true; // 照会できなければ安全側（割引なし）に倒す。
        try {
          consumed = await isUpgradeJtiConsumed(stripe, verified.payload.jti);
        } catch (err) {
          console.error(
            "[nobit] upgrade jti 照会に失敗（割引をスキップ）",
            err instanceof Error ? err.message : err,
          );
        }
        if (!consumed) {
          amount = Math.max(0, amount - TRIAL_CREDIT);
          plan = "upgrade";
          creditMeta = {
            upgrade_jti: verified.payload.jti,
            credit_amount: String(TRIAL_CREDIT),
            upgrade_of: verified.payload.s,
          };
        }
      }
    }

    const metadata = {
      source: "yuta-eng",
      plan,
      subjects: fullIds.join(","),
      subject_labels: registrationLabels.join("・"),
      subject_count: String(count),
      amount: String(amount),
      // 旧アプリ連携との後方互換。買い切り額を旧 monthly_amount 名でも渡す。
      monthly_amount: String(amount),
      list_amount: String(list),
      campaign: campaign && count >= 2 ? "pack" : campaign ? "opening" : "",
      ...creditMeta,
      ...gaMetadata(req),
    };

    const session = await stripe.checkout.sessions.create({
      ...commonParams,
      // 本コースのカゴは /order。キャンセル時はカゴへ戻す。
      cancel_url: `${origin}/order?canceled=1`,
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
      metadata,
      payment_intent_data: { metadata },
    });

    return Response.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "決済の作成に失敗しました。";
    return Response.json({ error: message }, { status: 500 });
  }
}
