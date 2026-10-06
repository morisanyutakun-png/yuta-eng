# 大学別オンライン数学模試（参加申込）

いまの段階で動くのは「告知・参加申込・確認メール・大学別の人数の確認」まで。
受験画面・答案提出・採点・結果・Stripe 決済はまだ作っていない。

## 公開前に設定するもの

Vercel の環境変数に次の4つを入れる。コードには書かない。

| 変数 | 用途 | 無いとどうなるか |
|---|---|---|
| `DATABASE_URL` | 申込の保存先（Neon の **-pooler** 付き接続文字列） | 申込が 503 で受け付けられない。画面は壊れない |
| `RESEND_API_KEY` | 確認メールの送信 | 申込は保存されるが、確認メールが送られない |
| `MOSHI_MAIL_FROM` | 差出人（例 `info@yuta-eng.com`） | 同上 |
| `ADMIN_USER` / `ADMIN_PASSWORD` | 管理画面の Basic 認証 | 管理画面が 503 で開かない（誰でも見られる状態にはならない） |

設定したら、一度だけテーブルを作る。

```
DATABASE_URL='（Neon の Pooled connection をそのまま貼る）' npm run moshi:setup
```

接続文字列は Neon のダッシュボード → Connection string →
**Pooled connection** を選んで表示されるものを使う。ホスト名に `-pooler` が入る。

```
postgresql://ユーザー:パスワード@ep-xxxx-pooler.リージョン.aws.neon.tech/neondb?sslmode=require
```

見本の記号を残したまま実行すると、スクリプトがそれを見つけて止める。

何度流しても同じ結果になる（`create table if not exists`）。既存のテーブルには触らない。

## 置き場所

| 役割 | ファイル |
|---|---|
| 大学・回次・期間・価格 | `data/moshi.json` |
| 設定の読み出し | `lib/moshi/config.ts` |
| 入力の確認 | `lib/moshi/validate.ts` |
| 保存 | `lib/moshi/db.ts` |
| 確認メール | `lib/moshi/mail.ts` |
| 受け口 | `app/api/moshi/apply/route.ts` |
| 案内ページ | `app/moshi/page.tsx` |
| 申込フォーム | `components/moshi-form.tsx` |
| 個人情報の取り扱い | `app/moshi/privacy/page.tsx` |
| 管理画面 | `app/moshi/admin/page.tsx` |
| 管理画面の保護 | `middleware.ts` |
| テーブル定義 | `scripts/moshi-schema.sql` |

## 日程・大学を変えるとき

`data/moshi.json` だけを直す。画面・確認メール・構造化データのすべてが追従する。
大学を足すときは `universities` に1行足す。`id` は申込データに残るので、あとから変えない。
`slug` に既存の大学分析ページの slug を書くと「出題分析」への導線が出る。

## あとで Stripe をつなぐときに触るところ

テーブルには最初から次の列がある。追加のマイグレーションは要らない。

- `exam_applications.application_status` … `applied` → `invoiced` → `paid` → `cancelled`
- `exam_applications.payment_status` … `unpaid` → `paid` → `refunded`
- `exam_applications.stripe_payment_id`

流れは「日程確定 → 該当者に Resend で案内（`invoiced` にする）→ Stripe で決済 →
Webhook で `payment_status='paid'` と `stripe_payment_id` を書く」。
`lib/moshi/db.ts` に更新用の関数を足し、Webhook の受け口を
`app/api/moshi/stripe/route.ts` として作るのが素直。
