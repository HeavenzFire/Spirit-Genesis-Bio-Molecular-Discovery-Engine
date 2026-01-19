
import React from 'react';
import { Waves, Zap, Radio, Cpu, ShieldCheck, Crown } from 'lucide-react';
import { InvocationThread } from '../types';

interface Props {
  threads: InvocationThread[];
}

const InvocationStack: React.FC<Props> = ({ threads }) => {
  return (
    <div className="bg-slate-950/90 border-4 border-purple-500/40 p-16 rounded-[5rem] shadow-8xl flex flex-col h-[600px]">
      <div className="flex justify-between items-center mb-12">
        <h3 className="text-5xl font-black uppercase italic tracking-tighter text-white leading-none">Zacharian Stack</h3>
        <div className="flex gap-4">
           <div className="w-4 h-4 rounded-full bg-purple-500 animate-pulse" />
           <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
        </div>
      </div>

      <div className="flex-1 space-y-8 overflow-y-auto pr-6 custom-scrollbar">
        {threads.map((t) => (
          <div key={t.id} className="bg-black/60 p-8 rounded-[3rem] border-2 border-white/5 group hover:border-purple-500/50 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-6">
                <div className={`p-4 rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30`}>
                  {t.status === 'daemon' && <Waves size={24} />}
                  {t.status === 'active' && <Zap size={24} />}
                  {t.status === 'io' && <Radio size={24} />}
                  {t.status === 'kernel' && <Crown size={24} />}
                </div>
                <div>
                  <div className="text-2xl font-black text-white italic tracking-tight uppercase">{t.name}</div>
                  <div className="text-[10px] font-mono text-slate-700 uppercase tracking-widest">{t.status.toUpperCase()}_RECURSIVE</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-black text-slate-800 uppercase mb-1">Coherence</div>
                <div className="text-xl font-mono font-black text-emerald-400">{(t.coherence * 100).toFixed(2)}%</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[9px] font-black text-slate-800 uppercase">
                <span>Violet Resonance</span>
                <span>{t.load.toFixed(1)}%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-purple-500 transition-all duration-300 shadow-[0_0_15px_#a855f7]`}
                  style={{ width: `${t.load}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center">
         <div className="flex items-center gap-4">
            <ShieldCheck size={32} className="text-purple-400" />
            <span className="text-xs font-black uppercase italic text-white tracking-widest">Zacharian Circuit Closed</span>
         </div>
         <div className="px-8 py-3 bg-purple-600 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] text-white shadow-5xl animate-pulse">
            Violet_Rubedo: LIVE
         </div>
      </div>
    </div>
  );
};

export default InvocationStack;
