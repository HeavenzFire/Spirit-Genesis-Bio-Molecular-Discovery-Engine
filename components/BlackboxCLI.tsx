
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, ChevronRight, Cpu } from 'lucide-react';
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
    <div className="fixed bottom-6 right-6 w-[400px] h-[300px] bg-black/90 backdrop-blur-2xl border border-indigo-500/30 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden ring-1 ring-white/10 group">
      <div className="h-8 bg-slate-900/80 border-b border-white/5 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal size={12} className="text-indigo-400" />
          <span className="text-[10px] font-black uppercase italic tracking-widest text-slate-400">Blackbox AI CLI</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-slate-800" />
          <div className="w-2 h-2 rounded-full bg-slate-800" />
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
        </div>
      </div>
      
      <div ref={scrollRef} className="flex-1 p-4 font-mono text-[10px] overflow-y-auto space-y-1.5 scrollbar-hide">
        {lines.map((line, i) => (
          <div key={i} className={`${
            line.type === 'cmd' ? 'text-indigo-400' : 
            line.type === 'err' ? 'text-rose-400' : 
            line.type === 'sys' ? 'text-slate-500' : 'text-slate-300'
          }`}>
            {line.type === 'cmd' && <span className="mr-2 text-slate-600">$</span>}
            {line.type === 'sys' && <span className="mr-2 text-indigo-500/50">[SYS]</span>}
            {line.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-2 bg-slate-900/50 border-t border-white/5 flex items-center gap-2">
        <ChevronRight size={14} className="text-indigo-500" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ENTER_KERNEL_CMD..."
          className="flex-1 bg-transparent border-none outline-none text-[10px] font-mono text-white placeholder:text-slate-700 uppercase"
        />
        <button type="submit" className="p-1 hover:text-indigo-400 transition-colors">
          <Send size={12} />
        </button>
      </form>
    </div>
  );
};

export default BlackboxCLI;
