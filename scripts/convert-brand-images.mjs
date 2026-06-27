#!/usr/bin/env node
/**
 * Generates optimized AVIF + WebP variants of the Nobit brand images (logo +
 * mascot) for <picture> srcsets, mirroring the book-cover pipeline.
 *
 * Canonical sources (committed, trimmed PNGs):
 *   public/brand/nobit-logo.png        → nobit-logo-{480,960}.{avif,webp}
 *   public/brand/nobit-kun-wave.png    → nobit-kun-wave-{240,480}.{avif,webp}
 *   public/brand/nobit-kun-point.png   → nobit-kun-point-{240,480}.{avif,webp}
 *
 * If an uncropped `_src-*.png` is present, it is white-border-trimmed into the
 * canonical PNG first (one-time author step). Idempotent; skips missing files.
 */
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.resolve(__dirname, "..", "public", "brand");

const JOBS = [
  { src: "_src-logo.png", base: "nobit-logo", widths: [480, 960] },
  { src: "_src-wave.png", base: "nobit-kun-wave", widths: [240, 480] },
  { src: "_src-point.png", base: "nobit-kun-point", widths: [240, 480] },
];

async function main() {
  for (const j of JOBS) {
    const srcPath = path.join(DIR, j.src);
    const canonical = path.join(DIR, `${j.base}.png`);

    // Trim the uniform white border from the raw source into the canonical PNG.
    if (existsSync(srcPath)) {
      await sharp(srcPath)
        .trim({ threshold: 12 })
        .png({ compressionLevel: 9 })
        .toFile(canonical);
    }
    if (!existsSync(canonical)) {
      console.log(`[brand] ${j.base}: no source — skipping`);
      continue;
    }

    const meta = await sharp(canonical).metadata();
    for (const w of j.widths) {
      if (w > meta.width) continue;
      await sharp(canonical).resize({ width: w }).webp({ quality: 88 })
        .toFile(path.join(DIR, `${j.base}-${w}.webp`));
      await sharp(canonical).resize({ width: w }).avif({ quality: 70 })
        .toFile(path.join(DIR, `${j.base}-${w}.avif`));
    }
    console.log(`[brand] ${j.base}: ${meta.width}x${meta.height} → ${j.widths.join(",")}`);
  }
}

main().catch((err) => {
  console.error("[brand] failed:", err);
  process.exit(1);
});
