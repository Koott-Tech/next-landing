'use client';

import React from "react";

const LANGUAGES = [
  "Hindi", "English", "Bengali", "Telugu", "Marathi", "Tamil", "Urdu", "Gujarati", "Kannada", "Odia", "Punjabi", "Malayalam", "Assamese"
];

const THERAPIES = [
  "Adult Therapy", "Adult Psychiatry", "Children First Services", "Couples Therapy", "Self-Care", "Community", "Psychometric Assessments", "Depression", "Anxiety", "Bipolar Disorder", "OCD", "ADHD", "Social Anxiety", "Women's Health", "Alcohol Addiction", "Tobacco Addiction"
];

const INFO_LINKS = [
  { label: "About CureMinds", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Careers", href: "#" },
  { label: "CureMinds In Media", href: "#" },
  { label: "For Therapists", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Help/FAQs", href: "#" },
  { label: "Services", href: "#" },
  { label: "Partnerships", href: "#" },
  { label: "Employee Well-being Programme", href: "#" },
  { label: "Our Approach & Offerings", href: "#" },
  { label: "Webinars & Workshops", href: "#" },
  { label: "College Well-being Programme", href: "#" }
];

const EXPERTS = [
  "Therapists", "Psychiatrists", "Child and Youth Experts", "Couples Therapists"
];

export default function Footer() {
  return (
    <footer style={{ background: "#f8f9fa", color: "#333", padding: "3.5rem 0 2.2rem 0", marginTop: 60 }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 32px", display: "flex", flexWrap: "wrap", gap: 48, justifyContent: "space-between" }}>
        <div style={{ minWidth: 220, flex: 1 }}>
          <h3 style={{ color: "#27ae60", fontWeight: 800, fontSize: 22, marginBottom: 18 }}>Languages of India</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexWrap: "wrap", gap: 10 }}>
            {LANGUAGES.map(lang => (
              <li key={lang} style={{ background: "#e9ecef", color: "#333", borderRadius: 10, padding: "6px 16px", fontSize: 15, marginBottom: 6 }}>{lang}</li>
            ))}
          </ul>
        </div>
        <div style={{ minWidth: 220, flex: 1 }}>
          <h3 style={{ color: "#27ae60", fontWeight: 800, fontSize: 22, marginBottom: 18 }}>Types of Therapies</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexWrap: "wrap", gap: 10 }}>
            {THERAPIES.map(therapy => (
              <li key={therapy} style={{ background: "#e9ecef", color: "#333", borderRadius: 10, padding: "6px 16px", fontSize: 15, marginBottom: 6 }}>{therapy}</li>
            ))}
          </ul>
        </div>
        <div style={{ minWidth: 220, flex: 1 }}>
          <h3 style={{ color: "#27ae60", fontWeight: 800, fontSize: 22, marginBottom: 18 }}>Information</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {INFO_LINKS.map(link => (
              <li key={link.label}><a href={link.href} style={{ color: "#fff", textDecoration: "none", fontSize: 15, opacity: 0.85 }}>{link.label}</a></li>
            ))}
          </ul>
        </div>
        <div style={{ minWidth: 220, flex: 1 }}>
          <h3 style={{ color: "#27ae60", fontWeight: 800, fontSize: 22, marginBottom: 18 }}>Experts</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {EXPERTS.map(expert => (
              <li key={expert} style={{ fontSize: 15 }}>{expert}</li>
            ))}
          </ul>
        </div>
      </div>
      <div style={{ textAlign: "center", color: "#aaa", fontSize: 14, marginTop: 38, opacity: 0.7 }}>
        &copy; {new Date().getFullYear()} CureMinds. All rights reserved.
      </div>
    </footer>
  );
} 