import { useState } from 'react';
import { BookOpen, FileText, Calculator, Layout, Volume2, Eye, Coffee, CheckSquare } from 'lucide-react';

const Documentation = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    {
      id: 'overview',
      title: 'Introduction',
      icon: BookOpen,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">What is This Tool?</h3>
          <p className="text-gray-700">
            The <strong>TTS Prosody Experiment Builder</strong> is an integrated platform for designing, 
            validating, and preparing text-to-speech prosody manipulation experiments. It guides you 
            through 7 essential phases to ensure your experimental scenarios meet all quality criteria 
            before pilot testing.
          </p>
          
          <h4 className="font-semibold text-gray-800">What Problem Does It Solve?</h4>
          <p className="text-gray-700">When designing prosody experiments, you need to:</p>
          <ul className="text-gray-700 list-disc list-inside space-y-1 ml-4">
            <li>Balance text structure between options</li>
            <li>Validate numeric equivalence</li>
            <li>Create prosodic manipulations</li>
            <li>Design comprehension checks</li>
            <li>Ensure quality control</li>
          </ul>
          <p className="text-gray-700">This tool consolidates all these tasks into one interface with built-in validation.</p>

          <h4 className="font-semibold text-gray-800">Who Should Use This Tool?</h4>
          <ul className="text-gray-700 list-disc list-inside space-y-1 ml-4">
            <li>Researchers designing TTS prosody experiments</li>
            <li>HCI students working on voice manipulation studies</li>
            <li>Anyone preparing controlled audio stimuli for behavioral experiments</li>
          </ul>

          <h4 className="font-semibold text-gray-800 mt-6">Workflow Overview</h4>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mt-4">
            <p className="text-gray-700 mb-4">
              The tool follows a logical 7-phase workflow designed to ensure your experimental scenarios are scientifically valid and ready for deployment:
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h5 className="font-semibold text-gray-800">Numeric Equivalence</h5>
                  <p className="text-sm text-gray-600">First, verify that your Option A and B are rationally equivalent (≤5% cost difference) to ensure fair comparison</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h5 className="font-semibold text-gray-800">Sentence Structure</h5>
                  <p className="text-sm text-gray-600">Generate new scenarios using validated templates, ensuring consistent structure across options</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h5 className="font-semibold text-gray-800">Text Review & Refinement</h5>
                  <p className="text-sm text-gray-600">Review and refine generated scenarios for neutrality, balance, and cognitive load parity</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <div>
                  <h5 className="font-semibold text-gray-800">Prosody Annotation</h5>
                  <p className="text-sm text-gray-600">Define prosodic parameters for TTS manipulation (authoritative, friendly, urgent, etc.)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                <div>
                  <h5 className="font-semibold text-gray-800">Attention Checks</h5>
                  <p className="text-sm text-gray-600">Generate comprehension and manipulation check questions to ensure data quality</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-bold">6</div>
                <div>
                  <h5 className="font-semibold text-gray-800">Filler Prompts</h5>
                  <p className="text-sm text-gray-600">Create neutral filler content between experimental conditions to prevent rehearsal</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">7</div>
                <div>
                  <h5 className="font-semibold text-gray-800">Quality Checklist</h5>
                  <p className="text-sm text-gray-600">Final validation checklist before experiment deployment</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-100 rounded">
              <p className="text-sm text-blue-800">
                <strong>💡 Pro Tip:</strong> Use the "Send to Review" button in Phase 2 to automatically transfer your generated scenarios to Phase 3 for immediate review and refinement.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'phase1',
      title: 'Phase 1: Numeric Equivalence',
      icon: Calculator,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Numeric Equivalence Validation</h3>
          <p className="text-gray-700">
            Verify that your Option A and Option B are rationally equivalent (≤5% cost difference) to ensure fair comparison between choices.
          </p>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded">
              <h4 className="font-semibold text-blue-900 mb-2">What You'll See</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Pre-defined scenario templates (Banking, Insurance, Mobile, Energy, Subscription)</li>
                <li>• Calculated annual costs for Option A and Option B</li>
                <li>• Real-world market data for comparison</li>
                <li>• Editable parameters for customization</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded">
              <h4 className="font-semibold text-green-900 mb-2">✅ Key Calculations</h4>
              <div className="text-sm text-green-800 space-y-2">
                <div>
                  <strong>Banking:</strong> Annual fee - (spending × cashback rate)
                </div>
                <div>
                  <strong>Insurance:</strong> (Monthly premium × 12) + (deductible × utilization rate)
                </div>
                <div>
                  <strong>Mobile:</strong> Monthly cost × 12 + overage charges
                </div>
                <div>
                  <strong>Energy:</strong> (Rate per kWh × usage) + monthly service fee
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded">
              <h4 className="font-semibold text-yellow-900 mb-2">How to Use</h4>
              <div className="text-sm text-yellow-800 space-y-2">
                <div>
                  <strong>1. Select Scenario:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Choose from Banking, Insurance, Mobile, Energy, or Subscription</li>
                    <li>• Review the calculation formula and parameters</li>
                  </ul>
                </div>
                <div>
                  <strong>2. Edit Parameters (Optional):</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Click "Edit Parameters" to customize values</li>
                    <li>• Adjust fees, rates, usage, or other variables</li>
                    <li>• Click "Save Changes" to update calculations</li>
                  </ul>
                </div>
                <div>
                  <strong>3. Verify Equivalence:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Ensure cost difference is ≤5% between options</li>
                    <li>• Review real-world market data for context</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded">
              <h4 className="font-semibold text-red-900 mb-2">⚠️ Common Issues</h4>
              <div className="text-sm text-red-800 space-y-2">
                <div>
                  <strong>Large cost differences:</strong> One option significantly cheaper than the other
                </div>
                <div>
                  <strong>Unrealistic parameters:</strong> Values that don't reflect real market conditions
                </div>
                <div>
                  <strong>Missing variables:</strong> Not accounting for all relevant costs (fees, taxes, etc.)
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded">
              <h4 className="font-semibold text-purple-900 mb-2">Real-World Validation</h4>
              <div className="text-sm text-purple-800 space-y-2">
                <div>
                  <strong>Market Data:</strong> Compare your calculated costs with real-world examples
                </div>
                <div>
                  <strong>Reasonableness Check:</strong> Ensure your scenarios reflect realistic market conditions
                </div>
                <div>
                  <strong>Consumer Behavior:</strong> Consider how real consumers would evaluate these options
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded">
              <h4 className="font-semibold text-emerald-900 mb-2">✅ When to Mark Complete</h4>
              <ul className="text-sm text-emerald-800 space-y-1">
                <li>• Cost difference between options is ≤5%</li>
                <li>• Parameters reflect realistic market conditions</li>
                <li>• Real-world data supports your calculations</li>
                <li>• Both options are rationally equivalent</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'phase2',
      title: 'Phase 2: Sentence Structure',
      icon: Layout,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Sentence Structure Standardization</h3>
          <p className="text-gray-700">
            Generate new scenarios using validated templates to ensure consistent structure across all options and domains.
          </p>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded">
              <h4 className="font-semibold text-blue-900 mb-2">What You'll See</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Template selector for 5 domains (Banking, Insurance, Mobile, Energy, Subscription)</li>
                <li>• Separate input fields for Option A and Option B</li>
                <li>• Live preview of generated text for both options</li>
                <li>• Statistics counters (sentences, words, characters, numbers)</li>
                <li>• Generated scenarios collection with export options</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded">
              <h4 className="font-semibold text-green-900 mb-2">✅ Key Features</h4>
              <div className="text-sm text-green-800 space-y-2">
                <div>
                  <strong>Separate Option Generation:</strong> Each option gets its own input fields and generates different content
                </div>
                <div>
                  <strong>Template Validation:</strong> Pre-validated structures ensure consistency across domains
                </div>
                <div>
                  <strong>Real-time Preview:</strong> See generated text and statistics as you type
                </div>
                <div>
                  <strong>Send to Review:</strong> Directly transfer generated scenarios to Phase 3 for refinement
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded">
              <h4 className="font-semibold text-yellow-900 mb-2">How to Use</h4>
              <div className="text-sm text-yellow-800 space-y-2">
                <div>
                  <strong>1. Select Domain Template:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Choose from Banking, Insurance, Mobile, Energy, or Subscription</li>
                    <li>• Review the template structure and guidelines</li>
                  </ul>
                </div>
                <div>
                  <strong>2. Fill Input Fields:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Complete separate fields for Option A and Option B</li>
                    <li>• Use different product names and values for each option</li>
                    <li>• Review live preview to ensure content is different</li>
                  </ul>
                </div>
                <div>
                  <strong>3. Generate & Review:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Click "Generate & Add to Collection"</li>
                    <li>• Use "Send to Review" to transfer to Phase 3</li>
                    <li>• Export scenarios for external review</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded">
              <h4 className="font-semibold text-red-900 mb-2">⚠️ Common Mistakes</h4>
              <div className="text-sm text-red-800 space-y-2">
                <div>
                  <strong>Identical content:</strong> Using the same values for Option A and Option B
                </div>
                <div>
                  <strong>Missing differences:</strong> Not creating meaningful but comparable differences
                </div>
                <div>
                  <strong>Inconsistent structure:</strong> Not following the template guidelines
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded">
              <h4 className="font-semibold text-purple-900 mb-2">Best Practices</h4>
              <div className="text-sm text-purple-800 space-y-2">
                <div>
                  <strong>Create Meaningful Differences:</strong> Ensure options are genuinely different but comparable
                </div>
                <div>
                  <strong>Use Different Product Names:</strong> Give each option a distinct identity
                </div>
                <div>
                  <strong>Follow Template Guidelines:</strong> Use the provided attribute order and format
                </div>
                <div>
                  <strong>Validate Statistics:</strong> Check that word counts and structure are balanced
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded">
              <h4 className="font-semibold text-emerald-900 mb-2">✅ When to Mark Complete</h4>
              <ul className="text-sm text-emerald-800 space-y-1">
                <li>• Generated scenarios have different content for Option A and Option B</li>
                <li>• Both options follow the same structural template</li>
                <li>• Statistics show balanced word counts and structure</li>
                <li>• Scenarios are ready for review in Phase 3</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'phase3',
      title: 'Phase 3: Text Review & Refinement',
      icon: FileText,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Text Review & Neutrality</h3>
          <p className="text-gray-700">
            Review and refine generated scenarios for neutrality, balance, and cognitive load parity to ensure fair comparison.
          </p>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded">
              <h4 className="font-semibold text-blue-900 mb-2">What You'll See</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Scenario name and ID</li>
                <li>• Two side-by-side boxes (blue for Option A, green for Option B)</li>
                <li>• Text content with statistics</li>
                <li>• Balance check summary</li>
                <li>• Edit and approval buttons</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded">
              <h4 className="font-semibold text-green-900 mb-2">✅ Key Metrics Displayed</h4>
              <div className="text-sm text-green-800 space-y-2">
                <div>
                  <strong>Per Option:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Sentence count</li>
                    <li>• Word count</li>
                    <li>• Number count (numeric values like €49, 1%, etc.)</li>
                  </ul>
                </div>
                <div>
                  <strong>Comparison:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Word count difference (%)</li>
                    <li>• Character count difference (%)</li>
                    <li>• Balance status (✓ Balanced or ⚠ Needs adjustment)</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded">
              <h4 className="font-semibold text-yellow-900 mb-2">How to Use</h4>
              <div className="text-sm text-yellow-800 space-y-2">
                <div>
                  <strong>1. Review Each Scenario:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• ✅ Green box = Options are balanced (≤10% difference)</li>
                    <li>• ⚠️ Orange box = Options need adjustment (&gt;10% difference)</li>
                  </ul>
                </div>
                <div>
                  <strong>2. Edit Text (If Needed):</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Click "Edit" button below text box</li>
                    <li>• Make changes in textarea</li>
                    <li>• Click "Save" when done</li>
                  </ul>
                </div>
                <div>
                  <strong>3. Approve or Request Revision:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Click "Approve" for balanced scenarios</li>
                    <li>• Click "Needs Revision" for scenarios requiring changes</li>
                    <li>• Use "Reset to Draft" to start over</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded">
              <h4 className="font-semibold text-red-900 mb-2">❌ Prohibited Words</h4>
              <div className="text-sm text-red-800 space-y-2">
                <div>
                  <strong>Superlatives:</strong> best, better, superior, excellent, perfect
                </div>
                <div>
                  <strong>Marketing terms:</strong> premium, exclusive, limited, special
                </div>
                <div>
                  <strong>Subjective claims:</strong> ideal, recommended, popular, most, guaranteed
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded">
              <h4 className="font-semibold text-purple-900 mb-2">Balance Attributes</h4>
              <div className="text-sm text-purple-800 space-y-2">
                <div>
                  <strong>✅ Correct:</strong> Both options present information in same order
                  <br />Option A: "Fee → Cashback → Feature"
                  <br />Option B: "Fee → Cashback → Feature"
                </div>
                <div>
                  <strong>❌ Wrong:</strong> Different order between options
                  <br />Option A: "Fee → Cashback → Feature"
                  <br />Option B: "Feature → Fee → Cashback"
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded">
              <h4 className="font-semibold text-emerald-900 mb-2">✅ When to Mark Complete</h4>
              <ul className="text-sm text-emerald-800 space-y-1">
                <li>• All scenarios show green "Balanced" indicator</li>
                <li>• No persuasive language detected</li>
                <li>• All options have same sentence count</li>
                <li>• Word/character differences are ≤10%</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'phase4',
      title: 'Phase 4: Prosody Annotation',
      icon: Volume2,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Prosody Annotation & SSML</h3>
          <p className="text-gray-700">
            Create prosodic manipulations for "authoritative" variants (A*, B*) by applying validated parameter changes and generating SSML code.
          </p>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded">
              <h4 className="font-semibold text-blue-900 mb-2">What You'll See</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 4 prosody preset cards (Neutral, Authoritative, Friendly, Urgent)</li>
                <li>• Scenario name</li>
                <li>• Preset selector dropdown</li>
                <li>• Generated SSML code box (black background)</li>
                <li>• Copy button</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded">
              <h4 className="font-semibold text-green-900 mb-2">Understanding Prosody Presets</h4>
              <div className="text-sm text-green-800 space-y-3">
                <div>
                  <strong>📊 Neutral (Baseline):</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Pitch: 0 cents (no change)</li>
                    <li>• Rate: 0% (no change)</li>
                    <li>• Volume: 0 dB (no change)</li>
                    <li>• Use for: Standard (non-manipulated) versions</li>
                  </ul>
                </div>
                <div>
                  <strong>👔 Authoritative (Primary Manipulation):</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Pitch: -200 cents (lower = more dominant)</li>
                    <li>• Rate: -15% (slower = more emphasis)</li>
                    <li>• Volume: +4 dB (louder = more confident)</li>
                    <li>• Use for: A* and B* manipulated versions</li>
                  </ul>
                </div>
                <div>
                  <strong>😊 Friendly:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Pitch: +150 cents (higher = friendlier)</li>
                    <li>• Rate: 0% (normal)</li>
                    <li>• Volume: 0 dB (normal)</li>
                    <li>• Use for: Alternative manipulation (if testing friendliness)</li>
                  </ul>
                </div>
                <div>
                  <strong>⚡ Urgent:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Pitch: +100 cents</li>
                    <li>• Rate: +25% (faster = urgency)</li>
                    <li>• Volume: +3 dB</li>
                    <li>• Use for: Alternative manipulation (if testing pressure)</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded">
              <h4 className="font-semibold text-yellow-900 mb-2">How to Use</h4>
              <div className="text-sm text-yellow-800 space-y-2">
                <div>
                  <strong>Step 1: Select Preset for Each Scenario</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Scroll to first scenario</li>
                    <li>• Click "Select Preset" dropdown</li>
                    <li>• Choose "authoritative" for A* manipulation</li>
                    <li>• Repeat for all scenarios</li>
                  </ul>
                </div>
                <div>
                  <strong>Step 2: Review Generated SSML</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Black code box shows SSML with parameters</li>
                    <li>• pitch="-200cents" = Lower pitch by 200 cents</li>
                    <li>• rate="-15%" = Speak 15% slower than baseline</li>
                    <li>• volume="+4dB" = Increase loudness by 4 decibels</li>
                  </ul>
                </div>
                <div>
                  <strong>Step 3: Copy SSML Code</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Click "Copy" button in top-right of code box</li>
                    <li>• Alert confirms: "Copied to clipboard!"</li>
                    <li>• Paste into your TTS system (Azure, Google, Amazon Polly)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded">
              <h4 className="font-semibold text-purple-900 mb-2">SSML Compatibility</h4>
              <div className="text-sm text-purple-800 space-y-2">
                <div>
                  <strong>✅ This SSML works with:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Azure Neural Voices (full support)</li>
                    <li>• Google Cloud TTS (supports most features)</li>
                    <li>• Amazon Polly (supports prosody tags)</li>
                    <li>• ⚠️ Some open-source TTS (may need adaptation)</li>
                  </ul>
                </div>
                <div>
                  <strong>For open-source models:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Use parameters directly instead of SSML</li>
                    <li>• Refer to your model's documentation</li>
                    <li>• Apply: F0 shift, rate scaling, volume boost</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded">
              <h4 className="font-semibold text-red-900 mb-2">Parameter Validation</h4>
              <div className="text-sm text-red-800 space-y-2">
                <div>
                  <strong>After generating audio, you MUST validate using Praat:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Mean F0: Baseline - 200 cents (±50 cents tolerance)</li>
                    <li>• Speech Rate: Baseline - 15% (±5% tolerance)</li>
                    <li>• RMS Intensity: Baseline + 4 dB (±1 dB tolerance)</li>
                  </ul>
                </div>
                <div>
                  <strong>Acceptance criteria:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• ✅ Within tolerance = Accept</li>
                    <li>• ❌ Outside tolerance = Regenerate with adjusted parameters</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded">
              <h4 className="font-semibold text-emerald-900 mb-2">✅ When to Mark Complete</h4>
              <ul className="text-sm text-emerald-800 space-y-1">
                <li>• Preset selected for all manipulated versions</li>
                <li>• SSML copied for all scenarios</li>
                <li>• You understand how to apply in your TTS system</li>
                <li>• Validation plan is ready (Praat measurements)</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'phase5',
      title: 'Phase 5: Attention Checks',
      icon: Eye,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Attention & Comprehension Checks</h3>
          <p className="text-gray-700">
            Review pre-built checks that validate data quality and manipulation effectiveness.
          </p>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded">
              <h4 className="font-semibold text-blue-900 mb-2">What You'll See</h4>
              <div className="text-sm text-blue-800 space-y-2">
                <div>
                  <strong>Section 1: Comprehension Checks</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• 2 questions per scenario in blue boxes</li>
                    <li>• Correct answer highlighted in green</li>
                    <li>• Distractor options in gray</li>
                  </ul>
                </div>
                <div>
                  <strong>Section 2: Manipulation Checks</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• 3 Likert scale questions in purple boxes</li>
                    <li>• 7-point scale visualizations</li>
                    <li>• Apply to BOTH neutral and authoritative versions</li>
                  </ul>
                </div>
                <div>
                  <strong>Bottom Section: Attention Checks</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Instruction-following checks in orange boxes</li>
                    <li>• To be interspersed throughout experiment</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded">
              <h4 className="font-semibold text-green-900 mb-2">Types of Checks</h4>
              <div className="text-sm text-green-800 space-y-3">
                <div>
                  <strong>🔢 Comprehension Checks</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Purpose: Verify participants processed the content</li>
                    <li>• Format: Multiple choice with 1 correct + 3 distractors</li>
                    <li>• When to use: Immediately after EACH scenario pair</li>
                    <li>• Critical: Yes - participants who fail ≥2 are excluded</li>
                  </ul>
                </div>
                <div>
                  <strong>✓ Manipulation Checks</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Purpose: Validate that prosodic manipulation was perceived</li>
                    <li>• Format: 7-point Likert scale</li>
                    <li>• Three questions: Authority, Confidence, Trustworthiness</li>
                    <li>• When to use: After EVERY scenario (both A and B, both neutral and A*)</li>
                  </ul>
                </div>
                <div>
                  <strong>👆 Attention Checks</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Purpose: Catch inattentive participants</li>
                    <li>• Format: Explicit instruction to follow</li>
                    <li>• When to use: Every 2-3 scenarios (randomized placement)</li>
                    <li>• Critical: Yes - participants who fail ≥1 are excluded</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded">
              <h4 className="font-semibold text-yellow-900 mb-2">How to Use</h4>
              <div className="text-sm text-yellow-800 space-y-2">
                <div>
                  <strong>Step 1: Review Comprehension Checks</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Questions are clear and unambiguous</li>
                    <li>• Correct answer is in the text</li>
                    <li>• Distractors are plausible but clearly wrong</li>
                    <li>• Same number of checks per domain</li>
                  </ul>
                </div>
                <div>
                  <strong>Step 2: Understand Manipulation Checks</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• These are AUTOMATIC for all scenarios</li>
                    <li>• Show these 3 questions after EVERY audio stimulus</li>
                    <li>• Record responses on 1-7 scale</li>
                    <li>• Compare neutral vs authoritative in analysis</li>
                  </ul>
                </div>
                <div>
                  <strong>Step 3: Plan Attention Check Placement</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Total experiment: 10 scenario pairs = 20 stimuli</li>
                    <li>• Recommended: 4-5 attention checks total</li>
                    <li>• Placement: After scenarios 2, 4, 7, 9</li>
                    <li>• Randomize which specific check is used</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded">
              <h4 className="font-semibold text-red-900 mb-2">Exclusion Criteria</h4>
              <div className="text-sm text-red-800 space-y-2">
                <div>
                  <strong>Automatic exclusion if:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Failed ≥2 comprehension checks (across all scenarios)</li>
                    <li>• Failed ≥1 attention check</li>
                    <li>• Average response time &lt;2 seconds</li>
                    <li>• Straight-lining (same response to all Likert items)</li>
                  </ul>
                </div>
                <div>
                  <strong>Flag but keep if:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Failed 1 comprehension check only (monitor pattern)</li>
                    <li>• Manipulation check failed (means prosody didn't work)</li>
                    <li>• Extreme response times (&gt;5 min per scenario)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded">
              <h4 className="font-semibold text-purple-900 mb-2">Best Practices</h4>
              <div className="text-sm text-purple-800 space-y-2">
                <div>
                  <strong>DO:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Pre-register exclusion criteria before data collection</li>
                    <li>• Log all response times</li>
                    <li>• Randomize multiple-choice option order</li>
                    <li>• Use the same 3 manipulation check questions always</li>
                  </ul>
                </div>
                <div>
                  <strong>DON'T:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Add "I don't know" or "I don't remember" options</li>
                    <li>• Make attention checks too easy</li>
                    <li>• Change comprehension questions mid-experiment</li>
                    <li>• Skip manipulation checks (critical validation)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded">
              <h4 className="font-semibold text-emerald-900 mb-2">✅ When to Mark Complete</h4>
              <ul className="text-sm text-emerald-800 space-y-1">
                <li>• You've reviewed all comprehension checks</li>
                <li>• You understand manipulation check requirements</li>
                <li>• You have a placement plan for attention checks</li>
                <li>• Exclusion criteria are documented</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'phase6',
      title: 'Phase 6: Filler Prompts',
      icon: Coffee,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Filler Prompts & Timing</h3>
          <p className="text-gray-700">
            Design inter-stimulus breaks that reset attention, prevent rehearsal of previous options, and manage fatigue.
          </p>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded">
              <h4 className="font-semibold text-blue-900 mb-2">What You'll See</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Filler prompt library (3 examples with duration and type)</li>
                <li>• Example sequence timeline for one scenario pair</li>
                <li>• Color-coded by element type</li>
                <li>• Duration for each element</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded">
              <h4 className="font-semibold text-green-900 mb-2">Filler Categories</h4>
              <div className="text-sm text-green-800 space-y-3">
                <div>
                  <strong>🎯 Attention Reset (10-15 seconds)</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Purpose: Refocus participant before next stimulus</li>
                    <li>• Example: "Click Ready when you're prepared to hear the next option."</li>
                    <li>• Characteristics: Requires active engagement, self-paced, short and simple</li>
                    <li>• Use: Between Option A and Option B</li>
                  </ul>
                </div>
                <div>
                  <strong>🧠 Cognitive Filler (15-20 seconds)</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Purpose: Prevent mental rehearsal of Option A while hearing Option B</li>
                    <li>• Example: "Count backwards from 30 to 20 silently in your head, then click Continue."</li>
                    <li>• Characteristics: Occupies working memory, forces attention away from previous option</li>
                    <li>• Use: Between Option A and Option B (alternative to attention reset)</li>
                  </ul>
                </div>
                <div>
                  <strong>⏳ Buffer (3-5 seconds)</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Purpose: Brief pause between different scenarios</li>
                    <li>• Example: "Loading..." or "..."</li>
                    <li>• Characteristics: Passive (no interaction), very short, simulates system delay</li>
                    <li>• Use: Between scenario pairs</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded">
              <h4 className="font-semibold text-yellow-900 mb-2">Example Sequence Breakdown</h4>
              <div className="text-sm text-yellow-800 space-y-2">
                <div>
                  <strong>Complete sequence for ONE scenario:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• [30s] Option A (Neutral or Authoritative)</li>
                    <li>• [15s] Manipulation Check (Authority, Confidence, Trust)</li>
                    <li>• [12s] FILLER: "Take a breath before continuing"</li>
                    <li>• [30s] Option B (Neutral or Authoritative)</li>
                    <li>• [15s] Manipulation Check (Authority, Confidence, Trust)</li>
                    <li>• [45s] Choice + Comprehension Checks (×3)</li>
                    <li>• Total: ~147 seconds (~2.5 minutes per scenario)</li>
                  </ul>
                </div>
                <div>
                  <strong>For 10 scenarios:</strong> ~25 minutes total experiment time
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded">
              <h4 className="font-semibold text-purple-900 mb-2">How to Use</h4>
              <div className="text-sm text-purple-800 space-y-2">
                <div>
                  <strong>Step 1: Understand Timing Requirements</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Critical timing: 10-15 seconds between Option A and Option B</li>
                    <li>• Too short (&lt;5s): Doesn't reset attention</li>
                    <li>• Too long (&gt;20s): Increases fatigue</li>
                    <li>• Total experiment: Target 15-25 minutes total</li>
                  </ul>
                </div>
                <div>
                  <strong>Step 2: Choose Filler Strategy</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• First 3 scenarios: Use Attention Reset (simpler, less demanding)</li>
                    <li>• Middle scenarios (4-7): Alternate Cognitive Filler and Attention Reset</li>
                    <li>• Last 3 scenarios (8-10): Use Attention Reset more frequently</li>
                  </ul>
                </div>
                <div>
                  <strong>Step 3: Create Variety</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Don't use the same filler every time!</li>
                    <li>• Attention Reset variations: "Click Ready when prepared...", "Press Continue..."</li>
                    <li>• Cognitive Filler variations: "Count backwards from 30 to 20...", "Think of three cities..."</li>
                    <li>• Why variety matters: Prevents anticipation, maintains attention</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded">
              <h4 className="font-semibold text-red-900 mb-2">Experimental Considerations</h4>
              <div className="text-sm text-red-800 space-y-2">
                <div>
                  <strong>🔄 Prevent Rehearsal</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Problem: Participant mentally repeats details while hearing Option B</li>
                    <li>• Solution: Cognitive filler task occupies working memory</li>
                    <li>• Evidence: Cognitive load interrupts verbal rehearsal</li>
                  </ul>
                </div>
                <div>
                  <strong>📉 Attention Decay</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Problem: Response quality drops over time (fatigue)</li>
                    <li>• Solution: Track trial position in analysis</li>
                    <li>• Mitigation: Keep total time under 25 minutes, use simpler fillers toward end</li>
                  </ul>
                </div>
                <div>
                  <strong>🔁 Habituation</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Problem: Participants become desensitized to prosodic manipulation</li>
                    <li>• Solution: Randomize pair order and track position effects</li>
                    <li>• Test: Does authoritative effect decrease from Trial 1 to Trial 10?</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded">
              <h4 className="font-semibold text-emerald-900 mb-2">✅ When to Mark Complete</h4>
              <ul className="text-sm text-emerald-800 space-y-1">
                <li>• You understand the 3 filler types and when to use each</li>
                <li>• You have variety in filler prompts (not repeating same text)</li>
                <li>• You've planned filler placement for all 10 scenarios</li>
                <li>• You understand timing requirements (10-15s between options)</li>
                <li>• You have a strategy to track position effects</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'phase7',
      title: 'Phase 7: Quality Checklist',
      icon: CheckSquare,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Quality Assurance Checklist</h3>
          <p className="text-gray-700">
            Perform final validation of all scenarios against critical criteria before launching pilot test.
          </p>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded">
              <h4 className="font-semibold text-blue-900 mb-2">What You'll See</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 7 quality category cards showing check counts</li>
                <li>• Scenario name</li>
                <li>• Expandable sections for each category</li>
                <li>• Each check has Pass and Fail buttons</li>
                <li>• Critical checks marked with red "Critical" badge</li>
                <li>• Pre-launch checklist with 4 final requirements</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded">
              <h4 className="font-semibold text-green-900 mb-2">Quality Categories Explained</h4>
              <div className="text-sm text-green-800 space-y-3">
                <div>
                  <strong>📝 Text Balance (4 Checks)</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Check 1: Same sentence count (3-4) - Critical</li>
                    <li>• Check 2: Word count difference ≤10% - Critical</li>
                    <li>• Check 3: No persuasive language - Critical</li>
                    <li>• Check 4: Same attribute order - Critical</li>
                  </ul>
                </div>
                <div>
                  <strong>🔢 Numeric Equivalence (3 Checks)</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Check 1: Cost difference ≤5% - Critical</li>
                    <li>• Check 2: Values within realistic range - Critical</li>
                    <li>• Check 3: No obvious better deal - Critical</li>
                  </ul>
                </div>
                <div>
                  <strong>🎵 Prosody Annotation (3 Checks)</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Check 1: Identical text for neutral/authoritative - Critical</li>
                    <li>• Check 2: Prosodic targets documented - Critical</li>
                    <li>• Check 3: SSML generated - Critical</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded">
              <h4 className="font-semibold text-yellow-900 mb-2">How to Use the Checklist</h4>
              <div className="text-sm text-yellow-800 space-y-2">
                <div>
                  <strong>Step 1: Work Through One Scenario at a Time</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Look at first category: Text Balance</li>
                    <li>• Read Check 1: "Same sentence count"</li>
                    <li>• Verify manually (go to Phase 1 if needed)</li>
                    <li>• Click Pass or Fail button</li>
                    <li>• Color changes (green for pass, red for fail)</li>
                  </ul>
                </div>
                <div>
                  <strong>Step 2: Understand Pass/Fail Logic</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Click Pass (left button) → Box turns green</li>
                    <li>• Click Fail (right button) → Box turns red</li>
                    <li>• Can change decision by clicking other button</li>
                    <li>• Pass means: Check criterion is met, no action needed</li>
                    <li>• Fail means: Check criterion NOT met, action required</li>
                  </ul>
                </div>
                <div>
                  <strong>Step 3: Address Failed Checks</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• For Text Balance fails: Go to Phase 1, edit text, re-verify</li>
                    <li>• For Numeric Equivalence fails: Go to Phase 2, adjust values</li>
                    <li>• For Prosody Annotation fails: Go to Phase 4, generate/fix SSML</li>
                    <li>• After fixing: Return to Phase 7, click Pass button</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded">
              <h4 className="font-semibold text-purple-900 mb-2">Pre-Launch Checklist</h4>
              <div className="text-sm text-purple-800 space-y-2">
                <div>
                  <strong>Before running pilot (N≥10), verify:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• ✅ All critical checks passed</li>
                    <li>• ✅ Pilot N≥10 completed</li>
                    <li>• ✅ Acoustic validation done</li>
                    <li>• ✅ Ethics approval obtained</li>
                  </ul>
                </div>
                <div>
                  <strong>Success criteria for pilot:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                      <li>• Manipulation check: M_authoritative &gt; M_neutral by ≥1 SD (p &lt; .05)</li>
                    <li>• Comprehension pass rate: 80-95%</li>
                    <li>• Attention check pass rate: ≥95%</li>
                    <li>• No technical issues reported</li>
                    <li>• Completion time: 15-25 minutes</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded">
              <h4 className="font-semibold text-red-900 mb-2">Parameter Validation</h4>
              <div className="text-sm text-red-800 space-y-2">
                <div>
                  <strong>After generating audio, you MUST validate using Praat:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Mean F0: Baseline - 200 cents (±50 cents tolerance)</li>
                    <li>• Speech Rate: Baseline - 15% (±5% tolerance)</li>
                    <li>• RMS Intensity: Baseline + 4 dB (±1 dB tolerance)</li>
                  </ul>
                </div>
                <div>
                  <strong>If out of range:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Adjust SSML parameters</li>
                    <li>• Regenerate audio</li>
                    <li>• Re-measure</li>
                    <li>• Iterate until in range</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded">
              <h4 className="font-semibold text-emerald-900 mb-2">✅ When to Mark Complete</h4>
              <ul className="text-sm text-emerald-800 space-y-1">
                <li>• All scenarios reviewed in checklist</li>
                <li>• Critical checks identified and passed (or plan to fix)</li>
                <li>• You understand pre-launch requirements</li>
                <li>• You have timeline for remaining tasks</li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Documentation</h1>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4 sticky top-6">
            <h3 className="font-semibold text-gray-800 mb-3">Contents</h3>
            <nav className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded text-sm transition-colors flex items-center gap-2 ${
                      activeSection === section.id
                        ? 'bg-blue-100 text-blue-800'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={16} />
                    {section.title}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            {sections.find(s => s.id === activeSection)?.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;