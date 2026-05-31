import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects, type Project } from '../data/projects';
import { projectsPageContent } from '../data/projectsContent';
import AppAppBar from '../components/Appbar';
import Footer from '../components/Footer';
import { GlobalBackground } from '../components/GlobalBackground';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
import { SEOHead } from '../components/SEOHead';

interface ProjectsPageProps {
  isDesktop: boolean;
}

const baseUrl = 'https://thisistayyab.dev';

export function ProjectsPage({ isDesktop }: ProjectsPageProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${baseUrl}/projects`,
      name: "Tayyab's Web Development Projects",
      description: projectsPageContent.intro,
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'SoftwareApplication',
          '@id': `${baseUrl}/projects#project-${project.id}`,
          name: project.name,
          description: project.description,
          url: project.link || `${baseUrl}/projects#project-${project.id}`,
          applicationCategory: 'WebApplication',
          operatingSystem: 'Web Browser',
          author: {
            '@type': 'Person',
            name: 'Tayyab',
            url: baseUrl,
            jobTitle: 'Full Stack Developer',
          },
        },
      })),
    };

    const breadcrumbData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: `${baseUrl}/projects` },
      ],
    };

    const script1 = document.createElement('script');
    script1.id = 'projects-page-structured-data';
    script1.type = 'application/ld+json';
    script1.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.id = 'projects-page-breadcrumb-data';
    script2.type = 'application/ld+json';
    script2.textContent = JSON.stringify(breadcrumbData);
    document.head.appendChild(script2);

    return () => {
      document.getElementById('projects-page-structured-data')?.remove();
      document.getElementById('projects-page-breadcrumb-data')?.remove();
    };
  }, []);

  return (
    <>
      <SEOHead />
      <GlobalBackground isDesktop={isDesktop} showTechIcons={true} />
      <AppAppBar />

      <main
        id="main-content"
        role="main"
        tabIndex={-1}
        className="relative z-[5] pt-[calc(var(--template-frame-height,0px)+88px)]"
      >
        <article className="mx-auto max-w-[1200px] px-4 pb-20 sm:px-6 lg:px-4">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-8 pt-4"
          >
            <Link
              to="/"
              className="inline-flex items-center text-sm text-slate-400 transition-all hover:pl-2 hover:text-white"
            >
              <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
              Back to home
            </Link>
          </motion.div>

          <motion.header
            className="mx-auto mb-12 max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300/70">
              Portfolio
            </p>
            <h1 className="text-[clamp(2rem,5vw,2.75rem)] font-bold leading-tight text-white">
              {projectsPageContent.h1}
            </h1>
            <div className="mx-auto mt-6 mb-6 h-px w-12 bg-white/15" aria-hidden="true" />
            <p className="text-base leading-relaxed text-slate-400 sm:text-lg">
              {projectsPageContent.intro}
            </p>
          </motion.header>

          <ul
            className="grid list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
            aria-label="All portfolio projects"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onLearnMore={setSelectedProject}
              />
            ))}
          </ul>
        </article>

        <Footer />
      </main>

      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}

export default ProjectsPage;
