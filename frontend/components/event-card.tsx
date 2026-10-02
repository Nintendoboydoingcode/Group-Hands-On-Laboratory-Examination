import { Calendar, Clock, MapPin } from 'lucide-react'
import { type CampusEvent, formatDate, formatTime } from '@/lib/events'

type EventCardProps = {
  event: CampusEvent
  onRegister: (eventId: string) => void
}

export function EventCard({ event, onRegister }: EventCardProps) {
  const titleId = `event-title-${event.id}`
  const lowSeats = event.seatsLeft <= 20

  return (
    <article
      aria-labelledby={titleId}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-shadow hover:shadow-xl hover:shadow-primary/10"
    >
      <figure className="relative aspect-[3/2] overflow-hidden bg-muted">
        <img
          src={event.image || '/placeholder.svg'}
          alt={event.imageAlt}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <figcaption className="absolute left-3 top-3 rounded-full bg-background px-3 py-1 text-xs font-bold text-foreground">
          {event.category}
        </figcaption>
      </figure>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <header className="flex flex-col gap-2">
          <h3 id={titleId} className="text-balance text-xl font-extrabold leading-snug">
            {event.title}
          </h3>
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{event.description}</p>
        </header>

        <ul className="flex flex-col gap-2 text-sm">
          <li className="flex items-center gap-2">
            <Calendar className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <span className="sr-only">Date:</span>
            <time dateTime={event.date}>{formatDate(event.date)}</time>
          </li>
          <li className="flex items-center gap-2">
            <Clock className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <span className="sr-only">Time:</span>
            <span>
              <time dateTime={event.startTime}>{formatTime(event.startTime)}</time>
              {' – '}
              <time dateTime={event.endTime}>{formatTime(event.endTime)}</time>
            </span>
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <span className="sr-only">Location:</span>
            <span>{event.location}</span>
          </li>
        </ul>

        <footer className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
          <p className={lowSeats ? 'text-sm font-bold text-destructive' : 'text-sm font-semibold text-muted-foreground'}>
            {event.seatsLeft} seats left
          </p>
          <button
            type="button"
            onClick={() => onRegister(event.id)}
            aria-label={`Register now for ${event.title}`}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Register Now
          </button>
        </footer>
      </div>
    </article>
  )
}
