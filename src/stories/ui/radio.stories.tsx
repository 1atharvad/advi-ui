import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio, RadioGroup } from "@/components/ui/radio";
import { FormField } from "@/components/ui/form-field";

const frameworkOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular", disabled: true },
  { value: "solid", label: "Solid" },
];

const meta: Meta = {
  title: "UI/Radio",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Two composable primitives built on native \`<input type="radio">\`:

- **\`Radio\`** — standalone radio item; controlled via \`checked\` or uncontrolled via \`defaultChecked\`
- **\`RadioGroup\`** — renders a full option list; controlled via \`value\`/\`onChange\` or uncontrolled via \`defaultValue\`

Keyboard navigation (↑ ↓ ← →) between options is handled natively by the browser.

**\`Radio\` props**

| Prop | Type | Default | Description |
|---|---|---|---|
| \`label\` | \`string\` | — | Text next to the indicator |
| \`size\` | \`"sm" \\| "default" \\| "lg"\` | \`"default"\` | Controls indicator and label size |
| All native \`<input type="radio">\` attributes | | | \`checked\`, \`defaultChecked\`, \`disabled\`, \`name\`, etc. |

**\`RadioGroup\` props**

| Prop | Type | Default | Description |
|---|---|---|---|
| \`options\` | \`RadioOption[]\` | — | \`{ value, label, disabled? }\` |
| \`value\` | \`string\` | — | Controlled selected value |
| \`defaultValue\` | \`string\` | — | Initial value for uncontrolled mode |
| \`onChange\` | \`(value: string) => void\` | — | Called on selection change |
| \`label\` | \`string\` | — | Group label (via \`aria-labelledby\`) |
| \`description\` | \`string\` | — | Hint text below options |
| \`disabled\` | \`boolean\` | \`false\` | Disables the entire group |
| \`direction\` | \`"vertical" \\| "horizontal"\` | \`"vertical"\` | Layout direction |
| \`size\` | \`"sm" \\| "default" \\| "lg"\` | \`"default"\` | Size applied to all options |
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
};

export default meta;
type Story = StoryObj;

// ─── 1. Basic Radio ──────────────────────────────────────────────────────────

export const BasicRadio: Story = {
  name: "Basic Radio",
  parameters: {
    docs: {
      description: {
        story:
          "Individual `Radio` items composed manually. Each acts as a standalone controlled or uncontrolled radio input — useful when the option layout needs custom markup between items.",
      },
      source: {
        code: `
const [value, setValue] = useState<string | undefined>();

<div role="radiogroup" aria-label="Favourite framework" className="flex flex-col gap-2">
  <Radio name="framework" label="React" value="react" checked={value === "react"} onChange={() => setValue("react")} />
  <Radio name="framework" label="Vue" value="vue" checked={value === "vue"} onChange={() => setValue("vue")} />
  <Radio name="framework" label="Svelte" value="svelte" checked={value === "svelte"} onChange={() => setValue("svelte")} />
  <Radio name="framework" label="Angular" value="angular" disabled />
  <Radio name="framework" label="Solid" value="solid" checked={value === "solid"} onChange={() => setValue("solid")} />
</div>`.trim(),
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <div role="radiogroup" aria-label="Favourite framework" className="flex flex-col gap-2">
        {frameworkOptions.map((opt) => (
          <Radio
            key={opt.value}
            name="basic-radio"
            label={opt.label}
            value={opt.value}
            checked={value === opt.value}
            disabled={opt.disabled}
            onChange={() => setValue(opt.value)}
          />
        ))}
      </div>
    );
  },
};

// ─── 2. Radio Group ──────────────────────────────────────────────────────────

export const RadioGroupStory: Story = {
  name: "Radio Group",
  parameters: {
    docs: {
      description: {
        story:
          "`RadioGroup` renders the options list with built-in `role=\"radiogroup\"`, label association via `aria-labelledby`, and optional description.",
      },
      source: {
        code: `
const [value, setValue] = useState<string | undefined>();

<RadioGroup
  options={frameworkOptions}
  value={value}
  onChange={setValue}
  label="Framework"
  description="Angular is currently unavailable."
/>`.trim(),
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <RadioGroup
        options={frameworkOptions}
        value={value}
        onChange={setValue}
        label="Framework"
        description="Angular is currently unavailable."
      />
    );
  },
};

export const RadioGroupHorizontal: Story = {
  name: "Radio Group — Horizontal",
  parameters: {
    docs: {
      description: {
        story: '`direction="horizontal"` lays options in a row with wrapping.',
      },
      source: {
        code: `
const [value, setValue] = useState<string | undefined>();

<RadioGroup
  options={frameworkOptions}
  value={value}
  onChange={setValue}
  label="Framework"
  direction="horizontal"
/>`.trim(),
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <RadioGroup
        options={frameworkOptions}
        value={value}
        onChange={setValue}
        label="Framework"
        direction="horizontal"
      />
    );
  },
};

// ─── 3. Controlled vs Uncontrolled ──────────────────────────────────────────

export const Controlled: Story = {
  name: "Controlled",
  parameters: {
    docs: {
      description: {
        story:
          "Controlled mode — selection state lives outside the component. Pass `value` + `onChange`; the selected value is shown below.",
      },
      source: {
        code: `
const [value, setValue] = useState("react");

<div className="flex flex-col gap-3">
  <RadioGroup
    options={frameworkOptions}
    value={value}
    onChange={setValue}
    label="Framework"
  />
  <p className="text-xs text-muted-foreground">
    Selected: <span className="font-medium text-foreground">{value}</span>
  </p>
</div>`.trim(),
      },
    },
  },
  render: () => {
    const [value, setValue] = useState("react");
    return (
      <div className="flex flex-col gap-3">
        <RadioGroup
          options={frameworkOptions}
          value={value}
          onChange={setValue}
          label="Framework"
        />
        <p className="text-xs text-muted-foreground">
          Selected: <span className="font-medium text-foreground">{value}</span>
        </p>
      </div>
    );
  },
};

export const Uncontrolled: Story = {
  name: "Uncontrolled",
  parameters: {
    docs: {
      description: {
        story:
          "Uncontrolled mode — pass `defaultValue` to set the initial selection; the browser manages state. `onChange` still fires if you need to react to changes without lifting state.",
      },
      source: {
        code: `
<RadioGroup
  options={frameworkOptions}
  defaultValue="vue"
  onChange={(val) => console.log(val)}
  label="Framework"
/>`.trim(),
      },
    },
  },
  render: () => {
    const [last, setLast] = useState("vue");
    return (
      <div className="flex flex-col gap-3">
        <RadioGroup
          options={frameworkOptions}
          defaultValue="vue"
          onChange={setLast}
          label="Framework"
        />
        <p className="text-xs text-muted-foreground">
          Last change: <span className="font-medium text-foreground">{last}</span>
        </p>
      </div>
    );
  },
};

// ─── 4. Disabled States ──────────────────────────────────────────────────────

export const DisabledGroup: Story = {
  name: "Disabled — Entire Group",
  parameters: {
    docs: {
      description: {
        story: "`disabled` on the group disables every option.",
      },
      source: {
        code: `
<RadioGroup
  options={frameworkOptions}
  value="react"
  label="Framework"
  disabled
/>`.trim(),
      },
    },
  },
  render: () => (
    <RadioGroup
      options={frameworkOptions}
      value="react"
      label="Framework"
      disabled
    />
  ),
};

export const DisabledOption: Story = {
  name: "Disabled — Individual Option",
  parameters: {
    docs: {
      description: {
        story:
          "Set `disabled: true` on individual `RadioOption` entries. Keyboard navigation skips disabled options natively.",
      },
      source: {
        code: `
const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular", disabled: true },
];

<RadioGroup
  options={options}
  value={value}
  onChange={setValue}
  label="Framework"
/>`.trim(),
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <RadioGroup
        options={frameworkOptions}
        value={value}
        onChange={setValue}
        label="Framework"
      />
    );
  },
};

export const DisabledIndividual: Story = {
  name: "Disabled — Individual Radio",
  parameters: {
    docs: {
      description: {
        story: "The standalone `Radio` component accepts `disabled` directly.",
      },
      source: {
        code: `
<div className="flex flex-col gap-2">
  <Radio name="dis" label="Enabled option" value="a" defaultChecked />
  <Radio name="dis" label="Disabled option" value="b" disabled />
</div>`.trim(),
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-2">
      <Radio name="dis" label="Enabled option" value="a" defaultChecked />
      <Radio name="dis" label="Disabled option" value="b" disabled />
    </div>
  ),
};

// ─── 5. Sizes ────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: "Sizes",
  parameters: {
    docs: {
      description: {
        story:
          "`size` scales the indicator circle and label text. `\"sm\"` / `\"default\"` / `\"lg\"` available on both `Radio` and `RadioGroup`.",
      },
      source: {
        code: `
<div className="flex flex-col gap-6">
  <RadioGroup options={[{ value: "react", label: "React" }, { value: "vue", label: "Vue" }]} defaultValue="react" size="sm" />
  <RadioGroup options={[{ value: "react", label: "React" }, { value: "vue", label: "Vue" }]} defaultValue="react" size="default" />
  <RadioGroup options={[{ value: "react", label: "React" }, { value: "vue", label: "Vue" }]} defaultValue="react" size="lg" />
</div>`.trim(),
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      {(["sm", "default", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-1">
          <p className="text-xs text-muted-foreground capitalize">{size}</p>
          <RadioGroup
            options={[
              { value: "react", label: "React" },
              { value: "vue", label: "Vue" },
            ]}
            defaultValue="react"
            size={size}
          />
        </div>
      ))}
    </div>
  ),
};

export const SizesIndividual: Story = {
  name: "Sizes — Individual Radio",
  parameters: {
    docs: {
      description: {
        story: "Same `size` prop on standalone `Radio` items.",
      },
      source: {
        code: `
<div className="flex flex-col gap-3">
  <Radio name="sz" size="sm" label="Small" value="sm" />
  <Radio name="sz" size="default" label="Default" value="default" defaultChecked />
  <Radio name="sz" size="lg" label="Large" value="lg" />
</div>`.trim(),
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3">
      <Radio name="sz" size="sm" label="Small" value="sm" />
      <Radio name="sz" size="default" label="Default" value="default" defaultChecked />
      <Radio name="sz" size="lg" label="Large" value="lg" />
    </div>
  ),
};

// ─── 6. With FormField ───────────────────────────────────────────────────────

export const WithFormField: Story = {
  name: "With FormField",
  parameters: {
    docs: {
      description: {
        story:
          "`FormField` wraps `RadioGroup` to add consistent label, description, required indicator, and error display. The group's own `label` prop is omitted — `FormField` owns the heading.",
      },
      source: {
        code: `
const [value, setValue] = useState<string | undefined>();
const [submitted, setSubmitted] = useState(false);
const error = submitted && !value ? "Please select a framework." : undefined;

<div className="flex flex-col gap-4">
  <FormField label="Framework" error={error} required>
    <RadioGroup
      options={frameworkOptions}
      value={value}
      onChange={(v) => { setValue(v); setSubmitted(false); }}
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
        <FormField label="Framework" error={error} required>
          <RadioGroup
            options={frameworkOptions}
            value={value}
            onChange={(v) => { setValue(v); setSubmitted(false); }}
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
