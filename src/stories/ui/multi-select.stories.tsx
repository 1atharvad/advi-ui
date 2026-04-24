import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MultiSelect } from "@/components/ui/multi-select";

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
type Story = StoryObj<typeof MultiSelect>;

export const Default: Story = {
  parameters: {
    docs: {
      description: { story: "Empty multi-select — open and toggle options to build a selection." },
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
      />
    );
  },
};

export const WithLabel: Story = {
  parameters: {
    docs: {
      description: { story: "Adds a visible `<label>` bound to the trigger via `useId`." },
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
      />
    );
  },
};

export const WithDescription: Story = {
  parameters: {
    docs: {
      description: { story: "Muted hint text below the trigger." },
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
      />
    );
  },
};

export const Preselected: Story = {
  parameters: {
    docs: {
      description: { story: "Pass an initial `value` array to pre-populate the selection." },
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
      />
    );
  },
};

export const Overflow: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When selected items exceed `maxCount` (default `3`), extras collapse into a `+N` badge. Adjust `maxCount` to change the threshold.",
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
      />
    );
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: { story: "`disabled` blocks all interaction and reduces opacity." },
    },
  },
  render: () => (
    <MultiSelect
      options={options}
      value={["react", "vue"]}
      label="Frameworks"
      disabled
    />
  ),
};
