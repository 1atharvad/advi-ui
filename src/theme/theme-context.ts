import { createContext } from "react"
import type { ThemeDefinition } from "./tokens"

export type ThemeMode = "light" | "dark" | "system"

export interface ThemeContextValue {
  theme: string
  mode: ThemeMode
  themes: Record<string, ThemeDefinition>
  setTheme: (theme: string) => void
  setMode: (mode: ThemeMode) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
