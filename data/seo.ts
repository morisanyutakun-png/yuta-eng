export type SeoCluster = {
  label: string;
  primary: string;
  supporting: string[];
  longTail: string[];
  intent: string;
  route: string;
};

export const seoClusters: SeoCluster[] = [
  {
    label: "教育ICT",
    primary: "学習支援Webアプリ",
    supporting: ["教育ICT", "授業支援", "学習導線", "教材DX"],
    longTail: [
      "学習支援Webアプリ 作り方",
      "教育ICT 個人開発",
      "教材とWebアプリの連携",
    ],
    intent:
      "教育現場や個人学習で、Webアプリをどう学習に接続するかを整理する。",
    route: "/blog",
  },
  {
    label: "物理学習",
    primary: "物理 教材制作",
    supporting: ["物理学習", "力学 解説", "概念理解", "問題演習"],
    longTail: [
      "物理教材 作り方",
      "力学 概念理解",
      "物理 問題演習 解説",
    ],
    intent:
      "公式暗記ではなく、概念・図・数式・演習の関係を整理する。",
    route: "/blog/physics-material-creation",
  },
  {
    label: "LaTeX教材",
    primary: "LaTeX 教材作成",
    supporting: ["LaTeX 問題集", "数式 組版", "教材テンプレート", "MDX"],
    longTail: [
      "LaTeX 教材 テンプレート",
      "LaTeX 問題集 作成",
      "数式 教材 Web化",
    ],
    intent:
      "数式を含む教材や問題集を、再利用しやすく美しく作るために整理する。",
    route: "/blog/latex-web-workflow",
  },
  {
    label: "ブランド導線",
    primary: "教材制作 Webサイト",
    supporting: ["個人ブランドサイト", "教育 ブログ", "アプリ紹介ページ"],
    longTail: [
      "教育 個人ブランドサイト",
      "教材制作 ポートフォリオ",
      "学習アプリ 公式サイト",
    ],
    intent:
      "専門性、制作思想、既存アプリを一つの公式サイトで確認しやすく整理する。",
    route: "/about",
  },
];

export const seoPrinciples = [
  "タイトルとH1は短く、ページの約束を明確にする",
  "本文は検索語の反復ではなく、読者の次の行動を支える構造にする",
  "記事、About、Appsを内部リンクでつなぎ、専門領域のまとまりを検索エンジンに伝える",
  "図解・カード・要点整理を近くの文章とセットにし、視覚的にも理解しやすくする",
];
