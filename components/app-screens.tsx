import Image from "next/image";

/**
 * ノビットスタディ 中高部アプリの実画面に寄せたスマホ表示。
 * 2026-07 の新パンフレットから切り出した画面画像を使い、購入後のアカウント発行、
 * ログイン、ダッシュボード、提出、返却、レポートまでを同じ見た目で見せる。
 */

export type AppScreenVariant = "account" | "login" | "home" | "submit" | "returned" | "history";

export const appSteps: {
  no: string;
  variant: AppScreenVariant;
  title: string;
  lead: string;
  facts: string[];
}[] = [
  {
    no: "01",
    variant: "account",
    title: "決済後、ログイン情報が発行される",
    lead: "決済が完了すると、生徒用のログインIDとPINが表示されます。同じ内容はメールでも届きます。",
    facts: [
      "購入後の戻り先で、そのままログイン情報を確認",
      "ログインIDとPINは、メモまたはスクリーンショットで保存",
      "同じ決済を開き直しても、二重発行されないよう処理",
    ],
  },
  {
    no: "02",
    variant: "login",
    title: "ログインする",
    lead: "発行されたログインIDとPINを入力して、生徒専用の学習画面へ入ります。",
    facts: [
      "生徒はログインIDとPINだけで開始",
      "購入者メールとは別に、生徒ごとの学習アカウントとして管理",
      "ログイン後は、購入した教材が自動でホームに表示",
    ],
  },
  {
    no: "03",
    variant: "home",
    title: "購入教材がダッシュボードに届く",
    lead: "購入した科目に対応する教材が、ダッシュボードの今日の学習と教材別の現在地に表示されます。",
    facts: [
      "購入教材が自動で割り当てられ、すぐ最初の範囲へ進める",
      "未提出・自己採点・返却が分かれ、次の行動が見える",
      "合格数・採点待ち・再提出ありも、教材別に追える",
    ],
  },
  {
    no: "04",
    variant: "submit",
    title: "PDFに取り組んで提出する",
    lead: "課題を開くと、問題PDFと実施範囲が表示されます。PDFや写真を添付して提出できます。",
    facts: [
      "問題PDFを開いて確認。必要なら保存して紙で解いてもOK",
      "アプリ内で直接書くか、GoodNotesなどのPDFを添付",
      "保存したPDFや答案写真を最大3件まで添付",
      "提出すると解答解説PDFが見られ、同時に次の範囲が追加",
    ],
  },
  {
    no: "05",
    variant: "returned",
    title: "返却・再提出も「並行」して進む",
    lead: "提出後は自己採点しながら次へ進み、先生の添削返却は返却タブに届きます。",
    facts: [
      "採点待ち、先生から返却、再提出が必要を分けて表示",
      "不合格や再テストは再提出として戻る",
      "先生のコメントや添削済みPDFを見ながら復習できる",
    ],
  },
  {
    no: "06",
    variant: "history",
    title: "合格状況がレポートに残る",
    lead: "取り組みは学習レポートとして残ります。何が合格済みで、どこへ戻るべきかを振り返れます。",
    facts: [
      "合格率・平均点・合格数・連続学習をひと目で確認",
      "教科別の成績と採点・返却の履歴を一覧",
      "全範囲が返却済みかつ合格になると教材終了",
    ],
  },
];

type ScreenOverlay = {
  text: string;
  className: string;
};

type AppScreenImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  imageClassName?: string;
  overlays?: ScreenOverlay[];
};

export const appScreenImages: Record<AppScreenVariant, AppScreenImage> = {
  account: {
    src: "/app-screens/account.png",
    width: 392,
    height: 566,
    alt: "購入後に発行されるログイン情報の画面",
    imageClassName: "w-full",
  },
  login: {
    src: "/app-screens/login.png",
    width: 392,
    height: 554,
    alt: "ログインIDとPINを入力するログイン画面",
    imageClassName: "w-full",
  },
  home: {
    src: "/app-screens/dashboard.png",
    width: 724,
    height: 835,
    alt: "購入教材が届いたダッシュボード画面",
    imageClassName: "w-[132%]",
    overlays: [
      {
        text: "こんにちは、山田太郎さん",
        className:
          "left-[4.9%] top-[8.6%] flex h-[4.9%] w-[49%] items-center whitespace-nowrap bg-[#23345f] pr-[0.5%] text-[clamp(0.68rem,2.6vw,1.08rem)] font-black leading-none text-white",
      },
    ],
  },
  submit: {
    src: "/app-screens/submit.png",
    width: 732,
    height: 796,
    alt: "数学IA標準の課題提出画面",
    imageClassName: "w-[116%]",
    overlays: [
      {
        text: "山田太郎 ・ 数学",
        className:
          "left-[3.1%] top-[15.45%] flex h-[2.2%] w-[14.2%] items-center bg-[#f3f7fb] text-[clamp(0.3rem,1.02vw,0.48rem)] font-bold leading-none text-[#607289]",
      },
    ],
  },
  returned: {
    src: "/app-screens/returned.png",
    width: 423,
    height: 430,
    alt: "先生から返却された添削結果の画面",
    imageClassName: "w-full",
  },
  history: {
    src: "/app-screens/report.png",
    width: 724,
    height: 688,
    alt: "学習レポートと採点履歴の画面",
    imageClassName: "w-[116%]",
  },
};

const phoneSizes = {
  sm: {
    root: "w-[218px]",
    padding: "p-2",
    radius: "rounded-[2rem]",
    screenRadius: "rounded-[1.45rem]",
    viewport: "h-[392px]",
    notch: "top-1.5 h-3 w-14",
    sizes: "218px",
  },
  md: {
    root: "w-[270px]",
    padding: "p-2.5",
    radius: "rounded-[2.35rem]",
    screenRadius: "rounded-[1.75rem]",
    viewport: "h-[486px]",
    notch: "top-2 h-3.5 w-16",
    sizes: "270px",
  },
} as const;

/** 実アプリの1画面を電話フレームで表示。 */
export function AppScreen({
  variant,
  className = "",
  size = "md",
}: {
  variant: AppScreenVariant;
  className?: string;
  size?: keyof typeof phoneSizes;
}) {
  const screen = appScreenImages[variant];
  const frame = phoneSizes[size];

  return (
    <div className={`relative ${frame.root} shrink-0 ${className}`}>
      <div
        className={`${frame.radius} ${frame.padding} bg-[#0b1d4a] shadow-[0_50px_80px_-42px_rgba(11,29,74,0.75)] ring-1 ring-white/10`}
      >
        <div className={`relative ${frame.viewport} ${frame.screenRadius} overflow-hidden bg-[#f3f6f9]`}>
          <div
            className={`pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 rounded-full bg-[#0b1d4a] ${frame.notch}`}
          />
          <div className={`relative ${screen.imageClassName ?? "w-full"}`} style={{ aspectRatio: `${screen.width} / ${screen.height}` }}>
            <Image
              src={screen.src}
              alt={screen.alt}
              width={screen.width}
              height={screen.height}
              sizes={frame.sizes}
              className="block h-auto w-full"
              priority={variant === "home"}
            />
            {screen.overlays?.map((overlay) => (
              <span key={overlay.text} className={`absolute ${overlay.className}`}>
                {overlay.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
