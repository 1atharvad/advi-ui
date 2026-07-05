import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "@/components/ui/switch";
import { FormField } from "@/components/ui/form-field";

const meta: Meta<typeof Switch> = {
  title: "UI/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Toggle input rendered as a pill track with a sliding thumb. Accepts \`checked\`/\`defaultChecked\` for controlled and uncontrolled usage.

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| \`label\` | \`string\` | — | Label rendered beside the track |
| \`size\` | \`"sm" \\| "default" \\| "lg"\` | \`"default"\` | Track and thumb size |
| \`labelPosition\` | \`"left" \\| "right"\` | \`"right"\` | Label placement relative to the track |
| \`checked\` | \`boolean\` | — | Controlled on/off state |
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
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  parameters: {
    docs: {
      description: { story: "Switch in the off state." },
      source: {
        code: `<Switch label="Enable notifications" />`,
      },
    },
  },
  args: { label: "Enable notifications" },
};

export const On: Story = {
  parameters: {
    docs: {
      description: { story: "Pre-toggled on via `defaultChecked`." },
      source: {
        code: `<Switch label="Dark mode" defaultChecked />`,
      },
    },
  },
  args: { label: "Dark mode", defaultChecked: true },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: { story: "Disabled — both on and off variants." },
      source: {
        code: `
<div className="flex flex-col gap-3">
  <Switch label="Disabled off" disabled />
  <Switch label="Disabled on" disabled defaultChecked />
</div>`.trim(),
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3">
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" disabled defaultChecked />
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
  <Switch label="Small" size="sm" defaultChecked />
  <Switch label="Default" size="default" defaultChecked />
  <Switch label="Large" size="lg" defaultChecked />
</div>`.trim(),
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3">
      <Switch label="Small" size="sm" defaultChecked />
      <Switch label="Default" size="default" defaultChecked />
      <Switch label="Large" size="lg" defaultChecked />
    </div>
  ),
};

export const LabelLeft: Story = {
  name: "Label Left",
  parameters: {
    docs: {
      description: { story: "`labelPosition=\"left\"` places the label before the track." },
      source: {
        code: `<Switch label="Wi-Fi" labelPosition="left" defaultChecked />`,
      },
    },
  },
  args: { label: "Wi-Fi", labelPosition: "left", defaultChecked: true },
};

export const Controlled: Story = {
  parameters: {
    docs: {
      description: { story: "Controlled via `checked` + `onChange`, with live status text." },
      source: {
        code: `
const [on, setOn] = useState(false);

<div className="flex flex-col items-center gap-3">
  <Switch
    label="Airplane mode"
    checked={on}
    onChange={(e) => setOn(e.target.checked)}
  />
  <p className="text-xs text-muted-foreground">
    Status: {on ? "on" : "off"}
  </p>
</div>`.trim(),
      },
    },
  },
  render: () => {
    const [on, setOn] = useState(false);
    return (
      <div className="flex flex-col items-center gap-3">
        <Switch
          label="Airplane mode"
          checked={on}
          onChange={(e) => setOn(e.target.checked)}
        />
        <p className="text-xs text-muted-foreground">
          Status: {on ? "on" : "off"}
        </p>
      </div>
    );
  },
};

export const WithFormField: Story = {
  name: "With FormField",
  parameters: {
    docs: {
      description: { story: "`Switch` inside `FormField` with a description." },
      source: {
        code: `
<FormField
  label="Marketing emails"
  description="Receive emails about new products and updates."
  className="w-72"
>
  <Switch defaultChecked />
</FormField>`.trim(),
      },
    },
  },
  render: () => (
    <FormField
      label="Marketing emails"
      description="Receive emails about new products and updates."
      className="w-72"
    >
      <Switch defaultChecked />
    </FormField>
  ),
};
