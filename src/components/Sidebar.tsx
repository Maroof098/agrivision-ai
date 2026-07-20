import React from 'react';
import { 
  Sprout, 
  LayoutDashboard, 
  ScanLine, 
  CloudSun, 
  FlaskConical, 
  TrendingUp, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  UserSquare2, 
  ShieldAlert,
  Languages,
  LogOut,
  Award,
  X
} from 'lucide-react';
import { User, AlertNotification } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: User | null;
  onLogout: () => void;
  notifications: AlertNotification[];
  setNotificationsRead: () => void;
  lang: 'en' | 'hi' | 'te';
  setLang: (l: 'en' | 'hi' | 'te') => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  user,
  onLogout,
  notifications,
  setNotificationsRead,
  lang,
  setLang,
  isOpen = false,
  onClose
}: SidebarProps) {
  const unreadCount = notifications.filter(n => !n.read).length;

  const dictionary = {
    en: {
      brand: "AgriVision AI",
      dashboard: "Dashboard",
      disease: "Disease Detection",
      weather: "Weather Advisory",
      fertilizer: "Fertilizer AI",
      soil: "Soil Analysis",
      yield: "Yield Prediction",
      chat: "Farming AI Chat",
      market: "Market Prices",
      schemes: "Govt Schemes",
      calendar: "Crop Calendar",
      experts: "Expert Consult",
      admin: "Admin Portal",
      profile: "Farm Profile",
      logout: "Sign Out",
      alert: "Alerts"
    },
    hi: {
      brand: "एग्रीविज़न AI",
      dashboard: "डैशबोर्ड",
      disease: "रोग पहचान",
      weather: "मौसम सलाह",
      fertilizer: "उर्वरक AI",
      soil: "मिट्टी विश्लेषण",
      yield: "उपज पूर्वानुमान",
      chat: "कृषि AI चैट",
      market: "बाज़ार भाव",
      schemes: "सरकारी योजनाएं",
      calendar: "फसल कैलेंडर",
      experts: "विशेषज्ञ सलाह",
      admin: "व्यवस्थापक",
      profile: "फार्म प्रोफाइल",
      logout: "लॉग आउट",
      alert: "अलर्ट"
    },
    te: {
      brand: "అగ్రివిజన్ AI",
      dashboard: "డ్యాష్‌బోర్డ్",
      disease: "వ్యాధి గుర్తింపు",
      weather: "వాతావరణ సలహా",
      fertilizer: "ఎరువులు AI",
      soil: "నేల విశ్లేషణ",
      yield: "దిగుబడి అంచనా",
      chat: "వ్యవసాయ AI చాట్",
      market: "మార్కెట్ ధరలు",
      schemes: "ప్రభుత్వ పథకాలు",
      calendar: "పంట క్యాలెండర్",
      experts: "నిపుణుల సలహా",
      admin: "నిర్వాహకుడు",
      profile: "వ్యవసాయ ప్రొఫైల్",
      logout: "లాగ్ అవుట్",
      alert: "హెచ్చరికలు"
    }
  };

  const t = dictionary[lang] || dictionary.en;

  const menuItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard, role: ['farmer', 'admin', 'expert'] },
    { id: 'disease', label: t.disease, icon: ScanLine, role: ['farmer', 'admin', 'expert'] },
    { id: 'weather', label: t.weather, icon: CloudSun, role: ['farmer', 'expert'] },
    { id: 'fertilizer', label: t.fertilizer, icon: Sprout, role: ['farmer'] },
    { id: 'soil', label: t.soil, icon: FlaskConical, role: ['farmer', 'expert'] },
    { id: 'yield', label: t.yield, icon: TrendingUp, role: ['farmer'] },
    { id: 'chat', label: t.chat, icon: MessageSquare, role: ['farmer', 'expert'] },
    { id: 'market', label: t.market, icon: TrendingUp, role: ['farmer', 'admin'] },
    { id: 'calendar', label: t.calendar, icon: Calendar, role: ['farmer'] },
    { id: 'schemes', label: t.schemes, icon: BookOpen, role: ['farmer'] },
    { id: 'experts', label: t.experts, icon: Award, role: ['farmer', 'expert'] },
    { id: 'admin', label: t.admin, icon: ShieldAlert, role: ['admin'] },
    { id: 'profile', label: t.profile, icon: UserSquare2, role: ['farmer', 'admin', 'expert'] }
  ];

  return (
    <aside className={`w-68 bg-white text-slate-700 flex flex-col h-screen fixed left-0 top-0 border-r border-slate-200 z-50 shadow-sm transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Brand Section */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">
            A
          </div>
          <div>
            <h1 className="font-display font-bold tracking-tight text-md text-slate-900 leading-tight">
              {t.brand}
            </h1>
            <span className="text-[10px] text-emerald-600 font-mono font-bold tracking-wider uppercase block">
              Intelligent Hub
            </span>
          </div>
        </div>

        {onClose && (
          <button 
            onClick={onClose}
            className="md:hidden p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all"
            aria-label="Close Sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* User Information */}
      {user && (
        <div className="p-4 mx-4 my-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center space-x-3">
          <img 
            src={user.profilePic || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"} 
            alt="Profile" 
            className="w-10 h-10 rounded-lg object-cover ring-2 ring-slate-100"
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-xs font-semibold text-slate-800 truncate">{user.name}</h2>
            <p className="text-[10px] text-slate-400 capitalize truncate font-mono font-medium">{user.role}</p>
          </div>
        </div>
      )}

      {/* Language Selector in Sidebar */}
      <div className="px-6 mb-2 flex items-center justify-between">
        <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest flex items-center">
          <Languages className="h-3.5 w-3.5 mr-1.5 text-slate-400" /> Language
        </span>
        <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
          {(['en', 'hi', 'te'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-all ${
                lang === l 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto px-4 space-y-1.5 py-2 scrollbar-thin scrollbar-thumb-slate-200">
        {menuItems
          .filter(item => user && item.role.includes(user.role))
          .map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (onClose) onClose();
                }}
                className={`w-full flex items-center px-3.5 py-2.5 rounded-xl transition-all font-sans text-xs font-medium relative group ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`h-4.5 w-4.5 mr-3 transition-colors ${
                  isActive ? 'text-emerald-600' : 'text-slate-400 group-hover:text-emerald-600'
                }`} />
                <span className="truncate">{item.label}</span>
                {item.id === 'dashboard' && unreadCount > 0 && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white ring-2 ring-white">
                    {unreadCount}
                  </span>
                )}
                {isActive && (
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-600" />
                )}
              </button>
            );
          })}
      </nav>

      {/* Sidebar Footer with Sign Out */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <button
          onClick={onLogout}
          className="w-full flex items-center px-4 py-2.5 rounded-xl text-slate-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all font-sans text-xs font-medium border border-transparent"
        >
          <LogOut className="h-4.5 w-4.5 mr-3 text-slate-400 group-hover:text-rose-500" />
          <span>{t.logout}</span>
        </button>
      </div>
    </aside>
  );
}
