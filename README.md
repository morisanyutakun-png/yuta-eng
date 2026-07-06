# ノビットスタディ 中高部 (yuta-eng.com)

高校物理・数学・英語を中心に、**毎日演習・毎日添削**で「考える力」を育てるオンライン
添削塾「ノビットスタディ 中高部」の公式サイトです。面談や授業は行わず、塾長オリジナル
教材と学習管理で、自分のペースの自立学習と記述答案力を支えるサービスを訴求する
ランディングページ構成になっています。

## ディレクトリ構成

```txt
app/
  about/          塾長・塾の考え方
  contact/        無料体験・相談（メール導線）
  globals.css
  layout.tsx
  not-found.tsx
  page.tsx        トップ（LP：FV→悩み→特徴→流れ→教材→料金→FAQ→CTA）
  opengraph-image.tsx
  icon.svg / favicon.ico
  robots.ts
  sitemap.ts
components/
  button-link.tsx
  container.tsx
  google-analytics-loader.tsx
  json-ld.tsx
  mobile-menu.tsx
  site-footer.tsx
  site-header.tsx
data/
  home.ts         トップの FAQ
  site.ts         ブランド・ナビ・キーワード・KDP リンク
lib/
  metadata.ts
  og-version.ts   favicon/OG のデプロイ別バージョンスタンプ
  structured-data.ts  JSON-LD（EducationalOrganization / Service / FAQ など）
  utils.ts
public/
  brand/          公式ロゴ・マスコット「ノビットくん」・各種 SVG マーク
  denjikigaku-*   KDP『考える力を育てる高校物理』表紙
scripts/          ビルド時の画像・favicon・critical CSS 生成
```

## 環境変数

サイト表示だけなら必須の環境変数はありません（未設定でも既定値でビルド可）。
**申し込み・決済（Stripe）を有効化する場合は `.env.example` を参照**して
`.env.local`／Vercel に設定してください。

```bash
NEXT_PUBLIC_SITE_URL=https://yuta-eng.com
NEXT_PUBLIC_CONTACT_EMAIL=contact@yuta-eng.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX   # GA4（既定: G-W11S94CV6L）
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX      # Google Ads ベースタグ（既定: AW-17966887751）
GA4_API_SECRET=xxxxxxxx                      # Stripe webhook → GA4 purchase 用
# GA4_AD_USER_DATA_CONSENT=GRANTED           # 任意: Measurement Protocol consent
# GA4_AD_PERSONALIZATION_CONSENT=GRANTED     # 任意: non_personalized_ads ではなく consent.ad_personalization を使う
# GA4_DEBUG_MODE=1                           # 任意: webhook purchase をGA4 DebugViewで確認したい時だけ
# NEXT_PUBLIC_GA_DEBUG_MODE=1                # 任意: ブラウザ発火イベントをDebugViewで確認したい時だけ
# NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_SEND_TO=AW-XXXXXXXXXX/label  # 任意: 直接Ads conversionを使う場合

# 申し込み・決済（Stripe）
STRIPE_SECRET_KEY=sk_live_xxx           # API キー（シークレット）
STRIPE_WEBHOOK_SECRET=whsec_xxx         # Webhook 署名シークレット
NOBIT_APP_URL=...                       # ノビットスタディ アプリ URL（決済後の戻り先 /setup）
NOBIT_REGISTER_WEBHOOK_URL=...          # 支払い完了データの連携先（アプリの provision）
NOBIT_REGISTER_SECRET=...               # 連携の共有シークレット（送信ヘッダ／照会APIの認証）
# NOBIT_APP_VERCEL_BYPASS_SECRET=...     # アプリ側Vercel保護をWebhookだけ通す場合
```

## 申し込み・決済の流れ（Stripe）

`/apply` で科目を選ぶと料金（`lib/pricing.ts`）が自動計算され、
`POST /api/checkout` が **Stripe Checkout（教材の買い切り決済）** を作成、
決済画面へリダイレクトします。申込科目・教科数は metadata に載せて Stripe へ。

支払い完了は `POST /api/stripe/webhook`（`checkout.session.completed`）で受け取り、
生徒の登録情報＋申込科目を `NOBIT_REGISTER_WEBHOOK_URL`（ノビットスタディ管理
システムの受け口）へ POST します。連携に失敗した場合は Stripe に失敗レスポンスを返し、
Stripe の再試行に任せます。

### ノビットスタディ アプリとの連携（アカウント発行）

アカウントの発行・認証は **アプリ側（Neon + Vercel）が所有**し、yuta-eng は
「決済の事実」を渡す側に徹する（疎結合）。導線は2系統：

1. **画面でその場設定**：`NOBIT_APP_URL` を設定すると、決済成功の戻り先が
   `{NOBIT_APP_URL}/setup?session_id=...` になる。アプリの `/setup` は
   この `session_id` を yuta-eng の照会 API に問い合わせて申込内容を取得する：

   ```
   GET https://yuta-eng.com/api/provision/session?session_id=cs_...
   ヘッダ: x-nobit-secret: <NOBIT_REGISTER_SECRET と同じ値>
   → { paid, email, name, phone, studentName, grade,
       subjects, subjectLabels, subjectCount, amount, monthlyAmount,
       stripeCustomerId, stripePaymentIntentId, stripeSubscriptionId, stripeSessionId }
   ```

   アプリはこの情報で `students` / `subscriptions` に発行情報を保存し、
   ログインID＋PINでそのままログインできる状態にする。`paid:false`（未払い）の
   session_id は 402 を返す。

2. **メールでの設定リンク（保険）**：`NOBIT_REGISTER_WEBHOOK_URL` を設定すると、
   Webhook が同じ正規化データ（`lib/registration.ts`）を `x-nobit-secret` 付きで
   POST する。アプリは「仮登録＋設定用トークン発行＋設定メール送信」を行う。
   ユーザーがタブを閉じても確実にログインできる導線になり、ログも残る。
   Webhook 連携が失敗した場合は Stripe に失敗レスポンスを返し、Stripe の再試行に
   任せる。既に登録済みを表す `409` は成功扱い。
   Vercel Deployment Protection がアプリ側に有効な場合、Webhook は
   `NOBIT_APP_VERCEL_BYPASS_SECRET` を設定して `x-vercel-protection-bypass`
   ヘッダで通す。ただし購入者が開く `/setup` はヘッダを付けられないため、
   本番アプリURLは公開ドメインにするか、Production の保護を外す。

   既存の決済を再連携する場合：

   ```bash
   curl -X POST "https://yuta-eng.com/api/provision/replay?session_id=cs_..." \
     -H "x-nobit-secret: <NOBIT_REGISTER_SECRET と同じ値>"
   ```

`/setup` 照会 API と Webhook は **同じ `lib/registration.ts` の出力形** を返すので、
アプリ側は片方の受け口だけ作れば両系統に対応できる。`NOBIT_REGISTER_SECRET` は
本番では必ず長いランダム文字列を設定すること（照会 API の認証に使う）。

Stripe ダッシュボードでの準備：
1. APIキー（シークレット）を `STRIPE_SECRET_KEY` に設定。
2. Webhook で `https://yuta-eng.com/api/stripe/webhook` を登録し、イベント
   `checkout.session.completed` を購読。表示の `whsec_...` を `STRIPE_WEBHOOK_SECRET` に。
3. 料金・科目を変えるときは `lib/pricing.ts` の `SUBJECTS` と `buyoutTotal()` を編集。

## GA4 / Google Ads イベント

Googleタグは全ページに読み込み、`send_page_view: false` で自動 page_view を止めたうえで
`PageViewEventTracker` が標準 `page_view` を手動送信します。トップLPでは追加で
`lp_page_view` を1回送信します。

購入イベントは2段構えです。

1. `POST /api/checkout` 時に、ブラウザの `_ga` Cookie から `ga_client_id` を取り出し、
   Stripe Checkout Session の metadata に保存します。Cookie が取れない場合でも、
   webhook 側で Stripe Session ID からフォールバック client_id を作り、purchase 自体は送信します。
2. `POST /api/stripe/webhook` の `checkout.session.completed` 後、アプリへの登録連携が
   成功したら GA4 Measurement Protocol で `purchase` を送信します。

`NOBIT_APP_URL` を設定している場合も、決済後はいったん
`yuta-eng.com/apply/complete?session_id=...&setup=1` へ戻します。この完了ページで
ブラウザの `purchase` を発火し、その後 `nobit-study.yuta-eng.com/setup` へ自動遷移します。
Webhook 側からも同じ `transaction_id` でバックアップ送信します。
GA4の重複対策として `transaction_id` には Stripe Checkout Session ID を使います。

`non_personalized_ads` は使いません。広告同意を明示したい場合は
`GA4_AD_PERSONALIZATION_CONSENT=GRANTED` または `DENIED` を設定し、
Measurement Protocol の `consent.ad_personalization` として送ります。
DebugView で確認したい時だけ `GA4_DEBUG_MODE=1` / `NEXT_PUBLIC_GA_DEBUG_MODE=1`
を設定します。通常運用では未設定のままで構いません。

既存決済を再送したい場合は `/api/provision/replay` を使います。レスポンスの `ga4` が
`ok: true` なら送信済み、`skipped: "missing_api_secret"` なら Vercel Production の
`GA4_API_SECRET` が未設定です。

Google Ads側は、GA4とGoogle Adsをリンクし、GA4の `purchase` をキーイベント/コンバージョン
としてインポートする運用が基本です。Google Adsのイベントスニペットを直接使う場合だけ、
Google Ads管理画面で発行される `AW-.../conversion_label` を
`NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_SEND_TO` に設定してください。

`NEXT_PUBLIC_SITE_URL` は metadata・canonical・sitemap・robots・JSON-LD の URL 生成に、
`NEXT_PUBLIC_CONTACT_EMAIL` は Contact ページのメール導線に使います。

## セットアップ / ローカル起動

```bash
npm install
npm run dev      # http://localhost:3000
```

## 品質チェック / ビルド

```bash
npm run lint
npm run build
```

`npm run build` は次を順に実行します（`package.json` の build スクリプト）。

1. `scripts/stamp-og-version.mjs` — デプロイ別バージョンスタンプ
2. `scripts/render-favicon-ico.mjs` — `public/favicon.svg` → `app/favicon.ico`
3. `scripts/convert-brand-images.mjs` — ロゴ・マスコットの AVIF/WebP 変換
4. `scripts/convert-book-cover.mjs` — 教材カバーの AVIF/WebP 変換
5. `next build`
6. `scripts/inline-critical-css.mjs` — above-the-fold CSS のインライン化

## ブランド画像の差し替え

`public/brand/` 配下が正本です。

- ロゴ: `nobit-logo.png`（余白トリミング済みの正本）
- マスコット: `nobit-kun-wave.png` / `nobit-kun-point.png`

これらの PNG を置き替えて `npm run build`（または
`node scripts/convert-brand-images.mjs`）を実行すると、AVIF/WebP の各サイズが
再生成され、ヘッダー・フッター・トップに反映されます。

KDP 教材への導線 URL は `data/site.ts` の `kdpAmazonUrl` で一元管理しています。

## デプロイ（Vercel）

1. リポジトリを push し、Vercel の New Project で選択。
2. Framework Preset は Next.js、Build Command は `npm run build`。
3. Production Domain に `yuta-eng.com` を設定。

```bash
npx vercel
npx vercel --prod
```
