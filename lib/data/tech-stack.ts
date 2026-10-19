export type TechStackIconKey =
  | "typescript"
  | "shadcn"
  | "framer"
  | "mui"
  | "vite"
  | "rest"
  | "webrtc"
  | "webhooks"
  | "playwright"
  | "ffmpeg"
  | "redis"
  | "prisma"
  | "git"
  | "cicd"
  | "vercel"
  | "linux"
  | "leetcode"
  | "openai"
  | "wcag"

export type TechStackItem = {
  name: string
  /** Filename under /images/tech-icons/ (svg, webp, etc.) */
  icon?: string
  /** Vector icon key rendered via react-icons / lucide-react when no image file is used */
  iconKey?: TechStackIconKey
  /** Self-assessed proficiency 0–100 */
  proficiency: number
}

export type TechStackCategory = {
  id: string
  label: string
  shortLabel: string
  rim: "violet" | "blue" | "purple" | "pink"
  items: readonly TechStackItem[]
}

/** Single source of truth for the portfolio tech stack section. */
export const techStackCategories: readonly TechStackCategory[] = [
  {
    id: "frontend",
    label: "Frontend & UI",
    shortLabel: "Frontend",
    rim: "violet",
    items: [
      { name: "React 19", icon: "react.svg", proficiency: 95 },
      { name: "Next.js (App Router)", icon: "nextjs.svg", proficiency: 94 },
      { name: "TypeScript", iconKey: "typescript", proficiency: 92 },
      { name: "JavaScript (ES6+)", icon: "js.svg", proficiency: 94 },
      { name: "Tailwind CSS", icon: "tailwind.svg", proficiency: 94 },
      { name: "Shadcn & Radix UI", iconKey: "shadcn", proficiency: 90 },
      { name: "Framer Motion", iconKey: "framer", proficiency: 88 },
      { name: "Material UI (MUI)", iconKey: "mui", proficiency: 88 },
      { name: "Vite", iconKey: "vite", proficiency: 90 },
      { name: "HTML5", icon: "html.svg", proficiency: 96 },
      { name: "CSS3", icon: "css.svg", proficiency: 92 },
      { name: "Bootstrap", icon: "bootstrap.svg", proficiency: 86 },
    ],
  },
  {
    id: "backend",
    label: "Backend & Real-Time",
    shortLabel: "Backend",
    rim: "blue",
    items: [
      { name: "Node.js", icon: "nodejs.svg", proficiency: 92 },
      { name: "Express.js", icon: "express.svg", proficiency: 90 },
      { name: "RESTful APIs", iconKey: "rest", proficiency: 94 },
      { name: "FastAPI", icon: "fastapi.webp", proficiency: 84 },
      { name: "Socket.IO & WebSockets", icon: "socket.io.svg", proficiency: 88 },
      { name: "WebRTC (P2P Channels)", iconKey: "webrtc", proficiency: 85 },
      { name: "JWT & OAuth Auth", icon: "authentication.svg", proficiency: 90 },
      { name: "Webhooks & Integrations", iconKey: "webhooks", proficiency: 86 },
      { name: "Playwright Automation", iconKey: "playwright", proficiency: 86 },
      { name: "FFmpeg & Media Streams", iconKey: "ffmpeg", proficiency: 82 },
    ],
  },
  {
    id: "data",
    label: "Data, Cloud & DevOps",
    shortLabel: "Data & Cloud",
    rim: "purple",
    items: [
      { name: "PostgreSQL", icon: "postgresql.svg", proficiency: 90 },
      { name: "Supabase (Auth & RLS)", icon: "supabase.svg", proficiency: 92 },
      { name: "MongoDB", icon: "mongodb.svg", proficiency: 86 },
      { name: "Redis (Caching & OTP)", iconKey: "redis", proficiency: 84 },
      { name: "Prisma ORM", iconKey: "prisma", proficiency: 84 },
      { name: "Docker", icon: "docker.svg", proficiency: 82 },
      { name: "Git & GitHub", iconKey: "git", proficiency: 94 },
      { name: "CI/CD (GitHub Actions)", iconKey: "cicd", proficiency: 85 },
      { name: "Vercel & Cloud Deploy", iconKey: "vercel", proficiency: 92 },
      { name: "Linux & Server Admin", iconKey: "linux", proficiency: 82 },
    ],
  },
  {
    id: "ai",
    label: "AI, Testing & Core CS",
    shortLabel: "AI & CS",
    rim: "pink",
    items: [
      { name: "C++ (1,150+ LeetCode)", icon: "c++.svg", proficiency: 92 },
      { name: "Algorithms & DSA", iconKey: "leetcode", proficiency: 94 },
      { name: "Python", icon: "python.svg", proficiency: 85 },
      { name: "OpenAI & LLM APIs", iconKey: "openai", proficiency: 88 },
      { name: "WCAG & axe-core Audits", iconKey: "wcag", proficiency: 90 },
      { name: "TensorFlow", icon: "tensorflow.svg", proficiency: 76 },
      { name: "PyTorch", icon: "pytorch.svg", proficiency: 74 },
      { name: "Scikit-learn", icon: "scikit.svg", proficiency: 78 },
    ],
  },
] as const

export const techStackFlat = techStackCategories.flatMap((group) => group.items)
