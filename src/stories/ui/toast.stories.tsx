import React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { ToastProvider } from "@/components/ui/toast"
import { toast } from "@/components/ui/toast-store"
import { Button } from "@/components/ui/button"

// Subcomponents
const ToastSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <>
    <h3 className="text-sm font-semibold mt-4 first:mt-0">{title}</h3>
    <div className="flex flex-col gap-2">{children}</div>
  </>
)

const ToastButton = ({
  onClick,
  children
}: {
  onClick: () => void;
  children: React.ReactNode
}) => (
  <Button onClick={onClick} variant="outline">
    {children}
  </Button>
)

// Wrapper component for stories
const ToastDemo = () => {
  return (
    <ToastProvider>
      <div className="flex flex-col gap-4">
        <ToastSection title="With Title + Description">
          <ToastButton onClick={() => toast.success("Success!", "Operation completed successfully")}>
            Success Toast
          </ToastButton>
          <ToastButton onClick={() => toast.error("Error!", "Something went wrong")}>
            Error Toast
          </ToastButton>
          <ToastButton onClick={() => toast.warning("Warning!", "Please be careful")}>
            Warning Toast
          </ToastButton>
          <ToastButton onClick={() => toast.info("Info", "Just so you know...")}>
            Info Toast
          </ToastButton>
          <ToastButton onClick={() => toast.default("Notification", "Default message")}>
            Default Toast
          </ToastButton>
        </ToastSection>

        <ToastSection title="Simple (Colored Text)">
          <ToastButton onClick={() => toast.success("Saved!")}>
            Success Simple
          </ToastButton>
          <ToastButton onClick={() => toast.error("Failed!")}>
            Error Simple
          </ToastButton>
          <ToastButton onClick={() => toast.warning("Be careful!")}>
            Warning Simple
          </ToastButton>
          <ToastButton onClick={() => toast.info("FYI...")}>
            Info Simple
          </ToastButton>
          <ToastButton onClick={() => toast.default("Note")}>
            Default Simple
          </ToastButton>
        </ToastSection>
      </div>
    </ToastProvider>
  )
}

const meta: Meta = {
  title: "UI/Toast",
  component: ToastDemo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A lightweight, zero-dependency toast notification system. Wrap your app once with \`<ToastProvider>\`, then call \`toast.success()\`, \`toast.error()\`, \`toast.warning()\`, \`toast.info()\`, or \`toast.default()\` from anywhere in the component tree.

**Two call signatures** are supported for every variant:
- \`toast.success("Saved!")\` — message only; text gets the variant's accent color
- \`toast.success("Success!", "Operation completed.")\` — title + description; title gets the color, description is muted

**ToastProvider Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| \`position\` | \`"left" \\| "right"\` | \`"right"\` | Viewport corner where toasts stack |
| \`children\` | \`ReactNode\` | — | Your page or component tree |

Toasts auto-dismiss after **5 seconds** and stack up to a maximum of **5** at a time — the oldest is dropped when the cap is reached.
        `.trim(),
      },
    },
  },
}

export default meta
type Story = StoryObj

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "All five variants in both call signatures — title+description and simple colored text — side by side in a single demo.",
      },
    },
  },
  render: () => <ToastDemo />,
}

export const WithTitleAndDescription: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When both arguments are provided, the first becomes the bold title and the second is the muted description. " +
          "The variant's accent color is applied to the title, while the description stays muted.",
      },
      source: {
        code: `
<ToastProvider>
  <div className="flex flex-col gap-2">
    <Button variant="outline" onClick={() => toast.success("Success!", "Operation completed successfully")}>
      Show Success
    </Button>
    <Button variant="outline" onClick={() => toast.error("Error!", "Something went wrong")}>
      Show Error
    </Button>
    <Button variant="outline" onClick={() => toast.warning("Warning!", "Please be careful")}>
      Show Warning
    </Button>
  </div>
</ToastProvider>`.trim(),
      },
    },
  },
  render: () => (
    <ToastProvider>
      <div className="flex flex-col gap-2">
        <ToastButton onClick={() => toast.success("Success!", "Operation completed successfully")}>
          Show Success
        </ToastButton>
        <ToastButton onClick={() => toast.error("Error!", "Something went wrong")}>
          Show Error
        </ToastButton>
        <ToastButton onClick={() => toast.warning("Warning!", "Please be careful")}>
          Show Warning
        </ToastButton>
      </div>
    </ToastProvider>
  ),
}

export const SimpleColored: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Pass a single string to color the entire message in the variant's accent color. " +
          "Ideal for brief confirmations where no extra context is needed.",
      },
      source: {
        code: `
<ToastProvider>
  <div className="flex flex-col gap-2">
    <Button variant="outline" onClick={() => toast.success("Saved!")}>
      Show Success
    </Button>
    <Button variant="outline" onClick={() => toast.error("Failed!")}>
      Show Error
    </Button>
    <Button variant="outline" onClick={() => toast.warning("Be careful!")}>
      Show Warning
    </Button>
  </div>
</ToastProvider>`.trim(),
      },
    },
  },
  render: () => (
    <ToastProvider>
      <div className="flex flex-col gap-2">
        <ToastButton onClick={() => toast.success("Saved!")}>
          Show Success
        </ToastButton>
        <ToastButton onClick={() => toast.error("Failed!")}>
          Show Error
        </ToastButton>
        <ToastButton onClick={() => toast.warning("Be careful!")}>
          Show Warning
        </ToastButton>
      </div>
    </ToastProvider>
  ),
}

export const CICDExamples: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Real-world pipeline notification pattern: `info` on start, `success` on finish, `error` on failure. " +
          "Shows how toasts chain naturally in async workflows.",
      },
      source: {
        code: `
<ToastProvider>
  <div className="flex flex-col gap-2">
    <Button variant="outline" onClick={() => toast.info("Build Started", "Pipeline #42 is building...")}>
      Build Started
    </Button>
    <Button variant="outline" onClick={() => toast.success("Build Complete", "Pipeline #42 finished in 3m 24s")}>
      Build Success
    </Button>
    <Button variant="outline" onClick={() => toast.error("Build Failed", "Pipeline #42 failed at test stage")}>
      Build Failed
    </Button>
  </div>
</ToastProvider>`.trim(),
      },
    },
  },
  render: () => (
    <ToastProvider>
      <div className="flex flex-col gap-2">
        <ToastButton onClick={() => toast.info("Build Started", "Pipeline #42 is building...")}>
          Build Started
        </ToastButton>
        <ToastButton onClick={() => toast.success("Build Complete", "Pipeline #42 finished in 3m 24s")}>
          Build Success
        </ToastButton>
        <ToastButton onClick={() => toast.error("Build Failed", "Pipeline #42 failed at test stage")}>
          Build Failed
        </ToastButton>
      </div>
    </ToastProvider>
  ),
}
