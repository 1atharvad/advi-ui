---
"advi-ui": patch
---

Fix invalid HTML nesting: `MultiSelect`'s trigger no longer renders a `<button>` containing nested chip-remove `<button>`s (now a `<div role="combobox">` with equivalent keyboard/aria behavior), and the `HoverPopup` "Inline in Text" story no longer wraps block content in a `<p>`.
