import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  RefreshCw, 
  Sparkles, 
  HelpCircle,
  Play,
  Languages,
  Check,
  Pause
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'farmer' | 'assistant';
  text: string;
  timestamp: string;
  isAudioPlaying?: boolean;
}

interface ChatbotViewProps {
  lang: 'en' | 'hi' | 'te';
}

export default function ChatbotView({ lang }: ChatbotViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello! I am your AI Agri-Pathology and Precision Farming assistant. How can I help you today? You can choose a quick question below or talk using your microphone.",
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeakingEnabled, setIsSpeakingEnabled] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Browser Speech Recognition state
  const recognitionRef = useRef<any>(null);

  const dictionary = {
    en: {
      title: "AgriVision AI Assistant",
      subtitle: "Ask questions regarding plant diseases, irrigation intervals, fertilizer dosage, or financial subsidies in English, Hindi, or Telugu.",
      inputPlaceholder: "Ask about blight, irrigation, cotton fertilizer...",
      micPermission: "Mic active. Speak now...",
      quickPrompts: [
        "My tomato leaves have yellow spots.",
        "When should I irrigate?",
        "Best fertilizer for cotton?",
        "How do I apply for PM-Kisan?"
      ],
      quickPromptsHeader: "Common Farmer Queries",
      speakingToggleOn: "Voice Output Active",
      speakingToggleOff: "Voice Output Muted",
      recordTooltip: "Voice Input (Speech-to-Text)"
    },
    hi: {
      title: "एग्रीविज़न AI कृषि सहायक",
      subtitle: "फसल रोग, सिंचाई, उर्वरक की खुराक, या सरकारी सब्सिडी के बारे में अंग्रेजी, हिंदी या तेलुगु में प्रश्न पूछें।",
      inputPlaceholder: "पीला मोज़ेक, सिंचाई समय, या कपास खाद के बारे में पूछें...",
      micPermission: "माइक सक्रिय है। बोलें...",
      quickPrompts: [
        "मेरे टमाटर के पत्तों पर पीले धब्बे हैं।",
        "मुझे सिंचाई कब करनी चाहिए?",
        "कपास के लिए सबसे अच्छा उर्वरक क्या है?",
        "पीएम-किसान के लिए आवेदन कैसे करें?"
      ],
      quickPromptsHeader: "अक्सर पूछे जाने वाले प्रश्न",
      speakingToggleOn: "आवाज उत्तर सक्रिय",
      speakingToggleOff: "आवाज उत्तर म्यूट",
      recordTooltip: "आवाज इनपुट"
    },
    te: {
      title: "AI వ్యవసాయ సహాయకుడు",
      subtitle: "ఆకు తెగుళ్ళు, నీటి యాజమాన్యం, ఎరువుల వాడకం, లేదా ప్రభుత్వ రాయితీల గురించి తెలుగు, హిందీ లేదా ఇంగ్లీషులో అడగండి.",
      inputPlaceholder: "టమోటా ఆకు మచ్చలు, పత్తి ఎరువులు, పంట బీమా గురించి అడగండి...",
      micPermission: "మైక్ ఆన్ లో ఉంది. మాట్లాడండి...",
      quickPrompts: [
        "నా టమోటా ఆకులపై పసుపు మచ్చలు వచ్చాయి.",
        "నేను ఎప్పుడు నీరు పెట్టాలి?",
        "పత్తి పంటకు ఏ ఎరువులు ఉత్తమం?",
        "పిఎం-కిసాన్ సబ్సిడీ ఎలా పొందాలి?"
      ],
      quickPromptsHeader: "సాధారణ ప్రశ్నలు",
      speakingToggleOn: "వాయిస్ రిప్లై ఆన్",
      speakingToggleOff: "వాయిస్ రిప్లై ఆఫ్",
      recordTooltip: "వాయిస్ టైపింగ్"
    }
  };

  const t = dictionary[lang] || dictionary.en;

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = lang === 'hi' ? 'hi-IN' : lang === 'te' ? 'te-IN' : 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognition.onerror = (err: any) => {
        console.error("Speech Recognition Error:", err);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, [lang]);

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Handle voice recording trigger
  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please use Chrome or Safari.");
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  // Text to Speech playback engine (SaaS Craftsmanship!)
  const speakText = async (text: string, msgId: string) => {
    if (!isSpeakingEnabled) return;

    // Set playing state on the message
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isAudioPlaying: true } : m));

    try {
      // Step A: Attempt server-side Gemini TTS
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language: lang })
      });
      const data = await response.json();

      if (data.audio) {
        // Decode and play PCM / Base64 binary
        const audioSrc = `data:audio/wav;base64,${data.audio}`;
        const audio = new Audio(audioSrc);
        audio.onended = () => {
          setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isAudioPlaying: false } : m));
        };
        audio.play();
        return;
      } else {
        throw new Error("No server-side audio returned");
      }
    } catch (e) {
      console.warn("Gemini TTS failed, falling back to browser SpeechSynthesis.", e);
    }

    // Step B: Robust Fallback using standard browser SpeechSynthesis
    if ('speechSynthesis' in window) {
      // Cancel previous utterances
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'hi' ? 'hi-IN' : lang === 'te' ? 'te-IN' : 'en-US';
      
      utterance.onend = () => {
        setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isAudioPlaying: false } : m));
      };
      utterance.onerror = () => {
        setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isAudioPlaying: false } : m));
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isAudioPlaying: false } : m));
    }
  };

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsgId = "user-" + Date.now();
    const newUserMessage: ChatMessage = {
      id: userMsgId,
      sender: 'farmer',
      text: textToSend,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setLoading(true);

    try {
      // Filter last 6 messages to provide context
      const contextHistory = messages.slice(-6).map(m => ({
        sender: m.sender === 'farmer' ? 'farmer' : 'assistant',
        text: m.text
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: contextHistory,
          language: lang
        })
      });

      const data = await response.json();
      const assistantMsgId = "assistant-" + Date.now();
      
      const assistantMessage: ChatMessage = {
        id: assistantMsgId,
        sender: 'assistant',
        text: data.text,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Auto-speak response if enabled
      if (isSpeakingEnabled) {
        speakText(data.text, assistantMsgId);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: "err-" + Date.now(),
        sender: 'assistant',
        text: "My apologies, I am having issues connecting to the precision agronomist database. Please try again.",
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 bg-white rounded-3xl border border-slate-100 shadow-sm gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-600 mb-1">
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs font-bold font-mono tracking-wider uppercase">Farming Chatbot Core</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight">{t.title}</h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">{t.subtitle}</p>
        </div>

        {/* Audio Output switch */}
        <button
          onClick={() => setIsSpeakingEnabled(!isSpeakingEnabled)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 border ${
            isSpeakingEnabled 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
              : 'bg-slate-50 text-slate-500 border-slate-200'
          }`}
        >
          {isSpeakingEnabled ? <Volume2 className="h-4 w-4 text-emerald-600 animate-pulse" /> : <VolumeX className="h-4 w-4" />}
          <span>{isSpeakingEnabled ? t.speakingToggleOn : t.speakingToggleOff}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Quick presets panel (Col 4) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center">
            <HelpCircle className="h-4.5 w-4.5 text-emerald-500 mr-2" />
            <span>{t.quickPromptsHeader}</span>
          </h3>

          <div className="flex flex-col space-y-2">
            {t.quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="p-3 text-left bg-slate-50 hover:bg-emerald-50/40 text-xs font-medium text-slate-700 hover:text-emerald-800 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Main chat box (Col 8) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100 shadow-sm h-[480px] flex flex-col justify-between overflow-hidden">
          
          {/* Chat message logs */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
            {messages.map((msg) => {
              const isAssistant = msg.sender === 'assistant';
              return (
                <div 
                  key={msg.id}
                  className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[75%] rounded-2xl p-4 text-xs leading-relaxed ${
                    isAssistant 
                      ? 'bg-slate-100 text-slate-800 rounded-tl-none' 
                      : 'bg-emerald-600 text-white rounded-tr-none shadow-md shadow-emerald-600/10'
                  }`}>
                    <p>{msg.text}</p>
                    
                    <div className="mt-2.5 flex items-center justify-between border-t pt-1.5 border-black/5 text-[9px] text-slate-400">
                      <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      
                      {/* Audioplay trigger button */}
                      {isAssistant && (
                        <button
                          onClick={() => speakText(msg.text, msg.id)}
                          className={`p-1 rounded-md hover:bg-slate-200 text-slate-600 transition-all flex items-center space-x-1 ${
                            msg.isAudioPlaying ? 'bg-emerald-100 text-emerald-800 font-bold animate-pulse' : ''
                          }`}
                        >
                          <Volume2 className="h-3 w-3" />
                          <span>{msg.isAudioPlaying ? 'Playing' : 'Listen'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 rounded-2xl rounded-tl-none p-4 text-xs text-slate-500 flex items-center space-x-2">
                  <RefreshCw className="h-4.5 w-4.5 animate-spin text-emerald-600" />
                  <span>AgriVision AI is compiling answer...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Form input controls */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center space-x-3">
            
            {/* Voice record microphone button */}
            <button
              onClick={toggleRecording}
              className={`p-3 rounded-xl transition-all shadow-sm ${
                isRecording 
                  ? 'bg-rose-500 text-white animate-pulse ring-4 ring-rose-500/20' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title={t.recordTooltip}
            >
              {isRecording ? <MicOff className="h-4.5 w-4.5" /> : <Mic className="h-4.5 w-4.5" />}
            </button>

            {/* Input text box */}
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder={isRecording ? t.micPermission : t.inputPlaceholder}
              disabled={isRecording}
              className="flex-1 bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 py-3 px-4 rounded-xl text-xs text-slate-800"
            />

            {/* Send button */}
            <button
              onClick={() => handleSend(input)}
              disabled={!input.trim() || loading}
              className="p-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-xl shadow-md shadow-emerald-600/10 transition-all flex items-center justify-center"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
