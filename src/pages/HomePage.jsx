import Carousel from '../components/Carousel';
import InfoSection from '../components/InfoSection';
import FeatureCard from '../components/FeatureCard';
import { infoSections, homeFeatures } from '../data/menuData';

const HomePage = () => {
  return (
    <div className="text-gray-100 min-h-screen">
      {/* Carousel Section */}
      <Carousel />
      
      {/* Info Sections */}
      <section id="about" className="relative">
        {infoSections.map((section, index) => (
          <div key={section.id} data-reveal-on-scroll className={`scroll-reveal-section-${index}`}>
            <InfoSection 
              section={section}
              className={section.id % 2 === 0 ? 'bg-white/5 backdrop-blur-sm' : 'bg-white/10 backdrop-blur-md'}
            />
          </div>
        ))}
      </section>

      {/* Features Section - Main Menu Target */}
      <section id="hookahs" className="py-20 px-6 bg-white/5 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16" data-final-reveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-cinematic-glow mb-6 animate-cinematic-fade-in">
              Our Specialties
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-6" data-final-reveal></div>
            <p className="text-xl md:text-2xl text-gray-300 font-body max-w-2xl mx-auto leading-relaxed">
              Experience the finest in hookah, drinks, and cuisine crafted with passion and precision
            </p>
          </div>
          
          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeFeatures.map((feature, index) => (
              <div 
                key={feature.id} 
                className={`animate-cinematic-slide-up stagger-${index + 1} transform transition-all duration-700`}
                data-final-reveal
              >
                <FeatureCard feature={feature} />
              </div>
            ))}
          </div>

          {/* Additional Visual Elements */}
          <div className="mt-16 text-center" data-final-reveal>
            <div className="inline-flex items-center space-x-4 text-gray-400">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-gray-400"></div>
              <span className="text-sm uppercase tracking-widest font-body">Premium Experience</span>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-gray-400"></div>
            </div>
          </div>
        </div>

        {/* Floating Particles for Section */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float-slow"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 30}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + i * 0.5}s`
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
