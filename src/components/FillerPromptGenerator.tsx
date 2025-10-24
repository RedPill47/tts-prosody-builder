import { useState } from 'react';
import { Coffee, Clock, Brain, Shuffle, Download, Copy, Play } from 'lucide-react';

interface SequenceItem {
  type: string;
  content: string;
  duration: number;
  color: string;
}

const FillerPromptGenerator = () => {
  const [selectedCategory, setSelectedCategory] = useState('neutral');
  const [generatedSequence, setGeneratedSequence] = useState<SequenceItem[]>([]);

  const fillerCategories = {
    neutral: {
      name: "Neutral Instructions",
      description: "Simple, non-engaging prompts that provide a brief pause",
      color: "gray",
      icon: "⏸️",
      duration: "5-10 seconds",
      prompts: [
        {
          text: "Please wait a moment while we prepare the next option.",
          duration: 5,
          purpose: "Basic pause"
        },
        {
          text: "Press the space bar when you're ready to continue.",
          duration: 8,
          purpose: "Self-paced break"
        },
        {
          text: "Take a breath. The next option will play in a moment.",
          duration: 7,
          purpose: "Attention reset"
        },
        {
          text: "You will now hear the second option. Please listen carefully.",
          duration: 6,
          purpose: "Transition marker"
        },
        {
          text: "Thank you for your attention. Let's continue.",
          duration: 5,
          purpose: "Acknowledgment"
        }
      ]
    },
    attention_reset: {
      name: "Attention Reset",
      description: "Active prompts that require minimal engagement to reset focus",
      color: "blue",
      icon: "🎯",
      duration: "10-15 seconds",
      prompts: [
        {
          text: "Before we continue, please take a moment to look away from the screen, then look back when ready.",
          duration: 12,
          purpose: "Physical attention break"
        },
        {
          text: "Click the 'Ready' button when you are prepared to hear the next option.",
          duration: 10,
          purpose: "Active engagement"
        },
        {
          text: "In a moment, you will hear another option. Please focus on the details being presented.",
          duration: 11,
          purpose: "Focus instruction"
        },
        {
          text: "Take a deep breath and clear your mind before the next audio plays.",
          duration: 10,
          purpose: "Mental reset"
        },
        {
          text: "Please adjust your volume if needed. Click 'Continue' when you're ready.",
          duration: 12,
          purpose: "Technical check + self-pacing"
        }
      ]
    },
    cognitive_filler: {
      name: "Cognitive Filler Tasks",
      description: "Simple tasks that occupy working memory and prevent rehearsal",
      color: "purple",
      icon: "🧠",
      duration: "15-20 seconds",
      prompts: [
        {
          text: "Please count backwards from 30 to 20 silently in your head, then click 'Continue'.",
          duration: 15,
          purpose: "Working memory interference"
        },
        {
          text: "Think of three cities that start with the letter 'B'. Click 'Continue' when ready.",
          duration: 18,
          purpose: "Semantic retrieval task"
        },
        {
          text: "Visualize a blue square, then a red circle. Click 'Continue' when you've completed this.",
          duration: 15,
          purpose: "Visual imagery task"
        },
        {
          text: "Name three colors in your mind, then click 'Continue'.",
          duration: 12,
          purpose: "Simple cognitive task"
        },
        {
          text: "Think of a number between 1 and 100. Add 7 to it. Click 'Continue' when done.",
          duration: 16,
          purpose: "Mental arithmetic"
        }
      ]
    },
    buffer: {
      name: "Buffer Screens",
      description: "Visual screens with minimal text for passive breaks",
      color: "green",
      icon: "⏳",
      duration: "3-8 seconds",
      prompts: [
        {
          text: "Loading...",
          duration: 3,
          purpose: "Simulated system delay"
        },
        {
          text: "Preparing next audio...",
          duration: 4,
          purpose: "Technical framing"
        },
        {
          text: "•  •  •",
          duration: 5,
          purpose: "Visual pause indicator"
        },
        {
          text: "Please wait.",
          duration: 3,
          purpose: "Minimal instruction"
        },
        {
          text: "[Silence - blank screen]",
          duration: 5,
          purpose: "Complete sensory break"
        }
      ]
    },
    distractor: {
      name: "Neutral Distractor Questions",
      description: "Unrelated questions that create separation between stimuli",
      color: "orange",
      icon: "❓",
      duration: "10-15 seconds",
      prompts: [
        {
          text: "On a scale of 1-5, how comfortable are you right now?",
          duration: 12,
          purpose: "Emotional state check"
        },
        {
          text: "Is the audio volume at a comfortable level? (Yes/No)",
          duration: 8,
          purpose: "Technical quality check"
        },
        {
          text: "Are you feeling alert and focused? (Yes/Somewhat/No)",
          duration: 10,
          purpose: "Attention self-report"
        },
        {
          text: "How many scenarios have you heard so far? (Approximate)",
          duration: 12,
          purpose: "Meta-awareness"
        },
        {
          text: "Press any key to confirm you are still paying attention.",
          duration: 8,
          purpose: "Passive attention check"
        }
      ]
    }
  };

  const experimentalConsiderations = [
    {
      title: "Prevent Rehearsal",
      description: "Filler tasks should prevent participants from mentally rehearsing Option A while hearing Option B",
      recommendation: "Use cognitive filler tasks (counting, word generation) between options",
      icon: "🔄"
    },
    {
      title: "Attention Decay",
      description: "Monitor fatigue effects by tracking response quality over time",
      recommendation: "Log trial position and include attention resets every 3-4 pairs",
      icon: "📉"
    },
    {
      title: "Habituation",
      description: "Participants may become desensitized to prosodic manipulation over multiple trials",
      recommendation: "Randomize pair order and track position effects in analysis",
      icon: "🔁"
    },
    {
      title: "Cognitive Load Balance",
      description: "Filler tasks shouldn't be so demanding that they affect decision-making",
      recommendation: "Keep tasks simple and under 20 seconds; pilot test fatigue",
      icon: "⚖️"
    }
  ];

  const generateExperimentSequence = () => {
    const sequence: SequenceItem[] = [];
    const scenarioPairs = 10;

    for (let i = 1; i <= scenarioPairs; i++) {
      // Agent introduction (first pair only)
      if (i === 1) {
        sequence.push({
          type: 'intro',
          content: 'Agent Introduction',
          duration: 15,
          color: 'bg-indigo-100'
        });
      }

      // Option A
      sequence.push({
        type: 'stimulus',
        content: `Scenario ${i} - Option A (Neutral or Authoritative*)`,
        duration: 30,
        color: 'bg-blue-100'
      });

      // Manipulation check A
      sequence.push({
        type: 'check',
        content: 'Manipulation Check (Authority, Confidence, Trust)',
        duration: 15,
        color: 'bg-purple-100'
      });

      // Filler break
      const fillerType = i % 3 === 0 ? 'cognitive_filler' : 'attention_reset';
      const fillerPrompt = (fillerCategories as any)[fillerType].prompts[Math.floor(Math.random() * (fillerCategories as any)[fillerType].prompts.length)];
      sequence.push({
        type: 'filler',
        content: `FILLER: ${fillerPrompt.text}`,
        duration: fillerPrompt.duration,
        color: 'bg-yellow-100'
      });

      // Option B
      sequence.push({
        type: 'stimulus',
        content: `Scenario ${i} - Option B (Neutral or Authoritative*)`,
        duration: 30,
        color: 'bg-green-100'
      });

      // Manipulation check B
      sequence.push({
        type: 'check',
        content: 'Manipulation Check (Authority, Confidence, Trust)',
        duration: 15,
        color: 'bg-purple-100'
      });

      // Decision + Comprehension
      sequence.push({
        type: 'decision',
        content: 'Choice (A or B) + Comprehension Checks (x3)',
        duration: 45,
        color: 'bg-pink-100'
      });

      // Attention check (every 2-3 pairs)
      if (i % 2 === 0) {
        sequence.push({
          type: 'attention',
          content: 'ATTENTION CHECK (Instruction Following)',
          duration: 10,
          color: 'bg-red-100'
        });
      }

      // Buffer between pairs
      if (i < scenarioPairs) {
        sequence.push({
          type: 'buffer',
          content: 'Brief pause before next scenario',
          duration: 5,
          color: 'bg-gray-100'
        });
      }
    }

    setGeneratedSequence(sequence);
  };

  const calculateTotalTime = () => {
    return generatedSequence.reduce((sum, item) => sum + item.duration, 0);
  };

  const exportSequence = () => {
    const text = `EXPERIMENT TIMELINE SEQUENCE
Total Duration: ${calculateTotalTime()} seconds (~${Math.round(calculateTotalTime() / 60)} minutes)
Generated: ${new Date().toLocaleString()}

${'='.repeat(80)}

${generatedSequence.map((item: SequenceItem, idx: number) => `
${idx + 1}. [${item.type.toUpperCase()}] ${item.content}
   Duration: ${item.duration}s
   Cumulative Time: ${generatedSequence.slice(0, idx + 1).reduce((sum, i) => sum + i.duration, 0)}s
`).join('')}

${'='.repeat(80)}

FILLER PROMPTS LIBRARY
${Object.entries(fillerCategories).map(([, cat]: [string, { icon: string; name: string; prompts: { text: string; duration: number; purpose: string }[] }]) => `
${cat.icon} ${cat.name}
${'-'.repeat(40)}
${cat.prompts.map((p: { text: string; duration: number; purpose: string }, idx: number) => `
${idx + 1}. "${p.text}"
   Duration: ${p.duration}s | Purpose: ${p.purpose}
`).join('')}
`).join('\n')}
`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'experiment_sequence_with_fillers.txt';
    a.click();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const currentCategory = (fillerCategories as any)[selectedCategory];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Coffee className="text-amber-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">
            Filler Prompt & Break Generator
          </h1>
        </div>
        <p className="text-gray-600">
          Create inter-stimulus breaks to reset attention and prevent rehearsal effects
        </p>
      </div>

      {/* Category Selector */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Filler Categories</h2>
        <div className="grid md:grid-cols-5 gap-3">
          {Object.keys(fillerCategories).map((key: string) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedCategory === key
                  ? `border-${(fillerCategories as any)[key].color}-500 bg-${(fillerCategories as any)[key].color}-50`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-3xl mb-2">{(fillerCategories as any)[key].icon}</div>
              <div className="font-semibold text-sm mb-1">{(fillerCategories as any)[key].name}</div>
              <div className="text-xs text-gray-600">{(fillerCategories as any)[key].duration}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Current Category Details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {currentCategory.icon} {currentCategory.name}
            </h2>
            <p className="text-gray-600">{currentCategory.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <Clock size={16} className="text-gray-500" />
              <span className="text-sm text-gray-600">Typical duration: {currentCategory.duration}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {currentCategory.prompts.map((prompt: { text: string; duration: number; purpose: string }, idx: number) => (
            <div key={idx} className={`border rounded-lg p-4 bg-${currentCategory.color}-50`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-800">Prompt {idx + 1}:</span>
                    <span className={`text-xs px-2 py-1 rounded bg-${currentCategory.color}-100`}>
                      {prompt.duration}s
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2 italic">"{prompt.text}"</p>
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">Purpose:</span> {prompt.purpose}
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(prompt.text)}
                  className="ml-4 p-2 hover:bg-gray-100 rounded"
                >
                  <Copy size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experimental Considerations */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          <Brain className="inline mr-2" size={24} />
          Experimental Considerations
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {experimentalConsiderations.map((item: { title: string; description: string; recommendation: string; icon: string }, idx: number) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-400">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <p className="text-sm text-blue-700">
                    <strong>→</strong> {item.recommendation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sequence Generator */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            <Shuffle className="inline mr-2" size={24} />
            Generate Full Experiment Sequence
          </h2>
          <button
            onClick={generateExperimentSequence}
            className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 flex items-center gap-2"
          >
            <Play size={16} />
            Generate Sequence
          </button>
        </div>

        {generatedSequence.length > 0 && (
          <>
            <div className="mb-4 bg-blue-50 border-l-4 border-blue-400 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-blue-900">
                    Total Experiment Duration: {Math.round(calculateTotalTime() / 60)} minutes ({calculateTotalTime()} seconds)
                  </p>
                  <p className="text-sm text-blue-700">
                    {generatedSequence.filter(s => s.type === 'stimulus').length} stimuli | 
                    {generatedSequence.filter(s => s.type === 'filler').length} fillers | 
                    {generatedSequence.filter(s => s.type === 'check').length} manipulation checks
                  </p>
                </div>
                <button
                  onClick={exportSequence}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2 text-sm"
                >
                  <Download size={16} />
                  Export
                </button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto border rounded">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 sticky top-0">
                  <tr>
                    <th className="px-4 py-2 text-left">#</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Content</th>
                    <th className="px-4 py-2 text-right">Duration</th>
                    <th className="px-4 py-2 text-right">Cumulative</th>
                  </tr>
                </thead>
                <tbody>
                  {generatedSequence.map((item: SequenceItem, idx: number) => (
                    <tr key={idx} className={`border-t ${item.color} hover:opacity-75`}>
                      <td className="px-4 py-2 font-mono text-gray-600">{idx + 1}</td>
                      <td className="px-4 py-2">
                        <span className="px-2 py-1 bg-white rounded text-xs font-semibold">
                          {item.type}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-gray-700">{item.content}</td>
                      <td className="px-4 py-2 text-right font-mono">{item.duration}s</td>
                      <td className="px-4 py-2 text-right font-mono text-gray-600">
                        {generatedSequence.slice(0, idx + 1).reduce((sum, i) => sum + i.duration, 0)}s
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Implementation Guidelines */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Implementation Guidelines</h2>
        
        <div className="space-y-4">
          <div className="bg-green-50 border-l-4 border-green-400 p-4">
            <h4 className="font-semibold text-green-900 mb-2">✓ Recommended Strategy</h4>
            <ul className="text-sm space-y-1 text-green-800">
              <li><strong>Between Options A & B:</strong> Use attention reset or cognitive filler (10-15s)</li>
              <li><strong>Between Scenario Pairs:</strong> Use neutral buffer (3-5s)</li>
              <li><strong>Every 3-4 Pairs:</strong> Insert longer cognitive filler (15-20s)</li>
              <li><strong>Randomize:</strong> Vary filler types to prevent habituation to break format</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Common Pitfalls</h4>
            <ul className="text-sm space-y-1 text-yellow-800">
              <li>• <strong>Too short:</strong> &lt;5s breaks don't reset attention effectively</li>
              <li>• <strong>Too long:</strong> &gt;20s breaks increase fatigue and dropout</li>
              <li>• <strong>Too complex:</strong> Demanding tasks interfere with main task performance</li>
              <li>• <strong>Predictable:</strong> Same filler every time allows anticipation</li>
              <li>• <strong>No logging:</strong> Must record filler type and duration for analysis</li>
            </ul>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
            <h4 className="font-semibold text-purple-900 mb-2">📊 Analysis Notes</h4>
            <ul className="text-sm space-y-1 text-purple-800">
              <li>• Log filler duration and type for each trial</li>
              <li>• Model trial position (1-10) as covariate to test habituation</li>
              <li>• Check if break duration correlates with response quality</li>
              <li>• Compare early trials (1-3) vs late trials (8-10) for fatigue effects</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FillerPromptGenerator;