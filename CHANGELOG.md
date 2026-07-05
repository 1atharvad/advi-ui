# Changelog

All notable changes to **advi-ui** are documented here.

---

## [0.2.2] — 2026-07-05

### Patch Changes

- d3b5bb0: Fix `advi-ui/fonts` shipping one 655KB CSS file with every font subset base64-inlined. Vite hard-codes base64 inlining for CSS-referenced assets in library builds, ignoring `assetsInlineLimit`, so `@fontsource`'s already-correct `url()` + `unicode-range` CSS was being flattened into a single blob. `dist/fonts.css` is now built by copying `@fontsource`'s real CSS and font files into `dist/` untouched (bypassing Vite's asset pipeline for this one file) — down to ~7KB of CSS plus real font files the browser fetches only the subsets it actually renders.

---

## [0.2.1] — 2026-07-05

### Patch Changes

- 9a23629: Fix invalid HTML nesting: `MultiSelect`'s trigger no longer renders a `<button>` containing nested chip-remove `<button>`s (now a `<div role="combobox">` with equivalent keyboard/aria behavior), and the `HoverPopup` "Inline in Text" story no longer wraps block content in a `<p>`.

---

## [0.2.0] — 2026-07-05

### Changed

- Fonts (`@fontsource/raleway`, `@fontsource/unbounded`, `@fontsource/rubik`) no longer load automatically from the main entry — they now ship as a separate opt-in `advi-ui/fonts` export, cutting `advi-ui.css` from 712 KB to 73 KB. Consumers who want the bundled fonts must add `import "advi-ui/fonts"` alongside `advi-ui/styles`
- `gsap` and `lucide-react` moved from `dependencies` to `peerDependencies` — they were being bundled into consumer apps twice (once inside `advi-ui`, once from the app's own install). Consumers must now have both installed directly
- `sass` moved to `devDependencies` (build-time only)
- `vite.config.ts` — build now emits two lib entries (`advi-ui` and `fonts`) with `cssCodeSplit` for independent CSS output per entry
- Fixed 39 lint errors across the codebase: story files now import `Meta`/`StoryObj` from `@storybook/react-vite` instead of the raw renderer package; removed `no-explicit-any` in `utils.ts`; fixed ref-during-render violations in `SearchInput` and `modal.tsx`; split `buttonVariants` and the toast API out of `button.tsx`/`toast.tsx` into their own modules
- Fixed stale `Introduction.mdx` (referenced a nonexistent `Toast` export, missing fonts import)

### Removed

- Unused `@fontsource-variable/geist` dependency — never imported, not referenced by the Tailwind font config

### Added

- `.github/workflows/ci.yml` — `checks` job runs lint, build, size-limit, and the Storybook/vitest test suite on every push/PR to `main`; a `release` job (gated on `checks` passing) runs Changesets directly on any push to `main` with pending changesets — bumps the version, updates the changelog, commits, and publishes to npm in one run, no manual PR merge required
- Adopted `@changesets/cli` for version bumps and changelog entries going forward
- Fixed the Storybook test runner, which was completely broken (`.storybook/vitest.setup.ts` never existed, and `vitest.config.ts` was missing the `@` path alias). All 32 story files now run as tests
- `size-limit` with `@size-limit/file` to guard against bundle-size regressions on `advi-ui.es.js`, `advi-ui.css`, and `fonts.css`

---

## [0.1.19] — 2026-06-30

### Changed

- `PageAside` — aside now uses `sticky top-0` so it stays pinned to the viewport when the surrounding page content scrolls past it, independent of the nav's own internal scroll
- Added toggleable/untoggleable stories demonstrating both scroll behaviors (page scroll vs. internal nav scroll)

---

## [0.1.18] — 2026-06-30

### Changed

- `PageAside` — aside locked to `h-screen` with header, footer, and toggle fixed in place so only the nav list scrolls when items overflow
- `PageAside` — nav items marked `shrink-0` to stop them from shrinking instead of scrolling
- Added toggleable/untoggleable stories covering the internal nav scroll behavior

---

## [0.1.17] — skipped

---

## [0.1.16] — 2026-06-25

### Added

- `AsideText` component to `PageAside` — non-interactive display item sharing `AsideBtn`'s visual structure, with optional icon, active, and tooltip props
- `type="divider"` support on `AsideText` to render a section header between nav button groups; in collapsed mode dividers render as a `border-t` line, with first/last dividers suppressed to avoid orphaned lines
- `className` prop on `AsideBtn`

### Changed

- `AsideItem.icon` and `onClick` made optional so items without `onClick` render as `AsideText` automatically
- Added `vi-aside-item-text` and `vi-aside-item-divider-line` SCSS classes
- Added source code blocks to all `Switch` stories
- Added `AsideText` and divider stories to both `PageAside` story files

---

## [0.1.15] — 2026-05-16

### Changed

- `year-dot-nav.scss` — nav container repositioned to `right-3` on mobile and `right-6` on `md+` so the hit area is not clipped by the viewport edge on small screens
- `year-dot-nav.scss` — `touch-manipulation` added to `vi-year-dot-nav-btn` to eliminate the 300 ms tap delay on iOS/Android
- `year-dot-nav.scss` — `vi-year-dot-nav-group` gap increased to `10px` and `items-center` added for consistent vertical rhythm between year and month dot groups
- `year-dot-nav.scss` — `vi-year-dot-nav-months` padding changed from `padding-block: 6px` to `pb-1` and `vi-year-dot-nav-btn--month` padding unified with the year button (`p-2 -m-2`)
- `year-dot-nav.scss` — hover label offset updated to `right-[22px]` to align correctly with the repositioned buttons

---

## [0.1.14] — 2026-05-16

### Changed

- `YearDotNav` — `years: number[]` prop replaced by `items: YearDotNavItem[]` (`{ year: number; months?: number[] }`) to support optional per-year month navigation; year-only usage still works by omitting `months`
- `YearDotNav` — month dots collapse/expand below the year dot: they render only when `activeYear === year`, acting as a breadcrumb so the year dot stays filled while a month is active
- `YearDotNav` — separate `IntersectionObserver` per month element (`#year-{year}-month-{month}`) sets both `activeYear` and `activeMonth`; clicking a month dot calls `scrollToMonth(year, month)` which updates both states then smooth-scrolls
- `YearDotNav` — `MONTH_LABELS` maps 1-based month numbers to three-letter abbreviations shown in the hover pill
- `YearDotNav` — inactive dots enlarged to 9 × 9 px (year) and 6 × 6 px (month); active dot scales to 1.1×; month button hit area widened to 24 × 24 px via `p-3 -m-3`
- `year-dot-nav.scss` — added `vi-year-dot-nav-group`, `vi-year-dot-nav-months`, `vi-year-dot-nav-dot--month`, `vi-year-dot-nav-btn--month`; month group uses `padding-block: 6px` and `gap: 8px`
- Storybook — `year-dot-nav.stories.tsx` rewritten: `Default` story includes year+month sections; added `YearsOnly`, `AlignTop`, `AlignBottom` stories; docs-view wrapper applies `h-[55vh] overflow-y-scroll` only when `viewMode === 'docs'`

---

## [0.1.12] — 2026-05-15

### Added

- `YearDotNav` component (`src/components/YearDotNav.tsx`) — fixed right-rail dot navigation that tracks which year section is in view using one `IntersectionObserver` per year; clicking a dot smooth-scrolls to that section; hovering reveals a pill label with a slide-in transition
- `scrollAlign` prop (`'top' | 'center' | 'bottom'`, default `'center'`) — controls where the target section lands in the viewport after a dot click; `top` aligns the section's top edge to the viewport top, `bottom` aligns its bottom edge to the viewport bottom
- Programmatic scroll lock — clicking a dot sets `isProgrammaticScrollRef` so the active dot stays fixed on the clicked year while the smooth-scroll plays; cleared via the native `scrollend` event (Chrome 114+, Firefox 109+) with a 150 ms debounced `scroll` listener as a Safari fallback
- `year-dot-nav.scss` — `vi-year-dot-nav-*` BEM styles; inactive dots at 30% opacity, active dot scales to 1.4× and fills with `--primary`; label slides in from `translateX(4px)` on hover
- Storybook stories for `YearDotNav` (`Components/YearDotNav`) — Default (center), Scroll Align Top, Scroll Align Bottom; sections use alternating heights (40 vh – 160 vh) so alignment differences are visually distinct

---

## [0.1.11] — 2026-05-06

### Fixed

- `Button` — focus no longer shifts button width; replaced `border-[1px]` on `:focus` with `box-shadow: 0 0 0 1px hsl(var(--border))` on `:focus:not(:focus-visible)` so click feedback renders outside the box model without affecting layout

### Changed

- `Button` — `rounded-[30px]` moved to base class; per-variant duplication removed; `ghost` overrides with `rounded-md`, `link` with `rounded-none`, `icon` size with `rounded-md`
- `Button` — `outline` variant border upgraded from `border` (1px) to `border-2` to match `default`, `destructive`, and `secondary`
- `Button` — `focus-visible` ring upgraded from `ring-1` to `ring-2 ring-offset-2` for clearer keyboard navigation indicator
- `Button` — `transition-colors` replaced with `transition-all` to cover opacity and scale transitions
- `Button` — active/press state added: `active:opacity-80 active:scale-[0.98]`; `transform: translateZ(0)` forces GPU compositing to prevent text subpixel jitter during scale
- `Button` — click focus shadow (`box-shadow`) suppressed on `ghost` and `link` variants

---

## [0.1.10] — 2026-05-03

### Added

- `AsideBtn` component exported from `src/components/PageAside.tsx` — reusable ghost button with icon + animated label; used internally by `PageAside` nav and available for custom footer slots
- `Button` icons Storybook stories (`UI/Button/Icons`) — Leading Icon, Trailing Icon, Icon Only (`size="icon"`), All Variants with icon, Sizes

### Changed

- `PageAside` — full redesign; replaced the old `PageAside`/`PageAsideNavItem` pattern with a single unified component supporting both always-open and collapsible modes
  - Pass `open` + `onToggle` to enable the collapse/expand chevron; omit both for a permanently expanded sidebar
  - `title` prop renders a `vi-aside-header` section; `footer` prop accepts `(open: boolean) => ReactNode` for a footer slot
  - `openWidth` prop (default `"w-44"`) controls the expanded width via a Tailwind class
  - Label show/hide is CSS-driven (`max-width` + `opacity` transition) — no JS mount/unmount
  - Gap collapses with a `transition: gap 0s 200ms` delay so the icon gap only snaps to zero after the label animation finishes
  - `vi-aside-footer` and `vi-aside-toggle` are now sibling elements, each with its own `border-t` divider — no double borders regardless of which slots are used
  - CSS specificity overrides (`0,2,0` / `0,3,0`) replace all `!important` declarations
- `PageAside` Storybook stories split into two files: `page-aside.untoggleable.stories.tsx` (Always Open, With Title, With Footer, Custom Width) and `page-aside.toggleable.stories.tsx` (Default, Active Item, With Footer, Starts Collapsed); all footer examples use `<AsideBtn>` for consistent animation

---

## [0.1.9] — 2026-04-27

### Added

- `SearchInput` component (`src/components/SearchInput.tsx`) — richer search input built on a native `<input type="search">`; features a persistent search icon, debounced `onSearch` callback (300 ms default, pass `0` to disable), clear button (X) that appears when the field has a value, `Escape` key to clear, loading spinner (`loading` prop) that replaces the clear button during async operations, and an optional keyboard-shortcut badge (`shortcut` prop, e.g. `"⌘K"`) shown when the field is empty; supports controlled and uncontrolled usage
- `SearchInput` — `showButton` prop adds an icon-only search button to the right of the input; `onSearch` fires immediately on button click or `Enter` (debounce bypassed); search icon moves from the left of the input into the button
- `search-input.scss` — `vi-search-input-*` styles; `vi-search-input-group` wraps the input + button pair with shared focus ring
- Storybook stories for `SearchInput` (`Components/SearchInput`) — Default, With Shortcut Badge, With Search Button, Loading State, Controlled + onSearch, Disabled
- `Table` component (`src/components/ui/table.tsx`) — composable table built from eight forwarded sub-components: `Table` (scroll-safe wrapper + `<table>`), `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption` (`<p>` outside the `<table>`, centered, `text-xs`); hover highlight on rows; muted background on header and footer; all sub-components accept `className` and forward refs
- `table.scss` — `vi-table-*` styles following the `@layer components` + `@apply` pattern
- Storybook stories for `Table` (`UI/Table`) — Default, With Footer, With Caption

### Changed

- `ScrollAnimationBtn` story — moved from `src/stories/ui/button.custom.stories.tsx` to `src/stories/components/scroll-animation-btn.stories.tsx`; Storybook title updated from `"UI/Button/Custom"` to `"Components/ScrollAnimationBtn"`
- `Button` — `vi-btn-size-icon` corrected from `h-9 w-9` to `h-10 w-10` to match the default button height
- `utils.ts` — rewrote all exports as arrow functions; fixed broken syntax; added `round(value, decimal)`, `clamp(value, min, max)`, `truncate(str, maxLength, suffix?)`, `throttle(func, limit)`, and `debounce(func, delay)`; `debounce` return value exposes a `.cancel()` method to flush any pending call; generic constraints use `any[]` (correct for higher-order function inference)
- `SearchInput` — replaced inline `setTimeout`/`clearTimeout` ref pattern with the shared `debounce` utility; `debouncedSearch` is memoised by `debounceMs` and cleaned up on unmount via `.cancel()`

---

## [0.1.8] — 2026-04-26

### Added

- `Accordion` component — powered by `@radix-ui/react-accordion`; handles open/close state, keyboard navigation, and ARIA automatically; supports `single` (collapsible) and `multiple` modes, controlled/uncontrolled usage, and disabled items; `content` accepts `ReactNode` (plain string or any JSX); CSS height animation via `--radix-accordion-content-height`; renamed root class to `vi-accordion-container`
- `Badge` component — inline pill label with `variant` (`filled` / `border`) and `color` (`default` / `secondary` / `destructive`) props; static class lookup maps replace template literals to ensure classes are always detectable; `sm` / `default` / `lg` sizes
- `Checkbox` component — individual checkbox with `sm`/`default`/`lg` sizes, `indeterminate` support via `useImperativeHandle`, and CSS-only state styling via `:has(input:checked/disabled/focus-visible)`; `CheckboxGroup` manages array state for multi-select
- `Switch` component — pill toggle using `role="switch"` on a hidden checkbox input; configurable label position (`left`/`right`); `sm`/`default`/`lg` sizes
- `Tabs` component — full-width tab bar with primary-color underline active indicator; built with native ARIA `tablist`/`tab`/`tabpanel` roles; `content` accepts `ReactNode`; controlled and uncontrolled usage; disabled tab support
- SCSS files for all five components following the `vi-*` + `@layer components` + `@apply` pattern
- Storybook stories for all five components — each story includes `parameters.docs.source.code` with clean, readable code snippets; stories demonstrate plain-text content, rich ReactNode content, disabled states, controlled usage, and component composition

### Changed

- `Button` — default `type` set to `"button"` to prevent accidental form submission when used inside or near a form
- `Accordion` stories — added `PlainText` and `RichContent` stories to demonstrate `ReactNode` content flexibility; all stories include explicit source code blocks
- `Tabs` stories — added `PlainText`, `RichContent`, and `WithBadgesInContent` stories; all stories include explicit source code blocks; redesigned tab bar to full-width underline style with `bg-primary` active indicator and `::after` pseudo-element

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
