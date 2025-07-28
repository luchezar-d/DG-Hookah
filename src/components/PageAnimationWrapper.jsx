import { useState, useEffect } from 'react';

const PageAnimationWrapper = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center transition-all duration-1000">
          <div className="text-center">
            {/* Loading Animation */}
            <div className="relative">
              <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-6"></div>
              <div className="absolute inset-0 w-16 h-16 border-2 border-white/10 rounded-full animate-ping mx-auto"></div>
            </div>
            
            {/* Loading Text */}
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 animate-pulse">
              DG Hookah
            </h2>
            <p className="text-gray-400 text-sm tracking-wider uppercase animate-fade-in">
              Loading Experience...
            </p>
            
            {/* Progress Bar */}
            <div className="w-64 h-1 bg-white/10 rounded-full mx-auto mt-6 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-white/40 to-white rounded-full animate-loading-bar"></div>
            </div>
          </div>
        </div>
      )}

      {/* Page Content with Fade-in Animation */}
      <div 
        className={`transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {children}
      </div>

      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%)`
          }}
        />
      </div>
    </div>
  );
};

export default PageAnimationWrapper;
