'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const NeverAloneSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5, margin: "0px 0px -100px 0px" });
  const words = "You are never alone again come join with us".split(" ");
  
  // Debug log
  console.log('NeverAloneSection isInView:', isInView);

  const variants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.2 + (i * 0.1) },
    }),
  };

  return (
    <section ref={ref} className="min-h-screen w-full bg-white flex items-center justify-center">
      <motion.h1
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm md:text-7xl md:leading-[5rem]"
        style={{ 
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateY(0)' : 'translateY(20px)'
        }}
      >
        {words.map((word, i) => (
          <motion.span key={word} variants={variants} custom={i}>
            {word}{" "}
          </motion.span>
        ))}
      </motion.h1>
    </section>
  );
};

export default NeverAloneSection; 