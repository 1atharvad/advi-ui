import { useState, useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface TabItem {
  value: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const Tabs = ({ tabs, value, defaultValue, onChange, className }: TabsProps) => {
  const id = useId();
  const isControlled = value !== undefined;
  const [localValue, setLocalValue] = useState<string>(
    defaultValue ?? tabs[0]?.value ?? ""
  );
  const currentValue = isControlled ? value : localValue;

  const handleSelect = (tabValue: string) => {
    if (!isControlled) setLocalValue(tabValue);
    onChange?.(tabValue);
  };

  return (
    <div className={cn("vi-tabs-root", className)}>
      <div role="tablist" className="vi-tabs-list">
        {tabs.map((tab) => (
          <Button
            key={tab.value}
            role="tab"
            variant="ghost"
            id={`${id}-tab-${tab.value}`}
            aria-controls={`${id}-panel-${tab.value}`}
            aria-selected={tab.value === currentValue}
            disabled={tab.disabled}
            className={cn(
              "vi-tabs-trigger",
              tab.value === currentValue && "vi-tabs-trigger-active"
            )}
            onClick={() => handleSelect(tab.value)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.value}
          id={`${id}-panel-${tab.value}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${tab.value}`}
          hidden={tab.value !== currentValue}
          className="vi-tabs-content"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};

Tabs.displayName = "Tabs";
