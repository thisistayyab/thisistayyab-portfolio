import type { Metadata } from "next"

import { BlogCms } from "@/components/admin/blog-cms"

export const metadata: Metadata = {
  title: "Blog CMS",
  robots: { index: false, follow: false },
}

export default function DashboardBlogPage() {
  return <BlogCms />
}
