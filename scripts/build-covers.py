#!/usr/bin/env python3
"""KDP の表紙PDF（表1＋背＋表4の一枚もの）から、表紙だけを切り出して WebP にする。

入力  ~/<原稿フォルダ>/cover.pdf
出力  public/covers/<ASIN>.webp

表紙は右端にある。背幅はページ数で変わるので、
「右の裁ち落としを除いた、判型の幅ぶんだけ右から取る」ことで背幅に依存せず切り出す。
"""
import csv
import os
import sys
from pathlib import Path

import fitz  # PyMuPDF
from PIL import Image

HOME = Path(os.environ.get("HOME", "/Users/moriyuuta"))
PRODUCT_CSV = HOME / "KDP_app/scripts/data/product-list.csv"
OUT_DIR = Path(__file__).resolve().parent.parent / "public" / "covers"

MM = 2.834645  # 1mm = 2.8346pt
BLEED = 0.125 * 72  # KDP の裁ち落とし 0.125in
TRIM = {"B5": 182 * MM, "A5": 148 * MM, "B6": 128 * MM}
OUT_WIDTH = 620  # 表示は最大 310px 想定。Retina 用に 2 倍で書き出す


def front_clip(page: fitz.Page, trim_w: float) -> fitz.Rect:
    r = page.rect
    x1 = r.width - BLEED
    x0 = max(0.0, x1 - trim_w)
    return fitz.Rect(x0, BLEED, x1, r.height - BLEED)


def main() -> int:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    rows = list(csv.DictReader(PRODUCT_CSV.open(encoding="utf-8")))

    made, skipped = 0, []
    for row in rows:
        asin = (row.get("ASIN") or "").strip()
        pdf_rel = (row.get("入稿PDF") or "").strip()
        fmt = (row.get("判型") or "B5").strip()
        if not asin or not pdf_rel:
            continue

        cover = HOME / Path(pdf_rel).parent / "cover.pdf"
        if not cover.exists():
            skipped.append((asin, "cover.pdf なし"))
            continue

        try:
            doc = fitz.open(cover)
            page = doc[0]
            clip = front_clip(page, TRIM.get(fmt, TRIM["B5"]))
            # 目的の横幅になる倍率で描画する
            zoom = OUT_WIDTH / clip.width
            pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), clip=clip, alpha=False)
            img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
            img.save(OUT_DIR / f"{asin}.webp", "WEBP", quality=82, method=6)
            made += 1
            doc.close()
        except Exception as e:  # noqa: BLE001
            skipped.append((asin, str(e)))

    print(f"表紙を書き出し: {made} 件")
    for asin, why in skipped:
        print(f"  skip: {asin} | {why}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
