import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Stripe との最小限のやりとり。
 *
 * SDK（stripe パッケージ）を足さずに、HTTP API を直接呼ぶ。
 * 使うのは「Checkout Session を作る」「取り出す」「Webhook の署名を確かめる」の
 * 3つだけで、そのために依存とバンドルを増やすほどではないため。
 * package.json・lock ファイルを触らずに済み、既存の構成にも手を入れない。
 *
 * カード番号はこのサイトを一切通らない。決済画面は Stripe がホストする
 * Checkout（Hosted）で、こちらが受け取るのは Session の ID と決済結果だけ。
 */

const API = "https://api.stripe.com/v1";

export class StripeConfigError extends Error {}

export class StripeApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code?: string,
  ) {
    super(message);
  }
}

export const hasStripe = () => Boolean(process.env.STRIPE_SECRET_KEY?.trim());

function secretKey(): string {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) throw new StripeConfigError("STRIPE_SECRET_KEY が設定されていない");
  return key;
}

/**
 * Stripe の API はフォーム形式で、入れ子は `a[b][c]=…` と書く。
 * 配列は添字つき（`line_items[0][price]`）にする。
 */
type FormValue = string | number | boolean | null | undefined | FormValue[] | { [k: string]: FormValue };

function encodeForm(obj: Record<string, FormValue>): string {
  const out = new URLSearchParams();
  const walk = (prefix: string, v: FormValue) => {
    if (v === undefined || v === null) return;
    if (Array.isArray(v)) {
      v.forEach((item, i) => walk(`${prefix}[${i}]`, item));
    } else if (typeof v === "object") {
      for (const [k, child] of Object.entries(v)) walk(prefix ? `${prefix}[${k}]` : k, child);
    } else {
      out.append(prefix, String(v));
    }
  };
  walk("", obj as FormValue);
  return out.toString();
}

async function stripeFetch<T>(path: string, init: { method: "GET" | "POST"; body?: Record<string, FormValue>; query?: string }): Promise<T> {
  const url = `${API}${path}${init.query ? `?${init.query}` : ""}`;
  const res = await fetch(url, {
    method: init.method,
    headers: {
      Authorization: `Bearer ${secretKey()}`,
      ...(init.body ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
    },
    body: init.body ? encodeForm(init.body) : undefined,
    cache: "no-store",
  });
  const json = (await res.json().catch(() => ({}))) as { error?: { message?: string; code?: string } };
  if (!res.ok) {
    // 返ってきた理由は捨てずにログへ。鍵や個人情報は含まれない
    const message = json.error?.message ?? `Stripe API ${res.status}`;
    console.error(`[mock-exams/stripe] ${init.method} ${path} → ${res.status} ${message}`);
    throw new StripeApiError(message, res.status, json.error?.code);
  }
  return json as T;
}

/** 使う項目だけを型に書く。API の版が変わっても安定している項目に限る */
export type CheckoutSession = {
  id: string;
  object: "checkout.session";
  url: string | null;
  status: "open" | "complete" | "expired" | null;
  payment_status: "paid" | "unpaid" | "no_payment_required";
  amount_total: number | null;
  currency: string | null;
  created: number;
  livemode: boolean;
  client_reference_id: string | null;
  metadata: Record<string, string> | null;
  customer_details: { email: string | null; name: string | null } | null;
  payment_intent: string | { id: string } | null;
};

export type CreateCheckoutInput = {
  examId: string;
  title: string;
  /** 税込・円。Price ID が無いときにだけ使う */
  amount: number;
  priceId: string | null;
  successUrl: string;
  cancelUrl: string;
};

/** 決済画面（Stripe Checkout）を作る */
export function createCheckoutSession(input: CreateCheckoutInput): Promise<CheckoutSession> {
  const lineItem = input.priceId
    ? { price: input.priceId, quantity: 1 }
    : {
        quantity: 1,
        price_data: {
          // 日本円は小数点のない通貨なので、unit_amount は円のまま渡す
          currency: "jpy",
          unit_amount: input.amount,
          product_data: { name: input.title, metadata: { examId: input.examId } },
        },
      };

  return stripeFetch<CheckoutSession>("/checkout/sessions", {
    method: "POST",
    body: {
      mode: "payment",
      locale: "ja",
      line_items: [lineItem],
      // {CHECKOUT_SESSION_ID} は Stripe が実際の ID に置き換える
      success_url: input.successUrl,
      cancel_url: input.cancelUrl,
      client_reference_id: input.examId,
      metadata: { examId: input.examId, store: "mock-exams" },
      payment_intent_data: { metadata: { examId: input.examId, store: "mock-exams" } },
      // 領収のためにメールアドレスは必ず受け取る（Checkout が入力欄を出す）
      billing_address_collection: "auto",
      // 放置された決済画面は早めに閉じる（最短30分）
      expires_at: Math.floor(Date.now() / 1000) + 60 * 60,
    },
  });
}

/** Session を取り出す。決済完了ページで、本当に支払われたかを確かめるのに使う */
export function retrieveCheckoutSession(id: string): Promise<CheckoutSession> {
  return stripeFetch<CheckoutSession>(`/checkout/sessions/${encodeURIComponent(id)}`, { method: "GET" });
}

/** Checkout Session の ID の形。URL から来た値を Stripe に投げる前に確かめる */
export const isSessionId = (v: unknown): v is string =>
  typeof v === "string" && /^cs_(test|live)_[A-Za-z0-9]{10,200}$/.test(v);

export const paymentIntentId = (s: Pick<CheckoutSession, "payment_intent">): string | null =>
  typeof s.payment_intent === "string" ? s.payment_intent : s.payment_intent?.id ?? null;

// ---------------------------------------------------------------------------
//  Webhook の署名検証
// ---------------------------------------------------------------------------

export type StripeEvent = {
  id: string;
  type: string;
  created: number;
  livemode: boolean;
  data: { object: Record<string, unknown> };
};

export class WebhookSignatureError extends Error {}

/**
 * `Stripe-Signature` ヘッダーを確かめ、正しければイベントを返す。
 *
 * Stripe の公式の手順どおり、`<t>.<生の本文>` を Webhook の署名シークレットで
 * HMAC-SHA256 し、ヘッダーの v1 のどれかと一致するかを比べる。
 * 本文は JSON として読み直す前の**生の文字列**でなければならない。
 * 比較は長さが同じときだけ timingSafeEqual で行い、時間差で値を推測させない。
 *
 * t が古すぎるもの（既定5分）は、盗まれた通知の再送とみなして拒む。
 */
export function constructWebhookEvent(
  rawBody: string,
  signatureHeader: string | null,
  secret: string,
  toleranceSec = 300,
): StripeEvent {
  if (!signatureHeader) throw new WebhookSignatureError("Stripe-Signature ヘッダーがない");

  let timestamp: number | null = null;
  const signatures: string[] = [];
  for (const part of signatureHeader.split(",")) {
    const [k, v] = part.split("=", 2).map((s) => s?.trim());
    if (k === "t" && v) timestamp = Number(v);
    if (k === "v1" && v) signatures.push(v);
  }
  if (!timestamp || !Number.isFinite(timestamp) || signatures.length === 0) {
    throw new WebhookSignatureError("署名ヘッダーの形が正しくない");
  }

  const expected = createHmac("sha256", secret).update(`${timestamp}.${rawBody}`, "utf8").digest();
  const matched = signatures.some((sig) => {
    if (!/^[0-9a-f]+$/i.test(sig)) return false;
    const given = Buffer.from(sig, "hex");
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
  if (!matched) throw new WebhookSignatureError("署名が一致しない");

  const age = Math.abs(Math.floor(Date.now() / 1000) - timestamp);
  if (age > toleranceSec) throw new WebhookSignatureError("署名の時刻が許容範囲外");

  let event: StripeEvent;
  try {
    event = JSON.parse(rawBody) as StripeEvent;
  } catch {
    throw new WebhookSignatureError("本文が JSON ではない");
  }
  if (!event?.id || !event?.type || !event?.data?.object) {
    throw new WebhookSignatureError("イベントの形が正しくない");
  }
  return event;
}

