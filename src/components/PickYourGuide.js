'use client';

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import OnboardingModal from './OnboardingModal';

const PickYourGuide = () => {
  const sectionRef = useRef(null);
  const cardRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const router = useRouter();
  const [showOnboarding, setShowOnboarding] = React.useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = cardRefs.map(r => r.current);
    
    // Set initial state with better positioning
    gsap.set(cards, { 
      opacity: 0, 
      y: 80,
      scale: 0.9
    });
    
    // Use ScrollTrigger for smoother animations
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%", // Start even later - more delay
          end: "center center", // End when section reaches center
          toggleActions: "play none none reverse",
          once: true,
          scrub: 0.8, // Optimized scrubbing for better performance
        }
      });
      
      // Create a more sophisticated animation sequence
      tl.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5, // Reduced duration for better performance
        stagger: 0.1, // Reduced stagger for smoother animation
        ease: "power2.out", // Simpler easing curve
      });
      
      return () => {
        // Kill specific ScrollTrigger instead of all
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill();
        }
        tl.kill();
      };
    }
  }, [cardRefs]);

  return (
    <section ref={sectionRef} style={{ width: "100vw", minHeight: "100vh", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4.5rem", paddingBottom: "2rem" }}>
      <h1 style={{ fontSize: "3.2rem", fontWeight: 800, color: "#1a1a1a", textAlign: "center", letterSpacing: "-0.01em", lineHeight: 1.1, maxWidth: 900, marginBottom: "2.5rem" }}>
        Meet Your Guide to Wellness
      </h1>
      <p style={{ fontSize: "1.18rem", color: "#444", textAlign: "center", maxWidth: 600, fontWeight: 500, margin: 0 }}>
        Skilled, supportive mental health professionals offering 1-on-1 guidance that leads to quick, thoughtful progress.
      </p>
      <div style={{ marginTop: "2.2rem", marginBottom: "3.2rem", height: "60px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{`
          .meet-them-btn {
            position: relative;
            overflow: hidden;
            padding: 0.6rem 1.5rem;
            border-radius: 12px;
            border: 2px solid #27ae60;
            background: #fff;
            color: #27ae60;
            font-weight: 700;
            font-size: 0.95rem;
            cursor: pointer;
            box-shadow: 0 4px 16px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1);
            transition: color 0.2s ease;
            z-index: 1;
            transform: translateZ(0);
            box-sizing: border-box;
            display: inline-block;
            vertical-align: top;
          }
          .meet-them-btn::before {
            content: "";
            position: absolute;
            left: 0;
            bottom: -100%;
            width: 100%;
            height: 100%;
            background: #27ae60;
            z-index: 0;
            transition: bottom 0.4s cubic-bezier(.4,2,.6,1), opacity 0.2s;
            opacity: 0.95;
          }
          .meet-them-btn:hover::before {
            bottom: 0;
          }
          .meet-them-btn:hover {
            color: #fff;
            border: 2px solid #27ae60;
          }
          .meet-them-btn span {
            position: relative;
            z-index: 1;
          }
        `}</style>
                      <button className="meet-them-btn" onClick={() => router.push("/guide")}>
          <span>Meet Them All</span>
        </button>
      </div>
      {/* Guide cards row */}
      <div style={{
        width: "100%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        position: "relative",
        height: 320,
        gap: 20,
        willChange: "transform",
        transform: "translateZ(0)", // Force GPU acceleration
        isolation: "isolate",
      }}>
        <style>{`
          .guide-card {
            cursor: pointer;
            will-change: transform, opacity;
            transition: transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.2s;
            margin-left: -40px;
            z-index: 1;
            width: 240px;
            height: 300px;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10);
            background: #fff;
            border: none;
            position: relative;
            /* Removed backface-visibility for better performance */
          }
          .guide-card:first-child {
            margin-left: 0;
          }
        `}</style>
        {[1,2,3,4,5,6].map((num, idx) => (
          <div
            className="guide-card"
            key={num}
            ref={cardRefs[idx]}
            style={{ 
              zIndex: idx+1,
              transform: `rotate(${idx % 2 === 0 ? 2 : -2}deg)`,
              transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.2s'
            }}
            onMouseEnter={(e) => {
              const video = e.currentTarget.querySelector('video');
              if (video) video.play();
              e.currentTarget.style.transform = `rotate(${idx % 2 === 0 ? 2 : -2}deg) scale(1.15) translateY(-15px)`;
              e.currentTarget.style.zIndex = '20';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(39,174,96,0.25), 0 8px 24px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              const video = e.currentTarget.querySelector('video');
              if (video) video.pause();
              e.currentTarget.style.transform = `rotate(${idx % 2 === 0 ? 2 : -2}deg)`;
              e.currentTarget.style.zIndex = idx + 1;
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)';
            }}
          >
            <video
              src={`/intro_${idx === 5 ? 1 : num}.mp4`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loop
              muted
              playsInline
            />
          </div>
        ))}
      </div>
      <div style={{ marginTop: '4.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>
        <style>{`
          .find-therapist-btn {
            position: relative;
            overflow: hidden;
            padding: 0.85rem 2.2rem;
            border-radius: 15px;
            border: none;
            background: #27ae60;
            color: #fff;
            font-weight: 700;
            font-size: 1.1rem;
            cursor: pointer;
            box-shadow: 0 6px 24px rgba(0,0,0,0.18), 0 2px 12px rgba(0,0,0,0.12);
            transition: color 0.2s, border 0.2s;
            z-index: 1;
          }
          .find-therapist-btn::before {
            content: "";
            position: absolute;
            left: 0;
            bottom: -100%;
            width: 100%;
            height: 100%;
            background: #fff;
            z-index: 0;
            transition: bottom 0.4s cubic-bezier(.4,2,.6,1), opacity 0.2s;
            opacity: 0.95;
          }
          .find-therapist-btn:hover::before {
            bottom: 0;
          }
          .find-therapist-btn:hover {
            color: #27ae60;
            border: none;
          }
          .find-therapist-btn span {
            position: relative;
            z-index: 1;
          }
          .choose-guide-btn {
            position: relative;
            overflow: hidden;
            padding: 0.75rem 2rem;
            border-radius: 15px;
            border: none;
            background: #27ae60;
            color: #fff;
            font-weight: 700;
            font-size: 1.1rem;
            cursor: pointer;
            box-shadow: 0 6px 24px rgba(0,0,0,0.18), 0 2px 12px rgba(0,0,0,0.12);
            transition: color 0.2s;
            z-index: 1;
          }
          .choose-guide-btn::before {
            content: "";
            position: absolute;
            left: 0;
            bottom: -100%;
            width: 100%;
            height: 100%;
            background: #fff;
            z-index: 0;
            transition: bottom 0.4s cubic-bezier(.4,2,.6,1), opacity 0.2s;
            opacity: 0.9;
          }
          .choose-guide-btn:hover::before {
            bottom: 0;
          }
          .choose-guide-btn:hover {
            color: #27ae60;
            border: none;
          }
          .choose-guide-btn span {
            position: relative;
            z-index: 1;
          }
        `}</style>
        
        <button className="choose-guide-btn" onClick={() => window.open('/guide', '_blank')}>
          <span>Choose Your Therapist</span>
        </button>
        <OnboardingModal open={showOnboarding} onClose={() => setShowOnboarding(false)} onComplete={() => { setShowOnboarding(false); router.push('/guide'); }} />
      </div>
    </section>
  );
};

export default PickYourGuide; 