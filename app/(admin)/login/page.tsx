"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"

import { Button } from "@/components/ui/button"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"

function AdminLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const nextPath = searchParams.get("next") || "/dashboard/blog"
  const errorParam = searchParams.get("error")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(
    errorParam === "unauthorized" ? "You do not have admin access." : null,
  )
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const supabase = createSupabaseBrowserClient()
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError || !data.user) {
        setError(signInError?.message || "Sign in failed.")
        setLoading(false)
        return
      }

      const { data: adminRow, error: adminError } = await supabase
        .from("admin_users")
        .select("is_active")
        .eq("id", data.user.id)
        .maybeSingle()

      if (adminError || !adminRow?.is_active) {
        await supabase.auth.signOut()
        setError("You do not have admin access.")
        setLoading(false)
        return
      }

      router.replace(nextPath)
      router.refresh()
    } catch {
      setError("Something went wrong. Check Supabase environment variables.")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[rgba(8,12,26,0.92)] p-8 shadow-2xl backdrop-blur-xl">
        <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-blue-300/70 uppercase">
          Admin
        </p>
        <h1 className="text-2xl font-bold text-white">Blog dashboard</h1>
        <p className="mt-2 text-sm text-slate-400">Sign in to manage articles, authors, and categories.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm text-slate-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-white outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm text-slate-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-white outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          <Link href="/" className="text-blue-400 hover:underline">
            Back to portfolio
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center text-slate-400">Loading…</div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  )
}
