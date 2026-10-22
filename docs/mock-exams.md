# 模試演習ストア（`/mock-exams`）

大学別冠模試（入試プレビュー過去問アーカイブ）および全統記述レベル実戦模試の印刷用 A4 PDF（問題冊子・所定解答用紙・解答解説・採点基準の 4 点セット）を販売する独立ストア機能です。

## 1. 既存コードとの分離方針

既存のページ・共通レイアウト（`app/layout.tsx`）・`app/globals.css`・`next.config.ts`・`package.json` には一切変更を加えず、以下の独立したディレクトリ配下のみで完結しています。

| 役割 | パス |
|---|---|
| 商品定義・採点基準サンプル・特商法表記データ | `data/mock-exams.ts` |
| 商品カタログ取得・価格表示・Price ID 解決 | `lib/mock-exams/catalog.ts` |
| Stripe Checkout 作成・取得・Webhook 署名検証 | `lib/mock-exams/stripe.ts` |
| 期限付きダウンロード署名（HMAC-SHA256） | `lib/mock-exams/env.ts` |
| 決済セッション検証・購入者アクセス判定 | `lib/mock-exams/access.ts` |
| 非公開 PDF の読み込み・中継配信 | `lib/mock-exams/files.ts` |
| 注文・Webhook・ダウンロード記録（任意 DB） | `lib/mock-exams/db.ts` |
| 購入確認メール送信（任意・Resend） | `lib/mock-exams/mail.ts` |
| 模試一覧ページ（難易度別フィルターつき） | `app/mock-exams/page.tsx` |
| 模試詳細・購入ページ（採点基準サンプル・紙面見本） | `app/mock-exams/[id]/page.tsx` |
| 購入完了・PDF ダウンロード・解説閲覧ページ | `app/mock-exams/[id]/view/page.tsx` |
| 特定商取引法に基づく表記・ご利用条件 | `app/mock-exams/legal/page.tsx` |
| ストア共通レイアウト・ナビゲーションバー | `app/mock-exams/layout.tsx`, `components/mock-exams/*` |
| Checkout Session 作成 API | `app/api/mock-exams/checkout/route.ts` |
| Stripe Webhook 受信・検証 API | `app/api/stripe/webhook/route.ts` |
| 署名検証つき PDF ダウンロード API | `app/api/mock-exams/download/route.ts` |
| 注文テーブル定義・初期化スクリプト | `scripts/mock-exams-schema.sql`, `scripts/mock-exams-setup.mjs` |
| PDF 組版プリアンブル・見本原稿・ビルドスクリプト | `assets/mock-exams-store/`, `scripts/build-mock-exam-pdf.py` |

## 2. 環境変数（`.env.example`）

| 変数名 | 必須 | 説明 |
|---|---|---|
| `STRIPE_SECRET_KEY` | 必須 | Stripe シークレットキー（`sk_test_...` / `sk_live_...`） |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | 推奨 | Stripe 公開可能キー（`pk_test_...` / `pk_live_...`） |
| `STRIPE_WEBHOOK_SECRET` | 必須 | Stripe Webhook 署名シークレット（`whsec_...`） |
| `STORE_DOWNLOAD_SECRET` | 必須 | PDF ダウンロード URL の HMAC 署名鍵（32 文字以上） |
| `STORE_PDF_DIR` | 条件付 | ローカル・自前サーバーで有料 PDF を置くディレクトリ（既定: `~/模試演習ストア/_dist`） |
| `STORE_PDF_BASE_URL` | 条件付 | Vercel 本番等で非公開オブジェクトストレージから PDF を取得する場合のベース URL |
| `STORE_PDF_TOKEN` | 任意 | `STORE_PDF_BASE_URL` 取得時に付与する Bearer トークン |
| `STORE_BASE_URL` | 任意 | リダイレクト URL のベース（本番既定: `https://yuta-eng.com`） |
| `STORE_ACCESS_DAYS` | 任意 | 購入後の再ダウンロード可能日数（既定: `90`） |
| `DATABASE_URL` | 任意 | 設定時は注文・Webhook べき等性・ダウンロード回数・返金停止を DB に記録 |

DB テーブルを作成する場合は一度だけ以下を実行します（既存の `exam_applications` テーブルには触れません）:

```sh
DATABASE_URL='postgresql://...' node scripts/mock-exams-setup.mjs
```

## 3. PDF 組版（「合格答案をつくる」シリーズ準拠）

既刊「合格答案をつくる」シリーズ（`~/三重大全学数学/三重大数学/` 等）の組版マクロ（`\bdot`、問題紙 `monsheet`、二重下線の答 `\Ans`、加点 `\Sp`・減点 `\Sm` の採点表 `saiten`）に、本番そっくりの所定解答用紙マクロ `\answersheet` を加えた `assets/mock-exams-store/tex/store-preamble.tex` を使います。

```sh
# 見本版（大問1のみ）の組版＋Web用プレビュー画像（public/samples/mock-exams/<id>/*.webp）の生成
python3 scripts/build-mock-exam-pdf.py kijutsu-standard-01 --example --previews --out /tmp/store-dist/kijutsu-standard-01

# 製品版（~/模試演習ストア/<id> → ~/模試演習ストア/_dist/<id>）の組版
python3 scripts/build-mock-exam-pdf.py kijutsu-standard-01
```

