import { ComponentType } from 'react';
import { RiBriefcaseLine, RiCodeSSlashLine, RiGraduationCapLine } from 'react-icons/ri';

export interface Experience {
  id: number;
  type: 'work' | 'education';
  Icon: ComponentType<{ size?: number }>;
  iconSize: number;
  color: string;
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    id: 1,
    type: 'work',
    Icon: RiBriefcaseLine,
    iconSize: 32,
    color: '#14a800',
    title: 'Full Stack Developer',
    company: 'Upwork',
    period: 'Dec 9, 2025 - Present',
    description: 'Working as a specialized hourly full-stack developer, delivering high-quality web solutions. I focus on building robust applications, optimizing performance, and ensuring seamless user experiences for diverse clients.',
    technologies: ['React', 'Node.js', 'Full-Stack Development', 'MERN Stack']
  },
  {
    id: 2,
    type: 'work',
    Icon: RiBriefcaseLine,
    iconSize: 32,
    color: '#1dbf73',
    title: 'Full Stack Developer',
    company: 'Fiverr',
    period: 'Oct 2024 - Present',
    description: 'Developing complete web applications for clients using the MERN stack. My work includes building responsive UIs, creating secure REST APIs, integrating databases, deploying apps, and delivering optimized, scalable solutions.',
    technologies: ['HTML5', 'CSS3', 'MERN Stack', 'REST APIs', 'Database Design']
  },
  {
    id: 3,
    type: 'work',
    Icon: RiCodeSSlashLine,
    iconSize: 32,
    color: '#3b82f6',
    title: 'Full Stack Developer',
    company: 'Taylance Technologies',
    period: 'Apr 2023 - Present',
    description: 'Building modern, scalable software solutions across full-stack web development, AI integration, and automation. Responsible for developing complete MERN applications and designing efficient architectures.',
    technologies: ['Node.js', 'Full-Stack Development', 'AI Integration', 'Automation']
  },
];
