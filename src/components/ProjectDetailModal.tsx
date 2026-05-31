import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import type { Project } from '../data/projects';
import { Button } from './ui/button';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

const baseUrl = 'https://thisistayyab.dev';

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[3000] flex items-center justify-center bg-[rgba(6,8,14,0.88)] p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={event => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          aria-describedby="project-modal-description"
        >
          <motion.article
            id="project-modal"
            className="project-modal-scrollbar relative max-h-[90vh] w-full max-w-[720px] overflow-y-auto rounded-2xl border border-white/10 bg-[rgba(14,16,24,0.96)] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.55),0_0_40px_rgba(59,130,246,0.12)] sm:p-8"
            initial={{ scale: 0.96, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 16 }}
            transition={{ duration: 0.28 }}
            onClick={event => event.stopPropagation()}
            itemScope
            itemType="https://schema.org/SoftwareApplication"
          >
            <button
              type="button"
              className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-white/20 hover:bg-white/10"
              onClick={onClose}
              aria-label="Close project details"
            >
              <X className="size-5" aria-hidden="true" />
            </button>

            <img
              src={project.img}
              alt={`${project.name} — full project screenshot`}
              className="mb-6 w-full rounded-xl border border-white/10 object-cover"
              width={720}
              height={405}
              loading="lazy"
              itemProp="image"
            />

            <h2
              id="project-modal-title"
              className="pr-10 text-2xl font-bold text-white sm:text-3xl"
              itemProp="name"
            >
              {project.name}
            </h2>

            <p
              id="project-modal-description"
              className="mt-4 text-base leading-relaxed text-slate-400"
              itemProp="description"
            >
              {project.description}
            </p>

            <link itemProp="url" href={project.link || `${baseUrl}/projects#project-${project.id}`} />

            {project.technologies.length > 0 ? (
              <div className="mt-6">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Stack
                </h3>
                <ul className="flex flex-wrap gap-2 list-none">
                  {project.technologies.map(tech => (
                    <li key={tech.label}>
                      <span
                        className="rounded-full border px-3 py-1 text-sm font-medium"
                        style={{
                          color: tech.color,
                          borderColor: `${tech.color}55`,
                          backgroundColor: `${tech.color}18`,
                        }}
                      >
                        {tech.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {project.link ? (
              <div className="hero-actions mt-8">
                <Button variant="cta" size="cta" asChild>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Open ${project.name}`}
                  >
                    {project.button}
                    <ExternalLink aria-hidden="true" />
                  </a>
                </Button>
              </div>
            ) : null}
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
