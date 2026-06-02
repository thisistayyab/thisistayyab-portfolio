"use client"

import { createBrowserClient } from "@supabase/ssr"

import { getSupabaseAnonKey, getSupabaseUrl, hasSupabaseEnv } from "@/lib/supabase/env"

export function createSupabaseBrowserClient() {
  if (!hasSupabaseEnv()) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local",
    )
  }
  return createBrowserClient(getSupabaseUrl(), getSupabaseAnonKey())
}
