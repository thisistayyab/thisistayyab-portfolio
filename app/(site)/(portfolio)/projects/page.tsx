import type { Metadata } from "next"

import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Projects - Web Development Portfolio | Tayyab",
  description:
    "View Tayyab's portfolio of full-stack web development projects built with React, Node.js, Express.js, MongoDB, and modern web technologies.",
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
}

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-5 pt-[calc(88px+2rem)] pb-16 sm:px-6 lg:px-4">
      <h1 className="text-3xl font-bold text-white">Projects</h1>
      <p className="mt-4 max-w-2xl text-slate-400">
        Full projects page — content migration coming next.
      </p>
    </div>
  )
}
