import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, UserCheck, ScrollText, CheckCircle, BarChart3, ChevronRight, ChevronLeft, Landmark, Search } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { cn } from '@/src/lib/utils';
import { useStore } from '@/src/store/useStore';
import { useAuth } from '@/src/components/auth/FirebaseProvider';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/src/lib/firebase';
import { useLanguage } from '@/src/contexts/LanguageContext';

import { useRegion } from '@/src/contexts/RegionContext';

// Fix for default marker icons in Leaflet with React
// @ts-ignore
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}

const MapRecenter = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
};

const REGIONAL_STATIONS: Record<string, any[]> = {
  US: [
    { id: 1, name: 'Main Street Library', address: '123 Main St, New York', lat: 40.7128, lng: -74.0060 },
    { id: 2, name: 'Central High School', address: '456 Education Ave, New York', lat: 40.7306, lng: -73.9352 },
    { id: 3, name: 'Liberty Community Center', address: '789 Freedom Blvd, New York', lat: 40.7580, lng: -73.9855 },
  ],
  IN: [
    { id: 1, name: 'Delhi Public School', address: 'Sector 12, RK Puram, New Delhi', lat: 28.5742, lng: 77.1706 },
    { id: 2, name: 'Community Centre', address: 'Hauz Khas, New Delhi', lat: 28.5494, lng: 77.2001 },
    { id: 3, name: 'Government Primary School', address: 'Janpath, New Delhi', lat: 28.6219, lng: 77.2183 },
  ]
};

const REGIONAL_CANDIDATES: Record<string, any[]> = {
  US: [
    { name: 'Dr. Julia Vance', party: 'Progressive Party' },
    { name: 'Senator Mark Sterling', party: 'Constitutional Party' },
    { name: 'Independent Write-in', party: 'N/A' },
  ],
  IN: [
    { name: 'Rahul Roy', party: 'United Front' },
    { name: 'Lakshmi Devi', party: 'Democratic Alliance' },
    { name: 'Independent Candidate', party: 'Independent' },
  ]
};

export const VotingSimulator: React.FC = () => {
  const { t } = useLanguage();
  const { region } = useRegion();
  const [currentStep, setCurrentStep] = useState(0);
  
  const stations = REGIONAL_STATIONS[region] || REGIONAL_STATIONS['IN'];
  const candidates = REGIONAL_CANDIDATES[region] || REGIONAL_CANDIDATES['IN'];

  const steps = [
    { id: 'register', title: t.voting.step1, icon: UserCheck },
    { id: 'locate', title: t.voting.step2, icon: MapPin },
    { id: 'ballot', title: t.voting.step3, icon: ScrollText },
    { id: 'results', title: t.voting.step4, icon: BarChart3 },
  ];
  const [formData, setFormData] = useState({ name: '', age: '', zip: '' });
  const [selectedStation, setSelectedStation] = useState(stations[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState<[number, number]>([stations[0].lat, stations[0].lng]);

  useEffect(() => {
    setSelectedStation(stations[0]);
    setMapCenter([stations[0].lat, stations[0].lng]);
  }, [region]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = stations.find(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (found) {
      setSelectedStation(found);
      setMapCenter([found.lat, found.lng]);
    }
  };
  const [votedFor, setVotedFor] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addXP, addBadge } = useStore();
  const { user } = useAuth();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitVote = async () => {
    if (!votedFor) return;
    
    setIsSubmitting(true);
    
    try {
      if (user) {
        const voteRef = doc(db, 'user_votes', user.uid);
        await setDoc(voteRef, {
          candidate: votedFor,
          timestamp: serverTimestamp(),
          voterName: formData.name || user.displayName,
          voterEmail: user.email
        });

        // Award rewards
        addXP(150); // Increased XP for real interaction
        addBadge('Voter Verified');
      } else {
        // Fallback for demo if not logged in
        addXP(75);
      }

      // Simulate network delay for UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitting(false);
      setCurrentStep(3);
    } catch (err) {
      setIsSubmitting(false);
      handleFirestoreError(err, OperationType.WRITE, `user_votes/${user?.uid}`);
    }
  };

  return (
    <section id="simulate" className="py-24 bg-dark-base relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-vote-orange/50 to-transparent" />
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl mx-auto px-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
          <div>
            <span className="font-mono-tech text-civic-blue text-xs tracking-widest uppercase mb-2 block">{t.voting.experience}</span>
            <h2 className="text-5xl md:text-6xl uppercase leading-none">{t.voting.title}</h2>
          </div>
          
          {/* Progress Stepper */}
          <nav className="flex gap-4" aria-label="Simulation Progress">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = idx === currentStep;
              const isPast = idx < currentStep;
              
              return (
                <div key={step.id} className="flex flex-col items-center gap-2" aria-current={isActive ? "step" : undefined}>
                  <div className={cn(
                    "w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500",
                    isActive ? "bg-vote-orange border-vote-orange text-white" : 
                    isPast ? "bg-vote-orange/20 border-vote-orange/50 text-vote-orange" : 
                    "bg-white/5 border-white/10 text-white/30"
                  )}>
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <span className={cn(
                    "font-mono-tech text-[10px] uppercase tracking-tighter",
                    isActive ? "text-white" : "text-white/30"
                  )}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </nav>
        </div>

        <div className="glass-panel min-h-[500px] overflow-hidden relative luminous-border">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-12"
              >
                <h3 className="text-4xl mb-8 font-display">STEP 1: {t.voting.step1.toUpperCase()}</h3>
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="vote-name" className="block font-mono-tech text-[10px] text-white/50 uppercase mb-2">{t.voting.labels.name}</label>
                      <input 
                        id="vote-name"
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-sm p-4 font-body outline-none focus:border-vote-orange transition-colors" 
                        placeholder="Alex Hamilton"
                        aria-required="true"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="vote-age" className="block font-mono-tech text-[10px] text-white/50 uppercase mb-2">{t.voting.labels.age}</label>
                        <input 
                          id="vote-age"
                          type="number" 
                          value={formData.age}
                          onChange={e => setFormData({...formData, age: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-sm p-4 font-body outline-none focus:border-vote-orange transition-colors" 
                          placeholder="24"
                        />
                      </div>
                      <div>
                        <label htmlFor="vote-zip" className="block font-mono-tech text-[10px] text-white/50 uppercase mb-2">{t.voting.labels.zip}</label>
                        <input 
                          id="vote-zip"
                          type="text" 
                          value={formData.zip}
                          onChange={e => setFormData({...formData, zip: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-sm p-4 font-body outline-none focus:border-vote-orange transition-colors" 
                          placeholder="10001"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
                    <div className="text-white/40 text-sm leading-relaxed">
                      {t.voting.labels.registrationVaries} 
                      <br /><br />
                      {t.voting.labels.eligibleVoters}
                      <ul className="list-disc ml-4 mt-2 text-white/60">
                        <li>{t.voting.labels.citizen}</li>
                        <li>{t.voting.labels.ageReq}</li>
                        <li>{t.voting.labels.residency}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-12"
              >
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                  <h3 className="text-4xl font-display">STEP 2: FIND POLLING STATION</h3>
                  <form onSubmit={handleSearch} className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-vote-orange transition-colors" size={18} />
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search for station (e.g. 'Library')"
                      className="w-full bg-white/5 border border-white/10 rounded-full px-12 py-3 font-body outline-none focus:border-vote-orange focus:ring-1 focus:ring-vote-orange/50 transition-all"
                    />
                  </form>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 relative aspect-video lg:aspect-auto h-[400px] rounded-lg overflow-hidden border border-white/10 bg-dark-base shadow-2xl">
                    <MapContainer 
                      center={mapCenter} 
                      zoom={13} 
                      style={{ height: '100%', width: '100%', filter: 'grayscale(1) invert(1) brightness(1.2)' }}
                      zoomControl={false}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <MapRecenter center={mapCenter} />
                      {stations.map(station => (
                        <Marker 
                          key={station.id} 
                          position={[station.lat, station.lng]}
                          eventHandlers={{
                            click: () => {
                              setSelectedStation(station);
                              setMapCenter([station.lat, station.lng]);
                            }
                          }}
                        >
                          <Popup>
                            <div className="p-2">
                              <h4 className="font-bold text-dark-base">{station.name}</h4>
                              <p className="text-xs text-dark-base/60">{station.address}</p>
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                    </MapContainer>
                  </div>

                  <div className="space-y-4">
                    <p className="font-mono-tech text-[10px] text-white/40 uppercase tracking-widest">Available Stations</p>
                    {stations.map(station => (
                      <button
                        key={station.id}
                        onClick={() => {
                          setSelectedStation(station);
                          setMapCenter([station.lat, station.lng]);
                        }}
                        className={cn(
                          "w-full text-left p-4 rounded-sm border transition-all cursor-pointer",
                          selectedStation.id === station.id 
                            ? "bg-vote-orange/10 border-vote-orange" 
                            : "bg-white/5 border-white/10 hover:border-white/20"
                        )}
                      >
                        <div className="flex items-start gap-4">
                          <div className={cn(
                            "mt-1 p-2 rounded-full",
                            selectedStation.id === station.id ? "bg-vote-orange text-white" : "bg-white/10 text-white/40"
                          )}>
                            <MapPin size={16} />
                          </div>
                          <div>
                            <p className="font-bold text-sm">{station.name}</p>
                            <p className="text-[10px] text-white/40">{station.address}</p>
                          </div>
                        </div>
                      </button>
                    ))}

                    <div className="mt-8 p-6 glass-panel border-vote-orange/20 animate-pulse">
                      <div className="flex gap-4 items-center mb-4">
                        <Landmark size={20} className="text-vote-orange" />
                        <span className="font-mono-tech text-xs uppercase text-vote-orange">Currently Selected</span>
                      </div>
                      <p className="font-display text-2xl mb-1">{selectedStation.name}</p>
                      <p className="text-white/40 text-xs">{selectedStation.address}</p>
                      <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-[10px] font-mono-tech">
                        <span className="text-green-500">OPEN UNTIL 8:00 PM</span>
                        <span className="text-white/30">APPROX. 0.4 MILES</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-12 flex flex-col h-full"
              >
                <h3 className="text-4xl mb-8 font-display">STEP 3: CAST BALLOT</h3>
                <div className="bg-white text-dark-base p-8 rounded-sm shadow-2xl flex-1 max-w-lg mx-auto w-full">
                  <div className="border-b-2 border-dark-base pb-4 mb-8">
                    <h4 className="font-command text-xl tracking-tighter">OFFICIAL BALLOT</h4>
                    <p className="font-mono-tech text-[10px] opacity-70">NOVEMBER GENERAL ELECTION</p>
                  </div>
                  
                  <div className="space-y-8" role="radiogroup" aria-labelledby="ballot-category">
                    <p id="ballot-category" className="font-bold text-xs uppercase tracking-widest border-l-4 border-vote-orange pl-3">Executive Office: {region === 'IN' ? 'Prime Minister' : 'President'}</p>
                    
                    {candidates.map(candidate => (
                      <button
                        key={candidate.name}
                        onClick={() => setVotedFor(candidate.name)}
                        aria-pressed={votedFor === candidate.name}
                        className={cn(
                          "w-full flex items-center justify-between p-4 border-2 transition-all group",
                          votedFor === candidate.name ? "border-vote-orange bg-vote-orange/5" : "border-dark-base/10 hover:border-dark-base"
                        )}
                        aria-label={`Vote for ${candidate.name}, ${candidate.party}`}
                      >
                        <div className="text-left">
                          <p className="font-bold">{candidate.name}</p>
                          <p className="text-[10px] opacity-60 uppercase">{candidate.party}</p>
                        </div>
                        <div className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                          votedFor === candidate.name ? "border-vote-orange bg-vote-orange text-white" : "border-dark-base/20 group-hover:border-dark-base"
                        )}>
                          {votedFor === candidate.name && <CheckCircle size={14} aria-hidden="true" />}
                        </div>
                      </button>
                    ))}
                  </div>

                  {votedFor && !isSubmitting && (
                    <motion.button
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      onClick={submitVote}
                      className="w-full mt-12 bg-dark-base text-white py-4 font-display text-xl uppercase tracking-widest hover:bg-vote-orange transition-colors"
                    >
                      Cast Ballot
                    </motion.button>
                  )}

                  {isSubmitting && (
                    <div className="mt-12 flex flex-col items-center gap-4 py-8" role="status" aria-live="polite">
                      <div className="w-12 h-12 border-4 border-vote-orange border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                      <p className="font-mono-tech text-xs uppercase tracking-widest animate-pulse">Encrypting & Transmitting...</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 text-center"
              >
                <div className="w-24 h-24 bg-green-500/20 border border-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
                  <CheckCircle className="text-green-500 w-12 h-12" aria-hidden="true" />
                </div>
                <h3 className="text-6xl mb-4 text-white uppercase" aria-live="assertive">{t.voting.voteRecorded}</h3>
                <p className="text-white/50 max-w-md mx-auto mb-12">
                  {t.hero.tagline}
                </p>
                
                <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
                   <div className="glass-panel p-6">
                     <p className="text-vote-orange font-command text-3xl mb-1">42%</p>
                     <p className="text-white/40 font-mono-tech text-[10px] uppercase">{candidates[0].name}</p>
                     <div className="w-full h-1 bg-white/5 mt-4">
                       <div className="h-full bg-vote-orange w-[42%]" />
                     </div>
                   </div>
                   <div className="glass-panel p-6">
                     <p className="text-civic-blue font-command text-3xl mb-1">58%</p>
                     <p className="text-white/40 font-mono-tech text-[10px] uppercase">{candidates[1].name}</p>
                     <div className="w-full h-1 bg-white/5 mt-4">
                       <div className="h-full bg-civic-blue w-[58%]" />
                     </div>
                   </div>
                </div>
                
                <button 
                   onClick={() => setCurrentStep(0)} 
                   className="mt-12 text-white/30 hover:text-white transition-colors flex items-center gap-2 mx-auto font-mono-tech text-[10px] uppercase tracking-widest"
                >
                  <Landmark size={14} /> Reset Simulation
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stepper Footer */}
          {currentStep < 2 && (
            <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between bg-white/[0.02] border-t border-white/10">
              <button 
                onClick={handleBack} 
                className={cn("flex items-center gap-2 text-white/40 hover:text-white transition-colors", currentStep === 0 && "opacity-0")}
                aria-label="Go to previous step"
                disabled={currentStep === 0}
              >
                <ChevronLeft size={20} aria-hidden="true" /> <span className="font-mono-tech text-xs uppercase">{t.voting.back}</span>
              </button>
              <button 
                onClick={handleNext} 
                className="flex items-center gap-2 text-vote-orange hover:text-white transition-colors group"
                disabled={currentStep === 0 && !formData.name}
                aria-label="Continue to next step"
              >
                <span className="font-mono-tech text-xs uppercase group-hover:drop-shadow-[0_0_8px_rgba(255,107,0,0.8)] transition-all">{t.voting.continue}</span> 
                <div className="p-2 border border-vote-orange/20 rounded-full group-hover:border-white group-hover:bg-vote-orange/10 transition-all">
                  <ChevronRight size={20} aria-hidden="true" />
                </div>
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};
