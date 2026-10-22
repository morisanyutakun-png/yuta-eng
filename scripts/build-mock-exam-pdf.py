"""模試演習ストア（/mock-exams）の印刷用A4 PDF（4点セット）を組版・書き出す。

1つの模試につき次の4冊の PDF を作る:
  problems.pdf       … 問題冊子（表紙・注意事項・問題紙）
  answer-sheets.pdf  … 所定解答用紙（大問ごとに1枚・小問別採点欄つき）
  solutions.pdf      … 解答・解説（論述答案・別解・確かめ）
  rubric.pdf         … 採点基準（手順・共通原則・加点行／×減点行の採点表）

使い方:
  # リポジトリ内の見本（大問1のみ）を組んで紙面見本 WebP も書き出す
  python3 scripts/build-mock-exam-pdf.py kijutsu-standard-01 --example --previews --out /tmp/store-dist/kijutsu-standard-01

  # 本番用（リポジトリ外の ~/模試演習ストア/<id> から ~/模試演習ストア/_dist/<id> へ出力）
  python3 scripts/build-mock-exam-pdf.py kijutsu-standard-01

有料の問題・解答・採点基準は公開リポジトリに入れない。
また出力先に public/ 配下を指定した場合はエラーで止める（無料公開事故を防ぐため）。
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
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PREAMBLE = ROOT / "assets" / "mock-exams-store" / "tex" / "store-preamble.tex"
EXAMPLE_ROOT = ROOT / "assets" / "mock-exams-store" / "example"
PREVIEW_ROOT = ROOT / "public" / "samples" / "mock-exams"

LUALATEX = "/Library/TeX/texbin/lualatex"
PREVIEW_WIDTH = 900
PREVIEW_QUALITY = 78

PARTS = [
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
    env_root = os.environ.get("MOCK_EXAMS_SRC_ROOT")
    base = Path(env_root).expanduser() if env_root else Path.home() / "模試演習ストア"
    return (base / exam_id).resolve()


def resolve_out(exam_id: str, out_arg: str | None) -> Path:
    if out_arg:
        return Path(out_arg).expanduser().resolve()
    env_out = os.environ.get("STORE_PDF_DIR")
    base = Path(env_out).expanduser() if env_out else Path.home() / "模試演習ストア" / "_dist"
    return (base / exam_id).resolve()


def compile_part(src_dir: Path, key: str, label: str, out_dir: Path) -> dict:
    tex_file = src_dir / f"{key}.tex"
    if not tex_file.exists():
        sys.exit(f"原稿が見つかりません: {tex_file}")

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
                )[:1200]
                tail = "\n".join(r.stdout.splitlines()[-35:])
                sys.exit(f"[{key}] LuaLaTeX 組版失敗（{run_idx + 1}回目）\n{errs}\n{tail}")

        built = work / f"{key}.pdf"
        doc = fitz.open(built)
        page_count = doc.page_count
        doc.close()

        dest = out_dir / f"{key}.pdf"
        shutil.copy(built, dest)
        raw = dest.read_bytes()
        sha = hashlib.sha256(raw).hexdigest()
        print(f"組版完了  {key}.pdf（{page_count}ページ / {len(raw) / 1024:.1f}KB）")
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


def render_previews(exam_id: str, out_dir: Path) -> list[dict]:
    """見本版の主要ページを WebP 画像として public/samples/mock-exams/<id>/ に書き出す。"""
    specs = [
        ("problems", 0, "cover", "表紙（問題冊子）"),
        ("problems", 1, "problem", "問題紙（大問1）"),
        ("answer-sheets", 0, "answer-sheet", "所定解答用紙（第1問）"),
        ("solutions", 1, "solution", "解答・解説（論述答案）"),
        ("rubric", 1, "rubric", "採点基準（加点・減点表）"),
    ]
    dest_dir = PREVIEW_ROOT / exam_id
    dest_dir.mkdir(parents=True, exist_ok=True)
    results = []

    for part_key, page_idx, slug, label in specs:
        pdf_path = out_dir / f"{part_key}.pdf"
        doc = fitz.open(pdf_path)
        idx = min(page_idx, doc.page_count - 1)
        page = doc[idx]
        zoom = PREVIEW_WIDTH / page.rect.width
        pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False)
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
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


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("exam_id", help="模試のID（例: kijutsu-standard-01）")
    parser.add_argument("--src", help="原稿ディレクトリ（省略時は ~/模試演習ストア/<id>）")
    parser.add_argument("--out", help="PDF出力先ディレクトリ（省略時は ~/模試演習ストア/_dist/<id>）")
    parser.add_argument("--example", action="store_true", help="assets/mock-exams-store/example/<id> の見本原稿を使う")
    parser.add_argument("--previews", action="store_true", help="見本ページ画像を public/samples/mock-exams/<id>/ に書き出す（--example 時のみ）")
    args = parser.parse_args()

    if not Path(LUALATEX).exists():
        sys.exit(f"LuaLaTeX が見つかりません: {LUALATEX}")
    if not PREAMBLE.exists():
        sys.exit(f"共通プリアンブルが見つかりません: {PREAMBLE}")

    if args.previews and not args.example:
        sys.exit("--previews は --example（見本原稿）のときだけ指定できます。製品版のページを public/ に書き出すことはできません。")

    src_dir = resolve_src(args.exam_id, args.src, args.example)
    out_dir = resolve_out(args.exam_id, args.out)

    # public/ 配下への PDF 出力は禁止
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
        manifest_files.append(info)

    previews = render_previews(args.exam_id, out_dir) if args.previews else []

    manifest = {
        "examId": args.exam_id,
        "example": bool(args.example),
        "files": manifest_files,
        "previews": previews,
    }
    (out_dir / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(f"完了  → {out_dir}")


if __name__ == "__main__":
    main()
