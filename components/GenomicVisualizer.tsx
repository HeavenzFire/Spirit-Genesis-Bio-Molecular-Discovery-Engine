
import React from 'react';

const GenomicVisualizer: React.FC = () => {
  const data = Array.from({ length: 120 }).map(() => ({
    val: Math.random(),
    id: Math.random()
  }));

  return (
    <div className="relative w-full h-36 bg-black/40 rounded-[2rem] border border-white/5 overflow-hidden flex items-end px-6 pb-4 gap-1 group shadow-inner">
      <div className="absolute top-4 left-6 z-10 flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
        <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">Mutational Landscape Matrix // Pathway: MAP-Kinase</span>
      </div>
      
      {data.map((item, i) => (
        <div 
          key={item.id} 
          style={{ height: `${item.val * 100}%` }}
          className={`flex-1 transition-all duration-500 rounded-t-sm ${
            item.val > 0.85 ? 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]' : 
            item.val > 0.6 ? 'bg-indigo-500/80' : 
            item.val > 0.3 ? 'bg-indigo-900/40' : 'bg-slate-900'
          }`}
        />
      ))}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
      
      <div className="absolute bottom-4 right-8 flex items-center gap-4 text-[9px] font-black uppercase tracking-widest">
         <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-sm bg-rose-500" />
            <span className="text-slate-500">Hotspot</span>
         </div>
         <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-sm bg-indigo-500" />
            <span className="text-slate-500">Baseline</span>
         </div>
      </div>
    </div>
  );
};

export default GenomicVisualizer;
