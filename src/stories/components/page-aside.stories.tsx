import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PageAside, PageAsideNavItem } from "@/components/PageAside";
import { Home, Settings, Users, BarChart, FileText } from "lucide-react";

const meta: Meta<typeof PageAside> = {
  title: "Components/PageAside",
  component: PageAside,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
A fixed left-side navigation panel composed of two parts: \`PageAside\` (the shell) and \`PageAsideNavItem\` (individual nav buttons).

**PageAside Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| \`title\` | \`ReactNode\` | — | App or section name shown at the top |
| \`userName\` | \`string\` | — | Logged-in user email / name shown at the bottom |
| \`onLogout\` | \`() => void\` | — | Logout button callback — button is hidden when omitted |
| \`children\` | \`ReactNode\` | — | \`PageAsideNavItem\` elements rendered in the \`<nav>\` |

**PageAsideNavItem Props**

| Prop | Type | Description |
|---|---|---|
| \`icon\` | \`React.ElementType\` | Lucide (or any SVG) icon component |
| \`label\` | \`string\` | Navigation label text |
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageAside>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Five nav items using Lucide icons. No user info provided — the footer area is empty.",
      },
      source: {
        code: `
<PageAside title="Dashboard">
  <PageAsideNavItem icon={Home} label="Home" />
  <PageAsideNavItem icon={Users} label="Users" />
  <PageAsideNavItem icon={BarChart} label="Analytics" />
  <PageAsideNavItem icon={FileText} label="Reports" />
  <PageAsideNavItem icon={Settings} label="Settings" />
</PageAside>`.trim(),
      },
    },
  },
  render: () => (
    <PageAside title="Dashboard">
      <PageAsideNavItem icon={Home} label="Home" />
      <PageAsideNavItem icon={Users} label="Users" />
      <PageAsideNavItem icon={BarChart} label="Analytics" />
      <PageAsideNavItem icon={FileText} label="Reports" />
      <PageAsideNavItem icon={Settings} label="Settings" />
    </PageAside>
  ),
};

export const WithUser: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When `userName` and `onLogout` are provided, the user's email and a Logout button appear at the bottom of the sidebar.",
      },
      source: {
        code: `
<PageAside
  title="My App"
  userName="atharva@example.com"
  onLogout={() => handleLogout()}
>
  <PageAsideNavItem icon={Home} label="Home" />
  <PageAsideNavItem icon={Users} label="Team" />
  <PageAsideNavItem icon={BarChart} label="Analytics" />
  <PageAsideNavItem icon={Settings} label="Settings" />
</PageAside>`.trim(),
      },
    },
  },
  render: () => (
    <PageAside
      title="My App"
      userName="atharva@example.com"
      onLogout={() => alert("Logged out")}
    >
      <PageAsideNavItem icon={Home} label="Home" />
      <PageAsideNavItem icon={Users} label="Team" />
      <PageAsideNavItem icon={BarChart} label="Analytics" />
      <PageAsideNavItem icon={Settings} label="Settings" />
    </PageAside>
  ),
};

export const Minimal: Story = {
  parameters: {
    docs: {
      description: {
        story: "Bare sidebar with no title, no user info, and two nav items. Good baseline for fully custom navigation.",
      },
      source: {
        code: `
<PageAside>
  <PageAsideNavItem icon={Home} label="Home" />
  <PageAsideNavItem icon={Settings} label="Settings" />
</PageAside>`.trim(),
      },
    },
  },
  render: () => (
    <PageAside>
      <PageAsideNavItem icon={Home} label="Home" />
      <PageAsideNavItem icon={Settings} label="Settings" />
    </PageAside>
  ),
};
