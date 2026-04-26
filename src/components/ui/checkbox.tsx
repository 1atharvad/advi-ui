import {
  forwardRef,
  useId,
  useEffect,
  useRef,
  useImperativeHandle,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

export interface CheckboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type CheckboxSize = "sm" | "default" | "lg";

// ─── Individual Checkbox ──────────────────────────────────────────────────────

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  size?: CheckboxSize;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, size = "default", indeterminate, className, id: externalId, disabled, ...props }, ref) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => localRef.current!, []);

    useEffect(() => {
      if (localRef.current) localRef.current.indeterminate = indeterminate ?? false;
    }, [indeterminate]);

    return (
      <label
        htmlFor={id}
        className={cn(
          "vi-checkbox-item",
          size !== "default" && `vi-checkbox-item-${size}`,
          className
        )}
      >
        <input
          ref={localRef}
          id={id}
          type="checkbox"
          disabled={disabled}
          className="vi-checkbox-input"
          {...props}
        />
        <span className="vi-checkbox-indicator" />
        {label && <span className="vi-checkbox-label">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

// ─── Checkbox Group ───────────────────────────────────────────────────────────

interface CheckboxGroupProps {
  options: CheckboxOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  direction?: "vertical" | "horizontal";
  size?: CheckboxSize;
  className?: string;
}

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      options,
      value,
      defaultValue = [],
      onChange,
      label,
      description,
      disabled,
      direction = "vertical",
      size = "default",
      className,
    },
    ref
  ) => {
    const id = useId();
    const isControlled = value !== undefined;
    const [localValue, setLocalValue] = useState<string[]>(defaultValue);
    const currentValue = isControlled ? value : localValue;

    const handleChange = (optValue: string, checked: boolean) => {
      const next = checked
        ? [...currentValue, optValue]
        : currentValue.filter((v) => v !== optValue);
      if (!isControlled) setLocalValue(next);
      onChange?.(next);
    };

    return (
      <div
        ref={ref}
        role="group"
        aria-labelledby={label ? `${id}-label` : undefined}
        className={cn("vi-checkbox-root", className)}
      >
        {label && (
          <span id={`${id}-label`} className="vi-checkbox-legend">
            {label}
          </span>
        )}

        <div
          className={cn(
            "vi-checkbox-options",
            direction === "horizontal" && "vi-checkbox-options-horizontal"
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
                  "vi-checkbox-item",
                  size !== "default" && `vi-checkbox-item-${size}`
                )}
              >
                <input
                  id={optId}
                  type="checkbox"
                  value={opt.value}
                  disabled={isDisabled}
                  className="vi-checkbox-input"
                  checked={currentValue.includes(opt.value)}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(opt.value, e.target.checked)
                  }
                />
                <span className="vi-checkbox-indicator" />
                <span className="vi-checkbox-label">{opt.label}</span>
              </label>
            );
          })}
        </div>

        {description && <p className="vi-checkbox-description">{description}</p>}
      </div>
    );
  }
);

CheckboxGroup.displayName = "CheckboxGroup";
