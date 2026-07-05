import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "vi-btn",
  {
    variants: {
      variant: {
        default: "vi-btn-variant-default",
        destructive: "vi-btn-variant-destructive",
        outline: "vi-btn-variant-outline",
        secondary: "vi-btn-variant-secondary",
        ghost: "vi-btn-variant-ghost",
        link: "vi-btn-variant-link",
      },
      size: {
        default: "vi-btn-size-default",
        sm: "vi-btn-size-sm",
        lg: "vi-btn-size-lg",
        icon: "vi-btn-size-icon",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
