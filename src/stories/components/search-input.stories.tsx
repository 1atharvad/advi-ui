import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchInput } from "@/components/SearchInput";

const meta: Meta<typeof SearchInput> = {
  title: "Components/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A richer search input built on top of a native \`<input type="search">\`. Adds a persistent search icon, a one-click clear button, a debounced \`onSearch\` callback, an optional keyboard-shortcut badge, and a loading spinner.

**Keyboard**

| Key | Action |
|---|---|
| Type | Fires \`onSearch\` after the debounce delay |
| \`Escape\` | Clears the field and fires \`onSearch("")\` |

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| \`value\` | \`string\` | — | Controlled value |
| \`defaultValue\` | \`string\` | \`""\` | Uncontrolled initial value |
| \`placeholder\` | \`string\` | \`"Search..."\` | Input placeholder |
| \`showButton\` | \`boolean\` | \`false\` | Appends an icon-only search button to the right of the input |
| \`debounce\` | \`number\` | \`300\` | Ms to wait before firing \`onSearch\`; ignored when \`showButton\` is true |
| \`loading\` | \`boolean\` | \`false\` | Shows a spinner in place of the clear button |
| \`shortcut\` | \`string\` | — | Hint badge shown when the field is empty (e.g. \`"⌘K"\`) |
| \`onSearch\` | \`(value: string) => void\` | — | Debounced callback fired on change and on clear |
| \`onClear\` | \`() => void\` | — | Extra callback fired when the X button is clicked or Escape is pressed |
| \`onChange\` | native handler | — | Passthrough for the raw change event |
| \`disabled\` | \`boolean\` | \`false\` | Disables the input |
| \`className\` | \`string\` | — | Applied to the root wrapper |
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
    loading: { control: { type: "boolean" } },
    showButton: { control: { type: "boolean" } },
    placeholder: { control: { type: "text" } },
    shortcut: { control: { type: "text" } },
    debounce: { control: { type: "number" } },
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  parameters: {
    docs: {
      description: { story: "Uncontrolled search input — type to see the clear button appear." },
      source: {
        code: `<SearchInput placeholder="Search..." />`,
      },
    },
  },
  args: { placeholder: "Search..." },
};

export const WithShortcut: Story = {
  name: "With Shortcut Badge",
  parameters: {
    docs: {
      description: {
        story:
          "Pass `shortcut` to show a `<kbd>` badge when the field is empty. The badge disappears as soon as the user types.",
      },
      source: {
        code: `<SearchInput placeholder="Search commands…" shortcut="⌘K" />`,
      },
    },
  },
  args: { placeholder: "Search commands…", shortcut: "⌘K" },
};

export const Loading: Story = {
  name: "Loading State",
  parameters: {
    docs: {
      description: {
        story:
          "`loading` swaps the clear button for a spinner. Use it while waiting for async search results.",
      },
      source: {
        code: `<SearchInput loading defaultValue="react hooks" placeholder="Search..." />`,
      },
    },
  },
  args: { loading: true, defaultValue: "react hooks", placeholder: "Search..." },
};

export const Controlled: Story = {
  name: "Controlled + onSearch",
  parameters: {
    docs: {
      description: {
        story:
          "Controlled pattern — `value` + `onSearch` keep the field in sync. `onSearch` fires after the 300 ms debounce; the last search term is shown below.",
      },
      source: {
        code: `
const [query, setQuery] = useState("");
const [last, setLast] = useState("");

<SearchInput
  value={query}
  placeholder="Search…"
  onSearch={(v) => { setQuery(v); setLast(v); }}
  onClear={() => setQuery("")}
/>
<p className="text-xs text-muted-foreground">
  Last search: <span className="font-medium text-foreground">{last || "—"}</span>
</p>`.trim(),
      },
    },
  },
  render: () => {
    const [query, setQuery] = useState("");
    const [last, setLast] = useState("");

    return (
      <div className="flex flex-col gap-3 w-80">
        <SearchInput
          value={query}
          placeholder="Search…"
          onSearch={(v) => { setQuery(v); setLast(v); }}
          onClear={() => setQuery("")}
        />
        <p className="text-xs text-muted-foreground">
          Last search: <span className="font-medium text-foreground">{last || "—"}</span>
        </p>
      </div>
    );
  },
};

export const WithButton: Story = {
  name: "With Search Button",
  parameters: {
    docs: {
      description: {
        story:
          "`showButton` appends a button to the right. `onSearch` fires immediately on button click or `Enter` — the debounce is bypassed.",
      },
      source: {
        code: `
const [query, setQuery] = useState("");
const [result, setResult] = useState("");

<SearchInput
  value={query}
  placeholder="Search…"
  showButton
  onSearch={setResult}
  onChange={(e) => setQuery(e.target.value)}
  onClear={() => { setQuery(""); setResult(""); }}
/>
<p className="text-xs text-muted-foreground">
  Searched: <span className="font-medium text-foreground">{result || "—"}</span>
</p>`.trim(),
      },
    },
  },
  render: () => {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState("");

    return (
      <div className="flex flex-col gap-3 w-80">
        <SearchInput
          value={query}
          placeholder="Search…"
          showButton
          onSearch={setResult}
          onChange={(e) => setQuery(e.target.value)}
          onClear={() => { setQuery(""); setResult(""); }}
        />
        <p className="text-xs text-muted-foreground">
          Searched: <span className="font-medium text-foreground">{result || "—"}</span>
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  name: "Disabled",
  parameters: {
    docs: {
      description: { story: "`disabled` reduces opacity and blocks all interaction." },
      source: {
        code: `<SearchInput disabled defaultValue="cannot edit this" />`,
      },
    },
  },
  args: { disabled: true, defaultValue: "cannot edit this" },
};
