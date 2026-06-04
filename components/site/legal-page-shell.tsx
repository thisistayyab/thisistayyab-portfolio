import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { MotionSection, PageHeaderItem, PageHeaderStagger } from "@/components/motion/page-motion"
import { LEGAL_LAST_UPDATED } from "@/lib/legal"

type LegalPageShellProps = {
  eyebrow: string
  title: string
  lead: string
  children: React.ReactNode
}

export function LegalPageShell({ eyebrow, title, lead, children }: LegalPageShellProps) {
  return (
    <article className="relative z-[5]">
      <header className="relative border-b border-white/8 bg-[#020106]/80 pt-[88px]">
        <div className="relative z-[2] mx-auto max-w-[1200px] px-5 pb-10 sm:px-6 lg:px-4">
          <div className="mb-8 pt-6">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-slate-400 transition-all duration-300 hover:pl-2 hover:text-white"
            >
              <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
              Back to home
            </Link>
          </div>

          <PageHeaderStagger className="mx-auto max-w-3xl">
            <PageHeaderItem>
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-blue-300/80 uppercase">
                {eyebrow}
              </p>
            </PageHeaderItem>
            <PageHeaderItem>
              <h1 className="text-[clamp(1.85rem,4.5vw,2.75rem)] leading-[1.15] font-bold tracking-tight text-white">
                {title}
              </h1>
            </PageHeaderItem>
            <PageHeaderItem>
              <p className="mt-4 text-sm text-slate-500">Last updated: {LEGAL_LAST_UPDATED}</p>
              <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">{lead}</p>
            </PageHeaderItem>
          </PageHeaderStagger>
        </div>
      </header>

      <MotionSection
        className="mx-auto max-w-3xl px-5 py-12 sm:px-6 lg:px-4"
        aria-label={`${title} content`}
      >
        <div className="blog-prose legal-prose">{children}</div>
      </MotionSection>
    </article>
  )
}
