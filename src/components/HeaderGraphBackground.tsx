import { cn } from '@/lib/utils';
import { headerGraphLayers, headerGraphStars } from '../data/headerGraphMesh';

function GraphMeshLayer({
  lineClass,
  nodeClass,
  strokeWidth,
  nodes,
  edges,
  highlightNodes = [],
}: {
  lineClass: string;
  nodeClass: string;
  strokeWidth: number;
  nodes: readonly (readonly [number, number])[];
  edges: readonly (readonly [number, number])[];
  highlightNodes?: readonly number[];
}) {
  const highlightSet = new Set(highlightNodes);

  return (
    <g>
      {edges.map(([a, b], i) => {
        const from = nodes[a];
        const to = nodes[b];
        if (!from || !to) return null;

        return (
          <line
            key={`edge-${i}`}
            x1={from[0]}
            y1={from[1]}
            x2={to[0]}
            y2={to[1]}
            className={lineClass}
            strokeWidth={strokeWidth}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
      {nodes.map(([x, y], i) => (
        <circle
          key={`node-${i}`}
          cx={x}
          cy={y}
          r={highlightSet.has(i) ? 2.8 : 1.6}
          className={cn(
            nodeClass,
            highlightSet.has(i) && 'fill-sky-100/90 drop-shadow-[0_0_6px_rgba(56,189,248,0.85)]',
          )}
        />
      ))}
    </g>
  );
}

export function HeaderGraphBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
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
          {headerGraphLayers.map((layer) => (
            <GraphMeshLayer
              key={layer.id}
              lineClass={layer.lineClass}
              nodeClass={layer.nodeClass}
              strokeWidth={layer.strokeWidth}
              nodes={layer.nodes}
              edges={layer.edges}
              highlightNodes={layer.highlightNodes}
            />
          ))}
        </g>

        <g className="fill-sky-400/35">
          {headerGraphStars.map(([x, y, r], i) => (
            <circle key={`star-${i}`} cx={x} cy={y} r={r} />
          ))}
        </g>
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[var(--site-bg-base)] to-transparent" />
    </div>
  );
}
