'use client';

import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isForYouOpen, setIsForYouOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleForYou = () => {
    setIsForYouOpen(!isForYouOpen);
  };

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
        <Link href="/chat-therapy" style={{ textDecoration: "none", color: "#222", fontWeight: 600, fontSize: "1.25rem" }}>Chat Therapy</Link>
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
        <Link href="/chat-therapy" onClick={() => setIsMenuOpen(false)}>Chat Therapy</Link>
        <Link href="#therapist" onClick={() => setIsMenuOpen(false)}>Therapist</Link>
      </div>

      {/* For You Dropdown Overlay */}
      {isForYouOpen && (
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
            paddingTop: "6rem"
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
              backgroundColor: "rgba(0, 0, 0, 0.5)",
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
              gap: "2rem"
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

            {/* Services Content */}
            <div style={{ display: "flex", gap: "2rem", flex: 1 }}>
              {/* Left Section - Services */}
              <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#000000", marginBottom: "0.5rem" }}>Services</h2>
                  <p style={{ color: "#000000", fontSize: "1rem", marginBottom: "1.5rem" }}>Get access to therapy, medication management, and personalized treatment</p>
                </div>
                <div style={{ 
                  width: "120px", 
                  height: "120px", 
                  borderRadius: "50%", 
                  backgroundColor: "#dbeafe", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  marginTop: "1rem"
                }}>
                  <div style={{ fontSize: "3rem", color: "#3b82f6" }}>👩‍⚕️</div>
                </div>
              </div>

              {/* Middle Section - Therapy & Medications */}
              <div style={{ flex: "1", display: "flex", flexDirection: "row", gap: "2rem" }}>
                {/* Therapy Column */}
                <div style={{ flex: "1" }}>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#000000", marginBottom: "1rem" }}>Therapy</h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {[
                      "Individual therapy",
                      "Couples therapy", 
                      "LGBTQIA+ therapy",
                      "Therapy for military",
                      "Therapy for veterans",
                      "Therapy for seniors",
                      "Unlimited messaging therapy",
                      "Teen therapy",
                      "NYC Teenspace",
                      "Therapists near me",
                      "AI-supported therapy"
                    ].map((item, index) => (
                      <li 
                        key={index} 
                        style={{ 
                          color: "#000000", 
                          fontSize: "0.9rem", 
                          marginBottom: "0.5rem",
                          cursor: "pointer",
                          transition: "color 0.3s ease"
                        }}
                        onMouseEnter={(e) => e.target.style.color = "#ffffff"}
                        onMouseLeave={(e) => e.target.style.color = "#000000"}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Medications Column */}
                <div style={{ flex: "1" }}>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#000000", marginBottom: "0.5rem" }}>Medications</h3>
                  <p style={{ color: "#000000", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Psychiatry and medication management</p>
                  <p style={{ color: "#000000", fontSize: "0.9rem", marginBottom: "1rem" }}>Common medications prescribed</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {[
                      "Abilify (Aripiprazole)",
                      "Buspar (Buspirone)",
                      "Cymbalta (Duloxetine)",
                      "Lexapro (Escitalopram)",
                      "Lithium",
                      "Propranolol",
                      "Prozac (Fluoxetine)",
                      "Trazodone",
                      "Zoloft (Sertraline)"
                    ].map((item, index) => (
                      <li 
                        key={index} 
                        style={{ 
                          color: "#000000", 
                          fontSize: "0.9rem", 
                          marginBottom: "0.5rem",
                          cursor: "pointer",
                          transition: "color 0.3s ease"
                        }}
                        onMouseEnter={(e) => e.target.style.color = "#ffffff"}
                        onMouseLeave={(e) => e.target.style.color = "#000000"}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Section - Get treatment for */}
              <div style={{ flex: "1" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#000000", marginBottom: "1rem" }}>Get treatment for:</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {[
                    "Anxiety",
                    "Social anxiety",
                    "Depression",
                    "ADHD",
                    "Bipolar disorder",
                    "OCD",
                    "Insomnia",
                    "PTSD",
                    "Post-partum depression",
                    "Panic disorder"
                  ].map((item, index) => (
                    <li 
                      key={index} 
                      style={{ 
                        color: "#000000", 
                        fontSize: "0.9rem", 
                        marginBottom: "0.5rem",
                        cursor: "pointer",
                        transition: "color 0.3s ease"
                      }}
                      onMouseEnter={(e) => e.target.style.color = "#ffffff"}
                      onMouseLeave={(e) => e.target.style.color = "#000000"}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar; 