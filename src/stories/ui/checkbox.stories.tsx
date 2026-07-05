import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox";
import { FormField } from "@/components/ui/form-field";

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Square boolean input. Supports \`checked\`/\`defaultChecked\` for controlled and uncontrolled usage, an \`indeterminate\` state, and three sizes.

**\`CheckboxGroup\`** manages an array of selected values with \`value\`/\`defaultValue\`/\`onChange\` and renders options in vertical or horizontal layout.

**Props — Checkbox**

| Prop | Type | Default | Description |
|---|---|---|---|
| \`label\` | \`string\` | — | Label rendered beside the indicator |
| \`size\` | \`"sm" \\| "default" \\| "lg"\` | \`"default"\` | Indicator and label size |
| \`indeterminate\` | \`boolean\` | \`false\` | Shows a dash instead of a checkmark |
| \`checked\` | \`boolean\` | — | Controlled checked state |
| \`defaultChecked\` | \`boolean\` | — | Uncontrolled initial state |
| \`disabled\` | \`boolean\` | \`false\` | Disables the input |
        `.trim(),
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  parameters: {
    docs: {
      description: { story: "Unchecked checkbox with a label." },
      source: {
        code: `<Checkbox label="Accept terms and conditions" />`,
      },
    },
  },
  args: { label: "Accept terms and conditions" },
};

export const Checked: Story = {
  parameters: {
    docs: {
      description: { story: "Pre-checked via `defaultChecked`." },
      source: {
        code: `<Checkbox label="Subscribe to newsletter" defaultChecked />`,
      },
    },
  },
  args: { label: "Subscribe to newsletter", defaultChecked: true },
};

export const Indeterminate: Story = {
  parameters: {
    docs: {
      description: { story: "Indeterminate state — used for \"select all\" with partial selection." },
      source: {
        code: `<Checkbox label="Select all items" indeterminate />`,
      },
    },
  },
  args: { label: "Select all items", indeterminate: true },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: { story: "Disabled — both checked and unchecked variants." },
      source: {
        code: `
<div className="flex flex-col gap-3">
  <Checkbox label="Disabled unchecked" disabled />
  <Checkbox label="Disabled checked" disabled defaultChecked />
</div>`.trim(),
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: { story: "Three size variants: `sm`, `default`, and `lg`." },
      source: {
        code: `
<div className="flex flex-col gap-3">
  <Checkbox label="Small" size="sm" defaultChecked />
  <Checkbox label="Default" size="default" defaultChecked />
  <Checkbox label="Large" size="lg" defaultChecked />
</div>`.trim(),
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox label="Small" size="sm" defaultChecked />
      <Checkbox label="Default" size="default" defaultChecked />
      <Checkbox label="Large" size="lg" defaultChecked />
    </div>
  ),
};

export const Group: Story = {
  name: "Checkbox Group",
  parameters: {
    docs: {
      description: { story: "Vertical `CheckboxGroup` with a label and description." },
      source: {
        code: `
<CheckboxGroup
  label="Notifications"
  description="Choose what you want to be notified about."
  defaultValue={["email"]}
  options={[
    { value: "email", label: "Email" },
    { value: "sms", label: "SMS" },
    { value: "push", label: "Push notifications" },
    { value: "slack", label: "Slack", disabled: true },
  ]}
/>`.trim(),
      },
    },
  },
  render: () => (
    <CheckboxGroup
      label="Notifications"
      description="Choose what you want to be notified about."
      defaultValue={["email"]}
      options={[
        { value: "email", label: "Email" },
        { value: "sms", label: "SMS" },
        { value: "push", label: "Push notifications" },
        { value: "slack", label: "Slack", disabled: true },
      ]}
    />
  ),
};

export const HorizontalGroup: Story = {
  name: "Horizontal Group",
  parameters: {
    docs: {
      description: { story: "`direction=\"horizontal\"` wraps options in a row." },
      source: {
        code: `
<CheckboxGroup
  label="Preferred contact"
  direction="horizontal"
  defaultValue={["email", "phone"]}
  options={[
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone" },
    { value: "mail", label: "Mail" },
  ]}
/>`.trim(),
      },
    },
  },
  render: () => (
    <CheckboxGroup
      label="Preferred contact"
      direction="horizontal"
      defaultValue={["email", "phone"]}
      options={[
        { value: "email", label: "Email" },
        { value: "phone", label: "Phone" },
        { value: "mail", label: "Mail" },
      ]}
    />
  ),
};

export const Controlled: Story = {
  parameters: {
    docs: {
      description: { story: "Controlled via `checked` + `onChange`. The selected count updates live." },
      source: {
        code: `
const [selected, setSelected] = useState<string[]>(["design"]);
const options = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "marketing", label: "Marketing" },
];

const toggle = (val: string) =>
  setSelected((prev) =>
    prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
  );

<div className="flex flex-col gap-3">
  <p className="text-xs text-muted-foreground">
    Selected: {selected.join(", ") || "none"}
  </p>
  {options.map((opt) => (
    <Checkbox
      key={opt.value}
      label={opt.label}
      checked={selected.includes(opt.value)}
      onChange={() => toggle(opt.value)}
    />
  ))}
</div>`.trim(),
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState<string[]>(["design"]);
    const options = [
      { value: "design", label: "Design" },
      { value: "engineering", label: "Engineering" },
      { value: "marketing", label: "Marketing" },
    ];

    const toggle = (val: string) =>
      setSelected((prev) =>
        prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
      );

    return (
      <div className="flex flex-col gap-3">
        <p className="text-xs text-muted-foreground">
          Selected: {selected.join(", ") || "none"}
        </p>
        {options.map((opt) => (
          <Checkbox
            key={opt.value}
            label={opt.label}
            checked={selected.includes(opt.value)}
            onChange={() => toggle(opt.value)}
          />
        ))}
      </div>
    );
  },
};

export const WithFormField: Story = {
  name: "With FormField",
  parameters: {
    docs: {
      description: { story: "`CheckboxGroup` wrapped in `FormField` for consistent layout with other inputs." },
      source: {
        code: `
<FormField label="Interests" description="Select all that apply." className="w-64">
  <CheckboxGroup
    defaultValue={["react"]}
    options={[
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "svelte", label: "Svelte" },
    ]}
  />
</FormField>`.trim(),
      },
    },
  },
  render: () => (
    <FormField label="Interests" description="Select all that apply." className="w-64">
      <CheckboxGroup
        defaultValue={["react"]}
        options={[
          { value: "react", label: "React" },
          { value: "vue", label: "Vue" },
          { value: "svelte", label: "Svelte" },
        ]}
      />
    </FormField>
  ),
};
