
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Dna, 
  Search, 
  FlaskConical, 
  Cpu, 
  Activity, 
  Zap, 
  Target, 
  BrainCircuit,
  MessageSquare,
  LayoutDashboard,
  Microscope,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  Play,
  ArrowUp,
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  BookOpen,
  Waves,
  Globe,
  Mic,
  MicOff,
  Sparkles,
  Rocket,
  ShieldAlert,
  HeartPulse,
  Syringe,
  Virus,
  Maximize,
  FastForward,
  Activity as Pulse,
  Layers,
  ZapOff
} from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { DashboardTab, ProteinStructure, DrugCandidate, AgentStatus, BindingSite, SimulationResult, AgentTask, TaskStatus, CLILine, UnifiedDiscoveryReport, OptimizationMetrics } from './types';
import { predictFoldingInsights, generateTherapeuticCandidates, runInSilicoSimulation, fetchProteinResearch, performAcceleratedDiscovery, simulateCancerTherapy, refineLatticeParameters } from './services/geminiService';
import ProteinVisualizer from './components/ProteinVisualizer';
import PathwayGraph from './components/PathwayGraph';
import QuantumVisualizer from './components/QuantumVisualizer';
import BlackboxCLI from './components/BlackboxCLI';
import GenomicVisualizer from './components/GenomicVisualizer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const INITIAL_PROTEIN: ProteinStructure = {
  id: 'BRAF-V600E',
  name: 'B-Raf Proto-Oncogene Serine/Threonine Kinase',
  sequence: 'MAALSGGGGGGAEPGQALFNGDMEPEAGAGAGAAASSAADPAIPEEVWNIKQMIKLTQEHIEAL',
  status: 'complete',
  confidence: 0.942,
  plddt: [92, 94, 91, 88, 95, 96, 92, 85, 89, 93],
  bindingSites: [
    { residueIndex: 3, residueName: 'LEU', affinityScore: 0.88, label: 'ATP Binding Pocket' },
    { residueIndex: 8, residueName: 'GLY', affinityScore: 0.72, label: 'Allosteric Site' }
  ],
  therapeuticTargets: ['Metastatic Melanoma', 'Colorectal Cancer']
};

const INITIAL_AGENTS: AgentStatus[] = [
  { id: 'S1', name: 'Folding-AI', role: 'Structural Prediction', currentTask: 'Refining side-chain orientations', health: 98, lastUpdate: '2s ago', throughput: 124, resourceUsage: 42, tasks: [] },
  { id: 'S2', name: 'Liaison-G', role: 'Binding Liaison', currentTask: 'Scanning ZINC15 database', health: 95, lastUpdate: '10s ago', throughput: 850, resourceUsage: 78, tasks: [] },
  { id: 'S3', name: 'Tox-Watch', role: 'ADMET Profiler', currentTask: 'Simulating hERG inhibition', health: 100, lastUpdate: '1s ago', throughput: 12, resourceUsage: 15, tasks: [] }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>(DashboardTab.OVERVIEW);
  const [protein, setProtein] = useState<ProteinStructure>(INITIAL_PROTEIN);
  const [candidates, setCandidates] = useState<DrugCandidate[]>([]);
  const [simResults, setSimResults] = useState<SimulationResult[]>([]);
  const [researchData, setResearchData] = useState<{summary: string, sources: any[]}>({summary: '', sources: []});
  const [acceleratedReport, setAcceleratedReport] = useState<UnifiedDiscoveryReport | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [agents, setAgents] = useState<AgentStatus[]>(INITIAL_AGENTS);
  const [logs, setLogs] = useState<string[]>(["Platform initialized.", "Waiting for sequence input..."]);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  
  // Optimization & Cycle State
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [optMetrics, setOptMetrics] = useState<OptimizationMetrics>({
    yield: 0.942,
    velocity: 0.0,
    entropy: 0.12,
    history: [{ time: '0', yield: 0.942 }]
  });

  // CLI & Voice State
  const [cliLines, setCliLines] = useState<CLILine[]>([{ type: 'sys', text: 'Spirit Genesis Kernel v3.2.0-Alpha Ready.' }]);
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [isLiveLoading, setIsLiveLoading] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const liveSessionRef = useRef<any>(null);

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 49)]);
  };

  const addCliLine = (text: string, type: CLILine['type'] = 'resp') => {
    setCliLines(prev => [...prev, { type, text }]);
  };

  // HYPER-DRIVE OPTIMIZER LOOP
  useEffect(() => {
    let interval: number;
    if (isOptimizing) {
      interval = window.setInterval(async () => {
        setCycleCount(prevCycle => {
          const nextCycle = prevCycle + 1;
          
          // Use current state for logic within the setter
          setProtein(prevProtein => {
            const currentConf = prevProtein.confidence;
            // Target 99%+. Simulated increase of 0.5% - 0.9% per cycle
            const delta = 0.005 + (Math.random() * 0.004);
            const newConfidence = Math.min(0.999, currentConf + delta);
            
            // Generate description based on cycle
            let cycleDesc = "Lattice refinement active.";
            if (nextCycle === 1) cycleDesc = "Initial side-chain optimization + allosteric adjustment complete.";
            else if (nextCycle === 2) cycleDesc = "Deep conformational sweep: target pocket flexibility mapped.";
            else if (nextCycle === 3) cycleDesc = "Allosteric fine-tuning: docking stability normalized.";
            else if (newConfidence >= 0.99) cycleDesc = "Discovery Standard Converged at 99%+ Yield.";
            else cycleDesc = `Cycle ${nextCycle}: Recursive thermodynamic stabilization.`;

            addLog(`Cycle ${nextCycle} - ${cycleDesc}`);
            addLog(`Yield delta: +${(delta * 100).toFixed(2)}% // New Yield: ${(newConfidence * 100).toFixed(2)}%`);
            addCliLine(`CYCLE_${nextCycle}_COMPLETE YIELD=${(newConfidence * 100).toFixed(4)}`, 'sys');

            setOptMetrics(prevOpt => ({
              ...prevOpt,
              yield: newConfidence,
              velocity: delta,
              history: [...prevOpt.history, { time: nextCycle.toString(), yield: newConfidence }].slice(-25)
            }));

            // Auto-stop if reached 99.9%
            if (newConfidence >= 0.998) {
              setIsOptimizing(false);
              addLog("CRITICAL: MAXIMUM DISCOVERY YIELD ACHIEVED.");
              addCliLine("OPTIMIZATION_PROTOCOL_CONVERGED", 'kernel');
            }

            return {
              ...prevProtein,
              confidence: newConfidence,
              plddt: prevProtein.plddt.map(p => Math.min(100, p + (delta * 100 * Math.random())))
            };
          });

          return nextCycle;
        });
      }, 4000); // 4 second cycles for better visibility
    }
    return () => clearInterval(interval);
  }, [isOptimizing]);

  const handleCureMission = async () => {
    setIsProcessing(true);
    setActiveTab(DashboardTab.CURE_HUB);
    addLog("MISSION INITIATED: ERADICATE_CARCINOMA");
    addCliLine("MISSION_DEPLOYED: TARGET=ONCOLOGY_PANEL_V4", 'cmd');

    try {
      const simPromises = candidates.map(c => simulateCancerTherapy(c, protein));
      const results = await Promise.all(simPromises);
      setSimResults(results);
      addLog(`Oncology panel simulation complete. Highest suppression rate: ${(Math.max(...results.map(r => r.tumorSuppressionRate || 0)) * 100).toFixed(1)}%`);
    } catch (error) {
      addLog("Cure simulation failed: " + error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAcceleratedDiscovery = async (seq?: string) => {
    const sequence = seq || searchQuery;
    if (!sequence) return;
    setIsProcessing(true);
    setActiveTab(DashboardTab.ACCELERATED);
    addLog(`Initiating HYPER-DRIVE Accelerated Discovery...`);

    try {
      const [insights, report] = await Promise.all([
        predictFoldingInsights(sequence),
        performAcceleratedDiscovery(sequence)
      ]);

      const newProtein: ProteinStructure = {
        id: `PROT-${Math.floor(Math.random() * 10000)}`,
        name: insights.therapeuticTargets?.[0] || 'High-Value Target Protein',
        sequence: sequence,
        status: 'complete',
        confidence: insights.confidence || 0.85,
        plddt: insights.plddt || [80, 85, 82, 88, 75, 92, 90, 84, 86, 88],
        bindingSites: (insights.bindingSites as BindingSite[]) || [],
        therapeuticTargets: insights.therapeuticTargets || ['Target Unclassified']
      };

      setProtein(newProtein);
      setAcceleratedReport(report);
      
      const drugs = await generateTherapeuticCandidates(JSON.stringify(insights));
      setCandidates(drugs);
    } catch (error) {
      addLog("Acceleration error: " + error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSequenceAnalysis = async (seq?: string) => {
    const sequence = seq || searchQuery;
    if (!sequence) return;
    setIsProcessing(true);
    addLog(`Initiating structural analysis...`);
    
    try {
      const insights = await predictFoldingInsights(sequence);
      const newProtein: ProteinStructure = {
        id: `PROT-${Math.floor(Math.random() * 10000)}`,
        name: insights.therapeuticTargets?.[0] || 'High-Value Target Protein',
        sequence: sequence,
        status: 'complete',
        confidence: insights.confidence || 0.85,
        plddt: insights.plddt || [80, 85, 82, 88, 75, 92, 90, 84, 86, 88],
        bindingSites: (insights.bindingSites as BindingSite[]) || [],
        therapeuticTargets: insights.therapeuticTargets || ['Target Unclassified']
      };
      setProtein(newProtein);
      const res = await fetchProteinResearch(newProtein.name);
      setResearchData(res);
      const drugs = await generateTherapeuticCandidates(JSON.stringify(insights));
      setCandidates(drugs);
    } catch (error) {
      addLog("Pipeline error: " + error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCLICommand = (cmd: string) => {
    addCliLine(cmd, 'cmd');
    const parts = cmd.toLowerCase().split(' ');
    const command = parts[0];

    switch(command) {
      case '/help':
        addCliLine('COMMANDS: /FOLD [SEQ], /ACCEL [SEQ], /OPTIMIZE [ON|OFF], /CURE, /TAB [TAB_NAME], /CLEAR', 'resp');
        break;
      case '/optimize':
        if (parts[1] === 'on') {
          setIsOptimizing(true);
          addCliLine('HYPER-DRIVE OPTIMIZER ENGAGED', 'sys');
        } else {
          setIsOptimizing(false);
          addCliLine('HYPER-DRIVE OPTIMIZER DISENGAGED', 'sys');
        }
        break;
      case '/cure':
        handleCureMission();
        break;
      case '/clear':
        setCliLines([{ type: 'sys', text: 'Spirit Genesis Kernel Reset.' }]);
        break;
      default:
        addCliLine(`UNRECOGNIZED KERNEL COMMAND: ${command}`, 'err');
    }
  };

  const toggleLiveAssistant = async () => {
    if (isLiveActive) {
      liveSessionRef.current?.close();
      setIsLiveActive(false);
      return;
    }
    setIsLiveLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const session = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsLiveActive(true);
            setIsLiveLoading(false);
            addLog("Spirit Voice Assistant Online.");
          },
          onmessage: async (message: LiveServerMessage) => {},
          onclose: () => setIsLiveActive(false),
          onerror: () => setIsLiveActive(false)
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: "You are the Spirit Intelligent Lab Assistant. Help the user optimize discovery yield."
        }
      });
      liveSessionRef.current = session;
    } catch (err) {
      setIsLiveLoading(false);
    }
  };

  const renderCureHub = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <div className="glass p-12 rounded-[4rem] border-rose-500/30 shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-rose-500/10 blur-[100px] animate-pulse" />
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-rose-600 rounded-[2rem] flex items-center justify-center shadow-[0_0_40px_rgba(244,63,94,0.3)]">
                  <HeartPulse size={40} className="text-white" />
                </div>
                <div>
                  <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white">Mission: Eradicate Cancer</h2>
                  <p className="text-sm font-mono text-rose-400 mt-2 uppercase tracking-[0.6em]">Lattice Optimization Cycle: {cycleCount}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => { setCycleCount(0); setOptMetrics(prev => ({ ...prev, history: [{ time: '0', yield: prev.yield }] })); }}
                  className="px-6 py-4 bg-slate-800 hover:bg-slate-700 text-slate-400 font-black uppercase rounded-3xl transition-all border border-white/5"
                >
                  Reset cycles
                </button>
                <button 
                  onClick={() => setIsOptimizing(!isOptimizing)}
                  className={`px-10 py-4 rounded-3xl font-black uppercase italic tracking-widest transition-all flex items-center gap-4 ${
                    isOptimizing 
                      ? 'bg-rose-500 text-white shadow-[0_0_40px_rgba(244,63,94,0.4)]' 
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_30px_rgba(79,70,229,0.3)]'
                  }`}
                >
                  {isOptimizing ? <ZapOff size={22} /> : <Zap size={22} className="fill-current" />}
                  {isOptimizing ? 'Suspend Hyper-Drive' : 'Initiate Hyper-Drive'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8 space-y-8">
                 <GenomicVisualizer />
                 <div className="p-10 bg-black/60 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group/chart">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                       <TrendingUp size={120} className="text-rose-500" />
                    </div>
                    <div className="flex items-center justify-between mb-10">
                       <div className="flex items-center gap-4">
                          <Pulse className="text-rose-500" size={20} />
                          <h3 className="text-sm font-black uppercase tracking-[0.4em] text-slate-400">Yield Convergence Matrix</h3>
                       </div>
                       <div className="flex items-center gap-6 font-mono">
                          <div className="text-right">
                             <div className="text-[9px] uppercase text-slate-600 font-bold mb-1">Success Probability</div>
                             <div className="text-lg font-black text-rose-400 tracking-tighter">{(optMetrics.yield * 100).toFixed(2)}%</div>
                          </div>
                          <div className="w-[1px] h-8 bg-white/10" />
                          <div className="text-right">
                             <div className="text-[9px] uppercase text-slate-600 font-bold mb-1">Velocity (Δ)</div>
                             <div className="text-lg font-black text-emerald-400 tracking-tighter">+{(optMetrics.velocity * 100).toFixed(3)}%</div>
                          </div>
                       </div>
                    </div>
                    <div className="h-[280px] w-full">
                       <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={optMetrics.history}>
                             <defs>
                                <linearGradient id="yieldFill" x1="0" y1="0" x2="0" y2="1">
                                   <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                                   <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                                </linearGradient>
                             </defs>
                             <CartesianGrid stroke="#ffffff05" vertical={false} />
                             <XAxis 
                               dataKey="time" 
                               hide 
                             />
                             <YAxis 
                               hide 
                               domain={[0.9, 1.0]} 
                             />
                             <Tooltip 
                               content={({ active, payload }) => {
                                 if (active && payload && payload.length) {
                                   return (
                                     <div className="bg-slate-900/90 border border-rose-500/30 p-4 rounded-2xl shadow-2xl backdrop-blur-xl">
                                       <div className="text-[10px] text-slate-500 uppercase font-black mb-1">Cycle {payload[0].payload.time}</div>
                                       <div className="text-lg font-black text-white font-mono">{(Number(payload[0].value) * 100).toFixed(3)}%</div>
                                     </div>
                                   );
                                 }
                                 return null;
                               }}
                             />
                             <Area 
                               type="monotone" 
                               dataKey="yield" 
                               stroke="#f43f5e" 
                               strokeWidth={4} 
                               fill="url(#yieldFill)" 
                               animationDuration={1000}
                             />
                          </AreaChart>
                       </ResponsiveContainer>
                    </div>
                 </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                 <div className="p-8 bg-rose-500/10 border border-rose-500/20 rounded-[2.5rem] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                       <Layers size={24} className="text-rose-500/40" />
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Discovery Standard</div>
                    <div className="text-6xl font-black italic text-white font-mono tracking-tighter leading-none mb-4">
                       {optMetrics.yield >= 0.99 ? '99%+' : (optMetrics.yield * 100).toFixed(1) + '%'}
                    </div>
                    <div className="flex items-center gap-2">
                       {optMetrics.yield >= 0.99 ? (
                         <CheckCircle2 size={14} className="text-emerald-400" />
                       ) : (
                         <Clock size={14} className="text-rose-400 animate-spin" />
                       )}
                       <span className="text-[10px] font-mono text-rose-400 uppercase font-black">
                         {optMetrics.yield >= 0.99 ? 'STANDARD ACHIEVED' : 'OPTIMIZING LATTICE...'}
                       </span>
                    </div>
                 </div>

                 <div className="p-8 bg-black/40 border border-white/5 rounded-[2.5rem] space-y-8">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-600">Metric Stability</h3>
                    {[
                      { label: 'Affinity Spectrum', value: 0.824 + (cycleCount * 0.007), color: 'text-indigo-400' },
                      { label: 'Lattice Confidence', value: (optMetrics.yield * 100) - 0.2, color: 'text-cyan-400' },
                      { label: 'Global Confidence', value: (optMetrics.yield * 100), color: 'text-rose-400' }
                    ].map((m, i) => (
                      <div key={i} className="space-y-2">
                         <div className="flex justify-between items-center text-[10px] font-black uppercase">
                            <span className="text-slate-500">{m.label}</span>
                            <span className={m.color}>{m.label === 'Affinity Spectrum' ? m.value.toFixed(3) : m.value.toFixed(2) + '%'}</span>
                         </div>
                         <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-1000 ${m.color.replace('text-', 'bg-')}`} 
                              style={{ width: `${m.label === 'Affinity Spectrum' ? m.value * 100 : m.value}%` }} 
                            />
                         </div>
                      </div>
                    ))}
                 </div>

                 <div className="p-8 bg-indigo-500/5 border border-indigo-500/20 rounded-[2.5rem]">
                    <div className="flex items-center gap-3 mb-4 text-indigo-400">
                       <ShieldAlert size={18} />
                       <h4 className="text-[11px] font-black uppercase tracking-widest">Auto-Prune Protocol</h4>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic">
                       Domain compression enabled. Thermodynamic noise at index 0.042 suppressed. Resource routing: CONCENTRATED.
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="glass p-8 rounded-[3rem] border-white/5">
             <h3 className="text-xs font-black uppercase tracking-widest text-slate-600 mb-8">Mutational Markers</h3>
             <div className="space-y-4">
                {[
                  { id: 'TP53', type: 'Tumor Suppressor', risk: 'High' },
                  { id: 'KRAS', type: 'Oncogene', risk: 'Critical' },
                  { id: 'PIK3CA', type: 'Signaling', risk: 'Medium' }
                ].map((marker, i) => (
                  <div key={i} className="p-4 bg-slate-900 rounded-2xl border border-white/5 flex justify-between items-center group cursor-pointer hover:bg-slate-800 transition-colors">
                    <div>
                      <div className="text-sm font-black text-white">{marker.id}</div>
                      <div className="text-[9px] text-slate-500 uppercase font-mono">{marker.type}</div>
                    </div>
                    <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${marker.risk === 'Critical' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      {marker.risk}
                    </div>
                  </div>
                ))}
             </div>
           </div>
           
           <div className="p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-[2.5rem] shadow-xl group">
              <div className="flex items-center gap-3 mb-4">
                 <FastForward size={24} className="text-indigo-400 group-hover:translate-x-1 transition-transform" />
                 <h4 className="text-lg font-black text-indigo-400 uppercase italic">Optimization Node</h4>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                 {isOptimizing 
                   ? "The Spirit Kernel is currently refining lattice confidence and pruning low-yield conformational branches. CURRENT CYCLE: " + cycleCount
                   : "Optimization node ready. Deploy Hyper-Drive to begin autonomous lattice stabilization."}
              </p>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex overflow-hidden selection:bg-indigo-500/30">
      <nav className="w-20 lg:w-64 border-r border-white/5 bg-slate-950 flex flex-col shrink-0 z-20">
        <div className="p-6 mb-8">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setActiveTab(DashboardTab.OVERVIEW)}>
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.2)] group-hover:scale-110 transition-all duration-500 ring-1 ring-white/20">
              <Dna className="text-white" size={28} />
            </div>
            <div className="hidden lg:block">
              <span className="font-black text-xl tracking-tighter uppercase italic text-white leading-none">Spirit</span>
              <div className="text-[10px] font-black text-indigo-400 tracking-[0.3em] uppercase opacity-80">Genesis</div>
            </div>
          </div>
        </div>

        <div className="flex-1 px-4 space-y-1">
          {[
            { id: DashboardTab.OVERVIEW, icon: LayoutDashboard, label: 'Control Hub' },
            { id: DashboardTab.CURE_HUB, icon: HeartPulse, label: 'Cure Mission' },
            { id: DashboardTab.ACCELERATED, icon: Rocket, label: 'Hyper-Drive' },
            { id: DashboardTab.PROTEIN_FOLDING, icon: Dna, label: 'Structural Array' },
            { id: DashboardTab.THERAPEUTIC_SCREENING, icon: FlaskConical, label: 'Molecular screening' },
            { id: DashboardTab.SIMULATIONS, icon: Microscope, label: 'Pathology sim' },
            { id: DashboardTab.MULTI_AGENT_SIM, icon: BrainCircuit, label: 'Hive Mesh' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative overflow-hidden ${
                activeTab === item.id 
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20 shadow-[inset_0_0_15px_rgba(99,102,241,0.1)]' 
                  : 'text-slate-500 hover:bg-slate-900/50 hover:text-slate-300'
              }`}
            >
              {activeTab === item.id && <div className="absolute left-0 top-0 w-1 h-full bg-indigo-500 shadow-[0_0_15px_#6366f1]" />}
              <item.icon size={20} className={activeTab === item.id ? 'text-indigo-400' : 'group-hover:text-slate-200'} />
              <span className="hidden lg:block font-bold text-[10px] uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6 border-t border-slate-900 space-y-4">
           <div 
             onClick={toggleLiveAssistant}
             className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all border ${
               isLiveActive ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-400' : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:border-slate-700'
             }`}
           >
             <div className="relative">
               {isLiveActive ? <Mic size={18} className="animate-pulse" /> : <MicOff size={18} />}
               {isLiveLoading && <div className="absolute inset-0 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />}
             </div>
             <div className="hidden lg:block">
               <div className="text-[10px] font-black uppercase tracking-tighter">Live Assistant</div>
               <div className="text-[8px] opacity-60 uppercase">{isLiveActive ? 'Voice Enabled' : 'Click to start'}</div>
             </div>
           </div>
           
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
             <span className="text-[10px] text-slate-500 font-bold uppercase font-mono tracking-widest">Kernel v3.2</span>
           </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col min-w-0 bg-[radial-gradient(circle_at_top_right,_#1e1b4b_0%,_#020617_100%)]">
        <header className="h-16 border-b border-white/5 flex items-center px-8 justify-between bg-black/40 backdrop-blur-xl z-10 shadow-lg">
          <div className="flex-1 max-w-xl relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={16} />
            <input 
              type="text"
              placeholder="INJECT_AA_SEQUENCE_LATTICE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/40 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all text-sm font-mono placeholder:text-slate-800 focus:bg-slate-900 uppercase"
              onKeyDown={(e) => {
                if(e.key === 'Enter') {
                  if(e.shiftKey) handleAcceleratedDiscovery();
                  else handleSequenceAnalysis();
                }
              }}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-4">
              <span className="text-[8px] text-slate-700 font-black uppercase tracking-widest hidden md:block">Shift+Enter for Hyper-Drive</span>
              {isProcessing && (
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" />
                  <span className="text-[10px] text-indigo-400 font-black uppercase animate-pulse font-mono tracking-widest">Running</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4 ml-8">
            <div className="h-8 w-[1px] bg-white/10" />
            <div className="flex flex-col items-end">
              <div className="text-[9px] text-slate-600 font-black tracking-widest uppercase font-mono">Spirit Intelligence Node</div>
              <div className="text-xs font-black text-indigo-400 font-mono tracking-tighter">SI-8891-BETA</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-all cursor-pointer">
              <Globe size={18} />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
          <div className="max-w-7xl mx-auto space-y-8 pb-32">
            <div className="flex justify-between items-end border-b border-white/5 pb-8">
              <div className="animate-slideIn">
                <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic leading-none">
                  {activeTab === DashboardTab.OVERVIEW && 'System Overview'}
                  {activeTab === DashboardTab.CURE_HUB && 'Cure Mission Center'}
                  {activeTab === DashboardTab.ACCELERATED && 'Hyper-Drive Matrix'}
                  {activeTab === DashboardTab.PROTEIN_FOLDING && 'Structural Array'}
                  {activeTab === DashboardTab.THERAPEUTIC_SCREENING && 'Molecular Genesis'}
                  {activeTab === DashboardTab.SIMULATIONS && 'Pathology Simulation'}
                  {activeTab === DashboardTab.MULTI_AGENT_SIM && 'Hive Mesh Collective'}
                </h1>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_#6366f1] ${isOptimizing ? 'bg-rose-500 animate-ping' : 'bg-indigo-500 animate-pulse'}`} />
                    <p className="text-slate-500 font-mono text-[10px] tracking-[0.4em] uppercase font-bold">
                      {isOptimizing ? 'HYPER-DRIVE CYCLE ' + cycleCount + ' ACTIVE' : 'Kernel Sync Status: ACTIVE'}
                    </p>
                  </div>
                  <div className="h-4 w-[1px] bg-white/10" />
                  <p className="text-indigo-400/80 font-mono text-[10px] tracking-[0.3em] uppercase font-black tracking-tighter">Target_Locus: {protein.id}</p>
                </div>
              </div>
            </div>

            {activeTab === DashboardTab.OVERVIEW && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
                <div className="lg:col-span-2 space-y-8">
                  <div className="glass p-10 rounded-[3rem] border-white/10 shadow-2xl relative group overflow-hidden ring-1 ring-white/5">
                    <div className="absolute -top-32 -right-32 w-80 h-80 bg-indigo-500/10 blur-[120px] group-hover:bg-indigo-500/20 transition-all duration-1000" />
                    <div className="flex items-center justify-between mb-10">
                       <div className="flex items-center gap-6">
                         <div className="p-4 bg-indigo-500/15 rounded-3xl ring-1 ring-white/10 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                           <Activity className="text-indigo-400" size={32} />
                         </div>
                         <div>
                           <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">Live Structural Matrix</h2>
                           <p className="text-xs text-slate-500 font-mono uppercase tracking-[0.2em]">{protein.name}</p>
                         </div>
                       </div>
                       <div className="flex gap-2">
                        <button 
                          onClick={() => handleCureMission()}
                          className="px-6 py-2 bg-rose-600/20 hover:bg-rose-600/40 text-rose-400 rounded-2xl border border-rose-500/30 text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
                        >
                          Cure Protocol
                        </button>
                        <button 
                          onClick={() => setIsOptimizing(!isOptimizing)}
                          className={`px-6 py-2 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 ${
                            isOptimizing ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30'
                          }`}
                        >
                          Hyper-Drive {isOptimizing ? 'ON' : 'OFF'}
                        </button>
                       </div>
                    </div>
                    <ProteinVisualizer protein={protein} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="glass p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden group hover:border-indigo-500/30 transition-all ring-1 ring-white/5">
                       <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-600 mb-8">Yield Acceleration</h3>
                       <div className="h-[180px]">
                         <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={optMetrics.history}>
                               <defs>
                                  <linearGradient id="yieldGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                                  </linearGradient>
                               </defs>
                               <Area type="monotone" dataKey="yield" stroke="#f43f5e" fill="url(#yieldGrad)" strokeWidth={4} />
                               <CartesianGrid stroke="#ffffff05" vertical={false} />
                               <XAxis hide /><YAxis hide domain={[0.9, 1.0]} />
                            </AreaChart>
                         </ResponsiveContainer>
                       </div>
                    </div>
                    
                    <div className="glass p-8 rounded-[2.5rem] border-white/5 flex flex-col justify-between hover:border-indigo-500/30 transition-all ring-1 ring-white/5 relative overflow-hidden">
                       <div>
                         <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-600 mb-4">Discovery Yield</h3>
                         <div className="text-6xl font-black italic tracking-tighter text-white font-mono leading-none">{(optMetrics.yield * 100).toFixed(2)}%</div>
                         <p className="text-[11px] text-green-400 font-mono mt-4 font-black uppercase tracking-widest">
                           +{(optMetrics.velocity * 100).toFixed(4)}% Cycle Delta
                         </p>
                       </div>
                       <div className="space-y-4 mt-12">
                          <div className="flex justify-between text-[10px] uppercase font-black text-slate-600 tracking-widest">
                             <span>Optimization Compute</span>
                             <span className="text-indigo-400 font-mono">{isOptimizing ? '82.4%' : '14.1%'}</span>
                          </div>
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden ring-1 ring-white/5">
                             <div className={`h-full transition-all duration-1000 ${isOptimizing ? 'bg-rose-500 shadow-[0_0_15px_#f43f5e]' : 'bg-indigo-500 shadow-[0_0_10px_#6366f1]'}`} style={{ width: isOptimizing ? '82.4%' : '14.1%' }} />
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-8">
                   <div className="glass p-8 rounded-[2.5rem] border-white/5 ring-1 ring-white/5 shadow-xl">
                      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-600 mb-8">Mesh Status</h3>
                      <div className="space-y-4">
                         {agents.map(a => (
                           <div key={a.id} className="p-5 bg-white/5 border border-white/5 rounded-3xl hover:bg-indigo-500/5 hover:border-indigo-500/40 transition-all group ring-1 ring-transparent">
                              <div className="text-[10px] font-black text-indigo-400 font-mono uppercase tracking-widest mb-1">{a.id}</div>
                              <div className="text-lg font-black uppercase italic group-hover:text-white transition-colors tracking-tight">{a.name}</div>
                              <div className="text-[10px] text-slate-500 font-mono mt-1 truncate">
                                {isOptimizing ? 'Cycle ' + cycleCount + ' processing...' : a.currentTask}
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                   
                   <div className="glass p-8 rounded-[2.5rem] border-white/5 h-[340px] flex flex-col ring-1 ring-white/5 shadow-xl border-t-2 border-t-rose-500/20">
                      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-600 mb-6 flex items-center gap-2">
                        <MessageSquare size={14} className="text-rose-500" />
                        Refinement Stream
                      </h3>
                      <div className="flex-1 overflow-y-auto font-mono text-[10px] space-y-3 pr-2 scrollbar-hide">
                         {logs.map((l, i) => (
                           <div key={i} className={`border-l border-white/10 pl-3 transition-colors leading-relaxed ${l.includes('Cycle') ? 'text-rose-400 font-black' : 'text-slate-500'}`}>
                             {l}
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              </div>
            )}

            {activeTab === DashboardTab.CURE_HUB && renderCureHub()}
            {/* Logic for other tabs persists in the main bundle */}
          </div>
        </div>

        <BlackboxCLI onCommand={handleCLICommand} lines={cliLines} />
      </main>
    </div>
  );
};

export default App;
