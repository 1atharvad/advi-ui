import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "@/components/ui/badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Inline pill label for status, categories, or counts. Four variants and three sizes.

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| \`variant\` | \`"default" \\| "secondary" \\| "destructive" \\| "outline"\` | \`"default"\` | Color scheme |
| \`size\` | \`"sm" \\| "default" \\| "lg"\` | \`"default"\` | Text and padding size |
| \`children\` | \`ReactNode\` | — | Badge label |
        `.trim(),
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  parameters: { docs: { description: { story: "Default badge using the primary color." } } },
  args: { children: "New" },
};

export const Variants: Story = {
  parameters: {
    docs: { description: { story: "All four variants side by side." } },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    docs: { description: { story: "Three size variants: `sm`, `default`, and `lg`." } },
  },
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge>Default</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

export const InlineWithText: Story = {
  name: "Inline with Text",
  parameters: {
    docs: { description: { story: "Badges embedded in prose — common for status indicators." } },
  },
  render: () => (
    <div className="flex flex-col gap-2 text-sm max-w-xs">
      <p className="flex items-center gap-2">
        Dashboard <Badge size="sm">Beta</Badge>
      </p>
      <p className="flex items-center gap-2">
        Payments <Badge variant="destructive" size="sm">Overdue</Badge>
      </p>
      <p className="flex items-center gap-2">
        Reports <Badge variant="secondary" size="sm">3 new</Badge>
      </p>
      <p className="flex items-center gap-2">
        Settings <Badge variant="outline" size="sm">Preview</Badge>
      </p>
    </div>
  ),
};
