'use client';

import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          background: rgba(255,255,255,0.95);
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
        <a href="#about" style={{ textDecoration: "none", color: "#222", fontWeight: 600, fontSize: "1.25rem" }}>About Us</a>
        <a href="#chat" style={{ textDecoration: "none", color: "#222", fontWeight: 600, fontSize: "1.25rem" }}>Chat</a>
        <a href="#therapist" style={{ textDecoration: "none", color: "#222", fontWeight: 600, fontSize: "1.25rem" }}>Therapist</a>
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
        <a href="#about" onClick={() => setIsMenuOpen(false)}>About Us</a>
        <a href="#chat" onClick={() => setIsMenuOpen(false)}>Chat</a>
        <a href="#therapist" onClick={() => setIsMenuOpen(false)}>Therapist</a>
      </div>
    </>
  );
};

export default Navbar; 