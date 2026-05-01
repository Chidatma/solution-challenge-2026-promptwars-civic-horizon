import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'motion/react';
import { Landmark } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';

function ParticleBackground() {
  const ref = useRef<THREE.Points>(null!);
  const sphere = useMemo(() => {
    const coords = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const x = 5 * Math.sin(phi) * Math.cos(theta);
      const y = 5 * Math.sin(phi) * Math.sin(theta);
      const z = 5 * Math.cos(phi);
      coords[i * 3] = x;
      coords[i * 3 + 1] = y;
      coords[i * 3 + 2] = z;
    }
    return coords;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    ref.current.rotation.x = time * 0.05;
    ref.current.rotation.y = time * 0.075;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#FF6B00"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  
  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden">
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleBackground />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full z-10 pt-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Electra Highlight Animation - Powered Up */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-vote-orange/5 border border-vote-orange/40 mb-12 group relative backdrop-blur-md overflow-hidden shadow-[0_0_30px_rgba(255,107,0,0.1)] hover:border-vote-orange/80 transition-all cursor-default"
            >
              {/* Dynamic Scanning Line */}
              <motion.div 
                animate={{ left: ['-10%', '110%'] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_15px_rgba(255,255,255,1)] opacity-50"
              />
              
              <div className="relative flex items-center gap-3">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-vote-orange animate-pulse" />
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-vote-orange animate-ping opacity-40" />
                </div>
                <span className="font-mono-tech text-[11px] text-white uppercase tracking-[0.4em] font-black italic">
                   CORE_INTEL_V2.4 : {language === 'en' ? 'ONLINE' : 'सक्रिय'}
                </span>
              </div>
            </motion.div>

            <div className="flex gap-4 mb-6">
              {[t.hero.badge1, t.hero.badge2, t.hero.badge3].map((badge) => (
                <span
                  key={badge}
                  className="bg-white/5 border border-white/10 px-3 py-1 rounded-full font-mono-tech text-[10px] tracking-widest text-white/50 uppercase hover:border-vote-orange/40 hover:text-white transition-all cursor-default"
                >
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="text-7xl md:text-9xl leading-[0.85] mb-8 drop-shadow-[0_0_20px_rgba(255,107,0,0.15)] uppercase">
              {t.hero.title} <br />
              <span className="text-vote-orange">{t.hero.democracy}</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-lg mb-10 leading-relaxed">
              {t.hero.tagline}
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.querySelector('#simulate')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-dark-base px-8 py-4 font-display text-xl tracking-wide rounded-sm hover:bg-vote-orange hover:text-white transition-all duration-300 uppercase"
              >
                {t.hero.cta1}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.querySelector('#chat-ai')?.scrollIntoView({ behavior: 'smooth' })}
                className="border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 font-display text-xl tracking-wide rounded-sm hover:border-vote-orange transition-all duration-300 uppercase"
              >
                {t.hero.cta2}
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative w-[500px] h-[500px]">
              {/* Decorative Rings */}
              <div className="absolute inset-0 rounded-full border border-white/5 animate-[pulse_8s_infinite]" />
              <div className="absolute inset-8 rounded-full border border-vote-orange/10 animate-[pulse_6s_infinite]" />
              <div className="absolute inset-16 rounded-full border border-civic-blue/10 animate-[pulse_4s_infinite]" />
              
              {/* Glowing Diamond Frame */}
              <div className="absolute inset-[25%] rotate-45 border-2 border-vote-orange rounded-lg shadow-[0_0_30px_rgba(255,107,0,0.4)] bg-vote-orange/5 backdrop-blur-sm" />
              
              {/* The Central Icon - Enhanced for visibility */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ 
                    filter: ["drop-shadow(0 0 8px rgba(255,107,0,0.5))", "drop-shadow(0 0 15px rgba(255,107,0,0.8))", "drop-shadow(0 0 8px rgba(255,107,0,0.5))"],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Landmark className="w-40 h-40 text-white stroke-[1.5] drop-shadow-[0_0_10px_rgba(255,107,0,1)]" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-10 hidden md:block">
        <div className="font-mono-tech text-[10px] text-white/20 uppercase tracking-[0.3em] vertical-rl rotate-180">
          Scroll to explore process 001/008
        </div>
      </div>
    </section>
  );
};
