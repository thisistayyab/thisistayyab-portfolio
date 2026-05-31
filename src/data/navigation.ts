export interface NavItem {
  label: string;
  href: string;
  sectionId?: string;
  /** When false, this link is a standalone page — not synced to scroll position on the home shell */
  scrollSync?: boolean;
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '/', sectionId: 'home' },
  { label: 'About', href: '/about', scrollSync: false },
  { label: 'Projects', href: '/projects', scrollSync: false },
  { label: 'Experience', href: '/experience', sectionId: 'experience' },
  { label: 'Testimonials', href: '/testimonials', sectionId: 'client' },
  { label: 'Services', href: '/services', sectionId: 'services' },
  { label: 'Insights', href: '/insights', sectionId: 'blog' },
  { label: 'Contact', href: '/contact', sectionId: 'contact' },
];

export const scrollSyncNavItems = navItems.filter(
  (item): item is NavItem & { sectionId: string } =>
    item.scrollSync !== false && Boolean(item.sectionId),
);
