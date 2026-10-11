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
  // 東京大学は出題の意図を公表しているが、問題そのものは公開していない（2026-10-05 確認）
  // 東京科学大学は一般選抜の問題を大学サイトでは公開していない（2026-10-06 確認）
  "kagakudai": {
    2026: {
      kind: "none",
      checked: "2026-10-06",
      note: "旧・東京工業大学。大学サイトに一般選抜前期の数学の問題は見つからなかった。",
    },
  },
  "todai-rikei": {
    2026: {
      kind: "none",
      checked: "2026-10-05",
      note: "東京大学は入試問題そのものをサイトで公開していない。出題の意図は公表しているが、大学の文章なので引用も要約もしない。",
    },
    2025: {
      kind: "none",
      checked: "2026-10-05",
      note: "東京大学は年度によらず入試問題そのものを公開していない。2026年度ぶんを調べたときに、大学のサイト全体の方針として確かめた。",
    },
    2024: {
      kind: "none",
      checked: "2026-10-11",
      note: "東京大学は年度によらず入試問題そのものを公開していない。過去年度のぶんも大学のサイトには置かれていないことを、あらためて確かめた。",
    },
  },
  "todai-bunkei": {
    2026: {
      kind: "none",
      checked: "2026-10-05",
      note: "東京大学は入試問題そのものをサイトで公開していない。出題の意図は公表しているが、大学の文章なので引用も要約もしない。",
    },
  },
  // 東北大学は一般選抜の問題を大学サイトでは公開していない（2026-10-05 確認）
  mie: {
    2026: {
      kind: "official",
      url: "https://www.mie-u.ac.jp/exam/pasttests/pasttests2/post-52.html",
      publisher: "三重大学",
      pageTitle: "令和8年度 一般選抜（前期日程・後期日程）過去問題",
      target: "page",
      checked: "2026-10-06",
      note:
        "問題PDFを区分ごとに公開している（数学①教育・生物資源／数学②医学科・工学部／数学③人文法経・看護）。" +
        "個別のPDFではなく一覧ページへリンクしているのは、公開が過去2年分に限られており、" +
        "年度が進むと直リンクが切れるため。出題意図も公開されているが、当サイトでは読まず引用もしない。" +
        "大学サイトに「入試過去問題の2次利用（無断でコピーをとり配布するなど）は著作権の侵害にあたる」との記載がある。" +
        "当サイトは問題文・図を1つも載せないので複製にあたらない。",
    },
  },
  nitech: {
    2026: {
      kind: "official",
      url: "https://www.nitech.ac.jp/examination/gakubu/test.html",
      publisher: "名古屋工業大学",
      pageTitle: "入学試験過去問題",
      target: "page",
      checked: "2026-10-06",
      note:
        "問題PDFと解答例・出題意図を公開している。掲載は直近3年度分なので、" +
        "年度が進むと直リンクが切れる。だから個別のPDFではなく一覧ページへリンクしている。" +
        "大学の解答例は読んでいないし、言い換えもしていない。当サイトの解答は独自に解いたもの。" +
        "転載・2次利用についての条件は大学サイトに見当たらない。" +
        "いずれにせよ当サイトは問題文・図を1つも載せないので複製にあたらない。",
    },
  },
  uec: {
    2026: {
      kind: "official",
      url: "https://www.uec.ac.jp/education/undergraduate/admission/exam.html",
      publisher: "電気通信大学",
      pageTitle: "過去の入試問題",
      target: "page",
      checked: "2026-10-07",
      note:
        "前期日程の問題と解答例を公開している。掲載は直近3年度分なので、" +
        "年度が進むと直リンクが切れる。個別のPDFではなく一覧ページへリンクした。" +
        "大学の解答例は読んでいないし、言い換えてもいない。当サイトの解答は独自に解いたもの。" +
        "手元のPDFには問題4ページのほかに他社の解答解説と思われるページが続いていたが、" +
        "冊子が「問題用紙は4ページ」と明記しているので、その4ページだけを読んだ。",
    },
  },
  "ncu-med": {
    2026: {
      kind: "official",
      url: "https://www.nagoya-cu.ac.jp/media/R8_zenki_math_med.pdf",
      publisher: "名古屋市立大学",
      pageTitle: "令和8年度 前期日程 医学部 数学",
      target: "pdf",
      checked: "2026-10-06",
      note:
        "「個別学力検査過去問題・解答例」から問題PDFと解答例を直接公開している。" +
        "利用許諾の申請・利用報告書についての記載は大学サイトに見当たらない。" +
        "問題冊子の表紙には「許可なしに転載、複製することを禁じます。」とあるが、" +
        "当サイトは問題文・図を1つも載せないので複製にあたらない。",
    },
  },
  "tohoku-rikei": {
    2026: {
      kind: "none",
      checked: "2026-10-06",
      note: "学部ごとのページに一部の試験問題はあるが、一般選抜前期の数学は見つからなかった。",
    },
  },
  "tohoku-bunkei": {
    2026: {
      kind: "none",
      checked: "2026-10-05",
      note: "学部ごとのページに一部の試験問題はあるが、一般選抜前期の数学は見つからなかった。",
    },
  },
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
