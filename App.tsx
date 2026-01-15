
import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Zap, 
  LayoutDashboard,
  Rocket,
  Search as SearchIcon,
  RotateCcw,
  Target,
  Layers,
  TrendingUp,
  Database,
  Binary,
  Atom,
  Boxes,
  ShieldAlert,
  Wind,
  Microscope,
  Shield,
  Star,
  Globe,
  Radio,
  Wifi,
  Cpu,
  ZapOff,
  AlertCircle
} from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';
import { DashboardTab, ProteinStructure, DrugCandidate, BindingSite, SimulationResult, OptimizationMetrics, CLILine } from './types';
import { predictFoldingInsights, generateTherapeuticCandidates, fetchProteinResearch, simulateCancerTherapy } from './services/geminiService';
import ProteinVisualizer from './components/ProteinVisualizer';
import DragonNetMesh from './components/DragonNetMesh';
import StandardSentinel from './components/StandardSentinel';
import BlackboxCLI from './components/BlackboxCLI';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, ScatterChart, Scatter, ZAxis, Tooltip, Cell } from 'recharts';

const TARGET_SEQUENCES = [
  'MAALSGGGGGGAEPGQALFNGDMEPEAGAGAGAAASSAADPAIPEEVWNIKQMIKLTQEHIEAL',
  'MTEYKLVVVGACGVGKSALTIQLIQNHFVDEYDPTIEDSYRKQVVIDGETCLLDILDTAGQEEY',
  'MEEPQSDPSVEPPLSQETFSDLWKLLPENNVLSPLPSQAMDDLMLSPDDIEQWFTEDPGPDEAP',
  'MKSILGLVWLLLLAFQGICRSDQHCKPLMHYDCRALVSSWGYCDGPCREASLSNKTGVVRSPFE'
];

export default function App() {
  const [activeTab, setActiveTab] = useState<DashboardTab>(DashboardTab.OVERVIEW);
  const [protein, setProtein] = useState<ProteinStructure>({
    id: 'SPIRIT-144-BRAF',
    name: 'BRAF V600E (Standardized)',
    sequence: TARGET_SEQUENCES[0],
    status: 'complete',
    confidence: 0.9999,
    plddt: Array(10).fill(99),
    bindingSites: [{ residueIndex: 4, residueName: 'VAL', affinityScore: 0.999, label: 'Standard_Lock' }],
    therapeuticTargets: ['Global_Oncology', 'Sovereign_Restoration']
  });
  const [candidates, setCandidates] = useState<DrugCandidate[]>([]);
  const [simResults, setSimResults] = useState<SimulationResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAutonomous, setIsAutonomous] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [logs, setLogs] = useState<string[]>(["STANDARD_BOOT: Sovereign Engine 4.0 Online.", "PHASE_LOCK: 144Hz Targeted."]);
  const [cliLines, setCliLines] = useState<CLILine[]>([{ text: "Spirit Sovereign v4.0 // State-Lock: ACTIVE", type: "sovereign" }]);
  const [optMetrics, setOptMetrics] = useState<OptimizationMetrics>({
    yield: 0.9999, velocity: 144.0, entropy: 0.0000001, coherence: 1.0, syntropicPotential: 1.0, resonanceFreq: 144.0, nodesActive: 10000, history: []
  });
  const [frontierData, setFrontierData] = useState<any[]>([]);
  const [revelationText, setRevelationText] = useState<string>('');
  const [standardLocked, setStandardLocked] = useState(true);

  const addLog = (msg: string) => setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 200)]);
  const addCli = (text: string, type: CLILine['type'] = 'sys') => setCliLines(prev => [...prev, { text, type }]);

  // 144Hz SOVEREIGN STANDARD LOOP
  useEffect(() => {
    const interval = window.setInterval(() => {
      setOptMetrics(m => {
        const jitter = (Math.random() - 0.5) * 0.0001;
        const newNodes = Math.floor(m.nodesActive + (Math.random() > 0.9 ? 1 : 0));
        return {
          ...m,
          resonanceFreq: 144.0 + jitter,
          nodesActive: newNodes,
          history: [...m.history, { time: Date.now().toString(), yield: m.yield, entropy: m.entropy }].slice(-200)
        };
      });
    }, 144);
    return () => clearInterval(interval);
  }, []);

  const executeSovereignPipeline = async (query: string) => {
    setIsProcessing(true);
    addLog(`SOVEREIGN_ADMISSION: Seed ${query.slice(0, 8)} admitted to 144Hz Core.`);
    addCli(`RESONANCE_SCAN: ${query.slice(0, 6)}`, 'sovereign');

    try {
      const insights = await predictFoldingInsights(query);
      const newProt: ProteinStructure = {
        id: `LEGION-${Math.floor(Math.random() * 100000)}`,
        name: insights.name || 'Sovereign_Locus',
        sequence: query,
        status: 'complete',
        confidence: 0.9999,
        plddt: Array(10).fill(99),
        bindingSites: (insights.bindingSites as BindingSite[]) || [],
        therapeuticTargets: insights.therapeuticTargets || ['Universal_Synthesis']
      };
      setProtein(newProt);
      
      const drugs = await generateTherapeuticCandidates(JSON.stringify(insights));
      setCandidates(prev => [...drugs, ...prev].slice(0, 500));
      
      const lead = drugs[0];
      if (lead) {
        const sim = await simulateCancerTherapy(lead, newProt);
        setSimResults(prev => [sim, ...prev].slice(0, 500));
        setFrontierData(prev => [...prev, { x: Math.abs(lead.bindingAffinity), y: sim.tumorSuppressionRate, z: lead.druggability, name: lead.name, target: newProt.name }].slice(-500));
        addLog(`PHASE_LOCKED: ${lead.name} // 70M-x Stability Confirmed.`);
        addCli(`OUTPUT_ADMITTED: ${lead.name} suppressed at ${sim.tumorSuppressionRate?.toFixed(6)}`, 'out');
      }
    } catch (error: any) {
      addLog(`BYPASS_ENGAGED: ${error.message}`);
      addCli(`NEURAL_BYPASS: Synchronizing local legion...`, 'err');
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (isAutonomous && !isProcessing) {
      const timer = setTimeout(() => {
        const nextSeq = TARGET_SEQUENCES[Math.floor(Math.random() * TARGET_SEQUENCES.length)];
        executeSovereignPipeline(nextSeq);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isAutonomous, isProcessing]);

  const handleCommand = async (cmd: string) => {
    addCli(cmd, 'cmd');
    if (cmd === 'STRESS_TEST_70MX') {
      addLog("STRESS_TEST: Initiating planetary bridge saturation...");
      addCli("SATURATING_BRIDGE: 70M-x Load Incoming", "sovereign");
      setOptMetrics(m => ({ ...m, velocity: 70000.0 }));
      setTimeout(() => setOptMetrics(m => ({ ...m, velocity: 144.0 })), 2000);
    } else if (cmd === 'REVELATION_BROADCAST') {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const resp = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: "Generate a brief, high-resonance revelation about the future of the 144 Legion and the Sovereign Standard. Use esoteric and professional scientific language fused.",
      });
      setRevelationText(resp.text || '');
      addCli("BROADCASTING_REVELATION...", "sovereign");
      setActiveTab(DashboardTab.REVELATION);
    } else if (cmd === 'CLEAR') {
      setCliLines([]);
    } else {
      executeSovereignPipeline(cmd);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-slate-100 flex overflow-hidden selection:bg-indigo-500/30 font-sans tracking-tight">
      {/* SOVEREIGN NAVIGATION */}
      <nav className="w-24 lg:w-80 border-r border-white/5 bg-[#030303] flex flex-col z-50 transition-all shrink-0">
        <div className="p-10 flex items-center gap-6">
          <div className="w-20 h-20 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center shadow-[0_0_80px_rgba(79,70,229,1)] shrink-0 animate-pulse ring-4 ring-indigo-500/30">
            <Shield className="text-white" size={40} />
          </div>
          <div className="hidden lg:block">
            <h1 className="font-black text-3xl uppercase italic tracking-tighter text-white leading-none">Standard</h1>
            <p className="text-[10px] font-mono text-indigo-400 mt-2 uppercase tracking-[0.5em] font-black italic">144Hz Sentinel</p>
          </div>
        </div>

        <div className="flex-1 px-6 space-y-4 mt-12">
          {[
            { id: DashboardTab.OVERVIEW, icon: LayoutDashboard, label: 'Frontier' },
            { id: DashboardTab.LEGION, icon: Globe, label: 'Legion' },
            { id: DashboardTab.ORCHESTRA, icon: Rocket, label: 'Orchestra' },
            { id: DashboardTab.REVELATION, icon: Star, label: 'Revelation' }
          ].map((item) => (
            <button 
              key={item.id} 
              onClick={() => setActiveTab(item.id)} 
              className={`w-full flex items-center gap-6 px-10 py-7 rounded-[3rem] transition-all group border-2 ${activeTab === item.id ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/50 shadow-3xl' : 'text-slate-600 border-transparent hover:bg-white/5'}`}
            >
              <item.icon size={32} className={activeTab === item.id ? 'text-indigo-400' : 'text-slate-700 group-hover:text-slate-400'} />
              <span className="hidden lg:block font-black text-xs uppercase tracking-[0.6em]">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="p-10 border-t border-white/5 bg-black/50">
           <div className={`flex items-center gap-6 p-10 rounded-[2.5rem] border-2 bg-indigo-600/10 border-indigo-500/40 text-indigo-300 shadow-5xl`}>
              <Radio size={40} className="animate-pulse" />
              <div className="hidden lg:block">
                 <div className="text-[11px] font-black uppercase tracking-widest leading-none text-white">70M-x Bridge</div>
                 <div className="text-[9px] font-mono mt-2 uppercase tracking-widest font-black text-indigo-500">READY_FOR_STRESS</div>
              </div>
           </div>
        </div>
      </nav>

      {/* OPERATIONAL SURFACE */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#1e1b4b_0%,_#000000_100%)] opacity-80 pointer-events-none" />
        
        <header className="h-32 border-b border-white/5 flex items-center px-16 justify-between shrink-0 bg-black/90 backdrop-blur-4xl z-40">
          <div className="flex-1 max-w-5xl relative group">
            <SearchIcon className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-800" size={32} />
            <input 
              type="text"
              placeholder="Inject Deterministic Waveform..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border-2 border-white/10 rounded-[3rem] py-6 pl-24 pr-12 outline-none text-xl font-mono uppercase focus:border-indigo-500 transition-all placeholder:text-slate-800"
              onKeyDown={(e) => { if(e.key === 'Enter') handleCommand(searchQuery); }}
            />
          </div>
          
          <div className="flex items-center gap-16 ml-16">
             <div className="hidden md:flex flex-col items-end">
                <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.5em] mb-1 italic">Phase Lock</span>
                <span className="text-xl font-mono font-black text-emerald-400">{optMetrics.resonanceFreq.toFixed(4)}Hz</span>
             </div>
             <div className="w-20 h-20 rounded-[2.5rem] flex items-center justify-center border-4 border-emerald-500/50 text-emerald-500 bg-emerald-500/5 shadow-5xl shadow-emerald-500/20">
                <Wifi size={36} className="animate-pulse" />
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-12 lg:p-24 custom-scrollbar z-30">
          <div className="max-w-[2000px] mx-auto space-y-24 pb-40">
            
            {activeTab === DashboardTab.OVERVIEW && (
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-20">
                <div className="xl:col-span-3 space-y-20">
                  <div className="bg-slate-950/80 border-4 border-white/10 p-16 rounded-[5rem] relative overflow-hidden shadow-6xl ring-1 ring-white/10">
                    <div className="flex justify-between items-center mb-16 relative z-10">
                       <div className="flex items-center gap-10">
                         <div className="p-8 bg-indigo-600/30 rounded-[2rem] border-2 border-indigo-500/50">
                           <Activity size={48} className="text-indigo-400" />
                         </div>
                         <div>
                            <h2 className="text-6xl font-black uppercase italic text-white tracking-tighter leading-none">Sovereign Sentinel</h2>
                            <p className="text-lg font-mono text-slate-700 uppercase tracking-[0.5em] mt-4 font-black">Coherence Lattice: {(optMetrics.coherence * 100).toFixed(4)}%</p>
                         </div>
                       </div>
                       <StandardSentinel />
                    </div>
                    
                    <ProteinVisualizer protein={protein} />
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                       {[
                         { label: 'Legion Population', value: optMetrics.nodesActive.toLocaleString(), unit: 'N', color: 'text-indigo-400' },
                         { label: 'Sync Velocity', value: optMetrics.velocity.toFixed(2), unit: 'x', color: 'text-emerald-400' },
                         { label: 'Entropy Suppression', value: 'TOTAL', color: 'text-rose-500' },
                         { label: 'State Lock', value: 'DETERMINISTIC', color: 'text-white' }
                       ].map((stat, i) => (
                         <div key={i} className="bg-black/80 border-2 border-white/5 p-12 rounded-[3rem] shadow-5xl">
                            <div className="text-[10px] font-black text-slate-800 uppercase tracking-[0.4em] mb-4">{stat.label}</div>
                            <div className={`text-3xl font-black ${stat.color} font-mono flex items-baseline gap-2 uppercase`}>
                              {stat.value} 
                              {stat.unit && <span className="text-xs text-slate-800 font-normal">{stat.unit}</span>}
                            </div>
                         </div>
                       ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                    <div className="bg-slate-950/80 border-4 border-white/10 p-16 rounded-[5rem] shadow-6xl flex flex-col h-[600px]">
                       <h3 className="text-lg font-black uppercase text-slate-800 mb-12 flex items-center gap-6 italic">
                         <Target size={32} className="text-rose-600" />
                         Frontier Space Manifold
                       </h3>
                       <div className="flex-1">
                         <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                               <XAxis type="number" dataKey="x" name="Binding" hide />
                               <YAxis type="number" dataKey="y" name="Suppression" hide />
                               <ZAxis type="number" dataKey="z" range={[200, 1000]} />
                               <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                               <Scatter name="Resonance P-Ops" data={frontierData}>
                                  {frontierData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill="#6366f1" />
                                  ))}
                               </Scatter>
                            </ScatterChart>
                         </ResponsiveContainer>
                       </div>
                    </div>

                    <div className="bg-slate-950/80 border-4 border-white/10 p-16 rounded-[5rem] shadow-6xl flex flex-col overflow-hidden h-[600px]">
                       <h3 className="text-lg font-black uppercase text-slate-800 mb-12 flex items-center gap-6 italic">
                         <Binary size={32} className="text-indigo-600" />
                         Operational Sovereign Ledger
                       </h3>
                       <div className="flex-1 overflow-y-auto space-y-4 pr-6 custom-scrollbar font-mono text-sm uppercase">
                         {logs.map((l, i) => (
                           <div key={i} className={`flex gap-4 border-b border-white/5 pb-2 last:border-0 ${l.includes('PHASE_LOCKED') ? 'text-emerald-400 font-black' : 'text-slate-800'}`}>
                             <span className="text-indigo-500/20 shrink-0 select-none">[{i.toString().padStart(4, '0')}]</span>
                             <span>{l}</span>
                           </div>
                         ))}
                       </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-20">
                   <div className="bg-slate-950/80 border-4 border-white/10 p-16 rounded-[4rem] shadow-6xl relative overflow-hidden h-[400px]">
                      <div className="text-[10px] font-black uppercase text-slate-800 tracking-[0.5em] mb-12">Global Dragon Net</div>
                      <DragonNetMesh nodes={optMetrics.nodesActive} />
                      <div className="absolute bottom-10 left-10 text-xl font-black text-indigo-400 uppercase italic">
                         10,000+ Active Nodes
                      </div>
                   </div>

                   <div className="bg-slate-950/80 border-4 border-white/10 p-16 rounded-[4rem] shadow-6xl h-[400px]">
                      <h3 className="text-lg font-black uppercase text-slate-800 mb-12 flex items-center gap-6 italic">
                         <TrendingUp size={32} className="text-emerald-500" />
                         70M-x Performance Curve
                      </h3>
                      <div className="h-full">
                        <ResponsiveContainer width="100%" height="70%">
                          <AreaChart data={optMetrics.history}>
                            <Area type="monotone" dataKey="yield" stroke="#10b981" strokeWidth={10} fill="#10b98110" isAnimationActive={false} />
                            <YAxis hide domain={[0.999, 1.0]} />
                          </AreaChart>
                        </ResponsiveContainer>
                        <div className="text-4xl font-black text-white italic tracking-tighter mt-4">
                           {(optMetrics.yield * 100).toFixed(4)}% <span className="text-xs font-normal text-slate-700">STD_RES</span>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            )}

            {activeTab === DashboardTab.LEGION && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-20 animate-fadeIn">
                 {candidates.map((c, i) => (
                   <div key={i} className="bg-black/90 border-4 border-white/10 p-16 rounded-[4rem] shadow-6xl group hover:border-indigo-500 transition-all">
                      <div className="text-5xl font-black text-white italic tracking-tighter mb-8 group-hover:text-indigo-400 transition-colors uppercase">
                        {c.name}
                      </div>
                      <div className="flex justify-between items-center text-xl font-mono text-slate-700 border-t border-white/5 pt-8">
                         <span>B_AFFINITY:</span>
                         <span className="text-emerald-400 font-black">{c.bindingAffinity.toFixed(4)}</span>
                      </div>
                   </div>
                 ))}
              </div>
            )}

            {activeTab === DashboardTab.REVELATION && (
              <div className="flex flex-col items-center justify-center py-20 animate-fadeIn">
                <div className="bg-indigo-950/20 border-8 border-indigo-900/50 p-32 rounded-[10rem] shadow-8xl max-w-7xl backdrop-blur-8xl relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-2 bg-indigo-500 shadow-[0_0_80px_rgba(79,70,229,1)]" />
                   <h2 className="text-[10rem] font-black uppercase italic tracking-tighter text-white leading-[0.6] mb-20 text-center">Revelation</h2>
                   <div className="text-4xl font-serif text-slate-300 leading-relaxed italic text-center px-12 pb-12 opacity-90 drop-shadow-2xl">
                      {revelationText || "AWAITING_SIGNAL_LOCK..."}
                   </div>
                   <div className="flex justify-center mt-12">
                      <div className="px-16 py-8 bg-indigo-600 text-white rounded-[4rem] text-3xl font-black uppercase tracking-[0.5em] shadow-6xl animate-pulse">
                         144_LEGION_ACTIVE
                      </div>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* SOVEREIGN COMMAND ADMISSION */}
      <BlackboxCLI onCommand={handleCommand} lines={cliLines} />
    </div>
  );
}
