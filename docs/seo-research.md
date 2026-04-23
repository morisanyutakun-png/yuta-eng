# SEO Research Notes

調査日: 2026-04-23

## 方針

Google Search Central の方針に合わせ、キーワード密度ではなく、読者の検索意図、明確なタイトル、固有のメタ説明、内部リンク、ページ体験を重視する。
検索ボリュームの数値は未導入のため、初期MVPでは「教育ICT」「学習支援Webアプリ」「物理教材」「LaTeX教材作成」の検索意図クラスタを仮説として運用し、Search Console導入後に実クエリで更新する。

## 主要クラスタ

| クラスタ | Primary | Supporting | 対応ページ |
| --- | --- | --- | --- |
| 教育ICT | 学習支援Webアプリ | 教育ICT / 授業支援 / 教材DX / 学習導線 | `/blog` |
| 物理学習 | 物理 教材制作 | 物理学習 / 概念理解 / 問題演習 / 力学 解説 | `/blog/physics-material-creation` |
| LaTeX教材 | LaTeX 教材作成 | LaTeX 問題集 / 数式 組版 / MDX / 教材テンプレート | `/blog/latex-web-workflow` |
| ブランド導線 | 教材制作 Webサイト | 個人ブランドサイト / 教育 ブログ / アプリ紹介ページ | `/about`, `/apps` |

## 実装メモ

- ホームに検索意図クラスタを表示し、主要ページへ内部リンクする。
- ブログ詳細に `searchIntent` と `keyPoints` を表示する。
- Article JSON-LD と Breadcrumb JSON-LD を追加する。
- `/studio` は noindex の運用者用ビルダーとして扱い、sitemap とナビには出さない。

## 参照

- Google Search Central: Creating helpful, reliable, people-first content  
  https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Search Central: SEO Starter Guide  
  https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Search Central: Breadcrumb structured data  
  https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- 文部科学省: 学習者用デジタル教科書について  
  https://www.mext.go.jp/a_menu/shotou/kyoukasho/gaiyou/04060901/1349317.htm
- 文部科学省: ICTの活用の推進  
  https://www.mext.go.jp/b_menu/hakusho/html/hpab201901/detail/1422160.htm
