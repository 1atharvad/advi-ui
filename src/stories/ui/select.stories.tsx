import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "@/components/ui/select";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular", disabled: true },
  { value: "solid", label: "Solid" },
];

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Accessible single-value dropdown built on a custom combobox/listbox pattern. Supports keyboard navigation, disabled options, form integration via a hidden \`<input>\`, and optional label/description.

**Keyboard**

| Key | Action |
|---|---|
| \`Enter\` / \`Space\` | Open dropdown / confirm selection |
| \`↑\` \`↓\` | Navigate options (skips disabled) |
| \`Escape\` / \`Tab\` | Close dropdown |

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| \`options\` | \`SelectOption[]\` | — | Array of \`{ value, label, disabled? }\` |
| \`value\` | \`string\` | — | Controlled selected value |
| \`onChange\` | \`(value: string) => void\` | — | Called when a selection is made |
| \`placeholder\` | \`string\` | \`"Select..."\` | Shown when no value is selected |
| \`label\` | \`string\` | — | Label rendered above the trigger |
| \`description\` | \`string\` | — | Helper text rendered below the trigger |
| \`disabled\` | \`boolean\` | \`false\` | Disables the entire select |
| \`name\` | \`string\` | — | Name for the hidden native input (form integration) |
        `.trim(),
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  parameters: {
    docs: {
      description: { story: "Basic select with no label — click or use keyboard to open." },
    },
  },
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return <Select options={options} value={value} onChange={setValue} placeholder="Choose a framework" />;
  },
};

export const WithLabel: Story = {
  parameters: {
    docs: {
      description: { story: "Renders a `<label>` bound to the trigger button via `useId`." },
    },
  },
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <Select
        options={options}
        value={value}
        onChange={setValue}
        label="Framework"
        placeholder="Choose a framework"
      />
    );
  },
};

export const WithDescription: Story = {
  parameters: {
    docs: {
      description: { story: "Muted helper text below the trigger. Use for hints or constraints." },
    },
  },
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <Select
        options={options}
        value={value}
        onChange={setValue}
        label="Framework"
        description="Angular is currently unavailable."
        placeholder="Choose a framework"
      />
    );
  },
};

export const Preselected: Story = {
  parameters: {
    docs: {
      description: { story: "Pass an initial `value` to show a pre-selected option on load." },
    },
  },
  render: () => {
    const [value, setValue] = useState("react");
    return (
      <Select
        options={options}
        value={value}
        onChange={setValue}
        label="Framework"
      />
    );
  },
};

export const WithDisabledOption: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Set `disabled: true` on individual `SelectOption` objects to make them unselectable. Keyboard navigation skips them automatically.",
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <Select
        options={options}
        value={value}
        onChange={setValue}
        label="Framework"
        placeholder="Choose a framework"
      />
    );
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: { story: "`disabled` on the entire select — reduces opacity and blocks interaction." },
    },
  },
  render: () => (
    <Select
      options={options}
      value="react"
      label="Framework"
      disabled
    />
  ),
};
