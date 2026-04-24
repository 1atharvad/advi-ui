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
| \`hidden\` | \`boolean\` | \`false\` | Enables mask mode — text is hidden, dots track character count |
| \`disabled\` | \`boolean\` | \`false\` | Disables the textarea |

**Mask mode** (\`hidden={true}\`) hides the typed text while keeping it in the DOM for form submission. An overlay renders one \`•\` per character so the dot count shrinks and grows with the actual value. The text cursor remains visible.
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
          "`validate` runs on every keystroke. Returning a non-null string shows an error message and destructive border; " +
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
          "`hidden={true}` hides typed text behind `•` dots. The dot count matches the character count exactly — " +
          "it shrinks when characters are deleted and grows as you type. The real value stays in the DOM for form submission.",
      },
      source: {
        code: `
<Textarea
  label="Secret token"
  hidden={true}
  defaultValue="super-secret-value"
/>`.trim(),
      },
    },
  },
  args: {
    label: "Secret token",
    hidden: true,
    defaultValue: "super-secret-value",
  },
};

export const MaskedEmpty: Story = {
  name: "Masked — Empty",
  parameters: {
    docs: {
      description: {
        story: "When masked and empty, no dots are shown. The placeholder is hidden in mask mode to avoid conflicting with the dot overlay.",
      },
    },
  },
  args: {
    label: "Secret token",
    hidden: true,
    placeholder: "Paste your token here…",
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
