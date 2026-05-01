import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, RotateCcw, Share2, Check, X, Brain } from 'lucide-react';
import { quizQuestions } from '@/src/data/quiz-questions';
import { cn } from '@/src/lib/utils';
import { useStore } from '@/src/store/useStore';
import { useLanguage } from '@/src/contexts/LanguageContext';

import { useRegion } from '@/src/contexts/RegionContext';

export const QuizEngine: React.FC = () => {
  const { t } = useLanguage();
  const { region } = useRegion();
  const questions = quizQuestions[region] || quizQuestions['IN'];
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isWrong, setIsWrong] = useState(false);
  
  const addXP = useStore(state => state.addXP);
  const addBadge = useStore(state => state.addBadge);

  const handleAnswer = (idx: number) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(idx);
    const correct = idx === questions[currentQ].correctAnswer;
    
    if (correct) {
      setScore(score + 1);
      addXP(50);
    } else {
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 500);
    }

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
        if (score + (correct ? 1 : 0) === questions.length) {
          addBadge('Quiz Master');
        }
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
  };

  return (
    <section id="quiz" className="min-h-screen bg-dark-base flex items-center justify-center py-24 px-6 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl w-full z-10"
      >
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="quiz-box"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="glass-panel p-12 luminous-border relative overflow-hidden"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-civic-blue/10 border border-civic-blue/30 flex items-center justify-center text-civic-blue">
                     <Brain size={20} />
                  </div>
                  <div>
                    <h3 className="font-command text-xs uppercase tracking-widest text-white/40">{t.quiz.title}</h3>
                    <p className="text-white/60 text-[10px] font-mono-tech uppercase">{t.quiz.questionOf} {currentQ + 1} of {questions.length}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-command text-2xl text-vote-orange">{score}/{questions.length}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1 bg-white/5 mb-12 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-civic-blue"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQ) / questions.length) * 100}%` }}
                />
              </div>

              <motion.div
                key={currentQ}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                tabIndex={0}
                className={cn(
                  "mb-12 transition-all duration-300",
                  isWrong ? "translate-x-2 border-red-500" : ""
                )}
              >
                <h2 className="text-4xl md:text-5xl uppercase leading-tight mb-8">
                  {t.quiz.questions[currentQ]?.text || questions[currentQ].text}
                </h2>

                <div className="grid gap-4">
                  {questions[currentQ].options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === questions[currentQ].correctAnswer;
                    const isWrongSelection = isSelected && !isCorrect;
                    const translatedOpt = t.quiz.questions[currentQ]?.options[idx] || opt;

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={selectedOption !== null}
                        className={cn(
                          "w-full p-6 border text-left transition-all relative group flex items-center justify-between",
                          selectedOption === null 
                            ? "border-white/10 bg-white/5 hover:border-civic-blue hover:bg-civic-blue/5" 
                            : isCorrect 
                              ? "border-green-500 bg-green-500/10 text-green-500" 
                              : isWrongSelection 
                                ? "border-red-500 bg-red-500/10 text-red-500" 
                                : "border-white/5 bg-white/[0.02] opacity-50"
                        )}
                      >
                        <span className="font-body text-xl">{translatedOpt}</span>
                        {selectedOption !== null && isCorrect && <Check size={20} />}
                        {selectedOption !== null && isWrongSelection && <X size={20} />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              <AnimatePresence>
                {selectedOption !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-white/5 border-l-4 border-civic-blue text-xs text-white/50 leading-relaxed font-body"
                  >
                    <strong>{t.quiz.explanation}:</strong> {t.quiz.questions[currentQ]?.explanation || questions[currentQ].explanation}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="quiz-result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-16 text-center luminous-border"
            >
              <div className="w-24 h-24 bg-power-gold/20 border border-power-gold/50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(255,215,0,0.2)]">
                <Trophy className="text-power-gold w-12 h-12" />
              </div>
              <h2 className="text-7xl uppercase mb-4">{t.quiz.evaluated}</h2>
              <p className="text-white/40 font-mono-tech uppercase tracking-widest text-xs mb-12">{t.quiz.champion}</p>
              
              <div className="flex justify-center gap-12 mb-16">
                 <div>
                    <p className="text-5xl font-command text-white mb-1">{Math.round((score/questions.length) * 100)}%</p>
                    <p className="text-[10px] font-mono-tech text-white/30 uppercase">{t.quiz.accuracy}</p>
                 </div>
                 <div className="w-[1px] bg-white/10" />
                 <div>
                    <p className="text-5xl font-command text-power-gold mb-1">{score * 50}</p>
                    <p className="text-[10px] font-mono-tech text-white/30 uppercase">{t.quiz.xpEarned}</p>
                 </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                 <button 
                  onClick={resetQuiz}
                  className="bg-white text-dark-base px-8 py-4 font-display text-xl uppercase tracking-widest hover:bg-vote-orange hover:text-white transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,107,0,0.4)]"
                 >
                   <RotateCcw size={20} /> {t.quiz.tryAgain}
                 </button>
                 <button 
                   onClick={() => {
                     const text = `I just earned ${score}/${questions.length} on the Civic Horizon Challenge! 🗽`;
                     window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
                   }}
                   className="border border-white/20 px-8 py-4 font-display text-xl uppercase tracking-widest hover:border-white transition-all flex items-center gap-3 hover:bg-white/5 active:scale-95"
                 >
                   <Share2 size={20} /> {t.quiz.shareResults}
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
