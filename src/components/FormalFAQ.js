'use client';

import React, { useState } from "react";

const FormalFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // Add CSS for smooth transitions
  const faqStyles = `
    .faq-answer {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .faq-item {
      transition: all 0.3s ease;
    }
    .faq-item:hover {
      box-shadow: 0 2px 8px rgba(39, 174, 96, 0.1);
    }
  `;

  const faqData = [
    {
      question: "What types of therapy do you offer?",
      answer: "We offer both chat therapy and video sessions. Chat therapy provides ongoing support through text-based conversations, while video sessions offer face-to-face interactions with licensed therapists in a secure, private environment."
    },
    {
      question: "How do I get matched with a therapist?",
      answer: "Our AI-powered matching system analyzes your assessment responses, preferences, and specific needs to connect you with the most suitable therapist. We consider factors like specialization, communication style, and availability to ensure the best therapeutic relationship."
    },
    {
      question: "Is my information secure and confidential?",
      answer: "Yes, we take your privacy seriously. All sessions are encrypted, and we follow strict HIPAA guidelines. Your personal information and therapy sessions are completely confidential and secure."
    },
    {
      question: "How much does therapy cost?",
      answer: "Our pricing varies based on the type of session and therapist. Chat therapy sessions typically range from $50-80 per session, while video sessions range from $80-120 per session. We also offer subscription plans for regular therapy."
    },
    {
      question: "Can I switch therapists if needed?",
      answer: "Absolutely. We understand that finding the right therapist is crucial for effective therapy. You can request a new therapist at any time, and our matching system will help you find a better fit based on your experience and preferences."
    },
    {
      question: "What if I need immediate help?",
      answer: "If you're experiencing a crisis or need immediate support, please contact emergency services (911) or a crisis hotline. While we provide 24/7 access to our platform, we're not a crisis intervention service."
    },
    {
      question: "Do you accept insurance?",
      answer: "We're working on expanding our insurance partnerships. Currently, we accept some major insurance providers. You can check your coverage during the signup process, or contact our support team for specific insurance inquiries."
    },
    {
      question: "How long are the therapy sessions?",
      answer: "Chat therapy sessions are flexible and can be ongoing throughout the day. Video sessions are typically 50 minutes long, similar to traditional in-person therapy sessions. You can also schedule shorter check-in sessions as needed."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "4rem 0 60px 0",
        position: "relative",
        zIndex: 1
      }}
    >
      <style>{faqStyles}</style>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "90vw",
          maxWidth: 800,
          gap: "3rem",
          minHeight: "calc(100vh - 120px)"
        }}
      >

        {/* Header */}
        <div
          style={{
            textAlign: "center",
            maxWidth: 600,
            marginBottom: "1rem"
          }}
        >
          <h2
            style={{
              color: "#1a1a1a",
              fontWeight: 700,
              fontSize: "2rem",
              marginBottom: "0.5rem",
              lineHeight: 1.2
            }}
          >
            Frequently Asked Questions
          </h2>
          <p
            style={{
              color: "#666",
              fontSize: "1rem",
              lineHeight: 1.5,
              margin: 0
            }}
          >
            Find answers to common questions about our therapy services, 
            privacy, and how to get started on your mental health journey.
          </p>
        </div>

        {/* FAQ Items */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem"
          }}
        >
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="faq-item"
              style={{
                border: "1px solid #e0e7ef",
                borderRadius: "10px",
                overflow: "hidden",
                cursor: "pointer",
                backgroundColor: openIndex === index ? "#f8faff" : "#fff"
              }}
              onClick={() => toggleFAQ(index)}
            >
              {/* Question */}
              <div
                style={{
                  padding: "0.75rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: openIndex === index ? "#f0f7ff" : "#fff",
                  transition: "background-color 0.3s ease",
                  position: "relative"
                }}
              >
                <h3
                  style={{
                    color: "#1a1a1a",
                    fontWeight: 600,
                    fontSize: "1rem",
                    margin: 0,
                    lineHeight: 1.3,
                    flex: 1,
                    paddingRight: "1.5rem"
                  }}
                >
                  {faq.question}
                </h3>
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "transform 0.3s ease",
                    transform: openIndex === index ? "rotate(45deg)" : "rotate(0deg)"
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5v14M5 12h14" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {/* Answer */}
              <div
                className="faq-answer"
                style={{
                  maxHeight: openIndex === index ? "none" : "0",
                  overflow: "hidden",
                  padding: openIndex === index ? "0 0.75rem 0.75rem 0.75rem" : "0 0.75rem"
                }}
              >
                <p
                  style={{
                    color: "#666",
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                    margin: 0,
                    paddingTop: "0.4rem",
                    borderTop: openIndex === index ? "1px solid #e0e7ef" : "none"
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FormalFAQ; 