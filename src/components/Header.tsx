import { useState, type ReactNode } from "react";
import { Menu, ChevronRight } from "lucide-react";
import { LogoLink, Link } from "@/components/ui/link";
import { Button } from "./ui/button";
import { Modal } from "@/components/ui/modal";

interface HeaderProps {
  logo: {
    name: string;
    image: { url: string; alt: string };
    link: Link;
  };
  ctaLinks?: Link[];
  modalRootSelector?: string;
  menuIcon?: ReactNode;
  linkIcon?: ReactNode;
}

export const Header = ({
  logo,
  ctaLinks = [],
  modalRootSelector,
  menuIcon = <Menu size={24} aria-hidden="true" />,
  linkIcon = <ChevronRight size={16} aria-hidden="true" />,
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="vi-header">
      <div className="vi-header-mobile">
        <LogoLink name={logo.name} image={logo.image} link={logo.link} />
        {ctaLinks.length > 0 && (
          <Modal
            open={isMenuOpen}
            onOpenChange={setIsMenuOpen}
            title={logo.name}
            className="vi-modal-slide-right z-[1001]"
            modalRootSelector={modalRootSelector}
            trigger={
              <Button variant="ghost" title="Menu Button" aria-label="Open menu">
                {menuIcon}
              </Button>
            }
          >
            <div className="flex flex-col gap-3">
              {ctaLinks.map((link) => (
                <Link
                  key={link.url}
                  link={link}
                  noBaseClass
                  className="flex items-center justify-between text-sm font-medium hover:underline"
                >
                  <span>{link.text}</span>
                  {linkIcon}
                </Link>
              ))}
            </div>
          </Modal>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex items-center justify-between px-8 py-4">
        <LogoLink {...logo} />
        {ctaLinks.length > 0 && (
          <nav className="flex items-center gap-6">
            {ctaLinks.map((link) => (
              <Link
                key={link.url}
                link={link}
                noBaseClass
                className="text-sm font-medium hover:underline"
              />
            ))}
          </nav>
        )}
      </div>

    </header>
  );
};
