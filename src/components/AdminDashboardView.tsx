import React, { useState } from 'react';
import { 
  Users, 
  ShieldAlert, 
  Send, 
  Activity, 
  Database, 
  Grid3X3, 
  RefreshCw, 
  Check, 
  Trash2,
  BellRing,
  AlertTriangle,
  Flame,
  Info
} from 'lucide-react';
import { DiseaseAnalysis } from '../types';

interface AdminDashboardViewProps {
  diseaseLogs: DiseaseAnalysis[];
  onDeleteLog: (id: string) => void;
  lang: 'en' | 'hi' | 'te';
}

export default function AdminDashboardView({
  diseaseLogs,
  onDeleteLog,
  lang
}: AdminDashboardViewProps) {
  const [alertTarget, setAlertTarget] = useState('All Areas');
  const [alertType, setAlertType] = useState('Pest Threat');
  const [alertMessage, setAlertMessage] = useState('Locust swarms detected nearby. Apply early neem bio-sprays.');
  const [broadcastedAlerts, setBroadcastedAlerts] = useState<any[]>([
    { id: '1', target: 'Karnal', type: 'Late Blight warning', msg: 'Tomato fields exhibiting 12% moisture decay. Spray preventive fungicide.', date: 'Today' }
  ]);
  const [loading, setLoading] = useState(false);

  const dictionary = {
    en: {
      title: "AgriVision AI Administrative Hub",
      subtitle: "Review system diagnostics, manage computer vision scanning histories, and broadcast regional microclimate alerts.",
      statsScans: "Total Leaf Scans Logged",
      statsConfidence: "Average Model Precision",
      activeScanners: "Active Farm Sensors",
      mandiCap: "Mandi Price Synchronizers",
      broadcastTitle: "Regional Hazard Alert Broadcast",
      broadcastSub: "Publish high-priority warnings to connected farmers' mobile dashboards instantly.",
      targetLabel: "Target Farming Region",
      typeLabel: "Hazard Classification",
      msgLabel: "Alert Broadcast Message",
      button: "Publish Emergency Warning",
      activeBroadcasts: "Active Emergency Alerts Log",
      deleteBtn: "Revoke Alert",
      historyTitle: "Computer Vision Specimen Log"
    },
    hi: {
      title: "एग्रीविज़न AI प्रशासनिक केंद्र",
      subtitle: "सिस्टम डायग्नोस्टिक्स की समीक्षा करें, कंप्यूटर विज़न स्कैनिंग इतिहास का प्रबंधन करें और आपातकालीन अलर्ट प्रसारित करें।",
      statsScans: "कुल स्कैन किए गए पत्ते",
      statsConfidence: "औसत मॉडल परिशुद्धता",
      activeScanners: "सक्रिय कृषि सेंसर",
      mandiCap: "मंडी भाव सिंक्रोनाइज़र",
      broadcastTitle: "क्षेत्रीय खतरा चेतावनी प्रसारण",
      broadcastSub: "जुड़े हुए किसानों के मोबाइल डैशबोर्ड पर तुरंत उच्च-प्राथमिकता वाली चेतावनियां प्रकाशित करें।",
      targetLabel: "लक्षित कृषि क्षेत्र",
      typeLabel: "जोखिम वर्गीकरण",
      msgLabel: "चेतावनी संदेश",
      button: "आपातकालीन चेतावनी प्रकाशित करें",
      activeBroadcasts: "सक्रिय आपातकालीन अलर्ट लॉग",
      deleteBtn: "चेतावनी वापस लें",
      historyTitle: "कंप्यूटर विज़न पत्ती नमूना इतिहास"
    },
    te: {
      title: "AI అడ్మినిస్ట్రేటర్ డ్యాష్ బోర్డ్",
      subtitle: "సిస్టమ్ పనితీరును సమీక్షించండి, స్కాన్ చరిత్రను నిర్వహించండి మరియు అత్యవసర హెచ్చరికలను ప్రసారం చేయండి.",
      statsScans: "మొత్తం ఆకు స్కాన్‌లు",
      statsConfidence: "సగటు ఖచ్చితత్వం",
      activeScanners: "పొలం సెన్సార్లు",
      mandiCap: "ధరల సమన్వయకర్త",
      broadcastTitle: "ప్రాంతీయ విపత్తు హెచ్చరికలు",
      broadcastSub: "రైతుల మొబైల్ డ్యాష్ బోర్డులకు అత్యవసర హెచ్చరికలను పంపండి.",
      targetLabel: "లక్షిత ప్రాంతం",
      typeLabel: "విపత్తు రకం",
      msgLabel: "హెచ్చరిక సందేశం",
      button: "హెచ్చరికను జారీ చేయి",
      activeBroadcasts: "జారీ చేయబడిన అత్యవసర హెచ్చరికలు",
      deleteBtn: "రద్దు చేయి",
      historyTitle: "కంప్యూటర్ విజన్ స్కాన్ల రికార్డు"
    }
  };

  const t = dictionary[lang] || dictionary.en;

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertMessage.trim()) return;

    setLoading(true);
    setTimeout(() => {
      const alert = {
        id: "alert-" + Date.now(),
        target: alertTarget,
        type: alertType,
        msg: alertMessage,
        date: "Just now"
      };
      setBroadcastedAlerts([alert, ...broadcastedAlerts]);
      setAlertMessage('');
      setLoading(false);
    }, 650);
  };

  const removeAlert = (id: string) => {
    setBroadcastedAlerts(broadcastedAlerts.filter(a => a.id !== id));
  };

  // Aggregates
  const totalScans = diseaseLogs.length;
  const avgConf = diseaseLogs.length > 0 
    ? (diseaseLogs.reduce((sum, current) => sum + current.confidence, 0) / diseaseLogs.length).toFixed(1)
    : "92.5";

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 bg-white rounded-3xl border border-slate-100 shadow-sm gap-4">
        <div>
          <div className="flex items-center space-x-2 text-rose-600 mb-1">
            <ShieldAlert className="h-5 w-5 animate-pulse" />
            <span className="text-xs font-bold font-mono tracking-wider uppercase">System Operations Panel</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight">{t.title}</h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">{t.subtitle}</p>
        </div>
      </div>

      {/* Admin stats widgets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        
        {/* Scans */}
        <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 font-mono uppercase">{t.statsScans}</span>
          <span className="text-2xl font-bold text-slate-900 mt-2 block">{totalScans} Scans</span>
        </div>

        {/* Avg model accuracy */}
        <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 font-mono uppercase">{t.statsConfidence}</span>
          <span className="text-2xl font-bold text-emerald-600 mt-2 block">{avgConf}%</span>
        </div>

        {/* Sensors */}
        <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 font-mono uppercase">{t.activeScanners}</span>
          <span className="text-2xl font-bold text-slate-900 mt-2 block">14 Devices</span>
        </div>

        {/* Price Synchronizer */}
        <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 font-mono uppercase">{t.mandiCap}</span>
          <span className="text-2xl font-bold text-slate-900 mt-2 block">Active (API/JSON)</span>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Alerts Broadcaster (Col span 5) */}
        <div className="lg:col-span-5 space-y-6">
          <form onSubmit={handleBroadcast} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center">
              <BellRing className="h-4.5 w-4.5 text-rose-500 mr-2 animate-bounce" />
              <span>{t.broadcastTitle}</span>
            </h3>
            <p className="text-[10px] text-slate-400 leading-normal">{t.broadcastSub}</p>

            {/* Target Area */}
            <div>
              <label className="block text-[10px] text-slate-500 uppercase font-mono mb-1">{t.targetLabel}</label>
              <select 
                value={alertTarget} onChange={(e) => setAlertTarget(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3 rounded-xl text-xs text-slate-800 focus:outline-none"
              >
                {['All Areas', 'Karnal, Haryana', 'Assandh Hub', 'Panipat Hub'].map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            {/* Hazard Class */}
            <div>
              <label className="block text-[10px] text-slate-500 uppercase font-mono mb-1">{t.typeLabel}</label>
              <select 
                value={alertType} onChange={(e) => setAlertType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3 rounded-xl text-xs text-slate-800 focus:outline-none"
              >
                {['Pest Threat', 'Late Blight Hazard', 'Heavy Monsoon Shower', 'Soil Acidity Alert'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-[10px] text-slate-500 uppercase font-mono mb-1">{t.msgLabel}</label>
              <textarea 
                rows={3} value={alertMessage} onChange={(e) => setAlertMessage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-rose-500"
              />
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full py-3 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-300 text-white rounded-2xl text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2"
            >
              {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              <span>{t.button}</span>
            </button>
          </form>

          {/* Active Broadcasts log */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              {t.activeBroadcasts}
            </h3>

            <div className="space-y-3">
              {broadcastedAlerts.map((a) => (
                <div key={a.id} className="p-4 bg-rose-50/50 border border-rose-100 rounded-2xl flex items-start justify-between gap-3">
                  <div className="flex items-start space-x-2.5">
                    <AlertTriangle className="h-4.5 w-4.5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[8px] font-mono font-bold text-rose-600 uppercase tracking-wider block">
                        [{a.type}] • {a.target}
                      </span>
                      <p className="text-xs text-slate-700 mt-1 leading-normal font-medium">{a.msg}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeAlert(a.id)}
                    className="text-slate-400 hover:text-rose-600 p-1 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Specimen scanning diagnostics ledger (Col span 7) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center">
            <Activity className="h-4.5 w-4.5 text-rose-500 mr-2" />
            <span>{t.historyTitle}</span>
          </h3>

          <div className="space-y-4">
            {diseaseLogs.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100 text-slate-400 text-xs">
                No active computer vision diagnostic logs recorded yet.
              </div>
            ) : (
              diseaseLogs.map((log) => (
                <div key={log.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50 flex items-center justify-between gap-4">
                  <div className="flex items-center space-x-3.5">
                    {/* Leaf Specimen */}
                    <img 
                      src={log.imageUrl} 
                      alt={log.diseaseName} 
                      className="h-12 w-12 rounded-xl object-cover border"
                    />
                    <div>
                      <span className="text-[9px] font-mono font-bold text-emerald-600 uppercase">
                        {log.crop} • {log.part}
                      </span>
                      <h4 className="text-xs font-bold text-slate-800 mt-0.5 leading-tight">{log.diseaseName}</h4>
                      <p className="text-[10px] text-slate-400 mt-1">Severity: <span className="font-semibold text-rose-500">{log.severity}</span></p>
                    </div>
                  </div>

                  <div className="text-right flex items-center space-x-4">
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono block">Precision</span>
                      <span className="text-xs font-bold font-mono text-emerald-600">{log.confidence}%</span>
                    </div>

                    <button
                      onClick={() => onDeleteLog(log.id)}
                      className="text-slate-300 hover:text-rose-500 p-1.5 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
