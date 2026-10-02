'use client'

import { useState } from 'react'
import { EventCatalog } from './event-catalog'
import { RegistrationForm } from './registration-form'

export function EventPortal() {
  const [selectedEventId, setSelectedEventId] = useState('')

  function handleRegister(eventId: string) {
    setSelectedEventId(eventId)
    document.getElementById('register')?.scrollIntoView()
    document.getElementById('fullName')?.focus({ preventScroll: true })
  }

  return (
    <>
      <EventCatalog onRegister={handleRegister} />
      <RegistrationForm selectedEventId={selectedEventId} onSelectedEventChange={setSelectedEventId} />
    </>
  )
}
