import React from 'react';
import '../App.css';

interface LaserBeamProps {
  top?: string;
  left?: string;
  color?: 'red' | 'blue';
  duration?: string;
}

const LaserBeam: React.FC<LaserBeamProps> = ({ top = '270px', left = '54%', color = 'red', duration = '4s' }) => {
  return (
    <div
      className={`laser-cone ${color}`}
      style={{
        top,
        left,
        animationDuration: duration,
      }}
    />
  );
};

export default LaserBeam;
