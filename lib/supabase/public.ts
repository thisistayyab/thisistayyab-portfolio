import { createClient } from "@supabase/supabase-js"

import { getSupabaseAnonKey, getSupabaseUrl, hasSupabaseEnv } from "@/lib/supabase/env"

/**
 * Anonymous Supabase client for public reads (blog, sitemap, generateStaticParams).
 * Does not use `cookies()` — safe at build time and in generateStaticParams.
 */
export function createSupabasePublicClient() {
  return createClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })
}

export function getSupabasePublicClientOrNull() {
  if (!hasSupabaseEnv()) return null
  return createSupabasePublicClient()
}
