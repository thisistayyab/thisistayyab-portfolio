"use client"

import { motion } from "framer-motion"
import { Globe, ScanSearch, ShieldCheck, Webhook } from "lucide-react"
import Image from "next/image"
import { useState, type ReactNode } from "react"
import {
  SiFfmpeg,
  SiFramer,
  SiGit,
  SiGithubactions,
  SiLeetcode,
  SiLinux,
  SiMui,
  SiOpenai,
  SiPrisma,
  SiRedis,
  SiShadcnui,
  SiTypescript,
  SiVercel,
  SiVite,
  SiWebrtc,
} from "react-icons/si"

import { GlassSurface } from "@/components/site/glass-surface"
import { navGlassClassName } from "@/components/site/site-styles"
import {
  techStackCategories,
  type TechStackCategory,
  type TechStackIconKey,
} from "@/lib/data/tech-stack"
import { cn } from "@/lib/utils"

function techIconSrc(filename: string) {
  return `/images/tech-icons/${encodeURIComponent(filename)}`
}

const vectorTechIcons: Record<TechStackIconKey, ReactNode> = {
  typescript: <SiTypescript className="size-[20px] shrink-0 text-[#3178C6]" aria-hidden="true" />,
  shadcn: <SiShadcnui className="size-[19px] shrink-0 text-slate-100" aria-hidden="true" />,
  framer: <SiFramer className="size-[19px] shrink-0 text-[#0055FF]" aria-hidden="true" />,
  mui: <SiMui className="size-[20px] shrink-0 text-[#007FFF]" aria-hidden="true" />,
  vite: <SiVite className="size-[20px] shrink-0 text-[#646CFF]" aria-hidden="true" />,
  rest: <Globe className="size-[20px] shrink-0 text-cyan-400" aria-hidden="true" />,
  webrtc: <SiWebrtc className="size-[20px] shrink-0 text-sky-400" aria-hidden="true" />,
  webhooks: <Webhook className="size-[20px] shrink-0 text-indigo-400" aria-hidden="true" />,
  playwright: <ScanSearch className="size-[20px] shrink-0 text-emerald-400" aria-hidden="true" />,
  ffmpeg: <SiFfmpeg className="size-[19px] shrink-0 text-[#007808]" aria-hidden="true" />,
  redis: <SiRedis className="size-[20px] shrink-0 text-[#DC382D]" aria-hidden="true" />,
  prisma: <SiPrisma className="size-[20px] shrink-0 text-teal-300" aria-hidden="true" />,
  git: <SiGit className="size-[20px] shrink-0 text-[#F05032]" aria-hidden="true" />,
  cicd: <SiGithubactions className="size-[20px] shrink-0 text-[#2088FF]" aria-hidden="true" />,
  vercel: <SiVercel className="size-[18px] shrink-0 text-white" aria-hidden="true" />,
  linux: <SiLinux className="size-[20px] shrink-0 text-[#FCC624]" aria-hidden="true" />,
  leetcode: <SiLeetcode className="size-[20px] shrink-0 text-[#FFA116]" aria-hidden="true" />,
  openai: <SiOpenai className="size-[20px] shrink-0 text-[#10A37F]" aria-hidden="true" />,
  wcag: <ShieldCheck className="size-[20px] shrink-0 text-rose-400" aria-hidden="true" />,
}

const rimBarGradients: Record<TechStackCategory["rim"], string> = {
  violet: "from-violet-500 via-indigo-500 to-violet-400",
  blue: "from-blue-500 via-cyan-500 to-blue-400",
  purple: "from-purple-500 via-violet-500 to-purple-400",
  pink: "from-pink-500 via-rose-500 to-fuchsia-400",
}

const rimTabActive: Record<TechStackCategory["rim"], string> = {
  violet: "bg-violet-500/15 text-violet-200 shadow-[inset_0_0_12px_rgba(139,92,246,0.2)]",
  blue: "bg-blue-500/15 text-blue-200 shadow-[inset_0_0_12px_rgba(59,130,246,0.2)]",
  purple: "bg-purple-500/15 text-purple-200 shadow-[inset_0_0_12px_rgba(168,85,247,0.2)]",
  pink: "bg-pink-500/15 text-pink-200 shadow-[inset_0_0_12px_rgba(236,72,153,0.2)]",
}

type TechStackSectionProps = {
  className?: string
}

function SkillRow({
  item,
  rim,
  index,
}: {
  item: TechStackCategory["items"][number]
  rim: TechStackCategory["rim"]
  index: number
}) {
  return (
    <li className="list-none">
      <div className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3.5">
        <div className="mb-2.5 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            {item.icon ? (
              <Image
                src={techIconSrc(item.icon)}
                alt=""
                width={22}
                height={22}
                className="size-[22px] shrink-0 object-contain"
                aria-hidden="true"
              />
            ) : item.iconKey ? (
              <span className="flex size-[22px] shrink-0 items-center justify-center">
                {vectorTechIcons[item.iconKey]}
              </span>
            ) : (
              <span
                className="flex size-[22px] shrink-0 items-center justify-center rounded-md bg-white/5 text-[0.55rem] font-bold text-violet-300"
                aria-hidden="true"
              >
                {item.name.charAt(0)}
              </span>
            )}
            <span className="truncate text-sm font-medium text-slate-100">{item.name}</span>
          </div>
          <span className="shrink-0 text-xs font-semibold tabular-nums text-slate-400">
            {item.proficiency}%
          </span>
        </div>
        <div
          className="h-2 overflow-hidden rounded-full bg-white/5"
          role="progressbar"
          aria-valuenow={item.proficiency}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${item.name} proficiency`}
        >
          <motion.div
            className={cn("h-full rounded-full bg-gradient-to-r", rimBarGradients[rim])}
            initial={{ width: `${item.proficiency}%` }}
            animate={{ width: `${item.proficiency}%` }}
            transition={{
              duration: 0.55,
              delay: index * 0.04,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
          />
        </div>
      </div>
    </li>
  )
}

export function TechStackSection({ className }: TechStackSectionProps) {
  const [activeId, setActiveId] = useState(techStackCategories[0].id)
  const active = techStackCategories.find((c) => c.id === activeId) ?? techStackCategories[0]

  return (
    <section
      id="tech-stack"
      className={cn(
        "relative mx-auto max-w-[1200px] scroll-mt-28 px-5 py-20 sm:px-6 lg:scroll-mt-32 lg:px-4",
        className,
      )}
      aria-labelledby="home-tech-stack-heading"
    >
      <div
        className="pointer-events-none absolute -left-16 top-1/3 h-56 w-56 rounded-full bg-violet-600/10 blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative z-[2]">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-blue-300/70 uppercase">
            Tech stack
          </p>
          <h2
            id="home-tech-stack-heading"
            className="mx-auto max-w-4xl text-[clamp(1.85rem,5vw,2.75rem)] leading-[1.15] font-bold tracking-tight text-white"
          >
            Technologies I{" "}
            <span className="whitespace-nowrap bg-gradient-to-r from-purple-400 via-violet-400 via-indigo-400 to-sky-400 bg-clip-text text-transparent">
              build with
            </span>
          </h2>
          <div className="mx-auto mt-6 mb-6 h-px w-12 bg-white/10" aria-hidden="true" />
          <p className="text-base leading-relaxed text-slate-400 sm:text-[1.05rem] sm:leading-[1.85]">
            Depth across frontend, backend, real-time systems, databases, cloud DevOps, and AI —
            proven across production SaaS platforms, client deliveries, and 1,150+ algorithmic
            challenges.
          </p>
        </div>

        <div
          className="mb-6 flex gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/[0.03] p-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:justify-center [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Technology categories"
        >
          {techStackCategories.map((category) => {
            const isActive = category.id === activeId
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                id={`tech-tab-${category.id}`}
                aria-selected={isActive}
                aria-controls={`tech-panel-${category.id}`}
                onClick={() => setActiveId(category.id)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-colors sm:px-5 sm:text-sm",
                  isActive
                    ? rimTabActive[category.rim]
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200",
                )}
              >
                <span className="sm:hidden">{category.shortLabel}</span>
                <span className="hidden sm:inline">{category.label}</span>
              </button>
            )
          })}
        </div>

        <GlassSurface
          rim={active.rim}
          className={cn(navGlassClassName, "rounded-2xl p-5 sm:p-8")}
        >
          {techStackCategories.map((category) => {
            const isActive = category.id === active.id
            return (
              <div
                key={category.id}
                role="tabpanel"
                id={`tech-panel-${category.id}`}
                aria-labelledby={`tech-tab-${category.id}`}
                hidden={!isActive}
                className={cn(!isActive && "hidden")}
              >
                <h3 className="mb-5 text-sm font-semibold tracking-[0.12em] text-violet-300 uppercase">
                  {category.label}
                </h3>
                <ul className="grid list-none gap-3 sm:grid-cols-2 sm:gap-4" role="list">
                  {category.items.map((item, index) => (
                    <SkillRow key={item.name} item={item} rim={category.rim} index={index} />
                  ))}
                </ul>
              </div>
            )
          })}
        </GlassSurface>
      </div>
    </section>
  )
}
