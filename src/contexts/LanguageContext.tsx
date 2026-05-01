import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { translations, Language as LangType } from '../i18n/translations';

type TranslationKeys = typeof translations.en;

interface LanguageContextType {
  language: LangType;
  setLanguage: (lang: LangType) => void;
  t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LangType>(() => {
    const saved = localStorage.getItem('app-language');
    return (saved as LangType) || 'en';
  });

  const setLanguage = useCallback((lang: LangType) => {
    setLanguageState(lang);
    localStorage.setItem('app-language', lang);
  }, []);

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
