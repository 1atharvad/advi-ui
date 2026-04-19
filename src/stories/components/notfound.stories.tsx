import type { Meta, StoryObj } from "@storybook/react";
import { PageNotFound } from "@/components/PageNotFound";

const meta: Meta<typeof PageNotFound> = {
  title: "Components/PageNotFound",
  component: PageNotFound,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof PageNotFound>;

export const Default: Story = {};
