#!/usr/bin/env node
/**
 * Generates optimized AVIF + WebP variants of the brand illustrations used on
 * the marketing pages (student, parent+child, and the 3-pillar spot icons),
 * mirroring the brand/book-cover pipelines.
 *
 * Canonical sources (committed PNGs) live in public/illust/:
 *   student-study.png        → student-study-{560,1120}.{avif,webp}
 *   parent-child.png         → parent-child-{520,1040}.{avif,webp}
 *   pillar-materials.png     → pillar-materials-{128,256}.{avif,webp}   (trimmed)
 *   pillar-habit.png         → pillar-habit-{128,256}.{avif,webp}       (trimmed)
 *   pillar-correction.png    → pillar-correction-{128,256}.{avif,webp}  (trimmed)
 *
 * Idempotent; skips missing sources. The spot icons are white-border-trimmed
 * and re-padded so they sit centered inside their tiles.
 */
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.resolve(__dirname, "..", "public", "illust");

const JOBS = [
  { base: "student-study", widths: [560, 1120] },
  { base: "parent-child", widths: [520, 1040] },
  { base: "pillar-materials", widths: [128, 256], trim: true },
  { base: "pillar-habit", widths: [128, 256], trim: true },
  { base: "pillar-correction", widths: [128, 256], trim: true },
];

async function main() {
  for (const j of JOBS) {
    const canonical = path.join(DIR, `${j.base}.png`);
    if (!existsSync(canonical)) {
      console.log(`[illust] ${j.base}: no source — skipping`);
      continue;
    }

    let buf;
    if (j.trim) {
      const trimmed = await sharp(canonical).trim({ threshold: 20 }).toBuffer();
      const m = await sharp(trimmed).metadata();
      const pad = Math.round(Math.max(m.width, m.height) * 0.08);
      buf = await sharp(trimmed)
        .flatten({ background: "#ffffff" })
        .extend({ top: pad, bottom: pad, left: pad, right: pad, background: "#ffffff" })
        .png()
        .toBuffer();
    } else {
      buf = await sharp(canonical).png().toBuffer();
    }

    for (const w of j.widths) {
      await sharp(buf).resize({ width: w }).webp({ quality: 86 })
        .toFile(path.join(DIR, `${j.base}-${w}.webp`));
      await sharp(buf).resize({ width: w }).avif({ quality: 62 })
        .toFile(path.join(DIR, `${j.base}-${w}.avif`));
    }
    console.log(`[illust] ${j.base}: → ${j.widths.join(",")}`);
  }
}

main().catch((err) => {
  console.error("[illust] failed:", err);
  process.exit(1);
});
