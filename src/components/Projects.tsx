import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects as localProjects, filters, Project } from '../data/projects';
// import { supabase } from '../lib/supabase'; // COMMENTED OUT - Using mock data for performance
import { Card } from './ui/card';
import { Button } from './ui/button';
import { X } from 'lucide-react';

function Projects() {
  const [projects, setProjects] = useState<Project[]>(localProjects);
  const [loading, setLoading] = useState(false); // No loading needed with mock data
  const [visibleCount, setVisibleCount] = useState<number>(3);
  const [active, setActive] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const baseUrl = 'https://thisistayyab.dev';

  // COMMENTED OUT - Using mock data directly for performance
  // useEffect(() => {
  //   fetchProjects();
  // }, []);

  // const fetchProjects = async () => {
  //   try {
  //     const { data, error } = await supabase
  //       .from('projects')
  //       .select('*')
  //       .eq('is_active', true)
  //       .order('display_order', { ascending: true });

  //     if (error) throw error;

  //     // Transform Supabase data to match component expectations
  //     const transformed = data?.map((p) => ({
  //       id: p.project_id,
  //       category: p.category,
  //       img: p.img,
  //       link: p.link,
  //       name: p.name,
  //       description: p.description,
  //       technologies: p.technologies,
  //       button: p.button,
  //     })) || [];

  //     setProjects(transformed.length > 0 ? transformed : localProjects);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Error fetching projects:', error);
  //     // Fallback to local data
  //     setProjects(localProjects);
  //     setLoading(false);
  //   }
  // };

  const handleViewMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 3);
      setIsLoading(false);
    }, 500);
  };

  const filteredProjects =
    active === 'all' ? projects : projects.filter((p) => p.category === active);

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  // Inject structured data into document head (better for SEO than inline)
  useEffect(() => {
    if (projects.length === 0) return;

    // Remove existing script if any
    const existingScript = document.getElementById('projects-structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    // Create structured data with ALL projects (not just visible ones)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${baseUrl}/#project`,
      "name": "Tayyab's Web Development Projects Portfolio - Full Stack Developer Projects",
      "description": "Professional portfolio showcasing full-stack web development projects built with React, Node.js, Express.js, MongoDB, and modern web technologies. Expert MERN stack developer demonstrating expertise in building scalable web applications, RESTful APIs, and responsive frontend interfaces.",
      "itemListElement": projects.map((project, index) => {
        const projectUrl = project.link || `${baseUrl}/#project-${project.id}`;
        // Handle image URL - if it's a relative path, it's likely in /src/assets, so we'll use the project link or a placeholder
        // For SPA, we'll use the project's live URL if available, otherwise the canonical project URL
        const imageUrl = project.img.startsWith('http')
          ? project.img
          : project.link
            ? `${project.link}/og-image.jpg` // Assuming projects might have OG images
            : `${baseUrl}/project-${project.id}.jpg`; // Fallback to a predictable URL structure

        return {
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "SoftwareApplication",
            "@id": `${baseUrl}/#project-${project.id}`,
            "name": project.name,
            "description": project.description,
            "url": projectUrl,
            "applicationCategory": "WebApplication",
            "operatingSystem": "Web Browser",
            "author": {
              "@type": "Person",
              "@id": `${baseUrl}/#person`,
              "name": "Tayyab",
              "url": baseUrl,
              "jobTitle": "Full Stack Developer"
            },
            "datePublished": "2023-01-01",
            "image": imageUrl ? {
              "@type": "ImageObject",
              "url": imageUrl,
              "width": 400,
              "height": 220
            } : undefined,
            "softwareVersion": "1.0",
            "browserRequirements": "Requires JavaScript. Requires HTML5. Requires CSS3.",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            },
            "creator": {
              "@type": "Person",
              "@id": `${baseUrl}/#person`,
              "name": "Tayyab",
              "url": baseUrl
            },
            "programmingLanguage": project.technologies?.map(t => t.label).join(", ") || "JavaScript",
            "keywords": project.technologies?.map(t => t.label).join(", ") || "Web Development"
          }
        };
      })
    };

    // Breadcrumb schema for Projects section
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": baseUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Projects Portfolio",
          "item": `${baseUrl}/#project`
        }
      ]
    };

    // Inject ItemList schema
    const script1 = document.createElement('script');
    script1.id = 'projects-structured-data';
    script1.type = 'application/ld+json';
    script1.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script1);

    // Inject Breadcrumb schema
    const script2 = document.createElement('script');
    script2.id = 'projects-breadcrumb-data';
    script2.type = 'application/ld+json';
    script2.textContent = JSON.stringify(breadcrumbData);
    document.head.appendChild(script2);

    return () => {
      const script1Cleanup = document.getElementById('projects-structured-data');
      const script2Cleanup = document.getElementById('projects-breadcrumb-data');
      if (script1Cleanup) script1Cleanup.remove();
      if (script2Cleanup) script2Cleanup.remove();
    };
  }, [projects]); // Update when projects change

  if (loading) {
    return (
      <section className="max-w-[1200px] mx-auto px-4 py-20 relative" id="project" aria-labelledby="project-heading">
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="max-w-[1200px] mx-auto px-4 py-20 relative overflow-hidden"
      id="project"
      aria-labelledby="projects-heading"
      role="region"
    >
      {/* Blurred Circle Background */}
      <div
        className="absolute top-[60%] left-[70%] w-[180px] h-[180px] bg-[#7952B3] rounded-full blur-[90px] opacity-[0.13] z-0"
        aria-hidden="true"
      />

      {/* Header */}
      <motion.div
        className="mb-16 flex flex-col items-center justify-between gap-8"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 id="projects-heading" className="text-4xl font-semibold text-center">
          Full Stack Web Development Projects | React & Node.js Portfolio
        </h2>
        <p className="sr-only">
          Professional portfolio showcasing full-stack web development projects built with React, Node.js, Express.js, MongoDB, and modern web technologies. Expert MERN stack developer demonstrating expertise in building scalable web applications.
        </p>
        <nav className="flex justify-center flex-wrap gap-4" aria-label="Project filters">
          {filters.map((filter, i) => (
            <motion.div
              key={filter.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Button
                variant="default"
                onClick={() => {
                  setActive(filter.value);
                  setVisibleCount(6);
                }}
                className={active === filter.value
                  ? "bg-[linear-gradient(135deg,rgba(59,130,246,0.3),rgba(139,92,246,0.3))] border-[rgba(59,130,246,0.8)] shadow-[0_0_20px_rgba(59,130,246,0.6),0_0_40px_rgba(139,92,246,0.3)] -translate-y-0.5"
                  : ""
                }
                title={`Filter by ${filter.label}`}
                aria-label={`Filter projects by ${filter.label}`}
                aria-pressed={active === filter.value}
              >
                {filter.label}
              </Button>
            </motion.div>
          ))}
        </nav>
      </motion.div>

      {/* Projects Grid */}
      <motion.ul
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 list-none"
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        role="list"
        aria-label="Portfolio projects grid"
      >
        {visibleProjects.map((project, i) => {
          const projectId = `project-${project.id}`;
          return (
            <motion.li
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: Math.min(i * 0.1, 0.5),
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="group"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <article
                id={projectId}
                className="h-full"
                itemScope
                itemType="https://schema.org/SoftwareApplication"
              >
                <meta itemProp="position" content={String(i + 1)} />
                <meta itemProp="applicationCategory" content="WebApplication" />
                <meta itemProp="operatingSystem" content="Web Browser" />
                <div itemProp="offers" itemScope itemType="https://schema.org/Offer" style={{ display: 'none' }}>
                  <meta itemProp="price" content="0" />
                  <meta itemProp="priceCurrency" content="USD" />
                </div>
                <Card
                  className="p-0 overflow-hidden h-full flex flex-col"
                  glowColor="rgba(59, 130, 246, 0.1)"
                  hoverScale={false}
                  hoverLift={false}
                >
                  {/* Project Image - Fixed height, stretches to cover entire area with no blank space */}
                  <div className="relative w-full h-[220px] overflow-hidden bg-[linear-gradient(135deg,#1e1e2f,#2d2d44)] m-0 p-0">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 w-full h-full block overflow-hidden m-0 p-0"
                        aria-label={`Visit ${project.name} live project - Opens in new tab`}
                        itemProp="url"
                      >
                        <img
                          src={project.img}
                          alt={`${project.name} - ${project.description.slice(0, 60)}... Screenshot of the web application interface showing key features and design.`}
                          loading="lazy"
                          width={400}
                          height={220}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110"
                          style={{ minWidth: '100%', minHeight: '100%' }}
                          itemProp="image"
                        />
                        <span
                          className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.3)_100%)] opacity-0 transition-opacity duration-300 ease-in-out pointer-events-none group-hover:opacity-100 z-[1]"
                          aria-hidden="true"
                        />
                      </a>
                    ) : (
                      <div className="absolute inset-0 w-full h-full overflow-hidden m-0 p-0">
                        <img
                          src={project.img}
                          alt={`${project.name} - ${project.description.slice(0, 60)}... Screenshot of the web application interface showing key features and design.`}
                          loading="lazy"
                          width={400}
                          height={220}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110"
                          style={{ minWidth: '100%', minHeight: '100%' }}
                          itemProp="image"
                        />
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="p-6 sm:p-6 text-left bg-black/20 relative z-[2] max-[860px]:px-2 max-[860px]:py-3 flex-1 flex flex-col">
                    <h3
                      id={`${projectId}-title`}
                      className="text-xl sm:text-xl max-[860px]:text-base font-bold mb-3 text-white bg-[linear-gradient(135deg,#ffffff,#94a3b8)] bg-clip-text text-transparent transition-all duration-300 ease-in-out group-hover:bg-[linear-gradient(135deg,#3b82f6,#8b5cf6)] group-hover:bg-clip-text"
                      itemProp="name"
                    >
                      {project.name}
                    </h3>

                    <p
                      id={`${projectId}-description`}
                      className="text-[0.95rem] sm:text-[0.95rem] max-[860px]:text-[0.9rem] text-[#94a3b8] mb-4 leading-[1.6] opacity-90 flex-grow"
                      itemProp="description"
                    >
                      {project.description.slice(0, 80)}...
                    </p>
                    {/* Full description for SEO - hidden but accessible to crawlers */}
                    <div className="sr-only" itemProp="description">
                      {project.description}
                    </div>
                    {/* Canonical URL for each project */}
                    <link itemProp="url" href={project.link || `${baseUrl}/#project-${project.id}`} />
                    <meta itemProp="datePublished" content="2023-01-01" />
                    <meta itemProp="softwareVersion" content="1.0" />

                    {/* Technology Bars */}
                    {project.technologies && (
                      <div className="mb-4" aria-label="Technology stack">
                        {project.technologies.map((tech, idx) => (
                          <motion.div
                            className="flex items-center mb-2"
                            key={tech.label + idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.3 + idx * 0.1,
                              duration: 0.4,
                              ease: [0.4, 0, 0.2, 1]
                            }}
                          >
                            <span className="min-w-[80px] text-[0.98rem] text-[#94a3b8] mr-3 font-medium" aria-label={`${tech.label} proficiency`}>
                              {tech.label}
                            </span>
                            <div className="flex-1 h-[10px] bg-white/5 rounded-[10px] overflow-hidden border border-white/10 relative" role="progressbar" aria-valuenow={parseInt(tech.width)} aria-valuemin={0} aria-valuemax={100} aria-label={`${tech.label} skill level: ${tech.width}`}>
                              <motion.div
                                className="h-full rounded-[10px] relative shadow-[0_0_10px_rgba(59,130,246,0.5)] min-w-0"
                                style={{
                                  background: tech.color,
                                  width: tech.width
                                }}
                                initial={{ width: 0 }}
                                animate={{ width: tech.width }}
                                transition={{
                                  delay: 0.5 + idx * 0.1,
                                  duration: 0.8,
                                  ease: [0.4, 0, 0.2, 1]
                                }}
                              >
                                <span
                                  className="absolute top-0 left-0 right-0 bottom-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] animate-shimmer"
                                  aria-hidden="true"
                                />
                              </motion.div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <nav className="flex flex-col sm:flex-row gap-2 mt-auto" aria-label={`${project.name} project actions`}>
                      {project.link && (
                        <Button
                          asChild
                          variant="default"
                          className="flex-1"
                        >
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit ${project.name} live site - Opens in new tab`}
                            itemProp="url"
                          >
                            {project.button}
                          </a>
                        </Button>
                      )}
                      <Button
                        variant="default"
                        onClick={() => setSelectedProject(project)}
                        className="flex-1"
                        aria-label={`Learn more about ${project.name} project`}
                        aria-expanded={selectedProject?.id === project.id}
                        aria-controls={selectedProject?.id === project.id ? "project-modal" : undefined}
                      >
                        Learn More
                      </Button>
                    </nav>
                  </div>
                </Card>
              </article>
            </motion.li>
          );
        })}
      </motion.ul>


      {/* View More Button */}
      {visibleCount < filteredProjects.length && (
        <motion.div
          layout
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="default"
            onClick={handleViewMore}
            disabled={isLoading}
            className="min-w-[200px]"
            aria-label={isLoading ? "Loading more projects" : "View more projects"}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Loading...
              </span>
            ) : (
              'View More'
            )}
          </Button>
        </motion.div>
      )}

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[3000] flex items-center justify-center bg-[rgba(10,10,20,0.85)] backdrop-blur-sm cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => {
              if ((e.target as HTMLElement).classList.contains("fixed")) {
                setSelectedProject(null);
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <motion.article
              id="project-modal"
              className="bg-[rgba(30,30,47,0.95)] backdrop-blur-[20px] text-white p-6 sm:p-10 rounded-3xl max-w-[700px] w-[90%] max-h-[90vh] overflow-y-auto relative shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(59,130,246,0.2)] border border-white/10 cursor-default project-modal-scrollbar"
              initial={{ scale: 0.8, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              itemScope
              itemType="https://schema.org/SoftwareApplication"
            >
              <button
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 border border-white/20 rounded-[10px] text-white text-2xl cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out z-10 hover:bg-white/20 hover:border-white/30 hover:rotate-90 hover:scale-110 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details modal"
              >
                <X size={20} aria-hidden="true" />
                <span className="sr-only">Close modal</span>
              </button>

              <img
                src={selectedProject.img}
                alt={`${selectedProject.name} - Full project screenshot showing the complete web application interface, design, and key features. ${selectedProject.description.slice(0, 100)}`}
                className="w-full rounded-2xl mb-6 border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
                itemProp="image"
                width={700}
                height={400}
                loading="lazy"
              />

              <h2
                id="modal-title"
                className="text-3xl font-bold mb-4 bg-[linear-gradient(135deg,#ffffff,#94a3b8)] bg-clip-text text-transparent"
                itemProp="name"
              >
                {selectedProject.name}
              </h2>

              <p
                id="modal-description"
                className="text-base leading-[1.8] text-[#94a3b8] mb-6"
                itemProp="description"
              >
                {selectedProject.description}
              </p>

              {/* Additional metadata for modal SEO */}
              <link itemProp="url" href={selectedProject.link || `${baseUrl}/#project-${selectedProject.id}`} />
              <meta itemProp="datePublished" content="2023-01-01" />
              <meta itemProp="softwareVersion" content="1.0" />
              <meta itemProp="softwareVersion" content="1.0" />
              <meta itemProp="applicationCategory" content="WebApplication" />
              <meta itemProp="operatingSystem" content="Web Browser" />
              <div itemProp="offers" itemScope itemType="https://schema.org/Offer" style={{ display: 'none' }}>
                <meta itemProp="price" content="0" />
                <meta itemProp="priceCurrency" content="USD" />
              </div>
              <meta itemProp="browserRequirements" content="Requires JavaScript. Requires HTML5. Requires CSS3." />
              <div itemProp="author" itemScope itemType="https://schema.org/Person" className="sr-only">
                <meta itemProp="name" content="Tayyab" />
                <link itemProp="url" href={baseUrl} />
                <meta itemProp="jobTitle" content="Full Stack Developer" />
              </div>

              {selectedProject.technologies && (
                <div className="mb-6" aria-label="Technologies used">
                  <h3 className="text-lg font-semibold mb-3 text-white">Technologies Used</h3>
                  <ul className="flex flex-wrap gap-2 list-none" role="list">
                    {selectedProject.technologies.map((tech, idx) => (
                      <li key={tech.label + idx} role="listitem">
                        <span
                          className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                          style={{
                            background: `${tech.color}20`,
                            color: tech.color,
                            border: `1px solid ${tech.color}40`
                          }}
                          itemProp="programmingLanguage"
                        >
                          {tech.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedProject.link && (
                <Button
                  asChild
                  variant="default"
                  className="mt-4"
                >
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${selectedProject.name} live site - Opens in new tab`}
                    itemProp="url"
                  >
                    Visit Site
                  </a>
                </Button>
              )}
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Projects;
