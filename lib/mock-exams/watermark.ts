import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";

export interface WatermarkOptions {
  orderId?: string;
  customerEmail?: string;
  examTitle?: string;
}

/**
 * 有料PDFに購入者ごとの再配布防止透かし（セキュリティヘッダー・フッター・低濃度斜め透かし）と
 * 著作権・学習用限定メタデータを埋め込む。
 *
 * ・ヘッダー: 注文ID（およびメールアドレス）を刻印し、ネット流出時の追跡性を確保
 * ・フッター: 再配布・転売・ネット共有禁止の法的警告
 * ・中央斜め透かし: 数式や答案枠の視認性を損なわない超低濃度（opacity: 0.045）で全面刻印
 * ・PDFメタデータ: 著作権・学習用限定のメタデータを埋め込み
 */
export async function stampExamPdf(
  inputBytes: Buffer | Uint8Array,
  options: WatermarkOptions = {},
): Promise<Buffer> {
  const { orderId = "VERIFIED_PURCHASE", customerEmail = "", examTitle = "入試プレビュー" } = options;

  try {
    const pdfDoc = await PDFDocument.load(inputBytes);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const cleanOrderId = orderId.slice(0, 40);
    const buyerTag = customerEmail ? ` | BUYER: ${customerEmail.slice(0, 30)}` : "";

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const { width, height } = page.getSize();

      // 1. 上部セキュリティヘッダー（極小・淡いグレーで印刷や可読性を邪魔しない）
      page.drawText(
        `[YUTA-ENG.COM] LICENSED FOR PERSONAL STUDY ONLY | ORDER: ${cleanOrderId}${buyerTag}`,
        {
          x: 36,
          y: height - 18,
          size: 7,
          font: fontRegular,
          color: rgb(0.5, 0.55, 0.6),
        },
      );

      // 2. 下部セキュリティフッター
      page.drawText(
        `DO NOT REDISTRIBUTE, COPY OR RESELL | ALL RIGHTS RESERVED | https://yuta-eng.com/mock-exams`,
        {
          x: 36,
          y: 12,
          size: 7,
          font: fontRegular,
          color: rgb(0.5, 0.55, 0.6),
        },
      );

      // 3. 中央の斜め透かし（本文・数式の判読を邪魔しない超低濃度 0.045、角度38度）
      const diagonalText = "PERSONAL STUDY ONLY - DO NOT SHARE";
      page.drawText(diagonalText, {
        x: width / 2 - 180,
        y: height / 2 - 35,
        size: 24,
        font: fontBold,
        color: rgb(0.15, 0.2, 0.3),
        opacity: 0.045,
        rotate: degrees(38),
      });
    }

    // 著作権・利用目的メタデータをPDFプロパティに埋め込み
    pdfDoc.setTitle(examTitle);
    pdfDoc.setAuthor("大学別数学研究室");
    pdfDoc.setSubject("購入者本人学習用模試演習教材（再配布・共有厳禁）");
    pdfDoc.setKeywords(["大学別数学研究室", "入試プレビュー", "転載禁止", "学習用"]);
    pdfDoc.setProducer("Yuta-Eng Secure PDF Engine");

    const savedBytes = await pdfDoc.save();
    return Buffer.from(savedBytes);
  } catch (err) {
    console.error("[mock-exams/watermark] 透かし処理エラー（フォールバック）:", err);
    return Buffer.from(inputBytes);
  }
}

