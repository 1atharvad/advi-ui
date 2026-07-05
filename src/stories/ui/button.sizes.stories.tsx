import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof Button> = {
  title: "UI/Button/Sizes",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Control button height and padding via the \`size\` prop.

| Size | Height | Use case |
|---|---|---|
| \`sm\` | 32 px | Compact UI, table actions, inline buttons |
| \`default\` | 36 px | Standard forms and CTAs |
| \`lg\` | 40 px | Hero sections, prominent primary actions |
| \`icon\` | 36 × 36 px | Square icon-only buttons |
        `.trim(),
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg", "icon"],
    },
    children: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Small: Story = {
  parameters: {
    docs: {
      description: { story: "32 px height — compact rows, table actions, or inline buttons." },
    },
  },
  args: {
    size: "sm",
    children: "Small",
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      description: { story: "36 px height — the standard size for most form and CTA buttons." },
    },
  },
  args: {
    size: "default",
    children: "Default",
  },
};

export const Large: Story = {
  parameters: {
    docs: {
      description: { story: "40 px height — hero sections or prominent primary actions." },
    },
  },
  args: {
    size: "lg",
    children: "Large Button",
  },
};

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: { story: "Side-by-side comparison of all three size options." },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
