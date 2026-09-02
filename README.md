# 大学別 数学入試分析（yuta-eng.com）

国公立・私立 52 大学の数学入試について、出題形式・年度別の出題一覧・分野別の頻度をまとめた静的サイト。
各ページから、対応する予想問題集「合格答案をつくる」シリーズ（Amazon）へ導線を置いている。

## 構成

| パス | 内容 |
| --- | --- |
| `/` | 区分別の大学一覧 |
| `/universities` | 全 52 大学の一覧（要約つき） |
| `/univ/[slug]` | 大学ごとの出題分析。主要な SEO 対象 |

全ページ `generateStaticParams` による静的生成（59 ページ）。
クライアント JS は大学の絞り込み（`components/university-finder.tsx`）だけで、分析本文は送っていない。

## データの作り方

サイトの本文は、ホームディレクトリにある各予想問題集の原稿（LaTeX）の
「はじめに」＝出題分析セクションから機械的に起こしている。手書きの本文は持たない。

```
npm run data          # 分析データ（data/analysis.json）
python3 scripts/build-covers.py   # 表紙画像（public/covers/*.webp）
```

表紙は各原稿の `cover.pdf`（表1＋背＋表4の一枚もの）から、
表紙の部分だけを切り出して WebP にしている。背幅はページ数で変わるので、
「右の裁ち落としを除いて判型の幅ぶんを右から取る」ことで背幅に依存せず切り出す。
PyMuPDF と Pillow が必要（`pip install pymupdf pillow`）。

- 入力
  - `~/KDP_app/scripts/data/product-list.csv` … 書名・ASIN・価格・原稿PDFのパス
  - `~/<原稿フォルダ>/front.tex` … 各巻の「はじめに」
- 対応づけ … `scripts/university-meta.mjs`（原稿フォルダ → slug・大学名・区分）
- 出力 … `data/analysis.json`（リポジトリにコミットする）

原稿はリポジトリの外にあるため、`data/analysis.json` は**生成物をコミットしておく**。
Vercel 上のビルドでは再生成されない。原稿を直したら手元で `npm run data` を実行して
差分をコミットすること。

### 抽出時にしていること

- LaTeX のインライン（`\textbf` `\underLine` `$…$` ほか）を span 配列へ
- `tabular` / `longtable` を表に、`enumerate` / `itemize` を箇条書きに
- 「本書では〜」など**書籍の中身に触れる文・行・列は落とす**（サイトでは意味をなさないため）。
  括弧書きだけを外して周りの分析文は残すよう、文字単位で判定している
- 全角カンマ・ピリオド（，．）を読点・句点に直し、LaTeX の改行由来の空白を詰める
- 試験時間・大問数・解答形式・配点を導入文から拾って `facts` に、
  分野別頻度の表を棒グラフ用の `fieldChart` に、目標点の一文を `goal` に
- 数式は `lib/render.tsx` でビルド時に KaTeX で HTML 化（クライアント JS を増やさない）

複数巻ある大学は、分析がいちばん充実している巻を代表として本文に使い、
CTA には全巻を並べる。

## 開発

```
npm run dev
npm run build
npm run lint
```

## 注意

- 出題形式・分野構成の分析であり、問題文は転載していない。
- 各大学とは無関係の非公式サイト。
