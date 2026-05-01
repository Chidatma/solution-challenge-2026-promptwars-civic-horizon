import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Command, ExternalLink, Sparkles } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { timelineData } from '@/src/data/timeline-data';
import { topicsData } from '@/src/data/topics';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'timeline' | 'education' | 'chat';
  href: string;
}

import { useRegion } from '@/src/contexts/RegionContext';

export const GlobalSearch: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { t } = useLanguage();
  const { region } = useRegion();

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();
    const matches: SearchResult[] = [];

    const regionalTimeline = timelineData[region] || [];
    const regionalTopics = topicsData[region] || [];

    // Search Timeline
    regionalTimeline.forEach(item => {
      if (item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)) {
        matches.push({
          id: item.id,
          title: item.title,
          description: item.description,
          category: 'timeline',
          href: '#timeline'
        });
      }
    });

    // Search Knowledge Hub
    regionalTopics.forEach(topic => {
      if (topic.title.toLowerCase().includes(q) || topic.content.toLowerCase().includes(q)) {
        matches.push({
          id: topic.id,
          title: topic.title,
          description: topic.content.substring(0, 100) + '...',
          category: 'education',
          href: '#learn'
        });
      }
    });

    // Add relevant chat suggestions
    const chatSuggestions = region === 'IN' ? [
      { id: 'c1', title: 'What is EVM?', category: 'chat' as const },
      { id: 'c2', title: 'How does Lok Sabha election work?', category: 'chat' as const },
      { id: 'c3', title: 'ECI guidelines', category: 'chat' as const },
    ] : [
      { id: 'c1', title: 'How do primaries work?', category: 'chat' as const },
      { id: 'c2', title: 'What is the Electoral College?', category: 'chat' as const },
      { id: 'c3', title: 'Voter Fraud protection', category: 'chat' as const },
    ];

    chatSuggestions.forEach(s => {
      if (s.title.toLowerCase().includes(q)) {
        matches.push({
          id: s.id,
          title: s.title,
          description: 'Ask Electra for a detailed explanation.',
          category: 'chat',
          href: '#chat-ai'
        });
      }
    });

    return matches;
  }, [query]);

  const handleSelect = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[101] px-6"
          >
            <div className="bg-dark-base border border-white/10 rounded-sm shadow-2xl overflow-hidden glass-panel">
              <div className="p-4 border-b border-white/10 flex items-center gap-4">
                <Search className="text-vote-orange" size={20} />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.search.placeholder}
                  className="flex-1 bg-transparent border-none outline-none text-xl font-display uppercase tracking-tight text-white placeholder:text-white/20"
                />
                <button onClick={onClose} className="text-white/30 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                {query && results.length === 0 ? (
                  <div className="p-12 text-center">
                    <p className="text-white/40 font-mono-tech text-xs uppercase tracking-widest">{t.search.noResults}</p>
                  </div>
                ) : (
                  <div className="p-2">
                    {results.map((result) => (
                      <button
                        key={`${result.category}-${result.id}`}
                        onClick={() => handleSelect(result.href)}
                        className="w-full text-left p-4 rounded-sm hover:bg-white/5 transition-colors group flex items-start gap-4 border border-transparent hover:border-white/10 mb-1"
                      >
                        <div className={cn(
                          "mt-1 p-2 rounded-sm",
                          result.category === 'timeline' && "bg-blue-500/20 text-blue-500",
                          result.category === 'education' && "bg-vote-orange/20 text-vote-orange",
                          result.category === 'chat' && "bg-purple-500/20 text-purple-500"
                        )}>
                          {result.category === 'timeline' && <Command size={14} />}
                          {result.category === 'education' && <ExternalLink size={14} />}
                          {result.category === 'chat' && <Sparkles size={14} />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-display text-lg tracking-tight text-white group-hover:text-vote-orange transition-colors">
                              {result.title}
                            </span>
                            <span className="font-mono-tech text-[8px] uppercase tracking-widest text-white/20">
                              {t.search.sections[result.category]}
                            </span>
                          </div>
                          <p className="text-xs text-white/40 line-clamp-2">{result.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {!query && (
                  <div className="p-12 text-center">
                    <Search className="mx-auto mb-4 text-white/10" size={48} />
                    <p className="text-white/40 font-mono-tech text-[10px] uppercase tracking-widest">
                      Type to begin indexing Democratic Resources
                    </p>
                  </div>
                )}
              </div>
              
              <div className="p-3 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-[10px] font-mono-tech text-white/20 uppercase tracking-widest">
                <div className="flex gap-4">
                  <span><kbd className="bg-white/10 px-1 rounded-sm text-white/40 mr-1">ESC</kbd> to close</span>
                  <span><kbd className="bg-white/10 px-1 rounded-sm text-white/40 mr-1">↵</kbd> to select</span>
                </div>
                <span>Civic Horizon Index v1.0</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
