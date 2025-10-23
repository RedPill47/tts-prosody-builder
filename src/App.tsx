import { useState, useEffect } from 'react';
import { loadFromStorage, createAutoSave, exportData, importData, clearStorage } from './utils/persistence';
import { 
  FileText, Calculator, Layout, Volume2, Eye, Coffee, CheckSquare,
  ChevronRight, Home, Upload, Trash2, BookOpen, Download
} from 'lucide-react';

// Import the actual tool components
import ScenarioRefinementTool from './components/ScenarioRefinementTool';
import NumericEquivalenceCalculator from './components/NumericEquivalenceCalculator';
import SentenceStructureTool from './components/SentenceStructureTool';
import ProsodyAnnotationTool from './components/ProsodyAnnotationTool';
import AttentionCheckGenerator from './components/AttentionCheckGenerator';
import FillerPromptGenerator from './components/FillerPromptGenerator';
import QualityChecklistTool from './components/QualityChecklistTool';
import Documentation from './components/Documentation';

const UnifiedScenarioTool = () => {
  const [activePhase, setActivePhase] = useState('home');

  // Auto-save function
  const autoSave = createAutoSave('appSettings');

  // Load data on component mount
  useEffect(() => {
    const savedData = loadFromStorage();
    if (savedData.appSettings?.activePhase) {
      setActivePhase(savedData.appSettings.activePhase);
    }
  }, []);

  // Save data whenever activePhase changes
  useEffect(() => {
    autoSave({
      activePhase
    });
  }, [activePhase]);

  // Data management functions
  const handleExportData = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tts-prosody-builder-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result as string;
        if (importData(data)) {
          alert('Data imported successfully! Please refresh the page to see changes.');
        } else {
          alert('Failed to import data. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      clearStorage();
      alert('All data has been cleared. Please refresh the page.');
    }
  };

  const getNextPhase = (currentPhase: string) => {
    const phaseOrder = ['home', 'text-review', 'numeric', 'structure', 'prosody', 'checks', 'fillers', 'quality', 'documentation'];
    const currentIndex = phaseOrder.indexOf(currentPhase);
    return currentIndex < phaseOrder.length - 1 ? phaseOrder[currentIndex + 1] : null;
  };

  const getPreviousPhase = (currentPhase: string) => {
    const phaseOrder = ['home', 'text-review', 'numeric', 'structure', 'prosody', 'checks', 'fillers', 'quality', 'documentation'];
    const currentIndex = phaseOrder.indexOf(currentPhase);
    return currentIndex > 0 ? phaseOrder[currentIndex - 1] : null;
  };

  const phases = [
    {
      id: 'home',
      name: 'Project Overview',
      icon: Home,
      color: 'blue',
      description: 'Start here to understand the workflow and access all tools'
    },
    {
      id: 'text-review',
      name: 'Text Review & Refinement',
      icon: FileText,
      color: 'green',
      description: 'Review scenarios for neutrality, balance, and cognitive load parity'
    },
    {
      id: 'numeric',
      name: 'Numeric Equivalence',
      icon: Calculator,
      color: 'purple',
      description: 'Verify that Option A and B are rationally equivalent (≤5% cost difference)'
    },
    {
      id: 'structure',
      name: 'Sentence Structure',
      icon: Layout,
      color: 'orange',
      description: 'Ensure consistent structural templates across all scenarios'
    },
    {
      id: 'prosody',
      name: 'Prosody Annotation',
      icon: Volume2,
      color: 'red',
      description: 'Define prosodic parameters for TTS manipulation'
    },
    {
      id: 'checks',
      name: 'Attention Checks',
      icon: Eye,
      color: 'indigo',
      description: 'Generate comprehension and manipulation check questions'
    },
    {
      id: 'fillers',
      name: 'Filler Prompts',
      icon: Coffee,
      color: 'yellow',
      description: 'Create neutral filler content between experimental conditions'
    },
    {
      id: 'quality',
      name: 'Quality Checklist',
      icon: CheckSquare,
      color: 'teal',
      description: 'Final validation checklist before experiment deployment'
    },
    {
      id: 'documentation',
      name: 'Documentation',
      icon: BookOpen,
      color: 'indigo',
      description: 'Complete guide and troubleshooting information'
    }
  ];

  const PhaseWrapper = ({ children }: { children: React.ReactNode }) => {
    const nextPhase = getNextPhase(activePhase);
    const previousPhase = getPreviousPhase(activePhase);
    const currentPhaseData = phases.find(p => p.id === activePhase);

    return (
      <div className="space-y-6">
        {children}
        
        {/* Phase Navigation */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {previousPhase && (
                <button
                  onClick={() => setActivePhase(previousPhase)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 flex items-center gap-2"
                >
                  <ChevronRight className="rotate-180" size={16} />
                  Previous Phase
                </button>
              )}
            </div>
            
            <div className="text-center">
              <h3 className="font-semibold text-gray-800">
                {currentPhaseData?.name}
              </h3>
              <p className="text-sm text-gray-600">
                {currentPhaseData?.description}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {nextPhase && (
                <button
                  onClick={() => setActivePhase(nextPhase)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
                >
                  Next Phase
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPhaseContent = () => {
    switch (activePhase) {
      case 'home':
        return <HomePhase />;
      case 'text-review':
        return (
          <PhaseWrapper>
            <ScenarioRefinementTool />
          </PhaseWrapper>
        );
      case 'numeric':
        return (
          <PhaseWrapper>
            <NumericEquivalenceCalculator />
          </PhaseWrapper>
        );
      case 'structure':
        return (
          <PhaseWrapper>
            <SentenceStructureTool />
          </PhaseWrapper>
        );
      case 'prosody':
        return (
          <PhaseWrapper>
            <ProsodyAnnotationTool />
          </PhaseWrapper>
        );
      case 'checks':
        return (
          <PhaseWrapper>
            <AttentionCheckGenerator />
          </PhaseWrapper>
        );
      case 'fillers':
        return (
          <PhaseWrapper>
            <FillerPromptGenerator />
          </PhaseWrapper>
        );
      case 'quality':
        return (
          <PhaseWrapper>
            <QualityChecklistTool />
          </PhaseWrapper>
        );
      case 'documentation':
        return <Documentation />;
      default:
        return <HomePhase />;
    }
  };

  const HomePhase = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-4">TTS Prosody Experiment Builder</h1>
        <p className="text-xl opacity-90 mb-6">
          A comprehensive toolkit for designing and validating text-to-speech prosody experiments
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setActivePhase('text-review')}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Building
          </button>
          <button 
            onClick={() => setActivePhase('documentation')}
            className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            View Documentation
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {phases.slice(1).map((phase) => {
          const Icon = phase.icon;
          
          return (
            <div
              key={phase.id}
              className="border-2 rounded-lg p-6 cursor-pointer transition-all hover:shadow-md hover:border-gray-300"
              onClick={() => setActivePhase(phase.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-full bg-${phase.color}-100 flex items-center justify-center`}>
                  <Icon className={`text-${phase.color}-600`} size={24} />
                </div>
                <ChevronRight className="text-gray-400" size={20} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{phase.name}</h3>
              <p className="text-sm text-gray-600">{phase.description}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Start Guide</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <h4 className="font-semibold text-blue-900 mb-2">📝 Before You Start</h4>
            <ul className="text-sm space-y-1 text-blue-800">
              <li>• Review your research questions</li>
              <li>• Select 3-5 experimental domains</li>
              <li>• Gather real-world market data</li>
              <li>• Check literature for prosodic parameters</li>
            </ul>
          </div>
          <div className="bg-green-50 border-l-4 border-green-400 p-4">
            <h4 className="font-semibold text-green-900 mb-2">🚀 Workflow</h4>
            <ol className="text-sm space-y-1 text-green-800 list-decimal list-inside">
              <li>Text Review & Refinement</li>
              <li>Numeric Equivalence Validation</li>
              <li>Sentence Structure Templates</li>
              <li>Prosody Parameter Definition</li>
              <li>Attention Check Generation</li>
              <li>Filler Content Creation</li>
              <li>Final Quality Validation</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Data Management</h2>
        <div className="space-y-4">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <h4 className="font-semibold text-blue-900 mb-2">💾 Auto-Save Enabled</h4>
            <p className="text-sm text-blue-800 mb-3">
              Your work is automatically saved to your browser's local storage. 
              Data persists across page refreshes and browser sessions.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleExportData}
                className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center gap-2"
              >
                <Download size={14} />
                Export Data
              </button>
              <label className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm flex items-center gap-2 cursor-pointer">
                <Upload size={14} />
                Import Data
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  className="hidden"
                />
              </label>
              <button
                onClick={handleClearData}
                className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm flex items-center gap-2"
              >
                <Trash2 size={14} />
                Clear All Data
              </button>
            </div>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Important Notes</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Data is stored locally in your browser</li>
              <li>• Clearing browser data will delete your work</li>
              <li>• Export your data regularly for backup</li>
              <li>• Data is not shared or sent to any servers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Volume2 className="text-white" size={20} />
              </div>
              <h1 className="text-xl font-bold text-gray-900">TTS Prosody Builder</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {phases.map((phase) => {
              const Icon = phase.icon;
              const isActive = activePhase === phase.id;
              
              return (
                <button
                  key={phase.id}
                  onClick={() => setActivePhase(phase.id)}
                  className={`flex items-center gap-2 px-3 py-4 text-sm font-medium border-b-2 transition-colors ${
                    isActive
                      ? `border-${phase.color}-500 text-${phase.color}-600`
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  {phase.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPhaseContent()}
      </div>
    </div>
  );
};

export default UnifiedScenarioTool;