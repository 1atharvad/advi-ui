import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Menu, type MenuEntry } from "@/components/ui/menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Copy, Archive, Trash2 } from "lucide-react";

const meta: Meta<typeof Menu> = {
  title: "UI/Menu",
  component: Menu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Accessible action menu — a trigger element that opens a flat list of menu items. Built as a custom \`role="menu"\` widget (not a native \`<select>\`), for triggering actions rather than picking a form value.

**Keyboard**

| Key | Action |
|---|---|
| \`Enter\` / \`Space\` / \`↓\` on trigger | Open menu |
| \`↑\` \`↓\` | Navigate items (skips disabled, separators, labels) |
| \`Enter\` / \`Space\` | Activate the highlighted item |
| \`Escape\` / \`Tab\` | Close menu and return focus to trigger |

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| \`items\` | \`MenuEntry[]\` | — | Array of \`{ type: "item" \\| "separator" \\| "label", ... }\` entries |
| \`trigger\` | \`ReactElement\` | — | Single element that opens the menu; receives \`onClick\`/\`onKeyDown\`/aria props via \`Slot\` |
| \`align\` | \`"start" \\| "end"\` | \`"start"\` | Horizontal alignment of the menu relative to the trigger |
| \`disabled\` | \`boolean\` | \`false\` | Disables the trigger |
| \`className\` | \`string\` | — | Applied to the root container |
| \`contentClassName\` | \`string\` | — | Applied to the menu panel |
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

const basicItems: MenuEntry[] = [
  { value: "edit", label: "Edit", icon: <Pencil className="h-4 w-4" />, shortcut: "⌘E" },
  { value: "duplicate", label: "Duplicate", icon: <Copy className="h-4 w-4" />, shortcut: "⌘D" },
  { type: "separator", value: "sep-1" },
  { value: "archive", label: "Archive", icon: <Archive className="h-4 w-4" />, disabled: true },
  { value: "delete", label: "Delete", icon: <Trash2 className="h-4 w-4" />, destructive: true },
];

export const Default: Story = {
  render: () => (
    <Menu
      items={basicItems}
      trigger={
        <Button variant="outline" size="icon" aria-label="Open menu">
          <MoreVertical className="h-4 w-4" />
        </Button>
      }
    />
  ),
};

export const AlignEnd: Story = {
  name: "Align End",
  parameters: {
    docs: {
      description: { story: "`align=\"end\"` right-aligns the menu panel to the trigger — useful near the edge of a container." },
    },
  },
  render: () => (
    <Menu
      align="end"
      items={basicItems}
      trigger={
        <Button variant="outline" size="icon" aria-label="Open menu">
          <MoreVertical className="h-4 w-4" />
        </Button>
      }
    />
  ),
};

export const WithLabelGroup: Story = {
  name: "With Label Group",
  parameters: {
    docs: {
      description: { story: "`{ type: \"label\" }` entries render as a muted, non-interactive section heading." },
    },
  },
  render: () => (
    <Menu
      items={[
        { type: "label", value: "group-1", label: "Actions" },
        { value: "edit", label: "Edit", icon: <Pencil className="h-4 w-4" /> },
        { value: "duplicate", label: "Duplicate", icon: <Copy className="h-4 w-4" /> },
        { type: "separator", value: "sep-1" },
        { value: "delete", label: "Delete", icon: <Trash2 className="h-4 w-4" />, destructive: true },
      ]}
      trigger={<Button variant="outline">Options</Button>}
    />
  ),
};

export const OnSelect: Story = {
  name: "onSelect Callback",
  parameters: {
    docs: {
      description: { story: "Each item's `onSelect` fires when clicked or activated via keyboard, then the menu closes." },
    },
  },
  render: () => {
    const [lastAction, setLastAction] = useState<string>("none");
    const items: MenuEntry[] = [
      { value: "edit", label: "Edit", onSelect: () => setLastAction("edit") },
      { value: "duplicate", label: "Duplicate", onSelect: () => setLastAction("duplicate") },
      { type: "separator", value: "sep-1" },
      { value: "delete", label: "Delete", destructive: true, onSelect: () => setLastAction("delete") },
    ];
    return (
      <div className="flex flex-col items-center gap-3">
        <Menu items={items} trigger={<Button variant="outline">Actions</Button>} />
        <p className="text-xs text-muted-foreground">
          Last action: <span className="font-medium text-foreground">{lastAction}</span>
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  name: "Disabled",
  parameters: {
    docs: {
      description: { story: "`disabled` on the `Menu` blocks the trigger from opening the menu at all." },
    },
  },
  render: () => (
    <Menu
      disabled
      items={basicItems}
      trigger={
        <Button variant="outline" size="icon" aria-label="Open menu" disabled>
          <MoreVertical className="h-4 w-4" />
        </Button>
      }
    />
  ),
};
