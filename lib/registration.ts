// Stripe Checkout セッション → 生徒登録情報の正規化。Webhook（保険連携）と
// セッション照会 API（/setup 画面用）の両方が同じ形を返すよう、ここに集約する。

import type Stripe from "stripe";

export type Registration = {
  /** 買い切り（教材の一括購入）。旧サブスク時代は "new_subscription"。 */
  type: "new_purchase";
  paid: boolean;
  stripeCustomerId: string | null;
  /** 買い切り（payment モード）の PaymentIntent ID。 */
  stripePaymentIntentId: string | null;
  /** 旧アプリ連携との後方互換。買い切りでは PaymentIntent ID を入れる。 */
  stripeSubscriptionId: string | null;
  stripeSessionId: string;
  email: string | null;
  name: string | null;
  phone: string | null;
  studentName: string | null;
  grade: string | null;
  /** 例: "physics,math-2bc"（lib/pricing の Subject.id をカンマ区切り）。お試しは "math-1a-trial" 等。 */
  subjects: string;
  /** 例: "物理入門演習・数学IIBC" */
  subjectLabels: string;
  subjectCount: string;
  /** 買い切り合計（税込・円）の文字列。 */
  amount: string;
  /** 旧アプリ連携との後方互換。買い切り額を同じ値で返す。 */
  monthlyAmount: string;
  /**
   * 購入の種別。
   *   "full"    … 通常の買い切り
   *   "trial"   … お試し（3課題・添削3回）。subjects は *-trial、trialOf に対応フル教材id。
   *   "upgrade" … お試し→本契約（−credit の値引き適用済み）。
   */
  plan: string;
  /** お試しに対応するフル教材id（plan="trial" のとき）。例 "math-1a"。 */
  trialOf: string;
  /** アップグレードで値引きした金額（税込・円）の文字列（plan="upgrade" のとき）。 */
  creditAmount: string;
  /** アップグレード対象のフル教材id（plan="upgrade" のとき）。 */
  upgradeOf: string;
  createdAt: string;
};

/** string | 展開済みオブジェクト | null から ID 文字列を取り出す。 */
function idOf(v: unknown): string | null {
  if (!v) return null;
  if (typeof v === "string") return v;
  if (typeof v === "object" && v !== null && "id" in v) {
    const id = (v as { id?: unknown }).id;
    return typeof id === "string" ? id : null;
  }
  return null;
}

export function buildRegistration(
  s: Stripe.Checkout.Session,
  createdAtSec?: number,
): Registration {
  const fields = Object.fromEntries(
    (s.custom_fields ?? []).map((f) => [
      f.key,
      f.type === "dropdown" ? f.dropdown?.value : f.text?.value,
    ]),
  );

  const createdMs = (createdAtSec ?? Math.floor(Date.now() / 1000)) * 1000;
  const studentName = (fields.student_name as string | undefined) ?? null;

  return {
    type: "new_purchase",
    paid: s.payment_status === "paid" || s.status === "complete",
    stripeCustomerId: idOf(s.customer),
    stripePaymentIntentId: idOf(s.payment_intent),
    stripeSubscriptionId: idOf(s.subscription) ?? idOf(s.payment_intent),
    stripeSessionId: s.id,
    email: s.customer_details?.email ?? s.customer_email ?? null,
    name: s.customer_details?.name ?? studentName,
    phone: s.customer_details?.phone ?? null,
    studentName,
    grade: (fields.grade as string | undefined) ?? null,
    subjects: s.metadata?.subjects ?? "",
    subjectLabels: s.metadata?.subject_labels ?? "",
    subjectCount: s.metadata?.subject_count ?? "",
    amount: s.metadata?.amount ?? s.metadata?.monthly_amount ?? "",
    monthlyAmount: s.metadata?.amount ?? s.metadata?.monthly_amount ?? "",
    plan: s.metadata?.plan ?? "full",
    trialOf: s.metadata?.trial_of ?? "",
    creditAmount: s.metadata?.credit_amount ?? "",
    upgradeOf: s.metadata?.upgrade_of ?? "",
    createdAt: new Date(createdMs).toISOString(),
  };
}

export function isYutaCheckoutSession(s: Stripe.Checkout.Session): boolean {
  if (s.metadata?.source === "yuta-eng") return true;

  return Boolean(
    s.metadata?.subjects?.trim() &&
      s.metadata?.subject_labels?.trim() &&
      s.metadata?.subject_count?.trim() &&
      s.metadata?.amount?.trim(),
  );
}
