
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, ChevronRight } from 'lucide-react';
import { CLILine } from '../types';

interface Props {
  onCommand: (cmd: string) => void;
  lines: CLILine[];
}

const BlackboxCLI: React.FC<Props> = ({ onCommand, lines }) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onCommand(input.trim());
    setInput('');
  };

  return (
    <div className="fixed bottom-10 right-10 w-[550px] h-[450px] bg-black/95 backdrop-blur-8xl border-4 border-indigo-500/60 rounded-[4rem] shadow-8xl flex flex-col z-50 overflow-hidden ring-12 ring-indigo-500/10 group">
      <div className="h-16 bg-slate-900/50 border-b-2 border-white/5 px-10 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Terminal size={24} className="text-indigo-400" />
          <span className="text-[14px] font-black uppercase italic tracking-[0.6em] text-white font-mono">SOVEREIGN_KERNEL_SIG</span>
        </div>
        <div className="flex gap-3">
          <div className="w-3 h-3 rounded-full bg-slate-800" />
          <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_15px_#6366f1]" />
        </div>
      </div>
      
      <div ref={scrollRef} className="flex-1 p-10 font-mono text-[13px] overflow-y-auto space-y-4 scrollbar-hide text-white/80 leading-relaxed uppercase tracking-tight">
        {lines.map((line, i) => (
          <div key={i} className={`flex gap-6 ${
            line.type === 'cmd' ? 'text-indigo-300 font-black' : 
            line.type === 'err' ? 'text-rose-500 font-bold' : 
            line.type === 'sovereign' ? 'text-white font-black bg-indigo-600/30 px-3 py-1 rounded-lg border border-indigo-500/50' :
            line.type === 'sys' ? 'text-slate-700' : 'text-emerald-400 font-bold'
          }`}>
            <span className="opacity-20 shrink-0 select-none">[{i.toString().padStart(4, '0')}]</span>
            <span>{line.text}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-6 bg-slate-900/80 border-t-2 border-white/5 flex items-center gap-6">
        <ChevronRight size={24} className="text-indigo-500" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="EXECUTE_STANDARD_PROTOCOL..."
          className="flex-1 bg-transparent border-none outline-none text-sm font-mono text-white placeholder:text-slate-800 uppercase tracking-[0.2em] font-black"
        />
        <button type="submit" className="p-3 text-indigo-400 hover:text-white transition-all transform hover:scale-110 active:scale-95">
          <Send size={24} />
        </button>
      </form>
    </div>
  );
};

export default BlackboxCLI;
