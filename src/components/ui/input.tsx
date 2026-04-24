import { forwardRef, useState, useId, type ChangeEvent, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends ComponentProps<"input"> {
  label?: string;
  description?: string;
  validate?: (value: string) => string | null;
  onValueChange?: (valid: string) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, description, validate, onValueChange, id: externalId, ...props }, ref) => {
    const [error, setError] = useState<string | null>(null);
    const generatedId = useId();
    const id = externalId ?? generatedId;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (onValueChange) {
        onValueChange(e.target.value);
      }

      if (validate) {
        const msg = validate(e.target.value);
        setError(msg);
      }

      props.onChange?.(e);
    };

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label htmlFor={id} className="text-sm font-medium">
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={id}
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "md:text-sm",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          onChange={handleChange}
          {...props}
        />

        {description && !error && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}

        {error && (
          <p className="text-xs text-destructive font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
