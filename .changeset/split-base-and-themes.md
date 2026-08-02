---
"advi-ui": minor
---

Split styles into a structure/values contract: `advi-ui/base` (component styles + Tailwind base, no colors) plus a theme import supplying the color variables — either a built-in `advi-ui/theme/default` (stock shadcn palette) or `advi-ui/theme/midnight` (new: dark teal + burnt-orange), or a consumer's own `:root` block. `advi-ui/styles` still works unchanged as `base` + `theme/default` bundled together. See `THEMING.md` for the full semantic variable contract.

Removed `advi-ui/themes` and `advi-ui/themes/palette` — an earlier, disconnected theming attempt (`--advi-color-*` variables) that no component ever read. Its color palette lives on as the new `advi-ui/theme/midnight`.
