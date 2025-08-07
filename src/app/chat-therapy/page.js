'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '../../components/Footer';

const ChatTherapyPage = () => {
  const router = useRouter();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingDoctor, setViewingDoctor] = useState(null);

  // Sample doctor data (only 4 doctors)
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Anxiety & Depression Specialist",
      experience: "8 years",
      image: "/irene.jpeg",
      rating: 4.8,
      patients: 1200,
      languages: ["English", "Spanish"],
      education: "PhD in Clinical Psychology",
      approach: "Cognitive Behavioral Therapy",
      about: "Dr. Sarah specializes in treating anxiety and depression using evidence-based approaches. She has helped over 1200 patients overcome their mental health challenges and lead fulfilling lives."
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Relationship & Family Counselor",
      experience: "12 years",
      image: "/patient.jpg",
      rating: 4.9,
      patients: 1800,
      languages: ["English", "Mandarin"],
      education: "PsyD in Marriage & Family Therapy",
      approach: "Systemic Family Therapy",
      about: "Dr. Michael is an expert in relationship counseling and family therapy. With over 12 years of experience, he has successfully helped couples and families rebuild their relationships."
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Trauma & PTSD Therapist",
      experience: "10 years",
      image: "/irene.jpeg",
      rating: 4.7,
      patients: 950,
      languages: ["English", "Portuguese"],
      education: "PhD in Trauma Psychology",
      approach: "EMDR & Trauma-Focused CBT",
      about: "Dr. Emily is a certified trauma specialist who uses EMDR and trauma-focused cognitive behavioral therapy to help patients heal from past traumatic experiences."
    },
    {
      id: 4,
      name: "Dr. David Thompson",
      specialty: "Addiction Recovery Specialist",
      experience: "15 years",
      image: "/patient.jpg",
      rating: 4.6,
      patients: 2200,
      languages: ["English"],
      education: "PhD in Addiction Psychology",
      approach: "Motivational Interviewing",
      about: "Dr. David has dedicated 15 years to helping individuals overcome addiction. His compassionate approach and evidence-based methods have transformed thousands of lives."
    }
  ];

  const sessionOptions = [
    { id: 'free', duration: 10, price: 0, label: 'Free Trial', features: ['10 minutes session', 'Basic consultation', 'Get to know your therapist'] },
    { id: '30min', duration: 30, price: 100, label: '30 Minutes', features: ['30 minutes session', 'In-depth consultation', 'Personalized treatment plan', 'Follow-up support'] },
    { id: '60min', duration: 60, price: 200, label: '60 Minutes', features: ['60 minutes session', 'Comprehensive therapy', 'Detailed treatment plan', 'Progress tracking', 'Priority support'] }
  ];

  // Generate a unique session ID
  const generateSessionId = () => {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleViewDoctor = (doctor) => {
    setViewingDoctor(doctor);
    setShowViewModal(true);
  };

  const handleSessionSelect = (session) => {
    if (!selectedDoctor) return;
    
    setSelectedSession(session);
    
    if (session.price === 0) {
      // Free session - go directly to chat
      const sessionId = generateSessionId();
      const sessionData = {
        doctorId: selectedDoctor.id,
        sessionId: session.id,
        duration: session.duration,
        price: session.price,
        timestamp: Date.now()
      };
      localStorage.setItem(sessionId, JSON.stringify(sessionData));
      router.push(`/chat-session/${sessionId}`);
    } else {
      // For paid sessions, you can implement payment logic here
      const sessionId = generateSessionId();
      const sessionData = {
        doctorId: selectedDoctor.id,
        sessionId: session.id,
        duration: session.duration,
        price: session.price,
        timestamp: Date.now()
      };
      localStorage.setItem(sessionId, JSON.stringify(sessionData));
      router.push(`/chat-session/${sessionId}`);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(125%_125%_at_50%_101%,rgba(245,87,2,1)_10.5%,rgba(245,120,2,1)_16%,rgba(245,140,2,1)_17.5%,rgba(245,170,100,1)_25%,rgba(238,174,202,1)_40%,rgba(202,179,214,1)_65%,rgba(148,201,233,1)_100%)] pt-20">
             {/* Header */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
         <div className="text-center">
           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
             Hey, we are glad you are here
           </h1>
           <p className="text-xl text-white/90 max-w-3xl mx-auto">
             Let&apos;s get started
           </p>
         </div>
       </div>

             {/* Doctors Section */}
       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         {/* Doctor Cards */}
        <div className="space-y-4">
          {doctors.map((doctor) => (
            <div key={doctor.id}>
                             <div
                 className={`bg-white/60 backdrop-blur-3xl rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                   selectedDoctor?.id === doctor.id 
                     ? 'border-2 border-white/70 shadow-lg scale-[1.02]' 
                     : 'border border-white/40 hover:border-white/60'
                 } ${selectedDoctor && selectedDoctor.id !== doctor.id ? 'opacity-60' : 'opacity-100'}`}
                 onClick={() => handleDoctorSelect(doctor)}
               >
                <div className="flex items-center space-x-6">
                  {/* Doctor Image */}
                  <div className="relative">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-white/30"
                    />
                    {selectedDoctor?.id === doctor.id && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>

                                     {/* Doctor Info */}
                   <div className="flex-1">
                     <h3 className="text-xl font-semibold text-gray-800 mb-1">{doctor.name}</h3>
                     <p className="text-gray-700 mb-2">{doctor.specialty}</p>
                     <div className="flex items-center space-x-4 text-sm text-gray-600">
                       <span>⭐ {doctor.rating}</span>
                       <span>👥 {doctor.patients} patients</span>
                       <span>📚 {doctor.experience} experience</span>
                     </div>
                   </div>

                                     {/* Buttons */}
                     <div className="flex space-x-3">
                       <button
                         onClick={(e) => {
                           e.stopPropagation();
                           handleDoctorSelect(doctor);
                         }}
                         className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 font-semibold"
                       >
                         Start
                       </button>
                       <button
                         onClick={(e) => {
                           e.stopPropagation();
                           handleViewDoctor(doctor);
                         }}
                         className="px-6 py-2 bg-white/60 hover:bg-white/70 text-gray-800 rounded-lg transition-colors duration-200 border border-white/50"
                       >
                         View
                       </button>
                     </div>
                </div>
              </div>

                                            {/* Session Selection - Appears below the selected doctor card */}
               {selectedDoctor?.id === doctor.id && (
                 <div className="mt-4">
                   <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                     Select Session with {selectedDoctor.name}
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     {sessionOptions.map((session) => (
                       <div
                         key={session.id}
                         className={`bg-white/60 backdrop-blur-2xl rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                           selectedSession?.id === session.id 
                             ? 'border-2 border-white/70 shadow-lg' 
                             : 'border border-white/40 hover:border-white/60'
                         }`}
                         onClick={() => handleSessionSelect(session)}
                       >
                         <div className="text-center">
                           <h4 className="text-lg font-semibold text-gray-800 mb-2">{session.label}</h4>
                           <div className="text-2xl font-bold text-gray-800 mb-3">
                             {session.price === 0 ? 'Free' : `₹${session.price}`}
                           </div>
                           <ul className="text-xs text-gray-700 space-y-1 mb-4">
                             {session.features.map((feature, index) => (
                               <li key={index} className="flex items-center justify-center">
                                 <span className="mr-1">✓</span>
                                 {feature}
                               </li>
                             ))}
                           </ul>
                           <button
                             className="w-full py-2 bg-white/60 hover:bg-white/70 text-gray-800 rounded-lg transition-colors duration-200 border border-white/50 text-sm"
                           >
                             Select
                           </button>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               )}
            </div>
          ))}
        </div>
      </div>

      {/* View Doctor Modal */}
      {showViewModal && viewingDoctor && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-8 max-w-2xl w-full border border-white/20">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-white">{viewingDoctor.name}</h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-white/80 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
                         {/* Video */}
             <div className="mb-6">
               <video
                 className="w-full h-80 object-cover rounded-lg"
                 autoPlay
                 muted
                 loop
                 controls
               >
                 <source src="/hero_intro.mp4" type="video/mp4" />
                 Your browser does not support the video tag.
               </video>
             </div>

            {/* About */}
            <div className="text-white/90 leading-relaxed">
              <h4 className="text-lg font-semibold text-white mb-3">About Dr. {viewingDoctor.name.split(' ')[1]}</h4>
              <p>{viewingDoctor.about}</p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors duration-200 border border-white/30"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Clouds Image */}
      <div style={{ width: '100%', height: '250px', overflow: 'hidden', marginTop: '60px', marginBottom: '0' }}>
        <img 
          src="/clouds.jpg" 
          alt="Clouds" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            objectPosition: 'center'
          }} 
        />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ChatTherapyPage; 