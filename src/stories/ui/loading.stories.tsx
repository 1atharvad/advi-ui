import type { Meta, StoryObj } from "@storybook/react";
import { Loading } from "@/components/ui/loading";

const meta: Meta<typeof Loading> = {
  title: "UI/Loading",
  component: Loading,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
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

export const Default: Story = {};

export const CustomText: Story = {
  args: {
    text: "Fetching project data...",
  },
};

export const LongText: Story = {
  args: {
    text: "Processing your request, this may take a moment...",
  },
};
