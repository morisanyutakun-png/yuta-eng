import { storeSeller, type MockExam } from "@/data/mock-exams";
import { getExam } from "@/lib/mock-exams/catalog";
import { findOrder, hasOrderDb, upsertOrder, type OrderStatus } from "@/lib/mock-exams/db";
import { accessDays } from "@/lib/mock-exams/env";
import {
  hasStripe,
  isSessionId,
  paymentIntentId,
  retrieveCheckoutSession,
  type CheckoutSession,
} from "@/lib/mock-exams/stripe";

/**
 * 「この session_id の持ち主は、この模試を買ったか」を確かめる。
 *
 * 決済完了ページとダウンロードの両方がここを通る。判定の手順:
 *   1. ID の形を確かめる（でたらめな値を Stripe に投げない）
 *   2. 注文の記録（DB）があれば、まずそれを見る。返金済みはここで止める
 *   3. 記録が無い・まだ支払い待ちのときは Stripe に Session を問い合わせる
 *      （Webhook より先にユーザーが戻ってくることがあるため）
 *   4. 支払い済み・同じ模試・閲覧期限内なら通す
 *
 * URL の session_id だけを信じて通すことはしない。必ず Stripe か、
 * Stripe の署名つき通知で書いた記録のどちらかで裏を取る。
 */

export type AccessResult =
  | {
      ok: true;
      exam: MockExam;
      sessionId: string;
      email: string | null;
      purchasedAt: Date;
      expiresAt: Date;
    }
  | {
      ok: false;
      reason: "invalid" | "not-found" | "mismatch" | "pending" | "refunded" | "failed" | "expired" | "unavailable";
      exam?: MockExam;
    };

const DAY_MS = 24 * 60 * 60 * 1000;

export async function verifyPurchase(examId: string, sessionId: unknown): Promise<AccessResult> {
  const exam = getExam(examId);
  if (!exam) return { ok: false, reason: "not-found" };
  if (!isSessionId(sessionId)) return { ok: false, reason: "invalid", exam };

  const days = accessDays(storeSeller.accessDays);
  const within = (purchasedAt: Date) => Date.now() - purchasedAt.getTime() <= days * DAY_MS;
  const granted = (email: string | null, purchasedAt: Date): AccessResult =>
    within(purchasedAt)
      ? { ok: true, exam, sessionId, email, purchasedAt, expiresAt: new Date(purchasedAt.getTime() + days * DAY_MS) }
      : { ok: false, reason: "expired", exam };

  // 2. 記録を先に見る
  if (hasOrderDb()) {
    try {
      const order = await findOrder(sessionId);
      if (order) {
        if (order.exam_id !== exam.id) return { ok: false, reason: "mismatch", exam };
        if (order.status === "refunded") return { ok: false, reason: "refunded", exam };
        if (order.status === "failed") return { ok: false, reason: "failed", exam };
        if (order.status === "paid") return granted(order.customer_email, new Date(order.created_at));
        // pending は Stripe に問い合わせ直す（入金済みになっているかもしれない）
      }
    } catch (err) {
      // DB が落ちていても、Stripe で確かめられれば購入者は締め出さない
      console.error("[mock-exams/access] 注文記録を読めなかった", err);
    }
  }

  // 3. Stripe に問い合わせる
  if (!hasStripe()) return { ok: false, reason: "unavailable", exam };
  let session: CheckoutSession;
  try {
    session = await retrieveCheckoutSession(sessionId);
  } catch {
    return { ok: false, reason: "invalid", exam };
  }

  if (session.metadata?.examId !== exam.id) return { ok: false, reason: "mismatch", exam };

  const status: OrderStatus =
    session.payment_status === "paid" ? "paid" : session.status === "expired" ? "failed" : "pending";

  // Webhook が遅れている場合に備えて、ここでも記録しておく（同じ内容なら上書きされるだけ）
  if (hasOrderDb() && session.status === "complete") {
    await upsertOrder({
      sessionId,
      examId: exam.id,
      status,
      amountTotal: session.amount_total,
      currency: session.currency,
      email: session.customer_details?.email ?? null,
      paymentIntentId: paymentIntentId(session),
      livemode: session.livemode,
    }).catch((err) => console.error("[mock-exams/access] 注文を記録できなかった", err));
  }

  if (status === "failed") return { ok: false, reason: "failed", exam };
  if (status !== "paid") return { ok: false, reason: "pending", exam };
  return granted(session.customer_details?.email ?? null, new Date(session.created * 1000));
}

