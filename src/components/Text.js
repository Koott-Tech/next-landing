'use client';

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const text =
  "Empowering your mental wellness journey with expert support, real conversations, and therapy that fits your life—anytime, anywhere.\n\nAvailable in multiple languages, so you can connect in the language you're most comfortable with.";

const Text = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const words = text.split(" ");

  return (
    <div ref={targetRef} className="relative z-0 h-[200vh] w-full">
      <div className="sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]">
        <p className="flex flex-wrap p-5 text-2xl font-medium text-black/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mx-1 lg:mx-2.5">
      <span className="absolute opacity-30">{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className="text-black"
      >
        {children}
      </motion.span>
    </span>
  );
};

export default Text; 