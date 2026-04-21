import type { Meta, StoryObj } from "@storybook/react";
import { Loading } from "@/components/ui/loading";

const meta: Meta<typeof Loading> = {
  title: "UI/Loading",
  component: Loading,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A minimal inline spinner with optional status text. Built as a light wrapper around an SVG spinner — no third-party dependency.

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| \`text\` | \`string\` | \`"Loading..."\` | Message displayed next to the spinner |
| \`className\` | \`string\` | — | Extra Tailwind classes for the wrapper \`<div>\` |

Accepts all standard \`HTMLDivElement\` attributes. The spinner and text inherit \`text-muted-foreground\` by default — override via \`className\` or a parent color class.
        `.trim(),
      },
    },
  },
  argTypes: {
    text: {
      control: { type: "text" },
    },
    className: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Default spinner with `\"Loading...\"` text. Inherits `text-muted-foreground` from the theme.",
      },
    },
  },
};

export const CustomText: Story = {
  parameters: {
    docs: {
      description: {
        story: "Pass a specific status message to communicate what is loading.",
      },
    },
  },
  args: {
    text: "Fetching project data...",
  },
};

export const LongText: Story = {
  parameters: {
    docs: {
      description: {
        story: "Long status strings wrap naturally — the layout uses `flex-row` with a gap between spinner and text.",
      },
    },
  },
  args: {
    text: "Processing your request, this may take a moment...",
  },
};
