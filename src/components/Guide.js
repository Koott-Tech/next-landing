'use client';

import React, { useState } from "react";
import OnboardingModal from './OnboardingModal';
import { useRouter } from 'next/navigation';


const DOCTORS = [
  {
    name: "Dr. Irene Cheriyan",
    expertise: ["Anxiety", "CBT", "Mindfulness"],
    experience: 12,
    languages: ["English", "Malayalam", "Hindi"],
    qualifications: "PhD in Clinical Psychology, University of Mumbai. Certified CBT Practitioner.",
    bio: "Dr. Irene Cheriyan is a passionate psychologist dedicated to helping individuals overcome anxiety and improve their mental wellness through evidence-based therapy."
  },
  {
    name: "Dr. Rahul Menon",
    expertise: ["Depression", "Adolescents", "Family Therapy"],
    experience: 9,
    languages: ["English", "Tamil"],
    qualifications: "M.Phil in Psychiatry, NIMHANS. Family Therapy Certification.",
    bio: "Dr. Rahul Menon specializes in treating depression and adolescents. He is certified in family therapy and dedicated to helping families navigate through difficult times."
  },
  {
    name: "Dr. Priya Nair",
    expertise: ["Stress", "Relationships", "Trauma"],
    experience: 7,
    languages: ["English", "Hindi", "Kannada"],
    qualifications: "MSc in Counseling Psychology, Christ University. Trauma Specialist.",
    bio: "Dr. Priya Nair is a trauma specialist with expertise in helping individuals cope with stress and improve their relationships."
  },
  {
    name: "Dr. Arjun Sinha",
    expertise: ["Sleep", "Addiction", "Self-Esteem"],
    experience: 15,
    languages: ["English", "Bengali", "Hindi"],
    qualifications: "PhD in Psychology, Jadavpur University. Addiction Recovery Expert.",
    bio: "Dr. Arjun Sinha specializes in addiction recovery and self-esteem. He is dedicated to helping individuals overcome addiction and improve their self-esteem."
  }
];

const Guide = () => {
  const [selected, setSelected] = useState(null);
  const [showOnboarding, setShowOnboarding] = React.useState(false);
  const router = useRouter();

  // Prevent background scroll when modal is open
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      if (selected !== null) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return () => { document.body.style.overflow = ''; };
    }
  }, [selected]);

  return (
    <div style={{ width: "100vw", minHeight: "100vh", background: "#f8fafc", overflowX: "hidden", position: "relative" }}>
      <style>{`
        @media (max-width: 768px) {
          .company-name-guide {
            display: none !important;
          }
        }
      `}</style>
      {/* Company name at left, aligned with navbar */}
      <div
        className="company-name-guide"
        style={{
          position: "absolute",
          top: "2.5rem",
          left: "5vw",
          zIndex: 2,
          fontWeight: 900,
          fontSize: "2.2rem",
          color: "#27ae60",
          letterSpacing: "0.05em",
          userSelect: "none",
          textShadow: "0 2px 12px rgba(39,174,96,0.08)",
          cursor: "pointer"
        }}
                        onClick={() => router.push('/')}
        title="Go to homepage"
      >
        CureMinds
      </div>
      <div style={{ position: "relative", zIndex: 3 }}>
  
      </div>
      <section style={{ width: "100vw", minHeight: "100vh", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", paddingTop: "4.5rem", paddingBottom: "4rem" }}>
        <h1 style={{ fontSize: "3.2rem", fontWeight: 800, color: "#1a1a1a", textAlign: "center", letterSpacing: "-0.01em", lineHeight: 1.1, maxWidth: 900, marginBottom: "2.2rem" }}>
          Guides that help you grow
        </h1>
        <p style={{ fontSize: "1.18rem", color: "#444", textAlign: "center", maxWidth: 600, fontWeight: 500, margin: 0, marginBottom: "2.2rem" }}>
          Skilled and supportive mental health professionals dedicated to you and your wellness journey.
        </p>
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
        <button className="find-therapist-btn" style={{ marginTop: "2.5rem", marginBottom: "2.5rem", padding: "12px 44px", fontSize: 28, fontWeight: 800, borderRadius: 15, letterSpacing: "-0.01em" }} onClick={() => setShowOnboarding(true)}>
          <span>Find My Therapist</span>
        </button>
        <OnboardingModal open={showOnboarding} onClose={() => setShowOnboarding(false)} onComplete={() => { setShowOnboarding(false); router.push('/guide'); }} />
        {/* Guide video cards row */}
        <div style={{
          width: "100%",
          marginTop: "3.2rem",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          position: "relative",
          height: 380,
          gap: 18,
        }}>
          <style>{`
            .guide-video-card {
              cursor: pointer;
              will-change: transform;
              transition: transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.2s;
              z-index: 1;
              width: 300px;
              height: 370px;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10);
              background: #fff;
              border: 2px solid #e0e7ef;
              position: relative;
            }
            .guide-video-card:hover {
              transform: scale(1.13) translateY(-18px);
              z-index: 10;
              box-shadow: 0 16px 48px rgba(39,174,96,0.22), 0 4px 16px rgba(0,0,0,0.12);
            }
          `}</style>
          {DOCTORS.map((doc, idx) => {
            const thumb = idx % 2 === 0 ? 'thumb1.png' : 'thumb2.png';
            return (
              <div
                className="guide-video-card"
                key={doc.name}
                style={{ zIndex: idx+1, position: "relative" }}
                onMouseEnter={e => {
                  const video = e.currentTarget.querySelector('video');
                  video.play();
                }}
                onMouseLeave={e => {
                  const video = e.currentTarget.querySelector('video');
                  video.pause();
                  video.currentTime = 2;
                }}
                onClick={() => setSelected(idx)}
              >
                <video
                  src={`/intro_${idx+1}.mp4`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  muted
                  playsInline
                  preload="metadata"
                  poster={`/${thumb}`}
                />
                {/* Doctor name and expertise bubbles */}
                <div style={{
                  position: "absolute",
                  left: 18,
                  bottom: 18,
                  zIndex: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 8,
                  width: "80%"
                }}>
                  <div style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1.15rem",
                    textShadow: "0 2px 8px rgba(0,0,0,0.25)",
                    marginBottom: 4,
                    letterSpacing: "-0.01em"
                  }}>{doc.name}</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {doc.expertise.map((exp, i) => (
                      <span key={i} style={{
                        background: "rgba(255,255,255,0.22)",
                        color: "#fff",
                        borderRadius: 16,
                        padding: "0.32em 1.1em",
                        fontWeight: 600,
                        fontSize: "0.98rem",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        border: "1.5px solid rgba(255,255,255,0.18)",
                        marginBottom: 2
                      }}>{exp}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Repeat the same row again below */}
        <div style={{
          width: "100%",
          marginTop: "2.8rem",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          position: "relative",
          height: 380,
          gap: 18,
        }}>
          {DOCTORS.map((doc, idx) => {
            const thumb = idx % 2 === 0 ? 'thumb1.png' : 'thumb2.png';
            return (
              <div
                className="guide-video-card"
                key={doc.name + "-repeat"}
                style={{ zIndex: idx+1, position: "relative" }}
                onMouseEnter={e => {
                  const video = e.currentTarget.querySelector('video');
                  video.play();
                }}
                onMouseLeave={e => {
                  const video = e.currentTarget.querySelector('video');
                  video.pause();
                  video.currentTime = 2;
                }}
                onClick={() => setSelected(idx)}
              >
                <video
                  src={`/intro_${idx+1}.mp4`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  muted
                  playsInline
                  preload="metadata"
                  poster={`/${thumb}`}
                />
                {/* Doctor name and expertise bubbles */}
                <div style={{
                  position: "absolute",
                  left: 18,
                  bottom: 18,
                  zIndex: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 8,
                  width: "80%"
                }}>
                  <div style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1.15rem",
                    textShadow: "0 2px 8px rgba(0,0,0,0.25)" ,
                    marginBottom: 4,
                    letterSpacing: "-0.01em"
                  }}>{doc.name}</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {doc.expertise.map((exp, i) => (
                      <span key={i} style={{
                        background: "rgba(255,255,255,0.22)",
                        color: "#fff",
                        borderRadius: 16,
                        padding: "0.32em 1.1em",
                        fontWeight: 600,
                        fontSize: "0.98rem",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        border: "1.5px solid rgba(255,255,255,0.18)",
                        marginBottom: 2
                      }}>{exp}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Popup for Doctor Details */}
        {selected !== null && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.32)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s"
          }}
            onClick={() => setSelected(null)}
          >
            <div
              style={{
                width: "80vw",
                maxWidth: 1300,
                height: 620,
                background: "#fff",
                borderRadius: 10,
                boxShadow: "0 12px 48px rgba(39,174,96,0.18), 0 4px 16px rgba(0,0,0,0.12)",
                display: "flex",
                overflow: "hidden",
                position: "relative"
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Left: Video */}
              <div style={{ flex: 1.2, background: "#000", display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                <video
                  src={`/intro_${selected+1}.mp4`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", maxHeight: 620 }}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
              {/* Right: Details */}
              <div style={{ flex: 1, padding: 56, display: "flex", flexDirection: "column", justifyContent: "center", gap: 28 }}>
                <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 0 }}>{DOCTORS[selected].name}</h2>
                <div style={{ display: "flex", gap: 16, marginBottom: 0 }}>
                  {DOCTORS[selected].expertise.map((exp, i) => (
                    <span key={i} style={{ background: "rgba(39,174,96,0.12)", color: "#27ae60", borderRadius: 10, padding: "6px 16px", fontWeight: 600, fontSize: 16 }}>{exp}</span>
                  ))}
                </div>
                <div style={{ fontSize: 18, color: "#222" }}><b>Experience:</b> {DOCTORS[selected].experience} years</div>
                <div style={{ fontSize: 18, color: "#222" }}><b>Languages:</b> {DOCTORS[selected].languages.join(", ")}</div>
                <div style={{ fontSize: 18, color: "#222" }}><b>Qualifications:</b> {DOCTORS[selected].qualifications}</div>
                <div style={{ fontSize: 17, color: "#444", marginTop: -10, marginBottom: 8 }}><b>Bio:</b> {DOCTORS[selected].bio || "Dr. CureMinds is passionate about helping people achieve mental wellness through evidence-based therapy and compassionate guidance."}</div>
                <div style={{ display: "flex", flexDirection: "row", gap: 18, justifyContent: "flex-end", alignItems: "center", marginTop: "auto" }}>
                  <button
                    style={{
                      background: "#27ae60",
                      color: "#fff",
                      border: "none",
                      borderRadius: 24,
                      padding: "14px 36px",
                      fontSize: 20,
                      fontWeight: 700,
                      boxShadow: "0 2px 8px rgba(39,174,96,0.12)",
                      cursor: "pointer"
                    }}
                    onClick={() => {/* handle book session */}}
                  >
                    Book a Session
                  </button>
                  <button
                    style={{
                      background: "#fff",
                      color: "#27ae60",
                      border: "2px solid #27ae60",
                      borderRadius: 24,
                      padding: "14px 36px",
                      fontSize: 20,
                      fontWeight: 700,
                      boxShadow: "0 2px 8px rgba(39,174,96,0.12)",
                      cursor: "pointer"
                    }}
                    onClick={() => setSelected(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Guide; 