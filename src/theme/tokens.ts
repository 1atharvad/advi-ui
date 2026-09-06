// Single source of truth for the built-in themes' React-side token maps.
// Values must mirror src/styles/themes/{default,midnight}/_tokens.scss —
// see tokens.test.ts, which parses those files and asserts parity.

export const SEMANTIC_VARS = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
  "radius",
] as const

export type SemanticVar = (typeof SEMANTIC_VARS)[number]

export type ThemeTokens = Record<SemanticVar, string>

// Modes are fixed and independent of themes: every theme just configures
// a palette for either or both of "light"/"dark". No custom mode names.
export interface ThemeDefinition {
  light?: ThemeTokens
  dark?: ThemeTokens
}

// Exported standalone (not just nested in builtInThemes) so a consumer can
// import advi-ui's own modes and reuse/compose them into their own theme:
//   import { lightMode, darkMode } from "advi-ui"
//   const brand: ThemeDefinition = { light: lightMode, dark: darkMode }
export const lightMode: ThemeTokens = {
  background: "0 0% 100%",
  foreground: "224 71.4% 4.1%",
  card: "0 0% 100%",
  "card-foreground": "224 71.4% 4.1%",
  popover: "0 0% 100%",
  "popover-foreground": "224 71.4% 4.1%",
  primary: "220.9 39.3% 11%",
  "primary-foreground": "210 20% 98%",
  secondary: "220 14.3% 95.9%",
  "secondary-foreground": "220.9 39.3% 11%",
  muted: "220 14.3% 95.9%",
  "muted-foreground": "220 8.9% 46.1%",
  accent: "220 14.3% 95.9%",
  "accent-foreground": "220.9 39.3% 11%",
  destructive: "0 84.2% 60.2%",
  "destructive-foreground": "210 20% 98%",
  border: "220 13% 91%",
  input: "220 13% 91%",
  ring: "224 71.4% 4.1%",
  radius: "0.5rem",
}

export const darkMode: ThemeTokens = {
  background: "224 71.4% 4.1%",
  foreground: "210 20% 98%",
  card: "224 71.4% 4.1%",
  "card-foreground": "210 20% 98%",
  popover: "224 71.4% 4.1%",
  "popover-foreground": "210 20% 98%",
  primary: "210 20% 98%",
  "primary-foreground": "220.9 39.3% 11%",
  secondary: "215 27.9% 16.9%",
  "secondary-foreground": "210 20% 98%",
  muted: "215 27.9% 16.9%",
  "muted-foreground": "217.9 10.6% 64.9%",
  accent: "215 27.9% 16.9%",
  "accent-foreground": "210 20% 98%",
  destructive: "0 62.8% 30.6%",
  "destructive-foreground": "210 20% 98%",
  border: "215 27.9% 16.9%",
  input: "215 27.9% 16.9%",
  ring: "216 12.2% 83.9%",
  radius: "0.5rem",
}

export const midnightMode: ThemeTokens = {
  background: "180 40.9% 8.6%",
  foreground: "172.5 21.1% 92.5%",
  card: "180 35.8% 10.4%",
  "card-foreground": "172.5 21.1% 92.5%",
  popover: "180 35.8% 10.4%",
  "popover-foreground": "172.5 21.1% 92.5%",
  primary: "23.7 72.9% 55.1%",
  "primary-foreground": "180 40.9% 8.6%",
  secondary: "180 32.5% 15.1%",
  "secondary-foreground": "172.5 21.1% 92.5%",
  muted: "180 32.5% 15.1%",
  "muted-foreground": "173.8 21.1% 44.7%",
  accent: "175 32.9% 71.4%",
  "accent-foreground": "180 40.9% 8.6%",
  destructive: "0 62.8% 30.6%",
  "destructive-foreground": "210 20% 98%",
  border: "180 35.5% 18.2%",
  input: "180 31.1% 23.9%",
  ring: "27.1 76.9% 61%",
  radius: "0.5rem",
}

export const builtInThemes: Record<string, ThemeDefinition> = {
  default: { light: lightMode, dark: darkMode },
  midnight: { dark: midnightMode },
}
