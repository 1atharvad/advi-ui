import React from "react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

interface PageAsideProps {
  children?: React.ReactNode
  title?: React.ReactNode
  userName?: string
  onLogout?: () => void
}

const PageAsideNavItem = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <Button variant="ghost" className="w-full justify-start gap-2">
    <Icon className="h-4 w-4" />
    {label}
  </Button>
);
PageAsideNavItem.displayName = "PageAsideNavItem"

const PageAside = ({ children, title, userName, onLogout }: PageAsideProps) => {
  return (
    <aside className="vi-aside">
      <div>
        {title && (
          <div className="vi-aside-header">
            <span className="vi-aside-title">{title}</span>
          </div>
        )}
        <nav className="vi-aside-nav">
          {children}
        </nav>
      </div>
      <div>
        {userName && (
          <p className="vi-aside-username">{userName}</p>
        )}
        {onLogout && (
          <Button variant="outline" className="vi-aside-logout" onClick={onLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        )}
      </div>
    </aside>
  )
}
PageAside.displayName = "PageAside"

export { PageAside, PageAsideNavItem }
