import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { RadioGroup } from "@/components/ui/radio";

const meta: Meta<typeof FormField> = {
  title: "UI/FormField",
  component: FormField,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Layout wrapper that standardises label, description, required indicator, and error display around any form control.

When a control has its own built-in \`label\`/\`description\` props (like \`Input\` or \`Select\`), you can skip those and let \`FormField\` own the heading row — keeping label styles consistent across component types.

**How label association works**

| Child | Approach |
|---|---|
| \`<Input>\` / \`<Textarea>\` | Pass matching \`htmlFor\` to \`FormField\` and \`id\` to the child |
| \`<Select>\` / \`<MultiSelect>\` | These manage their own \`id\` — pass \`label\` to the component, omit from \`FormField\` |
| \`<RadioGroup>\` | Omit \`label\` from both; \`FormField\` wraps for error display only — or use the group's \`label\` prop |

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| \`label\` | \`string\` | — | Label text rendered above the child |
| \`htmlFor\` | \`string\` | auto | Links the label to the field \`id\` |
| \`description\` | \`string\` | — | Muted hint — hidden when \`error\` is set |
| \`error\` | \`string\` | — | Error message; replaces description |
| \`required\` | \`boolean\` | \`false\` | Appends \`*\` to the label |
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
type Story = StoryObj<typeof FormField>;

// ─── Basic usage ─────────────────────────────────────────────────────────────

export const WithInput: Story = {
  name: "With Input",
  parameters: {
    docs: {
      description: {
        story:
          "Pass matching `htmlFor` / `id` so clicking the label focuses the field. `FormField` owns the label and description; `Input` renders bare.",
      },
    },
  },
  render: () => (
    <FormField htmlFor="name" label="Full name" description="As it appears on your ID.">
      <Input id="name" placeholder="Jane Smith" />
    </FormField>
  ),
};

export const WithTextarea: Story = {
  name: "With Textarea",
  parameters: {
    docs: {
      description: { story: "Same pattern applied to `Textarea`." },
    },
  },
  render: () => (
    <FormField htmlFor="bio" label="Bio" description="Max 200 characters.">
      <Textarea id="bio" placeholder="Tell us about yourself…" rows={3} />
    </FormField>
  ),
};

export const WithSelect: Story = {
  name: "With Select",
  parameters: {
    docs: {
      description: {
        story:
          "`Select` manages its own internal id — pass `label` directly to `Select` and use `FormField` only for the description / error row.",
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <FormField description="Angular is currently unavailable.">
        <Select
          options={[
            { value: "react", label: "React" },
            { value: "vue", label: "Vue" },
            { value: "svelte", label: "Svelte" },
            { value: "angular", label: "Angular", disabled: true },
          ]}
          value={value}
          onChange={setValue}
          label="Framework"
          placeholder="Choose a framework"
        />
      </FormField>
    );
  },
};

export const WithRadioGroup: Story = {
  name: "With RadioGroup",
  parameters: {
    docs: {
      description: {
        story:
          "Wrap `RadioGroup` to add an error message below; the group's own `label` prop handles `aria-labelledby`.",
      },
    },
  },
  render: () => {
    const [value, setValue] = useState<string | undefined>();
    return (
      <FormField>
        <RadioGroup
          options={[
            { value: "react", label: "React" },
            { value: "vue", label: "Vue" },
            { value: "svelte", label: "Svelte" },
          ]}
          value={value}
          onChange={setValue}
          label="Framework"
          description="Choose your primary framework."
        />
      </FormField>
    );
  },
};

// ─── Required ────────────────────────────────────────────────────────────────

export const Required: Story = {
  parameters: {
    docs: {
      description: {
        story: "`required` appends a `*` to the label (purely visual; pair with native `required` on the input for form validation).",
      },
    },
  },
  render: () => (
    <FormField htmlFor="email" label="Email" required description="We'll never share your email.">
      <Input id="email" type="email" placeholder="you@example.com" required />
    </FormField>
  ),
};

// ─── Error state ─────────────────────────────────────────────────────────────

export const WithError: Story = {
  name: "With Error",
  parameters: {
    docs: {
      description: {
        story:
          "When `error` is set it replaces the description. The message is wrapped in `role=\"alert\"` for screen readers.",
      },
    },
  },
  render: () => (
    <FormField
      htmlFor="username"
      label="Username"
      description="3–20 characters."
      error="Username is already taken."
      required
    >
      <Input id="username" defaultValue="john_doe" aria-invalid />
    </FormField>
  ),
};

// ─── Validation on submit ────────────────────────────────────────────────────

export const ValidationOnSubmit: Story = {
  name: "Validation on Submit",
  parameters: {
    docs: {
      description: {
        story:
          "Error message appears after the user submits with an empty field; clears when the field has a value.",
      },
    },
  },
  render: () => {
    const [value, setValue] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const error = submitted && !value.trim() ? "This field is required." : undefined;

    return (
      <div className="flex flex-col gap-4">
        <FormField
          htmlFor="title"
          label="Project title"
          description="Give your project a short name."
          error={error}
          required
        >
          <Input
            id="title"
            value={value}
            aria-invalid={!!error}
            onChange={(e) => { setValue(e.target.value); setSubmitted(false); }}
            placeholder="My awesome project"
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
