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
- ホームに検索意図別の入口と短い回答を配置し、訪問者が目的別に次ページへ進めるようにする。
- ブログ詳細に `searchIntent` と `keyPoints` を表示する。
- WebSite / Organization / Person / WebPage / ItemList / Article / Breadcrumb JSON-LD を、画面に見える情報と対応する範囲で追加する。
- `/studio` は noindex の運用者用ビルダーとして扱い、sitemap とナビには出さない。

## 2026-04-23 追加メモ

- GoogleのHelpful Content方針では、検索順位操作ではなく人に役立つ情報、明確な専門性、信頼できるサイト情報、満足できるページ体験が重要。
- SEO Starter Guideでは、読みやすく整理された本文、独自性、更新性、読者が使う検索語の想定、適切なリンクテキスト、明確なタイトルが重視されている。
- 構造化データは、Googleにページの意味を明示する補助として使う。ただし、画面上にない情報をJSON-LDだけに入れない。
- Canvaのテンプレート検索はEnterprise権限が必要だったため、具体テンプレートの転用ではなく、Canva的なカード整理・大きな余白・編集ボード感をデザイン原則としてサイトに反映する。

## 2026-04-23 Favicon / Metadata

- Google Searchのfaviconガイドラインに合わせ、48px以上で視認しやすい正方形SVGを安定URL `/favicon.svg` として設定する。
- title / description / H1 はページごとに固有化し、物理教材、LaTeX教材作成、教育ICT、学習支援Webアプリ開発の軸が自然に伝わる文言にする。
- meta keywords はGoogle検索順位の主要要因として期待せず、運用上の検索意図整理として設定する。本文・見出し・内部リンク・構造化データとの整合性を優先する。

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
