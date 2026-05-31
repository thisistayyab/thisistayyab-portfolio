import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { Button } from './button';

type HeroCtaLinkBaseProps = {
  variant?: 'primary' | 'secondary';
  className?: string;
  children: ReactNode;
};

type HeroCtaAnchorProps = HeroCtaLinkBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type HeroCtaRouterLinkProps = HeroCtaLinkBaseProps &
  LinkProps & {
    to: LinkProps['to'];
  };

export function HeroCtaLink(props: HeroCtaAnchorProps | HeroCtaRouterLinkProps) {
  const { variant = 'primary', className, children, ...rest } = props;
  const buttonVariant = variant === 'primary' ? 'cta' : 'ctaSecondary';

  if ('to' in rest) {
    return (
      <Button variant={buttonVariant} size="cta" asChild className={className}>
        <Link {...(rest as LinkProps)}>{children}</Link>
      </Button>
    );
  }

  return (
    <Button variant={buttonVariant} size="cta" asChild className={className}>
      <a {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>{children}</a>
    </Button>
  );
}
