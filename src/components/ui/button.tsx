import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import React from "react";
import { forwardRef, type ButtonHTMLAttributes } from "react"

const buttonVariants = cva(
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

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
