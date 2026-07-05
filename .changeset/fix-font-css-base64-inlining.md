---
"advi-ui": patch
---

Fix `advi-ui/fonts` shipping one 655KB CSS file with every font subset base64-inlined. Vite hard-codes base64 inlining for CSS-referenced assets in library builds, ignoring `assetsInlineLimit`, so `@fontsource`'s already-correct `url()` + `unicode-range` CSS was being flattened into a single blob. `dist/fonts.css` is now built by copying `@fontsource`'s real CSS and font files into `dist/` untouched (bypassing Vite's asset pipeline for this one file) — down to ~7KB of CSS plus real font files the browser fetches only the subsets it actually renders.
