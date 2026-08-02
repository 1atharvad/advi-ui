// CSS-only exports (./styles, ./themes, ./fonts) point straight at .css
// files with no adjacent .d.ts, so `import "advi-ui/styles"` fails
// TypeScript's module resolution under strict modes ("Cannot find module").
// These are empty ambient module stubs, referenced via each export's
// "types" condition in package.json, so the import type-checks with no
// exports (correct, since importing CSS has none).
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const distDir = path.join(rootDir, "dist");

for (const name of [
  "advi-ui.css.d.ts",
  "fonts.d.ts",
  "base.css.d.ts",
  "theme-default.css.d.ts",
  "theme-midnight.css.d.ts",
]) {
  writeFileSync(path.join(distDir, name), "export {};\n");
}
