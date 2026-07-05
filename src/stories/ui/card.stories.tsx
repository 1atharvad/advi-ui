import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, CardWrapper, CardImage, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Slot-based card component built from composable sub-components. Combine them freely — all sub-components are optional and independently stackable.

**Sub-components**

| Component | Role |
|---|---|
| \`Card\` | Root container — applies \`vi-card\` base styles |
| \`CardImage\` | Full-bleed image at the top of the card |
| \`CardWrapper\` | Padding wrapper for content that follows an image |
| \`CardTitle\` | Primary heading slot |
| \`CardDescription\` | Muted subtitle slot |
| \`CardContent\` | Free-form content slot for body text, actions, etc. |

All sub-components forward refs and accept \`className\` for further customization.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Minimal card with `CardTitle` and `CardDescription` — the simplest composition.",
      },
      source: {
        code: `
<Card className="w-80">
  <CardTitle>Card Title</CardTitle>
  <CardDescription>A short description of what this card is about.</CardDescription>
</Card>`.trim(),
      },
    },
  },
  render: () => (
    <Card className="w-80">
      <CardTitle>Card Title</CardTitle>
      <CardDescription>A short description of what this card is about.</CardDescription>
    </Card>
  ),
};

export const WithImage: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`CardImage` renders a full-width image at the top of the card. " +
          "Use `CardWrapper` to add padding around any content that follows the image.",
      },
      source: {
        code: `
<Card className="w-80">
  <CardImage src="https://placehold.co/320x180" alt="Placeholder" />
  <CardWrapper>
    <CardTitle>Card with Image</CardTitle>
    <CardDescription>A card showcasing the CardImage slot.</CardDescription>
  </CardWrapper>
</Card>`.trim(),
      },
    },
  },
  render: () => (
    <Card className="w-80">
      <CardImage src="https://placehold.co/320x180" alt="Placeholder" />
      <CardWrapper>
        <CardTitle>Card with Image</CardTitle>
        <CardDescription>A card showcasing the CardImage slot.</CardDescription>
      </CardWrapper>
    </Card>
  ),
};

export const WithContent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`CardContent` is a free-form slot — drop in any JSX including text, action buttons, or custom layouts.",
      },
      source: {
        code: `
<Card className="w-80">
  <CardTitle>Confirm Action</CardTitle>
  <CardDescription>This action cannot be undone.</CardDescription>
  <CardContent>
    <p className="text-sm text-muted-foreground">Are you sure you want to continue?</p>
    <div className="flex justify-end mt-3 gap-2">
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  </CardContent>
</Card>`.trim(),
      },
    },
  },
  render: () => (
    <Card className="w-80">
      <CardTitle>Confirm Action</CardTitle>
      <CardDescription>This action cannot be undone.</CardDescription>
      <CardContent>
        <p className="text-sm text-muted-foreground">Are you sure you want to continue?</p>
        <div className="flex justify-end mt-3 gap-2">
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </div>
      </CardContent>
    </Card>
  ),
};

// export const WithContent: Story = {
//   render: () => (
//     <Card className="w-80">
//       <CardTitle>Status</CardTitle>
//       <CardDescription>All systems operational</CardDescription>
//       <CardContent>
//         <p className="text-sm text-muted-foreground">Last checked 2 minutes ago.</p>
//       </CardContent>
//     </Card>
//   ),
// };

export const Minimal: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Using `Card` directly as a styled container with arbitrary children, without any named sub-component slots.",
      },
      source: {
        code: `
<Card className="w-80 p-4">
  <p className="text-sm">A minimal card with only content and no slots.</p>
</Card>`.trim(),
      },
    },
  },
  render: () => (
    <Card className="w-80 p-4">
      <p className="text-sm">A minimal card with only content and no slots.</p>
    </Card>
  ),
};
