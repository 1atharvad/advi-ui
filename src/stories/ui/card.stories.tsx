import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardWrapper, CardImage, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardTitle>Card Title</CardTitle>
      <CardDescription>A short description of what this card is about.</CardDescription>
    </Card>
  ),
};

export const WithImage: Story = {
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
  render: () => (
    <Card className="w-80 p-4">
      <p className="text-sm">A minimal card with only content and no slots.</p>
    </Card>
  ),
};
