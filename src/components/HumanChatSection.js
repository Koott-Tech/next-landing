'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HumanChatSection = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end 20%"],
    layoutEffect: false,
  });

  // Text phrases for animation
  const textPhrases = ["Get started", "Effortless", "Full picture", "Goal driven"];
  
  // Paragraph phrases for animation
  const paragraphPhrases = [
    "Begin your mental health journey with personalized therapy sessions tailored to your unique needs.",
    "Experience seamless communication with your therapist through our intuitive chat interface.",
    "Get a comprehensive understanding of your progress with detailed insights and tracking.",
    "Stay motivated and focused on your mental health goals with our supportive platform."
  ];

  return (
    <div ref={targetRef} className="relative z-0 h-[300vh] w-full">
      <div className="sticky-optimized mx-auto flex h-screen items-center justify-center bg-white px-[1rem] py-[5rem]">
        <div className="flex flex-row items-center justify-between w-full max-w-6xl gap-16">
          {/* Left side - Animated text */}
          <div className="flex-1 flex flex-col items-start justify-center text-left">
            {/* Animated Heading */}
            <div className="mb-6">
              <AnimatedText 
                scrollYProgress={scrollYProgress} 
                textPhrases={textPhrases} 
              />
            </div>
            
            {/* Animated Paragraph */}
            <div className="max-w-lg">
              <AnimatedParagraph 
                scrollYProgress={scrollYProgress} 
                paragraphPhrases={paragraphPhrases} 
              />
            </div>
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
    
    // First text (index 0) - sticks to viewport longer before changing
    if (currentPhase === 0) {
      return phaseProgress < 0.8 ? 1 : 1 - ((phaseProgress - 0.8) / 0.2);
    }
    
    // Last text (index 3) - fade in and stay visible until scroll ends
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
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 scroll-optimized"
      >
        {currentText}
      </motion.div>
    </div>
  );
};

const AnimatedParagraph = ({ scrollYProgress, paragraphPhrases }) => {
  // Calculate which paragraph should be visible based on scroll progress
  const currentIndex = useTransform(scrollYProgress, (value) => {
    const index = Math.floor(value * paragraphPhrases.length);
    return Math.min(index, paragraphPhrases.length - 1);
  });

  // Get the current paragraph to display
  const currentParagraph = useTransform(currentIndex, (index) => paragraphPhrases[index] || paragraphPhrases[0]);

  // Calculate fade animation for the current paragraph
  const fadeProgress = useTransform(scrollYProgress, (value) => {
    const phaseProgress = (value * paragraphPhrases.length) % 1;
    return phaseProgress;
  });

  // Special opacity logic for first and last paragraph
  const opacity = useTransform(scrollYProgress, (value) => {
    const totalPhases = paragraphPhrases.length;
    const currentPhase = Math.floor(value * totalPhases);
    const phaseProgress = (value * totalPhases) % 1;
    
    // First paragraph (index 0) - sticks to viewport longer before changing
    if (currentPhase === 0) {
      return phaseProgress < 0.8 ? 1 : 1 - ((phaseProgress - 0.8) / 0.2);
    }
    
    // Last paragraph (index 3) - fade in and stay visible until scroll ends
    if (currentPhase === totalPhases - 1) {
      return phaseProgress < 0.3 ? 0 : 1;
    }
    
    // Check if we've reached the last paragraph phase - if so, keep last paragraph visible
    if (value >= (totalPhases - 1) / totalPhases) {
      return 1; // Keep last paragraph visible
    }
    
    // Middle paragraphs - normal fade in/out
    if (phaseProgress < 0.3) return 0;
    if (phaseProgress > 0.7) return 1 - ((phaseProgress - 0.7) / 0.3);
    return 1;
  });

  const y = useTransform(fadeProgress, [0, 0.3, 0.7, 1], [20, 0, 0, -20]);

  return (
    <div className="relative min-h-[80px] flex items-center">
      <motion.p
        style={{ opacity, y }}
        className="text-base md:text-lg text-gray-700 leading-relaxed scroll-optimized"
      >
        {currentParagraph}
      </motion.p>
    </div>
  );
};



export default HumanChatSection; 