import Link from "next/link"
import { redirect } from "next/navigation"

import { requireActiveAdmin } from "@/lib/auth/admin"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user, authorized } = await requireActiveAdmin()

  if (!user) {
    redirect("/login")
  }

  if (!authorized) {
    redirect("/login?error=unauthorized")
  }

  async function signOut() {
    "use server"
    const supabase = await createSupabaseServerClient()
    await supabase.auth.signOut()
    redirect("/login")
  }

  return (
    <div className="min-h-dvh bg-[#020106] text-white">
      <header className="border-b border-white/10 bg-[rgba(8,12,26,0.95)] backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] text-blue-300/70 uppercase">
              Tayyab Portfolio
            </p>
            <h1 className="text-lg font-bold">Blog CMS</h1>
          </div>
          <nav className="flex items-center gap-3 text-sm">
            <Link href="/blog" className="text-slate-400 no-underline hover:text-white" target="_blank">
              View blog
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-lg border border-white/10 px-3 py-1.5 text-slate-300 transition-colors hover:border-white/20 hover:text-white"
              >
                Sign out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  )
}
