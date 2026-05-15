import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export type YearDotNavScrollAlign = 'top' | 'center' | 'bottom'

export interface YearDotNavProps {
  years: number[]
  scrollAlign?: YearDotNavScrollAlign
  className?: string
}

const YearDotNav = ({ years, scrollAlign = 'center', className }: YearDotNavProps) => {
  const [activeYear, setActiveYear] = useState<number | null>(years[0] ?? null)
  const [hoveredYear, setHoveredYear] = useState<number | null>(null)
  const observersRef = useRef<IntersectionObserver[]>([])
  const isProgrammaticScrollRef = useRef(false)
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    observersRef.current.forEach(obs => obs.disconnect())
    observersRef.current = []

    years.forEach(year => {
      const el = document.getElementById(`year-${year}`)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isProgrammaticScrollRef.current) setActiveYear(year)
        },
        { threshold: 0, rootMargin: '-30% 0px -60% 0px' }
      )

      obs.observe(el)
      observersRef.current.push(obs)
    })

    return () => observersRef.current.forEach(obs => obs.disconnect())
  }, [years])

  const scrollToYear = (year: number) => {
    const el = document.getElementById(`year-${year}`)
    if (!el) return

    isProgrammaticScrollRef.current = true
    setActiveYear(year)

    const top = el.getBoundingClientRect().top + window.scrollY
    const offsets = {
      top:    0,
      center: -window.innerHeight / 2 + el.offsetHeight / 2,
      bottom: -window.innerHeight + el.offsetHeight,
    }
    window.scrollTo({ top: top + offsets[scrollAlign], behavior: 'smooth' })

    // scrollend is the clean signal; fall back to debounced scroll for Safari
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

  if (years.length === 0) return null

  return (
    <div className={cn('vi-year-dot-nav', className)}>
      {years.map(year => (
        <div key={year} className="vi-year-dot-nav-item">
          <span className={cn('vi-year-dot-nav-label', hoveredYear === year && 'vi-year-dot-nav-label--visible')}>
            {year}
          </span>
          <button
            className="vi-year-dot-nav-btn"
            onClick={() => scrollToYear(year)}
            onMouseEnter={() => setHoveredYear(year)}
            onMouseLeave={() => setHoveredYear(null)}
            aria-label={`Scroll to ${year}`}
          >
            <div className={cn('vi-year-dot-nav-dot', activeYear === year && 'vi-year-dot-nav-dot--active')} />
          </button>
        </div>
      ))}
    </div>
  )
}

YearDotNav.displayName = 'YearDotNav'

export { YearDotNav }
