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

> **Peer dependencies** — make sure your project has `react >= 18` and `react-dom >= 18` installed.

---

## Usage

Import components and styles once at the root of your app:

```tsx
import { Button } from "advi-ui";
import "advi-ui/styles";

export default function App() {
  return <Button variant="outline">Hello</Button>;
}
```

The style import brings in:
- All component styles (SCSS, BEM `vi-*` namespace)
- CSS custom properties for light and dark mode
- Raleway, Unbounded, and Rubik fonts (self-hosted via `@fontsource`)
- Tailwind base layer

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

All colors and typography are defined as CSS custom properties in `src/styles/global.scss` and override-able via the `.dark` class. SCSS variables live in `src/styles/_variables.scss`.

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