import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark, X, Sparkles } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useLanguage } from '@/src/contexts/LanguageContext';

export const FloatingChatbot: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="w-80 md:w-96 glass-panel border border-vote-orange/30 shadow-[0_0_40px_rgba(255,107,0,0.2)] overflow-hidden"
          >
            <div className="bg-vote-orange/10 p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <Landmark className="text-vote-orange" size={20} />
                <div>
                  <h4 className="text-sm font-display tracking-widest">{t.chatbot.title}</h4>
                  <p className="text-[8px] font-mono-tech text-white/40 uppercase">{t.chatbot.subtitle}</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-white/80 font-body leading-relaxed mb-6">
                {t.chatbot.welcome}
              </p>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  document.querySelector('#chat-ai')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-vote-orange text-white py-3 rounded-sm font-display tracking-widest text-sm hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
              >
                <Sparkles size={14} /> {t.chatbot.launch}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-vote-orange rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,107,0,0.4)] group relative overflow-hidden"
      >
        <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-white/20 border-dashed rounded-full group-hover:scale-110 transition-transform"
        />
        {isOpen ? <X className="text-white z-10" /> : <Landmark className="text-white z-10" size={32} />}
      </motion.button>
    </div>
  );
};
