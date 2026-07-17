import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface MenuItem {
  value: string;
  label: string;
  icon?: ReactNode;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
  onSelect?: () => void;
}

export type MenuEntry =
  | ({ type?: "item" } & MenuItem)
  | { type: "separator"; value: string }
  | { type: "label"; value: string; label: string };

interface MenuProps {
  items: MenuEntry[];
  trigger: ReactElement;
  align?: "start" | "end";
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
}

const isSelectable = (entry: MenuEntry): entry is { type?: "item" } & MenuItem =>
  (entry.type ?? "item") === "item" && !(entry as MenuItem).disabled;

export const Menu = forwardRef<HTMLElement, MenuProps>(
  ({ items, trigger, align = "start", disabled, className, contentClassName }, forwardedRef) => {
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLElement>(null);
    const itemsRef = useRef(items);
    itemsRef.current = items;
    const id = useId();
    const menuId = `${id}-menu`;

    const setTriggerRef = (node: HTMLElement | null) => {
      triggerRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
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
      if (!open) {
        setActiveIndex(-1);
        return;
      }
      setActiveIndex(itemsRef.current.findIndex(isSelectable));
    }, [open]);

    useEffect(() => {
      if (disabled) setOpen(false);
    }, [disabled]);

    const close = (focusTrigger = true) => {
      setOpen(false);
      if (focusTrigger) triggerRef.current?.focus();
    };

    const selectEntry = (entry: MenuEntry) => {
      if (disabled || !isSelectable(entry)) return;
      entry.onSelect?.();
      close();
    };

    const moveActive = (direction: 1 | -1) => {
      setActiveIndex((current) => {
        let next = current;
        for (let step = 0; step < items.length; step++) {
          next = (next + direction + items.length) % items.length;
          if (isSelectable(items[next])) return next;
        }
        return current;
      });
    };

    const handleTriggerKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          if (!open) { setOpen(true); return; }
          if (activeIndex >= 0) selectEntry(items[activeIndex]);
          break;
        case "ArrowDown":
          e.preventDefault();
          if (!open) { setOpen(true); return; }
          moveActive(1);
          break;
        case "ArrowUp":
          e.preventDefault();
          if (!open) { setOpen(true); return; }
          moveActive(-1);
          break;
        case "Escape":
          if (open) close();
          break;
        case "Tab":
          if (open) close(false);
          break;
      }
    };

    return (
      <div className={cn("vi-menu-container", className)} ref={containerRef}>
        <Slot
          ref={setTriggerRef}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={open ? menuId : undefined}
          aria-activedescendant={open && activeIndex >= 0 ? `${id}-item-${activeIndex}` : undefined}
          aria-disabled={disabled || undefined}
          onClick={() => !disabled && setOpen((o) => !o)}
          onKeyDown={handleTriggerKeyDown}
        >
          {trigger}
        </Slot>

        {open && (
          <div
            id={menuId}
            role="menu"
            className={cn(
              "vi-menu-content",
              align === "end" && "vi-menu-content-align-end",
              contentClassName
            )}
          >
            {items.map((entry, i) => {
              if (entry.type === "separator") {
                return <div key={entry.value} role="separator" className="vi-menu-separator" />;
              }
              if (entry.type === "label") {
                return (
                  <div key={entry.value} className="vi-menu-label">
                    {entry.label}
                  </div>
                );
              }
              return (
                <div
                  key={entry.value}
                  id={`${id}-item-${i}`}
                  role="menuitem"
                  aria-disabled={entry.disabled}
                  className={cn(
                    "vi-menu-item",
                    entry.destructive && "vi-menu-item-destructive",
                    entry.disabled && "vi-menu-item-disabled",
                    i === activeIndex && "vi-menu-item-active"
                  )}
                  onMouseEnter={() => isSelectable(entry) && setActiveIndex(i)}
                  onClick={() => selectEntry(entry)}
                >
                  {entry.icon && <span className="vi-menu-item-icon">{entry.icon}</span>}
                  <span className="vi-menu-item-label">{entry.label}</span>
                  {entry.shortcut && (
                    <span className="vi-menu-item-shortcut">{entry.shortcut}</span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

Menu.displayName = "Menu";
