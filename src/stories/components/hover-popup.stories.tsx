import type { Meta, StoryObj } from "@storybook/react-vite";
import { HoverPopup } from "@/components/HoverPopup";

const meta: Meta<typeof HoverPopup> = {
  title: "Components/HoverPopup",
  component: HoverPopup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Inline trigger text that reveals a floating popup **below** on hover or keyboard focus. The trigger stays fully visible while the popup is open.

Useful for contextual definitions, feature explanations, or rich tooltips with arbitrary content.

**Keyboard**: \`Tab\` to focus the trigger → popup appears; \`Shift+Tab\` / blur → popup dismisses.

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| \`text\` | \`string\` | — | Trigger label shown inline |
| \`children\` | \`ReactNode\` | — | Popup content — any React node |
| \`className\` | \`string\` | — | Applied to the wrapper |
| \`triggerClassName\` | \`string\` | — | Applied to the trigger \`<span>\` |
        `.trim(),
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-16">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HoverPopup>;

export const Default: Story = {
  parameters: {
    docs: { description: { story: "Hover or focus the trigger to reveal the popup below." } },
  },
  args: {
    text: "hover me",
    children: <p>The popup appears below and the trigger stays visible.</p>,
  },
};

export const RichContent: Story = {
  name: "Rich Content",
  parameters: {
    docs: {
      description: {
        story: "`children` accepts any React node — definitions, badges, links, or structured cards.",
      },
    },
  },
  args: {
    text: "React",
    children: (
      <div className="flex flex-col gap-1.5">
        <p className="font-semibold text-sm">React</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          A JavaScript library for building user interfaces, maintained by Meta and a community of contributors.
        </p>
        <a
          href="https://react.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary hover:underline"
        >
          react.dev →
        </a>
      </div>
    ),
  },
};

export const InlineInText: Story = {
  name: "Inline in Text",
  parameters: {
    docs: {
      description: {
        story: "Multiple `HoverPopup` instances embedded naturally in a paragraph.",
      },
    },
  },
  render: () => (
    <p className="text-sm leading-relaxed max-w-sm text-center">
      This library uses{" "}
      <HoverPopup text="Tailwind CSS">
        <p className="text-xs">Utility-first CSS framework for rapid UI development.</p>
      </HoverPopup>
      {" "}for styling and{" "}
      <HoverPopup text="GSAP">
        <p className="text-xs">GreenSock Animation Platform — high-performance web animations.</p>
      </HoverPopup>
      {" "}for animations.
    </p>
  ),
};
