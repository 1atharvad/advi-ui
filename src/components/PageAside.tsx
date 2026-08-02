import React from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface AsideItem {
  icon?: React.ReactNode
  label: string
  onClick?: () => void
  active?: boolean
  type?: 'divider'
}

interface AsideBtnProps {
  icon?: React.ReactNode
  label: string
  onClick: () => void
  active?: boolean
  tooltip?: string
  className?: string
}

const AsideBtn = ({ icon, label, onClick, active, tooltip, className }: AsideBtnProps) => (
  <Button
    variant="ghost"
    size="sm"
    onClick={onClick}
    title={tooltip}
    className={cn('vi-aside-item', active && 'vi-aside-item--active', className)}
  >
    <span className="vi-aside-item-icon">{icon}</span>
    <span className="vi-aside-item-label">{label}</span>
  </Button>
)
AsideBtn.displayName = "AsideBtn"

interface AsideTextProps {
  label: string
  icon?: React.ReactNode
  active?: boolean
  tooltip?: string
  className?: string
  type?: 'divider'
  open?: boolean
}

const AsideText = ({ label, icon, active, tooltip, className, type, open }: AsideTextProps) => {
  if (type === 'divider' && open === false) {
    return <div className="vi-aside-item-divider-line" />
  }

  return (
    <div
      title={tooltip}
      className={cn('vi-aside-item vi-aside-item-text', type === 'divider' && 'vi-aside-item-text--divider', active && 'vi-aside-item--active', className)}
    >
      {icon && <span className="vi-aside-item-icon">{icon}</span>}
      <span className="vi-aside-item-label">{label}</span>
    </div>
  )
}
AsideText.displayName = "AsideText"

interface PageAsideProps {
  items: AsideItem[]
  open?: boolean
  onToggle?: () => void
  title?: React.ReactNode
  footer?: (open: boolean) => React.ReactNode
  openWidth?: string
  className?: string
  toggleIcon?: (open: boolean) => React.ReactNode
}

const PageAside = ({
  items,
  open,
  onToggle,
  title,
  footer,
  openWidth = 'w-44',
  className,
  toggleIcon = (isOpen) => isOpen
    ? <ChevronLeft className="h-4 w-4" />
    : <ChevronRight className="h-4 w-4" />,
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
        {items.map((item, i) => {
          if (!isOpen && item.type === 'divider' && (i === 0 || i === items.length - 1)) return null
          return item.onClick ? (
            <AsideBtn
              key={i}
              icon={item.icon}
              label={item.label}
              onClick={item.onClick}
              active={item.active}
              tooltip={!isOpen ? item.label : undefined}
            />
          ) : (
            <AsideText
              key={i}
              icon={item.icon}
              label={item.label}
              active={item.active}
              type={item.type}
              open={isOpen}
              tooltip={!isOpen ? item.label : undefined}
            />
          )
        })}
      </nav>

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
            {toggleIcon(isOpen)}
          </Button>
        </div>
      )}
    </aside>
  )
}
PageAside.displayName = "PageAside"

export { PageAside, AsideBtn, AsideText }
