import React, { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface Link {
  url: string;
  text?: string;
  is_external_link?: boolean;
}

type LinkProps = {
  link: Link;
  className?: string;
  noBaseClass?: boolean;
  children?: ReactNode;
}

export const Link = ({ link, className, noBaseClass=false, children }: LinkProps) => (
  <>
    {link.is_external_link ? (
      <a href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={!noBaseClass ? cn("vi-link", className) : className}
          title={link.text}>
        {children ?? link.text}
      </a>
    ) : (
      <a href={link.url}
          className={!noBaseClass ? cn("vi-link", className) : className}
          title={link.text}>
        {children ?? link.text}
      </a>
    )}
  </>
);
