'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { PromptInputBox } from '../../../components/ui/ai-prompt-box';
import TimeWarningModal from '../../../components/TimeWarningModal';
import PaymentModal from '../../../components/PaymentModal';
import ReviewModal from '../../../components/ReviewModal';
import Timer from '../../../components/Timer';

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
  { id: '30min', duration: 30, price: 200, label: '30 Minutes' },
  { id: '60min', duration: 60, price: 400, label: '60 Minutes' }
];

// Theme definitions
const themes = {
  default: {
    name: 'Sunset',
    gradient: 'bg-[radial-gradient(125%_125%_at_50%_101%,rgba(245,87,2,1)_10.5%,rgba(245,120,2,1)_16%,rgba(245,140,2,1)_17.5%,rgba(245,170,100,1)_25%,rgba(238,174,202,1)_40%,rgba(202,179,214,1)_65%,rgba(148,201,233,1)_100%)]',
    icon: '🌅'
  },
  ocean: {
    name: 'Ocean',
    gradient: 'bg-[radial-gradient(125%_125%_at_50%_101%,rgba(0,119,190,1)_10.5%,rgba(0,150,200,1)_16%,rgba(0,180,220,1)_17.5%,rgba(64,200,240,1)_25%,rgba(100,220,255,1)_40%,rgba(150,230,255,1)_65%,rgba(200,240,255,1)_100%)]',
    icon: '🌊'
  },
  forest: {
    name: 'Forest',
    gradient: 'bg-[radial-gradient(125%_125%_at_50%_101%,rgba(34,139,34,1)_10.5%,rgba(46,139,87,1)_16%,rgba(60,179,113,1)_17.5%,rgba(85,197,122,1)_25%,rgba(107,142,35,1)_40%,rgba(154,205,50,1)_65%,rgba(173,255,47,1)_100%)]',
    icon: '🌲'
  },
  night: {
    name: 'Night',
    gradient: 'bg-[radial-gradient(125%_125%_at_50%_101%,rgba(25,25,112,1)_10.5%,rgba(47,47,79,1)_16%,rgba(72,61,139,1)_17.5%,rgba(106,90,205,1)_25%,rgba(138,43,226,1)_40%,rgba(186,85,211,1)_65%,rgba(221,160,221,1)_100%)]',
    icon: '🌙'
  },
  fire: {
    name: 'Fire',
    gradient: 'bg-[radial-gradient(125%_125%_at_50%_101%,rgba(139,0,0,1)_10.5%,rgba(178,34,34,1)_16%,rgba(220,20,60,1)_17.5%,rgba(255,69,0,1)_25%,rgba(255,140,0,1)_40%,rgba(255,165,0,1)_65%,rgba(255,215,0,1)_100%)]',
    icon: '🔥'
  },
  lavender: {
    name: 'Lavender',
    gradient: 'bg-[radial-gradient(125%_125%_at_50%_101%,rgba(147,112,219,1)_10.5%,rgba(186,85,211,1)_16%,rgba(221,160,221,1)_17.5%,rgba(230,230,250,1)_25%,rgba(240,248,255,1)_40%,rgba(248,248,255,1)_65%,rgba(255,255,255,1)_100%)]',
    icon: '💜'
  }
};

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
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const warningShownRef = React.useRef(false);
  const [currentTheme, setCurrentTheme] = useState('default');
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showEndSessionConfirm, setShowEndSessionConfirm] = useState(false);
  const [showBackConfirm, setShowBackConfirm] = useState(false);

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
      const sessionDurationInSeconds = duration * 60;
      setRemainingTime(sessionDurationInSeconds); // Convert to seconds
      setCurrentTime(sessionDurationInSeconds);
      console.log('Session initialized with duration:', duration, 'minutes =', sessionDurationInSeconds, 'seconds');
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load session data');
      setIsLoading(false);
    }
  }, [sessionId]);

  // Timer effect
  useEffect(() => {
    // Only start timer if we have a valid session and currentTime is greater than 0
    if (!selectedDoctor || !selectedSession || currentTime === null || currentTime <= 0) {
      console.log('Timer not started:', { selectedDoctor: !!selectedDoctor, selectedSession: !!selectedSession, currentTime });
      return;
    }

    console.log('Timer started with currentTime:', currentTime, 'seconds');

    // Check for time warning at exactly 60 seconds
    if (currentTime === 60 && !warningShownRef.current) {
      console.log('Timer reached 60 seconds, showing warning');
      warningShownRef.current = true;
      handleTimeWarning();
    }

    const timer = setInterval(() => {
      setCurrentTime(prev => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          handleEndSession();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentTime, selectedDoctor, selectedSession]);

  // Show welcome message initially
  const [showWelcome, setShowWelcome] = useState(true);

  // Hide welcome message when user sends first message
  const handleSendMessage = (message, files) => {
    if (!message.trim() && (!files || files.length === 0)) return;

    // Hide welcome message on first user message
    if (showWelcome) {
      setShowWelcome(false);
    }

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: message,
      files: files,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate doctor typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const doctorResponse = {
        id: Date.now() + 1,
        sender: 'doctor',
        text: "Thank you for sharing that with me. I'm here to listen and help you work through this.",
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, doctorResponse]);
    }, 2000);
  };



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
    setCurrentTime(prev => prev + (selectedExtension.minutes * 60));
    setSelectedExtension(null);
  };

  const handleEndSession = () => {
    // Show confirmation popup first
    setShowEndSessionConfirm(true);
  };

  const confirmEndSession = () => {
    setShowEndSessionConfirm(false);
    // Show review modal
    setShowReviewModal(true);
  };

  const cancelEndSession = () => {
    setShowEndSessionConfirm(false);
  };

  const handleBackClick = () => {
    setShowBackConfirm(true);
  };

  const confirmBack = () => {
    setShowBackConfirm(false);
    router.push('/chat-therapy');
  };

  const cancelBack = () => {
    setShowBackConfirm(false);
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

  const handleThemeChange = (themeKey) => {
    setCurrentTheme(themeKey);
    setShowThemePicker(false);
  };

  // Close theme picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showThemePicker && !event.target.closest('.theme-picker')) {
        setShowThemePicker(false);
      }
    };

    if (showThemePicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showThemePicker]);

  // Show loading while initializing
  if (isLoading) {
    return (
      <div className="flex w-full h-screen justify-center items-center bg-[radial-gradient(125%_125%_at_50%_101%,rgba(245,87,2,1)_10.5%,rgba(245,120,2,1)_16%,rgba(245,140,2,1)_17.5%,rgba(245,170,100,1)_25%,rgba(238,174,202,1)_40%,rgba(202,179,214,1)_65%,rgba(148,201,233,1)_100%)]">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white/80">Loading chat session...</p>
        </div>
      </div>
    );
  }

  // Show error if session is invalid
  if (error) {
    return (
      <div className="flex w-full h-screen justify-center items-center bg-[radial-gradient(125%_125%_at_50%_101%,rgba(245,87,2,1)_10.5%,rgba(245,120,2,1)_16%,rgba(245,140,2,1)_17.5%,rgba(245,170,100,1)_25%,rgba(238,174,202,1)_40%,rgba(202,179,214,1)_65%,rgba(148,201,233,1)_100%)]">
        <div className="text-center text-white">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Session Error</h2>
          <p className="text-white/80 mb-6">{error}</p>
          <button
            onClick={() => router.push('/chat-therapy')}
            className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors duration-200 border border-white/20"
          >
            Back to Doctor Selection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex w-full h-screen justify-center items-center ${themes[currentTheme].gradient} relative`}>
      {/* Back Arrow - Top Left */}
      <button
        onClick={handleBackClick}
        className="absolute top-6 left-6 p-3 text-white/80 hover:text-white transition-all duration-200 hover:bg-white/10 rounded-full backdrop-blur-sm border border-white/20 z-10"
        title="Back to Doctor Selection"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Animated Theme Characters - Moving Across Window */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {currentTheme === 'ocean' && ['🦑', '🐙', '🦈', '🐋', '🐠', '🦀'].map((char, index) => (
          <div
            key={index}
            className="absolute text-2xl opacity-20"
            style={{
              top: `${5 + (index * 8)}%`,
              left: `${10 + (index * 15)}%`,
              animation: `swim ${20 + index * 3}s ease-in-out infinite`,
              animationDelay: `${index * 2}s`
            }}
          >
            {char}
          </div>
        ))}
        {currentTheme === 'forest' && ['🦋', '🐦', '🦊', '🐿️', '🦌', '🦉'].map((char, index) => (
          <div
            key={index}
            className="absolute text-2xl opacity-20"
            style={{
              top: `${3 + (index * 10)}%`,
              left: `${15 + (index * 12)}%`,
              animation: `fly ${25 + index * 2}s ease-in-out infinite`,
              animationDelay: `${index * 2.5}s`
            }}
          >
            {char}
          </div>
        ))}
        {currentTheme === 'night' && ['🦇', '🦉', '⭐', '🌙', '✨', '💫'].map((char, index) => (
          <div
            key={index}
            className="absolute text-2xl opacity-20"
            style={{
              top: `${2 + (index * 11)}%`,
              left: `${20 + (index * 13)}%`,
              animation: `float ${30 + index * 2}s ease-in-out infinite`,
              animationDelay: `${index * 3}s`
            }}
          >
            {char}
          </div>
        ))}
        {currentTheme === 'fire' && ['🔥', '💥', '⚡', '🌋', '🔥', '💫'].map((char, index) => (
          <div
            key={index}
            className="absolute text-2xl opacity-20"
            style={{
              top: `${8 + (index * 6)}%`,
              left: `${25 + (index * 10)}%`,
              animation: `burn ${18 + index * 2}s ease-in-out infinite`,
              animationDelay: `${index * 1.8}s`
            }}
          >
            {char}
          </div>
        ))}
        {currentTheme === 'lavender' && ['🌸', '🌺', '🌼', '🌻', '🌷', '💐'].map((char, index) => (
          <div
            key={index}
            className="absolute text-2xl opacity-20"
            style={{
              top: `${6 + (index * 9)}%`,
              left: `${30 + (index * 11)}%`,
              animation: `drift ${22 + index * 2.5}s ease-in-out infinite`,
              animationDelay: `${index * 2.2}s`
            }}
          >
            {char}
          </div>
        ))}
        {currentTheme === 'default' && ['🌅', '🌄', '🌇', '🌆', '🌃', '🌉'].map((char, index) => (
          <div
            key={index}
            className="absolute text-2xl opacity-20"
            style={{
              top: `${4 + (index * 8)}%`,
              left: `${35 + (index * 10)}%`,
              animation: `glow ${28 + index * 2}s ease-in-out infinite`,
              animationDelay: `${index * 2.8}s`
            }}
          >
            {char}
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes swim {
            0% { transform: translateX(0px) translateY(0px); }
            25% { transform: translateX(200px) translateY(-50px); }
            50% { transform: translateX(400px) translateY(100px); }
            75% { transform: translateX(200px) translateY(200px); }
            100% { transform: translateX(0px) translateY(0px); }
          }
          @keyframes fly {
            0% { transform: translateX(0px) translateY(0px) rotate(0deg); }
            25% { transform: translateX(300px) translateY(-100px) rotate(15deg); }
            50% { transform: translateX(500px) translateY(50px) rotate(-10deg); }
            75% { transform: translateX(200px) translateY(250px) rotate(5deg); }
            100% { transform: translateX(0px) translateY(0px) rotate(0deg); }
          }
          @keyframes float {
            0% { transform: translateX(0px) translateY(0px) scale(1); }
            33% { transform: translateX(250px) translateY(-75px) scale(1.1); }
            66% { transform: translateX(450px) translateY(125px) scale(1); }
            100% { transform: translateX(0px) translateY(0px) scale(1); }
          }
          @keyframes burn {
            0% { transform: translateX(0px) translateY(0px) scale(1); }
            50% { transform: translateX(350px) translateY(-25px) scale(1.3); }
            100% { transform: translateX(0px) translateY(0px) scale(1); }
          }
          @keyframes drift {
            0% { transform: translateX(0px) translateY(0px) rotate(0deg); }
            50% { transform: translateX(300px) translateY(-50px) rotate(20deg); }
            100% { transform: translateX(0px) translateY(0px) rotate(0deg); }
          }
          @keyframes glow {
            0% { transform: translateX(0px) translateY(0px) scale(1); opacity: 0.2; }
            50% { transform: translateX(250px) translateY(-100px) scale(1.2); opacity: 0.4; }
            100% { transform: translateX(0px) translateY(0px) scale(1); opacity: 0.2; }
          }
        `
      }} />

      {/* Theme Switcher - Bottom Right */}
      <div className="absolute bottom-6 right-6 z-10 theme-picker">
        <button
          onClick={() => setShowThemePicker(!showThemePicker)}
          className="p-3 text-white/80 hover:text-white transition-all duration-200 hover:bg-white/10 rounded-full backdrop-blur-sm border border-white/20"
          title="Change Theme"
        >
          <span className="text-xl">{themes[currentTheme].icon}</span>
        </button>

        {/* Theme Picker Popup */}
        {showThemePicker && (
          <div className="absolute bottom-full right-0 mb-2 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg w-48">
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(themes).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => handleThemeChange(key)}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    currentTheme === key 
                      ? 'bg-white/30 text-white' 
                      : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                  }`}
                  title={theme.name}
                >
                  <div className="text-lg">{theme.icon}</div>
                  <div className="text-xs mt-1">{theme.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex flex-col w-full h-full max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 p-4 bg-white/40 backdrop-blur-[80px] rounded-2xl border border-white/40 shadow-xl">
          <div className="flex items-center space-x-4">
            <img
              src={selectedDoctor?.image}
              alt={selectedDoctor?.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{selectedDoctor?.name}</h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-sm text-gray-600">Online</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-white/80">
              <Timer time={currentTime} />
            </div>
            <button
              onClick={handleEndSession}
              className="px-4 py-2 text-red-300 hover:text-red-200 font-medium transition-colors"
            >
              End Session
            </button>
          </div>
        </div>

                 {/* Messages Area */}
         <div className="flex-1 overflow-y-auto p-4 space-y-4 mb-6">
           {/* Welcome Message */}
           {showWelcome && (
             <div className="flex justify-center items-center h-full">
               <div className="text-center">
                 <h1 className="text-3xl font-bold text-white mb-4">How are you? Let&apos;s talk!</h1>
                 <p className="text-white/80 text-lg">Start typing to begin your conversation with {selectedDoctor?.name}</p>
               </div>
             </div>
           )}

           {/* Chat Messages */}
           {!showWelcome && messages.map((message) => (
             <div
               key={message.id}
               className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} items-end space-x-2`}
             >
               {/* Doctor/User Image */}
               {message.sender === 'doctor' && (
                 <img
                   src={selectedDoctor?.image}
                   alt={selectedDoctor?.name}
                   className="w-8 h-8 rounded-full object-cover border-2 border-white/30 flex-shrink-0"
                 />
               )}
               
               <div
                 className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                   message.sender === 'user'
                     ? 'bg-blue-500/80 backdrop-blur-sm text-white shadow-lg'
                     : 'bg-purple-500/80 backdrop-blur-sm text-white shadow-lg'
                 }`}
               >
                 <p className="text-sm">{message.text}</p>
                 {message.files && message.files.length > 0 && (
                   <div className="mt-2">
                     {message.files.map((file, index) => (
                       <div key={index} className="text-xs text-white/80">
                         📎 {file.name}
                       </div>
                     ))}
                   </div>
                 )}
               </div>

               {/* User Image */}
               {message.sender === 'user' && (
                 <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                   U
                 </div>
               )}
             </div>
           ))}
          
          {isTyping && !showWelcome && (
            <div className="flex items-center space-x-2 text-white/60">
              <img
                src={selectedDoctor?.image}
                alt={selectedDoctor?.name}
                className="w-8 h-8 rounded-full object-cover border-2 border-white/30"
              />
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm">{selectedDoctor?.name} is typing...</span>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4">
          <PromptInputBox 
            onSend={handleSendMessage} 
            placeholder="Type your message here..."
            className="w-full"
          />
        </div>
      </div>

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

      {/* End Session Confirmation Modal */}
      {showEndSessionConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-8 max-w-md w-full border border-white/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">End Session?</h3>
              <p className="text-white/90 mb-6">Are you sure you want to end this session? This action cannot be undone.</p>
              
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={cancelEndSession}
                  className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors duration-200 border border-white/30"
                >
                  No, Continue
                </button>
                <button
                  onClick={confirmEndSession}
                  className="px-6 py-3 bg-red-500/80 hover:bg-red-600/80 text-white rounded-lg transition-colors duration-200 border border-red-400/30"
                >
                  Yes, End Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back Confirmation Modal */}
      {showBackConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-8 max-w-md w-full border border-white/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Leave Session?</h3>
              <p className="text-white/90 mb-6">Are you sure you want to leave this session? Your progress will be lost.</p>
              
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={cancelBack}
                  className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors duration-200 border border-white/30"
                >
                  No, Stay
                </button>
                <button
                  onClick={confirmBack}
                  className="px-6 py-3 bg-red-500/80 hover:bg-red-600/80 text-white rounded-lg transition-colors duration-200 border border-red-400/30"
                >
                  Yes, Leave
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && selectedDoctor && (
        <ReviewModal
          doctor={selectedDoctor}
          onSubmit={handleReviewSubmit}
          onClose={handleReviewSkip}
        />
      )}
    </div>
  );
};

export default ChatSessionPage; 