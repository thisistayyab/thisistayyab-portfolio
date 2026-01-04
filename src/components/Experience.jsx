import React from 'react';
import { motion } from 'framer-motion';
import { RiBriefcaseLine, RiCodeSSlashLine, RiGraduationCapLine } from 'react-icons/ri';

const experiences = [
  {
    id: 1,
    type: 'work',
    icon: <RiBriefcaseLine size={32} />,
    color: '#3b82f6',
    title: 'Full Stack Developer',
    company: 'Freelance',
    period: '2021 - Present',
    description: 'Building full-stack web applications using React, Node.js, Express, and MongoDB. Delivered 50+ projects for clients worldwide, specializing in modern, responsive UIs and scalable backend solutions.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'TypeScript']
  },
  {
    id: 2,
    type: 'work',
    icon: <RiCodeSSlashLine size={32} />,
    color: '#8b5cf6',
    title: 'Problem Solver',
    company: 'LeetCode',
    period: '2020 - Present',
    description: 'Solved 1150+ algorithmic problems, strengthening expertise in Data Structures and Algorithms. This experience enhances my ability to write optimized, efficient code for production applications.',
    technologies: ['DSA', 'Algorithms', 'Problem Solving', 'Optimization']
  },
  {
    id: 3,
    type: 'education',
    icon: <RiGraduationCapLine size={32} />,
    color: '#ec4899',
    title: 'Computer Engineering Student',
    company: 'University',
    period: 'Ongoing',
    description: 'Pursuing Computer Engineering with focus on software development, AI/ML, and system design. Combining theoretical knowledge with practical experience to build innovative solutions.',
    technologies: ['Computer Science', 'AI/ML', 'System Design', 'Software Engineering']
  }
];

function Experience() {
  return (
    <section className="section__container experience__container" id="experience" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Blurred Circle Background */}
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '10%',
        width: 200,
        height: 200,
        background: '#3b82f6',
        borderRadius: '50%',
        filter: 'blur(100px)',
        opacity: 0.15,
        zIndex: 0,
      }} />
      
      <motion.h2
        className="section__header"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        Experience
      </motion.h2>
      
      <motion.p
        className="section__description"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        viewport={{ once: true }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        My journey in software development, from learning to building production-ready applications
      </motion.p>

      <div className="experience__grid" style={{ position: 'relative', zIndex: 2, marginTop: '4rem' }}>
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.id}
            className="experience__card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.7 }}
            viewport={{ once: true }}
            style={{ 
              '--experience-color': exp.color,
              '--experience-color-rgb': exp.color === '#3b82f6' ? '59, 130, 246' : exp.color === '#8b5cf6' ? '139, 92, 246' : '236, 72, 153',
              '--badge-color': exp.color,
              '--badge-color-rgb': exp.color === '#3b82f6' ? '59, 130, 246' : exp.color === '#8b5cf6' ? '139, 92, 246' : '236, 72, 153'
            }}
          >
            <div className="experience__icon" style={{ color: exp.color }}>
              {exp.icon}
            </div>
            <div className="experience__badge" style={{ '--badge-color': exp.color }}>
              {exp.type === 'work' ? 'Work' : 'Education'}
            </div>
            <h3>{exp.title}</h3>
            <h4>{exp.company} <span>• {exp.period}</span></h4>
            <p>{exp.description}</p>
            <div className="experience__tech">
              {exp.technologies.map((tech, idx) => (
                <span key={idx} className="experience__tech-tag">{tech}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Experience;


