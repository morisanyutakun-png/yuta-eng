#!/usr/bin/env node
/**
 * Renders public/favicon.svg → app/favicon.ico (PNG-embedded ICO at 32×32
 * and 16×16). Next.js App Router auto-serves app/favicon.ico at /favicon.ico
 * with appropriate cache headers, replacing the legacy 404 that left old
 * cached portrait icons stuck in browsers' faviconDBs.
 *
 * Idempotent. If sharp isn't installed or the source SVG is missing, exits
 * silently so CI never breaks.
 */
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const SRC = path.join(repoRoot, "public", "favicon.svg");
const OUT = path.join(repoRoot, "app", "favicon.ico");

async function main() {
  if (!existsSync(SRC)) {
    console.log("[favicon-ico] no public/favicon.svg — skip");
    return;
  }
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.log("[favicon-ico] sharp not installed — skip");
    return;
  }

  const svg = await readFile(SRC);
  const sizes = [16, 32, 48];

  // Render each size to PNG.
  const pngs = await Promise.all(
    sizes.map((size) =>
      sharp(svg, { density: 384 })
        .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png({ compressionLevel: 9 })
        .toBuffer(),
    ),
  );

  // Build ICO. Format: 6-byte header + 16-byte ICONDIRENTRY × n + payloads.
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = ICO
  header.writeUInt16LE(sizes.length, 4); // image count

  const entries = [];
  const payloads = [];
  let offset = 6 + sizes.length * 16;
  for (let i = 0; i < sizes.length; i++) {
    const png = pngs[i];
    const size = sizes[i];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0); // width (0 = 256)
    entry.writeUInt8(size === 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits/pixel
    entry.writeUInt32LE(png.length, 8); // size of payload
    entry.writeUInt32LE(offset, 12); // offset of payload
    entries.push(entry);
    payloads.push(png);
    offset += png.length;
  }

  const ico = Buffer.concat([header, ...entries, ...payloads]);
  await writeFile(OUT, ico);
  console.log(
    `[favicon-ico] wrote ${path.relative(repoRoot, OUT)} (${ico.length} B, sizes: ${sizes.join("×, ")}×)`,
  );
}

main().catch((err) => {
  console.error("[favicon-ico] failed:", err);
  process.exit(1);
});
