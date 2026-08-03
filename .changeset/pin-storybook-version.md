---
"advi-ui": patch
---

Pin `storybook` and all `@storybook/*`/`eslint-plugin-storybook` devDependencies to exact `10.3.5` (previously `^10.3.5`, which had silently drifted to `10.5.5` via a routine `npm install`). Storybook `10.4.x`/`10.5.x` regressed dependency pre-bundling for `@storybook/addon-vitest`'s virtual `project-annotations` module — packages only reachable through it (`aria-query`, `lz-string`, `pretty-format`, ...) stopped being picked up by Vite's CJS/ESM interop and were served raw to the browser, breaking every story test at import time (`does not provide an export named ...`). Devtooling only, no runtime effect on consumers.
