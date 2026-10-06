#!/usr/bin/env python3
"""手元にある「実物の入試問題冊子」を棚卸しして data/originals.json に書き出す。

`npm run data:originals` で実行する。解説を書くときに読んでよい原典は、
このファイルに載っているものだけ。ここを通さずに PDF を開かない。

なぜ要るか
  ホームディレクトリには、実物の問題冊子のスキャンと、他社がつくった解答解説が
  混ざって置いてある。見た目では区別がつかないので、機械で選り分けて記録に残す。

    使う   … 実物の入試問題冊子のスキャン。画像だけでできていて、文字が取れない
    使わない … 「◯◯大学 YYYY年度 数学解答｜東進」「…｜旺文社 入試正解デジタル」
              「解答.pdf」「解答解説.pdf」など、他社の解答解説
    使わない … 自分の教材（予想問題集・完成演習）の組版ファイル

判定のしかた
  ・ファイル名に他社名・「解答」「解説」が入っていたら外す
  ・自分の教材の名前（KDP 入稿名・予想問題集など）が入っていたら外す
  ・本文から文字が取れるものは外す。実物のスキャンは画像なので文字が取れない
    （取れるものは、他社サイトを印刷した PDF か、自分で組んだ PDF のどちらか）
  ・念のため、取れた文字に他社名が混じっていないかも見る

出力は「サイトの slug → 年度 → ファイル」。年度はファイル名から拾う。
"""
import json
import os
import re
import sys
from pathlib import Path

import fitz  # PyMuPDF

ROOT = Path(__file__).resolve().parent.parent
HOME = Path(os.environ.get("HOME", "/Users/moriyuuta"))
OUT = ROOT / "data" / "originals.json"

# 他社の解答解説。名前に出たら使わない
THIRD_PARTY = re.compile(r"東進|旺文社|河合|駿台|代ゼミ|教学社|赤本|Z会|ベネッセ|パスナビ|入試正解")
# 自分の教材の組版ファイル
OWN_MATERIAL = re.compile(
    r"KDP|_cover|^cover|^main|interior|compat|予想問題|完成演習|kansei|shindan|"
    r"mock|_sets|part\d+of\d+|_problems|_solutions|vol\d|sugaku_20\d\d|gpt用",
    re.I,
)
# 解答・解説そのもの
ANSWER_FILE = re.compile(r"解答|解説|研究|ryakkai|answer", re.I)
# 数学以外（物理・英語・生物など）が名前に出るもの
OTHER_SUBJECT = re.compile(r"物理|化学|生物|地学|英語|国語|小論文|情報|日本史|世界史|地理")

YEAR = re.compile(r"(19|20)\d{2}")


def meta() -> dict[str, dict]:
    """scripts/university-meta.mjs の「フォルダ名 → slug」。"""
    src = (ROOT / "scripts" / "university-meta.mjs").read_text(encoding="utf-8")
    out = {}
    for m in re.finditer(r"^\s{2}([^\s:]+):\s*\{\s*slug:\s*\"([^\"]+)\"", src, re.M):
        out[m.group(1)] = m.group(2)
    return out


def looks_like_booklet(path: Path) -> tuple[bool, str]:
    """実物の問題冊子らしいか。だめなときは理由を返す。"""
    name = path.name
    if THIRD_PARTY.search(name):
        return False, "他社の解答解説"
    if OWN_MATERIAL.search(name):
        return False, "自分の教材の組版ファイル"
    if ANSWER_FILE.search(name):
        return False, "解答・解説のファイル"
    if OTHER_SUBJECT.search(name):
        return False, "数学以外の科目"
    if not YEAR.search(name):
        return False, "年度が読み取れない"
    try:
        with fitz.open(path) as doc:
            if doc.page_count == 0:
                return False, "中身がない"
            text = "".join(doc[i].get_text() for i in range(min(4, doc.page_count)))
    except Exception as e:  # noqa: BLE001
        return False, f"開けない（{e}）"
    if THIRD_PARTY.search(text):
        return False, "本文に他社名が入っている"
    # 実物のスキャンは画像なので文字が取れない。取れるものは出所が別にある
    if len(text.strip()) > 80:
        return False, "文字が取れる（スキャンではない）"
    return True, ""


def main() -> int:
    slugs = meta()
    # 1年度に複数の冊子があることがある。三重大の数学①②③（学部ごとに別問題）、
    # 千葉工大の試験日ごと、東京理科大の 100 分・80 分、弘前大の理系・文系などは
    # どれも**別の試験**なので、1つに絞ると残りを見落とす。だから値は必ずリストにする。
    found: dict[str, dict[str, list[str]]] = {}
    skipped: dict[str, int] = {}
    folders_missing = []
    multi: list[str] = []

    for folder, slug in sorted(slugs.items()):
        d = HOME / folder
        if not d.is_dir():
            folders_missing.append(folder)
            continue
        per_year: dict[str, list[Path]] = {}
        for p in sorted(d.glob("*.pdf")):
            ok, why = looks_like_booklet(p)
            if not ok:
                skipped[why] = skipped.get(why, 0) + 1
                continue
            per_year.setdefault(YEAR.search(p.name).group(0), []).append(p)

        for year, paths in sorted(per_year.items()):
            pages = {}
            for p in paths:
                with fitz.open(p) as doc:
                    pages[p] = doc.page_count
            # 表紙だけ、途中までといった断片は落とす。別の試験なら
            # ページ数は近いので、最大の半分未満のものだけを切る。
            top = max(pages.values())
            keep = [p for p in paths if pages[p] * 2 >= top]
            for p in paths:
                if p not in keep:
                    skipped["同じ年度の断片（ページ数が半分未満）"] = (
                        skipped.get("同じ年度の断片（ページ数が半分未満）", 0) + 1
                    )
            found.setdefault(slug, {})[year] = [str(p.relative_to(HOME)) for p in keep]
            if len(keep) > 1:
                multi.append(f"{slug} {year}: " + "、".join(p.name for p in keep))

    OUT.write_text(
        json.dumps({s: dict(sorted(v.items())) for s, v in sorted(found.items())}, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    total = sum(len(v) for v in found.values())
    files = sum(len(ps) for v in found.values() for ps in v.values())
    years = sorted({y for v in found.values() for y in v})
    print(f"原典（実物の問題冊子）: {len(found)} 区分 / {total} 年度分 / {files} 冊")
    print(f"年度の範囲: {years[0]}〜{years[-1]}" if years else "年度なし")
    print("\n使わなかったもの:")
    for why, n in sorted(skipped.items(), key=lambda kv: -kv[1]):
        print(f"  {n:4} 件  {why}")
    if folders_missing:
        print(f"\nフォルダが見つからない slug: {len(folders_missing)} 件")
    if multi:
        # 同じ年度に複数の冊子がある組み合わせは必ず出す。黙って1つに絞ると、
        # 学部別・試験日別の問題をまるごと1つ見落とす。
        print(f"\n同じ年度に複数の冊子がある（どれも別の試験）: {len(multi)} 件")
        for line in multi:
            print(f"  {line}")
    missing = [s for s in set(slugs.values()) if s not in found]
    if missing:
        print(f"\n原典が1年度も見つからない区分 {len(missing)} 件:")
        print("  " + " ".join(sorted(missing)))
    return 0


if __name__ == "__main__":
    sys.exit(main())
