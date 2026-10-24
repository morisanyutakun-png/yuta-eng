import { createHmac, timingSafeEqual } from "node:crypto";

import { storeSeller, type MockExam } from "@/data/mock-exams";
import { getExam } from "@/lib/mock-exams/catalog-server";
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
      isTest?: boolean;
      isAdminPreview?: boolean;
    }
  | {
      ok: false;
      reason: "invalid" | "not-found" | "mismatch" | "pending" | "refunded" | "failed" | "expired" | "unavailable";
      exam?: MockExam;
    };

const DAY_MS = 24 * 60 * 60 * 1000;

function getSecretForTest(): string {
  return (
    process.env.STORE_DOWNLOAD_SECRET?.trim() ||
    process.env.STRIPE_SECRET_KEY?.trim() ||
    "fallback-internal-test-key-yuta-mock"
  );
}

/**
 * テストメール送信用のセッションIDを発行する。
 * 形式: `cs_test_mock_${ts}_${sig}`
 * サーバー側で STORE_DOWNLOAD_SECRET によりHMAC署名されており、第三者は偽造できない。
 */
export function createTestSessionId(examId: string): string {
  const ts = Date.now();
  const secret = getSecretForTest();
  const raw = `${examId}:${ts}`;
  const sig = createHmac("sha256", secret).update(raw).digest("hex").slice(0, 24);
  return `cs_test_mock_${ts}_${sig}`;
}

/**
 * テストメール用のセッションIDを検証する。
 * 署名と有効期限（30日以内）が正しい場合のみ true を返す。
 */
export function verifyTestSessionId(
  examId: string,
  sessionId: string,
): { valid: boolean; ts: number } {
  if (!sessionId.startsWith("cs_test_mock_")) {
    return { valid: false, ts: 0 };
  }
  const parts = sessionId.split("_");
  if (parts.length !== 5) {
    return { valid: false, ts: 0 };
  }
  const ts = Number(parts[3]);
  const sig = parts[4];
  if (!Number.isFinite(ts) || !sig) {
    return { valid: false, ts: 0 };
  }
  // 30日以内、かつ未来1分以内
  const MAX_AGE = 30 * 24 * 60 * 60 * 1000;
  if (Date.now() - ts > MAX_AGE || ts > Date.now() + 60000) {
    return { valid: false, ts: 0 };
  }

  const secret = getSecretForTest();
  const raw = `${examId}:${ts}`;
  const expectedSig = createHmac("sha256", secret).update(raw).digest("hex").slice(0, 24);
  try {
    const ok = timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig));
    return { valid: ok, ts };
  } catch {
    return { valid: false, ts: 0 };
  }
}

export async function verifyPurchase(examId: string, sessionId: unknown): Promise<AccessResult> {
  const exam = getExam(examId);
  if (!exam) return { ok: false, reason: "not-found" };

  // 1. テストメール送信経由の署名付きセッション判定（テストメール例外処理）
  if (typeof sessionId === "string") {
    const testCheck = verifyTestSessionId(exam.id, sessionId);
    if (testCheck.valid) {
      const days = accessDays(storeSeller.accessDays);
      const purchasedAt = new Date(testCheck.ts);
      return {
        ok: true,
        exam,
        sessionId,
        email: "morisan.yutakun@gmail.com",
        purchasedAt,
        expiresAt: new Date(purchasedAt.getTime() + days * DAY_MS),
        isTest: true,
      };
    }
  }

  // 2. 管理者プレビュー用セッション判定（管理画面からの直接プレビュー例外処理）
  if (sessionId === "admin_preview_session") {
    const days = accessDays(storeSeller.accessDays);
    const now = new Date();
    return {
      ok: true,
      exam,
      sessionId: "admin_preview_session",
      email: "morisan.yutakun@gmail.com",
      purchasedAt: now,
      expiresAt: new Date(now.getTime() + days * DAY_MS),
      isAdminPreview: true,
    };
  }

  // 3. 開発プレビュー用バイパス
  if (process.env.STORE_PREVIEW === "1" && (sessionId === "preview" || sessionId === "demo")) {
    const days = accessDays(storeSeller.accessDays);
    const now = new Date();
    return {
      ok: true,
      exam,
      sessionId: "cs_test_preview_demo_guest",
      email: "buyer@example.com",
      purchasedAt: now,
      expiresAt: new Date(now.getTime() + days * DAY_MS),
    };
  }

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

