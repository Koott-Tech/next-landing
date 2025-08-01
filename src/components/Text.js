'use client';

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const text =
  "Empowering your mental wellness journey with expert support, real conversations, and therapy that fits your life—anytime, anywhere.\n\nAvailable in multiple languages, so you can connect in the language you're most comfortable with.";

const Text = () => {
  const lettersRef = useRef([]);
  const sectionRef = useRef(null);

    useEffect(() => {
    if (!lettersRef.current) return;
    
    // Focus on desktop view for now
    const isMobile = false;
    
    // Set initial state
    gsap.set(lettersRef.current, { color: "#bbb" });
    
    // Create animation that follows scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%", // Start when top of section is 80% down viewport
        end: "center 20%", // End when center of section is 20% up viewport
        scrub: 0.1, // Fast scrub for quick response
        toggleActions: "play none none reverse",
      },
    });

    // Add the color animation to the timeline
    tl.to(lettersRef.current, {
      color: "#111",
      duration: 0.2, // Even faster duration
      stagger: {
        each: 0.0005, // Very fast stagger for desktop
        ease: "power1.out",
      },
    });
    
    // Cleanup function
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <>
      <style>
        {`
          @media (max-width: 768px) {
            .text-section h1 {
              font-size: 1.5rem !important;
              max-width: 90vw !important;
              padding: 0 20px !important;
              line-height: 1.4 !important;
              will-change: color !important;
              transform: translateZ(0) !important;
            }
            .text-section h1 span {
              will-change: color !important;
              transform: translateZ(0) !important;
            }
          }
        `}
      </style>
      <section
        ref={sectionRef}
        className="text-section"
        style={{
          width: "100vw",
          height: "100vh",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 500,
            textAlign: "center",
            maxWidth: "900px",
            lineHeight: 1.2,
            letterSpacing: "0.01em",
            wordBreak: "break-word",
          }}
        >
        {text.split("").map((char, i) => (
          <span
            key={i}
            ref={el => (lettersRef.current[i] = el)}
            style={{ display: char === " " ? "inline-block" : "inline", minWidth: char === " " ? "0.3em" : undefined }}
          >
            {char}
          </span>
        ))}
      </h1>
    </section>
    </>
  );
};

export default Text; 