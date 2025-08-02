'use client';

import React, { useState } from 'react';
import DoctorCard from '../../components/DoctorCard';
import PaymentModal from '../../components/PaymentModal';
import { useRouter } from 'next/navigation';

const ChatTherapyPage = () => {
  const router = useRouter();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Sample doctor data
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Anxiety & Depression",
      experience: "8 years",
      image: "/irene.jpeg",
      rating: 4.8,
      patients: 1200,
      languages: ["English", "Spanish"],
      education: "PhD in Clinical Psychology",
      approach: "Cognitive Behavioral Therapy"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Relationship Counseling",
      experience: "12 years",
      image: "/patient.jpg",
      rating: 4.9,
      patients: 1800,
      languages: ["English", "Mandarin"],
      education: "PsyD in Marriage & Family Therapy",
      approach: "Systemic Family Therapy"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Trauma & PTSD",
      experience: "10 years",
      image: "/irene.jpeg",
      rating: 4.7,
      patients: 950,
      languages: ["English", "Portuguese"],
      education: "PhD in Trauma Psychology",
      approach: "EMDR & Trauma-Focused CBT"
    },
    {
      id: 4,
      name: "Dr. David Thompson",
      specialty: "Addiction Recovery",
      experience: "15 years",
      image: "/patient.jpg",
      rating: 4.6,
      patients: 2200,
      languages: ["English"],
      education: "PhD in Addiction Psychology",
      approach: "Motivational Interviewing"
    },
    {
      id: 5,
      name: "Dr. Lisa Park",
      specialty: "Child & Adolescent Therapy",
      experience: "9 years",
      image: "/irene.jpeg",
      rating: 4.9,
      patients: 1400,
      languages: ["English", "Korean"],
      education: "PsyD in Child Psychology",
      approach: "Play Therapy & Family Systems"
    },
    {
      id: 6,
      name: "Dr. James Wilson",
      specialty: "Stress Management",
      experience: "11 years",
      image: "/patient.jpg",
      rating: 4.8,
      patients: 1600,
      languages: ["English"],
      education: "PhD in Health Psychology",
      approach: "Mindfulness-Based Stress Reduction"
    }
  ];

  const sessionOptions = [
    { id: 'free', duration: 2, price: 0, label: 'Free Trial' },
    { id: '30min', duration: 2, price: 200, label: '30 Minutes' },
    { id: '60min', duration: 2, price: 400, label: '60 Minutes' }
  ];

  // Generate a unique session ID
  const generateSessionId = () => {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  };

  const handleSessionSelect = (doctor, session) => {
    setSelectedDoctor(doctor);
    setSelectedSession(session);
    
    if (session.price === 0) {
      // Free session - go directly to chat
      const sessionId = generateSessionId();
      // Store session data in localStorage
      const sessionData = {
        doctorId: doctor.id,
        sessionId: session.id,
        duration: session.duration,
        price: session.price,
        timestamp: Date.now()
      };
      localStorage.setItem(sessionId, JSON.stringify(sessionData));
      router.push(`/chat-session/${sessionId}`);
    } else {
      // Paid session - show payment modal
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    const sessionId = generateSessionId();
    // Store session data in localStorage
    const sessionData = {
      doctorId: selectedDoctor.id,
      sessionId: selectedSession.id,
      duration: selectedSession.duration,
      price: selectedSession.price,
      timestamp: Date.now()
    };
    localStorage.setItem(sessionId, JSON.stringify(sessionData));
    router.push(`/chat-session/${sessionId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-34">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Chat Therapy
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with licensed therapists for personalized mental health support. 
              Choose from our experienced professionals and start your healing journey today.
            </p>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              sessionOptions={sessionOptions}
              onSessionSelect={(session) => handleSessionSelect(doctor, session)}
            />
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedDoctor && selectedSession && (
        <PaymentModal
          doctor={selectedDoctor}
          session={selectedSession}
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
};

export default ChatTherapyPage; 