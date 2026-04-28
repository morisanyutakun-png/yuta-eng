#!/usr/bin/env node
/**
 * Converts the source book cover PNG into AVIF + WebP variants at multiple
 * widths, so the article can serve the smallest format the browser supports
 * via a `<picture>` element. Mirrors the OG-card pipeline.
 *
 * Source: public/denjikigaku-cover.png   (saved by the author)
 * Output: public/denjikigaku-cover-{200,400,600}.{avif,webp}
 *
 * Idempotent: if the source PNG is missing, exits silently. Sharp is already
 * a transitive dependency via beasties' postcss tooling — no extra install.
 */
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const SRC = path.join(repoRoot, "public", "denjikigaku-cover.png");
const OUT_DIR = path.join(repoRoot, "public");

async function main() {
  if (!existsSync(SRC)) {
    console.log(
      "[book-cover] public/denjikigaku-cover.png not found — skipping. " +
        "Save the book-cover PNG at that path to generate AVIF/WebP variants.",
    );
    return;
  }

  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.log("[book-cover] sharp not installed — skipping conversion.");
    return;
  }

  await mkdir(OUT_DIR, { recursive: true });
  const png = await readFile(SRC);
  const base = sharp(png);

  // Three widths. The hero usage on the article shows ~200px wide on
  // desktop; we ship a 2x retina variant + a generous 600px for any zoom or
  // future use (e.g. share previews).
  const widths = [200, 400, 600];
  let total = 0;
  for (const w of widths) {
    const resized = base.clone().resize({ width: w, withoutEnlargement: true });
    const [avif, webp] = await Promise.all([
      resized.clone().avif({ quality: 60, effort: 4 }).toBuffer(),
      resized.clone().webp({ quality: 82, effort: 5 }).toBuffer(),
    ]);
    await Promise.all([
      writeFile(path.join(OUT_DIR, `denjikigaku-cover-${w}.avif`), avif),
      writeFile(path.join(OUT_DIR, `denjikigaku-cover-${w}.webp`), webp),
    ]);
    total += 2;
  }

  const meta = await stat(SRC);
  console.log(
    `[book-cover] wrote ${total} files from ${(meta.size / 1024).toFixed(0)} KB source → public/`,
  );
}

main().catch((err) => {
  console.error("[book-cover] failed:", err);
  process.exit(1);
});
