"use client"

import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { NavOrb } from "@/components/site/nav-orb"
import {
  navCapsuleClassName,
  navCtaClassName,
  navMobileBrandClassName,
  navMobileLinkActiveClassName,
  navMobileLinkClassName,
  navMobileSheetPanelClassName,
} from "@/components/site/site-styles"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { isBlogPath } from "@/lib/blog/config"
import { letsTalkDescription, letsTalkHref, navItems, SITE_NAME } from "@/lib/site"
import { cn } from "@/lib/utils"

const navLinks = navItems.filter((item) => item.href !== "/contact")

function useActiveHref() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }

    if (href === "/blog") {
      return isBlogPath(pathname)
    }

    return pathname === href
  }

  return { isActive }
}

function navLinkClassName(active: boolean) {
  return cn(
    "shrink-0 rounded-full px-2.5 py-1.5 text-xs font-medium text-white/90 no-underline transition-colors duration-300 sm:px-3 sm:py-2 sm:text-sm lg:px-3.5 lg:py-2",
    "hover:bg-blue-500/10 hover:text-white",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
    active &&
      "bg-blue-500/15 text-white shadow-[inset_0_0_12px_rgba(59,130,246,0.12)]",
  )
}

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const { isActive } = useActiveHref()

  const letsTalkClassName = cn(
    navCtaClassName,
    "shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
    isActive(letsTalkHref) &&
      "shadow-[0_0_36px_rgba(59,130,246,0.24),inset_0_1px_0_rgba(59,130,246,0.2),inset_0_-1px_0_rgba(139,92,246,0.18)]",
  )

  return (
    <>
      <nav
        className="pointer-events-none fixed top-5 right-0 left-0 z-[1100] flex justify-center px-5 sm:px-6 lg:px-4"
        role="navigation"
        aria-label="Main navigation"
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
      >
        <div
          className={cn(
            navCapsuleClassName,
            "pointer-events-auto flex w-full max-w-[min(100%,1200px)] min-w-0 items-center px-5 py-2.5 sm:px-4 lg:w-auto lg:justify-center lg:gap-1 lg:px-6 lg:py-2.5",
          )}
        >
          <div className="flex w-full items-center justify-between gap-4 px-1 lg:hidden">
            <Link
              href="/"
              className={cn(
                navMobileBrandClassName,
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
              )}
              aria-label={`Go to home page - ${SITE_NAME}`}
            >
              {SITE_NAME}
            </Link>

            <Button
              variant="ghost"
              aria-label="Open navigation menu"
              aria-expanded={open}
              aria-controls="mobile-navigation-menu"
              onClick={() => setOpen(true)}
              className="h-9 w-9 min-h-0 rounded-none border-0 bg-transparent p-0 text-white shadow-none hover:bg-transparent hover:text-white/80 [&_svg]:!size-6 [&_svg]:shrink-0"
            >
              <Menu strokeWidth={1.75} aria-hidden="true" />
            </Button>
          </div>

          <ul
            className="hidden list-none items-center gap-1 lg:flex"
            aria-label="Main navigation menu"
          >
            {navLinks.map((item, index) => (
              <li
                key={item.label}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <Link
                  href={item.href}
                  aria-label={item.description}
                  title={`${item.description} - ${SITE_NAME}`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={navLinkClassName(isActive(item.href))}
                  itemProp="url"
                >
                  <span itemProp="name">{item.label}</span>
                  <meta itemProp="position" content={String(index + 1)} />
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={letsTalkHref}
            className={cn(letsTalkClassName, "hidden lg:ml-6 lg:inline-flex")}
            aria-label={letsTalkDescription}
            aria-current={isActive(letsTalkHref) ? "page" : undefined}
            title={`${letsTalkDescription} - ${SITE_NAME}`}
          >
            <NavOrb />
            <span>Let&apos;s Talk</span>
          </Link>
        </div>
      </nav>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          id="mobile-navigation-menu"
          aria-label="Mobile navigation menu"
          overlayClassName="bg-black/78 backdrop-blur-[12px]"
          className="top-0 h-dvh w-[min(88vw,340px)] gap-0 border-0 bg-transparent p-0 shadow-none lg:hidden [&>button]:right-5 [&>button]:top-6 [&>button]:flex [&>button]:h-10 [&>button]:w-10 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-none [&>button]:border-0 [&>button]:bg-transparent [&>button]:p-0 [&>button]:text-white [&>button]:opacity-100 [&>button]:shadow-none [&>button]:hover:bg-transparent [&>button]:hover:text-white/80 [&>button>svg]:h-5 [&>button>svg]:w-5"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>{SITE_NAME} - Navigation Menu</SheetTitle>
          </SheetHeader>

          <div className={cn(navMobileSheetPanelClassName, "flex flex-col p-6 pt-20")}>
            <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-blue-300/70 uppercase">
              Menu
            </p>
            <nav
              role="navigation"
              aria-label="Mobile navigation menu"
              className="flex flex-1 flex-col"
            >
              <ul className="list-none space-y-2" aria-label="Navigation links">
                {navLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      aria-label={item.description}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        navMobileLinkClassName,
                        isActive(item.href) && navMobileLinkActiveClassName,
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <Link
                  href={letsTalkHref}
                  className={cn(letsTalkClassName, "inline-flex w-full justify-center px-4 py-2.5")}
                  aria-label={letsTalkDescription}
                  aria-current={isActive(letsTalkHref) ? "page" : undefined}
                  title={`${letsTalkDescription} - ${SITE_NAME}`}
                  onClick={() => setOpen(false)}
                >
                  <NavOrb />
                  <span>Let&apos;s Talk</span>
                </Link>
              </div>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
