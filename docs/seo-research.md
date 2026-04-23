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

## 2026-04-23 Home SEO / EdTech Refresh

- ホームの主要検索意図を「高校物理 塾」「教材作成AI 自動」「GIGAスクール 教材作成」「教育DX 学習支援Webアプリ」に拡張する。
- 文部科学省の生成AIガイドライン、デジタル庁の教育DXロードマップ、GIGAスクール後の校務DX/学習環境整備の流れを踏まえ、生成AIやGIGAを流行語ではなく教材・学習導線の文脈に置く。
- 高校生向けには「高校物理 オンライン塾」「物理基礎 定期テスト対策」「力学 苦手克服」を入口にする。
- 教材制作者・先生向けには「教材作成AI 自動」「生成AI 教材作成」「授業プリント AI 作成」「LaTeX 問題集 自動生成」を入口にする。
- EdTech文脈では「教育DX」「GIGAスクール」「AIドリル」「個別最適な学び」「学習支援Webアプリ」を同じテーママップにまとめる。
- ホームに FAQPage と Service のJSON-LDを追加し、画面上のFAQと構造化データを一致させる。
- 共有時の見栄えを補うため、Next.js file-based metadata の `opengraph-image.tsx` と `twitter-image.tsx` を追加する。

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
- 文部科学省: 初等中等教育段階における生成AIの利活用に関するガイドライン
  https://www.mext.go.jp/b_menu/shingi/chousa/shotou/193/toushin/mext_01986.html
- 文部科学省: GIGAスクール構想の下での校務DXチェックリスト
  https://www.mext.go.jp/a_menu/shotou/zyouhou/detail/mext_02597.html
- デジタル庁: 「教育DXロードマップ」を策定しました
  https://www.digital.go.jp/news/511df327-5ba3-456e-a5cd-2ebeddd8c960
