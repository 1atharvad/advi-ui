import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export type YearDotNavScrollAlign = 'top' | 'center' | 'bottom'

export interface YearDotNavItem {
  year: number
  months?: number[]
}

export interface YearDotNavProps {
  items: YearDotNavItem[]
  scrollAlign?: YearDotNavScrollAlign
  className?: string
}

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const YearDotNav = ({ items, scrollAlign = 'center', className }: YearDotNavProps) => {
  const [activeYear, setActiveYear] = useState<number | null>(items[0]?.year ?? null)
  const [activeMonth, setActiveMonth] = useState<number | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const observersRef = useRef<IntersectionObserver[]>([])
  const isProgrammaticScrollRef = useRef(false)
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    observersRef.current.forEach(obs => obs.disconnect())
    observersRef.current = []

    items.forEach(({ year, months }) => {
      const yearEl = document.getElementById(`year-${year}`)
      if (yearEl) {
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !isProgrammaticScrollRef.current) {
              setActiveYear(year)
              setActiveMonth(null)
            }
          },
          { threshold: 0, rootMargin: '-30% 0px -60% 0px' }
        )
        obs.observe(yearEl)
        observersRef.current.push(obs)
      }

      months?.forEach(month => {
        const monthEl = document.getElementById(`year-${year}-month-${month}`)
        if (!monthEl) return
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !isProgrammaticScrollRef.current) {
              setActiveYear(year)
              setActiveMonth(month)
            }
          },
          { threshold: 0, rootMargin: '-30% 0px -60% 0px' }
        )
        obs.observe(monthEl)
        observersRef.current.push(obs)
      })
    })

    return () => observersRef.current.forEach(obs => obs.disconnect())
  }, [items])

  const scrollToElement = (el: HTMLElement) => {
    isProgrammaticScrollRef.current = true
    const top = el.getBoundingClientRect().top + window.scrollY
    const offsets = {
      top:    0,
      center: -window.innerHeight / 2 + el.offsetHeight / 2,
      bottom: -window.innerHeight + el.offsetHeight,
    }
    window.scrollTo({ top: top + offsets[scrollAlign], behavior: 'smooth' })

    if ('onscrollend' in (window as unknown as Record<string, unknown>)) {
      window.addEventListener('scrollend', () => {
        isProgrammaticScrollRef.current = false
      }, { once: true })
    } else {
      const onScroll = () => {
        if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current)
        scrollEndTimerRef.current = setTimeout(() => {
          isProgrammaticScrollRef.current = false
          window.removeEventListener('scroll', onScroll)
        }, 150)
      }
      window.addEventListener('scroll', onScroll, { passive: true })
    }
  }

  const scrollToYear = (year: number) => {
    const el = document.getElementById(`year-${year}`)
    if (!el) return
    setActiveYear(year)
    setActiveMonth(null)
    scrollToElement(el)
  }

  const scrollToMonth = (year: number, month: number) => {
    const el = document.getElementById(`year-${year}-month-${month}`)
    if (!el) return
    setActiveYear(year)
    setActiveMonth(month)
    scrollToElement(el)
  }

  if (items.length === 0) return null

  return (
    <div className={cn('vi-year-dot-nav', className)}>
      {items.map(({ year, months }) => (
        <div key={year} className="vi-year-dot-nav-group">
          <div className="vi-year-dot-nav-item">
            <span className={cn('vi-year-dot-nav-label', hoveredId === `year-${year}` && 'vi-year-dot-nav-label--visible')}>
              {year}
            </span>
            <button
              className="vi-year-dot-nav-btn"
              onClick={() => scrollToYear(year)}
              onMouseEnter={() => setHoveredId(`year-${year}`)}
              onMouseLeave={() => setHoveredId(null)}
              aria-label={`Scroll to ${year}`}
            >
              <div className={cn('vi-year-dot-nav-dot', activeYear === year && 'vi-year-dot-nav-dot--active')} />
            </button>
          </div>

          {months && activeYear === year && (
            <div className="vi-year-dot-nav-months">
              {months.map(month => (
                <div key={month} className="vi-year-dot-nav-item">
                  <span className={cn('vi-year-dot-nav-label', hoveredId === `year-${year}-month-${month}` && 'vi-year-dot-nav-label--visible')}>
                    {MONTH_LABELS[month - 1]}
                  </span>
                  <button
                    className="vi-year-dot-nav-btn vi-year-dot-nav-btn--month"
                    onClick={() => scrollToMonth(year, month)}
                    onMouseEnter={() => setHoveredId(`year-${year}-month-${month}`)}
                    onMouseLeave={() => setHoveredId(null)}
                    aria-label={`Scroll to ${MONTH_LABELS[month - 1]} ${year}`}
                  >
                    <div className={cn('vi-year-dot-nav-dot vi-year-dot-nav-dot--month', activeMonth === month && 'vi-year-dot-nav-dot--active')} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

YearDotNav.displayName = 'YearDotNav'

export { YearDotNav }
