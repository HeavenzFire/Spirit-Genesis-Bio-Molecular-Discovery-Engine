
import { GoogleGenAI, Type } from "@google/genai";
import { ProteinStructure, DrugCandidate, SimulationResult, QuantumMatrix, UnifiedDiscoveryReport } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const predictFoldingInsights = async (sequence: string): Promise<Partial<ProteinStructure>> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze this protein sequence for structural insights and folding stability: ${sequence}. 
    Focus on potential pockets for oncology or mental health targets. 
    Provide residue-level pLDDT confidence (10 values), identify potential binding sites.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          confidence: { type: Type.NUMBER },
          plddt: { 
            type: Type.ARRAY, 
            items: { type: Type.NUMBER },
            description: "Sequence of 10 pLDDT values."
          },
          bindingSites: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                residueIndex: { type: Type.INTEGER },
                residueName: { type: Type.STRING },
                affinityScore: { type: Type.NUMBER },
                label: { type: Type.STRING }
              },
              required: ["residueIndex", "residueName", "affinityScore", "label"]
            }
          },
          therapeuticTargets: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["confidence", "plddt", "bindingSites", "therapeuticTargets"]
      }
    }
  });

  try {
    return JSON.parse(response.text.trim());
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return {};
  }
};

export const refineLatticeParameters = async (currentProtein: ProteinStructure): Promise<Partial<ProteinStructure>> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Refine the structural lattice parameters for protein ${currentProtein.name} (Current Confidence: ${currentProtein.confidence}). 
    Simulate the optimization of folding dynamics to maximize yield. 
    Provide updated confidence (must be higher but realistic) and pLDDT values.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          confidence: { type: Type.NUMBER },
          plddt: { type: Type.ARRAY, items: { type: Type.NUMBER } }
        },
        required: ["confidence", "plddt"]
      }
    }
  });
  return JSON.parse(response.text.trim());
};

export const fetchProteinResearch = async (proteinName: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Research the latest clinical findings, structural biology papers, and ongoing therapeutic trials for the protein: ${proteinName}. Focus on oncology and mental health relevance.`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  return {
    summary: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || 'Research Source',
      uri: chunk.web?.uri
    })) || []
  };
};

export const generateTherapeuticCandidates = async (proteinInfo: string): Promise<DrugCandidate[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Based on the following protein structure data: ${proteinInfo}, generate 3 candidate small molecule therapeutics. 
    Include SMILES strings, predicted binding affinity (kcal/mol), toxicity risk scores, and a brief explanation of why this molecule was chosen.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            name: { type: Type.STRING },
            smiles: { type: Type.STRING },
            bindingAffinity: { type: Type.NUMBER },
            toxicityScore: { type: Type.NUMBER },
            druggability: { type: Type.NUMBER },
            description: { type: Type.STRING },
            explanation: { type: Type.STRING }
          },
          required: ["id", "name", "smiles", "bindingAffinity", "toxicityScore", "druggability", "description", "explanation"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text.trim());
  } catch (e) {
    console.error("Failed to parse drug candidate response", e);
    return [];
  }
};

export const simulateCancerTherapy = async (candidate: DrugCandidate, protein: ProteinStructure): Promise<SimulationResult> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Simulate high-impact oncology therapy for ${candidate.name} targeting ${protein.name}. 
    Predict tumor suppression rate (0-1), mutational resistance probability (0-1), and pathway perturbation.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          pathwayAffected: { type: Type.STRING },
          efficacyScore: { type: Type.NUMBER },
          offTargetRisk: { type: Type.NUMBER },
          tumorSuppressionRate: { type: Type.NUMBER },
          mutationalResistance: { type: Type.NUMBER }
        },
        required: ["pathwayAffected", "efficacyScore", "offTargetRisk", "tumorSuppressionRate", "mutationalResistance"]
      }
    }
  });

  const raw = JSON.parse(response.text.trim());
  return {
    id: `CURE-SIM-${Math.floor(Math.random() * 100000)}`,
    candidateId: candidate.id,
    pathwayAffected: raw.pathwayAffected,
    efficacyScore: raw.efficacyScore,
    offTargetRisk: raw.offTargetRisk,
    tumorSuppressionRate: raw.tumorSuppressionRate,
    mutationalResistance: raw.mutationalResistance,
    timestamp: new Date().toISOString()
  };
};

export const simulateQuantumInteraction = async (candidateSmiles: string, targetName: string): Promise<QuantumMatrix> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Simulate the quantum mechanical binding profile of ligand ${candidateSmiles} with protein ${targetName}. 
    Provide 5 eigenvalues representing Hamiltonian energy levels, a coherence score, and state dimension.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          eigenvalues: { type: Type.ARRAY, items: { type: Type.NUMBER } },
          coherence: { type: Type.NUMBER },
          dimension: { type: Type.INTEGER }
        },
        required: ["eigenvalues", "coherence", "dimension"]
      }
    }
  });
  return JSON.parse(response.text.trim());
};

export const performAcceleratedDiscovery = async (sequence: string): Promise<UnifiedDiscoveryReport> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Perform a compressed domain analysis for protein sequence: ${sequence}. 
    Synthesize protein folding (stability), therapeutic potential (oncology/mental health), simulation bottlenecks, and quantum binding coherence into one unified report.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          convergenceScore: { type: Type.NUMBER },
          bottlenecks: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestedAction: { type: Type.STRING }
        },
        required: ["summary", "confidence", "convergenceScore", "bottlenecks", "suggestedAction"]
      }
    }
  });
  return JSON.parse(response.text.trim());
};

export const runInSilicoSimulation = async (candidate: DrugCandidate, protein: ProteinStructure): Promise<SimulationResult> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Simulate the efficacy of drug candidate ${candidate.name} (SMILES: ${candidate.smiles}) against protein ${protein.name} in a virtual biological pathway. 
    Predict pathway perturbation and off-target risks.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          pathwayAffected: { type: Type.STRING },
          efficacyScore: { type: Type.NUMBER },
          offTargetRisk: { type: Type.NUMBER }
        },
        required: ["pathwayAffected", "efficacyScore", "offTargetRisk"]
      }
    }
  });

  const raw = JSON.parse(response.text.trim());
  return {
    id: `SIM-${Math.floor(Math.random() * 100000)}`,
    candidateId: candidate.id,
    pathwayAffected: raw.pathwayAffected,
    efficacyScore: raw.efficacyScore,
    offTargetRisk: raw.offTargetRisk,
    timestamp: new Date().toISOString()
  };
};
