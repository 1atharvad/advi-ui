import { useState, useRef, useEffect, useId, cloneElement, type ChangeEvent, type KeyboardEvent, type ReactNode, type ReactElement } from "react";
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
  searchIcon?: ReactElement<{ className?: string }>;
  clearIcon?: ReactNode;
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
  searchIcon = <Search aria-hidden="true" />,
  clearIcon = <X aria-hidden="true" />,
}: SearchInputProps) => {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = isControlled ? controlledValue : internalValue;

  const inputRef = useRef<HTMLInputElement>(null);
  const onSearchRef = useRef(onSearch);
  useEffect(() => {
    onSearchRef.current = onSearch;
  });
  const id = useId();

  const debouncedSearchRef = useRef<(((v: string) => void) & { cancel: () => void }) | null>(null);

  useEffect(() => {
    const debounced = debounce((v: string) => onSearchRef.current?.(v), debounceMs);
    debouncedSearchRef.current = debounced;
    return () => debounced.cancel();
  }, [debounceMs]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) setInternalValue(newValue);
    onChange?.(e);
    if (!showButton) debouncedSearchRef.current?.(newValue);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue("");
    debouncedSearchRef.current?.cancel();
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
      debouncedSearchRef.current?.cancel();
      onSearch?.(value);
    }
  };

  const handleButtonClick = () => {
    debouncedSearchRef.current?.cancel();
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
      {!showButton && cloneElement(searchIcon, {
        className: cn("vi-search-input__search-icon", searchIcon.props.className),
      })}

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
          {clearIcon}
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
        {searchIcon}
      </Button>
    </div>
  );
};
