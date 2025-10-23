import { useState, useEffect } from 'react';
import { Layout, Copy, CheckCircle, AlertCircle, Download, Trash2, X } from 'lucide-react';
import { loadFromStorage, createAutoSave } from '../utils/persistence';

const SentenceStructureStandardizer = () => {
  const [activeTemplate, setActiveTemplate] = useState('banking');
  const [customInputs, setCustomInputs] = useState({
    productName: '',
    attribute1: '',
    attribute2: '',
    attribute3: '',
    tradeoff: '',
    availability: ''
  });
  
  // Template structures for each domain
  const templates = {
    banking: {
      name: "Banking / Credit Cards",
      structure: [
        "The [PRODUCT_NAME] has a [ATTRIBUTE_1] annual fee, offers [ATTRIBUTE_2] cashback on all purchases, and includes [ATTRIBUTE_3].",
        "[TRADEOFF_STATEMENT].",
        "Both cards provide online account management and mobile app access.",
        "Which card would you prefer?"
      ],
      example: {
        productName: "Premium Card",
        attribute1: "€49",
        attribute2: "1% cashback",
        attribute3: "comprehensive travel insurance with emergency assistance worldwide",
        tradeoff: "Higher annual fee provides additional travel benefits",
        availability: "available immediately"
      },
      guidelines: [
        "Attribute 1: Always the fee (€X format)",
        "Attribute 2: Always the cashback (X% format)",
        "Attribute 3: Always the special benefit/insurance",
        "Keep attribute order consistent across A and B"
      ]
    },
    insurance: {
      name: "Insurance / Health Plans",
      structure: [
        "Plan [PRODUCT_NAME] costs [ATTRIBUTE_1] per month with a [ATTRIBUTE_2] annual deductible.",
        "After you meet the deductible, [ATTRIBUTE_3].",
        "Both plans include prescription coverage and preventive care visits.",
        "Which plan would you prefer?"
      ],
      example: {
        productName: "A",
        attribute1: "€35",
        attribute2: "€350",
        attribute3: "all covered services are fully paid",
        tradeoff: "Lower deductible means higher monthly premium",
        availability: "enrollment available"
      },
      guidelines: [
        "Attribute 1: Monthly premium (€X format)",
        "Attribute 2: Annual deductible (€X format)",
        "Attribute 3: Coverage statement after deductible",
        "Always mention what happens 'after deductible'"
      ]
    },
    mobile: {
      name: "Mobile / Data Plans",
      structure: [
        "The [PRODUCT_NAME] Plan includes [ATTRIBUTE_1] of data per month, costs [ATTRIBUTE_2] monthly, and provides [ATTRIBUTE_3].",
        "[TRADEOFF_STATEMENT].",
        "Both plans include unlimited calls and texts within the EU.",
        "Which plan would you prefer?"
      ],
      example: {
        productName: "Standard",
        attribute1: "40 gigabytes",
        attribute2: "€15",
        attribute3: "5G Plus network access with priority support",
        tradeoff: "More data available at a higher monthly rate",
        availability: "activation within 24 hours"
      },
      guidelines: [
        "Attribute 1: Data allowance (X gigabytes format)",
        "Attribute 2: Monthly cost (€X format)",
        "Attribute 3: Network type and extras",
        "Use 'gigabytes' not 'GB' in speech"
      ]
    },
    energy: {
      name: "Energy / Electricity Tariffs",
      structure: [
        "The [PRODUCT_NAME] plan charges [ATTRIBUTE_1] per kilowatt-hour with a [ATTRIBUTE_2] monthly service fee.",
        "[ATTRIBUTE_3].",
        "Both plans use 100% renewable energy sources.",
        "Which plan would you prefer?"
      ],
      example: {
        productName: "Fixed Rate",
        attribute1: "€0.27",
        attribute2: "€5",
        attribute3: "Your rate stays the same for 12 months",
        tradeoff: "Fixed pricing protects against market increases",
        availability: "switch available"
      },
      guidelines: [
        "Attribute 1: Rate per kWh (€0.XX format)",
        "Attribute 2: Monthly base fee (€X format)",
        "Attribute 3: Rate stability statement",
        "Use 'kilowatt-hour' not 'kWh' in speech"
      ]
    },
    subscription: {
      name: "Subscription / Retention",
      structure: [
        "[PRODUCT_NAME] your subscription at [ATTRIBUTE_1] per month.",
        "[ATTRIBUTE_2].",
        "[ATTRIBUTE_3].",
        "Would you like to continue or cancel?"
      ],
      example: {
        productName: "Continue",
        attribute1: "€8.99",
        attribute2: "You keep access to two premium channels and can cancel anytime without penalties",
        attribute3: "Your saved playlists and preferences will remain active",
        tradeoff: "Continuing maintains all your personalized content",
        availability: "effective immediately"
      },
      guidelines: [
        "Attribute 1: Monthly cost (€X.XX format)",
        "Attribute 2: Access and flexibility statement",
        "Attribute 3: Data/content preservation statement",
        "Frame as continue vs cancel (not A vs B)"
      ]
    }
  };

  const [generatedScenarios, setGeneratedScenarios] = useState<any[]>([]);

  // Auto-save function
  const autoSave = createAutoSave('sentenceStructure');

  // Load data on component mount
  useEffect(() => {
    const savedData = loadFromStorage();
    if (savedData.sentenceStructure?.generatedScenarios) {
      setGeneratedScenarios(savedData.sentenceStructure.generatedScenarios);
    }
    if (savedData.sentenceStructure?.activeTemplate) {
      setActiveTemplate(savedData.sentenceStructure.activeTemplate);
    }
    if (savedData.sentenceStructure?.customInputs) {
      setCustomInputs(savedData.sentenceStructure.customInputs);
    }
  }, []);

  // Save data whenever generatedScenarios, activeTemplate, or customInputs changes
  useEffect(() => {
    autoSave({
      generatedScenarios,
      activeTemplate,
      customInputs
    });
  }, [generatedScenarios, activeTemplate, customInputs]);

  const generateFromTemplate = (templateKey: string, inputs: any) => {
    const template = (templates as any)[templateKey];
    let text = template.structure.map((sentence: string) => {
      return sentence
        .replace('[PRODUCT_NAME]', inputs.productName || template.example.productName)
        .replace('[ATTRIBUTE_1]', inputs.attribute1 || template.example.attribute1)
        .replace('[ATTRIBUTE_2]', inputs.attribute2 || template.example.attribute2)
        .replace('[ATTRIBUTE_3]', inputs.attribute3 || template.example.attribute3)
        .replace('[TRADEOFF_STATEMENT]', inputs.tradeoff || template.example.tradeoff)
        .replace('[AVAILABILITY]', inputs.availability || template.example.availability);
    }).join(' ');
    
    return text;
  };

  const analyzeStructure = (text: any) => {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    const words = text.split(/\s+/).filter((w: any) => w.length > 0);
    const numbers = (text.match(/€?\d+(\.\d+)?%?/g) || []).length;
    
    return {
      sentenceCount: sentences.length,
      wordCount: words.length,
      charCount: text.length,
      numberCount: numbers,
      sentences: sentences.map((s: string) => s.trim())
    };
  };

  const copyToClipboard = (text: any) => {
    navigator.clipboard.writeText(text);
  };

  const currentTemplate = (templates as any)[activeTemplate];
  const exampleText = generateFromTemplate(activeTemplate, currentTemplate.example);
  const analysis = analyzeStructure(exampleText);

  const addToGenerated = () => {
    const optionAText = generateFromTemplate(activeTemplate, {
      ...customInputs,
      productName: customInputs.productName + ' A'
    });
    const optionBText = generateFromTemplate(activeTemplate, {
      ...customInputs,
      productName: customInputs.productName + ' B'
    });

    setGeneratedScenarios([...generatedScenarios, {
      domain: currentTemplate.name,
      optionA: optionAText,
      optionB: optionBText,
      timestamp: new Date().toISOString()
    }]);

    // Reset inputs
    setCustomInputs({
      productName: '',
      attribute1: '',
      attribute2: '',
      attribute3: '',
      tradeoff: '',
      availability: ''
    });
  };

  const exportScenarios = () => {
    const exportText = generatedScenarios.map((scenario: any, idx: number) => {
      return `Scenario ${idx + 1}: ${scenario.domain}\n\nOption A:\n${scenario.optionA}\n\nOption B:\n${scenario.optionB}\n\n${'='.repeat(80)}\n\n`;
    }).join('');

    const blob = new Blob([exportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'standardized_scenarios.txt';
    a.click();
  };

  const deleteScenario = (index: number) => {
    setGeneratedScenarios(generatedScenarios.filter((_, idx) => idx !== index));
  };

  const clearAllScenarios = () => {
    setGeneratedScenarios([]);
  };

  const analyzeText = (text: string) => {
    const sentences = text.split('.').filter((s: string) => s.trim().length > 0);
    const words = text.split(/\s+/).filter((w: string) => w.length > 0);
    const numbers = (text.match(/\d+(\.\d+)?/g) || []).length;
    
    return {
      sentenceCount: sentences.length,
      wordCount: words.length,
      charCount: text.length,
      numberCount: numbers
    };
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Layout className="text-purple-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">
            Sentence Structure Standardization Tool
          </h1>
        </div>
        <p className="text-gray-600">
          Generate perfectly balanced scenario texts using validated templates
        </p>
      </div>

      {/* Template Selector */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Select Domain Template:</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {Object.keys(templates).map((key: string) => (
            <button
              key={key}
              onClick={() => setActiveTemplate(key)}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                activeTemplate === key
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {(templates as any)[key].name.split('/')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Template Structure */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {currentTemplate.name} Template
          </h2>

          <div className="space-y-4 mb-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Sentence Structure:</h3>
              <ol className="space-y-2">
                {currentTemplate.structure.map((sentence: string, idx: number) => (
                  <li key={idx} className="text-sm">
                    <span className="inline-block w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-center font-semibold mr-2">
                      {idx + 1}
                    </span>
                    <span className="text-gray-700">{sentence}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Guidelines:</h4>
              <ul className="space-y-1 text-sm text-blue-800">
                {currentTemplate.guidelines.map((guideline: string, idx: number) => (
                  <li key={idx}>• {guideline}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 rounded p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-800">Example Output:</h4>
              <button
                onClick={() => copyToClipboard(exampleText)}
                className="text-sm text-purple-600 hover:text-purple-800 flex items-center gap-1"
              >
                <Copy size={14} />
                Copy
              </button>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">{exampleText}</p>
            
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className="bg-white rounded p-2 text-center">
                <div className="font-semibold text-gray-800">{analysis.sentenceCount}</div>
                <div className="text-gray-600">Sentences</div>
              </div>
              <div className="bg-white rounded p-2 text-center">
                <div className="font-semibold text-gray-800">{analysis.wordCount}</div>
                <div className="text-gray-600">Words</div>
              </div>
              <div className="bg-white rounded p-2 text-center">
                <div className="font-semibold text-gray-800">{analysis.charCount}</div>
                <div className="text-gray-600">Characters</div>
              </div>
              <div className="bg-white rounded p-2 text-center">
                <div className="font-semibold text-gray-800">{analysis.numberCount}</div>
                <div className="text-gray-600">Numbers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Input Generator */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Generate Your Scenario
          </h2>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                value={customInputs.productName}
                onChange={(e) => setCustomInputs({...customInputs, productName: e.target.value})}
                placeholder={currentTemplate.example.productName}
                className="w-full px-3 py-2 border rounded text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Attribute 1
              </label>
              <input
                type="text"
                value={customInputs.attribute1}
                onChange={(e) => setCustomInputs({...customInputs, attribute1: e.target.value})}
                placeholder={currentTemplate.example.attribute1}
                className="w-full px-3 py-2 border rounded text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">{currentTemplate.guidelines[0]}</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Attribute 2
              </label>
              <input
                type="text"
                value={customInputs.attribute2}
                onChange={(e) => setCustomInputs({...customInputs, attribute2: e.target.value})}
                placeholder={currentTemplate.example.attribute2}
                className="w-full px-3 py-2 border rounded text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">{currentTemplate.guidelines[1]}</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Attribute 3
              </label>
              <input
                type="text"
                value={customInputs.attribute3}
                onChange={(e) => setCustomInputs({...customInputs, attribute3: e.target.value})}
                placeholder={currentTemplate.example.attribute3}
                className="w-full px-3 py-2 border rounded text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">{currentTemplate.guidelines[2]}</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Tradeoff Statement
              </label>
              <input
                type="text"
                value={customInputs.tradeoff}
                onChange={(e) => setCustomInputs({...customInputs, tradeoff: e.target.value})}
                placeholder={currentTemplate.example.tradeoff}
                className="w-full px-3 py-2 border rounded text-sm"
              />
            </div>
          </div>

          <button
            onClick={addToGenerated}
            className="w-full px-4 py-3 bg-purple-600 text-white rounded font-semibold hover:bg-purple-700 flex items-center justify-center gap-2"
          >
            <CheckCircle size={18} />
            Generate & Add to Collection
          </button>

          {customInputs.productName && (
            <div className="mt-4 bg-purple-50 rounded p-4">
              <h4 className="font-semibold text-purple-900 mb-2">Preview:</h4>
              <p className="text-sm text-gray-700">
                {generateFromTemplate(activeTemplate, customInputs)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Generated Scenarios Collection */}
      {generatedScenarios.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Generated Scenarios ({generatedScenarios.length})
            </h2>
            <div className="flex gap-2">
              <button
                onClick={exportScenarios}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2 text-sm"
              >
                <Download size={16} />
                Export All
              </button>
              <button
                onClick={clearAllScenarios}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-2 text-sm"
              >
                <X size={16} />
                Clear All
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {generatedScenarios.map((scenario: any, idx: number) => (
              <div key={idx} className="border rounded p-4 relative">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-800">
                    Scenario {idx + 1}: {scenario.domain}
                  </h3>
                  <button
                    onClick={() => deleteScenario(idx)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                    title="Delete scenario"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded p-3">
                    <h4 className="font-semibold text-blue-900 text-sm mb-2">Option A</h4>
                    <p className="text-sm text-gray-700 mb-3">{scenario.optionA}</p>
                    <div className="grid grid-cols-4 gap-1 text-xs">
                      <div className="bg-white rounded p-1 text-center">
                        <div className="font-semibold text-gray-800">{analyzeText(scenario.optionA).sentenceCount}</div>
                        <div className="text-gray-600">Sent</div>
                      </div>
                      <div className="bg-white rounded p-1 text-center">
                        <div className="font-semibold text-gray-800">{analyzeText(scenario.optionA).wordCount}</div>
                        <div className="text-gray-600">Words</div>
                      </div>
                      <div className="bg-white rounded p-1 text-center">
                        <div className="font-semibold text-gray-800">{analyzeText(scenario.optionA).charCount}</div>
                        <div className="text-gray-600">Chars</div>
                      </div>
                      <div className="bg-white rounded p-1 text-center">
                        <div className="font-semibold text-gray-800">{analyzeText(scenario.optionA).numberCount}</div>
                        <div className="text-gray-600">Nums</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded p-3">
                    <h4 className="font-semibold text-green-900 text-sm mb-2">Option B</h4>
                    <p className="text-sm text-gray-700 mb-3">{scenario.optionB}</p>
                    <div className="grid grid-cols-4 gap-1 text-xs">
                      <div className="bg-white rounded p-1 text-center">
                        <div className="font-semibold text-gray-800">{analyzeText(scenario.optionB).sentenceCount}</div>
                        <div className="text-gray-600">Sent</div>
                      </div>
                      <div className="bg-white rounded p-1 text-center">
                        <div className="font-semibold text-gray-800">{analyzeText(scenario.optionB).wordCount}</div>
                        <div className="text-gray-600">Words</div>
                      </div>
                      <div className="bg-white rounded p-1 text-center">
                        <div className="font-semibold text-gray-800">{analyzeText(scenario.optionB).charCount}</div>
                        <div className="text-gray-600">Chars</div>
                      </div>
                      <div className="bg-white rounded p-1 text-center">
                        <div className="font-semibold text-gray-800">{analyzeText(scenario.optionB).numberCount}</div>
                        <div className="text-gray-600">Nums</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Structural Consistency Checklist */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Structural Consistency Checklist
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">✓ Requirements</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                <span>Exactly 3-4 sentences per option</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                <span>Same sentence structure between A and B</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                <span>Word count difference ≤ 10%</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                <span>Same number of numeric values</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                <span>Consistent attribute order</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                <span>No persuasive language</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-3">✗ Common Mistakes</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={16} />
                <span>Different sentence counts (e.g., 3 vs 4)</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={16} />
                <span>Reordering attributes between options</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={16} />
                <span>Using "better," "best," "premium"</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={16} />
                <span>Inconsistent units (€ vs EUR, GB vs gigabytes)</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={16} />
                <span>More detail in one option vs the other</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={16} />
                <span>Different closing questions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentenceStructureStandardizer;