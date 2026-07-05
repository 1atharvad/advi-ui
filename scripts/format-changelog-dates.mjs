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

// Add brackets + date to bare "## 1.2.3" headings before checking for
// separators below, so the newly added heading is recognized too.
const headingRe = /^## (\d+\.\d+\.\d+(?:-[\w.]+)?)$/;
for (let i = 0; i < lines.length; i++) {
  const match = lines[i].match(headingRe);
  if (match) lines[i] = `## [${match[1]}] — ${today}`;
}

// Ensure every "## [" heading is preceded by exactly one blank line, and
// every one after the first also has a "---" separator before that blank
// line — trimming whatever trailing blanks/separator are already there
// and re-inserting the canonical form, so this is correct regardless of
// what changeset version left behind.
const withSeparators = [];
let sawFirstHeading = false;
for (const line of lines) {
  if (/^## \[/.test(line)) {
    while (withSeparators.length && withSeparators[withSeparators.length - 1] === "") {
      withSeparators.pop();
    }
    if (sawFirstHeading) {
      if (withSeparators[withSeparators.length - 1] === "---") {
        withSeparators.pop();
        while (withSeparators.length && withSeparators[withSeparators.length - 1] === "") {
          withSeparators.pop();
        }
      }
      withSeparators.push("", "---", "");
    } else {
      withSeparators.push("");
    }
    sawFirstHeading = true;
  }
  withSeparators.push(line);
}

writeFileSync(path, withSeparators.join("\n"));
