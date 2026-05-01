/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { Timeline } from './components/sections/Timeline';
import { ChatGuide } from './components/sections/ChatGuide';
import { VotingSimulator } from './components/sections/VotingSimulator';
import { KnowledgeHub } from './components/sections/KnowledgeHub';
import { QuizEngine } from './components/sections/QuizEngine';
import { Dashboard } from './components/sections/Dashboard';
import { ResourceHub, Footer } from './components/layout/Footer';
import { FirebaseProvider } from './components/auth/FirebaseProvider';
import { FloatingChatbot } from './components/common/FloatingChatbot';
import { SmoothScroll } from './components/common/SmoothScroll';
import { ParticleBackground } from './components/common/ParticleBackground';
import { LanguageProvider } from './contexts/LanguageContext';
import { RegionProvider } from './contexts/RegionContext';
import { RegionSelector } from './components/common/RegionSelector';

export default function App() {
  return (
    <RegionProvider>
      <LanguageProvider>
        <FirebaseProvider>
          <SmoothScroll>
          <div className="min-h-screen bg-dark-base selection:bg-vote-orange/30">
            <ParticleBackground />
            <Navbar />
            
            <main>
              <Hero />
              <Timeline />
              <ChatGuide />
              <VotingSimulator />
              <KnowledgeHub />
              <Dashboard />
              <QuizEngine />
              <ResourceHub />
            </main>

            <FloatingChatbot />
            <RegionSelector />
            <Footer />
          </div>
        </SmoothScroll>
      </FirebaseProvider>
      </LanguageProvider>
    </RegionProvider>
  );
}
