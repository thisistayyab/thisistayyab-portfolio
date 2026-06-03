import { notFound } from "next/navigation"

/** Unknown public URLs — renders app/(site)/not-found.tsx with nav + footer. */
export default function SiteCatchAllPage() {
  notFound()
}
