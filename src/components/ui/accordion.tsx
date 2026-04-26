import * as RadixAccordion from "@radix-ui/react-accordion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  value: string;
  title: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  className?: string;
}

export const Accordion = ({
  items,
  multiple = false,
  defaultValue,
  value,
  onChange,
  className,
}: AccordionProps) => {
  const sharedProps = {
    className: cn("vi-accordion-container", className),
  };

  if (multiple) {
    return (
      <RadixAccordion.Root
        {...sharedProps}
        type="multiple"
        defaultValue={defaultValue as string[] | undefined}
        value={value as string[] | undefined}
        onValueChange={onChange as ((v: string[]) => void) | undefined}
      >
        {items.map((item) => (
          <AccordionItemEl key={item.value} item={item} />
        ))}
      </RadixAccordion.Root>
    );
  }

  return (
    <RadixAccordion.Root
      {...sharedProps}
      type="single"
      collapsible
      defaultValue={defaultValue as string | undefined}
      value={value as string | undefined}
      onValueChange={onChange as ((v: string) => void) | undefined}
    >
      {items.map((item) => (
        <AccordionItemEl key={item.value} item={item} />
      ))}
    </RadixAccordion.Root>
  );
};

const AccordionItemEl = ({ item }: { item: AccordionItem }) => (
  <RadixAccordion.Item value={item.value} disabled={item.disabled} className="vi-accordion-item">
    <RadixAccordion.Header>
      <RadixAccordion.Trigger className="vi-accordion-trigger">
        <span>{item.title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
    <RadixAccordion.Content className="vi-accordion-content-wrapper">
      <div className="vi-accordion-content">{item.content}</div>
    </RadixAccordion.Content>
  </RadixAccordion.Item>
);

Accordion.displayName = "Accordion";
