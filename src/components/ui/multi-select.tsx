import { forwardRef, useState, useRef, useEffect, useId, useMemo, cloneElement, type KeyboardEvent, type MouseEvent, type ReactElement } from "react";
import { ChevronDown, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { buttonVariants } from "./button-variants";
import { Loading } from "./loading";
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
  searchable?: boolean;
  loading?: boolean;
  removeIcon?: ReactElement<{ className?: string }>;
  chevronIcon?: ReactElement<{ className?: string }>;
  checkIcon?: ReactElement<{ className?: string }>;
}

export const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
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
      searchable = false,
      loading = false,
      removeIcon = <X />,
      chevronIcon = <ChevronDown />,
      checkIcon = <Check />,
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [query, setQuery] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const id = useId();
    const listboxId = `${id}-listbox`;

    const filteredOptions = useMemo(() => {
      if (!searchable || !query.trim()) return options;
      const q = query.trim().toLowerCase();
      return options.filter((o) => o.label.toLowerCase().includes(q));
    }, [options, searchable, query]);

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

    useEffect(() => {
      if (open && searchable) {
        setQuery("");
        searchRef.current?.focus();
      }
    }, [open, searchable]);

    useEffect(() => {
      setActiveIndex(0);
    }, [query]);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      switch (e.key) {
        case "Enter":
          e.preventDefault();
          if (!open) { setOpen(true); return; }
          if (filteredOptions[activeIndex] && !filteredOptions[activeIndex].disabled) {
            toggle(filteredOptions[activeIndex].value);
          }
          break;
        case " ":
          if (searchable && open) break;
          e.preventDefault();
          if (!open) { setOpen(true); return; }
          if (filteredOptions[activeIndex] && !filteredOptions[activeIndex].disabled) {
            toggle(filteredOptions[activeIndex].value);
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (!open) { setOpen(true); return; }
          setActiveIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
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
      <div className={cn("vi-multi-select-container", className)} ref={containerRef}>
        {label && (
          <label htmlFor={id} className="vi-multi-select-label">
            {label}
          </label>
        )}
        <div className="vi-multi-select-wrapper">
          <div
            ref={ref}
            id={id}
            role="combobox"
            tabIndex={disabled ? -1 : 0}
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-controls={open ? listboxId : undefined}
            aria-multiselectable="true"
            aria-disabled={disabled || undefined}
            className={cn(buttonVariants({ variant: "ghost" }), "vi-multi-select-trigger")}
            onClick={() => !disabled && setOpen((o) => !o)}
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
                          disabled={disabled}
                          aria-label={`Remove ${lbl}`}
                          className="vi-multi-select-chip-remove h-auto w-auto p-0"
                          onClick={(e) => remove(val, e)}
                        >
                          {cloneElement(removeIcon, { className: cn("h-3 w-3", removeIcon.props.className) })}
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
            {cloneElement(chevronIcon, {
              className: cn("vi-multi-select-icon", open && "vi-multi-select-icon-open", chevronIcon.props.className),
            })}
          </div>

          {open && (
            <div className="vi-multi-select-dropdown">
              {searchable && !loading && (
                <input
                  ref={searchRef}
                  type="text"
                  className="vi-multi-select-search"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              )}

              {loading ? (
                <Loading text="Loading..." className="vi-multi-select-loading" />
              ) : (
                <ul
                  id={listboxId}
                  role="listbox"
                  aria-multiselectable="true"
                  aria-label={label}
                  className="vi-multi-select-listbox"
                >
                  {filteredOptions.length === 0 && (
                    <li className="vi-multi-select-empty">No options found</li>
                  )}
                  {filteredOptions.map((opt, i) => {
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
                          {isSelected && cloneElement(checkIcon, { className: cn("h-3 w-3", checkIcon.props.className) })}
                        </span>
                        {opt.label}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </div>
        {description && <p className="vi-multi-select-description">{description}</p>}
      </div>
    );
  }
);

MultiSelect.displayName = "MultiSelect";
