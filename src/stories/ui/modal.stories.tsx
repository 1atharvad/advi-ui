import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const meta: Meta<typeof Modal> = {
  title: "UI/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Modal>;

type ModalDemoProps = Omit<React.ComponentProps<typeof Modal>, "open" | "onOpenChange">;

const ModalDemo = (props: ModalDemoProps) => {
  const [open, setOpen] = useState(false);
  return <Modal {...props} open={open} onOpenChange={setOpen} />;
};

export const Default: Story = {
  render: () => (
    <ModalDemo
      trigger={<Button variant="outline">Open Modal</Button>}
      title="Hello World"
      description="This is a simple modal dialog."
    >
      <p className="text-sm text-muted-foreground">Modal content goes here.</p>
    </ModalDemo>
  ),
};

export const WithForm: Story = {
  render: () => (
    <ModalDemo
      trigger={<Button>Create Project</Button>}
      title="Create New Project"
      description="Fill in the details for your new project."
      footer={
        <div className="flex gap-2 justify-end">
          <Button variant="outline">Cancel</Button>
          <Button>Create</Button>
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        <Input label="Project name" placeholder="My awesome project" />
        <Input label="Description" placeholder="What is this project about?" />
      </div>
    </ModalDemo>
  ),
};

export const Destructive: Story = {
  render: () => (
    <ModalDemo
      trigger={<Button variant="destructive">Delete</Button>}
      title="Confirm Deletion"
      description="This action is permanent and cannot be undone."
      footer={
        <div className="flex gap-2 justify-end">
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </div>
      }
    >
      <p className="text-sm text-muted-foreground">
        All data associated with this item will be permanently removed.
      </p>
    </ModalDemo>
  ),
};

export const NoDescription: Story = {
  render: () => (
    <ModalDemo
      trigger={<Button variant="ghost">View Details</Button>}
      title="Item Details"
    >
      <p className="text-sm">Some detail content without a description line.</p>
    </ModalDemo>
  ),
};
