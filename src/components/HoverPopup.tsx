import { useState, useRef, useEffect, useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HoverPopupProps {
  text: string;
  children: ReactNode;
  className?: string;
  triggerClassName?: string;
}

export const HoverPopup = ({
  text,
  children,
  className,
  triggerClassName,
}: HoverPopupProps) => {
  const [visible, setVisible] = useState(false);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const popupId = useId();

  useEffect(() => () => clearTimeout(hideTimeout.current), []);

  const show = () => {
    clearTimeout(hideTimeout.current);
    setVisible(true);
  };

  const hide = () => {
    hideTimeout.current = setTimeout(() => setVisible(false), 120);
  };

  return (
    <div
      className={cn("vi-hover-popup-wrapper", className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <span
        className={cn("vi-hover-popup-main-text", triggerClassName)}
        tabIndex={0}
        aria-describedby={popupId}
      >
        {text}
      </span>

      <div
        id={popupId}
        role="tooltip"
        aria-hidden={!visible}
        className={cn(
          "vi-hover-popup-modal",
          visible && "vi-hover-popup-modal-visible"
        )}
      >
        {children}
      </div>
    </div>
  );
};
