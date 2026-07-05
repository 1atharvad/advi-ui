// `changeset version` does three things this file's established style
// doesn't expect:
// 1. It writes bare "## 1.2.3" headings with no date and no brackets.
// 2. It always inserts the new entry immediately after the "# Changelog"
//    title line, ahead of our intro paragraph and "---" separator, shoving
//    that intro block down below the new entry every time.
// 3. It doesn't add a "---" separator between the new entry and the one
//    that follows it.
// This script repairs all three right after `changeset version` runs,
// before the version-bump commit is made.
import { readFileSync, writeFileSync } from "node:fs";

const path = "CHANGELOG.md";
const today = new Date().toISOString().slice(0, 10);

const lines = readFileSync(path, "utf8").split("\n");

const introIndex = lines.findIndex((l) =>
  l.startsWith("All notable changes to **advi-ui** are documented here.")
);

if (introIndex !== -1) {
  let separatorIndex = introIndex + 1;
  while (lines[separatorIndex] !== "---") separatorIndex++;

  const introBlock = lines.slice(introIndex, separatorIndex + 1);
  const titleIndex = lines.indexOf("# Changelog");

  lines.splice(introIndex, separatorIndex + 1 - introIndex);
  lines.splice(titleIndex + 1, 0, "", ...introBlock);
}

let content = lines.join("\n");

const headingRe = /^## (\d+\.\d+\.\d+(?:-[\w.]+)?)$/gm;
content = content.replace(headingRe, (_match, version) => `## [${version}] — ${today}`);

writeFileSync(path, content);
