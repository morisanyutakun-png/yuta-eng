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

# ページを採るかどうかの基準。
#
# 問題冊子は「計算用紙」「下書き用紙」が半分近くを占める。それらは紙の中ほどに
# 一行あるだけで、ページ全体のインク量では本物の問題ページと区別がつかない
# （問題文が3行しかない大問は、余白だらけで白紙に近い）。
# 一方、問題ページは必ず**上の方から**文字が始まるので、上部だけ見ると分かれる。
#
#   HEAD_MIN … 上から3割の範囲にこれだけインクがあれば、問題ページとみなす
#   BODY_MIN … 表紙・注意事項など、上が空いていても中身のあるページを拾う保険
#
# どちらも低めに置き、捨てたページは必ず一覧に出す。黙って落とすと、
# 大問を1つ見落としたことに気づけない（旧版は名市大医2026 で第1・3・4問を落としていた）。
HEAD_MIN = 20
BODY_MIN = 150


def _dark(page: fitz.Page, box: fitz.Rect) -> int:
    pix = page.get_pixmap(matrix=fitz.Matrix(1, 1), clip=box, alpha=False)
    s = pix.samples
    return sum(1 for k in range(0, len(s), 30) if s[k] < 150)


def ink(page: fitz.Page) -> tuple[int, int]:
    """(上から3割のインク量, 本文全体のインク量) を返す。

    左右・上下の余白は落とす。全面で測るとスキャンの端に写り込む黒い線を拾い、
    白紙がインク 140 ほどに化けて「中身あり」と誤判定されるため。
    """
    r = page.rect
    x0, x1 = r.x0 + r.width * 0.10, r.x1 - r.width * 0.10
    y0, y1 = r.y0 + r.height * 0.06, r.y1 - r.height * 0.06
    head = _dark(page, fitz.Rect(x0, y0, x1, r.y0 + r.height * 0.35))
    body = _dark(page, fitz.Rect(x0, y0, x1, y1))
    return head, body


def main() -> int:
    if len(sys.argv) != 3:
        print(__doc__)
        return 2
    slug, year = sys.argv[1], sys.argv[2]
    index = json.loads((ROOT / "data" / "originals.json").read_text(encoding="utf-8"))
    rels = index.get(slug, {}).get(year)
    if not rels:
        print(f"{slug} {year} の原典は data/originals.json にない。npm run data:originals を実行するか、手元にないかのどちらか")
        return 1
    # 1年度に複数の冊子があることがある（学部別・試験日別）。全部出す。
    if isinstance(rels, str):
        rels = [rels]
    if len(rels) > 1:
        print(f"{slug} {year} には冊子が {len(rels)} 冊ある（どれも別の試験）。すべて出す。\n")
    for rel in rels:
        render(slug, year, rel, len(rels) > 1)
    return 0


def render(slug: str, year: str, rel: str, many: bool) -> None:
    out = OUT / (f"{slug}-{year}-{Path(rel).stem}" if many else f"{slug}-{year}")
    out.mkdir(parents=True, exist_ok=True)
    for stale in out.glob("*.png"):
        stale.unlink()

    doc = fitz.open(HOME / rel)
    total = doc.page_count
    made, skipped = [], []
    for i in range(total):
        page = doc[i]
        head, body = ink(page)
        if head < HEAD_MIN and body < BODY_MIN:
            skipped.append((i + 1, head, body))
            continue
        zoom = 1600 / page.rect.width
        name = f"p{i + 1:02}.png"
        page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False).save(out / name)
        made.append((name, head, body))
    doc.close()

    print(f"{rel}（全{total}ページ中、中身のある {len(made)} ページ）")
    print(f"出力: {out}")
    for n, head, body in made:
        print(f"  {out / n}  (上部 {head} / 全体 {body})")
    # 捨てたページも必ず見せる。黙って落とすと、問題を1つ見落としたことに気づけない。
    if skipped:
        print(f"計算用紙・白紙とみなして除外（上部 {HEAD_MIN} 未満かつ全体 {BODY_MIN} 未満）: "
              + "、".join(f"p{i:02}({h}/{b})" for i, h, b in skipped))
    print()


if __name__ == "__main__":
    sys.exit(main())
