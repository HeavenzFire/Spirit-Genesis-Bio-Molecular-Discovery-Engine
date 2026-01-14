
import React from 'react';

interface Props {
  intensity: number;
  label: string;
}

const PathwayGraph: React.FC<Props> = ({ intensity, label }) => {
  return (
    <div className="relative w-full h-48 bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
      <div className="absolute top-2 left-3 z-10 flex flex-col">
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Network Perturbation</span>
        <span className="text-xs font-bold text-cyan-400">{label}</span>
      </div>
      
      <svg width="100%" height="100%" viewBox="0 0 400 200" className="opacity-70">
        <defs>
          <filter id="glow-p">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Nodes */}
        {[
          {x: 100, y: 100}, {x: 200, y: 50}, {x: 200, y: 150}, 
          {x: 300, y: 100}, {x: 50, y: 60}, {x: 350, y: 140}
        ].map((node, i) => (
          <React.Fragment key={i}>
            {/* Connections */}
            {i > 0 && (
              <line 
                x1={node.x} y1={node.y} x2={200} y2={100} 
                stroke={intensity > 0.7 ? '#f43f5e' : '#22d3ee'} 
                strokeWidth="1" 
                strokeDasharray="4 2"
                className="animate-pulse-slow"
              />
            )}
            <circle 
              cx={node.x} cy={node.y} r="4" 
              fill={intensity > 0.7 ? '#f43f5e' : '#22d3ee'} 
              filter="url(#glow-p)"
              className={i % 2 === 0 ? "animate-pulse" : ""}
            />
          </React.Fragment>
        ))}

        {/* Central Hub */}
        <circle 
          cx="200" cy="100" r="10" 
          fill="none" 
          stroke={intensity > 0.7 ? '#f43f5e' : '#22d3ee'} 
          strokeWidth="2" 
          className="animate-ping" 
        />
        <circle cx="200" cy="100" r="6" fill={intensity > 0.7 ? '#f43f5e' : '#22d3ee'} />
      </svg>

      <div className="absolute bottom-2 right-3">
        <div className="text-[10px] text-slate-500 uppercase font-bold">Signal Variance</div>
        <div className="text-sm font-black font-mono">{(intensity * 100).toFixed(2)}%</div>
      </div>
    </div>
  );
};

export default PathwayGraph;
