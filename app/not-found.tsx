import type { Metadata } from "next"

import { SiteFooter } from "@/components/site/site-footer"
import { SiteNav } from "@/components/site/site-nav"
import { NotFoundContent } from "@/components/site/not-found-content"

export const metadata: Metadata = {
  title: { absolute: "Page Not Found | Tayyab" },
  robots: { index: false, follow: true },
}

/** Fallback 404 when the URL is outside the (site) route group (e.g. mistyped admin paths). */
export default function RootNotFound() {
  return (
    <div className="relative z-[1] flex min-h-dvh flex-col">
      <SiteNav />
      <main className="relative flex min-w-0 flex-1 flex-col overflow-x-clip">
        <NotFoundContent />
      </main>
      <SiteFooter />
    </div>
  )
}
