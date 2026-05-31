import { SiteNav } from "@/components/site/site-nav"

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <SiteNav />
      <main className="relative z-[1] flex min-h-full flex-1 flex-col">{children}</main>
    </>
  )
}
