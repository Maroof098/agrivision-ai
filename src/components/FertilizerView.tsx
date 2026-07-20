import React, { useState } from 'react';
import { 
  Sprout, 
  Settings, 
  HelpCircle, 
  FlaskConical, 
  Sparkles, 
  Check, 
  Droplet, 
  TrendingUp, 
  RefreshCw,
  Sliders,
  Scale
} from 'lucide-react';
import { FertilizerRecommendation } from '../types';

interface FertilizerViewProps {
  lang: 'en' | 'hi' | 'te';
}

export default function FertilizerView({ lang }: FertilizerViewProps) {
  const [crop, setCrop] = useState('Rice');
  const [soilType, setSoilType] = useState('Clayey');
  const [ph, setPh] = useState(6.5);
  const [n, setN] = useState(40);
  const [p, setP] = useState(25);
  const [k, setK] = useState(30);
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<FertilizerRecommendation | null>(null);

  const dictionary = {
    en: {
      title: "AI Fertilizer Advisory Engine",
      subtitle: "Optimize macronutrient balances and bio-organic inputs based on chemical crop physiology and current weather vectors.",
      cropLabel: "Select Crop Type",
      soilTypeLabel: "Soil Taxonomy",
      phLabel: "Soil pH Level",
      nLabel: "Nitrogen (N)",
      pLabel: "Phosphorus (P)",
      kLabel: "Potassium (K)",
      nutrientTitle: "Macronutrient Levels (kg/hectare)",
      generateBtn: "Calculate Fertilizer Program",
      loadingText: "Synthesizing chemistry variables...",
      resultsHeader: "Recommended Fertilizer Protocol",
      bestCompound: "Best Fertilizer Formulation",
      quantity: "Recommended Dosage",
      schedule: "Application split timeline",
      organic: "Bio-Organic & Compost Alternatives",
      yieldImprovement: "Expected Production Boost",
      nutrientTuner: "Soil Chemical Amendment Tuner"
    },
    hi: {
      title: "AI उर्वरक सलाहकार इंजन",
      subtitle: "मृदा रसायन शास्त्र, फसल शारीरिक आवश्यकताओं और मौसम के आधार पर उर्वरक और जैविक खाद की सही मात्रा निर्धारित करें।",
      cropLabel: "फसल का प्रकार चुनें",
      soilTypeLabel: "मिट्टी का प्रकार",
      phLabel: "मिट्टी का पीएच (pH) स्तर",
      nLabel: "नाइट्रोजन (N)",
      pLabel: "फास्फोरस (P)",
      kLabel: "पोटेशियम (K)",
      nutrientTitle: "मैक्रोन्यूट्रिएंट स्तर (किग्रा/हेक्टेयर)",
      generateBtn: "उर्वरक कार्यक्रम की गणना करें",
      loadingText: "रसायन चर का विश्लेषण किया जा रहा है...",
      resultsHeader: "अनुशंसित उर्वरक प्रोटोकॉल",
      bestCompound: "सर्वोत्तम उर्वरक सूत्रीकरण",
      quantity: "अनुशंसित खुराक",
      schedule: "छिड़काव अनुसूची और समय",
      organic: "जैविक और कम्पोस्ट विकल्प",
      yieldImprovement: "अनुमानित उपज वृद्धि",
      nutrientTuner: "मृदा रासायनिक संशोधन ट्यूनर"
    },
    te: {
      title: "AI ఎరువుల సిఫార్సుల కేంద్రం",
      subtitle: "మీ నేల రకం, pH స్థాయి మరియు ఎరువుల మోతాదును లెక్కించడానికి మరియు దిగుబడిని పెంచడానికి AI సిఫార్సులు.",
      cropLabel: "పంట రకం ఎంచుకోండి",
      soilTypeLabel: "నేల రకం",
      phLabel: "నేల pH స్థాయి",
      nLabel: "నైట్రోజన్ (N)",
      pLabel: "ఫాస్ఫరస్ (P)",
      kLabel: "పొటాషియం (K)",
      nutrientTitle: "పోషకాల శాతాలు (కిలో/హెక్టార్)",
      generateBtn: "ఎరువుల మోతాదును లెక్కించు",
      loadingText: "నేల రసాయనాలను విశ్లేషిస్తోంది...",
      resultsHeader: "సిఫార్సు చేయబడిన ఎరువుల ప్రణాళిక",
      bestCompound: "ఉత్తమ ఎరువుల రకం",
      quantity: "సిఫార్సు చేయబడిన పరిమాణం",
      schedule: "ఎరువుల అప్లికేషన్ షెడ్యూల్",
      organic: "సేంద్రీయ మరియు కంపోస్ట్ ప్రత్యామ్నాయాలు",
      yieldImprovement: "అంచనా వేసిన పంట దిగుబడి పెంపు",
      nutrientTuner: "నేల పోషకాల ట్యూనర్"
    }
  };

  const t = dictionary[lang] || dictionary.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/fertilizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crop, soilType, ph, n, p, k })
      });
      const data = await response.json();
      setRecommendation(data);
    } catch (err) {
      console.error("Fertilizer Analysis Error:", err);
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
            <Sprout className="h-5 w-5 animate-pulse" />
            <span className="text-xs font-bold font-mono tracking-wider uppercase">Farming Agronomy Core</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight">{t.title}</h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">{t.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Input Panel (Col span 5) */}
        <form onSubmit={handleSubmit} className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-5">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center">
              <Sliders className="h-4 w-4 mr-1.5 text-emerald-500" />
              <span>{t.nutrientTuner}</span>
            </h3>

            {/* Crop Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                {t.cropLabel}
              </label>
              <select 
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 py-2 px-3 rounded-xl text-xs text-slate-800"
              >
                {['Rice', 'Wheat', 'Cotton', 'Tomato', 'Potato', 'Maize', 'Sugarcane'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Soil Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                {t.soilTypeLabel}
              </label>
              <select 
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 py-2 px-3 rounded-xl text-xs text-slate-800"
              >
                {['Clayey', 'Loamy', 'Sandy', 'Alluvial', 'Red Soil', 'Black Soil'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* pH level */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  {t.phLabel}
                </label>
                <span className="text-xs font-bold text-emerald-600 font-mono bg-emerald-50 px-2 py-0.5 rounded">
                  {ph}
                </span>
              </div>
              <input 
                type="range" 
                min="4" 
                max="9" 
                step="0.1" 
                value={ph}
                onChange={(e) => setPh(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-mono text-slate-400 mt-1">
                <span>4.0 (Acidic)</span>
                <span>7.0 (Neutral)</span>
                <span>9.0 (Alkaline)</span>
              </div>
            </div>

            {/* Macronutrients sliding tuner */}
            <div className="pt-2 border-t border-slate-50 space-y-4">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide block">
                {t.nutrientTitle}
              </span>

              {/* N tuner */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-600">{t.nLabel}</span>
                  <span className="font-mono font-bold text-slate-800">{n} kg/ha</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="120" 
                  value={n}
                  onChange={(e) => setN(Number(e.target.value))}
                  className="w-full accent-slate-800 cursor-pointer"
                />
              </div>

              {/* P tuner */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-600">{t.pLabel}</span>
                  <span className="font-mono font-bold text-slate-800">{p} kg/ha</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="80" 
                  value={p}
                  onChange={(e) => setP(Number(e.target.value))}
                  className="w-full accent-slate-800 cursor-pointer"
                />
              </div>

              {/* K tuner */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-600">{t.kLabel}</span>
                  <span className="font-mono font-bold text-slate-800">{k} kg/ha</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="80" 
                  value={k}
                  onChange={(e) => setK(Number(e.target.value))}
                  className="w-full accent-slate-800 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-2xl text-xs font-bold transition-all shadow-md shadow-emerald-600/10 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>{t.loadingText}</span>
              </>
            ) : (
              <>
                <FlaskConical className="h-4 w-4" />
                <span>{t.generateBtn}</span>
              </>
            )}
          </button>
        </form>

        {/* Output Panel (Col span 7) */}
        <div className="lg:col-span-7">
          {!recommendation && !loading && (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl h-full min-h-[450px] flex flex-col items-center justify-center text-center p-8">
              <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-slate-300 mb-4">
                <FlaskConical className="h-10 w-10 animate-bounce" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">Waiting for Chemistry Inputs</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                Tune the soil pH levels and macronutrient slider panel on the left, then trigger calculation to output molecular fertilizer schedules.
              </p>
            </div>
          )}

          {loading && (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl h-full min-h-[450px] flex flex-col items-center justify-center text-center p-8">
              <RefreshCw className="h-8 w-8 text-emerald-500 animate-spin mb-3" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">
                Running Neural Recommendation Weights
              </h3>
            </div>
          )}

          {recommendation && !loading && (
            <div className="space-y-6">
              
              {/* Main Solution Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
                <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center space-x-2 mb-3">
                  <Sparkles className="h-4.5 w-4.5 text-amber-400 animate-pulse" />
                  <span className="text-[10px] font-mono tracking-wider uppercase text-emerald-400 font-bold">
                    AI Agronomy Prescription
                  </span>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-4 pb-4 border-b border-white/10 gap-2">
                  <h2 className="text-lg font-bold font-sans tracking-tight text-white">
                    {recommendation.bestFertilizer}
                  </h2>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <Scale className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs font-mono text-slate-400">{t.quantity}:</span>
                    <span className="text-xs font-bold font-mono text-white">
                      {recommendation.quantity}
                    </span>
                  </div>
                </div>

                {/* Split Application Schedule */}
                <div className="space-y-3">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wide block">
                    {t.schedule}
                  </span>
                  
                  <div className="space-y-2">
                    {recommendation.applicationSchedule.map((step, idx) => (
                      <div key={idx} className="flex items-start space-x-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                        <span className="h-5 w-5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs text-slate-300 leading-normal">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bio equivalents and expected gain */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Organic Alternatives */}
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 text-emerald-600 mb-3.5">
                      <Sprout className="h-5 w-5" />
                      <h4 className="text-xs font-bold uppercase tracking-wider">{t.organic}</h4>
                    </div>
                    <ul className="space-y-3">
                      {recommendation.organicAlternatives.map((alt, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-xs text-slate-600">
                          <Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{alt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 text-[10px] text-emerald-800 text-center font-semibold mt-4">
                    Composting secures humic carbon levels.
                  </div>
                </div>

                {/* expected yield bar */}
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 text-emerald-600 mb-3.5">
                      <TrendingUp className="h-5 w-5" />
                      <h4 className="text-xs font-bold uppercase tracking-wider">{t.yieldImprovement}</h4>
                    </div>

                    <div className="space-y-4 my-2">
                      <div className="flex items-baseline justify-between">
                        <span className="text-3xl font-bold text-slate-900 leading-none">
                          {recommendation.expectedYieldImprovement.split(' ')[0]}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wide font-mono">Net Productivity Increase</span>
                      </div>

                      {/* Visual progress scale */}
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2.5 text-xs flex rounded bg-slate-100">
                          <div 
                            style={{ width: "75%" }} 
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-emerald-500 to-teal-500 rounded" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-500 leading-relaxed font-sans mt-4">
                    {recommendation.expectedYieldImprovement}
                  </p>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
