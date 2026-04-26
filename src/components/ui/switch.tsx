import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type SwitchSize = "sm" | "default" | "lg";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  size?: SwitchSize;
  labelPosition?: "left" | "right";
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      size = "default",
      labelPosition = "right",
      className,
      id: externalId,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;

    const track = (
      <span className="vi-switch-track">
        <span className="vi-switch-thumb" />
      </span>
    );

    return (
      <label
        htmlFor={id}
        className={cn(
          "vi-switch-item",
          size !== "default" && `vi-switch-item-${size}`,
          className
        )}
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          role="switch"
          disabled={disabled}
          className="vi-switch-input"
          {...props}
        />
        {labelPosition === "left" && label && (
          <span className="vi-switch-label">{label}</span>
        )}
        {track}
        {labelPosition === "right" && label && (
          <span className="vi-switch-label">{label}</span>
        )}
      </label>
    );
  }
);

Switch.displayName = "Switch";
