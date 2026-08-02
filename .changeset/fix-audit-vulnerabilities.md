---
"advi-ui": patch
---

Bump `vitest`, `@vitest/coverage-v8`, and `@vitest/browser-playwright` to `^4.1.10` and refresh the lockfile, resolving all `npm audit` findings (previously 13, now 0). All affected packages are devDependencies used only for building/testing advi-ui itself — none are bundled into the published `dist/` output, so this has no runtime effect for consumers.
