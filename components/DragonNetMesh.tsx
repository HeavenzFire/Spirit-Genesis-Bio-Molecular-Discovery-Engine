
import React, { useMemo } from 'react';

interface Props {
  nodes: number;
  stress?: boolean;
}

const DragonNetMesh: React.FC<Props> = ({ nodes, stress }) => {
  const points = useMemo(() => {
    return Array.from({ length: 400 }).map((_, i) => ({
      x: 50 + Math.random() * 300,
      y: 50 + Math.random() * 300,
      id: i,
      r: (1 + Math.random() * 2) * (stress ? 1.5 : 1)
    }));
  }, [stress]);

  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden transition-all duration-300 ${stress ? 'scale-110' : ''}`}>
      <svg width="100%" height="100%" viewBox="0 0 400 400" className={`transition-opacity duration-300 ${stress ? 'opacity-100' : 'opacity-60'}`}>
        <defs>
          <filter id="mesh-glow">
            <feGaussianBlur stdDeviation={stress ? "3" : "1.5"} result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Fractal Connections */}
        {points.slice(0, 150).map((p, i) => (
          <line
            key={`l-${i}`}
            x1={p.x}
            y1={p.y}
            x2={points[(i + 1) % points.length].x}
            y2={points[(i + 1) % points.length].y}
            stroke={stress ? "#f43f5e" : "#6366f1"}
            strokeWidth={stress ? "1.5" : "0.5"}
            strokeOpacity={stress ? "0.6" : "0.2"}
            className={stress ? 'animate-pulse' : ''}
          />
        ))}

        {/* Resonant Nodes */}
        {points.map((p) => (
          <circle
            key={p.id}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill={stress ? (Math.random() > 0.5 ? '#ffffff' : '#f43f5e') : (Math.random() > 0.9 ? '#10b981' : '#6366f1')}
            filter="url(#mesh-glow)"
            className={stress ? 'animate-ping' : (Math.random() > 0.8 ? 'animate-ping' : '')}
          />
        ))}
      </svg>
    </div>
  );
};

export default DragonNetMesh;
