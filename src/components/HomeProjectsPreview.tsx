import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { featuredProjects, type Project } from '../data/projects';
import { projectsHomeContent } from '../data/projectsContent';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailModal } from './ProjectDetailModal';
import { HeroCtaLink } from './ui/hero-cta-link';

function HomeProjectsPreview() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section
        id="project"
        className="relative mx-auto max-w-[1200px] px-4 py-20 sm:px-6"
        aria-labelledby="home-projects-heading"
      >
        <div className="relative z-[2]">
          <motion.div
            className="mx-auto mb-12 max-w-3xl text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300/70">
              {projectsHomeContent.eyebrow}
            </p>

            <h2
              id="home-projects-heading"
              className="mx-auto max-w-4xl text-[clamp(1.85rem,5vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-white"
            >
              <span className="block">
                {projectsHomeContent.headingBefore}{' '}
                <span className="hero-title-gradient whitespace-nowrap">
                  {projectsHomeContent.headingHighlight}
                </span>
              </span>
              <span className="block">{projectsHomeContent.headingAfter}</span>
            </h2>

            <div className="mx-auto mt-6 mb-6 h-px w-12 bg-white/15" aria-hidden="true" />

            <p className="text-base leading-relaxed text-slate-400 sm:text-[1.05rem]">
              {projectsHomeContent.subtext}
            </p>
          </motion.div>

          <ul
            className="grid list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
            aria-label="Featured projects"
          >
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onLearnMore={setSelectedProject}
              />
            ))}
          </ul>

          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <HeroCtaLink to={projectsHomeContent.ctaHref} title="View the full project portfolio">
              {projectsHomeContent.ctaLabel}
              <ArrowRight className="size-[1.05rem]" aria-hidden="true" />
            </HeroCtaLink>
          </motion.div>
        </div>
      </section>

      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}

export default HomeProjectsPreview;
