'use client';

import React, { useState } from "react";

const STEPS = [
  {
    label: "What are you seeking help for?",
    key: "condition",
    options: [
      "Anxiety", "Depression", "Relationship Issues", "Stress", "Self-Esteem", "Addiction", "Trauma", "Grief", "Career", "Other"
    ]
  },
  {
    label: "Preferred language?",
    key: "language",
    options: [
      "English", "Hindi", "Malayalam", "Tamil", "Kannada", "Bengali", "Other"
    ]
  },
  {
    label: "What kind of session do you prefer?",
    key: "sessionType",
    options: ["Chat", "Video Call"]
  },
  {
    label: "What is your age group?",
    key: "ageGroup",
    options: ["Under 18", "18-25", "26-40", "41-60", "60+"]
  }
];

export default function OnboardingModal({ open, onClose, onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  if (!open) return null;

  const handleSelect = (option) => {
    const key = STEPS[step].key;
    setAnswers((prev) => ({ ...prev, [key]: option }));
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(answers);
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.32)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 10,
        padding: "48px 32px 40px 32px",
        minWidth: 340,
        maxWidth: 380,
        boxShadow: "0 8px 48px rgba(39,174,96,0.18), 0 2px 12px rgba(0,0,0,0.12)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative"
      }}>
        <button onClick={onClose} style={{ position: "absolute", top: 18, right: 18, background: "none", border: "none", fontSize: 22, color: "#888", cursor: "pointer" }}>&times;</button>
        <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 24, textAlign: "center", color: "#222" }}>{STEPS[step].label}</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginBottom: 8 }}>
          {STEPS[step].options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              style={{
                background: "#e8f5e9",
                color: "#27ae60",
                border: "none",
                borderRadius: 15,
                padding: "12px 22px",
                fontWeight: 700,
                fontSize: 16,
                marginBottom: 6,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(39,174,200,0.10)",
                transition: "background 0.18s, color 0.18s"
              }}
            >
              {option}
            </button>
          ))}
        </div>
        <div style={{ marginTop: 18, fontSize: 15, color: "#888", textAlign: "center" }}>
          Step {step + 1} of {STEPS.length}
        </div>
      </div>
    </div>
  );
} 