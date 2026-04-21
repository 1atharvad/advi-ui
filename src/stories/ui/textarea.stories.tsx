import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "@/components/ui/textarea";

const meta: Meta<typeof Textarea> = {
  title: "UI/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Multi-line text input with built-in **label**, **description**, **inline validation**, and an optional **mask mode** for sensitive content.

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| \`label\` | \`string\` | — | Label rendered above the textarea |
| \`description\` | \`string\` | — | Helper text rendered below |
| \`validate\` | \`(value: string) => string \\| null\` | — | Called on change; return an error string or \`null\` |
| \`onValidationChange\` | \`(valid: boolean) => void\` | — | Fires on each keystroke with the current valid state |
| \`hidden\` | \`boolean\` | \`false\` | Enables mask mode — actual text is invisible, dots are overlaid |
| \`maskedLength\` | \`number\` | \`8\` | Number of bullet dots rendered in mask mode |
| \`disabled\` | \`boolean\` | \`false\` | Disables the textarea |

**Mask mode** (\`hidden={true}\`) renders the real value as transparent text so layout stays stable, then overlays a fixed-length string of \`•\` dots via an absolutely-positioned div. The real value is still in the DOM for form submission.
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
  parameters: {
    docs: {
      description: {
        story: "Bare textarea — all standard HTML textarea attributes pass through directly.",
      },
    },
  },
  args: { placeholder: "Write something..." },
};

export const WithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: "Renders a visible `<label>` above the textarea.",
      },
    },
  },
  args: {
    label: "Notes",
    placeholder: "Add your notes here...",
  },
};

export const WithDescription: Story = {
  parameters: {
    docs: {
      description: {
        story: "Adds muted helper text beneath the textarea. Useful for character limits or format hints.",
      },
    },
  },
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself...",
    description: "Max 160 characters.",
  },
};

export const WithValidation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`validate` runs on every keystroke. Returning a non-null string shows a red error and red border; " +
          "`onValidationChange` fires with the boolean valid state for parent-controlled logic.",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          "`hidden={true}` makes the real text transparent and overlays bullet dots (count set by `maskedLength`). " +
          "The real value stays in the DOM for form submission — useful for API keys or tokens.",
      },
      source: {
        code: `
<Textarea
  label="Secret token"
  hidden={true}
  maskedLength={12}
  defaultValue="super-secret-value"
/>`.trim(),
      },
    },
  },
  args: {
    label: "Secret token",
    hidden: true,
    maskedLength: 12,
    defaultValue: "super-secret-value",
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: "`disabled` reduces opacity and blocks pointer events. The value is still present in the DOM.",
      },
    },
  },
  args: {
    label: "Read-only",
    value: "This cannot be edited.",
    disabled: true,
  },
};
