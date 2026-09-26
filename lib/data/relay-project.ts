import type { PortfolioProject } from "@/components/site/project-card"

export const RELAY_URL = "https://relay.thisistayyab.dev/"

export const relaySeoKeywords = [
  "Relay",
  "Relay WebRTC",
  "real-time communication",
  "P2P file transfer",
  "WebRTC file sharing",
  "realtime notepad",
  "Socket.IO collaboration",
  "peer-to-peer web app",
  "Tayyab Relay",
] as const

export const relayProject: PortfolioProject = {
  id: 1,
  slug: "relay",
  name: "Relay",
  roleLabel: "Personal project",
  image: "/images/projects/relay.webp",
  imageAlt: "Relay real-time text and P2P file sharing platform",
  imageTitle: "Relay real-time communication",
  link: RELAY_URL,
  alternateName: ["Relay Real-Time Communication", "Relay P2P Transfer"],
  applicationCategory: "CommunicationApplication",
  seoKeywords: relaySeoKeywords,
  description:
    "Relay is a privacy-first real-time collaboration application featuring instant shared notepad sync and direct peer-to-peer file transfer up to 100 MB via WebRTC data channels. Built with React, Node.js, Express, and Socket.IO with zero accounts required and no files stored on servers.",
  tags: [
    { label: "WebRTC", variant: "tech" },
    { label: "Socket.IO", variant: "tech" },
    { label: "React", variant: "tech" },
    { label: "Node.js", variant: "tech" },
    { label: "P2P Transfer", variant: "feature" },
    { label: "Privacy-first", variant: "feature" },
  ],
  ctaLabel: "Live View",
}
