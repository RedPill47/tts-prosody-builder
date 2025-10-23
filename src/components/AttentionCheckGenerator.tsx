import React, { useState } from 'react';
import { Eye, CheckSquare, AlertTriangle, Download, Plus, Trash2, Copy } from 'lucide-react';

const AttentionCheckGenerator = () => {
  const [selectedScenario, setSelectedScenario] = useState('banking');
  const [customChecks, setCustomChecks] = useState([]);
  const [newCheck, setNewCheck] = useState({
    question: '',
    correctAnswer: '',
    distractors: ['', '', '']
  });

  const scenarios = {
    banking: {
      name: "Credit Card Selection",
      neutralText: "The Premium Card has a €49 annual fee, offers 1% cashback on all purchases, and includes comprehensive travel insurance with emergency assistance worldwide.",
      checks: {
        comprehension: [
          {
            question: "What is the annual fee for the Premium Card?",
            correctAnswer: "€49",
            distractors: ["€39", "€59", "€44"],
            type: "numeric-recall",
            critical: true
          },
          {
            question: "What cashback percentage does the Premium Card offer?",
            correctAnswer: "1%",
            distractors: ["0.5%", "1.5%", "2%"],
            type: "numeric-recall",
            critical: true
          },
          {
            question: "Which benefit is included with the Premium Card?",
            correctAnswer: "Travel insurance",
            distractors: ["Free airport lounge", "Priority customer service", "Extended warranty"],
            type: "feature-recall",
            critical: false
          }
        ],
        attention: [
          {
            question: "Please select the third option to continue.",
            correctAnswer: "Continue",
            distractors: ["Yes", "No", "Continue"],
            type: "instruction-following",
            critical: true
          },
          {
            question: "How many cards were described in the previous audio?",
            correctAnswer: "Two cards",
            distractors: ["One card", "Three cards", "Four cards"],
            type: "meta-attention",
            critical: true
          }
        ],
        manipulation: [
          {
            question: "How confident did the speaker sound?",
            scale: "1-7 Likert",
            anchors: ["Not at all confident", "Extremely confident"],
            type: "perception-check",
            critical: true
          },
          {
            question: "How authoritative did the voice sound?",
            scale: "1-7 Likert",
            anchors: ["Not at all authoritative", "Very authoritative"],
            type: "manipulation-check",
            critical: true
          }
        ]
      }
    },
    insurance: {
      name: "Health Insurance Plan",
      neutralText: "Plan A costs €35 per month with a €350 annual deductible. After you meet the deductible, all covered services are fully paid.",
      checks: {
        comprehension: [
          {
            question: "What is the monthly premium for Plan A?",
            correctAnswer: "€35",
            distractors: ["€30", "€40", "€25"],
            type: "numeric-recall",
            critical: true
          },
          {
            question: "What is the annual deductible for Plan A?",
            correctAnswer: "€350",
            distractors: ["€300", "€400", "€500"],
            type: "numeric-recall",
            critical: true
          },
          {
            question: "What happens after you meet the deductible?",
            correctAnswer: "All covered services are fully paid",
            distractors: ["You pay 20% co-pay", "You still pay the deductible", "Premium increases"],
            type: "feature-recall",
            critical: true
          }
        ],
        attention: [
          {
            question: "To show you're paying attention, please select 'banana' below.",
            correctAnswer: "banana",
            distractors: ["apple", "orange", "banana"],
            type: "instruction-following",
            critical: true
          }
        ],
        manipulation: [
          {
            question: "How trustworthy did the speaker sound?",
            scale: "1-7 Likert",
            anchors: ["Not at all trustworthy", "Extremely trustworthy"],
            type: "perception-check",
            critical: false
          }
        ]
      }
    },
    mobile: {
      name: "Mobile Data Plan",
      neutralText: "The Standard Plan includes 40 gigabytes of data per month, costs €15 monthly, and provides 5G Plus network access with priority support.",
      checks: {
        comprehension: [
          {
            question: "How much data does the Standard Plan include per month?",
            correctAnswer: "40 gigabytes",
            distractors: ["30 gigabytes", "50 gigabytes", "60 gigabytes"],
            type: "numeric-recall",
            critical: true
          },
          {
            question: "What is the monthly cost of the Standard Plan?",
            correctAnswer: "€15",
            distractors: ["€12", "€18", "€20"],
            type: "numeric-recall",
            critical: true
          }
        ],
        attention: [
          {
            question: "Which type of product was just described?",
            correctAnswer: "Mobile phone plan",
            distractors: ["Insurance plan", "Credit card", "Energy tariff"],
            type: "context-awareness",
            critical: true
          }
        ],
        manipulation: [
          {
            question: "Did the speaker sound like they were trying to pressure you?",
            scale: "1-7 Likert",
            anchors: ["No pressure at all", "Strong pressure"],
            type: "manipulation-check",
            critical: true
          }
        ]
      }
    },
    energy: {
      name: "Energy Tariff",
      neutralText: "The Fixed Rate plan charges €0.27 per kilowatt-hour with a €5 monthly service fee. Your rate stays the same for 12 months.",
      checks: {
        comprehension: [
          {
            question: "What is the rate per kilowatt-hour for the Fixed Rate plan?",
            correctAnswer: "€0.27",
            distractors: ["€0.25", "€0.29", "€0.30"],
            type: "numeric-recall",
            critical: true
          },
          {
            question: "How long does the rate stay fixed?",
            correctAnswer: "12 months",
            distractors: ["6 months", "18 months", "24 months"],
            type: "numeric-recall",
            critical: true
          }
        ],
        attention: [
          {
            question: "Press the button that says 'Continue' to proceed.",
            correctAnswer: "Continue",
            distractors: ["Next", "Proceed", "Continue"],
            type: "instruction-following",
            critical: true
          }
        ],
        manipulation: [
          {
            question: "How clear was the information presented?",
            scale: "1-7 Likert",
            anchors: ["Very unclear", "Very clear"],
            type: "perception-check",
            critical: false
          }
        ]
      }
    },
    subscription: {
      name: "Subscription Retention",
      neutralText: "Continue your subscription at €8.99 per month. You keep access to two premium channels and can cancel anytime without penalties.",
      checks: {
        comprehension: [
          {
            question: "What is the monthly subscription cost?",
            correctAnswer: "€8.99",
            distractors: ["€7.99", "€9.99", "€8.49"],
            type: "numeric-recall",
            critical: true
          },
          {
            question: "How many premium channels do you keep access to?",
            correctAnswer: "Two channels",
            distractors: ["One channel", "Three channels", "Five channels"],
            type: "numeric-recall",
            critical: true
          }
        ],
        attention: [
          {
            question: "What action was being discussed in the audio?",
            correctAnswer: "Continuing or canceling subscription",
            distractors: ["Purchasing a new product", "Upgrading service", "Changing payment method"],
            type: "context-awareness",
            critical: true
          }
        ],
        manipulation: [
          {
            question: "How much did the speaker seem to want you to continue?",
            scale: "1-7 Likert",
            anchors: ["Not at all", "Very strongly"],
            type: "manipulation-check",
            critical: true
          }
        ]
      }
    }
  };

  const checkTypeDescriptions = {
    "numeric-recall": {
      name: "Numeric Recall",
      description: "Tests if participant remembers specific numbers from the scenario",
      icon: "🔢",
      color: "blue"
    },
    "feature-recall": {
      name: "Feature Recall",
      description: "Tests if participant remembers qualitative features or benefits",
      icon: "📋",
      color: "green"
    },
    "instruction-following": {
      name: "Instruction Following",
      description: "Catch trials where participants must follow explicit instructions",
      icon: "👆",
      color: "red"
    },
    "context-awareness": {
      name: "Context Awareness",
      description: "Tests if participant knows what type of scenario they just heard",
      icon: "🎯",
      color: "purple"
    },
    "meta-attention": {
      name: "Meta Attention",
      description: "Tests awareness of the experiment structure itself",
      icon: "🧠",
      color: "orange"
    },
    "perception-check": {
      name: "Perception Check",
      description: "Captures subjective impressions (trust, clarity, etc.)",
      icon: "💭",
      color: "indigo"
    },
    "manipulation-check": {
      name: "Manipulation Check",
      description: "Validates that prosodic manipulation was perceived",
      icon: "✓",
      color: "pink"
    }
  };

  const generateCheckBattery = (scenario) => {
    const checks = scenarios[scenario].checks;
    let battery = `ATTENTION & COMPREHENSION CHECK BATTERY
Scenario: ${scenarios[scenario].name}
==========================================

COMPREHENSION CHECKS (Post-Stimulus)
${checks.comprehension.map((check, idx) => `
${idx + 1}. ${check.question}
   Correct Answer: ${check.correctAnswer}
   Distractors: ${check.distractors.join(', ')}
   Type: ${check.type}
   Critical: ${check.critical ? 'YES - Exclude if failed' : 'NO - For analysis only'}
`).join('')}

ATTENTION CHECKS (Interspersed)
${checks.attention.map((check, idx) => `
${idx + 1}. ${check.question}
   Correct Answer: ${check.correctAnswer}
   Options: ${check.distractors.join(', ')}
   Type: ${check.type}
   Critical: ${check.critical ? 'YES - Exclude if failed' : 'NO - For analysis only'}
`).join('')}

MANIPULATION CHECKS (Post-Stimulus)
${checks.manipulation.map((check, idx) => `
${idx + 1}. ${check.question}
   Scale: ${check.scale}
   Anchors: ${check.anchors.join(' → ')}
   Type: ${check.type}
   Critical: ${check.critical ? 'YES - Must differ by ≥1 SD' : 'NO - Secondary measure'}
`).join('')}

EXCLUSION CRITERIA
- Failed ≥2 comprehension checks (numeric recall)
- Failed ≥1 attention check (instruction following)
- Manipulation check: Authoritative should differ from Neutral by ≥1 SD
- Response time < 2 seconds per question (suggests random clicking)

RECOMMENDED PLACEMENT
- Comprehension checks: Immediately after each scenario pair
- Attention checks: Every 2-3 scenarios (randomized placement)
- Manipulation checks: After EACH scenario (used for analysis)
`;
    return battery;
  };

  const exportBattery = () => {
    const allBatteries = Object.keys(scenarios).map(key => 
      generateCheckBattery(key)
    ).join('\n\n' + '='.repeat(80) + '\n\n');

    const blob = new Blob([allBatteries], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attention_comprehension_checks.txt';
    a.click();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const currentScenario = scenarios[selectedScenario];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Eye className="text-teal-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">
            Attention & Comprehension Check Generator
          </h1>
        </div>
        <p className="text-gray-600">
          Create validated checks to ensure data quality and verify prosodic manipulation
        </p>
      </div>

      {/* Scenario Selector */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Select Scenario:</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {Object.keys(scenarios).map(key => (
            <button
              key={key}
              onClick={() => setSelectedScenario(key)}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                selectedScenario === key
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {scenarios[key].name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Check Type Legend */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Check Types Reference</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(checkTypeDescriptions).map(([key, type]) => (
            <div key={key} className={`bg-${type.color}-50 border-l-4 border-${type.color}-400 p-3 rounded`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{type.icon}</span>
                <h4 className="font-semibold text-gray-800 text-sm">{type.name}</h4>
              </div>
              <p className="text-xs text-gray-600">{type.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Current Scenario Checks */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {currentScenario.name}
            </h2>
            <p className="text-sm text-gray-600 italic mb-4">
              "{currentScenario.neutralText}"
            </p>
          </div>
          <button
            onClick={() => copyToClipboard(generateCheckBattery(selectedScenario))}
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 flex items-center gap-2 text-sm"
          >
            <Copy size={16} />
            Copy Battery
          </button>
        </div>

        {/* Comprehension Checks */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <CheckSquare className="text-blue-600" size={20} />
            <h3 className="text-lg font-bold text-gray-800">Comprehension Checks</h3>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              After stimulus
            </span>
          </div>
          <div className="space-y-3">
            {currentScenario.checks.comprehension.map((check, idx) => (
              <div key={idx} className="border rounded-lg p-4 bg-blue-50">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-800">Q{idx + 1}:</span>
                      <span className="text-gray-700">{check.question}</span>
                    </div>
                    <div className="text-sm space-y-1 ml-6">
                      <div>
                        <span className="font-semibold text-green-700">✓ Correct:</span>
                        <span className="ml-2 text-gray-700">{check.correctAnswer}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-red-700">✗ Distractors:</span>
                        <span className="ml-2 text-gray-600">{check.distractors.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 ml-4">
                    <span className={`text-xs px-2 py-1 rounded ${
                      check.critical ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {check.critical ? 'Critical' : 'Optional'}
                    </span>
                    <span className="text-xs text-gray-500">{checkTypeDescriptions[check.type].icon} {check.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attention Checks */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="text-orange-600" size={20} />
            <h3 className="text-lg font-bold text-gray-800">Attention Checks</h3>
            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
              Interspersed
            </span>
          </div>
          <div className="space-y-3">
            {currentScenario.checks.attention.map((check, idx) => (
              <div key={idx} className="border rounded-lg p-4 bg-orange-50">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-800">A{idx + 1}:</span>
                      <span className="text-gray-700">{check.question}</span>
                    </div>
                    <div className="text-sm space-y-1 ml-6">
                      <div>
                        <span className="font-semibold text-green-700">✓ Correct:</span>
                        <span className="ml-2 text-gray-700">{check.correctAnswer}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Options:</span>
                        <span className="ml-2 text-gray-600">{check.distractors.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 ml-4">
                    <span className={`text-xs px-2 py-1 rounded ${
                      check.critical ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {check.critical ? 'Exclude if failed' : 'Monitor only'}
                    </span>
                    <span className="text-xs text-gray-500">{checkTypeDescriptions[check.type].icon} {check.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Manipulation Checks */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckSquare className="text-purple-600" size={20} />
            <h3 className="text-lg font-bold text-gray-800">Manipulation Checks</h3>
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
              After each stimulus
            </span>
          </div>
          <div className="space-y-3">
            {currentScenario.checks.manipulation.map((check, idx) => (
              <div key={idx} className="border rounded-lg p-4 bg-purple-50">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-800">M{idx + 1}:</span>
                      <span className="text-gray-700">{check.question}</span>
                    </div>
                    <div className="text-sm space-y-1 ml-6">
                      <div>
                        <span className="font-semibold text-purple-700">Scale:</span>
                        <span className="ml-2 text-gray-700">{check.scale}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 text-xs">{check.anchors[0]}</span>
                        <div className="flex-1 h-2 bg-gradient-to-r from-red-200 to-green-200 rounded"></div>
                        <span className="text-gray-600 text-xs">{check.anchors[1]}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 ml-4">
                    <span className={`text-xs px-2 py-1 rounded ${
                      check.critical ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {check.critical ? 'Must differ ≥1 SD' : 'Secondary'}
                    </span>
                    <span className="text-xs text-gray-500">{checkTypeDescriptions[check.type].icon} {check.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Exclusion Criteria */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Data Exclusion Criteria</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-red-700 mb-3">❌ Automatic Exclusion</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>Failed ≥2 critical comprehension checks (suggests not listening)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>Failed ≥1 critical attention check (instruction-following)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>Average response time &lt; 2 seconds (random clicking)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>Straight-lining (same response to all Likert items)</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-yellow-700 mb-3">⚠️ For Analysis/Review</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">•</span>
                <span>Manipulation check fails (authoritative not perceived) → flag but keep</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">•</span>
                <span>1 failed comprehension check → monitor pattern across scenarios</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">•</span>
                <span>Extreme response times (&gt;5 min per scenario) → check comments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">•</span>
                <span>Self-reported audio issues → sensitivity analysis</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Implementation Guide */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Implementation Guide</h2>
        
        <div className="space-y-4">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <h4 className="font-semibold text-blue-900 mb-2">📍 Placement Strategy</h4>
            <ul className="text-sm space-y-1 text-blue-800">
              <li><strong>Comprehension checks:</strong> Immediately after EACH scenario pair (A & B)</li>
              <li><strong>Attention checks:</strong> Every 2-3 scenarios, randomized position</li>
              <li><strong>Manipulation checks:</strong> After EVERY scenario (both neutral and authoritative)</li>
            </ul>
          </div>

          <div className="bg-green-50 border-l-4 border-green-400 p-4">
            <h4 className="font-semibold text-green-900 mb-2">✓ Best Practices</h4>
            <ul className="text-sm space-y-1 text-green-800">
              <li>• Randomize order of multiple-choice options</li>
              <li>• Don't use "None of the above" or "I don't remember" (forces guessing)</li>
              <li>• Make distractors plausible but clearly wrong</li>
              <li>• Log response times for all checks</li>
              <li>• Pre-register exclusion criteria before data collection</li>
            </ul>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
            <h4 className="font-semibold text-purple-900 mb-2">🎯 Pilot Testing</h4>
            <ul className="text-sm space-y-1 text-purple-800">
              <li>• Run N=10-15 pilot with all checks included</li>
              <li>• Calculate check difficulty: % answering correctly</li>
              <li>• Aim for 80-95% pass rate on comprehension (too hard = bad audio quality)</li>
              <li>• Aim for 95%+ pass rate on attention (catch inattentive participants)</li>
              <li>• Validate manipulation check: Mean(authoritative) should differ from Mean(neutral) by ≥1 SD</li>
            </ul>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={exportBattery}
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-2 font-semibold"
            >
              <Download size={20} />
              Export All Check Batteries
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttentionCheckGenerator;