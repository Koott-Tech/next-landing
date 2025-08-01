'use client';

import { useEffect } from 'react';

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadResources = () => {
      // Preload critical images
      const criticalImages = [
        '/patient.jpg',
        '/irene.jpeg',
        '/hero_intro.mp4',
        '/hero+mobile.mp4'
      ];

      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = src.includes('.mp4') ? 'video' : 'image';
        link.href = src;
        document.head.appendChild(link);
      });

      // Preload critical fonts
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap';
      fontLink.as = 'style';
      document.head.appendChild(fontLink);
    };

    // Optimize scroll performance
    const optimizeScroll = () => {
      // Use passive event listeners for better scroll performance
      const originalAddEventListener = EventTarget.prototype.addEventListener;
      EventTarget.prototype.addEventListener = function(type, listener, options) {
        if (type === 'scroll' || type === 'touchstart' || type === 'touchmove') {
          options = options || {};
          options.passive = true;
        }
        return originalAddEventListener.call(this, type, listener, options);
      };
    };

    // Optimize animations
    const optimizeAnimations = () => {
      // Reduce motion for users who prefer it
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
      }

      // Optimize for high refresh rate displays
      if (window.matchMedia('(min-resolution: 2dppx)').matches) {
        document.documentElement.style.setProperty('--animation-smoothness', '1');
      }
    };

    // Initialize optimizations
    preloadResources();
    optimizeScroll();
    optimizeAnimations();

    // Cleanup function
    return () => {
      // Restore original addEventListener if needed
      if (EventTarget.prototype.addEventListener !== originalAddEventListener) {
        EventTarget.prototype.addEventListener = originalAddEventListener;
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceOptimizer; 