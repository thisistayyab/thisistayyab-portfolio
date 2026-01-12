import { ComponentType } from 'react';
import { RiGithubFill, RiLinkedinFill, RiBriefcaseLine } from 'react-icons/ri';
import { SiUpwork, SiFiverr, SiFreelancer, SiLeetcode, SiCredly } from 'react-icons/si';

export interface Profile {
  id: number;
  name: string;
  Icon: ComponentType<{ size?: number }>;
  iconSize: number;
  color: string;
  description: string;
  link: string;
  button: string;
}

export const profiles: Profile[] = [
  {
    id: 1,
    name: 'Upwork',
    Icon: SiUpwork,
    iconSize: 32,
    color: '#14a800',
    description: 'Check out my Upwork profile where I offer freelance full-stack development services.',
    link: 'https://www.upwork.com/freelancers/~015384474940802080',
    button: 'View Profile',
  },
  {
    id: 2,
    name: 'Fiverr',
    Icon: SiFiverr,
    iconSize: 32,
    color: '#1dbf73',
    description: 'Explore my Fiverr gigs covering modern web apps, portfolio sites, and custom solutions.',
    link: 'https://www.fiverr.com/thisistayyab',
    button: 'View Profile',
  },
  {
    id: 3,
    name: 'Freelancer',
    Icon: SiFreelancer,
    iconSize: 32,
    color: '#29b2fe',
    description: 'Check out my Freelancer profile where I deliver web apps, CRM systems, and tailored solutions.',
    link: 'https://www.freelancer.com/u/thisistayyab',
    button: 'View Profile',
  },
  {
    id: 4,
    name: 'Truelancer',
    Icon: RiBriefcaseLine,
    iconSize: 32,
    color: '#0d6efd',
    description: 'Browse my Truelancer profile for professional projects in web development and custom applications.',
    link: 'https://www.truelancer.com/freelancer/tayyabaslam19',
    button: 'View Profile',
  },
  {
    id: 5,
    name: 'GitHub',
    Icon: RiGithubFill,
    iconSize: 32,
    color: '#ffffff',
    description: 'Browse my GitHub repositories including full-stack apps, experiments, and open-source projects.',
    link: 'https://github.com/thisistayyab',
    button: 'View Repos',
  },
  {
    id: 6,
    name: 'LinkedIn',
    Icon: RiLinkedinFill,
    iconSize: 32,
    color: '#0077b5',
    description: 'Connect with me on LinkedIn to view my professional journey, skills, and endorsements.',
    link: 'https://pk.linkedin.com/in/thisistayyab',
    button: 'Connect',
  },
  {
    id: 7,
    name: 'LeetCode',
    Icon: SiLeetcode,
    iconSize: 32,
    color: '#ffa116',
    description: 'Explore my LeetCode profile where I solved 1150+ problems, showcasing strong DSA and problem-solving skills.',
    link: 'https://leetcode.com/u/thisistayyab/',
    button: 'View Profile',
  },
  {
    id: 8,
    name: 'Credly',
    Icon: SiCredly,
    iconSize: 32,
    color: '#ff6b00',
    description: 'Check out my Credly profile to view verified certifications that highlight my technical expertise and achievements.',
    link: 'https://www.credly.com/users/thisistayyab',
    button: 'View Profile',
  },
];
