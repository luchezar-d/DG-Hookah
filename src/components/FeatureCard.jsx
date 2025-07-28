import { Link } from 'react-router-dom';
import { useLanguage } from '../utils/LanguageContext';

const FeatureCard = ({ feature }) => {
  const { getText } = useLanguage();

  return (
    <div className="group relative overflow-hidden rounded-xl shadow-2xl aspect-[4/3] transform transition-all duration-500 hover:scale-105 hover-lift card-glass border border-dark-700/50">
      <img 
        src={`/images/${feature.image}`}
        alt={getText(feature.title)}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-800/60 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300"></div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-2xl font-display font-bold mb-4 text-center text-shadow-glow">
          {getText(feature.title)}
        </h3>
        <Link 
          to={feature.route}
          className="btn-primary block w-full text-center hover:shadow-primary-500/50"
        >
          {getText({ en: "Explore Menu", bg: "Разгледай менюто" })}
        </Link>
      </div>
    </div>
  );
};

export default FeatureCard;
