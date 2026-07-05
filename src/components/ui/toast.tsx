import { useState, useCallback, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { setGlobalAddToast, type ToastItem } from "./toast-store";

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
    setGlobalAddToast(addToast)
    return () => {
      setGlobalAddToast(null)
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
