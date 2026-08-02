import { forwardRef, useState, useRef, useEffect, useId, useMemo, cloneElement, type KeyboardEvent, type MouseEvent as ReactMouseEvent, type ReactElement } from "react";
import { ChevronDown, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { buttonVariants } from "./button-variants";
import { Loading } from "./loading";

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
  searchable?: boolean;
  loading?: boolean;
  clearable?: boolean;
  clearIcon?: ReactElement<{ className?: string }>;
  chevronIcon?: ReactElement<{ className?: string }>;
  checkIcon?: ReactElement<{ className?: string }>;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = "Select...",
      label,
      description,
      disabled,
      className,
      name,
      searchable = false,
      loading = false,
      clearable = false,
      clearIcon = <X />,
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

    const selected = options.find((o) => o.value === value);

    const filteredOptions = useMemo(() => {
      if (!searchable || !query.trim()) return options;
      const q = query.trim().toLowerCase();
      return options.filter((o) => o.label.toLowerCase().includes(q));
    }, [options, searchable, query]);

    useEffect(() => {
      if (!open) return;
      const handler = (e: globalThis.MouseEvent) => {
        if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    useEffect(() => {
      if (open) {
        if (searchable) {
          setQuery("");
          searchRef.current?.focus();
        }
        const idx = options.findIndex((o) => o.value === value);
        setActiveIndex(idx >= 0 ? idx : 0);
      }
    }, [open, options, value, searchable]);

    useEffect(() => {
      setActiveIndex(0);
    }, [query]);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      switch (e.key) {
        case "Enter":
          e.preventDefault();
          if (!open) { setOpen(true); return; }
          if (!filteredOptions[activeIndex]?.disabled && filteredOptions[activeIndex]) {
            onChange?.(filteredOptions[activeIndex].value);
            setOpen(false);
          }
          break;
        case " ":
          if (searchable && open) break;
          e.preventDefault();
          if (!open) { setOpen(true); return; }
          if (!filteredOptions[activeIndex]?.disabled && filteredOptions[activeIndex]) {
            onChange?.(filteredOptions[activeIndex].value);
            setOpen(false);
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (!open) { setOpen(true); return; }
          setActiveIndex((i) => {
            let next = i + 1;
            while (next < filteredOptions.length && filteredOptions[next].disabled) next++;
            return next < filteredOptions.length ? next : i;
          });
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((i) => {
            let prev = i - 1;
            while (prev >= 0 && filteredOptions[prev].disabled) prev--;
            return prev >= 0 ? prev : i;
          });
          break;
        case "Escape":
        case "Tab":
          setOpen(false);
          break;
      }
    };

    const handleClear = (e: ReactMouseEvent) => {
      e.stopPropagation();
      onChange?.("");
    };

    return (
      <div className={cn("vi-select-container", className)} ref={containerRef}>
        {label && (
          <label htmlFor={id} className="vi-select-label">
            {label}
          </label>
        )}
        <div className="vi-select-wrapper">
          <div
            ref={ref}
            id={id}
            role="combobox"
            tabIndex={disabled ? -1 : 0}
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-controls={open ? listboxId : undefined}
            aria-activedescendant={open && activeIndex >= 0 ? `${id}-opt-${activeIndex}` : undefined}
            aria-disabled={disabled || undefined}
            className={cn(buttonVariants({ variant: "ghost" }), "vi-select-trigger")}
            onClick={() => !disabled && setOpen((o) => !o)}
            onKeyDown={handleKeyDown}
          >
            <span className={cn(!selected && "vi-select-placeholder")}>
              {selected ? selected.label : placeholder}
            </span>
            {clearable && selected && !disabled && (
              <Button
                type="button"
                variant="ghost"
                aria-label="Clear selection"
                className="vi-select-clear h-auto w-auto p-0"
                onClick={handleClear}
              >
                {cloneElement(clearIcon, { className: cn("h-3.5 w-3.5", clearIcon.props.className) })}
              </Button>
            )}
            {cloneElement(chevronIcon, {
              className: cn("vi-select-icon", open && "vi-select-icon-open", chevronIcon.props.className),
            })}
          </div>

          {name && <input type="hidden" name={name} value={value ?? ""} />}

          {open && (
            <div className="vi-select-dropdown">
              {searchable && !loading && (
                <input
                  ref={searchRef}
                  type="text"
                  className="vi-select-search"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              )}

              {loading ? (
                <Loading text="Loading..." className="vi-select-loading" />
              ) : (
                <ul id={listboxId} role="listbox" aria-label={label} className="vi-select-listbox">
                  {filteredOptions.length === 0 && (
                    <li className="vi-select-empty">No options found</li>
                  )}
                  {filteredOptions.map((opt, i) => (
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
                      {cloneElement(checkIcon, { className: cn("vi-select-check", checkIcon.props.className) })}
                      {opt.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        {description && <p className="vi-select-description">{description}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
