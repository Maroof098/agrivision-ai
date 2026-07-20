import React, { useState } from 'react';
import { 
  Users, 
  Video, 
  Clock, 
  Check, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  HelpCircle, 
  AlertCircle,
  RefreshCw,
  Phone,
  MessageSquare
} from 'lucide-react';
import { Expert } from '../types';
import { EXPERTS } from '../data';

interface ExpertConsultationViewProps {
  lang: 'en' | 'hi' | 'te';
}

export default function ExpertConsultationView({ lang }: ExpertConsultationViewProps) {
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [bookingSlot, setBookingSlot] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const dictionary = {
    en: {
      title: "Pathology Expert Panel & Virtual Consultation",
      subtitle: "Join secure virtual video sessions with agricultural pathologists and university extension agents for complex crop disease diagnosis.",
      contactBtn: "Book Digital Slot",
      videoBtn: "Initialize Live Video Session",
      specialty: "Acre Specialty",
      rating: "User Rating",
      emptyCall: "Select an active expert below to start a secure video call.",
      confirmTitle: "Virtual Appointment Booked!",
      confirmSub: "Your agronomist video credentials have been synchronized. Join at the selected timing.",
      availableTimes: "Select Available Slot (Today)",
      endVideo: "Terminate Video Connection",
      expertStatus: "Extension Specialist"
    },
    hi: {
      title: "कृषि वैज्ञानिक पैनल और वर्चुअल परामर्श",
      subtitle: "जटिल फसल रोगों के निदान के लिए कृषि वैज्ञानिकों और विश्वविद्यालय के विशेषज्ञों के साथ वर्चुअल वीडियो सत्र में शामिल हों।",
      contactBtn: "डिजिटल स्लॉट बुक करें",
      videoBtn: "लाइव वीडियो सत्र शुरू करें",
      specialty: "विशेषज्ञता",
      rating: "उपयोगकर्ता रेटिंग",
      emptyCall: "सुरक्षित वीडियो कॉल शुरू करने के लिए नीचे दिए गए विशेषज्ञों में से चुनें।",
      confirmTitle: "वर्चुअल अपॉइंटमेंट बुक हो गया!",
      confirmSub: "आपका वीडियो क्रेडेंशियल सिंक हो गया है। चुने हुए समय पर शामिल हों।",
      availableTimes: "उपलब्ध समय स्लॉट चुनें (आज)",
      endVideo: "वीडियो कनेक्शन समाप्त करें",
      expertStatus: "कृषि वैज्ञानिक"
    },
    te: {
      title: "వ్యవసాయ నిపుణులతో నేరుగా ముఖాముఖి",
      subtitle: "పంటల తెగుళ్లు మరియు సమస్యలపై వ్యవసాయ విశ్వవిద్యాలయ నిపుణులతో వీడియో కాల్ ద్వారా సలహాలు పొందండి.",
      contactBtn: "స్లాట్ బుక్ చేయి",
      videoBtn: "వీడియో కాల్ స్టార్ట్ చేయి",
      specialty: "విభాగం",
      rating: "రేటింగ్",
      emptyCall: "వీడియో కాల్ ప్రారంభించడానికి నిపుణులను ఎంచుకోండి.",
      confirmTitle: "అపాయింట్మెంట్ బుక్ చేయబడింది!",
      confirmSub: "మీ వీడియో కాల్ లింక్ సిద్ధంగా ఉంది. ఎంచుకున్న సమయానికి జాయిన్ అవ్వండి.",
      availableTimes: "స్లాట్ ఎంచుకోండి (ఈరోజు)",
      endVideo: "కాల్ ముగించు",
      expertStatus: "వ్యవసాయ పరిశోధకులు"
    }
  };

  const t = dictionary[lang] || dictionary.en;

  const handleBook = (slot: string) => {
    setLoading(true);
    setTimeout(() => {
      setBookingSlot(slot);
      setBookingConfirmed(true);
      setLoading(false);
    }, 800);
  };

  const handleStartCall = () => {
    setIsVideoCallActive(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 bg-white rounded-3xl border border-slate-100 shadow-sm gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-600 mb-1">
            <Users className="h-5 w-5 animate-pulse" />
            <span className="text-xs font-bold font-mono tracking-wider uppercase">University Extension Panel</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight">{t.title}</h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">{t.subtitle}</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Experts Listing (Col 7) */}
        <div className="lg:col-span-7 space-y-4">
          {EXPERTS.map((expert) => {
            const isSelected = selectedExpert?.id === expert.id;
            return (
              <div 
                key={expert.id}
                onClick={() => {
                  setSelectedExpert(expert);
                  setBookingConfirmed(false);
                  setBookingSlot(null);
                }}
                className={`bg-white p-5 rounded-3xl border transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  isSelected ? 'border-emerald-500 ring-2 ring-emerald-500/10' : 'border-slate-100 hover:border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center space-x-4">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <img 
                      src={expert.avatarUrl} 
                      alt={expert.name} 
                      className="h-14 w-14 rounded-2xl object-cover border border-slate-100"
                    />
                    <span className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 border-2 border-white rounded-full" />
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-bold text-slate-800">{expert.name}</h3>
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-2 py-0.5 rounded-[9px] text-[8px] font-mono uppercase tracking-wider font-bold">
                        {t.expertStatus}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">{expert.institution}</p>
                    <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider mt-1.5 flex items-center">
                      <span className="mr-1">★</span> {expert.rating} {t.rating}
                    </p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-[10px] text-slate-400 block font-mono">Specialty:</span>
                  <span className="text-xs font-bold text-slate-800 block mt-0.5">{expert.specialty}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Booking & Video Session container (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Active Call display */}
          {isVideoCallActive && selectedExpert && (
            <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden text-center space-y-4">
              <span className="absolute top-4 left-4 bg-rose-600 text-white text-[9px] font-bold font-mono tracking-widest px-2.5 py-1 rounded-lg animate-pulse uppercase">
                🔴 LIVE CONSULTATION
              </span>

              {/* Fake Video Screen container */}
              <div className="w-full aspect-video rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center relative overflow-hidden">
                <img 
                  src={selectedExpert.avatarUrl} 
                  alt={selectedExpert.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-slate-800 shadow-xl"
                />
                
                {/* Farmer mini preview bottom right */}
                <div className="absolute bottom-3 right-3 w-16 h-20 bg-slate-950/80 border border-slate-700 rounded-xl flex items-center justify-center">
                  <span className="text-[8px] font-mono font-bold text-slate-400">YOU (CAM)</span>
                </div>

                <div className="absolute bottom-3 left-3 bg-black/60 px-2 py-1 rounded text-[9px] font-mono text-emerald-400">
                  Audio decibel levels stable
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white font-mono">{selectedExpert.name}</h4>
                <p className="text-xs text-slate-400">{selectedExpert.institution}</p>
              </div>

              <button
                onClick={() => setIsVideoCallActive(false)}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-md"
              >
                {t.endVideo}
              </button>
            </div>
          )}

          {/* Slots & Bookings layout */}
          {!isVideoCallActive && (
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5">
              {selectedExpert ? (
                <>
                  <div className="flex items-center space-x-3.5 pb-4 border-b border-slate-50">
                    <img 
                      src={selectedExpert.avatarUrl} 
                      alt={selectedExpert.name}
                      className="h-10 w-10 rounded-xl object-cover border"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 font-mono">{selectedExpert.name}</h4>
                      <span className="text-[10px] text-slate-400">{selectedExpert.specialty} expert</span>
                    </div>
                  </div>

                  {bookingConfirmed ? (
                    <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-2xl text-center space-y-3">
                      <CheckCircle className="h-8 w-8 text-emerald-600 mx-auto" />
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider">{t.confirmTitle}</h4>
                        <p className="text-[10px] text-emerald-600/95 leading-normal mt-1">
                          {t.confirmSub}
                        </p>
                      </div>

                      <div className="p-2.5 bg-white/60 border border-emerald-200/50 rounded-xl text-xs font-mono font-bold text-emerald-900 inline-block">
                        Slot: {bookingSlot} (Today)
                      </div>

                      <button
                        onClick={handleStartCall}
                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/10 flex items-center justify-center space-x-2"
                      >
                        <Video className="h-4 w-4 animate-pulse" />
                        <span>{t.videoBtn}</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide block flex items-center">
                        <Clock className="h-4 w-4 text-emerald-500 mr-1.5" />
                        <span>{t.availableTimes}</span>
                      </span>

                      <div className="grid grid-cols-2 gap-2">
                        {selectedExpert.availableSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => handleBook(slot)}
                            className="py-2 px-3 text-xs bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-300 text-slate-700 hover:text-emerald-800 font-semibold rounded-xl text-center transition-all"
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100 text-slate-400 text-xs">
                  {t.emptyCall}
                </div>
              )}
            </div>
          )}

          {/* Expert disclaimer */}
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[10px] font-bold text-slate-800 uppercase tracking-wide font-mono">pathologist SLA</h4>
              <p className="text-xs text-slate-500 leading-normal mt-1">
                Consultants are verified university scholars. Calls are end-to-end encrypted to preserve patent diagnostics.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
