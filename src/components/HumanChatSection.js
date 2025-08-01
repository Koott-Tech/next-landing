'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HumanChatSection = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Text phrases for animation
  const textPhrases = ["Get started", "Effortless", "Full picture", "Goal driven"];

  return (
    <div ref={targetRef} className="relative z-0 h-[400vh] w-full">
      <div className="sticky top-0 mx-auto flex h-screen items-center justify-center bg-white px-[1rem] py-[5rem]">
        <div className="flex flex-row items-center justify-between w-full max-w-6xl gap-16">
          {/* Left side - Animated text */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <AnimatedText 
              scrollYProgress={scrollYProgress} 
              textPhrases={textPhrases} 
            />
          </div>

          {/* Right side - Image */}
          <div className="flex-1 flex items-center justify-center">
            <img
              src="/mob.png"
              alt="Mobile app interface"
              className="max-w-full h-auto max-h-[60vh] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const AnimatedText = ({ scrollYProgress, textPhrases }) => {
  // Calculate which text should be visible based on scroll progress
  const currentIndex = useTransform(scrollYProgress, (value) => {
    const index = Math.floor(value * textPhrases.length);
    return Math.min(index, textPhrases.length - 1);
  });

  // Get the current text to display
  const currentText = useTransform(currentIndex, (index) => textPhrases[index] || textPhrases[0]);

  // Calculate fade animation for the current text
  const fadeProgress = useTransform(scrollYProgress, (value) => {
    const phaseProgress = (value * textPhrases.length) % 1;
    return phaseProgress;
  });

  // Special opacity logic for first and last text
  const opacity = useTransform(scrollYProgress, (value) => {
    const totalPhases = textPhrases.length;
    const currentPhase = Math.floor(value * totalPhases);
    const phaseProgress = (value * totalPhases) % 1;
    
    // First text (index 0) - visible from start until second text appears
    if (currentPhase === 0) {
      return phaseProgress < 0.3 ? 1 : 1 - ((phaseProgress - 0.3) / 0.7);
    }
    
    // Last text (index 3) - fade in and stay visible permanently
    if (currentPhase === totalPhases - 1) {
      return phaseProgress < 0.3 ? 0 : 1;
    }
    
    // Check if we've reached the last text phase - if so, keep last text visible
    if (value >= (totalPhases - 1) / totalPhases) {
      return 1; // Keep last text visible
    }
    
    // Middle texts - normal fade in/out
    if (phaseProgress < 0.3) return 0;
    if (phaseProgress > 0.7) return 1 - ((phaseProgress - 0.7) / 0.3);
    return 1;
  });

  const y = useTransform(fadeProgress, [0, 0.3, 0.7, 1], [20, 0, 0, -20]);

  return (
    <div className="relative h-16 flex items-center justify-center">
      <motion.div
        style={{ opacity, y }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
      >
        {currentText}
      </motion.div>
    </div>
  );
};



export default HumanChatSection; 