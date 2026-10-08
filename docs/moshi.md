# 入試プレビュー（参加申込）

大学別のオンライン数学模試シリーズ。シリーズ名・大学別の試験名は `data/moshi.json` が共通データで、サイト・確認メール・PDF見本に反映する。
名称を変えても、大学別の `id` と `/moshi/...` のURLは変更しない。PDFの表紙・柱・文書タイトルは `npm run moshi:sample` で再生成する。

公開する返却資料・問題冊子は全大学共通の見本。大学別ページから見本へ実在の大学名を渡さない。
`data/moshi-return.json` の大学名・区分・回次・年度・日付は「〇〇大学」「数学」「第〇回」「20XX」の架空表記を使い、実際の開催内容とは切り離す。
問題・解答・採点基準の見本も特定大学の出題内容・配点を示すものではない。

## 返却成績冊子・数学の参考判定

返却冊子はカラーのA4横・表裏2ページ。両面印刷は短辺とじ。
表面は得点・平均点・偏差値・順位・得点率・合格参考判定、設問別成績、答案の5観点チャート。
裏面は答案講評・2週間の復習計画・得点分布。採点済み答案は別添PDFで返却する。

「合格参考判定（A〜D）」は数学単体の現状を示す採点者の総合評価。
得点だけで機械的に判定せず、答案の論理の明確さ・分野バランスも合わせて見る。
統計的に推定した合格確率、共通テスト・他教科を含む総合判定、合格保証とは区別する。
評価の呼び方・意味は `data/moshi.json` の `judgementNote` / `judgementLevels` で共有する。
5観点は方針・立式、計算の正確さ、論理の明確さ、条件の確認、検算・見直し。
各100点換算の採点者評価で、分野別得点率・偏差値とは別の尺度。

見本の成績・判定B・観点別評価・受験者50名の得点はすべて架空。
偏差値は `50 + 10 × (本人得点 − 平均点) / 母標準偏差`、順位は本人より高得点の人数＋1（同点同順位）。
WebとPDFで同じ得点集団から計算する。実際の統計は同じ大学・同じ回の受験者が30名以上の場合のみ掲載する。
少人数でも答案の総合評価・学習到達度は返す。採点・判定の自動化や実受験者の結果配信機能は未実装。

情報の区分・成績表の構成は公式資料を参考にした独自デザイン。他社のロゴ・レイアウト・判定基準は転用しない。

- [河合塾：成績表の見方](https://www.kawai-juku.ac.jp/zento/grades/report/)
- [駿台：返却資料](https://www2.sundai.ac.jp/moshi/provided-materials/)
- [駿台：模試の結果の活用](https://www2.sundai.ac.jp/column/moshi/moshi-howto/)

返却見本だけ再生成する場合は `npm run moshi:sample -- --kind return`。問題冊子には触れない。

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
| `MOSHI_NOTIFY_BCC` | 申込を知らせる控えの宛先（任意） | 控えが届かない。申込と確認メールはそのまま動く |

`MOSHI_NOTIFY_BCC` は bcc なので、申し込んだ本人からは見えない。
公開しているコードに個人の宛先を書かないため、環境変数から読む。

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

## 試した申込を片づける

```
DATABASE_URL='…' npm run moshi:reset              # 件数を見るだけ
DATABASE_URL='…' npm run moshi:reset -- --yes     # 全部消す
DATABASE_URL='…' npm run moshi:reset -- --email=xxx@example.com --yes   # 1件だけ
```

`--yes` を付けないと何も消さない。中間表は外部キーで一緒に消える。
