import { forwardRef, useState, type ChangeEvent, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends ComponentProps<"textarea"> {
  label?: string;
  description?: string;
  maskedLength?: number;
  hidden?: boolean;
  validate?: (value: string) => string | null;
  onValidationChange?: (valid: boolean) => void;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, description, maskedLength=8, hidden, validate, onValidationChange, ...props }, ref) => {
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (validate) {
        const msg = validate(e.target.value);
        setError(msg);
        onValidationChange?.(!msg);
      }

      props.onChange?.(e);
    };

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && <label className="text-sm font-medium">{label}</label>}

        <div className="relative">
          <textarea ref={ref}
              className={cn(
                "flex min-h-[36px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                error && "border-red-500 focus-visible:ring-red-500",
                props.value && hidden && "text-transparent",
                className
              )}
              onChange={handleChange}
              {...props}
              placeholder={!hidden ? props.placeholder : undefined} />
          {hidden && <div className="absolute inset-0 p-2 h-fit pointer-events-none">
            {"•".repeat(maskedLength)}
          </div>}
        </div>

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

Textarea.displayName = "Textarea";
