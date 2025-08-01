'use client';

import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useTransform, motion } from "framer-motion";

const HowItWorks = () => {
  const data = [
    {
      title: "Pick Your Guide",
             content: (
         <div>
           <p className="text-gray-800 text-xs md:text-sm font-normal mb-8">
             Choose from our carefully selected team of licensed therapists. Each professional is experienced in their specialty and committed to your mental health journey.
           </p>
          <div className="flex gap-4 justify-center w-full">
            {[
              { name: "Dr. Sarah", specialty: "Anxiety & Stress", video: "intro_1.mp4" },
              { name: "Dr. Michael", specialty: "Depression", video: "intro_2.mp4" },
              { name: "Dr. Emily", specialty: "Relationships", video: "intro_3.mp4" }
            ].map((guide, index) => (
              <div
                key={index}
                className="w-48 h-64 rounded-lg overflow-hidden shadow-lg border-2 border-green-300 relative group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white"
              >
                <video
                  src={`/${guide.video}`}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-lg">{guide.name}</h3>
                  <p className="text-sm opacity-90">{guide.specialty}</p>
                </div>
                <div className="absolute inset-0 bg-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Choose Your Slot",
             content: (
         <div>
           <p className="text-gray-800 text-xs md:text-sm font-normal mb-8">
             Book sessions that fit your schedule. Our flexible scheduling system allows you to find the perfect time for your therapy sessions.
           </p>
          <div className="flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
              {/* Calendar Header */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Book Your Session</h3>
                <p className="text-gray-600">Select a date and time that works for you</p>
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-6">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                  <div key={`header-${index}`} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i + 1;
                  const isAvailable = day >= 15 && day <= 25;
                  const isSelected = day === 20;
                  return (
                    <div
                      key={`day-${day}`}
                      className={`text-center py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? 'bg-green-500 text-white' 
                          : isAvailable 
                            ? 'hover:bg-green-100 text-gray-700' 
                            : 'text-gray-300'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
              
              {/* Time Slots */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 mb-3">Available Times</h4>
                {['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'].map((time, index) => (
                  <div
                    key={time}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      index === 1 
                        ? 'border-green-500 bg-green-50 text-green-700' 
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    {time}
                  </div>
                ))}
              </div>
              
              {/* Book Button */}
              <button className="w-full mt-6 bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200">
                Book Session
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Get Comfortable",
             content: (
         <div>
           <p className="text-gray-800 text-xs md:text-sm font-normal mb-8">
             Connect with your therapist in a safe, private environment. Our secure video platform ensures your sessions are confidential and comfortable.
           </p>
          <div className="flex gap-6 justify-center">
            {/* Therapist Video Card */}
            <div className="w-64 h-48 rounded-lg overflow-hidden shadow-lg border-2 border-blue-200 relative">
              <video
                src="/intro_4.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-semibold">Dr. Sarah</h3>
                <p className="text-sm opacity-90">Your Therapist</p>
              </div>
            </div>
            
            {/* Patient Video Card */}
            <div className="w-64 h-48 rounded-lg overflow-hidden shadow-lg border-2 border-green-200 relative">
              <video
                src="/intro_5.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-semibold">You</h3>
                <p className="text-sm opacity-90">Patient</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
};

const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 font-sans md:px-10"
      ref={containerRef}
    >
             <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
         <h2 className="text-lg md:text-4xl mb-4 text-gray-900 font-bold max-w-4xl">
           How It Works
         </h2>
         <p className="text-gray-700 text-sm md:text-base max-w-sm">
           Your journey to better mental health starts here. Follow these simple steps to get started.
         </p>
       </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
                         <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
               <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white flex items-center justify-center">
                 <div className="h-4 w-4 rounded-full bg-green-500 border border-green-300 p-2" />
               </div>
               <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-gray-800">
                 {item.title}
               </h3>
             </div>

             <div className="relative pl-20 pr-4 md:pl-4 w-full">
               <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-gray-800">
                 {item.title}
               </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-green-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks; 