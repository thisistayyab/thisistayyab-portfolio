import React from 'react';
import { ComponentType } from 'react';
import { cn } from '@/lib/utils';

export interface SocialIconProps {
  Icon: ComponentType<{ size?: number }>;
  size?: number;
  href: string;
  ariaLabel: string;
  color: string;
  hoverColor?: string;
  className?: string;
  iconSize?: number;
  title?: string; // Optional custom title for tooltip
  platformName?: string; // Platform name for structured data (e.g., "GitHub", "LinkedIn")
}

// Social media domains that should be prefetched
const SOCIAL_DOMAINS = ['github.com', 'linkedin.com', 'leetcode.com', 'twitter.com', 'x.com', 'instagram.com', 'facebook.com'];

// Check if URL is external (not mailto: or same origin)
const isExternalLink = (href: string): boolean => {
  if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
    return false;
  }
  if (typeof window === 'undefined') {
    // SSR: assume external if it starts with http/https
    return href.startsWith('http://') || href.startsWith('https://');
  }
  try {
    const url = new URL(href, window.location.origin);
    return url.origin !== window.location.origin;
  } catch {
    // If URL parsing fails, assume external if it starts with http/https
    return href.startsWith('http://') || href.startsWith('https://');
  }
};

// Check if domain should be prefetched
const shouldPrefetch = (href: string): boolean => {
  if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
    return false;
  }
  try {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://thisistayyab.dev';
    const url = new URL(href, baseUrl);
    return SOCIAL_DOMAINS.some(domain => url.hostname.includes(domain));
  } catch {
    return false;
  }
};

// Get platform name from URL for structured data
const getPlatformName = (href: string, platformName?: string): string => {
  if (platformName) return platformName;
  
  try {
    const url = new URL(href, window.location.origin);
    const hostname = url.hostname.toLowerCase();
    
    if (hostname.includes('github')) return 'GitHub';
    if (hostname.includes('linkedin')) return 'LinkedIn';
    if (hostname.includes('leetcode')) return 'LeetCode';
    if (hostname.includes('twitter') || hostname.includes('x.com')) return 'Twitter';
    if (hostname.includes('instagram')) return 'Instagram';
    if (hostname.includes('facebook')) return 'Facebook';
    if (href.startsWith('mailto:')) return 'Email';
    
    return 'Social Media';
  } catch {
    return platformName || 'Social Media';
  }
};

export function SocialIcon({
  Icon,
  size = 48,
  href,
  ariaLabel,
  color,
  hoverColor,
  className,
  iconSize,
  title,
  platformName,
}: SocialIconProps) {
  // Use hoverColor if provided, otherwise use the base color
  const effectiveHoverColor = hoverColor || color;
  
  // Calculate icon size - use iconSize prop if provided, otherwise calculate from container size
  const effectiveIconSize = iconSize || Math.round(size * 0.5);

  // Determine if link is external
  const external = isExternalLink(href);
  
  // Determine if should prefetch
  const prefetch = shouldPrefetch(href);
  
  // Get platform name for structured data
  const platform = getPlatformName(href, platformName);
  
  // Generate title tooltip (combines platform name with action)
  const tooltipTitle = title || `${ariaLabel} - Connect with Tayyab on ${platform}`;
  
  // Build rel attributes
  const relAttributes = [];
  if (external) {
    relAttributes.push('noopener', 'noreferrer');
  }
  if (prefetch) {
    relAttributes.push('prefetch');
  }
  const relValue = relAttributes.length > 0 ? relAttributes.join(' ') : undefined;

  // Structured data itemType based on platform
  const getItemType = () => {
    if (href.includes('github')) return 'https://schema.org/ProfilePage';
    if (href.includes('linkedin')) return 'https://schema.org/ProfilePage';
    if (href.startsWith('mailto:')) return 'https://schema.org/ContactPoint';
    return 'https://schema.org/URL';
  };

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      role="link"
      title={tooltipTitle}
      rel={relValue}
      target={external ? '_blank' : undefined}
      itemScope
      itemType={getItemType()}
      itemProp="sameAs"
      className={cn(
        "social-icon flex items-center justify-center rounded-[8px] bg-white/5 backdrop-blur-[10px] border border-white/10 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] relative overflow-hidden no-underline shadow-[0_8px_32px_rgba(0,0,0,0.1)] z-[1] hover:-translate-y-[5px] hover:scale-110 hover:border-[var(--icon-hover-color)]/40 hover:bg-white/5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--icon-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-offset-[3px]",
        className
      )}
      style={
        {
          width: `${size}px`,
          height: `${size}px`,
          fontSize: `${size * 0.27}px`,
          '--icon-color': color,
          '--icon-hover-color': effectiveHoverColor,
        } as React.CSSProperties & {
          '--icon-color': string;
          '--icon-hover-color': string;
        }
      }
    >
      {/* Structured Data - Hidden but accessible to crawlers */}
      <meta itemProp="name" content={platform} />
      <meta itemProp="url" content={href} />
      {external && <meta itemProp="description" content={`Tayyab's ${platform} profile`} />}
      
      {/* Top gradient border - decorative, hidden from screen readers */}
      <span 
        className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--icon-hover-color)] to-white rounded-t-lg scale-x-0 origin-left transition-transform duration-[400ms] ease-in-out group-hover:scale-x-100 z-[2]"
        aria-hidden="true"
      />
      
      {/* Radial glow background - decorative, hidden from screen readers */}
      <span 
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,var(--icon-hover-color)_0%,transparent_70%)] opacity-0 transition-opacity duration-[400ms] ease-in-out pointer-events-none z-0 group-hover:opacity-20"
        aria-hidden="true"
      />
      
      {/* Icon wrapper - icon is decorative since link has aria-label */}
      <span 
        className="relative z-[1] transition-transform duration-300 ease-in-out"
        style={{ color: color } as React.CSSProperties}
        aria-hidden="true"
      >
        <Icon size={effectiveIconSize} aria-hidden="true" />
      </span>
      
      {/* Screen reader only text for additional context */}
      <span className="sr-only">
        {external ? 'Opens in new tab' : ''} {platform} profile link
      </span>
    </a>
  );
}
