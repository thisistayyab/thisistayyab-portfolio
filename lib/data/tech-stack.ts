export type TechStackItem = {
  name: string
  /** Filename under /images/tech-icons/ (svg, webp, etc.) */
  icon?: string
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
      { name: "React", icon: "react.svg", proficiency: 95 },
      { name: "Next.js", icon: "nextjs.svg", proficiency: 92 },
      { name: "TypeScript", proficiency: 88 },
      { name: "JavaScript", icon: "js.svg", proficiency: 93 },
      { name: "HTML5", icon: "html.svg", proficiency: 95 },
      { name: "CSS3", icon: "css.svg", proficiency: 90 },
      { name: "Tailwind CSS", icon: "tailwind.svg", proficiency: 92 },
      { name: "Bootstrap", icon: "bootstrap.svg", proficiency: 82 },
      { name: "Material UI", proficiency: 85 },
      { name: "Responsive UI", proficiency: 93 },
    ],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    shortLabel: "Backend",
    rim: "blue",
    items: [
      { name: "Node.js", icon: "nodejs.svg", proficiency: 90 },
      { name: "Express.js", icon: "express.svg", proficiency: 88 },
      { name: "REST APIs", proficiency: 92 },
      { name: "FastAPI", icon: "fastapi.webp", proficiency: 80 },
      { name: "Socket.IO", icon: "socket.io.svg", proficiency: 82 },
      { name: "Authentication", icon: "authentication.svg", proficiency: 88 },
      { name: "Webhooks", proficiency: 85 },
    ],
  },
  {
    id: "data",
    label: "Data & DevOps",
    shortLabel: "Data",
    rim: "purple",
    items: [
      { name: "PostgreSQL", icon: "postgresql.svg", proficiency: 88 },
      { name: "MongoDB", icon: "mongodb.svg", proficiency: 85 },
      { name: "Supabase", icon: "supabase.svg", proficiency: 86 },
      { name: "Prisma", proficiency: 80 },
      { name: "Docker", icon: "docker.svg", proficiency: 78 },
      { name: "Git", proficiency: 92 },
      { name: "CI/CD", proficiency: 82 },
    ],
  },
  {
    id: "ai",
    label: "AI & Languages",
    shortLabel: "AI",
    rim: "pink",
    items: [
      { name: "Python", icon: "python.svg", proficiency: 82 },
      { name: "C++", icon: "c++.svg", proficiency: 90 },
      { name: "LLM APIs", proficiency: 85 },
      { name: "TensorFlow", icon: "tensorflow.svg", proficiency: 70 },
      { name: "PyTorch", icon: "pytorch.svg", proficiency: 68 },
      { name: "Scikit-learn", icon: "scikit.svg", proficiency: 72 },
    ],
  },
] as const

export const techStackFlat = techStackCategories.flatMap((group) => group.items)
