import { forwardRef, useState, type ChangeEvent, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends ComponentProps<"input"> {
  label?: string;
  description?: string;
  validate?: (value: string) => string | null;
  onValueChange?: (valid: string) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, description, validate, onValueChange, ...props }, ref) => {
    const [error, setError] = useState<string | null>(null);

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
        {label && <label className="text-sm font-normal leading-none">{label}</label>}

        <input
          ref={ref}
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 font-rubik text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          onChange={handleChange}
          {...props}
        />

        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}

        {error && (
          <p className="text-xs text-red-500 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
