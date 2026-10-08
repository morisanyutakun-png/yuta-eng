"""問題の見本と、カラーの返却レポートを PDF・画像に書き出す。

2冊ぶん作る。
  問題の見本   … 大学を特定しない共通の問題・解答と解説・採点基準
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
import argparse
import hashlib
import json
import math
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
            ("個人成績表", "成績"),
            ("答案講評・学習の手引き", "講評・助言"),
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


def brand_data_tex() -> str:
    """シリーズ名・発行者は実データ、見本の年度は架空の共通データから組む。"""
    config = json.loads((ROOT / "data/moshi.json").read_text(encoding="utf-8"))
    sample = json.loads((ROOT / "data/moshi-return.json").read_text(encoding="utf-8"))
    site = (ROOT / "lib/site.ts").read_text(encoding="utf-8")
    brand = re.search(r'name:\s*"([^"]+)"', site)
    author = re.search(r'author:\s*"([^"]+)"', site)
    year = re.match(r"(20XX)年度", sample["season"])
    if not brand or not author or not year:
        sys.exit("見本のシリーズ名・年度・発行者データを確認できない")
    values = {
        "Title": config["title"], "Season": sample["season"], "Year": year[1],
        "Brand": brand[1], "Author": author[1],
    }
    return "\n".join(
        f"\\newcommand{{\\Moshi{k}}}{{{tex_text(v)}}}" for k, v in values.items()
    ) + "\n"


def return_data_tex() -> str:
    """得点・統計は共通の架空データから計算。判定は採点者の総合評価例。"""
    report = json.loads((ROOT / "data/moshi-return.json").read_text(encoding="utf-8"))
    config = json.loads((ROOT / "data/moshi.json").read_text(encoding="utf-8"))

    def totals(q):
        for s in q["subs"]:
            if not 0 <= s["score"] <= s["max"] or s["max"] <= 0:
                sys.exit(f"返却見本の小問得点が不正: {q['no']}/{s['no']}")
        return sum(s["score"] for s in q["subs"]), sum(s["max"] for s in q["subs"])

    score = sum(totals(q)[0] for q in report["questions"])
    maximum = sum(totals(q)[1] for q in report["questions"])
    population = report["populationScores"]
    if len(population) < config["statsMin"] or any(not 0 <= s <= maximum for s in population):
        sys.exit("返却見本の架空受験者集団が統計の掲載条件を満たしていない")
    mean = sum(population) / len(population)
    sd = math.sqrt(sum((s - mean) ** 2 for s in population) / len(population))
    if sd == 0:
        sys.exit("返却見本の標準偏差が0のため偏差値を計算できない")
    grade = report["judgement"]["grade"]
    levels = {level["grade"]: level["label"] for level in config["judgementLevels"]}
    if grade not in levels:
        sys.exit("返却見本の判定がA〜Dの定義にない")
    fmt_date = lambda d: d.replace("-", " / ")
    values = {
        "University": report["university"], "Course": report["course"],
        "Candidate": report["candidate"], "Number": report["number"],
        "ExamDate": fmt_date(report["examDate"]), "ReturnDate": fmt_date(report["returnDate"]),
        "Round": report["round"], "Score": score, "Max": maximum,
        "Rate": f"{100*score/maximum:.1f}", "StatsMin": config["statsMin"],
        "Summary": report["summary"],
        "Mean": f"{mean:.1f}", "Deviation": f"{50 + 10*(score-mean)/sd:.1f}",
        "Rank": 1 + sum(s > score for s in population), "Count": len(population),
        "Grade": grade, "GradeLabel": levels[grade],
        "GradeComment": report["judgement"]["comment"],
        "GradeLegend": "参考判定の目安： " + " / ".join(f"{g}：{label}" for g, label in levels.items()),
    }
    commands = [f"\\newcommand{{\\Report{k}}}{{{tex_text(v)}}}" for k, v in values.items()]
    rows = []
    for i, q in enumerate(report["questions"]):
        earned, total = totals(q)
        rows.append(
            f"\\scorerow{{{126+i*12}}}{{{q['no']}}}{{{tex_text(q['field'])}}}"
            + "".join(f"{{{s['score']} / {s['max']}}}" for s in q["subs"])
            + f"{{{earned} / {total}}}{{{100*earned/total:.0f}}}"
        )
    commands.append("\\newcommand{\\ReportScoreRows}{" + "\n".join(rows) + "}")
    feedback = []
    for i, q in enumerate(report["questions"]):
        earned, total = totals(q)
        feedback.append(
            f"\\feedback{{{62+i*32}}}{{{q['no']}}}{{{tex_text(q['field'])}}}"
            f"{{{earned} / {total}}}{{{tex_text(q['comment'])}}}{{{tex_text(q['review'])}}}"
        )
    commands.append("\\newcommand{\\ReportFeedback}{" + "\n".join(feedback) + "}")
    plan = [
        f"\\planrow{{{64+i*24}}}{{{tex_text(p['days'])}}}{{{tex_text(p['title'])}}}"
        f"{{{tex_text(p['task'])}}}{{{tex_text(p['check'])}}}"
        for i, p in enumerate(report["plan"])
    ]
    commands.append("\\newcommand{\\ReportPlan}{" + "\n".join(plan) + "}")

    skills = report["skills"]
    if len(skills) != 5 or any(not 0 <= s["score"] <= 100 for s in skills):
        sys.exit("返却見本の5観点評価が不正")

    def radar_point(radius, i):
        angle = math.radians(-90 + i * 72)
        return f"({218 + radius*math.cos(angle):.3f},{-148 - radius*math.sin(angle):.3f})"

    radar = []
    for level in (20, 40, 60, 80, 100):
        points = " -- ".join(radar_point(25 * level / 100, i) for i in range(5))
        radar.append(f"\\draw[rule,line width=0.3pt] {points} -- cycle;")
    for i, skill in enumerate(skills):
        radar.append(f"\\draw[rule,line width=0.3pt] (218,-148) -- {radar_point(25,i)};")
        radar.append(
            r"\node[align=center,text=ink,font=\fontsize{8}{11}\selectfont] at "
            + radar_point(32, i) + " {" + tex_text(skill["label"])
            + r"\\{\color{blue}\bfseries " + str(skill["score"]) + "}};"
        )
    points = " -- ".join(radar_point(25 * skill["score"] / 100, i) for i, skill in enumerate(skills))
    radar.append(f"\\filldraw[fill=blue,fill opacity=0.17,draw=blue,line width=0.9pt] {points} -- cycle;")
    for i, skill in enumerate(skills):
        radar.append(f"\\fill[blue] {radar_point(25 * skill['score'] / 100, i)} circle[radius=0.65mm];")
    for level in (20, 60, 100):
        radar.append(f"\\rt{{219.5}}{{{148-25*level/100-1}}}{{10}}{{6}}{{muted}}{{{level}}}")
    commands.append("\\newcommand{\\ReportRadar}{" + "\n".join(radar) + "}")

    bins = [sum(lower <= s <= (maximum if lower == 50 else lower+9) for s in population) for lower in range(0, 60, 10)]
    histogram = [
        f"\\rt{{200}}{{145}}{{85}}{{6.5}}{{muted}}{{平均 {mean:.1f}点 / あなた {score}点（濃色）}}",
        r"\draw[rule,line width=0.35pt] (201,-175) -- (284,-175);",
    ]
    for i, n in enumerate(bins):
        x = 202 + i * 13.8
        height = 20 * n / max(bins)
        selected = i == min(score // 10, 5)
        upper = maximum if i == 5 else i * 10 + 9
        histogram.extend([
            f"\\fill[{'blue' if selected else 'bar'}] ({x:.2f},-175) rectangle ({x+10:.2f},{-175+height:.2f});",
            f"\\rt{{{x+2:.2f}}}{{{175-height-4:.2f}}}{{10}}{{6.5}}{{muted}}{{{n}}}",
            f"\\rt{{{x-0.3:.2f}}}{{177}}{{13.8}}{{6}}{{muted}}{{{i*10}--{upper}}}",
        ])
    average_x = 201 + mean / maximum * 83
    histogram.append(f"\\draw[muted,dashed,line width=0.4pt] ({average_x:.2f},-151) -- ({average_x:.2f},-175);")
    histogram.append(r"\rt{200}{182}{85}{6}{muted}{縦：人数（名）\quad 横：得点（点）\quad 破線：平均}")
    commands.append("\\newcommand{\\ReportHistogram}{" + "\n".join(histogram) + "}")
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
    (work / "moshi-brand-data.tex").write_text(brand_data_tex(), encoding="utf-8")
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

    config = json.loads((ROOT / "data/moshi.json").read_text(encoding="utf-8"))
    title = config["title"]
    if not doc.metadata.get("title", "").startswith(title):
        sys.exit(f"{kind}: PDF の文書タイトルがシリーズ名と一致しない")
    for i, page in enumerate(doc):
        if kind == "return" and (abs(page.rect.width - 841.89) > 1 or abs(page.rect.height - 595.28) > 1):
            sys.exit(f"返却見本の{i + 1}ページがA4横ではない")
        if "".join(title.split()) not in "".join(page.get_text().split()):
            sys.exit(f"{kind}: {i + 1}ページにシリーズ名がない（表紙・柱・問題紙を確認）")

    # 大学別ページで共有する見本へ、実在の開催大学名を戻さない。
    sample_text = "".join("".join(page.get_text().split()) for page in doc)
    sample_text += "".join(str(v) for v in doc.metadata.values())
    for university in config["universities"]:
        if university["university"] in sample_text:
            sys.exit(f"{kind}: 共通見本に実在の大学名が残っている（{university['university']}）")

    out = OUT_ROOT / kind
    out.mkdir(parents=True, exist_ok=True)
    for old in out.glob("*"):
        old.unlink()

    pages = []
    for i, page in enumerate(doc):
        zoom = (2000 if kind == "return" else IMG_WIDTH) / page.rect.width
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
                **({"version": hashlib.sha256((out / name).read_bytes()).hexdigest()[:12]} if kind == "return" else {}),
            }
        )

    shutil.copy(pdf, out / pdf.name)
    return {"pdf": f"/samples/moshi/{kind}/{pdf.name}", "pages": pages}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--kind", choices=BOOKLETS, help="指定した見本だけ再生成する")
    args = parser.parse_args()
    selected = {args.kind: BOOKLETS[args.kind]} if args.kind else BOOKLETS
    data = json.loads(DATA.read_text(encoding="utf-8")) if args.kind and DATA.exists() else {}
    # 置き場所を作り直す前に、古い形（直下に画像があった頃）を片づける
    if not args.kind and OUT_ROOT.exists():
        for old in OUT_ROOT.iterdir():
            if old.is_file():
                old.unlink()

    for kind, spec in selected.items():
        pdf = build_pdf(spec["tex"])
        data[kind] = render(kind, pdf, spec["labels"])

    DATA.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    size = sum(f.stat().st_size for f in OUT_ROOT.rglob("*") if f.is_file())
    total = sum(len(data[kind]["pages"]) for kind in selected)
    print(f"書き出し {len(selected)}冊 / {total}ページ（登録済み全体 {size / 1024:.0f}KB） → {OUT_ROOT.relative_to(ROOT)}")
    print(f"        {DATA.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
