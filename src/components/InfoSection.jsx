import { useLanguage } from '../utils/LanguageContext';

const InfoSection = ({ section, className = "" }) => {
  const { getText } = useLanguage();

  return (
    <section className={`py-20 px-6 ${className}`}>
      <div className={`max-w-7xl mx-auto flex items-center justify-center gap-12 ${
        section.reverse ? 'flex-row-reverse' : 'flex-row'
      } flex-wrap lg:flex-nowrap`}>
        
        {/* Image */}
        <div className="flex-1 max-w-lg animate-cinematic-slide-up">
          <img 
            src={`/images/${section.image}`}
            alt={getText(section.title)}
            className="w-full aspect-[4/3] object-cover rounded-xl shadow-2xl hover-cinematic will-change-transform"
          />
        </div>

        {/* Text */}
        <div className="flex-1 max-w-lg text-center lg:text-left animate-cinematic-fade-in stagger-2">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-cinematic-glow">
            {getText(section.title)}
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            {getText(section.description)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
