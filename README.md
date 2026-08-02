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

> **Peer dependencies** — make sure your project has `react >= 18`, `react-dom >= 18`, `gsap`, and `lucide-react` installed.

---

## Usage

Import components and styles once at the root of your app:

```tsx
import { Button } from "advi-ui";
import "advi-ui/base";          // component styles + Tailwind base, no colors
import "advi-ui/theme/default"; // a built-in color theme — or supply your own, see THEMING.md
import "advi-ui/fonts"; // optional — self-hosted Raleway, Unbounded, Rubik

export default function App() {
  return <Button variant="outline">Hello</Button>;
}
```

`advi-ui/base` brings in all component styles (SCSS, BEM `vi-*` namespace)
and the Tailwind base layer — no color values. Colors come from a separate
theme import: `advi-ui/theme/default` (stock shadcn palette) or
`advi-ui/theme/midnight` (dark teal + burnt orange), or your own `:root`
block defining the same variables. See [THEMING.md](./THEMING.md) for the
full variable contract and how to build a custom theme.

`advi-ui/styles` still works as a single import equal to `base` +
`theme/default`, for existing consumers who don't need a different theme.

The fonts import is separate and optional — it's a small CSS file (`@font-face` declarations with `unicode-range`), so the browser only downloads the specific weight/subset files it actually needs for the text on the page, not the whole font family. Skip it if you'd rather supply your own fonts or use `font-raleway`/`font-unbounded`/`font-rubik` Tailwind classes with fonts you already load.

### Dark mode

Add the `dark` class to your `<html>` element to activate dark mode:

```ts
document.documentElement.classList.toggle("dark");
```

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

All colors are semantic CSS custom properties, supplied by a theme import and override-able via the `.dark` class — see [THEMING.md](./THEMING.md) for the full contract.

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