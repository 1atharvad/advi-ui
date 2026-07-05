import type { Meta, StoryObj } from "@storybook/react-vite";
import { Link, LogoLink, type LogoLinkProps } from "@/components/ui/link";

const meta: Meta<typeof Link> = {
  title: "UI/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A thin wrapper around \`<a>\` that normalizes internal and external links.

**Link**

| Prop | Type | Default | Description |
|---|---|---|---|
| \`link.url\` | \`string\` | — | Href for the anchor |
| \`link.text\` | \`string\` | — | Label text (also used as \`title\`) |
| \`link.isExternal\` | \`boolean\` | \`false\` | Adds \`target="_blank" rel="noopener noreferrer"\` |
| \`className\` | \`string\` | — | Extra classes merged onto the anchor |
| \`noBaseClass\` | \`boolean\` | \`false\` | When \`true\`, skips the \`vi-link\` base class |
| \`children\` | \`ReactNode\` | — | Overrides \`link.text\` as the anchor content |

**LogoLink**

Wraps \`Link\` with a logo image and a brand name side by side.

| Prop | Type | Description |
|---|---|---|
| \`name\` | \`string\` | Brand / site name rendered next to the logo |
| \`image\` | \`{ url: string; alt: string } \\| ReactNode\` | Image URL object or any React element (SVG, custom component) |
| \`link\` | \`Link\` | Destination for the whole logo block |
| \`className\` | \`string\` | Extra classes on the wrapper anchor |
        `.trim(),
      },
    },
  },
};

export default meta;
type LinkStory = StoryObj<typeof Link>;
type LogoLinkStory = StoryObj<typeof LogoLink>;

export const Internal: LinkStory = {
  parameters: {
    docs: {
      description: { story: "Default internal link — renders a plain `<a>` with the `vi-link` base class." },
      source: { code: `<Link link={{ url: "/about", text: "About us" }} />` },
    },
  },
  args: {
    link: { url: "/about", text: "About us" },
  },
};

export const External: LinkStory = {
  parameters: {
    docs: {
      description: { story: "External link — `isExternal: true` adds `target=\"_blank\"` and `rel=\"noopener noreferrer\"`." },
      source: {
        code: `<Link link={{ url: "https://github.com", text: "GitHub", isExternal: true }} />`,
      },
    },
  },
  args: {
    link: {
      url: "https://github.com",
      text: "GitHub",
      isExternal: true,
    },
  },
};

export const WithChildren: LinkStory = {
  parameters: {
    docs: {
      description: { story: "Pass `children` to override the default `link.text` label — useful for icons or rich markup." },
      source: {
        code: `<Link link={{ url: "/docs" }}>
  <strong>Custom child content</strong>
</Link>`,
      },
    },
  },
  render: () => (
    <Link link={{ url: "/docs" }}>
      <strong>Custom child content</strong>
    </Link>
  ),
};

const formatLogoLinkCode = (args: LogoLinkProps) => {
  const image = args.image as { url: string; alt: string };
  return `
<LogoLink
  name="${args.name}"
  image={{ url: "${image.url}", alt: "${image.alt}" }}
  link={{ url: "${args.link.url}", text: "${args.link.text}" }}
/>`;
};

export const WithLogo: LogoLinkStory = {
  parameters: {
    docs: {
      description: {
        story: "Logo with a name and image, wrapped in a link.",
      },
      source: {
        transform: (_: string, { args }: { args: LogoLinkProps }) => formatLogoLinkCode(args),
      },
    },
  },
  args: {
    name: "Advi UI",
    image: {
      url: "/ad-logo.webp",
      alt: "Advi UI Logo",
    },
    link: {
      url: "/",
      text: "Go to homepage",
    },
  },

  render: (args) => <LogoLink {...args} />,
};
