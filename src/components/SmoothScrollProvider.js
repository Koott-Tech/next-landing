'use client';

import React, { useEffect, useRef } from 'react';

const SmoothScrollProvider = ({ children }) => {
  const scrollContainerRef = useRef(null);
  const isScrollingRef = useRef(false);
  const scrollYRef = useRef(0);
  const targetScrollYRef = useRef(0);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let ticking = false;
    let lastScrollY = window.scrollY;

    // Smooth scroll animation function
    const smoothScroll = () => {
      const currentScrollY = scrollYRef.current;
      const targetScrollY = targetScrollYRef.current;
      
      // Add slight delay effect (like Lenis)
      const diff = targetScrollY - currentScrollY;
      const delta = diff * 0.1; // Adjust this value for more/less delay
      
      if (Math.abs(diff) > 0.1) {
        scrollYRef.current += delta;
        window.scrollTo(0, scrollYRef.current);
        animationFrameRef.current = requestAnimationFrame(smoothScroll);
      } else {
        scrollYRef.current = targetScrollY;
        window.scrollTo(0, targetScrollY);
        ticking = false;
      }
    };

    // Handle scroll events
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        targetScrollYRef.current = window.scrollY;
        
        if (!animationFrameRef.current) {
          animationFrameRef.current = requestAnimationFrame(smoothScroll);
        }
      }
    };

    // Handle wheel events for smoother scrolling
    const handleWheel = (e) => {
      e.preventDefault();
      
      const delta = e.deltaY;
      const scrollSpeed = 1.2; // Adjust for scroll sensitivity
      
      targetScrollYRef.current += delta * scrollSpeed;
      targetScrollYRef.current = Math.max(0, targetScrollYRef.current);
      targetScrollYRef.current = Math.min(
        targetScrollYRef.current,
        document.documentElement.scrollHeight - window.innerHeight
      );
      
      if (!ticking) {
        ticking = true;
        animationFrameRef.current = requestAnimationFrame(smoothScroll);
      }
    };

    // Handle touch events for mobile
    let touchStartY = 0;
    let touchStartScrollY = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
      touchStartScrollY = targetScrollYRef.current;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      const scrollSpeed = 1.5;
      
      targetScrollYRef.current = touchStartScrollY + (deltaY * scrollSpeed);
      targetScrollYRef.current = Math.max(0, targetScrollYRef.current);
      targetScrollYRef.current = Math.min(
        targetScrollYRef.current,
        document.documentElement.scrollHeight - window.innerHeight
      );
      
      if (!ticking) {
        ticking = true;
        animationFrameRef.current = requestAnimationFrame(smoothScroll);
      }
    };

    // Initialize scroll position
    scrollYRef.current = window.scrollY;
    targetScrollYRef.current = window.scrollY;

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div ref={scrollContainerRef} style={{ width: '100%', height: '100%' }}>
      {children}
    </div>
  );
};

export default SmoothScrollProvider; 