import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Check, 
  Sprout, 
  Droplet, 
  AlertOctagon, 
  Trash2,
  ListTodo,
  Info,
  Layers
} from 'lucide-react';

interface CropCalendarViewProps {
  lang: 'en' | 'hi' | 'te';
}

interface CalendarEvent {
  id: string;
  crop: string;
  stage: 'Sowing' | 'Vegetative' | 'Flowering' | 'Maturity' | 'Harvest';
  task: string;
  date: string;
  status: 'Pending' | 'Completed';
}

export default function CropCalendarView({ lang }: CropCalendarViewProps) {
  const [selectedCrop, setSelectedCrop] = useState('Rice');
  
  // Crop stage details
  const stages = [
    { name: "Sowing", duration: "Days 1-15", desc: "Maintain shallow soil humidity; apply starter zinc-phosphate compounds." },
    { name: "Vegetative", duration: "Days 16-60", desc: "Active foliage expansion. Maintain 5cm water level. Apply nitrogen sprays." },
    { name: "Flowering", duration: "Days 61-90", desc: "Keep critical moisture stable. Monitor for yellow stem borers or blight." },
    { name: "Maturity", duration: "Days 91-110", desc: "Dry out paddy field gradually to induce carbohydrate grain filling." },
    { name: "Harvest", duration: "Days 111-120", desc: "Secure grain humidity below 14% prior to warehousing storage." }
  ];

  const [events, setEvents] = useState<CalendarEvent[]>([
    { id: '1', crop: 'Rice', stage: 'Sowing', task: 'Sow nursery beds and apply Trichoderma seed treatment', date: '2026-07-20', status: 'Pending' },
    { id: '2', crop: 'Rice', stage: 'Vegetative', task: 'Broadcast second nitrogen urea splits (25kg/acre)', date: '2026-08-10', status: 'Pending' },
    { id: '3', crop: 'Tomato', stage: 'Flowering', task: 'Prune secondary leaf shoots to induce larger fruit set', date: '2026-07-22', status: 'Completed' }
  ]);

  const [newTask, setNewTask] = useState('');
  const [newDate, setNewDate] = useState('2026-07-21');
  const [newStage, setNewStage] = useState<'Sowing' | 'Vegetative' | 'Flowering' | 'Maturity' | 'Harvest'>('Sowing');

  const dictionary = {
    en: {
      title: "Precision Crop Sowing & Growth Calendar",
      subtitle: "Optimize sowing cycles, water schedules, and crop maturity timelines to guarantee maximum grain quality.",
      cropLabel: "Select Active Crop",
      stageVigor: "Physiological Stage Milestones",
      todoTitle: "Farm Activity Scheduler",
      addBtn: "Schedule Activity",
      taskPlaceholder: "e.g., Apply second copper fungicide spray...",
      stageLabel: "Active Plant Stage",
      dateLabel: "Scheduled Calendar Date",
      emptyTasks: "No scheduled activities found.",
      completeness: "Farming Activities Completed",
      completeTask: "Done",
      pendingTask: "Pending"
    },
    hi: {
      title: "सटीक फसल बुवाई और विकास कैलेंडर",
      subtitle: "अधिकतम अनाज गुणवत्ता की गारंटी के लिए बुवाई चक्र, सिंचाई कार्यक्रम और कटाई के समय को अनुकूलित करें।",
      cropLabel: "सक्रिय फसल चुनें",
      stageVigor: "शारीरिक विकास के महत्वपूर्ण चरण",
      todoTitle: "कृषि गतिविधि शेड्यूलर",
      addBtn: "गतिविधि जोड़ें",
      taskPlaceholder: "उदा. दूसरा कॉपर फंगसाइड छिड़काव करें...",
      stageLabel: "सक्रिय पौधा चरण",
      dateLabel: "निर्धारित कैलेंडर तिथि",
      emptyTasks: "कोई निर्धारित कृषि गतिविधियां नहीं मिलीं।",
      completeness: "कृषि गतिविधियां पूर्ण",
      completeTask: "पूर्ण",
      pendingTask: "लंबित"
    },
    te: {
      title: "పంటల సాగు & నీటి యాజమాన్య క్యాలెండర్",
      subtitle: "పంట దిగుబడిని పెంచడానికి విత్తే సమయాలు, నీటి తడులు మరియు కోత షెడ్యూల్ క్యాలెండర్.",
      cropLabel: "సక్రియ పంటను ఎంచుకోండి",
      stageVigor: "పంట ఎదుగుదల దశలు",
      todoTitle: "వ్యవసాయ పనుల క్యాలెండర్",
      addBtn: "పనిని షెడ్యూల్ చేయి",
      taskPlaceholder: "ఉదా: మందు పిచికారీ చేయు...",
      stageLabel: "పంట ప్రగతి దశ",
      dateLabel: "షెడ్యూల్ చేసిన తేదీ",
      emptyTasks: "ఎలాంటి పనులు షెడ్యూల్ చేయబడలేదు.",
      completeness: "వ్యవసాయ పనులు పూర్తి స్కోర్",
      completeTask: "పూర్తయింది",
      pendingTask: "పెండింగ్"
    }
  };

  const t = dictionary[lang] || dictionary.en;

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const ev: CalendarEvent = {
      id: "ev-" + Date.now(),
      crop: selectedCrop,
      stage: newStage,
      task: newTask,
      date: newDate,
      status: 'Pending'
    };

    setEvents([...events, ev]);
    setNewTask('');
  };

  const toggleStatus = (id: string) => {
    setEvents(events.map(ev => 
      ev.id === id ? { ...ev, status: ev.status === 'Completed' ? 'Pending' : 'Completed' } : ev
    ));
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(ev => ev.id !== id));
  };

  const cropEvents = events.filter(ev => ev.crop === selectedCrop);
  const completedCount = cropEvents.filter(ev => ev.status === 'Completed').length;
  const progressPercent = cropEvents.length > 0 ? (completedCount / cropEvents.length) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 bg-white rounded-3xl border border-slate-100 shadow-sm gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-600 mb-1">
            <Calendar className="h-5 w-5 animate-pulse" />
            <span className="text-xs font-bold font-mono tracking-wider uppercase">Phenological Timelines</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight">{t.title}</h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">{t.subtitle}</p>
        </div>

        {/* Crop filter dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-600 font-mono uppercase">{t.cropLabel}:</span>
          <select 
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="bg-slate-100 border-none focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-bold py-2 px-3.5 rounded-xl text-slate-800"
          >
            {['Rice', 'Wheat', 'Cotton', 'Tomato', 'Potato'].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Stages Timeline Visualizer (Col span 7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center">
              <Layers className="h-4.5 w-4.5 text-emerald-500 mr-2" />
              <span>{t.stageVigor} (For {selectedCrop})</span>
            </h3>

            {/* Stepper Growth phases timeline */}
            <div className="relative pl-6 border-l-2 border-emerald-100 space-y-6">
              {stages.map((stg, i) => (
                <div key={i} className="relative group">
                  {/* Indicator Dot */}
                  <span className="absolute -left-[31px] top-1.5 h-4 w-4 bg-white border-2 border-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full" />
                  </span>
                  
                  <div className="flex items-baseline justify-between gap-4">
                    <h4 className="text-xs font-bold text-slate-900 font-mono uppercase tracking-wider">{stg.name}</h4>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg">{stg.duration}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-normal font-sans">
                    {stg.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Add custom event scheduler card */}
          <form onSubmit={handleAddEvent} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Schedule New Farming task
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Task name */}
              <div className="md:col-span-2">
                <input 
                  type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)}
                  placeholder={t.taskPlaceholder}
                  className="w-full bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 py-2.5 px-3 rounded-xl text-xs text-slate-800"
                />
              </div>

              {/* Stage dropdown */}
              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-mono mb-1">{t.stageLabel}</label>
                <select 
                  value={newStage} onChange={(e) => setNewStage(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 py-2.5 px-3 rounded-xl text-xs text-slate-800"
                >
                  {['Sowing', 'Vegetative', 'Flowering', 'Maturity', 'Harvest'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-[10px] text-slate-500 uppercase font-mono mb-1">{t.dateLabel}</label>
                <input 
                  type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-xl text-xs text-slate-800 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-2"
            >
              <Plus className="h-4.5 w-4.5" />
              <span>{t.addBtn}</span>
            </button>
          </form>
        </div>

        {/* Scheduled Tasks List (Col span 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center">
              <ListTodo className="h-4.5 w-4.5 text-emerald-500 mr-2" />
              <span>{t.todoTitle} ({selectedCrop})</span>
            </h3>

            {cropEvents.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100 text-slate-400 text-xs">
                {t.emptyTasks}
              </div>
            ) : (
              <div className="space-y-3">
                {/* Progress bar */}
                <div className="p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-emerald-800">
                    <span>{t.completeness}</span>
                    <span className="font-mono">{progressPercent.toFixed(0)}%</span>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-emerald-200/50">
                    <div 
                      style={{ width: `${progressPercent}%` }} 
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-600 rounded transition-all duration-500" 
                    />
                  </div>
                </div>

                {cropEvents.map((ev) => (
                  <div 
                    key={ev.id}
                    className={`p-4 rounded-2xl border flex items-start justify-between gap-3 transition-colors ${
                      ev.status === 'Completed' 
                        ? 'bg-slate-50 border-slate-100 text-slate-400' 
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <button
                        onClick={() => toggleStatus(ev.id)}
                        className={`h-5 w-5 rounded-lg border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                          ev.status === 'Completed' 
                            ? 'bg-emerald-600 border-emerald-600 text-white' 
                            : 'border-slate-300 bg-white hover:border-slate-400'
                        }`}
                      >
                        {ev.status === 'Completed' && <Check className="h-3.5 w-3.5" />}
                      </button>

                      <div>
                        <p className={`text-xs font-medium leading-normal ${ev.status === 'Completed' ? 'line-through' : ''}`}>
                          {ev.task}
                        </p>
                        <div className="flex items-center space-x-2 mt-1.5 text-[9px] font-mono text-slate-400">
                          <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[8px] font-bold font-mono text-slate-500 uppercase">
                            {ev.stage}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-0.5" />
                            {ev.date}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteEvent(ev.id)}
                      className="text-slate-300 hover:text-rose-500 p-1 rounded-lg hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sowing Tip block */}
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-start space-x-3">
            <Info className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[10px] font-bold text-slate-800 uppercase tracking-wide font-mono">Weekly Sowing Tip</h4>
              <p className="text-xs text-slate-500 leading-normal mt-1">
                Sowing deep into loam profiles avoids surface flash evaporation. Maintain seed-bed depths between 2cm and 4cm for proper root expansion.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
