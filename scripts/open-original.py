#!/usr/bin/env python3
"""原典（実物の問題冊子）から、問題が刷られているページだけを画像に起こす。

    python3 scripts/open-original.py <slug> <year>

出力は作業用ディレクトリ（$SCRATCH、既定は /tmp/originals）。
**公開ディレクトリには絶対に書かない。**

なぜ要るか
  問題冊子のスキャンは、白紙・表紙・解答用紙・公式集が多くを占める。
  全ページを見ていくと手間がかかるので、インクの量で中身のあるページを選ぶ。

読んでよいのは data/originals.json に載っているものだけ。
ここを通さずにホームディレクトリの PDF を直接開かない。
"""
import json
import os
import sys
from pathlib import Path

import fitz  # PyMuPDF

ROOT = Path(__file__).resolve().parent.parent
HOME = Path(os.environ.get("HOME", "/Users/moriyuuta"))
OUT = Path(os.environ.get("SCRATCH", "/tmp/originals"))

# このくらいインクが乗っていれば、本文が刷られているページとみなす。
# 表紙・注意事項のページも拾うが、数ページ多く見るだけなので害はない。
INK_MIN = 150


def ink(page: fitz.Page) -> int:
    pix = page.get_pixmap(matrix=fitz.Matrix(1, 1), alpha=False)
    s = pix.samples
    return sum(1 for k in range(0, len(s), 30) if s[k] < 150)


def main() -> int:
    if len(sys.argv) != 3:
        print(__doc__)
        return 2
    slug, year = sys.argv[1], sys.argv[2]
    index = json.loads((ROOT / "data" / "originals.json").read_text(encoding="utf-8"))
    rel = index.get(slug, {}).get(year)
    if not rel:
        print(f"{slug} {year} の原典は data/originals.json にない。npm run data:originals を実行するか、手元にないかのどちらか")
        return 1

    out = OUT / f"{slug}-{year}"
    out.mkdir(parents=True, exist_ok=True)
    for old in out.glob("*.png"):
        old.unlink()

    doc = fitz.open(HOME / rel)
    made = []
    for i in range(doc.page_count):
        page = doc[i]
        if ink(page) < INK_MIN:
            continue
        zoom = 1600 / page.rect.width
        name = f"p{i + 1:02}.png"
        page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False).save(out / name)
        made.append(name)
    doc.close()

    print(f"{rel}（全{len(made)}ページ中、中身のある {len(made)} ページ）")
    print(f"出力: {out}")
    for n in made:
        print(" ", out / n)
    return 0


if __name__ == "__main__":
    sys.exit(main())
