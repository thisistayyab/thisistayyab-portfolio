import { NextResponse } from "next/server"

import { hasSupabaseEnv } from "@/lib/supabase/env"
import { createSupabasePublicClient } from "@/lib/supabase/public"

export async function POST(request: Request) {
  if (!hasSupabaseEnv()) {
    return NextResponse.json({ ok: false }, { status: 503 })
  }

  let postId: string | undefined
  try {
    const body = (await request.json()) as { postId?: string }
    postId = body.postId
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  if (!postId) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const supabase = createSupabasePublicClient()
  const { error } = await supabase.rpc("increment_view_count", { p_id: postId })

  if (error) {
    console.error("[blog] increment_view_count:", error.message)
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
