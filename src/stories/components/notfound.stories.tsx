import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageNotFound } from "@/components/PageNotFound";

const meta: Meta<typeof PageNotFound> = {
  title: "Components/PageNotFound",
  component: PageNotFound,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
A full-screen 404 error page with an animated gradient background, colored orbs, and a "Back to Home" call-to-action button. No props — drop it in as a route-level component or fallback for unmatched routes.

The CTA uses \`<a href="/">\` internally so no router dependency is required. Swap to a router-aware \`<Link>\` via the Button \`asChild\` prop if needed.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageNotFound>;

export const Default: Story = {};
