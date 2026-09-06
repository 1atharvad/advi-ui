---
"advi-ui": minor
---

Add `ThemeProvider` and `useTheme` for configuring themes via React, at runtime — no CSS/SCSS overriding required. Modes are fixed (`light`/`dark`/`system`); a theme just supplies a palette for either or both (the built-in `default` theme has both, `midnight` is dark-only). Register any number of custom themes via the `themes` prop, and reuse advi-ui's own palettes (`lightMode`/`darkMode`/`midnightMode`) inside them. See `THEMING.md` for usage; the existing CSS-only import path is unchanged and still supported.
