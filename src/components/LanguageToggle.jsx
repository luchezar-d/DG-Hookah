import { useLanguage } from '../utils/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="fixed bottom-6 right-6 z-[9999]" style={{ zIndex: 9999 }}>
      <button 
        onClick={toggleLanguage}
        className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-110 text-white shadow-2xl hover:shadow-white/30"
        aria-label="Toggle language"
        title={`Switch to ${language === 'en' ? 'Bulgarian' : 'English'}`}
      >
        {/* Globe Icon */}
        <svg 
          className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" 
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
        <span className="absolute -bottom-1 -right-1 bg-white text-black text-xs font-bold px-1.5 py-1 rounded-full min-w-[22px] h-[22px] flex items-center justify-center text-[11px] shadow-lg">
          {language.toUpperCase()}
        </span>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
      </button>
    </div>
  );
};

export default LanguageToggle;
