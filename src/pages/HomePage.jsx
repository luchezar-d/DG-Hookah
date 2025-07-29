import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Carousel from '../components/Carousel';
import FeatureCard from '../components/FeatureCard';
import ScrollResponsiveSection from '../components/ScrollResponsiveSection';
import { homeFeatures } from '../data/menuData';
import { useLanguage } from '../utils/LanguageContext';

const HomePage = () => {
  const { getText } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  // Mouse position tracking for 3d effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animations for mouse following - optimized for better performance
  const springX = useSpring(mouseX, { stiffness: 150, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 40 });

  // Track mouse movement with throttling for better performance
  useEffect(() => {
    let timeout;
    
    const handleMouseMove = (e) => {
      if (timeout) return;
      
      timeout = setTimeout(() => {
        const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
        const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
        
        setMousePosition({ x, y });
        mouseX.set(x * 5); // Reduced intensity
        mouseY.set(y * 5);
        
        timeout = null;
      }, 32); // Limit to ~30fps
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [mouseX, mouseY]);

  // Scroll-based transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '200%']);

  return (
    <div className="text-gray-100 min-h-screen relative overflow-hidden">
      {/* Carousel Section */}
      <Carousel />
      
      {/* 3D Interactive Elements Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-black/80 via-black/40 to-black/80">
        {/* Interactive 3D Content Sections */}
        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollResponsiveSection
            title={getText({ en: "Premium Hookah Experience", bg: "Премиум Наргиле Изживяване" })}
            description={getText({ 
              en: "Discover our meticulously crafted hookah selection with premium tobacco blends and authentic flavors that transport you to a world of relaxation.",
              bg: "Открийте нашата внимателно подбрана селекция от наргилета с премиум тютюневи смеси и автентични вкусове, които ви пренасят в свят на релаксация."
            })}
            imagePosition="right"
            scrollProgress={scrollYProgress}
            mousePosition={mousePosition}
            index={0}
          />

          <ScrollResponsiveSection
            title={getText({ en: "Exquisite Culinary Journey", bg: "Изисканo Кулинарно Пътешествие" })}
            description={getText({
              en: "Indulge in our carefully curated menu featuring international cuisine and signature dishes that perfectly complement your hookah experience.",
              bg: "Насладете се на нашето внимателно подбрано меню с международна кухня и фирмени ястия, които перфектно допълват вашето наргиле изживяване."
            })}
            imagePosition="left" 
            scrollProgress={scrollYProgress}
            mousePosition={mousePosition}
            index={1}
          />
        </div>
      </section>

      {/* Features Section - Main Menu Target */}
      <section id="hookahs" className="py-20 px-6 bg-white/5 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header with 3D Effects */}
          <motion.div 
            className="text-center mb-16"
            style={{
              rotateX: springY.get() * 0.3,
              rotateY: springX.get() * 0.3,
            }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-white/90 mb-8 tracking-wide"
              style={{
                y: useTransform(scrollYProgress, [0.3, 0.7], [50, -50]),
                scale: useTransform(scrollYProgress, [0.3, 0.7], [0.8, 1.1]),
              }}
            >
              Our Signature Collection
            </motion.h2>
            <motion.div 
              className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mx-auto mb-8"
              style={{
                scaleX: useTransform(scrollYProgress, [0.3, 0.7], [0, 1]),
              }}
            />
            <motion.p 
              className="text-lg md:text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed italic"
              style={{
                opacity: useTransform(scrollYProgress, [0.3, 0.7], [0, 1]),
                y: useTransform(scrollYProgress, [0.3, 0.7], [30, 0]),
              }}
            >
              Immerse yourself in an authentic journey of refined tastes, where tradition meets modern elegance
            </motion.p>
          </motion.div>
          
          {/* Feature Cards Grid with 3D Mouse Following */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeFeatures.map((feature, index) => (
              <motion.div 
                key={feature.id}
                style={{
                  rotateX: springY.get() * (index % 2 === 0 ? 0.5 : -0.5),
                  rotateY: springX.get() * (index % 2 === 0 ? 0.5 : -0.5),
                  y: useTransform(scrollYProgress, [0.4, 0.8], [100, 0]),
                  opacity: useTransform(scrollYProgress, [0.4, 0.8], [0, 1]),
                }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: mousePosition.x * 10,
                  rotateX: -mousePosition.y * 10,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <FeatureCard feature={feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
