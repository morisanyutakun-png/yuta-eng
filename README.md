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
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX   # 任意

# 申し込み・決済（Stripe）
STRIPE_SECRET_KEY=sk_live_xxx           # API キー（シークレット）
STRIPE_WEBHOOK_SECRET=whsec_xxx         # Webhook 署名シークレット
# NOBIT_REGISTER_WEBHOOK_URL=...         # 支払い完了データの連携先（管理システム）
# NOBIT_REGISTER_SECRET=...              # 連携先への共有シークレット
```

## 申し込み・決済の流れ（Stripe）

`/apply` で科目を選ぶと料金（`lib/pricing.ts`）が自動計算され、
`POST /api/checkout` が **Stripe Checkout（サブスク・初月半額クーポン）** を作成、
決済画面へリダイレクトします。申込科目・教科数は metadata に載せて Stripe へ。

支払い完了は `POST /api/stripe/webhook`（`checkout.session.completed`）で受け取り、
生徒の登録情報＋申込科目を `NOBIT_REGISTER_WEBHOOK_URL`（ノビットスタディ管理
システムの受け口）へ POST します（未設定ならログ出力のみ）。

Stripe ダッシュボードでの準備：
1. APIキー（シークレット）を `STRIPE_SECRET_KEY` に設定。
2. Webhook で `https://yuta-eng.com/api/stripe/webhook` を登録し、イベント
   `checkout.session.completed` を購読。表示の `whsec_...` を `STRIPE_WEBHOOK_SECRET` に。
3. 初月半額クーポン（id: `nobit-first-month-50` / 50%off・1回）は初回決済時に
   自動作成されます（手動作成も可）。
4. 料金・科目を変えるときは `lib/pricing.ts` の `SUBJECTS` と `monthlyTotal()` を編集。

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
