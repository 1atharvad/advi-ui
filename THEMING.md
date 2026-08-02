# Theming

advi-ui's components never hardcode color — every component reads a fixed
set of semantic CSS custom properties (`--popover`, `--muted-foreground`,
etc.). Those variables are the theme contract. This doc lists them, and
shows the two ways to supply values for them.

## Two-layer import

```tsx
import "advi-ui/base";          // structure: Tailwind reset + all component styles, no colors
import "advi-ui/theme/default"; // values: one of the built-in themes below
```

`advi-ui/base` alone renders unstyled (no colors) — it needs a theme, built-in
or your own, supplying the variables below. `advi-ui/styles` still exists as
a single bundle equal to `base` + `theme/default`, for existing consumers.

## Built-in themes

| Import | Description |
|---|---|
| `advi-ui/theme/default` | Stock shadcn zinc/slate palette. Supports `.dark` class toggle. |
| `advi-ui/theme/midnight` | Dark teal surfaces, burnt-orange accent. Single-mode (no `.dark` variant). |

## Bringing your own theme

Skip the built-in theme import and define the same variables yourself,
anywhere that loads before your components render (e.g. `:root` in your
global stylesheet):

```css
:root {
  --background: 30 40% 96%;
  --foreground: 20 30% 15%;
  /* ...remaining variables below */
}
```

**Format**: every value is an HSL triplet with no `hsl()` wrapper —
`H S% L%` (e.g. `220.9 39.3% 11%`), not a hex code or a full `hsl(...)`
string. Components wrap the variable in `hsl(var(--x))` themselves.

## The variable contract

| Variable | Meaning |
|---|---|
| `--background` | Page background |
| `--foreground` | Default text color |
| `--card` | Card container background |
| `--card-foreground` | Text on card background |
| `--popover` | Background of dropdown/select/menu panels |
| `--popover-foreground` | Text on popover background |
| `--primary` | Primary action color (filled buttons, active states) |
| `--primary-foreground` | Text on primary background |
| `--secondary` | Secondary action color |
| `--secondary-foreground` | Text on secondary background |
| `--muted` | Low-emphasis backgrounds (disabled fields, subtle fills) |
| `--muted-foreground` | Low-emphasis text (placeholders, descriptions, helper text) |
| `--accent` | Hover/active highlight background (menu items, selected options) |
| `--accent-foreground` | Text on accent background |
| `--destructive` | Destructive action color (delete buttons, error states) |
| `--destructive-foreground` | Text on destructive background |
| `--border` | Default border color |
| `--input` | Input/control border color |
| `--ring` | Focus ring color |
| `--radius` | Base border radius (e.g. `0.5rem`), consumed directly, not via `hsl()` |

Any subset you omit falls back to whatever was previously in scope (a
built-in theme's values, or the browser default of unset custom
properties, which renders as broken color — so in practice, define all of
them).

## Dark mode

Toggle a `dark` class on `<html>` to activate a theme's `.dark` block, if it
has one:

```ts
document.documentElement.classList.toggle("dark");
```

Themes aren't required to ship a `.dark` variant (`midnight` doesn't) — if
yours doesn't, the `dark` class toggle has no effect for that theme.
