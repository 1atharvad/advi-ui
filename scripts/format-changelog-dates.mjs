// `changeset version` writes bare "## 1.2.3" headings with no date and no
// brackets. This patches any such heading (added by the version bump that
// just ran) to match this changelog's established "## [1.2.3] — YYYY-MM-DD"
// style before the version-bump commit is made.
import { readFileSync, writeFileSync } from "node:fs";

const path = "CHANGELOG.md";
const today = new Date().toISOString().slice(0, 10);
const headingRe = /^## (\d+\.\d+\.\d+(?:-[\w.]+)?)$/gm;

const content = readFileSync(path, "utf8");
const updated = content.replace(headingRe, (_match, version) => `## [${version}] — ${today}`);

if (updated !== content) {
  writeFileSync(path, updated);
}
