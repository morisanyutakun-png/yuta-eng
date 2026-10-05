import type { Source } from "@/lib/solutions/types";

/**
 * 原典（大学公式の問題公開ページ）の台帳。
 *
 * ここに載っているのは、こちらでページを開いて「その年度・その科目の問題が実際に置いてある」
 * ことを確かめたものだけ。見つからなかった大学は書かない（リンクを作らない）。
 *
 * 分かったこと（2026-10-05 時点）
 *   ・問題を公式に公開している大学でも、載っているのは**直近1〜3年度分**であることが多い。
 *     名古屋大学は令和8年度しか残っておらず、令和7・令和6年度のページは目次にリンクが
 *     あるまま 404 になっている。2019年度まで遡れる大学は、いまのところ見つかっていない。
 *   ・大学によっては、著作権の処理が済んだ科目だけを載せ、残りは出題意図だけにしている。
 *   ・問題そのものではなく「出題意図」だけの大学もある。出題意図は大学の文章なので、
 *     当サイトでは引用も要約もしない。
 *
 * `universityRequest` は、その大学が自分のサイトで求めている手続きを**事実として**書き留める欄。
 * 法律上の義務とは切り分ける。こちらから大学へ連絡はしない。
 */

/** slug → 年度 → 原典。年度がない大学は、その年度の解説ページを作らない。 */
export const sources: Record<string, Record<number, Source>> = {
  "nagoya-rikei": {
    2026: {
      url: "https://www.nagoya-u.ac.jp/admissions/exam/data/answer/sub/post_642.html",
      publisher: "名古屋大学",
      pageTitle: "令和８年度一般選抜（前期日程）の試験問題および正解・解答例等",
      kind: "page",
      checked: "2026-10-05",
      universityRequest:
        "入試問題の2次利用（問題集・参考書への掲載、塾のテキスト化、インターネット上での公開）について、" +
        "出所の明示と「入学試験問題利用報告書」の提出を求める旨が、大学のサイトに書かれている。",
    },
  },
  "nagoya-bunkei": {
    2026: {
      url: "https://www.nagoya-u.ac.jp/admissions/exam/data/answer/sub/post_642.html",
      publisher: "名古屋大学",
      pageTitle: "令和８年度一般選抜（前期日程）の試験問題および正解・解答例等",
      kind: "page",
      checked: "2026-10-05",
      universityRequest:
        "入試問題の2次利用（問題集・参考書への掲載、塾のテキスト化、インターネット上での公開）について、" +
        "出所の明示と「入学試験問題利用報告書」の提出を求める旨が、大学のサイトに書かれている。",
    },
  },
  "kyodai-rikei": {
    2026: {
      url: "https://www.kyoto-u.ac.jp/ja/admissions/undergrad/past-eq/r8-eq",
      publisher: "京都大学",
      pageTitle: "令和8年度「試験問題」及び「解答又は解答例等及び出題意図」",
      kind: "page",
      checked: "2026-10-05",
      universityRequest: "試験問題等の利用について、大学が別ページで条件を示している。",
    },
    2025: {
      url: "https://www.kyoto-u.ac.jp/ja/admissions/undergrad/past-eq/r7-eq",
      publisher: "京都大学",
      pageTitle: "令和7年度 試験問題および出題意図等",
      kind: "page",
      checked: "2026-10-05",
      universityRequest: "試験問題等の利用について、大学が別ページで条件を示している。",
    },
  },
  "kyodai-bunkei": {
    2026: {
      url: "https://www.kyoto-u.ac.jp/ja/admissions/undergrad/past-eq/r8-eq",
      publisher: "京都大学",
      pageTitle: "令和8年度「試験問題」及び「解答又は解答例等及び出題意図」",
      kind: "page",
      checked: "2026-10-05",
      universityRequest: "試験問題等の利用について、大学が別ページで条件を示している。",
    },
    2025: {
      url: "https://www.kyoto-u.ac.jp/ja/admissions/undergrad/past-eq/r7-eq",
      publisher: "京都大学",
      pageTitle: "令和7年度 試験問題および出題意図等",
      kind: "page",
      checked: "2026-10-05",
      universityRequest: "試験問題等の利用について、大学が別ページで条件を示している。",
    },
  },
  "kyudai-rikei": {
    2026: {
      url: "https://www.kyushu-u.ac.jp/ja/admission/faculty/exam_question",
      publisher: "九州大学",
      pageTitle: "試験問題、解答例等について",
      kind: "page",
      checked: "2026-10-05",
      universityRequest: "大学のサイトに、試験問題の利用についての記載がある。",
    },
    2025: {
      url: "https://www.kyushu-u.ac.jp/ja/admission/faculty/exam_question",
      publisher: "九州大学",
      pageTitle: "試験問題、解答例等について",
      kind: "page",
      checked: "2026-10-05",
      universityRequest: "大学のサイトに、試験問題の利用についての記載がある。",
    },
  },
  "kyudai-bunkei": {
    2026: {
      url: "https://www.kyushu-u.ac.jp/ja/admission/faculty/exam_question",
      publisher: "九州大学",
      pageTitle: "試験問題、解答例等について",
      kind: "page",
      checked: "2026-10-05",
      universityRequest: "大学のサイトに、試験問題の利用についての記載がある。",
    },
    2025: {
      url: "https://www.kyushu-u.ac.jp/ja/admission/faculty/exam_question",
      publisher: "九州大学",
      pageTitle: "試験問題、解答例等について",
      kind: "page",
      checked: "2026-10-05",
      universityRequest: "大学のサイトに、試験問題の利用についての記載がある。",
    },
  },
  "handai-rikei": {
    2026: {
      url: "https://www.osaka-u.ac.jp/ja/admissions/faculty/general/pastexam-answer/r8",
      publisher: "大阪大学",
      pageTitle: "令和８年度入試の問題・解答例等",
      kind: "page",
      checked: "2026-10-05",
      universityRequest: "「大阪大学入試問題等の利用について」という文書が、同じページから配られている。",
    },
  },
  "handai-bunkei": {
    2026: {
      url: "https://www.osaka-u.ac.jp/ja/admissions/faculty/general/pastexam-answer/r8",
      publisher: "大阪大学",
      pageTitle: "令和８年度入試の問題・解答例等",
      kind: "page",
      checked: "2026-10-05",
      universityRequest: "「大阪大学入試問題等の利用について」という文書が、同じページから配られている。",
    },
  },
};

/** 原典の調査がどこまで進んだか。利用者向けページには出さず、npm run check と報告に使う。 */
export const sourceSurvey = {
  checkedOn: "2026-10-05",
  /** 公式ページで問題そのものに当たれた大学 */
  confirmed: ["nagoya", "kyodai", "kyudai", "handai"],
  /**
   * まだ当たれていない大学。「公開していない」と確かめたわけではなく、
   * この作業の時点で公式の公開先を特定できていないという意味。
   */
  pending: "上記以外のすべて（サイトに載せている44大学・64区分のうち、4大学8区分を除く全部）",
  notes: [
    "公式に公開している大学でも、残っているのは直近1〜3年度分であることが多い。2019年度まで遡れる大学は見つかっていない。",
    "名古屋大学は、目次に令和7・令和6年度へのリンクが残っているが、リンク先は 404 になっている。",
    "ホームディレクトリにある過去問資料は、すべて他社（東進）の過去問データベースの PDF で、原典ではない。解説の materials には使っていない。",
  ],
} as const;
