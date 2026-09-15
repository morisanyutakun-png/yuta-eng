#!/usr/bin/env python3
"""「過去問の前に」シリーズ（分野別完成演習・志望校診断模試）の表紙と OG 画像を書き出す。

入力（読むだけ）
  ~/<原稿フォルダ>/*_KDP_B5_cover.pdf   KDP に入稿した表紙（表1＋背＋表4）
  data/series.json                       原稿から起こした構成（npm run data:series）
出力
  public/covers/kansei/<slug>.webp        表紙（620px 幅）
  public/covers/kansei/thumb/<slug>.webp  一覧用（160px 幅）
  public/og/kansei-<slug>.jpg             大学別ページの OG
  public/og/kansei.jpg / shindan.jpg      シリーズ・診断模試ページの OG

表紙は ASIN ではなく slug の名前で書き出す。近日追加予定の巻も先に作っておき、
lib/catalog.ts に ASIN を足すだけで公開できるようにするため
（発売前に表紙を差し替えたときは、このスクリプトを流し直す）。

入稿用 PDF は Amazon の商品画像と同じものであることを 2026-09-15 に目視で確認している。
"""
import importlib.util
import json
import os
import sys
from pathlib import Path

import fitz  # PyMuPDF
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
HOME = Path(os.environ.get("HOME", "/Users/moriyuuta"))

# 書体・色・折り返しは大学別分析の OG（build-og.py）と共通にする
_spec = importlib.util.spec_from_file_location("build_og", ROOT / "scripts" / "build-og.py")
og = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(og)

SERIES = json.loads((ROOT / "data" / "series.json").read_text(encoding="utf-8"))
COVER_DIR = ROOT / "public" / "covers" / "kansei"
THUMB_DIR = COVER_DIR / "thumb"
OG_DIR = ROOT / "public" / "og"

MM = 2.834645
BLEED = 0.125 * 72
TRIM_B5 = 182 * MM

# series-meta.mjs と同じ原稿フォルダ。入稿用の表紙 PDF の名前は巻ごとに違うので glob で探す
DIRS = {
    "todai-rikei": "東大理系数学/東大完成演習",
    "kyodai-rikei": "京大理系数学/京大完成演習",
    "handai-rikei": "大阪大学数学/阪大完成演習",
    "nagoya-rikei": "名大数学/名大完成演習",
    "tohoku-rikei": "東北大学理系数学/東北大完成演習",
    "kyudai-rikei": "九州大理系数学/九大完成演習",
    "hokudai-rikei": "北大理系数学/北大完成演習",
    "kagakudai": "東工大数学/科学大完成演習",
    "shindan": "難関国公立診断模試/診断模試2027",
}


def cover_pdf(slug: str) -> Path | None:
    d = HOME / DIRS[slug]
    pattern = "nankan_shindan_*_KDP_B5_cover.pdf" if slug == "shindan" else "*_kansei_KDP_B5_cover.pdf"
    hits = sorted(p for p in d.glob(pattern) if "alias" not in p.name)
    return hits[0] if hits else None


def front_cover(pdf: Path, width: int) -> Image.Image:
    doc = fitz.open(pdf)
    page = doc[0]
    r = page.rect
    x1 = r.width - BLEED
    clip = fitz.Rect(x1 - TRIM_B5, BLEED, x1, r.height - BLEED)
    zoom = width / clip.width
    pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), clip=clip, alpha=False)
    img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    doc.close()
    return img


def paste_cover(img: Image.Image, cover: Image.Image, cx0: int) -> None:
    ch = int(og.COVER_W * cover.height / cover.width)
    cov = cover.resize((og.COVER_W, ch), Image.LANCZOS)
    cy = (og.H - ch) // 2
    shadow = Image.new("RGB", (og.COVER_W + 10, ch + 10), (236, 233, 226))
    img.paste(shadow, (cx0 - 3, cy + 5))
    img.paste(cov, (cx0, cy))
    ImageDraw.Draw(img).rectangle([cx0, cy, cx0 + og.COVER_W - 1, cy + ch - 1], outline=og.RULE, width=1)


def fit_title(d: ImageDraw.ImageDraw, title: str, max_w: int, sizes=(76, 70, 64, 58, 52, 46)):
    # 「京大理系数学\n分野別完成演習」のように改行を指定したら、その位置で折る
    if "\n" in title:
        parts = title.split("\n")
        for size in sizes:
            f = og.font(og.MINCHO_B, size)
            if all(og.text_w(d, p, f) <= max_w for p in parts):
                return f, parts
        return og.font(og.MINCHO_B, sizes[-1]), parts
    for size in sizes:
        f = og.font(og.MINCHO_B, size)
        lines = og.wrap(d, title, f, max_w)
        if len(lines) == 1 or (len(lines) == 2 and len(lines[-1]) >= 4):
            return f, lines
    f = og.font(og.MINCHO_B, sizes[-1])
    return f, og.wrap(d, title, f, max_w)


def stats_row(d, x, rows):
    base = og.H - 176
    cx = x
    f_label = og.font(og.GOTHIC_R, 22)
    for value, unit, label in rows:
        d.text((cx, base), label, font=f_label, fill=og.INK3)
        f_val = og.font(og.MINCHO_B, 54)
        d.text((cx, base + 30), value, font=f_val, fill=og.INK)
        vw = og.text_w(d, value, f_val)
        f_unit = og.font(og.GOTHIC_R, 22)
        d.text((cx + vw + 6, base + 30 + (f_val.size - 22)), unit, font=f_unit, fill=og.INK3)
        cx += max(vw + og.text_w(d, unit, f_unit) + 62, 150)


def card(eyebrow: str, title: str, sub: str, rows, cover: Image.Image | None) -> Image.Image:
    img = Image.new("RGB", (og.W, og.H), og.PAPER)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, 10, og.H], fill=og.NAVY)
    x = og.PAD
    text_right = og.W - og.PAD - og.COVER_W - 48 if cover else og.W - og.PAD
    d.text((x, 74), eyebrow, font=og.font(og.GOTHIC_M, 26), fill=og.NAVY)
    f_title, lines = fit_title(d, title, text_right - x)
    y = 126
    for ln in lines[:3]:
        d.text((x, y), ln, font=f_title, fill=og.INK)
        y += int(f_title.size * 1.32)
    d.text((x, y + 10), sub, font=og.font(og.GOTHIC_R, 26), fill=og.INK3)
    if rows:
        d.line([(x, og.H - 210), (text_right, og.H - 210)], fill=og.RULE, width=2)
        stats_row(d, x, rows)
    if cover:
        paste_cover(img, cover, og.W - og.PAD - og.COVER_W)
    d.line([(x, og.H - 76), (og.W - og.PAD, og.H - 76)], fill=og.RULE, width=2)
    d.text((x, og.H - 56), "過去問の前にシリーズ", font=og.font(og.GOTHIC_M, 24), fill=og.INK2)
    f_url = og.font(og.GOTHIC_R, 22)
    d.text((og.W - og.PAD - og.text_w(d, "yuta-eng.com", f_url), og.H - 54), "yuta-eng.com", font=f_url, fill=og.INK3)
    return img


def main() -> int:
    COVER_DIR.mkdir(parents=True, exist_ok=True)
    THUMB_DIR.mkdir(parents=True, exist_ok=True)
    save = dict(format="JPEG", quality=88, optimize=True, progressive=True)

    covers: dict[str, Image.Image] = {}
    for slug in DIRS:
        pdf = cover_pdf(slug)
        if not pdf:
            print(f"表紙 PDF が見つかりません: {DIRS[slug]}", file=sys.stderr)
            return 1
        big = front_cover(pdf, 620)
        big.save(COVER_DIR / f"{slug}.webp", "WEBP", quality=82, method=6)
        h = round(160 * big.height / big.width)
        big.resize((160, h), Image.LANCZOS).save(THUMB_DIR / f"{slug}.webp", "WEBP", quality=80, method=6)
        covers[slug] = big
        print(f"表紙: {slug:14s} ← {pdf.relative_to(HOME)}")

    for k in SERIES["kansei"]:
        t = k["total"]
        rows = [(str(t["fields"]), "分野", "頻出分野"), (str(t["problems"]), "題", "収録")]
        if t.get("subquestions"):
            rows.append((str(t["subquestions"]), "問", "小問"))
        years = f"{k['years'][0]}〜{k['years'][1]}年度の出題を分析" if len(k["years"]) == 2 else ""
        img = card(f"{k['university']}・2027年度対策", f"{k['name']}\n分野別完成演習", years, rows, covers[k["slug"]])
        img.save(OG_DIR / f"kansei-{k['slug']}.jpg", **save)

    s = SERIES["shindan"]
    card(
        "旧帝大・難関国公立大 理系数学",
        "志望校診断模試",
        f"{s['rounds']}回の模試で「得点の形」を分析し、{len(s['universities'])}大学との相性を判定",
        [(str(s["rounds"]), "回分", "模試"), (str(s["minutes"]), "分", "1回"), (str(len(s["universities"])), "大学", "判定")],
        covers["shindan"],
    ).save(OG_DIR / "shindan.jpg", **save)

    card(
        "標準問題は終えた。過去問はまだ早い。",
        "大学別 数学 分野別完成演習",
        "志望校の頻出分野を、標準から本番水準まで段階的に",
        # 刊行冊数は ASIN の追加で変わるので、画像には数を焼き込まない
        [],
        covers["todai-rikei"],
    ).save(OG_DIR / "kansei.jpg", **save)

    print(f"OG: 大学別 {len(SERIES['kansei'])} 枚 + シリーズ + 診断模試")
    return 0


if __name__ == "__main__":
    sys.exit(main())
