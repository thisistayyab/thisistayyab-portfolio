import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function getSessionUser() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function isActiveAdmin(userId: string) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from("admin_users")
    .select("id, is_active")
    .eq("id", userId)
    .maybeSingle()

  if (error) {
    console.error("[auth] admin check:", error.message)
    return false
  }

  return Boolean(data?.is_active)
}

export async function requireActiveAdmin() {
  const user = await getSessionUser()
  if (!user) return { user: null, authorized: false as const }
  const authorized = await isActiveAdmin(user.id)
  return { user, authorized }
}
