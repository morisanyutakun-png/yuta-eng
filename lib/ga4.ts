import "server-only";

import { createHash } from "node:crypto";

import type Stripe from "stripe";

const DEFAULT_GA_MEASUREMENT_ID = "G-W11S94CV6L";
const GA4_ENDPOINT = "https://www.google-analytics.com/mp/collect";

type Ga4ConsentValue = "GRANTED" | "DENIED";

export type PurchaseAnalyticsItem = {
  item_id: string;
  item_name: string;
  item_brand: string;
  item_category: string;
  price: number;
  quantity: number;
};

export type PurchaseAnalytics = {
  paid: boolean;
  transactionId: string;
  value: number;
  currency: string;
  items: PurchaseAnalyticsItem[];
};

export type Ga4PurchaseResult = {
  ok: boolean;
  skipped?: string;
  clientIdSource?: "metadata" | "fallback";
};

function splitMetadataList(value: string | undefined, separator: string) {
  return (value ?? "")
    .split(separator)
    .map((v) => v.trim())
    .filter(Boolean);
}

function numberFromMetadata(value: string | number | null | undefined) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function consentValue(value: string | undefined): Ga4ConsentValue | undefined {
  const normalized = value?.trim().toLowerCase();
  if (!normalized) return undefined;
  if (["1", "true", "grant", "granted"].includes(normalized)) return "GRANTED";
  if (["0", "false", "deny", "denied"].includes(normalized)) return "DENIED";
  return undefined;
}

function measurementProtocolConsent() {
  const adUserData = consentValue(process.env.GA4_AD_USER_DATA_CONSENT);
  const adPersonalization = consentValue(
    process.env.GA4_AD_PERSONALIZATION_CONSENT,
  );
  if (!adUserData && !adPersonalization) return undefined;

  return {
    ...(adUserData ? { ad_user_data: adUserData } : {}),
    ...(adPersonalization ? { ad_personalization: adPersonalization } : {}),
  };
}

function debugModeEnabled() {
  return process.env.GA4_DEBUG_MODE === "1";
}

function fallbackClientId(session: Stripe.Checkout.Session) {
  const created = session.created || Math.floor(Date.now() / 1000);
  const hash = createHash("sha256").update(session.id).digest("hex").slice(0, 8);
  const tail = parseInt(hash, 16);
  return `${created}.${tail.toString().padStart(10, "0")}`;
}

function gaClientId(session: Stripe.Checkout.Session) {
  const metadataClientId = session.metadata?.ga_client_id?.trim();
  if (metadataClientId) {
    return { clientId: metadataClientId, source: "metadata" as const };
  }

  return { clientId: fallbackClientId(session), source: "fallback" as const };
}

export function ga4MeasurementId() {
  return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || DEFAULT_GA_MEASUREMENT_ID;
}

export function ga4SessionCookieName(measurementId = ga4MeasurementId()) {
  return `_ga_${measurementId.replace(/^G-/, "")}`;
}

export function parseGaClientId(cookieValue: string | undefined | null) {
  if (!cookieValue) return null;

  if (/^\d+\.\d+$/.test(cookieValue)) return cookieValue;

  const parts = cookieValue.split(".");
  if (parts.length >= 4 && /^GA\d+$/.test(parts[0])) {
    const candidate = `${parts[2]}.${parts[3]}`;
    return /^\d+\.\d+$/.test(candidate) ? candidate : null;
  }

  return null;
}

export function parseGaSessionId(cookieValue: string | undefined | null) {
  if (!cookieValue) return null;

  const gs2 = cookieValue.match(/(?:^|[$.])s(\d+)/);
  if (gs2?.[1]) return gs2[1];

  const parts = cookieValue.split(".");
  const candidate = parts[2];
  return candidate && /^\d+$/.test(candidate) ? candidate : null;
}

export function buildPurchaseAnalytics(
  session: Stripe.Checkout.Session,
): PurchaseAnalytics {
  const subjectIds = splitMetadataList(session.metadata?.subjects, ",");
  const subjectLabels = splitMetadataList(session.metadata?.subject_labels, "・");
  const value =
    numberFromMetadata(session.metadata?.amount) ||
    numberFromMetadata(session.amount_total);
  const count =
    numberFromMetadata(session.metadata?.subject_count) ||
    Math.max(subjectIds.length, subjectLabels.length, 1);
  const itemPrice = count > 0 ? Math.round((value / count) * 100) / 100 : value;
  const itemCount = Math.max(subjectIds.length, subjectLabels.length, count, 1);

  return {
    paid: session.payment_status === "paid",
    transactionId: session.id,
    value,
    currency: (session.currency ?? "jpy").toUpperCase(),
    items: Array.from({ length: itemCount }, (_, i) => ({
      item_id: subjectIds[i] ?? `subject-${i + 1}`,
      item_name: subjectLabels[i] ?? "ノビットスタディ 教材",
      item_brand: "ノビットスタディ",
      item_category: "教材",
      price: itemPrice,
      quantity: 1,
    })),
  };
}

export async function sendGa4Purchase(
  session: Stripe.Checkout.Session,
): Promise<Ga4PurchaseResult> {
  const apiSecret =
    process.env.GA4_API_SECRET?.trim() ||
    process.env.GOOGLE_ANALYTICS_API_SECRET?.trim();
  if (!apiSecret) {
    console.info("[ga4] GA4_API_SECRET 未設定のため purchase 送信をスキップ");
    return { ok: false, skipped: "missing_api_secret" };
  }

  const { clientId, source: clientIdSource } = gaClientId(session);
  const purchase = buildPurchaseAnalytics(session);
  if (!purchase.paid) {
    return { ok: false, skipped: "unpaid" };
  }

  const sessionId = session.metadata?.ga_session_id?.trim();
  const consent = measurementProtocolConsent();

  try {
    const res = await fetch(
      `${GA4_ENDPOINT}?measurement_id=${encodeURIComponent(
        ga4MeasurementId(),
      )}&api_secret=${encodeURIComponent(apiSecret)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({
          client_id: clientId,
          ...(consent ? { consent } : {}),
          events: [
            {
              name: "purchase",
              params: {
                transaction_id: purchase.transactionId,
                value: purchase.value,
                currency: purchase.currency,
                affiliation: "ノビットスタディ 中高部",
                tax: 0,
                shipping: 0,
                engagement_time_msec: 1,
                ...(debugModeEnabled() ? { debug_mode: true } : {}),
                ...(sessionId ? { session_id: sessionId } : {}),
                items: purchase.items,
              },
            },
          ],
        }),
      },
    );

    if (!res.ok) {
      const body = (await res.text().catch(() => "")).slice(0, 300);
      console.error(`[ga4] purchase 送信失敗 status=${res.status} body=${body}`);
      return { ok: false, clientIdSource };
    }

    console.info(
      `[ga4] purchase 送信 transaction_id=${purchase.transactionId} client_id_source=${clientIdSource}`,
    );
    return { ok: true, clientIdSource };
  } catch (err) {
    console.error(
      `[ga4] purchase 送信エラー: ${err instanceof Error ? err.message : "unknown"}`,
    );
    return { ok: false, clientIdSource };
  }
}
