import { useState, useRef, useEffect, useId, useMemo, type ChangeEvent, type KeyboardEvent } from "react";
import { Search, X } from "lucide-react";
import { cn, debounce } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  debounce?: number;
  shortcut?: string;
  showButton?: boolean;
  className?: string;
  onSearch?: (value: string) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}

export const SearchInput = ({
  value: controlledValue,
  defaultValue = "",
  placeholder = "Search...",
  disabled = false,
  loading = false,
  debounce: debounceMs = 300,
  shortcut,
  showButton = false,
  className,
  onSearch,
  onChange,
  onClear,
}: SearchInputProps) => {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = isControlled ? controlledValue : internalValue;

  const inputRef = useRef<HTMLInputElement>(null);
  const onSearchRef = useRef(onSearch);
  onSearchRef.current = onSearch;
  const id = useId();

  const debouncedSearch = useMemo(
    () => debounce((v: string) => onSearchRef.current?.(v), debounceMs),
    [debounceMs]
  );

  useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) setInternalValue(newValue);
    onChange?.(e);
    if (!showButton) debouncedSearch(newValue);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue("");
    debouncedSearch.cancel();
    onSearch?.("");
    onClear?.();
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape" && value) {
      e.preventDefault();
      handleClear();
    }
    if (e.key === "Enter" && showButton) {
      debouncedSearch.cancel();
      onSearch?.(value);
    }
  };

  const handleButtonClick = () => {
    debouncedSearch.cancel();
    onSearch?.(value);
  };

  const showClear = !loading && value.length > 0;
  const showShortcut = shortcut && !value && !loading;

  const inputEl = (
    <div
      className={cn(
        "vi-search-input",
        disabled && "vi-search-input--disabled",
        !showButton && className
      )}
    >
      {!showButton && <Search className="vi-search-input__search-icon" aria-hidden="true" />}

      <input
        ref={inputRef}
        id={id}
        type="search"
        autoComplete="off"
        spellCheck="false"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        className="vi-search-input__field"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        aria-label={placeholder}
      />

      {showShortcut && (
        <kbd className="vi-search-input__shortcut" aria-hidden="true">
          {shortcut}
        </kbd>
      )}

      {loading && (
        <span className="vi-search-input__spinner" aria-hidden="true" />
      )}

      {showClear && (
        <button
          type="button"
          className="vi-search-input__clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X aria-hidden="true" />
        </button>
      )}
    </div>
  );

  if (!showButton) return inputEl;

  return (
    <div className={cn("vi-search-input-group", className)}>
      {inputEl}
      <Button
        size="icon"
        onClick={handleButtonClick}
        disabled={disabled}
        aria-label="Search"
      >
        <Search aria-hidden="true" />
      </Button>
    </div>
  );
};
