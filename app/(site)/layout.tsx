import { SiteFooter } from "@/components/site/site-footer"
import { SiteNav } from "@/components/site/site-nav"

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative z-[1] flex min-h-dvh flex-col">
      <SiteNav />
      <main className="relative flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </div>
  )
}
