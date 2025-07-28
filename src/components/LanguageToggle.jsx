import { useLanguage } from '../utils/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button 
      onClick={toggleLanguage}
      className="bg-primary-gradient hover:bg-primary-600 text-white border border-primary-400/30 hover:border-primary-300 transition-all duration-300 px-3 py-1.5 rounded-lg font-heading font-semibold text-sm shadow-lg hover:shadow-primary-500/30 hover:scale-105 text-shadow"
      aria-label="Toggle language"
    >
      {language === 'en' ? 'BG / EN' : 'EN / BG'}
    </button>
  );
};

export default LanguageToggle;
