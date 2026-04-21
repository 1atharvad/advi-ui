import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast, ToastProvider } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

interface ScrollAnimationBtnProps {
  btnText?: string;
  activatedText?: string;
  deactivatedText?: string;
  toastPosition?: "left" | "right";
  className?: string;
}

export const ScrollAnimationBtn = ({
  btnText = "● SCROLL ● ANIMATION ● MOTION",
  activatedText = "Scroll animation enabled",
  deactivatedText = "Scroll animation disabled",
  toastPosition = "right",
  className,
}: ScrollAnimationBtnProps) => {
  const [isPlaying, setIsPlaying] = useState(true);

  const handleToggle = () => {
    const next = !isPlaying;
    setIsPlaying(next);
    if (next) {
      toast.info(activatedText);
    } else {
      toast.default(deactivatedText);
    }
  };

  return (
    <ToastProvider position={toastPosition}>
      <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      <div className="toggle-motion-btn-wrapper">
        <Button
          variant="default"
          size="icon"
          onClick={handleToggle}
          title="Start/Stop scroll animation"
          aria-label="Start/Stop scroll animation"
          className="toggle-motion-btn"
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </Button>

        <svg className="circular-text">
          <path id="text-circle" fill="none" strokeWidth="0"
              d="M 71.5,36 A 35.5,35.5 0 1,1 0.5,36 A 35.5,35.5 0 1,1 71.5,36"></path>
          <text>
            <textPath href="#text-circle">{btnText}</textPath>
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 49 49"
              to="360 49 49"
              dur="60s"
              repeatCount="indefinite" />
          </text>
        </svg>
      </div>
      </div>
    </ToastProvider>
  );
};

const PauseIcon = () => (
  <svg className="motion-pause" viewBox="0 -960 960 960" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M360-360h80v-240h-80v240Zm160 0h80v-240h-80v240ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-43 9-84.5t26-80.5l62 62q-8 26-12.5 51.5T160-480q0 134 93 227t227 93q134 0 227-93t93-227q0-134-93-227t-227-93q-27 0-52.5 4.5T377-783l-61-61q40-18 80-27t84-9q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80ZM220-680q-25 0-42.5-17.5T160-740q0-25 17.5-42.5T220-800q25 0 42.5 17.5T280-740q0 25-17.5 42.5T220-680Zm260 200Z" />
  </svg>
);

const PlayIcon = () => (
  <svg className="motion-play" viewBox="0 -960 960 960" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="m400-320 240-160-240-160v320Zm80 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-43 9-84.5t26-80.5l62 62q-8 26-12.5 51.5T160-480q0 134 93 227t227 93q134 0 227-93t93-227q0-134-93-227t-227-93q-27 0-52.5 4.5T377-783l-61-61q40-18 80-27t84-9q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80ZM220-680q-25 0-42.5-17.5T160-740q0-25 17.5-42.5T220-800q25 0 42.5 17.5T280-740q0 25-17.5 42.5T220-680Zm260 200Z" />
  </svg>
);
