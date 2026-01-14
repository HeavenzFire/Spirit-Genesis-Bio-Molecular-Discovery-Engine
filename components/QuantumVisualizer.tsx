
import React from 'react';

const QuantumVisualizer: React.FC = () => {
  return (
    <div className="relative w-full h-[500px] bg-black rounded-3xl border border-indigo-900/30 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e1b4b_0%,_transparent_70%)] opacity-50" />
      <div className="absolute top-6 left-8 z-10">
        <h3 className="text-xl font-black italic text-indigo-400 tracking-widest uppercase">Quantum State Projection</h3>
        <p className="text-[10px] font-mono text-slate-500 mt-1 uppercase tracking-[0.4em]">Probability Density Distribution // Ψ(x,t)</p>
      </div>

      <svg width="100%" height="100%" viewBox="0 0 800 500" className="z-10">
        <defs>
          <filter id="q-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Abstract Probability Waves */}
        {Array.from({ length: 5 }).map((_, i) => (
          <path
            key={i}
            d={`M 100,250 Q ${200 + i * 100},${100 + Math.random() * 300} 400,250 T 700,250`}
            fill="none"
            stroke={i % 2 === 0 ? '#818cf8' : '#22d3ee'}
            strokeWidth={1}
            strokeOpacity={0.4}
            className="animate-pulse-slow"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}

        {/* Interaction Orbitals */}
        <circle cx="400" cy="250" r="80" fill="none" stroke="#6366f1" strokeWidth="0.5" strokeDasharray="10 5" className="animate-[spin_20s_linear_infinite]" />
        <circle cx="400" cy="250" r="120" fill="none" stroke="#22d3ee" strokeWidth="0.5" strokeDasharray="20 10" className="animate-[spin_30s_linear_infinite_reverse]" />
        
        {/* Probability Density Heatmap Blobs */}
        <ellipse cx="400" cy="250" rx="40" ry="20" fill="rgba(99,102,241,0.2)" filter="url(#q-glow)" className="animate-pulse" />
        <circle cx="420" cy="230" r="10" fill="rgba(34,211,238,0.4)" filter="url(#q-glow)" />
      </svg>

      <div className="absolute bottom-8 right-8 text-right font-mono">
        <div className="text-[10px] text-slate-500 uppercase">Hamiltonian Convergence</div>
        <div className="text-3xl font-black text-indigo-400">99.82%</div>
        <div className="text-[8px] text-green-400 mt-1">Eigenstate Resolved</div>
      </div>
    </div>
  );
};

export default QuantumVisualizer;
