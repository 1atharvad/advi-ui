import type { Meta, StoryObj } from "@storybook/react";
import { PageAside, AsideBtn, AsideText } from "@/components/PageAside";
import { Home, Settings, Users, BarChart, FileText, LogOut, Tag } from "lucide-react";

const baseItems = [
  { icon: <Home className="h-4 w-4" />, label: "Home" },
  { icon: <Users className="h-4 w-4" />, label: "Users" },
  { icon: <BarChart className="h-4 w-4" />, label: "Analytics" },
  { icon: <FileText className="h-4 w-4" />, label: "Reports" },
  { icon: <Settings className="h-4 w-4" />, label: "Settings" },
];

const meta: Meta<typeof PageAside> = {
  title: "Components/PageAside/Untoggleable",
  component: PageAside,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
A left-side navigation panel that supports both static and collapsible modes.

Pass \`open\` + \`onToggle\` to enable the expand/collapse toggle. Omit both for an always-expanded sidebar.

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| \`items\` | \`AsideItem[]\` | — | Array of \`{ icon, label, onClick, active? }\` |
| \`open\` | \`boolean\` | — | Controlled open state — omit for always-expanded |
| \`onToggle\` | \`() => void\` | — | Toggle callback — required when \`open\` is provided |
| \`title\` | \`ReactNode\` | — | Optional header — renders \`vi-aside-header\` when provided |
| \`footer\` | \`(open: boolean) => ReactNode\` | — | Footer slot above the toggle button |
| \`openWidth\` | \`string\` | \`"w-44"\` | Tailwind width class applied when expanded |
| \`className\` | \`string\` | — | Extra classes on the \`<aside>\` element |
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageAside>;

export const AlwaysOpen: Story = {
  name: "Always Open",
  parameters: {
    docs: {
      description: { story: "No `open`/`onToggle` props — sidebar is permanently expanded. Width defaults to `w-44`." },
      source: {
        language: "tsx",
        code: `
<PageAside
  items={[
    { icon: <Home className="h-4 w-4" />, label: "Home", onClick: () => {} },
    { icon: <Users className="h-4 w-4" />, label: "Users", onClick: () => {} },
    { icon: <BarChart className="h-4 w-4" />, label: "Analytics", onClick: () => {} },
    { icon: <Settings className="h-4 w-4" />, label: "Settings", onClick: () => {} },
  ]}
/>`.trim(),
      },
    },
  },
  render: () => (
    <div className="h-screen flex">
      <PageAside items={baseItems.map(item => ({ ...item, onClick: () => {} }))} />
      <div className="flex-1 p-8 text-sm text-muted-foreground">Always expanded — no toggle.</div>
    </div>
  ),
};

export const WithTitle: Story = {
  name: "With Title Header",
  parameters: {
    docs: {
      description: { story: "Pass `title` to render the `vi-aside-header` section at the top." },
      source: {
        language: "tsx",
        code: `
<PageAside
  title="Dashboard"
  items={items}
/>`.trim(),
      },
    },
  },
  render: () => (
    <div className="h-screen flex">
      <PageAside
        title="Dashboard"
        items={baseItems.map(item => ({ ...item, onClick: () => {} }))}
      />
      <div className="flex-1 p-8 text-sm text-muted-foreground">Header shown when `title` is provided.</div>
    </div>
  ),
};

export const WithFooter: Story = {
  name: "With Footer Slot",
  parameters: {
    docs: {
      description: { story: "`footer` receives the current open state — use it to show a full label or icon-only button." },
      source: {
        language: "tsx",
        code: `
<PageAside
  title="My App"
  items={items}
  footer={() => (
    <AsideBtn icon={<LogOut className="h-4 w-4" />} label="Log out" onClick={() => {}} />
  )}
/>`.trim(),
      },
    },
  },
  render: () => (
    <div className="h-screen flex">
      <PageAside
        title="My App"
        items={baseItems.map(item => ({ ...item, onClick: () => {} }))}
        footer={() => (
          <AsideBtn icon={<LogOut className="h-4 w-4" />} label="Log out" onClick={() => {}} />
        )}
      />
      <div className="flex-1 p-8 text-sm text-muted-foreground">Footer slot sits above the toggle button.</div>
    </div>
  ),
};

export const WithAsideText: Story = {
  name: "With AsideText",
  parameters: {
    docs: {
      description: { story: "`AsideText` in the footer slot — read-only display item with an optional icon, no click handler." },
      source: {
        language: "tsx",
        code: `
<PageAside
  title="My App"
  items={items}
  footer={() => (
    <AsideText icon={<Tag className="h-4 w-4" />} label="Free plan" />
  )}
/>`.trim(),
      },
    },
  },
  render: () => (
    <div className="h-screen flex">
      <PageAside
        title="My App"
        items={baseItems.map(item => ({ ...item, onClick: () => {} }))}
        footer={() => (
          <AsideText icon={<Tag className="h-4 w-4" />} label="Free plan" />
        )}
      />
      <div className="flex-1 p-8 text-sm text-muted-foreground">
        Footer uses <code>AsideText</code> — non-interactive, icon optional.
      </div>
    </div>
  ),
};

export const WithAsideTextNoIcon: Story = {
  name: "With AsideText (no icon)",
  parameters: {
    docs: {
      description: { story: "`AsideText` with label only — icon is omitted." },
      source: {
        language: "tsx",
        code: `
<PageAside
  title="My App"
  items={items}
  footer={() => <AsideText label="Free plan" />}
/>`.trim(),
      },
    },
  },
  render: () => (
    <div className="h-screen flex">
      <PageAside
        title="My App"
        items={baseItems.map(item => ({ ...item, onClick: () => {} }))}
        footer={() => <AsideText label="Free plan" />}
      />
      <div className="flex-1 p-8 text-sm text-muted-foreground">
        Footer uses <code>AsideText</code> with no icon.
      </div>
    </div>
  ),
};

export const WithTextDivider: Story = {
  name: "AsideText as Divider",
  parameters: {
    docs: {
      description: {
        story: [
          "Set `type: \"divider\"` on an item (no `onClick`) to render it as a section header between button groups.",
          "In always-open sidebars the label is always visible — collapsed behaviour (border line, first/last suppression) does not apply.",
        ].join(" "),
      },
      source: {
        language: "tsx",
        code: `
<PageAside
  items={[
    { label: "Main", type: "divider" },
    { icon: <Home className="h-4 w-4" />, label: "Home", onClick: () => {} },
    { icon: <Users className="h-4 w-4" />, label: "Users", onClick: () => {} },
    { label: "Reports", type: "divider" },
    { icon: <BarChart className="h-4 w-4" />, label: "Analytics", onClick: () => {} },
    { icon: <FileText className="h-4 w-4" />, label: "Documents", onClick: () => {} },
  ]}
/>`.trim(),
      },
    },
  },
  render: () => (
    <div className="h-screen flex">
      <PageAside
        items={[
          { label: "Main", type: "divider" as const },
          { icon: <Home className="h-4 w-4" />, label: "Home", onClick: () => {} },
          { icon: <Users className="h-4 w-4" />, label: "Users", onClick: () => {} },
          { label: "Reports", type: "divider" as const },
          { icon: <BarChart className="h-4 w-4" />, label: "Analytics", onClick: () => {} },
          { icon: <FileText className="h-4 w-4" />, label: "Documents", onClick: () => {} },
        ]}
      />
      <div className="flex-1 p-8 text-sm text-muted-foreground">
        Items without <code>onClick</code> render as section labels.
      </div>
    </div>
  ),
};

export const StickyOnPageScroll: Story = {
  name: "Sticky on Page Scroll",
  parameters: {
    docs: {
      description: {
        story: "When the surrounding page (not the nav) overflows and scrolls, the aside stays pinned to the viewport via `position: sticky`. Scroll the panel on the right to see it.",
      },
      source: {
        language: "tsx",
        code: `
<div className="flex">
  <PageAside title="Navigation" items={items} />
  <div className="flex-1 p-8 space-y-4">
    {/* tall page content that overflows and scrolls the document */}
  </div>
</div>`.trim(),
      },
    },
  },
  render: () => (
    <div className="flex">
      <PageAside
        title="Navigation"
        items={baseItems.map(item => ({ ...item, onClick: () => {} }))}
      />
      <div className="flex-1 p-8 space-y-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Scroll down — the aside stays fixed.</p>
        {Array.from({ length: 40 }, (_, i) => (
          <p key={i}>Page content block {i + 1}</p>
        ))}
      </div>
    </div>
  ),
};

export const ScrollableNav: Story = {
  name: "Scrollable Nav",
  parameters: {
    docs: {
      description: {
        story: "When the nav items overflow the viewport height, only the nav scrolls — the header and footer stay pinned and the aside always matches the viewport height.",
      },
      source: {
        language: "tsx",
        code: `
const manyItems = Array.from({ length: 30 }, (_, i) => ({
  icon: <FileText className="h-4 w-4" />,
  label: \`Item \${i + 1}\`,
  onClick: () => {},
}));

<PageAside
  title="Navigation"
  items={manyItems}
  footer={() => <AsideText icon={<Tag className="h-4 w-4" />} label="Free plan" />}
/>`.trim(),
      },
    },
  },
  render: () => {
    const manyItems = Array.from({ length: 30 }, (_, i) => ({
      icon: <FileText className="h-4 w-4" />,
      label: `Item ${i + 1}`,
      onClick: () => {},
    }));
    return (
      <div className="h-screen flex">
        <PageAside
          title="Navigation"
          items={manyItems}
          footer={() => (
            <AsideText icon={<Tag className="h-4 w-4" />} label="Free plan" />
          )}
        />
        <div className="flex-1 p-8 text-sm text-muted-foreground">
          Scroll the sidebar nav — header and footer stay fixed.
        </div>
      </div>
    );
  },
};

export const CustomWidth: Story = {
  name: "Custom Open Width",
  parameters: {
    docs: {
      description: { story: "Pass any Tailwind width class to `openWidth` — here `w-64` matches the classic sidebar width." },
      source: {
        language: "tsx",
        code: `<PageAside openWidth="w-64" items={items} />`.trim(),
      },
    },
  },
  render: () => (
    <div className="h-screen flex">
      <PageAside
        title="Wide Sidebar"
        openWidth="w-64"
        items={baseItems.map(item => ({ ...item, onClick: () => {} }))}
      />
      <div className="flex-1 p-8 text-sm text-muted-foreground">openWidth="w-64"</div>
    </div>
  ),
};
