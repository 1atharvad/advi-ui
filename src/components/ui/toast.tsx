import React, {useState, useCallback, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Types
type ToastVariant = "default" | "success" | "error" | "warning" | "info"

interface ToastItem {
  id: string
  variant: ToastVariant
  title?: string
  description?: string
  duration?: number
}

// Global toast state
let globalAddToast: ((toast: Omit<ToastItem, "id">) => void) | null = null

type ToastPosition = "left" | "right"

// Provider Component
export const ToastProvider = ({ children, position = "right" }: { children: ReactNode; position?: ToastPosition }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const addToast = useCallback((toast: Omit<ToastItem, "id">) => {
    const id = Date.now().toString() + Math.random().toString(36)
    const newToast = { ...toast, id }

    setToasts((prev) => [...prev, newToast].slice(-5)) // Max 5 toasts

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, toast.duration || 5000)
  }, [])

  // Set global function on mount
  useEffect(() => {
    globalAddToast = addToast
    return () => {
      globalAddToast = null
    }
  }, [addToast])

  return (
    <>
      {children}
      <div className={cn("vi-toast-viewport", position === "left" && "vi-toast-viewport-left")}>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </>
  )
}

// Toast Component
const Toast = ({ variant, title, description }: ToastItem) => {
  // When no title, description gets the colored styling
  const hasTitle = Boolean(title)

  return (
    <div className={cn("vi-toast", `vi-toast-variant-${variant}`)}>
      <div className="vi-toast-content">
        {hasTitle && <div className="vi-toast-title">{title}</div>}
        {description && (
          <div className={cn(
            "vi-toast-description",
            !hasTitle && "vi-toast-description-colored"
          )}>
            {description}
          </div>
        )}
      </div>
    </div>
  )
}

// Convenience functions - can be used anywhere
export const toast = {
  success: (titleOrDescription: string, description?: string) => {
    const hasDescription = description !== undefined
    globalAddToast?.({
      variant: "success",
      title: hasDescription ? titleOrDescription : undefined,
      description: hasDescription ? description : titleOrDescription,
    })
  },
  error: (titleOrDescription: string, description?: string) => {
    const hasDescription = description !== undefined
    globalAddToast?.({
      variant: "error",
      title: hasDescription ? titleOrDescription : undefined,
      description: hasDescription ? description : titleOrDescription,
    })
  },
  warning: (titleOrDescription: string, description?: string) => {
    const hasDescription = description !== undefined
    globalAddToast?.({
      variant: "warning",
      title: hasDescription ? titleOrDescription : undefined,
      description: hasDescription ? description : titleOrDescription,
    })
  },
  info: (titleOrDescription: string, description?: string) => {
    const hasDescription = description !== undefined
    globalAddToast?.({
      variant: "info",
      title: hasDescription ? titleOrDescription : undefined,
      description: hasDescription ? description : titleOrDescription,
    })
  },
  default: (titleOrDescription: string, description?: string) => {
    const hasDescription = description !== undefined
    globalAddToast?.({
      variant: "default",
      title: hasDescription ? titleOrDescription : undefined,
      description: hasDescription ? description : titleOrDescription,
    })
  },
}
