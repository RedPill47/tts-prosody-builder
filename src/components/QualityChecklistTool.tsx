import { useState, useEffect } from 'react';
import { CheckSquare, AlertTriangle, XCircle, Download, FileCheck, Award, Clock, RotateCcw, Trash2 } from 'lucide-react';
import { loadFromStorage, createAutoSave } from '../utils/persistence';

type ChecksByCategory = {
  [categoryKey: string]: { [checkId: string]: string }
};

type Scenario = {
  id: number;
  name: string;
  domain: string;
  status: string;
  checks: ChecksByCategory;
};

const QualityChecklistTool = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>([
    {
      id: 1,
      name: "Banking - Credit Card",
      domain: "banking",
      status: "draft",
      checks: {}
    },
    {
      id: 2,
      name: "Insurance - Health Plan",
      domain: "insurance",
      status: "draft",
      checks: {}
    },
    {
      id: 3,
      name: "Mobile - Data Plan",
      domain: "mobile",
      status: "draft",
      checks: {}
    },
    {
      id: 4,
      name: "Energy - Tariff",
      domain: "energy",
      status: "draft",
      checks: {}
    },
    {
      id: 5,
      name: "Subscription - Retention",
      domain: "subscription",
      status: "draft",
      checks: {}
    }
  ]);

  const [activeScenario, setActiveScenario] = useState(0);

  // Auto-save function
  const autoSave = createAutoSave('qualityChecklist');

  // Load data on component mount
  useEffect(() => {
    const savedData = loadFromStorage();
    if (
      savedData.qualityChecklist &&
      Array.isArray((savedData.qualityChecklist as any).scenarios)
    ) {
      setScenarios((savedData.qualityChecklist as any).scenarios);
    }
    if (
      savedData.qualityChecklist &&
      typeof (savedData.qualityChecklist as any).activeScenario === "number"
    ) {
      setActiveScenario((savedData.qualityChecklist as any).activeScenario);
    }
  }, []);

  // Save data whenever scenarios or activeScenario changes
  useEffect(() => {
    autoSave({
      scenarios,
      activeScenario
    });
  }, [scenarios, activeScenario]);

  const checklistCategories = {
    textBalance: {
      name: "1. Text Balance & Neutrality",
      icon: "📝",
      color: "blue",
      critical: true,
      checks: [
        {
          id: "tb1",
          criterion: "Same sentence count (3-4 sentences)",
          method: "Count sentences in both options",
          target: "Exact match",
          critical: true
        },
        {
          id: "tb2",
          criterion: "Word count difference ≤ 10%",
          method: "Count words, calculate percentage difference",
          target: "≤ 10%",
          critical: true
        },
        {
          id: "tb3",
          criterion: "Character count difference ≤ 10%",
          method: "Count characters, calculate percentage",
          target: "≤ 10%",
          critical: true
        },
        {
          id: "tb4",
          criterion: "Same number of numeric values",
          method: "Count all numbers (€, %, GB, etc.)",
          target: "Exact match",
          critical: true
        },
        {
          id: "tb5",
          criterion: "No persuasive language",
          method: "Scan for banned words (best, premium, ideal, etc.)",
          target: "Zero occurrences",
          critical: true
        },
        {
          id: "tb6",
          criterion: "Same attribute presentation order",
          method: "Verify attribute 1, 2, 3 order matches",
          target: "Identical sequence",
          critical: true
        },
        {
          id: "tb7",
          criterion: "Consistent units and formatting",
          method: "Check €, gigabytes, kilowatt-hour spelling",
          target: "Uniform across A & B",
          critical: false
        }
      ]
    },
    numericEquivalence: {
      name: "2. Numeric Equivalence",
      icon: "🔢",
      color: "green",
      critical: true,
      checks: [
        {
          id: "ne1",
          criterion: "Expected cost/value difference ≤ 5%",
          method: "Calculate total expected value for both options",
          target: "≤ 5% difference",
          critical: true
        },
        {
          id: "ne2",
          criterion: "Values within realistic market range",
          method: "Compare to median of real-world data",
          target: "Within ±20% of median",
          critical: true
        },
        {
          id: "ne3",
          criterion: "No obvious 'better deal'",
          method: "External reviewer blind test (can't identify better option)",
          target: "50/50 split or indeterminate",
          critical: true
        },
        {
          id: "ne4",
          criterion: "Trade-offs clearly balanced",
          method: "Higher attribute X compensated by lower attribute Y",
          target: "Visible trade-off structure",
          critical: false
        }
      ]
    },
    prosodyAnnotation: {
      name: "3. Prosody Annotation",
      icon: "🎵",
      color: "purple",
      critical: true,
      checks: [
        {
          id: "pa1",
          criterion: "Neutral and authoritative versions use IDENTICAL text",
          method: "Character-by-character comparison",
          target: "100% match",
          critical: true
        },
        {
          id: "pa2",
          criterion: "Prosodic targets documented",
          method: "Control sheet specifies F0, rate, volume, pauses",
          target: "All parameters defined",
          critical: true
        },
        {
          id: "pa3",
          criterion: "SSML or control parameters generated",
          method: "SSML code or model input parameters ready",
          target: "Implementation-ready",
          critical: true
        },
        {
          id: "pa4",
          criterion: "Validation metrics defined",
          method: "Acceptance thresholds for F0, rate, RMS specified",
          target: "Documented in control sheet",
          critical: true
        },
        {
          id: "pa5",
          criterion: "Manipulation check questions prepared",
          method: "Authority/confidence Likert items created",
          target: "Questions ready",
          critical: false
        }
      ]
    },
    comprehensionChecks: {
      name: "4. Comprehension & Attention Checks",
      icon: "✅",
      color: "orange",
      critical: true,
      checks: [
        {
          id: "cc1",
          criterion: "≥2 numeric recall questions per scenario",
          method: "Count comprehension checks",
          target: "Minimum 2",
          critical: true
        },
        {
          id: "cc2",
          criterion: "Distractors are plausible but clearly wrong",
          method: "Review distractor options for reasonability",
          target: "No obvious answers",
          critical: true
        },
        {
          id: "cc3",
          criterion: "Attention checks prepared (instruction-following)",
          method: "Verify catch trial questions exist",
          target: "≥1 per 2-3 scenarios",
          critical: true
        },
        {
          id: "cc4",
          criterion: "Manipulation checks for EACH variant",
          method: "Authority/trust/pressure ratings for both A and B",
          target: "Complete set",
          critical: true
        },
        {
          id: "cc5",
          criterion: "Exclusion criteria pre-defined",
          method: "Document in protocol: ≥2 failed comprehension = exclude",
          target: "Criteria documented",
          critical: false
        }
      ]
    },
    fillerBreaks: {
      name: "5. Filler Prompts & Timing",
      icon: "⏸️",
      color: "yellow",
      critical: false,
      checks: [
        {
          id: "fb1",
          criterion: "10-15s break between Option A and B",
          method: "Verify filler prompt duration",
          target: "10-15 seconds",
          critical: true
        },
        {
          id: "fb2",
          criterion: "Cognitive filler task included",
          method: "Check for working memory task (counting, word generation)",
          target: "Present for rehearsal prevention",
          critical: false
        },
        {
          id: "fb3",
          criterion: "Filler type randomized across trials",
          method: "Verify varied filler prompts used",
          target: "≥3 different types",
          critical: false
        },
        {
          id: "fb4",
          criterion: "Trial position logged for analysis",
          method: "Confirm position tracking in data collection",
          target: "Position recorded",
          critical: false
        }
      ]
    },
    technical: {
      name: "6. Technical Implementation",
      icon: "⚙️",
      color: "indigo",
      critical: true,
      checks: [
        {
          id: "te1",
          criterion: "Audio files generated and quality-checked",
          method: "Listen to all variants, check for artifacts",
          target: "Clean audio, no glitches",
          critical: true
        },
        {
          id: "te2",
          criterion: "Acoustic validation completed",
          method: "Measure F0, rate, RMS with Praat or equivalent",
          target: "Within ±10% of target",
          critical: true
        },
        {
          id: "te3",
          criterion: "Audio duration consistent (within 3s)",
          method: "Check duration for A vs A*, B vs B*",
          target: "≤ 3s difference",
          critical: false
        },
        {
          id: "te4",
          criterion: "File naming convention standardized",
          method: "Verify consistent naming: scenario_option_condition.wav",
          target: "Systematic naming",
          critical: false
        },
        {
          id: "te5",
          criterion: "Randomization order prepared",
          method: "Counterbalancing schedule for A/B and neutral/authoritative",
          target: "Randomization table ready",
          critical: true
        }
      ]
    },
    pilot: {
      name: "7. Pilot Testing",
      icon: "🧪",
      color: "pink",
      critical: true,
      checks: [
        {
          id: "pt1",
          criterion: "Pilot sample size ≥10 participants",
          method: "Recruit pilot participants",
          target: "N ≥ 10",
          critical: true
        },
        {
          id: "pt2",
          criterion: "Manipulation check validated (≥1 SD difference)",
          method: "t-test: Mean(authoritative) vs Mean(neutral)",
          target: "p < 0.05, d ≥ 1.0",
          critical: true
        },
        {
          id: "pt3",
          criterion: "Comprehension check pass rate 80-95%",
          method: "Calculate % passing comprehension checks",
          target: "80-95% range",
          critical: true
        },
        {
          id: "pt4",
          criterion: "Attention check pass rate ≥95%",
          method: "Calculate % passing attention checks",
          target: "≥95%",
          critical: true
        },
        {
          id: "pt5",
          criterion: "Completion time within expected range",
          method: "Check median completion time",
          target: "15-25 minutes",
          critical: false
        },
        {
          id: "pt6",
          criterion: "Fatigue/habituation effects checked",
          method: "Compare trial 1-3 vs trial 8-10 response quality",
          target: "No significant degradation",
          critical: false
        }
      ]
    }
  };

  const updateCheck = (scenarioIdx: number, categoryKey: string, checkId: string, status: string) => {
    const newScenarios = [...scenarios];
    if (!(newScenarios[scenarioIdx].checks as ChecksByCategory)[categoryKey]) {
      (newScenarios[scenarioIdx].checks as ChecksByCategory)[categoryKey] = {};
    }
    (newScenarios[scenarioIdx].checks as ChecksByCategory)[categoryKey][checkId] = status;
    
    // Auto-update scenario status
    const allChecks = Object.values(checklistCategories).flatMap(cat => cat.checks);
    const completedChecks = Object.values(newScenarios[scenarioIdx].checks)
      .flatMap(cat => Object.values(cat))
      .filter(status => status === 'pass' || status === 'fail');
    
    if (completedChecks.length === allChecks.length) {
      const criticalFails = allChecks.filter(check => {
        const categoryKey = Object.keys(checklistCategories).find(key =>
          (checklistCategories as any)[key].checks.some((c: any) => c.id === check.id)
        );
        const status = newScenarios[scenarioIdx].checks[categoryKey as string]?.[check.id as string];
        return check.critical && status === 'fail';
      });
      
      newScenarios[scenarioIdx].status = criticalFails.length > 0 ? 'needs-work' : 'approved';
    } else {
      newScenarios[scenarioIdx].status = 'in-progress';
    }
    
    setScenarios(newScenarios);
  };

  const calculateProgress = (scenarioIdx: number) => {
    const allChecks = Object.values(checklistCategories).flatMap(cat => cat.checks);
    const completedChecks = Object.values(scenarios[scenarioIdx].checks)
      .flatMap(cat => Object.values(cat))
      .filter(status => status === 'pass' || status === 'fail');
    return Math.round((completedChecks.length / allChecks.length) * 100);
  };

  const exportReport = () => {
    const report = `SCENARIO QUALITY ASSURANCE REPORT
Generated: ${new Date().toLocaleString()}
${'='.repeat(80)}

SUMMARY
${scenarios.map(scenario => `
${scenario.name}: ${scenario.status.toUpperCase()} (${calculateProgress(scenarios.indexOf(scenario))}% complete)
`).join('')}

${'='.repeat(80)}

DETAILED CHECKLIST RESULTS

${scenarios.map((scenario) => `
SCENARIO ${scenario.id}: ${scenario.name}
${'-'.repeat(60)}

${Object.entries(checklistCategories).map(([catKey, category]) => `
${category.icon} ${category.name}
${scenario.checks[catKey] ? Object.entries(scenario.checks[catKey]).map(([checkId, status]) => {
  const check = category.checks.find(c => c.id === checkId);
  return `  [${status === 'pass' ? '✓' : status === 'fail' ? '✗' : '○'}] ${check?.criterion || 'Unknown criterion'}`;
}).join('\n') : '  Not yet evaluated'}
`).join('\n')}
`).join('\n' + '='.repeat(80) + '\n')}

${'='.repeat(80)}

CHECKLIST REFERENCE

${Object.entries(checklistCategories).map(([, category]: [string, { icon: string; name: string; critical: boolean; checks: { id: string; criterion: string; method: string; target: string; critical: boolean }[] }]) => `
${category.icon} ${category.name} ${category.critical ? '[CRITICAL]' : '[OPTIONAL]'}
${category.checks.map((check: { id: string; criterion: string; method: string; target: string; critical: boolean }, idx: number) => `
${idx + 1}. ${check.criterion} ${check.critical ? '⚠️ CRITICAL' : ''}
   Method: ${check.method}
   Target: ${check.target}
`).join('')}
`).join('\n')}
`;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quality_assurance_report.txt';
    a.click();
  };

  const resetScenario = (scenarioIdx: number) => {
    const newScenarios = [...scenarios];
    newScenarios[scenarioIdx] = {
      ...newScenarios[scenarioIdx],
      checks: {},
      status: 'draft'
    };
    setScenarios(newScenarios);
  };

  const resetAllScenarios = () => {
    if (confirm('Are you sure you want to reset ALL scenarios? This will clear all Pass/Fail selections and cannot be undone.')) {
      const newScenarios = scenarios.map(scenario => ({
        ...scenario,
        checks: {},
        status: 'draft'
      }));
      setScenarios(newScenarios);
    }
  };

  const currentScenario = scenarios[activeScenario];
  const progress = calculateProgress(activeScenario);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <FileCheck className="text-emerald-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">
            Scenario Quality Assurance Checklist
          </h1>
        </div>
        <p className="text-gray-600">
          Comprehensive validation checklist covering all design criteria before experiment launch
        </p>
      </div>

      {/* Scenario Selector */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Select Scenario to Review:</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          {scenarios.map((scenario, idx) => (
            <div key={scenario.id} className="relative">
              <button
                onClick={() => setActiveScenario(idx)}
                className={`w-full p-3 rounded-lg border-2 transition-all ${
                  activeScenario === idx
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-sm font-semibold mb-1">{scenario.name}</div>
                <div className="flex items-center justify-between text-xs">
                  <span className={`px-2 py-1 rounded ${
                    scenario.status === 'approved' ? 'bg-green-100 text-green-800' :
                    scenario.status === 'needs-work' ? 'bg-red-100 text-red-800' :
                    scenario.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {scenario.status}
                  </span>
                  <span className="text-gray-600">{calculateProgress(idx)}%</span>
                </div>
              </button>
              {/* Individual Reset Button */}
              {Object.keys(scenario.checks).length > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Reset all checks for ${scenario.name}?`)) {
                      resetScenario(idx);
                    }
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full hover:bg-red-600 flex items-center justify-center text-xs"
                  title={`Reset ${scenario.name}`}
                >
                  <Trash2 size={12} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-800">{currentScenario.name} - Progress</h3>
          <span className="text-2xl font-bold text-emerald-600">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-emerald-600 h-4 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Checklist Categories */}
      <div className="space-y-6">
        {Object.entries(checklistCategories).map(([categoryKey, category]) => {
          const categoryChecks = currentScenario.checks[categoryKey] || {};
          const categoryProgress = Object.keys(categoryChecks).length;
          const categoryTotal = category.checks.length;

          return (
            <div key={categoryKey} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{category.icon}</span>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{category.name}</h2>
                    {category.critical && (
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                        CRITICAL CATEGORY
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {categoryProgress} / {categoryTotal} completed
                </div>
              </div>

              <div className="space-y-3">
                {category.checks.map((check) => {
                  const status = categoryChecks[check.id];
                  return (
                    <div
                      key={check.id}
                      className={`border rounded-lg p-4 ${
                        status === 'pass' ? 'bg-green-50 border-green-300' :
                        status === 'fail' ? 'bg-red-50 border-red-300' :
                        'bg-gray-50 border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-800">{check.criterion}</span>
                            {check.critical && (
                              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                Critical
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            <div><strong>Method:</strong> {check.method}</div>
                            <div><strong>Target:</strong> {check.target}</div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => updateCheck(activeScenario, categoryKey, check.id, 'pass')}
                            className={`px-3 py-2 rounded flex items-center gap-1 text-sm ${
                              status === 'pass'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-200 hover:bg-green-100'
                            }`}
                          >
                            <CheckSquare size={16} />
                            Pass
                          </button>
                          <button
                            onClick={() => updateCheck(activeScenario, categoryKey, check.id, 'fail')}
                            className={`px-3 py-2 rounded flex items-center gap-1 text-sm ${
                              status === 'fail'
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-200 hover:bg-red-100'
                            }`}
                          >
                            <XCircle size={16} />
                            Fail
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Overall Summary</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={resetAllScenarios}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-2"
            >
              <RotateCcw size={16} />
              Reset All
            </button>
            <button
              onClick={exportReport}
              className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 flex items-center gap-2"
            >
              <Download size={16} />
              Export Report
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-green-50 border-l-4 border-green-400 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="text-green-600" size={24} />
              <h3 className="font-semibold text-green-900">Approved</h3>
            </div>
            <div className="text-3xl font-bold text-green-700">
              {scenarios.filter(s => s.status === 'approved').length}
            </div>
            <div className="text-sm text-green-600">Ready for experiment</div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="text-yellow-600" size={24} />
              <h3 className="font-semibold text-yellow-900">In Progress</h3>
            </div>
            <div className="text-3xl font-bold text-yellow-700">
              {scenarios.filter(s => s.status === 'in-progress').length}
            </div>
            <div className="text-sm text-yellow-600">Being reviewed</div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="text-red-600" size={24} />
              <h3 className="font-semibold text-red-900">Needs Work</h3>
            </div>
            <div className="text-3xl font-bold text-red-700">
              {scenarios.filter(s => s.status === 'needs-work').length}
            </div>
            <div className="text-sm text-red-600">Critical issues found</div>
          </div>
        </div>

        {/* Detailed Progress */}
        <div className="mt-6">
          <h4 className="font-semibold text-gray-800 mb-3">📊 Detailed Progress</h4>
          <div className="space-y-3">
            {scenarios.map((scenario, idx) => {
              const progress = calculateProgress(idx);
              const statusColor = scenario.status === 'approved' ? 'green' : 
                                scenario.status === 'needs-work' ? 'red' : 
                                scenario.status === 'in-progress' ? 'yellow' : 'gray';
              
              return (
                <div key={scenario.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full bg-${statusColor}-500`}></div>
                    <span className="font-medium text-gray-800">{scenario.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-600">
                      {progress}% complete
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      scenario.status === 'approved' ? 'bg-green-100 text-green-800' :
                      scenario.status === 'needs-work' ? 'bg-red-100 text-red-800' :
                      scenario.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {scenario.status.replace('-', ' ').toUpperCase()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4">
          <h4 className="font-semibold text-blue-900 mb-2">📋 Pre-Launch Checklist</h4>
          <ul className="text-sm space-y-1 text-blue-800">
            <li>✓ All scenarios must achieve "Approved" status</li>
            <li>✓ All critical checks must pass</li>
            <li>✓ Pilot testing completed with N≥10</li>
            <li>✓ Manipulation check validated (≥1 SD difference)</li>
            <li>✓ Ethics approval obtained</li>
            <li>✓ Pre-registration completed</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QualityChecklistTool;