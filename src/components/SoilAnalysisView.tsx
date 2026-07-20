import React, { useState } from 'react';
import { 
  FlaskConical, 
  Sparkles, 
  Check, 
  TrendingUp, 
  RefreshCw, 
  Waves, 
  HelpCircle,
  TrendingDown,
  Info
} from 'lucide-react';
import { SoilAnalysis } from '../types';

interface SoilAnalysisViewProps {
  lang: 'en' | 'hi' | 'te';
}

export default function SoilAnalysisView({ lang }: SoilAnalysisViewProps) {
  const [soilType, setSoilType] = useState('Loamy');
  const [ph, setPh] = useState(6.5);
  const [ec, setEc] = useState(1.2); // electrical conductivity ds/m
  const [organicMatter, setOrganicMatter] = useState('Medium (1.5% - 2.5%)');
  const [drainage, setDrainage] = useState('Good');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<SoilAnalysis | null>(null);

  const dictionary = {
    en: {
      title: "AI Soil Health & Crop Matcher",
      subtitle: "Analyze physical and chemical soil properties to generate productivity indexes, optimal crop suitability, and fertilizer requirements.",
      type: "Soil Texture/Type",
      ph: "Soil pH Level",
      ec: "Electrical Conductivity (EC)",
      organic: "Soil Organic Carbon (SOC)",
      drainage: "Drainage Capacity",
      button: "Evaluate Soil Suitability",
      evaluating: "Running chemical suitability matching...",
      resultsHeader: "Soil Diagnostic Report",
      matchingCrops: "Highly Suitable Crops",
      productivity: "Productivity Index",
      productivityDesc: "Baseline soil vigor index without secondary chemicals.",
      amendments: "Required Soil Amendments",
      details: "Agronomist Assessment",
      water: "Estimated Crop Irrigation Needs"
    },
    hi: {
      title: "AI मृदा स्वास्थ्य और फसल मिलान",
      subtitle: "मृदा भौतिक और रासायनिक गुणों का विश्लेषण कर फसल अनुकूलता, उत्पादकता सूचकांक और आवश्यक जैविक सुधार निर्धारित करें।",
      type: "मिट्टी की बनावट/प्रकार",
      ph: "मिट्टी का पीएच (pH) स्तर",
      ec: "विद्युत चालकता (EC)",
      organic: "मृदा जैविक कार्बन (SOC)",
      drainage: "जल निकासी क्षमता",
      button: "मिट्टी की उपयुक्तता जांचें",
      evaluating: "मृदा रासायनिक संरचना का मिलान किया जा रहा है...",
      resultsHeader: "मृदा निदान रिपोर्ट",
      matchingCrops: "अत्यधिक उपयुक्त फसलें",
      productivity: "उत्पादकता सूचकांक",
      productivityDesc: "बिना किसी रासायनिक उर्वरक के मिट्टी की प्राकृतिक उत्पादकता क्षमता।",
      amendments: "आवश्यक मृदा संशोधन",
      details: "मृदा वैज्ञानिक मूल्यांकन",
      water: "अनुमानित फसल जल आवश्यकता"
    },
    te: {
      title: "AI నేల విశ్లేషణ & పంట ఎంపిక",
      subtitle: "మీ పొలం నేల స్వభావాన్ని మరియు రసాయన విలువలను బట్టి ఏ పంటలు వేయాలో మరియు ఎలాంటి సవరణలు చేయాలో AI సిఫార్సులు.",
      type: "నేల రకం/నిర్మాణం",
      ph: "నేల pH స్థాయి",
      ec: "విద్యుత్ వాహకత (EC)",
      organic: "నేల సేంద్రీయ కార్బన్ (SOC)",
      drainage: "నీటి నిల్వ/నిష్క్రమణ సామర్థ్యం",
      button: "నేల అనుకూలతను పరీక్షించు",
      evaluating: "నేల రసాయన స్వభావాన్ని విశ్లేషిస్తోంది...",
      resultsHeader: "నేల పరీక్ష నివేదిక",
      matchingCrops: "అత్యంత అనుకూలమైన పంటలు",
      productivity: "ఉత్పాదకత స్కోర్",
      productivityDesc: "రసాయన ఎరువులు లేకుండా నేల సహజ సారవంతమైన సామర్థ్యం.",
      amendments: "నేల పోషకాల సవరణలు",
      details: "మృత్తిక శాస్త్రవేత్త అభిప్రాయం",
      water: "అంచనా వేసిన నీటి అవసరం"
    }
  };

  const t = dictionary[lang] || dictionary.en;

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/soil-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ soilType, ph, ec, organicMatter, drainage })
      });
      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 bg-white rounded-3xl border border-slate-100 shadow-sm gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-600 mb-1">
            <FlaskConical className="h-5 w-5 animate-pulse" />
            <span className="text-xs font-bold font-mono tracking-wider uppercase">Soil Science Lab</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight">{t.title}</h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">{t.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Form Inputs (Col 5) */}
        <form onSubmit={handleEvaluate} className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Soil Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">{t.type}</label>
              <select 
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 py-2.5 px-3 rounded-xl text-xs text-slate-800"
              >
                {['Clayey', 'Loamy', 'Sandy', 'Silty Loam', 'Alluvial', 'Saline Clay'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* pH */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">{t.ph}</label>
                <span className="text-xs font-bold text-emerald-600 font-mono bg-emerald-50 px-2 py-0.5 rounded">{ph}</span>
              </div>
              <input 
                type="range" min="4" max="9" step="0.1" value={ph}
                onChange={(e) => setPh(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Electrical Conductivity */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">{t.ec} (dS/m)</label>
                <span className="text-xs font-bold text-slate-800 font-mono bg-slate-100 px-2 py-0.5 rounded">{ec}</span>
              </div>
              <input 
                type="range" min="0.1" max="4.0" step="0.1" value={ec}
                onChange={(e) => setEc(Number(e.target.value))}
                className="w-full accent-slate-800 cursor-pointer"
              />
            </div>

            {/* Organic Carbon */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">{t.organic}</label>
              <select 
                value={organicMatter}
                onChange={(e) => setOrganicMatter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
              >
                {['Very Low (< 0.5%)', 'Low (0.5% - 1.5%)', 'Medium (1.5% - 2.5%)', 'High (> 2.5%)'].map(o => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>

            {/* Drainage */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">{t.drainage}</label>
              <div className="grid grid-cols-3 gap-2">
                {['Poor', 'Moderate', 'Good'].map((d) => (
                  <button
                    key={d} type="button" onClick={() => setDrainage(d)}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                      drainage === d 
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/10' 
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full mt-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-2xl text-xs font-bold transition-all shadow-md shadow-emerald-600/10 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>{t.evaluating}</span>
              </>
            ) : (
              <>
                <Waves className="h-4 w-4" />
                <span>{t.button}</span>
              </>
            )}
          </button>
        </form>

        {/* Results Panel (Col 7) */}
        <div className="lg:col-span-7">
          {!analysis && !loading && (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl h-full min-h-[450px] flex flex-col items-center justify-center text-center p-8">
              <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-slate-300 mb-4">
                <FlaskConical className="h-10 w-10 animate-bounce" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">Waiting for Soil Metrics</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                Tune the taxonomy values, electrical conductivity, and organic levels on the left to evaluate suitable crop rotation plans.
              </p>
            </div>
          )}

          {analysis && !loading && (
            <div className="space-y-6">
              
              {/* Vigor Index Gauge */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
                <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center space-x-2 mb-3">
                  <Sparkles className="h-4.5 w-4.5 text-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono tracking-wider uppercase text-emerald-400 font-bold">
                    {t.resultsHeader}
                  </span>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-white/10 gap-4">
                  <div>
                    <h2 className="text-2xl font-bold font-sans tracking-tight text-white leading-none">
                      {analysis.productivityScore}%
                    </h2>
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block mt-1">{t.productivity}</span>
                  </div>
                  <p className="text-xs text-slate-300 max-w-md font-sans">
                    {t.productivityDesc}
                  </p>
                </div>

                {/* Best suitable crops cards */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide block">{t.matchingCrops}</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {analysis.bestCrops.map((c, i) => (
                      <div key={i} className="p-3 bg-white/5 border border-white/5 rounded-2xl text-center">
                        <span className="text-xs font-bold text-emerald-300 block">{c}</span>
                        <span className="text-[8px] text-slate-400 font-mono uppercase mt-0.5 block">Perfect match</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Details and water schedule card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Amendments */}
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 text-emerald-600 mb-3.5">
                      <FlaskConical className="h-5 w-5" />
                      <h4 className="text-xs font-bold uppercase tracking-wider">{t.amendments}</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      {analysis.fertilizerRequired}
                    </p>
                  </div>
                </div>

                {/* Irrigation demand */}
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 text-emerald-600 mb-3.5">
                      <Waves className="h-5 w-5" />
                      <h4 className="text-xs font-bold uppercase tracking-wider">{t.water}</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      {analysis.waterRequirement}
                    </p>
                  </div>
                </div>

              </div>

              {/* Agronomist detail report block */}
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-start space-x-3">
                <Info className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide font-mono">{t.details}</h4>
                  <p className="text-xs text-slate-500 leading-normal mt-1">{analysis.details}</p>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
