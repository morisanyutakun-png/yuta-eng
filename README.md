# yuta-eng.com

`yuta-eng.com` のブランドサイト / 情報サイト / ブログ基盤です。教育、物理、教材制作、LaTeX、学習支援Webアプリ開発の専門性を伝えつつ、既存アプリへの公式導線と自サイトブログを運用できる構成にしています。

## ディレクトリ構成

```txt
app/
  about/
  apps/
  blog/
    [slug]/
  contact/
  globals.css
  layout.tsx
  not-found.tsx
  page.tsx
  robots.ts
  sitemap.ts
components/
  app-card.tsx
  article-card.tsx
  button-link.tsx
  container.tsx
  mdx-components.tsx
  section.tsx
  site-footer.tsx
  site-header.tsx
content/
  blog/
    *.mdx
data/
  apps.ts
  focus-areas.ts
  site.ts
lib/
  blog.ts
  metadata.ts
  utils.ts
public/
```

## セットアップ

```bash
npm install
```

## ローカル起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

## 品質チェック

```bash
npm run lint
npm run build
```

## Vercel デプロイ

1. このリポジトリを GitHub などに push します。
2. Vercel で New Project からリポジトリを選択します。
3. Framework Preset は Next.js のままで問題ありません。
4. Build Command は `npm run build`、Install Command は `npm install` を使います。
5. Production Domain に `yuta-eng.com` を設定します。

Vercel CLI を使う場合:

```bash
npx vercel
npx vercel --prod
```

## ブログ記事追加手順

`content/blog` に `.mdx` または `.md` ファイルを追加します。frontmatter は以下の形式です。

```mdx
---
title: "記事タイトル"
description: "記事説明"
date: "2026-04-23"
tags:
  - Education
  - Physics
category: "Education"
slug: "example-slug"
draft: false
coverImage: "/optional-image.jpg"
---

## 見出し

本文を書きます。
```

`draft: true` の記事は一覧、詳細、sitemap に表示されません。記事は `date` の新しい順に並びます。

## アプリ追加手順

`data/apps.ts` の `apps` 配列へ、同じ形式で項目を追加します。

```ts
{
  name: "New App",
  description: "既存アプリの説明",
  audience: "想定ユーザー",
  category: "Category",
  href: "https://example.yuta-eng.com",
  ctaLabel: "New App を開く",
  status: "外部の既存アプリ",
}
```

このサイトではアプリ本体を再実装せず、紹介カードと外部リンクだけを扱います。

## 今後の拡張案

- `content/blog` にカテゴリ別一覧やタグページを追加する
- `data/site.ts` にSNS、GitHub、外部フォームのリンクを追加する
- About ページに出版実績、制作実績、開発実績を追加する
- Contact ページを Server Action や外部フォームに接続する
- 記事末尾に関連記事、アプリCTA、ニュースレター導線を追加する
- `public/og.png` を追加して Open Graph 画像を設定する
