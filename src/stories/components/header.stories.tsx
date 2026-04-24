import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "@/components/Header";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div id="header-modal-root" style={{ position: "relative", height: "100%" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
A responsive site header with a logo block on the left and optional navigation links on the right.

- **Mobile** — shows the logo and, when \`ctaLinks\` are provided, a hamburger button that opens a slide-in modal drawer.
- **Desktop** (≥ lg) — shows the logo and a horizontal nav bar.

Uses the \`Modal\` component with the \`vi-modal-slide-right\` variant for the mobile drawer.

| Prop | Type | Default | Description |
|---|---|---|---|
| \`logo.name\` | \`string\` | — | Brand name shown next to the logo image |
| \`logo.image\` | \`{ url: string; alt: string }\` | — | Logo image source and alt text |
| \`logo.link\` | \`Link\` | — | Destination when the logo is clicked |
| \`ctaLinks\` | \`Link[]\` | \`[]\` | Nav links rendered in the desktop bar and the mobile drawer |
| \`className\` | \`string\` | — | Extra classes on the \`<header>\` element |
        `.trim(),
      },
      story: {
        height: "55vh",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

const defaultLogo = {
  name: "Advi UI",
  image: {
    url: "/ad-logo.webp",
    alt: "Advi UI Logo",
  },
  link: {
    url: "/",
    text: "Go to homepage",
  },
};

const defaultLinks = [
  { url: "/docs", text: "Docs" },
  { url: "/components", text: "Components" },
  { url: "/blog", text: "Blog" },
  { url: "https://github.com", text: "GitHub", isExternal: true },
];

export const Default: Story = {
  parameters: {
    docs: {
      description: { story: "Full header with a logo and four nav links — three internal, one external." },
      source: {
        code: `
<Header
  logo={{
    name: "Advi UI",
    image: { url: "/ad-logo.webp", alt: "Advi UI Logo" },
    link: { url: "/", text: "Go to homepage" },
  }}
  ctaLinks={[
    { url: "/docs", text: "Docs" },
    { url: "/components", text: "Components" },
    { url: "/blog", text: "Blog" },
    { url: "https://github.com", text: "GitHub", isExternal: true },
  ]}
/>`.trim(),
      },
    },
  },
  render: () => (
    <Header logo={defaultLogo} ctaLinks={defaultLinks} modalRootSelector="#header-modal-root" />
  ),
};

export const LogoOnly: Story = {
  parameters: {
    docs: {
      description: { story: "Header with no `ctaLinks` — the hamburger button and desktop nav are hidden." },
      source: {
        code: `
<Header
  logo={{
    name: "Advi UI",
    image: { url: "/ad-logo.webp", alt: "Advi UI Logo" },
    link: { url: "/", text: "Go to homepage" },
  }}
/>`.trim(),
      },
    },
  },
  render: () => <Header logo={defaultLogo} modalRootSelector="#header-modal-root" />,
};
