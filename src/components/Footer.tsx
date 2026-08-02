import type { ReactNode } from "react";
import { LogoLink, Link } from "@/components/ui/link";
import type { Link as LinkType, LogoLinkProps } from "@/components/ui/link";
import { cn } from "@/lib/utils";

export interface FooterLinkGroup {
  title?: string;
  links: LinkType[];
}

interface FooterProps {
  logo?: Omit<LogoLinkProps, "className">;
  tagline?: string;
  linkGroups?: FooterLinkGroup[];
  copyright?: string;
  credits?: ReactNode;
  creditsPosition?: "top" | "bottom";
  className?: string;
}

export const Footer = ({
  logo,
  tagline,
  linkGroups = [],
  copyright,
  credits,
  creditsPosition = "bottom",
  className,
}: FooterProps) => {
  const hasTop = logo || linkGroups.length > 0;
  const creditsOnTop = credits && creditsPosition === "top";
  const creditsOnBottom = credits && creditsPosition === "bottom";
  const hasBottom = copyright || creditsOnBottom;
  const hasDivider = hasTop && (hasBottom || creditsOnTop);

  return (
    <footer className={cn("vi-footer", className)}>
      <div className="vi-footer-inner">
        {hasTop && (
          <div className="vi-footer-top">
            {logo && (
              <div className="vi-footer-logo">
                <LogoLink {...logo} />
                {tagline && <p className="vi-footer-tagline">{tagline}</p>}
              </div>
            )}

            {linkGroups.length > 0 && (
              <nav className="vi-footer-nav" aria-label="Footer navigation">
                {linkGroups.map((group, i) => (
                  <div key={i} className="vi-footer-group">
                    {group.title && (
                      <p className="vi-footer-group-title">{group.title}</p>
                    )}
                    <ul className="vi-footer-links">
                      {group.links.map((link) => (
                        <li key={link.url}>
                          <Link
                            link={link}
                            noBaseClass
                            className="vi-footer-link"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            )}
          </div>
        )}

        {creditsOnTop && <div className="vi-footer-credits vi-footer-credits-top">{credits}</div>}

        {hasDivider && <hr className="vi-footer-divider" />}

        {hasBottom && (
          <div className="vi-footer-bottom">
            {copyright && <p className="vi-footer-copyright">{copyright}</p>}
            {creditsOnBottom && <div className="vi-footer-credits">{credits}</div>}
          </div>
        )}
      </div>
    </footer>
  );
};
