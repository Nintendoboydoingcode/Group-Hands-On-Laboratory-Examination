'use client'

import { type FormEvent, useRef, useState } from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { EVENTS, formatDate } from '@/lib/events'

type Fields = 'fullName' | 'studentId' | 'email' | 'eventId'
type Errors = Partial<Record<Fields, string>>

const STUDENT_ID_PATTERN = /^\d{4}-\d{5}$/
const EMAIL_PATTERN = /^[a-z0-9._%+-]+@univ\.edu\.ph$/i

function validate(data: Record<Fields, string>): Errors {
  const errors: Errors = {}
  if (data.fullName.trim().length < 2) errors.fullName = 'Please enter your full name.'
  if (!STUDENT_ID_PATTERN.test(data.studentId.trim()))
    errors.studentId = 'Student ID must follow the format 2026-12345.'
  if (!EMAIL_PATTERN.test(data.email.trim()))
    errors.email = 'Use your university email ending in @univ.edu.ph.'
  if (!data.eventId) errors.eventId = 'Please choose an event to register for.'
  return errors
}

type RegistrationFormProps = {
  selectedEventId: string
  onSelectedEventChange: (eventId: string) => void
}

export function RegistrationForm({ selectedEventId, onSelectedEventChange }: RegistrationFormProps) {
  const [errors, setErrors] = useState<Errors>({})
  const [confirmation, setConfirmation] = useState<{ name: string; event: string } | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const data = {
      fullName: String(form.get('fullName') ?? ''),
      studentId: String(form.get('studentId') ?? ''),
      email: String(form.get('email') ?? ''),
      eventId: selectedEventId,
    }
    const nextErrors = validate(data)
    setErrors(nextErrors)

    const firstInvalid = (Object.keys(nextErrors) as Fields[])[0]
    if (firstInvalid) {
      setConfirmation(null)
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    const event = EVENTS.find((ev) => ev.id === data.eventId)
    setConfirmation({ name: data.fullName.trim(), event: event?.title ?? '' })
    e.currentTarget.reset()
    onSelectedEventChange('')
  }

  const selected = EVENTS.find((ev) => ev.id === selectedEventId)
  const inputClass = (field: Fields) =>
    `w-full rounded-xl border-2 bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary ${
      errors[field] ? 'border-destructive' : 'border-input'
    }`

  return (
    <section id="register" aria-labelledby="register-heading" className="scroll-mt-20 bg-muted">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:px-6 lg:grid-cols-5">
        <header className="flex flex-col gap-4 lg:col-span-2">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Event Registration</p>
          <h2 id="register-heading" className="text-balance text-3xl font-extrabold tracking-tight md:text-4xl">
            Save your spot
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Fill in your details below. You&apos;ll receive a confirmation at your university email address.
          </p>

          {selected && (
            <article
              aria-label="Selected event summary"
              className="mt-2 flex items-center gap-4 rounded-2xl border border-border bg-card p-3"
            >
              <img
                src={selected.image || '/placeholder.svg'}
                alt=""
                className="size-16 shrink-0 rounded-xl object-cover"
              />
              <div className="flex flex-col">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">You&apos;re registering for</p>
                <p className="font-bold leading-snug">{selected.title}</p>
                <p className="text-sm text-muted-foreground">{formatDate(selected.date)}</p>
              </div>
            </article>
          )}
        </header>

        <div className="lg:col-span-3">
          {confirmation && (
            <div
              role="status"
              className="mb-6 flex items-start gap-3 rounded-2xl border-2 border-primary bg-secondary p-4 text-secondary-foreground"
            >
              <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
              <p>
                <strong>You&apos;re in, {confirmation.name}!</strong> Your registration for {confirmation.event} has
                been received.
              </p>
            </div>
          )}

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            aria-labelledby="register-heading"
            className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8"
          >
            <p className="text-sm text-muted-foreground">
              Fields marked with <span aria-hidden="true">*</span>
              <span className="sr-only">an asterisk</span> are required.
            </p>

            <FormField id="fullName" label="Full Name" error={errors.fullName}>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                aria-label="Enter your full name"
                aria-required="true"
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                placeholder="Juan Dela Cruz"
                className={inputClass('fullName')}
              />
            </FormField>

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField id="studentId" label="Student ID" hint="Format: 2026-12345" error={errors.studentId}>
                <input
                  id="studentId"
                  name="studentId"
                  type="text"
                  inputMode="numeric"
                  required
                  aria-label="Enter your student ID number"
                  aria-required="true"
                  aria-invalid={!!errors.studentId}
                  aria-describedby={errors.studentId ? 'studentId-hint studentId-error' : 'studentId-hint'}
                  placeholder="2026-12345"
                  className={inputClass('studentId')}
                />
              </FormField>

              <FormField id="email" label="Email Address" hint="Must end in @univ.edu.ph" error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-label="Enter your university email address ending in at univ dot edu dot p h"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-hint email-error' : 'email-hint'}
                  placeholder="juan.delacruz@univ.edu.ph"
                  className={inputClass('email')}
                />
              </FormField>
            </div>

            <FormField id="eventId" label="Selected Event" error={errors.eventId}>
              <select
                id="eventId"
                name="eventId"
                required
                value={selectedEventId}
                onChange={(e) => onSelectedEventChange(e.target.value)}
                aria-label="Select the event you want to register for"
                aria-required="true"
                aria-invalid={!!errors.eventId}
                aria-describedby={errors.eventId ? 'eventId-error' : undefined}
                className={inputClass('eventId')}
              >
                <option value="">Choose an event…</option>
                {EVENTS.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.title} — {formatDate(ev.date)}
                  </option>
                ))}
              </select>
            </FormField>

            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-primary px-6 py-3.5 text-base font-bold text-primary-foreground transition-colors hover:bg-primary-hover sm:w-auto sm:self-start"
            >
              Complete Registration
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

type FormFieldProps = {
  id: Fields
  label: string
  hint?: string
  error?: string
  children: React.ReactNode
}

function FormField({ id, label, hint, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-semibold">
        {label} <span aria-hidden="true" className="text-destructive">*</span>
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="text-sm text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-sm font-semibold text-destructive">
          <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}
