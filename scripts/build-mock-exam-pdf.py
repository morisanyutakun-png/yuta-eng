"""模試演習ストア（/mock-exams）の印刷用A4 PDF（1冊統合版＋4冊分割版）を組版・書き出す。

販売用フォルダ（sales/mock-exams/<exam_id>/）内の src/ にある TeX 原稿を LuaLaTeX で組版し、
同じ販売用フォルダ（sales/mock-exams/<exam_id>/）に次の PDF を出力する:
  full.pdf           … 1冊統合版（大扉・目次・問題冊子・解答解説・採点基準・所定解答用紙）
  problems.pdf       … 問題冊子（表紙・注意事項・問題紙・下書きページ）
  answer-sheets.pdf  … 所定解答用紙（大問ごとに1枚・小問別採点欄つき）
  solutions.pdf      … 解答・解説（論述答案・TikZ図解・別解）
  rubric.pdf         … 採点基準（配点一覧・手順・共通原則・加点行／×減点行の採点表）

使い方:
  # 販売用フォルダ sales/mock-exams/<id>/src から組版し、見本画像（大問1・表紙）も書き出す
  python3 scripts/build-mock-exam-pdf.py preview-zento-set1 --previews

  # すべての販売用フォルダを一括ビルドする
  python3 scripts/build-mock-exam-pdf.py --all --previews
"""
import argparse
import hashlib
import json
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

import fitz
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
PREAMBLE = ROOT / "assets" / "mock-exams-store" / "tex" / "store-preamble.tex"
SALES_ROOT = ROOT / "sales" / "mock-exams"
EXAMPLE_ROOT = ROOT / "assets" / "mock-exams-store" / "example"
PREVIEW_ROOT = ROOT / "public" / "samples" / "mock-exams"

LUALATEX = "/Library/TeX/texbin/lualatex"
PREVIEW_WIDTH = 900
PREVIEW_QUALITY = 80

PARTS = [
    ("full", "1冊統合版（問題・解答解説・採点基準・解答用紙）"),
    ("problems", "問題冊子"),
    ("answer-sheets", "所定解答用紙"),
    ("solutions", "解答・解説"),
    ("rubric", "採点基準"),
]


def resolve_src(exam_id: str, src_arg: str | None, example: bool) -> Path:
    if src_arg:
        return Path(src_arg).expanduser().resolve()
    if example:
        return EXAMPLE_ROOT / exam_id
    sales_src = SALES_ROOT / exam_id / "src"
    if sales_src.exists():
        return sales_src
    return (SALES_ROOT / exam_id).resolve()


def resolve_out(exam_id: str, out_arg: str | None) -> Path:
    if out_arg:
        return Path(out_arg).expanduser().resolve()
    env_out = os.environ.get("STORE_PDF_DIR")
    base = Path(env_out).expanduser() if env_out else SALES_ROOT
    return (base / exam_id).resolve()


def compile_part(src_dir: Path, key: str, label: str, out_dir: Path) -> dict | None:
    tex_file = src_dir / f"{key}.tex"
    if not tex_file.exists():
        return None

    work = Path(tempfile.mkdtemp(prefix=f"mock-exam-{key}-"))
    try:
        shutil.copy(PREAMBLE, work / "store-preamble.tex")
        for f in src_dir.glob("*.tex"):
            shutil.copy(f, work / f.name)

        env = dict(os.environ)
        default_cache = Path.home() / "Library" / "texlive"
        if not os.access(default_cache, os.W_OK):
            cache_dir = Path(tempfile.gettempdir()) / "texmf-var-store"
            cache_dir.mkdir(parents=True, exist_ok=True)
            env["HOME"] = str(cache_dir)
            env["TEXMFVAR"] = str(cache_dir)
            env["TEXMFCACHE"] = str(cache_dir)

        for run_idx in range(2):
            r = subprocess.run(
                [LUALATEX, "-interaction=nonstopmode", "-halt-on-error", f"{key}.tex"],
                cwd=work,
                env=env,
                capture_output=True,
                text=True,
            )
            if r.returncode != 0:
                errs = "\n".join(
                    line for line in r.stdout.splitlines() if line.startswith("!") or "Error" in line
                )[:1500]
                tail = "\n".join(r.stdout.splitlines()[-40:])
                sys.exit(f"[{exam_id_label(out_dir)}/{key}] LuaLaTeX 組版失敗（{run_idx + 1}回目）\n{errs}\n{tail}")

        built = work / f"{key}.pdf"
        doc = fitz.open(built)
        page_count = doc.page_count
        doc.set_metadata(
            {
                "title": f"数学記述模試『入試プレビュー』 {label}",
                "author": "合格答案をつくるシリーズ／大学別数学研究室（森 祐太）",
                "subject": "数学記述模試『入試プレビュー』",
            }
        )
        dest = out_dir / f"{key}.pdf"
        doc.save(dest)
        doc.close()

        raw = dest.read_bytes()
        sha = hashlib.sha256(raw).hexdigest()
        print(f"組版完了  {out_dir.name}/{key}.pdf（{page_count}ページ / {len(raw) / 1024:.1f}KB）")
        return {
            "key": key,
            "label": label,
            "file": f"{key}.pdf",
            "pages": page_count,
            "bytes": len(raw),
            "sha256": sha,
        }
    finally:
        shutil.rmtree(work, ignore_errors=True)


def exam_id_label(out_dir: Path) -> str:
    return out_dir.name


PREVIEW_FONT_PATH = "/System/Library/Fonts/Hiragino Sans GB.ttc"


def _get_preview_font(size: int) -> ImageFont.ImageFont | ImageFont.FreeTypeFont:
    try:
        return ImageFont.truetype(PREVIEW_FONT_PATH, size)
    except Exception:
        return ImageFont.load_default()


def apply_preview_protection(raw_img: Image.Image, slug: str) -> Image.Image:
    """見本プレビュー画像に透かしとネタバレ防止・解答流出防止マスキングを適用する。"""
    if slug == "cover":
        return raw_img

    w, h = raw_img.size

    # 1. 問題紙（problem）：大問[1]だけ見せて、大問[2]と大問[3]領域（下64%）に強ガウスぼかし＋白グラデーション
    if slug == "problem":
        mask_y = int(h * 0.36)
        blurred = raw_img.filter(ImageFilter.GaussianBlur(radius=18))
        mask_crop = blurred.crop((0, mask_y, w, h))
        raw_img.paste(mask_crop, (0, mask_y))

        overlay = Image.new("RGBA", (w, h), (255, 255, 255, 0))
        draw = ImageDraw.Draw(overlay)

        for y in range(mask_y, h):
            progress = min(1.0, (y - mask_y) / 80.0)
            alpha = int(80 + progress * 165)
            draw.line([(0, y), (w, y)], fill=(248, 250, 252, alpha))

        box_w, box_h = 560, 84
        box_top = mask_y + 80
        box_left = (w - box_w) // 2
        draw.rounded_rectangle(
            [(box_left, box_top), (box_left + box_w, box_top + box_h)],
            radius=8,
            fill=(15, 23, 42, 245),
            outline=(251, 191, 36, 180),
            width=2,
        )
        font_badge = _get_preview_font(18)
        font_sub = _get_preview_font(13)
        draw.text((box_left + 45, box_top + 18), "🔒 大問2〜大問5は購入後に収録（全5大問・100分）", font=font_badge, fill=(251, 191, 36, 255))
        draw.text((box_left + 48, box_top + 48), "問題冊子・解答用紙5枚・全問解説・採点基準はご購入後にご覧いただけます", font=font_sub, fill=(241, 245, 249, 255))

        font_wm = _get_preview_font(18)
        for y_offset in range(-h, h * 2, 240):
            for x_offset in range(-w, w * 2, 420):
                txt_box = Image.new("RGBA", (480, 50), (255, 255, 255, 0))
                t_draw = ImageDraw.Draw(txt_box)
                t_draw.text((10, 12), "SAMPLE ｜ 見本・無断転載禁止 ｜ 大学別数学研究室", font=font_wm, fill=(100, 116, 139, 45))
                rotated = txt_box.rotate(28, expand=True)
                overlay.alpha_composite(rotated, (x_offset, y_offset))

        return Image.alpha_composite(raw_img.convert("RGBA"), overlay).convert("RGB")

    # 2. 解答解説（solution）：上部62%（大問1完答プロセス）は見せ、下部38%（(2)以降）にボカシ＋白グラデーション
    elif slug == "solution":
        mask_y = int(h * 0.62)
        blurred = raw_img.filter(ImageFilter.GaussianBlur(radius=16))
        mask_crop = blurred.crop((0, mask_y, w, h))
        raw_img.paste(mask_crop, (0, mask_y))

        overlay = Image.new("RGBA", (w, h), (255, 255, 255, 0))
        draw = ImageDraw.Draw(overlay)

        for y in range(mask_y, h):
            progress = min(1.0, (y - mask_y) / 60.0)
            alpha = int(80 + progress * 165)
            draw.line([(0, y), (w, y)], fill=(248, 250, 252, alpha))

        box_w, box_h = 560, 84
        box_top = mask_y + 50
        box_left = (w - box_w) // 2
        draw.rounded_rectangle(
            [(box_left, box_top), (box_left + box_w, box_top + box_h)],
            radius=8,
            fill=(15, 23, 42, 245),
            outline=(251, 191, 36, 180),
            width=2,
        )
        font_badge = _get_preview_font(18)
        font_sub = _get_preview_font(13)
        draw.text((box_left + 45, box_top + 18), "🔒 (2)以降の解答解説・別解・採点講評は購入後に収録", font=font_badge, fill=(251, 191, 36, 255))
        draw.text((box_left + 48, box_top + 48), "完全な記述答案・論述プロセス・小問別配点はご購入後にご覧いただけます", font=font_sub, fill=(241, 245, 249, 255))

        font_wm = _get_preview_font(18)
        for y_offset in range(-h, h * 2, 240):
            for x_offset in range(-w, w * 2, 420):
                txt_box = Image.new("RGBA", (480, 50), (255, 255, 255, 0))
                t_draw = ImageDraw.Draw(txt_box)
                t_draw.text((10, 12), "SAMPLE ｜ 見本・無断転載禁止 ｜ 大学別数学研究室", font=font_wm, fill=(100, 116, 139, 45))
                rotated = txt_box.rotate(28, expand=True)
                overlay.alpha_composite(rotated, (x_offset, y_offset))

        return Image.alpha_composite(raw_img.convert("RGBA"), overlay).convert("RGB")

    # 3. 採点基準（rubric）＆ 解答用紙（answer-sheet）：マスキングなし！100%見せる！（斜めSAMPLE透かしのみ付与）
    else:
        overlay = Image.new("RGBA", (w, h), (255, 255, 255, 0))
        font_wm = _get_preview_font(18)
        for y_offset in range(-h, h * 2, 240):
            for x_offset in range(-w, w * 2, 420):
                txt_box = Image.new("RGBA", (480, 50), (255, 255, 255, 0))
                t_draw = ImageDraw.Draw(txt_box)
                t_draw.text((10, 12), "SAMPLE ｜ 見本・無断転載禁止 ｜ 大学別数学研究室", font=font_wm, fill=(100, 116, 139, 45))
                rotated = txt_box.rotate(28, expand=True)
                overlay.alpha_composite(rotated, (x_offset, y_offset))

        return Image.alpha_composite(raw_img.convert("RGBA"), overlay).convert("RGB")


def render_previews(exam_id: str, out_dir: Path) -> list[dict]:
    """表紙および大問1の見本ページを WebP 画像として public/samples/mock-exams/<id>/ に書き出す。"""
    specs = [
        ("problems", 0, "cover", "表紙（問題冊子）"),
        ("problems", 1, "problem", "問題紙（大問1サンプル）"),
        ("answer-sheets", 0, "answer-sheet", "所定解答用紙（第1問）"),
        ("solutions", 1, "solution", "解答・解説（大問1・論述答案）"),
        ("rubric", 1, "rubric", "採点基準（配点一覧・加点減点表）"),
    ]
    dest_dir = PREVIEW_ROOT / exam_id
    dest_dir.mkdir(parents=True, exist_ok=True)
    results = []

    for part_key, page_idx, slug, label in specs:
        pdf_path = out_dir / f"{part_key}.pdf"
        if not pdf_path.exists():
            pdf_path = out_dir / "full.pdf"
        if not pdf_path.exists():
            continue
        doc = fitz.open(pdf_path)
        idx = min(page_idx, doc.page_count - 1)
        page = doc[idx]
        zoom = PREVIEW_WIDTH / page.rect.width
        pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False)
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        img = apply_preview_protection(img, slug)
        webp_path = dest_dir / f"{slug}.webp"
        img.save(webp_path, "WEBP", quality=PREVIEW_QUALITY, method=6)
        doc.close()
        rel = f"/samples/mock-exams/{exam_id}/{slug}.webp"
        print(f"見本画像  {rel}（{img.width}x{img.height}）")
        results.append(
            {
                "src": rel,
                "label": label,
                "width": img.width,
                "height": img.height,
            }
        )
    return results


def sync_product_json(out_dir: Path, manifest_files: list[dict], previews: list[dict]) -> None:
    """sales/mock-exams/<id>/product.json があれば、ページ数と見本画像パスを同期する。"""
    product_file = out_dir / "product.json"
    if not product_file.exists():
        return
    try:
        data = json.loads(product_file.read_text(encoding="utf-8"))
        pages_by_key = {f["key"]: f["pages"] for f in manifest_files}
        if isinstance(data.get("files"), list):
            for f in data["files"]:
                if f.get("key") in pages_by_key:
                    f["pages"] = pages_by_key[f["key"]]
        if previews:
            data["previews"] = previews
        product_file.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    except Exception as exc:  # noqa: BLE001
        print(f"警告: product.json の更新をスキップしました: {exc}")


def build_one(exam_id: str, src_arg: str | None, out_arg: str | None, example: bool, previews: bool) -> None:
    src_dir = resolve_src(exam_id, src_arg, example)
    out_dir = resolve_out(exam_id, out_arg)

    try:
        out_dir.relative_to(ROOT / "public")
        sys.exit("エラー: 出力先に public/ 配下は指定できません（有料PDFが公開されてしまいます）。")
    except ValueError:
        pass

    if not src_dir.exists():
        sys.exit(f"原稿ディレクトリが存在しません: {src_dir}")

    out_dir.mkdir(parents=True, exist_ok=True)
    manifest_files = []
    for key, label in PARTS:
        info = compile_part(src_dir, key, label, out_dir)
        if info:
            manifest_files.append(info)

    if not manifest_files:
        sys.exit(f"組版対象の .tex ファイルが見つかりません: {src_dir}")

    preview_list = render_previews(exam_id, out_dir) if previews else []
    sync_product_json(out_dir, manifest_files, preview_list)

    manifest = {
        "examId": exam_id,
        "example": bool(example),
        "files": manifest_files,
        "previews": preview_list,
    }
    (out_dir / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(f"完了  → {out_dir}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("exam_id", nargs="?", help="模試のID（例: preview-zento-set1）")
    parser.add_argument("--all", action="store_true", help="sales/mock-exams/ 内の全模試を一括組版する")
    parser.add_argument("--src", help="原稿ディレクトリ（省略時は sales/mock-exams/<id>/src）")
    parser.add_argument("--out", help="PDF出力先ディレクトリ（省略時は sales/mock-exams/<id>）")
    parser.add_argument("--example", action="store_true", help="assets/mock-exams-store/example/<id> の見本原稿を使う")
    parser.add_argument("--previews", action="store_true", help="見本ページ画像を public/samples/mock-exams/<id>/ に書き出す")
    args = parser.parse_args()

    if not Path(LUALATEX).exists():
        sys.exit(f"LuaLaTeX が見つかりません: {LUALATEX}")
    if not PREAMBLE.exists():
        sys.exit(f"共通プリアンブルが見つかりません: {PREAMBLE}")

    if args.all:
        if not SALES_ROOT.exists():
            sys.exit(f"販売用フォルダが存在しません: {SALES_ROOT}")
        for d in sorted(SALES_ROOT.iterdir()):
            if d.is_dir() and (d / "src").is_dir():
                build_one(d.name, None, None, False, args.previews)
        return

    if not args.exam_id:
        parser.error("exam_id または --all を指定してください。")

    build_one(args.exam_id, args.src, args.out, args.example, args.previews)


if __name__ == "__main__":
    main()
