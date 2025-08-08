'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

// Custom hook for hover delay effect
const useHoverDelay = (delayMs = 3000) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDelayed, setIsDelayed] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsDelayed(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsDelayed(true); // Set delayed state to true immediately when mouse leaves
    timeoutRef.current = setTimeout(() => {
      setIsDelayed(false);
    }, delayMs);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    isActive: isHovered || isDelayed,
    handleMouseEnter,
    handleMouseLeave
  };
};

// Topic Tag Button Component
const TopicTagButton = ({ text, delay, greenIntensity = 'medium' }) => {
  const { isActive, handleMouseEnter, handleMouseLeave } = useHoverDelay(3000);

  // Different green intensities
  const greenStyles = {
    light: 'bg-gradient-to-r from-green-50 to-green-100 border-green-200',
    medium: 'bg-gradient-to-r from-green-100 to-green-200 border-green-300',
    dark: 'bg-gradient-to-r from-green-200 to-green-300 border-green-400',
    darker: 'bg-gradient-to-r from-green-300 to-green-400 border-green-500',
    darkest: 'bg-gradient-to-r from-green-400 to-green-500 border-green-600'
  };

  return (
    <button 
      className={`px-4 py-2 border rounded-full text-sm font-medium text-gray-700 transition-all duration-[3000ms] ease-in-out whitespace-nowrap ${
        isActive 
          ? greenStyles[greenIntensity]
          : 'bg-white border-gray-300'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {text}
    </button>
  );
};

// FAQ Item Component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 last:border-b-0">
      <button
        className="w-full py-4 flex items-center justify-between text-left text-[#005c65] font-medium hover:text-[#004a52] transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="pr-4">{question}</span>
        <span className={`text-xl transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-700 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

// Testimonials data
const testimonials = [
  {
    text: "Therapy with Talkspace has been life-changing. My therapist helped me work through my anxiety and I feel so much better equipped to handle daily stress.",
    image: "/irene.jpeg",
    name: "Sarah Johnson",
    role: "Marketing Manager",
  },
  {
    text: "I was skeptical about online therapy at first, but it's been incredibly effective. The convenience and quality of care exceeded my expectations.",
    image: "/patient.jpg",
    name: "Michael Chen",
    role: "Software Engineer",
  },
  {
    text: "My therapist has been amazing. She really understands my struggles with depression and has given me practical tools to manage my mental health.",
    image: "/irene.jpeg",
    name: "Emily Rodriguez",
    role: "Teacher",
  },
  {
    text: "The matching process was perfect. I found a therapist who specializes in exactly what I needed, and the sessions have been transformative.",
    image: "/patient.jpg",
    name: "David Thompson",
    role: "Business Analyst",
  },
  {
    text: "Online therapy fits perfectly into my busy schedule. The quality of care is outstanding and I've made significant progress in just a few months.",
    image: "/irene.jpeg",
    name: "Lisa Wang",
    role: "Healthcare Professional",
  },
  {
    text: "I appreciate the flexibility of online therapy. My therapist is always available when I need support, and the platform is so easy to use.",
    image: "/patient.jpg",
    name: "James Wilson",
    role: "Entrepreneur",
  },
  {
    text: "The therapy sessions have helped me develop better coping mechanisms for my anxiety. I'm grateful for the professional and caring approach.",
    image: "/irene.jpeg",
    name: "Maria Garcia",
    role: "Social Worker",
  },
  {
    text: "My experience with Talkspace has been exceptional. The therapist matching was spot-on and the ongoing support has been invaluable.",
    image: "/patient.jpg",
    name: "Robert Kim",
    role: "Consultant",
  },
  {
    text: "I've tried traditional therapy before, but online therapy with Talkspace has been more effective. The convenience and quality are unmatched.",
    image: "/irene.jpeg",
    name: "Jennifer Lee",
    role: "Designer",
  },
];

// Testimonials Column Component
const TestimonialsColumn = ({ className, testimonials, duration = 15 }) => {
  return (
    <div className={className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-6 rounded-2xl border shadow-lg bg-white max-w-xs w-full" key={i}>
                  <div className="text-gray-700 text-sm leading-relaxed">{text}</div>
                  <div className="flex items-center gap-3 mt-4">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <div className="font-semibold text-sm text-gray-800">{name}</div>
                      <div className="text-xs text-gray-600">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

const IndividualTherapyPage = () => {
  const targetRef = useRef(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Dropdown states
  const [openDropdown, setOpenDropdown] = useState(null); // 'language', 'needs', 'expert', or null
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedNeeds, setSelectedNeeds] = useState([]);
  const [selectedExperts, setSelectedExperts] = useState([]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Helper functions to handle dropdown toggles
  const toggleLanguageDropdown = () => {
    setOpenDropdown(openDropdown === 'language' ? null : 'language');
  };

  const toggleNeedsDropdown = () => {
    setOpenDropdown(openDropdown === 'needs' ? null : 'needs');
  };

  const toggleExpertDropdown = () => {
    setOpenDropdown(openDropdown === 'expert' ? null : 'expert');
  };

  // Therapist images and names for rotation
  const therapistData = [
    {
      image: "/irene.jpeg",
      name: "Elizabeth Keohan, LCSW-C"
    },
    {
      image: "/patient.jpg",
      name: "Dr. Sarah Johnson, PhD"
    },
    {
      image: "/irene.jpeg",
      name: "Dr. Michael Chen, LMFT"
    }
  ];

  const [currentTherapistIndex, setCurrentTherapistIndex] = useState(0);

  // Text phrases for animation
  const textPhrases = ["Choose", "Book", "Start"];
  
  // Card data for animation
  const cardData = [
    {
      title: "Choose Your Therapist",
      description: "Browse through our qualified therapists and select the one that best fits your needs and preferences.",
      image: "/irene.jpeg"
    },
    {
      title: "Book Your Session",
      description: "Schedule your therapy session at a time that works for you, with flexible options available.",
      image: "/patient.jpg"
    },
    {
      title: "Start Your Journey",
      description: "Begin your therapy session in a safe, confidential environment designed for your healing.",
      image: "/irene.jpeg"
    }
  ];
  
  useEffect(() => {
    if (typeof window === 'undefined' || !targetRef.current) return;
    
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Create a ScrollTrigger that tracks scroll progress
    const scrollTrigger = ScrollTrigger.create({
      trigger: targetRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        // Update scroll progress (0-1 range)
        setScrollProgress(self.progress);
        
        // Calculate which text/card should be visible based on scroll progress
        // Divide the scroll into 3 equal sections for smooth transitions
        const sectionProgress = self.progress * 3;
        const textIndex = Math.min(
          Math.floor(sectionProgress),
          textPhrases.length - 1
        );
        const cardIndex = Math.min(
          Math.floor(sectionProgress),
          cardData.length - 1
        );
        
        setCurrentTextIndex(textIndex);
        setCurrentCardIndex(cardIndex);
      }
    });
    
    return () => {
      // Clean up ScrollTrigger
      scrollTrigger.kill();
    };
  }, [textPhrases.length, cardData.length]);

  // Auto-rotate therapist images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTherapistIndex((prevIndex) => 
        (prevIndex + 1) % therapistData.length
      );
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [therapistData.length]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="flex min-h-screen">
                 {/* Left Side - Content */}
         <div className="flex-1 flex items-center px-8 lg:px-16" style={{ backgroundColor: '#9deab2' }}>
                     <div className="max-w-6xl">
                         <h1 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight" style={{ color: '#005c65' }}>
               Online therapy with a licensed therapist
             </h1>
                         <ul className="space-y-4 text-lg text-gray-700 mb-8">
               <li className="flex items-start">
                 <span className="text-green-500 text-2xl mr-3">•</span>
                 <span>No wait lists</span>
               </li>
               <li className="flex items-start">
                 <span className="text-green-500 text-2xl mr-3">•</span>
                 <span>Match with a therapist today</span>
               </li>
               <li className="flex items-start">
                 <span className="text-green-500 text-2xl mr-3">•</span>
                 <span>Most insured members have a $0 copay</span>
               </li>
             </ul>
                           <div className="flex items-center space-x-6">
                                 <button className="text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg" style={{ backgroundColor: '#005c65' }}>
                   Get Started
                 </button>
                                 <div className="flex items-center space-x-4">
                   <img 
                     src="/hippa.svg" 
                     alt="HIPAA Compliant" 
                     className="h-8 w-auto opacity-70"
                   />
                 </div>
              </div>
          </div>
        </div>
        
                 {/* Right Side - Image */}
         <div className="flex-[1.5] relative">
           <img 
             src="/hero.jpg" 
             alt="Individual Therapy" 
             className="w-full h-full object-cover"
           />
           {/* Growth Graph Overlay */}
           <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg" style={{ width: '280px', height: '200px' }}>
             <div className="flex items-center justify-between mb-4">
               <div className="flex items-center space-x-3">
                 <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                   <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                   </svg>
                 </div>
                 <div>
                   <div className="text-sm font-semibold text-gray-800">Growth</div>
                   <div className="text-xs text-gray-600">+85% this year</div>
                 </div>
               </div>
             </div>
             
             <div className="flex items-center space-x-4">
               {/* Pie Chart */}
               <div className="relative w-16 h-16">
                 <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 32 32">
                   <circle cx="16" cy="16" r="14" fill="none" stroke="#e5e7eb" strokeWidth="4"/>
                   <circle cx="16" cy="16" r="14" fill="none" stroke="#10b981" strokeWidth="4" 
                     strokeDasharray="88" strokeDashoffset="26" strokeLinecap="round"/>
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center">
                   <span className="text-xs font-semibold text-gray-700">70%</span>
                 </div>
               </div>
               
               {/* Mini Bar Chart */}
               <div className="flex items-end space-x-1">
                 <div className="w-3 bg-green-400 rounded-t" style={{ height: '24px' }}></div>
                 <div className="w-3 bg-green-400 rounded-t" style={{ height: '32px' }}></div>
                 <div className="w-3 bg-green-400 rounded-t" style={{ height: '20px' }}></div>
                 <div className="w-3 bg-green-400 rounded-t" style={{ height: '36px' }}></div>
                 <div className="w-3 bg-green-400 rounded-t" style={{ height: '28px' }}></div>
                 <div className="w-3 bg-green-500 rounded-t" style={{ height: '40px' }}></div>
               </div>
             </div>
           </div>
         </div>
             </div>
       
       {/* Benefits Section */}
       <div className="py-16 px-8 lg:px-16 bg-white">
         <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12" style={{ color: '#005c65' }}>
               Our Approach
             </h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {/* Card 1 */}
             <div className="bg-gray-200 rounded-lg p-6 text-left">
               <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4">
                 <svg className="w-8 h-8" style={{ color: '#005c65' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
               </div>
               <h3 className="text-lg font-semibold mb-2" style={{ color: '#005c65' }}>Highly Qualified Experts</h3>
               <p className="text-sm text-gray-600 leading-relaxed">
                 Qualified and trained therapists delivering clinically validated treatment interventions.
               </p>
             </div>
             
             {/* Card 2 */}
             <div className="bg-gray-200 rounded-lg p-6 text-left">
               <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4">
                 <svg className="w-8 h-8" style={{ color: '#005c65' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                 </svg>
               </div>
               <h3 className="text-lg font-semibold mb-2" style={{ color: '#005c65' }}>A Focus On Confidentiality</h3>
               <p className="text-sm text-gray-600 leading-relaxed">
                 Highest standards of data security with 100% client confidentiality.
               </p>
             </div>
             
             {/* Card 3 */}
             <div className="bg-gray-200 rounded-lg p-6 text-left">
               <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4">
                 <svg className="w-8 h-8" style={{ color: '#005c65' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                 </svg>
               </div>
               <h3 className="text-lg font-semibold mb-2" style={{ color: '#005c65' }}>Ongoing Monitoring & Support</h3>
               <p className="text-sm text-gray-600 leading-relaxed">
                 Continuous progress monitoring and support between sessions.
               </p>
             </div>
             
             {/* Card 4 */}
             <div className="bg-gray-200 rounded-lg p-6 text-left">
               <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4">
                 <svg className="w-8 h-8" style={{ color: '#005c65' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                 </svg>
               </div>
               <h3 className="text-lg font-semibold mb-2" style={{ color: '#005c65' }}>Personal And Peer Supervision</h3>
               <p className="text-sm text-gray-600 leading-relaxed">
                 Clinical supervision guidelines ensuring quality care delivery.
               </p>
             </div>
           </div>
         </div>
       </div>
       
       {/* How It Works Section */}
       <div ref={targetRef} className="relative z-0 h-[300vh] w-full">
         <div className="sticky-optimized mx-auto flex h-screen items-center justify-center bg-white px-[1rem] py-[5rem]">
           {/* Centered Heading */}
           <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-center z-10 max-w-4xl w-full px-4">
             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-32">
               How It Works
             </h2>
           </div>
           
           <div className="flex flex-row items-center justify-between w-full max-w-6xl gap-8 mt-48">
             {/* Left side - Animated text */}
             <div className="flex-1 flex flex-col items-start justify-center text-left ml-16">
               {/* Animated Heading */}
               <div className="mb-6">
                 <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                   {textPhrases[currentTextIndex]}
                 </div>
               </div>
               

             </div>

             {/* Right side - Animated Cards */}
             <div className="flex-1 flex items-center justify-center">
               <div className="relative w-full max-w-md h-96 flex items-center justify-center">
                 {/* Card 1 */}
                 <div className={`absolute bg-blue-50 rounded-lg shadow-lg p-6 transition-all duration-500 w-full max-w-sm transform -rotate-3 ${
                   currentCardIndex === 0 ? 'opacity-100 translate-y-0 z-30' : 'opacity-0 translate-y-8 z-10'
                 }`}>
                   <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                     <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                     </svg>
                   </div>
                   <h3 className="text-xl font-semibold text-gray-900 mb-2">{cardData[0]?.title}</h3>
                   <p className="text-gray-600">{cardData[0]?.description}</p>
                 </div>

                 {/* Card 2 */}
                 <div className={`absolute bg-blue-50 rounded-lg shadow-lg p-6 transition-all duration-500 w-full max-w-sm transform rotate-3 ${
                   currentCardIndex === 1 ? 'opacity-100 translate-y-0 z-30' : 'opacity-0 translate-y-8 z-10'
                 }`}>
                   <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                     <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                     </svg>
                   </div>
                   <h3 className="text-xl font-semibold text-gray-900 mb-2">{cardData[1]?.title}</h3>
                   <p className="text-gray-600">{cardData[1]?.description}</p>
                 </div>

                 {/* Card 3 */}
                 <div className={`absolute bg-blue-50 rounded-lg shadow-lg p-6 transition-all duration-500 w-full max-w-sm transform -rotate-3 ${
                   currentCardIndex === 2 ? 'opacity-100 translate-y-0 z-30' : 'opacity-0 translate-y-8 z-10'
                 }`}>
                   <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                     <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                     </svg>
                   </div>
                   <h3 className="text-xl font-semibold text-gray-900 mb-2">{cardData[2]?.title}</h3>
                   <p className="text-gray-600">{cardData[2]?.description}</p>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
       
       {/* Find Therapist Section */}
       <div className="relative z-0 min-h-screen w-full">
         <div className="sticky-optimized mx-auto flex flex-col bg-blue-100 px-[1rem] py-[5rem]">
           {/* Centered Heading */}
           <div className="text-center max-w-4xl mx-auto mb-12">
             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
               Find a licensed therapist near you
             </h2>
           </div>
           
           {/* Form Section */}
           <div className="flex flex-row items-center justify-between w-full max-w-6xl mx-auto gap-8 mb-16">
             {/* Left side - Illustration */}
             <div className="flex-1 flex items-center justify-center">
               <div className="w-64 h-64 bg-white rounded-lg shadow-lg p-6 border-2 border-gray-300">
                 <img 
                   src="/irene.jpeg" 
                   alt="Person" 
                   className="w-full h-full object-cover rounded-lg"
                 />
               </div>
             </div>

             {/* Center - Form */}
             <div className="flex-1 flex flex-col items-center justify-center">
               <div className="w-full max-w-xs space-y-4">
                 {/* Language Dropdown */}
                 <div className="relative dropdown-container">
                   <div 
                     onClick={toggleLanguageDropdown}
                     className="w-full px-4 py-3 bg-white rounded-[20px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center min-h-[48px] cursor-pointer"
                   >
                     <div className="flex flex-wrap gap-1 flex-1">
                       {selectedLanguages.length > 0 ? (
                         selectedLanguages.map((lang) => (
                           <span key={lang} className="inline-flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                             {lang}
                             <span
                               onClick={(e) => {
                                 e.stopPropagation();
                                 setSelectedLanguages(selectedLanguages.filter(l => l !== lang));
                               }}
                               className="ml-1 text-blue-600 hover:text-blue-800 cursor-pointer"
                             >
                               ×
                             </span>
                           </span>
                         ))
                       ) : (
                         <span className="text-gray-500">Language*</span>
                       )}
                     </div>
                     <svg className={`w-5 h-5 text-gray-400 transition-transform ${openDropdown === 'language' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                     </svg>
                   </div>
                   {openDropdown === 'language' && (
                     <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-[20px] border border-gray-300 shadow-lg z-50 max-h-48 overflow-y-auto scrollbar-hide">
                       {['English', 'Spanish', 'French', 'German', 'Mandarin'].map((lang) => (
                         <label key={lang} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                           <input 
                             type="checkbox" 
                             name="language" 
                             value={lang} 
                             checked={selectedLanguages.includes(lang)}
                             onChange={(e) => {
                               if (e.target.checked) {
                                 setSelectedLanguages([...selectedLanguages, lang]);
                               } else {
                                 setSelectedLanguages(selectedLanguages.filter(l => l !== lang));
                               }
                             }}
                             className="mr-3"
                           />
                           <span className="text-sm">{lang}</span>
                         </label>
                       ))}
                     </div>
                   )}
                 </div>

                 {/* Needs Dropdown */}
                 <div className="relative dropdown-container">
                   <div 
                     onClick={toggleNeedsDropdown}
                     className="w-full px-4 py-3 bg-white rounded-[20px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center min-h-[48px] cursor-pointer"
                   >
                     <div className="flex flex-wrap gap-1 flex-1">
                       {selectedNeeds.length > 0 ? (
                         selectedNeeds.map((need) => (
                           <span key={need} className="inline-flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                             {need}
                             <span
                               onClick={(e) => {
                                 e.stopPropagation();
                                 setSelectedNeeds(selectedNeeds.filter(n => n !== need));
                               }}
                               className="ml-1 text-green-600 hover:text-green-800 cursor-pointer"
                             >
                               ×
                             </span>
                           </span>
                         ))
                       ) : (
                         <span className="text-gray-500">Needs*</span>
                       )}
                     </div>
                     <svg className={`w-5 h-5 text-gray-400 transition-transform ${openDropdown === 'needs' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                     </svg>
                   </div>
                   {openDropdown === 'needs' && (
                     <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-[20px] border border-gray-300 shadow-lg z-50 max-h-48 overflow-y-auto scrollbar-hide">
                       {['Depression', 'Anxiety', 'Stress', 'Trauma', 'Relationships', 'Grief', 'Addiction', 'Self-esteem'].map((need) => (
                         <label key={need} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                           <input 
                             type="checkbox" 
                             name="needs" 
                             value={need} 
                             checked={selectedNeeds.includes(need)}
                             onChange={(e) => {
                               if (e.target.checked) {
                                 setSelectedNeeds([...selectedNeeds, need]);
                               } else {
                                 setSelectedNeeds(selectedNeeds.filter(n => n !== need));
                               }
                             }}
                             className="mr-3"
                           />
                           <span className="text-sm">{need}</span>
                         </label>
                       ))}
                     </div>
                   )}
                 </div>

                 {/* Expert Dropdown */}
                 <div className="relative dropdown-container">
                   <div 
                     onClick={toggleExpertDropdown}
                     className="w-full px-4 py-3 bg-white rounded-[20px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center min-h-[48px] cursor-pointer"
                   >
                     <div className="flex flex-wrap gap-1 flex-1">
                       {selectedExperts.length > 0 ? (
                         selectedExperts.map((expert) => (
                           <span key={expert} className="inline-flex items-center bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                             {expert}
                             <span
                               onClick={(e) => {
                                 e.stopPropagation();
                                 setSelectedExperts(selectedExperts.filter(e => e !== expert));
                               }}
                               className="ml-1 text-purple-600 hover:text-purple-800 cursor-pointer"
                             >
                               ×
                             </span>
                           </span>
                         ))
                       ) : (
                         <span className="text-gray-500">Expert*</span>
                       )}
                     </div>
                     <svg className={`w-5 h-5 text-gray-400 transition-transform ${openDropdown === 'expert' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                     </svg>
                   </div>
                   {openDropdown === 'expert' && (
                     <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-[20px] border border-gray-300 shadow-lg z-50 max-h-48 overflow-y-auto scrollbar-hide">
                       {['Psychologist', 'Psychiatrist', 'Counselor', 'Social Worker', 'Marriage & Family Therapist', 'Addiction Specialist', 'Trauma Specialist'].map((expert) => (
                         <label key={expert} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                           <input 
                             type="checkbox" 
                             name="expert" 
                             value={expert} 
                             checked={selectedExperts.includes(expert)}
                             onChange={(e) => {
                               if (e.target.checked) {
                                 setSelectedExperts([...selectedExperts, expert]);
                               } else {
                                 setSelectedExperts(selectedExperts.filter(e => e !== expert));
                               }
                             }}
                             className="mr-3"
                           />
                           <span className="text-sm">{expert}</span>
                         </label>
                       ))}
                     </div>
                   )}
                 </div>

                 <button className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-[20px] hover:bg-blue-700 transition-colors duration-200">
                   Find care
                 </button>
               </div>
             </div>

             {/* Right side - Illustration */}
             <div className="flex-1 flex items-center justify-center">
               <div className="w-64 h-64 bg-white rounded-lg shadow-lg p-6 border-2 border-gray-300">
                 <img 
                   src="/patient.jpg" 
                   alt="Therapist" 
                   className="w-full h-full object-cover rounded-lg"
                 />
               </div>
             </div>
           </div>

           {/* Available Doctors Section */}
           <div className="max-w-7xl mx-auto">
             <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
               Available Therapists
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {/* Doctor Card 1 */}
               <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                 <div className="p-6">
                   <div className="flex items-center mb-4">
                     <img 
                       src="/irene.jpeg" 
                       alt="Dr. Sarah Johnson" 
                       className="w-16 h-16 rounded-full object-cover mr-4"
                     />
                     <div>
                       <h4 className="text-lg font-bold text-gray-900">Dr. Sarah Johnson</h4>
                       <p className="text-sm text-gray-600">English, Spanish</p>
                     </div>
                   </div>
                   <div className="mb-4">
                     <p className="text-sm text-gray-700 mb-2"><strong>Expertise:</strong> Depression, Anxiety, Trauma</p>
                     <p className="text-sm text-gray-700"><strong>Next Available:</strong> Tomorrow, 2:00 PM</p>
                   </div>
                   <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                     Book Session
                   </button>
                 </div>
               </div>

               {/* Doctor Card 2 */}
               <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                 <div className="p-6">
                   <div className="flex items-center mb-4">
                     <img 
                       src="/patient.jpg" 
                       alt="Dr. Michael Chen" 
                       className="w-16 h-16 rounded-full object-cover mr-4"
                     />
                     <div>
                       <h4 className="text-lg font-bold text-gray-900">Dr. Michael Chen</h4>
                       <p className="text-sm text-gray-600">English, Mandarin</p>
                     </div>
                   </div>
                   <div className="mb-4">
                     <p className="text-sm text-gray-700 mb-2"><strong>Expertise:</strong> Relationships, Family Therapy</p>
                     <p className="text-sm text-gray-700"><strong>Next Available:</strong> Today, 4:30 PM</p>
                   </div>
                   <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                     Book Session
                   </button>
                 </div>
               </div>

               {/* Doctor Card 3 */}
               <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                 <div className="p-6">
                   <div className="flex items-center mb-4">
                     <img 
                       src="/irene.jpeg" 
                       alt="Dr. Emily Rodriguez" 
                       className="w-16 h-16 rounded-full object-cover mr-4"
                     />
                     <div>
                       <h4 className="text-lg font-bold text-gray-900">Dr. Emily Rodriguez</h4>
                       <p className="text-sm text-gray-600">English, Spanish</p>
                     </div>
                   </div>
                   <div className="mb-4">
                     <p className="text-sm text-gray-700 mb-2"><strong>Expertise:</strong> Addiction, Recovery</p>
                     <p className="text-sm text-gray-700"><strong>Next Available:</strong> Wednesday, 10:00 AM</p>
                   </div>
                   <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                     Book Session
                   </button>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>

       {/* Meet the Therapists Section */}
       <div className="py-16 px-8 lg:px-16 bg-white">
         <div className="max-w-7xl mx-auto">
           <div className="flex flex-col lg:flex-row items-center gap-12">
             {/* Left Section - Content */}
             <div className="flex-1">
               <h2 className="text-4xl lg:text-5xl font-bold text-[#005c65] mb-6 leading-tight">
                 Meet the Talkspace licensed providers
               </h2>
               <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                 Our network of therapists and psychiatric providers have specialization in 150+ conditions, treatment approaches, and mental health needs.
               </p>
               
               {/* Topic Tags Grid */}
               <div className="flex flex-wrap gap-3 mb-8">
                 <TopicTagButton text="DEPRESSION" delay={0} greenIntensity="light" />
                 <TopicTagButton text="RELATIONSHIPS" delay={75} greenIntensity="medium" />
                 <TopicTagButton text="ANXIETY & STRESS" delay={150} greenIntensity="dark" />
                 <TopicTagButton text="PARENTING" delay={100} greenIntensity="light" />
                 <TopicTagButton text="LGBTQIA+" delay={175} greenIntensity="darker" />
                 <TopicTagButton text="CHRONIC ILLNESS" delay={200} greenIntensity="dark" />
                 <TopicTagButton text="EATING DISORDERS" delay={125} greenIntensity="medium" />
                 <TopicTagButton text="OCD" delay={225} greenIntensity="light" />
                 <TopicTagButton text="ANGER MANAGEMENT" delay={150} greenIntensity="darkest" />
                 <TopicTagButton text="CHILDHOOD ABUSE" delay={250} greenIntensity="darker" />
                 <TopicTagButton text="MOOD DISORDERS" delay={175} greenIntensity="medium" />
                 <TopicTagButton text="TRAUMA & GRIEF" delay={200} greenIntensity="dark" />
                 <TopicTagButton text="LONELINESS" delay={225} greenIntensity="light" />
                 <TopicTagButton text="FAMILY CONFLICT" delay={250} greenIntensity="medium" />
                 <TopicTagButton text="AND MORE..." delay={275} greenIntensity="light" />
               </div>
               
               {/* Call-to-Action Button */}
               <button className="bg-[#005c65] text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#004a52] transition-colors duration-200 shadow-lg w-auto">
                 Meet them all
               </button>
             </div>
             
             {/* Right Section - Therapist Profile */}
             <div className="flex-1 flex flex-col items-center">
               <div className="relative">
                 <img 
                   src={therapistData[currentTherapistIndex].image}
                   alt={therapistData[currentTherapistIndex].name}
                   className="w-80 h-80 rounded-lg object-cover shadow-lg transition-opacity duration-500"
                 />
               </div>
               <div className="mt-6 flex items-center gap-4">
                 <h3 className="text-xl font-semibold text-[#005c65] transition-opacity duration-500">
                   {therapistData[currentTherapistIndex].name}
                 </h3>
                 {/* Pagination Dots */}
                 <div className="flex gap-2">
                   {therapistData.map((_, index) => (
                     <div 
                       key={index}
                       className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                         index === currentTherapistIndex ? 'bg-[#005c65]' : 'bg-gray-300'
                       }`}
                     />
                   ))}
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>

       {/* Testimonials Section */}
       <div className="py-12 px-8 lg:px-16 bg-gray-50">
         <div className="max-w-7xl mx-auto">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
             viewport={{ once: true }}
             className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-8"
           >
             <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-[#005c65]">
               What our clients say
             </h2>
             <p className="text-center mt-5 text-gray-600">
               See what our clients have to say about their therapy experience.
             </p>
           </motion.div>

           <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[500px] overflow-hidden">
             <TestimonialsColumn testimonials={testimonials.slice(0, 3)} duration={15} />
             <TestimonialsColumn testimonials={testimonials.slice(3, 6)} className="hidden md:block" duration={19} />
             <TestimonialsColumn testimonials={testimonials.slice(6, 9)} className="hidden lg:block" duration={17} />
           </div>
         </div>
       </div>

       {/* FAQ Section */}
       <div className="py-16 px-8 lg:px-16 bg-gradient-to-r from-green-50 to-blue-50">
         <div className="max-w-7xl mx-auto">
           <div className="flex flex-col lg:flex-row items-center gap-12">
             {/* Left Section - Content and Illustration */}
             <div className="flex-1">
               <h2 className="text-4xl lg:text-5xl font-bold text-[#005c65] mb-6 leading-tight">
                 Any questions?
               </h2>
               <p className="text-lg text-[#005c65] mb-8 leading-relaxed">
                 Find trust-worthy answers on all things mental health at Talkspace.
               </p>
               
               {/* Illustration */}
               <div className="w-64 h-64 mx-auto lg:mx-0">
                 <img 
                   src="/patient.jpg" 
                   alt="Therapy consultation" 
                   className="w-full h-full object-cover rounded-lg shadow-lg"
                 />
               </div>
             </div>
             
             {/* Right Section - FAQ List */}
             <div className="flex-1">
               <FAQItem 
                 question="How much is Talkspace online therapy?" 
                 answer="Talkspace online therapy costs vary based on your plan. Most insured members have a $0 copay, while self-pay plans start at $69 per week. We offer flexible payment options and accept most major insurance plans."
               />
               <FAQItem 
                 question="Does insurance cover online therapy?" 
                 answer="Yes, Talkspace accepts most major insurance plans. Many of our clients have $0 copays with their insurance. You can check your coverage during the signup process, and we'll verify your benefits before you start therapy."
               />
               <FAQItem 
                 question="Is online therapy effective?" 
                 answer="Yes, online therapy has been proven to be as effective as in-person therapy for many mental health conditions. Research shows that online therapy can be particularly effective for depression, anxiety, and stress management."
               />
               <FAQItem 
                 question="What is the difference between therapy and psychiatry?" 
                 answer="Therapy focuses on talk therapy and behavioral interventions to help with mental health challenges. Psychiatry involves medical treatment, including medication management. Talkspace offers both services, and you can choose what's right for you."
               />
               <FAQItem 
                 question="How do I get matched with a therapist?" 
                 answer="Our matching process is simple and personalized. After completing a brief assessment, our algorithm matches you with licensed therapists based on your needs, preferences, and goals. You can also browse and choose from our network of qualified providers."
               />
             </div>
           </div>
         </div>
       </div>

     </div>
   );
 };

export default IndividualTherapyPage;
