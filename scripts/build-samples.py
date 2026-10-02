#!/usr/bin/env python3
"""試し読み用の抜粋（画像とPDF）を作る。

入力（読むだけ・書き換えない）
  ~/<原稿フォルダ>/<巻>/*_KDP_B5_interior.pdf   KDP に入稿した本文PDF
出力
  public/samples/<ASIN>/p1.webp …              抜粋ページの画像
  public/samples/<ASIN>/sample.pdf             同じ抜粋だけを集めたPDF（冒頭に断り書き）
  data/samples.json                            どのページを何として出したかの記録

本文PDF そのものは公開ディレクトリに置かない。抜粋したページだけを新しいPDFに写す。

抜粋の選び方（立ち読みに近い範囲にとどめる）
  ・目次／本書の使い方／問題／解説／採点基準を1〜2ページずつ、合計4〜6ページ
  ・問題・解説・採点基準は、わざと別の回（別の章）から採る。
    同じ大問の「問題・解答・詳解・採点基準」が揃わないようにするため
  ・1回分・1章分をまとめて出さない
  ・ページの途中で切らない（ページ単位でそのまま写す）

版の取り違えを防ぐため、本文PDF のページ数が Amazon の表示（data/books.json）と
一致する巻だけを対象にする。一致しない巻は作らずに報告する。
"""
import json
import os
import re
import sys
from pathlib import Path

import fitz  # PyMuPDF
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
HOME = Path(os.environ.get("HOME", "/Users/moriyuuta"))
BOOKS = json.loads((ROOT / "data" / "books.json").read_text(encoding="utf-8"))
MANUSCRIPTS = json.loads((ROOT / "data" / "manuscripts.json").read_text(encoding="utf-8"))
OUT_DIR = ROOT / "public" / "samples"
DATA_OUT = ROOT / "data" / "samples.json"

IMG_WIDTH = 1100  # 拡大表示でも数式が読める幅
IMG_QUALITY = 75

# 断り書きのページは PyMuPDF の組み込み日本語フォントで書く。
# OTF を埋め込むとフォント全体（4MB 超）が PDF に入ってしまうため。
NOTICE_FONT = "japan"

NOTICE_TITLE = "試し読み（抜粋）"
NOTICE_BODY = (
    "このファイルは、書籍の内容を確認していただくための抜粋です。\n"
    "問題・解説・採点基準などを、それぞれ別の箇所から抜き出して並べています。\n"
    "連続したページではありません。\n\n"
    "各ページの下部または上部に、書籍でのページ番号が入っています。\n"
    "収録順や前後のつながりは、実際の書籍とは異なります。"
)


def series_dirs() -> dict[str, str]:
    """scripts/series-meta.mjs の「slug → 原稿ディレクトリ」。"""
    src = (ROOT / "scripts" / "series-meta.mjs").read_text(encoding="utf-8")
    out = {}
    for m in re.finditer(r'slug:\s*"([^"]+)",\s*dir:\s*"([^"]+)"', src):
        out[m.group(1)] = m.group(2)
    m = re.search(r'shindanBook = \{\s*\n\s*slug: "shindan",\s*\n\s*dir: "([^"]+)"', src)
    if m:
        out["shindan"] = m.group(1)
    return out


SERIES_DIRS = series_dirs()


def interior_pdf(book: dict) -> Path | None:
    """その巻の本文PDF。ページ数が Amazon の表示と一致するものだけを返す。"""
    if book["series"] == "gokaku":
        rel = MANUSCRIPTS.get(book["slug"], {}).get("volumes", {}).get(str(book["vol"]))
    else:
        rel = SERIES_DIRS.get(book["slug"])
    if not rel:
        return None
    d = HOME / rel
    cands = [p for p in sorted(d.glob("*_KDP_B5_interior.pdf")) if "outlined" not in p.name]
    cands += [d / "main_b5.pdf", d / "main.pdf"]  # 入稿名でない巻の控え
    for p in cands:
        if not p.exists():
            continue
        try:
            with fitz.open(p) as doc:
                if doc.page_count == book["pages"]:
                    return p
        except Exception:  # noqa: BLE001
            continue
    return None


def flat(s: str) -> str:
    return re.sub(r"\s+", " ", s)


def find_toc_page(doc: fitz.Document) -> int | None:
    for i in range(min(6, doc.page_count)):
        if flat(doc[i].get_text()).strip().startswith("目次"):
            return i
    return None


# 目次の見出しは本によって書き方が違う。
#   「第1 回予想問題 8」「第1 回オリジナル模試 5」
#   「第1 回解答・解説（1・2・3） 16」  ← 括弧の中に数字が入る
#   「第1 回予想問題 . . . . . . . 7」  ← 点線リーダーが入る
TOC_ENTRY = re.compile(
    r"(はじめに|第\s*\d+\s*[回章](?:[^0-9（(]|[（(][^）)]*[）)])*"
    r"|付録\s*[A-Z](?:[^0-9（(]|[（(][^）)]*[）)])*|最終判定[^0-9]*)\s*(\d+)"
)


def parse_toc(doc: fitz.Document, toc_index: int) -> list[tuple[str, int]]:
    """目次から「見出し → 書籍のページ番号」を読む。"""
    text = flat(doc[toc_index].get_text())
    text = re.sub(r"(?:[.．·]\s*){2,}", " ", text)  # 点線リーダー（「. . . .」を含む）を外す
    entries = []
    for m in TOC_ENTRY.finditer(text):
        label = re.sub(r"[\s.．]+", "", m.group(1)).strip("・")
        entries.append((label, int(m.group(2))))
    return entries


def page_number_offset(doc: fitz.Document) -> int | None:
    """PDF の何枚目が書籍の1ページかを、ノンブルから割り出す。"""
    votes: dict[int, int] = {}
    for i in range(doc.page_count):
        page = doc[i]
        r = page.rect
        foot = page.get_text("text", clip=fitz.Rect(0, r.height - 48, r.width, r.height))
        for n in re.findall(r"\d+", foot):
            num = int(n)
            if 0 < num <= doc.page_count:
                votes[i + 1 - num] = votes.get(i + 1 - num, 0) + 1
    if not votes:
        return None
    return max(votes.items(), key=lambda kv: kv[1])[0]


def printed_to_index(printed: int, offset: int) -> int:
    return printed - 1 + offset


class Sections:
    """目次から作った「見出し → PDF のページ範囲」。"""

    def __init__(self, entries: list[tuple[str, int]], offset: int, total: int):
        self.items = []
        for i, (label, printed) in enumerate(entries):
            start = printed_to_index(printed, offset)
            end = printed_to_index(entries[i + 1][1], offset) - 1 if i + 1 < len(entries) else total - 1
            if 0 <= start <= end < total:
                self.items.append((label, start, end))

    def label_of(self, index: int) -> str:
        for label, s, e in self.items:
            if s <= index <= e:
                return label
        return ""

    def find(self, pattern: str, nth: int = 0) -> tuple[int, int] | None:
        hits = [(s, e) for label, s, e in self.items if re.search(pattern, label)]
        return hits[nth] if nth < len(hits) else None

    def count(self, pattern: str) -> int:
        return sum(1 for label, _, _ in self.items if re.search(pattern, label))


def first_page_starting_with(doc: fitz.Document, span: tuple[int, int], pattern: str, skip: int = 0) -> int | None:
    """範囲の中で、本文が見出し（第N問など）から始まるページ。途中のページを避けるため。"""
    found = 0
    for i in range(span[0], span[1] + 1):
        body = flat(doc[i].get_text())
        # ヘッダー（シリーズ名・書名）を落としてから先頭を見る
        body = re.sub(r"^(合格答案をつくるシリーズ|過去問の前にシリーズ)[^0-9]*?(?=第|\d|$)", "", body).strip()
        if re.match(pattern, body):
            if found == skip:
                return i
            found += 1
    return None


# 問題そのものではないページ（試験の表紙・章扉・確認事項・白紙）
NOT_PROBLEM = re.compile(r"注意事項|試験開始の合図|問題紙|この章の確認事項|この章で[^。]{0,8}が要求|この章の問題|解答用紙")


def problem_page(doc: fitz.Document, span: tuple[int, int], nth: int | None = None) -> int | None:
    """
    範囲の中で、実際に問題が刷られているページ。表紙・章扉・確認事項は飛ばす。

    nth を指定しなければ、分量が中くらいのページを選ぶ。
    いちばん短いページ（1行問題だけでほぼ余白）も、いちばん詰まったページも、
    その本の代表的な見た目から外れるため。
    """
    hits = []
    for i in range(span[0], span[1] + 1):
        t = flat(doc[i].get_text()).strip()
        if len(t) < 100 or NOT_PROBLEM.search(t[:400]):
            continue
        hits.append((i, len(t)))
    if not hits:
        return None
    if nth is not None:
        return hits[min(nth, len(hits) - 1)][0]
    hits.sort(key=lambda x: x[1])
    return hits[len(hits) // 2][0]


def pick_pages(doc: fitz.Document, book: dict, sec: Sections, toc_index: int) -> list[tuple[int, str]]:
    """抜粋するページ（PDF のページ番号, 見出し）を決める。"""
    picks: list[tuple[int, str]] = [(toc_index, "目次")]

    intro = sec.find(r"^はじめに")
    if intro:
        # 「使い方」「解説の読み方」「採点」に触れているページを選ぶ
        best = None
        for i in range(intro[0], intro[1] + 1):
            t = flat(doc[i].get_text())
            if re.search(r"使い方|解説の読み方|採点の総則|本書の構成|読み方", t):
                best = i
                break
        picks.append((best if best is not None else min(intro[0] + 1, intro[1]), "本書の使い方"))

    if book["series"] == "kansei":
        # 章立ての本。第2章から問題、第3章から解説を採る
        ch2 = sec.find(r"^第2章(?!解答)", 0)
        ch3_ans = sec.find(r"^第3章解答")
        if ch2:
            picks.append((ch2[0], "章扉の例"))
            prob = problem_page(doc, (ch2[0] + 1, ch2[1]))
            if prob is not None:
                picks.append((prob, "問題の例"))
        if ch3_ans:
            start = first_page_starting_with(doc, ch3_ans, r"(\d+-\d+|第\s*\d+)") or ch3_ans[0]
            picks.append((start, "解説の例"))
        appendix = sec.find(r"^付録C") or sec.find(r"^付録")
        if appendix:
            picks.append((appendix[0], "付録の例"))
    else:
        # 回ごとに「問題 → 解答・解説 → 採点基準」が並ぶ本。
        # 問題・解説・採点基準は、わざと別の回から採る（同じ大問で一式揃えない）。
        by_round: dict[int, dict[str, tuple[int, int]]] = {}
        for label, start, end in sec.items:
            m = re.match(r"第(\d+)回", label)
            if not m:
                continue
            kind = (
                "採点基準" if "採点基準" in label
                else "診断" if "診断" in label
                else "解説" if ("解答" in label or "解説" in label)
                else "問題" if ("問題" in label or "模試" in label)
                else None
            )
            if kind:
                by_round.setdefault(int(m.group(1)), {}).setdefault(kind, (start, end))

        def pick_round(kind: str, prefer: int, used: set[int]) -> tuple[int, int] | None:
            order = [prefer] + [n for n in sorted(by_round) if n != prefer]
            for n in order:
                if n in used or kind not in by_round.get(n, {}):
                    continue
                used.add(n)
                return by_round[n][kind]
            # 回が足りないときは、重なってもその種類のページを出す
            for n in sorted(by_round):
                if kind in by_round.get(n, {}):
                    return by_round[n][kind]
            return None

        used: set[int] = set()
        prob = pick_round("問題", 2, used)
        ans = pick_round("解説", 3, used)
        mark = pick_round("採点基準", 4, used)
        diag = pick_round("診断", 1, set())

        if prob:
            # 1ページ目は試験の表紙なので飛ばし、2題目あたりのページを採る
            p = problem_page(doc, prob)
            if p is not None:
                picks.append((p, "問題の例"))
        if ans:
            start = first_page_starting_with(doc, ans, r"第\s*\d+\s*問") or ans[0]
            picks.append((start, "解説の例"))
            # 診断模試は診断ページがその本の特徴なので、解説の2ページ目より優先する
            if start + 1 <= ans[1] and not diag:
                picks.append((start + 1, "解説の例（続き）"))
        if mark:
            picks.append((mark[0], "採点基準の例"))
        else:
            # 採点基準を持たない本（マーク式など）は、その本の特徴が出る付録に替える
            appendix = sec.find(r"^付録A") or sec.find(r"^付録")
            if appendix:
                picks.append((appendix[0], "付録の例"))
        if diag:
            picks.append((diag[0], "診断ページの例"))

    # 重複を外し、6ページまでに収める
    seen = set()
    out = []
    for idx, label in picks:
        if idx in seen or not (0 <= idx < doc.page_count):
            continue
        seen.add(idx)
        out.append((idx, label))
    return out[:6]


def notice_page(doc: fitz.Document, src_page: fitz.Page, title: str) -> None:
    page = doc.new_page(width=src_page.rect.width, height=src_page.rect.height)
    x, y = 56, 86
    page.insert_text((x, y), NOTICE_TITLE, fontname=NOTICE_FONT, fontsize=17, color=(0.14, 0.22, 0.36))
    page.draw_line(fitz.Point(x, y + 13), fitz.Point(page.rect.width - x, y + 13), color=(0.86, 0.85, 0.82), width=1)
    page.insert_textbox(
        fitz.Rect(x, y + 34, page.rect.width - x, y + 70),
        title,
        fontname=NOTICE_FONT,
        fontsize=11.5,
        color=(0.1, 0.11, 0.13),
        lineheight=1.6,
    )
    page.insert_textbox(
        fitz.Rect(x, y + 86, page.rect.width - x, page.rect.height - 90),
        NOTICE_BODY,
        fontname=NOTICE_FONT,
        fontsize=10,
        color=(0.16, 0.18, 0.2),
        lineheight=1.9,
    )
    page.insert_text(
        (x, page.rect.height - 56),
        "yuta-eng.com",
        fontname="helv",
        fontsize=9,
        color=(0.49, 0.51, 0.54),
    )


def build(book: dict, report: list[str]) -> dict | None:
    pdf = interior_pdf(book)
    if not pdf:
        report.append(f"{book['asin']} {book['title']}: ページ数の合う本文PDFが見つからない（{book['pages']}ページ）")
        return None

    doc = fitz.open(pdf)
    toc_index = find_toc_page(doc)
    if toc_index is None:
        report.append(f"{book['asin']} {book['title']}: 目次ページが見つからない")
        doc.close()
        return None
    entries = parse_toc(doc, toc_index)
    offset = page_number_offset(doc)
    if not entries or offset is None:
        report.append(f"{book['asin']} {book['title']}: 目次かノンブルが読めない")
        doc.close()
        return None

    sec = Sections(entries, offset, doc.page_count)
    picks = pick_pages(doc, book, sec, toc_index)
    if len(picks) < 4:
        report.append(f"{book['asin']} {book['title']}: 抜粋が{len(picks)}ページしか選べない")
        doc.close()
        return None

    out = OUT_DIR / book["asin"]
    out.mkdir(parents=True, exist_ok=True)
    for old in out.glob("*"):
        old.unlink()

    pages = []
    sample = fitz.open()
    notice_page(sample, doc[picks[0][0]], f"{book['fullTitle'].split('：')[0].split(': ')[0]}")
    for n, (idx, label) in enumerate(picks, start=1):
        page = doc[idx]
        zoom = IMG_WIDTH / page.rect.width
        pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False)
        img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
        name = f"p{n}.webp"
        img.save(out / name, "WEBP", quality=IMG_QUALITY, method=6)
        sample.insert_pdf(doc, from_page=idx, to_page=idx)
        pages.append(
            {
                "file": f"/samples/{book['asin']}/{name}",
                "label": label,
                "section": sec.label_of(idx),
                "page": idx + 1 - offset,  # 書籍に印刷されているページ番号
                "width": pix.width,
                "height": pix.height,
            }
        )
    sample.save(out / "sample.pdf", garbage=4, deflate=True, clean=True)
    sample.close()
    doc.close()

    # 問題・解説・採点基準が同じ回（章）から出ていないかを確かめる。
    # 同じ大問の「問題・解答・採点基準」が揃って見えないようにするための線引き。
    origin = {}
    for pg in pages:
        kind = pg["label"].replace("の例", "").replace("（続き）", "")
        if kind in ("問題", "解説", "採点基準"):
            origin.setdefault(kind, set()).add(re.sub(r"(予想問題|問題|解答・解説|解答|解説|採点基準)$", "", pg["section"]))
    rounds = [list(v)[0] for v in origin.values() if len(v) == 1]
    if len(rounds) != len(set(rounds)):
        report.append(f"{book['asin']} {book['title']}: 問題・解説・採点基準が同じ回から出ている（{rounds}）")

    return {"asin": book["asin"], "pdf": f"/samples/{book['asin']}/sample.pdf", "pages": pages}


def main() -> int:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    only = sys.argv[1:] or None

    report: list[str] = []
    samples = {}
    for book in BOOKS.values():
        if only and book["asin"] not in only:
            continue
        got = build(book, report)
        if got:
            samples[book["asin"]] = got

    if only:
        for asin, s in samples.items():
            print(asin, [(p["label"], p["page"]) for p in s["pages"]])
        return 0

    DATA_OUT.write_text(f"{json.dumps(samples, ensure_ascii=False, indent=2)}\n", encoding="utf-8")
    total = sum(len(s["pages"]) for s in samples.values())
    size = sum(f.stat().st_size for f in OUT_DIR.rglob("*") if f.is_file())
    print(f"試し読み: {len(samples)} 冊 / {total} ページ / {size / 1024 / 1024:.1f} MB")
    if report:
        print(f"\n作れなかった本 {len(report)} 冊:")
        for r in report:
            print("  -", r)
    return 0


if __name__ == "__main__":
    sys.exit(main())
