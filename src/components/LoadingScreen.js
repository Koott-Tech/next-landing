'use client';

import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Color changing animation for the text
    const colors = ['#27ae60', '#3498db', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c'];
    let colorIndex = 0;

    const colorChangeInterval = setInterval(() => {
      gsap.to('.loading-text', {
        color: colors[colorIndex],
        duration: 0.8,
        ease: "power2.out"
      });
      colorIndex = (colorIndex + 1) % colors.length;
    }, 800);

    // Simulate loading time (you can adjust this or make it based on actual loading)
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
      
      // Fade out animation
      gsap.to('.loading-screen', {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          if (onLoadingComplete) {
            onLoadingComplete();
          }
        }
      });

      clearInterval(colorChangeInterval);
    }, 1500); // reduced from 3000ms to 1500ms

    return () => {
      clearInterval(colorChangeInterval);
      clearTimeout(loadingTimeout);
    };
  }, [onLoadingComplete]);

  return (
    <div 
      className="loading-screen"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div 
        className="loading-text"
        style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          color: '#27ae60',
          textAlign: 'center',
          letterSpacing: '0.1em',
          textShadow: '0 4px 8px rgba(0,0,0,0.1)',
          transform: 'translateZ(0)', // Force GPU acceleration
        }}
      >
        Hopelly
      </div>
    </div>
  );
};

export default LoadingScreen; 