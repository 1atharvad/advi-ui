import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { describe, expect, it } from "vitest"
import { builtInThemes, SEMANTIC_VARS, type ThemeTokens } from "./tokens"

// Guards against src/theme/tokens.ts (the React API's token maps) drifting
// away from src/styles/themes/**/_tokens.scss (the plain-CSS source of truth).

function parseScssVars(path: string): ThemeTokens[] {
  const scss = readFileSync(fileURLToPath(new URL(path, import.meta.url)), "utf-8")
  const blocks = [...scss.matchAll(/(?::root|\.dark)\s*\{([^}]*)\}/g)]
  return blocks.map((block) => {
    const tokens = {} as ThemeTokens
    for (const match of block[1].matchAll(/--([a-z-]+):\s*([^;]+);/g)) {
      const key = match[1] as keyof ThemeTokens
      tokens[key] = match[2].trim()
    }
    return tokens
  })
}

describe("theme token parity", () => {
  it("default theme matches src/styles/themes/default/_tokens.scss", () => {
    const [light, darkOverrides] = parseScssVars("../styles/themes/default/_tokens.scss")
    // .dark only overrides a subset of :root's properties (e.g. --radius is
    // never redeclared there) — the rest is inherited via the normal CSS
    // cascade, so simulate that instead of comparing against the raw block.
    const dark = { ...light, ...darkOverrides }
    for (const key of SEMANTIC_VARS) {
      expect(builtInThemes.default.light?.[key]).toBe(light[key])
      expect(builtInThemes.default.dark?.[key]).toBe(dark[key])
    }
  })

  it("midnight theme matches src/styles/themes/midnight/_tokens.scss", () => {
    const [root] = parseScssVars("../styles/themes/midnight/_tokens.scss")
    for (const key of SEMANTIC_VARS) {
      expect(builtInThemes.midnight.dark?.[key]).toBe(root[key])
    }
  })
})
