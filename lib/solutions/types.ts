/**
 * 過去問の「当サイト独自の解答・解説」の型。
 *
 * 大事な前提が2つある。
 *
 * 1. **問題文は載せない。** このサイトが公開するのは、自分で解いた解答・計算過程・
 *    詳解・別解だけで、問題そのものは大学公式の公開ページへリンクで案内する。
 *    設問の内容に触れるときも、解くために必要な条件を記号で示すにとどめ、
 *    問題文の言い回しや構成をなぞらない。
 * 2. **確認できていないものは公開しない。** 原典（大学公式の問題公開ページ）に
 *    当たれていない年度・大問は `status` を "draft" 以下のままにして、
 *    ページもサイトマップも作らない。推測で埋めない。
 */

/** 公開状態。published だけがページになり、サイトマップに載る。 */
export type PublishState =
  /** 原典が確認できていない。ページを作らない */
  | "unverified"
  /** 原典は確認できたが、解説を書いていない */
  | "planned"
  /** 解説は書いたが、検算・権利の確認が終わっていない */
  | "draft"
  /** 公開してよい */
  | "published";

/** 内部の確認記録。利用者向けページには出さない。 */
export type ReviewLog = {
  /** 原典にあたって、大学・年度・科目・日程・区分・大問番号を照合したか */
  sourceChecked: boolean;
  /** 解答を検算したか（代入・別解・数値計算など）。その方法を書く */
  verified: string[];
  /** 権利面で判断を保留している点。空なら保留なし */
  rightsHolds: string[];
  /** そのほか、公開前に片づける作業 */
  todos: string[];
};

export type Block =
  /** 段落。`$…$` が数式、`**…**` が強調 */
  | { k: "p"; t: string }
  /** 別行立ての数式 */
  | { k: "math"; t: string }
  /** 手順。順番に意味があるもの */
  | { k: "steps"; items: string[] }
  /**
   * 補足・注意。本筋から外れるが落とせない話。
   *
   * 見出しは持たせない。以前は `title` を太字の書き出しとして出していたが、
   * 「これは誘導」のような小見出しが本文の途中に並ぶと、答案に書き写せる
   * 文章ではなく資料の箇条書きとして読まれる。言いたいことは本文の
   * 1文めに書き、地の文のまま続ける。
   */
  | { k: "note"; t: string }
  /**
   * 図。問題の図ではなく、**解くために自分で描いた図**だけを載せる。
   * 大学の図を写したり、見た目を変えて再現したりはしない。
   *
   * 座標は数学のまま（$y$ が上向き）で書き、描画の側で上下を反転させる。
   * 式から座標を出して書けるようにするためで、こうしないと図と本文がずれる。
   */
  | { k: "figure"; fig: Figure };

/** 図ひとつぶん。 */
export type Figure = {
  /** 図の説明。読み上げと、画像が出ないときの代わりに使う */
  caption: string;
  /** 描く範囲 [xmin, xmax, ymin, ymax]。軸の目盛りもここから決める */
  view: [number, number, number, number];
  /** 軸の目盛り間隔。省略すると目盛りを打たない */
  step?: { x?: number; y?: number };
  items: FigureItem[];
};

export type FigureItem =
  /** 関数のグラフ。$x$ の区間を指定して折れ線で近似する */
  | { k: "curve"; f: (x: number) => number; from: number; to: number; dash?: boolean; faint?: boolean }
  /** 媒介変数で描く曲線 */
  | { k: "param"; f: (t: number) => [number, number]; from: number; to: number; dash?: boolean; faint?: boolean }
  /** 線分 */
  | { k: "seg"; a: [number, number]; b: [number, number]; dash?: boolean; faint?: boolean }
  /** 多角形の塗り（面積を示すとき） */
  | { k: "fill"; pts: [number, number][] }
  /** 曲線と直線で挟まれた部分の塗り */
  | { k: "fillBetween"; top: (x: number) => number; bottom: (x: number) => number; from: number; to: number }
  /** 点。label を付けると近くに文字を置く */
  | { k: "dot"; at: [number, number]; label?: string; place?: Place }
  /** 文字だけを置く */
  | { k: "text"; at: [number, number]; label: string; place?: Place };

/**
 * 文字を点のどちら側に置くか。
 * 指定しないと自動で選ぶが、近い点が多いところでは明示して重なりを避ける。
 */
export type Place = "above" | "below" | "left" | "right" | "above-left" | "above-right" | "below-left" | "below-right";

/** 小問ひとつ分の解説。 */
export type SubQuestion = {
  /** 「(1)」など、問題冊子の表記に合わせた小問番号 */
  label: string;
  /** 何を求めるのか。問題文は写さず、やることだけを一行で */
  task: string;
  /** 最終解答。`$…$` で数式 */
  answer: string;
  /** この方針を選ぶ理由。「どう解くか」より先に「なぜそう解くか」を置く */
  approach: string;
  /** 計算過程と論証 */
  blocks: Block[];
  /** 有用な別解 */
  alts?: { title: string; blocks: Block[] }[];
  /** 答案で省略しない方がよい説明、つまずきやすい点 */
  pitfalls?: string[];
  /** 検算。読者が自分で確かめられる形で書く */
  check?: string;
};

/** 大問ひとつ分。 */
export type Question = {
  /** 大問番号。URL の一部にもなる */
  no: number;
  /** 分野。一覧と構造化データに使う */
  field: string;
  /** 解くのに使う主な道具。検索語にもなる */
  topics: string[];
  /** 当サイトの見立てであることを明記したうえで出す体感難易度 */
  ownDifficulty?: "標準" | "やや難" | "難";
  /** 小問に分かれていない大問は label を "" にした要素を1つ置く */
  subs: SubQuestion[];
  status: PublishState;
  review: ReviewLog;
  /** 最終更新日 YYYY-MM-DD */
  updated: string;
};

/**
 * 問題をどこで見てもらうか。
 *
 * このサイトは問題を1文字も載せない。載せないかぎり、大学の入試問題を
 * 複製・公衆送信していないので、各大学が「2次利用」に付けている条件
 * （出所明示・利用報告書など）を踏むきっかけがそもそも生じない。
 * だから案内は「リンクを張るか、張らないか」だけにしてある。
 *
 *   official … 大学自身が問題を公開しているページ。ふつうの文字リンクを張る
 *   none     … 公式の公開先がない。**リンクを張らない**。赤本などで見てもらう
 *
 * 公式以外のサイト（問題を転載している個人サイトなど）へはリンクしない。
 * こちらに報告義務が生じるからではなく、そのリンク自体が別の問題を呼ぶため。
 * 張るかどうかは運営者が決めることなので、型としても用意しない。
 */
export type Source =
  | {
      kind: "official";
      /** リンク先 URL。大学公式のページを指す */
      url: string;
      /** リンクの行き先を表す文言に使う、大学の正式名称 */
      publisher: string;
      /** どのページか（「令和8年度一般選抜の試験問題および正解・解答例等」など） */
      pageTitle: string;
      /** PDF を直接指しているか、問題を並べた一覧ページか */
      target: "pdf" | "page";
      /** こちらで到達を確かめた日 YYYY-MM-DD */
      checked: string;
      /**
       * その大学が自分のサイトで書いている利用条件の控え。**内部の記録**で、画面には出さない。
       * 当サイトは問題を載せないので条件を踏まないが、事実として残しておく。
       */
      note?: string;
    }
  | {
      kind: "none";
      /** 公式の公開先を探した日 YYYY-MM-DD */
      checked: string;
      /** 見つからなかった状況の控え。内部の記録で、画面には出さない */
      note: string;
    };

/** 1大学・1年度・1区分の解説セット。 */
export type SolutionSet = {
  /** 大学ページと同じ slug。これで分析ページとつながる */
  slug: string;
  /** 入試年度（2026年度入試なら 2026） */
  year: number;
  /** 科目。いまは数学だけ */
  subject: "数学";
  /** 日程 */
  schedule: string;
  /** 試験区分（「理科系」「文科系」など、問題冊子の呼び方に合わせる） */
  division: string;
  /** 大学の正式名称 */
  university: string;
  /** 見出しに使う短い呼び名 */
  short: string;
  source: Source | null;
  questions: Question[];
};
