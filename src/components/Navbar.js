'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { LoadingContext } from "./LoadingProvider";
import Image from "next/image";

const NAV_MEGA = [
  {
    title: "Experts",
    items: [
      "Psychologist",
      "Clinical Psychologist",
      "Child Psychologist",
      "Health Psychologist",
      "Psychiatrist",
    ],
  },
  {
    title: "Services",
    items: [
      { label: "Individual", href: "/services/individual" },
      { label: "Couple", href: "/services/couple" },
      { label: "Family", href: "/services/family" },
      { label: "Children", href: "/services/children" },
      { label: "Team", href: "/services/team" },
      { label: "Senior Citizens", href: "/services/senior-citizens" },
      { label: "Therapist", href: "/services/therapist" },
    ],
  },
  {
    title: "Get treatment for",
    items: [
      "Anxiety",
      "Depression",
      "ADHD",
      "Bipolar",
      "OCD",
      "Insomnia",
      "Postpartum Depression",
      "Panic Disorder",
    ],
  },
  {
    title: "Company",
    items: ["Careers", "About Us", "Advisory Board"],
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isForYouOpen, setIsForYouOpen] = useState(false); // visual open state (animates)
  const [isForYouMounted, setIsForYouMounted] = useState(false); // mounted for fade-out
  const ANIMATION_MS = 250;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleForYou = () => {
    if (isForYouOpen) {
      // start fade-out then unmount
      setIsForYouOpen(false);
      setTimeout(() => setIsForYouMounted(false), ANIMATION_MS);
    } else {
      // mount then fade-in on next tick
      setIsForYouMounted(true);
      setTimeout(() => setIsForYouOpen(true), 10);
    }
  };

  const router = useRouter();
  const { startLoading } = useContext(LoadingContext);

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .mobile-menu {
            display: ${isMenuOpen ? 'flex' : 'none'} !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn {
            display: none !important;
          }
          .mobile-menu {
            display: none !important;
          }
        }
        .mobile-menu-btn {
          position: absolute;
          top: 3rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          background: rgba(255,255,255,0.25);
          border-radius: 15px;
          padding: 0.75rem 1.5rem;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.4);
          cursor: pointer;
          border: none;
          color: #222;
          font-weight: 600;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .mobile-menu {
          position: absolute;
          top: 6rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9;
          background: #ffffff;
          border-radius: 15px;
          padding: 1rem;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.4);
          flex-direction: column;
          gap: 0.75rem;
          min-width: 200px;
        }
        .mobile-menu a {
          text-decoration: none;
          color: #222;
          font-weight: 600;
          font-size: 1.1rem;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: background-color 0.2s;
        }
        .mobile-menu a:hover {
          background-color: rgba(39, 174, 96, 0.1);
        }
      `}</style>
      
      {/* Desktop Navigation */}
      <nav className="desktop-nav"
        style={{
          position: "absolute",
          top: "3rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
          display: "flex",
          gap: "2rem",
          background: "rgba(255,255,255,0.25)",
          borderRadius: "15px",
          padding: "0.75rem 2rem",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.4)",
        }}
      >
        <button 
          onClick={toggleForYou}
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "0.25rem", 
            cursor: "pointer",
            background: "none",
            border: "none",
            padding: 0,
            color: "#222",
            fontWeight: 600,
            fontSize: "1.25rem"
          }}
        >
          <span>For You</span>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            style={{ 
              color: "#222",
              transform: isForYouOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease"
            }}
          >
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
          <Link
            href="/chat-therapy"
            onClick={(e) => {
              e.preventDefault();
              startLoading();
              router.push("/chat-therapy");
            }}
            style={{ textDecoration: "none", color: "#222", fontWeight: 600, fontSize: "1.25rem" }}
          >
            Chat Therapy
          </Link>
          <Link href="#therapist" style={{ textDecoration: "none", color: "#222", fontWeight: 600, fontSize: "1.25rem" }}>Therapist</Link>
      </nav>

      {/* Mobile Menu Button */}
      <button className="mobile-menu-btn" onClick={toggleMenu}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Menu
      </button>

      {/* Mobile Menu */}
      <div className="mobile-menu">
        <button 
          onClick={toggleForYou}
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "0.25rem", 
            cursor: "pointer",
            background: "none",
            border: "none",
            padding: "0.5rem 1rem",
            color: "#222",
            fontWeight: 600,
            fontSize: "1.1rem",
            width: "100%",
            textAlign: "left"
          }}
        >
          <span>For You</span>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            style={{ 
              color: "#222",
              transform: isForYouOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease"
            }}
          >
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <Link
          href="/chat-therapy"
          onClick={(e) => {
            e.preventDefault();
            setIsMenuOpen(false);
            startLoading();
            router.push("/chat-therapy");
          }}
        >
          Chat Therapy
        </Link>
        <Link href="#therapist" onClick={() => setIsMenuOpen(false)}>Therapist</Link>
      </div>

      {/* For You Dropdown Overlay with smooth fade in/out */}
      {isForYouMounted && (
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingTop: "8rem",
            opacity: isForYouOpen ? 1 : 0,
            transition: `opacity ${ANIMATION_MS}ms ease` ,
            pointerEvents: isForYouOpen ? "auto" : "none",
          }}
        >
          {/* Backdrop */}
          <div 
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: isForYouOpen ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)",
              transition: `background-color ${ANIMATION_MS}ms ease`,
              cursor: "pointer"
            }}
            onClick={toggleForYou}
          />
          
          {/* Dropdown Content */}
          <div 
            style={{
              width: "90%",
              height: "80vh",
              backgroundColor: "#ffffff",
              borderRadius: "15px",
              padding: "2.5rem",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              position: "relative",
              zIndex: 1001,
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              transform: isForYouOpen ? "translateY(0px)" : "translateY(-8px)",
              transition: `transform ${ANIMATION_MS}ms ease` ,
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", paddingBottom: "1rem" }}>
              <button 
                onClick={toggleForYou}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "#222",
                  padding: "0.5rem"
                }}
              >
                ×
              </button>
            </div>

            {/* Mega menu content in a single-row flex that never wraps */}
            <div
              style={{
                display: "flex",
                gap: "2rem",
                flex: 1,
                flexWrap: "nowrap",
                overflowX: "auto",
                paddingBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "2rem",
                  flexWrap: "nowrap",
                  flex: "0 0 auto",
                }}
              >
                {NAV_MEGA.map((group) => (
                  <div key={group.title} style={{ minWidth: 220, flex: "0 0 auto" }}>
                    <h3
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: "#111827",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {group.title}
                    </h3>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {group.items.map((item) => {
                        const label = typeof item === 'string' ? item : item.label;
                        const href = typeof item === 'string' ? undefined : item.href;
                        return (
                          <li
                            key={label}
                            style={{
                              color: "#111827",
                              fontSize: "0.95rem",
                              marginBottom: "0.5rem",
                              cursor: "pointer",
                            }}
                          >
                            {href ? (
                              <Link
                                href={href}
                                onClick={(e) => {
                                  e.preventDefault();
                                  startLoading();
                                  toggleForYou();
                                  router.push(href);
                                }}
                                style={{ color: "inherit", textDecoration: "none" }}
                              >
                                {label}
                              </Link>
                            ) : (
                              <span>{label}</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Right-side image */}
              <div
                style={{
                  width: 280,
                  height: 220,
                  borderRadius: 12,
                  overflow: "hidden",
                  position: "relative",
                  flexShrink: 0,
                  flex: "0 0 auto",
                }}
              >
                <Image
                  src="/hill.jpg"
                  alt="Therapy illustration"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="280px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar; 