import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "@/components/ui/link";

const meta: Meta<typeof Link> = {
  title: "UI/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Internal: Story = {
  args: {
    link: { url: "/about", text: "About us" },
  },
};

export const External: Story = {
  args: {
    link: {
      url: "https://github.com",
      text: "GitHub",
      is_external_link: true,
    },
  },
};

export const WithChildren: Story = {
  render: () => (
    <Link link={{ url: "/docs" }}>
      <strong>Custom child content</strong>
    </Link>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Link link={{ url: "/home", text: "Internal link" }} />
      <Link link={{ url: "https://github.com", text: "External link", is_external_link: true }} />
    </div>
  ),
};
