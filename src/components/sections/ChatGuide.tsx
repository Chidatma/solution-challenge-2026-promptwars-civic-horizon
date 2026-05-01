import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles, X, TrendingUp, Users, PieChart as PieChartIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  PieChart, 
  Pie, 
  LineChart, 
  Line 
} from 'recharts';
import { cn } from '@/src/lib/utils';
import { useStore } from '@/src/store/useStore';
import { useLanguage } from '@/src/contexts/LanguageContext';

interface ChartData {
  type: 'bar' | 'pie' | 'line';
  data: any[];
  title?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  chartData?: ChartData;
}

export const ChatGuide: React.FC = () => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: t.chatGuide.greeting }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const addXP = useStore(state => state.addXP);

  // Update initial message when language changes if no conversation has started beyond greeting
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'assistant') {
      setMessages([{ role: 'assistant', content: t.chatGuide.greeting }]);
    }
  }, [language, t.chatGuide.greeting]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleAIResponse = (text: string) => {
    let content = text;
    let chartData: ChartData | undefined;

    // Enhanced regex to match [CHART_DATA: {...}]
    const chartMatch = text.match(/\[CHART_DATA:\s*(\{.*?\})\s*\]/s);
    if (chartMatch) {
      try {
        chartData = JSON.parse(chartMatch[1]);
        // Remove the chart tag from the displayed text
        content = text.replace(/\[CHART_DATA:.*?\]/s, '').trim();
      } catch (e) {
        console.error("Failed to parse chart data:", e);
      }
    }

    setMessages(prev => [...prev, { role: 'assistant', content, chartData }]);
    addXP(5);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages
        .filter(m => m && (m.role === 'user' || m.role === 'assistant'))
        .map(m => ({ role: m.role, content: m.content }));

      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage,
          history,
          language,
        }),
      });

      const contentType = resp.headers.get('content-type') ?? '';
      if (!contentType.toLowerCase().includes('application/json')) {
        const preview = (await resp.text()).slice(0, 200);
        throw new Error(`Chat API returned non-JSON (${resp.status}): ${preview}`);
      }

      if (!resp.ok) {
        const retryAfterHeader = resp.headers.get('retry-after');
        let details = '';
        try {
          const errJson = (await resp.json()) as { error?: string };
          if (errJson?.error) details = errJson.error;
        } catch {
          // ignore
        }

        if (resp.status === 429 && retryAfterHeader) {
          const secs = Number.parseInt(retryAfterHeader, 10);
          if (Number.isFinite(secs) && secs > 0) {
            throw new Error(`${details || 'Rate limit exceeded'}. Retry in ${secs}s.`);
          }
        }

        throw new Error(details ? `Chat request failed: ${details}` : `Chat request failed (${resp.status})`);
      }

      const data = (await resp.json()) as { text?: string };
      if (data.text) handleAIResponse(data.text);
    } catch (error) {
      console.error(error);
      const errMsg = error instanceof Error ? error.message : '';
      let friendly = t.chatGuide.error;

      if (errMsg.includes('Rate limit exceeded')) {
        friendly = language === 'hi'
          ? 'बहुत अधिक अनुरोध हो गए हैं। कृपया 30 सेकंड बाद पुनः प्रयास करें।'
          : 'Too many requests right now. Please try again in about 30 seconds.';
      } else if (errMsg.includes('Missing GEMINI_API_KEY')) {
        friendly = language === 'hi'
          ? 'सर्वर कॉन्फ़िगरेशन में समस्या है (API key missing)।'
          : 'Server configuration issue (missing API key).';
      } else if (errMsg.includes('Invalid Gemini model configured')) {
        friendly = language === 'hi'
          ? 'सर्वर मॉडल कॉन्फ़िगरेशन गलत है।'
          : 'Server model configuration is invalid.';
      }

      setMessages(prev => [...prev, { role: 'assistant', content: friendly }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = t.chatGuide.suggestions;

  return (
    <section id="chat-ai" className="bg-dark-base py-24 px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="w-16 h-16 bg-vote-orange/20 border border-vote-orange/50 rounded-full mx-auto flex items-center justify-center mb-6"
          >
            <Bot className="text-vote-orange w-8 h-8" />
          </motion.div>
          <h2 className="text-5xl mb-4 uppercase">{t.chatGuide.title}</h2>
          <p className="text-white/50 font-mono-tech uppercase text-xs tracking-widest">{t.chatGuide.subtitle}</p>
        </div>

        <div className="glass-panel h-[600px] flex flex-col relative overflow-hidden luminous-border">
          {/* Chat Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono-tech text-[10px] uppercase tracking-widest text-white/60">Electra Core v2.4</span>
            </div>
            <Sparkles className="w-4 h-4 text-vote-orange/50" />
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 chat-scrollbar">
            {messages.map((m, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={idx}
                className={cn(
                  "flex gap-4 max-w-[85%]",
                  m.role === 'user' ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border",
                  m.role === 'assistant' ? "bg-vote-orange/10 border-vote-orange/30 text-vote-orange" : "bg-white/10 border-white/20 text-white"
                )}>
                  {m.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className={cn(
                  "p-4 rounded-2xl text-sm leading-relaxed",
                  m.role === 'assistant' ? "bg-white/5 border border-white/10 text-white/80" : "bg-vote-orange text-white ml-auto"
                )}>
                  <div className="prose prose-invert prose-sm mb-4">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>

                  {m.chartData && (
                    <div className="mt-4 bg-white/[0.03] border border-white/10 rounded-lg p-4 h-64">
                      {m.chartData.title && (
                        <p className="text-[10px] font-mono-tech uppercase text-vote-orange mb-4 tracking-tighter">
                          Visual Representation: {m.chartData.title}
                        </p>
                      )}
                      <ResponsiveContainer width="100%" height="85%">
                        {m.chartData.type === 'bar' ? (
                          <BarChart data={m.chartData.data}>
                            <XAxis dataKey="name" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #333', fontSize: '10px' }}
                              itemStyle={{ color: '#FF6B00' }}
                            />
                            <Bar dataKey="value" fill="#FF6B00" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        ) : m.chartData.type === 'line' ? (
                          <LineChart data={m.chartData.data}>
                            <XAxis dataKey="name" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #333', fontSize: '10px' }}
                            />
                            <Line type="monotone" dataKey="value" stroke="#FF6B00" strokeWidth={2} dot={{ r: 4, fill: '#FF6B00' }} />
                          </LineChart>
                        ) : (
                          <PieChart>
                            <Pie
                              data={m.chartData.data}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={60}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {m.chartData.data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#FF6B00' : '#4D9FFF'} />
                              ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #333', fontSize: '10px' }}
                            />
                          </PieChart>
                        )}
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex gap-4 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-vote-orange/10 border-vote-orange/30 flex items-center justify-center">
                  <Bot size={16} className="text-vote-orange" />
                </div>
                <div className="flex gap-1 items-center p-4">
                  {[1, 2, 3].map(i => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                      className="w-1.5 h-1.5 rounded-full bg-vote-orange"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-white/10 bg-white/[0.02]">
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => { setInput(s); }}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono-tech uppercase text-white/50 hover:border-vote-orange hover:text-white transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.chatGuide.placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-6 pr-14 font-body text-sm focus:outline-none focus:border-vote-orange transition-colors"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-vote-orange rounded-lg text-white disabled:opacity-50 disabled:grayscale transition-all"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
