import type { Meta, StoryObj } from "@storybook/react-vite";
import { YearDotNav } from "@/components/YearDotNav";
import type { YearDotNavItem, YearDotNavScrollAlign } from "@/components/YearDotNav";

const ITEMS: YearDotNavItem[] = [
  { year: 2023, months: [2, 5, 9] },
  { year: 2024, months: [1, 4, 7, 10] },
  { year: 2025, months: [3, 6] },
];

const ITEMS_YEARS_ONLY: YearDotNavItem[] = [
  { year: 2020 },
  { year: 2021 },
  { year: 2022 },
  { year: 2023 },
  { year: 2024 },
  { year: 2025 },
];

const meta: Meta<typeof YearDotNav> = {
  title: "Components/YearDotNav",
  component: YearDotNav,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
A fixed right-rail dot navigation that tracks which year (and optionally month) section is currently in view using \`IntersectionObserver\`.

Each dot corresponds to a page section with \`id="year-{year}"\` or \`id="year-{year}-month-{month}"\`. Clicking a dot smooth-scrolls to the section. Hovering reveals a pill label. Month dots appear only when that year is active.

**How it works**

- One \`IntersectionObserver\` per year/month element
- \`rootMargin: '-30% 0px -60% 0px'\` detects the middle 10% band of the viewport
- Active year dot stays filled even when a month is active (breadcrumb)
- Month dots expand below the year dot only while that year is active
- Active dot scales to \`1.4×\` and fills with the primary color

**Usage**

\`\`\`tsx
<section id="year-2024">...</section>
<section id="year-2024-month-3">...</section>
<section id="year-2024-month-6">...</section>

<YearDotNav items={[{ year: 2024, months: [3, 6] }]} />
\`\`\`

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| \`items\` | \`YearDotNavItem[]\` | — | List of \`{ year, months? }\` — must match \`id\` elements in the DOM |
| \`scrollAlign\` | \`'top' \\| 'center' \\| 'bottom'\` | \`'center'\` | Where the section lands in the viewport after clicking a dot |
| \`className\` | \`string\` | — | Extra classes on the root \`<div>\` |
        `.trim(),
      },
      story: {
        height: "600px",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof YearDotNav>;

const SECTION_HEIGHTS = ['h-[40vh]', 'h-[120vh]', 'h-[60vh]', 'h-[100vh]', 'h-[50vh]', 'h-[80vh]'];

const PageDemo = ({
  items,
  scrollAlign,
  docsMode,
}: {
  items: YearDotNavItem[];
  scrollAlign?: YearDotNavScrollAlign;
  docsMode?: boolean;
}) => {
  let sectionIndex = 0;
  return (
    <div className={docsMode ? "relative h-[55vh] overflow-y-scroll" : "relative"}>
      <YearDotNav items={items} scrollAlign={scrollAlign} />
      {items.map(({ year, months }) => (
        <div key={year}>
          <section
            id={`year-${year}`}
            className={`flex flex-col justify-center px-16 py-12 border-b border-border ${SECTION_HEIGHTS[sectionIndex++ % SECTION_HEIGHTS.length]}`}
          >
            <span className="text-xs font-rubik font-semibold text-primary uppercase tracking-widest mb-3">
              {year}
            </span>
            <h2 className="text-4xl font-unbounded font-bold text-foreground mb-4">{year}</h2>
          </section>
          {months?.map(month => (
            <section
              key={month}
              id={`year-${year}-month-${month}`}
              className={`flex flex-col justify-center px-16 py-12 border-b border-border ${SECTION_HEIGHTS[sectionIndex++ % SECTION_HEIGHTS.length]}`}
            >
              <span className="text-xs font-rubik font-semibold text-primary uppercase tracking-widest mb-3">
                {new Date(year, month - 1).toLocaleString('default', { month: 'long' })} {year}
              </span>
              <h2 className="text-3xl font-unbounded font-bold text-foreground mb-4">
                {new Date(year, month - 1).toLocaleString('default', { month: 'long' })}
              </h2>
            </section>
          ))}
        </div>
      ))}
    </div>
  );
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Years with months — month dots appear below the year dot when that year is active.",
      },
      source: {
        language: "tsx",
        code: `
<YearDotNav
  items={[
    { year: 2023, months: [2, 5, 9] },
    { year: 2024, months: [1, 4, 7, 10] },
    { year: 2025, months: [3, 6] },
  ]}
/>`.trim(),
      },
    },
  },
  render: (_, { viewMode }) => <PageDemo items={ITEMS} docsMode={viewMode === 'docs'} />,
};

export const YearsOnly: Story = {
  name: "Years Only",
  parameters: {
    docs: {
      description: {
        story: "Omit `months` from any item to render year-only dots with no nested expansion.",
      },
      source: {
        language: "tsx",
        code: `<YearDotNav items={[{ year: 2020 }, { year: 2021 }, { year: 2022 }]} />`.trim(),
      },
    },
  },
  render: (_, { viewMode }) => <PageDemo items={ITEMS_YEARS_ONLY} docsMode={viewMode === 'docs'} />,
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
        code: `<YearDotNav items={[...]} scrollAlign="top" />`.trim(),
      },
    },
  },
  render: (_, { viewMode }) => <PageDemo items={ITEMS} scrollAlign="top" docsMode={viewMode === 'docs'} />,
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
        code: `<YearDotNav items={[...]} scrollAlign="bottom" />`.trim(),
      },
    },
  },
  render: (_, { viewMode }) => <PageDemo items={ITEMS} scrollAlign="bottom" docsMode={viewMode === 'docs'} />,
};
