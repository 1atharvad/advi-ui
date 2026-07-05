// Prints a one-line summary of all pending changesets, for use as a commit
// message subject before `changeset version` consumes (deletes) them.
import { readdirSync, readFileSync } from "node:fs";

const files = readdirSync(".changeset").filter(
  (f) => f.endsWith(".md") && f !== "README.md"
);

const summaries = files.map((f) => {
  const raw = readFileSync(`.changeset/${f}`, "utf8");
  const body = raw.split(/^---$/m).slice(2).join("---").trim();
  return body.split("\n")[0];
});

console.log(summaries.join("; "));
