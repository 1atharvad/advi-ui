import React, { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export const Loading = ({ text="Loading...", className, ...props }: LoadingProps) => (
  <div className={cn(
      "flex flex-row items-center justify-center gap-3 p-4 text-muted-foreground",
      className)} {...props}>
    <svg className="h-6 w-6 animate-spin text-muted-foreground"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true">
      <circle className="opacity-25"
          cx="12" cy="12" r="10"
          stroke="currentColor"
          strokeWidth="4" />
      <path className="opacity-75"
          fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
    </svg>

    <p className="text-sm text-muted-foreground">{text}</p>
  </div>
);

Loading.displayName = "Loading";
