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
    label: "高校物理の塾",
    primary: "高校物理 塾",
    supporting: [
      "高校物理 オンライン塾",
      "高校物理 個別指導",
      "物理基礎 定期テスト対策",
      "大学受験 物理",
    ],
    longTail: [
      "高校物理 塾 オンライン",
      "高校物理 苦手 克服",
      "力学 苦手 高校生",
      "物理基礎 定期テスト 対策",
    ],
    intent:
      "高校物理でつまずいた学習者が、概念理解、図解、演習、復習の順に学び直せる入口を探している。",
    route: "/blog/physics-material-creation",
  },
  {
    label: "AI教材作成",
    primary: "教材作成AI 自動",
    supporting: [
      "AI教材作成",
      "生成AI 教材作成",
      "授業プリント AI 作成",
      "LaTeX 問題集 自動生成",
    ],
    longTail: [
      "教材作成 AI 自動化",
      "生成AI 授業プリント 作成",
      "LaTeX 問題集 自動生成",
      "AI 教材テンプレート 作り方",
    ],
    intent:
      "先生や教材制作者が、生成AIとLaTeX/Webを組み合わせて教材を速く美しく作る方法を知りたい。",
    route: "/blog/latex-web-workflow",
  },
  {
    label: "GIGA / EdTech",
    primary: "GIGAスクール 教材作成",
    supporting: [
      "教育DX",
      "EdTech",
      "AIドリル",
      "個別最適な学び",
      "学習支援Webアプリ",
    ],
    longTail: [
      "GIGAスクール 教材作成",
      "教育DX 学習支援Webアプリ",
      "AIドリル 個別最適な学び",
      "EdTech 教材制作 個人開発",
    ],
    intent:
      "GIGAスクール後の学習環境で、デジタル教材、AI、Webアプリをどう学習導線へ接続するかを知りたい。",
    route: "/blog/education-technology-learning-design",
  },
  {
    label: "教育ICT",
    primary: "学習支援Webアプリ",
    supporting: ["教育ICT", "授業支援", "学習導線", "教材DX", "学習ログ"],
    longTail: [
      "学習支援Webアプリ 作り方",
      "教育ICT 個人開発",
      "教材とWebアプリの連携",
      "学習ログ Webアプリ",
    ],
    intent:
      "教育現場や個人学習で、Webアプリをどう学習に接続するかを整理する。",
    route: "/blog",
  },
  {
    label: "物理学習",
    primary: "物理 教材制作",
    supporting: ["物理学習", "力学 解説", "概念理解", "問題演習", "図解"],
    longTail: [
      "物理教材 作り方",
      "力学 概念理解",
      "物理 問題演習 解説",
      "物理 図解 教材",
    ],
    intent:
      "公式暗記ではなく、概念・図・数式・演習の関係を整理する。",
    route: "/blog/physics-material-creation",
  },
  {
    label: "LaTeX教材",
    primary: "LaTeX 教材作成",
    supporting: ["LaTeX 問題集", "数式 組版", "教材テンプレート", "MDX", "教材管理"],
    longTail: [
      "LaTeX 教材 テンプレート",
      "LaTeX 問題集 作成",
      "数式 教材 Web化",
      "LaTeX 教材 Web連携",
    ],
    intent:
      "数式を含む教材や問題集を、再利用しやすく美しく作るために整理する。",
    route: "/blog/latex-web-workflow",
  },
  {
    label: "ブランド導線",
    primary: "EdTech 個人ブランドサイト",
    supporting: ["個人ブランドサイト", "教育 ブログ", "アプリ紹介ページ", "SEO"],
    longTail: [
      "教育 個人ブランドサイト",
      "教材制作 ポートフォリオ",
      "学習アプリ 公式サイト",
      "EdTech ポートフォリオ SEO",
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
  "高校生、先生、教材制作者、EdTech関係者の検索意図を分けて、同じホームから自然に案内する",
  "生成AI、GIGAスクール、教育DXの言葉は流行語としてではなく、教材制作と学習導線の文脈に置く",
];
