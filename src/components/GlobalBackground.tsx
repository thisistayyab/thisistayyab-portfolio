import React from 'react';
import { motion } from 'framer-motion';
import { techIcons } from '../data/techIcons';

interface GlobalBackgroundProps {
  isDesktop: boolean;
  showTechIcons?: boolean;
}

export const GlobalBackground: React.FC<GlobalBackgroundProps> = ({ 
  isDesktop, 
  showTechIcons = true 
}) => {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {/* Tech Icons: animated on desktop, still on mobile - only show if enabled */}
      {showTechIcons && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
          {isDesktop
            ? techIcons.map((item, i) => (
                <motion.img
                  key={i}
                  src={item.src}
                  alt={item.alt}
                  style={{
                    position: 'absolute',
                    width: 40,
                    height: 40,
                    top: item.top,
                    left: item.left,
                    opacity: 0.18,
                    willChange: 'transform',
                  }}
                  initial={{ y: -20, x: 0 }}
                  animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
                  transition={{ duration: item.duration, repeat: Infinity }}
                />
              ))
            : techIcons.map((item, i) => (
                <img
                  key={i}
                  src={item.src}
                  alt={item.alt}
                  style={{
                    position: 'absolute',
                    width: 40,
                    height: 40,
                    top: item.top,
                    left: item.left,
                    opacity: 0.18,
                  }}
                />
              ))}
        </div>
      )}
    </div>
  );
};
