// Type definitions for TTS Prosody Experiment Builder

export interface Scenario {
  id: number;
  domain: string;
  context: string;
  optionA: {
    text: string;
    attributes: Record<string, any>;
  };
  optionB: {
    text: string;
    attributes: Record<string, any>;
  };
  status: 'draft' | 'approved' | 'needs-revision';
  notes: string;
}

export interface ProjectData {
  scenarios: Scenario[];
  completedPhases: string[];
}

export interface Phase {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
}

export interface TextAnalysis {
  sentences: number;
  words: number;
  characters: number;
  numbers: number;
  persuasiveWords: string[];
  avgWordLength: string;
}

export interface ComparisonResult {
  statsA: TextAnalysis;
  statsB: TextAnalysis;
  sentenceDiff: number;
  wordDiff: number;
  wordDiffPercent: string;
  charDiff: number;
  charDiffPercent: string;
  numberDiff: number;
  balanced: boolean;
  issues: string[];
}

export interface NumericScenario {
  name: string;
  description: string;
  optionA: {
    label: string;
    params: Record<string, number>;
    formula: string;
    display: string;
  };
  optionB: {
    label: string;
    params: Record<string, number>;
    formula: string;
    display: string;
  };
  realWorldData: Array<{
    source: string;
    [key: string]: any;
  }>;
}

export interface EquivalenceAnalysis {
  valueA: number;
  valueB: number;
  difference: string;
  percentDiff: string;
  isEquivalent: boolean;
  higherOption: string;
  lowerOption: string;
  status: 'balanced' | 'acceptable' | 'unbalanced';
}

export interface Template {
  name: string;
  structure: string[];
  example: {
    productName: string;
    attribute1: string;
    attribute2: string;
    attribute3: string;
    tradeoff: string;
    availability: string;
  };
  guidelines: string[];
}

export interface ProsodyPreset {
  name: string;
  description: string;
  parameters: {
    pitch: {
      shift: number;
      range: number;
      contour: string;
    };
    rate: {
      global: number;
      local: any[];
    };
    volume: {
      level: number;
      peaks: any[];
    };
    pauses: Array<{
      position: string;
      duration: number;
    }>;
    voiceQuality: string;
  };
  color: string;
  icon: string;
  literature?: string[];
}

export interface Check {
  question: string;
  correctAnswer: string;
  distractors: string[];
  type: string;
  critical: boolean;
  scale?: string;
  anchors?: string[];
}

export interface AttentionScenario {
  name: string;
  neutralText: string;
  checks: {
    comprehension: Check[];
    attention: Check[];
    manipulation: Check[];
  };
}

export interface FillerPrompt {
  text: string;
  duration: number;
  purpose: string;
}

export interface FillerCategory {
  name: string;
  description: string;
  color: string;
  icon: string;
  duration: string;
  prompts: FillerPrompt[];
}

export type PhaseId = 'home' | 'text-review' | 'numeric-calc' | 'structure' | 'prosody' | 'checks' | 'fillers' | 'quality';
export type ScenarioStatus = 'draft' | 'approved' | 'needs-revision';
export type EquivalenceStatus = 'balanced' | 'acceptable' | 'unbalanced';
