import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Download, Send, Settings, Search } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "UI/Button/Icons",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Buttons with icons — leading, trailing, or icon-only.

Use \`size="icon"\` for a square icon-only button. For labeled buttons, place the icon before or after \`children\` — the \`gap\` on \`vi-btn\` handles spacing automatically.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const LeadingIcon: Story = {
  name: "Leading Icon",
  parameters: {
    docs: {
      description: { story: "Icon before the label — the most common pattern for action buttons." },
      source: {
        language: "tsx",
        code: `<Button><Plus className="h-4 w-4" /> Add Item</Button>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button><Plus className="h-4 w-4" /> Add Item</Button>
      <Button variant="outline"><Download className="h-4 w-4" /> Download</Button>
      <Button variant="secondary"><Settings className="h-4 w-4" /> Settings</Button>
    </div>
  ),
};

export const TrailingIcon: Story = {
  name: "Trailing Icon",
  parameters: {
    docs: {
      description: { story: "Icon after the label — useful for send/submit patterns." },
      source: {
        language: "tsx",
        code: `<Button>Send <Send className="h-4 w-4" /></Button>`,
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button>Send <Send className="h-4 w-4" /></Button>
      <Button variant="outline">Search <Search className="h-4 w-4" /></Button>
    </div>
  ),
};

export const IconOnly: Story = {
  name: "Icon Only",
  parameters: {
    docs: {
      description: { story: "`size=\"icon\"` produces a square button — always add a `title` for accessibility." },
      source: {
        language: "tsx",
        code: `
<Button size="icon" title="Add"><Plus className="h-4 w-4" /></Button>
<Button size="icon" variant="outline" title="Delete"><Trash2 className="h-4 w-4" /></Button>
<Button size="icon" variant="ghost" title="Settings"><Settings className="h-4 w-4" /></Button>`.trim(),
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button size="icon" title="Add"><Plus className="h-4 w-4" /></Button>
      <Button size="icon" variant="outline" title="Delete"><Trash2 className="h-4 w-4" /></Button>
      <Button size="icon" variant="ghost" title="Settings"><Settings className="h-4 w-4" /></Button>
      <Button size="icon" variant="destructive" title="Delete permanently"><Trash2 className="h-4 w-4" /></Button>
      <Button size="icon" variant="secondary" title="Download"><Download className="h-4 w-4" /></Button>
    </div>
  ),
};

export const AllVariantsWithIcon: Story = {
  name: "All Variants",
  parameters: {
    docs: {
      description: { story: "Leading icon across all six variants." },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="default"><Plus className="h-4 w-4" /> Default</Button>
      <Button variant="destructive"><Trash2 className="h-4 w-4" /> Destructive</Button>
      <Button variant="outline"><Download className="h-4 w-4" /> Outline</Button>
      <Button variant="secondary"><Settings className="h-4 w-4" /> Secondary</Button>
      <Button variant="ghost"><Search className="h-4 w-4" /> Ghost</Button>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: { story: "Icons scale correctly across all three labeled sizes." },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-3 items-end">
      <Button size="sm"><Plus className="h-3.5 w-3.5" /> Small</Button>
      <Button size="default"><Plus className="h-4 w-4" /> Default</Button>
      <Button size="lg"><Plus className="h-5 w-5" /> Large</Button>
    </div>
  ),
};
