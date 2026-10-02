import { Mail, MapPin, Phone } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer id="contact" className="scroll-mt-20 border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 md:flex-row md:justify-between md:px-6">
        <section aria-labelledby="footer-about" className="flex max-w-sm flex-col gap-2">
          <h2 id="footer-about" className="text-lg font-extrabold">
            CampusHub Event Portal
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Run by the Office of Student Affairs. Bringing students together, one event at a time.
          </p>
        </section>

        <section aria-labelledby="footer-contact" className="flex flex-col gap-3">
          <h2 id="footer-contact" className="text-sm font-bold uppercase tracking-widest text-primary">
            Contact
          </h2>
          <address className="flex flex-col gap-2 text-sm not-italic">
            <a href="mailto:events@univ.edu.ph" className="flex items-center gap-2 underline-offset-4 hover:underline">
              <Mail className="size-4 text-primary" aria-hidden="true" />
              events@univ.edu.ph
            </a>
            <a href="tel:+6321234567" className="flex items-center gap-2 underline-offset-4 hover:underline">
              <Phone className="size-4 text-primary" aria-hidden="true" />
              (02) 123-4567
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" aria-hidden="true" />
              Student Center, 2nd Floor
            </span>
          </address>
        </section>
      </div>
      <p className="border-t border-border px-4 py-5 text-center text-sm text-muted-foreground">
        &copy; 2026 University Office of Student Affairs. All rights reserved.
      </p>
    </footer>
  )
}
