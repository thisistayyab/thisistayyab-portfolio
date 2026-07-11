import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

import { BLOG_INDEX_PATH } from "@/lib/blog/config"
import { createSupabaseServerClient } from "@/lib/supabase/server"

/** Called by the admin CMS after create/update/delete so the public site doesn't serve a stale ISR cache (or a 404 cached from before publish) for up to `revalidate` seconds. */
export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  let slug: string | undefined
  try {
    const body = (await request.json()) as { slug?: string }
    slug = body.slug
  } catch {
    // no body — still revalidate the index/sitemap below
  }

  revalidatePath(BLOG_INDEX_PATH)
  revalidatePath("/sitemap.xml")
  if (slug) {
    revalidatePath(`${BLOG_INDEX_PATH}/${slug}`)
  }

  return NextResponse.json({ ok: true })
}
