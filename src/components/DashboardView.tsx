import React from 'react';
import { 
  CloudSun, 
  TrendingUp, 
  Sprout, 
  BellRing, 
  Activity, 
  MapPin, 
  Thermometer, 
  Droplets, 
  ShieldAlert, 
  ArrowUpRight, 
  Clock, 
  Plus, 
  Check, 
  Volume2,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { User, WeatherData, MarketPrice, CalendarEvent, AlertNotification, DiseaseAnalysis } from '../types';

interface DashboardViewProps {
  user: User | null;
  weather: WeatherData | null;
  marketPrices: MarketPrice[];
  calendarEvents: CalendarEvent[];
  notifications: AlertNotification[];
  recentUploads: DiseaseAnalysis[];
  setActiveTab: (tab: string) => void;
  onMarkNotificationsRead: () => void;
  lang: 'en' | 'hi' | 'te';
}

export default function DashboardView({
  user,
  weather,
  marketPrices,
  calendarEvents,
  notifications,
  recentUploads,
  setActiveTab,
  onMarkNotificationsRead,
  lang
}: DashboardViewProps) {
  
  // Calculate agricultural indices
  const healthScore = 88; // Simulated overall farm health percentage
  const activeAlerts = notifications.filter(n => !n.read).length;

  const dictionary = {
    en: {
      welcome: "Welcome back,",
      subtitle: "Here's what is happening on your farm today.",
      healthTitle: "Farm Crop Health",
      healthDesc: "Overall vegetation vigor index is excellent.",
      alertTitle: "Critical Farm Alerts",
      weatherTitle: "Microclimate Weather",
      weatherDesc: "Advisory: skip irrigation today.",
      suggestionTitle: "AI Agronomist Advice",
      marketTitle: "Market Pricing Insights",
      recentDiagnostics: "Recent Leaf Diagnostics",
      quickCalendar: "Upcoming Farm Tasks",
      addEvent: "Add Task",
      cropType: "Primary Crops",
      acres: "Acreage",
      unread: "Unread Alerts",
      markRead: "Dismiss Alerts",
      noAlerts: "No active alerts. Your crops are doing great!"
    },
    hi: {
      welcome: "स्वागत है,",
      subtitle: "आज आपके खेत की ताज़ा स्थिति यहाँ है।",
      healthTitle: "फसल स्वास्थ्य सूचकांक",
      healthDesc: "कुल वनस्पति स्वास्थ्य उत्कृष्ट स्थिति में है।",
      alertTitle: "महत्वपूर्ण कृषि अलर्ट",
      weatherTitle: "सूक्ष्म-जलवायु मौसम",
      weatherDesc: "सलाह: आज सिंचाई न करें।",
      suggestionTitle: "AI कृषि विशेषज्ञ की सलाह",
      marketTitle: "बाज़ार भाव अंतर्दृष्टि",
      recentDiagnostics: "हालिया पत्ता निदान",
      quickCalendar: "आगामी कृषि कार्य",
      addEvent: "कार्य जोड़ें",
      cropType: "मुख्य फसलें",
      acres: "एकड़",
      unread: "अपठित अलर्ट",
      markRead: "अलर्ट हटाएं",
      noAlerts: "कोई सक्रिय अलर्ट नहीं है। आपकी फसलें स्वस्थ हैं!"
    },
    te: {
      welcome: "స్వాగతం,",
      subtitle: "ఈరోజు మీ పొలం ప్రస్తుత పరిస్థితి ఇక్కడ ఉంది.",
      healthTitle: "పంట ఆరోగ్య సూచిక",
      healthDesc: "మొత్తం వృక్ష సంపద అద్భుతంగా ఉంది.",
      alertTitle: "ముఖ్యమైన వ్యవసాయ హెచ్చరికలు",
      weatherTitle: "సూక్ష్మ వాతావరణం",
      weatherDesc: "సలహా: ఈ రోజు నీరు పెట్టవద్దు.",
      suggestionTitle: "AI వ్యవసాయ శాస్త్రవేత్త సలహా",
      marketTitle: "మార్కెట్ ధరల విశ్లేషణ",
      recentDiagnostics: "ఇటీవలి ఆకు వ్యాధి నిర్ధారణలు",
      quickCalendar: "రాబోయే వ్యవసాయ పనులు",
      addEvent: "పనిని జోడించు",
      cropType: "ప్రధాన పంటలు",
      acres: "ఎకరాలు",
      unread: "చదవని హెచ్చరికలు",
      markRead: "హెచ్చరికలు తొలగించు",
      noAlerts: "ఎటువంటి హెచ్చరికలు లేవు. మీ పంటలు బాగా పెరుగుతున్నాయి!"
    }
  };

  const t = dictionary[lang] || dictionary.en;

  return (
    <div className="space-y-6">
      {/* Top Welcome & Location Banner */}
      <div className="p-6 bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl border border-emerald-700/30 text-white relative overflow-hidden shadow-sm">
        {/* Decorative backdrop glow */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 relative z-10">
          <div>
            <div className="flex items-center space-x-2.5 text-emerald-300 font-mono text-xs font-bold tracking-wider uppercase mb-1.5">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>AgriVision AI Active Node</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-sans font-bold tracking-tight leading-none text-white">
              {t.welcome} {user?.name || 'Farmer'}!
            </h1>
            <p className="text-emerald-100/80 text-xs mt-1 font-sans">
              {t.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-emerald-300" />
              <span className="text-xs font-medium">{user?.farmLocation || 'Karnal, Haryana'}</span>
            </div>
            <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 flex items-center space-x-2">
              <Sprout className="h-4 w-4 text-emerald-300" />
              <span className="text-xs font-medium">
                {user?.primaryCrops?.join(', ') || 'Rice, Tomato'}
              </span>
            </div>
            <div className="px-4 py-2 bg-emerald-500/20 backdrop-blur-md rounded-xl border border-emerald-400/20 flex items-center space-x-2">
              <span className="text-xs font-bold text-emerald-200">
                {user?.farmSize || '4.5'} {t.acres}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Crop Health Circular Gauge */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-slate-800">{t.healthTitle}</h3>
              <span className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
                <Activity className="h-4 w-4" />
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-6">{t.healthDesc}</p>
          </div>

          <div className="flex flex-col items-center justify-center my-2">
            {/* Circular Progress Gauge */}
            <div className="relative flex items-center justify-center">
              <svg className="w-36 h-36 transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="62"
                  className="stroke-slate-100"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="62"
                  className="stroke-emerald-500 transition-all duration-500"
                  strokeWidth="12"
                  strokeDasharray={2 * Math.PI * 62}
                  strokeDashoffset={2 * Math.PI * 62 * (1 - healthScore / 100)}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-3xl font-bold text-slate-900">{healthScore}%</span>
                <span className="text-[10px] block text-emerald-600 font-mono font-bold tracking-wide uppercase">VIGOR</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-50 flex justify-around text-center text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono font-medium">Water stress</span>
              <span className="font-semibold text-slate-800">Optimal (8%)</span>
            </div>
            <div className="border-r border-slate-100 h-8" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono font-medium">Nitrogen Levels</span>
              <span className="font-semibold text-slate-800">Balanced</span>
            </div>
          </div>
        </div>

        {/* Card 2: Microclimate Weather widget */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-slate-800">{t.weatherTitle}</h3>
              <span className="p-1.5 bg-sky-50 rounded-lg text-sky-600">
                <CloudSun className="h-4 w-4" />
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">Live Sensor Telemetry</p>
          </div>

          {weather ? (
            <div className="my-4 space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-slate-900 tracking-tight">{weather.temp}°C</span>
                <div>
                  <span className="text-xs font-semibold text-slate-800 block">{weather.condition}</span>
                  <span className="text-[10px] text-slate-400">Feels like {weather.feelsLike}°C</span>
                </div>
              </div>

              {/* Weather parameters */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-100/50">
                <div className="flex items-center space-x-2">
                  <Droplets className="h-4 w-4 text-sky-500" />
                  <div>
                    <span className="text-[10px] text-slate-400 block leading-tight">Humidity</span>
                    <span className="text-xs font-bold text-slate-800">{weather.humidity}%</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Thermometer className="h-4 w-4 text-amber-500" />
                  <div>
                    <span className="text-[10px] text-slate-400 block leading-tight">UV Index</span>
                    <span className="text-xs font-bold text-slate-800">{weather.uvIndex} (Very High)</span>
                  </div>
                </div>
              </div>

              {/* Rainfall advisory text */}
              <div className="p-3 bg-sky-50 rounded-xl border border-sky-100/50 flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-sky-600 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-sky-800 leading-normal">{weather.recommendation}</p>
              </div>
            </div>
          ) : (
            <div className="animate-pulse space-y-4">
              <div className="h-12 bg-slate-100 rounded-xl" />
              <div className="h-16 bg-slate-100 rounded-xl" />
            </div>
          )}

          <button 
            onClick={() => setActiveTab('weather')}
            className="w-full text-center py-2 text-xs font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50/50 hover:bg-emerald-50 rounded-xl border border-emerald-100 transition-colors mt-2"
          >
            Full Weather Forecast & Advisory
          </button>
        </div>

        {/* Card 3: Alert Notifications Stream */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-semibold text-slate-800">{t.alertTitle}</h3>
              {activeAlerts > 0 && (
                <span className="px-2 py-0.5 bg-rose-500 text-white rounded-full text-[10px] font-bold">
                  {activeAlerts} {t.unread}
                </span>
              )}
            </div>
            {activeAlerts > 0 && (
              <button 
                onClick={onMarkNotificationsRead}
                className="text-[10px] font-semibold text-emerald-600 hover:text-emerald-700"
              >
                {t.markRead}
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto max-h-[175px] space-y-3.5 pr-1 scrollbar-thin">
            {notifications.length > 0 ? (
              notifications.map((alert) => (
                <div 
                  key={alert.id}
                  className={`p-3 rounded-2xl border transition-colors flex items-start space-x-3 ${
                    alert.read 
                      ? 'bg-slate-50/60 border-slate-100 text-slate-500' 
                      : 'bg-emerald-50/30 border-emerald-100/50 text-slate-800'
                  }`}
                >
                  <span className={`p-1.5 rounded-lg mt-0.5 ${
                    alert.type === 'disease' ? 'bg-rose-50 text-rose-600' :
                    alert.type === 'weather' ? 'bg-sky-50 text-sky-600' :
                    'bg-amber-50 text-amber-600'
                  }`}>
                    <BellRing className="h-3.5 w-3.5" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold leading-tight truncate">{alert.title}</h4>
                    <p className="text-[10px] leading-normal text-slate-500 mt-0.5">{alert.message}</p>
                    <span className="text-[8px] font-mono text-slate-400 mt-1 block">
                      {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <Check className="h-8 w-8 text-emerald-500 mb-2" />
                <p className="text-xs text-slate-500">{t.noAlerts}</p>
              </div>
            )}
          </div>

          <button
            onClick={() => onMarkNotificationsRead()}
            className="w-full text-center py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all mt-4"
          >
            Clear Active Notices
          </button>
        </div>

      </div>

      {/* Row 2: Live Market Prices Sparkline & AI Agronomist suggestion */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Market prices section with custom SVG visualization */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-800">{t.marketTitle}</h3>
                <p className="text-[10px] text-slate-400 font-mono">Commodity Index (INR per 100kg)</p>
              </div>
              <button 
                onClick={() => setActiveTab('market')}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center space-x-1"
              >
                <span>Full Mandi Analytics</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Sparkline pricing roster */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
              {marketPrices.slice(0, 2).map((price) => {
                const diff = price.currentPrice - price.previousPrice;
                const isUp = diff >= 0;

                // Calculate custom SVG sparkline path
                const points = price.history.map((h, i) => `${i * 45},${80 - (h.price - 1000) / 45}`).join(' ');

                return (
                  <div key={price.id} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 flex justify-between items-center">
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">{price.crop}</span>
                      <span className="text-[9px] text-slate-400 font-mono block mb-2">{price.marketName.split(',')[0]}</span>
                      
                      <div className="flex items-baseline space-x-2">
                        <span className="text-lg font-bold text-slate-900">₹{price.currentPrice}</span>
                        <span className={`text-[10px] font-bold ${isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {isUp ? '▲' : '▼'} {Math.abs(diff)}
                        </span>
                      </div>
                    </div>

                    {/* Highly polished custom mini-sparkline SVG */}
                    <div className="w-28 h-12 relative">
                      <svg className="w-full h-full">
                        <polyline
                          fill="none"
                          stroke={isUp ? "#10b981" : "#f43f5e"}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          points={points}
                        />
                      </svg>
                      <span className="text-[8px] font-mono text-slate-400 absolute right-1 bottom-0 uppercase font-bold tracking-wider">6m trend</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Prompt banner to use prediction tools */}
          <div className="p-4 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-2xl border border-emerald-500/10 flex items-center justify-between mt-4">
            <div className="flex items-center space-x-3">
              <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <TrendingUp className="h-4 w-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Advanced Yield & Profit Forecasting</h4>
                <p className="text-[10px] text-slate-500">Input acreage, water, and soil metrics to predict returns.</p>
              </div>
            </div>
            <button 
              onClick={() => setActiveTab('yield')}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-bold transition-all"
            >
              Predict Yield Now
            </button>
          </div>
        </div>

        {/* Card 5: AI Agronomist Quick suggestion card */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl text-white flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="flex items-center space-x-2 text-[10px] font-bold text-emerald-400 tracking-wider uppercase font-mono">
                <Lightbulb className="h-4 w-4 text-amber-400 animate-bounce" />
                <span>Smart Advisory</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">v3.5 Flash</span>
            </div>

            <h3 className="text-sm font-semibold mb-3 leading-snug">{t.suggestionTitle}</h3>
            <p className="text-slate-300 text-xs leading-relaxed font-sans mb-4">
              "Your soil pH is 6.5 (optimal) but N-P-K nutrient reports indicate a slight potassium deficit in the sandy loam bed. 
              Top dress with muriate of potash (MOP @ 20kg/acre) during the active transplanting cycle to ensure heavy grain heads."
            </p>
          </div>

          <button 
            onClick={() => setActiveTab('chat')}
            className="w-full flex items-center justify-center space-x-2 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-500/10"
          >
            <span>Ask Farming Assistant</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

      </div>

      {/* Row 3: Recent Uploads & Quick Calendar tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent diagnostic uploads */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-slate-800">{t.recentDiagnostics}</h3>
              <button 
                onClick={() => setActiveTab('disease')}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Scan Leaf Image
              </button>
            </div>

            <div className="space-y-3.5">
              {recentUploads.length > 0 ? (
                recentUploads.slice(0, 2).map((upload) => (
                  <div key={upload.id} className="p-3 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center space-x-4">
                    <img 
                      src={upload.imageUrl} 
                      alt={upload.diseaseName} 
                      className="w-12 h-12 rounded-xl object-cover border border-slate-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-slate-800 truncate">{upload.diseaseName}</span>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold font-mono uppercase ${
                          upload.severity === 'Critical' || upload.severity === 'High' 
                            ? 'bg-rose-50 text-rose-600 border border-rose-100' 
                            : 'bg-amber-50 text-amber-600 border border-amber-100'
                        }`}>
                          {upload.severity}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">{upload.suggestedTreatment}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-600 font-mono block">{upload.confidence}%</span>
                      <span className="text-[8px] font-mono text-slate-400">Confidence</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No diagnostics yet. Go to Disease Detection to diagnose leaf damage instantly.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Crop Calendar schedule */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-slate-800">{t.quickCalendar}</h3>
              <button 
                onClick={() => setActiveTab('calendar')}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Full Calendar
              </button>
            </div>

            <div className="space-y-3.5">
              {calendarEvents.slice(0, 3).map((event) => (
                <div key={event.id} className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-xl transition-all">
                  <div className="flex items-start space-x-3 min-w-0">
                    <span className={`p-1.5 rounded-lg mt-0.5 ${
                      event.completed ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {event.completed ? <Check className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                    </span>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-slate-800 block leading-tight">{event.crop} - {event.stage}</span>
                      <p className="text-[9px] text-slate-400 font-mono mt-0.5">Due: {event.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
