import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline";
export type BadgeSize = "sm" | "default" | "lg";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const variantClass: Record<BadgeVariant, string> = {
  default: "vi-badge-default",
  secondary: "vi-badge-secondary",
  destructive: "vi-badge-destructive",
  outline: "vi-badge-outline",
};

const sizeClass: Record<BadgeSize, string | false> = {
  sm: "vi-badge-sm",
  default: false,
  lg: "vi-badge-lg",
};

export const Badge = ({
  variant = "default",
  size = "default",
  className,
  children,
  ...props
}: BadgeProps) => (
  <span
    className={cn("vi-badge", variantClass[variant], sizeClass[size], className)}
    {...props}
  >
    {children}
  </span>
);

Badge.displayName = "Badge";
