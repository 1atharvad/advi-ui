# Changelog

All notable changes to **advi-ui** are documented here.

---

## [0.1.7] — 2026-04-26

### Changed

- `Select` — removed `w-full` from `vi-select-wrapper`; wrapper fills container via flex `align-items: stretch`, fixing `inline-flex` not shrinking to content when no width class is passed
- `Select` — renamed CSS class `vi-select-root` → `vi-select-container`
- `MultiSelect` — same wrapper and rename changes as `Select` (`vi-multi-select-root` → `vi-multi-select-container`)

---

## [0.1.6] — 2026-04-26

### Changed

- `Select` — `className` prop now applies to the root container `<div>` instead of the trigger `<Button>`, so passing a width class (e.g. `w-full`, `w-64`) controls the whole component width including label and description
- `Select` — removed hardcoded `w-full` from root and trigger; root changed to `inline-flex flex-col gap-1` so the component no longer takes full parent width by default
- `MultiSelect` — same `className` and width changes as `Select`
- `Select` stories — added `source.code` to every story; added `Controlled` story with live value readout; split disabled coverage into `Disabled Option` (per-item) and `Disabled` (whole component); added `WithFormField` story with submit-triggered validation; added `argTypes` on meta; added section comment separators; added `name` to all stories
- `MultiSelect` stories — same structural improvements as `Select` stories; `Overflow` renamed to `Chip Overflow`; added `Controlled`, `Disabled Option`, and `WithFormField` stories

---

## [0.1.5] — 2026-04-26

### Fixed
- Rebuilt `dist` so type declarations (`dist/src/index.d.ts`) include all exports added in 0.1.4 — `Select`, `MultiSelect`, `Radio`, `RadioGroup`, `FormField`, `CircularProgressBar`, `Footer`, and `HoverPopup` were missing from the published types, causing `Module '"advi-ui"' has no exported member` errors for consumers

---

## [0.1.4] — 2026-04-23

### Added
- `Select` component — accessible single-value custom dropdown (`src/components/ui/select.tsx`) with full keyboard navigation (↑↓ Enter Escape Tab), combobox/listbox ARIA roles, disabled-option support, and a hidden native input for form integration
- `MultiSelect` component — multi-value dropdown (`src/components/ui/multi-select.tsx`) with chip display, per-chip remove buttons, `maxCount` overflow badge, checkbox-style options, and the same keyboard navigation
- `select.scss` / `multi-select.scss` — `vi-select-*` and `vi-multi-select-*` component styles following the existing `@layer components` + `@apply` pattern
- Storybook stories for `Select` (`UI/Select`) — Default, WithLabel, WithDescription, Preselected, WithDisabledOption, Disabled
- Storybook stories for `MultiSelect` (`UI/MultiSelect`) — Default, WithLabel, WithDescription, Preselected, Overflow, Disabled
- `Radio` component — individual radio input with `sm`/`default`/`lg` size variants; CSS-only state via `:has(input:checked)` / `:has(input:disabled)` / `:has(input:focus-visible)` — works for both controlled and uncontrolled usage
- `RadioGroup` component — managed group with `options`, `value`/`defaultValue`, `onChange`, `direction` (`vertical`/`horizontal`), `label`, `description`, and `disabled` props; exported alongside `Radio` from `src/components/ui/radio.tsx`
- `radio.scss` — `vi-radio-*` styles with CSS custom properties (`--vi-radio-size`, `--vi-radio-dot`) for size scaling
- Storybook stories for `Radio` (`UI/Radio`) — Default, Checked, Disabled, Sizes, Group (vertical), HorizontalGroup, Controlled, Uncontrolled, WithFormField, AllDisabled
- `FormField` component (`src/components/ui/form-field.tsx`) — layout wrapper providing `label`, `description`, `error`, and `required` slots; error suppresses description automatically
- `form-field.scss` — `vi-form-field-*` styles
- Storybook stories for `FormField` (`UI/FormField`) — Default, WithDescription, WithError, Required, NoLabel, InputInField, RadioGroupInField
- `CircularProgressBar` component (`src/components/CircularProgressBar.tsx`) — SVG ring progress indicator; GSAP animates `strokeDashoffset` on mount; accepts `percentage`, `size`, `strokeWidth`, `animate`, `label`, and a `children` center slot
- `circular-progress-bar.scss` — `vi-circular-progress-*` styles; track uses `--muted`, fill uses `--primary`
- Storybook stories for `CircularProgressBar` (`Components/CircularProgressBar`) — Default, WithLabel, WithChildren, Sizes, ZeroPercent, FullPercent, NoAnimation, Grid
- `Footer` component (`src/components/Footer.tsx`) — responsive footer with `logo`, `linkGroups`, and `copyright` props; uses `LogoLink` and `Link`; divider renders only when both top content and copyright are present
- `footer.scss` — `vi-footer-*` styles with `max-w-7xl` inner container
- Storybook stories for `Footer` (`Components/Footer`) — Default, WithLogo, WithLinks, Full, Minimal
- `HoverPopup` component (`src/components/HoverPopup.tsx`) — inline trigger text that reveals a floating tooltip below on hover or keyboard focus; 120 ms debounced hide keeps the popup visible while the cursor crosses the CSS gap between trigger and popup
- `hover-popup.scss` — `vi-hover-popup-*` styles; popup positioned `top: calc(100% + 10px)` with arrow; enter/exit animated via `opacity` + `translateY`
- Storybook stories for `HoverPopup` (`Components/HoverPopup`) — Default, RichContent, InlineInText

### Changed
- `Select` / `MultiSelect` trigger and chip-remove buttons replaced with the shared `Button` component (`variant="ghost"`); SCSS overrides neutralise ghost-variant side effects (`hover:bg-transparent`, `disabled:pointer-events-auto`, focus border reset)
- `Input` — aligned error/border colors to `text-destructive`/`border-destructive`; `py-1` → `py-2`; description hides when an error is present; `useId` + `htmlFor` wired so the label is programmatically associated with the input
- `Textarea` — masked mode rewritten: overlay uses identical padding classes as the textarea (`px-3 py-2`); dot count is `"•".repeat(currentValue.length)` (dynamic, not a fixed `maskedLength` prop); overlay only renders when `currentValue.length > 0`; `[caret-color:hsl(var(--foreground))]` keeps cursor visible in mask mode
- `Modal` — `modalRootSelector` resolution moved from `useMemo` (render phase) to `useEffect` + `useState`, so the portal target is resolved after DOM commit; portal is suppressed until the target is confirmed, eliminating stray modals at `document.body`
- `Modal` — `createTimeline` and open-state effects now also depend on `modalRootEl` so the GSAP timeline is built and synced correctly after the portal target is first resolved
- `Modal` — added `Escape` key handler (attached only while open, cleaned up on close/unmount)
- `Modal` — replaced `aria-hidden` with `inert` on the dialog element; added focus management (saves and restores previously focused element on open/close)
- `Modal` — `aria-labelledby` and `aria-describedby` wired to `title`/`description` elements via `useId` for correct screen-reader association
- Storybook `preview.ts` renamed to `preview.tsx`; theme decorator replaced with a custom `useGlobals` + `useEffect` decorator (from `storybook/preview-api`) that forcefully applies `dark`/`light` class to both `html` and `body` on every theme change
- `Header` stories — decorator added at meta level that wraps each story in `<div id="header-modal-root">`, used as the `modalRootSelector`; fixes portal target in both Canvas and Docs views

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
