import { motion, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import VolumetricClouds from './VolumetricClouds';

const ScrollResponsiveSection = ({ 
  title, 
  description, 
  imagePosition = 'left', 
  scrollProgress, 
  mousePosition,
  index 
}) => {
  const [ref, inView] = useInView({
    threshold: 0.4, // Higher threshold - more of section must be visible
    triggerOnce: false,
    rootMargin: '-20% 0px -20% 0px' // Larger margins to prevent overlap
  });

  // Simple opacity based on intersection observer instead of complex scroll math
  const opacity = inView ? 1 : 0;
  const y = inView ? 0 : 30;

  return (
    <div ref={ref} className="py-20 relative">
      {/* VolumetricClouds that appear when section is in view */}
      <VolumetricClouds 
        active={inView}
        mousePosition={mousePosition}
        intensity={0.8}
        cloudCount={12}
      />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div 
          className={`${imagePosition === 'left' ? 'md:order-2' : 'md:order-1'}`}
          animate={{
            opacity,
            y,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h3 
            className="text-2xl md:text-3xl font-serif font-light text-white/95 mb-6 tracking-wider"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {title}
          </motion.h3>
          <motion.div 
            className="w-16 h-px bg-gradient-to-r from-amber-400/60 to-transparent mb-6"
            whileInView={{ scaleX: 1 }}
            initial={{ scaleX: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
          <motion.p 
            className="text-base md:text-lg text-gray-300/90 leading-relaxed font-light"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Image/Visual Element */}
        <motion.div 
          className={`relative ${imagePosition === 'left' ? 'md:order-1' : 'md:order-2'}`}
          animate={{
            opacity,
            y,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Elegant Image Container */}
          <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-2xl group">
            
            {/* Image with overlay */}
            <div className="relative h-full">
              {/* Dynamic Content Based on Index */}
              {index === 0 && (
                <div className="relative h-full">
                  <img 
                    src="/images/hookah1.jpg" 
                    alt="Premium Hookah" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                  
                  {/* Elegant overlay text */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h4 className="text-white font-serif text-xl md:text-2xl font-light mb-2 tracking-wide">
                      Premium Hookah Collection
                    </h4>
                    <p className="text-gray-200/80 text-sm font-light">
                      Authentic flavors, premium quality
                    </p>
                  </div>

                  {/* Subtle accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500/60 via-amber-400/40 to-transparent" />
                </div>
              )}
              
              {index === 1 && (
                <div className="relative h-full">
                  <img 
                    src="/images/food1.jpg" 
                    alt="Gourmet Cuisine" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                  
                  {/* Elegant overlay text */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h4 className="text-white font-serif text-xl md:text-2xl font-light mb-2 tracking-wide">
                      Culinary Masterpieces
                    </h4>
                    <p className="text-gray-200/80 text-sm font-light">
                      International cuisine, local passion
                    </p>
                  </div>

                  {/* Subtle accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/60 via-emerald-400/40 to-transparent" />
                </div>
              )}
              
              {index === 2 && (
                <div className="relative h-full">
                  <img 
                    src="/images/drink1.jpg" 
                    alt="Craft Beverages" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                  
                  {/* Elegant overlay text */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h4 className="text-white font-serif text-xl md:text-2xl font-light mb-2 tracking-wide">
                      Artisan Beverages
                    </h4>
                    <p className="text-gray-200/80 text-sm font-light">
                      Crafted cocktails, premium selection
                    </p>
                  </div>

                  {/* Subtle accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/60 via-purple-400/40 to-transparent" />
                </div>
              )}
            </div>

            {/* Elegant border */}
            <div className="absolute inset-0 rounded-lg border border-white/10 pointer-events-none" />

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollResponsiveSection;
