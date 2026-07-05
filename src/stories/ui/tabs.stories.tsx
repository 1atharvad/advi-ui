import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const richTabs = [
  {
    value: "account",
    label: "Account",
    content: (
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Account settings</p>
        <p className="text-sm text-muted-foreground">Manage your account details and preferences.</p>
      </div>
    ),
  },
  {
    value: "security",
    label: "Security",
    content: (
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Security settings</p>
        <p className="text-sm text-muted-foreground">Update your password and two-factor authentication.</p>
      </div>
    ),
  },
  {
    value: "notifications",
    label: "Notifications",
    content: (
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Notification preferences</p>
        <p className="text-sm text-muted-foreground">Choose what you get notified about and how.</p>
      </div>
    ),
  },
];

const plainTabs = [
  { value: "overview", label: "Overview", content: "A high-level summary of your project activity and recent changes." },
  { value: "details",  label: "Details",  content: "In-depth metrics, logs, and configuration for the selected resource." },
  { value: "history",  label: "History",  content: "A full audit trail of actions taken over the past 30 days." },
];

const badgeTabs = [
  {
    value: "open",
    label: "Open",
    content: (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Open issues</span>
          <Badge>12</Badge>
        </div>
        <p className="text-sm text-muted-foreground">Issues awaiting triage or resolution.</p>
      </div>
    ),
  },
  {
    value: "closed",
    label: "Closed",
    content: (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Closed issues</span>
          <Badge variant="secondary">48</Badge>
        </div>
        <p className="text-sm text-muted-foreground">Issues resolved in the last 30 days.</p>
      </div>
    ),
  },
  {
    value: "draft",
    label: "Draft",
    content: (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Draft issues</span>
          <Badge variant="outline">3</Badge>
        </div>
        <p className="text-sm text-muted-foreground">Issues not yet ready for review.</p>
      </div>
    ),
  },
];

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Full-width tab bar with an underline active indicator. Built with native ARIA roles — \`tablist\`, \`tab\`, \`tabpanel\`.

\`content\` accepts \`ReactNode\` — pass a plain string or any JSX/component.

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| \`tabs\` | \`TabItem[]\` | — | Array of \`{ value, label, content: ReactNode, disabled? }\` |
| \`defaultValue\` | \`string\` | first tab | Uncontrolled active tab |
| \`value\` | \`string\` | — | Controlled active tab |
| \`onChange\` | \`(value: string) => void\` | — | Called on tab change |
        `.trim(),
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[480px] p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const PlainText: Story = {
  name: "Plain Text Content",
  parameters: {
    docs: {
      description: { story: "Content as a plain string — the simplest usage." },
      source: {
        language: "tsx",
        code: `
<Tabs
  tabs={[
    { value: "overview", label: "Overview", content: "A high-level summary of your project." },
    { value: "details",  label: "Details",  content: "In-depth metrics and configuration." },
    { value: "history",  label: "History",  content: "A full audit trail of actions." },
  ]}
/>`.trim(),
      },
    },
  },
  args: { tabs: plainTabs },
};

export const RichContent: Story = {
  name: "Rich Component Content",
  parameters: {
    docs: {
      description: { story: "`content` accepts any `ReactNode` — forms, cards, layouts, anything." },
      source: {
        language: "tsx",
        code: `
<Tabs
  tabs={[
    {
      value: "account",
      label: "Account",
      content: (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Account settings</p>
          <p className="text-sm text-muted-foreground">Manage your account details.</p>
        </div>
      ),
    },
  ]}
/>`.trim(),
      },
    },
  },
  args: { tabs: richTabs },
};

export const WithBadgesInContent: Story = {
  name: "With Badges in Content",
  parameters: {
    docs: {
      description: { story: "Composing other library components inside tab content." },
      source: {
        language: "tsx",
        code: `
<Tabs
  tabs={[
    {
      value: "open",
      label: "Open",
      content: (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Open issues</span>
          <Badge>12</Badge>
        </div>
      ),
    },
  ]}
/>`.trim(),
      },
    },
  },
  args: { tabs: badgeTabs },
};

export const WithDisabledTab: Story = {
  name: "With Disabled Tab",
  parameters: {
    docs: {
      description: { story: "Set `disabled: true` on a tab item to prevent selection." },
      source: {
        language: "tsx",
        code: `
<Tabs
  tabs={[
    { value: "account",       label: "Account",       content: "..." },
    { value: "security",      label: "Security",      content: "..." },
    { value: "notifications", label: "Notifications", content: "...", disabled: true },
  ]}
/>`.trim(),
      },
    },
  },
  args: {
    tabs: [
      ...richTabs.slice(0, 2),
      { ...richTabs[2], disabled: true },
    ],
  },
};

export const Controlled: Story = {
  parameters: {
    docs: {
      description: { story: "Controlled via `value` + `onChange` — active tab driven by external state." },
      source: {
        language: "tsx",
        code: `
const [active, setActive] = useState("account");

<Tabs tabs={tabs} value={active} onChange={setActive} />`.trim(),
      },
    },
  },
  render: () => {
    const [active, setActive] = useState("account");
    return (
      <div className="flex flex-col gap-3">
        <p className="text-xs text-muted-foreground">Active: {active}</p>
        <Tabs tabs={richTabs} value={active} onChange={setActive} />
      </div>
    );
  },
};
