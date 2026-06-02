"use client"

import { useEffect, useRef } from "react"

type PostViewTrackerProps = {
  postId: string
}

export function PostViewTracker({ postId }: PostViewTrackerProps) {
  const tracked = useRef(false)

  useEffect(() => {
    if (tracked.current || postId.startsWith("local")) return
    const key = `blog_view_${postId}`
    if (sessionStorage.getItem(key)) return

    tracked.current = true
    sessionStorage.setItem(key, "1")

    fetch("/api/blog/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId }),
    }).catch(() => {
      // non-blocking
    })
  }, [postId])

  return null
}
