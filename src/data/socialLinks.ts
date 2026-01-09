import { ComponentType } from 'react';
import { RiMailLine, RiGithubFill, RiLinkedinFill } from 'react-icons/ri';
import { SiLeetcode } from 'react-icons/si';

export interface SocialLink {
  Icon: ComponentType<{ size?: number }>;
  size: number;
  href: string;
  ariaLabel: string;
  color: string;
}

export const socialLinks: SocialLink[] = [
  {
    Icon: RiMailLine,
    size: 20,
    href: "mailto:thisistayyab@outlook.com?subject=Let's%20Connect&body=Hi%20Tayyab,%0D%0A%0D%0A",
    ariaLabel: "Email Me",
    color: '#0078d4'
  },
  {
    Icon: RiGithubFill,
    size: 20,
    href: "https://github.com/thisistayyab",
    ariaLabel: "GitHub Profile",
    color: '#ffffff'
  },
  {
    Icon: RiLinkedinFill,
    size: 20,
    href: "https://www.linkedin.com/in/thisistayyab/",
    ariaLabel: "LinkedIn Profile",
    color: '#0077b5'
  },
  {
    Icon: SiLeetcode,
    size: 20,
    href: "https://leetcode.com/u/thisistayyab/",
    ariaLabel: "LeetCode Profile",
    color: '#ffa116'
  }
];

export const socialLinksHeader: SocialLink[] = [
  {
    Icon: RiMailLine,
    size: 24,
    href: "mailto:thisistayyab@outlook.com?subject=Let's%20Connect&body=Hi%20Tayyab,%0D%0A%0D%0A",
    ariaLabel: "Email Me",
    color: '#0078d4'
  },
  {
    Icon: RiGithubFill,
    size: 24,
    href: "https://github.com/thisistayyab",
    ariaLabel: "Visit GitHub Profile",
    color: '#ffffff'
  },
  {
    Icon: RiLinkedinFill,
    size: 24,
    href: "https://www.linkedin.com/in/thisistayyab/",
    ariaLabel: "Visit LinkedIn Profile",
    color: '#0077b5'
  },
  {
    Icon: SiLeetcode,
    size: 24,
    href: "https://leetcode.com/u/thisistayyab/",
    ariaLabel: "Visit LeetCode Profile",
    color: '#ffa116'
  }
];
