# advi-ui

A personal React component library built with **Tailwind CSS**, **SCSS**, and **Storybook** — designed for clean, composable UI.

---

## Stack

| Tool | Purpose |
|------|---------|
| React 19 + TypeScript | Component authoring |
| Vite | Build & dev server |
| Tailwind CSS + SCSS | Styling |
| class-variance-authority | Variant management |
| Radix UI / Base UI | Accessible primitives |
| Lucide React | Icons |
| Storybook 10 | Component explorer |
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

## Usage

Import components and styles:

```tsx
import { Button } from "advi-ui";
import "advi-ui/styles";

export default function App() {
  return <Button variant="outline">Hello</Button>;
}
```

The style import brings in all component styles, CSS custom properties (design tokens), and the Tailwind base layer. Add it once at the root of your app.

---

## Components

| Component | Description |
|-----------|-------------|
| `Button` | Multiple variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link` |
| `Header` | Responsive nav header with mobile drawer |
| `Loading` | Animated spinner with custom text |
| `Toast` | Lightweight toast notifications — success, error, warning, info |
| `Card` | Container with header/content/footer slots |
| `Dialog` | Accessible modal dialog |
| `Input` | Styled text input |
| `Textarea` | Multi-line input |
| `Label` | Form label |
| `Link` | Internal and external link wrapper |
| `Modal` | Full-featured modal overlay |
| `PageAside` | Sidebar layout primitive |
| `PageNotFound` | 404 page component |

---

## Project Structure

```
src/
├── components/
│   ├── ui/          # Core UI primitives
│   └── PageNotFound.tsx
├── stories/
│   ├── ui/          # Storybook stories for UI components
│   └── components/  # Storybook stories for page-level components
└── styles/          # SCSS source files
```

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
