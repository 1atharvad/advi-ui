import type { Meta, StoryObj } from "@storybook/react";
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
| \`linkGroups\` | \`FooterLinkGroup[]\` | \`[]\` | Array of \`{ title?, links[] }\` columns |
| \`copyright\` | \`string\` | — | Text rendered below the divider |
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
