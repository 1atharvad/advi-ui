import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { ToastProvider, toast } from "@/components/ui/toast"
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
        component: "Minimal, single-file toast component. No complex setup needed.",
      },
    },
  },
}

export default meta
type Story = StoryObj

export const AllVariants: Story = {
  render: () => <ToastDemo />,
}

export const WithTitleAndDescription: Story = {
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
