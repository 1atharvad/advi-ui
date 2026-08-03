---
"advi-ui": minor
---

Add `AsideDrawer`, a `PageAside` pre-wired into `Modal` (`vi-modal-slide-left` variant) for mobile off-canvas navigation — pass `open`/`onOpenChange`/`trigger` in place of `PageAside`'s own `open`/`onToggle`, and it forwards every other `PageAside` prop. Pair it with a plain `PageAside` for the desktop static sidebar; visibility at each breakpoint is left to your own CSS (e.g. `hidden md:flex` on the desktop instance).

The drawer also auto-closes when the viewport crosses into desktop width (`min-width: 768px` by default, configurable via `closeBreakpoint`) while open, so it can't get stuck open behind a hidden trigger after a resize.
