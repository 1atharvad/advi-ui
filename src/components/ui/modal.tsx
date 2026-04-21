import { useEffect, useRef, useCallback, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: ReactNode;
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
  duration?: number;
}

const getCSSVar = (el: HTMLElement, prop: string): [number, number] => {
  const val = getComputedStyle(el).getPropertyValue(prop).trim();
  const [a, b] = val.split(",").map((v) => parseFloat(v.trim()));
  return [isNaN(a) ? 0 : a, isNaN(b) ? 1 : b];
};

export const Modal = ({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footer,
  className,
  duration = 1,
}: ModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const createTimeline = useCallback(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) return null;

    const [opFrom, opTo] = getCSSVar(content, "--modal-opacity");
    const [scFrom, scTo] = getCSSVar(content, "--modal-scale");
    const [xFrom, xTo] = getCSSVar(content, "--modal-translate-x");
    const [yFrom, yTo] = getCSSVar(content, "--modal-translate-y");

    const tl = gsap.timeline({ paused: true, ease: "power1.out" });
    tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration }, 0);
    tl.fromTo(
      content,
      { autoAlpha: opFrom, scale: scFrom, xPercent: xFrom, yPercent: yFrom },
      { autoAlpha: opTo, scale: scTo, xPercent: xTo, yPercent: yTo, duration },
      0
    );
    return tl;
  }, [duration]);

  useEffect(() => {
    tlRef.current = createTimeline();
  }, [createTimeline]);

  useEffect(() => {
    if (!tlRef.current) return;
    if (open) {
      tlRef.current.play();
    } else {
      tlRef.current.reverse();
    }
  }, [open]);

  return (
    <>
      {trigger && (
        <span style={{ display: "contents" }} onClick={() => onOpenChange(true)}>
          {trigger}
        </span>
      )}
      {createPortal(
        <>
          <div
            ref={overlayRef}
            className="vi-modal-overlay"
            aria-hidden="true"
            onClick={() => onOpenChange(false)}
          />
          <div
            ref={contentRef}
            role="dialog"
            aria-modal="true"
            aria-hidden={!open}
            className={cn(className)}
          >
            <button
              className="vi-modal-close"
              onClick={() => onOpenChange(false)}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>

            {(title || description) && (
              <div className="vi-modal-header">
                {title && <h2 className="vi-modal-title">{title}</h2>}
                {description && <p className="vi-modal-description">{description}</p>}
              </div>
            )}

            <div className="vi-modal-body">{children}</div>

            {footer && <div className="vi-modal-footer">{footer}</div>}
          </div>
        </>,
        document.body
      )}
    </>
  );
};
