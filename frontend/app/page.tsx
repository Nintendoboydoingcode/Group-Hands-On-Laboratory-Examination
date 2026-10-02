import { EventPortal } from '@/components/event-portal'
import { HeroSection } from '@/components/hero-section'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <HeroSection />
        <EventPortal />
      </main>
      <SiteFooter />
    </>
  )
}
