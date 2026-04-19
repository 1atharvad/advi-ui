import { useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Lock } from "lucide-react";
import { Button } from "./button";
import { Link } from "./link";
import "@/styles/ui/header.scss";

export interface Header {
  logo_link: Link,
  nav_items: Link[],
  login_link: Link,
}

export const Header = ({content}: {content: Header}) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="vi-header">
      <div className="vi-header-desktop">
        <div className="vi-header-logo-wrapper">
          <Link link={content.logo_link} className="vi-header-logo-link group" noBaseClass>
            <div className="vi-header-logo-icon-wrapper group-hover:shadow-lg">
              <Lock className="vi-header-logo-icon" />
            </div>
            <span className="vi-header-logo-text">
              {content.logo_link.text}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        {content.nav_items && (
          <nav className="hidden md:flex items-center gap-1">
            {content.nav_items.map((navLink, index) => (
              <Link key={`nav-link-${index}`} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#BB3E00] dark:hover:text-[#F7AD45] hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                  link={navLink} noBaseClass />
            ))}
          </nav>
        )}

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          {/* <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-[#BB3E00] dark:hover:text-[#F7AD45]">
            Sign Up
          </Button> */}
          <Button asChild className="bg-gradient-to-r from-[#F7AD45] to-[#BB3E00] hover:from-[#F7AD45]/90 hover:to-[#BB3E00]/90 text-white shadow-lg shadow-orange-500/20 border-0">
            <Link link={content.login_link} noBaseClass />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu">
          {open ? (
            <X size={24} className="text-gray-700 dark:text-gray-300" />
          ) : (
            <Menu size={24} className="text-gray-700 dark:text-gray-300" />
          )}
        </button>
      </div>

      {/* Mobile Drawer Menu with Animation */}
      <div className={cn(
            "md:hidden border-t bg-white/95 dark:bg-gray-950/95 backdrop-blur-md overflow-hidden transition-all duration-300 ease-in-out",
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}>
        <nav className="flex flex-col px-6 py-4 gap-2">
          {content.nav_items && content.nav_items.map((navLink, index) => (
            <Link key={`nav-link-${index}`} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#BB3E00] dark:hover:text-[#F7AD45] hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                link={navLink} noBaseClass />
          ))}
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
            {/* <Button variant="outline" className="w-full">
              Sign Up
            </Button> */}
            <Button className="w-full bg-gradient-to-r from-[#F7AD45] to-[#BB3E00] hover:from-[#F7AD45]/90 hover:to-[#BB3E00]/90 text-white shadow-lg shadow-orange-500/20 border-0">
              <Link link={content.login_link} noBaseClass />
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}