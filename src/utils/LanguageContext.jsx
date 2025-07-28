import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'bg' : 'en');
  };

  const getText = (textObj) => {
    if (typeof textObj === 'string') return textObj;
    return textObj[language] || textObj.en || '';
  };

  return (
    <LanguageContext.Provider value={{
      language,
      toggleLanguage,
      getText,
      isEnglish: language === 'en'
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
