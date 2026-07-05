import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "@/components/ui/select";
import { FormField } from "@/components/ui/form-field";

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
| \`description\` | \`string\` | — | Helper text rendered below |
| \`disabled\` | \`boolean\` | \`false\` | Disables the entire select |
| \`className\` | \`string\` | — | Applied to the root container (use for width, e.g. \`w-full\`, \`w-64\`) |
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
  argTypes: {
    disabled: { control: { type: "boolean" } },
    placeholder: { control: { type: "text" } },
    label: { control: { type: "text" } },
    description: { control: { type: "text" } },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// ─── Basic usage ──────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: {
    docs: {
      description: { story: "Bare select with no label — click or use keyboard to open." },
      source: {
        code: `
const [value, setValue] = useState<string | undefined>();

<Select
  options={options}
  value={value}
  onChange={setValue}
  placeholder="Choose a framework"
  className="w-full"
/>`.trim(),
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
        placeholder="Choose a framework"
        className="w-full"
      />
    );
  },
};

export const WithLabel: Story = {
  name: "With Label",
  parameters: {
    docs: {
      description: { story: "Renders a `<label>` bound to the trigger button via `useId`." },
      source: {
        code: `
const [value, setValue] = useState<string | undefined>();

<Select
  options={options}
  value={value}
  onChange={setValue}
  label="Framework"
  placeholder="Choose a framework"
  className="w-full"
/>`.trim(),
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
        className="w-full"
      />
    );
  },
};

export const WithDescription: Story = {
  name: "With Description",
  parameters: {
    docs: {
      description: { story: "Muted helper text below the trigger. Use for hints or constraints." },
      source: {
        code: `
const [value, setValue] = useState<string | undefined>();

<Select
  options={options}
  value={value}
  onChange={setValue}
  label="Framework"
  description="Angular is currently unavailable."
  placeholder="Choose a framework"
  className="w-full"
/>`.trim(),
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
        description="Angular is currently unavailable."
        placeholder="Choose a framework"
        className="w-full"
      />
    );
  },
};

// ─── Selection state ──────────────────────────────────────────────────────────

export const Preselected: Story = {
  name: "Preselected",
  parameters: {
    docs: {
      description: { story: "Pass an initial `value` to show a pre-selected option on load." },
      source: {
        code: `
const [value, setValue] = useState("react");

<Select
  options={options}
  value={value}
  onChange={setValue}
  label="Framework"
  className="w-full"
/>`.trim(),
      },
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
        className="w-full"
      />
    );
  },
};

export const Controlled: Story = {
  name: "Controlled",
  parameters: {
    docs: {
      description: {
        story:
          "Selection state lives outside the component. `value` + `onChange` keep the displayed value in sync; the current value is shown below.",
      },
      source: {
        code: `
const [value, setValue] = useState<string | undefined>();

<div className="flex flex-col gap-3">
  <Select
    options={options}
    value={value}
    onChange={setValue}
    label="Framework"
    placeholder="Choose a framework"
    className="w-full"
  />
  <p className="text-xs text-muted-foreground">
    Selected: <span className="font-medium text-foreground">{value ?? "none"}</span>
  </p>
</div>`.trim(),
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <div className="flex flex-col gap-3">
        <Select
          options={options}
          value={value}
          onChange={setValue}
          label="Framework"
          placeholder="Choose a framework"
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">
          Selected: <span className="font-medium text-foreground">{value ?? "none"}</span>
        </p>
      </div>
    );
  },
};

// ─── Disabled states ──────────────────────────────────────────────────────────

export const WithDisabledOption: Story = {
  name: "Disabled Option",
  parameters: {
    docs: {
      description: {
        story:
          "Set `disabled: true` on individual `SelectOption` entries. Keyboard navigation skips them automatically.",
      },
      source: {
        code: `
const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular", disabled: true },
];

<Select
  options={options}
  value={value}
  onChange={setValue}
  label="Framework"
  placeholder="Choose a framework"
  className="w-full"
/>`.trim(),
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
        className="w-full"
      />
    );
  },
};

export const Disabled: Story = {
  name: "Disabled",
  parameters: {
    docs: {
      description: { story: "`disabled` on the entire select — reduces opacity and blocks interaction." },
      source: {
        code: `
<Select
  options={options}
  value="react"
  label="Framework"
  disabled
  className="w-full"
/>`.trim(),
      },
    },
  },
  render: () => (
    <Select
      options={options}
      value="react"
      label="Framework"
      disabled
      className="w-full"
    />
  ),
};

// ─── With FormField ───────────────────────────────────────────────────────────

export const WithFormField: Story = {
  name: "With FormField",
  parameters: {
    docs: {
      description: {
        story:
          "`Select` manages its own internal id — pass `label` directly to `Select` and use `FormField` only for the error row.",
      },
      source: {
        code: `
const [value, setValue] = useState<string | undefined>();
const [submitted, setSubmitted] = useState(false);
const error = submitted && !value ? "Please select a framework." : undefined;

<div className="flex flex-col gap-4">
  <FormField error={error}>
    <Select
      options={options}
      value={value}
      onChange={(v) => { setValue(v); setSubmitted(false); }}
      label="Framework"
      placeholder="Choose a framework"
      className="w-full"
    />
  </FormField>
  <Button onClick={() => setSubmitted(true)}>Submit</Button>
</div>`.trim(),
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    const [submitted, setSubmitted] = useState(false);
    const error = submitted && !value ? "Please select a framework." : undefined;

    return (
      <div className="flex flex-col gap-4">
        <FormField error={error}>
          <Select
            options={options}
            value={value}
            onChange={(v) => { setValue(v); setSubmitted(false); }}
            label="Framework"
            placeholder="Choose a framework"
            className="w-full"
          />
        </FormField>
        <button
          type="button"
          className="vi-btn vi-btn-variant-default vi-btn-size-default"
          onClick={() => setSubmitted(true)}
        >
          Submit
        </button>
      </div>
    );
  },
};
