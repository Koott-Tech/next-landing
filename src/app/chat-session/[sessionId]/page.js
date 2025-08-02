'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ChatScreen from '../../../components/ChatScreen';
import TimeWarningModal from '../../../components/TimeWarningModal';
import PaymentModal from '../../../components/PaymentModal';
import ReviewModal from '../../../components/ReviewModal';

// Sample doctor data (same as in chat-therapy page)
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

const ChatSessionPage = () => {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.sessionId;
  
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [showExtensionPayment, setShowExtensionPayment] = useState(false);
  const [selectedExtension, setSelectedExtension] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize session data from localStorage
  useEffect(() => {
    if (!sessionId) {
      setError('No session ID provided');
      setIsLoading(false);
      return;
    }

    try {
      const sessionData = localStorage.getItem(sessionId);
      
      if (!sessionData) {
        setError('Session not found or expired');
        setIsLoading(false);
        return;
      }

      const parsedData = JSON.parse(sessionData);
      const { doctorId, sessionId: sessionTypeId, duration, price, timestamp } = parsedData;

      // Check if session is expired (24 hours)
      const sessionAge = Date.now() - timestamp;
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
      if (sessionAge > maxAge) {
        localStorage.removeItem(sessionId);
        setError('Session has expired');
        setIsLoading(false);
        return;
      }

      const doctor = doctors.find(d => d.id === doctorId);
      const session = sessionOptions.find(s => s.id === sessionTypeId);
      
      if (!doctor || !session) {
        setError('Invalid session data');
        setIsLoading(false);
        return;
      }

      setSelectedDoctor(doctor);
      setSelectedSession(session);
      setRemainingTime(duration * 60); // Convert to seconds
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load session data');
      setIsLoading(false);
    }
  }, [sessionId]);

  const handleTimeWarning = () => {
    setShowTimeWarning(true);
  };

  const handleExtendTime = (extension) => {
    setSelectedExtension(extension);
    setShowTimeWarning(false);
    setShowExtensionPayment(true);
  };

  const handleExtensionPaymentSuccess = () => {
    setShowExtensionPayment(false);
    setRemainingTime(prev => prev + (selectedExtension.minutes * 60));
    setSelectedExtension(null);
  };

  const handleEndSession = () => {
    // Show review modal instead of immediately redirecting
    setShowReviewModal(true);
  };

  const handleReviewSubmit = (reviewData) => {
    // Here you would typically send the review to your backend
    console.log('Review submitted:', reviewData);
    
    // Clean up session data
    if (sessionId) {
      localStorage.removeItem(sessionId);
    }
    
    // Redirect to doctor selection
    router.push('/chat-therapy');
  };

  const handleReviewSkip = () => {
    // Clean up session data
    if (sessionId) {
      localStorage.removeItem(sessionId);
    }
    
    // Redirect to doctor selection
    router.push('/chat-therapy');
  };

  // Show loading while initializing
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading chat session...</p>
        </div>
      </div>
    );
  }

  // Show error if session is invalid
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Session Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/chat-therapy')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Back to Doctor Selection
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <ChatScreen
        doctor={selectedDoctor}
        session={selectedSession}
        remainingTime={remainingTime}
        onTimeWarning={handleTimeWarning}
        onEndSession={handleEndSession}
        onExtendTime={handleExtendTime}
      />

      {/* Time Warning Modal */}
      {showTimeWarning && (
        <TimeWarningModal
          onExtendTime={handleExtendTime}
          onEndSession={handleEndSession}
        />
      )}

      {/* Extension Payment Modal */}
      {showExtensionPayment && selectedExtension && (
        <PaymentModal
          doctor={selectedDoctor}
          session={selectedExtension}
          onSuccess={handleExtensionPaymentSuccess}
          onClose={() => setShowExtensionPayment(false)}
          isExtension={true}
        />
      )}

      {/* Review Modal */}
      {showReviewModal && selectedDoctor && (
        <ReviewModal
          doctor={selectedDoctor}
          onSubmit={handleReviewSubmit}
          onClose={handleReviewSkip}
        />
      )}
    </>
  );
};

export default ChatSessionPage; 