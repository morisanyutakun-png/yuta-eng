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
  /** 「目次」「問題の例」など、そのページが何かを示す見出し */
  label: string;
  /** 抜粋元の節（「第2回予想問題」など）。問題と解説が同じ回に偏っていないかの確認用 */
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
  "問題・解説・採点基準などを、それぞれ抜粋して掲載しています。連続したページではありません。";
