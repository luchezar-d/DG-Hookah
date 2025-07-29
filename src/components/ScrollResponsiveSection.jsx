import { motion, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ScrollResponsiveSection = ({ 
  title, 
  description, 
  imagePosition = 'left', 
  scrollProgress, 
  mousePosition,
  index 
}) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: '0px'
  });

  // Much simpler transforms for better performance
  const offsetStart = index * 0.2;
  const offsetEnd = offsetStart + 0.3;
  
  // Only essential transforms to reduce computational load
  const opacity = useTransform(scrollProgress, [offsetStart, offsetStart + 0.05, offsetEnd - 0.1, offsetEnd], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [offsetStart, offsetEnd], [15, -15]);

  // Minimal mouse interaction
  const mouseRotateY = mousePosition.x * 2;

  return (
    <div ref={ref} className="py-24">
      <div className={`max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center ${
        imagePosition === 'right' ? 'md:grid-flow-col-dense' : ''
      }`}>
        
        {/* Text Content */}
        <motion.div 
          className={imagePosition === 'right' ? 'md:col-start-1' : ''}
          style={{
            y,
            opacity,
          }}
        >
          <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
            {title}
          </h3>
          <p className="text-lg text-gray-300 leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* 3D Image/Visual Element */}
        <motion.div 
          className={`relative ${imagePosition === 'right' ? 'md:col-start-2' : ''}`}
          style={{
            opacity,
            y,
          }}
        >
          {/* 3D Container with Glass Morphism */}
          <div className="relative w-full h-96 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border border-white/30 overflow-hidden shadow-2xl">
            
            {/* Simplified Image Container */}
            <div className="absolute inset-4 bg-gradient-to-br from-white/30 to-white/10 rounded-xl overflow-hidden">
              {/* Dynamic Content Based on Index */}
              {index === 0 && (
                <div className="relative h-full">
                  <img 
                    src="/images/hookah1.jpg" 
                    alt="Premium Hookah" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-semibold text-xl">Premium Hookah</h4>
                  </div>
                </div>
              )}
              
              {index === 1 && (
                <div className="relative h-full">
                  <img 
                    src="/images/food1.jpg" 
                    alt="Gourmet Cuisine" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-semibold text-xl">Gourmet Cuisine</h4>
                  </div>
                </div>
              )}
              
              {index === 2 && (
                <div className="relative h-full">
                  <img 
                    src="/images/drink1.jpg" 
                    alt="Craft Beverages" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-semibold text-xl">Craft Beverages</h4>
                  </div>
                </div>
              )}
            </div>

            {/* Static Border for better performance */}
            <div className="absolute inset-0 rounded-2xl border-2 border-white/20" />

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollResponsiveSection;
