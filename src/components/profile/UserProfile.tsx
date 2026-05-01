import React from 'react';
import { motion } from 'motion/react';
import { X, Trophy, Target, Award, Zap, BookOpen, Share2 } from 'lucide-react';
import { useAuth } from '@/src/components/auth/FirebaseProvider';
import { useStore } from '@/src/store/useStore';
import { cn } from '@/src/lib/utils';
import { useLanguage } from '@/src/contexts/LanguageContext';

interface UserProfileProps {
  onClose: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { xp, badges, progress } = useStore();

  if (!user) return null;

  const level = Math.floor(xp / 100) + 1;
  const nextLevelXP = 100 - (xp % 100);

  const stats = [
    { label: t.profile.xp, value: xp, icon: Zap, color: 'text-vote-orange' },
    { label: t.profile.badges, value: badges.length, icon: Award, color: 'text-civic-blue' },
    { label: t.profile.rank, value: `${t.profile.levelAbbr} ${level}`, icon: Trophy, color: 'text-yellow-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
    >
      <div 
        className="absolute inset-0 bg-dark-base/95 backdrop-blur-xl" 
        onClick={onClose}
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-4xl bg-dark-base border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(255,107,0,0.15)] flex flex-col md:flex-row h-full max-h-[80vh]"
      >
        {/* Sidebar */}
        <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-white/10 p-8 flex flex-col items-center text-center bg-white/2">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-vote-orange/20 rounded-full blur-2xl animate-pulse" />
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || ''} className="relative w-32 h-32 rounded-full border-2 border-vote-orange shadow-lg" />
            ) : (
              <div className="relative w-32 h-32 rounded-full bg-white/5 border-2 border-white/10 flex items-center justify-center">
                <Target size={48} className="text-white/20" />
              </div>
            )}
            <div className="absolute -bottom-2 -right-2 bg-vote-orange text-white text-xs font-bold px-3 py-1 rounded-full border-2 border-dark-base">
              {t.profile.levelAbbr} {level}
            </div>
          </div>

          <h2 className="text-2xl font-display tracking-tight mb-1">{user.displayName}</h2>
          <p className="text-white/40 font-mono-tech text-[10px] uppercase tracking-widest mb-6">{user.email}</p>

          <button 
            onClick={() => {
              const shareTitle = t.profile.share;
              const text = `I'm a Level ${Math.floor(xp / 100) + 1} Civic Leader! I've earned ${badges.length} badges on Civic Horizon.`;
              const url = window.location.href;
              if (navigator.share) {
                navigator.share({ title: shareTitle, text, url });
              } else {
                window.open(`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(text + '\n' + url)}`);
              }
            }}
            className="w-full flex items-center justify-center gap-2 mb-8 py-3 px-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-vote-orange/40 transition-all group"
          >
            <Share2 size={16} className="text-white/40 group-hover:text-vote-orange transition-colors" />
            <span className="font-mono-tech text-[10px] uppercase tracking-wider text-white/60 group-hover:text-white">{t.profile.share}</span>
          </button>

          <div className="w-full space-y-4 text-left">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/5 p-4 rounded-xl border border-white/5 group hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg bg-white/5", stat.color)}>
                    <stat.icon size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 uppercase font-mono-tech">{stat.label}</p>
                    <p className="text-lg font-command leading-none">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={onClose}
            className="mt-auto md:hidden w-full py-4 border-t border-white/10 text-white/40 font-mono-tech text-xs uppercase"
          >
            {t.timeline.close}
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-3xl font-display tracking-tight uppercase">{t.profile.title}</h3>
            <button 
              onClick={onClose}
              className="hidden md:flex p-2 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          {/* Level Progress */}
          <div className="mb-12">
            <div className="flex justify-between items-end mb-4">
              <span className="font-mono-tech text-xs text-white/50 uppercase">{t.profile.level} {t.nav.progress}</span>
              <span className="font-command text-vote-orange">{xp % 100}%</span>
            </div>
            <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${xp % 100}%` }}
                className="h-full bg-gradient-to-r from-vote-orange to-orange-400 shadow-[0_0_15px_rgba(255,107,0,0.5)]"
              />
            </div>
            <p className="text-[10px] font-mono-tech text-white/20 mt-3 uppercase tracking-widest text-right">
              {nextLevelXP} {t.profile.xpRequired} {t.profile.level} {level + 1}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Badges Section */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                < Award className="text-civic-blue w-5 h-5" />
                <h4 className="font-mono-tech text-xs text-white/70 uppercase tracking-widest font-bold">{t.profile.badges}</h4>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {badges.length > 0 ? (
                  badges.map((badge, i) => (
                    <motion.div 
                      key={badge}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="aspect-square bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group relative overflow-hidden group/badge"
                    >
                      <div className="absolute inset-0 bg-civic-blue/10 opacity-0 group-hover/badge:opacity-100 transition-opacity" />
                      <Award className="text-civic-blue group-hover/badge:scale-110 transition-transform" />
                      <div className="absolute inset-x-0 bottom-0 py-1 bg-civic-blue/20 translate-y-full group-hover/badge:translate-y-0 transition-transform">
                        <p className="text-[6px] text-center uppercase font-mono-tech truncate px-1">{badge}</p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-3 py-10 border-2 border-dashed border-white/5 rounded-xl flex flex-col items-center justify-center opacity-30">
                    <Award size={32} className="mb-2" />
                    <p className="text-[10px] font-mono-tech uppercase">{t.profile.noBadges}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Learning Progress Section */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="text-vote-orange w-5 h-5" />
                <h4 className="font-mono-tech text-xs text-white/70 uppercase tracking-widest font-bold">{t.profile.mastery}</h4>
              </div>
              
              <div className="space-y-4">
                {Object.entries(progress).length > 0 ? (
                  Object.entries(progress).map(([key, value]) => (
                    <div key={key} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-vote-orange" />
                        <span className="text-xs uppercase font-mono-tech tracking-tight">{key.replace('-', ' ')}</span>
                      </div>
                      <div className="text-xs font-command text-white/50">{value}%</div>
                    </div>
                  ))
                ) : (
                  <div className="py-10 border-2 border-dashed border-white/5 rounded-xl flex flex-col items-center justify-center opacity-30">
                    <BookOpen size={32} className="mb-2" />
                    <p className="text-[10px] font-mono-tech uppercase">{t.profile.startLearning}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
