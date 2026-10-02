'use client'

import { useState } from 'react'
import { Contrast, Menu, Sparkles, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '#events', label: 'Events' },
  { href: '#register', label: 'Register' },
  { href: '#contact', label: 'Contact' },
]

export function SiteHeader() {
  const [highContrast, setHighContrast] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  function toggleContrast() {
    const next = !highContrast
    setHighContrast(next)
    document.documentElement.classList.toggle('hc', next)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:font-semibold focus:text-primary-foreground"
      >
        Skip to main content
      </a>

      <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <a href="#" className="flex flex-1 basis-0 items-center gap-2" aria-label="CampusHub Events home">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="size-5" aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold tracking-tight">CampusHub</span>
            <span className="text-xs font-medium text-muted-foreground">Event Portal</span>
          </span>
        </a>

        <ul className="hidden shrink-0 items-center justify-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-1 basis-0 items-center justify-end gap-2">
          <button
            type="button"
            onClick={toggleContrast}
            aria-pressed={highContrast}
            aria-label={highContrast ? 'Turn off high contrast mode' : 'Turn on high contrast mode'}
            className="inline-flex h-10 min-w-10 shrink-0 items-center justify-center gap-2 rounded-full border-2 border-foreground px-3 text-sm font-semibold whitespace-nowrap transition-colors hover:bg-foreground hover:text-background sm:w-[150px]"
          >
            <Contrast className="size-4 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">{highContrast ? 'Standard' : 'High contrast'}</span>
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex size-10 items-center justify-center rounded-full border-2 border-border md:hidden"
          >
            {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <ul id="mobile-nav" className="flex flex-col gap-1 border-t border-border px-4 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2 font-semibold hover:bg-accent hover:text-accent-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
