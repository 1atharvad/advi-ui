import React, { isValidElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface Link {
  url: string;
  text?: string;
  isExternal?: boolean;
}

type LinkProps = {
  link: Link;
  className?: string;
  noBaseClass?: boolean;
  children?: ReactNode;
}

type ImageObj = { url: string; alt: string };
const isImageObj = (img: unknown): img is ImageObj =>
  typeof img === "object" && img !== null && "url" in img;

export type LogoLinkProps = {
  name: string;
  image: ImageObj | ReactNode;
  link: Link;
  className?: string;
}

export const Link = ({ link, className, noBaseClass=false, children }: LinkProps) => (
  <>
    {link.isExternal ? (
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

export const LogoLink = ({ name, image, link, className }: LogoLinkProps) => (
  <Link link={link} className={cn("vi-link-logo-wrapper", className)}>
    {isImageObj(image)
      ? <img src={image.url} alt={image.alt} className="vi-logo" />
      : isValidElement(image) ? image : null}
    <span className="vi-logo-text">{name}</span>
  </Link>
);
