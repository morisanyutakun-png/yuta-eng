"""模試の見本を、書籍と同じ組版で PDF にし、試し読みと同じ形で載せられるようにする。

`npm run moshi:sample` で実行する。作るもの:
  assets/moshi-sample/moshi-sample.pdf   組んだ見本（控え。配信はしない）
  public/samples/moshi/p1.webp …         1ページずつの画像
  public/samples/moshi/moshi-sample.pdf  配信する PDF
  data/moshi-sample.json                 ページの見出しと寸法

組版は「合格答案をつくる」シリーズのプリアンブルをそのまま使う。
同じ体裁で見せたいので真似を書き起こさず、原稿側のものを **読むだけ** にしてある
（原稿ディレクトリには何も書き込まない。出力はすべて作業用ディレクトリへ）。

原稿が手元にない機械では組めない。そのときは分かる形で止め、
すでに作ってある画像と PDF（リポジトリに入っている）をそのまま使う。
"""
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

import fitz
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
HOME = Path(os.environ.get("HOME", "/Users/moriyuuta"))
SRC = ROOT / "assets" / "moshi-sample" / "moshi-sample.tex"
OUT_DIR = ROOT / "public" / "samples" / "moshi"
DATA = ROOT / "data" / "moshi-sample.json"

LUALATEX = "/Library/TeX/texbin/lualatex"
IMG_WIDTH = 1100  # 拡大表示でも数式が読める幅
IMG_QUALITY = 75

# ページの見出し。組み上がりが変わったら、ここも直す。
# 想定と実際のページ数が食い違ったら止める（黙ってずれた見出しを付けない）。
LABELS = [
    ("扉", "扉"),
    ("問題", "問題"),
    ("解答・解説", "解答"),
    ("解答・解説（続き）", "解答"),
    ("採点基準", "採点"),
    ("採点基準（続き）", "採点"),
]


def manuscript_dir() -> Path:
    """プリアンブルのある原稿ディレクトリ。data/manuscripts.json から引く。"""
    reg = json.loads((ROOT / "data" / "manuscripts.json").read_text(encoding="utf-8"))
    rel = reg.get("mie", {}).get("volumes", {}).get("1")
    if not rel:
        sys.exit("data/manuscripts.json に三重大 vol.1 の場所がない")
    d = HOME / rel
    if not (d / "preamble.tex").exists():
        sys.exit(f"プリアンブルが見つからない: {d / 'preamble.tex'}")
    return d


def build_pdf() -> Path:
    """見本を組む。出力は作業用ディレクトリに置き、原稿側には何も書かない。"""
    if not Path(LUALATEX).exists():
        sys.exit(f"lualatex が無い: {LUALATEX}")
    man = manuscript_dir()

    work = Path(tempfile.mkdtemp(prefix="moshi-sample-"))
    # ファイル名は原稿側と重ねない。TEXINPUTS の探索順で原稿の main.tex を
    # 拾ってしまい、本ごと組み上がったことがある。
    shutil.copy(SRC, work / SRC.name)
    env = {**os.environ, "TEXINPUTS": f".:{man}:"}

    # LastPage の参照を解くため2回通す
    for i in range(2):
        r = subprocess.run(
            [LUALATEX, "-interaction=nonstopmode", "-halt-on-error", f"./{SRC.name}"],
            cwd=work, env=env, capture_output=True, text=True,
        )
        if r.returncode != 0:
            tail = "\n".join(l for l in r.stdout.splitlines() if l.startswith("!"))[:800]
            sys.exit(f"組版に失敗した（{i + 1}回目）\n{tail}")

    pdf = work / SRC.with_suffix(".pdf").name
    keep = SRC.with_suffix(".pdf")
    shutil.copy(pdf, keep)
    print(f"組んだ  {keep.relative_to(ROOT)}")
    return keep


def render(pdf: Path) -> list[dict]:
    doc = fitz.open(pdf)
    if doc.page_count != len(LABELS):
        sys.exit(
            f"ページ数が {doc.page_count} で、見出しの数 {len(LABELS)} と合わない。"
            "組み上がりが変わったので LABELS を直すこと"
        )

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for old in OUT_DIR.glob("*"):
        old.unlink()

    pages = []
    for i, page in enumerate(doc):
        zoom = IMG_WIDTH / page.rect.width
        pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False)
        img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
        name = f"p{i + 1}.webp"
        img.save(OUT_DIR / name, "WEBP", quality=IMG_QUALITY, method=6)
        label, kind = LABELS[i]
        pages.append(
            {
                "file": f"/samples/moshi/{name}",
                "label": label,
                "kind": kind,
                "page": i + 1,
                "width": pix.width,
                "height": pix.height,
            }
        )

    shutil.copy(pdf, OUT_DIR / "moshi-sample.pdf")
    return pages


def main() -> None:
    pdf = build_pdf()
    pages = render(pdf)
    DATA.write_text(
        json.dumps(
            {"pdf": "/samples/moshi/moshi-sample.pdf", "pages": pages},
            ensure_ascii=False,
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    size = sum(f.stat().st_size for f in OUT_DIR.iterdir())
    print(f"書き出し {len(pages)}ページ / {size / 1024:.0f}KB  → {OUT_DIR.relative_to(ROOT)}")
    print(f"        {DATA.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
