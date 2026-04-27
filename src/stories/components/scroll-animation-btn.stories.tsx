import type { Meta, StoryObj } from "@storybook/react";
import { ScrollAnimationBtn } from "@/components/ScrollAnimationBtn";

const meta: Meta<typeof ScrollAnimationBtn> = {
  title: "Components/ScrollAnimationBtn",
  component: ScrollAnimationBtn,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
A circular scroll-animation toggle button that floats fixed in the bottom-right corner. Clicking it toggles a play/pause state and fires a toast notification confirming the change.

Internally wraps \`<ToastProvider>\`, so no separate provider is needed when using this component standalone.

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| \`btnText\` | \`string\` | \`"● SCROLL ● ANIMATION ● MOTION"\` | Text that revolves around the button |
| \`activatedText\` | \`string\` | \`"Scroll animation enabled"\` | Toast shown when animation is turned on |
| \`deactivatedText\` | \`string\` | \`"Scroll animation disabled"\` | Toast shown when animation is turned off |
| \`toastPosition\` | \`"left" \\| "right"\` | \`"right"\` | Corner where the toast notification appears |
| \`className\` | \`string\` | — | Extra classes for the outer wrapper |
        `.trim(),
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: "100vh", position: "relative" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    btnText: { control: { type: "text" } },
    activatedText: { control: { type: "text" } },
    deactivatedText: { control: { type: "text" } },
    toastPosition: { control: { type: "radio" }, options: ["left", "right"] },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollAnimationBtn>;

export const RotatingTextBtn: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Override all three text strings: the orbiting label, the activation toast message, and the deactivation toast message.",
      },
      source: {
        code: `
<ScrollAnimationBtn
  btnText="● SCROLL ● ANIMATION ● MOTION"
  activatedText="Animation is ON"
  deactivatedText="Animation is OFF"
  toastPosition="left"
/>`.trim(),
      },
    },
  },
  args: {
    toastPosition: "left",
    activatedText: "Animation is ON",
    deactivatedText: "Animation is OFF",
  },
};
