---
"advi-ui": patch
---

Fix `import "advi-ui/styles"`, `import "advi-ui/themes"`, and `import "advi-ui/fonts"` failing to type-check in consumer projects (`Cannot find module or type declarations for side-effect import`). These exports pointed straight at `.css` files with no `types` condition and no adjacent `.d.ts`, which TypeScript's module resolution requires even for side-effect-only imports. Each now has an empty ambient module stub wired in via a `types` condition — verified against a real packed tarball under both `bundler` and strict `node16` module resolution.
