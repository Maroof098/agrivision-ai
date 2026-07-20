import React, { useState, useEffect } from 'react';
import { 
  CloudSun, 
  Wind, 
  Droplets, 
  Sun, 
  Compass, 
  CloudRain, 
  MapPin, 
  RefreshCw, 
  Lightbulb, 
  Sparkles,
  Info
} from 'lucide-react';
import { WeatherData } from '../types';

interface WeatherViewProps {
  weather: WeatherData | null;
  onRefreshWeather: (location: string) => Promise<void>;
  lang: 'en' | 'hi' | 'te';
}

export default function WeatherView({ weather, onRefreshWeather, lang }: WeatherViewProps) {
  const [locationInput, setLocationInput] = useState('Karnal, Haryana');
  const [loading, setLoading] = useState(false);

  const dictionary = {
    en: {
      title: "Microclimate Weather & AI Advisory",
      subtitle: "Secure hyper-local sensor arrays synchronized with predictive global climate patterns to deliver daily farm actions.",
      locationLabel: "Configure Farm Location",
      refreshBtn: "Update Climate Telemetry",
      liveIndicators: "Live Weather Indicators",
      temp: "Temperature",
      feelsLike: "Feels Like",
      humidity: "Relative Humidity",
      windSpeed: "Wind Speed",
      rainfall: "Precipitation (Today)",
      uv: "UV Index",
      aqi: "Air Quality Index (AQI)",
      advisoryTitle: "AI Agronomic Advisory",
      forecastTitle: "7-Day Agronomy Forecast",
      day: "Day",
      condition: "Condition",
      tempColumn: "Temp",
      rainColumn: "Rainfall"
    },
    hi: {
      title: "मौसम पूर्वानुमान और AI कृषि सलाह",
      subtitle: "दैनिक कृषि गतिविधियों की योजना बनाने के लिए वैश्विक जलवायु प्रणालियों के साथ सिंक सूक्ष्म मौसम पूर्वानुमान।",
      locationLabel: "खेत का स्थान सेट करें",
      refreshBtn: "मौसम अपडेट करें",
      liveIndicators: "लाइव मौसम संकेतक",
      temp: "तापमान",
      feelsLike: "महसूस होने वाला",
      humidity: "सापेक्ष आर्द्रता",
      windSpeed: "हवा की गति",
      rainfall: "वर्षा (आज)",
      uv: "यूवी सूचकांक",
      aqi: "वायु गुणवत्ता सूचकांक (AQI)",
      advisoryTitle: "AI कृषि परामर्श",
      forecastTitle: "7-दिवसीय मौसम पूर्वानुमान",
      day: "दिन",
      condition: "स्थिति",
      tempColumn: "तापमान",
      rainColumn: "बारिश"
    },
    te: {
      title: "వాతావరణ సలహాలు & AI సిఫార్సులు",
      subtitle: "రోజూ వ్యవసాయ కార్యకలాపాలను ప్లాన్ చేసుకోవడానికి మీ ప్రాంత వాతావరణం మరియు AI సూచనలు.",
      locationLabel: "పొలం స్థానాన్ని సెట్ చేయండి",
      refreshBtn: "వాతావరణం అప్‌డేట్ చేయి",
      liveIndicators: "ప్రత్యక్ష వాతావరణ సమాచారం",
      temp: "ఉష్ణోగ్రత",
      feelsLike: "అనిపించే ఉష్ణోగ్రత",
      humidity: "తేమ శాతం",
      windSpeed: "గాలి వేగం",
      rainfall: "వర్షపాతం (ఈరోజు)",
      uv: "UV ఇండెక్స్",
      aqi: "వాయు నాణ్యత సూచిక (AQI)",
      advisoryTitle: "AI వ్యవసాయ సిఫార్సులు",
      forecastTitle: "7-రోజుల వాతావరణ సూచన",
      day: "రోజు",
      condition: "వాతావరణం",
      tempColumn: "ఉష్ణోగ్రత",
      rainColumn: "వర్షపాతం"
    }
  };

  const t = dictionary[lang] || dictionary.en;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onRefreshWeather(locationInput);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 bg-white rounded-3xl border border-slate-100 shadow-sm gap-4">
        <div>
          <div className="flex items-center space-x-2 text-sky-600 mb-1">
            <CloudSun className="h-5 w-5 animate-pulse" />
            <span className="text-xs font-bold font-mono tracking-wider uppercase">Microclimate Analytics</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight">{t.title}</h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">{t.subtitle}</p>
        </div>

        {/* Location Form */}
        <form onSubmit={handleUpdate} className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <MapPin className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              placeholder="e.g., Karnal, Haryana"
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 rounded-xl text-xs w-full sm:w-56"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2"
          >
            {loading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Compass className="h-3.5 w-3.5" />}
            <span>{t.refreshBtn}</span>
          </button>
        </form>
      </div>

      {weather ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Weather Gauges Grid (Col span 8) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-6">
                {t.liveIndicators}
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                
                {/* Temp Gauge */}
                <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50 flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{t.temp}</span>
                  <div className="flex items-baseline space-x-2 my-2">
                    <span className="text-3xl font-bold text-slate-900">{weather.temp}°C</span>
                    <span className="text-xs text-slate-400">/{weather.feelsLike}°C {t.feelsLike}</span>
                  </div>
                  <span className="text-[9px] text-emerald-600 font-semibold flex items-center">
                    <Sun className="h-3.5 w-3.5 mr-1" /> Stable warm front
                  </span>
                </div>

                {/* Humidity */}
                <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50 flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{t.humidity}</span>
                  <div className="flex items-baseline space-x-2 my-2">
                    <span className="text-3xl font-bold text-slate-900">{weather.humidity}%</span>
                  </div>
                  <span className="text-[9px] text-sky-600 font-semibold flex items-center">
                    <Droplets className="h-3.5 w-3.5 mr-1" /> High moisture risk
                  </span>
                </div>

                {/* Rainfall */}
                <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50 flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{t.rainfall}</span>
                  <div className="flex items-baseline space-x-2 my-2">
                    <span className="text-3xl font-bold text-slate-900">{weather.rainfall} mm</span>
                  </div>
                  <span className="text-[9px] text-sky-600 font-semibold flex items-center">
                    <CloudRain className="h-3.5 w-3.5 mr-1" /> Scattered showers
                  </span>
                </div>

                {/* Wind */}
                <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50 flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{t.windSpeed}</span>
                  <div className="flex items-baseline space-x-2 my-2">
                    <span className="text-2xl font-bold text-slate-900">{weather.windSpeed} km/h</span>
                  </div>
                  <span className="text-[9px] text-slate-500 font-semibold flex items-center">
                    <Wind className="h-3.5 w-3.5 mr-1" /> Easterly breeze
                  </span>
                </div>

                {/* UV */}
                <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50 flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{t.uv}</span>
                  <div className="flex items-baseline space-x-2 my-2">
                    <span className="text-3xl font-bold text-slate-900">{weather.uvIndex}</span>
                  </div>
                  <span className="text-[9px] text-amber-600 font-semibold flex items-center">
                    Very High (Cover crops)
                  </span>
                </div>

                {/* AQI */}
                <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50 flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{t.aqi}</span>
                  <div className="flex items-baseline space-x-2 my-2">
                    <span className="text-3xl font-bold text-slate-900">{weather.aqi}</span>
                  </div>
                  <span className="text-[9px] text-emerald-600 font-semibold flex items-center">
                    Good (Clean Air)
                  </span>
                </div>

              </div>
            </div>

            {/* AI Advisor Banner */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-amber-400 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                    {t.advisoryTitle}
                  </span>
                </div>
                <span className="text-[9px] text-slate-500 font-mono">Gemini Agricultural Intelligence</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3.5">
                  <span className="p-2.5 bg-white/5 border border-white/5 rounded-2xl text-emerald-400 flex-shrink-0">
                    <Lightbulb className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Suggested Farm Practices</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1 font-sans">
                      {weather.recommendation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 7-Day Forecast (Col span 4) */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center mb-4">
                  <CloudSun className="h-4.5 w-4.5 text-emerald-500 mr-2" />
                  <span>{t.forecastTitle}</span>
                </h3>

                <div className="space-y-3">
                  {weather.forecast.map((fc, i) => (
                    <div 
                      key={i} 
                      className="flex items-center justify-between p-2 rounded-2xl hover:bg-slate-50/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <span className="text-xs font-semibold text-slate-800 w-16 truncate">{fc.day}</span>
                        <span className="text-[10px] text-slate-400 truncate max-w-[100px]">{fc.condition}</span>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <span className="text-xs font-bold text-slate-800 block">{fc.temp}°C</span>
                        </div>
                        <div className="w-14 text-right">
                          {fc.rainfall > 0 ? (
                            <span className="text-[10px] font-mono text-sky-600 font-bold bg-sky-50 px-1.5 py-0.5 rounded">
                              {fc.rainfall} mm
                            </span>
                          ) : (
                            <span className="text-[9px] font-mono text-slate-400">Dry</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Informational Footer */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100/50 flex items-start space-x-2.5 mt-4">
                <Info className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
                  Precipitation forecasting incorporates cloud coverage dynamics, humidity metrics, and local sensor telemetry.
                </p>
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-100 animate-pulse space-y-4">
          <div className="h-6 bg-slate-100 w-1/3 mx-auto rounded" />
          <div className="h-32 bg-slate-100 rounded-xl" />
        </div>
      )}
    </div>
  );
}
