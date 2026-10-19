import { cn } from "@/lib/utils"
import {
  headerGraphLayers,
  headerGraphStars,
} from "@/lib/header-graph-mesh"

function circlePathSegment(cx: number, cy: number, r: number): string {
  return `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 -${r * 2} 0`
}

const precomputedLayers = headerGraphLayers.map((layer) => {
  const highlightSet = new Set(layer.highlightNodes ?? [])
  const edgeSegments: string[] = []
  for (const [a, b] of layer.edges) {
    const from = layer.nodes[a]
    const to = layer.nodes[b]
    if (from && to) {
      edgeSegments.push(`M${from[0]} ${from[1]}L${to[0]} ${to[1]}`)
    }
  }

  const normalNodeSegments: string[] = []
  const highlightNodeSegments: string[] = []
  layer.nodes.forEach(([x, y], i) => {
    if (highlightSet.has(i)) {
      highlightNodeSegments.push(circlePathSegment(x, y, 2.8))
    } else {
      normalNodeSegments.push(circlePathSegment(x, y, 1.6))
    }
  })

  return {
    id: layer.id,
    lineClass: layer.lineClass,
    nodeClass: layer.nodeClass,
    strokeWidth: layer.strokeWidth,
    edgesPath: edgeSegments.join(""),
    normalNodesPath: normalNodeSegments.join(""),
    highlightNodesPath: highlightNodeSegments.join(""),
  }
})

const starsPath = headerGraphStars
  .map(([x, y, r]) => circlePathSegment(x, y, r))
  .join("")

export function HeaderGraphBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/75 via-[#020617]/45 to-[#020617]/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(14,165,233,0.08),transparent_62%)]" />
      <div className="absolute inset-x-0 top-0 h-[42%] bg-gradient-to-b from-[#020617]/55 to-transparent" />

      <svg
        className="absolute inset-x-0 bottom-0 h-[min(62vh,560px)] w-full opacity-95 motion-safe:animate-header-graph-drift"
        viewBox="0 0 1440 720"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="header-graph-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="header-graph-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#020617" stopOpacity="0.92" />
            <stop offset="38%" stopColor="#020617" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="1440" height="720" fill="url(#header-graph-fade)" />

        <g filter="url(#header-graph-glow)">
          {precomputedLayers.map((layer) => (
            <g key={layer.id}>
              <path
                d={layer.edgesPath}
                fill="none"
                className={layer.lineClass}
                strokeWidth={layer.strokeWidth}
                vectorEffect="non-scaling-stroke"
              />
              {layer.normalNodesPath ? (
                <path d={layer.normalNodesPath} className={layer.nodeClass} />
              ) : null}
              {layer.highlightNodesPath ? (
                <path
                  d={layer.highlightNodesPath}
                  className={cn(
                    layer.nodeClass,
                    "fill-sky-100/90 drop-shadow-[0_0_6px_rgba(56,189,248,0.85)]",
                  )}
                />
              ) : null}
            </g>
          ))}
        </g>

        <path d={starsPath} className="fill-sky-400/35" />
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-site-base to-transparent" />
    </div>
  )
}
