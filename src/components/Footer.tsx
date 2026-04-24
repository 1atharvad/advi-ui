import { LogoLink, Link } from "@/components/ui/link";
import type { Link as LinkType, LogoLinkProps } from "@/components/ui/link";
import { cn } from "@/lib/utils";

export interface FooterLinkGroup {
  title?: string;
  links: LinkType[];
}

interface FooterProps {
  logo?: Omit<LogoLinkProps, "className">;
  linkGroups?: FooterLinkGroup[];
  copyright?: string;
  className?: string;
}

export const Footer = ({ logo, linkGroups = [], copyright, className }: FooterProps) => {
  const hasTop = logo || linkGroups.length > 0;

  return (
    <footer className={cn("vi-footer", className)}>
      <div className="vi-footer-inner">
        {hasTop && (
          <div className="vi-footer-top">
            {logo && (
              <div className="vi-footer-logo">
                <LogoLink {...logo} />
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

        {hasTop && copyright && <hr className="vi-footer-divider" />}

        {copyright && (
          <div className="vi-footer-bottom">
            <p className="vi-footer-copyright">{copyright}</p>
          </div>
        )}
      </div>
    </footer>
  );
};
