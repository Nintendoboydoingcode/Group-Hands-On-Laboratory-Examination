'use client'

import { useState } from 'react'
import { CATEGORIES, EVENTS, type EventCategory } from '@/lib/events'
import { EventCard } from './event-card'

type EventCatalogProps = {
  onRegister: (eventId: string) => void
}

export function EventCatalog({ onRegister }: EventCatalogProps) {
  const [category, setCategory] = useState<EventCategory | 'All'>('All')
  const visible = category === 'All' ? EVENTS : EVENTS.filter((e) => e.category === category)

  return (
    <section id="events" aria-labelledby="events-heading" className="scroll-mt-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 md:px-6">
        <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">Event Catalog</p>
            <h2 id="events-heading" className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Upcoming on campus
            </h2>
          </div>

          <div role="group" aria-label="Filter events by category" className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const active = c === category
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={active}
                  className={
                    active
                      ? 'rounded-full border-2 border-primary bg-primary px-4 py-1.5 text-sm font-bold text-primary-foreground'
                      : 'rounded-full border-2 border-border bg-background px-4 py-1.5 text-sm font-semibold text-foreground transition-colors hover:border-primary'
                  }
                >
                  {c}
                </button>
              )
            })}
          </div>
        </header>

        <p className="sr-only" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? 'event' : 'events'}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((event) => (
            <EventCard key={event.id} event={event} onRegister={onRegister} />
          ))}
        </div>
      </div>
    </section>
  )
}
