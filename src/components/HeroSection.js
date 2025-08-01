'use client';

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OnboardingModal from './OnboardingModal';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

const HeroSection = () => {
  const heroRef = useRef(null);
  const companyRef = useRef(null);
  const navbarRef = useRef(null);
  const loginBtnRef = useRef(null);
  const getStartedBtnRef = useRef(null);
  const animatedTextRef = useRef(null);
  const [showOnboarding, setShowOnboarding] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    // Prevent horizontal scroll on body
    if (typeof document !== 'undefined') {
      document.body.style.overflowX = 'hidden';
    }
    
    // Check initial screen size
    const checkScreenSize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 768);
      }
    };
    
    if (typeof window !== 'undefined') {
      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);
    }

    // Animated text effect
    if (animatedTextRef.current) {
      const line1 = animatedTextRef.current.querySelector('.animated-line-1');
      const line2 = animatedTextRef.current.querySelector('.animated-line-2');
      
      if (line1 && line2) {
        const tl = gsap.timeline({ repeat: -1 });
        
        // Show line 1 word by word
        tl.to(line1, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        })
        .to(line1.querySelectorAll('.animated-word'), {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.1")
        .to(line1, {
          opacity: 0,
          y: -20,
          duration: 0.6,
          ease: "power2.in",
          delay: 1.5
        })
        // Show line 2 word by word
        .to(line2, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        })
        .to(line2.querySelectorAll('.animated-word'), {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.1")
        .to(line2, {
          opacity: 0,
          y: -20,
          duration: 0.6,
          ease: "power2.in",
          delay: 1.5
        });
      }
    }
    
    // Use GSAP ScrollTrigger for smoother scroll animations
    if (typeof window !== 'undefined' && !isMobile) {
      gsap.registerPlugin(ScrollTrigger);
      
      // Add throttling to scroll events
      ScrollTrigger.config({
        limitCallbacks: true,
        syncInterval: 60,
      });
      
      // Hero section scaling animation removed for better performance

      // Company name fade out
      gsap.to(companyRef.current, {
        opacity: 0,
        y: -40,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "center top",
          scrub: 0.5,
        }
      });

      // Navbar fade out
      gsap.to(navbarRef.current, {
        opacity: 0,
        y: -40,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "center top",
          scrub: 0.5,
        }
      });

      // Login button fade out
      gsap.to(loginBtnRef.current, {
        opacity: 0,
        y: -40,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "center top",
          scrub: 0.5,
        }
      });

      // Get Started button stays visible
      gsap.to(getStartedBtnRef.current, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        }
      });
    }
    if (typeof window !== 'undefined') {
      return () => {
        window.removeEventListener('resize', checkScreenSize);
        // Kill all ScrollTriggers on cleanup
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, []);

  return (
    <div
      ref={heroRef}
      className="her-section"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "100vw",
        height: "100vh",
        overflow: "hidden",
        transition: "none",
        background: "#fff", // fallback background for when width shrinks
        display: "block",
        margin: "0 auto",
        borderBottomLeftRadius: "8px",
        borderBottomRightRadius: "8px",
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .company-name {
            display: none !important;
          }
          .auth-buttons .cureminds-btn {
            display: none !important;
          }
          .auth-buttons {
            right: 1rem !important;
            top: 1.5rem !important;
          }
          .getstarted-btn {
            padding: 0.6rem 1.5rem !important;
            font-size: 1rem !important;
          }
          .her-section video {
            width: 100vw !important;
            height: 100vh !important;
            object-fit: cover !important;
            object-position: center !important;
          }
          .hero-heading {
            font-size: 2.2rem !important;
            line-height: 1.1 !important;
            left: 2rem !important;
            transform: translateY(-50%) !important;
            max-width: 90vw !important;
            text-align: left !important;
          }
          .offer-box {
            left: 50% !important;
            right: auto !important;
            bottom: 2rem !important;
            transform: translateX(-50%) !important;
            margin: 0 !important;
            padding: 0.6rem 0.8rem !important;
            min-width: 160px !important;
            max-width: 200px !important;
            gap: 8px !important;
            position: absolute !important;
            width: auto !important;
          }
          .offer-title {
            font-size: 0.85rem !important;
            margin-bottom: 0px !important;
          }
          .offer-description {
            font-size: 0.8rem !important;
            margin-bottom: 6px !important;
            line-height: 1.3 !important;
          }
          .find-therapist-btn {
            padding: 0.5rem 1.2rem !important;
            font-size: 0.8rem !important;
          }
          .hero-getstarted-btn {
            padding: 0.8rem 1.8rem !important;
            font-size: 1rem !important;
          }
          .her-section {
            transition: none !important;
          }
          .her-section * {
            transition: none !important;
          }
        }
      `}</style>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          pointerEvents: "none"
        }}
                    src={isMobile ? "/hero+mobile.mp4" : "/hero_intro.mp4"}
      />
      {/* Center-left hero content */}
      <div
        className="hero-heading"
        style={{
          position: "absolute",
          top: "50%",
          left: "5vw",
          transform: "translateY(-50%)",
          zIndex: 2,
          color: "#fff",
          fontWeight: 600,
          fontSize: "5.2rem",
          lineHeight: 1.08,
          letterSpacing: "-0.01em",
          textShadow: "0 4px 24px rgba(0,0,0,0.35)",
          maxWidth: 850,
          userSelect: "none",
        }}
      >
        No more stress,<br />
        just progress
        <div style={{ marginTop: 40 }}>
                      <div
              ref={animatedTextRef}
              style={{
                color: "#fff",
                fontSize: "1.8rem",
                fontWeight: 400,
                lineHeight: 1.4,
                opacity: 0.9,
                textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                minHeight: "1.4em",
                position: "relative"
              }}
            >
            <div className="animated-line-1" style={{ opacity: 0, transform: "translateY(20px)", position: "absolute", top: 0, left: 0 }}>
              {["Transform", "your", "mental", "health", "with", "personalized", "therapy"].map((word, index) => (
                <span key={index} className="animated-word" style={{ marginRight: "0.3em", opacity: 0, transform: "translateY(20px)" }}>
                  {word}
                </span>
              ))}
            </div>
            <div className="animated-line-2" style={{ opacity: 0, transform: "translateY(20px)", position: "absolute", top: 0, left: 0 }}>
              {["Connect", "with", "expert", "therapists", "anytime,", "anywhere"].map((word, index) => (
                <span key={index} className="animated-word" style={{ marginRight: "0.3em", opacity: 0, transform: "translateY(20px)" }}>
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ marginTop: 36 }}>
          <style>{`
            .hero-getstarted-btn {
              position: relative;
              overflow: hidden;
              padding: 1.25rem 2.4rem;
              border-radius: 15px;
              border: none;
              background: #fff;
              color: #1a237e;
              font-weight: 700;
              font-size: 1.25rem;
              cursor: pointer;
              box-shadow: 0 6px 24px rgba(0,0,0,0.18), 0 2px 12px rgba(0,0,0,0.12);
              transition: color 0.2s, border 0.2s;
              z-index: 1;
            }
            .hero-getstarted-btn::before {
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
            .hero-getstarted-btn:hover::before {
              bottom: 0;
            }
            .hero-getstarted-btn:hover {
              color: #fff;
              border: none;
            }
            .hero-getstarted-btn span {
              position: relative;
              z-index: 1;
            }
          `}</style>
          <button className="hero-getstarted-btn">
            <span>Get Started</span>
          </button>
        </div>
      </div>
      {/* Company name at left, aligned with navbar */}
      <div
        ref={companyRef}
        className="company-name"
        style={{
          position: "absolute",
          top: "3rem",
          left: "5vw",
          zIndex: 2,
          fontWeight: 900,
          fontSize: "2.5rem",
          color: "#fff",
          letterSpacing: "0.05em",
          textShadow: "0 2px 12px rgba(0,0,0,0.35)",
          userSelect: "none",
          transition: "opacity 0.3s, transform 0.3s",
        }}
      >
                    Hopelly
      </div>
      {/* Login and Get Started buttons at right */}
      <div
        className="auth-buttons"
        style={{
          position: "fixed",
          top: "2.2rem",
          right: "2.2rem",
          zIndex: 100,
          display: "flex",
          gap: "1rem",
        }}
      >
        <style>{`
          .cureminds-btn {
            position: relative;
            overflow: hidden;
            padding: 0.75rem 2rem;
            border-radius: 15px;
            border: none;
            background: rgba(255,255,255,0.25);
            color: #222;
            font-weight: 600;
            font-size: 1.1rem;
            cursor: pointer;
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            box-shadow: 0 6px 24px rgba(0,0,0,0.18), 0 2px 12px rgba(0,0,0,0.12);
            transition: color 0.2s;
            z-index: 1;
          }
          .cureminds-btn::before {
            content: "";
            position: absolute;
            left: 0;
            bottom: -100%;
            width: 100%;
            height: 100%;
            background: #27ae60;
            z-index: 0;
            transition: bottom 0.4s cubic-bezier(.4,2,.6,1), opacity 0.2s;
            opacity: 0.9;
          }
          .cureminds-btn:hover::before {
            bottom: 0;
          }
          .cureminds-btn:hover {
            color: #fff;
            border: none;
          }
          .cureminds-btn span {
            position: relative;
            z-index: 1;
          }

          .getstarted-btn {
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
          .getstarted-btn::before {
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
          .getstarted-btn:hover::before {
            bottom: 0;
          }
          .getstarted-btn:hover {
            color: #27ae60;
            border: none;
          }
          .getstarted-btn span {
            position: relative;
            z-index: 1;
          }
        `}</style>
        <button ref={loginBtnRef} className="cureminds-btn" onClick={() => window.open('https://mind-connect-therapy-hub.lovable.app', '_blank')}>
          <span>Login</span>
        </button>
        <button ref={getStartedBtnRef} className="getstarted-btn" onClick={() => window.open('https://mind-connect-therapy-hub.lovable.app', '_blank')}>
          <span>Get Started</span>
        </button>
      </div>
      {/* Center menu (navbar) */}
      <div ref={navbarRef} style={{ transition: "opacity 0.3s, transform 0.3s" }}>
        {/* Navbar is now in the layout */}
      </div>
      {/* Right-bottom offer box */}
      <div
        className="offer-box"
        style={{
          position: "absolute",
          right: "3.5rem",
          bottom: "3.5rem",
          zIndex: 3,
          background: "rgba(255,255,255,0.25)",
                      borderRadius: 10,
          boxShadow: "0 6px 24px rgba(0,0,0,0.18), 0 2px 12px rgba(0,0,0,0.12)",
          padding: "1.2rem 1.5rem 1.2rem 1.5rem",
          minWidth: 220,
          maxWidth: 270,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div className="offer-title" style={{ fontSize: "1.05rem", fontWeight: 700, color: "#222", marginBottom: 4, display: "flex", alignItems: "center", gap: 6, justifyContent: "center", width: "100%", textAlign: "center" }}>
          <span style={{ fontSize: "1.3rem" }}>🏷️</span> Limited Time Offer
        </div>
        <div className="offer-description" style={{ fontSize: "0.98rem", color: "#222", fontWeight: 500, marginBottom: 12, lineHeight: 1.5, textAlign: "center", width: "100%" }}>
          Save <span style={{ color: "#27ae60", fontWeight: 700 }}>$50</span> on your first month of CureMinds!  Start your mental wellness journey today.
        </div>
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
        `}</style>
        <button className="find-therapist-btn" style={{ display: "block", margin: "0 auto" }} onClick={() => setShowOnboarding(true)}>
          <span>Find My Therapist</span>
        </button>
        {typeof document !== 'undefined' && createPortal(
          <OnboardingModal open={showOnboarding} onClose={() => setShowOnboarding(false)} onComplete={() => { setShowOnboarding(false); router.push('/guide'); }} />,
          document.body
        )}
      </div>
    </div>
  );
};

export default HeroSection; 