export type AppFaqItem = { question: string; answer: string };

export type AppItem = {
  /** 表示用ブランド名 */
  name: string;
  /** リード文（SEO主キーワード入り） */
  comparison: string;
  /** 長文説明（キーワード密度を確保） */
  description: string;
  /** 想定読者 */
  audience: string;
  /** カテゴリ表示用ラベル（SEO主キーワードに揃える） */
  category: string;
  /** 公開URL */
  href: string;
  /** CTA ボタンテキスト */
  ctaLabel: string;
  /** バッジ用ステータス */
  status: string;
  featured?: boolean;
  /** SEO 最重要キーワード（H2／schema name に使用） */
  primaryKeyword: string;
  /** SEO 補助キーワード */
  secondaryKeywords: string[];
  /** schema.org のタイプ */
  schemaType: "SoftwareApplication" | "EducationalOrganization";
  /** 想定オーディエンスロール */
  schemaAudience?: string;
  /** alternateName */
  alternateName?: string[];
  /** ページ内 FAQ／FAQPage schema 用 */
  faq: AppFaqItem[];
  /** ハイライト箇条書き（H3 + 本文小ブロック） */
  highlights: { title: string; body: string }[];
  /** スラグ（ページ内アンカー / 内部リンク用） */
  slug: string;
  /** ヒーロー画像パス（/public 配下、紹介ビジュアルに使用） */
  image?: string;
  /** 画像の自然サイズ（CLS抑制用） */
  imageWidth?: number;
  imageHeight?: number;
};

export const apps: AppItem[] = [
  {
    name: "物理の森",
    slug: "butsuri-no-mori",
    comparison: "物理専門塾 オンライン｜高校物理を「理解で解く」個別指導。",
    description:
      "物理の森は、Solvora が運営する物理専門塾のオンライン版です。公式暗記ではなく、現象 → 図 → 式の順で読み解く力を、生徒一人ひとりに合わせた個別カリキュラムで育てます。物理基礎・物理の通年指導、定期テスト対策、共通テスト・国公立二次・私大入試まで、高校物理に完全特化したオンライン専門塾として全国どこからでも受講可能です。",
    audience:
      "高校物理でつまずいている高校1〜3年生・浪人生／物理を理解で解けるようになりたい受験生／オンライン物理塾を探している保護者",
    category: "物理専門塾 オンライン",
    href: "https://physics.yuta-eng.com",
    ctaLabel: "物理の森（物理専門塾）を開く",
    status: "Solvora 直営",
    featured: true,
    primaryKeyword: "物理専門塾 オンライン",
    secondaryKeywords: [
      "高校物理 オンライン塾",
      "物理 個別指導 オンライン",
      "高校物理 塾",
      "物理 専門塾",
      "物理基礎 塾",
    ],
    schemaType: "EducationalOrganization",
    schemaAudience: "student",
    alternateName: ["物理の森 オンライン物理塾", "Solvora 物理塾"],
    highlights: [
      {
        title: "高校物理に完全特化したオンライン専門塾",
        body: "力学・電磁気・波動・熱・原子の全分野を、定期テスト対策から共通テスト・二次試験まで一貫指導。物理だけに集中するから、つまずきの言語化と前提単元への戻し方が早い。",
      },
      {
        title: "オンライン × 個別カリキュラム",
        body: "全国どこからでも受講可能。生徒の到達度・志望校・残り時間に合わせて、月別・週別の学習計画を1人ずつ設計します。",
      },
      {
        title: "「現象 → 図 → 式」の指導法",
        body: "Solvora ブログでも公開している『公式暗記から理解で解く』設計を、対話伴走型でカリキュラムに落とし込み。",
      },
    ],
    faq: [
      {
        question: "物理の森はどんな高校生に向いていますか？",
        answer:
          "高校物理で公式暗記に頼ってきて応用問題で詰まる高校生・浪人生、共通テストや二次試験で安定して得点したい受験生に向いています。物理基礎からの再構築にも対応します。",
      },
      {
        question: "オンラインの物理専門塾は集団塾と何が違いますか？",
        answer:
          "物理の森は完全オンライン × 個別カリキュラムなので、生徒ごとに『どの単元から戻すか』『どこまで先取りするか』を1対1で設計できます。集団塾の進度に合わない生徒や、苦手単元だけを集中強化したい生徒に向いています。",
      },
      {
        question: "受講相談は無料ですか？",
        answer:
          "受講相談は無料です。受講前提でなくても構いません。現状の物理の偏差値・志望校・残り時間を伺い、最初の3ヶ月の学習プラン案を提示します。",
      },
    ],
  },
  {
    name: "Solvora Physics",
    slug: "physics",
    comparison: "高校物理 アプリ｜単元別の概念学習と演習を 1 アプリに集約。",
    description:
      "Solvora Physics は、Solvora が提供する高校物理アプリです（個別指導サービスの『物理の森』とは別の自学アプリです）。力学・電磁気・波動・熱・原子の各単元を、概念解説 → 例題 → 演習の 3 ステップでスマホから学べます。公式暗記ではなく『現象 → 図 → 式』の順で理解を積み上げる学習設計を、高校物理アプリとして使いやすい形に落とし込みました。通学・スキマ時間の演習から定期テスト前の総復習まで、高校物理を理解ベースで攻略したい受験生のための学習アプリです。",
    audience:
      "高校物理を独学・予習・復習したい高校1〜3年生／スマホで物理の概念と演習を回したい受験生／物理が苦手で短時間学習を積み上げたい人",
    category: "高校物理 アプリ",
    href: "https://physics.yuta-eng.com",
    ctaLabel: "Solvora Physics（高校物理アプリ）を開く",
    status: "Solvora 提携",
    primaryKeyword: "高校物理 アプリ",
    secondaryKeywords: [
      "Solvora Physics",
      "高校物理 学習アプリ",
      "物理 アプリ おすすめ",
      "物理基礎 アプリ",
      "高校物理 独学",
      "物理 演習 アプリ",
    ],
    schemaType: "SoftwareApplication",
    schemaAudience: "student",
    alternateName: ["Solvora Physics 高校物理アプリ", "Physics（Solvora）"],
    highlights: [
      {
        title: "単元別の概念 → 演習を 3 ステップで",
        body: "力学・電磁気・波動・熱・原子の単元を、概念解説 → 例題 → 演習の 3 ステップで学習。高校物理アプリとして最短経路で理解を作ります。",
      },
      {
        title: "スマホで動くから通学中・スキマ時間に最適",
        body: "1 セッション 5〜10 分で完結する設計。通学・休み時間・寝る前の 10 分など、毎日少しずつ高校物理の演習を積み上げられます。",
      },
      {
        title: "理解ベースの学習設計",
        body: "公式暗記ではなく『現象 → 図 → 式』の順で誘導するステップ問題を採用。Solvora ブログの学習設計をアプリに実装。",
      },
    ],
    faq: [
      {
        question: "高校物理 アプリでおすすめはありますか？",
        answer:
          "Solvora が運営する Solvora Physics は、高校物理アプリの中でも『公式暗記ではなく理解で解く』ことに特化した学習設計です。単元別の概念解説 → 例題 → 演習の 3 ステップで、スマホから短時間で物理の力をつけられます。",
      },
      {
        question: "Solvora Physics と『物理の森』はどう違いますか？",
        answer:
          "Solvora Physics は自学用の高校物理アプリ（スマホで概念解説 → 例題 → 演習を回す）、物理の森は講師による個別指導のオンライン専門塾です。前者は独学の積み上げ、後者は1対1のカリキュラム設計に向いています。両方を組み合わせて使うことも可能です。",
      },
      {
        question: "Solvora Physics は独学でも使えますか？",
        answer:
          "Solvora Physics は独学を前提に設計されています。各単元に概念解説と段階的な例題が入っているので、教科書を持っていなくても学習できます。さらに深く学びたい人は、姉妹サービス『物理の森（物理専門塾オンライン）』で個別指導も受けられます。",
      },
      {
        question: "物理基礎にも対応していますか？",
        answer:
          "はい。物理基礎の全範囲（運動とエネルギー、波、電気）に対応しています。高校物理本体への接続も意識した設計なので、物理基礎 → 物理 へスムーズに進めます。",
      },
    ],
  },
  {
    name: "Eddivom",
    slug: "eddivom",
    image: "/eddivom-hero.webp",
    imageWidth: 1536,
    imageHeight: 1024,
    comparison: "LaTeX 教材作成｜AI下書きから組版・PDF出力までワンストップ。",
    description:
      "Eddivom は、LaTeX で物理・数学の教材作成を効率化する Web アプリです。生成 AI で問題の下書きを作り、LaTeX に流し込み、小テスト・類題・解答 PDF までをワンストップで出力できます。LaTeX 教材作成の手間を大幅に短縮し、教員・塾講師・教材制作者が毎週繰り返す問題プリント作成の作業時間を圧縮します。Solvora が公式に紹介する教材作成 AI です。",
    audience:
      "LaTeX で物理・数学の教材を作る塾講師・高校教員／問題プリント・小テスト・解説 PDF を量産したい教材制作者",
    category: "LaTeX 教材作成",
    href: "https://eddivom.yuta-eng.com",
    ctaLabel: "Eddivom（LaTeX 教材作成）を開く",
    status: "公式パートナー",
    primaryKeyword: "LaTeX 教材作成",
    secondaryKeywords: [
      "LaTeX 教材",
      "教材作成 AI",
      "問題プリント 自動生成",
      "小テスト 自動作成",
      "教材PDF 自動生成",
    ],
    schemaType: "SoftwareApplication",
    schemaAudience: "teacher",
    alternateName: ["Eddivom LaTeX教材作成", "LaTeX 教材作成 ツール Eddivom"],
    highlights: [
      {
        title: "AI 下書き → LaTeX 整形が一気通貫",
        body: "生成 AI で問題下書きを作成し、そのまま Eddivom が LaTeX に整形。プロンプトと組版を別ツールで行き来する手間がゼロに。",
      },
      {
        title: "物理・数学の数式組版に最適化",
        body: "amsmath / bm / physics 系パッケージのテンプレを内蔵。ベクトル・偏微分・分数表記が綺麗に出力されます。",
      },
      {
        title: "小テスト・類題・解答 PDF を一括生成",
        body: "1問の元データから難易度違いの類題と解答 PDF を派生生成。毎週の小テスト準備が劇的に短縮されます。",
      },
    ],
    faq: [
      {
        question: "LaTeX 教材作成にどんなツールが必要ですか？",
        answer:
          "Eddivom はブラウザだけで動く LaTeX 教材作成 Web アプリです。LaTeX 環境のローカル構築は不要で、AI 下書きから PDF 出力までブラウザ内で完結します。",
      },
      {
        question: "Eddivom は無料で試せますか？",
        answer:
          "はい。Eddivom は無料で試せます。無料プランで定期テスト〜小テストレベルの問題プリント生成を試したあと、本格運用に応じてアップグレードできます。",
      },
      {
        question: "Overleaf との違いは何ですか？",
        answer:
          "Overleaf は汎用 LaTeX エディタですが、Eddivom は『教材作成ワークフロー特化』。AI で下書き → LaTeX で整形 → PDF/Web 配布までの 1 本のパイプラインを最初から組んであります。",
      },
    ],
  },
  {
    name: "IT Pass",
    slug: "it-pass",
    comparison: "ITパスポート アプリ｜過去問演習と解説をスマホで毎日積み上げ。",
    description:
      "IT Pass は、IT パスポート試験対策のための学習アプリです。過去問演習・分野別解説・苦手単元の復習を、スマホから毎日 5〜10 分のスキマ時間で積み上げられます。ストラテジ系・マネジメント系・テクノロジ系の全分野を網羅し、IT パスポート アプリとして社会人・学生・就活生が短期合格を狙うのに最適化されています。Solvora が公式に紹介する IT 学習アプリです。",
    audience:
      "IT パスポート試験を受ける社会人・学生・就活生／IT の基礎知識を体系的に学び直したい人／スキマ時間で資格対策をしたい人",
    category: "ITパスポート アプリ",
    href: "https://itpass.yuta-eng.com",
    ctaLabel: "IT Pass（ITパスポート アプリ）を開く",
    status: "公式パートナー",
    primaryKeyword: "ITパスポート アプリ",
    secondaryKeywords: [
      "IT パスポート 過去問 アプリ",
      "ITパスポート 勉強 アプリ",
      "IT パスポート 対策",
      "基本情報 アプリ",
      "IT 資格 学習アプリ",
    ],
    schemaType: "SoftwareApplication",
    schemaAudience: "student",
    alternateName: ["ITパスポート アプリ IT Pass", "ITパスポート 学習アプリ"],
    highlights: [
      {
        title: "過去問演習をスマホで毎日 5〜10 分",
        body: "IT パスポート試験の過去問を分野別に分類し、スマホから 1 セッション 5〜10 分で回せる設計。通学・通勤のスキマ時間が最強の演習時間に変わります。",
      },
      {
        title: "ストラテジ・マネジメント・テクノロジを網羅",
        body: "ITパスポート出題範囲の全 3 分野（ストラテジ系・マネジメント系・テクノロジ系）を網羅。苦手分野の集中演習モードも搭載。",
      },
      {
        title: "短期合格を狙う社会人・学生に最適",
        body: "1〜3 ヶ月の短期合格を想定した学習計画とリトリーバル練習を内蔵。IT パスポートアプリとしての効率を最大化。",
      },
    ],
    faq: [
      {
        question: "ITパスポート アプリで合格まで何ヶ月かかりますか？",
        answer:
          "1 日 30 分の学習で 1〜3 ヶ月が一般的な目安です。IT Pass は過去問演習を中心に組まれているので、毎日少しずつでも積み上げれば短期合格を狙えます。",
      },
      {
        question: "ITパスポート アプリは無料で使えますか？",
        answer:
          "IT Pass の基本機能は無料で試せます。過去問の分野別演習や進捗トラッキングを試した上で、必要に応じてプレミアム機能にアップグレードできます。",
      },
      {
        question: "基本情報技術者試験にも対応していますか？",
        answer:
          "IT パスポートが主軸ですが、基本情報技術者試験への接続も意識した分野構成になっています。IT パスポート合格後の次のステップとしても活用できます。",
      },
    ],
  },
];
