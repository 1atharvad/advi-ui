import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const textItems = [
  {
    value: "what",
    title: "What is advi-ui?",
    content: "advi-ui is a React component library built with Tailwind CSS and SCSS. It provides accessible, composable UI primitives that follow a consistent design language.",
  },
  {
    value: "how",
    title: "How do I install it?",
    content: "Install via npm: npm install advi-ui. Import the styles and use the components directly in your React application.",
  },
  {
    value: "license",
    title: "What license does it use?",
    content: "advi-ui is open source and released under the MIT license.",
  },
];

const richItems = [
  {
    value: "stack",
    title: "Tech stack",
    content: (
      <div className="flex flex-wrap gap-2">
        <Badge>React</Badge>
        <Badge variant="secondary">Tailwind CSS</Badge>
        <Badge variant="secondary">SCSS</Badge>
        <Badge variant="secondary">Radix UI</Badge>
        <Badge variant="outline">TypeScript</Badge>
      </div>
    ),
  },
  {
    value: "install",
    title: "Installation",
    content: (
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Run the following command to get started:</p>
        <code className="rounded bg-muted px-3 py-2 text-xs font-mono">
          npm install advi-ui
        </code>
      </div>
    ),
  },
  {
    value: "support",
    title: "Browser support",
    content: (
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground">Supports all modern browsers.</p>
        <p className="text-xs text-muted-foreground">Chrome · Firefox · Safari · Edge</p>
      </div>
    ),
  },
];

const meta: Meta<typeof Accordion> = {
  title: "UI/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Collapsible panel list powered by **Radix UI**. Handles open/close state, keyboard navigation, and ARIA automatically.

\`content\` accepts \`ReactNode\` — pass a plain string or any JSX/component.

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| \`items\` | \`AccordionItem[]\` | — | Array of \`{ value, title, content: ReactNode, disabled? }\` |
| \`multiple\` | \`boolean\` | \`false\` | Allow more than one item open at a time |
| \`defaultValue\` | \`string \\| string[]\` | — | Uncontrolled open item(s) |
| \`value\` | \`string \\| string[]\` | — | Controlled open item(s) |
| \`onChange\` | \`(value) => void\` | — | Called when open state changes |
        `.trim(),
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[480px] p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const PlainText: Story = {
  name: "Plain Text Content",
  parameters: {
    docs: {
      description: { story: "Content as a plain string — the simplest usage." },
      source: {
        language: "tsx",
        code: `
<Accordion
  defaultValue="what"
  items={[
    {
      value: "what",
      title: "What is advi-ui?",
      content: "advi-ui is a React component library built with Tailwind CSS and SCSS.",
    },
    {
      value: "how",
      title: "How do I install it?",
      content: "Install via npm: npm install advi-ui.",
    },
  ]}
/>`.trim(),
      },
    },
  },
  args: { items: textItems, defaultValue: "what" },
};

export const RichContent: Story = {
  name: "Rich Component Content",
  parameters: {
    docs: {
      description: { story: "`content` accepts any `ReactNode` — badges, code blocks, layouts, anything." },
      source: {
        language: "tsx",
        code: `
<Accordion
  defaultValue="stack"
  items={[
    {
      value: "stack",
      title: "Tech stack",
      content: (
        <div className="flex flex-wrap gap-2">
          <Badge>React</Badge>
          <Badge variant="secondary">Tailwind CSS</Badge>
          <Badge variant="outline">TypeScript</Badge>
        </div>
      ),
    },
    {
      value: "install",
      title: "Installation",
      content: (
        <code className="rounded bg-muted px-3 py-2 text-xs font-mono">
          npm install advi-ui
        </code>
      ),
    },
  ]}
/>`.trim(),
      },
    },
  },
  args: { items: richItems, defaultValue: "stack" },
};

export const Multiple: Story = {
  parameters: {
    docs: {
      description: { story: "`multiple` allows several items to be open simultaneously." },
      source: {
        language: "tsx",
        code: `<Accordion multiple defaultValue={["what", "license"]} items={items} />`.trim(),
      },
    },
  },
  args: { items: textItems, multiple: true, defaultValue: ["what", "license"] },
};

export const WithDisabledItem: Story = {
  name: "With Disabled Item",
  parameters: {
    docs: {
      description: { story: "Set `disabled: true` on any item to prevent it from being toggled." },
      source: {
        language: "tsx",
        code: `
<Accordion
  defaultValue="what"
  items={[
    { value: "what", title: "What is advi-ui?", content: "..." },
    { value: "how",  title: "How do I install it?", content: "...", disabled: true },
    { value: "license", title: "License", content: "..." },
  ]}
/>`.trim(),
      },
    },
  },
  args: {
    items: [
      textItems[0],
      { ...textItems[1], disabled: true },
      textItems[2],
    ],
    defaultValue: "what",
  },
};

export const Controlled: Story = {
  parameters: {
    docs: {
      description: { story: "Controlled via `value` + `onChange` — the open item is driven by external state." },
      source: {
        language: "tsx",
        code: `
const [open, setOpen] = useState("");

<Accordion
  items={items}
  value={open}
  onChange={(v) => setOpen(v as string)}
/>`.trim(),
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState<string>("");
    return (
      <div className="flex flex-col gap-3">
        <p className="text-xs text-muted-foreground">Open: {open || "none"}</p>
        <Accordion
          items={textItems}
          value={open}
          onChange={(v) => setOpen(v as string)}
        />
      </div>
    );
  },
};
