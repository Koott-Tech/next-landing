'use client';

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const TypesOfTherapy = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const sectionRef = useRef(null);



  return (
    <section
      ref={sectionRef}
      className="therapy-section"
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 0 80px 0",
        position: "relative",
        zIndex: 1,
        willChange: "transform", // Optimize for animations
        transform: "translateZ(0)" // Force GPU acceleration
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1.5rem",
          width: "90vw",
          maxWidth: 1400,
          alignItems: "center",
          justifyContent: "center",
          willChange: "transform", // Optimize for animations
          transform: "translateZ(0)", // Force GPU acceleration
          padding: "0 20px"
        }}
        className="therapy-container"
      >
          <style>{`
            @media (max-width: 768px) {
              .therapy-section {
                padding: 20px 0 60px 0 !important;
                min-height: auto !important;
              }
              .therapy-container {
                flex-direction: column !important;
                gap: 1.5rem !important;
                width: 90vw !important;
                max-width: 350px !important;
                padding: 0 10px !important;
              }
              .therapy-card-left, .therapy-card-right {
                width: 100% !important;
                min-width: unset !important;
                height: 280px !important;
                margin: 0 !important;
              }
              .therapy-card-left h2, .therapy-card-right h2 {
                font-size: 1rem !important;
                max-width: 180px !important;
                margin-top: 180px !important;
                margin-left: 20px !important;
              }
              .chat-interface {
                width: 80px !important;
                min-width: 70px !important;
                min-height: 100px !important;
                margin-right: 35px !important;
                padding: 4px !important;
              }
              .chat-interface .chat-window-anim:hover {
                transform: none !important;
                box-shadow: 0 6px 24px rgba(39,174,96,0.10), 0 2px 12px rgba(0,0,0,0.08) !important;
              }
              .chat-interface img {
                width: 12px !important;
                height: 12px !important;
              }
              .chat-interface .profile-header img {
                width: 16px !important;
                height: 16px !important;
              }
              .chat-interface .profile-header {
                gap: 4px !important;
                margin-bottom: 4px !important;
                padding-bottom: 3px !important;
              }
              .chat-interface .profile-header div {
                font-size: 7px !important;
                line-height: 0.9 !important;
              }
              .chat-interface .chat-bubble {
                padding: 0px 1px !important;
                font-size: 5px !important;
                max-width: 30px !important;
                line-height: 0.9 !important;
                border-radius: 4px 4px 1px 4px !important;
              }
              .chat-interface .gap-8 {
                gap: 1px !important;
              }
              .chat-interface .gap-8:nth-child(3),
              .chat-interface .gap-8:nth-child(4) {
                display: none !important;
              }
              .video-cards-container {
                margin-left: 10px !important;
                margin-top: 40px !important;
              }
              .video-card {
                width: 120px !important;
                height: 80px !important;
              }
              .therapy-card .therapy-card:hover {
                transform: none !important;
                box-shadow: 0 4px 16px rgba(0,0,0,0.10) !important;
              }
              .therapy-label {
                font-size: 0.8rem !important;
                padding: 0.3rem 0.8rem !important;
                top: 20px !important;
                left: 20px !important;
              }
              .therapy-getstarted-btn {
                padding: 0.4rem 1rem 0.4rem 0.8rem !important;
                font-size: 0.7rem !important;
                bottom: 10px !important;
                left: 15px !important;
              }
              .therapy-card .therapy-card:hover {
                transform: none !important;
                box-shadow: 0 4px 16px rgba(0,0,0,0.10) !important;
              }
              .therapy-getstarted-btn:hover {
                transform: none !important;
                box-shadow: 0 4px 16px rgba(0,0,0,0.10) !important;
              }
              .therapy-card-right h2,
              .therapy-card-right .therapy-card-right {
                padding-left: 10px !important;
                padding-right: 10px !important;
                max-width: 160px !important;
                font-size: 0.9rem !important;
                line-height: 1.2 !important;
              }
            }
            @media (min-width: 769px) and (max-width: 1366px) {
              .therapy-container {
                width: 85vw !important;
                max-width: 1200px !important;
                gap: 2rem !important;
                padding: 0 30px !important;
              }
              .therapy-card-left, .therapy-card-right {
                width: 600px !important;
                min-width: 600px !important;
                height: 450px !important;
              }
              .therapy-card-left h2, .therapy-card-right h2 {
                font-size: 1.2rem !important;
                max-width: 220px !important;
              }
              .chat-interface {
                width: 180px !important;
                min-width: 160px !important;
                min-height: 280px !important;
                margin-right: 70px !important;
              }
              .video-cards-container {
                margin-left: 20px !important;
              }
              .video-card {
                width: 150px !important;
                height: 100px !important;
              }
            }
            @media (min-width: 1920px) {
              .therapy-container {
                max-width: 1200px !important;
                gap: 2rem !important;
              }
              .therapy-card-left, .therapy-card-right {
                width: 550px !important;
                min-width: 550px !important;
                height: 420px !important;
              }
              .therapy-card-left h2, .therapy-card-right h2 {
                font-size: 1.4rem !important;
                max-width: 220px !important;
              }
              .chat-interface {
                width: 180px !important;
                min-width: 160px !important;
                min-height: 280px !important;
                margin-right: 80px !important;
              }
              .video-cards-container {
                margin-left: 20px !important;
              }
              .video-card {
                width: 160px !important;
                height: 110px !important;
              }
              .therapy-label {
                font-size: 0.85rem !important;
                padding: 0.35rem 0.9rem !important;
              }
              .therapy-getstarted-btn {
                padding: 0.6rem 1.6rem 0.6rem 1.2rem !important;
                font-size: 0.85rem !important;
              }
            }
            @media (min-width: 2560px) {
              .therapy-container {
                max-width: 1000px !important;
                gap: 2.5rem !important;
              }
              .therapy-card-left, .therapy-card-right {
                width: 480px !important;
                min-width: 480px !important;
                height: 380px !important;
              }
              .therapy-card-left h2, .therapy-card-right h2 {
                font-size: 1.3rem !important;
                max-width: 200px !important;
              }
              .chat-interface {
                width: 160px !important;
                min-width: 140px !important;
                min-height: 260px !important;
                margin-right: 70px !important;
              }
              .video-cards-container {
                margin-left: 15px !important;
              }
              .video-card {
                width: 140px !important;
                height: 100px !important;
              }
              .therapy-label {
                font-size: 0.8rem !important;
                padding: 0.3rem 0.8rem !important;
              }
              .therapy-getstarted-btn {
                padding: 0.5rem 1.4rem 0.5rem 1rem !important;
                font-size: 0.8rem !important;
              }
            }
          `}</style>
        {/* Left Card */}
        <div
          ref={leftRef}
          className="therapy-card-left"
          style={{
            width: 700,
            minWidth: 700,
            background: "#f5faff", // lighter blue
            borderRadius: 10,
            height: 480,
            margin: "0.5rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            position: "relative",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            className="therapy-label"
            style={{
              position: "absolute",
              top: 30,
              left: 40,
              background: "#e0e7ef",
              color: "#222",
              borderRadius: 10,
              padding: "0.6rem 1rem",
              fontWeight: 600,
              fontSize: "0.9rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              letterSpacing: "0.01em",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              zIndex: 2
            }}
          >
            {/* Chat Icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 15.46V6.5A2.5 2.5 0 0 0 18.5 4h-13A2.5 2.5 0 0 0 3 6.5v8A2.5 2.5 0 0 0 5.5 17H6v3l4.5-3h8A2.5 2.5 0 0 0 21 15.46Z" stroke="#27ae60" strokeWidth="2" strokeLinejoin="round"/></svg>
            Chat Therapy
          </div>
          <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "space-between", width: "100%", height: "100%" }}>
            <h2
              className="therapy-card-left"
              style={{
                marginTop: 0,
                marginLeft: 40,
                paddingLeft: 8,
                marginRight: 0,
                color: "#1a1a1a",
                fontWeight: 700,
                fontSize: "1.3rem",
                textAlign: "left",
                lineHeight: 1.3,
                flex: 1,
                maxWidth: 250,
                display: "flex",
                alignItems: "center",
                height: "100%"
              }}
            >
              Real-time, supportive chat with expert therapists—anytime, anywhere.
            </h2>
            {/* Chat interface layout */}
            <div
              className="chat-window-anim chat-interface"
              style={{
                width: 200,
                minWidth: 180,
                minHeight: 320,
                marginRight: 85,
                paddingRight: 8,
                background: "transparent",
                borderRadius: 10,
                padding: 12,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                position: "relative",
                cursor: "pointer"
              }}
            >

              {/* Patient message */}
              <div className="gap-8" style={{ display: "flex", alignItems: "flex-end", gap: 8, justifyContent: "flex-end" }}>
                <div
                  className="chat-bubble"
                  style={{
                    background: "#e3f0ff",
                    color: "#222",
                    borderRadius: "16px 16px 4px 16px",
                    padding: "8px 14px",
                    fontSize: 12,
                    maxWidth: 160,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  Hi Doctor, I&apos;m feeling anxious lately. What should I do?
                </div>
                <img
                  src={"/patient.jpg"}
                  alt="Patient"
                  style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", border: "2px solid #e0e7ef" }}
                />
              </div>
              {/* Doctor message */}
              <div className="gap-8" style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                <img
                  src={"/irene.jpeg"}
                  alt="Doctor"
                  style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", border: "2px solid #e0e7ef" }}
                />
                <div
                  className="chat-bubble"
                  style={{
                    background: "#27ae60",
                    color: "#fff",
                    borderRadius: "16px 16px 16px 4px",
                    padding: "8px 14px",
                    fontSize: 12,
                    maxWidth: 160,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  Hi! It&apos;s normal to feel anxious sometimes. Let&apos;s talk about some relaxation techniques.
                </div>
              </div>
              {/* Patient message */}
              <div className="gap-8" style={{ display: "flex", alignItems: "flex-end", gap: 8, justifyContent: "flex-end" }}>
                <div
                  className="chat-bubble"
                  style={{
                    background: "#e3f0ff",
                    color: "#222",
                    borderRadius: "16px 16px 4px 16px",
                    padding: "8px 14px",
                    fontSize: 12,
                    maxWidth: 160,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  Thank you, that would be helpful!
                </div>
                <img
                  src={"/patient.jpg"}
                  alt="Patient"
                  style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", border: "2px solid #e0e7ef" }}
                />
              </div>
              {/* Doctor voice message with animation */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                <img
                  src={"/irene.jpeg"}
                  alt="Doctor"
                  style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", border: "2px solid #e0e7ef" }}
                />
                <div
                  style={{
                    background: "#27ae60",
                    color: "#fff",
                    borderRadius: "16px 16px 16px 4px",
                    padding: "8px 14px",
                    fontSize: 12,
                    maxWidth: 160,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  {/* Play icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="#fff" fillOpacity="0.18"/><path d="M10 9v6l5-3-5-3z" fill="#fff"/></svg>
                  {/* Voice waveform icon */}
                  <svg width="36" height="18" viewBox="0 0 36 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: 4}}>
                    <rect x="2" y="8" width="2" height="6" rx="1" fill="#fff" fillOpacity="0.7"/>
                    <rect x="6" y="4" width="2" height="10" rx="1" fill="#fff" fillOpacity="0.7"/>
                    <rect x="10" y="2" width="2" height="14" rx="1" fill="#fff" fillOpacity="0.7"/>
                    <rect x="14" y="6" width="2" height="6" rx="1" fill="#fff" fillOpacity="0.7"/>
                    <rect x="18" y="8" width="2" height="6" rx="1" fill="#fff" fillOpacity="0.7"/>
                    <rect x="22" y="4" width="2" height="10" rx="1" fill="#fff" fillOpacity="0.7"/>
                    <rect x="26" y="2" width="2" height="14" rx="1" fill="#fff" fillOpacity="0.7"/>
                    <rect x="30" y="6" width="2" height="6" rx="1" fill="#fff" fillOpacity="0.7"/>
                  </svg>
                  <span>0:12</span>
                </div>
              </div>
              {/* User emoji sticker message with animation */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, justifyContent: "flex-end" }}>
                <div
                  style={{
                    background: "#e3f0ff",
                    borderRadius: "16px 16px 4px 16px",
                    padding: "8px 14px",
                    fontSize: 22,
                    maxWidth: 60,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span role="img" aria-label="happy">😊</span>
                </div>
                <img
                  src={"/patient.jpg"}
                  alt="Patient"
                  style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", border: "2px solid #e0e7ef" }}
                />
              </div>
            </div>
          </div>
          {/* Get Started Button for Chat Therapy */}
          <div style={{ position: "absolute", bottom: 20, left: 40, zIndex: 3 }}>
            <style>{`
              .therapy-getstarted-btn {
                position: relative;
                overflow: hidden;
                padding: 0.7rem 1.8rem 0.7rem 1.3rem;
                border-radius: 15px;
                border: none;
                background: #fff;
                color: #27ae60;
                font-weight: 700;
                font-size: 0.9rem;
                cursor: pointer;
                box-shadow: 0 6px 24px rgba(0,0,0,0.18), 0 2px 12px rgba(0,0,0,0.12);
                transition: color 0.2s, border 0.2s;
                z-index: 1;
                display: flex;
                align-items: center;
                gap: 0.7rem;
              }
              .therapy-getstarted-btn::before {
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
              .therapy-getstarted-btn:hover::before {
                bottom: 0;
              }
              .therapy-getstarted-btn:hover {
                color: #fff;
                border: none;
              }
              .therapy-getstarted-btn span {
                position: relative;
                z-index: 1;
              }
              .therapy-getstarted-btn svg {
                position: relative;
                z-index: 1;
                margin-left: 0.2rem;
                transition: transform 0.2s;
              }
              .therapy-getstarted-btn:hover svg {
                transform: translateX(6px);
              }
            `}</style>
            <button className="therapy-getstarted-btn" onClick={() => window.location.href = 'https://mind-connect-therapy-hub.lovable.app'}>
              <span>Get Started</span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
        {/* Right Card */}
        <div
          ref={rightRef}
          className="therapy-card-right"
          style={{
            width: 700,
            minWidth: 700,
            background: "#f5faff", // lighter blue
            borderRadius: 10,
            height: 480,
            margin: "0.5rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "100%", width: "100%", justifyContent: "space-between" }}>
            {/* Cards section on the left */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-start", height: "100%" }}>
              <div
                className="video-cards-container"
                style={{
                  width: "100%",
                  marginTop: 70,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  position: "relative",
                  height: 140,
                  marginLeft: 25
                }}
              >
                <style>{`
                  .therapy-card {
                    cursor: pointer;
                    will-change: transform;
                    transition: transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.2s;
                  }
                  .therapy-card:hover {
                    transform: scale(1.12) !important;
                    z-index: 15 !important;
                    box-shadow: 0 12px 36px rgba(39,174,96,0.22), 0 4px 16px rgba(0,0,0,0.12) !important;
                  }
                `}</style>
                {[1, 2].map((num, idx) => {
                  // Center card effect
                  const isCenter = idx === 0;
                  return (
                    <div
                      key={num}
                      className="therapy-card video-card"
                      style={{
                        marginLeft: idx === 0 ? 0 : -40,
                        marginTop: idx === 0 ? -75 : 75,
                        zIndex: isCenter ? 10 : 2,
                        width: 180,
                        height: 120,
                        borderRadius: 10,
                        overflow: "hidden",
                        boxShadow: isCenter
                          ? "0 8px 32px rgba(39,174,96,0.18), 0 2px 8px rgba(0,0,0,0.10)"
                          : "0 4px 16px rgba(0,0,0,0.10)",
                        background: "#fff",
                        transition: "transform 0.2s, box-shadow 0.2s, width 0.2s, height 0.2s",
                        position: "relative",
                        transform: isCenter ? "translateY(-12px) scale(1.05)" : "",
                      }}
                    >
                      <video
                        src={`/intro_${num}.mp4`}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                      {/* Video call icons overlay */}
                      <div style={{
                        position: "absolute",
                        bottom: 8,
                        left: "50%",
                        transform: "translateX(-50%)",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        background: "rgba(0,0,0,0.6)",
                        borderRadius: 12,
                        padding: "4px 10px",
                        backdropFilter: "blur(4px)"
                      }}>
                        {/* Video camera icon */}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="7" width="13" height="10" rx="2" stroke="#fff" strokeWidth="1.5"/>
                          <path d="M21 9.5v5l-4-2.5 4-2.5Z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
                        </svg>
                        {/* Microphone icon */}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
                          <line x1="12" y1="19" x2="12" y2="23" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
                          <line x1="8" y1="23" x2="16" y2="23" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Text section on the right */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center", height: "100%", paddingRight: 40 }}>
              <h2
                className="therapy-card-right"
                style={{
                  marginTop: 0,
                  paddingLeft: 20,
                  paddingRight: 0,
                  color: "#1a1a1a",
                  fontWeight: 700,
                  fontSize: "1.3rem",
                  textAlign: "left",
                  lineHeight: 1.3,
                  maxWidth: 250,
                  display: "flex",
                  alignItems: "center",
                  height: "100%"
                }}
              >
                Connect face-to-face with licensed therapists in secure video sessions.
              </h2>
            </div>
            {/* Video Sessions bubble on the left, above the cards */}
            <div
              className="therapy-label"
              style={{
                position: "absolute",
                top: 30,
                left: 40,
                background: "#e0e7ef",
                color: "#222",
                borderRadius: 10,
                padding: "0.6rem 1rem",
                fontWeight: 600,
                fontSize: "0.9rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                letterSpacing: "0.01em",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                zIndex: 2
              }}
            >
              {/* Video Icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="7" width="13" height="10" rx="2" stroke="#27ae60" strokeWidth="2"/><path d="M21 9.5v5l-4-2.5 4-2.5Z" stroke="#27ae60" strokeWidth="2" strokeLinejoin="round"/></svg>
              Video Sessions
            </div>
          </div>
          {/* Get Started Button for Video Sessions */}
          <div style={{ position: "absolute", bottom: 20, left: 40, zIndex: 3 }}>
            <button className="therapy-getstarted-btn" onClick={() => window.open('https://mind-connect-therapy-hub.lovable.app', '_blank')}>
              <span>Get Started</span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TypesOfTherapy; 