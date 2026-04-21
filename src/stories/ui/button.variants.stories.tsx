import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof Button> = {
  title: "UI/Button/Variants",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/X77t4PW8CWAzV5ppFNux62/ADVI-UI?node-id=2-66",
    },
    docs: {
      description: {
        component: `
The primary interactive element. Built with **class-variance-authority** and Radix \`Slot\` for composition.

**Variants**

| Variant | Use case |
|---|---|
| \`default\` | Primary call-to-action — solid filled background |
| \`destructive\` | Irreversible / dangerous actions (delete, revoke) |
| \`outline\` | Secondary action alongside a primary — border only, no fill |
| \`secondary\` | Tertiary or less-prominent actions — lighter background |
| \`ghost\` | Toolbar icons or inline actions — no background or border |
| \`link\` | Inline hyperlink-style action |

Pass \`asChild\` to render button styles on a child element (e.g. \`<a>\` or a router \`<Link>\`) without an extra DOM node.
        `.trim(),
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    children: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  parameters: {
    docs: {
      description: { story: "Primary call-to-action — solid filled background, highest visual weight." },
    },
  },
  args: {
    variant: "default",
    children: "Primary Button",
  },
};

export const Destructive: Story = {
  parameters: {
    docs: {
      description: { story: "Use for irreversible actions like deletion or revocation. Renders in red." },
    },
  },
  args: {
    variant: "destructive",
    children: "Delete",
  },
};

export const Outline: Story = {
  parameters: {
    docs: {
      description: { story: "Secondary action alongside a primary — border only, no fill." },
    },
  },
  args: {
    variant: "outline",
    children: "Outline Button",
  },
};

export const Secondary: Story = {
  parameters: {
    docs: {
      description: { story: "Tertiary or less-prominent actions — lighter background, lower visual weight." },
    },
  },
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Ghost: Story = {
  parameters: {
    docs: {
      description: { story: "No background or border — merges into the surface. Ideal for toolbar icons or inline actions." },
    },
  },
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};

export const Link: Story = {
  parameters: {
    docs: {
      description: { story: "Renders as underlined text. Use for inline navigation-style actions." },
    },
  },
  args: {
    variant: "link",
    children: "Link Button",
  },
};

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: { story: "Side-by-side comparison of all six variants." },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};
