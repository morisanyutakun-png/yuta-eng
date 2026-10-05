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
  ・中身の手ざわりがいちばん伝わるのは「試験の扉」と「問題」なので、そこを厚くする。
    扉1ページ＋問題2ページ＋解答1ページの4ページを基本にする
    （診断模試だけは、その本の売りである診断ページを1ページ足す）
  ・目次・本書の使い方・採点基準は入れない。サンプルとしては重く、手ざわりが伝わりにくい
  ・扉・問題・解答は、わざとすべて別の回（別の章）から採る。
    同じ大問の「問題・解答・詳解・採点基準」が揃わないようにするため
  ・1回分・1章分をまとめて出さない（どの回も、そのページ全部は出さない）
  ・ページの途中で切らない（ページ単位でそのまま写す）

版の取り違えを防ぐため、
  ・表紙ページの巻表示（Vol.N／第N巻）が data/books.json の巻と一致すること
  ・本文PDF のページ数が Amazon の表示と一致すること（KDP の表示が2ページまで
    ずれている巻があるので、その差は許して報告する）
の両方を満たす本文PDF だけを対象にする。
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
    "扉・問題・解答などを、それぞれ別の箇所から抜き出して並べています。\n"
    "連続したページではありません。\n\n"
    "書籍でのページ番号は、各ページの下部または上部にあります。\n"
    "扉のように番号の入らないページもあります。\n"
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


# 表紙ページに刷られている巻表示。巻の取り違えはこれで止める
VOL_MARK = re.compile(r"(?:Vol\.?\s*(\d+)|第\s*(\d+)\s*巻)")
PAGE_SLACK = 2  # KDP の「ページ数」表示が組版と数ページずれている巻がある


def interior_pdf(book: dict, report: list[str]) -> Path | None:
    """その巻の本文PDF。巻表示とページ数で、別の巻・古い版を取り違えないようにする。"""
    if book["series"] == "gokaku":
        rel = MANUSCRIPTS.get(book["slug"], {}).get("volumes", {}).get(str(book["vol"]))
    else:
        rel = SERIES_DIRS.get(book["slug"])
    if not rel:
        return None
    d = HOME / rel
    cands = [p for p in sorted(d.glob("*_KDP_B5_interior.pdf")) if "outlined" not in p.name]
    cands += [d / "main_b5.pdf", d / "main.pdf"]  # 入稿名でない巻の控え
    near = None
    for p in cands:
        if not p.exists():
            continue
        try:
            with fitz.open(p) as doc:
                cover = re.sub(r"\s+", "", doc[0].get_text())[:200]
                m = VOL_MARK.search(cover)
                vol = int(m.group(1) or m.group(2)) if m else 1
                gap = abs(doc.page_count - book["pages"])
                if vol != book["vol"]:
                    continue  # 別の巻の PDF
                if gap == 0:
                    return p
                if gap <= PAGE_SLACK and near is None:
                    near = (p, doc.page_count)
        except Exception:  # noqa: BLE001
            continue
    if near:
        report.append(
            f"{book['asin']} {book['title']}: 本文PDF {near[1]}ページ / Amazon の表示 {book['pages']}ページ"
            f"（{PAGE_SLACK}ページまでの差は同じ版として扱った）"
        )
        return near[0]
    return None


def flat(s: str) -> str:
    return re.sub(r"\s+", " ", s)


def find_toc_page(doc: fitz.Document) -> int | None:
    for i in range(min(6, doc.page_count)):
        if flat(doc[i].get_text()).strip().startswith("目次"):
            return i
    return None


# 目次の項目の始まり。見出しの文字は項目ごとに違うので、始まりだけを拾って
# 「次の項目の始まりまで」をひとかたまりとして扱う。
#   「第1 回予想問題 8」「第1 回オリジナル模試 5」
#   「第1 回解答・解説（1・2・3） 16」  ← 見出しの中に数字が入る
#   「第1 回予想問題 . . . . . . . 7」  ← 点線リーダーが入る
#   「付録C 5 回分の設計 163」          ← 見出しの先頭に数字が来る
TOC_HEAD = re.compile(r"はじめに|第\s*\d+\s*[回章]|付録\s*[A-Z]|最終判定")


def parse_toc(doc: fitz.Document, toc_index: int) -> list[tuple[str, int]]:
    """目次から「見出し → 書籍のページ番号」を読む。

    ページ番号は、その項目のかたまりに出てくる数字のうち最後のものを採る。
    「付録C 5 回分の設計 163」のように見出しのほうに数字が入っていても取り違えないため。
    さらに、目次のページ番号は必ず増えていくので、前の項目より小さい数は捨てる。
    """
    text = flat(doc[toc_index].get_text())
    text = re.sub(r"(?:[.．·]\s*){2,}", " ", text)  # 点線リーダー（「. . . .」を含む）を外す
    heads = list(TOC_HEAD.finditer(text))
    entries: list[tuple[str, int]] = []
    for i, m in enumerate(heads):
        chunk = text[m.end() : heads[i + 1].start() if i + 1 < len(heads) else len(text)]
        nums = [int(n) for n in re.findall(r"\d+", chunk)]
        prev = entries[-1][1] if entries else 0
        page = next((n for n in reversed(nums) if n > prev), None)
        if page is None:
            continue
        label = re.sub(r"[\s.．]+", "", m.group(0) + re.sub(r"\d+\s*$", "", chunk)).strip("・")
        entries.append((label, page))
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


def printed_number(doc: fitz.Document, index: int, offset: int) -> int:
    """そのページに刷られているページ番号。扉のように番号のないページは 0。"""
    n = index + 1 - offset
    page = doc[index]
    r = page.rect
    bands = (
        page.get_text("text", clip=fitz.Rect(0, r.height - 48, r.width, r.height)),
        page.get_text("text", clip=fitz.Rect(0, 0, r.width, 48)),
    )
    return n if any(str(n) in re.findall(r"\d+", b) for b in bands) else 0


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


# 問題そのものではないページ（扉・確認事項・白紙）
NOT_PROBLEM = re.compile(r"注意事項|試験開始の合図|この章の確認事項|この章で[^。]{0,8}が要求|この章の問題")

def content_pages(doc: fitz.Document, span: tuple[int, int]) -> list[int]:
    """範囲の中で、実際に問題が刷られているページ。扉・確認事項・解答用紙・白紙は外す。"""
    out = []
    for i in range(span[0], span[1] + 1):
        t = flat(doc[i].get_text()).strip()
        if len(t) < 100 or NOT_PROBLEM.search(t[:400]):
            continue
        if "解答用紙" in t[:24]:  # 書き込み用の解答用紙
            continue
        out.append(i)
    return out


def middling(doc: fitz.Document, idxs: list[int]) -> int:
    """分量が中くらいのページ。いちばん余白の多いページも、いちばん詰まったページも避ける。"""
    ranked = sorted(idxs, key=lambda i: len(flat(doc[i].get_text())))
    return ranked[len(ranked) // 2]


def solution_page(doc: fitz.Document, span: tuple[int, int]) -> int:
    """解答・解説の、大問の頭から始まるページ。途中から始まるページを避ける。"""
    return first_page_starting_with(doc, span, r"(\d+-\d+|第\s*\d+)") or span[0]


def by_unit(sec: Sections) -> dict[int, dict[str, tuple[int, int]]]:
    """目次を「第N回／第N章 → 種類 → ページ範囲」に畳む。"""
    out: dict[int, dict[str, tuple[int, int]]] = {}
    for label, start, end in sec.items:
        m = re.match(r"第(\d+)[回章]", label)
        if not m:
            continue
        kind = (
            "採点基準" if "採点基準" in label
            else "診断" if "診断" in label
            else "解答" if ("解答" in label or "解説" in label)
            else "問題"  # 「第2回予想問題」「第2章場合の数と確率」
        )
        out.setdefault(int(m.group(1)), {}).setdefault(kind, (start, end))
    return out


def pick_pages(doc: fitz.Document, book: dict, sec: Sections) -> list[tuple[int, str, str, str]]:
    """抜粋するページ（PDF のページ番号, 表示する見出し, 種類）を決める。

    扉1・問題2・解答1 を基本にし、扉・問題・解答はすべて別の回（章）から採る。
    どの回も「そのページ全部」は出さないので、1回分がまるごと見える状態にはならない。
    """
    units = by_unit(sec)
    unit = "章" if any(re.match(r"第\d+章", label) for label, _, _ in sec.items) else "回"

    used: set[int] = set()
    covers: dict[int, str] = {}  # 目次の範囲の外にある扉 → その回の節の名前
    # 文系の本などでは、1回分の問題が実質1ページに収まっている。
    # そういう回は1ページ出すと「その回の問題を丸ごと」になるので、2回分までに限る。
    # （どの本も問題のページは2枚見せたい。その回の解答・採点基準は出さない）
    whole_left = 2

    def take_problem(prefer: int, as_cover: bool) -> tuple[int, int, bool] | None:
        """問題のページを1枚。as_cover なら、その回の1ページ目（扉）を採る。

        返すのは（回／章の番号, PDF のページ, そのページが扉かどうか）。
        1ページ目に問題が刷られている本（問題紙に第1問から載る本）もあるので、
        扉かどうかは「問題の刷られたページに数えたか」で決める。
        """
        nonlocal whole_left
        for n in [prefer] + [k for k in sorted(units) if k != prefer]:
            if n in used or "問題" not in units.get(n, {}):
                continue
            span = units[n]["問題"]
            body = content_pages(doc, span)
            rest = [i for i in body if i != span[0]]
            if not rest and whole_left <= 0:
                continue  # 1ページ出すとその回の問題が丸ごと見えてしまう
            used.add(n)
            if not rest:
                whole_left -= 1
            if not as_cover:
                return n, middling(doc, rest) if rest else span[0], False
            # 試験の扉はノンブルを持たないことがあり、目次のページ番号は
            # 問題の1ページ目を指す。1つ前のページが、その回の扉かどうかを見る。
            prev = span[0] - 1
            if prev >= 0:
                head = flat(doc[prev].get_text())[:300]
                if re.search(rf"第\s*{n}\s*[回章]", head) and NOT_PROBLEM.search(head):
                    # 扉は目次の範囲の1つ手前にあるので、節の名前はその回のものを使う
                    covers[prev] = sec.label_of(span[0])
                    return n, prev, True
            return n, span[0], span[0] not in body
        return None

    def take(kind: str, prefer: int) -> tuple[int, tuple[int, int]] | None:
        for n in [prefer] + [k for k in sorted(units) if k != prefer]:
            if n in used or kind not in units.get(n, {}):
                continue
            used.add(n)
            return n, units[n][kind]
        return None

    cover = take_problem(2, as_cover=True)
    prob1 = take_problem(4, as_cover=False)
    prob2 = take_problem(5, as_cover=False)
    ans = take("解答", 3)

    picks: list[tuple[int, str, str]] = []
    if cover:
        n, idx, is_tobira = cover
        label = "章扉" if unit == "章" else "試験の扉" if is_tobira else "問題紙"
        picks.append((idx, f"第{n}{unit} {label}", "扉"))
    for got in (prob1, prob2):
        if got:
            picks.append((got[1], f"第{got[0]}{unit} 問題", "問題"))
    if ans:
        n, span = ans
        picks.append((solution_page(doc, span), f"第{n}{unit} 解答・解説", "解答"))

    if book["series"] == "shindan":
        used.discard(1)
        diag = take("診断", 1)
        if diag:
            n, span = diag
            picks.append((span[0], f"第{n}{unit} 診断ページ", "診断"))

    # 4ページに届かないとき（回数の少ない本）は、解答の続きで足す。
    # 解答・解説は10ページ以上あるので、1ページ足しても1回分が揃うことはない
    if ans:
        n, span = ans
        nxt = solution_page(doc, span) + 1
        while len(picks) < 4 and nxt <= span[1]:
            picks.append((nxt, f"第{n}{unit} 解答・解説（続き）", "解答"))
            nxt += 1

    # 重複を外し、6ページまでに収める
    seen = set()
    out = []
    for idx, label, kind in picks:
        if idx in seen or not (0 <= idx < doc.page_count):
            continue
        seen.add(idx)
        out.append((idx, label, kind, covers.get(idx) or sec.label_of(idx)))
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
    pdf = interior_pdf(book, report)
    if not pdf:
        report.append(f"{book['asin']} {book['title']}: 版の合う本文PDFが見つからない（{book['pages']}ページ）")
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
    picks = pick_pages(doc, book, sec)
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
    for n, (idx, label, kind, section) in enumerate(picks, start=1):
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
                "kind": kind,
                "section": section,
                "page": printed_number(doc, idx, offset),  # 書籍に印刷されているページ番号
                "width": pix.width,
                "height": pix.height,
            }
        )

    # 扉・問題・解答が同じ回（章）から出ていないかを確かめる。
    # 同じ大問の「問題・解答・詳解」が揃って見えないようにするための線引き。
    origin: dict[str, set[str]] = {}
    for pg in pages:
        if pg["kind"] in ("扉", "問題", "解答"):
            origin.setdefault(pg["kind"], set()).add(re.match(r"第\d+[回章]", pg["label"]).group(0))
    units = [u for v in origin.values() for u in v]
    if len(units) != len(set(units)):
        report.append(f"{book['asin']} {book['title']}: 扉・問題・解答が同じ回から出ている（{units}）")

    # 1回分（1章分）がまとめて見える状態になっていないことを確かめる。
    #   ・ひとつの回から2ページ以上は出さない
    #   ・問題のページが丸ごと見えてしまう回は、多くても2つ
    per_unit: dict[str, list[str]] = {}
    for pg in pages:
        per_unit.setdefault(re.match(r"第\d+[回章]", pg["label"]).group(0), []).append(pg["kind"])
    for unit, kinds in per_unit.items():
        if len([k for k in kinds if k != "解答"]) > 1 or len(set(kinds)) > 1:
            report.append(f"{book['asin']} {book['title']}: {unit}から{len(kinds)}ページ出している（{kinds}）")
    whole = 0
    for (idx, _, kind, _section) in picks:
        if kind not in ("扉", "問題"):
            continue
        for _, start, end in sec.items:
            if start <= idx <= end and content_pages(doc, (start, end)) == [idx]:
                whole += 1  # その回の問題が刷られたページは、これ1枚しかない
    if whole > 2:
        report.append(f"{book['asin']} {book['title']}: 問題を丸ごと出している回が{whole}つある")

    sample.save(out / "sample.pdf", garbage=4, deflate=True, clean=True)
    sample.close()
    doc.close()

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
