-- 入試プレビューの参加申込。
--
-- 申込は「人」と「選んだ大学」に分けて持つ。1人が複数大学に申し込むので、
-- 大学の側を行で持たないと、あとから1大学だけ取り下げる・足すができない。
--
-- 支払いは後からなので、状態の列を最初から置いてある。
-- いまは status='applied'、payment_status='unpaid' のまま動く。
-- Stripe をつなぐときは payment_status と stripe_payment_id を更新するだけでよい。

create table if not exists exam_applications (
  id                bigserial primary key,
  name              text        not null,
  email             text        not null,
  grade             text        not null,
  faculty           text,
  -- applied → invoiced → paid → cancelled を想定
  application_status text       not null default 'applied',
  -- unpaid → paid → refunded を想定
  payment_status    text        not null default 'unpaid',
  stripe_payment_id text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- メールの結果。届かなかったときに理由を残し、管理画面で確かめられるようにする。
-- 既にある表にも足せるよう、列ごとに if not exists で書く。
alter table exam_applications add column if not exists mail_confirmation text;
alter table exam_applications add column if not exists mail_admin        text;
alter table exam_applications add column if not exists mail_at           timestamptz;

-- 同じ人が二重に増えないようにする。大文字小文字の違いは同じ人とみなす
create unique index if not exists exam_applications_email_key
  on exam_applications (lower(email));

create table if not exists exam_application_universities (
  application_id bigint      not null references exam_applications (id) on delete cascade,
  university_id  text        not null,
  created_at     timestamptz not null default now(),
  -- 同じ申込で同じ大学を二重に持たない
  primary key (application_id, university_id)
);

create index if not exists exam_application_universities_univ_idx
  on exam_application_universities (university_id);
