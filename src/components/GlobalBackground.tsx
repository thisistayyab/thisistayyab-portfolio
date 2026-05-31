import { motion } from 'framer-motion';
import { techIcons } from '../data/techIcons';

interface GlobalBackgroundProps {
  isDesktop: boolean;
  showTechIcons?: boolean;
}

export function GlobalBackground({ isDesktop, showTechIcons = true }: GlobalBackgroundProps) {
  return (
    <div className="site-background" aria-hidden="true">
      <div className="site-background__base" />
      <div className="site-background__ambient" />
      <div className="site-background__stars" />
      <div className="site-background__stars site-background__stars--fine" />

      {showTechIcons && (
        <div className="site-background__icons">
          {techIcons.map((item, i) =>
            isDesktop ? (
              <motion.img
                key={item.alt}
                src={item.src}
                alt=""
                className="site-background__icon"
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
                className="site-background__icon"
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
