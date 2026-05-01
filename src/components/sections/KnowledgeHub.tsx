import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark, Map, IdCard, DollarSign, Clock, ArrowUpRight, X, ChevronRight, HelpCircle, ShieldCheck, Monitor, Scale, CheckCircle } from 'lucide-react';
import { topicsData, Topic } from '@/src/data/topics';
import { cn } from '@/src/lib/utils';
import { useStore } from '@/src/store/useStore';
import { useLanguage } from '@/src/contexts/LanguageContext';

import { useRegion } from '@/src/contexts/RegionContext';

export const KnowledgeHub: React.FC = () => {
  const { t } = useLanguage();
  const { region } = useRegion();
  const regionalTopics = topicsData[region] || topicsData['IN'];
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const { progress, updateProgress, addXP } = useStore();

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic);
    if (!progress[topic.id]) {
      addXP(10);
      updateProgress(topic.id, 100);
    }
  };

  const IconMap: any = {
    Landmark,
    Map,
    IdCard,
    DollarSign,
    ShieldCheck,
    Monitor,
    Scale,
    CheckCircle
  };

  return (
    <section id="learn" className="py-24 bg-dark-base px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="font-mono-tech text-power-gold text-xs tracking-widest uppercase mb-2 block">{t.education.subtitle}</span>
          <h2 className="text-5xl md:text-7xl">{t.education.title} ({region})</h2>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {regionalTopics.map((topic) => {
            const Icon = IconMap[topic.icon] || Landmark;
            const isCompleted = progress[topic.id] === 100;

            return (
              <motion.div
                key={topic.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -8 }}
                onClick={() => handleTopicClick(topic)}
                className="glass-panel p-8 cursor-pointer relative group transition-all duration-300 hover:border-power-gold/50 perspective-1000"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className={cn(
                    "p-3 rounded-lg border",
                    isCompleted ? "bg-power-gold/10 border-power-gold/30 text-power-gold" : "bg-white/5 border-white/10 text-white/50"
                  )}>
                    <Icon size={24} />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-mono-tech text-[8px] text-white/30 uppercase mb-1">{t.education.status}</span>
                    {isCompleted ? (
                       <span className="text-power-gold font-mono-tech text-[10px]">{t.education.read}</span>
                    ) : (
                       <div className="w-10 h-[2px] bg-white/10" />
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[8px] font-mono-tech uppercase text-white/40">
                      {topic.level}
                    </span>
                    <div className="flex items-center gap-1 text-[8px] font-mono-tech uppercase text-white/40">
                      <Clock size={10} /> {topic.time}
                    </div>
                  </div>
                  <h3 className="text-2xl leading-tight group-hover:text-power-gold transition-colors">{(t.education.topics as any)[topic.id]?.title || topic.title}</h3>
                </div>

                <div className="mt-8 flex items-center gap-2 text-white/30 font-mono-tech text-[10px] uppercase group-hover:text-white transition-colors">
                  {t.education.explore} <ArrowUpRight size={12} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Deep Dive Modal */}
      <AnimatePresence>
        {selectedTopic && (
          <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTopic(null)}
              className="absolute inset-0 bg-dark-base/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl bg-dark-base border-t md:border border-white/10 p-8 md:rounded-2xl max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedTopic(null)}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
                id="close-topic-modal"
              >
                <X size={20} />
              </button>

              <div className="mb-12">
                <span className="font-mono-tech text-power-gold text-[10px] uppercase tracking-[0.3em] mb-4 block">Civic Deep Dive 00{regionalTopics.indexOf(selectedTopic) + 1}</span>
                <h2 className="text-5xl md:text-6xl uppercase leading-none mb-6">{(t.education.topics as any)[selectedTopic.id]?.title || selectedTopic.title}</h2>
                <div className="flex gap-4">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono-tech text-white/60">Level: {selectedTopic.level}</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono-tech text-white/60">Estimate: {selectedTopic.time}</span>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-xl leading-relaxed text-white/80 font-body first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-power-gold">
                  {(t.education.topics as any)[selectedTopic.id]?.content || selectedTopic.content}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mt-12">
                  <div className="p-6 glass-panel border-l-4 border-l-power-gold">
                     <p className="text-xs uppercase font-mono-tech text-white/40 mb-2">{t.education.takeaway}</p>
                     <p className="text-sm">{t.education.foundational}</p>
                  </div>
                  <div className="p-6 glass-panel bg-power-gold/5 border-power-gold/20 flex flex-col justify-center items-center text-center">
                     <Landmark className="text-power-gold mb-2" size={24} />
                     <p className="text-[10px] font-mono-tech uppercase">{t.education.federalGuide}</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="font-mono-tech text-[10px] uppercase tracking-widest text-white/40">{t.education.verified}</span>
                 </div>
                 <button 
                   onClick={() => {
                     setSelectedTopic(null);
                     document.querySelector('#quiz')?.scrollIntoView({ behavior: 'smooth' });
                   }}
                   className="bg-power-gold text-dark-base px-6 py-2 font-display text-lg tracking-wide rounded-sm hover:scale-105 transition-transform" 
                   id="quiz-me-button"
                 >
                   {t.education.quizMe}
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
