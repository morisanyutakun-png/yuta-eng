-- 模試演習ストア（/mock-exams）の注文記録。
--
--   DATABASE_URL='postgres://…' node scripts/mock-exams-setup.mjs
--
-- 既存の入試プレビュー申込テーブル（exam_applications など）とは名前を分け、
-- 互いに触らない。何度流しても同じ結果になる。

create table if not exists mock_exam_orders (
  id                 bigserial primary key,
  stripe_session_id  text not null unique,
  exam_id            text not null,
  -- pending: コンビニ・銀行振込などで入金待ち / paid: 支払い済み
  -- failed: 入金されずに失効 / refunded: 返金済み（ダウンロード不可）
  status             text not null check (status in ('pending', 'paid', 'failed', 'refunded')),
  amount_total       integer,
  currency           text,
  customer_email     text,
  payment_intent_id  text,
  livemode           boolean not null default false,
  download_count     integer not null default 0,
  paid_at            timestamptz,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index if not exists mock_exam_orders_payment_intent_idx on mock_exam_orders (payment_intent_id);

create index if not exists mock_exam_orders_email_idx on mock_exam_orders (lower(customer_email));

-- 同じ通知が2度届いても二重に処理しないための記録
create table if not exists mock_exam_webhook_events (
  event_id     text primary key,
  type         text not null,
  received_at  timestamptz not null default now()
);

-- ダウンロードの記録（流出を疑うときに、どの注文から何度落とされたかを見る）
create table if not exists mock_exam_downloads (
  id                 bigserial primary key,
  stripe_session_id  text not null references mock_exam_orders (stripe_session_id) on delete cascade,
  file_key           text not null,
  downloaded_at      timestamptz not null default now()
);

create index if not exists mock_exam_downloads_session_idx on mock_exam_downloads (stripe_session_id);

