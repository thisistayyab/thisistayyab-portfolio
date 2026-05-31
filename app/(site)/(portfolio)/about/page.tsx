import type { Metadata } from "next"

import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "About Tayyab | Full Stack Developer — Background & Achievements",
  description:
    "Meet Tayyab, a full stack web developer with 3+ years of experience, 15+ projects shipped, and 1,150+ LeetCode problems solved. Expert in React, Next.js, Node.js, and PostgreSQL.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-5 pt-[calc(88px+2rem)] pb-16 sm:px-6 lg:px-4">
      <h1 className="text-3xl font-bold text-white">About</h1>
      <p className="mt-4 max-w-2xl text-slate-400">
        Standalone about page — content migration coming next.
      </p>
    </div>
  )
}
