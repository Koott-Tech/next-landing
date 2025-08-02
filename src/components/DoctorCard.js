'use client';

import React, { useState } from 'react';

const DoctorCard = ({ doctor, sessionOptions, onSessionSelect }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Doctor Image and Basic Info */}
      <div className="relative">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-md">
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-sm font-semibold text-gray-800">{doctor.rating}</span>
          </div>
        </div>
      </div>

      {/* Doctor Info */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
          <p className="text-green-600 font-semibold mb-2">{doctor.specialty}</p>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <span className="mr-4">Experience: {doctor.experience}</span>
            <span>{doctor.patients} patients</span>
          </div>
        </div>

        {/* Session Options */}
        <div className="space-y-3 mb-4">
          {sessionOptions.map((session) => (
            <button
              key={session.id}
              onClick={() => onSessionSelect(session)}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                session.price === 0
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{session.label}</span>
                <span>
                  {session.price === 0 ? 'Free' : `₹${session.price}`}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Details Toggle */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>

        {/* Detailed Information */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Education</h4>
              <p className="text-sm text-gray-600">{doctor.education}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Therapeutic Approach</h4>
              <p className="text-sm text-gray-600">{doctor.approach}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Languages</h4>
              <div className="flex flex-wrap gap-2">
                {doctor.languages.map((language, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorCard; 