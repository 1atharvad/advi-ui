import { useEffect, useMemo, useState, type ReactNode } from "react"
import { SEMANTIC_VARS, builtInThemes, type ThemeDefinition, type ThemeTokens } from "./tokens"
import { ThemeContext, type ThemeContextValue, type ThemeMode } from "./theme-context"

export interface ThemeProviderProps {
  /** Key into the theme registry (built-ins + `themes`). Switchable at runtime via useTheme()'s setTheme. */
  theme?: string
  /** Custom themes to register, merged with (and able to override) the built-ins. */
  themes?: Record<string, ThemeDefinition>
  /** "system" follows and stays in sync with prefers-color-scheme. Switchable at runtime via useTheme()'s setMode. */
  mode?: ThemeMode
  children?: ReactNode
}

// A theme that doesn't define a mode (e.g. "midnight" has no "light")
// falls back to the "default" theme's palette for that mode, rather than
// its own other mode — so every theme supports both light and dark, even
// if it only customizes one of them. Falls back once more to the actual
// built-in default (not a possibly-overridden registry "default") so a
// consumer overriding "default" with only one mode can't silently break
// this fallback for every other theme.
function resolveTokens(definition: ThemeDefinition, resolvedMode: "light" | "dark", registryDefault: ThemeDefinition): ThemeTokens {
  const tokens = definition[resolvedMode] ?? registryDefault[resolvedMode] ?? builtInThemes.default[resolvedMode]
  if (!tokens) {
    console.error(`advi-ui: no "${resolvedMode}" palette found for this theme or the default theme.`)
  }
  return tokens ?? ({} as ThemeTokens)
}

export function ThemeProvider({
  theme: initialTheme = "default",
  themes: customThemes,
  mode: initialMode = "system",
  children,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState(initialTheme)
  const [mode, setMode] = useState(initialMode)
  const [prefersDark, setPrefersDark] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
  )

  // Keeps a parent that re-renders with a new `theme`/`mode` prop (e.g. a
  // Storybook toolbar control, or a consumer's own controlled state) in
  // sync. Adjusting state during render (not in an effect) is the pattern
  // React recommends for this — it bails out and re-renders before commit,
  // avoiding an extra effect-triggered render pass.
  const [prevInitialTheme, setPrevInitialTheme] = useState(initialTheme)
  if (initialTheme !== prevInitialTheme) {
    setPrevInitialTheme(initialTheme)
    setTheme(initialTheme)
  }
  const [prevInitialMode, setPrevInitialMode] = useState(initialMode)
  if (initialMode !== prevInitialMode) {
    setPrevInitialMode(initialMode)
    setMode(initialMode)
  }

  const themes = useMemo(() => ({ ...builtInThemes, ...customThemes }), [customThemes])

  useEffect(() => {
    if (mode !== "system") return
    const query = window.matchMedia("(prefers-color-scheme: dark)")
    const listener = (event: MediaQueryListEvent) => setPrefersDark(event.matches)
    query.addEventListener("change", listener)
    return () => query.removeEventListener("change", listener)
  }, [mode])

  useEffect(() => {
    const definition = themes[theme]
    if (!definition) {
      console.error(`advi-ui: theme "${theme}" isn't registered; falling back to "default".`)
    }
    const activeDefinition = definition ?? themes.default
    const resolvedMode: "light" | "dark" = mode === "system" ? (prefersDark ? "dark" : "light") : mode
    const tokens = resolveTokens(activeDefinition, resolvedMode, themes.default)
    const root = document.documentElement

    for (const key of SEMANTIC_VARS) {
      root.style.setProperty(`--${key}`, tokens[key])
    }
    root.classList.toggle("dark", resolvedMode === "dark")

    return () => {
      for (const key of SEMANTIC_VARS) {
        root.style.removeProperty(`--${key}`)
      }
    }
  }, [theme, themes, mode, prefersDark])

  const value = useMemo<ThemeContextValue>(() => ({ theme, mode, themes, setTheme, setMode }), [theme, mode, themes])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
