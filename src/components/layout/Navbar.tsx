import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Vote, Menu, X, Landmark, LogIn, LogOut, User as UserIcon, Languages, Search } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useStore } from '@/src/store/useStore';
import { useAuth } from '@/src/components/auth/FirebaseProvider';
import { UserProfile } from '../profile/UserProfile';
import { GlobalSearch } from '../common/GlobalSearch';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { useRegion } from '@/src/contexts/RegionContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const xp = useStore((state) => state.xp);
  const { user, signIn, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { regionInfo, setRegion } = useRegion();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navLinks = [
    { name: t.nav.timeline, href: '#timeline' },
    { name: t.nav.education, href: '#learn' },
    { name: t.nav.simulator, href: '#simulate' },
    { name: t.nav.about, href: '#quiz' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500',
        isScrolled ? 'py-4 bg-dark-base/90 backdrop-blur-md shadow-lg shadow-black/20' : 'py-8 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="p-2 glass-panel group-hover:border-vote-orange/50 transition-colors">
            <Landmark className="w-6 h-6 text-vote-orange" />
          </div>
          <span className="font-display text-2xl tracking-tight">CIVIC HORIZON</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {/* Search Button */}
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 p-2 rounded-full border border-white/10 hover:border-vote-orange/40 hover:bg-white/5 transition-all group"
            title="Search (Cmd+K)"
          >
            <Search size={14} className="text-white/40 group-hover:text-vote-orange" />
          </button>

          {/* Region Toggle */}
          <button 
            onClick={() => setRegion(regionInfo.id === 'IN' ? 'US' : 'IN')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-vote-orange/40 hover:bg-white/5 transition-all group"
            title="Change Region"
          >
            <span className="text-sm">{regionInfo.flag}</span>
            <span className="font-mono-tech text-[10px] uppercase tracking-widest">
              {regionInfo.id}
            </span>
          </button>

          {/* Language Toggle */}
          <button 
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-vote-orange/40 hover:bg-white/5 transition-all group"
          >
            <Languages size={14} className="text-white/40 group-hover:text-vote-orange" />
            <span className="font-mono-tech text-[10px] uppercase tracking-widest">
              {language === 'en' ? 'ENG' : 'HIN'}
            </span>
          </button>

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="font-mono-tech text-xs uppercase tracking-widest text-white/70 hover:text-vote-orange transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="h-8 w-[1px] bg-white/10 mx-2" />
          
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <span className="font-mono-tech text-[10px] text-white/50 uppercase">{t.nav.xp}</span>
                <span className="font-command font-bold text-vote-orange">{xp}</span>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowProfile(true)}
                  className="flex items-center gap-2 group/avatar focus:outline-none"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || ''} className="w-8 h-8 rounded-full border border-white/20 group-hover/avatar:border-vote-orange transition-colors" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/avatar:bg-white/20 transition-colors">
                      <UserIcon size={16} className="text-white/40" />
                    </div>
                  )}
                  <span className="hidden lg:block font-mono-tech text-[10px] text-white/40 uppercase group-hover/avatar:text-white transition-colors">{t.nav.profile}</span>
                </button>
                <button onClick={logout} className="text-white/40 hover:text-red-500 transition-colors">
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={signIn}
              className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-sm font-mono-tech text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              <LogIn size={14} /> {t.nav.login}
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => scrollToSection(e, '#learn')}
            className="bg-vote-orange text-white px-6 py-2 font-display text-lg tracking-wide rounded-sm luminous-border hover:shadow-[0_0_20px_rgba(255,107,0,0.4)] transition-all uppercase"
          >
            {t.nav.startLearning}
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfile && (
          <UserProfile onClose={() => setShowProfile(false)} />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-dark-base border-b border-white/10 p-6 md:hidden flex flex-col gap-6"
          >
            {user && (
              <div className="flex flex-col gap-2 mb-2">
                <button 
                  onClick={() => { setShowProfile(true); setMobileMenuOpen(false); }}
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || ''} className="w-12 h-12 rounded-full" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                      <UserIcon size={24} className="text-white/40" />
                    </div>
                  )}
                  <div className="text-left">
                    <p className="font-display text-xl tracking-tight leading-none mb-1">{user.displayName}</p>
                    <p className="font-mono-tech text-[8px] text-vote-orange uppercase tracking-widest">{t.nav.profile} {t.nav.progress}</p>
                  </div>
                </button>
              </div>
            )}

            <button 
              onClick={() => { setIsSearchOpen(true); setMobileMenuOpen(false); }}
              className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 mb-2"
            >
              <div className="flex items-center gap-3">
                <Search size={20} className="text-vote-orange" />
                <span className="font-display text-xl tracking-tight uppercase">{t.search.title}</span>
              </div>
              <span className="font-mono-tech text-[10px] uppercase tracking-widest text-white/40">
                Search Index
              </span>
            </button>
            <button 
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 mb-2"
            >
              <div className="flex items-center gap-3">
                <Languages size={20} className="text-vote-orange" />
                <span className="font-display text-xl tracking-tight uppercase">{t.nav.langLabel}</span>
              </div>
              <span className="font-mono-tech text-xs uppercase tracking-widest text-vote-orange">
                {language === 'en' ? 'ENGLISH' : 'हिंदी'}
              </span>
            </button>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-display text-3xl tracking-tight hover:text-vote-orange transition-colors"
                onClick={(e) => scrollToSection(e, link.href)}
              >
                {link.name}
              </a>
            ))}
            {user ? (
               <button onClick={logout} className="text-left font-display text-3xl tracking-tight text-red-500 uppercase">{t.nav.logout}</button>
            ) : (
               <button onClick={signIn} className="text-left font-display text-3xl tracking-tight text-vote-orange uppercase">{t.nav.login}</button>
            )}
            <button 
              onClick={(e) => scrollToSection(e, '#learn')}
              className="bg-vote-orange text-white w-full py-4 font-display text-2xl tracking-wide uppercase"
            >
              {t.nav.startLearning}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
};
