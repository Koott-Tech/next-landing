'use client';

import React from "react";
import Link from "next/link";

const LANGUAGES = [
  "Hindi", "English", "Bengali", "Telugu", "Marathi", "Tamil", "Urdu", "Gujarati", "Kannada", "Odia", "Punjabi", "Malayalam", "Assamese"
];

const THERAPIES = [
  "Adult Therapy", "Adult Psychiatry", "Children First Services", "Couples Therapy", "Self-Care", "Community", "Psychometric Assessments", "Depression", "Anxiety", "Bipolar Disorder", "OCD", "ADHD", "Social Anxiety", "Women's Health", "Alcohol Addiction", "Tobacco Addiction"
];

const INFO_LINKS = [
  { label: "About CureMinds", href: "#" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
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
    <footer
      style={{
        background: "transparent",
        color: "#515154",
        padding: "40px 0 24px 0",
        marginTop: 0,
        borderTop: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          maxWidth: 1300,
          margin: "0 auto",
          padding: "0 32px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 32,
        }}
      >
        <div>
          <h3 style={{ color: "#1f2937", fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Languages of India</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, columns: 2, columnGap: 24 }}>
            {LANGUAGES.map((lang) => (
              <li key={lang} style={{ breakInside: "avoid", marginBottom: 6, fontSize: 14 }}>{lang}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 style={{ color: "#1f2937", fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Types of Therapies</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, columns: 2, columnGap: 24 }}>
            {THERAPIES.map((therapy) => (
              <li key={therapy} style={{ breakInside: "avoid", marginBottom: 6, fontSize: 14 }}>{therapy}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 style={{ color: "#1f2937", fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Information</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {INFO_LINKS.map((link) => (
              <li key={link.label}>
                {link.href.startsWith('/') ? (
                  <Link
                    href={link.href}
                    style={{ color: "#515154", textDecoration: "none", fontSize: 14 }}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    style={{ color: "#515154", textDecoration: "none", fontSize: 14 }}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 style={{ color: "#1f2937", fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Experts</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {EXPERTS.map((expert) => (
              <li key={expert} style={{ fontSize: 14 }}>{expert}</li>
            ))}
          </ul>
        </div>
      </div>
      <div style={{ textAlign: "center", color: "#6b7280", fontSize: 12, marginTop: 28 }}>
        &copy; {new Date().getFullYear()} CureMinds. All rights reserved.
      </div>
    </footer>
  );
} 