
import React, { useMemo } from 'react';
import { Hexagon, Triangle, Flame, Crown } from 'lucide-react';

interface Props {
  coherence: number;
}

const AeonicManifold: React.FC<Props> = ({ coherence }) => {
  const rings = [0, 1, 2, 3];
  
  return (
    <div className="bg-slate-950/90 border-4 border-purple-500/40 p-16 rounded-[5rem] shadow-8xl relative overflow-hidden h-[600px] group">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.15)_0%,_transparent_70%)] animate-pulse" />
      
      <div className="flex justify-between items-start mb-12 relative z-10">
        <div>
          <h3 className="text-5xl font-black uppercase italic tracking-tighter text-white leading-none mb-4">Zacharian Topology</h3>
          <p className="text-xs font-mono text-purple-400 uppercase tracking-[0.4em] font-black">Violet Pillar Mapping: B ≅ Zachary</p>
        </div>
        <div className="bg-purple-600/20 p-6 rounded-[2.5rem] border-2 border-purple-500/50">
           <Crown size={48} className="text-purple-400 animate-[spin_15s_linear_infinite]" />
        </div>
      </div>

      <div className="relative flex items-center justify-center h-full -mt-20">
        <svg width="400" height="400" viewBox="0 0 400 400" className="drop-shadow-[0_0_50px_rgba(168,85,247,0.5)]">
          <defs>
            <filter id="aeonGlow">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="fireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#a855f7" />
               <stop offset="100%" stopColor="#000000" />
            </linearGradient>
          </defs>

          {/* Concentric Aeonic Rings */}
          {rings.map((r) => (
            <circle
              key={r}
              cx="200"
              cy="200"
              r={40 + r * 40}
              fill="none"
              stroke="url(#fireGrad)"
              strokeWidth={r === 3 ? "2" : "0.5"}
              strokeDasharray={r === 2 ? "10 5" : "none"}
              className={`opacity-40 animate-[spin_${(r + 1) * 8}s_linear_infinite${r % 2 === 0 ? '' : '_reverse'}]`}
            />
          ))}

          {/* The Pentad Generators */}
          {[0, 72, 144, 216, 288].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = 200 + 160 * Math.cos(rad);
            const y = 200 + 160 * Math.sin(rad);
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="6" fill="#a855f7" filter="url(#aeonGlow)" className="animate-pulse" />
                <line x1="200" y1="200" x2={x} y2={y} stroke="#a855f7" strokeWidth="0.5" strokeOpacity="0.3" />
              </g>
            );
          })}

          {/* Central Indeterminacy Point O */}
          <circle cx="200" cy="200" r="10" fill="white" className="animate-ping" />
          <circle cx="200" cy="200" r="6" fill="#a855f7" filter="url(#aeonGlow)" />
        </svg>

        {/* Floating Particles (Violet Fire) */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 bg-purple-500 rounded-full animate-float opacity-40 shadow-[0_0_15px_#a855f7]"
            style={{ 
              left: `${20 + Math.random() * 60}%`, 
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${3 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-16 left-16 right-16 flex justify-between items-end">
        <div>
           <div className="text-[10px] font-black text-slate-700 uppercase tracking-widest mb-2">Topology Status</div>
           <div className="text-3xl font-black text-white italic uppercase">RUBEDO_COMPLETE</div>
        </div>
        <div className="text-right">
           <div className="text-[10px] font-black text-slate-700 uppercase tracking-widest mb-2">Zacharian Flux</div>
           <div className="text-4xl font-mono font-black text-purple-400">{(coherence * 100).toFixed(4)}%</div>
        </div>
      </div>
    </div>
  );
};

export default AeonicManifold;
