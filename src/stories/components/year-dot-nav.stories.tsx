import type { Meta, StoryObj } from "@storybook/react";
import { YearDotNav } from "@/components/YearDotNav";
import type { YearDotNavScrollAlign } from "@/components/YearDotNav";

const YEARS = [2020, 2021, 2022, 2023, 2024, 2025];

const meta: Meta<typeof YearDotNav> = {
  title: "Components/YearDotNav",
  component: YearDotNav,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
A fixed right-rail dot navigation that tracks which year section is currently in view using \`IntersectionObserver\`.

Each dot corresponds to a page section with \`id="year-{year}"\`. Clicking a dot smooth-scrolls to the section. Hovering a dot reveals a pill label with the year.

**How it works**

- One \`IntersectionObserver\` per year, watching \`#year-{year}"\` elements
- \`rootMargin: '-30% 0px -60% 0px'\` means a section is "active" when it occupies the middle 10% band of the viewport
- Active dot scales to \`1.4×\` and fills with the primary color; inactive dots show at \`30%\` opacity
- Labels slide in from \`translateX(4px)\` on hover via a CSS-only transition

**Usage**

\`\`\`tsx
<section id="year-2023">...</section>
<section id="year-2024">...</section>

<YearDotNav years={[2023, 2024]} />
\`\`\`

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| \`years\` | \`number[]\` | — | Ordered list of years — must match \`id="year-{year}"\` elements in the DOM |
| \`scrollAlign\` | \`'top' \\| 'center' \\| 'bottom'\` | \`'center'\` | Where the section lands in the viewport after clicking a dot |
| \`className\` | \`string\` | — | Extra classes on the root \`<div>\` |
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof YearDotNav>;

// Alternating heights so scrollAlign differences are visible:
// short sections sit well inside the viewport, tall ones overflow it.
const SECTION_HEIGHTS = ['h-[40vh]', 'h-[160vh]', 'h-[60vh]', 'h-[140vh]', 'h-[50vh]', 'h-[120vh]'];

const PageDemo = ({ years, scrollAlign }: { years: number[]; scrollAlign?: YearDotNavScrollAlign }) => (
  <div className="relative">
    <YearDotNav years={years} scrollAlign={scrollAlign} />
    {years.map((year, i) => (
      <section
        key={year}
        id={`year-${year}`}
        className={`flex flex-col justify-center px-16 py-12 border-b border-border ${SECTION_HEIGHTS[i % SECTION_HEIGHTS.length]}`}
      >
        <span className="text-xs font-rubik font-semibold text-primary uppercase tracking-widest mb-3">
          {year}
        </span>
        <h2 className="text-4xl font-unbounded font-bold text-foreground mb-4">{year}</h2>
        <p className="text-muted-foreground max-w-lg text-sm leading-relaxed">
          Section height: <span className="font-medium text-foreground">{SECTION_HEIGHTS[i % SECTION_HEIGHTS.length]}</span>
          {' '}— click the dot to see where <span className="font-medium text-foreground">scrollAlign="{scrollAlign ?? 'center'}"</span> lands this section.
        </p>
      </section>
    ))}
  </div>
);

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Default — `scrollAlign=\"center\"`. Clicking a dot scrolls so the section is vertically centered in the viewport.",
      },
      source: {
        language: "tsx",
        code: `<YearDotNav years={[2020, 2021, 2022, 2023, 2024, 2025]} />`.trim(),
      },
    },
  },
  render: () => <PageDemo years={YEARS} />,
};

export const AlignTop: Story = {
  name: "Scroll Align — Top",
  parameters: {
    docs: {
      description: {
        story: "`scrollAlign=\"top\"` — the section's top edge lands at the top of the viewport.",
      },
      source: {
        language: "tsx",
        code: `<YearDotNav years={[2020, 2021, 2022, 2023, 2024, 2025]} scrollAlign="top" />`.trim(),
      },
    },
  },
  render: () => <PageDemo years={YEARS} scrollAlign="top" />,
};

export const AlignBottom: Story = {
  name: "Scroll Align — Bottom",
  parameters: {
    docs: {
      description: {
        story: "`scrollAlign=\"bottom\"` — the section's bottom edge lands at the bottom of the viewport.",
      },
      source: {
        language: "tsx",
        code: `<YearDotNav years={[2020, 2021, 2022, 2023, 2024, 2025]} scrollAlign="bottom" />`.trim(),
      },
    },
  },
  render: () => <PageDemo years={YEARS} scrollAlign="bottom" />,
};
