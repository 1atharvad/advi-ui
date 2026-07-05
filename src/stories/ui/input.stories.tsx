import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "@/components/ui/input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Enhanced \`<input>\` that layers a **label**, **description hint**, and **inline validation error** on top of the native element. All standard HTML input attributes pass through via spread.

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| \`label\` | \`string\` | — | Label rendered above the input |
| \`description\` | \`string\` | — | Helper text rendered below the input |
| \`validate\` | \`(value: string) => string \\| null\` | — | Called on every keystroke; return an error string or \`null\` |
| \`onValueChange\` | \`(value: string) => void\` | — | Fires on every change with the raw value |
| \`type\` | HTML input type | \`"text"\` | Supports \`password\`, \`email\`, \`number\`, etc. |
| \`disabled\` | \`boolean\` | \`false\` | Disables the input with reduced opacity |

When \`validate\` returns a non-null string the border turns red and the error message appears below the input.
        `.trim(),
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: "Bare input with no label or extras — all standard HTML input attributes pass through directly.",
      },
    },
  },
  args: { placeholder: "Enter text..." },
};

export const WithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: "Renders a visible `<label>` above the input. Pass any `type` to control the browser's input behavior.",
      },
    },
  },
  args: {
    label: "Email address",
    type: "email",
    placeholder: "you@example.com",
  },
};

export const WithDescription: Story = {
  parameters: {
    docs: {
      description: {
        story: "Adds muted helper text beneath the input. Useful for format hints or field constraints.",
      },
    },
  },
  args: {
    label: "Username",
    placeholder: "johndoe",
    description: "Only letters, numbers, and underscores.",
  },
};

export const WithValidation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`validate` fires on every keystroke. Return a non-null string to show a red error message and red border below the input; return `null` to clear it.",
      },
    },
  },
  args: {
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
    validate: (value: string) =>
      !value.includes("@") ? "Enter a valid email address." : null,
  },
};

export const Password: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Pass `type=\"password\"` for the browser's native masked input. Combine `description` with password strength hints.",
      },
    },
  },
  args: {
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    description: "Minimum 8 characters.",
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`disabled` reduces opacity and sets `cursor: not-allowed`. The field is still present in the DOM and can hold a value.",
      },
    },
  },
  args: {
    label: "Read-only field",
    value: "Cannot be edited",
    disabled: true,
  },
};
