---
"advi-ui": minor
---

Add `tagline`, `credits`, and `creditsPosition` props to `Footer`. `tagline` renders under the logo; `credits` accepts a `ReactNode` (e.g. "Built with `<a>advi-ui</a>`") and defaults to sitting next to `copyright` in the bottom bar, or set `creditsPosition="top"` to render it as its own full-width row above the divider instead.
