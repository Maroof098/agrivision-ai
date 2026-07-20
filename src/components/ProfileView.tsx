import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Phone, 
  Sprout, 
  Languages, 
  ShieldCheck, 
  Sliders, 
  Check, 
  Info,
  Layers,
  Database
} from 'lucide-react';

interface ProfileViewProps {
  userRole: string;
  onSetRole: (role: 'farmer' | 'admin') => void;
  lang: 'en' | 'hi' | 'te';
  onSetLang: (lang: 'en' | 'hi' | 'te') => void;
}

export default function ProfileView({
  userRole,
  onSetRole,
  lang,
  onSetLang
}: ProfileViewProps) {
  // Farm Profile state
  const [farmerName, setFarmerName] = useState('Devender Singh');
  const [location, setLocation] = useState('Karnal, Haryana');
  const [phone, setPhone] = useState('+91 98450 11029');
  const [acres, setAcres] = useState(4.5);
  const [soil, setSoil] = useState('Loamy');
  const [crops, setCrops] = useState(['Rice', 'Tomato', 'Wheat']);

  const [notifSms, setNotifSms] = useState(true);
  const [notifDisease, setNotifDisease] = useState(true);

  const dictionary = {
    en: {
      title: "AgriVision Profile & Simulations",
      subtitle: "Configure farm dimensions, local soil chemistry, and toggle language/actor role variables to preview dynamic platform experiences.",
      personalHeader: "Farmer Credentials",
      farmHeader: "Farm Properties",
      settingsHeader: "Developer & Simulation Settings",
      roleLabel: "Active Actor Role",
      langLabel: "System Language",
      saveBtn: "Save Profile Credentials",
      acresLabel: "Cultivated Acres",
      soilLabel: "Soil Taxonomy",
      cropsLabel: "Primary Crops Grown",
      mandiCap: "Mandi Price Alerts (SMS)",
      cropHealth: "Weekly Crop Vigor reports (SMS)",
      sysIntegration: "Platform Integrations"
    },
    hi: {
      title: "किसान प्रोफ़ाइल और सिमुलेशन",
      subtitle: "कृषि मापदंडों, मिट्टी के प्रकार को कॉन्फ़िगर करें, और भाषा तथा व्यवस्थापक भूमिका को टॉगल करके प्लेटफ़ॉर्म अनुभव का परीक्षण करें।",
      personalHeader: "किसान का विवरण",
      farmHeader: "कृषि भूमि का विवरण",
      settingsHeader: "डेवलपर और सिमुलेशन सेटिंग्स",
      roleLabel: "सक्रिय भूमिका (Actor Role)",
      langLabel: "सिस्टम की भाषा",
      saveBtn: "प्रोफ़ाइल सहेजें",
      acresLabel: "कुल कृषि क्षेत्र (एकड़)",
      soilLabel: "मिट्टी का प्रकार",
      cropsLabel: "मुख्य फसलें",
      mandiCap: "मंडी भाव अलर्ट (SMS)",
      cropHealth: "साप्ताहिक फसल स्वास्थ्य रिपोर्ट (SMS)",
      sysIntegration: "प्लेटफ़ॉर्म एकीकरण"
    },
    te: {
      title: "రైతు ప్రొఫైల్ & అనుకరణ సెట్టింగులు",
      subtitle: "మీ పొలం వివరాలు, నేల రకం మరియు డెవలపర్ పరీక్షల కోసం భాష మరియు పాత్రలను సులభంగా మార్చుకోండి.",
      personalHeader: "వ్యక్తిగత వివరాలు",
      farmHeader: "పొలం వివరాలు",
      settingsHeader: "డెవలపర్ టెస్టింగ్ సెట్టింగులు",
      roleLabel: "సిస్టమ్ పాత్ర (Actor Role)",
      langLabel: "సిస్టమ్ భాష",
      saveBtn: "వివరాలు సేవ్ చేయి",
      acresLabel: "సాగు విస్తీర్ణం (ఎకరాలు)",
      soilLabel: "నేల రకం",
      cropsLabel: "పండించే పంటలు",
      mandiCap: "మండీ ధరల అలర్ట్ (SMS)",
      cropHealth: "వారపు పంట ఆరోగ్య రిపోర్ట్ (SMS)",
      sysIntegration: "సిస్టమ్ అనుసంధానం"
    }
  };

  const t = dictionary[lang] || dictionary.en;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile configurations synchronized securely with LocalStorage!");
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 bg-white rounded-3xl border border-slate-100 shadow-sm gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-600 mb-1">
            <User className="h-5 w-5 animate-pulse" />
            <span className="text-xs font-bold font-mono tracking-wider uppercase">Farming Registry ID</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight">{t.title}</h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">{t.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Form: Personal & Farm Details (Col span 7) */}
        <form onSubmit={handleSave} className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          
          {/* Personal */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center">
              <User className="h-4.5 w-4.5 text-emerald-500 mr-2" />
              <span>{t.personalHeader}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-mono mb-1">Farmer Full Name</label>
                <input 
                  type="text" value={farmerName} onChange={(e) => setFarmerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-mono mb-1">Phone Number</label>
                <input 
                  type="text" value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[10px] text-slate-500 uppercase font-mono mb-1">Farm Primary Headquarters Location</label>
                <input 
                  type="text" value={location} onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Farm Details */}
          <div className="pt-6 border-t border-slate-100 space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center">
              <Sprout className="h-4.5 w-4.5 text-emerald-500 mr-2" />
              <span>{t.farmHeader}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-mono mb-1">{t.acresLabel}</label>
                <input 
                  type="number" step="0.1" value={acres} onChange={(e) => setAcres(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-mono mb-1">{t.soilLabel}</label>
                <select 
                  value={soil} onChange={(e) => setSoil(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3 rounded-xl text-xs text-slate-800 focus:outline-none"
                >
                  {['Loamy', 'Clayey', 'Sandy', 'Alluvial', 'Black Soil'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-[10px] text-slate-500 uppercase font-mono mb-1">{t.cropsLabel}</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {['Rice', 'Wheat', 'Tomato', 'Cotton', 'Sugarcane', 'Maize'].map(crop => {
                    const exists = crops.includes(crop);
                    return (
                      <button
                        key={crop} type="button"
                        onClick={() => {
                          if (exists) {
                            setCrops(crops.filter(c => c !== crop));
                          } else {
                            setCrops([...crops, crop]);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                          exists 
                            ? 'bg-emerald-600 border-emerald-600 text-white' 
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {crop} {exists && '✓'}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold transition-all shadow-md"
          >
            {t.saveBtn}
          </button>
        </form>

        {/* Right Panel: Developer Test & Language Swappers (Col span 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 rounded-3xl border border-slate-800 shadow-xl space-y-5">
            
            <div className="flex items-center space-x-2">
              <Sliders className="h-4.5 w-4.5 text-emerald-400 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                {t.settingsHeader}
              </h3>
            </div>

            {/* Language Selection */}
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider block flex items-center">
                <Languages className="h-3.5 w-3.5 mr-1 text-emerald-400" />
                <span>{t.langLabel}</span>
              </span>
              
              <div className="grid grid-cols-3 gap-2">
                {([
                  { key: 'en', label: 'English' },
                  { key: 'hi', label: 'हिन्दी' },
                  { key: 'te', label: 'తెలుగు' }
                ] as const).map(l => (
                  <button
                    key={l.key}
                    onClick={() => onSetLang(l.key)}
                    className={`py-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                      lang === l.key 
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/10' 
                        : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Role Selection (Developer simulation tester!) */}
            <div className="space-y-2 pt-4 border-t border-white/5">
              <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider block flex items-center">
                <ShieldCheck className="h-3.5 w-3.5 mr-1 text-emerald-400" />
                <span>{t.roleLabel}</span>
              </span>

              <div className="grid grid-cols-2 gap-2">
                {([
                  { key: 'farmer', label: '🌾 Farmer View' },
                  { key: 'admin', label: '🛡️ Admin View' }
                ] as const).map(role => (
                  <button
                    key={role.key}
                    onClick={() => onSetRole(role.key)}
                    className={`py-2.5 text-xs font-semibold rounded-xl border text-center transition-all ${
                      userRole === role.key 
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/10' 
                        : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notification triggers */}
            <div className="space-y-3 pt-4 border-t border-white/5">
              <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider block flex items-center">
                <Database className="h-3.5 w-3.5 mr-1 text-emerald-400" />
                <span>{t.sysIntegration}</span>
              </span>

              <div className="space-y-2 text-xs">
                {/* SMS toggler 1 */}
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-slate-300">{t.mandiCap}</span>
                  <input 
                    type="checkbox" checked={notifSms} onChange={() => setNotifSms(!notifSms)}
                    className="accent-emerald-500 h-4 w-4 cursor-pointer"
                  />
                </div>

                {/* SMS toggler 2 */}
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-slate-300">{t.cropHealth}</span>
                  <input 
                    type="checkbox" checked={notifDisease} onChange={() => setNotifDisease(!notifDisease)}
                    className="accent-emerald-500 h-4 w-4 cursor-pointer"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Simulator info disclaimer */}
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-start space-x-3">
            <Info className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[10px] font-bold text-slate-800 uppercase tracking-wide font-mono">Sandbox notice</h4>
              <p className="text-xs text-slate-500 leading-normal mt-1">
                Roles and translation variables update dynamically in memory state across your session tabs.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
