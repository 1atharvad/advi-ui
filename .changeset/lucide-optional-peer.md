---
"advi-ui": patch
---

Mark `lucide-react` as an optional peer dependency (`peerDependenciesMeta`). It's already bundled directly into advi-ui's build output (not externalized by Vite), so it was never actually required in a consumer's `node_modules` for the default icons to render — the `peerDependency` declaration was just causing unnecessary install warnings/failures for anyone who didn't happen to have it installed.
