import { Pool } from "pg";

/**
 * 注文の記録（任意）。
 *
 * DATABASE_URL があれば注文・Webhook・ダウンロードを記録し、返金済みの注文を
 * 止められるようにする。無くてもストアは動く（購入の確認は毎回 Stripe に問い合わせる）。
 * テーブルは scripts/mock-exams-schema.sql。入試プレビューの申込テーブルとは別。
 *
 * 接続のプールは入試プレビュー側（lib/moshi/db.ts）と分けて持つ。
 * 片方の不具合や設定変更が、もう片方に波及しないようにするため。
 */

declare global {
  var __mockExamsPool: Pool | undefined;
}

export const hasOrderDb = () => Boolean(process.env.DATABASE_URL);

function pool(): Pool {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL が設定されていない");
  if (!globalThis.__mockExamsPool) {
    globalThis.__mockExamsPool = new Pool({
      connectionString: url,
      max: 2,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 8_000,
      ssl: /sslmode=disable|localhost|127\.0\.0\.1/.test(url) ? false : { rejectUnauthorized: true },
    });
  }
  return globalThis.__mockExamsPool;
}

export type OrderStatus = "pending" | "paid" | "failed" | "refunded";

export type OrderRecord = {
  stripe_session_id: string;
  exam_id: string;
  status: OrderStatus;
  customer_email: string | null;
  download_count: number;
  created_at: Date;
};

export type OrderUpsert = {
  sessionId: string;
  examId: string;
  status: OrderStatus;
  amountTotal: number | null;
  currency: string | null;
  email: string | null;
  paymentIntentId: string | null;
  livemode: boolean;
};

/**
 * 注文を保存・更新する。
 *
 * 返金済み（refunded）は、あとから遅れて届いた「支払い完了」の通知で
 * paid に戻さない。通知の届く順番は保証されていないため。
 */
export async function upsertOrder(o: OrderUpsert): Promise<void> {
  await pool().query(
    `insert into mock_exam_orders
       (stripe_session_id, exam_id, status, amount_total, currency, customer_email,
        payment_intent_id, livemode, paid_at)
     values ($1, $2, $3, $4, $5, $6, $7, $8, case when $3 = 'paid' then now() end)
     on conflict (stripe_session_id) do update set
       status = case when mock_exam_orders.status = 'refunded' then 'refunded' else excluded.status end,
       amount_total = coalesce(excluded.amount_total, mock_exam_orders.amount_total),
       currency = coalesce(excluded.currency, mock_exam_orders.currency),
       customer_email = coalesce(excluded.customer_email, mock_exam_orders.customer_email),
       payment_intent_id = coalesce(excluded.payment_intent_id, mock_exam_orders.payment_intent_id),
       paid_at = coalesce(mock_exam_orders.paid_at, excluded.paid_at),
       updated_at = now()`,
    [o.sessionId, o.examId, o.status, o.amountTotal, o.currency, o.email, o.paymentIntentId, o.livemode],
  );
}

export async function findOrder(sessionId: string): Promise<OrderRecord | null> {
  const r = await pool().query<OrderRecord>(
    `select stripe_session_id, exam_id, status, customer_email, download_count, created_at
       from mock_exam_orders where stripe_session_id = $1`,
    [sessionId],
  );
  return r.rows[0] ?? null;
}

/** 返金の通知から、該当する注文を止める */
export async function markRefundedByPaymentIntent(paymentIntentId: string): Promise<number> {
  const r = await pool().query(
    `update mock_exam_orders set status = 'refunded', updated_at = now() where payment_intent_id = $1`,
    [paymentIntentId],
  );
  return r.rowCount ?? 0;
}

/**
 * 同じイベントを処理済みなら false。
 * Stripe は応答が遅いと同じ通知を送り直すので、二重に処理しない。
 */
export async function claimWebhookEvent(eventId: string, type: string): Promise<boolean> {
  const r = await pool().query(
    `insert into mock_exam_webhook_events (event_id, type) values ($1, $2) on conflict do nothing`,
    [eventId, type],
  );
  return (r.rowCount ?? 0) > 0;
}

/** 処理に失敗したイベントは記録を消し、Stripe の再送で処理し直せるようにする */
export async function releaseWebhookEvent(eventId: string): Promise<void> {
  await pool().query(`delete from mock_exam_webhook_events where event_id = $1`, [eventId]);
}

export async function recordDownload(sessionId: string, fileKey: string): Promise<void> {
  const db = pool();
  await db.query(`insert into mock_exam_downloads (stripe_session_id, file_key) values ($1, $2)`, [sessionId, fileKey]);
  await db.query(
    `update mock_exam_orders set download_count = download_count + 1, updated_at = now() where stripe_session_id = $1`,
    [sessionId],
  );
}

