import React from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface AsideItem {
  icon: React.ReactNode
  label: string
  onClick: () => void
  active?: boolean
}

interface AsideBtnProps {
  icon: React.ReactNode
  label: string
  onClick: () => void
  active?: boolean
  tooltip?: string
}

const AsideBtn = ({ icon, label, onClick, active, tooltip }: AsideBtnProps) => (
  <Button
    variant="ghost"
    size="sm"
    onClick={onClick}
    title={tooltip}
    className={cn('vi-aside-item', active && 'vi-aside-item--active')}
  >
    <span className="vi-aside-item-icon">{icon}</span>
    <span className="vi-aside-item-label">{label}</span>
  </Button>
)
AsideBtn.displayName = "AsideBtn"

interface PageAsideProps {
  items: AsideItem[]
  open?: boolean
  onToggle?: () => void
  title?: React.ReactNode
  footer?: (open: boolean) => React.ReactNode
  openWidth?: string
  className?: string
}

const PageAside = ({
  items,
  open,
  onToggle,
  title,
  footer,
  openWidth = 'w-44',
  className,
}: PageAsideProps) => {
  const toggleable = open !== undefined && onToggle !== undefined
  const isOpen = open !== undefined ? open : true

  return (
    <aside className={cn(
      'vi-aside',
      isOpen && cn('vi-aside--open', openWidth),
      className
    )}>
      {title && (
        <div className="vi-aside-header">
          <span className="vi-aside-title">{title}</span>
        </div>
      )}

      <nav className="vi-aside-nav">
        {items.map((item, i) => (
          <AsideBtn
            key={i}
            {...item}
            tooltip={!isOpen ? item.label : undefined}
          />
        ))}
      </nav>

      <div className="vi-aside-spacer" />

      {footer && (
        <div className="vi-aside-footer">
          {footer(isOpen)}
        </div>
      )}

      {toggleable && (
        <div className="vi-aside-toggle">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            title={isOpen ? 'Collapse' : 'Expand'}
            className="vi-aside-toggle-btn"
          >
            {isOpen
              ? <ChevronLeft className="h-4 w-4" />
              : <ChevronRight className="h-4 w-4" />
            }
          </Button>
        </div>
      )}
    </aside>
  )
}
PageAside.displayName = "PageAside"

export { PageAside, AsideBtn }
