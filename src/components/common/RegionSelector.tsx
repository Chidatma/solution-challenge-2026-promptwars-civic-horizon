import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ArrowRight, Shield, CheckCircle } from 'lucide-react';
import { useRegion, REGIONS, Region } from '@/src/contexts/RegionContext';
import { cn } from '@/src/lib/utils';

export const RegionSelector: React.FC = () => {
  const { region, setRegion, isFirstVisit, completeSelection } = useRegion();

  if (!isFirstVisit) return null;

  const handleConfirm = () => {
    completeSelection();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-dark-base border border-white/10 rounded-sm overflow-hidden glass-panel shadow-2xl"
        >
          {/* Decorative Back-glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-vote-orange/10 blur-[120px] pointer-events-none" />

          <div className="relative p-12 text-center">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vote-orange/10 border border-vote-orange/20 mb-8"
            >
              <Globe size={14} className="text-vote-orange animate-pulse" />
              <span className="text-[10px] font-mono-tech text-vote-orange uppercase tracking-widest">Global Civic Intelligence</span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-display uppercase tracking-tight text-white mb-4">
              Designate Your <span className="text-vote-orange">Region</span>
            </h2>
            <p className="text-white/40 font-body text-sm max-w-md mx-auto mb-12">
              Civic Horizon adapts its tactical data, legal frameworks, and election simulations to match your sovereign jurisdiction.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {(Object.keys(REGIONS) as Region[]).map((regId) => {
                const reg = REGIONS[regId];
                const isSelected = region === regId;
                
                return (
                  <button
                    key={regId}
                    onClick={() => setRegion(regId)}
                    className={cn(
                      "relative group p-6 rounded-sm border text-left transition-all duration-300",
                      isSelected 
                        ? "bg-vote-orange/10 border-vote-orange shadow-[0_0_30px_rgba(255,107,0,0.15)]" 
                        : "bg-white/5 border-white/10 hover:border-white/30"
                    )}
                  >
                    {isSelected && (
                      <motion.div 
                        layoutId="active-region"
                        className="absolute top-4 right-4 text-vote-orange"
                      >
                        <CheckCircle size={18} />
                      </motion.div>
                    )}
                    
                    <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-transform duration-500 group-hover:scale-110">
                      {reg.flag}
                    </div>
                    <div>
                      <h3 className="text-xl font-display text-white uppercase tracking-tight mb-1">{reg.name}</h3>
                      <p className="text-[10px] font-mono-tech text-white/40 uppercase tracking-widest">
                        {reg.majorParties.length} Major Political Entities
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col items-center gap-6">
              <button
                onClick={handleConfirm}
                className="group relative px-12 py-4 bg-vote-orange text-white font-display text-xl tracking-wider hover:bg-vote-orange-dark transition-all rounded-sm overflow-hidden"
              >
                <div className="relative z-10 flex items-center gap-3">
                  INITIALIZE SYSTEM <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>

              <div className="flex items-center gap-2 text-white/20 font-mono-tech text-[8px] uppercase tracking-[0.2em]">
                <Shield size={10} /> Data localized to {REGIONS[region].name} legal standards
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
