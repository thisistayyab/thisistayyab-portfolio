export type TextSegment = {
  text: string;
  bold?: boolean;
};

export type ProjectTag = {
  label: string;
  variant: 'tech' | 'feature';
};

export const projectsHomeContent = {
  eyebrow: 'Projects',
  headingBefore: 'Live products built with',
  headingHighlight: 'real users',
  headingAfter: 'in mind',
  subtext:
    'Deployed full-stack applications used by real people — not just UI concepts or course projects.',
  ctaLabel: 'View all projects',
  ctaHref: '/projects',
} as const;

export const projectsPageContent = {
  h1: 'All projects',
  intro:
    'Full-stack web apps, SaaS products, and client work — React, Node.js, PostgreSQL, and APIs built for production traffic and real users.',
} as const;

export const PROJECT_CARD_EXCERPT_LENGTH = 120;
export const PROJECT_CARD_MAX_TAGS = 5;

export function getProjectExcerpt(
  description: string,
  maxLength = PROJECT_CARD_EXCERPT_LENGTH,
): string {
  if (description.length <= maxLength) {
    return description;
  }

  const trimmed = description.slice(0, maxLength).trim();
  const lastSpace = trimmed.lastIndexOf(' ');
  const base = lastSpace > 80 ? trimmed.slice(0, lastSpace) : trimmed;
  return `${base}…`;
}
