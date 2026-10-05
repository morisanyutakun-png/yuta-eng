import raw from "@/data/samples.json";

/**
 * 試し読み（抜粋）。scripts/build-samples.py が本文PDFから作る。
 *
 * 公開しているのは、ここに入っている抜粋ページだけ。
 * 本文PDF そのものは配信しない（public/ にも置かない）。
 */
export type SamplePage = {
  /** 公開している抜粋画像のURL */
  file: string;
  /** 「第2回 試験の扉」「第4回 問題」など、そのページが何かを示す見出し */
  label: string;
  /** ページの種類。扉・問題・解答が同じ回に偏っていないかの確認に使う */
  kind: "扉" | "問題" | "解答" | "診断";
  /** 抜粋元の節（「第2回予想問題」など） */
  section: string;
  /** 書籍に印刷されているページ番号。前付けなど番号のないページは 0 以下 */
  page: number;
  width: number;
  height: number;
};

export type Sample = {
  asin: string;
  /** 抜粋だけをまとめたPDF */
  pdf: string;
  pages: SamplePage[];
};

const samples = raw as Record<string, Sample>;

/** その本の試し読み。用意できていない本は undefined（空の枠は出さない）。 */
export const sampleFor = (asin?: string | null): Sample | undefined => (asin ? samples[asin] : undefined);

export const sampleCount = Object.keys(samples).length;

/** 抜粋であることの断り書き。画面と PDF の両方で同じことを書く。 */
export const SAMPLE_NOTICE =
  "扉・問題・解答などを、それぞれ抜粋して掲載しています。連続したページではありません。";
