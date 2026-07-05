export type ToastVariant = "default" | "success" | "error" | "warning" | "info"

export interface ToastItem {
  id: string
  variant: ToastVariant
  title?: string
  description?: string
  duration?: number
}

let globalAddToast: ((toast: Omit<ToastItem, "id">) => void) | null = null

export const setGlobalAddToast = (fn: typeof globalAddToast) => {
  globalAddToast = fn
}

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
