
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
  explanation?: string;
}

export interface SimulationResult {
  id: string;
  candidateId: string;
  pathwayAffected: string;
  efficacyScore: number;
  offTargetRisk: number;
  tumorSuppressionRate?: number;
  mutationalResistance?: number;
  timestamp: string;
}

export enum DashboardTab {
  OVERVIEW = 'frontier',
  LEGION = 'legion',
  ORCHESTRA = 'orchestra',
  REVELATION = 'revelation'
}

export interface OptimizationMetrics {
  yield: number;
  velocity: number;
  entropy: number;
  coherence: number;
  syntropicPotential: number;
  resonanceFreq: number;
  nodesActive: number;
  history: { time: string, yield: number, entropy: number }[];
}

export interface UnifiedDiscoveryReport {
  id: string;
  proteinId: string;
  timestamp: string;
  summary: string;
  leadCandidateId: string;
}

export interface CLILine {
  text: string;
  type: 'cmd' | 'err' | 'sys' | 'out' | 'sovereign';
}
