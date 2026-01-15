
import React, { useMemo } from 'react';

interface Props {
  nodes: number;
}

const DragonNetMesh: React.FC<Props> = ({ nodes }) => {
  const points = useMemo(() => {
    return Array.from({ length: 400 }).map((_, i) => ({
      x: 50 + Math.random() * 300,
      y: 50 + Math.random() * 300,
      id: i,
      r: 1 + Math.random() * 2
    }));
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 400 400" className="opacity-60">
        <defs>
          <filter id="mesh-glow">
            <feGaussianBlur stdDeviation="1.5" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Fractal Connections */}
        {points.slice(0, 100).map((p, i) => (
          <line
            key={`l-${i}`}
            x1={p.x}
            y1={p.y}
            x2={points[(i + 1) % points.length].x}
            y2={points[(i + 1) % points.length].y}
            stroke="#6366f1"
            strokeWidth="0.5"
            strokeOpacity="0.2"
            className="animate-pulse"
          />
        ))}

        {/* Resonant Nodes */}
        {points.map((p) => (
          <circle
            key={p.id}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill={Math.random() > 0.9 ? '#10b981' : '#6366f1'}
            filter="url(#mesh-glow)"
            className={Math.random() > 0.8 ? 'animate-ping' : ''}
          />
        ))}
      </svg>
    </div>
  );
};

export default DragonNetMesh;
