import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  description?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

export const FormField = ({
  label,
  htmlFor,
  description,
  error,
  required,
  className,
  children,
}: FormFieldProps) => {
  const generatedId = useId();
  const fieldId = htmlFor ?? generatedId;

  return (
    <div className={cn("vi-form-field", className)}>
      {label && (
        <label htmlFor={fieldId} className="vi-form-field-label">
          {label}
          {required && (
            <span className="vi-form-field-required" aria-hidden="true">
              {" "}*
            </span>
          )}
        </label>
      )}
      {children}
      {!error && description && (
        <p className="vi-form-field-description">{description}</p>
      )}
      {error && (
        <p className="vi-form-field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

FormField.displayName = "FormField";
