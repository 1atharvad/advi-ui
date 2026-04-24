import { forwardRef, useId, type ChangeEvent, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type RadioSize = "sm" | "default" | "lg";

// ─── Individual Radio ────────────────────────────────────────────────────────

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  size?: RadioSize;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, size = "default", className, id: externalId, disabled, ...props }, ref) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;

    return (
      <label
        htmlFor={id}
        className={cn(
          "vi-radio-item",
          size !== "default" && `vi-radio-item-${size}`,
          className
        )}
      >
        <input
          ref={ref}
          id={id}
          type="radio"
          disabled={disabled}
          className="vi-radio-input"
          {...props}
        />
        <span className="vi-radio-indicator" />
        {label && <span className="vi-radio-label">{label}</span>}
      </label>
    );
  }
);

Radio.displayName = "Radio";

// ─── Radio Group ─────────────────────────────────────────────────────────────

interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  name?: string;
  direction?: "vertical" | "horizontal";
  size?: RadioSize;
  className?: string;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      label,
      description,
      disabled,
      name,
      direction = "vertical",
      size = "default",
      className,
    },
    ref
  ) => {
    const id = useId();
    const groupName = name ?? id;
    const isControlled = value !== undefined;

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-labelledby={label ? `${id}-label` : undefined}
        className={cn("vi-radio-root", className)}
      >
        {label && (
          <span id={`${id}-label`} className="vi-radio-legend">
            {label}
          </span>
        )}

        <div
          className={cn(
            "vi-radio-options",
            direction === "horizontal" && "vi-radio-options-horizontal"
          )}
        >
          {options.map((opt) => {
            const optId = `${id}-opt-${opt.value}`;
            const isDisabled = disabled || opt.disabled;

            return (
              <label
                key={opt.value}
                htmlFor={optId}
                className={cn(
                  "vi-radio-item",
                  size !== "default" && `vi-radio-item-${size}`
                )}
              >
                <input
                  id={optId}
                  type="radio"
                  name={groupName}
                  value={opt.value}
                  disabled={isDisabled}
                  className="vi-radio-input"
                  {...(isControlled
                    ? {
                        checked: opt.value === value,
                        onChange: (e: ChangeEvent<HTMLInputElement>) => {
                          if (e.target.checked) onChange?.(opt.value);
                        },
                      }
                    : {
                        defaultChecked: opt.value === defaultValue,
                        onChange: (e: ChangeEvent<HTMLInputElement>) => {
                          if (e.target.checked) onChange?.(opt.value);
                        },
                      })}
                />
                <span className="vi-radio-indicator" />
                <span className="vi-radio-label">{opt.label}</span>
              </label>
            );
          })}
        </div>

        {description && <p className="vi-radio-description">{description}</p>}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";
