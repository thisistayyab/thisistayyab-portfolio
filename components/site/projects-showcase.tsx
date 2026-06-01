"use client"

import { useState } from "react"

import type { PortfolioProject } from "@/components/site/project-card"
import { ProjectCard } from "@/components/site/project-card"
import { ProjectDetailModal } from "@/components/site/project-detail-modal"

type ProjectsShowcaseProps = {
  projects: PortfolioProject[]
  listLabel?: string
}

export function ProjectsShowcase({
  projects,
  listLabel = "Portfolio projects",
}: ProjectsShowcaseProps) {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null)

  return (
    <>
      <ul
        className="grid list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label={listLabel}
      >
        {projects.map((project, index) => (
          <li key={project.id} className="list-none">
            <ProjectCard
              project={project}
              onLearnMore={setSelectedProject}
              priority={index < 3}
            />
          </li>
        ))}
      </ul>

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}
