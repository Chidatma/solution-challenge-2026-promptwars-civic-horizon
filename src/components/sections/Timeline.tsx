import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timelineData } from '@/src/data/timeline-data';
import * as Icons from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { useRegion } from '@/src/contexts/RegionContext';

gsap.registerPlugin(ScrollTrigger);

export const Timeline: React.FC = () => {
  const { t } = useLanguage();
  const { region } = useRegion();
  const regionalTimeline = timelineData[region] || timelineData['IN'];
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const [selectedStep, setSelectedStep] = useState<any | null>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;
    
    // Clear previous ScrollTriggers to avoid conflicts on region change
    ScrollTrigger.getAll().filter(st => st.trigger === containerRef.current).forEach(st => st.kill());

    const scrollContainer = scrollRef.current;
    
    const getScrollAmount = () => {
      return scrollContainer.scrollWidth - window.innerWidth;
    };

    const ctx = gsap.context(() => {
      gsap.to(scrollContainer, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollContainer.scrollWidth}`,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (regionalTimeline.length - 1),
            duration: { min: 0.1, max: 0.3 },
            delay: 0,
            ease: "power1.inOut"
          },
          onUpdate: (self) => {
            const index = Math.round(self.progress * (regionalTimeline.length - 1));
            setActiveIndex(index);
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [region]);

  const scrollToStep = (direction: 'prev' | 'next') => {
    const st = ScrollTrigger.getAll().find(t => t.trigger === containerRef.current);
    if (!st) return;

    const targetIndex = direction === 'next' 
      ? Math.min(activeIndex + 1, regionalTimeline.length - 1)
      : Math.max(activeIndex - 1, 0);
    
    const progress = targetIndex / (regionalTimeline.length - 1);
    const scrollPos = st.start + (progress * (st.end - st.start));
    
    // @ts-ignore
    if (window.lenis) {
      // @ts-ignore
      window.lenis.scrollTo(scrollPos, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: scrollPos,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="timeline" 
      ref={containerRef} 
      className="h-screen bg-dark-base overflow-hidden flex flex-col justify-center py-20 relative"
    >
      <div className="px-6 mb-12 flex items-end justify-between max-w-7xl mx-auto w-full flex-shrink-0 relative z-10">
        <div>
          <span className="font-mono-tech text-vote-orange text-xs tracking-widest uppercase mb-2 block font-bold">{t.timeline.journey}</span>
          <h2 className="text-5xl md:text-7xl drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">{t.timeline.title}</h2>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => scrollToStep('prev')}
            disabled={activeIndex === 0}
            className="p-3 md:p-4 rounded-full border border-white/10 hover:border-vote-orange text-white hover:bg-vote-orange/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed group"
          >
            <Icons.ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => scrollToStep('next')}
            disabled={activeIndex === regionalTimeline.length - 1}
            className="p-3 md:p-4 rounded-full border border-white/10 hover:border-vote-orange text-white hover:bg-vote-orange/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed group"
          >
            <Icons.ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-12 px-[15vw] items-center h-full max-h-[600px] w-max">
        {regionalTimeline.map((step, idx) => {
          const IconComponent = (Icons as any)[step.icon] || Icons.HelpCircle;
          const isActive = idx === activeIndex;
          
          return (
            <div key={step.id} className="flex-shrink-0 w-[85vw] md:w-[450px] relative group h-full py-10 transition-all duration-500">
              {/* Connection Line */}
              {idx !== regionalTimeline.length - 1 && (
                <div className={cn(
                  "absolute top-1/2 -right-12 w-12 h-[1px] hidden md:block transition-all duration-500",
                  isActive ? "bg-vote-orange shadow-[0_0_10px_rgba(255,107,0,0.5)]" : "bg-white/10"
                )} />
              )}
              
              <div className={cn(
                "glass-panel p-8 transition-all duration-500 perspective-1000 h-full flex flex-col relative",
                isActive 
                  ? "border-vote-orange/60 bg-white/10 scale-105 shadow-[0_0_40px_rgba(255,107,0,0.15)] z-10" 
                  : "opacity-40 scale-95 blur-[0.5px]"
              )}>
                {/* Active Reflection */}
                {isActive && (
                  <motion.div 
                    layoutId="active-glow"
                    className="absolute inset-0 bg-gradient-to-tr from-vote-orange/5 to-transparent rounded-2xl pointer-events-none" 
                  />
                )}

                <div className="flex justify-between items-start mb-6 flex-shrink-0">
                  <div className={cn(
                    "p-3 rounded-lg border transition-all duration-500",
                    isActive ? "bg-vote-orange text-white border-vote-orange shadow-[0_0_20px_rgba(255,107,0,0.4)]" : "bg-white/5 border-white/10 text-vote-orange"
                  )}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <span className={cn(
                    "font-command text-xs transition-colors duration-500",
                    isActive ? "text-vote-orange font-bold" : "text-white/30"
                  )}>{(t.timeline.steps as any)[step.id]?.date || step.date}</span>
                </div>
                
                <span className="font-mono-tech text-[10px] text-civic-blue uppercase tracking-widest mb-2 block flex-shrink-0">
                  {step.category}
                </span>
                <h3 className={cn(
                  "text-2xl md:text-4xl mb-4 transition-colors duration-500",
                  isActive ? "text-white" : "text-white/60"
                )}>
                  {(t.timeline.steps as any)[step.id]?.title || step.title}
                </h3>
                <p className={cn(
                  "text-sm md:text-base leading-relaxed mb-6 overflow-y-auto pr-2 custom-scrollbar flex-1 transition-colors duration-500",
                  isActive ? "text-white/70" : "text-white/30"
                )}>
                  {(t.timeline.steps as any)[step.id]?.desc || step.description}
                </p>
                
                <button 
                  onClick={() => setSelectedStep(step)}
                  className={cn(
                    "flex items-center gap-2 font-mono-tech text-xs uppercase tracking-tighter transition-colors mt-auto flex-shrink-0 group/btn",
                    isActive ? "text-vote-orange" : "text-white/20"
                  )}
                >
                  {t.timeline.details} <Icons.ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <div className={cn(
                "absolute -bottom-4 left-0 font-command text-[40px] md:text-[80px] font-bold pointer-events-none transition-all duration-500 select-none",
                isActive ? "text-vote-orange/10 scale-110 tracking-widest" : "text-white/5"
              )}>
                0{idx + 1}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedStep && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStep(null)}
              className="absolute inset-0 bg-dark-base/95 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-dark-base border border-white/10 p-12 rounded-2xl shadow-[0_0_100px_rgba(255,107,0,0.15)] overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8">
                <button 
                  onClick={() => setSelectedStep(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
                >
                  <Icons.X size={24} />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-vote-orange/10 rounded-xl border border-vote-orange/30 text-vote-orange">
                  {(Icons as any)[selectedStep.icon] ? React.createElement((Icons as any)[selectedStep.icon], { size: 32 }) : <Icons.HelpCircle size={32} />}
                </div>
                <div>
                  <span className="font-mono-tech text-vote-orange text-[10px] uppercase tracking-[0.3em] block mb-1">Timeline Milestone</span>
                  <h2 className="text-4xl md:text-5xl uppercase leading-none">{(t.timeline.steps as any)[selectedStep.id]?.title || selectedStep.title}</h2>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex gap-12 border-y border-white/5 py-6">
                  <div>
                    <p className="font-mono-tech text-[8px] text-white/30 uppercase mb-1">Time Period</p>
                    <p className="text-xl font-command">{(t.timeline.steps as any)[selectedStep.id]?.date || selectedStep.date}</p>
                  </div>
                  <div>
                    <p className="font-mono-tech text-[8px] text-white/30 uppercase mb-1">Category</p>
                    <p className="text-xl font-command text-civic-blue">{selectedStep.category}</p>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-lg leading-relaxed text-white/70">
                    {(t.timeline.steps as any)[selectedStep.id]?.desc || selectedStep.description}
                  </p>
                  <p className="text-sm leading-relaxed text-white/40 mt-4 italic">
                    This phase is critical for maintaining the integrity of the democratic process, ensuring all participants adhere to federal and state regulations.
                  </p>
                </div>

                <div className="pt-8 flex justify-between items-center">
                   <div className="flex gap-2">
                     <button 
                       onClick={() => {
                        const title = (t.timeline.steps as any)[selectedStep.id]?.title || selectedStep.title;
                        const desc = (t.timeline.steps as any)[selectedStep.id]?.desc || selectedStep.description;
                        const text = `Election Timeline: ${title} - ${desc}`;
                        const url = window.location.href;
                        if (navigator.share) {
                          navigator.share({ title, text, url });
                        } else {
                          window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n' + url)}`);
                        }
                       }}
                       className="p-4 border border-white/10 hover:bg-white/5 rounded-xl transition-colors text-white/60 hover:text-white"
                       title={t.timeline.share}
                     >
                       <Icons.Share2 size={24} />
                     </button>
                   </div>
                   <button 
                    onClick={() => setSelectedStep(null)}
                    className="bg-white text-dark-base px-8 py-4 font-display text-xl uppercase tracking-widest hover:bg-vote-orange hover:text-white transition-all shadow-[0_0_20px_rgba(255,107,0,0.1)]"
                   >
                     {t.timeline.understood}
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 h-[2px] bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-vote-orange shadow-[0_0_10px_rgba(255,107,0,0.8)]"
          animate={{ x: `${(activeIndex / (regionalTimeline.length - 1)) * 100 - 100}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          style={{ width: '100%' }}
        />
      </div>
    </section>
  );
};
