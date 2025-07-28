import Carousel from '../components/Carousel';
import InfoSection from '../components/InfoSection';
import FeatureCard from '../components/FeatureCard';
import { infoSections, homeFeatures } from '../data/menuData';

const HomePage = () => {
  return (
    <div className="bg-dark-gradient text-gray-100 min-h-screen">
      {/* Carousel Section */}
      <Carousel />
      
      {/* Info Sections */}
      <section id="about" className="relative">
        {infoSections.map((section) => (
          <InfoSection 
            key={section.id} 
            section={section}
            className={section.id % 2 === 0 ? 'bg-dark-800/30' : 'bg-dark-900/30'}
          />
        ))}
      </section>

      {/* Features Section */}
      <section id="hookahs" className="py-20 px-6 bg-dark-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">
              Our Specialties
            </h2>
            <p className="text-lg text-gray-300 font-body">
              Experience the finest in hookah, drinks, and cuisine
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeFeatures.map((feature, index) => (
              <div key={feature.id} className={`animate-fade-in-up`} style={{ animationDelay: `${index * 0.2}s` }}>
                <FeatureCard feature={feature} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
