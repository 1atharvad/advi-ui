# advi-ui

A personal React component library built with **Tailwind CSS**, **SCSS**, and **Storybook** — designed for clean, composable UI.

**[Live Storybook →](https://advi-ui.vercel.app/)**

---

## Stack

| Tool | Purpose |
|------|---------|
| React 19 + TypeScript | Component authoring |
| Vite | Build & dev server |
| Tailwind CSS + SCSS | Styling (BEM `vi-*` namespace) |
| class-variance-authority | Variant management |
| Radix UI / Base UI | Accessible primitives |
| Lucide React | Icons |
| Storybook 10 | Component explorer with light/dark toggle |
| Vitest + Playwright | Testing |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start Storybook
npm run storybook

# Run tests
npm test

# Build the library
npm run build:lib
```

---

## Installation

```bash
npm install advi-ui
```

```bash
yarn add advi-ui
```

```bash
pnpm add advi-ui
```

> **Peer dependencies** — make sure your project has `react >= 18`, `react-dom >= 18`, and `gsap` installed. `lucide-react` is bundled into advi-ui's build already, so it's an optional peer dependency — install it yourself only if you want to construct your own lucide icons (e.g. for icon-override props) with matching types.

---

## Usage

Import components and structural styles once at the root of your app,
then supply a theme — either via React (`ThemeProvider`, recommended for
runtime switching) or a plain CSS import:

```tsx
import { Button, ThemeProvider } from "advi-ui";
import "advi-ui/base";  // component styles + Tailwind base, no colors
import "advi-ui/fonts"; // optional — self-hosted Raleway, Unbounded, Rubik

export default function App() {
  return (
    <ThemeProvider theme="default" mode="system">
      <Button variant="outline">Hello</Button>
    </ThemeProvider>
  );
}
```

`advi-ui/base` brings in all component styles (SCSS, BEM `vi-*` namespace)
and the Tailwind base layer — no color values; a theme supplies those.
`ThemeProvider` ships two built-in themes (`"default"`, `"midnight"`),
supports runtime switching (`useTheme().setTheme`/`setMode`), and lets you
register your own via its `themes` prop — see [THEMING.md](./THEMING.md)
for the full API, the variable contract, and the CSS-only alternative
(`advi-ui/theme/default`, `advi-ui/theme/midnight`, or your own `:root`
block) for non-React or SSR-sensitive consumers.

`advi-ui/styles` still works as a single CSS import equal to `base` +
`theme/default`, for existing consumers who don't need `ThemeProvider`.

The fonts import is separate and optional — it's a small CSS file (`@font-face` declarations with `unicode-range`), so the browser only downloads the specific weight/subset files it actually needs for the text on the page, not the whole font family. Skip it if you'd rather supply your own fonts or use `font-raleway`/`font-unbounded`/`font-rubik` Tailwind classes with fonts you already load.

### Dark mode

With `ThemeProvider`, pass `mode="dark"` (or `"light"`/`"system"`, the
default) — switch it at runtime with `useTheme().setMode(...)`. Without
it (the CSS-only path), toggle the `dark` class on `<html>` yourself:

```ts
document.documentElement.classList.toggle("dark");
```

See [THEMING.md](./THEMING.md) for the full `ThemeProvider` API.

### Icons

Components ship with [lucide-react](https://lucide.dev) icons by default —
bundled into advi-ui's build, so nothing extra to install for the defaults. Any
component with a built-in icon (`Header`, `PageAside`, `SearchInput`,
`Select`, `MultiSelect`, `Modal`, `Dialog`) accepts icon-override props — pass
your own element from any icon library (Phosphor, Radix Icons, Heroicons,
custom SVGs) to replace it per-instance:

```tsx
import { MagnifyingGlass, X } from "@phosphor-icons/react";

<SearchInput searchIcon={<MagnifyingGlass />} clearIcon={<X />} />
```

| Component | Props |
|---|---|
| `Header` | `menuIcon`, `linkIcon` |
| `PageAside` | `toggleIcon` (a `(open) => ReactNode` function) |
| `SearchInput` | `searchIcon`, `clearIcon` |
| `Select` | `chevronIcon`, `checkIcon`, `clearIcon` |
| `MultiSelect` | `chevronIcon`, `checkIcon`, `removeIcon` |
| `Modal` | `closeIcon` |
| `Dialog` (`DialogContent`) | `closeIcon` |

Structural styling (sizing, rotation on open/close) is merged onto whatever
element you pass, so overrides don't need to replicate the built-in classes.

---

## Components

| Component | Description |
|-----------|-------------|
| `Button` | Variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link` · Sizes: `default`, `sm`, `lg`, `icon` |
| `Header` | Responsive nav header with logo slot |
| `Loading` | Animated spinner with optional custom text |
| `Toast` | Notifications — `default`, `success`, `error`, `warning`, `info` |
| `Card` | Container with `CardImage`, `CardWrapper`, `CardTitle`, `CardDescription`, `CardContent` slots |
| `Dialog` | Accessible modal dialog (Radix UI) |
| `Input` | Text input with optional label, description, and validation |
| `Textarea` | Multi-line input with optional mask, label, description, and validation |
| `Link` | Internal and external link wrapper |
| `Modal` | Full-featured modal overlay |
| `PageAside` | Sidebar layout with nav, user display, and logout slot |
| `PageNotFound` | Animated 404 page |

---

## Design Tokens

All colors are semantic CSS custom properties, supplied via `ThemeProvider` or a theme import, and switchable between light/dark (and any custom theme) at runtime — see [THEMING.md](./THEMING.md) for the full contract.

### Fonts

| Tailwind class | Font |
|----------------|------|
| `font-raleway` | Raleway (default body font) |
| `font-unbounded` | Unbounded |
| `font-rubik` | Rubik |
| `font-sans` | Geist Variable |

---

## All Components

`Button` · `Card` · `CardWrapper` · `CardImage` · `CardTitle` · `CardDescription` · `CardContent` · `Dialog` · `Header` · `Input` · `Link` · `Loading` · `Modal` · `PageAside` · `PageNotFound` · `Textarea` · `Toast`

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run storybook` | Launch Storybook on port 6006 |
| `npm run build` | TypeScript check + Vite build |
| `npm run build:lib` | Build distributable library |
| `npm run build-storybook` | Build static Storybook |
| `npm test` | Run Vitest tests |
| `npm run lint` | Run ESLint |

---

## License

MIT

---

<div align="center">

**Built with ❤️ by Atharva Devasthali**

*Web Developer | Python Engineer | UI/UX Enthusiast*

</div>