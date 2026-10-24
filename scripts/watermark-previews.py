import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SAMPLES_DIR = ROOT / "public" / "samples" / "mock-exams"
FONT_PATH = "/System/Library/Fonts/Hiragino Sans GB.ttc"

def get_font(size: int):
    try:
        return ImageFont.truetype(FONT_PATH, size)
    except Exception:
        return ImageFont.load_default()

def process_image(img_path: Path):
    slug = img_path.stem
    if slug == "cover":
        return

    # 再レンダリング（sales/mock-exams/<id>/ のPDFから元の鮮明なページを取り直す）
    exam_id = img_path.parent.name
    sales_dir = ROOT / "sales" / "mock-exams" / exam_id
    
    import fitz
    pdf_map = {
        "problem": ("problems.pdf", 1),
        "answer-sheet": ("answer-sheets.pdf", 0),
        "solution": ("solutions.pdf", 1),
        "rubric": ("rubric.pdf", 1),
    }

    raw_img = None
    if slug in pdf_map:
        pdf_file, page_idx = pdf_map[slug]
        full_pdf = sales_dir / pdf_file
        if not full_pdf.exists():
            full_pdf = sales_dir / "full.pdf"
        if full_pdf.exists():
            doc = fitz.open(full_pdf)
            page = doc[min(page_idx, doc.page_count - 1)]
            zoom = 900 / page.rect.width
            pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False)
            raw_img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
            doc.close()

    if raw_img is None:
        raw_img = Image.open(img_path).convert("RGB")

    w, h = raw_img.size

    # 1. 問題紙（problem）：大問[1]だけ見せて、大問[2]と大問[3]領域（下64%）に強ガウスぼかし＋白グラデーション
    if slug == "problem":
        mask_y = int(h * 0.36)
        # 下部を強力ガウスぼかし
        blurred = raw_img.filter(ImageFilter.GaussianBlur(radius=18))
        # マスク領域のみ blurred を合成
        mask_crop = blurred.crop((0, mask_y, w, h))
        raw_img.paste(mask_crop, (0, mask_y))

        # 白グラデーション overlay
        overlay = Image.new("RGBA", (w, h), (255, 255, 255, 0))
        draw = ImageDraw.Draw(overlay)

        for y in range(mask_y, h):
            # mask_y から 80px かけて急速に不透明度を 245 まで引き上げる
            progress = min(1.0, (y - mask_y) / 80.0)
            alpha = int(80 + progress * 165)  # max 245
            draw.line([(0, y), (w, y)], fill=(248, 250, 252, alpha))

        # 🔒 ロックカード
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
        font_badge = get_font(18)
        font_sub = get_font(13)
        draw.text((box_left + 45, box_top + 18), "🔒 大問2〜大問5は購入後に収録（全5大問・100分）", font=font_badge, fill=(251, 191, 36, 255))
        draw.text((box_left + 48, box_top + 48), "問題冊子・解答用紙5枚・全問解説・採点基準はご購入後にご覧いただけます", font=font_sub, fill=(241, 245, 249, 255))

        # 斜め透かし
        font_wm = get_font(18)
        for y_offset in range(-h, h * 2, 240):
            for x_offset in range(-w, w * 2, 420):
                txt_box = Image.new("RGBA", (480, 50), (255, 255, 255, 0))
                t_draw = ImageDraw.Draw(txt_box)
                t_draw.text((10, 12), "SAMPLE ｜ 見本・無断転載禁止 ｜ 大学別数学研究室", font=font_wm, fill=(100, 116, 139, 45))
                rotated = txt_box.rotate(28, expand=True)
                overlay.alpha_composite(rotated, (x_offset, y_offset))

        raw_img = Image.alpha_composite(raw_img.convert("RGBA"), overlay).convert("RGB")

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
        font_badge = get_font(18)
        font_sub = get_font(13)
        draw.text((box_left + 45, box_top + 18), "🔒 (2)以降の解答解説・別解・採点講評は購入後に収録", font=font_badge, fill=(251, 191, 36, 255))
        draw.text((box_left + 48, box_top + 48), "完全な記述答案・論述プロセス・小問別配点はご購入後にご覧いただけます", font=font_sub, fill=(241, 245, 249, 255))

        # 斜め透かし
        font_wm = get_font(18)
        for y_offset in range(-h, h * 2, 240):
            for x_offset in range(-w, w * 2, 420):
                txt_box = Image.new("RGBA", (480, 50), (255, 255, 255, 0))
                t_draw = ImageDraw.Draw(txt_box)
                t_draw.text((10, 12), "SAMPLE ｜ 見本・無断転載禁止 ｜ 大学別数学研究室", font=font_wm, fill=(100, 116, 139, 45))
                rotated = txt_box.rotate(28, expand=True)
                overlay.alpha_composite(rotated, (x_offset, y_offset))

        raw_img = Image.alpha_composite(raw_img.convert("RGBA"), overlay).convert("RGB")

    # 3. 採点基準（rubric）＆ 解答用紙（answer-sheet）：マスキングなし！100%見せる！（斜めSAMPLE透かしのみ付与）
    else:
        overlay = Image.new("RGBA", (w, h), (255, 255, 255, 0))
        font_wm = get_font(18)
        for y_offset in range(-h, h * 2, 240):
            for x_offset in range(-w, w * 2, 420):
                txt_box = Image.new("RGBA", (480, 50), (255, 255, 255, 0))
                t_draw = ImageDraw.Draw(txt_box)
                t_draw.text((10, 12), "SAMPLE ｜ 見本・無断転載禁止 ｜ 大学別数学研究室", font=font_wm, fill=(100, 116, 139, 45))
                rotated = txt_box.rotate(28, expand=True)
                overlay.alpha_composite(rotated, (x_offset, y_offset))

        raw_img = Image.alpha_composite(raw_img.convert("RGBA"), overlay).convert("RGB")

    raw_img.save(img_path, "WEBP", quality=82, method=6)
    print(f"✓ Watermarked & Protected: {img_path.relative_to(ROOT)} (slug={slug})")

def main():
    if not SAMPLES_DIR.exists():
        return
    for exam_dir in sorted(SAMPLES_DIR.iterdir()):
        if exam_dir.is_dir():
            for p in sorted(exam_dir.glob("*.webp")):
                process_image(p)

if __name__ == "__main__":
    main()

