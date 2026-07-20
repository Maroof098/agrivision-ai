import React, { useState } from 'react';
import { 
  Building, 
  Search, 
  ExternalLink, 
  FileCheck, 
  CheckCircle, 
  HelpCircle, 
  ShieldCheck, 
  Info,
  ChevronRight
} from 'lucide-react';
import { GovernmentScheme } from '../types';

interface SchemesViewProps {
  schemes: GovernmentScheme[];
  lang: 'en' | 'hi' | 'te';
}

export default function SchemesView({ schemes, lang }: SchemesViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<string | null>(null);
  
  // Eligibility checklist state
  const [hasAadhaar, setHasAadhaar] = useState(false);
  const [hasLandRecord, setHasLandRecord] = useState(false);
  const [hasBankPassbook, setHasBankPassbook] = useState(false);
  const [hasTaxID, setHasTaxID] = useState(false);

  const dictionary = {
    en: {
      title: "Government Agricultural Schemes & Benefits",
      subtitle: "Review national and regional financial programs. Calculate eligibility instantly and review enrollment checklists.",
      searchPlaceholder: "Search schemes (Kisan, Fasal Bima, subsidy...)",
      benefitsHeader: "Financial Benefit & Allocations",
      eligibilityCheck: "Instant Eligibility Calculator",
      checklistSub: "Toggle the document assets below to verify your application readiness status:",
      aadhaar: "Valid Aadhaar UID Card",
      landRecord: "Land Registry PATTA / Jamabandi Records",
      bankPass: "Active Bank Account Passbook",
      taxId: "Self-Declaration of small farming holder",
      eligibleStatus: "Pre-Screening Status",
      notReady: "Document incomplete",
      ready: "Eligible! 100% Ready for Submission",
      applyBtn: "Proceed to Official Govt Portal",
      requiredDocs: "Mandatory Document Checklist",
      detailsBtn: "View Scheme Parameters"
    },
    hi: {
      title: "सरकारी कृषि योजनाएं और सब्सिडी",
      subtitle: "राष्ट्रीय और क्षेत्रीय वित्तीय योजनाओं की समीक्षा करें। पात्रता की तुरंत गणना करें और आवश्यक दस्तावेजों की सूची देखें।",
      searchPlaceholder: "योजनाएं खोजें (किसान सम्मान निधि, फसल बीमा...)",
      benefitsHeader: "वित्तीय लाभ और आवंटन",
      eligibilityCheck: "तत्काल पात्रता कैलकुलेटर",
      checklistSub: "आवेदन की तैयारी की स्थिति की पुष्टि करने के लिए नीचे दिए गए दस्तावेज़ों को चुनें:",
      aadhaar: "वैध आधार कार्ड",
      landRecord: "भूमि रजिस्ट्री पट्टा / जमाबंदी रिकॉर्ड",
      bankPass: "सक्रिय बैंक खाता पासबुक",
      taxId: "छोटे किसान होने का स्व-घोषणा पत्र",
      eligibleStatus: "प्री-स्क्रीनिंग स्थिति",
      notReady: "दस्तावेज़ अपूर्ण हैं",
      ready: "पात्र! आवेदन के लिए 100% तैयार",
      applyBtn: "आधिकारिक सरकारी पोर्टल पर जाएं",
      requiredDocs: "अनिवार्य दस्तावेज़ सूची",
      detailsBtn: "योजना का विवरण देखें"
    },
    te: {
      title: "ప్రభుత్వ పథకాలు & రాయితీలు",
      subtitle: "రైతు సంక్షేమ పథకాలు, పంట బీమా సమాచారం మరియు మీ అర్హతలను వెంటనే పరీక్షించుకోండి.",
      searchPlaceholder: "పథకాల కోసం వెతకండి (కిసాన్, బీమా, రాయితీ...)",
      benefitsHeader: "ఆర్థిక సహాయం & రాయితీ వివరాలు",
      eligibilityCheck: "పథకాల అర్హత క్యాలిక్యులేటర్",
      checklistSub: "అప్లికేషన్ సమర్పించడానికి మీ వద్ద ఉన్న డాక్యుమెంట్లను టిక్ చేయండి:",
      aadhaar: "ఆధార్ కార్డు",
      landRecord: "పట్టాదారు పాస్ పుస్తకం (భూమి రికార్డులు)",
      bankPass: "బ్యాంక్ ఖాతా పుస్తకం",
      taxId: "చిన్న రైతు స్వయం ధృవీకరణ పత్రం",
      eligibleStatus: "అర్హత స్క్రీనింగ్ స్థితి",
      notReady: "డాక్యుమెంట్లు సరిపోవు",
      ready: "అర్హులు! దరఖాస్తుకు సిద్ధంగా ఉన్నారు",
      applyBtn: "అధికారిక ప్రభుత్వ వెబ్ సైట్ కు వెళ్ళు",
      requiredDocs: "కావలసిన పత్రాలు",
      detailsBtn: "పథకం వివరాలు చూడండి"
    }
  };

  const t = dictionary[lang] || dictionary.en;

  const filteredSchemes = schemes.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isEligible = hasAadhaar && hasLandRecord && hasBankPassbook;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 bg-white rounded-3xl border border-slate-100 shadow-sm gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-600 mb-1">
            <Building className="h-5 w-5 animate-pulse" />
            <span className="text-xs font-bold font-mono tracking-wider uppercase">Direct Benefit Schemes</span>
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Schemes List (Col span 8) */}
        <div className="lg:col-span-8 space-y-4">
          {filteredSchemes.map((scheme) => (
            <div 
              key={scheme.id} 
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 hover:border-emerald-200 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-800 flex items-center leading-tight">
                    <CheckCircle className="h-4.5 w-4.5 text-emerald-500 mr-2 flex-shrink-0" />
                    <span>{scheme.title}</span>
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                    Issued by: {scheme.ministry}
                  </span>
                </div>

                <div className="bg-emerald-50/50 text-emerald-800 border border-emerald-100/50 px-4 py-2 rounded-2xl text-right sm:flex-shrink-0">
                  <span className="text-[8px] font-mono uppercase tracking-wider block">{t.benefitsHeader}</span>
                  <span className="text-sm font-bold block">{scheme.benefitAmount}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {scheme.description}
              </p>

              {/* Expansion block */}
              <div className="pt-3 border-t border-slate-50 flex flex-wrap gap-2 justify-between items-center">
                <div className="flex items-center space-x-1">
                  <span className="text-[9px] text-slate-400 uppercase font-mono tracking-wider">Required:</span>
                  <div className="flex space-x-1.5">
                    {scheme.requiredDocuments.slice(0, 3).map((doc, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[9px] font-bold">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>

                <a 
                  href={scheme.applyUrl} 
                  target="_blank" 
                  referrerPolicy="no-referrer"
                  className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 text-xs font-bold transition-all"
                >
                  <span>{t.applyBtn}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Dynamic Eligibility Calculator Panel (Col span 4) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 rounded-3xl border border-slate-800 shadow-xl space-y-5">
            
            <div className="flex items-center space-x-2">
              <FileCheck className="h-5 w-5 text-emerald-400 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                {t.eligibilityCheck}
              </h3>
            </div>

            <p className="text-[10px] text-slate-400 leading-normal">
              {t.checklistSub}
            </p>

            {/* Document toggles */}
            <div className="space-y-3">
              
              <button 
                onClick={() => setHasAadhaar(!hasAadhaar)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all ${
                  hasAadhaar 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-white' 
                    : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                <span className="text-xs font-medium">{t.aadhaar}</span>
                <span className={`h-5 w-5 rounded-lg flex items-center justify-center text-xs font-bold ${
                  hasAadhaar ? 'bg-emerald-500 text-white' : 'bg-white/10 text-slate-500'
                }`}>
                  {hasAadhaar ? '✓' : ''}
                </span>
              </button>

              <button 
                onClick={() => setHasLandRecord(!hasLandRecord)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all ${
                  hasLandRecord 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-white' 
                    : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                <span className="text-xs font-medium">{t.landRecord}</span>
                <span className={`h-5 w-5 rounded-lg flex items-center justify-center text-xs font-bold ${
                  hasLandRecord ? 'bg-emerald-500 text-white' : 'bg-white/10 text-slate-500'
                }`}>
                  {hasLandRecord ? '✓' : ''}
                </span>
              </button>

              <button 
                onClick={() => setHasBankPassbook(!hasBankPassbook)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all ${
                  hasBankPassbook 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-white' 
                    : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                <span className="text-xs font-medium">{t.bankPass}</span>
                <span className={`h-5 w-5 rounded-lg flex items-center justify-center text-xs font-bold ${
                  hasBankPassbook ? 'bg-emerald-500 text-white' : 'bg-white/10 text-slate-500'
                }`}>
                  {hasBankPassbook ? '✓' : ''}
                </span>
              </button>

              <button 
                onClick={() => setHasTaxID(!hasTaxID)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all ${
                  hasTaxID 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-white' 
                    : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                <span className="text-xs font-medium">{t.taxId}</span>
                <span className={`h-5 w-5 rounded-lg flex items-center justify-center text-xs font-bold ${
                  hasTaxID ? 'bg-emerald-500 text-white' : 'bg-white/10 text-slate-500'
                }`}>
                  {hasTaxID ? '✓' : ''}
                </span>
              </button>

            </div>

            {/* Verdict block */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wide block">
                {t.eligibleStatus}
              </span>

              <div className={`p-4 rounded-2xl border flex items-center space-x-3 ${
                isEligible 
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' 
                  : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
              }`}>
                {isEligible ? <ShieldCheck className="h-6 w-6 text-emerald-400" /> : <Info className="h-6 w-6 text-rose-400" />}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider">{isEligible ? t.ready : t.notReady}</h4>
                  <p className="text-[10px] text-slate-400 leading-normal mt-0.5">
                    {isEligible 
                      ? "Aadhaar, Land registers, and bank clearances verified. Application stream unlocked!"
                      : "Verification requires Aadhaar + Land Record PATTA + Bank Passbook to unlock enrollment channels."
                    }
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
