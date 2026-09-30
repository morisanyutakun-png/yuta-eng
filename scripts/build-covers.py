#!/usr/bin/env python3
"""KDP の表紙PDF（表1＋背＋表4の一枚もの）から、表紙だけを切り出して WebP にする。

入力  data/books.json（販売中の本）と data/manuscripts.json（巻 → 原稿ディレクトリ）
出力  public/covers/<ASIN>.webp

どの巻の原稿かは data/manuscripts.json を見る（npm run data で書き出される）。
どのフォルダにも雛形として名大の巻がコピーされているので、
巻の対応づけは原稿の見出しで持ち主を確かめた結果を使う。

表紙の PDF は KDP に入稿した `*_KDP_B5_cover.pdf` を優先する。
cover.pdf は組版の途中のものが残っていることがあり、販売中の表紙と違う場合がある。

表紙は右端にある。背幅はページ数で変わるので、
「右の裁ち落としを除いた、判型の幅ぶんだけ右から取る」ことで背幅に依存せず切り出す。
"""
import json
import os
import re
import sys
from pathlib import Path

import fitz  # PyMuPDF
from PIL import Image

HOME = Path(os.environ.get("HOME", "/Users/moriyuuta"))
ROOT = Path(__file__).resolve().parent.parent
BOOKS = json.loads((ROOT / "data" / "books.json").read_text(encoding="utf-8"))
MANUSCRIPTS = json.loads((ROOT / "data" / "manuscripts.json").read_text(encoding="utf-8"))
OUT_DIR = ROOT / "public" / "covers"

MM = 2.834645  # 1mm = 2.8346pt
BLEED = 0.125 * 72  # KDP の裁ち落とし 0.125in
TRIM = {"B5": 182 * MM, "A5": 148 * MM, "B6": 128 * MM}
OUT_WIDTH = 620  # 表示は最大 310px 想定。Retina 用に 2 倍で書き出す


def cover_pdf(d: Path, vol: int) -> Path | None:
    """その巻の表紙 PDF。入稿した KDP 用のものを優先する。"""
    kdp = sorted(d.glob("*_KDP_B5_cover.pdf"))
    kdp = [p for p in kdp if "alias" not in p.name]
    if kdp:
        # 「vol3」のように巻の入った名前があればそれを、第1巻は巻名の入らないものを選ぶ
        tagged = [p for p in kdp if re.search(rf"vol\s*{vol}\b", p.name, re.I)]
        plain = [p for p in kdp if not re.search(r"vol\s*\d", p.name, re.I)]
        if tagged:
            return tagged[0]
        if vol == 1 and plain:
            return plain[0]
        return max(kdp, key=lambda p: p.stat().st_mtime)
    fallback = d / "cover.pdf"
    return fallback if fallback.exists() else None


def front_clip(page: fitz.Page, trim_w: float) -> fitz.Rect:
    r = page.rect
    x1 = r.width - BLEED
    x0 = max(0.0, x1 - trim_w)
    return fitz.Rect(x0, BLEED, x1, r.height - BLEED)


def main() -> int:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    made, skipped = 0, []
    for book in BOOKS.values():
        if book["series"] != "gokaku":
            continue  # 「過去問の前に」は build-series-assets.py が書き出す
        volumes = MANUSCRIPTS.get(book["slug"], {}).get("volumes", {})
        rel = volumes.get(str(book["vol"]))
        cover = cover_pdf(HOME / rel, book["vol"]) if rel else None
        if not cover:
            skipped.append((book["asin"], f"{book['title']} の cover.pdf が見つからない"))
            continue
        try:
            doc = fitz.open(cover)
            page = doc[0]
            # 判型は B5（既刊はすべて B5 判）
            clip = front_clip(page, TRIM["B5"])
            zoom = OUT_WIDTH / clip.width
            pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), clip=clip, alpha=False)
            Image.frombytes("RGB", (pix.width, pix.height), pix.samples).save(
                OUT_DIR / f"{book['asin']}.webp", "WEBP", quality=82, method=6
            )
            made += 1
            doc.close()
        except Exception as e:  # noqa: BLE001
            skipped.append((book["asin"], str(e)))

    print(f"表紙を書き出し: {made} 件")
    for asin, why in skipped:
        print(f"  skip: {asin} | {why}")
    return 1 if skipped else 0


if __name__ == "__main__":
    sys.exit(main())
