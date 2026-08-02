---
"advi-ui": minor
---

Add icon-override props to every component with a built-in icon — `Header` (`menuIcon`, `linkIcon`), `PageAside` (`toggleIcon`), `SearchInput` (`searchIcon`, `clearIcon`), `Select` (`chevronIcon`, `checkIcon`, `clearIcon`), `MultiSelect` (`chevronIcon`, `checkIcon`, `removeIcon`), `Modal` (`closeIcon`), and `Dialog`'s `DialogContent` (`closeIcon`). Components still default to `lucide-react`, unchanged — pass any icon element (Phosphor, Radix Icons, custom SVGs, etc.) to swap it in per-instance. Structural classes (sizing, open/close rotation) are merged onto whatever element is passed, so overrides don't need to replicate the built-in styling.
