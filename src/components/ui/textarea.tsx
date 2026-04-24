import { forwardRef, useState, useId, type ChangeEvent, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends ComponentProps<"textarea"> {
  label?: string;
  description?: string;
  hidden?: boolean;
  validate?: (value: string) => string | null;
  onValidationChange?: (valid: boolean) => void;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      description,
      hidden,
      validate,
      onValidationChange,
      id: externalId,
      ...props
    },
    ref
  ) => {
    const [error, setError] = useState<string | null>(null);
    const generatedId = useId();
    const id = externalId ?? generatedId;

    // Track the live string value so mask dots always match character count.
    // For controlled mode props.value is authoritative; for uncontrolled we
    // keep a local copy updated on every keystroke.
    const [localValue, setLocalValue] = useState<string>(
      typeof props.defaultValue === "string" ? props.defaultValue : ""
    );
    const currentValue =
      props.value !== undefined ? String(props.value) : localValue;

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setLocalValue(e.target.value);

      if (validate) {
        const msg = validate(e.target.value);
        setError(msg);
        onValidationChange?.(!msg);
      }

      props.onChange?.(e);
    };

    const baseClass = cn(
      "flex min-h-[36px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors",
      "placeholder:text-muted-foreground",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "md:text-sm",
      error && "border-destructive focus-visible:ring-destructive"
    );

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label htmlFor={id} className="text-sm font-medium">
            {label}
          </label>
        )}

        <div className="relative">
          <textarea
            ref={ref}
            id={id}
            className={cn(
              baseClass,
              // Keep caret visible by only hiding color; caret-color stays explicit.
              hidden && "text-transparent [caret-color:hsl(var(--foreground))]",
              className
            )}
            onChange={handleChange}
            // Suppress the placeholder while masked so dots aren't fighting it.
            placeholder={hidden ? undefined : props.placeholder}
            {...props}
          />

          {/* Dot overlay — only rendered when masked and there is actual content */}
          {hidden && currentValue.length > 0 && (
            <div
              aria-hidden="true"
              className={cn(
                baseClass,
                // Sit exactly over the textarea text layer.
                "absolute inset-0 pointer-events-none",
                // Match textarea's own overflow so dots don't create a scrollbar.
                "overflow-hidden",
                // Dots wrap like real text.
                "whitespace-pre-wrap break-all",
                // Transparent bg so border + ring from textarea shows through.
                "bg-transparent border-transparent shadow-none ring-0"
              )}
            >
              {"•".repeat(currentValue.length)}
            </div>
          )}
        </div>

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

Textarea.displayName = "Textarea";
