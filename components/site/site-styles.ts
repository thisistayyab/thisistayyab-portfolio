import { cn } from "@/lib/utils"

export type GlassRim = "default" | "nav" | "violet" | "purple" | "blue" | "pink"

/** Dark glass panel fill + shadow (navbar, stat cards, code card) */
export const navGlassClassName =
  "bg-[rgba(8,12,26,0.72)] shadow-[0_10px_36px_rgba(0,0,0,0.45),0_0_32px_rgba(59,130,246,0.12),0_0_48px_rgba(139,92,246,0.08)] backdrop-blur-[24px] backdrop-saturate-[170%]"

/** Floating nav capsule — slightly lighter fill than cards */
export const navCapsuleClassName = cn(
  "relative isolate overflow-hidden rounded-full border-0",
  "bg-[rgba(8,12,26,0.42)] shadow-[0_10px_36px_rgba(0,0,0,0.45),0_0_32px_rgba(59,130,246,0.12),0_0_48px_rgba(139,92,246,0.08)] backdrop-blur-[24px] backdrop-saturate-[170%]",
  "glass-rim glass-rim-nav",
  "[&>*]:relative [&>*]:z-[1]",
)

export const glassBadgeClassName = cn(
  "relative isolate overflow-hidden rounded-full border-0",
  "py-[0.55rem] pl-[0.7rem] pr-4",
  "bg-[rgba(8,12,26,0.82)] shadow-[0_8px_32px_rgba(0,0,0,0.38),0_0_22px_rgba(59,130,246,0.14),0_0_36px_rgba(139,92,246,0.1)] backdrop-blur-[20px] backdrop-saturate-[170%]",
  "glass-rim",
  "[&>*]:relative [&>*]:z-[1]",
)

export const statusBadgeClassName = cn(
  glassBadgeClassName,
  "bg-[rgba(8,12,26,0.96)] backdrop-blur-none",
)

export const heroTagClassName = cn(
  "relative isolate overflow-hidden inline-flex items-center rounded-full border-0",
  "px-[0.72rem] py-[0.38rem] text-[0.62rem] font-bold uppercase tracking-[0.07em] text-violet-300",
  "sm:px-[0.85rem] sm:py-[0.42rem] sm:text-[0.68rem]",
  "bg-[rgba(6,4,14,0.38)] shadow-[0_8px_32px_rgba(0,0,0,0.38),0_0_22px_rgba(59,130,246,0.14),0_0_36px_rgba(139,92,246,0.1)] backdrop-blur-[20px] backdrop-saturate-[170%]",
  "glass-rim",
)

export const ctaPrimaryClassName = cn(
  "inline-flex items-center gap-2.5 rounded-full px-[1.45rem] py-[0.9rem] text-[0.92rem] font-semibold text-white no-underline",
  "bg-gradient-to-r from-violet-600 via-indigo-500 to-blue-600",
  "shadow-[0_10px_30px_rgba(99,102,241,0.35),0_0_40px_rgba(59,130,246,0.18)]",
  "transition-transform duration-300 ease-out hover:-translate-y-0.5",
  "hover:shadow-[0_14px_34px_rgba(124,58,237,0.42),0_0_48px_rgba(59,130,246,0.24)]",
)

export const ctaSecondaryClassName = cn(
  "relative isolate overflow-hidden inline-flex items-center gap-2.5 rounded-full border-0 px-[1.35rem] py-[0.88rem] text-[0.92rem] font-semibold text-slate-200 no-underline",
  "bg-[rgba(8,12,26,0.88)] shadow-[0_8px_32px_rgba(0,0,0,0.38),0_0_22px_rgba(59,130,246,0.14),0_0_36px_rgba(139,92,246,0.1)]",
  "glass-rim transition-transform duration-300 ease-out hover:-translate-y-0.5",
  "hover:shadow-[0_14px_36px_rgba(0,0,0,0.42),0_0_28px_rgba(59,130,246,0.18),0_0_44px_rgba(139,92,246,0.14)]",
  "[&>*]:relative [&>*]:z-[1]",
)

export const navCtaClassName = cn(
  "nav-cta-glow relative isolate overflow-hidden inline-flex items-center gap-2 rounded-full border-0 px-5 py-2.5 text-sm font-semibold text-white no-underline",
  "bg-[linear-gradient(145deg,rgba(10,16,30,0.96)_0%,rgba(6,10,22,0.97)_40%,rgba(59,130,246,0.1)_100%),rgba(2,6,16,0.9)]",
  "shadow-[0_0_28px_rgba(59,130,246,0.16),inset_0_1px_0_rgba(59,130,246,0.16),inset_0_-1px_0_rgba(139,92,246,0.14)]",
  "backdrop-blur-[14px] backdrop-saturate-[150%] glass-rim glass-rim-nav",
  "transition-[box-shadow] duration-300 ease-out",
  "hover:shadow-[0_0_36px_rgba(59,130,246,0.24),inset_0_1px_0_rgba(59,130,246,0.2),inset_0_-1px_0_rgba(139,92,246,0.18)]",
  "[&>*]:relative [&>*]:z-[1]",
)

export const statCardClassName = cn(
  navGlassClassName,
  "flex min-h-[5.5rem] w-full flex-row items-center gap-3.5 rounded-[0.875rem] p-[0.95rem_1rem] transition-transform duration-300 ease-out sm:gap-[0.95rem] sm:p-4",
  "hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(0,0,0,0.4),0_0_28px_rgba(59,130,246,0.16),0_0_44px_rgba(139,92,246,0.12)]",
  "[&>*]:relative [&>*]:z-[1]",
)

export const navMobileBrandClassName = cn(
  "font-brand min-w-0 flex-1 truncate no-underline text-slate-50 transition-colors duration-300",
  "text-[clamp(0.82rem,3.8vw,1rem)] font-semibold leading-tight tracking-[-0.01em] py-0.5 pl-2 pr-3",
  "hover:text-violet-300",
)

export const navMobileSheetPanelClassName = cn(
  "relative isolate h-full overflow-y-auto",
  "bg-[linear-gradient(165deg,rgba(8,12,24,0.97)_0%,rgba(59,130,246,0.06)_35%,rgba(88,28,135,0.08)_65%,rgba(2,6,14,0.99)_100%)]",
  "border-l border-blue-500/20",
  "shadow-[-12px_0_48px_rgba(0,0,0,0.6),-4px_0_32px_rgba(59,130,246,0.08),inset_1px_0_0_rgba(59,130,246,0.18)]",
  "backdrop-blur-[26px] backdrop-saturate-[135%]",
  "before:pointer-events-none before:absolute before:top-0 before:bottom-0 before:left-0 before:w-px",
  "before:bg-gradient-to-b before:from-blue-500/45 before:via-blue-500/25 before:to-violet-500/35",
)

export const navMobileLinkClassName = cn(
  "relative isolate overflow-hidden block rounded-[0.875rem] border px-4 py-3.5 text-[0.95rem] font-medium text-white/90 no-underline transition-colors duration-300",
  "border-blue-500/20 bg-[rgba(8,12,24,0.8)]",
  "shadow-[inset_0_1px_0_rgba(59,130,246,0.1),inset_0_-1px_0_rgba(139,92,246,0.08)]",
  "hover:border-blue-500/35 hover:bg-slate-900/90 hover:text-white",
  "hover:shadow-[inset_0_0_16px_rgba(59,130,246,0.08),inset_0_1px_0_rgba(59,130,246,0.12)]",
)

export const navMobileLinkActiveClassName = cn(
  "border-blue-500/40 bg-slate-900/95 text-white",
  "shadow-[inset_0_0_24px_rgba(59,130,246,0.14),inset_0_0_12px_rgba(139,92,246,0.1),inset_0_1px_0_rgba(59,130,246,0.16)]",
)

const statIconToneClasses: Partial<Record<GlassRim, string>> = {
  violet:
    "shadow-[0_0_18px_rgba(139,92,246,0.22)] [&_svg]:text-violet-300 [&_svg]:drop-shadow-[0_0_6px_rgba(167,139,250,0.75)]",
  purple:
    "shadow-[0_0_18px_rgba(168,85,247,0.24)] [&_svg]:text-purple-300 [&_svg]:drop-shadow-[0_0_6px_rgba(192,132,252,0.8)]",
  blue: "shadow-[0_0_18px_rgba(59,130,246,0.22)] [&_svg]:text-blue-300 [&_svg]:drop-shadow-[0_0_6px_rgba(96,165,250,0.8)]",
  pink: "shadow-[0_0_18px_rgba(217,70,239,0.22)] [&_svg]:text-fuchsia-300 [&_svg]:drop-shadow-[0_0_6px_rgba(232,121,249,0.78)]",
}

export const heroActionsClassName =
  "flex w-full flex-wrap items-center justify-center gap-[0.85rem] lg:justify-start"

export function statIconClassName(tone: GlassRim) {
  return cn(
    "inline-flex size-11 shrink-0 items-center justify-center rounded-[0.7rem] sm:size-12",
    "bg-[rgba(6,10,22,0.92)]",
    statIconToneClasses[tone],
  )
}
