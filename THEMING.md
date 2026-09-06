# Theming

advi-ui's components never hardcode color — every component reads a fixed
set of semantic CSS custom properties (`--popover`, `--muted-foreground`,
etc.). Those variables are the theme contract. This doc lists them, and
shows the ways to supply values for them: a React `ThemeProvider`, or CSS.

## `ThemeProvider` (React)

Modes are fixed and independent of themes: there are exactly two,
`"light"` and `"dark"` (plus `"system"`, which follows the OS). A
**theme** just configures a palette (a `ThemeTokens` object of the
variables below) for either or both — it doesn't invent its own mode
names. The built-in `"default"` theme defines both; the built-in
`"midnight"` theme defines only `dark`.

If a theme doesn't define a mode, `ThemeProvider` falls back to the
`"default"` theme's palette for that mode (not the active theme's other
mode) — so switching to `midnight` in `mode="light"` renders `default`'s
light palette, not `midnight`'s dark one. Every theme is switchable to
either mode this way, even if it only customizes one of them.

```tsx
import { ThemeProvider } from "advi-ui";

function App() {
  return (
    <ThemeProvider theme="midnight" mode="dark">
      {/* ... */}
    </ThemeProvider>
  );
}
```

- `theme` — a key in the registry (`"default"` unless you register more
  via `themes`). Switch it at runtime with `useTheme().setTheme(...)`.
- `mode` — `"light"`, `"dark"`, or `"system"` (the default; follows and
  stays in sync with `prefers-color-scheme`). Switch it at runtime with
  `useTheme().setMode(...)`.

```tsx
import { useTheme } from "advi-ui";

function ThemeToggle() {
  const { mode, setMode } = useTheme();
  return (
    <button onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
      Switch mode
    </button>
  );
}
```

Calling `setTheme`/`setMode` re-applies the resolved palette's CSS
variables live — no remount, no re-importing CSS, no page reload.

`ThemeProvider` works by setting these as inline CSS custom properties on
`<html>`, which always wins the cascade over any statically imported
theme stylesheet (advi-ui's built-in default included) — so it composes
cleanly with the CSS import path below without fighting over which one
"wins." Being effect-driven, it only applies after first client render;
if you're on a server-rendered framework and want to avoid a brief flash
of the default theme on first paint, use the CSS path instead (or set the
variables yourself in a blocking inline script before hydration).

### Registering multiple custom themes

Pass a `themes` prop — each entry is a `ThemeDefinition`:
`{ light?: ThemeTokens; dark?: ThemeTokens }`, matching the variable
contract below. A theme can define just one of the two (like `midnight`
does — the other mode falls back to `default`'s palette, per above) or
both; entries here can also override a built-in name.

```tsx
import { ThemeProvider, type ThemeDefinition } from "advi-ui";

const brand: ThemeDefinition = {
  light: { background: "30 40% 96%", foreground: "20 30% 15%", /* ... */ },
  dark: { background: "20 30% 8%", foreground: "30 40% 92%", /* ... */ },
};

const monochrome: ThemeDefinition = {
  dark: { background: "0 0% 8%", foreground: "0 0% 95%", /* ... */ }, // light falls back to default's light
};

<ThemeProvider themes={{ brand, monochrome }} theme="brand" mode="dark">
  {/* ... */}
</ThemeProvider>;
```

`setTheme("monochrome")` switches to it at runtime, same as any built-in.

### Reusing advi-ui's own palettes

The built-in `light`/`dark`/`midnight` palettes are exported
individually, so you can compose them into your own theme instead of
writing every variable from scratch:

```tsx
import { ThemeProvider, lightMode, darkMode, type ThemeDefinition } from "advi-ui";

const brand: ThemeDefinition = {
  light: lightMode,
  dark: { ...darkMode, primary: "340 80% 55%" }, // tweak one variable, keep the rest
};
```

## Two-layer import (CSS, non-React or SSR-sensitive consumers)

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
| `advi-ui/theme/midnight` | Dark teal surfaces, burnt-orange accent. Dark-only. |

These two CSS bundles are the plain-CSS equivalent of the `ThemeProvider`
built-in `"default"` and `"midnight"` themes — same values, either path
works depending on whether you're using React.

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
yours doesn't, the `dark` class toggle has no effect for that theme. Note
this CSS-only toggle is independent of `ThemeProvider`'s `.dark` class
handling (driven by `mode` instead) — don't mix the two on the same page.
