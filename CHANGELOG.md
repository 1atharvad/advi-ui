# Changelog

All notable changes to **advi-ui** are documented here.

---

## [0.1.3] — 2026-04-21

### Added
- Storybook component-level and per-story docs added to all story files: `Button` (Variants, Sizes, States, Custom), `Card`, `Dialog`, `Input`, `Textarea`, `Toast`, `Loading`, `Link`, `Header`, `PageNotFound`, `PageAside`
- `Header` stories: `inline: false` iframe rendering so `position: fixed` resolves correctly in docs

### Changed
- `LogoLink.image` prop widened from `{ url: string; alt: string }` to `ImageObj | ReactNode` — accepts a React element (SVG, custom component) in addition to a URL object
- `Header` mobile overlay replaced with `Modal` using `vi-modal-slide-right` variant
- `Header` nav links use `Link` component instead of raw `<a>` tags

---

## [0.1.2] — 2026-04-20

### Added
- `Header` component — responsive header with mobile hamburger menu and desktop nav (`src/components/Header.tsx`)
- `ScrollAnimationBtn` component — fixed toggle button with circular rotating text, play/pause icons, and toast feedback
- `LogoLink` component — image + text logo link wrapper exported from `link.tsx`
- Toast `position` prop on `ToastProvider` — configurable `"left"` or `"right"` positioning
- Storybook folder structure for `Button` — split into `Variants`, `Sizes`, `States`, `Custom`
- Storybook stories for `Header` under `Components/Header`
- Storybook `Introduction.mdx` — landing page for the Storybook docs
- Storybook custom theme — dark teal to burnished orange palette
- Design token system under `src/styles/themes/`
  - `_palette.scss` — raw SCSS color variables (`$teal-*`, `$orange-*`)
  - `_tokens.scss` — CSS custom properties (`--advi-color-*`)
  - `_storybook.scss` — Storybook manager styles
- Favicon set — `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` (replacing `favicon.svg`)
- `ad-logo.webp` brand asset added to `public/`
- Font module type declarations added to `vite-env.d.ts`
- All UI components now exported from `src/index.ts`; theme styles auto-imported on package load
- Package exports: `./themes` and `./themes/palette` paths added; `types` field corrected to `./dist/src/index.d.ts`

### Changed
- `Link.is_external_link` renamed to `Link.isExternal` (**breaking change**)
- `Header` moved from `src/components/ui/header.tsx` to `src/components/Header.tsx`
- Toast variant styles moved to `@layer components` with correct SCSS nesting for specificity
- `global.scss` now uses relative paths for `@use` imports and includes `header.scss` and `scroll-animation-btn.scss`

---

## [0.1.1]

### Added
- Storybook configuration with light/dark theme switching via `@storybook/addon-themes`
- Multiple components added to Storybook: `Button`, `Card`, `Input`, `Textarea`, `Toast`, `Dialog`, `Modal`, `Loading`, `Link`
- Vercel deployment configuration

### Changed
- Storybook configuration updates

---

## [0.1.0]

### Added
- Initial scaffold — React 19 + TypeScript + Vite
- Tailwind CSS v3 + SCSS setup
- Storybook 10 integration
- Core UI components: `Button`, `Card`, `Input`, `Textarea`, `Link`, `Dialog`, `Modal`, `Toast`, `Loading`, `Header`
- `PageNotFound` and `PageAside` layout components
- Library build config via `vite-plugin-dts`
- npm package exports (`main`, `module`, `types`, `styles`)
