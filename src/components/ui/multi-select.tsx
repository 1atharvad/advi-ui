import { forwardRef, useState, useRef, useEffect, useId, type KeyboardEvent, type MouseEvent } from "react";
import { ChevronDown, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import type { SelectOption } from "./select";

export type { SelectOption };

interface MultiSelectProps {
  options: SelectOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  maxCount?: number;
}

export const MultiSelect = forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      value = [],
      onChange,
      placeholder = "Select...",
      label,
      description,
      disabled,
      className,
      maxCount = 3,
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const id = useId();
    const listboxId = `${id}-listbox`;

    const toggle = (optValue: string) => {
      const next = value.includes(optValue)
        ? value.filter((v) => v !== optValue)
        : [...value, optValue];
      onChange?.(next);
    };

    const remove = (optValue: string, e: MouseEvent) => {
      e.stopPropagation();
      onChange?.(value.filter((v) => v !== optValue));
    };

    useEffect(() => {
      if (!open) return;
      const handler = (e: globalThis.MouseEvent) => {
        if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          if (!open) { setOpen(true); return; }
          if (!options[activeIndex]?.disabled) toggle(options[activeIndex].value);
          break;
        case "ArrowDown":
          e.preventDefault();
          if (!open) { setOpen(true); return; }
          setActiveIndex((i) => Math.min(i + 1, options.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((i) => Math.max(i - 1, 0));
          break;
        case "Escape":
        case "Tab":
          setOpen(false);
          break;
      }
    };

    const visible = value.slice(0, maxCount);
    const overflow = value.length - maxCount;

    return (
      <div className="vi-multi-select-root" ref={containerRef}>
        {label && (
          <label htmlFor={id} className="vi-multi-select-label">
            {label}
          </label>
        )}
        <div className="vi-multi-select-wrapper">
          <Button
            ref={ref}
            id={id}
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-controls={open ? listboxId : undefined}
            aria-multiselectable="true"
            disabled={disabled}
            variant="ghost"
            className={cn("vi-multi-select-trigger", className)}
            onClick={() => setOpen((o) => !o)}
            onKeyDown={handleKeyDown}
          >
            <span className="vi-multi-select-chips">
              {value.length === 0 ? (
                <span className="vi-multi-select-placeholder">{placeholder}</span>
              ) : (
                <>
                  {visible.map((val) => {
                    const lbl = options.find((o) => o.value === val)?.label ?? val;
                    return (
                      <span key={val} className="vi-multi-select-chip">
                        {lbl}
                        <Button
                          type="button"
                          variant="ghost"
                          aria-label={`Remove ${lbl}`}
                          className="vi-multi-select-chip-remove h-auto w-auto p-0"
                          onClick={(e) => remove(val, e)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </span>
                    );
                  })}
                  {overflow > 0 && (
                    <span className="vi-multi-select-overflow">+{overflow}</span>
                  )}
                </>
              )}
            </span>
            <ChevronDown className={cn("vi-multi-select-icon", open && "vi-multi-select-icon-open")} />
          </Button>

          {open && (
            <ul
              id={listboxId}
              role="listbox"
              aria-multiselectable="true"
              aria-label={label}
              className="vi-multi-select-dropdown"
            >
              {options.map((opt, i) => {
                const isSelected = value.includes(opt.value);
                return (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={opt.disabled}
                    className={cn(
                      "vi-multi-select-option",
                      isSelected && "vi-multi-select-option-selected",
                      opt.disabled && "vi-multi-select-option-disabled",
                      i === activeIndex && "vi-multi-select-option-active"
                    )}
                    onMouseEnter={() => !opt.disabled && setActiveIndex(i)}
                    onClick={() => {
                      if (opt.disabled) return;
                      toggle(opt.value);
                    }}
                  >
                    <span className={cn("vi-multi-select-checkbox", isSelected && "vi-multi-select-checkbox-checked")}>
                      {isSelected && <Check className="h-3 w-3" />}
                    </span>
                    {opt.label}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        {description && <p className="vi-multi-select-description">{description}</p>}
      </div>
    );
  }
);

MultiSelect.displayName = "MultiSelect";
