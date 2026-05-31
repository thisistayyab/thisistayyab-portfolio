import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { techIcons } from '../data/techIcons';

interface GlobalBackgroundProps {
  isDesktop: boolean;
  showTechIcons?: boolean;
}

const layerClass = 'pointer-events-none absolute inset-0';

export function GlobalBackground({ isDesktop, showTechIcons = true }: GlobalBackgroundProps) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className={cn(layerClass, 'bg-site-base')} />
      <div className={cn(layerClass, 'bg-site-ambient')} />
      <div className={cn(layerClass, 'bg-site-stars opacity-55')} />
      <div className={cn(layerClass, 'bg-site-stars-fine bg-[length:220px_220px] opacity-30')} />

      {showTechIcons && (
        <div className={cn(layerClass, 'z-[1]')}>
          {techIcons.map((item) =>
            isDesktop ? (
              <motion.img
                key={item.alt}
                src={item.src}
                alt=""
                className="absolute object-contain will-change-transform"
                style={{
                  top: item.top,
                  left: item.left,
                  width: item.size ?? 40,
                  height: item.size ?? 40,
                  opacity: item.opacity ?? 0.18,
                  filter: item.blur ? `blur(${item.blur}px)` : undefined,
                }}
                initial={{ y: -12, x: 0 }}
                animate={{ y: [0, 14, 0], x: [0, -10, 0] }}
                transition={{ duration: item.duration, repeat: Infinity, ease: 'easeInOut' }}
              />
            ) : (
              <img
                key={item.alt}
                src={item.src}
                alt=""
                className="absolute object-contain"
                style={{
                  top: item.top,
                  left: item.left,
                  width: item.size ?? 40,
                  height: item.size ?? 40,
                  opacity: item.opacity ?? 0.18,
                  filter: item.blur ? `blur(${item.blur}px)` : undefined,
                }}
                loading="lazy"
                decoding="async"
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}
