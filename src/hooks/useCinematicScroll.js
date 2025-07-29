import { useCallback } from 'react';

export const useCinematicScroll = () => {
  const scrollToSection = useCallback((targetId, options = {}) => {
    const {
      duration = 1200, // Much smoother default - increased from 300ms
      easing = 'cubic-bezier(0.25, 0.1, 0.25, 1)', // Smoother easing
      offset = -100,
      revealElements = true,
      showLoadingOverlay = true
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

    // Gentler reveal animation for better performance
    const revealElementsOnScroll = (progress) => {
      if (!revealElements) return;

      // Throttle for better performance - only on significant progress changes
      if (progress < 0.3) return; // Don't start revealing too early

      const currentScroll = window.pageYOffset;
      const viewportHeight = window.innerHeight;
      
      // Get sections in current viewport only
      const sectionsInView = document.querySelectorAll('section');
      
      sectionsInView.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top + currentScroll;
        
        // Only process sections that are actually visible
        if (Math.abs(sectionTop - currentScroll) < viewportHeight * 1.5) {
          const revealElements = section.querySelectorAll('[data-reveal-on-scroll]');
          revealElements.forEach((element, index) => {
            if (!element.classList.contains('revealed')) {
              // Stagger the reveals for smoother effect
              setTimeout(() => {
                element.classList.add('animate-cinematic-reveal', 'revealed');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) scale(1)';
              }, index * 50); // Small stagger delay
            }
          });
        }
      });
    };

    const overlay = showLoadingOverlay ? addScrollOverlay() : null;
    
    // Disable global smooth scrolling during our custom animation
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';
    
    // Add cinematic scroll active class to body
    document.body.classList.add('cinematic-scroll-active');

    const animateScroll = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Much smoother easing function
      const easeInOutQuart = (t) => {
        return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
      };

      const easedProgress = easeInOutQuart(progress);
      const currentPosition = startPosition + (distance * easedProgress);
      
      // Ultra-smooth scrolling
      window.scrollTo({
        top: currentPosition,
        left: 0,
        behavior: 'auto'
      });
      
      if (showLoadingOverlay && overlay) {
        updateScrollOverlay(progress);
      }
      
      // Less frequent element reveals for smoother performance
      if (Math.floor(progress * 10) % 3 === 0) {
        revealElementsOnScroll(progress);
      }

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        // Cleanup
        if (showLoadingOverlay && overlay) {
          removeScrollOverlay();
        }
        document.body.classList.remove('cinematic-scroll-active');
        
        // Restore original scroll behavior
        document.documentElement.style.scrollBehavior = originalScrollBehavior;
        document.body.style.scrollBehavior = originalScrollBehavior;
        
        target.classList.add('target-reached');
        
        // Gentle final reveal
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
