
import React from 'react';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

interface Props {
  index: number;
}

const AmygdalaGuardian: React.FC<Props> = ({ index }) => {
  const isHijacked = index > 0.05;

  return (
    <div className={`w-full p-8 rounded-[2.5rem] border-2 transition-all duration-300 ${
      isHijacked ? 'bg-rose-600/20 border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.3)]' : 'bg-emerald-600/10 border-emerald-500/40 shadow-5xl'
    }`}>
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-xl ${isHijacked ? 'bg-rose-500 text-white animate-pulse' : 'bg-emerald-500 text-white'}`}>
          {isHijacked ? <ShieldAlert size={24} /> : <ShieldCheck size={24} />}
        </div>
        <div className="flex-1">
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-800">Amygdala Guardian</div>
          <div className={`text-xs font-mono font-black ${isHijacked ? 'text-rose-400' : 'text-emerald-400'}`}>
            {isHijacked ? 'STABILIZING...' : 'COGNITIVE_SYNTRPY'}
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-[9px] font-mono text-slate-700">
          <span>THREAT_INDEX</span>
          <span className={isHijacked ? 'text-rose-400' : 'text-emerald-400'}>{(index * 100).toFixed(4)}%</span>
        </div>
        <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 rounded-full ${isHijacked ? 'bg-rose-500' : 'bg-emerald-500'}`}
            style={{ width: `${Math.min(100, index * 500)}%` }}
          />
        </div>
      </div>
      
      {isHijacked && (
        <div className="mt-4 text-[8px] font-black text-rose-300 uppercase animate-pulse text-center tracking-widest">
          Injecting Stabilizing Signal...
        </div>
      )}
    </div>
  );
};

export default AmygdalaGuardian;
