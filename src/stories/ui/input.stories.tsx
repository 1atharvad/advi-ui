import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/components/ui/input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
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
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "search", "url"],
    },
    disabled: { control: { type: "boolean" } },
    label: { control: { type: "text" } },
    description: { control: { type: "text" } },
    placeholder: { control: { type: "text" } },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: "Enter text..." },
};

export const WithLabel: Story = {
  args: {
    label: "Email address",
    type: "email",
    placeholder: "you@example.com",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Username",
    placeholder: "johndoe",
    description: "Only letters, numbers, and underscores.",
  },
};

export const WithValidation: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
    validate: (value: string) =>
      !value.includes("@") ? "Enter a valid email address." : null,
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    description: "Minimum 8 characters.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Read-only field",
    value: "Cannot be edited",
    disabled: true,
  },
};
