import { JsonLd } from "@/components/site/json-ld"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteNav } from "@/components/site/site-nav"
import { buildWebSiteJsonLd } from "@/lib/site-json-ld"
import { SITE_URL } from "@/lib/site"

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative z-[1] flex min-h-dvh flex-col">
      <JsonLd data={buildWebSiteJsonLd(SITE_URL)} />
      <SiteNav />
      <main className="relative flex min-w-0 flex-1 flex-col overflow-x-clip">{children}</main>
      <SiteFooter />
    </div>
  )
}
