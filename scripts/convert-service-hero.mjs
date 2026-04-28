#!/usr/bin/env node
/**
 * Generates responsive AVIF + WebP variants of each service hero image so
 * the /apps cards can serve the smallest format the browser supports at the
 * right pixel density.
 *
 * Inputs (any of these are picked up if present, in priority order):
 *   public/eddivom-hero.png  →  public/eddivom-hero-{480,960,1440}.{avif,webp}
 *   public/eddivom-hero.webp →  same outputs, re-encoded
 *
 * Idempotent. If sharp isn't installed or the source is missing, exits
 * silently so CI never breaks because of an absent asset.
 */
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const PUBLIC = path.join(repoRoot, "public");

const SOURCES = [
  { base: "eddivom-hero", widths: [480, 960, 1440] },
];

async function main() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.log("[service-hero] sharp not installed — skipping conversion.");
    return;
  }
  await mkdir(PUBLIC, { recursive: true });

  let total = 0;
  for (const { base, widths } of SOURCES) {
    const src =
      [`${base}.png`, `${base}.webp`, `${base}.jpg`]
        .map((n) => path.join(PUBLIC, n))
        .find((p) => existsSync(p));
    if (!src) {
      console.log(`[service-hero] no source for ${base} — skip`);
      continue;
    }

    const buf = await readFile(src);
    const meta = await stat(src);
    const sharpInput = sharp(buf, { failOn: "none" });
    for (const w of widths) {
      const resized = sharpInput
        .clone()
        .resize({ width: w, withoutEnlargement: true });
      const [avif, webp] = await Promise.all([
        resized.clone().avif({ quality: 60, effort: 4 }).toBuffer(),
        resized.clone().webp({ quality: 80, effort: 5 }).toBuffer(),
      ]);
      await Promise.all([
        writeFile(path.join(PUBLIC, `${base}-${w}.avif`), avif),
        writeFile(path.join(PUBLIC, `${base}-${w}.webp`), webp),
      ]);
      total += 2;
    }
    console.log(
      `[service-hero] ${base}: ${(meta.size / 1024).toFixed(0)} KB source → ${widths.length * 2} responsive variants`,
    );
  }
  console.log(`[service-hero] wrote ${total} files`);
}

main().catch((err) => {
  console.error("[service-hero] failed:", err);
  process.exit(1);
});
