import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const meta: Meta<typeof Modal> = {
  title: "UI/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
A GSAP-animated modal that stays mounted in the DOM at all times, enabling smooth enter **and** exit animations via timeline \`play()\` / \`reverse()\`.

**Three built-in layout variants** are available via the \`className\` prop:

| Class | Behavior |
|---|---|
| \`vi-modal-slide-right\` | Full-height panel slides in from the right edge *(default)* |
| \`vi-modal-slide-left\` | Full-height panel slides in from the left edge |
| \`vi-modal-content\` | Centered overlay dialog that scales and fades in |

Each variant drives its animation through CSS custom properties read at runtime by GSAP:

\`\`\`scss
--modal-opacity:     <from>, <to>;  // autoAlpha
--modal-scale:       <from>, <to>;  // scale
--modal-translate-x: <from>, <to>;  // xPercent
--modal-translate-y: <from>, <to>;  // yPercent
\`\`\`

Override these in your own SCSS or via Tailwind arbitrary values to create custom animations.

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| \`open\` | \`boolean\` | — | Controlled open state |
| \`onOpenChange\` | \`(open: boolean) => void\` | — | Called when the modal should open or close |
| \`trigger\` | \`ReactNode\` | — | Element that opens the modal on click |
| \`title\` | \`string\` | — | Modal heading |
| \`description\` | \`string\` | — | Subtitle shown below the heading |
| \`footer\` | \`ReactNode\` | — | Content rendered in the footer row |
| \`className\` | \`string\` | \`vi-modal-slide-right\` | Layout + animation variant class |
| \`duration\` | \`number\` | \`1\` | GSAP timeline duration in seconds |
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

type ModalDemoProps = Omit<React.ComponentProps<typeof Modal>, "open" | "onOpenChange">;

const ModalDemo = (props: ModalDemoProps) => {
  const [open, setOpen] = useState(false);
  return <Modal {...props} open={open} onOpenChange={setOpen} />;
};

export const CenterPopup: Story = {
  parameters: {
    layout: "centered",
    docs: {
      description: {
        story:
          "A classic centered dialog that scales up from 95% and fades in from the center of the viewport. " +
          "The GSAP timeline animates `scale: 0.95 → 1` and `opacity: 0 → 1` simultaneously. " +
          "Positioning is handled by `left: 50% / top: 50%` with `-translate-x-1/2 -translate-y-1/2`, " +
          "so `--modal-translate-x` and `--modal-translate-y` are both held at `-50` throughout.",
      },
      source: {
        code: `
const ModalPopup = () => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      trigger={<Button variant="outline">Open Modal</Button>}
      title="Hello World"
      description="Opens and closes with a GSAP timeline."
      className="vi-modal-content"
    >
      <p>Modal content goes here.</p>
    </Modal>
  );
};`.trim(),
      },
    },
  },
  render: () => (
    <ModalDemo
      trigger={<Button variant="outline">Open Modal</Button>}
      title="Hello World"
      description="Opens and closes with a GSAP timeline."
      className="vi-modal-content"
    >
      <p className="text-sm text-muted-foreground">Modal content goes here.</p>
    </ModalDemo>
  ),
};

export const SlideFromRight: Story = {
  parameters: {
    layout: "centered",
    docs: {
      description: {
        story:
          "A full-height side panel that enters from the right edge of the viewport. " +
          "GSAP animates `xPercent: 100 → 0`, so the panel starts one full panel-width off-screen to the right and slides into view. " +
          "Clicking the dim overlay or the close button reverses the timeline. " +
          "This is the **default variant** — omitting `className` produces the same result.",
      },
      source: {
        code: `
const ModalSlideRight = () => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      trigger={<Button variant="outline">Open Right Panel</Button>}
      title="Right Panel"
      description="Slides in from the right edge of the screen."
      className="vi-modal-slide-right"
    >
      <p>Panel content goes here.</p>
    </Modal>
  );
};`.trim(),
      },
    },
  },
  render: () => (
    <ModalDemo
      trigger={<Button variant="outline">Open Right Panel</Button>}
      title="Right Panel"
      description="Slides in from the right edge of the screen."
      className="vi-modal-slide-right"
    >
      <p className="text-sm text-muted-foreground">Panel content goes here.</p>
    </ModalDemo>
  ),
};

export const SlideFromLeft: Story = {
  parameters: {
    layout: "centered",
    docs: {
      description: {
        story:
          "Mirror of `SlideFromRight` — the panel enters from the left edge of the viewport. " +
          "GSAP animates `xPercent: -100 → 0`, starting the panel one full width off-screen to the left. " +
          "Useful for navigation drawers, filter sidebars, or any secondary content panel. " +
          "Swap `vi-modal-slide-right` for `vi-modal-slide-left` to switch sides.",
      },
      source: {
        code: `
const ModalSlideLeft = () => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      trigger={<Button variant="outline">Open Left Panel</Button>}
      title="Left Panel"
      description="Slides in from the left edge of the screen."
      className="vi-modal-slide-left"
    >
      <p>Panel content goes here.</p>
    </Modal>
  );
};`.trim(),
      },
    },
  },
  render: () => (
    <ModalDemo
      trigger={<Button variant="outline">Open Left Panel</Button>}
      title="Left Panel"
      description="Slides in from the left edge of the screen."
      className="vi-modal-slide-left"
    >
      <p className="text-sm text-muted-foreground">Panel content goes here.</p>
    </ModalDemo>
  ),
};

export const WithForm: Story = {
  parameters: {
    layout: "centered",
    docs: {
      description: {
        story:
          "Demonstrates fully controlled state owned by the parent — useful when footer actions need to run " +
          "validation or an API call before closing. " +
          "`Cancel` closes immediately via `onOpenChange(false)`; `Create` fires `onSubmit` first, " +
          "giving you a hook to validate or persist data before dismissing. " +
          "Pass a `duration` prop (seconds) to speed up or slow down the animation — e.g. `duration={0.4}` for a snappier feel.",
      },
      source: {
        code: `
const ModalWithForm = () => {
  const [open, setOpen] = useState(false);

  const onSubmit = () => {
    // run validation / API call here
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      trigger={<Button>Create Project</Button>}
      title="Create New Project"
      description="Fill in the details for your new project."
      className="vi-modal-content"
      duration={0.5}
      footer={
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={onSubmit}>Create</Button>
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        <Input label="Project name" placeholder="My awesome project" />
        <Input label="Description" placeholder="What is this project about?" />
      </div>
    </Modal>
  );
};`.trim(),
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);

    const onSubmit = () => {
      alert("Form Submitted");
      setOpen(false);
    }

    return (
      <Modal
        open={open}
        onOpenChange={setOpen}
        trigger={<Button variant="outline">Create Project</Button>}
        title="Create New Project"
        description="Fill in the details for your new project."
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => onSubmit()}>
              Create
            </Button>
          </div>
        }
        className="vi-modal-content"
      >
        <div className="flex flex-col gap-3">
          <Input label="Project name" placeholder="My awesome project" />
          <Input label="Description" placeholder="What is this project about?" />
        </div>
      </Modal>
    )
  },
};
