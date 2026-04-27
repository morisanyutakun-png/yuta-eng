#!/usr/bin/env node
/**
 * Inlines critical CSS into every prerendered HTML file under
 * `.next/server/app/` using beasties. The remaining stylesheet load is
 * deferred via media-print + onload swap, so the full sheet no longer
 * blocks first paint.
 *
 * Why a custom postbuild step instead of next.config's `experimental.optimizeCss`:
 * the built-in flag was a no-op on the Turbopack pipeline used here — it sets a
 * marker but never runs beasties on the produced HTML. Doing it ourselves makes
 * the optimization deterministic and visible in `.next/server/app/*.html`.
 */
import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const APP_DIR = path.join(repoRoot, ".next", "server", "app");
const STATIC_DIR = path.join(repoRoot, ".next");

async function* walkHtml(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkHtml(full);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      yield full;
    }
  }
}

async function main() {
  const { default: Beasties } = await import("beasties");

  // Beasties resolves stylesheet `href`s relative to its `path` config.
  // Our prerendered HTML references `/_next/static/...`, served from
  // `.next/static/...` on disk, so we point the root at `.next` and let
  // beasties walk into `static/` from there.
  const beasties = new Beasties({
    // Next.js writes CSS to .next/static/... but references it with the
    // `/_next/static/...` URL prefix in HTML. Tell beasties to strip the
    // `/_next` segment when resolving stylesheet hrefs to disk paths.
    path: STATIC_DIR,
    publicPath: "/_next/",
    // `media` strategy uses the well-known `media="print" onload="this.media='all'"`
    // trick. Browsers fetch print-media stylesheets at low priority and never
    // block render with them; on `onload` we promote the sheet back to `all`
    // media so it applies. Lighthouse explicitly recognizes this pattern as
    // non-render-blocking, whereas the older `swap` preload still showed up
    // in the critical-request-chain audit.
    preload: "media",
    pruneSource: false,
    inlineFonts: false,
    fonts: false,
    logLevel: "warn",
    // Keep keyframes/media rules even if the matching selectors aren't above
    // the fold — prevents FOUC for hover/responsive states.
    keyframes: "all",
  });

  let ok = 0;
  let skipped = 0;
  for await (const file of walkHtml(APP_DIR)) {
    try {
      const before = await readFile(file, "utf8");
      const after = await beasties.process(before);
      if (after && after !== before) {
        await writeFile(file, after);
        ok += 1;
      } else {
        skipped += 1;
      }
    } catch (err) {
      console.warn(`[critical-css] skipped ${path.relative(repoRoot, file)}: ${err.message}`);
      skipped += 1;
    }
  }
  console.log(`[critical-css] inlined ${ok} files, skipped ${skipped}`);
}

main().catch((err) => {
  console.error("[critical-css] failed:", err);
  process.exit(1);
});
