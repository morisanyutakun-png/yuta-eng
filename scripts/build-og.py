#!/usr/bin/env python3
"""大学ページの OG 画像（1200×630）と、一覧用のサムネイルを書き出す。

出力
  public/og/<slug>.jpg        SNS・検索結果に出るカード
  public/covers/thumb/<ASIN>.webp  一覧に並べる小さい表紙

本文の書体は原稿の組版と同じ Harano Aji（源ノ明朝／源ノ角ゴシック系）を使う。
表紙と字面が揃うので、並べたときに一続きの制作物に見える。
"""
import json
import os
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
DATA = json.loads((ROOT / "data" / "analysis.json").read_text(encoding="utf-8"))
OG_DIR = ROOT / "public" / "og"
THUMB_DIR = ROOT / "public" / "covers" / "thumb"
COVER_DIR = ROOT / "public" / "covers"

FONT_DIR = Path("/usr/local/texlive/2025/texmf-dist/fonts/opentype/public")
MINCHO_B = FONT_DIR / "haranoaji/HaranoAjiMincho-Bold.otf"
MINCHO_R = FONT_DIR / "haranoaji/HaranoAjiMincho-Regular.otf"
GOTHIC_M = FONT_DIR / "haranoaji/HaranoAjiGothic-Medium.otf"
GOTHIC_R = FONT_DIR / "haranoaji/HaranoAjiGothic-Regular.otf"

W, H = 1200, 630
PAPER = (251, 250, 247)
INK = (26, 29, 33)
INK2 = (74, 80, 87)
INK3 = (124, 131, 139)
NAVY = (35, 57, 93)
RULE = (221, 217, 208)
ACCENT = (154, 107, 47)

PAD = 64
COVER_W = 268


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size)


def text_w(d: ImageDraw.ImageDraw, s: str, f: ImageFont.FreeTypeFont) -> int:
    return int(d.textlength(s, font=f))


def wrap(d: ImageDraw.ImageDraw, s: str, f: ImageFont.FreeTypeFont, max_w: int) -> list[str]:
    """和文は任意の位置で折り返せるので、幅で切っていく。"""
    lines, cur = [], ""
    for ch in s:
        if text_w(d, cur + ch, f) > max_w and cur:
            lines.append(cur)
            cur = ch
        else:
            cur += ch
    if cur:
        lines.append(cur)
    return lines


def short_name(u: dict) -> str:
    import re

    return re.sub(r"数学$", "", re.sub(r"\s*（.*?）\s*", "", u["name"])) or u["university"]


def stats_of(u: dict) -> list[tuple[str, str, str]]:
    """(値, 単位, ラベル) の並び。取れた項目だけ。"""
    f = u.get("facts") or {}
    out = []
    if f.get("examTime"):
        out.append((str(f["examTime"]), "分", "試験時間"))
    if f.get("questions"):
        out.append((str(f["questions"]), "題", "大問数"))
    if f.get("examTime") and f.get("questions"):
        out.append((str(round(f["examTime"] / f["questions"])), "分", "1題あたり"))
    if f.get("style"):
        out.append((f["style"], "", "解答形式"))
    return out[:3]


def build_card(u: dict) -> Image.Image:
    img = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(img)

    # 左端の紺の帯（表紙の意匠に合わせた細い罫）
    d.rectangle([0, 0, 10, H], fill=NAVY)

    x = PAD
    text_right = W - PAD - COVER_W - 48
    max_w = text_right - x

    # 大学名・区分
    f_eyebrow = font(GOTHIC_M, 26)
    eyebrow = u["university"] + (f"・{u['course']}" if u.get("course") else "")
    d.text((x, 74), eyebrow, font=f_eyebrow, fill=NAVY)

    # 見出し。長い大学名でも収まるよう、行数を見て段階的に縮める
    title = f"{short_name(u)}数学の傾向と対策"
    # 1行に収まる大きさを優先。2行になるときは、末尾に1〜2文字だけ残る
    # 「ぶら下がり」を避けられる大きさまで落とす。
    f_title = font(MINCHO_B, 48)
    lines = wrap(d, title, f_title, max_w)
    for size in (78, 72, 66, 60, 54, 48, 44):
        cand_font = font(MINCHO_B, size)
        cand = wrap(d, title, cand_font, max_w)
        if len(cand) == 1 or (len(cand) == 2 and len(cand[-1]) >= 4):
            f_title, lines = cand_font, cand
            break
    y = 126
    for ln in lines[:3]:
        d.text((x, y), ln, font=f_title, fill=INK)
        y += int(f_title.size * 1.32)

    # 分析年度
    years = u.get("years") or []
    if len(years) == 2:
        f_sub = font(GOTHIC_R, 26)
        d.text((x, y + 10), f"{years[0]}〜{years[1]}年度・過去問8年分の分析", font=f_sub, fill=INK3)

    # 要点の数字
    rows = stats_of(u)
    if rows:
        base = H - 176
        d.line([(x, base - 34), (text_right, base - 34)], fill=RULE, width=2)
        cx = x
        f_label = font(GOTHIC_R, 22)
        for value, unit, label in rows:
            d.text((cx, base), label, font=f_label, fill=INK3)
            big = len(value) <= 3 and unit
            f_val = font(MINCHO_B, 54 if big else 30)
            d.text((cx, base + 30), value, font=f_val, fill=INK)
            vw = text_w(d, value, f_val)
            if unit:
                f_unit = font(GOTHIC_R, 22)
                d.text((cx + vw + 6, base + 30 + (f_val.size - 22)), unit, font=f_unit, fill=INK3)
                vw += 6 + text_w(d, unit, f_unit)
            cx += max(vw + 56, 168)

    # 表紙
    cover_path = COVER_DIR / f"{u['books'][0]['asin']}.webp"
    if cover_path.exists():
        cov = Image.open(cover_path).convert("RGB")
        ch = int(COVER_W * cov.height / cov.width)
        cov = cov.resize((COVER_W, ch), Image.LANCZOS)
        cy = (H - ch) // 2
        cx0 = W - PAD - COVER_W
        # 影を薄く敷く
        shadow = Image.new("RGB", (COVER_W + 10, ch + 10), (236, 233, 226))
        img.paste(shadow, (cx0 - 3, cy + 5))
        img.paste(cov, (cx0, cy))
        d.rectangle([cx0, cy, cx0 + COVER_W - 1, cy + ch - 1], outline=RULE, width=1)

    # 下端の署名
    d.line([(x, H - 76), (W - PAD, H - 76)], fill=RULE, width=2)
    f_foot = font(GOTHIC_M, 24)
    d.text((x, H - 56), "大学別 数学入試分析", font=f_foot, fill=INK2)
    f_url = font(GOTHIC_R, 22)
    url = "yuta-eng.com"
    d.text((W - PAD - text_w(d, url, f_url), H - 54), url, font=f_url, fill=INK3)

    return img


def build_home_card() -> Image.Image:
    img = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, 10, H], fill=NAVY)

    x = PAD
    f_title = font(MINCHO_B, 92)
    d.text((x, 150), "大学別 数学入試分析", font=f_title, fill=INK)

    f_sub = font(GOTHIC_R, 30)
    d.text((x, 290), "国公立・私立52大学の数学を、過去問8年分から", font=f_sub, fill=INK2)
    d.text((x, 336), "年度別・分野別に分析", font=f_sub, fill=INK2)

    d.line([(x, 420), (W - PAD, 420)], fill=RULE, width=2)
    cx = x
    for value, unit, label in [("52", "大学", "分析大学"), ("61", "冊", "予想問題集"), ("8", "年分", "分析年度")]:
        f_label = font(GOTHIC_R, 24)
        d.text((cx, 452), label, font=f_label, fill=INK3)
        f_val = font(MINCHO_B, 62)
        d.text((cx, 486), value, font=f_val, fill=INK)
        vw = text_w(d, value, f_val)
        f_unit = font(GOTHIC_R, 24)
        d.text((cx + vw + 8, 486 + 34), unit, font=f_unit, fill=INK3)
        cx += 250

    f_url = font(GOTHIC_R, 24)
    url = "yuta-eng.com"
    d.text((W - PAD - text_w(d, url, f_url), H - 60), url, font=f_url, fill=INK3)
    return img


def main() -> int:
    for p in (MINCHO_B, MINCHO_R, GOTHIC_M, GOTHIC_R):
        if not p.exists():
            print(f"フォントが見つかりません: {p}", file=sys.stderr)
            return 1

    OG_DIR.mkdir(parents=True, exist_ok=True)
    THUMB_DIR.mkdir(parents=True, exist_ok=True)

    # OG 画像はクローラと SNS だけが取りに来る。表示側の負荷には効かないが、
    # PNG だと 1 枚 130KB 前後になるので JPEG にしてリポジトリを軽く保つ。
    save = dict(format="JPEG", quality=88, optimize=True, progressive=True)
    for u in DATA:
        build_card(u).save(OG_DIR / f"{u['slug']}.jpg", **save)
    build_home_card().save(OG_DIR / "home.jpg", **save)

    # 一覧に並べる小さい表紙
    thumbs = 0
    for u in DATA:
        for b in u["books"]:
            src = COVER_DIR / f"{b['asin']}.webp"
            if not src.exists():
                continue
            im = Image.open(src).convert("RGB")
            h = round(160 * im.height / im.width)
            im.resize((160, h), Image.LANCZOS).save(THUMB_DIR / f"{b['asin']}.webp", "WEBP", quality=80, method=6)
            thumbs += 1

    print(f"OG 画像: {len(DATA) + 1} 枚 / サムネイル: {thumbs} 枚")
    total = sum(f.stat().st_size for f in OG_DIR.glob("*.jpg"))
    print(f"OG 合計 {total / 1024 / 1024:.1f} MB")
    return 0


if __name__ == "__main__":
    sys.exit(main())
