import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, filters, Project } from '../data/projects';

function Projects() {
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [active, setActive] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleViewMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 3);
      setIsLoading(false);
    }, 500);
  };

  const filteredProjects =
    active === 'all' ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="section__container project__container" id="project" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Blurred Circle Background */}
      <div style={{
        position: 'absolute',
        top: '60%',
        left: '70%',
        width: 180,
        height: 180,
        background: '#7952B3',
        borderRadius: '50%',
        filter: 'blur(90px)',
        opacity: 0.13,
        zIndex: 0,
      }} />
      <motion.div
        className="project__header"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="section__header">My Projects</h2>
        <div className="project__nav">
          {filters.map((filter, i) => (
            <motion.button
              key={filter.value}
              className={`btn project__btn${active === filter.value ? ' mixitup-control-active' : ''}`}
              title={`Filter by ${filter.label}`}
              aria-label={`Filter projects by ${filter.label}`}
              onClick={() => {
                setActive(filter.value);
                setVisibleCount(6);
              }}

              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {filter.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
      <motion.div
        className="project__grid"
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >

        {filteredProjects.slice(0, visibleCount).map((project, i) => (
          <motion.div
            key={project.id}
            className={`project__card mix ${project.category}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              delay: Math.min(i * 0.1, 0.5),
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            {project.link ? (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={project.img}
                  alt={`${project.name} project screenshot`}
                  loading="lazy"
                />
              </a>
            ) : (
              <img
                src={project.img}
                alt={`${project.name} project screenshot`}
                loading="lazy"
              />
            )}
            <div className="project__info">

              <h3 className="project__name">{project.name}</h3>
              {/* Show only limited desc here */}
              <p className="project__desc">
                {project.description.slice(0, 80)}...
              </p>
              {project.technologies && project.technologies.map((tech, idx) => (
                <motion.div
                  className="project__techrow"
                  key={tech.label + idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.3 + idx * 0.1,
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  <span className="project__techlabel">{tech.label}</span>
                  <div className="project__techloadingbar-outer">
                    <motion.div
                      className="project__techloadingbar-inner"
                      style={{ background: tech.color }}
                      initial={{ width: 0 }}
                      animate={{ width: tech.width }}
                      transition={{
                        delay: 0.5 + idx * 0.1,
                        duration: 0.8,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                    />
                  </div>
                </motion.div>
              ))}
              <div className="project__buttons">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project__liveview"
                  >
                    {project.button}
                  </a>
                )}
                <button
                  className="project__liveview"
                  onClick={() => setSelectedProject(project)}
                >
                  Learn More
                </button>
              </div>
            </div>

          </motion.div>
        ))}
      </motion.div>
      {visibleCount < filteredProjects.length && (
        <motion.div
          layout
          style={{ textAlign: "center", marginTop: "4rem" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            className="project__liveview"
            onClick={handleViewMore}
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.05 }}
            whileTap={{ scale: isLoading ? 1 : 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {isLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="loader"></span>
                Loading...
              </span>
            ) : (
              'View More'
            )}
          </motion.button>
        </motion.div>
      )}

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project__modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => {
              if ((e.target as HTMLElement).classList.contains("project__modal")) {
                setSelectedProject(null);
              }
            }}
          >
            <motion.div
              className="project__modal-content"
              initial={{ scale: 0.8, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="project__modal-close"
                onClick={() => setSelectedProject(null)}
              >
                ✕
              </button>

              <img
                src={selectedProject.img}
                alt={`${selectedProject.name} detailed project screenshot`}
                className="project__modal-img"
              />
              <h2>{selectedProject.name}</h2>
              <p>{selectedProject.description}</p>

              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: '1rem' }}
                  className="project__liveview"
                >
                  Visit Site
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


    </section>
  );
}

export default Projects;
