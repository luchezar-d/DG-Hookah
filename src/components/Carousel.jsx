import { useState, useEffect } from 'react';
import { useLanguage } from '../utils/LanguageContext';
import { useCinematicScroll } from '../hooks/useCinematicScroll';
import { carouselSlides } from '../data/menuData';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const { getText } = useLanguage();
  const { scrollToSection } = useCinematicScroll();

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % carouselSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => prev === 0 ? carouselSlides.length - 1 : prev - 1);
  };

  const handleExploreClick = (e) => {
    e.preventDefault();
    setIsScrolling(true);
    
    // Add cinematic screen flash effect
    const flash = document.createElement('div');
    flash.className = 'cinematic-flash-overlay';
    document.body.appendChild(flash);
    
    // Add screen ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'cinematic-ripple-effect';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    
    // Slight delay before scroll for dramatic effect
    setTimeout(() => {
      scrollToSection('#hookahs', {
        duration: 300, // Super fast - 300ms as requested
        offset: -100,
        revealElements: true,
        showLoadingOverlay: false // Disable loading overlay but keep splash effects
      });
    }, 200);

    // Cleanup effects
    setTimeout(() => {
      flash.remove();
      ripple.remove();
    }, 600);

    // Reset scrolling state after animation
    setTimeout(() => {
      setIsScrolling(false);
    }, 800); // Reduced to match faster animation
  };

  return (
    <div className="relative w-full h-screen -mt-20 overflow-hidden">
      {/* Slides */}
      <div 
        className="flex transition-transform duration-1000 ease-in-out h-full will-change-transform hardware-accelerated"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {carouselSlides.map((slide) => (
          <div key={slide.id} className="min-w-full h-full relative">
            <img 
              src={`/images/${slide.image}`}
              alt={getText(slide.title)}
              className="w-full h-full object-cover will-change-transform"
            />
            {/* Enhanced cinematic overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80"></div>
            
            {/* Caption - moved to bottom with cinematic effects */}
            <div className="absolute bottom-0 left-0 right-0 pb-28 text-center text-white z-10">
              <div className="max-w-3xl mx-auto px-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-5 text-cinematic-glow-strong animate-cinematic-fade-in text-gradient">
                  {getText(slide.title)}
                </h1>
                <p className="text-xl md:text-2xl mb-7 text-gray-200 font-body animate-cinematic-slide-up stagger-2 text-shadow">
                  {getText(slide.subtitle)}
                </p>
                <button 
                  onClick={handleExploreClick}
                  className={`btn-cinematic-explore group relative inline-flex items-center space-x-3 text-lg px-8 py-4 animate-cinematic-scale-in stagger-3 transform transition-all duration-500 ${
                    isScrolling ? 'scroll-loading scale-110' : 'hover:scale-105'
                  }`}
                  disabled={isScrolling}
                >
                  <span className="relative z-10 font-semibold">
                    {getText({ en: "Explore Menu", bg: "Разгледайте менюто" })}
                  </span>
                  {!isScrolling ? (
                    <svg className="w-6 h-6 transform group-hover:translate-y-1 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  ) : (
                    <div className="w-6 h-6 flex items-center justify-center relative z-10">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  
                  {/* Enhanced button effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-white/5 rounded-full animate-pulse"></div>
                  
                  {isScrolling && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full animate-shimmer-fast"></div>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows with cinematic styling */}
      <button 
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-all duration-300 z-20 hover:scale-110 text-cinematic-glow glass-cinematic p-3 rounded-full hover-cinematic"
        aria-label="Previous slide"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-all duration-300 z-20 hover:scale-110 text-cinematic-glow glass-cinematic p-3 rounded-full hover-cinematic"
        aria-label="Next slide"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Enhanced Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20 glass-cinematic px-6 py-3 rounded-full">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-500 hover:scale-125 ${
              index === currentSlide 
                ? 'bg-white animate-pulse shadow-lg shadow-white/50' 
                : 'bg-gray-500 hover:bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
