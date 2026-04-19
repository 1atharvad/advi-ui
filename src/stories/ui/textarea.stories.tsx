import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "@/components/ui/textarea";

const meta: Meta<typeof Textarea> = {
  title: "UI/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    disabled: { control: { type: "boolean" } },
    hidden: { control: { type: "boolean" } },
    label: { control: { type: "text" } },
    description: { control: { type: "text" } },
    placeholder: { control: { type: "text" } },
    maskedLength: { control: { type: "number" } },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: { placeholder: "Write something..." },
};

export const WithLabel: Story = {
  args: {
    label: "Notes",
    placeholder: "Add your notes here...",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself...",
    description: "Max 160 characters.",
  },
};

export const WithValidation: Story = {
  args: {
    label: "Message",
    placeholder: "Your message...",
    validate: (value: string) =>
      value.length > 0 && value.length < 10
        ? "Message must be at least 10 characters."
        : null,
  },
};

export const Masked: Story = {
  args: {
    label: "Secret token",
    hidden: true,
    maskedLength: 12,
    defaultValue: "super-secret-value",
  },
};

export const Disabled: Story = {
  args: {
    label: "Read-only",
    value: "This cannot be edited.",
    disabled: true,
  },
};
