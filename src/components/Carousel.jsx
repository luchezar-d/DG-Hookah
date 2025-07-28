import { useState, useEffect } from 'react';
import { useLanguage } from '../utils/LanguageContext';
import { carouselSlides } from '../data/menuData';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { getText } = useLanguage();

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

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Slides */}
      <div 
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {carouselSlides.map((slide) => (
          <div key={slide.id} className="min-w-full h-full relative">
            <img 
              src={`/images/${slide.image}`}
              alt={getText(slide.title)}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay with gradient - reduced opacity to show images */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
            
            {/* Caption */}
            <div className="absolute inset-0 flex items-center justify-center text-center text-white z-10">
              <div className="max-w-4xl px-6">
                <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-shadow-glow animate-fade-in-up text-gradient">
                  {getText(slide.title)}
                </h1>
                <p className="text-xl md:text-3xl mb-8 text-gray-200 font-body animate-fade-in-up animation-delay-300 text-shadow">
                  {getText(slide.subtitle)}
                </p>
                <a 
                  href="#hookahs"
                  className="btn-primary inline-block text-lg px-8 py-4 animate-fade-in-up animation-delay-600 hover:shadow-primary-500/50"
                >
                  {getText({ en: "Explore Menu", bg: "Разгледай менюто" })}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-all duration-300 z-20 hover:scale-110 text-shadow-glow"
        aria-label="Previous slide"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-all duration-300 z-20 hover:scale-110 text-shadow-glow"
        aria-label="Next slide"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-110 ${
              index === currentSlide 
                ? 'bg-white animate-glow' 
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
