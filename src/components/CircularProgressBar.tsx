import { forwardRef, useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface CircularProgressBarProps {
  percentage: number;
  children?: ReactNode;
  label?: string;
  size?: number;
  strokeWidth?: number;
  animate?: boolean;
  className?: string;
}

export const CircularProgressBar = forwardRef<HTMLDivElement, CircularProgressBarProps>(
  (
    {
      percentage,
      children,
      label,
      size = 120,
      strokeWidth = 8,
      animate = true,
      className,
    },
    ref
  ) => {
    const clampedPct = Math.min(100, Math.max(0, percentage));
    const cx = size / 2;
    const radius = cx - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const targetOffset = circumference * (1 - clampedPct / 100);
    const progressRef = useRef<SVGCircleElement>(null);

    useEffect(() => {
      const el = progressRef.current;
      if (!el) return;
      if (!animate) {
        gsap.set(el, { strokeDashoffset: targetOffset });
        return;
      }
      gsap.fromTo(
        el,
        { strokeDashoffset: circumference },
        { strokeDashoffset: targetOffset, duration: 1.8, ease: "power2.out" }
      );
    }, [animate, circumference, targetOffset]);

    return (
      <div ref={ref} className={cn("vi-circular-progress", className)}>
        <div className="vi-circular-progress-arc" style={{ width: size, height: size }}>
          <svg
            width={size}
            height={size}
            aria-hidden="true"
            className="vi-circular-progress-svg"
          >
            <circle
              cx={cx}
              cy={cx}
              r={radius}
              fill="none"
              strokeWidth={strokeWidth}
              className="vi-circular-progress-track"
            />
            <circle
              ref={progressRef}
              cx={cx}
              cy={cx}
              r={radius}
              fill="none"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={animate ? circumference : targetOffset}
              transform={`rotate(-90 ${cx} ${cx})`}
              className="vi-circular-progress-fill"
            />
          </svg>

          <div className="vi-circular-progress-center">
            {children ?? (
              <span className="vi-circular-progress-pct">{clampedPct}%</span>
            )}
          </div>
        </div>

        {label && <p className="vi-circular-progress-label">{label}</p>}
      </div>
    );
  }
);

CircularProgressBar.displayName = "CircularProgressBar";
