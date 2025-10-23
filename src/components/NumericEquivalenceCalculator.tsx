import { useState, useEffect } from 'react';
import { Calculator, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { loadFromStorage, createAutoSave } from '../utils/persistence';

const NumericEquivalenceCalculator = () => {
  const [activeScenario, setActiveScenario] = useState('banking');
  const [editableParams, setEditableParams] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  // Removed unused state
  const [scenariosData, setScenariosData] = useState<any>(null);

  // Auto-save function
  const autoSave = createAutoSave('numericEquivalence');

  // Initialize scenarios data
  useEffect(() => {
    if (!scenariosData) {
      setScenariosData(scenarios);
    }
  }, [scenariosData]);

  // Load data on component mount
  useEffect(() => {
    const savedData = loadFromStorage();
    if (savedData.numericEquivalence?.activeScenario) {
      setActiveScenario(savedData.numericEquivalence.activeScenario);
    }
    if (savedData.numericEquivalence?.editableParams) {
      setEditableParams(savedData.numericEquivalence.editableParams);
    }
    if (savedData.numericEquivalence?.isEditing !== undefined) {
      setIsEditing(savedData.numericEquivalence.isEditing);
    }
    if (savedData.numericEquivalence?.scenariosData) {
      setScenariosData(savedData.numericEquivalence.scenariosData);
    }
  }, []);

  // Save data whenever activeScenario, editableParams, isEditing, or scenariosData changes
  useEffect(() => {
    if (scenariosData) {
      autoSave({
        activeScenario,
        editableParams,
        isEditing,
        scenariosData
      });
    }
  }, [activeScenario, editableParams, isEditing, scenariosData]);

  // Pre-defined scenario templates with calculation methods
  const scenarios = {
    banking: {
      name: "Credit Card Selection",
      description: "Annual cost comparison including fees and cashback",
      optionA: {
        label: "Premium Card",
        params: { annualFee: 49, cashbackRate: 1.0, avgSpending: 3000 },
        formula: "annualFee - (avgSpending * cashbackRate / 100)",
        display: "€49 - (€3000 × 1.0%) = €19 net annual cost"
      },
      optionB: {
        label: "Classic Card",
        params: { annualFee: 0, cashbackRate: 0.6, avgSpending: 3000 },
        formula: "annualFee - (avgSpending * cashbackRate / 100)",
        display: "€0 - (€3000 × 0.6%) = -€18 net annual benefit"
      },
      realWorldData: [
        { source: "Chase Sapphire", fee: 95, cashback: 1.25 },
        { source: "Capital One Quicksilver", fee: 0, cashback: 1.5 },
        { source: "Amex Blue Cash", fee: 0, cashback: 1.0 },
        { source: "Citi Double Cash", fee: 0, cashback: 2.0 },
        { source: "Bank of America Premium", fee: 95, cashback: 1.5 }
      ]
    },
    insurance: {
      name: "Health Insurance Plan",
      description: "Total annual cost including premiums and expected deductible",
      optionA: {
        label: "Plan A (Lower Deductible)",
        params: { monthlyPremium: 35, deductible: 350, utilizationRate: 0.7 },
        formula: "(monthlyPremium * 12) + (deductible * utilizationRate)",
        display: "(€35 × 12) + (€350 × 70%) = €665 expected annual cost"
      },
      optionB: {
        label: "Plan B (Higher Deductible)",
        params: { monthlyPremium: 20, deductible: 500, utilizationRate: 0.7 },
        formula: "(monthlyPremium * 12) + (deductible * utilizationRate)",
        display: "(€20 × 12) + (€500 × 70%) = €590 expected annual cost"
      },
      realWorldData: [
        { source: "Bronze Plan", premium: 250, deductible: 6000 },
        { source: "Silver Plan", premium: 400, deductible: 3000 },
        { source: "Gold Plan", premium: 500, deductible: 1000 },
        { source: "Platinum Plan", premium: 600, deductible: 500 }
      ]
    },
    mobile: {
      name: "Mobile Data Plan",
      description: "Value per GB and total monthly cost",
      optionA: {
        label: "Standard Plan (40GB)",
        params: { dataGB: 40, monthlyCost: 15, extra5GPlus: 3 },
        formula: "monthlyCost / dataGB",
        display: "€15 ÷ 40GB = €0.375 per GB (+ 5G Plus worth ~€3)"
      },
      optionB: {
        label: "Extended Plan (60GB)",
        params: { dataGB: 60, monthlyCost: 18, extra5GPlus: 0 },
        formula: "monthlyCost / dataGB",
        display: "€18 ÷ 60GB = €0.30 per GB"
      },
      realWorldData: [
        { source: "T-Mobile Essentials", data: 50, price: 27 },
        { source: "Verizon Play More", data: 50, price: 45 },
        { source: "AT&T Unlimited Extra", data: 50, price: 40 },
        { source: "Vodafone Red M", data: 40, price: 30 },
        { source: "O2 Free M", data: 40, price: 25 }
      ]
    },
    energy: {
      name: "Energy Tariff",
      description: "Total monthly cost for typical household (300 kWh/month)",
      optionA: {
        label: "Fixed Rate",
        params: { ratePerKWh: 0.27, monthlyFee: 5, usageKWh: 300 },
        formula: "(ratePerKWh * usageKWh) + monthlyFee",
        display: "(€0.27 × 300) + €5 = €86 per month"
      },
      optionB: {
        label: "Variable Rate",
        params: { avgRatePerKWh: 0.27, monthlyFee: 0, usageKWh: 300, volatility: 0.02 },
        formula: "avgRatePerKWh * usageKWh + monthlyFee",
        display: "(€0.27 avg × 300) + €0 = €81 average per month (±€6 volatility)"
      },
      realWorldData: [
        { source: "Octopus Fixed", rate: 0.28, fee: 8 },
        { source: "Bulb Variable", rate: 0.26, fee: 0 },
        { source: "EON Fixed 12m", rate: 0.29, fee: 5 },
        { source: "Shell Variable", rate: 0.25, fee: 0 },
        { source: "British Gas Fixed", rate: 0.30, fee: 10 }
      ]
    },
    subscription: {
      name: "Subscription Retention",
      description: "6-month cost comparison including value of content access",
      optionA: {
        label: "Continue Subscription",
        params: { monthlyCost: 8.99, months: 6, contentValue: 20 },
        formula: "monthlyCost * months",
        display: "€8.99 × 6 = €53.94 (retain access to saved content worth ~€20)"
      },
      optionB: {
        label: "Cancel Now",
        params: { monthlyCost: 0, months: 6, contentLoss: 20 },
        formula: "monthlyCost * months + contentLoss",
        display: "€0 × 6 + €20 content loss = €20 opportunity cost"
      },
      realWorldData: [
        { source: "Netflix Standard", price: 13.49 },
        { source: "Spotify Premium", price: 10.99 },
        { source: "Disney+", price: 7.99 },
        { source: "HBO Max", price: 9.99 },
        { source: "Apple Music", price: 10.99 }
      ]
    }
  };

  const calculateValue = (params: any, formula: any) => {
    try {
      // Create a safe evaluation context
      const context = { ...params };
      const result = eval(formula.replace(/([a-zA-Z_][a-zA-Z0-9_]*)/g, (match: any) => {
        return context.hasOwnProperty(match) ? context[match] : match;
      }));
      return parseFloat(result.toFixed(2));
    } catch (e) {
      return null;
    }
  };

  const analyzeEquivalence = (scenario: any) => {
    const valueA = calculateValue(scenario.optionA.params, scenario.optionA.formula);
    const valueB = calculateValue(scenario.optionB.params, scenario.optionB.formula);
    
    if (valueA === null || valueB === null) {
      return { error: "Cannot calculate values" };
    }

    const difference = Math.abs(valueA - valueB);
    const percentDiff = (difference / Math.max(valueA, valueB)) * 100;
    const isEquivalent = percentDiff <= 5;
    const higherOption = valueA > valueB ? 'A' : 'B';
    const lowerOption = valueA > valueB ? 'B' : 'A';

    return {
      valueA,
      valueB,
      difference: difference.toFixed(2),
      percentDiff: percentDiff.toFixed(2),
      isEquivalent,
      higherOption,
      lowerOption,
      status: isEquivalent ? 'balanced' : percentDiff <= 10 ? 'acceptable' : 'unbalanced'
    };
  };

  const getMedianFromRealWorld = (data: any, field: any) => {
    const values = data.map((d: any) => d[field]).filter((v: any) => v !== undefined).sort((a: any, b: any) => a - b);
    const mid = Math.floor(values.length / 2);
    return values.length % 2 === 0 ? (values[mid - 1] + values[mid]) / 2 : values[mid];
  };

  const startEditing = () => {
    const currentScenario = (scenarios as any)[activeScenario];
    setEditableParams({
      optionA: { ...currentScenario.optionA.params },
      optionB: { ...currentScenario.optionB.params }
    });
    setIsEditing(true);
  };

  const saveEdits = () => {
    // Update the scenarios data with the edited parameters
    if (scenariosData && (editableParams.optionA || editableParams.optionB)) {
      const updatedScenarios = { ...scenariosData };
      
      if (editableParams.optionA && updatedScenarios[activeScenario]) {
        updatedScenarios[activeScenario] = {
          ...updatedScenarios[activeScenario],
          optionA: {
            ...updatedScenarios[activeScenario].optionA,
            params: { ...updatedScenarios[activeScenario].optionA.params, ...editableParams.optionA }
          }
        };
      }
      
      if (editableParams.optionB && updatedScenarios[activeScenario]) {
        updatedScenarios[activeScenario] = {
          ...updatedScenarios[activeScenario],
          optionB: {
            ...updatedScenarios[activeScenario].optionB,
            params: { ...updatedScenarios[activeScenario].optionB.params, ...editableParams.optionB }
          }
        };
      }
      
      setScenariosData(updatedScenarios);
    }
    setIsEditing(false);
    setEditableParams({});
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditableParams({});
  };

  const updateParam = (option: any, param: any, value: any) => {
    setEditableParams(prev => ({
      ...prev,
      [option]: {
        ...(prev as any)[option],
        [param]: parseFloat(value) || 0
      }
    }));
  };

  const getCurrentParams = (option: string) => {
    if (isEditing && (editableParams as any)[option]) {
      return (editableParams as any)[option];
    }
    if (scenariosData && scenariosData[activeScenario]) {
      return scenariosData[activeScenario][option]?.params;
    }
    return (scenarios as any)[activeScenario][option].params;
  };

  const currentScenario = scenariosData && scenariosData[activeScenario] ? scenariosData[activeScenario] : (scenarios as any)[activeScenario];
  
  // Create a modified scenario with current parameters for analysis
  const analysisScenario = {
    ...currentScenario,
    optionA: {
      ...currentScenario.optionA,
      params: getCurrentParams('optionA')
    },
    optionB: {
      ...currentScenario.optionB,
      params: getCurrentParams('optionB')
    }
  };
  
  const analysis = analyzeEquivalence(analysisScenario);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">
            Numeric Equivalence Calculator
          </h1>
        </div>
        <p className="text-gray-600">
          Verify that Option A and Option B are rationally equivalent (≤5% cost difference)
        </p>
      </div>

      {/* Scenario Selector */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Select Scenario Domain:</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {Object.keys(scenarios).map(key => (
            <button
              key={key}
              onClick={() => setActiveScenario(key)}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                activeScenario === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {(scenarios as any)[key].name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Analysis */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentScenario.name}</h2>
            <p className="text-gray-600">{currentScenario.description}</p>
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <button
                onClick={startEditing}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
              >
                Edit Parameters
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={saveEdits}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium"
                >
                  Save Changes
                </button>
                <button
                  onClick={cancelEditing}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Options Comparison */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Option A */}
          <div className="border-2 border-blue-300 rounded-lg p-4 bg-blue-50">
            <h3 className="text-lg font-bold text-blue-900 mb-3">Option A: {currentScenario.optionA.label}</h3>
            
            <div className="space-y-2 mb-4">
              <h4 className="font-semibold text-sm text-gray-700">Parameters:</h4>
              {Object.entries(getCurrentParams('optionA')).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{key}:</span>
                  {isEditing ? (
                    <input
                      type="number"
                      step="0.01"
                      value={String(value)}
                      onChange={(e) => updateParam('optionA', key, e.target.value)}
                      className="w-20 px-2 py-1 border rounded text-sm font-mono"
                      aria-label={`${key} for Option A`}
                    />
                  ) : (
                    <span className="font-mono font-semibold">{String(value)}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-white rounded p-3 mb-3">
              <h4 className="font-semibold text-sm text-gray-700 mb-1">Calculation:</h4>
              <p className="text-xs text-gray-600 font-mono mb-2">{currentScenario.optionA.formula}</p>
              <p className="text-sm text-gray-700">{currentScenario.optionA.display}</p>
            </div>

            <div className="bg-blue-900 text-white rounded p-3 text-center">
              <div className="text-sm">Calculated Value</div>
              <div className="text-2xl font-bold">€{analysis.valueA}</div>
            </div>
          </div>

          {/* Option B */}
          <div className="border-2 border-green-300 rounded-lg p-4 bg-green-50">
            <h3 className="text-lg font-bold text-green-900 mb-3">Option B: {currentScenario.optionB.label}</h3>
            
            <div className="space-y-2 mb-4">
              <h4 className="font-semibold text-sm text-gray-700">Parameters:</h4>
              {Object.entries(getCurrentParams('optionB')).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{key}:</span>
                  {isEditing ? (
                    <input
                      type="number"
                      step="0.01"
                      value={String(value)}
                      onChange={(e) => updateParam('optionB', key, e.target.value)}
                      className="w-20 px-2 py-1 border rounded text-sm font-mono"
                      aria-label={`${key} for Option B`}
                    />
                  ) : (
                    <span className="font-mono font-semibold">{String(value)}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-white rounded p-3 mb-3">
              <h4 className="font-semibold text-sm text-gray-700 mb-1">Calculation:</h4>
              <p className="text-xs text-gray-600 font-mono mb-2">{currentScenario.optionB.formula}</p>
              <p className="text-sm text-gray-700">{currentScenario.optionB.display}</p>
            </div>

            <div className="bg-green-900 text-white rounded p-3 text-center">
              <div className="text-sm">Calculated Value</div>
              <div className="text-2xl font-bold">€{analysis.valueB}</div>
            </div>
          </div>
        </div>

        {/* Equivalence Analysis */}
        <div className={`rounded-lg p-6 ${
          analysis.status === 'balanced' ? 'bg-green-50 border-2 border-green-400' :
          analysis.status === 'acceptable' ? 'bg-yellow-50 border-2 border-yellow-400' :
          'bg-red-50 border-2 border-red-400'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            {analysis.status === 'balanced' ? (
              <>
                <CheckCircle className="text-green-600" size={32} />
                <h3 className="text-xl font-bold text-green-900">Options are Balanced ✓</h3>
              </>
            ) : analysis.status === 'acceptable' ? (
              <>
                <AlertTriangle className="text-yellow-600" size={32} />
                <h3 className="text-xl font-bold text-yellow-900">Acceptable Range (5-10%)</h3>
              </>
            ) : (
              <>
                <AlertTriangle className="text-red-600" size={32} />
                <h3 className="text-xl font-bold text-red-900">Options are Unbalanced</h3>
              </>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded p-4 text-center">
              <div className="text-sm text-gray-600 mb-1">Absolute Difference</div>
              <div className="text-2xl font-bold text-gray-800">€{analysis.difference}</div>
            </div>
            <div className="bg-white rounded p-4 text-center">
              <div className="text-sm text-gray-600 mb-1">Percentage Difference</div>
              <div className="text-2xl font-bold text-gray-800">{analysis.percentDiff}%</div>
            </div>
            <div className="bg-white rounded p-4 text-center">
              <div className="text-sm text-gray-600 mb-1">Target Threshold</div>
              <div className="text-2xl font-bold text-blue-600">≤ 5%</div>
            </div>
          </div>

          {analysis.status !== 'balanced' && (
            <div className="mt-4 bg-white rounded p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Suggested Adjustments:</h4>
              <ul className="text-sm space-y-1">
                {Number(analysis.percentDiff) > 5 && (
                  <>
                    <li>• Option {analysis.higherOption} is {analysis.percentDiff}% more expensive than Option {analysis.lowerOption}</li>
                    <li>• To balance: adjust parameters in Option {analysis.higherOption} to reduce cost by €{((Number(analysis.difference) || 0) / 2).toFixed(2)}</li>
                    <li>• Or: increase Option {analysis.lowerOption} cost by €{((Number(analysis.difference) || 0) / 2).toFixed(2)}</li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Real-World Data Reference */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-purple-600" size={24} />
          <h3 className="text-xl font-bold text-gray-800">Real-World Market Data</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Reference data from actual {currentScenario.name.toLowerCase()} offerings to ensure your values are realistic
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left font-semibold">Source</th>
                {Object.keys(currentScenario.realWorldData[0])
                  .filter(key => key !== 'source')
                  .map(key => (
                    <th key={key} className="px-4 py-2 text-left font-semibold">{key}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {currentScenario.realWorldData.map((item: any, idx: number) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{item.source}</td>
                  {Object.entries(item)
                    .filter(([key]) => key !== 'source')
                    .map(([key, value]) => (
                      <td key={key} className="px-4 py-2 font-mono">{String(value)}</td>
                    ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-blue-50 font-semibold">
                <td className="px-4 py-2">Median</td>
                {Object.keys(currentScenario.realWorldData[0])
                  .filter(key => key !== 'source')
                  .map(key => (
                    <td key={key} className="px-4 py-2 font-mono">
                      {getMedianFromRealWorld(currentScenario.realWorldData, key).toFixed(2)}
                    </td>
                  ))}
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mt-4 bg-blue-50 border-l-4 border-blue-400 p-4">
          <p className="text-sm text-blue-900">
            <strong>💡 Tip:</strong> Use median values as anchors for your Option A and Option B parameters. 
            Ensure both options fall within the realistic range shown above to maintain ecological validity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NumericEquivalenceCalculator;