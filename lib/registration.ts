// Stripe Checkout セッション → 生徒登録情報の正規化。Webhook（保険連携）と
// セッション照会 API（/setup 画面用）の両方が同じ形を返すよう、ここに集約する。

import type Stripe from "stripe";

export type Registration = {
  type: "new_subscription";
  paid: boolean;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  stripeSessionId: string;
  email: string | null;
  name: string | null;
  phone: string | null;
  studentName: string | null;
  grade: string | null;
  /** 例: "physics,math-2bc"（lib/pricing の Subject.id をカンマ区切り） */
  subjects: string;
  /** 例: "物理・数学IIBC" */
  subjectLabels: string;
  subjectCount: string;
  monthlyAmount: string;
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

  return {
    type: "new_subscription",
    paid: s.payment_status === "paid" || s.status === "complete",
    stripeCustomerId: idOf(s.customer),
    stripeSubscriptionId: idOf(s.subscription),
    stripeSessionId: s.id,
    email: s.customer_details?.email ?? s.customer_email ?? null,
    name: s.customer_details?.name ?? null,
    phone: s.customer_details?.phone ?? null,
    studentName: (fields.student_name as string | undefined) ?? null,
    grade: (fields.grade as string | undefined) ?? null,
    subjects: s.metadata?.subjects ?? "",
    subjectLabels: s.metadata?.subject_labels ?? "",
    subjectCount: s.metadata?.subject_count ?? "",
    monthlyAmount: s.metadata?.monthly_amount ?? "",
    createdAt: new Date(createdMs).toISOString(),
  };
}
