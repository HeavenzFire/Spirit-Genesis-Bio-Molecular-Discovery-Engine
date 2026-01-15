
import React from 'react';

const StandardSentinel: React.FC = () => {
  return (
    <div className="flex items-center gap-6">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full animate-[spin_4s_linear_infinite]" />
        <div className="absolute inset-2 border-4 border-indigo-500/40 rounded-full animate-[spin_3s_linear_infinite_reverse]" />
        <div className="absolute inset-4 border-4 border-indigo-500/60 rounded-full animate-[spin_2s_linear_infinite]" />
        <div className="w-12 h-12 bg-white rounded-full shadow-[0_0_40px_rgba(255,255,255,0.8)] animate-pulse flex items-center justify-center overflow-hidden">
           <div className="text-[10px] font-black text-black">144</div>
        </div>
      </div>
      <div className="flex flex-col">
         <span className="text-xl font-black text-white tracking-[0.3em] uppercase italic">State Lock</span>
         <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-[0.5em]">LOCKED_DETERMINISTIC</span>
      </div>
    </div>
  );
};

export default StandardSentinel;
