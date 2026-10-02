import { ArrowDown, CalendarCheck, Users } from 'lucide-react'
import { EVENTS } from '@/lib/events'

export function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="bg-accent">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 md:flex-row md:items-end md:justify-between md:px-6 md:py-20">
        <div className="flex max-w-2xl flex-col gap-5">
          <p className="w-fit rounded-full bg-highlight px-3 py-1 text-sm font-bold text-highlight-foreground">
            Fall Semester 2026
          </p>
          <h1 id="hero-heading" className="text-balance text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Find your crowd. <span className="text-primary">Make it happen.</span>
          </h1>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            Hackathons, music nights, career fairs and volunteer drives — discover what&apos;s happening on campus and
            save your spot in under a minute.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#events"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Browse events
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#register"
              className="inline-flex items-center rounded-full border-2 border-primary px-6 py-3 font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Register now
            </a>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-4 md:w-72">
          <div className="flex flex-col gap-1 rounded-2xl border border-border bg-card p-5">
            <CalendarCheck className="size-6 text-primary" aria-hidden="true" />
            <dt className="text-sm font-medium text-muted-foreground">Upcoming</dt>
            <dd className="text-3xl font-extrabold">{EVENTS.length}</dd>
          </div>
          <div className="flex flex-col gap-1 rounded-2xl border border-border bg-card p-5">
            <Users className="size-6 text-primary" aria-hidden="true" />
            <dt className="text-sm font-medium text-muted-foreground">Open seats</dt>
            <dd className="text-3xl font-extrabold">{EVENTS.reduce((sum, e) => sum + e.seatsLeft, 0)}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
