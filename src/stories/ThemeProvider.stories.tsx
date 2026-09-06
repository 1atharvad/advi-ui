import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { ThemeProvider, useTheme, type ThemeDefinition, type ThemeMode } from "@/theme"

// "default" and "midnight" are the library's built-ins; "sunset" is this
// story's own custom theme, registered via ThemeProvider's `themes` prop.
const DEMO_THEMES = ["default", "midnight", "sunset"]
const ALL_MODES: ThemeMode[] = ["light", "dark", "system"]

function ThemeSwitcherDemo() {
  const { theme, mode, setTheme, setMode } = useTheme()

  return (
    <Card className="max-w-md">
      <CardTitle>Live theme switching</CardTitle>
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-2">
          {DEMO_THEMES.map((name) => (
            <Button key={name} variant={theme === name ? "default" : "secondary"} onClick={() => setTheme(name)}>
              {name}
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          {ALL_MODES.map((m) => (
            <Button key={m} variant={mode === m ? "default" : "secondary"} onClick={() => setMode(m)}>
              {m}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const meta: Meta<typeof ThemeSwitcherDemo> = {
  title: "Theme/ThemeProvider",
  component: ThemeSwitcherDemo,
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof ThemeSwitcherDemo>

// The Storybook preview already wraps every story in a ThemeProvider driven
// by the theme/mode toolbar globals — this story adds its own nested
// ThemeProvider to prove setTheme/setMode work without needing that
// toolbar, exactly as a consumer app would use them.

// A custom theme, fully filled in (both light and dark) — a warm sunset
// palette for light, a dusky purple twilight for dark.
const sunset: ThemeDefinition = {
  light: {
    background: "30 100% 97%",
    foreground: "20 40% 15%",
    card: "30 80% 95%",
    "card-foreground": "20 40% 15%",
    popover: "30 80% 95%",
    "popover-foreground": "20 40% 15%",
    primary: "24 95% 53%",
    "primary-foreground": "30 100% 97%",
    secondary: "35 90% 88%",
    "secondary-foreground": "20 40% 15%",
    muted: "35 60% 90%",
    "muted-foreground": "25 30% 40%",
    accent: "350 80% 80%",
    "accent-foreground": "20 40% 15%",
    destructive: "0 84.2% 60.2%",
    "destructive-foreground": "30 100% 97%",
    border: "30 50% 85%",
    input: "30 50% 85%",
    ring: "24 95% 53%",
    radius: "0.5rem",
  },
  dark: {
    background: "260 40% 8%",
    foreground: "30 60% 92%",
    card: "260 35% 11%",
    "card-foreground": "30 60% 92%",
    popover: "260 35% 11%",
    "popover-foreground": "30 60% 92%",
    primary: "14 90% 55%",
    "primary-foreground": "260 40% 8%",
    secondary: "260 25% 18%",
    "secondary-foreground": "30 60% 92%",
    muted: "260 25% 18%",
    "muted-foreground": "260 15% 60%",
    accent: "330 70% 55%",
    "accent-foreground": "260 40% 8%",
    destructive: "0 62.8% 30.6%",
    "destructive-foreground": "210 20% 98%",
    border: "260 25% 22%",
    input: "260 25% 22%",
    ring: "14 90% 55%",
    radius: "0.5rem",
  },
}

export const Default: Story = {
  render: () => (
    <ThemeProvider themes={{ sunset }}>
      <ThemeSwitcherDemo />
    </ThemeProvider>
  ),
}
