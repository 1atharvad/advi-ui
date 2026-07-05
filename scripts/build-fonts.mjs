// Vite hard-codes base64-inlining for every CSS-referenced asset in library
// builds (build.lib), ignoring assetsInlineLimit entirely — so letting Vite
// bundle @fontsource's CSS turns ~30 real woff2 files into one 650KB+
// base64 blob. @fontsource already ships the right thing (real url()
// references + unicode-range per subset); this just copies it into dist/
// untouched instead of routing it through Vite's asset pipeline.
import { readFileSync, writeFileSync, mkdirSync, cpSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const distDir = path.join(rootDir, "dist");
const fonts = ["raleway", "rubik", "unbounded"];

mkdirSync(path.join(distDir, "files"), { recursive: true });

const css = fonts
  .map((font) => {
    const pkgDir = path.join(rootDir, "node_modules", "@fontsource", font);
    cpSync(path.join(pkgDir, "files"), path.join(distDir, "files"), { recursive: true });
    return readFileSync(path.join(pkgDir, "index.css"), "utf8");
  })
  .join("\n");

writeFileSync(path.join(distDir, "fonts.css"), css);
