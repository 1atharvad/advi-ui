import type { Meta, StoryObj } from "@storybook/react";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const meta: Meta = {
  title: "UI/Dialog",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Accessible modal dialog built on **Radix UI Dialog**. Content is rendered in a portal at \`document.body\`, with a backdrop overlay, focus trap, and keyboard close (\`Escape\`). CSS animations handle the open/close transition.

**Composition**

| Component | Role |
|---|---|
| \`Dialog\` | Root state manager (Radix root) |
| \`DialogTrigger\` | Element that opens the dialog |
| \`DialogContent\` | Centered panel — includes portal, overlay, and close button |
| \`DialogHeader\` | Title + description layout wrapper |
| \`DialogTitle\` | Accessible heading (announced by screen readers on open) |
| \`DialogDescription\` | Muted subtitle below the title |
| \`DialogFooter\` | Action row — stacks vertically on mobile, horizontal on \`sm+\` |
| \`DialogClose\` | Primitive close element |
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Basic confirmation dialog. `DialogTitle` and `DialogDescription` satisfy accessibility requirements — screen readers announce them when the dialog opens.",
      },
      source: {
        code: `
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`.trim(),
      },
    },
  },
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithForm: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates embedding Input fields inside a dialog. The form lives entirely within `DialogContent`; use `DialogFooter` for the action row.",
      },
      source: {
        code: `
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Edit Profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>Make changes to your profile here.</DialogDescription>
    </DialogHeader>
    <div className="flex flex-col gap-4 py-2">
      <Input label="Name" placeholder="Your name" />
      <Input label="Email" type="email" placeholder="you@example.com" />
    </div>
    <DialogFooter>
      <Button>Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`.trim(),
      },
    },
  },
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Make changes to your profile here.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-2">
          <Input label="Name" placeholder="Your name" />
          <Input label="Email" type="email" placeholder="you@example.com" />
        </div>
        <DialogFooter>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Destructive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Pattern for irreversible operations. Pair the `destructive` Button variant with a clear `DialogDescription` so users understand the consequences before confirming.",
      },
      source: {
        code: `
<Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive">Delete Account</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete Account</DialogTitle>
      <DialogDescription>
        This will permanently delete your account and all associated data.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`.trim(),
      },
    },
  },
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            This will permanently delete your account and all associated data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
