
export interface ProteinStructure {
  id: string;
  name: string;
  sequence: string;
  status: 'pending' | 'folding' | 'complete';
  confidence: number;
  plddt: number[];
  bindingSites: BindingSite[];
  therapeuticTargets: string[];
}

export interface BindingSite {
  residueIndex: number;
  residueName: string;
  affinityScore: number;
  label: string;
}

export interface DrugCandidate {
  id: string;
  smiles: string;
  name: string;
  targetProteinId: string;
  bindingAffinity: number; // kcal/mol
  toxicityScore: number;
  druggability: number;
  status: 'candidate' | 'simulating' | 'validated';
  description: string;
  explanation?: string; // AI reasoning
}

export interface SimulationResult {
  id: string;
  candidateId: string;
  pathwayAffected: string;
  efficacyScore: number;
  offTargetRisk: number;
  tumorSuppressionRate?: number; // Oncology specific
  mutationalResistance?: number; // Oncology specific
  timestamp: string;
}

export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface AgentTask {
  id: string;
  description: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
}

export interface AgentStatus {
  id: string;
  name: string;
  role: string;
  currentTask: string;
  health: number;
  lastUpdate: string;
  throughput: number; // Simulated items/sec
  tasks: AgentTask[];
  resourceUsage: number; // 0-100
}

export enum DashboardTab {
  OVERVIEW = 'overview',
  PROTEIN_FOLDING = 'folding',
  THERAPEUTIC_SCREENING = 'screening',
  SIMULATIONS = 'simulations',
  MULTI_AGENT_SIM = 'sim',
  QUANTUM = 'quantum',
  ACCELERATED = 'accelerated',
  CURE_HUB = 'cure'
}

export interface CLILine {
  type: 'cmd' | 'resp' | 'err' | 'sys' | 'kernel';
  text: string;
}

export interface QuantumMatrix {
  eigenvalues: number[];
  coherence: number;
  dimension: number;
}

export interface UnifiedDiscoveryReport {
  summary: string;
  confidence: number;
  convergenceScore: number;
  bottlenecks: string[];
  suggestedAction: string;
}

export interface OptimizationMetrics {
  yield: number;
  velocity: number;
  entropy: number;
  history: { time: string, yield: number }[];
}
