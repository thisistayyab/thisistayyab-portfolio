import type { Metadata } from "next"

import { NotFoundContent } from "@/components/site/not-found-content"

export const metadata: Metadata = {
  title: { absolute: "Page Not Found | Tayyab" },
  description:
    "This page could not be found on Tayyab's portfolio. Browse projects, services, blog, or contact for full stack development.",
  robots: { index: false, follow: true },
}

export default function SiteNotFound() {
  return <NotFoundContent />
}
