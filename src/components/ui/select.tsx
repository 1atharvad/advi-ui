import { forwardRef, useState, useRef, useEffect, useId, type KeyboardEvent } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ options, value, onChange, placeholder = "Select...", label, description, disabled, className, name }, ref) => {
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const id = useId();
    const listboxId = `${id}-listbox`;

    const selected = options.find((o) => o.value === value);

    useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    useEffect(() => {
      if (open) {
        const idx = options.findIndex((o) => o.value === value);
        setActiveIndex(idx >= 0 ? idx : 0);
      }
    }, [open, options, value]);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          if (!open) { setOpen(true); return; }
          if (!options[activeIndex]?.disabled) {
            onChange?.(options[activeIndex].value);
            setOpen(false);
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (!open) { setOpen(true); return; }
          setActiveIndex((i) => {
            let next = i + 1;
            while (next < options.length && options[next].disabled) next++;
            return next < options.length ? next : i;
          });
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((i) => {
            let prev = i - 1;
            while (prev >= 0 && options[prev].disabled) prev--;
            return prev >= 0 ? prev : i;
          });
          break;
        case "Escape":
        case "Tab":
          setOpen(false);
          break;
      }
    };

    return (
      <div className={cn("vi-select-root", className)} ref={containerRef}>
        {label && (
          <label htmlFor={id} className="vi-select-label">
            {label}
          </label>
        )}
        <div className="vi-select-wrapper">
          <Button
            ref={ref}
            id={id}
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-controls={open ? listboxId : undefined}
            aria-activedescendant={open && activeIndex >= 0 ? `${id}-opt-${activeIndex}` : undefined}
            disabled={disabled}
            variant="ghost"
            className="vi-select-trigger"
            onClick={() => setOpen((o) => !o)}
            onKeyDown={handleKeyDown}
          >
            <span className={cn(!selected && "vi-select-placeholder")}>
              {selected ? selected.label : placeholder}
            </span>
            <ChevronDown className={cn("vi-select-icon", open && "vi-select-icon-open")} />
          </Button>

          {name && <input type="hidden" name={name} value={value ?? ""} />}

          {open && (
            <ul
              id={listboxId}
              role="listbox"
              aria-label={label}
              className="vi-select-dropdown"
            >
              {options.map((opt, i) => (
                <li
                  key={opt.value}
                  id={`${id}-opt-${i}`}
                  role="option"
                  aria-selected={opt.value === value}
                  aria-disabled={opt.disabled}
                  className={cn(
                    "vi-select-option",
                    opt.value === value && "vi-select-option-selected",
                    opt.disabled && "vi-select-option-disabled",
                    i === activeIndex && "vi-select-option-active"
                  )}
                  onMouseEnter={() => !opt.disabled && setActiveIndex(i)}
                  onClick={() => {
                    if (opt.disabled) return;
                    onChange?.(opt.value);
                    setOpen(false);
                  }}
                >
                  <Check className="vi-select-check" />
                  {opt.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        {description && <p className="vi-select-description">{description}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
