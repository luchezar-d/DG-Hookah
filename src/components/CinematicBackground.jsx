import { useState, useEffect } from 'react';

const CinematicBackground = ({ children, variant = 'default' }) => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) * 0.01,
        y: (e.clientY - window.innerHeight / 2) * 0.01,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Cinematic Loading Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-all duration-2000 ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="text-center">
          {/* Loading Content - Horizontal Layout */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            {/* Loading Animation - Left Side */}
            <div className="relative flex items-center justify-center">
              {/* Outer ring */}
              <div className="relative w-8 h-8 border-2 border-white/20 rounded-full animate-spin">
                {/* Middle ring */}
                <div className="absolute top-0.5 left-0.5 w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin" 
                     style={{ animationDirection: 'reverse' }} />
                {/* Inner ring */}
                <div className="absolute top-1 left-1 w-4 h-4 border-2 border-white/60 border-t-white rounded-full animate-spin" />
              </div>
            </div>
            
            {/* Loading Text - Right Side */}
            <div className="text-left">
              <div className="text-white font-display text-xl animate-pulse">
                DG Hookah
              </div>
              <div className="text-white/60 text-xs tracking-widest uppercase animate-fade-in-up">
                Loading Experience...
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-48 h-px bg-white/20 mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-transparent via-white to-transparent animate-loading-bar" />
          </div>
        </div>
      </div>

      {/* Subtle Background Pattern (No Stars) */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-black to-gray-800/20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255,255,255,0.05) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(255,255,255,0.03) 0%, transparent 50%),
              radial-gradient(circle at 50% 80%, rgba(255,255,255,0.02) 0%, transparent 40%)
            `,
            transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px) translateY(${scrollY * 0.1}px)`,
          }}
        />
      </div>

      {/* Content Container */}
      <div 
        className={`relative z-10 transition-all duration-1500 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default CinematicBackground;
