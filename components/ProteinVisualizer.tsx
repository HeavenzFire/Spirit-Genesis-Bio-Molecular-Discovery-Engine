
import React from 'react';
import { ProteinStructure } from '../types';

interface Props {
  protein: ProteinStructure;
}

const ProteinVisualizer: React.FC<Props> = ({ protein }) => {
  const plddt = protein.plddt || [92, 94, 91, 88, 95, 96, 92, 85, 89, 93];
  
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center bg-black/40 rounded-[3rem] border border-white/5 shadow-inner overflow-hidden">
      <div className="absolute top-10 left-12">
        <h3 className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.4em] italic mb-2">Molecular Geometry</h3>
        <p className="text-[10px] font-mono text-slate-700 uppercase">LATTICE_SEED: {protein.id}</p>
      </div>
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e1b4b_0%,_transparent_70%)] opacity-30 pointer-events-none" />

      <svg width="90%" height="90%" viewBox="0 0 400 400" className="drop-shadow-[0_0_40px_rgba(99,102,241,0.2)]">
        <defs>
          <filter id="lattice-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="protGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <pattern id="dotPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
             <circle cx="2" cy="2" r="0.5" fill="#1e293b" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#dotPattern)" />

        {/* Structural Orbital Path */}
        <path
          d={`M 40,200 C ${plddt.map((p, i) => `${80 + i * 32},${200 + (Math.sin(i * 1.8 + (Date.now() / 250)) * p * 0.45)}`).join(' ')}`}
          fill="none"
          stroke="url(#protGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeOpacity="0.9"
          className="transition-all duration-100 ease-linear"
          filter="url(#lattice-glow)"
        />

        {/* Binding Affinity Hotspots */}
        {protein.bindingSites.map((site, i) => {
          const x = 100 + site.residueIndex * 24;
          const y = 200 + (Math.sin(site.residueIndex * 1.8 + (Date.now() / 250)) * plddt[site.residueIndex % 10] * 0.45);
          return (
            <g key={i} transform={`translate(${x}, ${y})`}>
              <circle r="12" fill="#f43f5e" fillOpacity="0.1" className="animate-ping" />
              <circle r="6" fill="#f43f5e" className="shadow-[0_0_15px_#f43f5e]" />
              <g transform="translate(0, -25)">
                 <rect x="-35" y="-12" width="70" height="16" rx="4" fill="black" fillOpacity="0.8" stroke="#f43f5e" strokeWidth="0.5" />
                 <text fontSize="8" fill="#f43f5e" textAnchor="middle" y="-1" className="font-black uppercase tracking-tighter">{site.label}</text>
              </g>
              <line y1="0" y2="-13" stroke="#f43f5e" strokeWidth="0.5" strokeDasharray="2 1" />
            </g>
          );
        })}

        {/* Data Accents */}
        <circle cx="40" cy="200" r="4" fill="#22d3ee" />
        <circle cx="360" cy="200" r="4" fill="#818cf8" />
      </svg>

      <div className="absolute bottom-10 right-12 text-right">
        <div className="text-[11px] text-slate-700 uppercase font-black tracking-[0.3em] mb-2">Refinement Confidence</div>
        <div className="text-6xl font-black text-indigo-400 font-mono italic tracking-tighter leading-none">
          {(protein.confidence * 100).toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export default ProteinVisualizer;
