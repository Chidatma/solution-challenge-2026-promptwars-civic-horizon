import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Activity, Globe, Zap, Clock } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useLanguage } from '@/src/contexts/LanguageContext';

const mockData = [
  { name: 'State A', votes: 4000, color: '#FF6B00' },
  { name: 'State B', votes: 3000, color: '#00D4FF' },
  { name: 'State C', votes: 2000, color: '#FFD700' },
  { name: 'State D', votes: 2780, color: '#FF6B00' },
  { name: 'State E', votes: 1890, color: '#00D4FF' },
  { name: 'State F', votes: 2390, color: '#FFD700' },
];

const initialNewsFeed = [
  { id: 1, time: '2m ago', title: 'Polls open across Eastern Standard Time districts' },
  { id: 2, time: '15m ago', title: 'High voter turnout reported in Battleground County' },
  { id: 3, time: '40m ago', title: 'Electoral Commission confirms cybersecurity systems stable' },
  { id: 4, time: '1h ago', title: 'Early voting figures surpass 2022 records' },
];

const liveNewsPool = [
  'Voter assistance hotlines reporting record low wait times',
  'New cybersecurity patch deployed to all state databases successfully',
  'International observers arrive at major polling centers',
  'Youth voter engagement up 12% compared to previous cycles',
  'Weather conditions holding steady across key voting regions',
  'Security systems detect and neutralize minor DDoS attempt on info portal',
  'Preliminary turnout data suggests record-breaking numbers in metropolitan areas',
  'Local officials confirm voting machines operating at 100% capacity',
];

export const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const [news, setNews] = useState(initialNewsFeed);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomNews = liveNewsPool[Math.floor(Math.random() * liveNewsPool.length)];
      setNews(prev => {
        const newItem = {
          id: Date.now(),
          time: 'Just now',
          title: randomNews
        };
        // Keep only top 5 items
        return [newItem, ...prev].slice(0, 5);
      });
    }, 8000); // Update every 8 seconds for a "live" feel

    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="py-24 bg-dark-base px-6">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="font-mono-tech text-civic-blue text-xs tracking-widest uppercase mb-2 block">{t.dashboard.subtitle}</span>
            <h2 className="text-5xl md:text-7xl">{t.dashboard.title}</h2>
          </div>
          <div className="flex gap-4">
             <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-500 font-mono-tech text-[10px] uppercase">{t.dashboard.liveFeeds}</span>
             </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Chart Card */}
          <div className="lg:col-span-2 glass-panel p-8 min-h-[400px] flex flex-col luminous-border">
            <div className="flex justify-between items-center mb-12">
               <h3 className="font-command text-xl tracking-tighter">{t.dashboard.participation}</h3>
               <Globe className="text-white/20" size={20} />
            </div>
            <div className="flex-1 w-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData}>
                  <XAxis 
                    dataKey="name" 
                    stroke="rgba(255,255,255,0.2)" 
                    fontSize={10} 
                    fontFamily="Space Mono"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ 
                      backgroundColor: '#020817', 
                      borderColor: 'rgba(255,255,255,0.1)',
                      color: '#fff',
                      fontFamily: 'Space Mono',
                      fontSize: '10px'
                    }}
                  />
                  <Bar dataKey="votes" radius={[4, 4, 0, 0]}>
                    {mockData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stats & News Sidebar */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
               <div className="glass-panel p-6 border-l-4 border-l-vote-orange">
                  <Activity className="text-vote-orange mb-4" size={20} />
                  <p className="text-2xl font-command mb-1">162M</p>
                  <p className="font-mono-tech text-[8px] text-white/30 uppercase">{t.dashboard.projectedTurnout}</p>
               </div>
               <div className="glass-panel p-6 border-l-4 border-l-civic-blue">
                  <Zap className="text-civic-blue mb-4" size={20} />
                  <p className="text-2xl font-command mb-1">98.4%</p>
                  <p className="font-mono-tech text-[8px] text-white/30 uppercase">{t.dashboard.precinctsReady}</p>
               </div>
            </div>

            {/* Live Feed */}
            <div className="glass-panel p-8 flex-1">
               <div className="flex items-center gap-2 mb-8">
                 <Clock size={16} className="text-white/40" />
                 <h3 className="font-command text-xs tracking-widest uppercase">{t.dashboard.newsHeader}</h3>
               </div>
               <div className="space-y-6 relative overflow-hidden min-h-[300px]">
                 <AnimatePresence initial={false} mode="popLayout">
                   {news.map((item) => (
                     <motion.div 
                       key={item.id} 
                       initial={{ opacity: 0, x: -20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: 20 }}
                       transition={{ duration: 0.5, ease: "easeOut" }}
                       className="group cursor-pointer border-l border-white/5 pl-4 py-2"
                     >
                       <p className="text-vote-orange font-mono-tech text-[8px] mb-1">{item.time}</p>
                       <p className="text-sm text-white/70 group-hover:text-white transition-colors leading-snug">
                         {item.title}
                       </p>
                     </motion.div>
                   ))}
                 </AnimatePresence>
               </div>
               <button 
                onClick={() => document.getElementById('learn')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full mt-8 pt-6 border-t border-white/5 text-center font-mono-tech text-[8px] uppercase tracking-[0.2em] text-white/20 hover:text-white transition-colors"
               >
                 {t.dashboard.fullArchive}
               </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
