import { useLanguage } from '../utils/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button 
      onClick={toggleLanguage}
      className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 text-white"
      aria-label="Toggle language"
      title={`Switch to ${language === 'en' ? 'Bulgarian' : 'English'}`}
    >
      {/* Globe Icon */}
      <svg 
        className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" 
        />
      </svg>
      
      {/* Language indicator */}
      <span className="absolute -bottom-1 -right-1 bg-white text-black text-xs font-bold px-1 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center text-[10px] shadow-lg">
        {language.toUpperCase()}
      </span>
    </button>
  );
};

export default LanguageToggle;
