import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../utils/LanguageContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { getText } = useLanguage();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Set initial scroll state based on current scroll position
    setIsScrolled(window.scrollY > 10);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Smooth scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const navLinks = [
    { 
      to: "/drinks", 
      text: { en: "Drinks", bg: "Напитки" }
    },
    { 
      to: "/food", 
      text: { en: "Food", bg: "Храна" }
    },
    { 
      to: "/hookahs", 
      text: { en: "Hookahs", bg: "Наргилета" }
    },
    { 
      to: "/about", 
      text: { en: "About", bg: "За нас" },
      anchor: "#about"
    }
  ];

  const handleNavClick = (link) => {
    if (location.pathname === '/' && link.anchor) {
      // Smooth scroll to section on homepage
      const element = document.querySelector(link.anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Smooth scroll to top when navigating to different pages
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <nav 
        className={`top-0 left-0 right-0 transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/30 backdrop-blur-md shadow-lg' 
            : 'bg-black/60 backdrop-blur-sm'
        }`}
        style={{ 
          position: 'fixed',
          zIndex: 99999,
          width: '100vw',
          top: 0,
          left: 0,
          right: 0,
          margin: 0,
          padding: 0
        }}
      >
        <div className="flex items-center justify-between h-20 max-w-7xl mx-auto px-3 lg:px-6">
          
          {/* Logo - Left Side */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img 
              src="/images/logo.png" 
              alt="DG Hookah Logo" 
              className="h-16 lg:h-20 max-w-48 object-contain transform scale-125 -ml-2 pt-1"
              style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.8))' }}
            />
            <span className="ml-2 text-xl font-display font-bold text-gradient text-shadow-glow hidden sm:block text-white">
              DG Hookah
            </span>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => handleNavClick(link)}
                className={`font-sans font-medium text-sm tracking-wide uppercase transition-all duration-300 hover:text-white hover:scale-105 text-shadow-glow ${
                  location.pathname === link.to 
                    ? 'text-white font-semibold animate-glow' 
                    : 'text-gray-300'
                }`}
              >
                {getText(link.text)}
              </Link>
            ))}
          </div>

          {/* Social Icons - Right Side */}
          <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
            {/* Instagram Icon */}
            <a
              href="https://instagram.com/dghookah" // Replace with actual Instagram URL
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
              aria-label="Follow us on Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* Google Maps Icon */}
            <a
              href="https://maps.google.com/?q=DG+Hookah+Lounge" // Replace with actual location
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
              aria-label="Find us on Google Maps"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </a>

            {/* Phone Icon */}
            <a
              href="tel:+1234567890" // Replace with actual phone number
              className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
              aria-label="Call us"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </a>
          </div>

          {/* Mobile Menu Button - Bigger with more right spacing */}
          <div className="lg:hidden flex items-center pr-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-100 hover:text-white focus:outline-none focus:text-white transition-all duration-300 text-shadow-glow p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Improved Aesthetic Layout */}
        <div className={`lg:hidden fixed top-20 left-4 right-4 transition-all duration-300 ${
          isMenuOpen 
            ? 'opacity-100 pointer-events-auto transform translate-y-0' 
            : 'opacity-0 pointer-events-none transform -translate-y-2'
        }`}>
          <div className="bg-black/95 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-2xl">
            {/* Centered Navigation Links */}
            <div className="flex flex-col items-center space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => handleNavClick(link)}
                  className={`font-sans font-medium text-lg tracking-wide uppercase transition-all duration-300 hover:text-white hover:scale-105 text-shadow text-center ${
                    location.pathname === link.to 
                      ? 'text-white font-semibold animate-glow' 
                      : 'text-gray-300'
                  }`}
                >
                  {getText(link.text)}
                </Link>
              ))}
            </div>
            
            {/* Mobile Social Icons - Better Spacing */}
            <div className="flex items-center justify-center space-x-8 pt-8 mt-8 border-t border-white/20">
              {/* Instagram Icon */}
              <a
                href="https://instagram.com/dghookah" // Replace with actual Instagram URL
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-125 p-2"
                aria-label="Follow us on Instagram"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Google Maps Icon */}
              <a
                href="https://maps.google.com/?q=DG+Hookah+Lounge" // Replace with actual location
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-125 p-2"
                aria-label="Find us on Google Maps"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </a>

              {/* Phone Icon */}
              <a
                href="tel:+1234567890" // Replace with actual phone number
                className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-125 p-2"
                aria-label="Call us"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
