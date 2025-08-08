'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
// Import throttle utility for better performance
import { throttle } from '../utils/scrollUtils';

const HumanChatSection = () => {
  const targetRef = useRef(null);
  const textRef = useRef(null);
  const paragraphRef = useRef(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Text phrases for animation
  const textPhrases = ["Get started", "Effortless", "Full picture", "Goal driven"];
  
  // Paragraph phrases for animation
  const paragraphPhrases = [
    "Begin your mental health journey with personalized therapy sessions tailored to your unique needs.",
    "Experience seamless communication with your therapist through our intuitive chat interface.",
    "Get a comprehensive understanding of your progress with detailed insights and tracking.",
    "Stay motivated and focused on your mental health goals with our supportive platform."
  ];
  
  useEffect(() => {
    if (typeof window === 'undefined' || !targetRef.current) return;
    
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Create a ScrollTrigger that tracks scroll progress
    const scrollTrigger = ScrollTrigger.create({
      trigger: targetRef.current,
      start: "top bottom", // when top of the trigger hits bottom of viewport
      end: "bottom top", // when bottom of the trigger hits top of viewport
      onUpdate: throttle((self) => {
        // Update scroll progress (0-1 range)
        setScrollProgress(self.progress);
        
        // Calculate which text/paragraph should be visible based on scroll progress
        const textIndex = Math.min(
          Math.floor(self.progress * textPhrases.length),
          textPhrases.length - 1
        );
        const paragraphIndex = Math.min(
          Math.floor(self.progress * paragraphPhrases.length),
          paragraphPhrases.length - 1
        );
        
        setCurrentTextIndex(textIndex);
        setCurrentParagraphIndex(paragraphIndex);
      }, 16) // Throttle to 60fps for better performance
    });
    
    return () => {
      // Clean up ScrollTrigger
      scrollTrigger.kill();
    };
  }, [textPhrases.length, paragraphPhrases.length]);

  return (
    <div ref={targetRef} className="relative z-0 h-[300vh] w-full">
      <div className="sticky-optimized mx-auto flex h-screen items-center justify-center bg-white px-[1rem] py-[5rem]">
        {/* Centered Heading */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-center z-10 max-w-4xl w-full px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-32">
            You need a human to chat, not a bot
          </h2>
        </div>
        
        <div className="flex flex-row items-center justify-between w-full max-w-6xl gap-16 mt-48">
          {/* Left side - Animated text */}
          <div className="flex-1 flex flex-col items-start justify-center text-left">
            {/* Animated Heading */}
            <div className="mb-6">
              <AnimatedText 
                currentIndex={currentTextIndex}
                scrollProgress={scrollProgress}
                textPhrases={textPhrases} 
              />
            </div>
            
            {/* Animated Paragraph */}
            <div className="max-w-lg">
              <AnimatedParagraph 
                currentIndex={currentParagraphIndex}
                scrollProgress={scrollProgress}
                paragraphPhrases={paragraphPhrases} 
              />
            </div>
          </div>

          {/* Right side - Image */}
          <div className="flex-1 flex items-center justify-center">
            <Image
              src="/mob.png"
              alt="Mobile app interface"
              width={400}
              height={600}
              className="max-w-full h-auto max-h-[60vh] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const AnimatedText = ({ currentIndex, scrollProgress, textPhrases }) => {
  // Get the current text to display
  const currentText = textPhrases[currentIndex] || textPhrases[0];

  // Calculate fade animation for the current text
  const phaseProgress = (scrollProgress * textPhrases.length) % 1;

  // Special opacity logic for first and last text
  const getOpacity = () => {
    const totalPhases = textPhrases.length;
    const currentPhase = Math.floor(scrollProgress * totalPhases);
    const phaseProgress = (scrollProgress * totalPhases) % 1;
    
    // First text (index 0) - sticks to viewport longer before changing
    if (currentPhase === 0) {
      return phaseProgress < 0.8 ? 1 : 1 - ((phaseProgress - 0.8) / 0.2);
    }
    
    // Last text (index 3) - fade in and stay visible until scroll ends
    if (currentPhase === totalPhases - 1) {
      return phaseProgress < 0.3 ? 0 : 1;
    }
    
    // Check if we've reached the last text phase - if so, keep last text visible
    if (scrollProgress >= (totalPhases - 1) / totalPhases) {
      return 1; // Keep last text visible
    }
    
    // Middle texts - normal fade in/out
    if (phaseProgress < 0.3) return 0;
    if (phaseProgress > 0.7) return 1 - ((phaseProgress - 0.7) / 0.3);
    return 1;
  };

  const getY = () => {
    if (phaseProgress < 0.3) return 20;
    if (phaseProgress > 0.7) return -20;
    return 0;
  };

  return (
    <div className="relative h-16 flex items-center justify-center">
      <div
        style={{ 
          opacity: getOpacity(), 
          transform: `translateY(${getY()}px)`,
          transition: 'opacity 0.3s ease, transform 0.3s ease'
        }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 scroll-optimized"
      >
        {currentText}
      </div>
    </div>
  );
};

const AnimatedParagraph = ({ currentIndex, scrollProgress, paragraphPhrases }) => {
  // Get the current paragraph to display
  const currentParagraph = paragraphPhrases[currentIndex] || paragraphPhrases[0];

  // Calculate fade animation for the current paragraph
  const phaseProgress = (scrollProgress * paragraphPhrases.length) % 1;

  // Special opacity logic for first and last paragraph
  const getOpacity = () => {
    const totalPhases = paragraphPhrases.length;
    const currentPhase = Math.floor(scrollProgress * totalPhases);
    const phaseProgress = (scrollProgress * totalPhases) % 1;
    
    // First paragraph (index 0) - sticks to viewport longer before changing
    if (currentPhase === 0) {
      return phaseProgress < 0.8 ? 1 : 1 - ((phaseProgress - 0.8) / 0.2);
    }
    
    // Last paragraph (index 3) - fade in and stay visible until scroll ends
    if (currentPhase === totalPhases - 1) {
      return phaseProgress < 0.3 ? 0 : 1;
    }
    
    // Check if we've reached the last paragraph phase - if so, keep last paragraph visible
    if (scrollProgress >= (totalPhases - 1) / totalPhases) {
      return 1; // Keep last paragraph visible
    }
    
    // Middle paragraphs - normal fade in/out
    if (phaseProgress < 0.3) return 0;
    if (phaseProgress > 0.7) return 1 - ((phaseProgress - 0.7) / 0.3);
    return 1;
  };

  const getY = () => {
    if (phaseProgress < 0.3) return 20;
    if (phaseProgress > 0.7) return -20;
    return 0;
  };

  return (
    <div className="relative min-h-[80px] flex items-center">
      <p
        style={{ 
          opacity: getOpacity(), 
          transform: `translateY(${getY()}px)`,
          transition: 'opacity 0.3s ease, transform 0.3s ease'
        }}
        className="text-base md:text-lg text-gray-700 leading-relaxed scroll-optimized"
      >
        {currentParagraph}
      </p>
    </div>
  );
};



export default HumanChatSection;