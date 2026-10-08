"""問題の見本と、カラーの返却レポートを PDF・画像に書き出す。

2冊ぶん作る。
  問題の見本   … 本番と同じ体裁の問題・解答と解説・採点基準
  返却の見本   … 受験後にお返しする「合格への手引き」1人分

`npm run moshi:sample` で実行する。作るもの:
  assets/moshi-sample/*.pdf              組んだ見本（控え）
  public/samples/moshi/<種類>/p1.webp …  1ページずつの画像
  public/samples/moshi/<種類>/*.pdf      配信する PDF
  data/moshi-sample.json                 ページの見出しと寸法

問題の見本は書籍のプリアンブルを読む。返却見本は独立した A4・2ページの
レポートで、data/moshi-return.json を Web と PDF の共通データとして使う。
原稿ディレクトリには何も書き込まない。

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
from datetime import date
from pathlib import Path

import fitz
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
MANUSCRIPT_HOME = Path(os.environ.get("HOME", "/Users/moriyuuta"))
ASSETS = ROOT / "assets" / "moshi-sample"
OUT_ROOT = ROOT / "public" / "samples" / "moshi"
DATA = ROOT / "data" / "moshi-sample.json"

LUALATEX = "/Library/TeX/texbin/lualatex"
IMG_WIDTH = 1100  # 拡大表示でも数式が読める幅
IMG_QUALITY = 75

# 作るもの。ページの見出しは組み上がりの順に並べる。
# 想定と実際のページ数が食い違ったら止める（黙ってずれた見出しを付けない）。
BOOKLETS = {
    "problem": {
        "tex": "moshi-sample.tex",
        "labels": [
            ("扉", "扉"),
            ("問題", "問題"),
            ("解答・解説", "解答"),
            ("解答・解説（続き）", "解答"),
            ("採点基準", "採点"),
            ("採点基準（続き）", "採点"),
        ],
    },
    "return": {
        "tex": "moshi-return.tex",
        "labels": [
            ("個人成績レポート", "成績"),
            ("答案講評・復習プラン", "講評・助言"),
        ],
    },
}


def manuscript_dir() -> Path:
    """プリアンブルのある原稿ディレクトリ。data/manuscripts.json から引く。"""
    reg = json.loads((ROOT / "data" / "manuscripts.json").read_text(encoding="utf-8"))
    rel = reg.get("mie", {}).get("volumes", {}).get("1")
    if not rel:
        sys.exit("data/manuscripts.json に三重大 vol.1 の場所がない")
    d = MANUSCRIPT_HOME / rel
    if not (d / "preamble.tex").exists():
        sys.exit(f"プリアンブルが見つからない: {d / 'preamble.tex'}")
    return d


def tex_text(value: str) -> str:
    """共通データは普通のテキスト。LaTeX の命令として解釈させない。"""
    escapes = {
        "\\": r"\textbackslash{}", "&": r"\&", "%": r"\%", "$": r"\$",
        "#": r"\#", "_": r"\_", "{": r"\{", "}": r"\}",
        "~": r"\textasciitilde{}", "^": r"\textasciicircum{}",
    }
    return "".join(escapes.get(c, c) for c in str(value))


def return_data_tex() -> str:
    """得点・得点率は小問から集計。PDF と Web で同じ内容を返す。"""
    report = json.loads((ROOT / "data/moshi-return.json").read_text(encoding="utf-8"))
    config = json.loads((ROOT / "data/moshi.json").read_text(encoding="utf-8"))
    brand = re.search(r'name:\s*"([^"]+)"', (ROOT / "lib/site.ts").read_text(encoding="utf-8"))
    if not brand:
        sys.exit("lib/site.ts にサイト名がない")

    def totals(q):
        for s in q["subs"]:
            if not 0 <= s["score"] <= s["max"] or s["max"] <= 0:
                sys.exit(f"返却見本の小問得点が不正: {q['no']}/{s['no']}")
        return sum(s["score"] for s in q["subs"]), sum(s["max"] for s in q["subs"])

    score = sum(totals(q)[0] for q in report["questions"])
    maximum = sum(totals(q)[1] for q in report["questions"])
    fmt_date = lambda d: date.fromisoformat(d).strftime("%Y / %m / %d")
    values = {
        "Brand": brand[1], "University": report["university"], "Course": report["course"],
        "Candidate": report["candidate"], "Number": report["number"],
        "ExamDate": fmt_date(report["examDate"]), "ReturnDate": fmt_date(report["returnDate"]),
        "Round": config["round"], "Score": score, "Max": maximum,
        "Rate": f"{100*score/maximum:.1f}", "StatsMin": config["statsMin"],
        "Summary": report["summary"],
        "StrengthTitle": report["strength"]["title"], "StrengthBody": report["strength"]["body"],
        "FocusTitle": report["focus"]["title"], "FocusBody": report["focus"]["body"],
    }
    commands = [f"\\newcommand{{\\Report{k}}}{{{tex_text(v)}}}" for k, v in values.items()]
    fields, subs = [], []
    for i, q in enumerate(report["questions"]):
        earned, total = totals(q)
        fields.append(
            f"\\fieldrow{{{146+i*23}}}{{{tex_text(q['field'])}}}{{{earned}}}{{{total}}}"
            f"{{{100*earned/total:.0f}}}{{{q['tone']}}}{{{tex_text(q['status'])}}}"
        )
        for j, s in enumerate(q["subs"]):
            subs.append(
                f"\\subrow{{{153+i*18+j*5}}}{{{q['no'] if j == 0 else ''}}}"
                f"{{{s['no']}}}{{{s['score']}}}{{{s['max']}}}{{{q['tone']}}}"
            )
        if i < len(report["questions"]) - 1:
            subs.append(f"\\divider{{117}}{{{168+i*18}}}{{79}}")
    commands.append("\\newcommand{\\ReportFieldRows}{" + "\n".join(fields) + "}")
    commands.append("\\newcommand{\\ReportSubRows}{" + "\n".join(subs) + "}")
    feedback = []
    for i, no in enumerate(report["feedbackOrder"]):
        q = next(q for q in report["questions"] if q["no"] == no)
        earned, total = totals(q)
        feedback.append(
            f"\\feedback{{{81+i*42}}}{{{no}}}{{{q['tone']}}}{{{tex_text(q['field'])}}}"
            f"{{{earned} / {total}}}{{{tex_text(q['good'])}}}{{{tex_text(q['fix'])}}}{{{tex_text(q['next'])}}}"
        )
    commands.append("\\newcommand{\\ReportFeedback}{" + "\n".join(feedback) + "}")
    plan = [
        f"\\planstep{{{14+i*62.5}}}{{{tex_text(p['days'])}}}{{{tex_text(p['title'])}}}"
        f"{{{tex_text(p['task'])}}}{{確認：}}{{{tex_text(p['check'])}}}"
        for i, p in enumerate(report["plan"])
    ]
    commands.append("\\newcommand{\\ReportPlan}{" + "\n".join(plan) + "}")
    return "\n".join(commands) + "\n"


def build_pdf(tex: str) -> Path:
    """見本を組む。出力は作業用ディレクトリに置き、原稿側には何も書かない。"""
    if not Path(LUALATEX).exists():
        sys.exit(f"lualatex が無い: {LUALATEX}")
    src = ASSETS / tex
    if not src.exists():
        sys.exit(f"原稿がない: {src}")
    man = manuscript_dir() if tex != "moshi-return.tex" else None

    work = Path(tempfile.mkdtemp(prefix="moshi-sample-"))
    # ファイル名は原稿側と重ねない。TEXINPUTS の探索順で原稿の main.tex を
    # 拾ってしまい、本ごと組み上がったことがある。
    shutil.copy(src, work / src.name)
    if tex == "moshi-return.tex":
        (work / "moshi-return-data.tex").write_text(return_data_tex(), encoding="utf-8")
    env = {**os.environ, "TEXINPUTS": f".:{str(man) + ':' if man else ''}"}

    # LastPage の参照を解くため2回通す
    for i in range(2):
        r = subprocess.run(
            [LUALATEX, "-interaction=nonstopmode", "-halt-on-error", f"./{src.name}"],
            cwd=work, env=env, capture_output=True, text=True,
        )
        if r.returncode != 0:
            tail = "\n".join(l for l in r.stdout.splitlines() if l.startswith("!"))[:800]
            sys.exit(f"{tex} の組版に失敗した（{i + 1}回目）\n{tail}")

    pdf = work / src.with_suffix(".pdf").name
    keep = src.with_suffix(".pdf")
    shutil.copy(pdf, keep)
    print(f"組んだ  {keep.relative_to(ROOT)}")
    return keep


def render(kind: str, pdf: Path, labels: list[tuple[str, str]]) -> dict:
    doc = fitz.open(pdf)
    if doc.page_count != len(labels):
        sys.exit(
            f"{kind}: ページ数が {doc.page_count} で、見出しの数 {len(labels)} と合わない。"
            "組み上がりが変わったので BOOKLETS の labels を直すこと"
        )

    out = OUT_ROOT / kind
    out.mkdir(parents=True, exist_ok=True)
    for old in out.glob("*"):
        old.unlink()

    pages = []
    for i, page in enumerate(doc):
        zoom = (1400 if kind == "return" else IMG_WIDTH) / page.rect.width
        pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False)
        img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
        name = f"p{i + 1}.webp"
        img.save(out / name, "WEBP", quality=IMG_QUALITY, method=6)
        label, k = labels[i]
        pages.append(
            {
                "file": f"/samples/moshi/{kind}/{name}",
                "label": label,
                "kind": k,
                "page": i + 1,
                "width": pix.width,
                "height": pix.height,
            }
        )

    shutil.copy(pdf, out / pdf.name)
    return {"pdf": f"/samples/moshi/{kind}/{pdf.name}", "pages": pages}


def main() -> None:
    # 置き場所を作り直す前に、古い形（直下に画像があった頃）を片づける
    if OUT_ROOT.exists():
        for old in OUT_ROOT.iterdir():
            if old.is_file():
                old.unlink()

    data = {}
    for kind, spec in BOOKLETS.items():
        pdf = build_pdf(spec["tex"])
        data[kind] = render(kind, pdf, spec["labels"])

    DATA.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    size = sum(f.stat().st_size for f in OUT_ROOT.rglob("*") if f.is_file())
    total = sum(len(v["pages"]) for v in data.values())
    print(f"書き出し {len(data)}冊 / {total}ページ / {size / 1024:.0f}KB  → {OUT_ROOT.relative_to(ROOT)}")
    print(f"        {DATA.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
