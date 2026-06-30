import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PageAside, AsideBtn, AsideText } from "@/components/PageAside";
import { Home, Users, BarChart, FileText, Settings, LogOut, Info } from "lucide-react";

const navItems = [
  { icon: <Home className="h-4 w-4" />, label: "Home" },
  { icon: <Users className="h-4 w-4" />, label: "Users" },
  { icon: <BarChart className="h-4 w-4" />, label: "Analytics" },
  { icon: <FileText className="h-4 w-4" />, label: "Reports" },
  { icon: <Settings className="h-4 w-4" />, label: "Settings" },
];

const meta: Meta<typeof PageAside> = {
  title: "Components/PageAside/Toggleable",
  component: PageAside,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Toggleable variants — pass \`open\` + \`onToggle\` to enable the collapse/expand chevron at the bottom.

When collapsed, items show icon-only with a tooltip on hover. Labels animate in when expanded.
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
      description: { story: "Click the chevron at the bottom to collapse and expand." },
      source: {
        language: "tsx",
        code: `
const [open, setOpen] = useState(true);

<PageAside
  open={open}
  onToggle={() => setOpen(o => !o)}
  items={[
    { icon: <Home className="h-4 w-4" />, label: "Home", onClick: () => {} },
    { icon: <Users className="h-4 w-4" />, label: "Users", onClick: () => {} },
    { icon: <Settings className="h-4 w-4" />, label: "Settings", onClick: () => {} },
  ]}
/>`.trim(),
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="h-screen flex">
        <PageAside
          open={open}
          onToggle={() => setOpen(o => !o)}
          items={navItems.map(item => ({ ...item, onClick: () => {} }))}
        />
        <div className="flex-1 p-8 text-sm text-muted-foreground">
          Click the chevron to toggle the sidebar.
        </div>
      </div>
    );
  },
};

export const WithActiveItem: Story = {
  name: "Active Item",
  parameters: {
    docs: {
      description: { story: "Click any item to set it as active. Active state is highlighted with a primary tint." },
      source: {
        language: "tsx",
        code: `
const [open, setOpen] = useState(true);
const [active, setActive] = useState("Home");

<PageAside
  open={open}
  onToggle={() => setOpen(o => !o)}
  items={items.map(item => ({
    ...item,
    active: item.label === active,
    onClick: () => setActive(item.label),
  }))}
/>`.trim(),
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(true);
    const [active, setActive] = useState("Home");
    return (
      <div className="h-screen flex">
        <PageAside
          open={open}
          onToggle={() => setOpen(o => !o)}
          items={navItems.map(item => ({
            ...item,
            active: item.label === active,
            onClick: () => setActive(item.label),
          }))}
        />
        <div className="flex-1 p-8 text-sm text-muted-foreground">
          Active: <span className="font-medium text-foreground">{active}</span>
        </div>
      </div>
    );
  },
};

export const WithFooter: Story = {
  name: "With Footer",
  parameters: {
    docs: {
      description: { story: "`footer` receives the current open state — adapt the UI accordingly (label vs icon-only)." },
      source: {
        language: "tsx",
        code: `
<PageAside
  open={open}
  onToggle={() => setOpen(o => !o)}
  items={items}
  footer={() => (
    <AsideBtn icon={<LogOut className="h-4 w-4" />} label="Log out" onClick={() => {}} />
  )}
/>`.trim(),
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="h-screen flex">
        <PageAside
          open={open}
          onToggle={() => setOpen(o => !o)}
          items={navItems.map(item => ({ ...item, onClick: () => {} }))}
          footer={() => (
            <AsideBtn icon={<LogOut className="h-4 w-4" />} label="Log out" onClick={() => {}} />
          )}
        />
        <div className="flex-1 p-8 text-sm text-muted-foreground">
          Footer adapts: shows label when open, icon-only when collapsed.
        </div>
      </div>
    );
  },
};

export const WithAsideText: Story = {
  name: "With AsideText",
  parameters: {
    docs: {
      description: { story: "`AsideText` used as a read-only label in the footer slot — no click handler, same visual structure as `AsideBtn`." },
      source: {
        language: "tsx",
        code: `
<PageAside
  open={open}
  onToggle={() => setOpen(o => !o)}
  items={items}
  footer={() => (
    <AsideText icon={<Info className="h-4 w-4" />} label="v1.0.0" />
  )}
/>`.trim(),
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="h-screen flex">
        <PageAside
          open={open}
          onToggle={() => setOpen(o => !o)}
          items={navItems.map(item => ({ ...item, onClick: () => {} }))}
          footer={() => (
            <AsideText icon={<Info className="h-4 w-4" />} label="v1.0.0" />
          )}
        />
        <div className="flex-1 p-8 text-sm text-muted-foreground">
          Footer uses <code>AsideText</code> — non-interactive, icon optional.
        </div>
      </div>
    );
  },
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
  open={open}
  onToggle={() => setOpen(o => !o)}
  items={items}
  footer={() => <AsideText label="v1.0.0" />}
/>`.trim(),
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="h-screen flex">
        <PageAside
          open={open}
          onToggle={() => setOpen(o => !o)}
          items={navItems.map(item => ({ ...item, onClick: () => {} }))}
          footer={() => <AsideText label="v1.0.0" />}
        />
        <div className="flex-1 p-8 text-sm text-muted-foreground">
          Footer uses <code>AsideText</code> with no icon.
        </div>
      </div>
    );
  },
};

export const WithTextDivider: Story = {
  name: "AsideText as Divider",
  parameters: {
    docs: {
      description: {
        story: [
          "Set `type: \"divider\"` on an item (no `onClick`) to render it as a section header between button groups.",
          "When the sidebar is **collapsed**, dividers render as a horizontal `border-t` line instead of a label.",
          "Dividers at the **first or last** position in the nav are suppressed in collapsed mode to avoid orphaned lines.",
        ].join(" "),
      },
      source: {
        language: "tsx",
        code: `
const [open, setOpen] = useState(true);

<PageAside
  open={open}
  onToggle={() => setOpen(o => !o)}
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
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="h-screen flex">
        <PageAside
          open={open}
          onToggle={() => setOpen(o => !o)}
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
    );
  },
};

export const ScrollableNav: Story = {
  name: "Scrollable Nav",
  parameters: {
    docs: {
      description: {
        story: "When the nav items overflow the viewport height, only the nav scrolls — the header, footer, and toggle stay pinned and the aside always matches the viewport height.",
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
  open={open}
  onToggle={() => setOpen(o => !o)}
  items={manyItems}
  footer={() => <AsideText icon={<Info className="h-4 w-4" />} label="v1.0.0" />}
/>`.trim(),
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(true);
    const manyItems = Array.from({ length: 30 }, (_, i) => ({
      icon: <FileText className="h-4 w-4" />,
      label: `Item ${i + 1}`,
      onClick: () => {},
    }));
    return (
      <div className="h-screen flex">
        <PageAside
          title="Navigation"
          open={open}
          onToggle={() => setOpen(o => !o)}
          items={manyItems}
          footer={() => (
            <AsideText icon={<Info className="h-4 w-4" />} label="v1.0.0" />
          )}
        />
        <div className="flex-1 p-8 text-sm text-muted-foreground">
          Scroll the sidebar nav — header and footer stay fixed.
        </div>
      </div>
    );
  },
};

export const StartsCollapsed: Story = {
  name: "Starts Collapsed",
  parameters: {
    docs: {
      description: { story: "Initialised in the collapsed state — icons only, tooltips on hover." },
      source: {
        language: "tsx",
        code: `
const [open, setOpen] = useState(false);

<PageAside open={open} onToggle={() => setOpen(o => !o)} items={items} />`.trim(),
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="h-screen flex">
        <PageAside
          open={open}
          onToggle={() => setOpen(o => !o)}
          items={navItems.map(item => ({ ...item, onClick: () => {} }))}
        />
        <div className="flex-1 p-8 text-sm text-muted-foreground">
          Click the chevron to expand.
        </div>
      </div>
    );
  },
};
