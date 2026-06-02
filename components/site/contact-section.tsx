import { ContactForm } from "@/components/site/contact-form"
import { ContactInfoPanel } from "@/components/site/contact-info-panel"
import { GlassSurface } from "@/components/site/glass-surface"
import { contentCardClassName } from "@/components/site/site-styles"
import { cn } from "@/lib/utils"

export function ContactSection() {
  return (
    <section
      className="relative mx-auto max-w-[1200px] scroll-mt-28 px-5 pb-20 pt-4 sm:px-6 lg:px-4"
      aria-labelledby="contact-page-form-heading"
    >
      <h2 id="contact-page-form-heading" className="sr-only">
        Contact form
      </h2>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-10">
        <ContactInfoPanel />
        <GlassSurface
          rim="blue"
          className={cn(
            contentCardClassName,
            "rounded-2xl border border-white/10 p-5 sm:p-6 lg:p-8",
          )}
        >
          <h3 className="text-lg font-semibold text-white">Send a message</h3>
          <p className="mt-2 text-sm text-slate-400">
            Share your project scope, timeline, and technical context. I read every submission
            personally.
          </p>
          <div className="mt-6">
            <ContactForm formId="contact-page-form" />
          </div>
        </GlassSurface>
      </div>
    </section>
  )
}
