import type { Meta, StoryObj } from "@storybook/react-vite";
import { Footer } from "@/components/Footer";

const logo = {
  name: "ADVI-UI",
  image: { url: "/ad-logo.webp", alt: "ADVI-UI logo" },
  link: { url: "/" },
};

const linkGroups = [
  {
    title: "Components",
    links: [
      { url: "#", text: "Button" },
      { url: "#", text: "Input" },
      { url: "#", text: "Select" },
      { url: "#", text: "Modal" },
    ],
  },
  {
    title: "Resources",
    links: [
      { url: "#", text: "Documentation" },
      { url: "#", text: "Changelog" },
      { url: "https://github.com", text: "GitHub", isExternal: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { url: "#", text: "Privacy Policy" },
      { url: "#", text: "Terms of Service" },
    ],
  },
];

const copyright = `© ${new Date().getFullYear()} ADVI-UI. All rights reserved.`;

const meta: Meta<typeof Footer> = {
  title: "Components/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Site footer with an optional logo, grouped navigation columns, and a copyright bar.

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| \`logo\` | \`LogoLinkProps\` | — | Logo shown in the top-left of the footer |
| \`tagline\` | \`string\` | — | Short text rendered under the logo |
| \`linkGroups\` | \`FooterLinkGroup[]\` | \`[]\` | Array of \`{ title?, links[] }\` columns |
| \`copyright\` | \`string\` | — | Text rendered below the divider |
| \`credits\` | \`ReactNode\` | — | Attribution content (e.g. "Built by ...") |
| \`creditsPosition\` | \`"top" \\| "bottom"\` | \`"bottom"\` | \`"bottom"\` places credits next to copyright; \`"top"\` renders it as its own full-width row above the divider |
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  parameters: {
    docs: {
      description: { story: "Full footer — logo, three link columns, and copyright bar." },
    },
  },
  args: { logo, linkGroups, copyright },
};

export const WithTagline: Story = {
  parameters: {
    docs: {
      description: { story: "Logo with a short tagline underneath, alongside link columns." },
    },
  },
  args: { logo, tagline: "Accessible React components for shadcn/ui + Tailwind.", linkGroups, copyright },
};

export const WithCredits: Story = {
  parameters: {
    docs: {
      description: { story: "Copyright and credits shown side by side in the bottom bar." },
    },
  },
  args: {
    logo,
    linkGroups,
    copyright,
    credits: (
      <>
        Built with{" "}
        <a href="https://github.com" className="underline hover:text-foreground">
          advi-ui
        </a>
      </>
    ),
  },
};

export const WithCreditsOnTop: Story = {
  parameters: {
    docs: {
      description: { story: "Credits shown as their own row above the divider, instead of next to copyright." },
    },
  },
  args: {
    logo,
    linkGroups,
    copyright,
    creditsPosition: "top",
    credits: (
      <>
        Built with{" "}
        <a href="https://github.com" className="underline hover:text-foreground">
          advi-ui
        </a>
      </>
    ),
  },
};

export const LogoOnly: Story = {
  parameters: {
    docs: {
      description: { story: "Logo and copyright with no link groups." },
    },
  },
  args: { logo, copyright },
};

export const LinksOnly: Story = {
  parameters: {
    docs: {
      description: { story: "Link columns with copyright but no logo." },
    },
  },
  args: { linkGroups, copyright },
};

export const CopyrightOnly: Story = {
  parameters: {
    docs: {
      description: { story: "Minimal footer — copyright text only, no top section or divider." },
    },
  },
  args: { copyright },
};

export const NoGroupTitles: Story = {
  parameters: {
    docs: {
      description: { story: "Link groups without section titles — flat link lists." },
    },
  },
  args: {
    logo,
    copyright,
    linkGroups: linkGroups.map(({ links }) => ({ links })),
  },
};
