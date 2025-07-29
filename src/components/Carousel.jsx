import { useState, useEffect } from 'react';
import { useLanguage } from '../utils/LanguageContext';
import { useCinematicScroll } from '../hooks/useCinematicScroll';
import { carouselSlides } from '../data/menuData';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const { getText } = useLanguage();
  const { scrollToSection } = useCinematicScroll();

  // Preload all images to prevent glitches
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = carouselSlides.map(slide => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve; // Continue even if image fails to load
          img.src = `/images/${slide.image}`;
        });
      });
      
      await Promise.all(imagePromises);
      setImagesLoaded(true);
    };

    preloadImages();
  }, []);

  // Auto-advance slides only after images are loaded with smooth fade
  useEffect(() => {
    if (!imagesLoaded) return;
    
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % carouselSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [imagesLoaded]);

  const goToSlide = (index) => {
    if (index === currentSlide) return;
    setCurrentSlide(index);
  };

  const handleExploreClick = (e) => {
    e.preventDefault();
    setIsScrolling(true);
    
    // Much gentler effects for smooth experience
    const flash = document.createElement('div');
    flash.className = 'cinematic-flash-overlay-smooth';
    document.body.appendChild(flash);
    
    // Add back the ripple effect - you liked this!
    const ripple = document.createElement('div');
    ripple.className = 'cinematic-ripple-effect';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    
    // Gentle delay before scroll
    setTimeout(() => {
      scrollToSection('#hookahs', {
        duration: 2000, // Even longer for testing - 2 seconds 
        offset: -100,
        revealElements: true,
        showLoadingOverlay: false, // Keep it simple
        easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)' // Even gentler easing
      });
    }, 150); // Slightly longer delay to see the effects

    // Cleanup effects
    setTimeout(() => {
      flash.remove();
      ripple.remove();
    }, 1500); // Give ripple time to complete its 1s animation

    // Reset scrolling state after animation
    setTimeout(() => {
      setIsScrolling(false);
    }, 2300); // Match the longer duration + delay
  };

  return (
    <div className="relative w-full h-screen -mt-20 overflow-hidden carousel-container">
      {/* Background Images with smooth crossfade - improved positioning */}
      {carouselSlides.map((slide, index) => (
        <div 
          key={slide.id} 
          className={`absolute top-0 left-0 w-full h-full carousel-smooth-fade ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img 
            src={`/images/${slide.image}`}
            alt={getText(slide.title)}
            className="carousel-image-fixed"
          />
          {/* Enhanced cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80"></div>
        </div>
      ))}

      {/* Remove the blink overlay since we're using smooth fade */}
      
      {/* Static Content Overlay - doesn't move with slides */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center text-white max-w-4xl mx-auto px-6">
          {/* Dynamic title - stack all texts in same position, control with opacity only */}
          <div className="mb-6 relative min-h-[4rem] md:min-h-[5rem] lg:min-h-[6rem] text-center w-full">
            <div className="relative">
              {carouselSlides.map((slide, index) => (
                <h1 
                  key={slide.id}
                  className={`text-4xl md:text-5xl lg:text-6xl font-display font-bold text-cinematic-glow-strong text-gradient leading-tight text-center transition-opacity duration-800 ease-in-out ${
                    index === currentSlide 
                      ? 'opacity-100' 
                      : 'opacity-0'
                  } ${index === 0 ? 'relative' : 'absolute inset-0'}`}
                  style={{
                    transitionDelay: '200ms',
                    transform: 'translate3d(0, 0, 0)',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  {getText(slide.title)}
                </h1>
              ))}
            </div>
          </div>
          
          {/* Dynamic subtitle - stack all texts in same position, control with opacity only */}
          <div className="mb-8 relative min-h-[2rem] md:min-h-[3rem] text-center w-full">
            <div className="relative">
              {carouselSlides.map((slide, index) => (
                <p 
                  key={slide.id}
                  className={`text-xl md:text-2xl text-gray-200 font-body text-shadow leading-relaxed text-center transition-opacity duration-800 ease-in-out ${
                    index === currentSlide 
                      ? 'opacity-100' 
                      : 'opacity-0'
                  } ${index === 0 ? 'relative' : 'absolute inset-0'}`}
                  style={{
                    transitionDelay: '200ms',
                    transform: 'translate3d(0, 0, 0)',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  {getText(slide.subtitle)}
                </p>
              ))}
            </div>
          </div>
          
          {/* Static button - never moves */}
          <button 
            onClick={handleExploreClick}
            className={`btn-cinematic-explore group relative inline-flex items-center space-x-3 text-lg px-8 py-4 transform transition-all duration-500 ${
              isScrolling ? 'scroll-loading scale-110' : 'hover:scale-105'
            }`}
            disabled={isScrolling}
            style={{ transitionDelay: '100ms' }}
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
