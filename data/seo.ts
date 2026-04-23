export type SeoCluster = {
  label: string;
  primary: string;
  supporting: string[];
  intent: string;
  route: string;
};

export const seoClusters: SeoCluster[] = [
  {
    label: "教育ICT",
    primary: "学習支援Webアプリ",
    supporting: ["教育ICT", "授業支援", "学習導線", "教材DX"],
    intent:
      "教育現場や個人学習で、Webアプリをどう学習に接続するか知りたい人に向ける。",
    route: "/blog",
  },
  {
    label: "物理学習",
    primary: "物理 教材制作",
    supporting: ["物理学習", "力学 解説", "概念理解", "問題演習"],
    intent:
      "公式暗記ではなく、概念・図・数式・演習の関係を理解したい人に向ける。",
    route: "/blog/physics-material-creation",
  },
  {
    label: "LaTeX教材",
    primary: "LaTeX 教材作成",
    supporting: ["LaTeX 問題集", "数式 組版", "教材テンプレート", "MDX"],
    intent:
      "数式を含む教材や問題集を、再利用しやすく美しく作りたい人に向ける。",
    route: "/blog/latex-web-workflow",
  },
  {
    label: "ブランド導線",
    primary: "教材制作 Webサイト",
    supporting: ["個人ブランドサイト", "教育 ブログ", "アプリ紹介ページ"],
    intent:
      "専門性、制作思想、既存アプリを一つの公式サイトで確認したい人に向ける。",
    route: "/about",
  },
];

export const seoPrinciples = [
  "タイトルとH1は短く、ページの約束を明確にする",
  "本文は検索語の反復ではなく、読者の次の行動を支える構造にする",
  "記事、About、Appsを内部リンクでつなぎ、専門領域のまとまりを検索エンジンに伝える",
  "図解・カード・要点整理を近くの文章とセットにし、視覚的にも理解しやすくする",
];
