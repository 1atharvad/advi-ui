import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MultiSelect } from "@/components/ui/multi-select";
import { FormField } from "@/components/ui/form-field";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular", disabled: true },
  { value: "solid", label: "Solid" },
  { value: "qwik", label: "Qwik" },
];

const meta: Meta<typeof MultiSelect> = {
  title: "UI/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Accessible multi-value dropdown. Selected items appear as removable chips inside the trigger. When the number of chips exceeds \`maxCount\`, the extras collapse into a \`+N\` badge.

**Keyboard**

| Key | Action |
|---|---|
| \`Enter\` / \`Space\` | Open dropdown / toggle focused option |
| \`↑\` \`↓\` | Navigate options |
| \`Escape\` / \`Tab\` | Close dropdown |

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| \`options\` | \`SelectOption[]\` | — | Array of \`{ value, label, disabled? }\` |
| \`value\` | \`string[]\` | \`[]\` | Controlled array of selected values |
| \`onChange\` | \`(value: string[]) => void\` | — | Called when selection changes |
| \`placeholder\` | \`string\` | \`"Select..."\` | Shown when nothing is selected |
| \`label\` | \`string\` | — | Label rendered above the trigger |
| \`description\` | \`string\` | — | Helper text rendered below |
| \`disabled\` | \`boolean\` | \`false\` | Disables the entire control |
| \`maxCount\` | \`number\` | \`3\` | Max chips shown before overflow badge |
| \`className\` | \`string\` | — | Applied to the root container (use for width, e.g. \`w-full\`, \`w-64\`) |
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
    placeholder: { control: { type: "text" } },
    label: { control: { type: "text" } },
    description: { control: { type: "text" } },
    maxCount: { control: { type: "number" } },
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

// ─── Basic usage ──────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: {
    docs: {
      description: { story: "Empty multi-select — open and toggle options to build a selection." },
      source: {
        code: `
const [value, setValue] = useState<string[]>([]);

<MultiSelect
  options={options}
  value={value}
  onChange={setValue}
  placeholder="Choose frameworks"
  className="w-full"
/>`.trim(),
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <MultiSelect
        options={options}
        value={value}
        onChange={setValue}
        placeholder="Choose frameworks"
        className="w-full"
      />
    );
  },
};

export const WithLabel: Story = {
  name: "With Label",
  parameters: {
    docs: {
      description: { story: "Adds a visible `<label>` bound to the trigger via `useId`." },
      source: {
        code: `
const [value, setValue] = useState<string[]>([]);

<MultiSelect
  options={options}
  value={value}
  onChange={setValue}
  label="Frameworks"
  placeholder="Choose frameworks"
  className="w-full"
/>`.trim(),
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <MultiSelect
        options={options}
        value={value}
        onChange={setValue}
        label="Frameworks"
        placeholder="Choose frameworks"
        className="w-full"
      />
    );
  },
};

export const WithDescription: Story = {
  name: "With Description",
  parameters: {
    docs: {
      description: { story: "Muted hint text below the trigger." },
      source: {
        code: `
const [value, setValue] = useState<string[]>([]);

<MultiSelect
  options={options}
  value={value}
  onChange={setValue}
  label="Frameworks"
  description="Angular is currently unavailable."
  placeholder="Choose frameworks"
  className="w-full"
/>`.trim(),
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <MultiSelect
        options={options}
        value={value}
        onChange={setValue}
        label="Frameworks"
        description="Angular is currently unavailable."
        placeholder="Choose frameworks"
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
      description: { story: "Pass an initial `value` array to pre-populate the selection." },
      source: {
        code: `
const [value, setValue] = useState(["react", "svelte"]);

<MultiSelect
  options={options}
  value={value}
  onChange={setValue}
  label="Frameworks"
  className="w-full"
/>`.trim(),
      },
    },
  },
  render: () => {
    const [value, setValue] = useState(["react", "svelte"]);
    return (
      <MultiSelect
        options={options}
        value={value}
        onChange={setValue}
        label="Frameworks"
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
          "Selection state lives outside the component via `value` + `onChange`. The current selection is reflected below the trigger.",
      },
      source: {
        code: `
const [value, setValue] = useState<string[]>([]);

<div className="flex flex-col gap-3">
  <MultiSelect
    options={options}
    value={value}
    onChange={setValue}
    label="Frameworks"
    placeholder="Choose frameworks"
    className="w-full"
  />
  <p className="text-xs text-muted-foreground">
    Selected:{" "}
    <span className="font-medium text-foreground">
      {value.length ? value.join(", ") : "none"}
    </span>
  </p>
</div>`.trim(),
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className="flex flex-col gap-3">
        <MultiSelect
          options={options}
          value={value}
          onChange={setValue}
          label="Frameworks"
          placeholder="Choose frameworks"
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">
          Selected:{" "}
          <span className="font-medium text-foreground">
            {value.length ? value.join(", ") : "none"}
          </span>
        </p>
      </div>
    );
  },
};

export const Overflow: Story = {
  name: "Chip Overflow",
  parameters: {
    docs: {
      description: {
        story:
          "When selected items exceed `maxCount` (default `3`), extras collapse into a `+N` badge. Adjust `maxCount` to change the threshold.",
      },
      source: {
        code: `
const [value, setValue] = useState(["react", "vue", "svelte", "solid"]);

<MultiSelect
  options={options}
  value={value}
  onChange={setValue}
  label="Frameworks"
  maxCount={2}
  className="w-full"
/>`.trim(),
      },
    },
  },
  render: () => {
    const [value, setValue] = useState(["react", "vue", "svelte", "solid"]);
    return (
      <MultiSelect
        options={options}
        value={value}
        onChange={setValue}
        label="Frameworks"
        maxCount={2}
        className="w-full"
      />
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
          "Set `disabled: true` on individual `SelectOption` entries to make them unselectable. They remain visible but grayed out.",
      },
      source: {
        code: `
const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular", disabled: true },
];

<MultiSelect
  options={options}
  value={value}
  onChange={setValue}
  label="Frameworks"
  placeholder="Choose frameworks"
  className="w-full"
/>`.trim(),
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <MultiSelect
        options={options}
        value={value}
        onChange={setValue}
        label="Frameworks"
        placeholder="Choose frameworks"
        className="w-full"
      />
    );
  },
};

export const Disabled: Story = {
  name: "Disabled",
  parameters: {
    docs: {
      description: { story: "`disabled` blocks all interaction and reduces opacity." },
      source: {
        code: `
<MultiSelect
  options={options}
  value={["react", "vue"]}
  label="Frameworks"
  disabled
  className="w-full"
/>`.trim(),
      },
    },
  },
  render: () => (
    <MultiSelect
      options={options}
      value={["react", "vue"]}
      label="Frameworks"
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
          "`MultiSelect` manages its own internal id — pass `label` directly to `MultiSelect` and use `FormField` only for the error row.",
      },
      source: {
        code: `
const [value, setValue] = useState<string[]>([]);
const [submitted, setSubmitted] = useState(false);
const error = submitted && value.length === 0 ? "Please select at least one framework." : undefined;

<div className="flex flex-col gap-4">
  <FormField error={error}>
    <MultiSelect
      options={options}
      value={value}
      onChange={(v) => { setValue(v); setSubmitted(false); }}
      label="Frameworks"
      placeholder="Choose frameworks"
      className="w-full"
    />
  </FormField>
  <Button onClick={() => setSubmitted(true)}>Submit</Button>
</div>`.trim(),
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const error = submitted && value.length === 0 ? "Please select at least one framework." : undefined;

    return (
      <div className="flex flex-col gap-4">
        <FormField error={error}>
          <MultiSelect
            options={options}
            value={value}
            onChange={(v) => { setValue(v); setSubmitted(false); }}
            label="Frameworks"
            placeholder="Choose frameworks"
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
