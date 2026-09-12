"use client"

import { Check, Link2, Share2 } from "lucide-react"
import { RiLinkedinFill } from "react-icons/ri"
import { useState } from "react"

import { blogPostPath } from "@/lib/blog/config"
import { SITE_URL } from "@/lib/site"

type BlogShareButtonsProps = {
  title: string
  slug: string
}

export function BlogShareButtons({ title, slug }: BlogShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const url = `${SITE_URL}${blogPostPath(slug)}`
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  const shareNative = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch {
        // user cancelled
      }
    } else {
      await copyLink()
    }
  }

  const iconClass =
    "inline-flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white"

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Share article">
      <button type="button" onClick={shareNative} className={iconClass} title="Share">
        <Share2 className="size-4" aria-hidden="true" />
        <span className="sr-only">Share</span>
      </button>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={iconClass}
        title="Share on LinkedIn"
      >
        <RiLinkedinFill className="size-4" aria-hidden="true" />
        <span className="sr-only">LinkedIn</span>
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className={iconClass}
        title="Share on X"
      >
        <span className="text-sm font-bold" aria-hidden="true">
          𝕏
        </span>
        <span className="sr-only">X (Twitter)</span>
      </a>
      <button type="button" onClick={copyLink} className={iconClass} title="Copy link">
        {copied ? <Check className="size-4 text-emerald-400" /> : <Link2 className="size-4" />}
        <span className="sr-only">{copied ? "Copied" : "Copy link"}</span>
      </button>
    </div>
  )
}
