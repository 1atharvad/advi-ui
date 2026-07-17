---
"advi-ui": minor
---

Add `Menu` component — an accessible action-menu widget (trigger + dropdown of items), for cases like a "..." actions button rather than a form control. Supports icons, keyboard shortcuts, disabled/destructive items, separators, and group labels. Keyboard navigation follows the same combobox pattern as `Select`/`MultiSelect`: all key handling lives on the trigger, with `aria-activedescendant` tracking the highlighted item.
