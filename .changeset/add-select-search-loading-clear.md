---
"advi-ui": patch
---

Add `searchable`, `loading`, and `clearable` props to `Select`, and `searchable`/`loading` to `MultiSelect`.

- `searchable` renders a filter input inside the dropdown that matches against option `label` (case-insensitive, client-side).
- `loading` replaces the options list with a spinner, for the window while options are being fetched asynchronously.
- `clearable` (Select only) shows a clear button on the trigger once a value is selected, calling `onChange("")` — no need to inject a manual "None" entry into `options`. `MultiSelect` already supports this via its per-chip remove buttons.

`Select`'s trigger changed from a `<button>` to a `<div role="combobox">` (matching `MultiSelect`'s existing pattern) so the new clear button — a real nested `<button>` — doesn't produce invalid `<button>`-in-`<button>` markup. Disabled state now uses `aria-disabled` instead of the native `disabled` attribute for the same reason; behavior is unchanged.
