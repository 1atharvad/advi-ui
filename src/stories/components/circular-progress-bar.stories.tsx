import type { Meta, StoryObj } from "@storybook/react";
import { CircularProgressBar } from "@/components/CircularProgressBar";

const meta: Meta<typeof CircularProgressBar> = {
  title: "Components/CircularProgressBar",
  component: CircularProgressBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
SVG-based circular progress arc with a GSAP mount animation. The center slot accepts any React node — pass an image, icon, or leave it empty to show the percentage automatically.

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| \`percentage\` | \`number\` | — | Fill level (0–100); clamped automatically |
| \`children\` | \`ReactNode\` | — | Center slot — defaults to the percentage label when omitted |
| \`label\` | \`string\` | — | Text rendered below the arc |
| \`size\` | \`number\` | \`120\` | Diameter of the arc in px |
| \`strokeWidth\` | \`number\` | \`8\` | Thickness of the arc stroke |
| \`animate\` | \`boolean\` | \`true\` | Animate from 0 on mount via GSAP |
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CircularProgressBar>;

export const Default: Story = {
  parameters: {
    docs: {
      description: { story: "Default size with percentage in the center and a GSAP fill animation on mount." },
    },
  },
  args: {
    percentage: 75,
    label: "React",
  },
};

export const WithImage: Story = {
  parameters: {
    docs: {
      description: {
        story: "Pass any React node as `children` to replace the default percentage label in the center.",
      },
    },
  },
  args: {
    percentage: 60,
    label: "TypeScript",
    children: (
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
        alt="TypeScript"
        width={40}
        height={40}
      />
    ),
  },
};

export const FullRing: Story = {
  parameters: {
    docs: {
      description: { story: "100% fills the arc completely." },
    },
  },
  args: {
    percentage: 100,
    label: "Complete",
  },
};

export const EmptyRing: Story = {
  parameters: {
    docs: {
      description: { story: "0% renders only the track, no fill." },
    },
  },
  args: {
    percentage: 0,
    label: "Not started",
  },
};

export const LargeSize: Story = {
  parameters: {
    docs: {
      description: { story: "`size` and `strokeWidth` are fully configurable." },
    },
  },
  args: {
    percentage: 82,
    size: 180,
    strokeWidth: 12,
    label: "Vue",
  },
};

export const SmallSize: Story = {
  parameters: {
    docs: {
      description: { story: "Compact variant for dense layouts." },
    },
  },
  args: {
    percentage: 45,
    size: 72,
    strokeWidth: 6,
    label: "Svelte",
  },
};

export const NoAnimation: Story = {
  parameters: {
    docs: {
      description: { story: "`animate={false}` renders at the final offset immediately — useful when the component is already in view." },
    },
  },
  args: {
    percentage: 68,
    label: "CSS",
    animate: false,
  },
};

export const SkillGrid: Story = {
  parameters: {
    docs: {
      description: {
        story: "Multiple instances side-by-side, each animating independently on mount.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-6 justify-center">
      {[
        { pct: 90, label: "React" },
        { pct: 75, label: "TypeScript" },
        { pct: 60, label: "Vue" },
        { pct: 50, label: "Svelte" },
      ].map(({ pct, label }) => (
        <CircularProgressBar key={label} percentage={pct} label={label} />
      ))}
    </div>
  ),
};
