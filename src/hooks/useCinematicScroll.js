import { useCallback } from 'react';

export const useCinematicScroll = () => {
  const scrollToSection = useCallback((targetId, options = {}) => {
    const {
      duration = 300, // Super fast default - reduced from 800ms to 300ms
      easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      offset = -100,
      revealElements = true,
      showLoadingOverlay = true // Allow disabling the overlay while keeping other effects
    } = options;

    const target = document.querySelector(targetId);
    if (!target) return;

    const startPosition = window.pageYOffset;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset + offset;
    const distance = targetPosition - startPosition;
    
    let startTime = null;

    // Add cinematic scroll overlay
    const addScrollOverlay = () => {
      const overlay = document.createElement('div');
      overlay.className = 'cinematic-scroll-overlay';
      overlay.innerHTML = `
        <div class="cinematic-scroll-indicator">
          <div class="scroll-particles"></div>
          <div class="scroll-progress-bar">
            <div class="scroll-progress-fill"></div>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
      return overlay;
    };

    const updateScrollOverlay = (progress) => {
      const progressFill = document.querySelector('.scroll-progress-fill');
      if (progressFill) {
        progressFill.style.width = `${progress * 100}%`;
      }
    };

    const removeScrollOverlay = () => {
      const overlay = document.querySelector('.cinematic-scroll-overlay');
      if (overlay) {
        overlay.classList.add('fade-out');
        setTimeout(() => overlay.remove(), 500);
      }
    };

    // Simplified reveal animation for better performance
    const revealElementsOnScroll = (progress) => {
      if (!revealElements) return;

      // Only check sections currently in viewport for performance
      const currentScroll = window.pageYOffset;
      const viewportHeight = window.innerHeight;
      
      // Get sections in current viewport only
      const sectionsInView = document.querySelectorAll('section');
      
      sectionsInView.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top + currentScroll;
        
        // Only process sections that are near the viewport
        if (Math.abs(sectionTop - currentScroll) < viewportHeight * 2) {
          const revealElements = section.querySelectorAll('[data-reveal-on-scroll]');
          revealElements.forEach((element) => {
            if (!element.classList.contains('revealed')) {
              element.classList.add('animate-cinematic-reveal', 'revealed');
              element.style.opacity = '1';
              element.style.transform = 'translateY(0) scale(1)';
            }
          });
        }
      });
    };

    const overlay = showLoadingOverlay ? addScrollOverlay() : null;
    
    // Add cinematic scroll active class to body
    document.body.classList.add('cinematic-scroll-active');

    const animateScroll = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Simplified easing function for better performance
      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const easedProgress = easeInOutCubic(progress);
      const currentPosition = startPosition + (distance * easedProgress);
      
      window.scrollTo(0, currentPosition);
      if (showLoadingOverlay && overlay) {
        updateScrollOverlay(progress);
      }
      
      // Only reveal elements every few frames for performance
      if (Math.floor(progress * 20) % 2 === 0) {
        revealElementsOnScroll(progress);
      }

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        // Simplified cleanup
        if (showLoadingOverlay && overlay) {
          removeScrollOverlay();
        }
        document.body.classList.remove('cinematic-scroll-active'); // Remove active class
        target.classList.add('target-reached');
        
        // Quick final reveal without heavy effects
        const targetChildren = target.querySelectorAll('[data-final-reveal]');
        targetChildren.forEach((child) => {
          child.classList.add('animate-cinematic-fade-in', 'final-revealed');
        });
      }
    };

    requestAnimationFrame(animateScroll);
  }, []);

  return { scrollToSection };
};
