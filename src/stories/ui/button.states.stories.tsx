import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof Button> = {
  title: "UI/Button/States",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Visual feedback states applied automatically or via props.

| State | How to trigger |
|---|---|
| Default | No extra props |
| Disabled | \`disabled={true}\` — reduces opacity to 50%, blocks pointer events |
| Hover / Focus | CSS-driven — no prop needed |
        `.trim(),
      },
    },
  },
  argTypes: {
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

export const Disabled: Story = {
  parameters: {
    docs: {
      description: { story: "`disabled` blocks pointer events and reduces opacity to 50%." },
    },
  },
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const AllStates: Story = {
  parameters: {
    docs: {
      description: { story: "Default beside disabled — shows the visual delta between the two states." },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};
