
import React from 'react';
import { ProteinStructure } from '../types';

interface Props {
  protein: ProteinStructure;
}

const ProteinVisualizer: React.FC<Props> = ({ protein }) => {
  const plddt = protein.plddt || [80, 85, 90, 88, 70, 95, 92, 84, 86, 89];
  
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden bg-black/40 rounded-3xl border border-white/5 ring-1 ring-white/5 shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#312e8133_0%,_transparent_70%)]" />
      
      {/* Scanning Line Effect */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#22d3ee] animate-scan-y" />
      </div>

      <div className="absolute top-6 left-8 z-30">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
          <h3 className="text-sm font-black text-cyan-400 uppercase tracking-widest italic">Neural Projection Lattice</h3>
        </div>
        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">ID: {protein.id} // RESOLUTION: HI-RES // STATE: STABLE</p>
      </div>
      
      <svg width="100%" height="100%" viewBox="0 0 400 400" className="opacity-90 drop-shadow-[0_0_30px_rgba(99,102,241,0.2)]">
        <defs>
          <filter id="glow-v">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <path
          d={`M 50,200 C ${plddt.map((p, i) => `${80 + i * 30},${200 + (Math.sin(i * 1.5 + (Date.now() / 1000)) * p * 0.4)}`).join(' ')}`}
          fill="none"
          stroke="url(#proteinGrad-v)"
          strokeWidth="10"
          strokeLinecap="round"
          filter="url(#glow-v)"
          className="transition-all duration-500 ease-in-out"
        />
        
        <linearGradient id="proteinGrad-v" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>

        {protein.bindingSites.map((site, i) => (
          <g key={i} transform={`translate(${100 + site.residueIndex * 24}, ${200 + (Math.sin(site.residueIndex * 1.5) * 35)})`}>
            <circle r="10" fill="#f43f5e" className="animate-ping opacity-20" />
            <circle r="4" fill="#f43f5e" className="shadow-[0_0_10px_#f43f5e]" />
            <text y="-18" fontSize="10" fill="#f43f5e" textAnchor="middle" className="font-black italic uppercase tracking-tighter shadow-sm">{site.label}</text>
          </g>
        ))}
      </svg>

      <div className="absolute bottom-6 right-8 text-right z-30">
        <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Global Confidence</div>
        <div className="text-4xl font-black text-indigo-400 italic font-mono tracking-tighter">{(protein.confidence * 100).toFixed(1)}%</div>
      </div>

      <div className="absolute bottom-6 left-8 flex gap-2 items-end h-16 z-30 group">
        {plddt.map((p, i) => (
          <div 
            key={i} 
            style={{ height: `${p}%` }}
            className={`w-2 rounded-t-sm transition-all duration-700 hover:w-3 ${p > 90 ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : p > 80 ? 'bg-indigo-500 shadow-[0_0_5px_#6366f1]' : 'bg-slate-800'}`}
          />
        ))}
        <div className="text-[9px] text-slate-500 font-mono ml-4 uppercase rotate-90 origin-left tracking-[0.3em] font-bold">Lattice_Confidence</div>
      </div>
      
      <style>{`
        @keyframes scan-y {
          0% { transform: translateY(-200px); }
          100% { transform: translateY(200px); }
        }
        .animate-scan-y {
          animation: scan-y 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ProteinVisualizer;
