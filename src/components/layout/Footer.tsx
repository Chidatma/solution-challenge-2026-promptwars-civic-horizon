import React from 'react';
import { ExternalLink, Landmark, Mail, MousePointer2, ShieldCheck, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { useRegion } from '@/src/contexts/RegionContext';

export const ResourceHub: React.FC = () => {
  const { t } = useLanguage();
  const { region } = useRegion();

  const resourceLinks: Record<string, string[]> = {
    IN: [
      'https://voters.eci.gov.in/',
      'https://electoralsearch.eci.gov.in/',
      'https://eci.gov.in/',
      'https://results.eci.gov.in/',
    ],
    US: [
      'https://vote.gov/',
      'https://www.usa.gov/election-office',
      'https://www.usa.gov/voter-research',
      'https://www.fec.gov/introduction-campaign-finance/election-results-and-voting-information/',
    ],
  };

  const resources = [
    { title: t.resources.items[0].title, desc: t.resources.items[0].desc, icon: MousePointer2, color: 'text-vote-orange' },
    { title: t.resources.items[1].title, desc: t.resources.items[1].desc, icon: MapPin, color: 'text-civic-blue' },
    { title: t.resources.items[2].title, desc: t.resources.items[2].desc, icon: ShieldCheck, color: 'text-power-gold' },
    { title: t.resources.items[3].title, desc: t.resources.items[3].desc, icon: Landmark, color: 'text-white' },
  ];

  return (
    <section className="py-24 bg-dark-base border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="font-mono-tech text-white/30 text-xs tracking-widest uppercase mb-2 block">{t.resources.subtitle}</span>
          <h2 className="text-5xl md:text-7xl uppercase">{t.resources.title}</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((res, i) => {
            const Icon = res.icon;
            const href = resourceLinks[region]?.[i];
            return (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="glass-panel p-8 hover:border-white/20 transition-all cursor-pointer group"
                aria-label={`${res.title} - ${t.resources.official}`}
              >
                <Icon className={cn("mb-6", res.color)} size={32} />
                <h3 className="text-2xl mb-4 group-hover:text-vote-orange transition-colors">{res.title}</h3>
                <p className="text-sm text-white/40 mb-8 font-body">{res.desc}</p>
                <div className="flex items-center gap-2 font-mono-tech text-[10px] uppercase text-white/20 group-hover:text-white transition-colors">
                  {t.resources.official} <ExternalLink size={12} />
                </div>
              </motion.a>
            );
          })}
        </div>

        <div className="mt-24 glass-panel p-12 flex flex-col md:flex-row items-center justify-between gap-8 luminous-border">
          <div className="max-w-md">
            <h3 className="text-4xl mb-4 uppercase">{t.resources.stayUpdated}</h3>
            <p className="text-white/50 text-sm font-body">{t.resources.newsletter}</p>
          </div>
          <div className="flex w-full md:w-auto gap-4">
            <input 
              type="email" 
              placeholder="voter@citizens.org"
              className="bg-white/5 border border-white/10 rounded-sm px-6 py-4 flex-1 md:w-80 font-body outline-none focus:border-vote-orange"
            />
            <button className="bg-white text-dark-base px-8 py-4 font-display text-xl uppercase tracking-widest hover:bg-vote-orange hover:text-white transition-colors">
              {t.resources.subscribe}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-dark-base border-t border-white/10 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-24">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-8">
             <Landmark className="text-vote-orange" />
             <span className="font-display text-3xl">CIVIC HORIZON</span>
          </div>
          <p className="text-white/40 max-w-sm mb-12 leading-relaxed">
            {t.footer.tagline}
          </p>
          <div className="flex gap-6">
             {['Twitter', 'Instagram', 'Github', 'LinkedIn'].map(s => (
               <a key={s} href="#" className="font-mono-tech text-[10px] uppercase tracking-widest text-white/30 hover:text-vote-orange transition-colors">
                 {s}
               </a>
             ))}
          </div>
        </div>

        <div>
          <h4 className="font-command text-xs uppercase tracking-widest text-white mb-8">{t.footer.platform}</h4>
          <ul className="space-y-4 font-mono-tech text-[10px] text-white/40 uppercase">
             <li><a href="#" className="hover:text-white transition-colors">{t.nav.timeline}</a></li>
             <li><a href="#" className="hover:text-white transition-colors">{t.nav.education}</a></li>
             <li><a href="#" className="hover:text-white transition-colors">{t.nav.simulator}</a></li>
             <li><a href="#" className="hover:text-white transition-colors">{t.nav.about}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-command text-xs uppercase tracking-widest text-white mb-8">{t.footer.legal}</h4>
          <ul className="space-y-4 font-mono-tech text-[10px] text-white/40 uppercase">
             <li><a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a></li>
             <li><a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a></li>
             <li><a href="#" className="hover:text-white transition-colors">{t.footer.cookies}</a></li>
             <li><a href="#" className="hover:text-white transition-colors">{t.footer.disclaimer}</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5 pt-12 text-white/20 font-mono-tech text-[8px] uppercase tracking-[0.3em]">
        <p>{t.footer.rights}</p>
        <p>{t.footer.builtFor}</p>
      </div>
    </footer>
  );
};
