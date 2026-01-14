
import React from 'react';

const GenomicVisualizer: React.FC = () => {
  const data = Array.from({ length: 100 }).map(() => Math.random());

  return (
    <div className="relative w-full h-32 bg-slate-900/50 rounded-2xl border border-white/5 overflow-hidden flex items-end px-2 pb-2 gap-0.5 group">
      <div className="absolute top-2 left-4 z-10">
        <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Genomic Mutation Variance</span>
      </div>
      {data.map((val, i) => (
        <div 
          key={i} 
          style={{ height: `${val * 100}%` }}
          className={`flex-1 transition-all duration-300 ${val > 0.8 ? 'bg-rose-500 shadow-[0_0_5px_#f43f5e]' : val > 0.4 ? 'bg-indigo-500' : 'bg-slate-800'}`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </div>
  );
};

export default GenomicVisualizer;
