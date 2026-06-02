import Image from "next/image"

import { techIcons } from "@/lib/data/tech-icons"

export function TechIconsLayer() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {techIcons.map((item) => (
        <Image
          key={item.alt}
          src={item.src}
          alt=""
          width={item.size ?? 40}
          height={item.size ?? 40}
          className="tech-icon-float absolute object-contain will-change-transform"
          style={{
            top: item.top,
            left: item.left,
            width: item.size ?? 40,
            height: item.size ?? 40,
            opacity: item.opacity ?? 0.18,
            filter: item.blur ? `blur(${item.blur}px)` : undefined,
            animationDuration: `${item.duration ?? 10}s`,
          }}
        />
      ))}
    </div>
  )
}
