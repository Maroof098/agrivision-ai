import React, { useState, useEffect } from 'react';
import { 
  Sprout, 
  LogIn, 
  UserPlus, 
  Sparkles, 
  Key, 
  Info,
  UserCheck,
  ShieldCheck,
  Globe,
  BellRing,
  Clock,
  LogOut,
  Menu
} from 'lucide-react';
import { 
  User, 
  WeatherData, 
  MarketPrice, 
  CalendarEvent, 
  AlertNotification, 
  DiseaseAnalysis 
} from './types';

// Import Modular Views
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import DiseaseDetectionView from './components/DiseaseDetectionView';
import WeatherView from './components/WeatherView';
import FertilizerView from './components/FertilizerView';
import SoilAnalysisView from './components/SoilAnalysisView';
import YieldPredictionView from './components/YieldPredictionView';
import ChatbotView from './components/ChatbotView';
import MarketPricesView from './components/MarketPricesView';
import SchemesView from './components/SchemesView';
import CropCalendarView from './components/CropCalendarView';
import ExpertConsultationView from './components/ExpertConsultationView';
import AdminDashboardView from './components/AdminDashboardView';
import ProfileView from './components/ProfileView';
import { GOVERNMENT_SCHEMES } from './data';

export default function App() {
  // Authentication & Session States
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login');
  
  // Login credentials state
  const [email, setEmail] = useState('rajesh@agrivision.ai');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [farmLocation, setFarmLocation] = useState('Karnal, Haryana');
  const [farmSize, setFarmSize] = useState(4.5);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Primary Platform States
  const [lang, setLang] = useState<'en' | 'hi' | 'te'>('en');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [notifications, setNotifications] = useState<AlertNotification[]>([]);
  const [recentUploads, setRecentUploads] = useState<DiseaseAnalysis[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Digital Clock ticking
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync state data on Auth status change
  useEffect(() => {
    if (isAuthenticated) {
      loadInitialData();
    }
  }, [isAuthenticated]);

  // Load initial dataset from backend APIs
  const loadInitialData = async () => {
    try {
      // 1. Weather
      const weatherRes = await fetch('/api/weather', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location: user?.farmLocation || 'Karnal, Haryana' })
      });
      if (weatherRes.ok) {
        const wData = await weatherRes.json();
        setWeather(wData);
      }

      // 2. Market Prices
      const marketRes = await fetch('/api/market-prices');
      if (marketRes.ok) {
        const mData = await marketRes.json();
        setMarketPrices(mData);
      }

      // 3. Calendar
      const calendarRes = await fetch('/api/calendar');
      if (calendarRes.ok) {
        const cData = await calendarRes.json();
        setCalendarEvents(cData);
      }

      // 4. Notifications
      const notifRes = await fetch('/api/notifications');
      if (notifRes.ok) {
        const nData = await notifRes.json();
        setNotifications(nData);
      }
    } catch (err) {
      console.error("Error fetching sandbox data:", err);
    }
  };

  // Update local microclimate forecast details
  const handleRefreshWeather = async (location: string) => {
    try {
      const weatherRes = await fetch('/api/weather', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location })
      });
      if (weatherRes.ok) {
        const wData = await weatherRes.json();
        setWeather(wData);
      }
    } catch (err) {
      console.error("Error refreshing climate:", err);
    }
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || 'Authentication failed.');
        return;
      }

      setUser(data.user);
      setLang(data.user.language || 'en');
      setIsAuthenticated(true);
      setAuthSuccess('Logged in successfully!');
    } catch (err) {
      setAuthError('Connection error, entering offline sandbox mode.');
      // Offline fallback login for demonstration robustness
      const fallbackUser: User = {
        id: 'user-farmer',
        name: 'Rajesh Kumar',
        email: email,
        role: 'farmer',
        farmLocation: 'Karnal, Haryana',
        farmSize: 4.5,
        primaryCrops: ['Rice', 'Tomato'],
        language: 'en',
        theme: 'light',
        profilePic: "https://images.unsplash.com/photo-1542461927-4632a4e2b027?auto=format&fit=crop&q=80&w=200",
        createdAt: new Date().toISOString()
      };
      setUser(fallbackUser);
      setIsAuthenticated(true);
    }
  };

  // Sign up handler
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    if (!name || !email || !password) {
      setAuthError('Please fill in all mandatory credentials.');
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          farmLocation,
          farmSize,
          primaryCrops: ['Rice', 'Tomato']
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || 'Registration failed.');
        return;
      }

      setAuthSuccess('Registration completed! Please log in now.');
      setAuthMode('login');
      setEmail(email);
    } catch (err) {
      setAuthError('Failed to contact server registration. Try again.');
    }
  };

  // Forgot Password handler
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || 'Request failed.');
        return;
      }
      setAuthSuccess(`OTP Sent successfully! Code: ${data.otp}`);
    } catch (err) {
      setAuthError('Reset request failed. Use "password123" to sign in.');
    }
  };

  // Logout handler
  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setActiveTab('dashboard');
  };

  // Simulated Roles Swapper inside Profile
  const handleSetRole = (role: 'farmer' | 'admin') => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      // Automatically adjust tab availability to prevent view mismatch
      if (role === 'admin') {
        setActiveTab('admin');
      } else {
        setActiveTab('dashboard');
      }
    }
  };

  // Handle disease detection image upload logs
  const handleAnalysisAdded = (analysis: DiseaseAnalysis) => {
    setRecentUploads(prev => [analysis, ...prev]);
    // Inject a corresponding system notification
    const newNotif: AlertNotification = {
      id: 'n-uploaded-' + Date.now(),
      title: `Leaf Scan: ${analysis.diseaseName}`,
      message: `Diagnosis completed with ${analysis.confidence}% confidence. Severity: ${analysis.severity}.`,
      type: 'disease',
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Handle manual calendar event additions
  const handleAddCalendarEvent = async (event: any) => {
    try {
      const res = await fetch('/api/calendar/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      });
      if (res.ok) {
        const added = await res.json();
        setCalendarEvents(prev => [...prev, added]);
      }
    } catch (err) {
      // Offline fallback
      const mockEvent: CalendarEvent = {
        id: 'c-' + Date.now(),
        crop: event.crop,
        stage: event.stage,
        date: event.date,
        notes: event.notes,
        completed: false
      };
      setCalendarEvents(prev => [...prev, mockEvent]);
    }
  };

  // Toggle completed status of crop calendar event
  const handleToggleCalendarEvent = async (id: string) => {
    try {
      const res = await fetch('/api/calendar/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        const updated = await res.json();
        setCalendarEvents(prev => prev.map(e => e.id === id ? updated : e));
      }
    } catch (err) {
      setCalendarEvents(prev => prev.map(e => e.id === id ? { ...e, completed: !e.completed } : e));
    }
  };

  // Dismiss notifications
  const handleMarkNotificationsRead = async () => {
    try {
      await fetch('/api/notifications/read-all', { method: 'POST' });
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (err) {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    }
  };

  // Mandi Price modification (Simulated admin live updates)
  const handlePriceUpdated = (id: string, newPrice: number) => {
    setMarketPrices(prev => prev.map(m => {
      if (m.id === id) {
        return {
          ...m,
          previousPrice: m.currentPrice,
          currentPrice: newPrice,
          history: [...m.history, { month: 'Aug', price: newPrice }]
        };
      }
      return m;
    }));
  };

  // Dynamic View Routing based on ActiveTab
  const renderViewContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardView
            user={user}
            weather={weather}
            marketPrices={marketPrices}
            calendarEvents={calendarEvents}
            notifications={notifications}
            recentUploads={recentUploads}
            setActiveTab={setActiveTab}
            onMarkNotificationsRead={handleMarkNotificationsRead}
            lang={lang}
          />
        );
      case 'disease':
        return (
          <DiseaseDetectionView
            lang={lang}
            onAddUpload={handleAnalysisAdded}
          />
        );
      case 'weather':
        return (
          <WeatherView
            lang={lang}
            weather={weather}
            onRefreshWeather={handleRefreshWeather}
          />
        );
      case 'fertilizer':
        return <FertilizerView lang={lang} />;
      case 'soil':
        return <SoilAnalysisView lang={lang} />;
      case 'yield':
        return <YieldPredictionView lang={lang} />;
      case 'chat':
        return <ChatbotView lang={lang} />;
      case 'market':
        return (
          <MarketPricesView
            lang={lang}
            marketPrices={marketPrices}
            onUpdatePrice={handlePriceUpdated}
            userRole={user?.role || 'farmer'}
          />
        );
      case 'schemes':
        return (
          <SchemesView 
            schemes={GOVERNMENT_SCHEMES.map(s => ({
              ...s,
              title: s.name,
              description: s.tagline,
              benefitAmount: s.benefits,
              requiredDocuments: s.documentsRequired,
              applyUrl: s.applicationLink,
              ministry: s.category === 'Direct Benefit' ? 'Ministry of Agriculture & Farmers Welfare' : 'Central Government'
            }))} 
            lang={lang} 
          />
        );
      case 'calendar':
        return (
          <CropCalendarView
            lang={lang}
          />
        );
      case 'experts':
        return <ExpertConsultationView lang={lang} />;
      case 'admin':
        return (
          <AdminDashboardView
            diseaseLogs={recentUploads}
            onDeleteLog={(id) => setRecentUploads(prev => prev.filter(l => l.id !== id))}
            lang={lang}
          />
        );
      case 'profile':
        return (
          <ProfileView
            userRole={user?.role || 'farmer'}
            onSetRole={handleSetRole}
            lang={lang}
            onSetLang={(l) => setLang(l)}
          />
        );
      default:
        return (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-100">
            <h2 className="text-sm font-semibold text-slate-800">View under construction</h2>
            <button onClick={() => setActiveTab('dashboard')} className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold">
              Return Dashboard
            </button>
          </div>
        );
    }
  };

  // ==========================================
  // RENDER: GUEST/UNAUTHENTICATED GATEWAY CARD
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4 relative overflow-hidden">
        {/* Abstract organic blurred glowing backgrounds */}
        <div className="absolute -left-32 -top-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
        <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl" />

        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-2xl p-8 relative z-10 space-y-6">
          
          {/* Brand header */}
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-600 animate-bounce">
              <Sprout className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">AgriVision AI</h1>
            <p className="text-xs text-slate-500 font-medium">Helping Farmers Grow More with Artificial Intelligence</p>
          </div>

          {/* Errors / Success displays */}
          {authError && (
            <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs leading-normal">
              ⚠️ {authError}
            </div>
          )}
          {authSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl text-xs leading-normal">
              {authSuccess}
            </div>
          )}

          {/* Form renders */}
          {authMode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Registered Email</label>
                <input 
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                  placeholder="name@agrivision.ai"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Password</label>
                  <button type="button" onClick={() => setAuthMode('forgot')} className="text-[10px] font-semibold text-emerald-600 hover:underline">Forgot?</button>
                </div>
                <input 
                  type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                  className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                  placeholder="••••••••"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2"
              >
                <LogIn className="h-4 w-4" />
                <span>Enter AgriVision AI Sandbox</span>
              </button>
            </form>
          )}

          {authMode === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-3">
              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Full Name</label>
                <input 
                  type="text" value={name} onChange={(e) => setName(e.target.value)} required
                  className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                  placeholder="Rajesh Kumar"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Email Address</label>
                <input 
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                  placeholder="rajesh@agrivision.ai"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Password</label>
                <input 
                  type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                  className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                  placeholder="Minimum 6 characters"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Mandi Location</label>
                  <input 
                    type="text" value={farmLocation} onChange={(e) => setFarmLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                    placeholder="Karnal, Haryana"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Farm Acres</label>
                  <input 
                    type="number" step="0.1" value={farmSize} onChange={(e) => setFarmSize(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2 mt-2"
              >
                <UserPlus className="h-4 w-4" />
                <span>Register Farmer Profile</span>
              </button>
            </form>
          )}

          {authMode === 'forgot' && (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <p className="text-xs text-slate-500 leading-normal">
                Enter your registered farmer email and we'll instantly generate a simulated OTP trigger bypass.
              </p>

              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Registered Email</label>
                <input 
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                  placeholder="rajesh@agrivision.ai"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold transition-all shadow-md"
              >
                Send Password Reset Code
              </button>
            </form>
          )}

          {/* Toggles between login/signup */}
          <div className="pt-4 border-t border-slate-100 flex justify-between text-xs text-slate-500">
            {authMode === 'login' ? (
              <>
                <span>New to AgriVision AI?</span>
                <button type="button" onClick={() => setAuthMode('signup')} className="font-bold text-emerald-600 hover:underline">Register Here</button>
              </>
            ) : (
              <>
                <span>Already have an account?</span>
                <button type="button" onClick={() => setAuthMode('login')} className="font-bold text-emerald-600 hover:underline">Login Instead</button>
              </>
            )}
          </div>

          {/* Pre-filled credentials disclaimer */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-start space-x-2">
            <Info className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
              <strong>Testing Tip</strong>: Simply press the green button to log in directly. All parameters are pre-seeded for standard Sandbox evaluation.
            </p>
          </div>

        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: MAIN PLATFORM VIEW WITH SIDEBAR
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* Backdrop for mobile slide-over sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 z-45 md:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Permanent / Slide-over Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={handleLogout}
        notifications={notifications}
        setNotificationsRead={handleMarkNotificationsRead}
        lang={lang}
        setLang={(l) => setLang(l)}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Right Content Section (Margin-left: 17rem to clear Sidebar on desktop) */}
      <div className="flex-1 min-h-screen md:ml-68 ml-0 flex flex-col">
        
        {/* Top Header / Telemetry Bar */}
        <header className="sticky top-0 bg-white/85 backdrop-blur-md border-b border-slate-100 px-4 sm:px-8 py-3.5 flex items-center justify-between z-20 gap-3">
          
          <div className="flex items-center space-x-3">
            {/* Mobile Sidebar Hamburger Toggle */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all border border-slate-200/60"
              aria-label="Open Sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Left: Dynamic Digital Clock */}
            <div className="flex items-center space-x-3">
              <span className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600 flex-shrink-0 hidden sm:inline-flex">
                <Clock className="h-4 w-4" />
              </span>
              <div className="leading-tight">
                <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-wider hidden sm:block">Live System Node Time</span>
                <span className="text-xs font-bold text-slate-700 font-mono">
                  {currentTime.toLocaleDateString([], { month: 'short', day: '2-digit' })}, {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Quick Telemetry Indicators */}
          <div className="flex items-center space-x-4">
            
            {/* Active Role Indicator */}
            <div className="hidden md:flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
              {user?.role === 'admin' ? (
                <>
                  <ShieldCheck className="h-4.5 w-4.5 text-rose-500" />
                  <span className="text-[10px] font-mono font-bold text-rose-600 uppercase tracking-wide">Administrator Portal</span>
                </>
              ) : (
                <>
                  <UserCheck className="h-4.5 w-4.5 text-emerald-600" />
                  <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-wide">Farmer Node</span>
                </>
              )}
            </div>

            {/* Language Telemetry Indicator */}
            <div className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 text-[10px] font-bold text-slate-600 font-mono uppercase">
              <Globe className="h-3.5 w-3.5 text-slate-400" />
              <span>{lang}</span>
            </div>

            {/* Notification Badge */}
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-100 relative transition-colors"
            >
              <BellRing className="h-4 w-4" />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
              )}
            </button>

            <div className="border-r border-slate-200 h-6" />

            {/* Active profile shortcut avatar */}
            <button 
              onClick={() => setActiveTab('profile')}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img 
                src={user?.profilePic || "https://images.unsplash.com/photo-1542461927-4632a4e2b027?auto=format&fit=crop&q=80&w=200"} 
                alt="Profile" 
                className="w-8 h-8 rounded-lg object-cover ring-2 ring-emerald-500/10 hover:opacity-90 transition-opacity"
              />
            </button>

          </div>
        </header>

        {/* Primary View Render Stage */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6">
          {renderViewContent()}
        </main>

        {/* Humble, Professional Footer */}
        <footer className="border-t border-slate-100 bg-white/60 py-4 text-center">
          <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
            © 2026 AgriVision AI SaaS. All data synchronized under regional Indian agriculture parameters.
          </p>
        </footer>

      </div>
    </div>
  );
}
