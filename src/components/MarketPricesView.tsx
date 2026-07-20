import React, { useState } from 'react';
import { 
  TrendingUp, 
  MapPin, 
  ArrowUpRight, 
  Search, 
  LineChart, 
  Check, 
  AlertTriangle,
  RefreshCw,
  TrendingDown
} from 'lucide-react';
import { MarketPrice } from '../types';

interface MarketPricesViewProps {
  marketPrices: MarketPrice[];
  onUpdatePrice: (id: string, currentPrice: number) => void;
  userRole: string;
  lang: 'en' | 'hi' | 'te';
}

export default function MarketPricesView({
  marketPrices,
  onUpdatePrice,
  userRole,
  lang
}: MarketPricesViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<string>('');

  const dictionary = {
    en: {
      title: "Commodity Grain Market (Mandi) Indices",
      subtitle: "Daily commodity pricing charts aggregated from nearby mandis. Predict future grain trends and configure mandi caps.",
      searchPlaceholder: "Search crops (Basmati, Sonalika wheat...)",
      trendHigh: "High Demand",
      trendMed: "Normal Demand",
      trendLow: "Low Supply Demand",
      predictTitle: "Trend Forecast",
      nearbyTitle: "Nearby Agricultural Markets",
      adminTitle: "Mandi Price Setter (Admin Mode)",
      updateBtn: "Apply New Price",
      historyTitle: "6-Month Pricing Trend"
    },
    hi: {
      title: "जिंस अनाज मंडी भाव सूचकांक",
      subtitle: "आसपास की मंडियों से एकत्रित दैनिक अनाज के भाव। भविष्य के रुझानों का अनुमान लगाएं और बाजार भाव अपडेट करें।",
      searchPlaceholder: "फसलें खोजें (बासमती चावल, सोनालिका गेहूं...)",
      trendHigh: "उच्च मांग",
      trendMed: "सामान्य मांग",
      trendLow: "कम आपूर्ति मांग",
      predictTitle: "बाजार भाव पूर्वानुमान",
      nearbyTitle: "आसपास के कृषि बाजार",
      adminTitle: "मंडी मूल्य निर्धारक (व्यवस्थापक मोड)",
      updateBtn: "नया भाव लागू करें",
      historyTitle: "6-महीने का मूल्य रुझान"
    },
    te: {
      title: "పంటల మార్కెట్ ధరల విశ్లేషణ",
      subtitle: "స్థానిక మార్కెట్ యార్డుల (మండీలు) నుండి సేకరించిన రోజువారీ పంట ధరలు మరియు భవిష్యత్తు అంచనాలు.",
      searchPlaceholder: "పంటల కోసం వెతకండి...",
      trendHigh: "ఎక్కువ డిమాండ్",
      trendMed: "సాధారణ డిమాండ్",
      trendLow: "తక్కువ డిమాండ్",
      predictTitle: "ధరల భవిష్యత్తు సూచన",
      nearbyTitle: "సమీప మార్కెట్ యార్డులు",
      adminTitle: "ధర అప్‌డేట్ (అడ్మిన్ మోడ్)",
      updateBtn: "ధర అప్‌డేట్ చేయి",
      historyTitle: "6-నెలల పంట ధరల ట్రెండ్"
    }
  };

  const t = dictionary[lang] || dictionary.en;

  const handleEditClick = (crop: MarketPrice) => {
    setEditingPriceId(crop.id);
    setTempPrice(crop.currentPrice.toString());
  };

  const handleSave = (id: string) => {
    const val = Number(tempPrice);
    if (!isNaN(val) && val > 0) {
      onUpdatePrice(id, val);
      setEditingPriceId(null);
    }
  };

  const filteredCrops = marketPrices.filter(c => 
    c.crop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 bg-white rounded-3xl border border-slate-100 shadow-sm gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-600 mb-1">
            <TrendingUp className="h-5 w-5 animate-pulse" />
            <span className="text-xs font-bold font-mono tracking-wider uppercase">Mandi Pricing Exchange</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight">{t.title}</h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">{t.subtitle}</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 rounded-xl text-xs w-full sm:w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Mandi List (Col span 2) */}
        <div className="lg:col-span-2 space-y-4">
          {filteredCrops.map((price) => {
            const diff = price.currentPrice - price.previousPrice;
            const isUp = diff >= 0;

            // Generate responsive plot coordinates for custom SVG chart (width 320, height 80)
            const minPrice = Math.min(...price.history.map(h => h.price)) * 0.95;
            const maxPrice = Math.max(...price.history.map(h => h.price)) * 1.05;
            const priceRange = maxPrice - minPrice;

            const svgPoints = price.history.map((h, i) => {
              const x = (i / (price.history.length - 1)) * 340;
              const y = 70 - ((h.price - minPrice) / priceRange) * 60;
              return `${x},${y}`;
            }).join(' ');

            return (
              <div key={price.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  
                  {/* Name and Market */}
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-bold text-slate-800">{price.crop}</h3>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
                        price.demandTrend === 'High' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                        price.demandTrend === 'Medium' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                        'bg-slate-50 text-slate-500 border border-slate-100'
                      }`}>
                        {price.demandTrend === 'High' ? t.trendHigh : price.demandTrend === 'Medium' ? t.trendMed : t.trendLow}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5 flex items-center">
                      <MapPin className="h-3.5 w-3.5 mr-1 text-slate-300" />
                      {price.marketName}
                    </p>
                  </div>

                  {/* Pricing metrics */}
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <span className="text-[9px] text-slate-400 uppercase font-mono tracking-wider block">Price per Quintal</span>
                      <div className="flex items-baseline space-x-2 mt-0.5 justify-end">
                        <span className="text-xl font-bold text-slate-900">₹{price.currentPrice}</span>
                        <span className={`text-xs font-bold ${isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {isUp ? '▲' : '▼'} ₹{Math.abs(diff)}
                        </span>
                      </div>
                    </div>

                    {/* Admin Override triggers */}
                    {userRole === 'admin' && (
                      <div className="flex items-center space-x-1 border-l pl-4 border-slate-100">
                        {editingPriceId === price.id ? (
                          <div className="flex items-center space-x-1">
                            <input 
                              type="number"
                              value={tempPrice}
                              onChange={(e) => setTempPrice(e.target.value)}
                              className="w-16 px-1.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                            />
                            <button 
                              onClick={() => handleSave(price.id)}
                              className="p-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold"
                            >
                              ✓
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEditClick(price)}
                            className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[10px] font-bold"
                          >
                            Set Price
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                </div>

                {/* Historic Pricing Visualizer (Sparkline line graph!) */}
                <div className="pt-4 border-t border-slate-50">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide block mb-3">
                    {t.historyTitle}
                  </span>
                  
                  <div className="relative h-20 bg-slate-50/50 p-2 rounded-2xl border border-slate-100/50">
                    <svg className="w-full h-full" viewBox="0 0 340 75" preserveAspectRatio="none">
                      {/* Gradient fill */}
                      <defs>
                        <linearGradient id={`grad-${price.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor={isUp ? "#10b981" : "#f43f5e"} stopOpacity="0.25" />
                          <stop offset="100%" stopColor={isUp ? "#10b981" : "#f43f5e"} stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      <polyline
                        fill={`url(#grad-${price.id})`}
                        stroke="none"
                        points={`0,75 ${svgPoints} 340,75`}
                      />
                      <polyline
                        fill="none"
                        stroke={isUp ? "#10b981" : "#f43f5e"}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        points={svgPoints}
                      />
                    </svg>

                    {/* Month indicators overlay */}
                    <div className="absolute inset-x-4 bottom-1 flex justify-between text-[8px] font-mono font-bold text-slate-400">
                      {price.history.map((h, i) => (
                        <span key={i}>{h.month} (₹{h.price})</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Forecast section */}
                <div className="p-3 bg-emerald-50/30 border border-emerald-100/50 rounded-2xl flex items-start space-x-2.5">
                  <LineChart className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <h4 className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wide leading-tight">
                      {t.predictTitle}
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-normal">{price.pricePrediction}</p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Nearby Depots & Analytics (Col span 1) */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              {t.nearbyTitle}
            </h3>

            <div className="space-y-3">
              {[
                { name: "Karnal central Grain Mandi", dist: "3.2 km", status: "Open (Ends 5 PM)" },
                { name: "Assandh Rural Cooperative", dist: "14.5 km", status: "Open (Ends 4 PM)" },
                { name: "Panipat Main Agro Hub", dist: "24.1 km", status: "Closed (Opens tomorrow)" }
              ].map((m, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block">{m.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">{m.status}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded-lg text-[10px]">
                    {m.dist}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
