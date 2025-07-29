import { Link } from 'react-router-dom';
import { useLanguage } from '../utils/LanguageContext';

const FeatureCard = ({ feature }) => {
  const { getText } = useLanguage();

  return (
    <Link 
      to={feature.route}
      className="group relative overflow-hidden rounded-lg shadow-xl aspect-[3/4] block transform transition-all duration-700 hover:scale-105"
    >
      <img 
        src={`/images/${feature.image}`}
        alt={getText(feature.title)}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      
      {/* Elegant gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500"></div>
      
      {/* Minimalist content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-2xl md:text-3xl font-serif font-light text-white/95 tracking-wider mb-4">
            {getText(feature.title)}
          </h3>
          
          {/* Subtle accent line */}
          <div className="w-12 h-px bg-gradient-to-r from-amber-400/60 to-transparent mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-200"></div>
          
          {/* Elegant explore text that appears on hover */}
          <p className="text-gray-200/70 text-sm font-light tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
            {getText({ en: "Explore Collection", bg: "Разгледайте колекцията" })}
          </p>
        </div>

        {/* Corner accent */}
        <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
      </div>
    </Link>
  );
};

export default FeatureCard;
