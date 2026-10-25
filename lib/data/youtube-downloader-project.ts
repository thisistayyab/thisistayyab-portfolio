import type { PortfolioProject } from "@/components/site/project-card"

export const YOUTUBE_DOWNLOADER_URL = "https://downloader.thisistayyab.dev"
export const YOUTUBE_DOWNLOADER_REPO = "https://github.com/thisistayyab/youtube-downloader"

export const youtubeDownloaderSeoKeywords = [
  "YouTube Downloader",
  "YouTube Video Downloader",
  "yt-dlp web app",
  "Next.js video downloader",
  "FFmpeg video audio converter",
  "private YouTube downloader",
  "personal video backup tool",
  "Tayyab YouTube Downloader",
] as const

export const youtubeDownloaderProject: PortfolioProject = {
  id: 15,
  slug: "youtube-downloader",
  name: "YouTube Video Downloader",
  roleLabel: "Personal project",
  image: "/images/projects/youtube-downloader.webp",
  imageAlt:
    "YouTube Video Downloader web app interface built with Next.js, yt-dlp, and FFmpeg",
  imageTitle: "YouTube Video Downloader — Private Archival Tool",
  link: YOUTUBE_DOWNLOADER_URL,
  detailPath: "/projects/youtube-downloader",
  githubUrl: YOUTUBE_DOWNLOADER_REPO,
  hideCardLiveLink: true,
  deploymentStatus: "Deployed · Private Access Only (Password Protected)",
  complianceNotice:
    "This app is password-locked for private use only. In line with YouTube rules and Google policies, it is not open to the public, keeps no files on the server, and is strictly for personal backups and fair use.",
  alternateName: [
    "YouTube Video Downloader",
    "yt-dlp Web Downloader",
    "Private Video Backup Tool",
  ],
  applicationCategory: "MultimediaApplication",
  seoKeywords: youtubeDownloaderSeoKeywords,
  description:
    "A fast and clean web app to download YouTube videos and audio in high quality (MP4, MP3, 1080p, 4K). Built with Next.js, yt-dlp, and FFmpeg. Deployed on Render with a password lock for private personal use, real-time download progress, and zero files stored on the server.",
  tags: [
    { label: "Next.js 16", variant: "tech" },
    { label: "TypeScript", variant: "tech" },
    { label: "yt-dlp", variant: "tech" },
    { label: "FFmpeg", variant: "tech" },
    { label: "Private tool", variant: "feature" },
    { label: "Password-protected", variant: "feature" },
  ],
  ctaLabel: "Live App (Locked)",
}

export const youtubeDownloaderPageTitle =
  "YouTube Video & Audio Downloader — Next.js Tool | Tayyab"

export const youtubeDownloaderPageDescription =
  "A private YouTube video and audio downloader built with Next.js, yt-dlp, and FFmpeg. Deployed on Render with password protection and zero server storage."
