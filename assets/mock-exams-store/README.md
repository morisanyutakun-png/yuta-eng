# 模試演習ストア PDF 原稿・組版（`assets/mock-exams-store/`）

既刊「合格答案をつくる」シリーズ（`~/三重大全学数学/三重大数学/` 等）の組版・意匠を継承した、
模試演習ストア（`/mock-exams`）用の LuaLaTeX テンプレートと組版パイプラインです。

## 構成

- `tex/store-preamble.tex`
  - リポジトリ単体で組版できる共通プリアンブル（A4・白黒印刷・明朝＋TeX Gyre Termes）。
  - 表紙（`\storecover`）、問題紙（`monsheet` / `daimon` / `shomon`）、所定解答用紙（`\answersheet`）、解答・解説（`\hdA` / `\Q` / `\Ans` / `betsu`）、採点基準（`\Rh` / `\Seikai` / `saiten` / `\Sp` / `\Sm`）を提供。
- `example/kijutsu-standard-01/`
  - 「全統記述レベル 実戦模試 数学 標準編 第1回」の**見本版（大問1のみ収録）**の TeX 原稿。
  - 紙面見本画像（`public/samples/mock-exams/kijutsu-standard-01/*.webp`）およびローカル動作確認用の PDF を生成するために収録しています。

## 製品版（有料）原稿の置き場所とビルド方法

このリポジトリは公開リポジトリのため、**有料の製品版（全大問収録）の TeX 原稿および生成 PDF はリポジトリ内（特に `public/`）に置かないでください。**

1. リポジトリ外の `~/模試演習ストア/<exam-id>/` に以下の5ファイルを置きます:
   - `meta.tex`（`\ExamSampleBadge` は空 `{}` にする）
   - `problems.tex`
   - `answer-sheets.tex`
   - `solutions.tex`
   - `rubric.tex`
2. 次のコマンドで 4 つの印刷用 A4 PDF（`problems.pdf`, `answer-sheets.pdf`, `solutions.pdf`, `rubric.pdf`）と `manifest.json` を `~/模試演習ストア/_dist/<exam-id>/` に出力します:
   ```sh
   python3 scripts/build-mock-exam-pdf.py <exam-id>
   ```
3. 見本版（`assets/mock-exams-store/example/<exam-id>`）から紙面見本 WebP を更新する場合は:
   ```sh
   python3 scripts/build-mock-exam-pdf.py kijutsu-standard-01 --example --previews --out /tmp/store-dist/kijutsu-standard-01
   ```

