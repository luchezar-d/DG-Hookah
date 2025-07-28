import { useState, useEffect } from 'react';

export const useNavbarHeight = () => {
  const [navbarHeight, setNavbarHeight] = useState(72); // Default fallback height

  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector('nav');
      if (navbar) {
        const height = navbar.offsetHeight;
        // Only update if there's a significant change to avoid flicker
        if (Math.abs(height - navbarHeight) > 2) {
          setNavbarHeight(height);
        }
      }
    };

    // Initial measurement with a small delay to ensure DOM is ready
    const initialMeasurement = () => {
      setTimeout(updateNavbarHeight, 10);
    };
    
    initialMeasurement();

    // Update on window resize
    window.addEventListener('resize', updateNavbarHeight);

    // Use MutationObserver to detect navbar changes
    const navbar = document.querySelector('nav');
    if (navbar) {
      const observer = new MutationObserver(() => {
        // Debounce the updates to prevent excessive recalculations
        setTimeout(updateNavbarHeight, 10);
      });
      
      observer.observe(navbar, { 
        attributes: true, 
        childList: true, 
        subtree: true 
      });

      return () => {
        window.removeEventListener('resize', updateNavbarHeight);
        observer.disconnect();
      };
    }

    return () => {
      window.removeEventListener('resize', updateNavbarHeight);
    };
  }, [navbarHeight]);

  return navbarHeight;
};
