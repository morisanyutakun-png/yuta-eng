#!/usr/bin/env node
/**
 * Pre-compute static AVIF/WebP card thumbnails for every blog post's
 * opengraph-image so the blog cards can serve them via plain <img>/<picture>
 * without going through /_next/image at request time.
 *
 * Reads PNGs that Next.js already rendered at build time
 * (.next/server/app/blog/[slug]/opengraph-image.body), converts them with
 * sharp, and writes:
 *   - public/og/[slug]-1200.avif      (desktop hero)
 *   - public/og/[slug]-1200.webp
 *   - public/og/[slug]-640.avif       (mobile / grid card)
 *   - public/og/[slug]-640.webp
 *   - public/og/[slug].png            (final crawler-friendly fallback)
 *
 * Run as `npm run build`'s postbuild step — fast (<1s) and idempotent.
 */
import { readFile, readdir, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const NEXT_DIR = path.join(repoRoot, ".next", "server", "app", "blog");
const OUT_DIR = path.join(repoRoot, "public", "og");

async function main() {
  if (!existsSync(NEXT_DIR)) {
    console.warn(
      "[og] .next/server/app/blog not found. Run `next build` before this script.",
    );
    process.exit(0);
  }

  const sharp = (await import("sharp")).default;
  await mkdir(OUT_DIR, { recursive: true });

  const slugs = (await readdir(NEXT_DIR, { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  let total = 0;
  for (const slug of slugs) {
    const pngPath = path.join(NEXT_DIR, slug, "opengraph-image.body");
    if (!existsSync(pngPath)) continue;
    const png = await readFile(pngPath);
    // sharp pipeline shared per slug (decoded once)
    const base = sharp(png);
    const widths = [
      { w: 1200, suffix: "-1200" },
      { w: 640, suffix: "-640" },
    ];
    for (const { w, suffix } of widths) {
      const resized = base.clone().resize({ width: w, withoutEnlargement: true });
      const [avif, webp] = await Promise.all([
        resized.clone().avif({ quality: 55, effort: 4 }).toBuffer(),
        resized.clone().webp({ quality: 78, effort: 5 }).toBuffer(),
      ]);
      await Promise.all([
        writeFile(path.join(OUT_DIR, `${slug}${suffix}.avif`), avif),
        writeFile(path.join(OUT_DIR, `${slug}${suffix}.webp`), webp),
      ]);
      total += 2;
    }
    // PNG fallback (compressed, served only to ancient crawlers)
    const fallback = await base
      .clone()
      .resize({ width: 1200 })
      .png({ compressionLevel: 9, palette: true })
      .toBuffer();
    await writeFile(path.join(OUT_DIR, `${slug}.png`), fallback);
    total += 1;
  }

  console.log(`[og] wrote ${total} files to public/og/ for ${slugs.length} posts`);
}

main().catch((err) => {
  console.error("[og] failed:", err);
  process.exit(1);
});
