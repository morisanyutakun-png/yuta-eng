import type { Source } from "@/lib/solutions/types";

/**
 * 問題をどこで見てもらうかの台帳。
 *
 * 当サイトは問題を1文字も載せない。だからここに書くのは
 * 「大学自身が公開していてリンクを張れるか／張れないか」だけ。
 * 張れないときは `kind: "none"` にして、リンクを作らずに赤本などで見てもらう。
 * 問題を転載している非公式サイトへはリンクしないので、そういう行き先は書かない。
 *
 * 分かったこと（2026-10-05 時点）
 *   ・公式に公開している大学でも、載っているのは直近1〜3年度分であることが多い。
 *     2019年度まで遡れる大学は見つかっていない
 *   ・名古屋大学は令和8年度しか残っておらず、令和7・令和6年度は目次にリンクが
 *     あるまま 404 になっている
 *   ・公開していても、著作権の処理が済んだ科目だけだったり、問題は出さず
 *     出題意図だけ、という大学もある。出題意図は大学の文章なので引用も要約もしない
 */

/** slug → 年度 → 問題の見てもらい方。ここにない年度は解説ページを作らない。 */
export const sources: Record<string, Record<number, Source>> = {
  "nagoya-rikei": {
    2026: {
      kind: "official",
      url: "https://www.nagoya-u.ac.jp/admissions/exam/data/answer/sub/post_642.html",
      publisher: "名古屋大学",
      pageTitle: "令和８年度一般選抜（前期日程）の試験問題および正解・解答例等",
      target: "page",
      checked: "2026-10-05",
      note:
        "入試問題の2次利用（問題集・参考書への掲載、塾のテキスト化、インターネット上での公開）に、" +
        "出所明示と利用報告書の提出を求める旨が大学サイトにある。当サイトは問題を載せないので、この条件を踏まない。",
    },
    2025: { kind: "none", checked: "2026-10-05", note: "名古屋大学が公開しているのは令和8年度分のみ。令和7・令和6年度のページは目次にリンクが残っているが 404。" },
    2024: { kind: "none", checked: "2026-10-05", note: "名古屋大学が公開しているのは令和8年度分のみ。令和7・令和6年度のページは目次にリンクが残っているが 404。" },
  },
  "nagoya-bunkei": {
    2026: {
      kind: "official",
      url: "https://www.nagoya-u.ac.jp/admissions/exam/data/answer/sub/post_642.html",
      publisher: "名古屋大学",
      pageTitle: "令和８年度一般選抜（前期日程）の試験問題および正解・解答例等",
      target: "page",
      checked: "2026-10-05",
      note:
        "入試問題の2次利用（問題集・参考書への掲載、塾のテキスト化、インターネット上での公開）に、" +
        "出所明示と利用報告書の提出を求める旨が大学サイトにある。当サイトは問題を載せないので、この条件を踏まない。",
    },
    2025: { kind: "none", checked: "2026-10-05", note: "名古屋大学が公開しているのは令和8年度分のみ。令和7・令和6年度のページは目次にリンクが残っているが 404。" },
    2024: { kind: "none", checked: "2026-10-05", note: "名古屋大学が公開しているのは令和8年度分のみ。令和7・令和6年度のページは目次にリンクが残っているが 404。" },
  },
  "kyodai-rikei": { 2026: {
      kind: "official",
      url: "https://www.kyoto-u.ac.jp/ja/admissions/undergrad/past-eq/r8-eq",
      publisher: "京都大学",
      pageTitle: "令和8年度「試験問題」及び「解答又は解答例等及び出題意図」",
      target: "page",
      checked: "2026-10-05",
      note: "試験問題等の利用について、大学が別ページで条件を示している。",
    }, 2025: {
      kind: "official",
      url: "https://www.kyoto-u.ac.jp/ja/admissions/undergrad/past-eq/r7-eq",
      publisher: "京都大学",
      pageTitle: "令和7年度 試験問題および出題意図等",
      target: "page",
      checked: "2026-10-05",
      note: "試験問題等の利用について、大学が別ページで条件を示している。",
    } },
  "kyodai-bunkei": { 2026: {
      kind: "official",
      url: "https://www.kyoto-u.ac.jp/ja/admissions/undergrad/past-eq/r8-eq",
      publisher: "京都大学",
      pageTitle: "令和8年度「試験問題」及び「解答又は解答例等及び出題意図」",
      target: "page",
      checked: "2026-10-05",
      note: "試験問題等の利用について、大学が別ページで条件を示している。",
    }, 2025: {
      kind: "official",
      url: "https://www.kyoto-u.ac.jp/ja/admissions/undergrad/past-eq/r7-eq",
      publisher: "京都大学",
      pageTitle: "令和7年度 試験問題および出題意図等",
      target: "page",
      checked: "2026-10-05",
      note: "試験問題等の利用について、大学が別ページで条件を示している。",
    } },
  "kyudai-rikei": { 2026: {
      kind: "official",
      url: "https://www.kyushu-u.ac.jp/ja/admission/faculty/exam_question",
      publisher: "九州大学",
      pageTitle: "試験問題、解答例等について",
      target: "page",
      checked: "2026-10-05",
      note: "大学サイトに試験問題の利用についての記載がある。",
    }, 2025: {
      kind: "official",
      url: "https://www.kyushu-u.ac.jp/ja/admission/faculty/exam_question",
      publisher: "九州大学",
      pageTitle: "試験問題、解答例等について",
      target: "page",
      checked: "2026-10-05",
      note: "大学サイトに試験問題の利用についての記載がある。",
    } },
  "kyudai-bunkei": { 2026: {
      kind: "official",
      url: "https://www.kyushu-u.ac.jp/ja/admission/faculty/exam_question",
      publisher: "九州大学",
      pageTitle: "試験問題、解答例等について",
      target: "page",
      checked: "2026-10-05",
      note: "大学サイトに試験問題の利用についての記載がある。",
    }, 2025: {
      kind: "official",
      url: "https://www.kyushu-u.ac.jp/ja/admission/faculty/exam_question",
      publisher: "九州大学",
      pageTitle: "試験問題、解答例等について",
      target: "page",
      checked: "2026-10-05",
      note: "大学サイトに試験問題の利用についての記載がある。",
    } },
  "handai-rikei": { 2026: {
      kind: "official",
      url: "https://www.osaka-u.ac.jp/ja/admissions/faculty/general/pastexam-answer/r8",
      publisher: "大阪大学",
      pageTitle: "令和８年度入試の問題・解答例等",
      target: "page",
      checked: "2026-10-05",
      note: "「大阪大学入試問題等の利用について」が同じページから配られている。",
    } },
  "handai-bunkei": { 2026: {
      kind: "official",
      url: "https://www.osaka-u.ac.jp/ja/admissions/faculty/general/pastexam-answer/r8",
      publisher: "大阪大学",
      pageTitle: "令和８年度入試の問題・解答例等",
      target: "page",
      checked: "2026-10-05",
      note: "「大阪大学入試問題等の利用について」が同じページから配られている。",
    } },
};

/** 原典調査の進み具合。画面には出さず、報告のためだけに持つ。 */
export const sourceSurvey = {
  checkedOn: "2026-10-05",
  officialFound: ["名古屋大学（令和8年度のみ）", "京都大学（令和7・8年度）", "九州大学（2025・2026年度）", "大阪大学（令和8年度）"],
  notes: [
    "解説を書くときに読むのは、手元にある実物の入試問題冊子のスキャン。これは原典そのもので、他社の編集物ではない。",
    "ホームディレクトリにある「◯◯大学 YYYY年度 数学解答｜東進」という PDF は、他社（ナガセ）の解答ページを印刷したもの。解説の材料には使わない。",
    "岐阜大の旺文社「入試正解デジタル」PDF、各フォルダの「解答」「解答解説」PDF も同じ理由で使わない。",
  ],
} as const;
