import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  Check, 
  RefreshCw, 
  TrendingDown, 
  AlertTriangle,
  Scale,
  LineChart,
  Coins
} from 'lucide-react';
import { YieldPrediction } from '../types';

interface YieldPredictionViewProps {
  lang: 'en' | 'hi' | 'te';
}

export default function YieldPredictionView({ lang }: YieldPredictionViewProps) {
  const [area, setArea] = useState(2.5); // acres
  const [crop, setCrop] = useState('Rice');
  const [rainfall, setRainfall] = useState(350); // mm
  const [temperature, setTemperature] = useState(30); // C
  const [soilType, setSoilType] = useState('Loamy');
  const [prevYield, setPrevYield] = useState(5.2); // tons
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<YieldPrediction | null>(null);

  const dictionary = {
    en: {
      title: "AI Production & Financial Modeler",
      subtitle: "Predict total crop yield, profit margins, and risk levels using historical farm datasets and meteorological trend models.",
      area: "Cultivated Farm Area (Acres)",
      crop: "Select Crop Type",
      rainfall: "Monsoon Season Rainfall (mm)",
      temperature: "Average Growth Temp (°C)",
      prevYield: "Previous Season Production (Tons)",
      soil: "Soil Taxonomy",
      button: "Simulate Production Yield",
      predicting: "Calculating multi-tier yield weights...",
      expectedYield: "Expected Production output",
      profit: "Projected Gross Profit",
      loss: "Potential Weather Losses",
      risk: "Active Crop Risk Level",
      factors: "Active Environmental Risk Factors",
      advisories: "AI Profit-Protection Advisories"
    },
    hi: {
      title: "AI उत्पादन और वित्तीय मॉडलर",
      subtitle: "मृदा विशेषताओं, पिछले मौसम के रिकॉर्ड और मौसम चक्र के आधार पर संभावित उपज, शुद्ध लाभ और जोखिम स्तरों की भविष्यवाणी करें।",
      area: "खेती का कुल क्षेत्र (एकड़)",
      crop: "फसल का प्रकार चुनें",
      rainfall: "मानसून की वर्षा (mm)",
      temperature: "औसत तापमान (°C)",
      prevYield: "पिछले सीजन का उत्पादन (Tons)",
      soil: "मिट्टी का प्रकार",
      button: "उपज और लाभ का अनुमान लगाएं",
      predicting: "उत्पादन संभावनाओं की गणना की जा रही है...",
      expectedYield: "अनुमानित कुल उत्पादन",
      profit: "अनुमानित शुद्ध लाभ",
      loss: "मौसम के कारण संभावित नुकसान",
      risk: "सक्रिय फसल जोखिम स्तर",
      factors: "सक्रिय मौसम जोखिम कारक",
      advisories: "AI लाभ-संरक्षण परामर्श"
    },
    te: {
      title: "AI పంట దిగుబడి & లాభాల అంచనా",
      subtitle: "నేల రకం, ఎకరాల విస్తీర్ణం, ఉష్ణోగ్రత మరియు వర్షపాతం ఆధారంగా పంట దిగుబడిని మరియు రాబోయే లాభాలను అంచనా వేసుకోండి.",
      area: "సాగు విస్తీర్ణం (ఎకరాలు)",
      crop: "పంట రకం ఎంచుకోండి",
      rainfall: "సీజనల్ వర్షపాతం (mm)",
      temperature: "సగటు ఉష్ణోగ్రత (°C)",
      prevYield: "క్రితం పంట దిగుబడి (టన్నులు)",
      soil: "నేల రకం",
      button: "పంట దిగుబడిని అంచనా వేయి",
      predicting: "దిగుబడి మరియు లాభాలను విశ్లేషిస్తోంది...",
      expectedYield: "అంచనా వేసిన మొత్తం దిగుబడి",
      profit: "ఆశించిన నికర లాభం",
      loss: "సంభవించే నష్టాలు అంచనా",
      risk: "పంట రిస్క్ స్థాయి",
      factors: "ప్రకృతి సిగ్నల్స్ మరియు నష్ట కారకాలు",
      advisories: "AI లాభాల రక్షణ సలహాలు"
    }
  };

  const t = dictionary[lang] || dictionary.en;

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/yield-predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ area, crop, rainfall, temperature, soilType, prevYield })
      });
      const data = await response.json();
      setPrediction(data);
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
            <LineChart className="h-5 w-5 animate-pulse" />
            <span className="text-xs font-bold font-mono tracking-wider uppercase">Predictive Agri-Economics</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight">{t.title}</h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">{t.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Input parameters panel (Col 5) */}
        <form onSubmit={handlePredict} className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Area */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">{t.area}</label>
                <span className="text-xs font-bold text-emerald-600 font-mono bg-emerald-50 px-2 py-0.5 rounded">{area} Acres</span>
              </div>
              <input 
                type="range" min="0.5" max="25" step="0.5" value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Crop */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">{t.crop}</label>
              <select 
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 py-2 px-3 rounded-xl text-xs text-slate-800"
              >
                {['Rice', 'Wheat', 'Cotton', 'Tomato', 'Potato', 'Maize'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Rainfall */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">{t.rainfall}</label>
                <span className="text-xs font-bold text-slate-800 font-mono bg-slate-100 px-2 py-0.5 rounded">{rainfall} mm</span>
              </div>
              <input 
                type="range" min="50" max="1200" step="10" value={rainfall}
                onChange={(e) => setRainfall(Number(e.target.value))}
                className="w-full accent-slate-800 cursor-pointer"
              />
            </div>

            {/* Growth Temp */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">{t.temperature}</label>
                <span className="text-xs font-bold text-slate-800 font-mono bg-slate-100 px-2 py-0.5 rounded">{temperature}°C</span>
              </div>
              <input 
                type="range" min="15" max="45" step="1" value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full accent-slate-800 cursor-pointer"
              />
            </div>

            {/* Soil taxonomy */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">{t.soil}</label>
              <select 
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 py-2 px-3 rounded-xl text-xs text-slate-800"
              >
                {['Clayey', 'Loamy', 'Sandy', 'Alluvial', 'Black Soil'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Prev Season yield */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">{t.prevYield}</label>
                <span className="text-xs font-bold text-emerald-600 font-mono bg-emerald-50 px-2 py-0.5 rounded">{prevYield} Tons</span>
              </div>
              <input 
                type="range" min="0.5" max="50" step="0.5" value={prevYield}
                onChange={(e) => setPrevYield(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full mt-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-2xl text-xs font-bold transition-all shadow-md shadow-emerald-600/10 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>{t.predicting}</span>
              </>
            ) : (
              <>
                <TrendingUp className="h-4 w-4" />
                <span>{t.button}</span>
              </>
            )}
          </button>
        </form>

        {/* Output Panel (Col 7) */}
        <div className="lg:col-span-7">
          {!prediction && !loading && (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl h-full min-h-[450px] flex flex-col items-center justify-center text-center p-8">
              <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-slate-300 mb-4">
                <LineChart className="h-10 w-10 animate-pulse" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800 font-sans">Awaiting Modeler Configuration</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                Set active farm acres, water rainfall records, and previous seasonal metrics on the left, then trigger predictive model simulations.
              </p>
            </div>
          )}

          {prediction && !loading && (
            <div className="space-y-6">
              
              {/* Core Output card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
                <div className="absolute -right-12 -top-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex items-center space-x-2 mb-4">
                  <Sparkles className="h-4.5 w-4.5 text-amber-400 animate-pulse" />
                  <span className="text-[10px] font-mono tracking-wider uppercase text-emerald-400 font-bold">
                    Agricultural Financial Predictions
                  </span>
                </div>

                {/* Primary numbers block */}
                <div className="grid grid-cols-3 gap-4 pb-6 border-b border-white/10 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">{t.expectedYield}</span>
                    <span className="text-xl font-bold text-emerald-400 block mt-1 flex items-center justify-center">
                      <Scale className="h-4 w-4 mr-1 text-emerald-400" />
                      {prediction.expectedProduction.toFixed(1)} Tons
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">{t.profit}</span>
                    <span className="text-xl font-bold text-white block mt-1 flex items-center justify-center">
                      <Coins className="h-4 w-4 mr-1 text-amber-400" />
                      ₹{prediction.profit.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">{t.risk}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-lg inline-block mt-2 ${
                      prediction.riskLevel === 'High' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      prediction.riskLevel === 'Medium' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {prediction.riskLevel}
                    </span>
                  </div>
                </div>

                {/* Risk Factors section */}
                <div className="pt-4 space-y-3">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wide block flex items-center">
                    <AlertTriangle className="h-3.5 w-3.5 text-rose-500 mr-1.5" />
                    <span>{t.factors}</span>
                  </span>
                  
                  <div className="space-y-2">
                    {prediction.riskFactors.map((factor, i) => (
                      <div key={i} className="text-xs text-slate-300 leading-normal flex items-start space-x-2">
                        <span className="text-rose-500 mt-0.5 flex-shrink-0">•</span>
                        <span>{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Actionable protection recommendations */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center">
                  <Check className="h-4.5 w-4.5 text-emerald-500 mr-2" />
                  <span>{t.advisories}</span>
                </h3>

                <div className="space-y-3">
                  {prediction.recommendations.map((rec, i) => (
                    <div key={i} className="p-3 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-start space-x-3">
                      <span className="h-5 w-5 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
