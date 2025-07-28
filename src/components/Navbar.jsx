import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../utils/LanguageContext';
import { useNavbarHeight } from '../hooks/useNavbarHeight';
import LanguageToggle from './LanguageToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { getText } = useLanguage();
  const navbarHeight = useNavbarHeight();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { 
      to: "/about", 
      text: { en: "About", bg: "За нас" },
      anchor: "#about"
    },
    { 
      to: "/contact", 
      text: { en: "Contact", bg: "Контакт" },
      anchor: "#contact"
    },
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
    }
  ];

  const handleNavClick = (link) => {
    if (location.pathname === '/' && link.anchor) {
      // Smooth scroll to section on homepage
      const element = document.querySelector(link.anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 transition-all duration-300 ${
          isScrolled 
            ? 'navbar-scrolled' 
            : 'navbar-transparent'
        }`}
        style={{ height: `${navbarHeight}px` }}
      >
        <div className="flex items-center justify-between h-full max-w-7xl mx-auto">
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/images/logo.png" 
              alt="DG Hookah Logo" 
              className="h-16 lg:h-20 max-w-48 object-contain transform scale-125 -ml-2 pt-1 animate-float"
              style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.8))' }}
            />
            <span className="ml-2 text-xl font-display font-bold text-gradient text-shadow-glow hidden sm:block">
              DG Hookah
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => handleNavClick(link)}
                className={`font-heading font-medium text-responsive transition-all duration-300 hover:text-primary-400 hover:scale-105 text-shadow-glow ${
                  location.pathname === link.to 
                    ? 'text-primary-400 font-semibold animate-glow' 
                    : 'text-gray-100'
                }`}
              >
                {getText(link.text)}
              </Link>
            ))}
            
            {/* Language Toggle */}
            <div className="ml-4">
              <LanguageToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <LanguageToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-100 hover:text-primary-400 focus:outline-none focus:text-primary-400 transition-all duration-300 text-shadow-glow"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden fixed top-20 left-4 right-4 transition-all duration-300 ${
          isMenuOpen 
            ? 'opacity-100 pointer-events-auto transform translate-y-0' 
            : 'opacity-0 pointer-events-none transform -translate-y-2'
        }`}>
          <div className="card-glass rounded-xl p-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => handleNavClick(link)}
                className={`block font-heading font-medium text-responsive transition-all duration-300 hover:text-primary-400 hover:translate-x-2 text-shadow ${
                  location.pathname === link.to 
                    ? 'text-primary-400 font-semibold' 
                    : 'text-gray-100'
                }`}
              >
                {getText(link.text)}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      
      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div style={{ height: `${navbarHeight}px` }} />
    </>
  );
};

export default Navbar;
