import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import type { Project } from '../data/projects';
import {
  getProjectExcerpt,
  PROJECT_CARD_MAX_TAGS,
} from '../data/projectsContent';
import { Button } from './ui/button';

interface ProjectCardProps {
  project: Project;
  index?: number;
  onLearnMore: (project: Project) => void;
}

function getProjectCardTags(project: Project) {
  if (project.tags?.length) {
    return project.tags.slice(0, PROJECT_CARD_MAX_TAGS);
  }

  return project.technologies.slice(0, PROJECT_CARD_MAX_TAGS).map(tech => ({
    label: tech.label,
    variant: 'tech' as const,
  }));
}

export function ProjectCard({ project, index = 0, onLearnMore }: ProjectCardProps) {
  const projectId = `project-${project.id}`;
  const displayTags = getProjectCardTags(project);
  const cardExcerpt = getProjectExcerpt(project.description);

  return (
    <motion.li
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        delay: Math.min(index * 0.08, 0.32),
        duration: 0.55,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="group list-none"
    >
      <article
        id={projectId}
        className="project-card flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-[border-color,box-shadow,transform] duration-300 hover:border-white/20 hover:shadow-[0_16px_48px_rgba(0,0,0,0.28),0_0_32px_rgba(59,130,246,0.12)]"
        itemScope
        itemType="https://schema.org/SoftwareApplication"
      >
        <meta itemProp="applicationCategory" content="WebApplication" />
        <meta itemProp="operatingSystem" content="Web Browser" />

        <div className="relative aspect-[16/10] overflow-hidden bg-[linear-gradient(135deg,#12141c,#1a1d2b)]">
          <img
            src={project.img}
            alt={`${project.name} — project screenshot`}
            loading="lazy"
            width={640}
            height={400}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            itemProp="image"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0c10]/90 via-[#0a0c10]/20 to-transparent"
            aria-hidden="true"
          />
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3
            className="text-lg font-semibold tracking-tight text-white sm:text-xl"
            itemProp="name"
          >
            {project.name}
          </h3>

          <p
            className="mt-2 min-h-[4.75rem] flex-1 text-sm leading-relaxed text-slate-400 line-clamp-3 sm:min-h-[5.1rem] sm:text-[0.95rem] sm:leading-[1.75]"
            title={project.description}
          >
            {cardExcerpt}
          </p>
          <p className="sr-only" itemProp="description">
            {project.description}
          </p>

          <ul
            className="mt-4 flex min-h-[2rem] flex-wrap gap-2 list-none"
            aria-label={`${project.name} tech stack`}
          >
            {displayTags.map(tag => (
              <li key={tag.label}>
                <span
                  className={
                    tag.variant === 'feature'
                      ? 'rounded-full border border-cyan-500/35 bg-cyan-500/[0.06] px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-cyan-300/90'
                      : 'rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-slate-300'
                  }
                >
                  {tag.label}
                </span>
              </li>
            ))}
          </ul>

          <div className="hero-actions mt-5">
            {project.link ? (
              <Button variant="cta" size="cta" asChild>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Open ${project.name} — opens in a new tab`}
                  aria-label={`Open ${project.name} live site`}
                >
                  {project.button}
                  <ExternalLink aria-hidden="true" />
                </a>
              </Button>
            ) : null}
            <Button
              type="button"
              variant="ctaLink"
              size="cta"
              onClick={() => onLearnMore(project)}
              aria-label={`Read more about ${project.name}`}
            >
              Learn more
            </Button>
          </div>
        </div>
      </article>
    </motion.li>
  );
}
